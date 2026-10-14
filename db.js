const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, 'segye24.db');
const db = new Database(DB_PATH);

// High-performance WAL mode & foreign keys
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    nickname TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    status TEXT DEFAULT 'pending',
    is_adult INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS rooms (
    room_id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    character_id TEXT NOT NULL,
    title TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_persona_desc TEXT DEFAULT '',
    affection INTEGER NOT NULL DEFAULT 15,
    stage INTEGER NOT NULL DEFAULT 1,
    current_scene_key TEXT,
    current_time_place TEXT,
    current_mood TEXT,
    unlocked_keywords TEXT DEFAULT '[]',
    reply_suggestions TEXT DEFAULT '[]',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT NOT NULL,
    role TEXT NOT NULL,
    text TEXT NOT NULL,
    image_key TEXT,
    scene_title TEXT,
    time_place TEXT,
    mood TEXT,
    affection INTEGER,
    prev_affection INTEGER,
    delta INTEGER,
    affection_reason TEXT,
    inner_thought TEXT,
    engine TEXT,
    api_error TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_rooms_user_char ON rooms(user_id, character_id);
  CREATE INDEX IF NOT EXISTS idx_messages_room ON messages(room_id, created_at);
`);

console.log('[SQLite DB] Initialized database at', DB_PATH);

// Migrations for existing DBs
try { db.exec("ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'pending'"); } catch (e) {}
try { db.exec("ALTER TABLE users ADD COLUMN is_adult INTEGER DEFAULT 0"); } catch (e) {}

// Ensure first registered user is admin and approved
try {
  const firstUser = db.prepare('SELECT id FROM users ORDER BY id ASC LIMIT 1').get();
  if (firstUser) {
    db.prepare("UPDATE users SET role = 'admin', status = 'approved', is_adult = 1 WHERE id = ?").run(firstUser.id);
  }
} catch (e) {}

// Auth Methods
function createUser(username, plainPassword, nickname) {
  const cleanUsername = String(username || '').trim();
  const cleanNickname = String(nickname || cleanUsername || '단골손님').trim();
  if (cleanUsername.length < 3) {
    throw new Error('아이디는 최소 3자 이상이어야 합니다.');
  }
  if (!plainPassword || String(plainPassword).length < 4) {
    throw new Error('비밀번호는 최소 4자 이상이어야 합니다.');
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(cleanUsername);
  if (existing) {
    throw new Error('이미 사용 중인 아이디입니다.');
  }

  const userCount = db.prepare('SELECT COUNT(*) as cnt FROM users').get().cnt;
  const isAdmin = userCount === 0 || cleanUsername.toLowerCase() === 'admin';
  const role = isAdmin ? 'admin' : 'user';
  const status = isAdmin ? 'approved' : 'pending';
  const isAdult = isAdmin ? 1 : 0;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(String(plainPassword), salt);

  const stmt = db.prepare('INSERT INTO users (username, password_hash, nickname, role, status, is_adult) VALUES (?, ?, ?, ?, ?, ?)');
  const info = stmt.run(cleanUsername, hash, cleanNickname, role, status, isAdult);
  return {
    id: info.lastInsertRowid,
    username: cleanUsername,
    nickname: cleanNickname,
    role,
    status,
    is_adult: isAdult
  };
}

function authenticateUser(username, plainPassword) {
  const cleanUsername = String(username || '').trim();
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(cleanUsername);
  if (!user) {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
  }

  const ok = bcrypt.compareSync(String(plainPassword || ''), user.password_hash);
  if (!ok) {
    throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
  }

  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    role: user.role,
    status: user.status || 'pending',
    is_adult: user.is_adult ? 1 : 0
  };
}

function getUserById(id) {
  const user = db.prepare('SELECT id, username, nickname, role, status, is_adult, created_at FROM users WHERE id = ?').get(id);
  return user || null;
}

// Admin User Management
function getAllUsers() {
  return db.prepare('SELECT id, username, nickname, role, status, is_adult, created_at FROM users ORDER BY created_at DESC').all();
}

function updateUserStatus(userId, status, isAdult) {
  const fields = [];
  const vals = [];
  if (status !== undefined) {
    fields.push('status = ?');
    vals.push(status);
  }
  if (isAdult !== undefined) {
    fields.push('is_adult = ?');
    vals.push(isAdult ? 1 : 0);
  }
  if (fields.length > 0) {
    vals.push(userId);
    db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).run(...vals);
  }
  return getUserById(userId);
}

function deleteUser(userId) {
  db.prepare('DELETE FROM users WHERE id = ?').run(userId);
}

// Room & Message Management
function getUserRooms(userId, characterId) {
  const rows = db.prepare(`
    SELECT * FROM rooms 
    WHERE user_id = ? AND character_id = ? 
    ORDER BY updated_at DESC
  `).all(userId, characterId);

  return rows.map(r => {
    const msgs = getRoomMessages(r.room_id);
    let unk = [];
    let sugg = [];
    try { unk = JSON.parse(r.unlocked_keywords || '[]'); } catch (e) {}
    try { sugg = JSON.parse(r.reply_suggestions || '[]'); } catch (e) {}

    return {
      roomId: r.room_id,
      title: r.title,
      userName: r.user_name,
      userPersonaDesc: r.user_persona_desc,
      affection: r.affection,
      stage: r.stage,
      currentSceneKey: r.current_scene_key,
      currentTimePlace: r.current_time_place,
      currentMood: r.current_mood,
      unlockedKeywords: unk,
      replySuggestions: sugg,
      messages: msgs
    };
  });
}

function getRoom(userId, roomId) {
  const r = db.prepare('SELECT * FROM rooms WHERE room_id = ? AND user_id = ?').get(roomId, userId);
  if (!r) return null;

  const msgs = getRoomMessages(r.room_id);
  let unk = [];
  let sugg = [];
  try { unk = JSON.parse(r.unlocked_keywords || '[]'); } catch (e) {}
  try { sugg = JSON.parse(r.reply_suggestions || '[]'); } catch (e) {}

  return {
    roomId: r.room_id,
    title: r.title,
    userName: r.user_name,
    userPersonaDesc: r.user_persona_desc,
    affection: r.affection,
    stage: r.stage,
    currentSceneKey: r.current_scene_key,
    currentTimePlace: r.current_time_place,
    currentMood: r.current_mood,
    unlockedKeywords: unk,
    replySuggestions: sugg,
    messages: msgs
  };
}

function saveRoom(userId, roomData) {
  const unk = JSON.stringify(roomData.unlockedKeywords || []);
  const sugg = JSON.stringify(roomData.replySuggestions || []);

  const stmt = db.prepare(`
    INSERT INTO rooms (
      room_id, user_id, character_id, title, user_name, user_persona_desc,
      affection, stage, current_scene_key, current_time_place, current_mood,
      unlocked_keywords, reply_suggestions, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(room_id) DO UPDATE SET
      title = excluded.title,
      user_name = excluded.user_name,
      user_persona_desc = excluded.user_persona_desc,
      affection = excluded.affection,
      stage = excluded.stage,
      current_scene_key = excluded.current_scene_key,
      current_time_place = excluded.current_time_place,
      current_mood = excluded.current_mood,
      unlocked_keywords = excluded.unlocked_keywords,
      reply_suggestions = excluded.reply_suggestions,
      updated_at = CURRENT_TIMESTAMP
  `);

  stmt.run(
    roomData.roomId,
    userId,
    roomData.characterId || 'segye-24-3c209e4d-custom',
    roomData.title,
    roomData.userName,
    roomData.userPersonaDesc || '',
    roomData.affection || 15,
    roomData.stage || 1,
    roomData.currentSceneKey || '',
    roomData.currentTimePlace || '',
    roomData.currentMood || '',
    unk,
    sugg
  );

  // If initial message provided
  if (Array.isArray(roomData.messages)) {
    const existingCount = db.prepare('SELECT COUNT(*) as cnt FROM messages WHERE room_id = ?').get(roomData.roomId).cnt;
    if (existingCount === 0) {
      for (const m of roomData.messages) {
        addMessageToRoom(roomData.roomId, m);
      }
    }
  }

  return getRoom(userId, roomData.roomId);
}

function updateRoomState(roomId, updateData) {
  const fields = [];
  const values = [];

  if (updateData.affection !== undefined) {
    fields.push('affection = ?');
    values.push(updateData.affection);
  }
  if (updateData.stage !== undefined) {
    fields.push('stage = ?');
    values.push(updateData.stage);
  }
  if (updateData.currentSceneKey !== undefined) {
    fields.push('current_scene_key = ?');
    values.push(updateData.currentSceneKey);
  }
  if (updateData.currentTimePlace !== undefined) {
    fields.push('current_time_place = ?');
    values.push(updateData.currentTimePlace);
  }
  if (updateData.currentMood !== undefined) {
    fields.push('current_mood = ?');
    values.push(updateData.currentMood);
  }
  if (updateData.unlockedKeywords !== undefined) {
    fields.push('unlocked_keywords = ?');
    values.push(JSON.stringify(updateData.unlockedKeywords));
  }
  if (updateData.replySuggestions !== undefined) {
    fields.push('reply_suggestions = ?');
    values.push(JSON.stringify(updateData.replySuggestions));
  }

  if (fields.length > 0) {
    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(roomId);
    const sql = `UPDATE rooms SET ${fields.join(', ')} WHERE room_id = ?`;
    db.prepare(sql).run(...values);
  }
}

function addMessageToRoom(roomId, m) {
  const stmt = db.prepare(`
    INSERT INTO messages (
      room_id, role, text, image_key, scene_title, time_place, mood,
      affection, prev_affection, delta, affection_reason, inner_thought,
      engine, api_error
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  stmt.run(
    roomId,
    m.role,
    m.text,
    m.imageKey || null,
    m.sceneTitle || null,
    m.timePlace || null,
    m.mood || null,
    m.affection ?? null,
    m.prevAffection ?? null,
    m.delta ?? null,
    m.affectionReason || null,
    m.innerThought || null,
    m.engine || null,
    m.apiError || null
  );

  db.prepare('UPDATE rooms SET updated_at = CURRENT_TIMESTAMP WHERE room_id = ?').run(roomId);
}

function getRoomMessages(roomId) {
  const rows = db.prepare('SELECT * FROM messages WHERE room_id = ? ORDER BY id ASC').all(roomId);
  return rows.map(r => ({
    role: r.role,
    text: r.text,
    imageKey: r.image_key,
    sceneTitle: r.scene_title,
    timePlace: r.time_place,
    mood: r.mood,
    affection: r.affection,
    prevAffection: r.prev_affection,
    delta: r.delta,
    affectionReason: r.affection_reason,
    innerThought: r.inner_thought,
    engine: r.engine,
    apiError: r.api_error
  }));
}

function deleteRoom(userId, roomId) {
  db.prepare('DELETE FROM rooms WHERE room_id = ? AND user_id = ?').run(roomId, userId);
}

module.exports = {
  db,
  createUser,
  authenticateUser,
  getUserById,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getUserRooms,
  getRoom,
  saveRoom,
  updateRoomState,
  addMessageToRoom,
  getRoomMessages,
  deleteRoom
};
