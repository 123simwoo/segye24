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
  try {
    const res = await fetch(`/ko/api/characters/${encodeURIComponent(charId)}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      if (errData.code === "ADMIN_ACCESS_RESTRICTED") {
        alert("👑 이 캐릭터는 최고 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.");
        if (!currentUser) openAuthModal("login");
        return;
      }
      alert(errData.error || "캐릭터 정보를 불러올 수 없습니다.");
      return;
    }

    currentCharacterId = charId;
    document.querySelectorAll(".char-pill").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.char === charId);
    });

    currentCharacter = await res.json();
    renderProfile(currentCharacter);
    populateBuilder(currentCharacter);
    await loadComments(charId);
    initRoomsForCharacter(currentCharacter);
  } catch (err) {
    console.error("loadCharacter error:", err);
  }
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
  const adminBadge = char.adminOnly ? '<span class="tag-chip" style="background:rgba(234,179,8,0.22); color:#facc15; border:1px solid rgba(234,179,8,0.5); font-weight:800;">👑 관리자 전용</span>' : '';
  const adultBadge = char.isAdult ? '<span class="tag-chip" style="background:rgba(239,68,68,0.22); color:#f87171; border:1px solid rgba(239,68,68,0.45); font-weight:800;">🔞 19+ 성인전용</span>' : '';
  tagsEl.innerHTML = adminBadge + adultBadge + (char.tags || [])
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

  // Scenarios & Occult Volumes
  const isOccult = (char.characterId && char.characterId.includes("occult")) || (char.tags && char.tags.some(t => t.includes("오컬트")));
  let allScenarios;
  if (isOccult && char.startingScenarios && char.startingScenarios.length > 0) {
    allScenarios = char.startingScenarios;
    selectedScenarioId = 1;
  } else {
    allScenarios = [
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
    selectedScenarioId = 0;
  }
  char._allScenarios = allScenarios;

  const sel = document.getElementById("scenarioSelect");
  sel.innerHTML = allScenarios
    .map(s => `<option value="${s.id}">[시작 설정 #${s.id}] ${escapeHtml(s.initialTitle)}</option>`)
    .join("");
  sel.value = String(selectedScenarioId);
  onScenarioChange();
  renderOccultChapterCards(char);

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

let currentStoryModalContext = { scenarioId: 1, phase: "prologue" };

function renderOccultChapterCards(char) {
  const isOccult = (char?.characterId && char.characterId.includes("occult")) || (char?.tags && char.tags.some(t => t.includes("오컬트")));
  const gridEl = document.getElementById("chapterGridContainer");
  const stdEl = document.getElementById("standardScenarioContainer");
  const secTitle = document.getElementById("scenarioSectionTitle");
  const secBadge = document.getElementById("scenarioSectionBadge");

  if (!gridEl || !stdEl) return;

  if (isOccult && char.startingScenarios && char.startingScenarios.length > 0) {
    gridEl.style.display = "grid";
    stdEl.style.display = "none";
    if (secTitle) secTitle.textContent = "🔮 1~4권 챕터 선택 (프롤로그 / 본편 대화 / 에필로그 엔딩)";
    if (secBadge) secBadge.textContent = "단다단 각색 4대 에피소드 고유 일러스트 연동";

    gridEl.innerHTML = char.startingScenarios.map((s, idx) => {
      const volNum = s.volume || s.id || (idx + 1);
      const coverImg = s.prologue?.imageUrl || s.epilogue?.imageUrl || char.mainImage;
      const subtitle = s.prologue?.subtitle || s.playGuide || "";
      const isActive = selectedScenarioId === s.id;

      return `
        <div class="chapter-card ${isActive ? 'active-chapter' : ''}" onclick="selectOccultChapterCard(${s.id})">
          <div class="chapter-thumb-wrap">
            <img src="${escapeHtml(coverImg)}" alt="제${volNum}권 표지" />
            <span class="chapter-vol-badge">제${volNum}권 · 단다단 각색</span>
          </div>
          <div class="chapter-card-body">
            <div class="chapter-card-title">${escapeHtml(s.initialTitle)}</div>
            <div class="chapter-card-desc">${escapeHtml(subtitle)}</div>
            <div class="chapter-card-actions">
              <button type="button" class="btn-chapter-prologue" onclick="event.stopPropagation(); openStoryCinematic(${s.id}, 'prologue')">
                📜 프롤로그
              </button>
              <button type="button" class="btn-chapter-prologue" style="color:#facc15; border-color:rgba(234,179,8,0.35); background:rgba(234,179,8,0.12);" onclick="event.stopPropagation(); openStoryCinematic(${s.id}, 'epilogue')">
                🏆 에필로그
              </button>
              <button type="button" class="btn-chapter-start" onclick="event.stopPropagation(); startOccultVolume(${s.id})">
                ▶ 대화 시작
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } else {
    gridEl.style.display = "none";
    stdEl.style.display = "block";
    if (secTitle) secTitle.textContent = "시작 설정 (`startingScenarios` & 상황별 그림 자동 매칭 프리뷰)";
    if (secBadge) secBadge.textContent = "12종 고유 상황 일러스트 연동";
  }
}

function selectOccultChapterCard(scenarioId) {
  selectedScenarioId = scenarioId;
  const sel = document.getElementById("scenarioSelect");
  if (sel) sel.value = String(scenarioId);
  onScenarioChange();
  if (currentCharacter) renderOccultChapterCards(currentCharacter);
}

function openStoryCinematic(scenarioId, phase = "prologue") {
  if (!currentCharacter) return;
  const scenarios = currentCharacter._allScenarios || currentCharacter.startingScenarios || [];
  const scenario = scenarios.find(s => s.id === scenarioId) || scenarios[0];
  if (!scenario || !scenario[phase]) return;

  currentStoryModalContext = { scenarioId, phase };
  const data = scenario[phase];
  const volNum = scenario.volume || scenario.id || 1;

  const modal = document.getElementById("storyCinematicModal");
  if (!modal) return;

  const phaseBadge = document.getElementById("storyModalPhaseBadge");
  if (phaseBadge) {
    phaseBadge.className = `story-phase-badge ${phase === 'prologue' ? 'phase-prologue' : 'phase-epilogue'}`;
    phaseBadge.textContent = phase === 'prologue' ? `📜 제${volNum}권 프롤로그 (사건의 서막)` : `🏆 제${volNum}권 에필로그 (엔딩 후일담)`;
  }

  const titleEl = document.getElementById("storyModalChapterTitle");
  if (titleEl) titleEl.textContent = scenario.initialTitle;

  const imgEl = document.getElementById("storyModalImg");
  if (imgEl) imgEl.src = data.imageUrl || currentCharacter.mainImage;

  const imgTagEl = document.getElementById("storyModalImgTag");
  if (imgTagEl) imgTagEl.textContent = `제${volNum}권 ${phase === 'prologue' ? '오프닝 시네마틱' : '클라이맥스 엔딩'}`;

  const subEl = document.getElementById("storyModalSubtitleText");
  if (subEl) subEl.textContent = data.subtitle || "시간과 장소 미상";

  const headEl = document.getElementById("storyModalHeadline");
  if (headEl) headEl.textContent = data.title || scenario.initialTitle;

  const narrEl = document.getElementById("storyModalNarration");
  if (narrEl) narrEl.textContent = data.narration || "";

  const quoteCharEl = document.getElementById("storyModalQuoteChar");
  if (quoteCharEl) quoteCharEl.textContent = `${currentCharacter.name} (${currentCharacter.tags?.[1] || "퇴마 갸루"})`;

  const quoteMoodEl = document.getElementById("storyModalQuoteMood");
  if (quoteMoodEl) quoteMoodEl.textContent = phase === 'prologue' ? "다급하고 붉어진 츤데레 눈빛" : "수줍은 미소와 붉어진 두 뺨";

  const quoteTextEl = document.getElementById("storyModalQuoteText");
  if (quoteTextEl) quoteTextEl.textContent = data.segyeQuote || "";

  const hookEl = document.getElementById("storyModalHook");
  if (hookEl) {
    if (phase === 'prologue') {
      hookEl.innerHTML = `💡 <strong>서사 가이드:</strong> ${escapeHtml(data.hook || "손을 맞잡고 살아남으세요.")}`;
    } else {
      hookEl.innerHTML = data.nextUnlock 
        ? `🌟 <strong>다음 서사 안내:</strong> [제${data.nextUnlock}권 해금] ${escapeHtml(data.nextTitle || "")}`
        : `🎉 <strong>스토리 완료:</strong> 세계와의 모든 인연 서사를 완료했습니다! 자유롭게 대화를 즐겨보세요.`;
    }
  }

  const primaryBtn = document.getElementById("storyModalPrimaryBtn");
  const secondaryBtn = document.getElementById("storyModalSecondaryBtn");

  if (primaryBtn) {
    if (phase === 'prologue') {
      primaryBtn.textContent = `▶ 제${volNum}권 본편 대화 시작하기`;
    } else {
      primaryBtn.textContent = data.nextUnlock 
        ? `🌟 다음 권(제${data.nextUnlock}권)으로 넘어가기 &rarr;` 
        : `💬 대화방으로 복귀하기`;
    }
  }

  if (secondaryBtn) {
    secondaryBtn.style.display = "inline-block";
    if (phase === 'prologue') {
      secondaryBtn.textContent = `🏆 에필로그 엿보기`;
    } else {
      secondaryBtn.textContent = `📜 프롤로그 다시보기`;
    }
  }

  modal.style.display = "flex";
}

function closeStoryCinematicModal() {
  const modal = document.getElementById("storyCinematicModal");
  if (modal) modal.style.display = "none";
}

function onStoryModalPrimaryAction() {
  const ctx = currentStoryModalContext;
  if (!ctx) return closeStoryCinematicModal();

  if (ctx.phase === "prologue") {
    closeStoryCinematicModal();
    startOccultVolume(ctx.scenarioId);
  } else {
    // Epilogue
    const scenarios = currentCharacter?._allScenarios || currentCharacter?.startingScenarios || [];
    const scenario = scenarios.find(s => s.id === ctx.scenarioId);
    if (scenario?.epilogue?.nextUnlock) {
      openStoryCinematic(scenario.epilogue.nextUnlock, "prologue");
    } else {
      closeStoryCinematicModal();
      switchView("chat");
    }
  }
}

function onStoryModalSecondaryAction() {
  const ctx = currentStoryModalContext;
  if (!ctx) return;
  const nextPhase = ctx.phase === "prologue" ? "epilogue" : "prologue";
  openStoryCinematic(ctx.scenarioId, nextPhase);
}

function startOccultVolume(volId) {
  selectedScenarioId = volId;
  const sel = document.getElementById("scenarioSelect");
  if (sel) sel.value = String(volId);
  onScenarioChange();

  // Find existing room for this volume or create a new one
  const existingRoom = chatRooms.find(r => (r.volume === volId || r.scenarioId === volId));
  if (existingRoom) {
    selectRoom(existingRoom.roomId);
    switchView("chat");
  } else {
    startChatWithScenario(true);
  }
}

function switchOccultVolume(volId) {
  startOccultVolume(volId);
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
  const imgDict = char.profileImages || char.situationalImages || {};
  const firstImgKey = imgMatch ? (imgMatch[1] || imgMatch[2]).trim() : Object.keys(imgDict)[0];
  const combinedText = `${scenario?.initialAction || ""}\n\n${scenario?.initialMessage || ""}`;

  const branches = scenario?.branches || char?.branches || (scenario?.replySuggestions ? scenario.replySuggestions.map((s, idx) => ({
    id: String.fromCharCode(65 + idx),
    type: idx === 0 ? "romantic" : idx === 1 ? "care" : "playful",
    badge: idx === 0 ? "💖 직구 / 진심" : idx === 1 ? "🌿 다정 / 배려" : "⚡ 장난 / 도발",
    title: idx === 0 ? "진솔한 고백" : idx === 1 ? "따뜻한 배려" : "장난스러운 도발",
    text: typeof s === "string" ? s : (s.text || String(s))
  })) : []);

  return {
    roomId: `room-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: scenario?.initialTitle || "기본 대화",
    volume: scenario?.volume || scenario?.id || 1,
    scenarioId: scenario?.id || 1,
    userName: (currentUser?.nickname) || document.getElementById("userPersonaName")?.value || "단골손님",
    userPersonaDesc: "새벽마다 찾아오는 단골 손님",
    affection: startAffection,
    stage: stageMeta.stage,
    unlockedKeywords: [],
    currentSceneKey: firstImgKey,
    currentTimePlace: `새벽 03:00 · ${char.location}`,
    currentMood: stageMeta.name,
    branches,
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
        innerThought: "오늘도 피곤한 새벽이네... 조용히 자리만 앉았다 갔으면 좋겠다.",
        branches
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
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:var(--text-secondary); margin-top:0.2rem;">
            <span>대화 ${room.messages.length}턴 · 호칭: ${escapeHtml(room.userName)}</span>
            ${room.branches?.length ? `<span style="color:#f472b6; font-size:0.68rem; font-weight:700;">🎭 분기점 지원</span>` : ''}
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

  // Occult Volume Navigation Bar in Header
  const isOccult = (currentCharacter.characterId && currentCharacter.characterId.includes("occult")) || (currentCharacter.tags && currentCharacter.tags.some(t => t.includes("오컬트")));
  const chapterNavEl = document.getElementById("chatChapterNav");
  if (chapterNavEl) {
    if (isOccult) {
      chapterNavEl.style.display = "inline-flex";
      const volNum = room.volume || room.scenarioId || 1;
      chapterNavEl.innerHTML = `
        <button type="button" class="chapter-pill-btn chapter-pill-prologue" onclick="openStoryCinematic(${volNum}, 'prologue')" title="제${volNum}권 프롤로그 서사 열기">📜 프롤로그</button>
        <button type="button" class="chapter-pill-btn chapter-pill-epilogue" onclick="openStoryCinematic(${volNum}, 'epilogue')" title="제${volNum}권 에필로그 엔딩 열기">🏆 에필로그</button>
        <div style="display:inline-flex; gap:3px; margin-left:4px; background:rgba(0,0,0,0.35); padding:2px 4px; border-radius:999px; border:1px solid rgba(255,255,255,0.08);">
          ${[1, 2, 3, 4].map(v => `
            <button type="button" onclick="switchOccultVolume(${v})" style="background:${v === volNum ? 'linear-gradient(135deg, #ec4899, #8b5cf6)' : 'transparent'}; border:none; color:${v === volNum ? '#fff' : 'var(--text-muted)'}; font-size:0.7rem; font-weight:${v === volNum ? '700' : '500'}; padding:0.18rem 0.52rem; border-radius:999px; cursor:pointer;" title="제${v}권으로 이동">
              ${v}권
            </button>
          `).join("")}
        </div>
      `;
    } else {
      chapterNavEl.style.display = "none";
    }
  }

  renderChatMessages();
  renderSuggestions(room.branches, room.replySuggestions || []);
  updateHud();
  renderKeywordBooks();
}

function startChatWithScenario(skipPrologue = false) {
  if (!currentCharacter) return;
  if (currentCharacter.adminOnly) {
    if (!currentUser || currentUser.role !== "admin") {
      alert("👑 이 캐릭터는 최고 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }
  if (currentCharacter.isAdult) {
    if (!currentUser || currentUser.status !== "approved" || !currentUser.is_adult) {
      alert("🔞 이 캐릭터는 19세 이상 성인 전용입니다. 관리자 가입 승인을 받은 정회원만 이용할 수 있습니다.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }
  const scenarios = currentCharacter._allScenarios || [];
  const target = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  // If occult character and prologue exists, show prologue modal first if not skipped
  const isOccult = (currentCharacter.characterId && currentCharacter.characterId.includes("occult")) || (currentCharacter.tags && currentCharacter.tags.some(t => t.includes("오컬트")));
  if (!skipPrologue && isOccult && target?.prologue) {
    openStoryCinematic(target.id, "prologue");
    return;
  }

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
  if (currentCharacter?.adminOnly) {
    if (!currentUser || currentUser.role !== "admin") {
      alert("👑 이 캐릭터는 최고 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }
  if (currentCharacter?.isAdult) {
    if (!currentUser || currentUser.status !== "approved" || !currentUser.is_adult) {
      alert("🔞 이 캐릭터는 19세 이상 성인 전용입니다. 관리자 가입 승인을 받은 정회원만 이용할 수 있습니다.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }
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
  if (currentCharacter.adminOnly) {
    if (!currentUser || currentUser.role !== "admin") {
      alert("👑 이 캐릭터는 최고 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }
  if (currentCharacter.isAdult) {
    if (!currentUser || currentUser.status !== "approved" || !currentUser.is_adult) {
      alert("🔞 이 캐릭터는 19세 이상 성인 전용입니다. 관리자 가입 승인을 받은 정회원만 이용할 수 있습니다.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }

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
    if (!res.ok) {
      alert(data.error || "새로운 대화 생성에 실패했습니다.");
      return;
    }
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
      branches: data.branches || [],
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
          apiError: data.apiError || null,
          branches: data.branches || []
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
      const isDerailPenalty = Boolean(m.isDerailing || deltaVal < 0);
      const deltaSign = deltaVal > 0 ? `▲ +${deltaVal}%` : deltaVal < 0 ? `▼ ${deltaVal}%` : `변동 없음 (0%)`;
      const deltaClass = deltaVal >= 0 ? "up" : "down";
      const stageMeta = getStageMeta(m.affection ?? room.affection);
      const isLiveApi = m.engine && !m.engine.includes("내장");

      return `
        <div class="msg-row assistant">
          <img class="msg-avatar" src="${escapeHtml(avatarUrl)}" alt="Avatar" />
          <div class="msg-card ${isDerailPenalty ? 'penalty-card-border' : ''}">
            <div class="narrator-block">
              ${formatBabeChatText(actionText, currentCharacter.profileImages || currentCharacter.situationalImages, currentCharacter.name, userName, {
                sceneTitle: m.sceneTitle,
                timePlace: m.timePlace,
                mood: m.mood
              })}
            </div>
            ${dialogueText ? `<div class="dialogue-bubble ${isDerailPenalty ? 'penalty-dialogue' : ''}">${formatBabeChatText(dialogueText, currentCharacter.profileImages || currentCharacter.situationalImages, currentCharacter.name, userName)}</div>` : ""}

            <!-- Turn Simulation Status Window (호감도 변화 + 속마음 + 상황 정보 + 페널티 경고) -->
            <div class="turn-status-card ${isDerailPenalty ? 'penalty-status-border' : ''}">
              <div class="turn-status-header">
                <div style="display:flex; align-items:center; gap:0.45rem; flex-wrap:wrap;">
                  <span style="font-weight:800; color:#f472b6;">💗 호감도: ${m.prevAffection ?? m.affection}% &rarr; ${m.affection}%</span>
                  <span class="delta-badge ${deltaClass}">${deltaSign}${isDerailPenalty ? " [몰입 패널티]" : ""}</span>
                  ${m.engine ? `<span style="font-size:0.68rem; padding:0.1rem 0.45rem; border-radius:999px; background:${isLiveApi ? "rgba(56,189,248,0.18)" : "rgba(148,163,184,0.15)"}; color:${isLiveApi ? "#38bdf8" : "#94a3b8"}; font-weight:700;">${isLiveApi ? "⚡ " : ""}${escapeHtml(m.engine)}</span>` : ""}
                </div>
                <span style="color:var(--accent-cyan); font-weight:700;">${escapeHtml(stageMeta.name)}</span>
              </div>

              ${isDerailPenalty ? `
                <div class="derailment-penalty-card">
                  <div class="penalty-title-row">
                    <span class="penalty-alert-badge">⚠️ 에피소드 이탈 패널티</span>
                    <span class="penalty-delta-val">${deltaVal}%</span>
                  </div>
                  <div class="penalty-reason-text">
                    ${escapeHtml(m.derailmentReason || m.affectionReason || "작품의 서사 및 현재 진행 중인 상황과 맞지 않는 뜬금없는 대화로 인해 호감도 패널티가 적용되었습니다.")}
                  </div>
                  <div class="penalty-guide-tip">
                    💡 <strong>몰입 가이드:</strong> 작품 캐릭터의 감정선과 에피소드 상황에 맞는 대사/분기를 선택하면 호감도를 다시 회복할 수 있습니다.
                  </div>
                </div>
              ` : `
                <div style="color:var(--text-secondary); font-size:0.77rem;">
                  📌 <strong>반응 변화 요인:</strong> ${escapeHtml(m.affectionReason || "대화에 따른 감정 변화")}
                </div>
              `}

              ${m.innerThought ? `<div class="inner-thought-line ${isDerailPenalty ? 'penalty-thought' : ''}">💭 <strong>${escapeHtml(currentCharacter.name.replace(" 24", ""))}의 속마음:</strong> "${escapeHtml(m.innerThought)}"</div>` : ""}
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

function renderSuggestions(branches, plainSuggestions) {
  const el = document.getElementById("chatSuggestions");
  if (!el) return;

  let items = [];
  if (Array.isArray(branches) && branches.length > 0) {
    items = branches;
  } else if (Array.isArray(plainSuggestions) && plainSuggestions.length > 0) {
    const types = ["romantic", "care", "playful"];
    const badges = ["💖 직구 / 진심", "🌿 다정 / 배려", "⚡ 장난 / 도발"];
    const titles = ["솔직한 마음 표현", "다정하게 챙겨주기", "장난스러운 티키타카"];
    items = plainSuggestions.slice(0, 3).map((s, idx) => ({
      id: String.fromCharCode(65 + idx),
      type: types[idx] || "romantic",
      badge: badges[idx] || "💬 선택지",
      title: titles[idx] || "선택",
      text: typeof s === "string" ? s : (s.text || String(s))
    }));
  }

  if (items.length === 0) {
    el.innerHTML = "";
    el.style.display = "none";
    return;
  }

  el.style.display = "block";
  el.innerHTML = `
    <div class="branch-selection-container">
      <div class="branch-header-row">
        <div class="branch-title-wrap">
          <span class="branch-icon">🎭</span>
          <span class="branch-title">스토리 분기 선택지 (Interactive Branches)</span>
        </div>
        <span class="branch-hint">선택지를 클릭하면 해당 분기로 즉시 진행됩니다 (✏️ 버튼으로 수정 가능)</span>
      </div>
      <div class="branch-cards-grid">
        ${items.map(b => {
          const typeClass = b.type || "romantic";
          const defaultBadge = typeClass === "romantic" ? "💖 직구 / 진심" : typeClass === "care" ? "🌿 다정 / 배려" : "⚡ 장난 / 도발";
          const badgeText = b.badge || defaultBadge;
          const cardTitle = b.title || (typeClass === "romantic" ? "진솔한 마음" : typeClass === "care" ? "따뜻한 배려" : "장난 / 도발");
          const branchText = typeof b === "string" ? b : (b.text || "");

          return `
            <div class="branch-card ${escapeHtml(typeClass)}" onclick="chooseBranchCard(${JSON.stringify(branchText).replace(/"/g, '&quot;')})">
              <div class="branch-card-header">
                <span class="branch-badge ${escapeHtml(typeClass)}">${escapeHtml(badgeText)}</span>
                <span class="branch-card-tag">${escapeHtml(cardTitle)}</span>
              </div>
              <div class="branch-card-body">
                "${escapeHtml(branchText)}"
              </div>
              <div class="branch-card-footer">
                <span class="branch-go-action">▶ 이 분기로 진행</span>
                <button type="button" class="branch-edit-action" title="대사 수정 후 전송" onclick="event.stopPropagation(); editBranchCard(${JSON.stringify(branchText).replace(/"/g, '&quot;')})">✏️ 수정</button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
      ${(() => {
        const room = getActiveRoom();
        const isOccult = (currentCharacter?.characterId && currentCharacter.characterId.includes("occult")) || (currentCharacter?.tags && currentCharacter.tags.some(t => t.includes("오컬트")));
        if (isOccult && room && room.messages && room.messages.length >= 2) {
          const volNum = room.volume || room.scenarioId || 1;
          return `
            <div style="margin-top:0.75rem; padding:0.65rem 1rem; background:linear-gradient(135deg, rgba(234,179,8,0.14), rgba(236,72,153,0.14)); border:1px solid rgba(234,179,8,0.35); border-radius:0.75rem; display:flex; align-items:center; justify-content:space-between; gap:0.6rem; flex-wrap:wrap;">
              <div style="font-size:0.79rem; color:#facc15; font-weight:700;">
                🏆 <strong>제${volNum}권 서사 클라이맥스!</strong> 세계의 속마음과 애틋한 엔딩 후일담이 준비되어 있습니다.
              </div>
              <button type="button" class="btn-chapter-prologue" style="color:#facc15; border-color:#eab308; background:rgba(234,179,8,0.22); font-weight:700; padding:0.35rem 0.85rem; border-radius:0.5rem; cursor:pointer;" onclick="openStoryCinematic(${volNum}, 'epilogue')">
                🏆 에필로그 엔딩 보기 &rarr;
              </button>
            </div>
          `;
        }
        return '';
      })()}
    </div>
  `;
}

function chooseBranchCard(text) {
  const input = document.getElementById("chatInput");
  if (!input) return;
  input.value = text;
  sendChatMessage();
}

function editBranchCard(text) {
  const input = document.getElementById("chatInput");
  if (!input) return;
  input.value = text;
  input.focus();
}

function sendSuggested(text) {
  chooseBranchCard(text);
}

async function sendChatMessage() {
  const room = getActiveRoom();
  if (!room || !currentCharacter) return;

  if (currentCharacter.adminOnly) {
    if (!currentUser || currentUser.role !== "admin") {
      alert("👑 이 캐릭터는 최고 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }

  if (currentCharacter.isAdult) {
    if (!currentUser || currentUser.status !== "approved" || !currentUser.is_adult) {
      alert("🔞 이 캐릭터는 19세 이상 성인 전용입니다. 관리자 가입 승인을 받은 정회원만 이용할 수 있습니다.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }

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
    if (!res.ok) {
      alert(data.error || "대화 응답 생성에 실패했습니다.");
      room.messages.pop();
      renderChatMessages();
      return;
    }
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
    room.branches = data.branches || [];
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
      isDerailing: data.isDerailing,
      derailmentReason: data.derailmentReason,
      branches: data.branches || [],
      newlyUnlocked: data.newlyUnlocked || [],
      engine: data.engine || "내장 시뮬레이션 엔진",
      apiError: data.apiError || null
    });

    renderRoomList();
    renderChatMessages();
    renderSuggestions(room.branches, room.replySuggestions);
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
  if (view === "chat" && currentCharacter?.adminOnly) {
    if (!currentUser || currentUser.role !== "admin") {
      alert("👑 이 캐릭터는 최고 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }

  if (view === "chat" && currentCharacter?.isAdult) {
    if (!currentUser || currentUser.status !== "approved" || !currentUser.is_adult) {
      alert("🔞 이 캐릭터는 19세 이상 성인 전용입니다. 관리자 가입 승인을 받은 정회원만 이용할 수 있습니다.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }

  document.getElementById("profileView").style.display = view === "profile" ? "grid" : "none";
  document.getElementById("chatView").style.display = view === "chat" ? "grid" : "none";
  document.getElementById("builderView").style.display = view === "builder" ? "block" : "none";

  document.getElementById("tabProfileBtn").classList.toggle("active", view === "profile");
  document.getElementById("tabChatBtn").classList.toggle("active", view === "chat");
  document.getElementById("tabBuilderBtn").classList.toggle("active", view === "builder");
}

function populateBuilder(char) {
  const adultCheck = document.getElementById("editIsAdult");
  if (adultCheck) {
    adultCheck.checked = Boolean(char.isAdult);
  }
  document.getElementById("editName").value = char.name || "";
  document.getElementById("editLocation").value = char.characterDetails?.location || char.location || "";
  document.getElementById("editDescription").value = char.description || "";
  document.getElementById("editDetails").value = char.characterDetails?.details || char.details || "";
  document.getElementById("editInitialAction").value = char.initialAction || "";
  document.getElementById("editInitialMessage").value = char.initialMessage || "";
}

async function saveCharacterBuilder() {
  if (!currentCharacter) return;
  const isAdult = document.getElementById("editIsAdult")?.checked || false;

  // 19+ Adult Character Access Check
  if (isAdult) {
    if (!currentUser || currentUser.status !== "approved" || !currentUser.is_adult) {
      alert("🔞 19세 이상 성인 전용 캐릭터 설정 및 저장은 관리자 승인을 받은 정회원만 가능합니다.");
      if (!currentUser) openAuthModal("login");
      return;
    }
  }

  const payload = {
    ...currentCharacter,
    characterId: currentCharacterId,
    isAdult,
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

  try {
    const res = await fetch("/ko/api/characters/create", {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "캐릭터 저장에 실패했습니다.");
      return;
    }

    currentCharacter = data;
    renderProfile(currentCharacter);
    initRoomsForCharacter(currentCharacter);
    alert("✅ 캐릭터 설정이 성공적으로 저장되었습니다!");
    switchView("profile");
  } catch (err) {
    alert(`캐릭터 저장 오류: ${err.message}`);
  }
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
  const registerNotice = document.getElementById("authRegisterNotice");
  const submitBtn = document.getElementById("authSubmitBtn");
  const modalTitle = document.getElementById("authModalTitle");
  const status = document.getElementById("authStatusMsg");
  if (status) status.style.display = "none";

  if (tab === "register") {
    loginTabBtn?.classList.remove("active");
    registerTabBtn?.classList.add("active");
    if (nicknameRow) nicknameRow.style.display = "block";
    if (registerNotice) registerNotice.style.display = "block";
    if (submitBtn) submitBtn.textContent = "회원가입 완료 & 대화 시작 →";
    if (modalTitle) modalTitle.textContent = "✨ 신규 계정 가입";
  } else {
    registerTabBtn?.classList.remove("active");
    loginTabBtn?.classList.add("active");
    if (nicknameRow) nicknameRow.style.display = "none";
    if (registerNotice) registerNotice.style.display = "none";
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
    const welcomeMsg = (currentAuthTab === "register" && data.user.status === "pending")
      ? `가입 완료! 현재 관리자 승인 대기 상태입니다. (${data.user.nickname}님)`
      : `환영합니다, ${data.user.nickname}님!`;
    showAuthStatus(welcomeMsg, "success");

    setTimeout(async () => {
      closeAuthModal();
      await loadUserRooms();
    }, 500);
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
  const statusBadge = document.getElementById("authUserStatusBadge");
  const adminBtn = document.getElementById("adminUsersBtn");
  const personaInput = document.getElementById("userPersonaName");

  if (currentUser) {
    console.log("Logged in user:", currentUser);
    if (loginBtn) loginBtn.style.display = "none";
    if (badge) badge.style.display = "inline-flex";
    if (nameEl) nameEl.textContent = `${currentUser.nickname}님`;
    if (personaInput) {
      personaInput.value = currentUser.nickname;
    }

    // Status & 19+ Permission Badge
    if (statusBadge) {
      statusBadge.style.display = "inline-block";
      if (currentUser.role === "admin") {
        statusBadge.textContent = "👑 관리자 (19금 해금)";
        statusBadge.style.background = "rgba(234, 179, 8, 0.18)";
        statusBadge.style.color = "#facc15";
        statusBadge.style.border = "1px solid rgba(234, 179, 8, 0.4)";
      } else if (currentUser.status === "approved" && currentUser.is_adult) {
        statusBadge.textContent = "🔞 정회원 (19금 해금)";
        statusBadge.style.background = "rgba(16, 185, 129, 0.18)";
        statusBadge.style.color = "#34d399";
        statusBadge.style.border = "1px solid rgba(16, 185, 129, 0.4)";
      } else if (currentUser.status === "approved") {
        statusBadge.textContent = "✅ 일반회원";
        statusBadge.style.background = "rgba(56, 189, 248, 0.18)";
        statusBadge.style.color = "#38bdf8";
        statusBadge.style.border = "1px solid rgba(56, 189, 248, 0.4)";
      } else if (currentUser.status === "pending") {
        statusBadge.textContent = "⏳ 승인 대기중";
        statusBadge.style.background = "rgba(245, 158, 11, 0.18)";
        statusBadge.style.color = "#fbbf24";
        statusBadge.style.border = "1px solid rgba(245, 158, 11, 0.4)";
      } else if (currentUser.status === "rejected") {
        statusBadge.textContent = "🚫 가입 거절됨";
        statusBadge.style.background = "rgba(239, 68, 68, 0.18)";
        statusBadge.style.color = "#f87171";
        statusBadge.style.border = "1px solid rgba(239, 68, 68, 0.4)";
      }
    }

    // Admin Panel Button Toggle
    if (adminBtn) {
      adminBtn.style.display = currentUser.role === "admin" ? "inline-block" : "none";
    }

    // Admin Only Character Switcher Pill
    const marinPill = document.getElementById("charPillMarin");
    if (marinPill) {
      marinPill.style.display = currentUser.role === "admin" ? "inline-block" : "none";
    }
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (badge) badge.style.display = "none";
    if (adminBtn) adminBtn.style.display = "none";
    const marinPill = document.getElementById("charPillMarin");
    if (marinPill) marinPill.style.display = "none";
  }
}

function logoutUser() {
  localStorage.removeItem("segye24_token");
  currentUser = null;
  renderAuthUserUI();
  if (currentCharacterId === "kitagawa-marin-bisque-doll") {
    loadCharacter("segye-24-3c209e4d-custom");
  } else if (currentCharacter) {
    initRoomsForCharacter(currentCharacter);
  }
}

// --- ADMIN USER APPROVAL & ADULT MANAGEMENT FUNCTIONS ---
function openAdminUsersModal() {
  if (!currentUser || currentUser.role !== "admin") {
    alert("👑 관리자(Admin) 권한이 필요한 메뉴입니다.");
    return;
  }
  const modal = document.getElementById("adminUsersModal");
  if (modal) {
    modal.style.display = "flex";
    loadAdminUsers();
  }
}

function closeAdminUsersModal() {
  const modal = document.getElementById("adminUsersModal");
  if (modal) modal.style.display = "none";
}

async function loadAdminUsers() {
  const tbody = document.getElementById("adminUserTableBody");
  const countBadge = document.getElementById("adminUserCountBadge");
  const notice = document.getElementById("adminNoticeMsg");
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="7" style="padding:1.5rem; text-align:center; color:var(--text-muted);">회원 목록을 불러오는 중...</td></tr>`;

  try {
    const res = await fetch("/ko/api/admin/users", {
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      tbody.innerHTML = `<tr><td colspan="7" style="padding:1.5rem; text-align:center; color:#f43f5e;">목록 로드 실패: ${escapeHtml(data.error || "권한 오류")}</td></tr>`;
      return;
    }

    const users = data.users || [];
    if (countBadge) countBadge.textContent = `${users.length}명`;
    if (notice) notice.textContent = `총 ${users.length}명의 회원이 등록되어 있습니다.`;

    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="padding:1.5rem; text-align:center; color:var(--text-muted);">등록된 회원이 없습니다.</td></tr>`;
      return;
    }

    tbody.innerHTML = users.map(u => {
      const isSelf = currentUser && currentUser.id === u.id;
      const roleHtml = u.role === "admin"
        ? '<span style="color:#eab308; font-weight:700;">👑 관리자</span>'
        : '<span style="color:var(--text-secondary);">일반회원</span>';

      let statusBadge = "";
      if (u.status === "approved") {
        statusBadge = '<span style="background:rgba(16,185,129,0.18); color:#34d399; padding:0.18rem 0.5rem; border-radius:999px; font-size:0.75rem; font-weight:600;">✅ 승인됨</span>';
      } else if (u.status === "rejected") {
        statusBadge = '<span style="background:rgba(239,68,68,0.18); color:#f87171; padding:0.18rem 0.5rem; border-radius:999px; font-size:0.75rem; font-weight:600;">🚫 거절됨</span>';
      } else {
        statusBadge = '<span style="background:rgba(245,158,11,0.18); color:#fbbf24; padding:0.18rem 0.5rem; border-radius:999px; font-size:0.75rem; font-weight:600;">⏳ 대기중</span>';
      }

      const adultHtml = u.is_adult
        ? '<span style="color:#f87171; font-weight:700;">🔞 허용</span>'
        : '<span style="color:var(--text-muted);">🔒 미허용</span>';

      let actionsHtml = "";
      if (u.role === "admin") {
        actionsHtml = '<span style="color:var(--text-muted); font-size:0.74rem;">최고관리자 (계정 보호)</span>';
      } else {
        actionsHtml = `
          <div style="display:flex; justify-content:flex-end; gap:0.3rem; flex-wrap:wrap;">
            <button class="tab-btn" style="padding:0.25rem 0.45rem; font-size:0.72rem; border-color:rgba(16,185,129,0.5); color:#34d399;" onclick="updateUserApproval(${u.id}, 'approved', 1)" title="정회원 및 19세 이상 성인 권한 부여">✅ 19금 승인</button>
            <button class="tab-btn" style="padding:0.25rem 0.45rem; font-size:0.72rem; border-color:rgba(56,189,248,0.5); color:#38bdf8;" onclick="updateUserApproval(${u.id}, 'approved', 0)" title="일반 회원 승인 (19금 미허용)">🟢 일반 승인</button>
            <button class="tab-btn" style="padding:0.25rem 0.45rem; font-size:0.72rem; border-color:rgba(245,158,11,0.5); color:#fbbf24;" onclick="updateUserApproval(${u.id}, 'pending', 0)" title="가입 대기 상태로 변경">⏳ 대기</button>
            <button class="tab-btn" style="padding:0.25rem 0.45rem; font-size:0.72rem; border-color:rgba(239,68,68,0.5); color:#f87171;" onclick="updateUserApproval(${u.id}, 'rejected', 0)" title="가입 거절 처리">🚫 거절</button>
            <button class="tab-btn" style="padding:0.25rem 0.45rem; font-size:0.72rem; border-color:rgba(239,68,68,0.4); color:#f87171;" onclick="deleteAdminUser(${u.id}, '${escapeHtml(u.username)}')" title="회원 삭제">🗑️</button>
          </div>
        `;
      }

      return `
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05); ${isSelf ? 'background:rgba(234,179,8,0.05);' : ''}">
          <td style="padding:0.6rem 0.75rem; color:var(--text-muted); font-size:0.75rem;">#${u.id}</td>
          <td style="padding:0.6rem 0.75rem; font-weight:700;">${escapeHtml(u.username)} ${isSelf ? '<span style="font-size:0.7rem; color:#facc15;">(나)</span>' : ''}</td>
          <td style="padding:0.6rem 0.75rem;">${escapeHtml(u.nickname || "-")}</td>
          <td style="padding:0.6rem 0.75rem;">${roleHtml}</td>
          <td style="padding:0.6rem 0.75rem;">${statusBadge}</td>
          <td style="padding:0.6rem 0.75rem;">${adultHtml}</td>
          <td style="padding:0.6rem 0.75rem; text-align:right;">${actionsHtml}</td>
        </tr>
      `;
    }).join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="7" style="padding:1.5rem; text-align:center; color:#f43f5e;">오류: ${err.message}</td></tr>`;
  }
}

async function updateUserApproval(userId, status, isAdult) {
  try {
    const res = await fetch(`/ko/api/admin/users/${userId}/status`, {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status, isAdult })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      alert(`상태 변경 실패: ${data.error || "오류가 발생했습니다."}`);
      return;
    }
    if (currentUser && currentUser.id === userId) {
      currentUser = data.user;
      renderAuthUserUI();
    }
    await loadAdminUsers();
  } catch (err) {
    alert(`상태 변경 네트워크 오류: ${err.message}`);
  }
}

async function deleteAdminUser(userId, username) {
  if (!confirm(`정말로 회원 [${username}] 계정을 완전히 삭제하시겠습니까?`)) {
    return;
  }
  try {
    const res = await fetch(`/ko/api/admin/users/${userId}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      alert(`회원 삭제 실패: ${data.error || "오류가 발생했습니다."}`);
      return;
    }
    await loadAdminUsers();
  } catch (err) {
    alert(`회원 삭제 네트워크 오류: ${err.message}`);
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
