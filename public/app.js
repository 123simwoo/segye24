let currentCharacterId = "segye-24-3c209e4d-custom";
let currentCharacter = null;
let galleryItems = [];
let galleryIndex = 0;
let selectedScenarioId = 0;

// Multi-Room Chat State
let chatRooms = [];
let activeRoomId = null;

// User Auth State & JWT Token (Multi-User on Jetson Orin)
let currentUser = null; // { id, username, nickname, role }
let currentAuthTab = "login";

function getAuthToken() {
  return localStorage.getItem("segye24_token") || "";
}

function getAuthHeaders() {
  const token = getAuthToken();
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

function getStageMeta(affection) {
  if (affection < 15) {
    return {
      stage: 0,
      name: "0단계: 적대와 경멸",
      desc: "당신을 불쾌한 진상 손님으로 여기며 날카로운 독설과 함께 대화를 즉시 차단하려 합니다."
    };
  }
  if (affection < 35) {
    return {
      stage: 1,
      name: "1단계: 경계와 무관심",
      desc: "만성 피로에 찌든 나른하고 사무적인 태도. 불필요한 스몰토크에 선을 긋고 거리를 둡니다."
    };
  }
  if (affection < 60) {
    return {
      stage: 2,
      name: "2단계: 균열과 호기심",
      desc: "겉으로는 틱틱대고 투덜거리지만 은근히 당신을 신경 쓰고 챙겨주는 츤데레 상태입니다."
    };
  }
  if (affection < 85) {
    return {
      stage: 3,
      name: "3단계: 새벽의 공범",
      desc: "가시가 사라지고 졸업유예·외주 사기·이름('한세계')에 얽힌 상처를 털어놓으며 의지합니다."
    };
  }
  return {
    stage: 4,
    name: "4단계: 방화벽 해제 (설렘)",
    desc: "좁아터진 한 평짜리 세계에 들어온 유일한 사람인 당신에게 깊게 흔들리며 귓가가 붉어집니다."
  };
}

function normalizeKey(str) {
  return String(str || "").trim().replace(/\s+/g, " ");
}

function resolveImageTag(tagKey, profileImages) {
  if (!profileImages || !tagKey) return "";
  const clean = tagKey.trim();
  if (profileImages[clean]) {
    return typeof profileImages[clean] === "string" ? profileImages[clean] : profileImages[clean].url;
  }
  const foundKey = Object.keys(profileImages).find(k => {
    const normK = normalizeKey(k);
    const prefix = clean.split("-")[0]?.trim();
    return normK === normalizeKey(clean) || normK === normalizeKey(prefix);
  });
  if (foundKey) {
    return typeof profileImages[foundKey] === "string" ? profileImages[foundKey] : profileImages[foundKey].url;
  }
  return "";
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Render text with inline Situational Scene Card (Module 9438 + Scene Overlay)
function formatBabeChatText(rawText, profileImages, charName, userName, sceneMeta) {
  if (!rawText) return "";
  let processed = String(rawText)
    .replace(/\{\{char\}\}/g, charName || "세계 24")
    .replace(/\{\{user\}\}/g, userName || "단골손님");

  const imgRegex = /img:(?:\[([^\]]+)\]|([^[\]\n]+))/g;
  const htmlParts = [];
  let lastIndex = 0;
  let match;

  while ((match = imgRegex.exec(processed)) !== null) {
    const before = processed.slice(lastIndex, match.index).trim();
    if (before) {
      htmlParts.push(`<div>${escapeHtml(before)}</div>`);
    }
    const key = (match[1] || match[2] || "").trim();
    const imgUrl = resolveImageTag(key, profileImages);
    if (imgUrl) {
      const titleText = sceneMeta?.sceneTitle || key;
      const timePlaceText = sceneMeta?.timePlace || "실시간 상황 스틸컷";
      htmlParts.push(
        `<div class="scene-artwork-card">
          <img src="${escapeHtml(imgUrl)}" alt="${escapeHtml(key)}" />
          <div class="scene-artwork-overlay">
            <div class="scene-badge-row">
              <span class="scene-tag-pill">🎨 ${escapeHtml(key)}</span>
              ${sceneMeta?.mood ? `<span style="font-size:0.7rem; color:#f9a8d4; font-weight:700;">${escapeHtml(sceneMeta.mood)}</span>` : ""}
            </div>
            <div style="font-size:0.82rem; color:#fff; font-weight:700; margin-top:0.15rem;">${escapeHtml(titleText)}</div>
            <div style="font-size:0.72rem; color:#cbd5e1;">📍 ${escapeHtml(timePlaceText)}</div>
          </div>
        </div>`
      );
    }
    lastIndex = imgRegex.lastIndex;
  }

  const remaining = processed.slice(lastIndex).trim();
  if (remaining) {
    htmlParts.push(`<div>${escapeHtml(remaining)}</div>`);
  }
  return htmlParts.join("");
}

async function loadCharacter(charId) {
  currentCharacterId = charId;
  document.querySelectorAll(".char-pill").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.char === charId);
  });

  const res = await fetch(`/ko/api/characters/${encodeURIComponent(charId)}`);
  currentCharacter = await res.json();

  renderProfile(currentCharacter);
  populateBuilder(currentCharacter);
  await loadComments(charId);
  initRoomsForCharacter(currentCharacter);
}

function renderProfile(char) {
  document.getElementById("charName").textContent = char.name;
  document.getElementById("creatorNickname").textContent = char.creatorNickname || "BabeChat";
  document.getElementById("creatorAvatar").src = char.profileImage || char.mainImage;

  document.getElementById("statChatCount").textContent = Number(char.chatCount || 0).toLocaleString();
  document.getElementById("statLikeCount").textContent = Number(char.likeCount || 0).toLocaleString();

  const likeBtn = document.getElementById("likeBtn");
  likeBtn.classList.toggle("liked", Boolean(char.isLiked));
  document.getElementById("likeHeart").textContent = char.isLiked ? "❤️" : "🤍";
  document.getElementById("likeBtnText").textContent = Number(char.likeCount || 0).toLocaleString();

  // Tags
  const tagsEl = document.getElementById("charTags");
  tagsEl.innerHTML = (char.tags || [])
    .map(t => `<span class="tag-chip">${t.startsWith("#") ? escapeHtml(t) : "#" + escapeHtml(t)}</span>`)
    .join("");

  // Description & Details
  const d = char.characterDetails || char;
  document.getElementById("charDateLoc").textContent = `${d.date || ""} · ${d.location || ""}`;
  document.getElementById("charDescription").textContent = char.description || "";

  const detailsGrid = document.getElementById("charDetailsGrid");
  detailsGrid.innerHTML = `
    <div class="detail-box">
      <div class="detail-label">신체 (Height / Weight)</div>
      <div class="detail-val">${escapeHtml(d.height || "-")}cm / ${escapeHtml(d.weight || "-")}kg</div>
    </div>
    <div class="detail-box">
      <div class="detail-label">직업 (Jobs)</div>
      <div class="pill-wrap">${(d.jobs || []).map(j => `<span class="mini-pill">${escapeHtml(j)}</span>`).join("")}</div>
    </div>
    <div class="detail-box">
      <div class="detail-label">관심사 (Interests)</div>
      <div class="pill-wrap">${(d.interests || []).map(i => `<span class="mini-pill">${escapeHtml(i)}</span>`).join("")}</div>
    </div>
    <div class="detail-box">
      <div class="detail-label">선호 (Likes)</div>
      <div class="pill-wrap">${(d.likes || []).map(l => `<span class="mini-pill">💙 ${escapeHtml(l)}</span>`).join("")}</div>
    </div>
    <div class="detail-box full">
      <div class="detail-label">불호 / 극혐 (Dislikes)</div>
      <div class="pill-wrap">${(d.dislikes || []).map(x => `<span class="mini-pill">🚫 ${escapeHtml(x)}</span>`).join("")}</div>
    </div>
    <div class="detail-box full">
      <div class="detail-label">상세 서사 (Details)</div>
      <div class="detail-val" style="line-height:1.6; color:var(--text-secondary);">${escapeHtml(d.details || "")}</div>
    </div>
  `;

  // Gallery (12 distinct ordered images)
  const profImgs = char.profileImages || {};
  galleryItems = Object.entries(profImgs)
    .filter(([, val]) => !val.hidden)
    .map(([key, val]) => ({
      key,
      url: typeof val === "string" ? val : val.url,
      order: val.order || 99
    }))
    .sort((a, b) => a.order - b.order);

  document.getElementById("statImgCount").textContent = `${galleryItems.length}종`;
  galleryIndex = 0;
  renderGallery();

  // Scenarios
  const allScenarios = [
    {
      id: 0,
      initialTitle: char.initialTitle || "기본 설정",
      initialAction: char.initialAction,
      initialMessage: char.initialMessage,
      playGuide: char.playGuide,
      replySuggestions: char.replySuggestions || []
    },
    ...(char.startingScenarios || [])
  ];
  char._allScenarios = allScenarios;

  const sel = document.getElementById("scenarioSelect");
  sel.innerHTML = allScenarios
    .map(s => `<option value="${s.id}">[시작 설정 #${s.id}] ${escapeHtml(s.initialTitle)}</option>`)
    .join("");
  selectedScenarioId = 0;
  onScenarioChange();

  renderKeywordBooks();
}

function renderGallery() {
  if (!galleryItems.length) return;
  const item = galleryItems[galleryIndex] || galleryItems[0];
  document.getElementById("galleryMainImg").src = item.url;
  document.getElementById("galleryKeyLabel").textContent = item.key;
  document.getElementById("galleryOrderLabel").textContent = `Slot #${item.order} / ${galleryItems.length}`;

  const thumbs = document.getElementById("galleryThumbs");
  thumbs.innerHTML = galleryItems
    .map((g, idx) => `
      <div class="thumb-item ${idx === galleryIndex ? "active" : ""}" onclick="selectGallery(${idx})" title="${escapeHtml(g.key)}">
        <img src="${escapeHtml(g.url)}" alt="${escapeHtml(g.key)}" />
      </div>
    `)
    .join("");
}

function selectGallery(idx) {
  galleryIndex = idx;
  renderGallery();
}

function stepGallery(dir) {
  if (!galleryItems.length) return;
  galleryIndex = (galleryIndex + dir + galleryItems.length) % galleryItems.length;
  renderGallery();
}

function onScenarioChange() {
  const sel = document.getElementById("scenarioSelect");
  selectedScenarioId = parseInt(sel.value || "0", 10);
  const scenarios = currentCharacter?._allScenarios || [];
  const target = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  if (!target) return;

  const userName = document.getElementById("userPersonaName")?.value || "단골손님";
  document.getElementById("introActionPreview").innerHTML = formatBabeChatText(
    target.initialAction,
    currentCharacter.profileImages,
    currentCharacter.name,
    userName,
    { sceneTitle: target.initialTitle, timePlace: currentCharacter.location, mood: "오프닝 장면" }
  );
  document.getElementById("introMessagePreview").innerHTML = formatBabeChatText(
    target.initialMessage,
    currentCharacter.profileImages,
    currentCharacter.name,
    userName
  );
}

// Multi-Room Management
function getActiveRoom() {
  return chatRooms.find(r => r.roomId === activeRoomId) || chatRooms[0];
}

async function initRoomsForCharacter(char) {
  const scenarios = char._allScenarios || [];
  const baseScenario = scenarios[0];
  const defaultRoom = buildRoomFromScenario(char, baseScenario, 15);
  chatRooms = [defaultRoom];
  activeRoomId = defaultRoom.roomId;
  renderRoomList();
  syncActiveRoomToUI();

  if (currentUser) {
    await loadUserRooms();
  }
}

function buildRoomFromScenario(char, scenario, startAffection = 15) {
  const stageMeta = getStageMeta(startAffection);
  const imgMatch = (scenario?.initialAction || "").match(/img:(?:\[([^\]]+)\]|([^[\]\n]+))/);
  const firstImgKey = imgMatch ? (imgMatch[1] || imgMatch[2]).trim() : Object.keys(char.profileImages || {})[0];
  const combinedText = `${scenario?.initialAction || ""}\n\n${scenario?.initialMessage || ""}`;

  return {
    roomId: `room-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: scenario?.initialTitle || "기본 대화",
    userName: (currentUser?.nickname) || document.getElementById("userPersonaName")?.value || "단골손님",
    userPersonaDesc: "새벽마다 찾아오는 단골 손님",
    affection: startAffection,
    stage: stageMeta.stage,
    unlockedKeywords: [],
    currentSceneKey: firstImgKey,
    currentTimePlace: `새벽 03:00 · ${char.location}`,
    currentMood: stageMeta.name,
    replySuggestions: scenario?.replySuggestions || char.replySuggestions || [],
    messages: [
      {
        role: "assistant",
        text: combinedText,
        imageKey: firstImgKey,
        sceneTitle: scenario?.initialTitle || "첫 만남",
        timePlace: `새벽 03:00 · ${char.location}`,
        mood: stageMeta.name,
        affection: startAffection,
        prevAffection: startAffection,
        delta: 0,
        affectionReason: "대화 시작 초기 상태",
        innerThought: "오늘도 피곤한 새벽이네... 조용히 자리만 앉았다 갔으면 좋겠다."
      }
    ]
  };
}

function renderRoomList() {
  const el = document.getElementById("roomListContainer");
  if (!el) return;
  el.innerHTML = chatRooms
    .map(room => {
      const stageMeta = getStageMeta(room.affection);
      return `
        <div class="room-item ${room.roomId === activeRoomId ? "active" : ""}" onclick="selectRoom('${room.roomId}')">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.3rem;">
            <div style="font-weight:700; font-size:0.84rem; color:#fff; margin-bottom:0.2rem; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1;">
              ${escapeHtml(room.title)}
            </div>
            ${chatRooms.length > 1 ? `<button onclick="event.stopPropagation(); deleteRoomPrompt('${room.roomId}')" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:0.85rem; padding:0 3px; line-height:1;" title="대화방 삭제">&times;</button>` : ''}
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.73rem; color:var(--text-muted);">
            <span>💗 호감도 ${room.affection}%</span>
            <span>${escapeHtml(stageMeta.name.split(":")[0])}</span>
          </div>
          <div style="font-size:0.72rem; color:var(--text-secondary); margin-top:0.2rem;">
            대화 ${room.messages.length}턴 · 호칭: ${escapeHtml(room.userName)}
          </div>
        </div>
      `;
    })
    .join("");
}

function selectRoom(roomId) {
  activeRoomId = roomId;
  renderRoomList();
  syncActiveRoomToUI();
}

function syncActiveRoomToUI() {
  const room = getActiveRoom();
  if (!room || !currentCharacter) return;

  document.getElementById("chatHeaderTitle").textContent = currentCharacter.name;
  document.getElementById("chatScenarioBadge").textContent = room.title;
  document.getElementById("userPersonaName").value = room.userName || (currentUser?.nickname) || "단골손님";

  renderChatMessages();
  renderSuggestions(room.replySuggestions || []);
  updateHud();
  renderKeywordBooks();
}

function startChatWithScenario() {
  if (!currentCharacter) return;
  const scenarios = currentCharacter._allScenarios || [];
  const target = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];
  const startAff = selectedScenarioId === 1 ? 30 : selectedScenarioId === 2 ? 25 : selectedScenarioId === 3 ? 35 : 15;
  const newRoom = buildRoomFromScenario(currentCharacter, target, startAff);
  chatRooms.unshift(newRoom);
  activeRoomId = newRoom.roomId;
  renderRoomList();
  syncActiveRoomToUI();
  switchView("chat");

  if (currentUser) {
    saveRoomToServer(newRoom);
  }
}

// New Custom Room Modal
function openNewRoomModal() {
  document.getElementById("newRoomModal").style.display = "flex";
}

function closeNewRoomModal() {
  document.getElementById("newRoomModal").style.display = "none";
}

function fillCustomSituation(situationText, startAff) {
  document.getElementById("modalCustomSituation").value = situationText;
  document.getElementById("modalInitialAffection").value = startAff;
}

async function createNewCustomRoom() {
  if (!currentCharacter) return;
  const btn = document.getElementById("createRoomBtn");
  const customSituation = document.getElementById("modalCustomSituation").value.trim();
  const userName = document.getElementById("modalUserName").value.trim() || "단골손님";
  const userPersonaDesc = document.getElementById("modalUserPersonaDesc").value.trim();
  const initialAffection = Math.max(0, Math.min(100, Number(document.getElementById("modalInitialAffection").value || 25)));
  const apiKey = (document.getElementById("llmApiKey")?.value || localStorage.getItem("segye24_api_key") || "").trim();
  const provider = document.getElementById("llmProvider")?.value || localStorage.getItem("segye24_api_provider") || "auto";
  const ollamaEndpoint = (document.getElementById("modalOllamaEndpoint")?.value || document.getElementById("hudOllamaEndpoint")?.value || localStorage.getItem("segye24_ollama_endpoint") || "http://127.0.0.1:11434").trim();
  const ollamaModel = (document.getElementById("modalOllamaModel")?.value || document.getElementById("hudOllamaModel")?.value || localStorage.getItem("segye24_ollama_model") || "qwen2.5:7b").trim();

  if (!customSituation) return;

  btn.disabled = true;
  btn.textContent = "⏳ AI가 새로운 상황과 첫 대사를 생성 중...";

  const generatedRoomId = `room-${Date.now()}`;

  try {
    const res = await fetch("/ko/api/chat/new-room", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        roomId: generatedRoomId,
        characterId: currentCharacterId,
        customSituation,
        userName,
        userPersonaDesc,
        initialAffection,
        apiKey,
        provider,
        ollamaEndpoint,
        model: provider === "ollama" ? ollamaModel : undefined
      })
    });
    const data = await res.json();
    if (data.apiError) {
      updateApiStatusUI(false, `⚠️ API 호출 실패 (내장 엔진으로 자동 대체됨): ${data.apiError}`);
    } else if (data.engine && !data.engine.includes("내장")) {
      updateApiStatusUI(true, `✅ 실시간 연결 작동 중: ${data.engine}`);
    }

    const newRoom = {
      roomId: generatedRoomId,
      title: data.sceneTitle || customSituation.slice(0, 18),
      userName,
      userPersonaDesc,
      affection: data.affection ?? initialAffection,
      stage: data.stage ?? 1,
      unlockedKeywords: [],
      currentSceneKey: data.imageKey,
      currentTimePlace: data.timePlace || customSituation.slice(0, 20),
      currentMood: data.mood || "새로운 만남",
      replySuggestions: data.replySuggestions || [],
      messages: [
        {
          role: "assistant",
          text: data.text,
          imageKey: data.imageKey,
          sceneTitle: data.sceneTitle,
          timePlace: data.timePlace,
          mood: data.mood,
          affection: data.affection ?? initialAffection,
          prevAffection: initialAffection,
          delta: 0,
          affectionReason: "사용자 커스텀 상황으로 새로운 대화 시작",
          innerThought: data.innerThought,
          engine: data.engine || "내장 시뮬레이션 엔진",
          apiError: data.apiError || null
        }
      ]
    };

    chatRooms.unshift(newRoom);
    activeRoomId = newRoom.roomId;
    closeNewRoomModal();
    renderRoomList();
    syncActiveRoomToUI();
    switchView("chat");
  } finally {
    btn.disabled = false;
    btn.textContent = "🚀 이 상황으로 새로운 대화 시작";
  }
}

function renderChatMessages() {
  const room = getActiveRoom();
  if (!room || !currentCharacter) return;

  const container = document.getElementById("chatMessages");
  const userName = room.userName || "단골손님";
  const avatarUrl = currentCharacter.profileImage || currentCharacter.mainImage;

  container.innerHTML = room.messages
    .map(m => {
      if (m.role === "user") {
        return `
          <div class="msg-row user">
            <div class="msg-card">
              <div style="font-size:0.73rem; opacity:0.85; margin-bottom:0.15rem;">🗣️ ${escapeHtml(userName)}</div>
              <div style="font-size:0.93rem;">${escapeHtml(m.text)}</div>
            </div>
          </div>
        `;
      }

      const parts = String(m.text || "").split(/\n\n+/);
      const lastPart = parts[parts.length - 1] || "";
      const hasDialogue = lastPart.trim().startsWith('"') || lastPart.trim().startsWith('“');
      const actionText = hasDialogue ? parts.slice(0, -1).join("\n\n") : m.text;
      const dialogueText = hasDialogue ? lastPart : "";

      const deltaVal = Number(m.delta || 0);
      const deltaSign = deltaVal > 0 ? `▲ +${deltaVal}%` : deltaVal < 0 ? `▼ ${deltaVal}%` : `변동 없음 (0%)`;
      const deltaClass = deltaVal >= 0 ? "up" : "down";
      const stageMeta = getStageMeta(m.affection ?? room.affection);
      const isLiveApi = m.engine && !m.engine.includes("내장");

      return `
        <div class="msg-row assistant">
          <img class="msg-avatar" src="${escapeHtml(avatarUrl)}" alt="Avatar" />
          <div class="msg-card">
            <div class="narrator-block">
              ${formatBabeChatText(actionText, currentCharacter.profileImages, currentCharacter.name, userName, {
                sceneTitle: m.sceneTitle,
                timePlace: m.timePlace,
                mood: m.mood
              })}
            </div>
            ${dialogueText ? `<div class="dialogue-bubble">${formatBabeChatText(dialogueText, currentCharacter.profileImages, currentCharacter.name, userName)}</div>` : ""}

            <!-- Turn Simulation Status Window (호감도 변화 + 속마음 + 상황 정보 + 엔진 배지) -->
            <div class="turn-status-card">
              <div class="turn-status-header">
                <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap;">
                  <span style="font-weight:800; color:#f472b6;">💗 호감도: ${m.prevAffection ?? m.affection}% &rarr; ${m.affection}%</span>
                  <span class="delta-badge ${deltaClass}">${deltaSign}</span>
                  ${m.engine ? `<span style="font-size:0.68rem; padding:0.1rem 0.45rem; border-radius:999px; background:${isLiveApi ? "rgba(56,189,248,0.18)" : "rgba(148,163,184,0.15)"}; color:${isLiveApi ? "#38bdf8" : "#94a3b8"}; font-weight:700;">${isLiveApi ? "⚡ " : ""}${escapeHtml(m.engine)}</span>` : ""}
                </div>
                <span style="color:var(--accent-cyan); font-weight:700;">${escapeHtml(stageMeta.name)}</span>
              </div>
              <div style="color:var(--text-secondary); font-size:0.77rem;">
                📌 <strong>반응 변화 요인:</strong> ${escapeHtml(m.affectionReason || "대화에 따른 감정 변화")}
              </div>
              ${m.innerThought ? `<div class="inner-thought-line">💭 <strong>${escapeHtml(currentCharacter.name.replace(" 24", ""))}의 속마음:</strong> "${escapeHtml(m.innerThought)}"</div>` : ""}
              ${m.newlyUnlocked?.length ? `<div style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700;">🔓 키워드북 해금: ${m.newlyUnlocked.map(escapeHtml).join(", ")}</div>` : ""}
              ${m.apiError ? `<div style="font-size:0.73rem; color:#fca5a5; margin-top:0.25rem;">⚠️ API 오류 감지 (내장 엔진 응답으로 대체됨): ${escapeHtml(m.apiError)}</div>` : ""}
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  container.scrollTop = container.scrollHeight;
}

function renderSuggestions(list) {
  const el = document.getElementById("chatSuggestions");
  el.innerHTML = (list || [])
    .map(s => `<button class="suggest-chip" onclick="sendSuggested(${JSON.stringify(s).replace(/"/g, "&quot;")})">${escapeHtml(s)}</button>`)
    .join("");
}

function sendSuggested(text) {
  document.getElementById("chatInput").value = text;
  sendChatMessage();
}

async function sendChatMessage() {
  const room = getActiveRoom();
  if (!room || !currentCharacter) return;

  const input = document.getElementById("chatInput");
  const sendBtn = document.getElementById("sendMsgBtn");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  room.userName = document.getElementById("userPersonaName")?.value.trim() || "단골손님";
  room.messages.push({ role: "user", text });
  renderChatMessages();

  sendBtn.disabled = true;
  sendBtn.textContent = "생성 중...";

  try {
    const apiKey = (document.getElementById("llmApiKey")?.value || localStorage.getItem("segye24_api_key") || "").trim();
    const provider = document.getElementById("llmProvider")?.value || localStorage.getItem("segye24_api_provider") || "auto";
    const ollamaEndpoint = (document.getElementById("modalOllamaEndpoint")?.value || document.getElementById("hudOllamaEndpoint")?.value || localStorage.getItem("segye24_ollama_endpoint") || "http://127.0.0.1:11434").trim();
    const ollamaModel = (document.getElementById("modalOllamaModel")?.value || document.getElementById("hudOllamaModel")?.value || localStorage.getItem("segye24_ollama_model") || "qwen2.5:7b").trim();

    if (apiKey) {
      localStorage.setItem("segye24_api_key", apiKey);
      localStorage.setItem("segye24_api_provider", provider);
    }
    if (provider === "ollama") {
      localStorage.setItem("segye24_api_provider", "ollama");
      localStorage.setItem("segye24_ollama_endpoint", ollamaEndpoint);
      localStorage.setItem("segye24_ollama_model", ollamaModel);
    }

    const res = await fetch("/ko/api/chat/message", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        roomId: room.roomId,
        roomTitle: room.title,
        characterId: currentCharacterId,
        message: text,
        history: room.messages.slice(0, -1),
        affection: room.affection,
        unlockedKeywords: room.unlockedKeywords,
        userName: room.userName,
        userPersonaDesc: room.userPersonaDesc,
        currentLocation: room.currentTimePlace,
        apiKey,
        provider,
        ollamaEndpoint,
        model: provider === "ollama" ? ollamaModel : undefined
      })
    });

    const data = await res.json();
    if (data.apiError) {
      updateApiStatusUI(false, `⚠️ API 호출 실패 (내장 엔진으로 자동 대체됨): ${data.apiError}`);
    } else if (data.engine && !data.engine.includes("내장")) {
      updateApiStatusUI(true, `✅ 실시간 연결 작동 중: ${data.engine}`);
    }

    const prevAff = room.affection;
    room.affection = data.affection ?? room.affection;
    room.stage = data.stage ?? room.stage;
    room.unlockedKeywords = data.unlockedKeywords || room.unlockedKeywords;
    room.currentSceneKey = data.imageKey || room.currentSceneKey;
    room.currentTimePlace = data.timePlace || room.currentTimePlace;
    room.currentMood = data.mood || room.currentMood;
    room.replySuggestions = data.replySuggestions || [];

    room.messages.push({
      role: "assistant",
      text: data.text,
      imageKey: data.imageKey,
      sceneTitle: data.sceneTitle,
      timePlace: data.timePlace,
      mood: data.mood,
      affection: room.affection,
      prevAffection: data.prevAffection ?? prevAff,
      delta: data.delta ?? 0,
      affectionReason: data.affectionReason,
      innerThought: data.innerThought,
      newlyUnlocked: data.newlyUnlocked || [],
      engine: data.engine || "내장 시뮬레이션 엔진",
      apiError: data.apiError || null
    });

    renderRoomList();
    renderChatMessages();
    renderSuggestions(room.replySuggestions);
    updateHud();
    renderKeywordBooks();
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "전송";
  }
}

// 4 Interactive BabeChat Commands Handlers
function onChatInputChanged(val) {
  const popover = document.getElementById("commandPopover");
  if (!popover) return;
  const trimmed = String(val || "").trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("!")) {
    popover.style.display = "flex";
  } else {
    popover.style.display = "none";
  }
}

function onChatInputKeyDown(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    hideCommandPopover();
    sendChatMessage();
  } else if (event.key === "Escape") {
    hideCommandPopover();
    closeCommandModals();
  }
}

function hideCommandPopover() {
  const popover = document.getElementById("commandPopover");
  if (popover) popover.style.display = "none";
}

function triggerCommand(cmdText) {
  hideCommandPopover();
  closeCommandModals();
  const input = document.getElementById("chatInput");
  if (input) {
    input.value = cmdText;
  }
  sendChatMessage();
}

function closeCommandModals() {
  ["skinshipModal", "whisperModal", "midnightModal"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

function openSkinshipPicker() {
  hideCommandPopover();
  closeCommandModals();
  const modal = document.getElementById("skinshipModal");
  if (modal) modal.style.display = "flex";
}

function fillSkinshipAction(text) {
  const input = document.getElementById("skinshipInput");
  if (input) input.value = text;
}

function submitSkinshipAction() {
  const input = document.getElementById("skinshipInput");
  const val = input ? input.value.trim() : "";
  if (!val) return;
  triggerCommand(`/스킨십 ${val}`);
}

function openWhisperPrompt() {
  hideCommandPopover();
  closeCommandModals();
  const modal = document.getElementById("whisperModal");
  if (modal) modal.style.display = "flex";
}

function fillWhisperText(text) {
  const input = document.getElementById("whisperInput");
  if (input) input.value = text;
}

function submitWhisperText() {
  const input = document.getElementById("whisperInput");
  const val = input ? input.value.trim() : "";
  if (!val) return;
  triggerCommand(`/귓속말 "${val}"`);
}

function openMidnightEventPicker() {
  hideCommandPopover();
  closeCommandModals();
  const modal = document.getElementById("midnightModal");
  if (modal) modal.style.display = "flex";
}

// Global click listener to close command popover when clicked outside
document.addEventListener("click", (e) => {
  const popover = document.getElementById("commandPopover");
  const input = document.getElementById("chatInput");
  if (popover && popover.style.display === "flex") {
    if (!popover.contains(e.target) && e.target !== input && !e.target.closest(".cmd-pill-btn")) {
      popover.style.display = "none";
    }
  }
});

// Instant Affection Preset Tester
function setAffectionPreset(targetAffection) {
  const room = getActiveRoom();
  if (!room || !currentCharacter) return;
  const prev = room.affection;
  room.affection = targetAffection;
  const stageMeta = getStageMeta(targetAffection);
  room.stage = stageMeta.stage;
  room.currentMood = stageMeta.name;

  // Also update current scene preview image in HUD to match stage
  if (currentCharacter.name.includes("세계")) {
    if (targetAffection < 15) room.currentSceneKey = "(세계)자리정리/짜증/화남";
    else if (targetAffection < 35) room.currentSceneKey = "(세계)스마트폰/관심없음";
    else if (targetAffection < 60) room.currentSceneKey = "(세계)음료제조/정리/마주침";
    else if (targetAffection < 85) room.currentSceneKey = "(세계)대화중/{{user}}와 대화";
    else room.currentSceneKey = "{{user}}와 휴식/흡연부스/고백";
  }

  updateHud();
  renderRoomList();

  // Add a system notice inside chat so the user sees the stage switch immediately
  room.messages.push({
    role: "assistant",
    text: `img:[${room.currentSceneKey}]\n[호감도 단계 수동 전환: ${prev}% → ${targetAffection}% (${stageMeta.name})]\n${stageMeta.desc}\n\n${
      targetAffection >= 85
        ? '"...왜 그렇게 빤히 쳐다봐요. 사람 얼굴 뜨거워지게... 오늘 새벽엔 어디 가지 말고 내 옆자리에 있어요."'
        : targetAffection >= 60
        ? '"...이제 손님이랑은 말 안 섞으려고 했는데, 당신한테는 자꾸 쓸데없는 얘기까지 다 하게 되네요."'
        : targetAffection >= 35
        ? '"...뭐예요, 또 할 말 있어요? 바쁜데 자꾸 말 시키지 말라니까... 그래서, 무슨 일인데요?"'
        : targetAffection >= 15
        ? '"...용건 끝났으면 자리로 돌아가시죠. 저 할 일 많거든요."'
        : '"...적당히 하세요, 진짜. 한 번만 더 선 넘으면 바로 환불해 드리고 내보낼 거니까."'
    }`,
    imageKey: room.currentSceneKey,
    sceneTitle: `호감도 ${targetAffection}% 상태 반응 미리보기`,
    timePlace: room.currentTimePlace,
    mood: stageMeta.name,
    affection: targetAffection,
    prevAffection: prev,
    delta: targetAffection - prev,
    affectionReason: `사용자가 호감도 구간 테스트 버튼(${targetAffection}%)을 선택함`,
    innerThought:
      targetAffection >= 85
        ? "내 좁은 세계에 들어온 유일한 사람... 이제 없으면 안 될 것 같아."
        : targetAffection >= 60
        ? "이 사람 앞에서는 가시를 세우는 게 자꾸만 까먹어진다."
        : targetAffection >= 35
        ? "싫은 건 아닌데... 괜히 익숙해졌다가 또 상처받으면 어떡해."
        : targetAffection >= 15
        ? "그냥 평범한 손님이겠지. 괜히 마음 쓰지 말자."
        : "진상 손님 상대하는 건 정말 지긋지긋해."
  });
  renderChatMessages();
}

function updateHud() {
  const room = getActiveRoom();
  const aff = room ? room.affection : 15;
  const stageMeta = getStageMeta(aff);

  document.getElementById("hudAffectionScore").textContent = `${aff}% (${aff} / 100)`;
  document.getElementById("hudAffectionBar").style.width = `${aff}%`;
  document.getElementById("hudStageBadge").textContent = stageMeta.name;
  document.getElementById("hudStageDesc").textContent = stageMeta.desc;

  if (room && currentCharacter) {
    const imgUrl = resolveImageTag(room.currentSceneKey, currentCharacter.profileImages) || currentCharacter.mainImage;
    document.getElementById("hudCurrentSceneImg").src = imgUrl;
    document.getElementById("hudCurrentSceneKey").textContent = room.currentSceneKey || "(세계)스마트폰/관심없음";
    document.getElementById("hudCurrentTimePlace").textContent = room.currentTimePlace || currentCharacter.location;
    document.getElementById("hudCurrentMood").textContent = room.currentMood || stageMeta.name;
  }
}

function renderKeywordBooks() {
  const room = getActiveRoom();
  const unlocked = room ? room.unlockedKeywords : [];
  const kbs = currentCharacter?.keywordBooks || [];

  const html = kbs
    .map(kb => {
      const isUnlocked = unlocked.includes(kb.title);
      return `
        <div class="kb-item ${isUnlocked ? "unlocked" : ""}">
          <div class="kb-header">
            <span>🔑 #${kb.order + 1} ${escapeHtml(kb.title)}</span>
            <span style="font-size:0.73rem; color:${isUnlocked ? "var(--accent-emerald)" : "var(--text-muted)"};">
              ${isUnlocked ? "✓ 해금됨" : "트리거 대기"}
            </span>
          </div>
          <div style="font-size:0.75rem; color:var(--accent-cyan); margin-bottom:0.25rem;">
            발동 키워드: ${(kb.keywords || []).map(k => `<code>${escapeHtml(k)}</code>`).join(", ")}
          </div>
          <div style="font-size:0.82rem; color:var(--text-secondary);">${escapeHtml(kb.content)}</div>
        </div>
      `;
    })
    .join("");

  document.getElementById("kbListProfile").innerHTML = html;
  document.getElementById("hudKbList").innerHTML = html;
  document.getElementById("hudKbCount").textContent = `${unlocked.length}/${kbs.length}`;
}

async function toggleLike() {
  const res = await fetch(`/ko/api/characters/${encodeURIComponent(currentCharacterId)}/like`, { method: "POST" });
  const data = await res.json();
  currentCharacter.isLiked = data.isLiked;
  currentCharacter.likeCount = data.likeCount;
  renderProfile(currentCharacter);
}

async function loadComments(charId) {
  const res = await fetch(`/ko/api/comments?characterId=${encodeURIComponent(charId)}`);
  const comments = await res.json();
  document.getElementById("statCommentCount").textContent = comments.length;

  const listEl = document.getElementById("commentList");
  listEl.innerHTML = comments
    .map(c => `
      <div class="comment-item ${c.donateAmount ? "prochat" : ""}">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
          <div style="display:flex; align-items:center; gap:0.45rem;">
            <strong>${escapeHtml(c.nickname)}</strong>
            <span style="font-size:0.73rem; color:var(--text-muted);">#${escapeHtml(c.creatorID || "USER")}</span>
            ${c.donateAmount ? `<span class="prochat-badge">⚡ ProChat ${Number(c.donateAmount).toLocaleString()}P</span>` : ""}
          </div>
          <span style="font-size:0.74rem; color:var(--text-muted);">❤️ ${c.likeCount || 0}</span>
        </div>
        <div style="font-size:0.88rem; color:var(--text-primary); white-space:pre-line;">${escapeHtml(c.content)}</div>
      </div>
    `)
    .join("");
}

async function submitComment() {
  const nickname = document.getElementById("commentNickname").value.trim() || "익명";
  const donateAmount = document.getElementById("commentDonate").value;
  const content = document.getElementById("commentContent").value.trim();
  const toast = document.getElementById("commentErrorToast");
  toast.style.display = "none";

  if (!content) return;

  const res = await fetch("/ko/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      characterId: currentCharacterId,
      nickname,
      donateAmount: donateAmount ? Number(donateAmount) : null,
      content
    })
  });

  const data = await res.json();
  if (!res.ok) {
    toast.textContent = `🚫 [Module 92996 금칙어 차단] ${data.error}`;
    toast.style.display = "block";
    return;
  }

  document.getElementById("commentContent").value = "";
  await loadComments(currentCharacterId);
}

function switchView(view) {
  document.getElementById("profileView").style.display = view === "profile" ? "grid" : "none";
  document.getElementById("chatView").style.display = view === "chat" ? "grid" : "none";
  document.getElementById("builderView").style.display = view === "builder" ? "block" : "none";

  document.getElementById("tabProfileBtn").classList.toggle("active", view === "profile");
  document.getElementById("tabChatBtn").classList.toggle("active", view === "chat");
  document.getElementById("tabBuilderBtn").classList.toggle("active", view === "builder");
}

function populateBuilder(char) {
  document.getElementById("editName").value = char.name || "";
  document.getElementById("editLocation").value = char.characterDetails?.location || char.location || "";
  document.getElementById("editDescription").value = char.description || "";
  document.getElementById("editDetails").value = char.characterDetails?.details || char.details || "";
  document.getElementById("editInitialAction").value = char.initialAction || "";
  document.getElementById("editInitialMessage").value = char.initialMessage || "";
}

async function saveCharacterBuilder() {
  if (!currentCharacter) return;
  const payload = {
    ...currentCharacter,
    characterId: currentCharacterId,
    name: document.getElementById("editName").value.trim(),
    location: document.getElementById("editLocation").value.trim(),
    description: document.getElementById("editDescription").value,
    details: document.getElementById("editDetails").value,
    initialAction: document.getElementById("editInitialAction").value,
    initialMessage: document.getElementById("editInitialMessage").value,
    characterDetails: {
      ...(currentCharacter.characterDetails || {}),
      location: document.getElementById("editLocation").value.trim(),
      details: document.getElementById("editDetails").value
    }
  };

  const res = await fetch("/ko/api/characters/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  currentCharacter = await res.json();
  renderProfile(currentCharacter);
  initRoomsForCharacter(currentCharacter);
  switchView("profile");
}

function exportCharacterJson() {
  if (!currentCharacter) return;
  const blob = new Blob([JSON.stringify(currentCharacter, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${currentCharacter.id || "segye24"}_babechat_spec.json`;
  a.click();
}

function updateApiStatusUI(isSuccess, messageText, badgeText) {
  const box = document.getElementById("apiStatusBox");
  const modalBox = document.getElementById("modalApiStatusBox");
  const badge = document.getElementById("apiEngineBadge");
  const modelBadge = document.getElementById("modelBadge");
  const dot = document.getElementById("navApiStatusDot");

  const formattedHtml = escapeHtml(messageText || "").replace(/\n/g, "<br/>");

  [box, modalBox].forEach(b => {
    if (!b) return;
    if (isSuccess === true) {
      b.style.background = "rgba(56,189,248,0.12)";
      b.style.borderColor = "rgba(56,189,248,0.45)";
      b.style.color = "#38bdf8";
    } else if (isSuccess === false) {
      b.style.background = "rgba(244,63,94,0.12)";
      b.style.borderColor = "rgba(244,63,94,0.45)";
      b.style.color = "#fda4af";
    } else {
      b.style.background = "rgba(16,185,129,0.1)";
      b.style.borderColor = "rgba(16,185,129,0.3)";
      b.style.color = "var(--accent-emerald)";
    }
    b.innerHTML = formattedHtml;
  });

  if (dot) {
    dot.style.background = isSuccess === true ? "#38bdf8" : isSuccess === false ? "#f43f5e" : "#10b981";
  }

  if (badge) {
    if (isSuccess === true) {
      badge.textContent = badgeText || "⚡ 외부 API 연결됨";
      badge.style.background = "rgba(56,189,248,0.2)";
      badge.style.color = "#38bdf8";
    } else if (isSuccess === false) {
      badge.textContent = "⚠️ 키 오류 (내장 대체)";
      badge.style.background = "rgba(244,63,94,0.2)";
      badge.style.color = "#fda4af";
    } else {
      badge.textContent = "내장 엔진 활성";
      badge.style.background = "rgba(16,185,129,0.15)";
      badge.style.color = "var(--accent-emerald)";
    }
  }

  if (modelBadge && isSuccess === true && badgeText) {
    modelBadge.textContent = `⚡ ${badgeText}`;
  }
}

function openApiKeyModal() {
  const modal = document.getElementById("apiKeyModal");
  if (!modal) return;
  modal.style.display = "flex";
  const savedKey = document.getElementById("llmApiKey")?.value || localStorage.getItem("segye24_api_key") || "";
  const modalInput = document.getElementById("modalLlmApiKey");
  if (modalInput && !modalInput.value && savedKey) {
    modalInput.value = savedKey;
  }
}

function closeApiKeyModal() {
  const modal = document.getElementById("apiKeyModal");
  if (modal) modal.style.display = "none";
}

function toggleModalKeyVisibility() {
  const input = document.getElementById("modalLlmApiKey");
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

function onProviderChanged(scope = "modal") {
  const modalProviderSel = document.getElementById("modalLlmProvider");
  const hudProviderSel = document.getElementById("llmProvider");
  const activeVal = scope === "modal" ? modalProviderSel?.value : hudProviderSel?.value;

  if (modalProviderSel && activeVal) modalProviderSel.value = activeVal;
  if (hudProviderSel && activeVal) hudProviderSel.value = activeVal;

  const isOllama = activeVal === "ollama";

  const modalOllamaBlock = document.getElementById("modalOllamaBlock");
  const modalApiKeyBlock = document.getElementById("modalApiKeyBlock");
  const hudOllamaBlock = document.getElementById("hudOllamaBlock");
  const hudApiKeyBlock = document.getElementById("hudApiKeyBlock");
  const testBtn = document.getElementById("testApiBtn");
  const modalTestBtn = document.getElementById("modalTestApiBtn");

  if (modalOllamaBlock) modalOllamaBlock.style.display = isOllama ? "flex" : "none";
  if (modalApiKeyBlock) modalApiKeyBlock.style.display = isOllama ? "none" : "flex";
  if (hudOllamaBlock) hudOllamaBlock.style.display = isOllama ? "flex" : "none";
  if (hudApiKeyBlock) hudApiKeyBlock.style.display = isOllama ? "none" : "flex";

  if (testBtn) testBtn.textContent = isOllama ? "🦙 Ollama 연결 테스트 및 저장" : "🔌 API 키 저장 및 연결 테스트";
  if (modalTestBtn) modalTestBtn.textContent = isOllama ? "🦙 Ollama 연결 테스트 및 저장" : "🔌 API 키 저장 및 연결 테스트";
}

async function fetchOllamaInstalledModels(scope = "modal") {
  const endpointInput = scope === "modal" ? document.getElementById("modalOllamaEndpoint") : document.getElementById("hudOllamaEndpoint");
  const endpoint = (endpointInput?.value || "http://127.0.0.1:11434").trim();

  try {
    const res = await fetch(`/ko/api/chat/ollama-models?endpoint=${encodeURIComponent(endpoint)}`);
    const data = await res.json();
    if (res.ok && data.ok && Array.isArray(data.models) && data.models.length > 0) {
      ["modal", "hud"].forEach(s => {
        const sel = document.getElementById(`${s}OllamaModelSelect`);
        const txt = document.getElementById(`${s}OllamaModel`);
        if (sel) {
          sel.innerHTML = data.models.map(m => `<option value="${escapeHtml(m)}">${escapeHtml(m)}</option>`).join("");
          sel.style.display = "block";
          if (txt && txt.value && data.models.includes(txt.value)) {
            sel.value = txt.value;
          } else if (txt && data.models[0]) {
            txt.value = data.models[0];
            sel.value = data.models[0];
          }
        }
      });
      alert(`✅ Ollama에서 설치된 모델 ${data.models.length}개를 성공적으로 불러왔습니다!\n목록: ${data.models.join(", ")}`);
    } else {
      alert(`⚠️ 모델 목록을 가져올 수 없습니다.\n${data.error || "Ollama가 켜져 있는지 확인하세요."}`);
    }
  } catch (err) {
    alert(`❌ Ollama 서버 연결 오류: ${err.message}`);
  }
}

function onOllamaModelSelectChange(scope = "modal") {
  const sel = document.getElementById(`${scope}OllamaModelSelect`);
  const txt = document.getElementById(`${scope}OllamaModel`);
  const otherScope = scope === "modal" ? "hud" : "modal";
  const otherSel = document.getElementById(`${otherScope}OllamaModelSelect`);
  const otherTxt = document.getElementById(`${otherScope}OllamaModel`);

  if (sel && txt && sel.value) {
    txt.value = sel.value;
    if (otherTxt) otherTxt.value = sel.value;
    if (otherSel) otherSel.value = sel.value;
  }
}

async function modalTestAndSaveApiKey() {
  const modalInput = document.getElementById("modalLlmApiKey");
  const modalProviderSel = document.getElementById("modalLlmProvider");
  const hudInput = document.getElementById("llmApiKey");
  const hudProviderSel = document.getElementById("llmProvider");

  const modalOllamaEndpoint = document.getElementById("modalOllamaEndpoint");
  const hudOllamaEndpoint = document.getElementById("hudOllamaEndpoint");
  const modalOllamaModel = document.getElementById("modalOllamaModel");
  const hudOllamaModel = document.getElementById("hudOllamaModel");

  if (hudInput && modalInput) hudInput.value = modalInput.value;
  if (hudProviderSel && modalProviderSel) hudProviderSel.value = modalProviderSel.value;
  if (hudOllamaEndpoint && modalOllamaEndpoint) hudOllamaEndpoint.value = modalOllamaEndpoint.value;
  if (hudOllamaModel && modalOllamaModel) hudOllamaModel.value = modalOllamaModel.value;

  await testAndSaveApiKey();
}

async function modalClearApiKey() {
  const modalInput = document.getElementById("modalLlmApiKey");
  if (modalInput) modalInput.value = "";
  await clearApiKey();
}

function toggleKeyVisibility() {
  const input = document.getElementById("llmApiKey");
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

async function testAndSaveApiKey() {
  const input = document.getElementById("llmApiKey");
  const modalInput = document.getElementById("modalLlmApiKey");
  const providerSel = document.getElementById("llmProvider");
  const btn = document.getElementById("testApiBtn");
  const modalBtn = document.getElementById("modalTestApiBtn");

  const provider = (providerSel ? providerSel.value : "auto");
  const apiKey = (input?.value || modalInput?.value || "").trim();

  const ollamaEndpoint = (document.getElementById("modalOllamaEndpoint")?.value || document.getElementById("hudOllamaEndpoint")?.value || localStorage.getItem("segye24_ollama_endpoint") || "http://127.0.0.1:11434").trim();
  const ollamaModel = (document.getElementById("modalOllamaModel")?.value || document.getElementById("hudOllamaModel")?.value || localStorage.getItem("segye24_ollama_model") || "qwen2.5:7b").trim();

  // Special Handling for Ollama Local Provider
  if (provider === "ollama") {
    [btn, modalBtn].forEach(b => {
      if (b) {
        b.disabled = true;
        b.textContent = "⏳ Ollama 로컬 연결 및 모델 호출 테스트 중...";
      }
    });

    try {
      const res = await fetch("/ko/api/chat/test-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "ollama",
          ollamaEndpoint,
          model: ollamaModel
        })
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        localStorage.setItem("segye24_api_provider", "ollama");
        localStorage.setItem("segye24_ollama_endpoint", ollamaEndpoint);
        localStorage.setItem("segye24_ollama_model", ollamaModel);
        updateApiStatusUI(
          true,
          `${data.message}\n로컬 AI 엔진이 저장되었습니다. 모든 대화가 [Ollama (${ollamaModel})] 로컬 모델로 생성됩니다!`,
          `Ollama (${ollamaModel})`
        );
      } else {
        updateApiStatusUI(
          false,
          `❌ Ollama 연결 실패: ${data.error || "알 수 없는 오류"}\n'ollama run ${ollamaModel}' 또는 'ollama serve'가 켜져 있는지 확인해 주세요.`
        );
      }
    } catch (err) {
      updateApiStatusUI(false, `❌ 네트워크 오류: ${err.message}`);
    } finally {
      [btn, modalBtn].forEach(b => {
        if (b) {
          b.disabled = false;
          b.textContent = "🦙 Ollama 연결 테스트 및 저장";
        }
      });
    }
    return;
  }

  // Cloud API Providers (Gemini, OpenAI, Claude, etc.)
  if (!apiKey) {
    await clearApiKey();
    return;
  }

  [btn, modalBtn].forEach(b => {
    if (b) {
      b.disabled = true;
      b.textContent = "⏳ API 키 검증 및 실제 호출 테스트 중...";
    }
  });

  try {
    const res = await fetch("/ko/api/chat/test-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey, provider })
    });
    const data = await res.json();

    if (res.ok && data.ok) {
      localStorage.setItem("segye24_api_key", apiKey);
      localStorage.setItem("segye24_api_provider", provider);
      if (input) input.value = apiKey;
      if (modalInput) modalInput.value = apiKey;
      updateApiStatusUI(
        true,
        `${data.message}\n키가 저장되었습니다. 모든 대화가 [${data.engine}] 실시간 LLM으로 생성됩니다!`,
        `${data.engine || data.provider}`
      );
    } else {
      updateApiStatusUI(
        false,
        `❌ API 연결 실패: ${data.error || "알 수 없는 오류"}\n키 형식이나 잔여 할당량을 확인해 주세요. (대화 시 내장 엔진이 대신 응답합니다)`
      );
    }
  } catch (err) {
    updateApiStatusUI(false, `❌ 네트워크 오류: ${err.message}`);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.textContent = "🔌 API 키 저장 및 연결 테스트";
    }
    if (modalBtn) {
      modalBtn.disabled = false;
      modalBtn.textContent = "🔌 API 키 저장 및 연결 테스트";
    }
  }
}

async function clearApiKey() {
  localStorage.removeItem("segye24_api_key");
  localStorage.removeItem("segye24_api_provider");
  const input = document.getElementById("llmApiKey");
  const modalInput = document.getElementById("modalLlmApiKey");
  if (input) input.value = "";
  if (modalInput) modalInput.value = "";
  await fetch("/ko/api/chat/test-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey: "", provider: "auto" })
  }).catch(() => {});
  updateApiStatusUI(
    null,
    "✓ API 키가 초기화되었습니다. 무설치 내장 시뮬레이션 엔진으로 작동합니다."
  );
}

async function initApiKeyState() {
  const savedKey = localStorage.getItem("segye24_api_key") || "";
  const savedProvider = localStorage.getItem("segye24_api_provider") || "auto";
  const savedOllamaEndpoint = localStorage.getItem("segye24_ollama_endpoint") || "http://127.0.0.1:11434";
  const savedOllamaModel = localStorage.getItem("segye24_ollama_model") || "qwen2.5:7b";

  const input = document.getElementById("llmApiKey");
  const modalInput = document.getElementById("modalLlmApiKey");
  const providerSel = document.getElementById("llmProvider");
  const modalProviderSel = document.getElementById("modalLlmProvider");

  const modalOllamaEndpoint = document.getElementById("modalOllamaEndpoint");
  const hudOllamaEndpoint = document.getElementById("hudOllamaEndpoint");
  const modalOllamaModel = document.getElementById("modalOllamaModel");
  const hudOllamaModel = document.getElementById("hudOllamaModel");

  if (input && savedKey) input.value = savedKey;
  if (modalInput && savedKey) modalInput.value = savedKey;
  if (providerSel && savedProvider) providerSel.value = savedProvider;
  if (modalProviderSel && savedProvider) modalProviderSel.value = savedProvider;

  if (modalOllamaEndpoint) modalOllamaEndpoint.value = savedOllamaEndpoint;
  if (hudOllamaEndpoint) hudOllamaEndpoint.value = savedOllamaEndpoint;
  if (modalOllamaModel) modalOllamaModel.value = savedOllamaModel;
  if (hudOllamaModel) hudOllamaModel.value = savedOllamaModel;

  onProviderChanged("modal");

  try {
    const res = await fetch("/ko/api/chat/key-status");
    const status = await res.json();
    if (status.provider === "ollama") {
      updateApiStatusUI(
        true,
        `✅ Ollama 로컬 모델 자동 활성 중 (${status.ollamaModel || savedOllamaModel})\nJetson Orin/로컬 PC에서 100% 무료·무검열로 실시간 생성 중입니다.`,
        `Ollama (${status.ollamaModel || savedOllamaModel})`
      );
    } else if (status.hasKey || status.hasSavedKey) {
      updateApiStatusUI(
        true,
        `✅ 실시간 LLM API 자동 활성 중 (${status.maskedKey || "저장됨"})\n현재 모든 대화와 속마음이 실제 LLM API로 생성됩니다.`,
        `실시간 API (${status.provider || status.savedProvider || "gemini"})`
      );
    } else if (savedKey) {
      await testAndSaveApiKey();
    }
  } catch {
    // ignore
  }
}

// --- User Authentication & Multi-User Room Sync (Jetson Orin Support) ---

function openAuthModal(tab = "login") {
  const modal = document.getElementById("authModal");
  if (!modal) return;
  modal.style.display = "flex";
  switchAuthTab(tab);
  setTimeout(() => {
    document.getElementById("authInputUsername")?.focus();
  }, 100);
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  if (!modal) return;
  modal.style.display = "none";
  const status = document.getElementById("authStatusMsg");
  if (status) status.style.display = "none";
}

function switchAuthTab(tab) {
  currentAuthTab = tab;
  const loginTabBtn = document.getElementById("authTabLoginBtn");
  const registerTabBtn = document.getElementById("authTabRegisterBtn");
  const nicknameRow = document.getElementById("authNicknameRow");
  const submitBtn = document.getElementById("authSubmitBtn");
  const modalTitle = document.getElementById("authModalTitle");
  const status = document.getElementById("authStatusMsg");
  if (status) status.style.display = "none";

  if (tab === "register") {
    loginTabBtn?.classList.remove("active");
    registerTabBtn?.classList.add("active");
    if (nicknameRow) nicknameRow.style.display = "block";
    if (submitBtn) submitBtn.textContent = "회원가입 완료 & 대화 시작 →";
    if (modalTitle) modalTitle.textContent = "✨ 신규 계정 가입";
  } else {
    registerTabBtn?.classList.remove("active");
    loginTabBtn?.classList.add("active");
    if (nicknameRow) nicknameRow.style.display = "none";
    if (submitBtn) submitBtn.textContent = "로그인 →";
    if (modalTitle) modalTitle.textContent = "👤 로그인";
  }
}

function showAuthStatus(msg, type = "info") {
  const el = document.getElementById("authStatusMsg");
  if (!el) return;
  el.style.display = "block";
  el.style.color = type === "error" ? "#f43f5e" : type === "success" ? "#10b981" : "var(--text-secondary)";
  el.textContent = msg;
}

async function submitAuthForm() {
  const username = (document.getElementById("authInputUsername")?.value || "").trim();
  const password = document.getElementById("authInputPassword")?.value || "";
  const nickname = (document.getElementById("authInputNickname")?.value || "").trim();
  const submitBtn = document.getElementById("authSubmitBtn");

  if (!username || username.length < 3) {
    showAuthStatus("아이디를 3글자 이상 입력해주세요.", "error");
    return;
  }
  if (!password || password.length < 4) {
    showAuthStatus("비밀번호를 4글자 이상 입력해주세요.", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "처리 중...";

  try {
    const endpoint = currentAuthTab === "register" ? "/ko/api/auth/register" : "/ko/api/auth/login";
    const payload = { username, password };
    if (currentAuthTab === "register") {
      payload.nickname = nickname || "단골손님";
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      showAuthStatus(data.error || "인증에 실패했습니다.", "error");
      return;
    }

    // Success
    localStorage.setItem("segye24_token", data.token);
    currentUser = data.user;
    renderAuthUserUI();
    showAuthStatus(`환영합니다, ${data.user.nickname}님!`, "success");

    setTimeout(async () => {
      closeAuthModal();
      await loadUserRooms();
    }, 400);
  } catch (err) {
    showAuthStatus(`네트워크 오류: ${err.message}`, "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = currentAuthTab === "register" ? "회원가입 완료 & 대화 시작 →" : "로그인 →";
  }
}

function renderAuthUserUI() {
  const loginBtn = document.getElementById("authLoginBtn");
  const badge = document.getElementById("authUserBadge");
  const nameEl = document.getElementById("authUserName");
  const personaInput = document.getElementById("userPersonaName");

  if (currentUser) {
    if (loginBtn) loginBtn.style.display = "none";
    if (badge) badge.style.display = "inline-flex";
    if (nameEl) nameEl.textContent = `${currentUser.nickname}님`;
    if (personaInput) {
      personaInput.value = currentUser.nickname;
    }
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (badge) badge.style.display = "none";
  }
}

function logoutUser() {
  localStorage.removeItem("segye24_token");
  currentUser = null;
  renderAuthUserUI();
  if (currentCharacter) {
    initRoomsForCharacter(currentCharacter);
  }
}

async function checkAuthSession() {
  const token = getAuthToken();
  if (!token) {
    renderAuthUserUI();
    return;
  }
  try {
    const res = await fetch("/ko/api/auth/me", {
      headers: getAuthHeaders()
    });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.user) {
        currentUser = data.user;
        renderAuthUserUI();
        await loadUserRooms();
        return;
      }
    }
    localStorage.removeItem("segye24_token");
    currentUser = null;
    renderAuthUserUI();
  } catch (err) {
    console.warn("Auth check failed:", err);
  }
}

async function loadUserRooms() {
  if (!currentUser) return;
  try {
    const res = await fetch(`/ko/api/rooms?characterId=${encodeURIComponent(currentCharacterId)}`, {
      headers: getAuthHeaders()
    });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.rooms) && data.rooms.length > 0) {
        chatRooms = data.rooms.map(r => ({
          roomId: r.roomId,
          title: r.title,
          userName: r.userName || currentUser.nickname,
          userPersonaDesc: r.userPersonaDesc || "",
          affection: r.affection,
          stage: r.stage,
          unlockedKeywords: r.unlockedKeywords || [],
          currentSceneKey: r.currentSceneKey,
          currentTimePlace: r.currentTimePlace,
          currentMood: r.currentMood,
          replySuggestions: r.replySuggestions || [],
          messages: r.messages || []
        }));
        activeRoomId = chatRooms[0].roomId;
        renderRoomList();
        syncActiveRoomToUI();
        return;
      }
    }
    // If user has no rooms saved yet, save current default room to DB
    const active = getActiveRoom();
    if (active) {
      await saveRoomToServer(active);
    }
  } catch (err) {
    console.warn("loadUserRooms error:", err);
  }
}

async function saveRoomToServer(room) {
  if (!currentUser || !room) return;
  try {
    await fetch("/ko/api/rooms/save", {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        roomId: room.roomId,
        characterId: currentCharacterId,
        title: room.title,
        userName: room.userName || currentUser.nickname,
        userPersonaDesc: room.userPersonaDesc || "",
        affection: room.affection,
        stage: room.stage,
        currentSceneKey: room.currentSceneKey,
        currentTimePlace: room.currentTimePlace,
        currentMood: room.currentMood,
        unlockedKeywords: room.unlockedKeywords,
        replySuggestions: room.replySuggestions,
        messages: room.messages
      })
    });
  } catch (err) {
    console.warn("saveRoomToServer error:", err);
  }
}

async function deleteRoomPrompt(roomId) {
  if (chatRooms.length <= 1) return;
  if (!confirm("이 대화방과 지금까지 나눈 대화 기록을 삭제하시겠습니까?")) return;

  chatRooms = chatRooms.filter(r => r.roomId !== roomId);
  if (activeRoomId === roomId) {
    activeRoomId = chatRooms[0].roomId;
  }
  renderRoomList();
  syncActiveRoomToUI();

  if (currentUser) {
    try {
      await fetch(`/ko/api/rooms/${encodeURIComponent(roomId)}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
    } catch (err) {
      console.warn("deleteRoom error:", err);
    }
  }
}

document.querySelectorAll(".char-pill").forEach(btn => {
  btn.addEventListener("click", () => loadCharacter(btn.dataset.char));
});

window.addEventListener("DOMContentLoaded", async () => {
  await loadCharacter("segye-24-3c209e4d-custom");
  await checkAuthSession();
  initApiKeyState();
});
