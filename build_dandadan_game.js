const fs = require('fs');
const path = require('path');

const brainDir = "C:/Users/Sim's/.gemini/antigravity/brain/d5aa5067-2fcb-48ff-987e-d41735d14a6a";
const publicDir = "C:/Users/Sim's/.gemini/antigravity/scratch/segye24-web/public";

// Complete Dialogue Script for Dandadan Episode 1 (Chapters 1 & 2)
// Faithful to canonical manga scenes, dialogue, and pacing.
const dandadanEpisode1Script = [
  // ==========================================
  // CHAPTER 1: 그것이 사랑의 시작이었어
  // PART 1: 복도의 결별과 오카룬의 구출
  // ==========================================
  {
    id: 1,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "방과 후 복도의 결별",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "웃기지 마! 양다리 걸친 주제에 어디서 혓바닥을 놀려?! 당장 내 눈앞에서 꺼져!!",
    thought: "하아... 진짜 어이없네. 내 이상형은 터프하고 우직한 '타카쿠라 켄' 같은 상남자란 말이야! 저런 날라리 바람둥이 따위!",
    mangaNote: "만화 1화 2~3p: 복도에서 바람둥이 전남친을 매몰차게 차버리고 뒤돌아서는 당찬 갸루 아야세 모모의 첫 등장 컷!",
    expression: "momo-angry",
    effect: "shake-light",
    sfx: "slap"
  },
  {
    id: 2,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "불량배들의 괴롭힘 현장",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "불량배 1",
    speakerType: "delinquent",
    text: "야, 외계인 오타쿠 녀석! 오늘도 화성인이랑 텔레파시 통했냐? 크큭, 안경이나 벗어봐!",
    thought: "",
    mangaNote: "만화 1화 4p: 복도 구석에서 불량배 세 명이 안경 쓴 남학생을 에워싸고 오컬트 잡지 『무(MU)』를 빼앗으며 비웃는 장면.",
    expression: "delinquent",
    effect: "",
    sfx: ""
  },
  {
    id: 3,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "오카룬의 저항",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "큭... 제 『무(MU)』 잡지 돌려주세요! 외계인은 비과학적 장난이 아닙니다! 실제로 존재한다고요...!",
    thought: "또 시작이야... 친구 한 명 없이 외계인만 파고들다 보니 늘 이런 꼴이지. 하지만 외계인은 진짜란 말입니다...",
    mangaNote: "만화 1화 5p: 안경을 뺏긴 채 웅크리고 있지만 외계인에 대한 신념만큼은 꺾지 않는 오카룬의 첫 모습.",
    expression: "okarun-nervous",
    effect: "",
    sfx: ""
  },
  {
    id: 4,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "모모의 회전 날아차기!",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "야—!! 찌질하게 떼거지로 몰려와서 남의 물건 뺏고 뭐 하는 짓이야?! 뒈져라, 이 멍청이들아!!",
    thought: "남자가 치사하게 셋이서 하나를 괴롭혀? 내 성격에 저 꼴은 절대로 못 넘어가!",
    mangaNote: "만화 1화 6p: 교복 치마 아래로 늘씬하고 탄탄한 다리를 뻗어 불량배의 뒤통수에 꽂아 넣는 다이내믹 하이앵글 로우킥!",
    expression: "momo-kick",
    effect: "shake-heavy",
    sfx: "punch"
  },
  {
    id: 5,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "불량배 격퇴 후",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "콰아앙-! 호쾌한 소리와 함께 앞장서던 불량배의 머리가 복도 바닥에 내리꽂혔다. 겁에 질린 불량배 패거리들은 비명을 지르며 꽁무니를 뺐다.",
    thought: "",
    mangaNote: "만화 1화 7p: 흩어진 『무』 잡지를 툭툭 털며 건네주는 모모와, 얼떨떨하게 안경을 고쳐 쓰는 오카룬의 투샷.",
    expression: "momo-confident",
    effect: "",
    sfx: ""
  },
  {
    id: 6,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "교실에서의 오해와 열변",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "저, 저기... 구해줘서 감사합니다! 호, 혹시... 당신도 오컬트를 좋아하십니까?! 외계인의 존재를 믿으시는 건가요?!",
    thought: "날 구해줬어... 그것도 이렇게 예쁜 갸루가 내 잡지를 주워줬다고?! 혹시 나와 같은 오컬트 마니아인 걸까?!",
    mangaNote: "만화 1화 8p: 얼굴을 붉히며 흥분한 채 잡지를 가슴에 품고 다가오는 오카룬의 간절한 표정.",
    expression: "okarun-passionate",
    effect: "",
    sfx: ""
  },
  {
    id: 7,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "모모의 반격: 유령 vs 외계인",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "하아?! 외계인? 멍청아, 그딴 징그러운 외계인이 세상에 어딨어! 유령이라면 모를까! 우리 할머니가 영매사란 말이야!",
    thought: "뭐야 이 녀석, 내가 구해줬더니 이상한 외계인 타령을 늘어놓네? 으, 눈치 없는 건 딱 질색인데.",
    mangaNote: "만화 1화 9p: 손가락으로 이마를 짚으며 혀를 차는 모모. 유령 잡지와 외계인 잡지를 들이대며 불꽃 튀는 눈싸움 개시!",
    expression: "momo-disgust",
    effect: "",
    sfx: ""
  },
  {
    id: 8,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "자존심을 건 초자연 논쟁",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "유령 따윈 뇌내 망상이 만들어낸 비과학적 미신입니다! 관측 가능한 우주에 천억 개의 은하계가 있는데 지적 생명체가 없을 확률은 0%라고요!",
    thought: "외계인을 모욕하는 건 참을 수 없습니다! NASA와 로스웰 사건의 기록을 들이대서라도 증명해 보이겠습니다!",
    mangaNote: "만화 1화 10p: 안경을 치켜올리며 삿대질하는 오카룬과 책상을 탕 치며 일어서는 모모의 격렬한 분할 컷.",
    expression: "okarun-angry",
    effect: "shake-light",
    sfx: ""
  },
  {
    id: 9,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "모모의 승부수",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "시끄러워! 영혼은 진짜 존재해! 할머니 밑에서 자란 내가 모를 줄 알아?! 그렇게 자신 있으면 어디 한번 직접 가서 증명해 보든가!!",
    thought: "이 녀석, 소심한 줄 알았더니 말대꾸 하나는 기가 막히네. 절대 질 수 없어!",
    mangaNote: "만화 1화 11p: 자존심이 폭발하여 내기를 제안하는 모모의 당당하고 불타는 눈빛.",
    expression: "momo-angry",
    effect: "",
    sfx: ""
  },

  // ==========================================
  // CHOICE 1: 심야의 내기 조건 설정
  // ==========================================
  {
    id: 10,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "플레이어 선택의 순간: 내기 조건",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "좋아, 오타쿠 녀석! 말 나온 김에 오늘 밤 자정에 끝장을 보자!",
    thought: "어떤 조건을 걸어야 저 콧대를 납작하게 누를 수 있을까?",
    mangaNote: "플레이어 인터랙티브 분기: 원작 정통 대사 vs 모모의 츤데레 도발",
    expression: "momo-confident",
    choice: {
      prompt: "오카룬에게 제시할 내기 조건을 선택하세요:",
      options: [
        {
          text: "\"넌 심령 스폿 '쇼타 터널'로 가. 난 UFO 출몰지 '폐병원'으로 갈 테니까! 지는 쪽이 이기는 쪽의 노예야!\"",
          reactionText: "좋습니다! 지는 쪽이 이기는 쪽의 노예가 되는 겁니다! 통화 켜놓고 각자 진입합시다!",
          reactionThought: "노예라니... 무섭지만 외계인의 진실을 위해서라면 피하지 않습니다!",
          delta: "⚡ 원작 정통 루트 확정! 승부욕 +15 상승"
        },
        {
          text: "\"안경 벗으니까 생각보다 눈은 맑은 녀석이 왜 이렇게 똥고집이야?! 좋아, 진 사람이 내일 학교 매점에서 빵 사주기다!\"",
          reactionText: "제, 제 눈이 맑다고요...?! 아, 아무튼 빵이든 뭐든 외계인의 존재를 증명하면 그만입니다!",
          reactionThought: "갸루한테 눈이 맑다는 칭찬을 들었어... 심장이 덜컥 내려앉네. 하지만 질 순 없습니다!",
          delta: "💖 모모의 숨겨진 심쿵! 호감도 +20 상승"
        }
      ]
    }
  },

  {
    id: 11,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "이름의 충격: 타카쿠라 켄?!",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "난 1학년 아야세 모모야. 그러는 네 이름은 뭔데?",
    thought: "노예 계약서라도 쓰려면 이름은 알아둬야지.",
    mangaNote: "만화 1화 12p: 모모가 팔짱을 끼며 이름을 묻는 컷.",
    expression: "momo-smug",
    effect: "",
    sfx: ""
  },
  {
    id: 12,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "충격의 자기소개",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "저... 타카쿠라 켄(高倉 健)이라고 합니다.",
    thought: "늘 오타쿠라고만 불려서 내 이름을 말하는 건 참 오랜만이네...",
    mangaNote: "만화 1화 13p: 수줍게 자기 이름을 말하는 오카룬의 컷.",
    expression: "okarun-nervous",
    effect: "",
    sfx: ""
  },
  {
    id: 13,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "경악하는 모모",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "하아아아아아?!?!?! 타, 타카쿠라 켄이라고오오오?!?!",
    thought: "타카쿠라 켄?! 내 인생 최고의 이상형이자 카리스마 배우와 동성동명이라고?! 이 찌질하고 비쩍 마른 외계인 오타쿠가?! 말도 안 돼!!",
    mangaNote: "만화 1화 14p: 눈알이 튀어나올 듯 경악하며 얼굴이 새빨개지는 모모의 충격 클로즈업 컷!",
    expression: "momo-shock",
    effect: "flash-white",
    sfx: "heartbeat"
  },
  {
    id: 14,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "별명 '오카룬'의 탄생",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "절대로 안 돼!! 그 성스러운 이름을 네 입으로 부르지도 마!! 넌 이제부터 '오카룬(오컬트 군)'이야! 알겠어?!",
    thought: "저 얼굴을 보고 '켄 군'이라고 부르면 내 심장이 터져버릴지도 모른다고! 절대 안 돼!",
    mangaNote: "만화 1화 15p: 삿대질하며 강제로 별명을 붙여버리는 모모와 당황하는 오카룬.",
    expression: "momo-blush",
    effect: "",
    sfx: ""
  },
  {
    id: 15,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "자정의 현장 진입 (통화 연결)",
    bg: "/assets/segye_occult/01_vol1_prologue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "여보세요, 오카룬? 난 산속 외계인 출몰지 '폐병원'에 도착했거든? 외계인 같은 건 눈 씻고 찾아봐도 없어! 넌 이제 내 노예 확정이다!",
    thought: "으... 솔직히 밤이라 분위기가 좀 오싹하긴 하네. 폐병원 냄새도 고약하고...",
    mangaNote: "만화 1화 16p: 손전등을 켜고 폐병원 계단을 오르는 모모와 스마트폰 스피커폰 컷.",
    expression: "momo-nervous",
    effect: "",
    sfx: ""
  },
  {
    id: 16,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "쇼타 터널의 이변",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "아야세 씨, 저도 악명 높은 심령 스폿 '쇼타 터널' 한복판에 와 있습니다. 하지만 귀신 같은 건 과학적으로... 어? 어라...?",
    thought: "뭐지? 터널 안쪽에서 묘한 바람이 불어오는데... 온도가 순식간에 영하로 떨어진 것 같아...",
    mangaNote: "만화 1화 17p: 주황색 비상등이 기괴하게 깜빡이는 터널 천장을 올려다보며 얼어붙는 오카룬.",
    expression: "okarun-fear",
    effect: "shake-light",
    sfx: ""
  },
  {
    id: 17,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "터보 할멈의 습격!",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "터보 할멈",
    speakerType: "turbo",
    text: "우헤헤헤헤헤!! 거시기 빨게 해줘어어어어어-!!!!",
    thought: "",
    mangaNote: "만화 1화 18p: 시속 100km의 속도로 터널 벽을 타고 네 발로 질주해 오며 광기 어린 괴성을 지르는 터보 할멈의 충격 컷!",
    expression: "turbo-granny",
    effect: "flash-red",
    sfx: "screamer"
  },
  {
    id: 18,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "오카룬의 절규와 통화 두절",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "으아아아아아악!! 할머니 귀신이 시속 100km로 쫓아와요오오!! 살려주세요오오오-!! (치지직— 뚝!)",
    thought: "말도 안 돼, 유령이 진짜 있었어?! 거시기를 달라고?! 으아악 내 몸이 잠식당한다아아!!",
    mangaNote: "만화 1화 19p: 스마트폰을 떨어뜨리며 저주에 침식당하는 오카룬과 통화가 끊기는 연출.",
    expression: "okarun-screaming",
    effect: "shake-heavy",
    sfx: "static"
  },
  {
    id: 19,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "폐병원의 이변: 견인 광선!",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "오카룬?! 야, 오카룬!! 대답해 봐!! ...어? 이 빛은 뭐야...?! 몸이 안 움직여?!",
    thought: "통화가 끊겼어... 그 녀석 진짜 귀신을 만난 거야?! 근데 내 몸이 왜 공중에 떠오르지?!",
    mangaNote: "만화 1화 20p: 천장에서 쏟아지는 정체불명의 네온 초록빛 빔에 결박되어 공중에 띄워지는 모모.",
    expression: "momo-shock",
    effect: "flash-green",
    sfx: "beam"
  },
  {
    id: 20,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "세르포 성인의 등장",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "세르포 성인",
    speakerType: "serpo",
    text: "지구의 암컷 개체를 포획했다. 우리는 클론 복제로 인해 생식 기능이 퇴화했다. 생식기(바나나)의 유전 정보를 채취하기 위해 신체검사를 개시한다.",
    thought: "",
    mangaNote: "만화 1화 21~22p: 회색 슈트를 입고 모노클을 낀 똑같은 얼굴의 외계인 클론들이 메스를 들고 접근하는 호러 연출.",
    expression: "serpo-alien",
    effect: "",
    sfx: ""
  },
  {
    id: 21,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "모모의 절체절명 위기",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "손대지 마!! 저리 가, 이 변태 외계인 괴물들아!! 만지지 말라고오오!!",
    thought: "투명한 힘으로 내 옷이 찢겨나가고 있어... 무서워... 할머니... 오카룬, 제발 날 구해줘...!!",
    mangaNote: "만화 1화 23p: 눈물을 뚝뚝 흘리며 공포에 질려 절규하는 모모의 처절한 표정.",
    expression: "momo-crying",
    effect: "shake-light",
    sfx: "tear"
  },

  // ==========================================
  // CHOICE 2: 모모의 잠재 영력 폭발
  // ==========================================
  {
    id: 22,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "플레이어 선택의 순간: 극한의 감정 폭발",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "외계인 손이 닿기 직전, 모모의 가슴 깊은 곳에서 뜨거운 불길이 치솟는다!",
    thought: "내가 이딴 놈들한테 당할 것 같아?!",
    mangaNote: "플레이어 인터랙티브 분기: 영매사의 피 각성 vs 오카룬을 향한 부르짖음",
    expression: "momo-crying",
    choice: {
      prompt: "모모의 극한 감정을 어디로 폭발시킬까요?",
      options: [
        {
          text: "\"꺼져라, 변태 자식들아!! 내 몸에 손끝 하나라도 대면 가루로 만들어버린다!!\"",
          reactionText: "모모의 온몸에서 눈부신 푸른 영력 오라가 폭풍처럼 뿜어져 나온다!",
          reactionThought: "우리 할머니 영매사의 피를 얕보지 마! 내 모든 힘을 끌어내겠어!",
          delta: "⚡ 영력 잠재력 100% 개방! 초능력 각성 +25"
        },
        {
          text: "\"오카룬!! 날 구하러 와줘!! 제발 살려줘어어어!!\"",
          reactionText: "모모의 간절한 목소리가 허공의 영적 주파수를 타고 퍼져나간다!",
          reactionThought: "그 녀석이 약속했어... 내 파트너가 되어주겠다고! 믿고 있어, 오카룬!",
          delta: "💖 오카룬과의 영혼 결속! 유대감 +30 상승"
        }
      ]
    }
  },

  {
    id: 23,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "거대 염동력 손 각성!",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "콰아아아아앙!! 눈부신 푸른 영력의 불꽃과 함께, 허공에 거대한 초능력 염동력 손이 실체화되었다! 거대 손이 세르포 성인들을 벽으로 패대기쳤다!",
    thought: "",
    mangaNote: "만화 1화 24p: 모모의 등 뒤로 솟구쳐 오른 영적 거대 초능력 손의 웅장한 각성 컷!",
    expression: "momo-awakened",
    effect: "flash-white",
    sfx: "magic"
  },
  {
    id: 24,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "벽을 부수고 난입한 요괴 오카룬!",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "요괴 오카룬",
    speakerType: "demon-okarun",
    text: "내 거시기이이이이!! 내 거시기 내놔아아아아아-!!!!",
    thought: "머릿속이 피로 물든다... 하지만 저 녀석들을 찢어발겨야 내 바나나를 찾을 수 있어...!",
    mangaNote: "만화 1화 25p: 폐병원 콘크리트 벽을 뚫고 시속 100km로 날아 들어온 은발의 요괴 오카룬!",
    expression: "okarun-berserk",
    effect: "shake-heavy",
    sfx: "explosion"
  },
  {
    id: 25,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "세르포 성인 학살과 폭주",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "터보 할멈의 저주를 온몸에 두른 오카룬은 광속의 스피드로 세르포 성인의 우주선 기기를 산산조각 내며 외계인들을 도륙했다! 그러나—살육의 흥분에 휩싸인 오카룬의 붉은 눈동자가 모모를 향했다!",
    thought: "",
    mangaNote: "만화 1화 26~27p: 피아식별을 잃고 이빨을 드러내며 모모에게 달려드는 요괴 오카룬.",
    expression: "okarun-berserk",
    effect: "flash-red",
    sfx: "screamer"
  },
  {
    id: 26,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "도망치지 않는 모모",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "오카룬...?! 저 몰골은 대체 뭐야...?! 하지만... 저 녀석은 날 구하려고 여기까지 온 거잖아!!",
    thought: "도망치면 얜 완전히 괴물이 되어버려. 내가 막아야 해!",
    mangaNote: "만화 1화 28p: 날아오는 괴물 오카룬을 피하지 않고 두 발로 단단히 버티고 서는 모모.",
    expression: "momo-determined",
    effect: "",
    sfx: "heartbeat"
  },
  {
    id: 27,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "명장면: 턱을 틀어잡은 거대 손! (1화 클라이맥스)",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "정신 차려, 이 바보야아아아!! 날 봐!! 네가 날 구하러 여기까지 온 거잖아!!",
    thought: "제발 돌아와... 오카룬, 네 눈빛을 보여줘!!",
    mangaNote: "만화 1화 29~31p 더블 스프레드: 거대한 염동력 손으로 포효하는 오카룬의 턱을 단단히 쥐고 시선을 맞추며 포효하는 모모의 결정적 투샷!",
    expression: "momo-jaw-grab",
    effect: "shake-heavy",
    sfx: "whoosh"
  },
  {
    id: 28,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "되찾은 이성과 탈출",
    bg: "/assets/segye_occult/01_vol1_encounter.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "...아... 야세... 씨...? 당신... 무사했군요...",
    thought: "따뜻한 손길이야... 아야세 씨의 눈동자가 보여. 날 두려워하지 않고 바라봐주고 있어...",
    mangaNote: "만화 1화 32p: 붉은 안광이 사그라들며 모모를 알아보고 눈물을 글썽이는 오카룬.",
    expression: "okarun-tears",
    effect: "",
    sfx: ""
  },
  {
    id: 29,
    chapter: "제1화: 그것이 사랑의 시작이었어",
    sceneTitle: "1화 피날레: 그것이 사랑의 시작이었어",
    bg: "/assets/segye_occult/01_vol1_epilogue.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "콰아아앙! 세르포 성인의 모선이 대폭발을 일으키며 폐병원이 화염에 휩싸였다. 모모는 오카룬의 손을 꼭 쥔 채 새벽의 여명 속으로 뛰어내렸다. 유령도, 외계인도... 둘 다 진짜였다. 그리고 이것이, 두 사람의 운명적인 사랑의 시작이었다.",
    thought: "",
    mangaNote: "만화 1화 33p 라스트 컷: 불타는 병원을 등지고 손을 잡고 달리는 두 사람의 실루엣과 1화 타이틀 회수.",
    expression: "momo-smile",
    effect: "flash-white",
    sfx: "explosion"
  },

  // ==========================================
  // CHAPTER 2: 그게 바로 외계인이잖아
  // PART 2: 신사의 아침과 킨타마 소실 비극
  // ==========================================
  {
    id: 30,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "아야세 신사의 아침",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "으으... 머리가 깨질 것 같습니다... 어라? 여긴 다다미방...? 제가 살아서 아침을 맞이한 겁니까...?",
    thought: "어젯밤 폐병원에서 괴물로 변했던 기억이 주마등처럼 스쳐 지나가는데... 대체 여긴 어디지?",
    mangaNote: "만화 2화 1p: 전통 다다미방 이불 위에서 눈을 비비며 일어나는 오카룬.",
    expression: "okarun-confused",
    effect: "",
    sfx: ""
  },
  {
    id: 31,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "모모의 등장과 얼음주머니",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "일어났냐, 오타쿠? 정신이 좀 들어? 자, 이마에 얼음주머니나 대고 있어.",
    thought: "진짜 밤새 끙끙 앓아서 죽는 줄 알았잖아... 그래도 눈 뜨니까 다행이네.",
    mangaNote: "만화 2화 2p: 사복 반바지에 티셔츠를 입고 얼음주머니를 툭 던져주는 츤데레 모모.",
    expression: "momo-gentle",
    effect: "",
    sfx: ""
  },
  {
    id: 32,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "신사 결계의 안전지대",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "여긴 우리 할머니 신사야. 입구에 대대로 내려오는 강력한 결계 부적이 붙어 있어서 악령도 외계인도 함부로 못 들어와.",
    thought: "밖으로 나갔다간 너 또 터보 할멈 저주로 폭주할 테니까 말이지.",
    mangaNote: "만화 2화 3p: 신사 마당의 도리이와 결계 부적을 가리키는 모모.",
    expression: "momo-confident",
    effect: "",
    sfx: ""
  },
  {
    id: 33,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "화장실 가려던 오카룬의 이변",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "아야세 씨, 살려주셔서 정말 감사합니다... 저, 화장실 좀 다녀오겠습니다... 으응? 어라...?",
    thought: "걸을 때마다 가랑이 사이가 뭔가... 너무 가볍고 이상한데...? 통풍이 왜 이렇게 잘 되지...?",
    mangaNote: "만화 2화 4p: 일어서서 바지 앞섶을 만지작거리며 동공지진을 일으키는 오카룬.",
    expression: "okarun-sweat",
    effect: "",
    sfx: ""
  },
  {
    id: 34,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "사라진 바나나(킨타마)의 충격!!",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "어?! 어어어?! 어어어어어어어?!?!?! 없어요!! 없습니다아아아아-!!!!",
    thought: "매끈해... 아무것도 없어... 내 바나나가... 내 소중한 킨타마(불알)가 통째로 사라졌다고오오오!!",
    mangaNote: "만화 2화 5p: 바지 속으로 손을 집어넣었다가 핏기가 싹 가시며 절규하는 오카룬의 멘붕 컷!",
    expression: "okarun-crying",
    effect: "shake-heavy",
    sfx: "scream"
  },
  {
    id: 35,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "모모의 극대노 & 경악",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "꺄아아아아악!! 대낮부터 바지에 손 넣고 무슨 짓이야, 이 변태 새끼야!!",
    thought: "미쳤어, 진짜 미쳤어!! 내 앞에서 거시기 만지면서 소리를 지르고 난리야!!",
    mangaNote: "만화 2화 6p: 베개를 오카룬의 얼굴에 풀스윙으로 집어던지는 모모.",
    expression: "momo-angry",
    effect: "shake-light",
    sfx: "punch"
  },
  {
    id: 36,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "오카룬의 피눈물 고백",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "변태가 아닙니다!! 제 바나나가 진짜로 사라졌단 말입니다!! 터보 할멈 놈이 '거시기 빨게 해줘' 하더니 진짜로 뜯어갔어요!!",
    thought: "난 이제 남자가 아니야... 인간으로 살아갈 수 없어... 흑흑흑...",
    mangaNote: "만화 2화 7p: 바닥에 이마를 찧으며 피눈물을 흘리는 오카룬.",
    expression: "okarun-crying",
    effect: "",
    sfx: ""
  },

  // ==========================================
  // CHOICE 3: 모모의 반응 (킨타마 소실 확인)
  // ==========================================
  {
    id: 37,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "플레이어 선택의 순간: 모모의 확인",
    bg: "/assets/segye_occult/01_vol1_extra1_locker_hide.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "너무나 절박하게 우는 오카룬을 보며, 모모는 당황하여 뺨을 붉힌다.",
    thought: "설마 진짜로... 터보 할멈한테 거시기를 뺏겼다고...?!",
    mangaNote: "플레이어 인터랙티브 분기: 손가락 틈새 훔쳐보기 vs 당찬 위로와 등짝 스매싱",
    expression: "momo-blush",
    choice: {
      prompt: "모모는 절망하는 오카룬에게 어떻게 반응할까요?",
      options: [
        {
          text: "\"거, 거짓말하지 마! ...잠깐 슬쩍만 볼 테니까 가만히 있어봐! (손가락 틈새로 빼꼼)\"",
          reactionText: "으아악!! 진짜로... 아무것도 없이 매끈하잖아?! 이 녀석 어떡해!!",
          reactionThought: "얼굴 빨개져서 미치겠네... 근데 진짜 없잖아?! 평생 고자로 살면 어떡해!!",
          delta: "💖 원작 100% 코믹 재현! 모모 부끄러움 맥스! 호감도 +25"
        },
        {
          text: "\"등짝 찰싹 때리며! '바보야, 기죽지 마! 내가 그 터보 할멈 엉덩이를 걷어차서 반드시 되찾아줄 테니까!!'\"",
          reactionText: "아, 아야세 씨... 절 위해 제 바나나를 되찾아주시는 겁니까...?!",
          reactionThought: "아야세 씨는 천사인가...? 내 인생의 구원자야...!",
          delta: "⚡ 최고의 듬직한 파트너십! 신뢰도 +30 상승"
        }
      ]
    }
  },

  {
    id: 38,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "결계의 틈: 부적이 떨어지다!",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "휘이이이잉—! 갑자기 차가운 돌풍이 불어 닥치며, 신사 도리이에 붙어 있던 강력한 퇴마 결계 부적 한 장이 펄럭이며 땅으로 떨어졌다!",
    thought: "",
    mangaNote: "만화 2화 8p: 결계 부적이 떨어지며 신사 주변의 공기가 뒤틀리는 불길한 컷.",
    expression: "momo-shock",
    effect: "shake-light",
    sfx: "wind"
  },
  {
    id: 39,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "3m 플랫우즈 몬스터 강림!!",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "쿠구구구궁— 콰아아앙!! 하늘이 보랏빛으로 갈라지며, 신사 마당 한가운데 3m가 넘는 거대한 괴물이 쿵! 하고 착지했다! 면사포를 쓴 스모 선수 형상의 외계인, '플랫우즈 몬스터'였다!",
    thought: "",
    mangaNote: "만화 2화 9~10p: 마당에 착지한 거대 플랫우즈 몬스터의 위압적인 풀샷!",
    expression: "flatwoods-monster",
    effect: "shake-heavy",
    sfx: "explosion"
  },
  {
    id: 40,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "검은 독안개 살포",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "플랫우즈 몬스터",
    speakerType: "monster",
    text: "쉬이이이이익—!! (치명적인 검은 독안개를 마당 전체로 뿜어낸다!)",
    thought: "",
    mangaNote: "만화 2화 11p: 마당을 가득 채우는 치명적인 독가스 연기.",
    expression: "flatwoods-monster",
    effect: "flash-green",
    sfx: "gas"
  },
  {
    id: 41,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "모모의 마비와 위기",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "쿨럭! 콜록콜록...! 독가스야... 몸이 마비돼서 손가락 하나 안 움직여...!",
    thought: "안 돼... 초능력 손을 쓸 힘도 안 들어가... 저 괴물이 다가오고 있어...!",
    mangaNote: "만화 2화 12p: 마루에 쓰러져 기침을 토하는 모모와 다가오는 3m 외계인의 거구.",
    expression: "momo-crying",
    effect: "shake-light",
    sfx: ""
  },
  {
    id: 42,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "오카룬의 부분 요괴화 각성",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "아야세 씨를... 건드리지 마라아아아-!!!!",
    thought: "아야세 씨가 날 구해줬어. 날 믿어줬어. 이번엔 내가 아야세 씨를 지킬 차례야!! 터보 할멈의 힘이든 뭐든 다 써주마!!",
    mangaNote: "만화 2화 13p: 터보 저주를 의지력으로 끌어올려 백발과 날카로운 이빨의 부분 요괴화 상태로 각성하는 오카룬!",
    expression: "okarun-berserk",
    effect: "flash-red",
    sfx: "screamer"
  },
  {
    id: 43,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "작전 제안: 초능력 손의 고삐!",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "아야세 씨! 초능력 손으로 제 목(턱끈)을 쥐고 조종해 주세요!! 제 몸을 탄환 삼아 저 녀석에게 돌진하겠습니다!!",
    thought: "내 몸의 스피드는 시속 100km! 아야세 씨의 손이 조준해주면 절대 빗나가지 않습니다!",
    mangaNote: "만화 2화 14p: 낮은 스모 자세(돗시리)를 잡고 모모를 돌아보며 외치는 오카룬의 결의!",
    expression: "okarun-determined",
    effect: "",
    sfx: ""
  },
  {
    id: 44,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "모모의 고삐 쥐기 & 전력 신뢰",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "알았어, 오카룬!! 널 믿을게!! 내 염동력 손으로 고삐 꽉 쥐고 있을 테니까, 시원하게 날려버려, 파트너!!!!",
    thought: "이 녀석, 눈빛이 완전히 바뀌었어... 진짜 믿음직스럽잖아!",
    mangaNote: "만화 2화 15p: 마루에서 거대 염동력 손을 펼쳐 오카룬의 목덜미를 고삐처럼 움켜쥐는 모모!",
    expression: "momo-determined",
    effect: "flash-white",
    sfx: "magic"
  },
  {
    id: 45,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "시속 100km 초고속 스모 태클 작렬!!",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "도도도도동— 콰아아아아앙!! 시속 100km의 맹렬한 가속력과 모모의 초능력 손이 합체된 초고속 스모 태클이 플랫우즈 몬스터의 명치에 정확히 꽂혔다! 3m 거구의 외계인이 담장을 뚫고 허공으로 솟구쳤다!",
    thought: "",
    mangaNote: "만화 2화 16~17p 더블 스프레드: 광각 왜곡 로우앵글로 괴물의 복부를 뚫어버릴 듯 작렬하는 오카룬의 호쾌한 스모 박치기!",
    expression: "okarun-berserk",
    effect: "shake-heavy",
    sfx: "explosion"
  },
  {
    id: 46,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "괴물 격퇴와 논바닥 추락",
    bg: "/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "푸화아아악! 담장 밖 저 멀리 논바닥으로 처박힌 플랫우즈 몬스터는 흙탕물을 뒤집어쓴 채 비명을 지르며 도망쳤다!",
    thought: "",
    mangaNote: "만화 2화 18p: 논바닥에 거꾸로 처박혀 다리를 버둥거리는 괴물의 코믹 격퇴 컷.",
    expression: "flatwoods-monster",
    effect: "",
    sfx: "splash"
  },
  {
    id: 47,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "결계 부적 복구",
    bg: "/assets/segye_occult/01_vol1_extra2_talisman_cut.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "지금이야!! (도리이 기둥으로 달려가 떨어진 결계 부적을 찰싹 붙인다!) 에잇! 절대 못 들어오게 꽁꽁 묶여라!!",
    thought: "휴... 황금빛 결계가 다시 작동했어. 이제 안으로 못 들어와!",
    mangaNote: "만화 2화 19p: 결계 부적을 다시 붙이며 안도하는 모모의 뒷모습.",
    expression: "momo-confident",
    effect: "flash-white",
    sfx: "talisman"
  },
  {
    id: 48,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "탈진한 오카룬과 수건 닦아주기",
    bg: "/assets/segye_occult/01_vol1_epilogue.jpg",
    speaker: "오카룬 (타카쿠라 켄)",
    speakerType: "okarun",
    text: "하아... 하아... 아야세 씨... 해치웠... 군요... 털썩.",
    thought: "온몸의 뼈마디가 부서질 것 같아... 하지만 아야세 씨를 지켰어...",
    mangaNote: "만화 2화 20p: 인간 모습으로 돌아와 툇마루에 쓰러지듯 눕는 오카룬.",
    expression: "okarun-tired",
    effect: "",
    sfx: ""
  },
  {
    id: 49,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "모모의 진심 어린 온기",
    bg: "/assets/segye_occult/01_vol1_epilogue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "수고했어, 오카룬. 너 진짜 대단하더라... 자, 흙먼지 묻었잖아. 가만히 있어, 닦아줄 테니까.",
    thought: "날 지키겠다고 목숨 걸고 돌진하는 모습... 솔직히 좀 멋있었어.",
    mangaNote: "만화 2화 21p: 보송보송한 면 수건으로 오카룬의 뺨과 이마를 정성껏 닦아주는 모모의 다정한 얼굴.",
    expression: "momo-gentle",
    effect: "",
    sfx: ""
  },
  {
    id: 50,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "마지막 결의: 바나나 탈환 100km 결전!",
    bg: "/assets/segye_occult/01_vol1_epilogue.jpg",
    speaker: "아야세 모모",
    speakerType: "momo",
    text: "겁먹지 마, 오카룬. 네 소중한 거시기, 내가 반드시 되찾아줄 테니까! 터보 할멈이 시속 100km로 달리면, 우리도 100km로 달려서 엉덩이를 걷어차 주자고! 넌 내 최고의 파트너니까!",
    thought: "너랑 손잡고 있으니까 알겠어. 네 소중한 것도, 네 목숨도... 내가 끝까지 함께 지켜줄 거야.",
    mangaNote: "만화 2화 22p 라스트 컷: 툇마루에서 굳게 손을 맞잡으며 서로를 바라보고 웃는 모모와 오카룬. 1권 에피소드 1 대단원의 막!",
    expression: "momo-smile",
    effect: "flash-white",
    sfx: "heartbeat"
  },
  {
    id: 51,
    chapter: "제2화: 그게 바로 외계인이잖아",
    sceneTitle: "에피소드 1 클리어!",
    bg: "/assets/segye_occult/01_vol1_epilogue.jpg",
    speaker: "나레이션",
    speakerType: "narration",
    text: "축하합니다! 단다단 제1권 에피소드 1 (1화~2화: 그것이 사랑의 시작이었어 & 그게 바로 외계인이잖아) 라이트노벨 게임 클리어!\n\n다음 에피소드 2: 〈3화~5화 동안 미녀 영매사 세이코의 특훈 & 화장실의 신 결계 훈련〉으로 이어집니다!",
    thought: "",
    mangaNote: "🎉 EPISODE 1 COMPLETE!",
    expression: "momo-smile",
    effect: "",
    sfx: "fanfare"
  }
];

function buildGameHtml() {
  const scriptJson = JSON.stringify(dandadanEpisode1Script);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>단다단 라이트노벨 게임: 에피소드 1 (1화~2화 원작 완전판)</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;600;700;900&family=Orbitron:wght@700;900&display=swap');

    body {
      font-family: 'Noto Sans KR', sans-serif;
      user-select: none;
      -webkit-user-select: none;
      background-color: #080511;
      overflow-x: hidden;
    }

    /* Cinematic 16:9 Viewport */
    .game-stage-container {
      aspect-ratio: 16 / 9;
      max-height: 85vh;
      width: 100%;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 50px rgba(236, 72, 153, 0.25), 0 0 100px rgba(6, 182, 212, 0.15);
    }

    /* Screen Shake Effects */
    .shake-light {
      animation: shakeLightAnim 0.3s cubic-bezier(.36,.07,.19,.97) both;
    }
    .shake-heavy {
      animation: shakeHeavyAnim 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    @keyframes shakeLightAnim {
      10%, 90% { transform: translate3d(-2px, 0, 0); }
      20%, 80% { transform: translate3d(3px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-5px, 0, 0); }
      40%, 60% { transform: translate3d(5px, 0, 0); }
    }

    @keyframes shakeHeavyAnim {
      0% { transform: translate(0, 0) rotate(0deg); }
      15% { transform: translate(-8px, 6px) rotate(-1deg); }
      30% { transform: translate(7px, -7px) rotate(1.5deg); }
      45% { transform: translate(-10px, 4px) rotate(-1deg); }
      60% { transform: translate(8px, -5px) rotate(1deg); }
      75% { transform: translate(-5px, 3px) rotate(-0.5deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }

    /* Flash Animations */
    .flash-white {
      animation: flashWhiteAnim 0.4s ease-out;
    }
    .flash-red {
      animation: flashRedAnim 0.5s ease-out;
    }
    .flash-green {
      animation: flashGreenAnim 0.6s ease-out;
    }

    @keyframes flashWhiteAnim {
      0% { background-color: rgba(255, 255, 255, 0.9); }
      100% { background-color: transparent; }
    }
    @keyframes flashRedAnim {
      0% { background-color: rgba(239, 68, 68, 0.8); }
      100% { background-color: transparent; }
    }
    @keyframes flashGreenAnim {
      0% { background-color: rgba(16, 185, 129, 0.8); }
      100% { background-color: transparent; }
    }

    /* Custom Scrollbar for Log */
    .custom-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scroll::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.5);
    }
    .custom-scroll::-webkit-scrollbar-thumb {
      background: #ec4899;
      border-radius: 4px;
    }

    /* Blinking Arrow */
    @keyframes bounceArrow {
      0%, 100% { transform: translateY(0); opacity: 0.3; }
      50% { transform: translateY(6px); opacity: 1; }
    }
    .next-arrow {
      animation: bounceArrow 1s infinite ease-in-out;
    }

    /* Glassmorphism Dialogue Box */
    .dialogue-glass {
      background: linear-gradient(180deg, rgba(16, 11, 29, 0.85) 0%, rgba(9, 6, 18, 0.96) 100%);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
  </style>
</head>
<body class="min-h-screen text-slate-100 flex flex-col justify-between">

  <!-- Top Navigation Header -->
  <header class="bg-[#100a20]/90 backdrop-blur border-b border-white/10 px-4 py-2.5 flex items-center justify-between z-50">
    <div class="flex items-center gap-3">
      <a href="/preview.html" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center gap-1.5 transition">
        <i class="fa-solid fa-arrow-left"></i>
        <span>소설 뷰어로</span>
      </a>
      <div class="h-4 w-px bg-white/20"></div>
      <h1 class="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
        <span class="px-2 py-0.5 rounded text-[11px] font-black bg-gradient-to-r from-pink-500 to-purple-600 text-white tracking-wider">VISUAL NOVEL</span>
        <span>단다단: 그것이 사랑의 시작이었어</span>
      </h1>
    </div>

    <!-- Stats & QoL Bar -->
    <div class="flex items-center gap-3">
      <div class="hidden md:flex items-center gap-3 bg-black/40 px-3 py-1 rounded-xl border border-white/10 text-xs">
        <div class="flex items-center gap-1.5 text-pink-400 font-bold">
          <i class="fa-solid fa-heart animate-pulse"></i>
          <span>모모 호감도:</span>
          <span id="stat-heart" class="text-white font-mono font-black">50%</span>
        </div>
        <div class="h-3 w-px bg-white/20"></div>
        <div class="flex items-center gap-1.5 text-cyan-400 font-bold">
          <i class="fa-solid fa-bolt"></i>
          <span>전투 싱크로율:</span>
          <span id="stat-sync" class="text-white font-mono font-black">50%</span>
        </div>
      </div>

      <button onclick="toggleSound()" id="sound-btn" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center gap-1.5 transition">
        <i class="fa-solid fa-volume-high text-pink-400" id="sound-icon"></i>
        <span class="hidden sm:inline">사운드 ON</span>
      </button>

      <button onclick="toggleFullscreen()" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center gap-1.5 transition">
        <i class="fa-solid fa-expand"></i>
        <span class="hidden sm:inline">전체화면</span>
      </button>
    </div>
  </header>

  <!-- MAIN GAME WRAPPER -->
  <main class="flex-1 flex items-center justify-center p-2 sm:p-4 max-w-6xl mx-auto w-full">
    
    <div id="game-stage" class="game-stage-container rounded-2xl md:rounded-3xl border border-white/15 bg-black">
      
      <!-- Layer 1: Background CG Layer -->
      <div id="bg-layer" class="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100 filter brightness-95"></div>
      <div id="flash-overlay" class="absolute inset-0 pointer-events-none z-30"></div>

      <!-- Layer 2: Vignette & Atmosphere Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-10"></div>

      <!-- Layer 3: Manga Director Note Banner (Top) -->
      <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
        <div class="bg-black/80 backdrop-blur border border-pink-500/30 px-3.5 py-1.5 rounded-xl text-xs text-pink-300 flex items-center gap-2 shadow-lg">
          <span class="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
          <span class="font-extrabold text-pink-400" id="chapter-label">제1화: 그것이 사랑의 시작이었어</span>
          <span class="text-slate-400 text-[11px] hidden sm:inline" id="scene-title-label">· 방과 후 복도의 결별</span>
        </div>

        <div class="bg-black/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 flex items-center gap-1.5 shadow-lg">
          <span class="text-purple-400 font-bold">🎬 원작 연출:</span>
          <span id="manga-note-label" class="truncate max-w-[200px] sm:max-w-xs text-slate-200"></span>
        </div>
      </div>

      <!-- Layer 4: Character Expression Sprite (Center-Right) -->
      <div id="character-sprite-container" class="absolute inset-0 flex items-end justify-center sm:justify-end sm:pr-12 pointer-events-none z-15">
        <div id="character-badge" class="mb-48 sm:mb-56 px-3 py-1 rounded-full text-xs font-black bg-pink-500 text-white shadow-lg border border-white/30 hidden">
          <!-- Emotion text -->
        </div>
      </div>

      <!-- Layer 5: Interactive Dialogue Box (Bottom) -->
      <div class="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-40">
        
        <!-- Controls Bar directly above dialogue box -->
        <div class="flex items-center justify-between mb-1.5 px-2">
          <div class="flex items-center gap-1.5">
            <button onclick="prevDialogue(event)" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/60 hover:bg-black/90 text-slate-300 border border-white/10 hover:border-pink-500/50 transition">
              <i class="fa-solid fa-backward-step mr-1"></i>이전
            </button>
            <button onclick="toggleAuto(event)" id="auto-btn" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/60 hover:bg-black/90 text-slate-300 border border-white/10 hover:border-pink-500/50 transition">
              <i class="fa-solid fa-play mr-1"></i>AUTO
            </button>
            <button onclick="toggleSkip(event)" id="skip-btn" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/60 hover:bg-black/90 text-slate-300 border border-white/10 hover:border-pink-500/50 transition">
              <i class="fa-solid fa-forward-fast mr-1"></i>SKIP
            </button>
          </div>

          <div class="flex items-center gap-1.5">
            <button onclick="openLogModal(event)" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/60 hover:bg-black/90 text-slate-300 border border-white/10 hover:border-pink-500/50 transition">
              <i class="fa-solid fa-clock-rotate-left mr-1"></i>로그(LOG)
            </button>
            <button onclick="quickSave(event)" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/60 hover:bg-black/90 text-slate-300 border border-white/10 hover:border-pink-500/50 transition">
              <i class="fa-solid fa-floppy-disk mr-1"></i>저장
            </button>
            <button onclick="quickLoad(event)" class="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-black/60 hover:bg-black/90 text-slate-300 border border-white/10 hover:border-pink-500/50 transition">
              <i class="fa-solid fa-folder-open mr-1"></i>불러오기
            </button>
          </div>
        </div>

        <!-- The Dialogue Container itself (Click to advance) -->
        <div id="dialogue-box" onclick="onDialogueBoxClick()" class="dialogue-glass rounded-2xl p-4 sm:p-5 cursor-pointer relative min-h-[140px] sm:min-h-[160px] flex flex-col justify-between transition border-pink-500/20 hover:border-pink-500/40">
          
          <div>
            <!-- Speaker Badge with Color Coding -->
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span id="speaker-name" class="px-3 py-1 rounded-lg text-xs sm:text-sm font-black tracking-wide shadow-md">
                  <!-- 아야세 모모 -->
                </span>
                <span id="speaker-mood" class="text-[11px] text-slate-400 font-medium hidden sm:inline"></span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono" id="dialogue-counter">1 / 51</span>
            </div>

            <!-- Dialogue Text with Typewriter Effect -->
            <p id="dialogue-text" class="text-sm sm:text-base font-medium text-white leading-relaxed pl-1 tracking-wide">
              <!-- Typed here -->
            </p>
          </div>

          <!-- Bottom: Inner Thought & Next Indicator -->
          <div class="pt-2 flex items-end justify-between border-t border-white/10 mt-2">
            <div id="thought-container" class="text-xs sm:text-sm text-pink-300/90 italic flex items-start gap-1.5 flex-1 pr-4">
              <span class="font-bold text-pink-400 shrink-0">💭 속마음:</span>
              <span id="dialogue-thought" class="leading-relaxed"></span>
            </div>

            <div class="text-pink-400 text-sm next-arrow shrink-0 pl-2">
              <i class="fa-solid fa-caret-down"></i>
            </div>
          </div>

        </div>

      </div>

      <!-- Layer 6: Modal Overlay for Interactive Choices -->
      <div id="choice-modal" class="absolute inset-0 bg-black/85 backdrop-blur-md z-50 hidden flex flex-col items-center justify-center p-6">
        <div class="max-w-lg w-full bg-[#150f29] border border-pink-500/40 rounded-3xl p-6 shadow-2xl animate-fade-in">
          <div class="flex items-center gap-2 mb-2 text-pink-400 text-xs font-bold">
            <i class="fa-solid fa-gamepad"></i>
            <span>운명의 분기점 (선택지)</span>
          </div>
          <h3 id="choice-prompt" class="text-base sm:text-lg font-bold text-white mb-5 leading-snug">
            <!-- Choice prompt -->
          </h3>
          <div id="choice-options-list" class="space-y-3">
            <!-- Choice buttons injected here -->
          </div>
        </div>
      </div>

      <!-- Layer 7: Backlog Modal -->
      <div id="log-modal" class="absolute inset-0 bg-black/90 backdrop-blur-md z-50 hidden flex flex-col p-6">
        <div class="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <h3 class="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-pink-400"></i>
            <span>지난 대사 로그 (Backlog)</span>
          </h3>
          <button onclick="closeLogModal()" class="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white">
            <i class="fa-solid fa-xmark mr-1"></i>닫기
          </button>
        </div>
        <div id="log-content" class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll text-xs sm:text-sm">
          <!-- Populated via JS -->
        </div>
      </div>

    </div>

  </main>

  <!-- Bottom Navigation / Chapter Jump Footer -->
  <footer class="bg-[#100a20]/90 backdrop-blur border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
    <div class="flex items-center gap-2">
      <span class="font-bold text-white">챕터 바로가기:</span>
      <button onclick="jumpToScene(0)" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 transition">1화: 복도 내기</button>
      <button onclick="jumpToScene(18)" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 transition">1화: 폐병원 세르포</button>
      <button onclick="jumpToScene(26)" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 transition">1화: 턱 잡기 명장면</button>
      <button onclick="jumpToScene(29)" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 transition">2화: 킨타마 소실</button>
      <button onclick="jumpToScene(38)" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 transition">2화: 100km 스모 결전</button>
    </div>

    <div class="flex items-center gap-2">
      <span class="text-pink-400 font-extrabold">단다단 원작 제1권 (1화~2화) 정통 라이트노벨 게임</span>
    </div>
  </footer>

  <!-- Web Audio Synthesizer & Game Engine Script -->
  <script>
    // Injected Game Script
    const script = ${scriptJson};

    // State
    let currentIndex = 0;
    let isTyping = false;
    let typewriterTimer = null;
    let currentDisplayedText = '';
    let autoPlay = false;
    let autoTimer = null;
    let skipMode = false;
    let soundEnabled = true;

    let stats = {
      momoHeart: 50,
      battleSync: 50
    };

    // Web Audio Synthesizer Engine
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }

    function playSound(type) {
      if (!soundEnabled) return;
      try {
        initAudio();
        const now = audioCtx.currentTime;

        if (type === 'type') {
          // Soft typewriter click
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(600 + Math.random() * 200, now);
          gain.gain.setValueAtTime(0.015, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.04);
        } else if (type === 'punch') {
          // Heavy impact
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.25);
        } else if (type === 'explosion') {
          // Bass rumble explosion
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(90, now);
          osc.frequency.exponentialRampToValueAtTime(25, now + 0.6);
          gain.gain.setValueAtTime(0.4, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.6);
        } else if (type === 'heartbeat') {
          // Romantic/Tense double beat
          const osc1 = audioCtx.createOscillator();
          const gain1 = audioCtx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(75, now);
          osc1.frequency.exponentialRampToValueAtTime(45, now + 0.12);
          gain1.gain.setValueAtTime(0.25, now);
          gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
          osc1.connect(gain1);
          gain1.connect(audioCtx.destination);
          osc1.start(now);
          osc1.stop(now + 0.12);
        } else if (type === 'magic' || type === 'talisman') {
          // High chime
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, now);
          osc.frequency.exponentialRampToValueAtTime(1760, now + 0.3);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        }
      } catch (e) {
        // Audio error silent fallback
      }
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      const icon = document.getElementById('sound-icon');
      const text = document.querySelector('#sound-btn span');
      if (soundEnabled) {
        icon.className = 'fa-solid fa-volume-high text-pink-400';
        text.textContent = '사운드 ON';
        initAudio();
      } else {
        icon.className = 'fa-solid fa-volume-xmark text-slate-500';
        text.textContent = '사운드 OFF';
      }
    }

    function toggleFullscreen() {
      const stage = document.getElementById('game-stage');
      if (!document.fullscreenElement) {
        stage.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }

    // Speaker Styling
    const speakerStyles = {
      'momo': {
        name: '아야세 모모',
        class: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border border-pink-400/50'
      },
      'okarun': {
        name: '오카룬 (타카쿠라 켄)',
        class: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400/50'
      },
      'demon-okarun': {
        name: '요괴 오카룬 (폭주)',
        class: 'bg-gradient-to-r from-red-600 to-purple-800 text-white border border-red-500/50 animate-pulse'
      },
      'turbo': {
        name: '터보 할멈 (쇼타 터널 괴이)',
        class: 'bg-gradient-to-r from-purple-800 to-red-950 text-red-200 border border-red-500/40'
      },
      'serpo': {
        name: '세르포 성인 (클론 외계인)',
        class: 'bg-gradient-to-r from-emerald-600 to-teal-800 text-emerald-100 border border-emerald-400/50'
      },
      'monster': {
        name: '플랫우즈 몬스터 (3m 스모 외계인)',
        class: 'bg-gradient-to-r from-amber-700 to-red-900 text-amber-100 border border-amber-500/50'
      },
      'delinquent': {
        name: '복도 불량배',
        class: 'bg-slate-700 text-slate-200 border border-slate-500/30'
      },
      'narration': {
        name: '나레이션',
        class: 'bg-gradient-to-r from-purple-600/80 to-indigo-700/80 text-purple-100 border border-purple-400/30'
      }
    };

    function renderCurrentScene() {
      const scene = script[currentIndex];
      if (!scene) return;

      // Update counters & headers
      document.getElementById('chapter-label').textContent = scene.chapter;
      document.getElementById('scene-title-label').textContent = '· ' + scene.sceneTitle;
      document.getElementById('manga-note-label').textContent = scene.mangaNote || '';
      document.getElementById('dialogue-counter').textContent = (currentIndex + 1) + ' / ' + script.length;

      // Background Image
      const bgLayer = document.getElementById('bg-layer');
      if (scene.bg) {
        bgLayer.style.backgroundImage = 'url(' + scene.bg + ')';
      }

      // Screen Effects (Shake / Flash)
      const stage = document.getElementById('game-stage');
      const flashOverlay = document.getElementById('flash-overlay');
      stage.classList.remove('shake-light', 'shake-heavy');
      flashOverlay.className = 'absolute inset-0 pointer-events-none z-30';

      if (scene.effect === 'shake-light') stage.classList.add('shake-light');
      if (scene.effect === 'shake-heavy') stage.classList.add('shake-heavy');
      if (scene.effect === 'flash-white') flashOverlay.classList.add('flash-white');
      if (scene.effect === 'flash-red') flashOverlay.classList.add('flash-red');
      if (scene.effect === 'flash-green') flashOverlay.classList.add('flash-green');

      // Sound Effect Trigger
      if (scene.sfx) {
        playSound(scene.sfx);
      }

      // Speaker Name & Style
      const speakerConfig = speakerStyles[scene.speakerType] || {
        name: scene.speaker,
        class: 'bg-slate-700 text-white'
      };
      const speakerEl = document.getElementById('speaker-name');
      speakerEl.textContent = scene.speaker;
      speakerEl.className = 'px-3 py-1 rounded-lg text-xs sm:text-sm font-black tracking-wide shadow-md ' + speakerConfig.class;

      // Inner Thought
      const thoughtContainer = document.getElementById('thought-container');
      const thoughtText = document.getElementById('dialogue-thought');
      if (scene.thought && scene.thought.trim().length > 0) {
        thoughtContainer.classList.remove('hidden');
        thoughtText.textContent = scene.thought;
      } else {
        thoughtContainer.classList.add('hidden');
      }

      // Typewriter Text
      startTypewriter(scene.text);

      // Check for Choice
      if (scene.choice) {
        // Show choice modal after text is typed
        setTimeout(() => {
          showChoiceModal(scene.choice);
        }, 600);
      }
    }

    function startTypewriter(fullText) {
      if (typewriterTimer) clearInterval(typewriterTimer);
      isTyping = true;
      currentDisplayedText = '';
      const textEl = document.getElementById('dialogue-text');
      textEl.textContent = '';

      let charIdx = 0;
      const speed = skipMode ? 5 : 22;

      typewriterTimer = setInterval(() => {
        if (charIdx < fullText.length) {
          currentDisplayedText += fullText.charAt(charIdx);
          textEl.textContent = currentDisplayedText;
          if (charIdx % 3 === 0) playSound('type');
          charIdx++;
        } else {
          finishTypewriter(fullText);
        }
      }, speed);
    }

    function finishTypewriter(fullText) {
      if (typewriterTimer) clearInterval(typewriterTimer);
      isTyping = false;
      document.getElementById('dialogue-text').textContent = fullText;

      // Auto play trigger
      if (autoPlay && !script[currentIndex].choice) {
        clearTimeout(autoTimer);
        autoTimer = setTimeout(() => {
          nextDialogue();
        }, 2200);
      }
    }

    function onDialogueBoxClick() {
      initAudio();
      const scene = script[currentIndex];
      if (scene.choice && document.getElementById('choice-modal').classList.contains('hidden') === false) {
        return; // Wait for player choice
      }

      if (isTyping) {
        // Complete current line instantly
        finishTypewriter(scene.text);
      } else {
        // Advance to next
        nextDialogue();
      }
    }

    function nextDialogue() {
      if (currentIndex < script.length - 1) {
        currentIndex++;
        renderCurrentScene();
      }
    }

    function prevDialogue(e) {
      if (e) e.stopPropagation();
      if (currentIndex > 0) {
        currentIndex--;
        renderCurrentScene();
      }
    }

    function jumpToScene(idx) {
      if (idx >= 0 && idx < script.length) {
        currentIndex = idx;
        renderCurrentScene();
      }
    }

    function toggleAuto(e) {
      if (e) e.stopPropagation();
      autoPlay = !autoPlay;
      const btn = document.getElementById('auto-btn');
      if (autoPlay) {
        btn.classList.add('bg-pink-500/40', 'border-pink-500', 'text-pink-300');
        if (!isTyping) nextDialogue();
      } else {
        btn.classList.remove('bg-pink-500/40', 'border-pink-500', 'text-pink-300');
        clearTimeout(autoTimer);
      }
    }

    function toggleSkip(e) {
      if (e) e.stopPropagation();
      skipMode = !skipMode;
      const btn = document.getElementById('skip-btn');
      if (skipMode) {
        btn.classList.add('bg-pink-500/40', 'border-pink-500', 'text-pink-300');
      } else {
        btn.classList.remove('bg-pink-500/40', 'border-pink-500', 'text-pink-300');
      }
    }

    // Choice Modal
    function showChoiceModal(choiceData) {
      const modal = document.getElementById('choice-modal');
      document.getElementById('choice-prompt').textContent = choiceData.prompt;
      const list = document.getElementById('choice-options-list');
      list.innerHTML = '';

      choiceData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-pink-500/20 border border-white/10 hover:border-pink-500/60 transition group flex flex-col gap-1.5';
        btn.innerHTML = \`
          <div class="text-xs sm:text-sm font-bold text-white group-hover:text-pink-200">\${opt.text}</div>
          <div class="text-[11px] font-extrabold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full inline-block self-start">\${opt.delta}</div>
        \`;
        btn.onclick = () => selectChoice(opt);
        list.appendChild(btn);
      });

      modal.classList.remove('hidden');
    }

    function selectChoice(opt) {
      document.getElementById('choice-modal').classList.add('hidden');
      playSound('magic');

      // Update stats
      if (opt.delta.includes('호감도')) {
        stats.momoHeart = Math.min(100, stats.momoHeart + 20);
        document.getElementById('stat-heart').textContent = stats.momoHeart + '%';
      }
      if (opt.delta.includes('각성') || opt.delta.includes('승부욕') || opt.delta.includes('신뢰도')) {
        stats.battleSync = Math.min(100, stats.battleSync + 25);
        document.getElementById('stat-sync').textContent = stats.battleSync + '%';
      }

      // Advance
      nextDialogue();
    }

    // Backlog Modal
    function openLogModal(e) {
      if (e) e.stopPropagation();
      const modal = document.getElementById('log-modal');
      const content = document.getElementById('log-content');
      content.innerHTML = '';

      for (let i = 0; i <= currentIndex; i++) {
        const s = script[i];
        const logItem = document.createElement('div');
        logItem.className = 'p-3 rounded-xl bg-white/5 border border-white/5';
        logItem.innerHTML = \`
          <div class="flex items-center justify-between text-xs font-bold text-pink-400 mb-1">
            <span>\${s.speaker}</span>
            <span class="text-slate-500 text-[10px]">#\${i + 1} · \${s.sceneTitle}</span>
          </div>
          <p class="text-slate-200 leading-relaxed text-xs sm:text-sm">\${s.text}</p>
          \${s.thought ? \`<div class="text-[11px] text-purple-300/80 italic mt-1">💭 속마음: \${s.thought}</div>\` : ''}
        \`;
        content.appendChild(logItem);
      }

      modal.classList.remove('hidden');
      content.scrollTop = content.scrollHeight;
    }

    function closeLogModal() {
      document.getElementById('log-modal').classList.add('hidden');
    }

    // Save & Load
    function quickSave(e) {
      if (e) e.stopPropagation();
      localStorage.setItem('dandadan_vn_save', JSON.stringify({
        index: currentIndex,
        stats: stats,
        timestamp: new Date().toLocaleString()
      }));
      alert('💾 현재 대사(# ' + (currentIndex + 1) + ')가 퀵 세이브 슬롯에 저장되었습니다!');
    }

    function quickLoad(e) {
      if (e) e.stopPropagation();
      const dataStr = localStorage.getItem('dandadan_vn_save');
      if (!dataStr) {
        alert('저장된 데이터가 없습니다.');
        return;
      }
      const data = JSON.parse(dataStr);
      currentIndex = data.index || 0;
      stats = data.stats || stats;
      document.getElementById('stat-heart').textContent = stats.momoHeart + '%';
      document.getElementById('stat-sync').textContent = stats.battleSync + '%';
      renderCurrentScene();
      alert('📂 저장된 시점(# ' + (currentIndex + 1) + ' · ' + data.timestamp + ')을 불러왔습니다!');
    }

    // Keyboard controls
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        onDialogueBoxClick();
      } else if (e.code === 'ArrowRight') {
        nextDialogue();
      } else if (e.code === 'ArrowLeft') {
        prevDialogue();
      }
    });

    // Start Game
    window.addEventListener('DOMContentLoaded', () => {
      renderCurrentScene();
    });
  </script>

</body>
</html>
`;
}

// Write to public/game.html
fs.writeFileSync(path.join(publicDir, 'game.html'), buildGameHtml(), 'utf8');
console.log('Successfully wrote public/game.html');

// Write to brain artifact directory
fs.writeFileSync(path.join(brainDir, 'game.html'), buildGameHtml(), 'utf8');
console.log('Successfully wrote brain/game.html');
