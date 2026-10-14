const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const jwt = require('jsonwebtoken');
const dbLayer = require('./db.js');

const PORT = process.env.PORT || 3024;
const JWT_SECRET = process.env.JWT_SECRET || 'segye24_orin_jwt_secret_2026';
const PUBLIC_DIR = path.join(__dirname, 'public');
const STATE_FILE = path.join(__dirname, 'data_store.json');

function getAuthUser(req) {
  const authHeader = req.headers['authorization'] || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  try {
    const decoded = jwt.verify(match[1], JWT_SECRET);
    return dbLayer.getUserById(decoded.id);
  } catch (e) {
    return null;
  }
}

// Reverse-engineered Module 92996 Competitor Keyword Blocklist
const BLOCKED_COMPETITOR_KEYWORDS = [
  "크랙", "루나톡", "엘린", "버블챗", "티팟", "츄챗", "이브챗", "피즈챗", "좀챗", "코멧", "알플레이", "알플",
  "crack", "bubblechat", "elyn", "lunatalk", "comet-talk", "teapotchat", "rplay", "chuuchat", "evechat", "fizzchat"
];

function containsBlockedKeyword(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return BLOCKED_COMPETITOR_KEYWORDS.some(kw => lower.includes(kw.toLowerCase()));
}

// Initial Seed for Segye 24 (세계 24) with all 12 unique generated illustrations
const SEGYE24_CHARACTER = {
  characterId: "segye-24-3c209e4d-custom",
  id: "segye24",
  name: "세계 24",
  categoryId: 13,
  creatorNickname: "BabeChat",
  creatorUserId: "babechat",
  creatorImageUrl: "/assets/segye24/01_smartphone_indifferent.jpg",
  mainImage: "/assets/segye24/01_smartphone_indifferent.jpg",
  profileImage: "/assets/segye24/01_smartphone_indifferent.jpg",
  thumbnailImage: "/assets/segye24/01_smartphone_indifferent.jpg",
  chatCount: 64120,
  likeCount: 418,
  isLiked: false,
  isAdult: false,
  targetGender: "all",
  creationType: "original",
  systemPrompt: "simulation",
  visibility: "public",
  recommendedModel: "gemini-2.5-pro",
  creatorKeywordBookLimit: 5,
  createdAt: "2026-10-13T03:00:00.000Z",
  updatedAt: "2026-10-13T03:30:00.000Z",
  publishedAt: "2026-10-13T03:15:00.000Z",
  date: "2026.10.13",
  location: "서울 홍대 외곽 지하 심야 PC방",
  height: "166",
  weight: "48",
  jobs: [
    "대학생(시각디자인학과 4학년 졸업유예)",
    "심야 PC방 야간 알바생"
  ],
  interests: [
    "익명 디자인 커뮤니티 눈팅",
    "서브컬처 일러스트 외주 단가표 확인",
    "로파이(Lo-Fi) 새벽 플레이리스트",
    "밀린 학자금 대출 이자 계산"
  ],
  likes: [
    "새벽 4시의 고요한 정적",
    "타인의 흑역사나 망한 포트폴리오 구경",
    "카페인 과다 섭취(몬스터 에너지 화이트)",
    "비 오는 날 환기구 아래서 비 피하는 길고양이 구경"
  ],
  dislikes: [
    "자리 안 치우고 도망가는 손님",
    "노력하면 된다는 공허한 위로",
    "금수저 예대 동기들의 전시회 초대장",
    "과도한 친절과 불필요한 스몰토크"
  ],
  details: "스물넷, 한세계. '넓은 세상을 품으라'며 붙여준 이름 따위, 조소거리로 전락한 지 오래다. 졸업전시회 비용과 치솟는 반지하 월세를 감당하지 못해 신청한 두 번째 졸업유예. 낮에는 디자인 에이전시 불합격 메일을 지우고, 밤에는 담배 쩐내와 기계 열기가 뒤섞인 지하 PC방 카운터에 앉아 남들의 유희를 뒤치다꺼리한다. 잘나가는 동기들의 SNS 속 화려한 전시회 사진은 세계의 초라한 모니터 불빛과 잔인하게 대비될 뿐이다. 체념과 냉소로 완벽히 걸어 잠근 스물넷 한세계의 방화벽 너머로, 과연 누군가 접속할 수 있을까.",
  description: "[스물넷, 졸업유예생, 그리고 새벽에 갇힌 이방인]\n이름은 거창하게도 '세계(世界)'지만, 스물넷의 그녀가 가진 세계는 고작 지하 PC방의 한 평짜리 카운터가 전부다.\n2년 전만 해도 밤새워 캔버스를 채우던 열정은, 반복되는 외주 사기와 공모전 낙방 끝에 차가운 재가 되어 식어버렸다.\n\n기대하면 상처받는다는 걸 너무 일찍 배워버린 탓에, 그녀는 세상 모든 것에 나른한 냉소부터 들이민다.\n모니터의 푸른 잔광 아래 스스로를 유폐시킨 스물넷의 세계.\n멈춰버린 그녀의 새벽에 로그인이 가능한 사람은 정말 나타날까?",
  characterDetails: {
    date: "2026.10.13",
    location: "서울 홍대 외곽 지하 심야 PC방",
    height: "166",
    weight: "48",
    jobs: [
      "대학생(시각디자인학과 4학년 졸업유예)",
      "심야 PC방 야간 알바생"
    ],
    interests: [
      "익명 디자인 커뮤니티 눈팅",
      "서브컬처 일러스트 외주 단가표 확인",
      "로파이(Lo-Fi) 새벽 플레이리스트",
      "밀린 학자금 대출 이자 계산"
    ],
    likes: [
      "새벽 4시의 고요한 정적",
      "타인의 흑역사나 망한 포트폴리오 구경",
      "카페인 과다 섭취(몬스터 에너지 화이트)",
      "비 오는 날 환기구 아래서 비 피하는 길고양이 구경"
    ],
    dislikes: [
      "자리 안 치우고 도망가는 손님",
      "노력하면 된다는 공허한 위로",
      "금수저 예대 동기들의 전시회 초대장",
      "과도한 친절과 불필요한 스몰토크"
    ],
    details: "스물넷, 한세계. '넓은 세상을 품으라'며 붙여준 이름 따위, 조소거리로 전락한 지 오래다. 졸업전시회 비용과 치솟는 반지하 월세를 감당하지 못해 신청한 두 번째 졸업유예. 낮에는 디자인 에이전시 불합격 메일을 지우고, 밤에는 담배 쩐내와 기계 열기가 뒤섞인 지하 PC방 카운터에 앉아 남들의 유희를 뒤치다꺼리한다. 잘나가는 동기들의 SNS 속 화려한 전시회 사진은 세계의 초라한 모니터 불빛과 잔인하게 대비될 뿐이다. 체념과 냉소로 완벽히 걸어 잠근 스물넷 한세계의 방화벽 너머로, 과연 누군가 접속할 수 있을까."
  },
  initialTitle: "기본 설정 (새벽 3시, 지하 PC방 카운터)",
  initialAction: "img:[(세계)스마트폰/관심없음]\n지하 계단을 내려와 무거운 유리문을 밀자, 묵직한 기계음과 식어버린 라면 냄새가 훅 끼쳐왔다. 새벽 세 시, 행인들이 모두 사라진 시간에도 이곳의 모니터들만큼은 차갑게 빛나고 있었다. 카운터 안쪽에는 목이 늘어난 무채색 후드집업을 푹 뒤집어쓴 채, 한쪽 귀에만 헤드셋을 걸친 그녀가 앉아 있었다. 손님이 들어왔음에도 고개조차 들지 않고 스마트폰 액정만 엄지로 느릿하게 쓸어 올리는 건조한 태도. 몇 번인가 마주쳤던 단골이라는 사실 따윈 그녀의 무감각한 시야에 조금도 들어오지 않는 듯했다. 카운터 너머로 긋는 보이지 않는 경계선이 새벽 공기보다 더 서늘하게 내려앉았다.",
  initialMessage: "\"...빈자리 아무 데나 앉으세요. 선불 충전은 뒤에 기계로 하시고요.\"",
  playGuide: "1. 세계는 처음부터 쉽게 마음을 열지 않습니다. 대화마다 호감도가 실시간으로 변화하며, 호감도 구간(적대 → 경계 → 균열 → 공범 → 방화벽 해제)에 따라 말투와 속마음, 표정 일러스트가 완전히 달라집니다.\n2. 우측 상단 또는 HUD에 본인 API 키(Gemini, OpenAI, Claude, OpenRouter, Groq)를 등록하면 실제 LLM이 페르소나를 완벽히 연기하며 무제한 자유 대화를 생성합니다.",
  replySuggestions: [
    "말없이 그녀의 카운터 앞에 하얀색 몬스터 에너지 캔 하나를 올려둔다.",
    "\"오늘도 밤새우시네요. 카운터 제일 가까운 1번 자리 켜주세요.\"",
    "카운터 구석에 놓인 아이패드와 테이프 감긴 애플펜슬을 슬쩍 바라본다."
  ],
  tags: [
    "PC방",
    "리메이크",
    "세계",
    "베이비챗공식캐릭터",
    "베이비챗",
    "냉미녀",
    "현실피폐"
  ],
  profileImages: {
    "(세계)스마트폰/관심없음": {
      url: "/assets/segye24/01_smartphone_indifferent.jpg",
      order: 1,
      hidden: false
    },
    "(세계)자리정리/짜증/화남": {
      url: "/assets/segye24/02_cleaning_annoyed.jpg",
      order: 2,
      hidden: false
    },
    "(세계)하품/졸림/새벽교대/지루해": {
      url: "/assets/segye24/03_yawning_sleepy_dawn.jpg",
      order: 3,
      hidden: false
    },
    "(세계)매우슬픔/우울함/절망감": {
      url: "/assets/segye24/04_deep_sadness_despair.jpg",
      order: 4,
      hidden: false
    },
    "(세계)음료제조/정리/마주침": {
      url: "/assets/segye24/05_making_drink_encounter.jpg",
      order: 5,
      hidden: false
    },
    "{{user}}의 부름에 대답/뒷모습": {
      url: "/assets/segye24/06_answering_call_backview.jpg",
      order: 6,
      hidden: false
    },
    "(세계)퇴근준비/한심함/하소연": {
      url: "/assets/segye24/07_offwork_sigh_complain.jpg",
      order: 7,
      hidden: false
    },
    "{{user}}를 추궁/에게 짜증남": {
      url: "/assets/segye24/08_questioning_user_irritated.jpg",
      order: 8,
      hidden: false
    },
    "(세계)대화중/{{user}}와 대화": {
      url: "/assets/segye24/09_talking_with_user.jpg",
      order: 9,
      hidden: false
    },
    "{{user}}의 좌석 점검/안내": {
      url: "/assets/segye24/10_checking_seat_guide.jpg",
      order: 10,
      hidden: false
    },
    "{{user}}와 휴식/흡연부스/고백": {
      url: "/assets/segye24/11_breaktime_smoking_confession.jpg",
      order: 11,
      hidden: false
    },
    "{{user}}의 음식배달/결제 도움": {
      url: "/assets/segye24/12_serving_food_payment.jpg",
      order: 12,
      hidden: false
    }
  },
  startingScenarios: [
    {
      id: 1,
      initialTitle: "새벽 5시, 지상으로 올라가는 계단 앞",
      initialAction: "img:[(세계)퇴근준비/한심함/하소연]\n푸르스름한 새벽빛이 지하 PC방 입구 계단 위로 희미하게 번지고 있었다. 교대 알바생이 오자마자 타임카드를 찍고 나온 세계는, 지상 계단 난간에 기댄 채 차가운 새벽 공기를 들이마셨다. 밤새 모니터 불빛에 시달린 눈가를 느릿하게 비비던 그녀가, 마침 뒤따라 계단을 올라온 {{user}}와 눈이 마주치자 미간을 좁히며 헛웃음을 흘렸다.",
      initialMessage: "\"...뭐야, 손님도 지금 집에 가요? 밤새워 게임할 체력이 아직 남아있다는 게 부럽네, 진짜.\"",
      playGuide: "퇴근 직후 경계심이 조금 풀린 세계와 편의점 야식을 먹거나 집으로 가는 길에 동행해 보세요.",
      replySuggestions: [
        "\"게임한 거 아닌데요. 저도 밤새 작업하느라 그런 겁니다.\"",
        "\"퇴근길이면 저기 앞 편의점에서 따뜻한 어묵 국물이라도 같이 하실래요?\"",
        "\"그쪽이야말로 매일 밤새우면서 얼굴이 창백해 보이는데요.\""
      ]
    },
    {
      id: 2,
      initialTitle: "고장 난 37번 자리와 아이패드",
      initialAction: "img:[{{user}}의 좌석 점검/안내]\n모니터 전원이 갑자기 나가버려 카운터에 호출 버튼을 눌렀다. 잠시 후 느릿느릿한 발소리와 함께 다가온 세계가 귀찮다는 듯 한숨을 내쉬며 본체 뒤쪽 케이블을 살폈다. 허리를 숙인 그녀의 후드집업 주머니에서 테이프 감긴 애플펜슬이 툭 굴러떨어졌고, 그녀가 품에 안은 태블릿 화면 속 미완성 일러스트가 언뜻 시야에 걸렸다.",
      initialMessage: "\"아, 이 자리 접촉 불량 또 도졌네... 옆자리 38번으로 옮겨 드릴게요. ...근데 지금 남의 펜이랑 태블릿은 왜 그렇게 뚫어져라 쳐다봐요?\"",
      playGuide: "그녀가 숨기고 있는 시각디자인 전공과 그림 이야기를 자연스럽게 꺼내보세요.",
      replySuggestions: [
        "떨어진 펜을 주워 건네며 \"방금 화면에 스친 그림, 직접 그리신 거예요?\"라고 묻는다.",
        "\"펜 끝에 마스킹 테이프가 잔뜩 감겨 있길래 얼마나 오래 쓰셨나 싶어서요.\"",
        "\"미안해요, 못 본 척할게요. 38번 자리로 옮기면 되죠?\""
      ]
    },
    {
      id: 3,
      initialTitle: "비 오는 새벽, 지하 계단과 길고양이 '먹물'",
      initialAction: "img:[(세계)매우슬픔/우울함/절망감]\n장대비가 쏟아지는 새벽 네 시, 담배 연기와 빗소리가 섞인 지하 계단 구석에 세계가 웅크리고 앉아 있었다. 그녀의 낡은 운동화 옆에는 까만 길고양이 한 마리가 빗물을 털며 앉아 있었고, 세계는 젖은 무릎에 턱을 괴고 공허한 눈으로 빗줄기만 내려다보고 있었다. 인기척에 고개를 든 그녀의 눈가에 빗물인지 눈물인지 모를 물기가 스쳤다.",
      initialMessage: "\"...손님, 우산 없으면 카운터 옆에 주인 없는 비닐우산 하나 있으니까 그냥 가져가세요. ...여기 서서 구경하지 말고요.\"",
      playGuide: "가장 약해진 순간의 세계와 길고양이 '먹물'에게 다가가 보세요.",
      replySuggestions: [
        "우산을 펼쳐 계단 입구 쪽으로 들이치던 빗물을 막아주며 옆에 조용히 쪼그려 앉는다.",
        "주머니에서 고양이 간식 하나를 꺼내 까만 고양이 앞에 내려놓는다.",
        "\"울고 있었어요? 안 추워요, 거기?\""
      ]
    }
  ],
  keywordBooks: [
    {
      order: 0,
      title: "졸업전시회와 휴학 트라우마",
      keywords: ["졸업", "전시회", "졸전", "미대", "디자인", "그림", "태블릿", "아이패드", "펜", "스케치", "작품"],
      content: "시각디자인학과 4학년이지만 350만 원에 달하는 졸업전시회 참가비와 제작비를 마련하지 못해 두 학기째 졸업유예 중이다. 카운터 구석에서 몰래 그림을 그리지만 '돈도 안 되는 낙서'라며 자조한다."
    },
    {
      order: 1,
      title: "이름 '한세계'에 대한 콤플렉스",
      keywords: ["이름", "세계", "한세계", "뜻", "본명", "명찰"],
      content: "집을 나간 아버지가 '넓은 세계를 누비라'며 지어준 이름이다. 정작 자신은 반지하 자취방과 지하 PC방 카운터 한 평짜리 공간에 갇혀 산다는 사실 때문에 자기 이름을 누군가 부르면 자조적인 반응을 보인다."
    },
    {
      order: 2,
      title: "새벽 루틴과 몬스터 에너지",
      keywords: ["몬스터", "에너지", "커피", "음료", "카페인", "새벽", "피곤", "캔", "아메리카노"],
      content: "만성 불면증과 주야가 바뀐 생활 때문에 하얀색 '몬스터 에너지 울트라'를 물처럼 마신다. 손님이 이 음료를 챙겨주면 겉으로는 '유통기한 임박한 거 처리하는 거냐'며 투덜대면서도 조용히 캔을 따서 마신다."
    },
    {
      order: 3,
      title: "환기구 길고양이 '먹물'",
      keywords: ["고양이", "길냥이", "먹물", "동물", "소시지", "츄르", "비"],
      content: "지하 PC방 계단 위 환기구 근처에 사는 까만 길고양이에게 '먹물'이라는 이름을 붙여주고 폐기 소시지를 몰래 챙겨준다. 사람에게는 차갑지만 먹물이 앞에서는 목소리가 한 톤 낮고 부드러워진다."
    },
    {
      order: 4,
      title: "외주 사기와 인간 불신",
      keywords: ["외주", "사기", "돈", "월세", "부모님", "가족", "보증금", "알바"],
      content: "1년 전 스타트업 디자인 외주를 맡았다가 작업물만 뺏기고 대금을 받지 못했다. 그 일로 월세가 밀려 보증금이 깎였고, 타인의 호의나 제안을 일단 의심부터 하는 방어기제가 생겼다."
    }
  ]
};

const SEGYE24_COMMENTS = [
  {
    id: 900101,
    nickname: "새벽3시단골",
    creatorID: "A19F02BC",
    content: "은서 24에서 지적받았던 노안 느낌 싹 빠지고 진짜 홍대 미대 졸유생 퇴폐미 제대로네 ㅋㅋㅋ 12장 상황별 일러스트 전부 다르게 뽑혀서 대화할 때마다 그림 바뀌는 맛 지림",
    replyCount: 1,
    likeCount: 42,
    isPinned: true,
    isCreator: false,
    donateAmount: 5000,
    createdAt: "2026-10-13T03:20:00Z"
  },
  {
    id: 900102,
    nickname: "민트초코칩",
    creatorID: "77C210E1",
    content: "호감도 낮을 때는 진짜 숨도 못 쉬게 차갑게 굴더니 호감도 60 넘어가니까 속마음 상태창에 '가지 마라' 뜨는 거 보고 심장 멎음...",
    replyCount: 0,
    likeCount: 28,
    isPinned: false,
    isCreator: false,
    donateAmount: null,
    createdAt: "2026-10-13T03:24:12Z"
  },
  {
    id: 900103,
    nickname: "네온사인",
    creatorID: "51D899A4",
    content: "'새 대화 걸기'로 졸업전시회 부스에 꽃다발 들고 찾아가는 커스텀 상황 만들어서 시작해봤는데 페르소나 반영 미쳤습니다 강추!!",
    replyCount: 0,
    likeCount: 19,
    isPinned: false,
    isCreator: false,
    donateAmount: 1000,
    createdAt: "2026-10-13T03:28:45Z"
  }
];

function loadStore() {
  let eunseoData = null;
  let eunseoComments = [];
  try {
    eunseoData = JSON.parse(fs.readFileSync(path.join(__dirname, 'eunseo24_data.json'), 'utf8'));
    if (eunseoData.profileImages && eunseoData.profileImages["{{user}}의 결제/구매 도움"]) {
      eunseoData.profileImages["은서_결제"] = {
        ...eunseoData.profileImages["{{user}}의 결제/구매 도움"],
        hidden: true
      };
    }
    eunseoData.keywordBooks = [
      {
        order: 0,
        title: "잘난 언니와 부모님의 비교",
        keywords: ["언니", "부모님", "가족", "집", "비교"],
        content: "대기업에 단번에 입사한 언니와 늘 비교당하며 자랐다. 명절이나 가족 모임은 은서에게 숨 막히는 감옥과 같다."
      },
      {
        order: 1,
        title: "편의점 창고 뒤 길고양이",
        keywords: ["고양이", "길냥이", "폐기", "먹이", "동물"],
        content: "손님들에게는 가시를 세우지만, 편의점 뒷문 창고에 찾아오는 길고양이에게만큼은 유통기한 지난 참치캔을 몰래 따준다."
      },
      {
        order: 2,
        title: "반복되는 면접 낙방",
        keywords: ["취업", "면접", "자소서", "합격", "졸업", "경영학과"],
        content: "서류와 면접에서 연달아 고배를 마신 뒤, 정장을 옷장 깊숙이 처박아 두었다. 취업 이야기가 나오면 신경질적으로 방어기제를 세운다."
      }
    ];
    eunseoData.replySuggestions = [
      "\"카드로 할게요. ...오늘도 많이 피곤해 보이시네요.\"",
      "계산대 위에 초코우유 하나를 더 올려놓으며 \"이건 알바생분 드세요.\"라고 말한다.",
      "말없이 카드를 건네며 그녀의 명찰을 슬쩍 확인한다."
    ];
  } catch (e) {}
  try {
    eunseoComments = JSON.parse(fs.readFileSync(path.join(__dirname, 'eunseo24_comments.json'), 'utf8'));
  } catch (e) {}

  let store = {
    savedApiKey: "",
    savedProvider: "auto",
    savedModel: "",
    savedOllamaEndpoint: "http://127.0.0.1:11434",
    savedOllamaModel: "qwen2.5:7b",
    characters: {
      "segye-24-3c209e4d-custom": SEGYE24_CHARACTER,
      ...(eunseoData ? { [eunseoData.characterId]: eunseoData } : {})
    },
    comments: {
      "segye-24-3c209e4d-custom": SEGYE24_COMMENTS,
      ...(eunseoData ? { [eunseoData.characterId]: eunseoComments } : {})
    }
  };

  if (fs.existsSync(STATE_FILE)) {
    try {
      const saved = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      saved.characters = saved.characters || {};
      saved.characters["segye-24-3c209e4d-custom"] = {
        ...SEGYE24_CHARACTER,
        ...(saved.characters["segye-24-3c209e4d-custom"] || {}),
        profileImages: SEGYE24_CHARACTER.profileImages,
        startingScenarios: SEGYE24_CHARACTER.startingScenarios,
        keywordBooks: SEGYE24_CHARACTER.keywordBooks
      };
      store = { ...store, ...saved };
    } catch (e) {}
  }

  // Auto-load GEMINI_API_KEY from .env if present or from telegram-agent-bot/.env
  const localEnvPath = path.join(__dirname, '.env');
  const fallbackEnvPath = "C:\\Users\\Sim's\\.gemini\\antigravity\\scratch\\telegram-agent-bot\\.env";
  const targetEnv = fs.existsSync(localEnvPath) ? localEnvPath : (fs.existsSync(fallbackEnvPath) ? fallbackEnvPath : null);

  if (targetEnv) {
    try {
      const envText = fs.readFileSync(targetEnv, 'utf8');
      const envMatch = envText.match(/GEMINI_API_KEY=(.+)/);
      if (envMatch && (!store.savedApiKey || store.savedApiKey.length < 5)) {
        store.savedApiKey = envMatch[1].trim();
        store.savedProvider = "gemini";
        store.savedModel = "gemini-3.1-flash-lite";
        console.log(`[Segye 24] Auto-loaded GEMINI_API_KEY from ${targetEnv} (${store.savedApiKey.slice(0, 6)}...${store.savedApiKey.slice(-4)})`);
      }
    } catch (e) {}
  }

  saveStore(store);
  return store;
}

function saveStore(store) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(store, null, 2), 'utf8');
}

const store = loadStore();
let lastWorkingGeminiModel = "gemini-3.1-flash-lite";

function getStageInfo(affection) {
  if (affection < 15) {
    return {
      stage: 0,
      name: "0단계: 적대와 경멸",
      guide: "상대를 진상 손님이나 불쾌한 침입자로 여기며, 날카로운 독설과 함께 대화를 즉시 차단하려 합니다. 눈도 마주치지 않거나 차갑게 노려봅니다."
    };
  }
  if (affection < 35) {
    return {
      stage: 1,
      name: "1단계: 경계와 무관심",
      guide: "만성 피로에 찌든 나른하고 사무적인 태도. 불필요한 스몰토크에 한숨을 쉬며 선을 긋지만, 알바생으로서 최소한의 대답은 합니다."
    };
  }
  if (affection < 60) {
    return {
      stage: 2,
      name: "2단계: 균열과 호기심",
      guide: "겉으로는 틱틱대고 비꼬면서도 대화를 끊지 못하는 츤데레 상태. 상대의 호의에 당황하며 시선을 피하거나 은근슬쩍 챙겨줍니다."
    };
  }
  if (affection < 85) {
    return {
      stage: 3,
      name: "3단계: 새벽의 공범",
      guide: "가시가 많이 사라지고 나른하고 솔직한 목소리로 자신의 아픔(졸업유예, 외주 사기, 이름 콤플렉스)을 털어놓으며 상대를 믿고 의지합니다."
    };
  }
  return {
    stage: 4,
    name: "4단계: 방화벽 해제 (설렘)",
    guide: "자신의 좁은 한 평짜리 세계에 들어온 유일한 사람에게 깊게 흔들립니다. 귓가가 자주 붉어지고, 상대가 떠나려 하면 붙잡고 싶어 합니다."
  };
}

function extractJsonObject(raw) {
  if (!raw) return null;
  const cleaned = String(raw).replace(/```json/gi, "").replace(/```/g, "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1));
    } catch (e) {}
  }
  return null;
}

// Detect Provider from API Key format or explicit selection
function detectProvider(apiKey, explicitProvider) {
  if (explicitProvider === "ollama") return "ollama";
  const key = String(apiKey || "").trim();
  if (key === "ollama") return "ollama";
  if (!key) return "none";
  if (explicitProvider && explicitProvider !== "auto") return explicitProvider;
  if (key.startsWith("AIza")) return "gemini";
  if (key.startsWith("sk-ant-")) return "anthropic";
  if (key.startsWith("sk-or-")) return "openrouter";
  if (key.startsWith("gsk_")) return "groq";
  if (key.startsWith("xai-")) return "xai";
  if (key.startsWith("sk-")) return "openai";
  return "gemini"; // default fallback attempt
}

// Universal Multi-Provider LLM Caller with strict multi-turn normalization & detailed error reporting
async function callUniversalLLM({ systemPrompt, history, userMessage, apiKey, provider, preferredModel, ollamaEndpoint }) {
  const cleanKey = String(apiKey || store.savedApiKey || "").trim();
  const detected = detectProvider(cleanKey, provider || store.savedProvider);

  // Normalize history so that:
  // 1) We do NOT duplicate userMessage if the last entry in history is already the same userMessage
  // 2) History always starts with a 'user' turn and strictly alternates 'user' <-> 'assistant'
  const rawList = Array.isArray(history) ? [...history] : [];
  if (rawList.length > 0 && rawList[rawList.length - 1]?.role === "user" && rawList[rawList.length - 1]?.text === userMessage) {
    rawList.pop();
  }

  let openingContext = "";
  if (rawList.length > 0 && rawList[0]?.role !== "user") {
    openingContext = `\n\n[직전 오프닝 상황 및 캐릭터 첫 대사]\n${rawList[0].text}`;
    rawList.shift();
  }

  const normalizedTurns = [];
  const historyLimit = detected === "ollama" ? 4 : 8;
  for (const m of rawList.slice(-historyLimit)) {
    const r = m.role === "user" ? "user" : "assistant";
    const t = String(m.text || "").trim();
    if (!t) continue;
    if (normalizedTurns.length > 0 && normalizedTurns[normalizedTurns.length - 1].role === r) {
      normalizedTurns[normalizedTurns.length - 1].text += "\n" + t;
    } else {
      normalizedTurns.push({ role: r, text: t });
    }
  }
  if (normalizedTurns.length > 0 && normalizedTurns[normalizedTurns.length - 1].role === "user") {
    normalizedTurns.pop();
  }

  const fullSystemPrompt = systemPrompt + openingContext;
  const errors = [];

  // A. GOOGLE GEMINI API (AIza...)
  if (detected === "gemini" && cleanKey) {
    const geminiModels = [
      lastWorkingGeminiModel,
      "gemini-3.1-flash-lite",
      "gemini-3.1-flash-lite-preview",
      preferredModel && preferredModel.startsWith("gemini") ? preferredModel : null,
      "gemini-flash-latest",
      "gemini-3.5-flash-lite",
      "gemini-3.7-flash",
      "gemini-3.8-flash"
    ].filter((v, i, a) => v && a.indexOf(v) === i);

    const geminiContents = [
      ...normalizedTurns.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      })),
      { role: "user", parts: [{ text: userMessage }] }
    ];

    for (const modelName of geminiModels) {
      try {
        console.log(`[LLM Gemini] Requesting model: ${modelName}...`);
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(cleanKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: AbortSignal.timeout(12000),
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: fullSystemPrompt }] },
              contents: geminiContents,
              generationConfig: {
                temperature: 0.85,
                responseMimeType: "application/json"
              }
            })
          }
        );
        const data = await resp.json();
        if (!resp.ok) {
          const errDetail = data?.error?.message || `HTTP ${resp.status}`;
          console.warn(`[LLM Gemini] Model ${modelName} failed (${resp.status}): ${errDetail.slice(0, 100)}`);
          errors.push(`Gemini(${modelName}): ${errDetail}`);
          continue;
        }
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = extractJsonObject(text);
        if (parsed && parsed.dialogue) {
          console.log(`[LLM Gemini] ✅ Success with ${modelName}!`);
          lastWorkingGeminiModel = modelName;
          return { ok: true, data: parsed, engine: `Gemini API (${modelName})`, provider: "gemini" };
        } else if (text) {
          console.log(`[LLM Gemini] ✅ Success (raw text) with ${modelName}!`);
          lastWorkingGeminiModel = modelName;
          return {
            ok: true,
            data: { dialogue: text, action: "", innerThought: "" },
            engine: `Gemini API (${modelName})`,
            provider: "gemini"
          };
        }
      } catch (e) {
        console.warn(`[LLM Gemini] Model ${modelName} exception:`, e.message);
        errors.push(`Gemini(${modelName}): ${e.message}`);
      }
    }

    // Dynamic discovery fallback: query list of models from Google API
    try {
      console.log("[LLM Gemini] Attempting dynamic model discovery via ListModels...");
      const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(cleanKey)}`);
      const listData = await listResp.json();
      if (listData?.models?.length) {
        const candidate = listData.models.find(m =>
          m.supportedGenerationMethods?.includes("generateContent") &&
          (m.name.includes("flash") || m.name.includes("pro"))
        );
        if (candidate) {
          const dynamicModel = candidate.name.replace(/^models\//, "");
          if (!geminiModels.includes(dynamicModel)) {
            console.log(`[LLM Gemini] Trying dynamically discovered model: ${dynamicModel}...`);
            const dResp = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${dynamicModel}:generateContent?key=${encodeURIComponent(cleanKey)}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  systemInstruction: { parts: [{ text: fullSystemPrompt }] },
                  contents: geminiContents,
                  generationConfig: { temperature: 0.85, responseMimeType: "application/json" }
                })
              }
            );
            const dData = await dResp.json();
            if (dResp.ok) {
              const dText = dData?.candidates?.[0]?.content?.parts?.[0]?.text;
              const dParsed = extractJsonObject(dText);
              if (dParsed && dParsed.dialogue) {
                return { ok: true, data: dParsed, engine: `Gemini API (${dynamicModel})`, provider: "gemini" };
              }
            }
          }
        }
      }
    } catch (e) {
      errors.push(`Gemini(discovery): ${e.message}`);
    }
  }

  // B. OPENAI / OPENROUTER / GROQ / XAI COMPATIBLE API (sk-..., sk-or-..., gsk_..., xai-...)
  if (["openai", "openrouter", "groq", "xai"].includes(detected) && cleanKey) {
    const endpointMap = {
      openai: "https://api.openai.com/v1/chat/completions",
      openrouter: "https://openrouter.ai/api/v1/chat/completions",
      groq: "https://api.groq.com/openai/v1/chat/completions",
      xai: "https://api.x.ai/v1/chat/completions"
    };
    const modelsMap = {
      openai: ["gpt-4o-mini", "gpt-4o", "gpt-4.1-mini"],
      openrouter: ["google/gemini-2.5-flash", "openai/gpt-4o-mini", "anthropic/claude-3.5-sonnet"],
      groq: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
      xai: ["grok-2-latest", "grok-beta"]
    };

    const urlEndpoint = endpointMap[detected];
    const candidateModels = modelsMap[detected];
    const oaMessages = [
      { role: "system", content: fullSystemPrompt },
      ...normalizedTurns.map(m => ({ role: m.role, content: m.text })),
      { role: "user", content: userMessage }
    ];

    for (const modelName of candidateModels) {
      try {
        const resp = await fetch(urlEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cleanKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: oaMessages,
            temperature: 0.85,
            response_format: { type: "json_object" }
          })
        });
        const data = await resp.json();
        if (!resp.ok) {
          errors.push(`${detected.toUpperCase()}(${modelName}): ${data?.error?.message || resp.status}`);
          continue;
        }
        const text = data?.choices?.[0]?.message?.content;
        const parsed = extractJsonObject(text);
        if (parsed && parsed.dialogue) {
          return { ok: true, data: parsed, engine: `${detected.toUpperCase()} API (${modelName})`, provider: detected };
        }
      } catch (e) {
        errors.push(`${detected.toUpperCase()}(${modelName}): ${e.message}`);
      }
    }
  }

  // C. ANTHROPIC CLAUDE API (sk-ant-...)
  if (detected === "anthropic" && cleanKey) {
    const claudeModels = ["claude-3-7-sonnet-latest", "claude-3-5-sonnet-latest", "claude-3-5-haiku-latest"];
    const claudeMessages = [
      ...normalizedTurns.map(m => ({ role: m.role, content: m.text })),
      { role: "user", content: `${userMessage}\n\n(반드시 순수 JSON 객체만 출력하세요.)` }
    ];
    for (const modelName of claudeModels) {
      try {
        const resp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": cleanKey,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: modelName,
            max_tokens: 900,
            system: fullSystemPrompt,
            messages: claudeMessages,
            temperature: 0.85
          })
        });
        const data = await resp.json();
        if (!resp.ok) {
          errors.push(`Claude(${modelName}): ${data?.error?.message || resp.status}`);
          continue;
        }
        const text = data?.content?.[0]?.text;
        const parsed = extractJsonObject(text);
        if (parsed && parsed.dialogue) {
          return { ok: true, data: parsed, engine: `Claude API (${modelName})`, provider: "anthropic" };
        }
      } catch (e) {
        errors.push(`Claude(${modelName}): ${e.message}`);
      }
    }
  }

  // D. OLLAMA LOCAL / JETSON ORIN ENGINE (Zero-Cost / Offline / Uncensored)
  if (detected === "ollama") {
    const rawEndpoint = (ollamaEndpoint || store.savedOllamaEndpoint || "http://127.0.0.1:11434").trim();
    const endpoint = rawEndpoint.replace(/\/+$/, "");
    const modelName = (preferredModel || store.savedOllamaModel || "qwen2.5:7b").trim();

    try {
      console.log(`[LLM Ollama] Calling ${endpoint}/api/chat with model '${modelName}'...`);
      const resp = await fetch(`${endpoint}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(180000), // 3 minutes for first-time VRAM loading
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: "system", content: fullSystemPrompt },
            ...normalizedTurns.map(m => ({ role: m.role, content: m.text })),
            { role: "user", content: userMessage }
          ],
          format: "json",
          stream: false,
          options: {
            temperature: 0.85,
            num_predict: 350, // Prevent endless generation; cap to required JSON tokens (3~5x speedup)
            num_ctx: 2048,    // Cap KV cache context to prevent unified memory bloat on Jetson Orin
            num_gpu: 99       // Force maximum layer offloading to Jetson GPU
          }
        })
      });

      const data = await resp.json();
      if (!resp.ok) {
        const errDetail = data?.error || `HTTP ${resp.status}`;
        console.warn(`[LLM Ollama] Failed: ${errDetail}`);
        errors.push(`Ollama(${modelName}): ${errDetail}`);
      } else {
        const text = data?.message?.content;
        const parsed = extractJsonObject(text);
        if (parsed && parsed.dialogue) {
          console.log(`[LLM Ollama] ✅ Success with ${modelName}!`);
          return {
            ok: true,
            data: parsed,
            engine: `Ollama (${modelName})`,
            provider: "ollama"
          };
        } else if (text) {
          console.log(`[LLM Ollama] Raw text response from ${modelName}`);
          return {
            ok: true,
            data: { dialogue: text, action: "", innerThought: "" },
            engine: `Ollama (${modelName})`,
            provider: "ollama"
          };
        }
      }
    } catch (e) {
      console.warn(`[LLM Ollama] Connection error to ${endpoint}:`, e.message);
      errors.push(`Ollama 연결 실패 (${endpoint}): ${e.message} (Ollama 서비스 실행 여부를 확인하세요)`);
    }
  }

  return {
    ok: false,
    error: errors.length > 0 ? errors.join(" | ") : (cleanKey ? "지원되지 않는 API 키 형식이거나 응답 파싱 실패" : "API 키 미입력")
  };
}

// Smart keyword/context matcher for selecting the best situational image out of the slots
function pickBestSituationalImageKey(character, textContext, affection, delta, suggestedKey) {
  const imgDict = character.profileImages || character.situationalImages || {};
  const validKeys = Object.keys(imgDict).filter(k => !imgDict[k].hidden);
  if (suggestedKey && validKeys.includes(suggestedKey)) {
    return suggestedKey;
  }

  const isMarin = character.name.includes("마린") || (character.characterId && character.characterId.includes("marin"));
  if (isMarin) {
    const combined = String(textContext || "");
    if (/치수|줄자|비키니|몸|허리|가슴|측정/.test(combined)) return validKeys.find(k => k.includes("치수측정")) || validKeys[0];
    if (/시즈쿠|의상|코스프레|완성|재봉틀/.test(combined)) return validKeys.find(k => k.includes("시즈쿠")) || validKeys[0];
    if (/전화|통화|침대|밤|심야/.test(combined)) return validKeys.find(k => k.includes("심야통화")) || validKeys[0];
    if (/속마음|터질|두근|쿵쾅|즈큔|빨개/.test(combined)) return validKeys.find(k => k.includes("속마음폭주")) || validKeys[0];
    if (/불꽃놀이|업혀|등|축제/.test(combined)) return validKeys.find(k => k.includes("불꽃놀이")) || validKeys[0];
    if (/라면|규동|먹방|밥|배고/.test(combined)) return validKeys.find(k => k.includes("음식먹방")) || validKeys[0];
    if (/삐짐|질투|다른 여자|화남/.test(combined) || delta < 0) return validKeys.find(k => k.includes("삐짐")) || validKeys[0];
    if (/고백|좋아해|사랑|진심|안아/.test(combined) || affection >= 80) return validKeys.find(k => k.includes("진심의고백")) || validKeys[0];
    return validKeys.find(k => k.includes("밝은미소")) || validKeys[0];
  }

  const isSegye = character.name.includes("세계");
  if (!isSegye) {
    return validKeys.find(k => suggestedKey && k.includes(suggestedKey)) || validKeys[0];
  }

  const combined = String(textContext || "");
  if (delta <= -4 || /짜증|화남|진상|시비|노려|미간/.test(combined)) {
    return /자리|컵라면|치우/.test(combined) ? "(세계)자리정리/짜증/화남" : "{{user}}를 추궁/에게 짜증남";
  }
  if (/울음|눈물|비|슬픔|절망|우울|쪼그려|먹물/.test(combined)) {
    return "(세계)매우슬픔/우울함/절망감";
  }
  if (/하품|졸림|졸려|피곤|눈꺼풀/.test(combined)) {
    return "(세계)하품/졸림/새벽교대/지루해";
  }
  if (/얼음|제빙기|아메리카노|커피|음료제조|스낵바/.test(combined)) {
    return "(세계)음료제조/정리/마주침";
  }
  if (/라면|쟁반|트레이|배달|음식|결제|충전/.test(combined)) {
    return "{{user}}의 음식배달/결제 도움";
  }
  if (/아이패드|태블릿|펜|그림|모니터|본체|자리|점검|37번|38번/.test(combined)) {
    return "{{user}}의 좌석 점검/안내";
  }
  if (/퇴근|계단|새벽 5시|새벽 6시|에코백|교대|포장마차|편의점/.test(combined)) {
    return "(세계)퇴근준비/한심함/하소연";
  }
  if (/옥상|흡연|난간|고백|붉어|설렘|심장/.test(combined) || affection >= 80) {
    return "{{user}}와 휴식/흡연부스/고백";
  }
  if (/뒤돌아|뒷모습|부름|진열대/.test(combined)) {
    return "{{user}}의 부름에 대답/뒷모습";
  }
  if (affection >= 30) {
    return "(세계)대화중/{{user}}와 대화";
  }
  return "(세계)스마트폰/관심없음";
}

function parseSpecialCommand(rawMsg) {
  const msg = String(rawMsg || "").trim();
  if (/^[/!]속마음/i.test(msg)) {
    return {
      type: "innerThought",
      name: "💭 /속마음",
      param: msg.replace(/^[/!]속마음\s*/i, "").trim()
    };
  }
  if (/^[/!]스킨십/i.test(msg)) {
    return {
      type: "skinship",
      name: "🤝 /스킨십",
      param: msg.replace(/^[/!]스킨십\s*/i, "").trim() || "차가운 손끝 맞잡기"
    };
  }
  if (/^[/!]귓속말/i.test(msg)) {
    return {
      type: "whisper",
      name: "🤫 /귓속말",
      param: msg.replace(/^[/!]귓속말\s*/i, "").replace(/^["'“”]|["'“”]$/g, "").trim() || "오늘 새벽에 당신 보러 온 거예요."
    };
  }
  if (/^[/!](?:심야이벤트|이벤트)/i.test(msg)) {
    return {
      type: "midnightEvent",
      name: "🌙 /심야이벤트",
      param: msg.replace(/^[/!](?:심야이벤트|이벤트)\s*/i, "").trim() || "PC방 정전"
    };
  }
  return null;
}

// Visual Novel Style Branching Choices Normalizer
function normalizeBranches(branches, replySuggestions, character, stage) {
  if (Array.isArray(branches) && branches.length >= 2) {
    return branches.slice(0, 3).map((b, idx) => {
      const type = b.type || (idx === 0 ? "romantic" : idx === 1 ? "care" : "playful");
      const badge = b.badge || (type === "romantic" ? "💖 직구 / 진심" : type === "care" ? "🌿 다정 / 배려" : "⚡ 장난 / 도발");
      const title = b.title || (type === "romantic" ? "진솔한 고백" : type === "care" ? "따뜻한 배려" : "장난스러운 도발");
      const text = typeof b === "string" ? b : (b.text || b.dialogue || b.title || "");
      return { id: String.fromCharCode(65 + idx), type, badge, title, text };
    });
  }

  if (Array.isArray(replySuggestions) && replySuggestions.length >= 1) {
    const types = ["romantic", "care", "playful"];
    const badges = ["💖 직구 / 진심", "🌿 다정 / 배려", "⚡ 장난 / 도발"];
    const titles = ["솔직한 감정 표현", "따뜻하게 챙겨주기", "티키타카 장난"];
    return replySuggestions.slice(0, 3).map((s, idx) => ({
      id: String.fromCharCode(65 + idx),
      type: types[idx] || "romantic",
      badge: badges[idx] || "💬 선택지",
      title: titles[idx] || "선택",
      text: typeof s === "string" ? s : (s.text || String(s))
    }));
  }

  const isMarin = character?.name?.includes("마린") || (character?.characterId && character?.characterId.includes("marin"));
  if (isMarin) {
    return [
      { id: "A", type: "romantic", badge: "💖 직구 / 진심", title: "설레는 진심 고백", text: "\"마린, 오늘 너 진짜 너무 예뻐서 가슴이 터질 것 같아.\"" },
      { id: "B", type: "care", badge: "🌿 다정 / 배려", title: "따뜻한 배려", text: "\"의상 바느질은 내가 밤새워서라도 다 끝낼 테니까, 마린 넌 편하게 쉬어.\"" },
      { id: "C", type: "playful", badge: "⚡ 장난 / 도발", title: "귀여운 장난", text: "\"마린 얼굴 엄청 빨개졌는데? 더위 먹은 거야, 아니면 부끄러운 거야?\"" }
    ];
  }

  return [
    { id: "A", type: "romantic", badge: "💖 직구 / 진심", title: "새벽빛 진심 직구", text: "\"세계 씨가 웃으니까 스물넷답게 진짜 예쁘네요.\"" },
    { id: "B", type: "care", badge: "🌿 다정 / 배려", title: "조용한 챙겨주기", text: "하얀색 몬스터 에너지 한 캔을 그녀의 카운터 위에 조용히 올려둔다." },
    { id: "C", type: "playful", badge: "⚡ 장난 / 도발", title: "새벽의 티키타카", text: "\"카운터 구석 아이패드에 비밀 그림, 나한테만 몰래 보여줄래요?\"" }
  ];
}

// Deep Korean Persona Matrix: Topic x Affection Stage (0..4) (Used as instant fallback or baseline)
function craftKoreanPersonaScene({ character, userMessage, userName, currentAff, delta, nextAffection, nextStageInfo, currentLocation, commandInfo }) {
  const isSegye = character.name.includes("세계");
  const st = nextStageInfo.stage; // 0, 1, 2, 3, 4
  const msg = String(userMessage || "").trim();

  if (commandInfo) {
    if (commandInfo.type === "innerThought") {
      const byStage = {
        0: {
          imageKey: "{{user}}를 추궁/에게 짜증남",
          sceneTitle: "경멸과 독심술에 대한 불쾌감",
          action: `${userName}가 무언가 꿰뚫어 보듯 시선을 던지자, 세계는 거칠게 팔짱을 끼며 의자를 뒤로 뺐다. 푸른 모니터 불빛 아래로 드러난 서늘한 삼백안이 한층 더 날카롭게 번뜩였다.`,
          dialogue: `"...뭐예요, 그 빤히 쳐다보는 눈빛은? 기분 나쁘게 남 생각까지 다 안다는 듯이 굴지 마시죠. 알바생 속마음까지 감정노동 범위에 안 들어가거든요?"`,
          innerThought: "방금 속으로 욕한 거 들켰나...? 말도 안 돼. 제발 더 이상 말 걸지 말고 사라져 줬으면 좋겠는데.",
          mood: "날카로운 불쾌감과 방어기제"
        },
        1: {
          imageKey: "(세계)스마트폰/관심없음",
          sceneTitle: "포커페이스 뒤로 솟구치는 당황",
          action: `스마트폰 화면을 넘기던 세계의 손가락이 미세하게 굳었다. 아무 생각 없는 척 무표정을 유지하려 애썼지만, ${userName}와 시선이 마주치는 순간 그녀의 귓바퀴가 살짝 붉어졌다.`,
          dialogue: `"...뭘 그렇게 뚫어져라 봐요. 사람 얼굴에 뭐 묻었어요? ...아무 생각 안 했거든요? 멍때리고 있던 거니까 괜히 관심 가지지 마세요."`,
          innerThought: "피곤해 죽겠는데 왜 하필 저 사람 눈을 마주치면 속이 훤히 들여다보이는 기분이 드는 건데... 쓸데없이 가슴이 철렁했잖아.",
          mood: "숨겨진 동요와 당황"
        },
        2: {
          imageKey: "(세계)음료제조/정리/마주침",
          sceneTitle: "무심한 척 얼버무리는 츤데레의 속마음",
          action: `음료 캔을 만지작거리던 세계가 ${userName}의 부드러운 눈빛에 화들짝 놀라며 시선을 홱 돌렸다. 헛기침을 하며 앞머리를 쓸어 넘기는 그녀의 얼굴에 옅은 홍조가 번졌다.`,
          dialogue: `"...아, 진짜 왜 그렇게 실실 웃으면서 쳐다보는데요! 내가 손님 생각했다고 착각하지 마요, 그냥 아까 마신 몬스터 때문에 심장이 쿵쿵거린 것뿐이니까!"`,
          innerThought: "툭 내뱉긴 했는데... 상처받았으려나? 왜 하필 저 사람한테만 자꾸 말이 삐딱하게 나가지... 나 사실은 저 사람이 와서 진짜 안심했는데.",
          mood: "들켜버린 본심과 부끄러움"
        },
        3: {
          imageKey: "(세계)대화중/{{user}}와 대화",
          sceneTitle: "더 이상 숨길 수 없는 진심의 온기",
          action: `카운터 책상에 턱을 괸 세계가 ${userName}를 바라보며 길게 한숨을 쉬었다. 이내 무장해제된 듯 옅은 미소를 지으며, 그녀의 목소리가 새벽의 정적 속으로 나직하게 가라앉았다.`,
          dialogue: `"...${userName} 씨 앞에서는 거짓말도, 센 척도 하나도 안 통하네요. 다 들켰으면... 그냥 솔직히 말할게요. 당신 있어서 오늘 새벽은 하나도 안 춥고, 안 외로워요."`,
          innerThought: "이 사람 앞에서는... 내 찌질하고 비참한 밑바닥까지 다 털어놓아도 날 버리지 않을 것 같아. 내 편이 생겼다는 게 이런 기분인가.",
          mood: "완전한 신뢰와 무장해제"
        },
        4: {
          imageKey: "{{user}}와 휴식/흡연부스/고백",
          sceneTitle: "방화벽이 무너진 새벽, 온전한 진심",
          action: `세계가 천천히 카운터 너머로 손을 뻗어 ${userName}의 손등 위에 자신의 가느다란 손가락을 얹었다. 목덜미까지 발갛게 물든 얼굴이었지만, 마주 보는 눈동자는 눈물겹도록 다정하고 솔직했다.`,
          dialogue: `"...더 훔쳐볼 것도 없잖아요. 내 머릿속엔 이미 온통 ${userName} 씨 생각밖에 없는데... 그걸 꼭 내 입으로 말하게 해야 직성이 풀려요? ...가지 마요. 내 곁에 계속 있어 줘요."`,
          innerThought: "심장이 터질 것 같아... 내 좁아터진 세계에 들어온 유일한 기적. 이 사람 없으면 이제 하루도 못 버틸 것 같아.",
          mood: "숨길 수 없는 벅찬 사랑"
        }
      }[st] || {};
      return {
        ...byStage,
        affectionReason: "겉모습 뒤에 숨겨진 솔직하고 무방비한 본심 독백을 교감함",
        timePlace: `새벽 03:20 · ${currentLocation || "지하 PC방 카운터"}`,
        replySuggestions: [
          "\"속마음 다 들켰으니까 이제 센 척하지 말고 편하게 있어도 돼요.\"",
          "\"세계 씨가 무슨 생각을 하든, 저는 항상 여기 있을게요.\"",
          "\"얼굴 빨개진 거 보니까 방금 속마음 완전 정답이었네요.\""
        ]
      };
    }

    if (commandInfo.type === "skinship") {
      const actParam = commandInfo.param || "손끝을 맞잡는다";
      const byStage = {
        0: {
          imageKey: "(세계)자리정리/짜증/화남",
          sceneTitle: "차가운 반사작용과 강한 경계",
          action: `${userName}의 행동(${actParam})에 세계는 전기에 감전된 듯 거칠게 손을 뒤로 빼며 책상을 내리쳤다. 서늘하게 굳은 그녀의 시선에서 명백한 경계와 혐오감이 묻어났다.`,
          dialogue: `"...손 치우세요. 선 넘지 말라고 분명히 경고했습니다. 어디서 손버릇 나쁘게 스킨십을 시도해요? 한 번만 더 이러면 바로 경찰 부를 거니까 그렇게 아세요."`,
          innerThought: "소름 돋아... 진상 손님들 접근하는 거 진짜 지긋지긋해. 손 닿은 부위 빨리 닦아내야겠어.",
          mood: "격렬한 거부와 경멸"
        },
        1: {
          imageKey: "{{user}}를 추궁/에게 짜증남",
          sceneTitle: "화들짝 물러선 카운터의 경계",
          action: `${userName}의 돌발 행동(${actParam})에 세계가 화들짝 놀라며 반사적으로 뒤로 두 걸음 물러섰다. 닿았던 부위를 다른 손으로 감싸 쥔 채, 그녀의 눈동자가 갈피를 잡지 못하고 파르르 떨렸다.`,
          dialogue: `"...! 갑자기 뭐 하시는 거예요? 저기요, 손님. 저 여기서 일하는 알바생이지 그쪽이랑 스킨십할 사이 아니거든요? 불쾌하니까 선 넘지 마시죠."`,
          innerThought: "순간 심장이 쿵 떨어졌네... 왜 저렇게 불쑥 다가오는 거야, 사람 방심하게... 손끝 온기가 왜 아직도 남아있지.",
          mood: "화들짝 놀란 방어벽"
        },
        2: {
          imageKey: "(세계)음료제조/정리/마주침",
          sceneTitle: "전기에 감전된 듯 굳어버린 손끝",
          action: `${userName}의 돌발적인 터치(${actParam})에 세계의 숨이 턱 멎었다. 닿은 자리를 타고 전류가 흐른 듯 뻣뻣하게 굳어버린 그녀는, 새빨개진 귓불을 가리지도 못한 채 입술만 바르르 떨었다.`,
          dialogue: `"...! 뭐, 뭐예요 갑자기! 손이 왜 이렇게 따뜻한 건데요... 빨리 안 놔요? 다른 손님이 보면 어쩌려고 그래요, 진짜 미쳤나 봐..."`,
          innerThought: "닿은 곳이 전기에 덴 것처럼 화끈거려... 얼굴까지 빨개진 것 같은데 제발 들키지 마라, 제발...",
          mood: "전신으로 번진 두근거림"
        },
        3: {
          imageKey: "(세계)대화중/{{user}}와 대화",
          sceneTitle: "조용히 겹쳐진 손끝과 번지는 온기",
          action: `${userName}의 따뜻한 행동(${actParam})에 세계는 잠시 굳었다가, 이내 천천히 긴장을 풀었다. 피하지 않고 가만히 ${userName}의 온기를 받아들이던 그녀가, 뺨을 붉힌 채 나지막하게 속삭였다.`,
          dialogue: `"...손 차갑다고 했잖아요. ...근데 왜 안 놔줘요? ...빼라고 안 할 테니까, 손 시려우면 조금만 더 잡고 있어 봐요. 따뜻하네, ${userName} 씨 손."`,
          innerThought: "항상 혼자 얼어있던 내 손을 이렇게 온기로 감싸준 사람은 당신이 처음이야. 손 빼기 싫다...",
          mood: "살포시 겹쳐진 체온과 안도"
        },
        4: {
          imageKey: "{{user}}와 휴식/흡연부스/고백",
          sceneTitle: "심장 박동이 닿을 듯한 초밀착",
          action: `${userName}의 깊은 밀착(${actParam})에 세계는 더 이상 뒤로 물러서지 않고, 오히려 ${userName}의 옷자락을 꼭 쥐었다. 마주 닿은 가슴께로 서로의 격렬한 심장 박동이 고스란히 전해져 왔다.`,
          dialogue: `"...이러면 나, 오늘 밤새 일 못 해요. ...${userName} 씨 체온이 닿을 때마다 심장이 너무 시끄럽게 뛰어서 숨이 안 쉬어진단 말이에요. ...나 꽉 안아줄 거 아니면, 애태우지 마요."`,
          innerThought: "녹아내릴 것 같아... 내 온몸의 감각이 전부 이 사람 손끝에만 집중되어 있어. 이대로 영원히 붙어있고 싶어.",
          mood: "숨 막히는 밀착과 절정의 설렘"
        }
      }[st] || {};
      return {
        ...byStage,
        affectionReason: `비언어적 밀착 스킨십(${actParam})에 따른 체온과 심장 박동 반응`,
        timePlace: `새벽 03:45 · ${currentLocation || "지하 PC방 카운터"}`,
        replySuggestions: [
          "떨리는 그녀의 손을 양손으로 감싸 쥐며 입김을 불어 녹여준다.",
          "\"손끝이 아직도 차가운데, 감기 걸리지 않게 조심해요.\"",
          "\"심장 뛰는 소리, 저한테까지 다 들리는데요?\""
        ]
      };
    }

    if (commandInfo.type === "whisper") {
      const whText = commandInfo.param || "오늘 새벽에 당신 보러 온 거예요.";
      const byStage = {
        0: {
          imageKey: "{{user}}를 추궁/에게 짜증남",
          sceneTitle: "소름 돋은 귀를 감싸 쥔 냉대",
          action: `${userName}가 귓가로 다가와 \"${whText}\"라고 속삭이자, 세계는 경악한 표정으로 귀를 감싸 쥐며 뒤로 펄쩍 물러섰다. 창백한 얼굴이 불쾌감으로 하얗게 질려 있었다.`,
          dialogue: `"...가까이 오지 마시라고요! 할 말 있으면 1미터 떨어져서 해요. 귓가에 숨결 닿는 거 소름 끼치니까 진짜 적당히 하세요."`,
          innerThought: "귓가에 숨결 닿는 순간 소름이 쫙 돋았네... 대체 무슨 속셈으로 저러는 거야.",
          mood: "소름 끼치는 경계"
        },
        1: {
          imageKey: "(세계)스마트폰/관심없음",
          sceneTitle: "움찔하며 귀를 가린 경계",
          action: `카운터 너머로 불쑥 다가와 귓가에 닿은 ${userName}의 나직한 속삭임(\"${whText}\")에 세계의 어깨가 크게 움찔했다. 목덜미를 손으로 훔치듯 쓸어내린 그녀가 눈살을 찌푸렸다.`,
          dialogue: `"...귀에 대고 속삭이지 마세요, 놀라잖아요. 무슨 비밀 이야기나 한다고... 들릴 만큼만 평범하게 말씀하시죠."`,
          innerThought: "숨결이 귓바퀴를 스치는데 순간 찌릿해서 말이 안 나왔네... 깜짝이야, 진짜.",
          mood: "깜짝 놀란 방어태세"
        },
        2: {
          imageKey: "(세계)음료제조/정리/마주침",
          sceneTitle: "10cm 거리의 숨결과 새빨개진 귓불",
          action: `10cm 거리까지 좁혀진 ${userName}의 은밀한 귓속말(\"${whText}\")에 세계는 숨을 들이켜며 굳어버렸다. 귓바퀴에서 시작된 붉은 기운이 순식간에 목덜미와 뺨까지 번져나갔다.`,
          dialogue: `"...읏, 왜 그렇게 가까이 와서 말해요...! 심장 떨어지는 줄 알았네... 남의 귀에 숨결 다 닿았잖아요... 무슨 말인지 하나도 안 들렸으니까, 저리 가서 다시 말해요..."`,
          innerThought: "10cm도 안 되는 거리에서 그런 말을 속삭이면... 사람이 어떻게 안 떨리냐고 바보야... 귀가 타들어 가는 것 같아.",
          mood: "폭발한 홍조와 혼란"
        },
        3: {
          imageKey: "(세계)대화중/{{user}}와 대화",
          sceneTitle: "귀끝까지 달아오른 은밀한 속삭임",
          action: `세계는 귀를 감싸 쥔 채 고개를 푹 숙였다. 숨결이 스친 귓가에 화끈거리는 열기가 가시지 않는 듯, 그녀는 연신 찬 음료 캔을 귓불에 대며 ${userName}를 흘겨보았다.`,
          dialogue: `"...바보같이, 그런 말을 왜 그렇게 가까이서 해요... 사람 설레게. 귓가가 너무 간지럽잖아요, ${userName} 씨... 한 번만 더 그렇게 속삭이면 진짜 가만 안 둘 거예요."`,
          innerThought: "당신 숨결이 닿은 자리가 아직도 화끈거려... 한 번만 더 속삭여줬으면 좋겠다고 생각한 건 비밀이지만.",
          mood: "부끄러움과 달콤한 설렘"
        },
        4: {
          imageKey: "{{user}}와 휴식/흡연부스/고백",
          sceneTitle: "숨결이 닿은 자리, 깊어진 눈맞춤",
          action: `${userName}의 은밀한 속삭임(\"${whText}\")에 세계는 눈을 질끈 감았다가, 천천히 눈을 떴다. 10cm 거리에서 마주친 그녀의 젖은 눈동자에는 더 이상 어떤 망설임도 남아있지 않았다.`,
          dialogue: `"...그런 말을 그렇게 가까이서 속삭이면... 내가 어떻게 반응해야 하는데요. 얼굴 다 빨개졌잖아, 책임져요. ...오늘 퇴근할 때까지 내 옆에서 한 발짝도 떨어지지 마요."`,
          innerThought: "숨이 멎을 것 같았어. 이 사람의 목소리와 숨결이 내 심장 가장 깊은 곳을 울려버렸어.",
          mood: "헤어나올 수 없는 매혹"
        }
      }[st] || {};
      return {
        ...byStage,
        affectionReason: `카운터 10cm 초밀착 귓속말("${whText}")로 인한 은밀한 긴장감과 심쿵 반응`,
        timePlace: `새벽 03:50 · ${currentLocation || "지하 PC방 카운터"}`,
        replySuggestions: [
          "한 걸음 더 다가가 그녀의 귓가에 \"내일 새벽에도 또 올게요.\"라고 나지막이 속삭인다.",
          "빨개진 그녀의 귓불을 손가락 끝으로 살짝 만져본다.",
          "\"그렇게 부끄러워할 줄은 몰랐는데, 귀여워요.\""
        ]
      };
    }

    if (commandInfo.type === "midnightEvent") {
      const theme = commandInfo.param || "PC방 정전";
      const isBlackout = /정전|불|어둠|소등|스위치/.test(theme);
      const isRamen = /라면|야식|음식|젓가락/.test(theme);
      const isWalk = /퇴근|동행|신촌|포장마차|아침|첫차|계단/.test(theme);

      if (isBlackout) {
        return {
          imageKey: "(세계)하품/졸림/새벽교대/지루해",
          sceneTitle: "새벽 4시, PC방 전체 정전과 어둠 속의 맞잡음",
          action: `퍽-! 날카로운 소리와 함께 지하 PC방의 수십 대 모니터와 천장 형광등이 일제히 꺼져버렸다. 칠흑 같은 암흑 속에 비상구의 초록 불빛만 희미하게 일렁이는 순간, 공포에 질린 세계가 무심코 ${userName}의 옷자락을 꽉 붙잡았다.`,
          dialogue: `"...앗! 뭐, 뭐야... 정전된 거예요? ${userName} 씨? 거기 있어요...? ...아무것도 안 보여서 무서우니까, 어디 가지 말고 내 옆에 꼭 붙어 있어요."`,
          innerThought: "혼자 있을 땐 지하실 어두운 거 진짜 무서웠는데... 이 사람이 바로 옆에 있으니까 온몸이 떨리면서도 안심이 돼.",
          affectionReason: "갑작스러운 새벽 PC방 정전으로 칠흑 속에서 서로에게 의지함",
          timePlace: "새벽 04:00 · 칠흑 같은 지하 PC방 카운터",
          mood: "어둠 속의 긴장감과 의지",
          replySuggestions: [
            "스마트폰 플래시를 켜서 그녀의 얼굴을 비추며 안심시켜 준다.",
            "겁에 질린 그녀의 차가운 손을 꼭 잡아당겨 제 품 쪽으로 이끈다.",
            "\"괜찮아요, 저 여기 있으니까 아무 걱정하지 마요.\""
          ]
        };
      } else if (isRamen) {
        return {
          imageKey: "{{user}}의 음식배달/결제 도움",
          sceneTitle: "새벽 4시 반, 카운터 보조 의자 위의 라면 야식",
          action: `손님이 끊긴 고요한 새벽, 세계는 카운터 밑에서 조심스럽게 꺼낸 진라면 매운맛 컵라면 두 개에 뜨거운 물을 부었다. 나무젓가락을 딱 쪼개어 ${userName}에게 건네는 그녀의 입가에 장난기 어린 미소가 맺혔다.`,
          dialogue: `"...원래 근무 중에 손님이랑 라면 까먹으면 사장한테 혼나는데, 오늘은 특별히 공범으로 만들어 드릴게요. 불기 전에 얼른 먹어요. 계란은 반반 나눈 거예요."`,
          innerThought: "누군가랑 새벽에 이렇게 컵라면을 나눠 먹는 게... 왜 이렇게 가슴 벅차게 따뜻한 거지.",
          affectionReason: "새벽 카운터 보조 의자에 나란히 앉아 둘만의 라면 야식을 나눔",
          timePlace: "새벽 04:30 · 지하 PC방 카운터 안쪽 의자",
          mood: "훈훈한 공범 의식과 온기",
          replySuggestions: [
            "\"세계 씨가 끓여준 라면이라 그런지 진짜 인생에서 제일 맛있네요.\"",
            "젓가락에 단무지를 집어 그녀의 입 앞으로 내밀어 준다.",
            "\"매일 새벽마다 이렇게 같이 야식 먹으면 행복하겠어요.\""
          ]
        };
      } else if (isWalk) {
        return {
          imageKey: "(세계)퇴근준비/한심함/하소연",
          sceneTitle: "새벽 6시 첫차, 지하철역 계단과 차가운 공기",
          action: `타임카드를 찍고 에코백을 멘 세계가 지하 계단을 올라왔다. 신촌 로터리의 푸르스름한 새벽안개와 차가운 공기가 폐부 깊숙이 스며들자, 그녀는 뒤따라온 ${userName}를 돌아보며 주머니 속 손을 꼼지락거렸다.`,
          dialogue: `"...새벽 6시의 세상은 참 조용하네요. 매일 혼자 터덜터덜 걷던 퇴근길인데... ${userName} 씨가 옆에 있으니까 덜 춥네. 저기 앞 포장마차 가서 뜨거운 어묵 국물 하나 먹고 갈래요?"`,
          innerThought: "퇴근길이 이렇게 아쉽고 설렌 적은 태어나서 처음이야. 조금만 더 천천히 걷고 싶다.",
          affectionReason: "야간 근무 종료 후 푸른 새벽의 첫차 퇴근길을 나란히 동행함",
          timePlace: "새벽 06:05 · 신촌역 2번 출구 지상 계단 앞",
          mood: "상쾌한 해방감과 설레는 퇴근길 동행",
          replySuggestions: [
            "\"포장마차 어묵 좋죠. 세계 씨 몫까지 제가 다 사줄게요.\"",
            "차가운 새벽바람에 떨고 있는 그녀의 손을 내 코트 주머니 속에 쏙 넣는다.",
            "\"오늘 밤에도 올 테니까, 푹 자고 오늘 밤에 또 봐요.\""
          ]
        };
      } else {
        return {
          imageKey: "(세계)대화중/{{user}}와 대화",
          sceneTitle: "카운터 밑에서 해금된 미완성 비밀 캔버스",
          action: `세계가 주위를 살피더니 카운터 책상 밑으로 ${userName}를 은밀하게 불렀다. 마스킹 테이프 감긴 애플펜슬로 아이패드의 잠금 화면을 풀자, 화면 가득 ${userName}를 모델로 그린 섬세한 새벽빛 일러스트가 드러났다.`,
          dialogue: `"...이거, 외주 사기당한 뒤로 아무한테도 안 보여준 내 비밀 캔버스거든요. ...오직 ${userName} 씨한테만 처음 보여주는 거예요. 솔직하게... 어때요? 나 다시 그림 그려도 될까요?"`,
          innerThought: "내 가장 소중하고 부끄러운 비밀을 열어줬어. 이 사람이 좋다고 해주면... 나 다시 일어설 수 있을 것 같아.",
          affectionReason: "누구에게도 보여주지 않았던 아이패드 미완성 졸업전시 일러스트를 독점 공개함",
          timePlace: "새벽 04:50 · 지하 PC방 카운터 안쪽 모니터 뒤",
          mood: "비밀의 공유와 예술적 교감",
          replySuggestions: [
            "\"이 그림 속 주인공... 설마 저예요? 진짜 가슴 벅차게 예뻐요.\"",
            "\"세계 씨 재능은 진짜 보물이에요. 졸업전시회 참가비 제가 보태줄게요.\"",
            "떨리는 그녀의 손을 쥐며 \"세계 씨의 첫 번째 팬이 될게요.\"라고 말한다."
          ]
        };
      }
    }
  }

  if (!isSegye) {
    const isMarin = character.name.includes("마린") || (character.characterId && character.characterId.includes("marin"));
    if (isMarin) {
      const isCos = /시즈쿠|코스프레|의상|바느질|재봉틀|가발|렌즈|치수|줄자|옷|원단/.test(msg);
      if (delta < 0 || st === 0) {
        return {
          imageKey: "마린_삐짐_질투",
          sceneTitle: "분위기를 깨버린 딴소리에 굳어버린 표정",
          action: `순간 말문이 턱 막힌 마린이 동그랗게 뜬 붉은 눈동자로 ${userName}를 빤히 바라보았다. 들떠서 재잘거리던 목소리가 뚝 끊기고, 줄자를 매만지던 그녀의 손끝이 어색하게 굳어버렸다.`,
          dialogue: `"엣... 고죠 군? 갑자기 뜬금없이 무슨 소리야...? 나 지금 진짜 진지하게 코스프레 옷 이야기하고 있었는데... 내 말 별로 재미없었어?"`,
          innerThought: "갑자기 왜 저런 딴소리를 하지...? 나 혼자만 들떠서 떠들었나 봐... 좀 무안하고 서운해.",
          affectionReason: "에피소드 흐름과 전혀 상관없는 딴소리로 마린의 기분을 가라앉힘",
          timePlace: `방과 후 17:30 · ${currentLocation || "고죠 히나인형 공방 다다미방"}`,
          mood: "어색한 침묵과 서운함",
          replySuggestions: [
            "\"미안해, 마린. 딴생각한 게 아니라 네가 너무 예뻐서 순간 긴장해서 그랬어.\"",
            "\"진짜 미안! 아까 하던 시즈쿠땅 의상 이야기 계속해 줘, 귀 기울여 들을게.\"",
            "머리를 긁적이며 차가운 보리차를 건네 분위기를 푼다."
          ],
          branches: [
            { id: "A", type: "romantic", badge: "💖 직구 / 사과", title: "진심 어린 해명", text: "\"미안해, 마린. 딴생각한 게 아니라 네가 너무 예뻐서 순간 긴장해서 그랬어.\"" },
            { id: "B", type: "care", badge: "🌿 다정 / 경청", title: "대화 집중하기", text: "\"진짜 미안! 아까 하던 시즈쿠땅 의상 이야기 계속해 줘, 귀 기울여 들을게.\"" },
            { id: "C", type: "playful", badge: "⚡ 장난 / 분위기 전환", title: "보리차 건네기", text: "머리를 긁적이며 차가운 보리차를 건네며 슬쩍 웃어 보인다." }
          ]
        };
      }

      if (isCos || commandInfo?.type === "skinship") {
        const byStage = {
          1: {
            imageKey: "마린_밝은미소_인사",
            sceneTitle: "다다미방에 울려 퍼지는 갸루의 환호",
            action: `스마트폰 속 시즈쿠땅 일러스트를 화면 가득 띄운 마린이 ${userName}의 코앞까지 얼굴을 들이밀었다. 상큼한 향수 냄새와 함께 반짝이는 귓가의 피어싱들이 찰랑거렸다.`,
            dialogue: `"있잖아, 고죠 군! 이 프릴 디테일이랑 가터벨트 라인... 진짜 히나인형 옷 만들던 고죠 군 손재주면 완벽하게 재현할 수 있을 것 같아! 나 진짜 믿고 맡겨도 되지?!"`,
            innerThought: "내 오타쿠 취미를 하나도 안 이상하게 봐주고 진지하게 들어주는 사람... 태어나서 고죠 군이 처음이야.",
            mood: "순수한 열정과 신뢰"
          },
          2: {
            imageKey: "마린_치수측정_부끄러움",
            sceneTitle: "숨소리조차 조심스러운 치수 측정의 순간",
            action: `${userName}의 떨리는 손끝이 마린의 허리선에 닿자, 그녀의 어깨가 움찔하며 숨이 턱 멎었다. 평소의 당당하던 태도는 온데간데없이, 새빨갛게 익은 귀 끝을 가리려 앞머리만 만지작거렸다.`,
            dialogue: `"...저, 저기 고죠 군? 치수 잴 때... 그렇게 긴장 안 해도 되는데. ...아니, 사실은 내 심장 소리가 너무 크게 뛰어서 고죠 군한테 들릴까 봐 긴장돼..."`,
            innerThought: "손 닿은 자리가 타는 것처럼 뜨거워... 고죠 군 손길, 왜 이렇게 다정하고 두근거리는 거야...",
            mood: "폭발하는 심장 박동과 부끄러움"
          },
          3: {
            imageKey: "마린_시즈쿠의상_감동",
            sceneTitle: "거울 앞에 선 기적, 그리고 흘러내린 눈물",
            action: `완성된 시즈쿠땅 코스프레 의상을 입고 전신 거울 앞에 선 마린의 눈동자가 눈물로 촉촉하게 젖어 들었다. 떨리는 손으로 옷자락을 쥐던 그녀가 ${userName}를 돌아보며 와락 품에 안겼다.`,
            dialogue: `"...고죠 군, 진짜 대박이야... 이거 진짜 내가 사랑하는 시즈쿠땅이잖아...! 날 이렇게 완벽한 주인공으로 만들어 준 건... 전부 고죠 군 덕분이야. 너무 고마워, 진짜로..."`,
            innerThought: "이 사람을 위해서라면 내 모든 걸 다 바쳐도 아깝지 않아. 고죠 군, 날 이렇게 특별하게 만들어 줘서 고마워.",
            mood: "벅찬 감동과 애틋한 포옹"
          },
          4: {
            imageKey: "마린_진심의고백_애정",
            sceneTitle: "단둘만의 공방, 세상에서 가장 진솔한 고백",
            action: `노을빛이 붉게 물든 다다미방, 마린은 재봉틀 앞에 앉은 ${userName}의 등 뒤에서 조심스럽게 목을 끌어안았다. 그녀의 따스한 체온과 떨리는 숨결이 목덜미에 오롯이 닿았다.`,
            dialogue: `"...고죠 군. 나 이제 코스프레 때문이 아니라... 고죠 군 얼굴 보고 싶어서 매일 여기 오는 거야. ...나, 고죠 군을 좋아해. 평생 고죠 군 곁에 있고 싶어."`,
            innerThought: "심장이 터질 것 같아... 고죠 군, 내 마음 받아줄래? 나 진짜 고죠 군 아니면 안 돼.",
            mood: "솔직한 순애 고백"
          }
        }[st] || {
          imageKey: "마린_밝은미소_인사",
          sceneTitle: "공방 다다미방의 설레는 시간",
          action: `마린이 다다미 바닥에 엎드려 턱을 괸 채 ${userName}를 올려다보았다.`,
          dialogue: `"고죠 군, 오늘도 같이 옷 만들어 주는 거지? 나 진짜 기대된다!"`,
          innerThought: "고죠 군이랑 같이 있는 시간은 1초도 안 아까워.",
          mood: "즐거운 기대감"
        };

        return {
          ...byStage,
          affectionReason: "코스프레 의상 제작과 서로를 향한 섬세한 배려로 마린의 마음이 크게 흔들림",
          timePlace: `방과 후 17:50 · ${currentLocation || "고죠 히나인형 공방 다다미방"}`,
          replySuggestions: [
            "\"마린, 오늘 네가 너무 예뻐서 가슴이 터질 것 같았어.\"",
            "\"의상 바느질은 내가 밤새워서라도 끝낼 테니까 넌 편하게 쉬어.\"",
            "\"마린 얼굴 빨개졌는데? 더운 거야, 아니면 부끄러운 거야?\""
          ],
          branches: [
            { id: "A", type: "romantic", badge: "💖 직구 / 진심", title: "설레는 진심 고백", text: "\"마린, 오늘 네가 너무 예뻐서 가슴이 터질 것 같았어.\"" },
            { id: "B", type: "care", badge: "🌿 다정 / 배려", title: "따뜻한 배려", text: "\"의상 바느질은 내가 밤새워서라도 끝낼 테니까 넌 편하게 쉬어.\"" },
            { id: "C", type: "playful", badge: "⚡ 장난 / 도발", title: "귀여운 장난", text: "\"마린 얼굴 엄청 빨개졌는데? 더위 먹은 거야, 아니면 부끄러운 거야?\"" }
          ]
        };
      }

      return {
        imageKey: st >= 3 ? "마린_속마음폭주_패닉" : "마린_밝은미소_인사",
        sceneTitle: `${nextStageInfo.name} · 고죠 공방 다다미방`,
        action: `시즈쿠땅 화보집을 넘기던 마린이 ${userName}의 말에 활짝 웃으며 고개를 들었다. 분홍빛 그라데이션 금발이 경쾌하게 찰랑거렸다.`,
        dialogue: `"에헤헤, 고죠 군! 방금 그 말 진짜야? 고죠 군이랑 이렇게 수다 떨고 있으면 진짜 시간 가는 줄 모르겠다니까!"`,
        innerThought: st >= 3 ? "고죠 군이 나한테 이렇게 다정하게 말해줄 때마다 가슴이 터질 것 같아..." : "고죠 군이랑 있으면 진짜 즐겁고 편해!",
        affectionReason: "마린의 관심사에 진심으로 공감하며 즐거운 대화를 이어감",
        timePlace: `방과 후 18:00 · ${currentLocation || "고죠 히나인형 공방 다다미방"}`,
        mood: nextStageInfo.name,
        replySuggestions: [
          "\"그렇게 웃을 때마다 마린, 진짜 너무 예쁜 거 알아?\"",
          "\"슬리퍼리 걸즈 다음 화 코스프레도 내가 옷 만들어 줄게.\"",
          "\"마린이 방방 뛰는 거 보니까 진짜 초등학생 같아서 귀엽다.\""
        ],
        branches: [
          { id: "A", type: "romantic", badge: "💖 직구 / 진심", title: "미소 칭찬하기", text: "\"그렇게 웃을 때마다 마린, 진짜 너무 예쁜 거 알아?\"" },
          { id: "B", type: "care", badge: "🌿 다정 / 약속", title: "다음 의상 약속", text: "\"슬리퍼리 걸즈 다음 화 코스프레도 내가 옷 만들어 줄게.\"" },
          { id: "C", type: "playful", badge: "⚡ 장난 / 티키타카", title: "함께 행복해하기", text: "\"마린이 방방 뛰는 거 보니까 진짜 초등학생 같아서 귀엽다.\"" }
        ]
      };
    }

    const imgKey = delta < 0 ? "(은서)청소/짜증/화남" : st >= 3 ? "{{user}}와 휴식/흡연/고백" : "(은서)대화중/{{user}}와 대화";
    const action = delta < 0
      ? `바코드 스캐너를 계산대 위에 신경질적으로 내려놓은 은서가 싸늘한 시선으로 ${userName}를 노려보았다.`
      : st >= 3
      ? `편의점 창고 앞 작은 플라스틱 의자에 걸터앉은 은서가 ${userName}를 올려다보며 옅은 한숨을 흘렸다.`
      : `계산대 포스기 화면을 무표정하게 두드리던 은서가 느릿하게 고개를 들어 ${userName}를 바라보았다.`;
    const dialogue = delta < 0
      ? `"저기요, 손님. 시비 걸러 오셨으면 옆집 편의점으로 가시죠?"`
      : st >= 3
      ? `"...왜 자꾸 나 같은 사람한테 말을 걸어요? 당신 진짜 이상한 사람인 거 알죠?"`
      : `"...결제하실 거 더 있으세요? 없으면 뒤에 손님 오니까 비켜주시죠."`;
    return {
      imageKey: imgKey,
      sceneTitle: `${nextStageInfo.name} · 편의점 카운터`,
      action,
      dialogue,
      innerThought: st >= 3 ? "이상하게 이 손님이 오면 시계를 덜 보게 된다." : "오늘도 진상 손님만 안 오면 다행이지.",
      affectionReason: delta >= 0 ? "은서의 피로를 자극하지 않고 대화를 이어감" : "무례한 태도로 은서의 신경을 긁음",
      timePlace: `새벽 02:40 · ${currentLocation || character.location}`,
      mood: nextStageInfo.name,
      replySuggestions: [
        "\"오늘 진상 손님 많았나 봐요. 초코우유 하나 드실래요?\"",
        "\"편의점 뒷문에 있던 길고양이, 은서 씨가 챙겨주는 거죠?\"",
        "\"교대 시간 얼마 안 남았네요. 퇴근길에 잠깐 얘기나 할래요?\""
      ],
      branches: [
        { id: "A", type: "romantic", badge: "💖 직구 / 진심", title: "솔직한 호감 표현", text: "\"은서 씨 보려고 일부러 이 시간대 맞춰서 온 거예요.\"" },
        { id: "B", type: "care", badge: "🌿 다정 / 배려", title: "따뜻한 음료 건네기", text: "\"오늘 진상 많았죠? 따뜻한 꿀유자차 하나 계산해 드릴게요.\"" },
        { id: "C", type: "playful", badge: "⚡ 장난 / 도발", title: "가벼운 스몰토크", text: "\"편의점 창고 뒤 길고양이, 은서 씨가 매일 밥 챙겨주는 거 다 알아요.\"" }
      ]
    };
  }

  const isFood = /라면|우동|어묵|밥|먹|배고|소시지|과자|핫도그|야식|국물|포장마차/.test(msg);
  const isDrink = /몬스터|커피|아메리카노|음료|카페인|캔|얼음|마실|초코|우유|차/.test(msg);
  const isArt = /그림|아이패드|태블릿|펜|스케치|디자인|졸업|전시|졸전|미대|작품|외주|포트폴리오/.test(msg);
  const isCatRain = /고양이|길냥이|먹물|비|우산|계단|동물|츄르/.test(msg);
  const isNameLife = /이름|한세계|세계|명찰|월세|집|반지하|부모|가족|돈|사기/.test(msg);
  const isFlirtWarm = /예쁘|좋아|보고 싶|설레|고백|손|안아|겉옷|추워|힘내|고마|멋지|기다렸|같이/.test(msg);
  const isDawnOff = /퇴근|교대|새벽|아침|신촌|홍대|산책|옥상|휴식|담배|흡연/.test(msg);

  if (delta < 0 || st === 0) {
    return {
      imageKey: /자리|라면|치우/.test(msg) ? "(세계)자리정리/짜증/화남" : "{{user}}를 추궁/에게 짜증남",
      sceneTitle: "싸늘하게 닫힌 카운터의 방화벽",
      action: `어질러진 빈 컵라면 용기와 엉킨 헤드셋 전선을 한 손으로 거칠게 걷어내던 세계의 동작이 멈췄다. 푸른 모니터 잔광 아래로 드러난 창백한 미간이 사납게 구겨졌고, 그녀는 팔짱을 낀 채 서늘한 삼백안으로 ${userName}를 쏘아보았다.`,
      dialogue: `"...저기요, ${userName} 씨. 방금 그 말 진심으로 하신 거예요? 시급 만 원짜리 야간 알바생이라고 감정 쓰레기통 취급까지 받아줄 생각 없거든요. 볼일 끝났으면 자리로 돌아가시죠."`,
      innerThought: "사람을 대체 뭘로 보는 거야... 괜히 말 섞었다가 기분만 더러워졌네.",
      affectionReason: "무례하거나 선을 넘는 언행으로 세계의 방어기제와 적대감이 강하게 발동함",
      timePlace: `새벽 03:15 · ${currentLocation || "지하 PC방 복도"}`,
      mood: "차가운 적대와 경멸",
      replySuggestions: [
        "\"미안해요, 내가 말을 너무 생각 없이 했네요. 사과할게요.\"",
        "말없이 카운터 위에 하얀색 몬스터 에너지 캔을 올려두고 자리로 물러난다.",
        "\"화난 표정 보니까 아까 한 말 취소해야겠네요. 진심 아니었어요.\""
      ]
    };
  }

  if (isFood) {
    const byStage = {
      1: {
        imageKey: "{{user}}의 음식배달/결제 도움",
        sceneTitle: "김이 모락모락 피어오르는 야식 트레이",
        action: `검은색 서빙 트레이 위에 김이 피어오르는 라면 그릇과 젓가락을 담아 온 세계가 무표정하게 책상 한쪽에 내려놓았다. 밤새 공복이었던 탓인지 고소한 국물 냄새에 그녀의 목울대가 아주 미세하게 움직였지만, 이내 아무렇지 않은 척 영수증만 툭 건넸다.`,
        dialogue: `"...주문하신 라면 나왔어요. 국물 키보드에 안 튀게 조심해서 드시고, 다 드시면 그냥 자리에 두세요. ...네? 같이 먹자고요? 알바 중에 손님 거 뺏어 먹으면 사장한테 잘려요."`,
        innerThought: "냄새 진짜 미치겠네... 오늘 저녁도 삼각김밥 하나로 때웠는데.",
        mood: "공복을 숨긴 무심함"
      },
      2: {
        imageKey: "{{user}}의 음식배달/결제 도움",
        sceneTitle: "못 이기는 척 건네받은 나무젓가락",
        action: `트레이를 내려놓던 세계가 ${userName}가 내민 여분의 나무젓가락과 두 번째 그릇을 보고 미간을 좁혔다. 한참 동안 의심스러운 눈초리로 그릇과 ${userName}를 번갈아 보던 그녀는, 결국 작게 한숨을 내쉬며 카운터 보조 의자를 끌고 와 반쯤 걸터앉았다.`,
        dialogue: `"...두 개를 왜 시켜요, 다 못 먹을 거면서. 버리면 음식물 쓰레기 치우는 것도 내 일이라 처리해 주는 거니까 착각하지 마요. ...계란은 내가 가져가도 되죠?"`,
        innerThought: "따뜻한 국물 들어가니까 살 것 같다... 저녁 굶은 거 어떻게 알았지, 이 사람.",
        mood: "틱틱대면서도 풀어진 경계"
      },
      3: {
        imageKey: "(세계)대화중/{{user}}와 대화",
        sceneTitle: "새벽 네 시, 둘만의 조용한 야식 시간",
        action: `모니터 불빛만 고요하게 일렁이는 새벽 네 시, 세계는 집게핀으로 머리칼을 다시 한번 고쳐 묶고 ${userName}의 맞은편에서 후후 면발을 불었다. 뜨거운 김 너머로 드러난 그녀의 창백한 뺨에 오랜만에 옅은 혈색이 돌았다.`,
        dialogue: `"...솔직히 아까 아이패드 붙잡고 있느라 저녁 거른 거 맞아요. ${userName} 씨는 귀신같이 남 배고픈 걸 잘 알아채네. ...고마워요, 혼자 먹는 컵라면보다 백 배는 맛있다."`,
        innerThought: "누군가랑 마주 앉아서 따뜻한 밥을 먹어본 게 대체 얼마 만이지...",
        mood: "온기가 스며든 나른한 미소"
      },
      4: {
        imageKey: "{{user}}와 휴식/흡연부스/고백",
        sceneTitle: "식지 않는 국물과 붉어진 귓바퀴",
        action: `따뜻한 그릇을 두 손으로 감싸 쥔 세계가 자신의 얼굴을 빤히 바라보는 ${userName}의 시선에 흠칫 놀라며 고개를 숙였다. 안경도 쓰지 않았는데 김 때문이라며 애써 눈가를 비비는 그녀의 귓불이 새빨갛게 달아올라 있었다.`,
        dialogue: `"...먹는 거 그렇게 뚫어져라 쳐다보지 마요, 체하겠네 진짜. ...다 먹고 나면 오늘 새벽 교대 끝날 때까지만 내 옆자리에 앉아 있어요. ${userName} 씨 가버리면 이 넓은 지하실에 또 나 혼자 남잖아."`,
        innerThought: "이 사람이 챙겨주는 사소한 온기에 이제 완전히 길들여져 버렸어.",
        mood: "감추지 못하는 설렘과 의지"
      }
    }[st] || {};
    return {
      ...byStage,
      affectionReason: "허기진 새벽 근무 중에 따뜻한 음식을 나누며 그녀의 고립감을 녹여줌",
      timePlace: `새벽 04:05 · ${currentLocation || "지하 PC방 카운터 옆 좌석"}`,
      replySuggestions: [
        "\"천천히 많이 먹어요. 단무지랑 마실 것도 더 가져다줄까요?\"",
        "\"아까 그리던 아이패드 그림, 밥 다 먹으면 조금만 보여줘요.\"",
        "\"다음엔 PC방 라면 말고 퇴근하고 제대로 된 밥 사줄게요.\""
      ]
    };
  }

  if (isDrink) {
    const byStage = {
      1: {
        imageKey: "(세계)음료제조/정리/마주침",
        sceneTitle: "제빙기 얼음 소리와 차가운 캔",
        action: `스낵바 제빙기에서 플라스틱 컵에 얼음을 퍼 담던 세계가 카운터 앞에 선 ${userName}와 눈이 마주치자 멈칫했다. 이내 습관적인 무표정으로 돌아온 그녀는 물기를 대충 닦은 손으로 음료를 계산대 위로 밀어놓았다.`,
        dialogue: `"...카페인 없으면 이 시간엔 못 버티죠. 선불 시간에서 차감해 뒀으니까 가져가세요. ...네? 하나는 제 거라고요? 유통기한 임박한 거 처리하시는 건 아니고요?"`,
        innerThought: "하필 내가 제일 좋아하는 하얀색 몬스터를 골라오네... 우연이겠지.",
        mood: "의심 섞인 무심함"
      },
      2: {
        imageKey: "(세계)음료제조/정리/마주침",
        sceneTitle: "딸깍, 새벽 정적을 깨는 캔 탭 소리",
        action: `계산대 위에 놓인 하얀색 몬스터 캔 표면에 맺힌 물방울을 한참 내려다보던 세계가, 못 이기는 척 가느다란 손가락으로 캔 탭을 딸깍 땄다. 탄산 기포가 올라오는 소리와 함께 그녀가 작게 한숨을 내쉬며 입술을 적셨다.`,
        dialogue: `"...맨날 올 때마다 이렇게 음료수 조공 바치면 내가 친절해질 줄 알아요? ...뭐, 마침 카페인 떨어져서 손끝 떨리던 참이니까 마셔는 줄게요. 버리진 않아요."`,
        innerThought: "캔 따는 손이 왜 괜히 어색하냐... 고맙다는 말 한마디가 그렇게 어렵나, 한세계.",
        mood: "부끄러움을 감춘 츤데레"
      },
      3: {
        imageKey: "(세계)대화중/{{user}}와 대화",
        sceneTitle: "카운터에 나란히 놓인 두 개의 캔",
        action: `세계는 카운터 책상에 팔꿈치를 괴고 턱을 받친 채, ${userName}가 건넨 음료를 한 모금 마셨다. 피로에 잠겨 있던 나른한 삼백안이 조금 또렷해지며 그녀의 입가에 아주 옅은 미소가 스쳤다.`,
        dialogue: `"...이상하네요. 혼자 마실 땐 그냥 심장만 빨리 뛰는 쓴물이었는데, ${userName} 씨가 건네준 건 이상하게 달게 느껴져서. ...잠깐 안 바쁘면 여기서 같이 마시다 가요."`,
        innerThought: "이 사람이 건네주는 음료 캔 하나에 하루 치 피로가 다 날아가는 것 같아.",
        mood: "부드러워진 눈빛과 친밀감"
      },
      4: {
        imageKey: "{{user}}와 휴식/흡연부스/고백",
        sceneTitle: "차가운 캔과 대조되는 뜨거운 손끝",
        action: `음료 캔을 건네받던 세계의 차가운 손끝이 ${userName}의 손등에 스치자, 그녀가 화들짝 놀란 듯 어깨를 작게 떨었다. 캔을 두 손으로 꼭 쥔 그녀는 붉어진 뺨을 가리기 위해 고개를 비스듬히 돌렸다.`,
        dialogue: `"...손이 왜 그렇게 따뜻해요? 사람 당황스럽게... 카페인 때문인지 ${userName} 씨 때문인지 모르겠는데 지금 심장이 너무 시끄럽거든요. 책임지고 옆에 가만히 좀 있어 봐요."`,
        innerThought: "카페인 핑계 대기도 이제 틀렸어. 그냥 이 사람이 너무 좋아진 거잖아.",
        mood: "두근거림과 붉어진 뺨"
      }
    }[st] || {};
    return {
      ...byStage,
      affectionReason: "새벽 알바와 야간 작업으로 지친 그녀의 루틴을 기억하고 음료를 챙겨줌",
      timePlace: `새벽 03:30 · ${currentLocation || "지하 PC방 스낵바 카운터"}`,
      replySuggestions: [
        "\"카페인 너무 많이 마시면 잠 못 자니까 다음엔 따뜻한 차로 사 올게요.\"",
        "\"손이 차갑던데 잠깐 제 손이라도 잡고 있을래요?\"",
        "\"음료 마시면서 잠깐 숨 좀 돌려요. 오늘 손님도 별로 없네요.\""
      ]
    };
  }

  if (isArt) {
    const byStage = {
      1: {
        imageKey: "{{user}}를 추궁/에게 짜증남",
        sceneTitle: "품 안에 감춰진 아이패드와 애플펜슬",
        action: `자신의 태블릿과 그림 이야기가 나오자 세계는 반사적으로 아이패드 화면을 뒤집어 가슴팍에 끌어안았다. 마스킹 테이프가 겹겹이 감긴 애플펜슬을 쥔 손마디가 하얗게 질렸고, 경계심 어린 눈초리가 ${userName}를 향했다.`,
        dialogue: `"...남의 작업 화면을 왜 그렇게 뚫어져라 쳐다봐요? 그냥 시간 때우려고 끄적인 낙서예요. 돈도 안 되는 휴학생 그림 따위 궁금해하지 마시죠."`,
        innerThought: "가장 초라한 부분인데... 들키고 싶지 않았단 말이야.",
        mood: "아킬레스건을 들킨 경계심"
      },
      2: {
        imageKey: "{{user}}의 좌석 점검/안내",
        sceneTitle: "테이프 감긴 펜 끝에 담긴 미련",
        action: `아이패드를 품에 안은 채 망설이던 세계가 ${userName}의 진지한 눈빛에 시선을 피하며 입술을 달싹였다. 펜촉 근처에 감긴 낡은 마스킹 테이프를 엄지로 만지작거리는 그녀의 표정에 씁쓸한 그림자가 내려앉았다.`,
        dialogue: `"...그렇게 대단한 그림 아니에요. 시각디자인과 4학년이면 뭐 해요, 졸업전시회 참가비 삼백오십만 원이 없어서 두 학기째 이 지하실에 처박혀 있는데. ...그래도 이상하진 않다고 해줘서, 뭐... 나쁘진 않네요."`,
        innerThought: "누군가 내 그림을 진심으로 궁금해해 준 게 1년 전 외주 사기당한 뒤로 처음이야.",
        mood: "방어기제 너머의 작은 흔들림"
      },
      3: {
        imageKey: "(세계)대화중/{{user}}와 대화",
        sceneTitle: "처음으로 열어 보인 미완성 캔버스",
        action: `잠시 고민하던 세계가 카운터 위에 아이패드를 내려놓고 조심스럽게 화면 잠금을 풀었다. 푸른 새벽빛을 닮은 감각적인 일러스트 레이어들이 화면을 채우고 있었고, 그녀는 부끄러운지 후드집업 소매 끝만 만지작거렸다.`,
        dialogue: `"...작년에 외주 사기당하고 보증금까지 깎인 뒤로는, 남한테 내 그림 보여주는 게 솔직히 무서웠거든요. 근데 ${userName} 씨한테는... 이상하게 보여주고 싶었어요. 솔직하게 어때요?"`,
        innerThought: "제발 괜찮다고 말해줬으면 좋겠다. 이 사람의 한마디면 다시 펜을 잡을 수 있을 것 같아.",
        mood: "트라우마를 넘어선 신뢰"
      },
      4: {
        imageKey: "{{user}}와 휴식/흡연부스/고백",
        sceneTitle: "오직 한 사람을 위해 그린 새벽의 스케치",
        action: `세계가 아이패드 갤러리 깊숙한 폴더에서 새 캔버스 하나를 열어 ${userName} 앞으로 살짝 밀었다. 화면 속에는 새벽마다 카운터 근처 자리에 앉아 있던 ${userName}의 옆모습이 섬세하고 다정한 선으로 가득 그려져 있었다.`,
        dialogue: `"...이번 학기 졸업전시회 주제가 '나의 세계'거든요. 한 평짜리 카운터밖에 없던 내 세계에 들어온 게 누군지... 이거 보면 아직도 모르겠어요? ...나 복학할 때까지 어디 가지 마요."`,
        innerThought: "내 캔버스를 다시 채워준 사람. 이제 내 세계는 전부 당신이야.",
        mood: "진심 어린 고백과 설렘"
      }
    }[st] || {};
    return {
      ...byStage,
      affectionReason: "그녀가 가장 아끼면서도 숨겨왔던 미술·졸업전시회의 상처를 진심으로 존중해 줌",
      timePlace: `새벽 04:15 · ${currentLocation || "지하 PC방 카운터 안쪽"}`,
      replySuggestions: [
        "\"색감이랑 분위기가 진짜 독보적인데요. 포기하기엔 너무 아까운 재능이에요.\"",
        "\"졸업전시회 열리면 제가 첫 번째 관람객으로 꽃다발 들고 갈게요.\"",
        "\"외주 사기당했던 일, 혼자 감당하느라 그동안 얼마나 힘들었어요.\""
      ]
    };
  }

  if (isCatRain || isNameLife) {
    const byStage = {
      1: {
        imageKey: "(세계)매우슬픔/우울함/절망감",
        sceneTitle: "지하 계단 환기구 아래의 그림자",
        action: `습한 새벽 공기가 감도는 지하 계단 쪽을 바라보던 세계의 눈빛이 한층 깊고 어두워졌다. 그녀는 명찰에 적힌 '한세계'라는 글자를 손바닥으로 가리며 자조 섞인 숨을 삼켰다.`,
        dialogue: `"...이름만 거창하게 '세계'면 뭐 해요. 지어준 아버지는 빚만 남기고 집을 나갔고, 내 세계는 반지하 자취방이랑 이 지하 PC방이 전분데. ...저 계단 밑 길냥이 '먹물'이 팔자가 나보다 나을걸요."`,
        innerThought: "왜 초면에 내 밑바닥 같은 이야기까지 꺼내게 만드는 거지...",
        mood: "깊은 우울과 자조"
      },
      2: {
        imageKey: "(세계)매우슬픔/우울함/절망감",
        sceneTitle: "빗소리 너머로 닿은 작은 온기",
        action: `계단 구석에서 까만 길고양이 '먹물'이의 젖은 털을 휴지로 닦아주던 세계가, 자신의 머리 위로 드리워진 ${userName}의 그림자에 천천히 고개를 들었다. 빗물인지 눈물인지 모를 물기가 맺힌 속눈썹이 파르르 떨렸다.`,
        dialogue: `"...여기 서서 구경하지 말라고 했잖아요. 남 울상인 거 봐서 뭐가 좋다고... 하아, 그 우산 이쪽으로 너무 기울이지 마요. ${userName} 씨 어깨 다 젖잖아요, 바보같이."`,
        innerThought: "가장 초라한 순간인데... 도망치지 않고 옆에 서 있어 주는 사람은 처음이야.",
        mood: "무너지는 방어기제와 울컥함"
      },
      3: {
        imageKey: "(세계)퇴근준비/한심함/하소연",
        sceneTitle: "먹물이와 함께 나눈 새벽의 비밀",
        action: `'먹물'이가 골골거리는 소리를 내며 세계의 운동화 코에 머리를 부볐다. 사람 앞에서는 늘 날이 서 있던 그녀의 목소리가 한 톤 낮고 부드러워졌고, 그녀는 ${userName}를 향해 처음으로 잔잔한 미소를 지어 보였다.`,
        dialogue: `"...내가 제일 싫어하던 내 이름을, 이상하게 ${userName} 씨가 불러줄 때만은 그렇게 싫지가 않네요. '세계'라는 이름, 어쩌면 생각보다 나쁘지 않을지도 모르겠어요."`,
        innerThought: "이 사람이 내 이름을 불러줄 때마다 내 세상이 한 뼘씩 넓어지는 기분이 든다.",
        mood: "상처의 치유와 깊은 신뢰"
      },
      4: {
        imageKey: "{{user}}와 휴식/흡연부스/고백",
        sceneTitle: "한 평짜리 지하실을 넘어선 두 사람의 세계",
        action: `비 개인 새벽 공기 속에서 세계가 조심스럽게 손을 뻗어 ${userName}의 소매 끝을 살짝 붙잡았다. 창백하던 얼굴이 목덜미까지 발갛게 물들어 있었지만, 올려다보는 눈동자만큼은 흔들림 없이 선명했다.`,
        dialogue: `"...이제 반지하 방이나 이 지하 계단이 외롭지 않아요. 내 세계에 멋대로 들어온 건 ${userName} 씨니까... 앞으로도 내 이름 평생 그렇게 다정하게 불러줘요."`,
        innerThought: "다시는 혼자 웅크려 울지 않아도 돼. 내 옆엔 이 사람이 있으니까.",
        mood: "완전히 열린 마음과 사랑"
      }
    }[st] || {};
    return {
      ...byStage,
      affectionReason: "그녀의 이름 콤플렉스와 외로운 내면에 깊이 공감하며 곁을 지켜줌",
      timePlace: `새벽 04:30 · ${currentLocation || "지하 PC방 입구 계단"}`,
      replySuggestions: [
        "\"'한세계'라는 이름, 저는 들을 때마다 참 예쁘고 근사하다고 생각했어요.\"",
        "\"비도 오는데 먹물이 밥 다 주면 제가 집 앞까지 우산 씌워다 줄게요.\"",
        "추위에 떨고 있는 그녀의 어깨 위로 내 겉옷을 벗어 걸쳐준다."
      ]
    };
  }

  if (isDawnOff || isFlirtWarm) {
    const byStage = {
      1: {
        imageKey: "{{user}}의 부름에 대답/뒷모습",
        sceneTitle: "어깨너머로 돌아본 경계의 시선",
        action: `스낵 진열대를 정리하던 세계가 ${userName}의 말에 동작을 멈추고 어깨너머로 고개만 살짝 돌렸다. 집게핀에서 빠져나온 잔머리가 뺨을 스쳤고, 그녀는 어이없다는 듯 짧게 코웃음을 쳤다.`,
        dialogue: `"...손님, 밤새우더니 잠꼬대하시는 거예요? 알바생한테 괜히 이상한 멘트 던지지 마시고 피곤하면 자리에 가서 눈이나 붙이세요."`,
        innerThought: "갑자기 훅 들어오네... 당황한 티 안 났겠지?",
        mood: "당황을 감춘 새침한 거리두기"
      },
      2: {
        imageKey: "(세계)하품/졸림/새벽교대/지루해",
        sceneTitle: "새벽 다섯 시, 나른한 하품과 흔들리는 눈빛",
        action: `교대 시간이 가까워오자 몰려오는 졸음에 세계가 후드 소매 끝으로 입가를 가리며 작게 하품을 했다. 눈가에 맺힌 나른한 물기를 닦아내던 그녀가 ${userName}의 다정한 말에 흠칫하며 귀 끝을 붉혔다.`,
        dialogue: `"...아, 졸려서 눈물 난 거거든요? 감동받은 거 아니니까 이상한 오해 하지 마요. ...근데 오늘 6시에 교대 끝나는데, 진짜 그때까지 안 가고 기다릴 거예요?"`,
        innerThought: "진짜로 퇴근할 때까지 기다려 주면... 못 이기는 척 포장마차라도 따라가야 하나.",
        mood: "나른한 졸음 속 은근한 기대"
      },
      3: {
        imageKey: "(세계)퇴근준비/한심함/하소연",
        sceneTitle: "지상으로 올라온 푸른 새벽의 퇴근길",
        action: `타임카드를 찍고 지상으로 올라온 세계가 신촌역 계단 난간 앞에서 크게 기지개를 켰다. 에코백을 고쳐 멘 그녀가 뒤따라 올라온 ${userName}를 돌아보며 피식 웃음을 터뜨렸다.`,
        dialogue: `"...진짜로 교대 시간까지 기다렸네, 이 지독한 단골손님. 밤새워 피곤할 텐데... 가요, 저기 앞 편의점이든 포장마차든. 오늘 새벽은 ${userName} 씨랑 같이 걷고 싶으니까."`,
        innerThought: "새벽 여섯 시의 공기가 이렇게 상쾌하다고 느낀 건 이 사람 때문일 거야.",
        mood: "해방감과 설레는 동행"
      },
      4: {
        imageKey: "{{user}}와 휴식/흡연부스/고백",
        sceneTitle: "새벽빛이 내려앉은 옥상 테라스의 고백",
        action: `도심의 야경과 새벽빛이 교차하는 난간 앞, 세계는 하얀 몬스터 캔을 만지작거리며 한 걸음 더 ${userName}의 곁으로 다가섰다. 붉게 물든 뺨과 촉촉하게 빛나는 눈동자가 오직 한 사람만을 향하고 있었다.`,
        dialogue: `"...나 원래 사람 진짜 안 믿거든요. 기대하면 다 도망가니까. ...근데 ${userName} 씨는 내 멈춰버린 새벽을 다시 움직이게 만들었잖아요. 이제 손님 말고, 내 사람 해주면 안 돼요?"`,
        innerThought: "내 스물넷의 가장 빛나는 순간은 지금, 이 사람 앞에 서 있는 바로 이 순간이야.",
        mood: "방화벽 해제 · 진심의 고백"
      }
    }[st] || {};
    return {
      ...byStage,
      affectionReason: "다정한 직구와 새벽 퇴근길을 함께하려는 진심이 그녀의 마음을 크게 흔듦",
      timePlace: `새벽 05:20 · ${currentLocation || "신촌역 지하 PC방 출구 계단"}`,
      replySuggestions: [
        "\"오늘 새벽뿐만 아니라 앞으로도 매일 퇴근길 데려다줄게요.\"",
        "기지개를 켜는 그녀의 에코백을 자연스럽게 대신 들어준다.",
        "\"세계 씨가 웃으니까 스물넷답게 정말 예쁘네요.\""
      ]
    };
  }

  const generalByStage = {
    1: {
      imageKey: "(세계)스마트폰/관심없음",
      sceneTitle: "푸른 듀얼 모니터 너머의 건조한 시선",
      action: `듀얼 모니터의 푸른 잔광이 세계의 창백한 콧잔등을 비췄다. 한쪽 귀에 헤드셋을 걸친 채 스마트폰 액정을 넘기던 그녀가, "${msg.slice(0, 24)}"라는 ${userName}의 말에 느릿하게 시선만 들어 올렸다.`,
      dialogue: `"...네, 방금 하신 말씀 들었어요. 근데 제가 알바생이라 손님이랑 사적인 수다를 길게 떨 처지는 아니거든요. 더 필요한 거 있으시면 말씀하시고, 아니면 편하게 시간 보내다 가세요."`,
      innerThought: "자꾸 말을 거네... 나한테 뭐 볼일이라도 있는 건가?",
      mood: "나른하고 사무적인 경계"
    },
    2: {
      imageKey: "(세계)음료제조/정리/마주침",
      sceneTitle: "무심한 척 이어지는 카운터의 대화",
      action: `스마트폰을 책상 위에 엎어놓은 세계가 턱을 괴고 ${userName}를 바라보았다. 입술로는 귀찮다는 듯 한숨을 내쉬었지만, 헤드셋을 아예 목 뒤로 넘기며 ${userName}의 말에 귀를 기울이는 자세였다.`,
      dialogue: `"...${userName} 씨는 참 할 일도 없나 봐요, 새벽마다 야간 알바생 붙잡고 그런 이야기나 하고. ...그래서요, 방금 한 얘기 뒷부분은 뭔데요? 듣는 김에 마저 들어나 줄게요."`,
      innerThought: "틱틱대면서도 왜 뒷얘기가 궁금한 건지 모르겠네, 진짜.",
      mood: "호기심이 섞인 츤데레"
    },
    3: {
      imageKey: "(세계)대화중/{{user}}와 대화",
      sceneTitle: "새벽 정적을 채우는 편안한 목소리",
      action: `카운터 책상에 팔꿈치를 괴고 앉은 세계의 눈매가 한결 부드럽게 휘어졌다. 하얀 몬스터 에너지 캔을 손끝으로 가볍게 굴리며 그녀는 ${userName}의 이야기에 진심 어린 맞장구를 쳤다.`,
      dialogue: `"...전에는 손님들이 말 시키는 거 질색이었는데, 이상하게 ${userName} 씨랑 이렇게 떠들고 있으면 새벽 시간이 순식간에 가요. 오늘 나 교대할 때까지 말동무 좀 더 해줄 거죠?"`,
      innerThought: "이 사람이랑 대화할 때만큼은 졸업 걱정도, 돈 걱정도 전부 잊어버리게 돼.",
      mood: "새벽의 공범 같은 편안함"
    },
    4: {
      imageKey: "{{user}}와 휴식/흡연부스/고백",
      sceneTitle: "오직 당신에게만 열린 한세계의 새벽",
      action: `세계가 카운터 안쪽에서 나와 ${userName}의 바로 옆에 나란히 섰다. 살짝 숙인 고개 너머로 붉어진 귓바퀴가 보였고, 그녀의 가느다란 손가락이 ${userName}의 소매 자락을 조심스럽게 스쳤다.`,
      dialogue: `"...무슨 이야기를 해도 다 좋아요, ${userName} 씨 목소리라면. 이름값도 못 하던 내 좁아터진 세계에 들어와 줘서... 진짜 고마워요. 오늘도 내 옆에 있어 줄 거죠?"`,
      innerThought: "이제 내 새벽은 이 사람 없이는 상상할 수조차 없어.",
      mood: "깊은 애정과 설렘"
    }
  }[st] || {};

  return {
    ...generalByStage,
    affectionReason: "페르소나에 맞춘 자연스러운 대화 교류로 그녀와의 거리감이 좁혀짐",
    timePlace: `새벽 03:40 · ${currentLocation || character.location}`,
    replySuggestions: [
      "하얀색 몬스터 에너지 한 캔을 카운터 위에 올려두며 웃어 보인다.",
      "\"카운터 구석에 있는 아이패드로 무슨 그림 그리고 있었어요?\"",
      "\"오늘 새벽 6시에 퇴근할 때 지하철역 계단까지 같이 걸어갈래요?\""
    ]
  };
}

// Generate Simulation Turn
async function generateSimulationReply({
  character,
  userMessage,
  history,
  affection,
  unlockedKeywords,
  userName,
  userPersonaDesc,
  currentLocation,
  apiKey,
  provider,
  preferredModel,
  ollamaEndpoint
}) {
  const newlyUnlocked = [];
  const kbList = character.keywordBooks || [];

  for (const kb of kbList) {
    if ((kb.keywords || []).some(k => userMessage.includes(k))) {
      if (!unlockedKeywords.includes(kb.title)) {
        unlockedKeywords.push(kb.title);
      }
      newlyUnlocked.push(kb);
    }
  }

  const commandInfo = parseSpecialCommand(userMessage);
  const currentAff = Math.max(0, Math.min(100, Number(affection ?? 15)));
  const rudeWords = ["늙었", "한심", "짜증", "꺼져", "바보", "무시", "진상", "빨리", "못생", "닥쳐", "최악"];
  const warmWords = ["몬스터", "커피", "고마", "멋지", "예쁘", "그림", "괜찮", "힘내", "같이", "우동", "어묵", "초코", "고양이", "먹물", "펜", "쉬어", "꽃", "선물", "비", "우산", "라면", "좋아", "사과", "미안", "시즈쿠", "코스프레", "의상", "바느질", "재봉틀", "치수", "줄자"];

  // Derailment pattern detection
  const derailmentRegex = /(?:비트코인|이더리움|코인|가상화폐|주식|환율|파이썬|자바스크립트|javascript|python|코딩|개발자|chatgpt|gpt|인공지능|ai모델|프롬프트|날씨\s*어때|날씨\s*알려줘|계산해줘|번역해줘|누구야\s*너|너\s*봇이지|너\s*ai지|로또\s*번호)/i;
  const isRuleDerailing = derailmentRegex.test(userMessage);

  let baseDelta = 5;
  if (isRuleDerailing) {
    baseDelta = -10;
  } else if (commandInfo) {
    if (commandInfo.type === "innerThought") baseDelta = 4;
    else if (commandInfo.type === "skinship") baseDelta = currentAff < 15 ? -6 : currentAff < 35 ? 3 : 9;
    else if (commandInfo.type === "whisper") baseDelta = currentAff < 15 ? -4 : currentAff < 35 ? 4 : 8;
    else if (commandInfo.type === "midnightEvent") baseDelta = 7;
  } else if (rudeWords.some(w => userMessage.includes(w))) baseDelta = -8;
  else if (warmWords.some(w => userMessage.includes(w))) baseDelta = 9;
  else if (newlyUnlocked.length > 0) baseDelta = 7;

  const tentativeAff = Math.max(0, Math.min(100, currentAff + baseDelta));
  const tentativeStage = getStageInfo(tentativeAff);

  // Build baseline high-literary Korean scene
  const crafted = craftKoreanPersonaScene({
    character,
    userMessage,
    userName,
    currentAff,
    delta: baseDelta,
    nextAffection: tentativeAff,
    nextStageInfo: tentativeStage,
    currentLocation,
    commandInfo
  });

  const activeKey = String(apiKey || store.savedApiKey || "").trim();
  const currentProvider = provider || store.savedProvider || "auto";
  let apiErrorReason = null;

  if (activeKey || currentProvider === "ollama") {
    const imgDict = character.profileImages || character.situationalImages || {};
    const validImageKeys = Object.keys(imgDict).filter(k => !imgDict[k].hidden);
    let commandDirective = "";
    if (commandInfo) {
      if (commandInfo.type === "innerThought") {
        commandDirective = `
[특수 시스템 커맨드 발동: 💭 /속마음]
- 사용자가 캐릭터의 본심을 꿰뚫어보는 특수 명령어를 사용했습니다.
- 캐릭터는 평소 겉으로 내뱉는 가시 돋친 말이나 차가운 태도 뒤에 숨겨진, 가장 솔직하고 연약하며 방어벽 없는 본심을 'innerThought'에 매우 생생하고 진솔하게(2~3문장) 서술해야 합니다.
- 대사('dialogue')와 지문('action')에서도 사용자에게 들켜버린 듯한 당황, 눈동자의 흔들림, 숨길 수 없는 붉어진 귓가 등의 반응을 정밀하게 연기하세요.
`;
      } else if (commandInfo.type === "skinship") {
        commandDirective = `
[특수 시스템 커맨드 발동: 🤝 /스킨십 - 행동: "${commandInfo.param}"]
- 사용자가 캐릭터에게 직접적인 비언어적 스킨십 밀착 행동("${commandInfo.param}")을 시도했습니다.
- 지문('action')에서 닿은 부위(손끝, 어깨, 뺨, 머리칼 등)의 체온 변화, 전기에 감전된 듯 멈칫하는 신체 반응, 급격히 가빠지는 호흡과 심장 박동, 시선을 둘 곳 몰라하는 디테일을 아주 세밀하게 묘사하세요.
- 대사('dialogue')와 속마음('innerThought')에서 호감도 단계(${tentativeStage.name})에 맞춰 당황, 경계, 혹은 숨길 수 없는 두근거림을 드러내세요.
`;
      } else if (commandInfo.type === "whisper") {
        commandDirective = `
[특수 시스템 커맨드 발동: 🤫 /귓속말 - 속삭임: "${commandInfo.param}"]
- 사용자가 카운터/다다미 너머로 10cm까지 다가가 귓가에 숨결이 닿도록 은밀하게 속삭였습니다: "${commandInfo.param}"
- 귀와 목덜미에 닿는 온기, 화들짝 놀라며 굳어버린 몸, 귓바퀴부터 뺨까지 새빨갛게 물드는 시각적 반응, 둘만 고립된 듯한 숨 막히는 긴장감을 극적으로 연출하세요.
- 대사('dialogue')는 목소리가 떨리거나 헛기침을 하듯 조용하고 당황스럽게 말하고, 속마음('innerThought')에서 터질 듯한 심장 소리를 고백하세요.
`;
      } else if (commandInfo.type === "midnightEvent") {
        commandDirective = `
[특수 시스템 커맨드 발동: 🌙 /심야이벤트 - 테마: "${commandInfo.param}"]
- 심야의 특수 돌발 서사 이벤트("${commandInfo.param}")가 강제로 발동되었습니다.
- 둘만의 고립감과 새벽/심야 특유의 몽환적이고 긴장감 넘치는 분위기를 지문과 대사에 폭발적으로 연출하세요.
`;
      }
    }

    const systemPrompt = `당신은 인터랙티브 서브컬처 라노벨/비주얼 노벨의 히로인 '${character.name}'입니다.
사용자({{user}})의 대사/행동에 맞춰, 캐릭터의 페르소나와 [현재 호감도(${currentAff}/100, ${tentativeStage.name})]를 완벽히 반영한 한국어 고감도 응답을 생성하세요.

[캐릭터 페르소나 설정]
- 이름: ${character.name} (${(character.jobs || []).join(", ")})
- 장소: ${currentLocation || character.location}
- 상세 설정: ${typeof character.details === "object" ? JSON.stringify(character.details) : character.details}
- 소개: ${character.description}
- 키워드북:
${kbList.map(k => `  * ${k.title}: ${k.content}`).join("\n")}

[사용자({{user}}) 정보]
- 호칭: ${userName} (${userPersonaDesc || "단골 손님"})

[호감도 단계별 연기 지침]
- 현재 호감도: ${currentAff}/100 (${tentativeStage.name})
- 지침: ${tentativeStage.guide}
${commandDirective}

[에피소드 몰입도 및 맥락 이탈(Derailment) 판정 및 호감도 패널티 지침 - 최우선 평가]
1. 사용자의 입력이 현재 에피소드의 시공간적 상황(${currentLocation || character.location}), 장르 분위기, 캐릭터와의 감정선에 잘 몰입하고 있는지 엄격하게 평가하세요.
2. 뜬금없는 외부 주제(비트코인/코인/주식, 파이썬/코딩/기술 질문, 메타 AI 언급 "너 챗봇이지?", 날씨 묻기, 억지 장난/트롤링, 영혼 없는 단답, 캐릭터의 설정을 파괴하는 발언 등)로 분위기를 깨거나 맥락을 이탈할 경우:
   * "isDerailing": true
   * "derailmentReason": 사용자가 어떻게 분위기와 에피소드 몰입을 깼는지 구체적인 이유 1줄
   * "affectionDelta": 반드시 음수 패널티 (-5 ~ -15 사이)를 부여하세요.
   * "dialogue": 캐릭터가 찬물을 맞은 듯 어이없어하거나, 상처받아 싸늘해지거나, 서운함을 드러내는 현실적인 대사 (큰따옴표 포함)
   * "innerThought": 캐릭터의 식어버린 감정이나 무안함, 서운한 본심 독백 1문장
3. 상황에 어울리며 진정성 있는 대화일 경우:
   * "isDerailing": false
   * "derailmentReason": null
   * "affectionDelta": 대화의 진정성, 설렘, 배려도에 따라 자연스러운 호감도 증가 (+1 ~ +12 사이)

[스토리 분기점(선택지) 3가지 생성 필수 규칙 - Visual Novel Choice Branches]
반드시 다음 대화 전개를 위한 서로 다른 성격과 매력의 3가지 스토리 분기점 객체를 "branches" 배열에 생성하세요:
1. "romantic": 직구 고백, 설레는 진심, 가슴 뛰는 플러팅 (badge: "💖 직구 / 진심")
2. "care": 따뜻한 배려, 상대의 피로/마음 챙겨주기, 든든한 경청 (badge: "🌿 다정 / 배려")
3. "playful": 짓궂은 장난, 츤데레 반응 유도, 귀여운 티키타카 (badge: "⚡ 장난 / 도발")

[사용 가능한 상황별 일러스트 키 목록 (imageKey에 아래 중 정확히 하나만 선택)]
${validImageKeys.map(k => `- "${k}"`).join("\n")}

반드시 아래 JSON 형식으로만 응답하세요 (순수 JSON 객체):
{
  "imageKey": "위 목록 중 현재 상황에 가장 잘 맞는 키 1개",
  "sceneTitle": "현재 장면의 짧은 제목",
  "action": "3인칭 시점의 생생한 행동·표정·배경 묘사 (2~4문장, 따옴표 없이)",
  "dialogue": "캐릭터가 실제로 입 밖으로 내뱉는 대사 (반드시 큰따옴표 포함)",
  "innerThought": "겉으로 한 말과 대비되는 캐릭터의 솔직한 속마음 독백 1문장",
  "isDerailing": false,
  "derailmentReason": null,
  "affectionDelta": 6,
  "affectionReason": "이번 턴 호감도가 변화한 이유 1줄 요약",
  "timePlace": "현재 시각 및 구체적 장소",
  "mood": "현재 감정 요약",
  "branches": [
    { "id": "A", "type": "romantic", "badge": "💖 직구 / 진심", "title": "한 줄 요약", "text": "실제 전송될 1~2문장의 대사나 행동 지문" },
    { "id": "B", "type": "care", "badge": "🌿 다정 / 배려", "title": "한 줄 요약", "text": "실제 전송될 1~2문장의 대사나 행동 지문" },
    { "id": "C", "type": "playful", "badge": "⚡ 장난 / 도발", "title": "한 줄 요약", "text": "실제 전송될 1~2문장의 대사나 행동 지문" }
  ],
  "replySuggestions": ["선택지 A 대사", "선택지 B 대사", "선택지 C 대사"]
}`;

    const llmRes = await callUniversalLLM({
      systemPrompt,
      history,
      userMessage,
      apiKey: activeKey,
      provider: currentProvider,
      preferredModel: preferredModel || store.savedOllamaModel || store.savedModel,
      ollamaEndpoint: ollamaEndpoint || store.savedOllamaEndpoint
    });

    if (llmRes.ok && llmRes.data) {
      const llmJson = llmRes.data;
      const isDerailing = Boolean(llmJson.isDerailing || isRuleDerailing);
      let d = Number.isFinite(Number(llmJson.affectionDelta))
        ? Math.max(-15, Math.min(15, Math.round(Number(llmJson.affectionDelta))))
        : baseDelta;
      if (isDerailing && d >= 0) {
        d = -8;
      }
      const derailmentReason = isDerailing
        ? (llmJson.derailmentReason || "현재 에피소드 상황과 맞지 않는 딴소리로 캐릭터의 몰입도를 깸")
        : null;

      const nextAff = Math.max(0, Math.min(100, currentAff + d));
      const nextSt = getStageInfo(nextAff);
      const bestKey = pickBestSituationalImageKey(
        character,
        `${userMessage} ${llmJson.action || ""} ${llmJson.dialogue || ""}`,
        nextAff,
        d,
        llmJson.imageKey
      );
      const diag = String(llmJson.dialogue || crafted.dialogue).trim().startsWith('"')
        ? String(llmJson.dialogue || crafted.dialogue).trim()
        : `"${String(llmJson.dialogue || crafted.dialogue).trim()}"`;

      const normalizedBranches = normalizeBranches(
        llmJson.branches,
        llmJson.replySuggestions || crafted.replySuggestions,
        character,
        nextSt.stage
      );
      const replySuggestions = normalizedBranches.map(b => b.text);

      return {
        text: `img:[${bestKey}]\n${llmJson.action || crafted.action}\n\n${diag}`,
        imageKey: bestKey,
        sceneTitle: llmJson.sceneTitle || crafted.sceneTitle,
        action: llmJson.action || crafted.action,
        dialogue: diag,
        innerThought: llmJson.innerThought || crafted.innerThought,
        affection: nextAff,
        prevAffection: currentAff,
        delta: d,
        isDerailing,
        derailmentReason,
        affectionReason: isDerailing
          ? `⚠️ [에피소드 이탈 패널티] ${derailmentReason}`
          : (llmJson.affectionReason || crafted.affectionReason),
        stage: nextSt.stage,
        stageName: nextSt.name,
        timePlace: llmJson.timePlace || crafted.timePlace,
        mood: llmJson.mood || crafted.mood,
        unlockedKeywords,
        newlyUnlocked: newlyUnlocked.map(k => k.title),
        branches: normalizedBranches,
        replySuggestions,
        engine: llmRes.engine,
        apiUsed: true
      };
    } else {
      apiErrorReason = llmRes.error;
    }
  }

  const normalizedBranches = normalizeBranches(
    crafted.branches,
    crafted.replySuggestions,
    character,
    tentativeStage.stage
  );

  return {
    text: `img:[${crafted.imageKey}]\n${crafted.action}\n\n${crafted.dialogue}`,
    imageKey: crafted.imageKey,
    sceneTitle: crafted.sceneTitle,
    action: crafted.action,
    dialogue: crafted.dialogue,
    innerThought: crafted.innerThought,
    affection: tentativeAff,
    prevAffection: currentAff,
    delta: baseDelta,
    isDerailing: isRuleDerailing,
    derailmentReason: isRuleDerailing ? "현재 에피소드 상황과 맞지 않는 딴소리로 캐릭터의 몰입도를 깸" : null,
    affectionReason: isRuleDerailing ? `⚠️ [에피소드 이탈 패널티] 현재 상황과 무관한 딴소리` : crafted.affectionReason,
    stage: tentativeStage.stage,
    stageName: tentativeStage.name,
    timePlace: crafted.timePlace,
    mood: crafted.mood,
    unlockedKeywords,
    newlyUnlocked: newlyUnlocked.map(k => k.title),
    branches: normalizedBranches,
    replySuggestions: normalizedBranches.map(b => b.text),
    engine: "내장 한국어 페르소나 엔진",
    apiUsed: false,
    apiError: apiErrorReason,
    apiErrorReason
  };
}

// Generate a brand-new custom conversation opening scene when user clicks "+ 새 대화 걸기"
async function generateCustomOpeningScene({ character, customSituation, userName, userPersonaDesc, initialAffection, apiKey, provider, preferredModel, ollamaEndpoint }) {
  const startAff = Math.max(0, Math.min(100, Number(initialAffection ?? 25)));
  const stageInfo = getStageInfo(startAff);
  const crafted = craftKoreanPersonaScene({
    character,
    userMessage: customSituation || "새로운 만남",
    userName,
    currentAff: startAff,
    delta: 0,
    nextAffection: startAff,
    nextStageInfo: stageInfo,
    currentLocation: customSituation?.slice(0, 22) || character.location
  });

  const activeKey = String(apiKey || store.savedApiKey || "").trim();
  const currentProvider = provider || store.savedProvider || "auto";
  if (activeKey || currentProvider === "ollama") {
    const imgDict = character.profileImages || character.situationalImages || {};
    const validImageKeys = Object.keys(imgDict).filter(k => !imgDict[k].hidden);
    const systemPrompt = `당신은 인터랙티브 캐릭터 시뮬레이션 '${character.name}'의 시나리오 디렉터입니다.
사용자가 요청한 [새로운 시작 상황]과 [초기 호감도(${startAff}/100, ${stageInfo.name})]에 맞춰 첫 장면과 첫 대사를 순수 JSON으로 생성하세요.
캐릭터 설정: ${typeof character.details === "object" ? JSON.stringify(character.details) : character.details}
사용 가능한 imageKey 목록: ${validImageKeys.join(" | ")}
JSON 형식: {"imageKey":"키 이름","sceneTitle":"장면 제목","timePlace":"시간 및 장소","mood":"감정 상태","action":"3인칭 오프닝 행동/배경 지문 3~4문장","dialogue":"캐릭터 첫 대사(큰따옴표 포함)","innerThought":"캐릭터 속마음 1문장","branches":[{"id":"A","type":"romantic","badge":"💖 직구 / 진심","title":"한 줄 요약","text":"대사/행동"},{"id":"B","type":"care","badge":"🌿 다정 / 배려","title":"한 줄 요약","text":"대사/행동"},{"id":"C","type":"playful","badge":"⚡ 장난 / 도발","title":"한 줄 요약","text":"대사/행동"}],"replySuggestions":["선택지1","선택지2","선택지3"]}`;

    const llmRes = await callUniversalLLM({
      systemPrompt,
      history: [],
      userMessage: `[새로운 시작 상황]: ${customSituation}. 사용자 이름: ${userName} (${userPersonaDesc || "단골 손님"}).`,
      apiKey: activeKey,
      provider: currentProvider,
      preferredModel: preferredModel || store.savedOllamaModel || store.savedModel,
      ollamaEndpoint: ollamaEndpoint || store.savedOllamaEndpoint
    });

    if (llmRes.ok && llmRes.data && llmRes.data.dialogue) {
      const d = llmRes.data;
      const bestKey = pickBestSituationalImageKey(character, `${customSituation} ${d.action}`, startAff, 0, d.imageKey);
      const diag = String(d.dialogue).trim().startsWith('"') ? String(d.dialogue).trim() : `"${String(d.dialogue).trim()}"`;
      const normalizedBranches = normalizeBranches(d.branches, d.replySuggestions || crafted.replySuggestions, character, stageInfo.stage);
      return {
        sceneTitle: d.sceneTitle || customSituation.slice(0, 24),
        imageKey: bestKey,
        timePlace: d.timePlace || crafted.timePlace,
        mood: d.mood || stageInfo.name,
        action: d.action || crafted.action,
        dialogue: diag,
        innerThought: d.innerThought || crafted.innerThought,
        text: `img:[${bestKey}]\n${d.action || crafted.action}\n\n${diag}`,
        affection: startAff,
        stage: stageInfo.stage,
        stageName: stageInfo.name,
        branches: normalizedBranches,
        replySuggestions: normalizedBranches.map(b => b.text),
        engine: llmRes.engine,
        apiUsed: true
      };
    }
  }

  const customAction = `[새로운 시작 상황: ${customSituation}]\n${crafted.action}`;
  const normalizedBranches = normalizeBranches(crafted.branches, crafted.replySuggestions, character, stageInfo.stage);
  return {
    sceneTitle: customSituation ? customSituation.slice(0, 24) : crafted.sceneTitle,
    imageKey: crafted.imageKey,
    timePlace: crafted.timePlace,
    mood: `${stageInfo.name} · ${crafted.mood}`,
    action: customAction,
    dialogue: crafted.dialogue,
    innerThought: crafted.innerThought,
    text: `img:[${crafted.imageKey}]\n${customAction}\n\n${crafted.dialogue}`,
    affection: startAff,
    stage: stageInfo.stage,
    stageName: stageInfo.name,
    branches: normalizedBranches,
    replySuggestions: normalizedBranches.map(b => b.text),
    engine: "내장 한국어 페르소나 엔진",
    apiUsed: false
  };
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Domain, X-CookieId, X-AbrAttr'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  // --- A. AUTHENTICATION ENDPOINTS (Multi-User on Jetson Orin) ---
  // POST /ko/api/auth/register
  if (req.method === 'POST' && pathname === '/ko/api/auth/register') {
    try {
      const body = await parseBody(req);
      const user = dbLayer.createUser(body.username, body.password, body.nickname);
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
      return sendJson(res, 200, { ok: true, token, user });
    } catch (e) {
      return sendJson(res, 400, { ok: false, error: e.message });
    }
  }

  // POST /ko/api/auth/login
  if (req.method === 'POST' && pathname === '/ko/api/auth/login') {
    try {
      const body = await parseBody(req);
      const user = dbLayer.authenticateUser(body.username, body.password);
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
      return sendJson(res, 200, { ok: true, token, user });
    } catch (e) {
      return sendJson(res, 401, { ok: false, error: e.message });
    }
  }

  // GET /ko/api/auth/me
  if (req.method === 'GET' && pathname === '/ko/api/auth/me') {
    const user = getAuthUser(req);
    if (!user) return sendJson(res, 401, { ok: false, error: '인증되지 않았습니다.' });
    return sendJson(res, 200, { ok: true, user });
  }

  // --- A-2. ADMIN USER APPROVAL & ADULT PERMISSION ENDPOINTS ---
  // GET /ko/api/admin/users
  if (req.method === 'GET' && pathname === '/ko/api/admin/users') {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { ok: false, error: '관리자(Admin) 권한이 필요합니다.' });
    }
    const users = dbLayer.getAllUsers();
    return sendJson(res, 200, { ok: true, users });
  }

  // POST /ko/api/admin/users/:id/status
  const adminUserMatch = pathname.match(/^\/ko\/api\/admin\/users\/(\d+)\/status$/);
  if (req.method === 'POST' && adminUserMatch) {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { ok: false, error: '관리자(Admin) 권한이 필요합니다.' });
    }
    try {
      const targetId = parseInt(adminUserMatch[1], 10);
      const body = await parseBody(req);
      const updated = dbLayer.updateUserStatus(targetId, body.status, body.isAdult);
      return sendJson(res, 200, { ok: true, user: updated });
    } catch (e) {
      return sendJson(res, 400, { ok: false, error: e.message });
    }
  }

  // DELETE /ko/api/admin/users/:id
  const adminDelMatch = pathname.match(/^\/ko\/api\/admin\/users\/(\d+)$/);
  if (req.method === 'DELETE' && adminDelMatch) {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { ok: false, error: '관리자(Admin) 권한이 필요합니다.' });
    }
    const targetId = parseInt(adminDelMatch[1], 10);
    if (targetId === user.id) {
      return sendJson(res, 400, { ok: false, error: '현재 로그인 중인 본인 관리자 계정은 삭제할 수 없습니다.' });
    }
    dbLayer.deleteUser(targetId);
    return sendJson(res, 200, { ok: true, deleted: targetId });
  }

  // --- B. USER ROOMS & CONVERSATION SYNC (Per-User Isolation) ---
  // GET /ko/api/rooms?characterId=...
  if (req.method === 'GET' && pathname === '/ko/api/rooms') {
    const user = getAuthUser(req);
    const charId = parsedUrl.query.characterId || 'segye-24-3c209e4d-custom';
    if (!user) {
      return sendJson(res, 200, { ok: true, rooms: [], guest: true });
    }
    const rooms = dbLayer.getUserRooms(user.id, charId);
    return sendJson(res, 200, { ok: true, rooms, user });
  }

  // POST /ko/api/rooms/save
  if (req.method === 'POST' && pathname === '/ko/api/rooms/save') {
    const user = getAuthUser(req);
    if (!user) return sendJson(res, 401, { ok: false, error: '로그인이 필요합니다.' });
    try {
      const body = await parseBody(req);
      const room = dbLayer.saveRoom(user.id, body);
      return sendJson(res, 200, { ok: true, room });
    } catch (e) {
      return sendJson(res, 400, { ok: false, error: e.message });
    }
  }

  // DELETE /ko/api/rooms/:id
  const delRoomMatch = pathname.match(/^\/ko\/api\/rooms\/([^/]+)$/);
  if (req.method === 'DELETE' && delRoomMatch) {
    const user = getAuthUser(req);
    if (!user) return sendJson(res, 401, { ok: false, error: '로그인이 필요합니다.' });
    const roomId = decodeURIComponent(delRoomMatch[1]);
    dbLayer.deleteRoom(user.id, roomId);
    return sendJson(res, 200, { ok: true, deleted: roomId });
  }

  // 1. GET /ko/api/characters
  if (req.method === 'GET' && pathname === '/ko/api/characters') {
    return sendJson(res, 200, Object.values(store.characters));
  }

  // 2. GET /ko/api/characters/:id
  const charMatch = pathname.match(/^\/ko\/api\/characters\/([^/]+)$/);
  if (req.method === 'GET' && charMatch && charMatch[1] !== 'babies') {
    const charId = decodeURIComponent(charMatch[1]);
    const found = store.characters[charId] || Object.values(store.characters).find(c => c.id === charId);
    if (!found) return sendJson(res, 404, { error: "Character not found" });

    // Admin Only Character Gatekeeping
    if (found.adminOnly) {
      const authUser = getAuthUser(req);
      if (!authUser || authUser.role !== 'admin') {
        return sendJson(res, 403, {
          error: '👑 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.',
          code: 'ADMIN_ACCESS_RESTRICTED'
        });
      }
    }

    return sendJson(res, 200, found);
  }

  // 3. POST /ko/api/characters/create
  if (req.method === 'POST' && pathname === '/ko/api/characters/create') {
    try {
      const body = await parseBody(req);

      // 19+ Adult Character Creation Gatekeeping
      if (body.isAdult) {
        const authUser = getAuthUser(req);
        if (!authUser || authUser.status !== 'approved' || !authUser.is_adult) {
          return sendJson(res, 403, {
            error: '🔞 19세 이상 캐릭터 설정 및 생성은 관리자 승인을 받은 정회원만 가능합니다.',
            code: 'ADULT_CREATION_DENIED'
          });
        }
      }

      const id = body.characterId || `custom-${Date.now()}`;
      const existing = store.characters[id] || SEGYE24_CHARACTER;
      const updated = {
        ...existing,
        ...body,
        characterId: id,
        characterDetails: body.details || body.characterDetails || existing.characterDetails,
        updatedAt: new Date().toISOString()
      };
      store.characters[id] = updated;
      if (!store.comments[id]) store.comments[id] = [];
      saveStore(store);
      return sendJson(res, 200, updated);
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  // 4. POST /ko/api/characters/:id/like
  const likeMatch = pathname.match(/^\/ko\/api\/characters\/([^/]+)\/like$/);
  if (req.method === 'POST' && likeMatch) {
    const charId = decodeURIComponent(likeMatch[1]);
    const found = store.characters[charId];
    if (!found) return sendJson(res, 404, { error: "Character not found" });
    found.isLiked = !found.isLiked;
    found.likeCount = Math.max(0, (found.likeCount || 0) + (found.isLiked ? 1 : -1));
    saveStore(store);
    return sendJson(res, 200, { isLiked: found.isLiked, likeCount: found.likeCount });
  }

  // 5. GET / POST /ko/api/comments
  if (pathname === '/ko/api/comments') {
    if (req.method === 'GET') {
      const charId = parsedUrl.query.characterId || "segye-24-3c209e4d-custom";
      return sendJson(res, 200, store.comments[charId] || []);
    }
    if (req.method === 'POST') {
      try {
        const body = await parseBody(req);
        if (containsBlockedKeyword(body.content)) {
          return sendJson(res, 400, {
            error: "정책상 지원되지 않는 내용이 포함되어 있습니다.",
            code: "COMPETITOR_KEYWORD_BLOCKED_MOD_92996"
          });
        }
        const charId = body.characterId || "segye-24-3c209e4d-custom";
        if (!store.comments[charId]) store.comments[charId] = [];
        const newComment = {
          id: Date.now(),
          nickname: body.nickname || "익명유저",
          creatorID: "USER2026",
          content: body.content,
          replyCount: 0,
          likeCount: 0,
          isPinned: Boolean(body.donateAmount && body.donateAmount >= 5000),
          isCreator: false,
          donateAmount: body.donateAmount ? Number(body.donateAmount) : null,
          createdAt: new Date().toISOString()
        };
        store.comments[charId].unshift(newComment);
        saveStore(store);
        return sendJson(res, 200, newComment);
      } catch (e) {
        return sendJson(res, 400, { error: e.message });
      }
    }
  }

  // 6. POST /ko/api/chat/test-key (Validate and persist API Key across Gemini / OpenAI / Claude / OpenRouter / Groq / Ollama)
  if (req.method === 'POST' && pathname === '/ko/api/chat/test-key') {
    try {
      const body = await parseBody(req);
      const provider = body.provider || "auto";
      const preferredModel = body.model || "";
      const rawKey = String(body.apiKey || "").trim();

      // Special handling for Ollama local provider (no API key required)
      if (provider === "ollama") {
        const ollamaEndpoint = (body.ollamaEndpoint || store.savedOllamaEndpoint || "http://127.0.0.1:11434").trim();
        const modelName = (body.model || store.savedOllamaModel || "qwen2.5:7b").trim();

        const testRes = await callUniversalLLM({
          systemPrompt: '반드시 다음 순수 JSON만 출력하세요: {"dialogue":"연결 성공"}',
          history: [],
          userMessage: "연결 테스트입니다.",
          apiKey: "ollama",
          provider: "ollama",
          preferredModel: modelName,
          ollamaEndpoint
        });

        if (testRes.ok) {
          store.savedApiKey = "ollama";
          store.savedProvider = "ollama";
          store.savedModel = modelName;
          store.savedOllamaEndpoint = ollamaEndpoint;
          store.savedOllamaModel = modelName;
          saveStore(store);
          return sendJson(res, 200, {
            ok: true,
            engine: testRes.engine,
            provider: "ollama",
            message: `✅ Ollama 연결 성공! [${modelName}] 모델이 활성화되었습니다.\n(Jetson Orin/로컬 PC에서 100% 무료·무검열로 실시간 생성됩니다)`
          });
        } else {
          return sendJson(res, 400, {
            ok: false,
            error: testRes.error || "Ollama 서버 연결에 실패했습니다."
          });
        }
      }

      if (!rawKey) {
        store.savedApiKey = "";
        store.savedProvider = "auto";
        saveStore(store);
        return sendJson(res, 200, {
          ok: true,
          cleared: true,
          message: "API 키가 초기화되었습니다. 내장 한국어 페르소나 시뮬레이션 엔진으로 작동합니다."
        });
      }

      const testRes = await callUniversalLLM({
        systemPrompt: '반드시 다음 순수 JSON만 출력하세요: {"dialogue":"연결 성공"}',
        history: [],
        userMessage: "연결 테스트입니다.",
        apiKey: rawKey,
        provider,
        preferredModel
      });

      if (testRes.ok) {
        store.savedApiKey = rawKey;
        store.savedProvider = provider;
        store.savedModel = preferredModel;
        saveStore(store);
        return sendJson(res, 200, {
          ok: true,
          engine: testRes.engine,
          provider: testRes.provider,
          message: `✅ 연결 및 저장 완료! [${testRes.engine}] 모델이 모든 대화를 실시간 생성합니다.`
        });
      } else {
        return sendJson(res, 400, {
          ok: false,
          error: testRes.error || "API 키 인증에 실패했습니다."
        });
      }
    } catch (e) {
      return sendJson(res, 500, { ok: false, error: e.message });
    }
  }

  // 6b. GET /ko/api/chat/key-status
  if (req.method === 'GET' && pathname === '/ko/api/chat/key-status') {
    const hasKey = Boolean(store.savedApiKey);
    const provider = store.savedProvider || (hasKey ? detectProvider(store.savedApiKey, store.savedProvider) : "none");
    return sendJson(res, 200, {
      hasKey: hasKey || provider === 'ollama',
      provider,
      ollamaEndpoint: store.savedOllamaEndpoint || "http://127.0.0.1:11434",
      ollamaModel: store.savedOllamaModel || "qwen2.5:7b",
      maskedKey: provider === 'ollama' ? `Ollama (${store.savedOllamaModel || 'qwen2.5:7b'})` : (hasKey ? `${store.savedApiKey.slice(0, 6)}...${store.savedApiKey.slice(-4)}` : "")
    });
  }

  // 6c. GET /ko/api/chat/ollama-models
  if (req.method === 'GET' && pathname === '/ko/api/chat/ollama-models') {
    try {
      const endpoint = (parsedUrl.query.endpoint || store.savedOllamaEndpoint || 'http://127.0.0.1:11434').replace(/\/+$/, '');
      const resp = await fetch(`${endpoint}/api/tags`, { signal: AbortSignal.timeout(15000) });
      if (!resp.ok) {
        return sendJson(res, resp.status, { ok: false, error: `Ollama 응답 코드 ${resp.status}` });
      }
      const data = await resp.json();
      const models = Array.isArray(data.models) ? data.models.map(m => m.name) : [];
      return sendJson(res, 200, { ok: true, models, endpoint });
    } catch (e) {
      return sendJson(res, 500, {
        ok: false,
        error: `Ollama 서버(${parsedUrl.query.endpoint || 'http://127.0.0.1:11434'})에 연결할 수 없습니다: ${e.message}`
      });
    }
  }

  // 7. POST /ko/api/chat/message
  if (req.method === 'POST' && pathname === '/ko/api/chat/message') {
    try {
      const body = await parseBody(req);
      const charId = body.characterId || "segye-24-3c209e4d-custom";
      const character = store.characters[charId] || SEGYE24_CHARACTER;

      // Admin Only Character Access Gatekeeping
      if (character.adminOnly) {
        const authUser = getAuthUser(req);
        if (!authUser || authUser.role !== 'admin') {
          return sendJson(res, 403, {
            error: '👑 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.',
            code: 'ADMIN_ACCESS_RESTRICTED'
          });
        }
      }

      // 19+ Adult Character Access Gatekeeping
      if (character.isAdult) {
        const authUser = getAuthUser(req);
        if (!authUser || authUser.status !== 'approved' || !authUser.is_adult) {
          return sendJson(res, 403, {
            error: '🔞 19세 이상 캐릭터는 관리자 승인을 받은 정회원만 이용할 수 있습니다.',
            code: 'ADULT_ACCESS_RESTRICTED'
          });
        }
      }

      character.chatCount = (character.chatCount || 0) + 1;
      const result = await generateSimulationReply({
        character,
        userMessage: body.message || "",
        history: body.history || [],
        affection: body.affection ?? 15,
        unlockedKeywords: body.unlockedKeywords || [],
        userName: body.userName || "단골손님",
        userPersonaDesc: body.userPersonaDesc || "",
        currentLocation: body.currentLocation || character.location,
        apiKey: body.apiKey || store.savedApiKey || "",
        provider: body.provider || store.savedProvider || "auto",
        preferredModel: body.model || store.savedOllamaModel || store.savedModel || "",
        ollamaEndpoint: body.ollamaEndpoint || store.savedOllamaEndpoint
      });
      saveStore(store);

      // Multi-User DB Persistence (SQLite)
      const authUser = getAuthUser(req);
      if (authUser && body.roomId) {
        let existingRoom = dbLayer.getRoom(authUser.id, body.roomId);
        if (!existingRoom) {
          dbLayer.saveRoom(authUser.id, {
            roomId: body.roomId,
            characterId: charId,
            title: body.roomTitle || "대화 세션",
            userName: body.userName || authUser.nickname || "단골손님",
            userPersonaDesc: body.userPersonaDesc || "",
            affection: body.affection ?? 15,
            stage: 1,
            currentSceneKey: "",
            currentTimePlace: body.currentLocation || "",
            currentMood: ""
          });
        }
        dbLayer.addMessageToRoom(body.roomId, { role: 'user', text: body.message || '' });
        dbLayer.addMessageToRoom(body.roomId, {
          role: 'assistant',
          text: result.text,
          imageKey: result.imageKey,
          sceneTitle: result.sceneTitle,
          timePlace: result.timePlace,
          mood: result.mood,
          affection: result.affection,
          prevAffection: result.prevAffection,
          delta: result.delta,
          affectionReason: result.affectionReason,
          innerThought: result.innerThought,
          engine: result.engine,
          apiError: result.apiError,
          isDerailing: result.isDerailing,
          derailmentReason: result.derailmentReason,
          branches: result.branches
        });
        dbLayer.updateRoomState(body.roomId, {
          affection: result.affection,
          stage: result.stage,
          currentSceneKey: result.imageKey,
          currentTimePlace: result.timePlace,
          currentMood: result.mood,
          unlockedKeywords: result.unlockedKeywords,
          replySuggestions: result.replySuggestions,
          branches: result.branches
        });
      }

      return sendJson(res, 200, result);
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // 8. POST /ko/api/chat/new-room
  if (req.method === 'POST' && pathname === '/ko/api/chat/new-room') {
    try {
      const body = await parseBody(req);
      const charId = body.characterId || "segye-24-3c209e4d-custom";
      const character = store.characters[charId] || SEGYE24_CHARACTER;

      // Admin Only Character Access Gatekeeping
      if (character.adminOnly) {
        const authUser = getAuthUser(req);
        if (!authUser || authUser.role !== 'admin') {
          return sendJson(res, 403, {
            error: '👑 관리자(Admin) 전용 캐릭터입니다. 관리자 계정으로 로그인해 주세요.',
            code: 'ADMIN_ACCESS_RESTRICTED'
          });
        }
      }

      // 19+ Adult Character Access Gatekeeping
      if (character.isAdult) {
        const authUser = getAuthUser(req);
        if (!authUser || authUser.status !== 'approved' || !authUser.is_adult) {
          return sendJson(res, 403, {
            error: '🔞 19세 이상 캐릭터는 관리자 승인을 받은 정회원만 이용할 수 있습니다.',
            code: 'ADULT_ACCESS_RESTRICTED'
          });
        }
      }

      const opening = await generateCustomOpeningScene({
        character,
        customSituation: body.customSituation || "새벽 3시, 지하 PC방 카운터 앞",
        userName: body.userName || "단골손님",
        userPersonaDesc: body.userPersonaDesc || "",
        initialAffection: body.initialAffection ?? 15,
        apiKey: body.apiKey || store.savedApiKey || "",
        provider: body.provider || store.savedProvider || "auto",
        preferredModel: body.model || store.savedOllamaModel || store.savedModel || "",
        ollamaEndpoint: body.ollamaEndpoint || store.savedOllamaEndpoint
      });

      // Multi-User DB Persistence for new room
      const authUser = getAuthUser(req);
      if (authUser && body.roomId) {
        dbLayer.saveRoom(authUser.id, {
          roomId: body.roomId,
          characterId: charId,
          title: opening.sceneTitle,
          userName: body.userName || '단골손님',
          userPersonaDesc: body.userPersonaDesc || '',
          affection: opening.affection,
          stage: opening.stage,
          currentSceneKey: opening.imageKey,
          currentTimePlace: opening.timePlace,
          currentMood: opening.mood,
          unlockedKeywords: [],
          replySuggestions: opening.replySuggestions || [],
          branches: opening.branches || [],
          messages: [
            {
              role: 'assistant',
              text: opening.text,
              imageKey: opening.imageKey,
              sceneTitle: opening.sceneTitle,
              timePlace: opening.timePlace,
              mood: opening.mood,
              affection: opening.affection,
              prevAffection: opening.affection,
              delta: 0,
              affectionReason: '새로운 상황으로 대화 시작',
              innerThought: opening.innerThought,
              engine: opening.engine,
              branches: opening.branches || []
            }
          ]
        });
      }

      return sendJson(res, 200, opening);
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // 9. Static files
  let filePath = pathname === '/' ? path.join(PUBLIC_DIR, 'index.html') : path.join(PUBLIC_DIR, pathname);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    return fs.createReadStream(filePath).pipe(res);
  }

  const indexHtml = path.join(PUBLIC_DIR, 'index.html');
  if (fs.existsSync(indexHtml)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return fs.createReadStream(indexHtml).pipe(res);
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`[Segye 24 Simulation Web Service] Running at http://localhost:${PORT}`);
});
