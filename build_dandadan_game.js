const fs = require('fs');
const path = require('path');

const brainDir = "C:/Users/Sim's/.gemini/antigravity/brain/d5aa5067-2fcb-48ff-987e-d41735d14a6a";
const publicDir = "C:/Users/Sim's/.gemini/antigravity/scratch/segye24-web/public";

// ==============================================================
// COMPLETE CANONICAL DANDADAN SCRIPT FOR VOLUME 1 (EPISODES 1 ~ 4)
// ==============================================================

const episodesData = {
  1: {
    title: "에피소드 1: 〈그것이 사랑의 시작이었어 & 그게 바로 외계인이잖아〉",
    range: "1화~2화",
    desc: "외계인 vs 유령의 자존심 내기, 폐병원 세르포 성인 납치와 거대 초능력 손 각성, 턱 잡기 명장면, 신사에서의 킨타마 소실과 3m 플랫우즈 몬스터 100km/h 스모 결전!",
    badge: "단다단 원작 1화~2화 · 운명의 서막",
    script: [
      {
        id: 1,
        chapter: "제1화: 그것이 사랑의 시작이었어",
        sceneTitle: "방과 후 복도의 결별",
        bg: "/assets/manga/01_kick.jpg",
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
        bg: "/assets/manga/01_kick.jpg",
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
        bg: "/assets/manga/01_kick.jpg",
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
        bg: "/assets/manga/01_kick.jpg",
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
        bg: "/assets/manga/01_kick.jpg",
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
        bg: "/assets/manga/02_argue.jpg",
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
        bg: "/assets/manga/02_argue.jpg",
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
        bg: "/assets/manga/02_argue.jpg",
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
        bg: "/assets/manga/02_argue.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "시끄러워! 영혼은 진짜 존재해! 할머니 밑에서 자란 내가 모를 줄 알아?! 그렇게 자신 있으면 어디 한번 직접 가서 증명해 보든가!!",
        thought: "이 녀석, 소심한 줄 알았더니 말대꾸 하나는 기가 막히네. 절대 질 수 없어!",
        mangaNote: "만화 1화 11p: 자존심이 폭발하여 내기를 제안하는 모모의 당당하고 불타는 눈빛.",
        expression: "momo-angry",
        effect: "",
        sfx: ""
      },
      {
        id: 10,
        chapter: "제1화: 그것이 사랑의 시작이었어",
        sceneTitle: "플레이어 선택의 순간: 내기 조건",
        bg: "/assets/manga/02_argue.jpg",
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
              text: "\"넌 심령 스폿 '쇼타 터널'로 가. 난 UFO 출몰지 '폐병원'으로 갈 테니까! 지는 쪽이 이기는 쪽의 빵셔틀이야!\"",
              reactionText: "좋습니다! 지는 쪽이 빵셔틀이 되는 겁니다! 통화 켜놓고 각자 진입합시다!",
              reactionThought: "빵셔틀이라니... 무섭지만 외계인의 진실을 위해서라면 피하지 않습니다!",
              delta: "⚡ 원작 100% 반영! 승부욕 +15 상승"
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
        bg: "/assets/manga/02_argue.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "난 1학년 아야세 모모야. 그러는 네 이름은 뭔데?",
        thought: "셔틀 계약서라도 쓰려면 이름은 알아둬야지.",
        mangaNote: "만화 1화 12p: 모모가 팔짱을 끼며 이름을 묻는 컷.",
        expression: "momo-smug",
        effect: "",
        sfx: ""
      },
      {
        id: 12,
        chapter: "제1화: 그것이 사랑의 시작이었어",
        sceneTitle: "충격의 자기소개",
        bg: "/assets/manga/02_argue.jpg",
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
        bg: "/assets/manga/02_argue.jpg",
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
        bg: "/assets/manga/02_argue.jpg",
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
        bg: "/assets/manga/02_argue.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "여보세요, 오카룬? 난 산속 외계인 출몰지 '폐병원'에 도착했거든? 외계인 같은 건 눈 씻고 찾아봐도 없어! 넌 이제 내 빵셔틀 확정이다!",
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
        bg: "/assets/manga/03_turbo.jpg",
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
        bg: "/assets/manga/03_turbo.jpg",
        speaker: "터보 할멈",
        speakerType: "turbo",
        text: "우헤헤헤헤헤!! 거시기 빨게 해줘어어어어어-!!!!",
        thought: "",
        mangaNote: "만화 1화 18p: 시속 100km의 속도로 자전거를 탄 오카룬을 덮쳐오는 터보 할멈의 충격 컷!",
        expression: "turbo-granny",
        effect: "flash-red",
        sfx: "screamer"
      },
      {
        id: 18,
        chapter: "제1화: 그것이 사랑의 시작이었어",
        sceneTitle: "오카룬의 절규와 통화 두절",
        bg: "/assets/manga/03_turbo.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "으아아아아아악!! 할머니 귀신이 시속 100km로 쫓아와요오오!! 달리기에서 지면 저주받는단 말야아아-!! (치지직— 뚝!)",
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
        bg: "/assets/manga/04_serpo_abduction.jpg",
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
        bg: "/assets/manga/04_serpo_abduction.jpg",
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
        bg: "/assets/manga/04_serpo_abduction.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "손대지 마!! 저리 가, 이 변태 외계인 괴물들아!! 만지지 말라고오오!!",
        thought: "투명한 힘으로 내 옷이 찢겨나가고 있어... 무서워... 할머니... 오카룬, 제발 날 구해줘...!!",
        mangaNote: "만화 1화 23p: 눈물을 뚝뚝 흘리며 공포에 질려 절규하는 모모의 처절한 표정.",
        expression: "momo-crying",
        effect: "shake-light",
        sfx: "tear"
      },
      {
        id: 22,
        chapter: "제1화: 그것이 사랑의 시작이었어",
        sceneTitle: "잠재 영력의 폭발",
        bg: "/assets/manga/04_serpo_abduction.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "꺼져라, 변태 자식들아!! 내 몸에 손끝 하나라도 대면 가루로 만들어버린다아아아-!!",
        thought: "우리 할머니 영매사의 피를 얕보지 마! 내 모든 힘을 끌어내겠어!",
        mangaNote: "만화 1화 24p: 모모의 등 뒤로 솟구쳐 오른 영적 거대 초능력 손의 웅장한 각성 컷!",
        expression: "momo-awakened",
        effect: "flash-white",
        sfx: "magic"
      },
      {
        id: 23,
        chapter: "제1화: 그것이 사랑의 시작이었어",
        sceneTitle: "거대 염동력 손 각성!",
        bg: "/assets/manga/04_serpo_abduction.jpg",
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
        bg: "/assets/manga/05_jaw_grab.jpg",
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
        bg: "/assets/manga/05_jaw_grab.jpg",
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
        bg: "/assets/manga/05_jaw_grab.jpg",
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
        bg: "/assets/manga/05_jaw_grab.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "오카룬!! 정신 차려, 이 바보야아아아!! 날 봐!! 네가 날 구하러 여기까지 온 거잖아!!",
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
        bg: "/assets/manga/05_jaw_grab.jpg",
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
        bg: "/assets/manga/05_jaw_grab.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "콰아아앙! 세르포 성인의 모선이 대폭발을 일으키며 폐병원이 화염에 휩싸였다. 모모는 오카룬의 손을 꼭 쥔 채 새벽의 여명 속으로 뛰어내렸다. 유령도, 외계인도... 둘 다 진짜였다. 그리고 이것이, 두 사람의 운명적인 사랑의 시작이었다.",
        thought: "",
        mangaNote: "만화 1화 33p 라스트 컷: 불타는 병원을 등지고 손을 잡고 달리는 두 사람의 실루엣과 1화 타이틀 회수.",
        expression: "momo-smile",
        effect: "flash-white",
        sfx: "explosion"
      },
      {
        id: 30,
        chapter: "제2화: 그게 바로 외계인이잖아",
        sceneTitle: "아야세 신사의 아침",
        bg: "/assets/manga/06_banana_shock.jpg",
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
        bg: "/assets/manga/06_banana_shock.jpg",
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
        bg: "/assets/manga/06_banana_shock.jpg",
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
        bg: "/assets/manga/06_banana_shock.jpg",
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
        bg: "/assets/manga/06_banana_shock.jpg",
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
        bg: "/assets/manga/06_banana_shock.jpg",
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
        bg: "/assets/manga/06_banana_shock.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "변태가 아닙니다!! 제 바나나가 진짜로 사라졌단 말입니다!! 터보 할멈 놈이 '거시기 빨게 해줘' 하더니 진짜로 뜯어갔어요!!",
        thought: "난 이제 남자가 아니야... 인간으로 살아갈 수 없어... 흑흑흑...",
        mangaNote: "만화 2화 7p: 바닥에 이마를 찧으며 피눈물을 흘리는 오카룬.",
        expression: "okarun-crying",
        effect: "",
        sfx: ""
      },
      {
        id: 37,
        chapter: "제2화: 그게 바로 외계인이잖아",
        sceneTitle: "모모의 확인과 부끄러움",
        bg: "/assets/manga/06_banana_shock.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "거, 거짓말하지 마! ...잠깐 슬쩍만 볼 테니까 가만히 있어봐! ...으아악!! 진짜로 아무것도 없이 매끈하잖아?! 이 녀석 어떡해!!",
        thought: "얼굴 빨개져서 미치겠네... 근데 진짜 없잖아?! 평생 고자로 살면 어떡해!!",
        mangaNote: "만화 2화 8p: 손가락 틈새로 훔쳐보며 얼굴이 폭발하는 모모의 코믹 컷.",
        expression: "momo-blush",
        effect: "",
        sfx: ""
      },
      {
        id: 38,
        chapter: "제2화: 그게 바로 외계인이잖아",
        sceneTitle: "결계의 틈: 부적이 떨어지다!",
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/07_sumo_tackle.jpg",
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
        bg: "/assets/manga/08_epilogue.jpg",
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
        bg: "/assets/manga/08_epilogue.jpg",
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
        bg: "/assets/manga/08_epilogue.jpg",
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
        bg: "/assets/manga/08_epilogue.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "축하합니다! 단다단 제1권 에피소드 1 (1화~2화: 그것이 사랑의 시작이었어 & 그게 바로 외계인이잖아) 라이트노벨 게임 클리어!\n\n다음 에피소드 2: 〈3화~5화 동안 미녀 영매사 세이코의 특훈 & 화장실의 신 결계 훈련〉으로 이어집니다!",
        thought: "",
        mangaNote: "🎉 EPISODE 1 COMPLETE!",
        expression: "momo-smile",
        effect: "",
        sfx: "fanfare"
      }
    ]
  },

  // ==========================================
  // EPISODE 2: 3화~5화 (할머니 세이코의 특훈)
  // ==========================================
  2: {
    title: "에피소드 2: 〈할머니 세이코의 특훈 & 화장실의 신 & 결전 준비〉",
    range: "3화~5화",
    desc: "전설의 동안 미녀 영매사 세이코 할머니 등장! 터보 할멈 야구 배트 응징 홈런, 화장실의 신 결계 훈련, 그리고 쇼타 터널 결전 전야의 비장한 출진!",
    badge: "단다단 원작 3화~5화 · 결전의 준비",
    script: [
      {
        id: 1,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "나막신 소리와 수수께끼의 미녀",
        bg: "/assets/manga/09_seiko_intro.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "또각, 또각, 또각—. 아침 햇살이 비치는 아야세 신사의 무거운 나무 대문이 열리며 경쾌한 나막신 소리가 다다미 복도에 울려 퍼졌다.",
        thought: "",
        mangaNote: "만화 3화 1p: 신사 입구 대문이 열리며 긴 담뱃대를 손에 든 인물의 그림자가 드리워지는 컷.",
        expression: "narration",
        effect: "",
        sfx: "footsteps"
      },
      {
        id: 2,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "20대 동안 미녀의 압도적 자태",
        bg: "/assets/manga/09_seiko_intro.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "히익...?! 저, 저기 아야세 씨... 저 아름다운 누님은 대체 누구십니까...?! 할머니가 아니라 모델 같은 미녀분이 들어오셨는데요...?!",
        thought: "믿을 수 없어... 주름 하나 없는 도자기 피부에 화려한 기모노풍 자태... 설마 모모의 친언니인가?!",
        mangaNote: "만화 3화 2p: 꼬부랑 노인을 상상하던 오카룬의 눈알이 튀어나올 듯 경악하는 클로즈업 컷!",
        expression: "okarun-shock",
        effect: "",
        sfx: ""
      },
      {
        id: 3,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "당당한 영매사 세이코의 등장",
        bg: "/assets/manga/09_seiko_intro.jpg",
        speaker: "아야세 세이코",
        speakerType: "seiko",
        text: "어이, 모모. 집에 웬 냄새나는 저주 찌꺼기를 질질 끌고 온 게냐? 콧물이나 찔찔 짜는 계집애가 사내놈을 끌어들이다니 배짱도 좋군.",
        thought: "호오... 저 사내 녀석, 보통 원령이 들러붙은 게 아니로구만. 쇼타 터널의 악명 높은 고속 지박령인가...",
        mangaNote: "만화 3화 3p: 담뱃대를 꼬나물고 눈썹을 찌푸리며 오카룬을 날카롭게 꿰뚫어 보는 세이코의 카리스마 컷!",
        expression: "seiko-cool",
        effect: "",
        sfx: ""
      },
      {
        id: 4,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "모모의 반발",
        bg: "/assets/manga/09_seiko_intro.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "할머니, 말 좀 예쁘게 해! 저주 찌꺼기라니, 어젯밤에 날 구해준 파트너란 말이야! 그리고 얜 지금 터보 할멈한테 소중한 거시기를 뺏겼다고!",
        thought: "할머니는 오자마자 또 짓궂게 사람을 긁네. 그래도 할머니가 오니까 든든하긴 하다...",
        mangaNote: "만화 3화 4p: 팔짱을 끼고 할머니를 향해 삐죽거리는 모모의 츤데레 컷.",
        expression: "momo-pout",
        effect: "",
        sfx: ""
      },
      {
        id: 5,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "터보 할멈의 기습 발작!",
        bg: "/assets/manga/10_bat_homerun.jpg",
        speaker: "터보 할멈 (빙의)",
        speakerType: "turbo",
        text: "우헤헤헤헤!! 늙은 영감탱이 마녀 주제에 주둥이가 살았구나!! 이 년의 뼈마디를 분질러 피를 빨아먹어 주마아아-!!",
        thought: "",
        mangaNote: "만화 3화 5p: 오카룬의 가슴팍에서 거대한 터보 할멈의 악령 머리가 솟구쳐 오르며 세이코를 향해 이빨을 드러내는 공포 컷!",
        expression: "turbo-granny",
        effect: "shake-heavy",
        sfx: "screamer"
      },
      {
        id: 6,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "세이코의 배트 풀스윙 응징!",
        bg: "/assets/manga/10_bat_homerun.jpg",
        speaker: "아야세 세이코",
        speakerType: "seiko",
        text: "시건방진 요괴 쥐새끼가 어디서 어른한테 주둥이를 놀려?! 딱 대라, 홈런이다아아-!!",
        thought: "신성한 내 신사에서 감히 주둥이를 함부로 놀리다니, 엉덩이를 쪼개주마!",
        mangaNote: "만화 3화 6p: 품에서 목검 야구 배트를 꺼내 거대한 퇴마 영력을 실어 콰아아앙! 풀스윙을 날리는 세이코의 호쾌한 액션 컷!",
        expression: "seiko-angry",
        effect: "shake-heavy",
        sfx: "punch"
      },
      {
        id: 7,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "다다미 벽에 처박힌 망령",
        bg: "/assets/manga/10_bat_homerun.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "콰아아아앙!! 야구공처럼 얻어맞은 터보 할멈의 악령이 비명을 지르며 다다미방 반대편 벽에 푹 처박혔다! 오카룬은 고통에 몸부림치며 바닥을 굴렀다.",
        thought: "",
        mangaNote: "만화 3화 7p: 벽에 거미줄 모양 금이 가며 뻗어버린 터보 할멈의 영혼 실루엣.",
        expression: "narration",
        effect: "flash-white",
        sfx: "explosion"
      },
      {
        id: 8,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "세이코의 짓궂은 손자사위 드립",
        bg: "/assets/manga/11_son_in_law_blush.jpg",
        speaker: "아야세 세이코",
        speakerType: "seiko",
        text: "흥, 버릇없는 쥐새끼 녀석. ...그나저나 사내 녀석아, 우리 손녀딸 손을 잡고 들어온 손자사위 될 놈이면 인사부터 똑바로 넙죽 해야지, 안 그러냐?",
        thought: "녀석... 눈빛 하나는 오롯이 맑고 우직하군. 우리 모모 녀석이 반할 만도 해.",
        mangaNote: "만화 3화 8p: 배트를 어깨에 걸치고 씩 웃으며 오카룬을 놀리는 세이코의 장난기 가득한 얼굴.",
        expression: "seiko-smirk",
        effect: "",
        sfx: ""
      },
      {
        id: 9,
        chapter: "제3화: 할머니 세이코 등장",
        sceneTitle: "토마토처럼 폭발하는 모모!",
        bg: "/assets/manga/11_son_in_law_blush.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "할머니 미쳤어?! 손자사위라니 무슨 헛소리를 지껄이는 거야!! 그냥 저주에 걸려 불쌍해서 데려온 빵셔틀 배터리일 뿐이거든?!",
        thought: "얼굴이 화끈거려서 미칠 것 같아!! 오카룬 쟤가 이상하게 오해하면 어떡하라고 진짜!!",
        mangaNote: "만화 3화 9p: 머리에서 폭풍처럼 연기를 뿜어내며 베개를 집어던지는 모모의 귀여운 츤데레 폭발 컷!",
        expression: "momo-blush",
        effect: "shake-light",
        sfx: "blush"
      },
      {
        id: 10,
        chapter: "제4화: 화장실의 신 결계 훈련",
        sceneTitle: "터보 할멈의 저주 봉인법",
        bg: "/assets/manga/12_toilet_god_training.jpg",
        speaker: "아야세 세이코",
        speakerType: "seiko",
        text: "터보 할멈의 저주는 너무나 흉포해서, 오카룬 녀석의 정신을 갉아먹고 있다. 결전 전까지 버티려면 정화의 영력을 지닌 '화장실의 신(카와야가미)'의 기운을 몸에 묶어야 해.",
        thought: "부정한 것을 깨끗이 씻어내는 화장실의 신만이 악령의 음기를 억누를 수 있지.",
        mangaNote: "만화 4화 1~2p: 방울 달린 결계 부적을 꺼내 오카룬의 가슴과 이마에 붙이며 진지하게 설명하는 세이코.",
        expression: "seiko-cool",
        effect: "",
        sfx: "talisman"
      },
      {
        id: 11,
        chapter: "제4화: 화장실의 신 결계 훈련",
        sceneTitle: "방울 부적과 결계 호흡 수련",
        bg: "/assets/manga/12_toilet_god_training.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "딸랑, 딸랑... 흡! 하아! 세이코 할머님, 이 방울이 울릴 때마다 몸속에서 타오르는 화염 같은 괴기가 정화되는 느낌입니다...!",
        thought: "아야세 씨의 할머니는 진짜 대단한 영매사야... 이 훈련을 버텨내야 내 바나나를 되찾을 수 있어!",
        mangaNote: "만화 4화 3p: 땀을 비 오듯 흘리며 결계 호흡을 다듬는 오카룬과 옆에서 영력을 보태는 모모.",
        expression: "okarun-determined",
        effect: "",
        sfx: "chime"
      },
      {
        id: 12,
        chapter: "제5화: 터널 결전 준비",
        sceneTitle: "세이코의 작전 브리핑",
        bg: "/assets/manga/14_tunnel_briefing.jpg",
        speaker: "아야세 세이코",
        speakerType: "seiko",
        text: "잘 들어라. 터보 할멈은 쇼타 터널의 수많은 처녀 지박령들과 융합되어 있어서 터널 안에서는 불사신이다. 놈을 완전히 성불시키려면 터널 밖, 우리 신사 결계 경계선까지 끌고 나와야 해!",
        thought: "시속 100km의 추격을 맨몸으로 버텨내야 하는 목숨을 건 레이스다. 두 녀석의 호흡이 어긋나면 죽는다.",
        mangaNote: "만화 5화 1~2p: 다다미방에 지도를 펼쳐놓고 터널과 신사 사이의 유인 경로를 짚어주는 세이코.",
        expression: "seiko-cool",
        effect: "",
        sfx: ""
      },
      {
        id: 13,
        chapter: "제5화: 터널 결전 준비",
        sceneTitle: "손을 꽉 맞잡은 두 사람",
        bg: "/assets/manga/15_holding_hands_departure.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "겁먹지 마, 오카룬. 네 손은 내가 절대로 안 놓을 거니까. 네 소중한 거시기, 내가 반드시 되찾아줄게!",
        thought: "어떤 괴물이 나와도 내가 지켜줄 거야. 내 최고의 파트너니까!",
        mangaNote: "만화 5화 3p: 어두운 밤하늘 아래, 서로의 손가락을 단단히 얽어쥐며 눈을 맞추는 모모와 오카룬의 클로즈업 컷!",
        expression: "momo-determined",
        effect: "flash-white",
        sfx: "talisman"
      },
      {
        id: 14,
        chapter: "제5화: 터널 결전 준비",
        sceneTitle: "쇼타 터널을 향한 출진!",
        bg: "/assets/manga/15_holding_hands_departure.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "네, 아야세 씨!! 당신을 믿고 전력으로 달리겠습니다! 가자, 쇼타 터널로!!",
        thought: "아야세 씨와 함께라면 아무것도 두렵지 않습니다!",
        mangaNote: "만화 5화 4p 라스트 컷: 신사 계단을 박차고 심야의 터널로 향해 달려나가는 두 사람의 비장한 뒷모습!",
        expression: "okarun-determined",
        effect: "shake-light",
        sfx: "whoosh"
      }
    ]
  },

  // ==========================================
  // EPISODE 3: 6화~8화 (터널 100km 결전 & 대게 요괴)
  // ==========================================
  3: {
    title: "에피소드 3: 〈심야 쇼타 터널 100km/h 질주 & 거대 대게 요괴 결전〉",
    range: "6화~8화",
    desc: "심야 쇼타 터널 100km 고속 술래잡기, 대게 합체 요괴 도심 폭주 위기와 손깍지 질주! 신사 결계 대폭발 성불, 터보 할멈 마스코트 정화, 그리고 등교 후 복도 모퉁이 돌발 뽀뽀 사건과 친구들의 폭풍 질문 공세!",
    badge: "단다단 원작 6화~8화 · 전설의 고속 결전",
    script: [
      {
        id: 1,
        chapter: "제6화: 달려라 터보 할멈!",
        sceneTitle: "심야 쇼타 터널의 살기",
        bg: "/assets/manga/16_tunnel_run_start.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "자정의 쇼타 터널 안. 주황색 비상등이 기괴하게 깜빡이는 터널 아스팔트 위에 두 사람이 서자, 터널 천장 전체에서 뼛속까지 시린 냉기와 함께 광기 어린 괴성이 쏟아져 내렸다.",
        thought: "",
        mangaNote: "만화 6화 1p: 어두운 터널 내부의 음산한 원근감과 비상등 불빛 아래 선 두 사람.",
        expression: "narration",
        effect: "",
        sfx: "wind"
      },
      {
        id: 2,
        chapter: "제6화: 달려라 터보 할멈!",
        sceneTitle: "터보 할멈의 100km/h 돌진!",
        bg: "/assets/manga/16_tunnel_run_start.jpg",
        speaker: "터보 할멈",
        speakerType: "turbo",
        text: "우헤헤헤헤!! 제 발로 거시기를 바치러 기어들어 왔구나아아-!! 몽땅 씹어 삼켜주마아아-!!",
        thought: "",
        mangaNote: "만화 6화 2p: 시속 100km의 맹렬한 각력으로 아스팔트를 박차며 터널 벽을 타고 돌진해오는 터보 할멈의 공포스러운 풀샷!",
        expression: "turbo-granny",
        effect: "shake-heavy",
        sfx: "screamer"
      },
      {
        id: 3,
        chapter: "제6화: 달려라 터보 할멈!",
        sceneTitle: "백발 요괴화와 100km 스타트!",
        bg: "/assets/manga/16_tunnel_run_start.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "아야세 씨, 꽉 잡으세요!! 달립니다아아아-!!",
        thought: "터보 저주를 다리에 집중시킨다! 아스팔트를 찢어발기며 100km로 가속한다!",
        mangaNote: "만화 6화 3p: 백발 스파이크와 톱니 마스크로 변신한 오카룬이 모모의 손을 잡고 터널 출구를 향해 전력 발진하는 컷!",
        expression: "okarun-berserk",
        effect: "shake-heavy",
        sfx: "explosion"
      },
      {
        id: 4,
        chapter: "제6화: 달려라 터보 할멈!",
        sceneTitle: "등 뒤 10cm의 극한 추격전",
        bg: "/assets/manga/17_turbo_chase_close.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "손 놓치지 마, 바보야!! 이 속도에서 놓치면 둘 다 아스팔트에 갈려 나간다고! 끝까지 꽉 잡고 있어!!",
        thought: "짜릿해 미칠 것 같아! 손끝 사이로 전해지는 얘 영력이 내 온몸의 피를 끓게 만들어!",
        mangaNote: "만화 6화 4p: 터널 벽면에서 불꽃 스파크를 튀기며 등 뒤 10cm까지 쫓아온 터보 할멈의 날카로운 손톱 클로즈업!",
        expression: "momo-determined",
        effect: "flash-red",
        sfx: "whoosh"
      },
      {
        id: 5,
        chapter: "제7화: 거대 대게 요괴 합체",
        sceneTitle: "처녀 지박령 흡수와 거대화",
        bg: "/assets/manga/18_crab_monster_merge.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "터널 출구가 눈앞에 보인 순간, 터보 할멈이 터널 벽에 깃든 수백 명의 처녀 지박령 원혼들을 빨아들이더니, 아파트 3층 크기의 거대한 '대게 합체 요괴'로 융합 팽창했다!",
        thought: "",
        mangaNote: "만화 7화 1~2p 더블 스프레드: 터널 천장을 뚫고 솟구쳐 오른 아파트 크기 거대 갑각류 괴수의 압도적인 위용!",
        expression: "monster",
        effect: "shake-heavy",
        sfx: "explosion"
      },
      {
        id: 6,
        chapter: "제7화: 거대 대게 요괴 합체",
        sceneTitle: "도심 붕괴의 위기",
        bg: "/assets/manga/18_crab_monster_merge.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "저 거대한 집게발 좀 봐!! 저 괴물이 고속도로로 빠져나가면 수천 명이 압사당해!! 여기서 끝장내야 해!",
        thought: "내 초능력 손의 최대 출력, 여기서 전부 쏟아붓는다!!",
        mangaNote: "만화 7화 3p: 집게발이 도로 아스팔트를 짓이기며 콘크리트 파편이 비 오듯 쏟아지는 아비규환 컷.",
        expression: "momo-angry",
        effect: "shake-light",
        sfx: "punch"
      },
      {
        id: 7,
        chapter: "제7화: 거대 대게 요괴 합체",
        sceneTitle: "손깍지 영력 부스터 도약!",
        bg: "/assets/manga/19_interlocking_fingers_boost.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "아야세 씨, 손깍지를 끼어주세요!! 둘의 영력을 하나로 합쳐서 뛰어넘는 겁니다!!",
        thought: "손가락이 얽히는 순간, 온몸에서 엄청난 에너지가 솟구쳐 오른다!!",
        mangaNote: "만화 7화 4p: 두 사람의 손가락이 꽉 맞물리며 찬란한 푸른빛과 황금빛 스파크가 폭발하는 손깍지 클로즈업 컷!",
        expression: "okarun-determined",
        effect: "flash-white",
        sfx: "magic"
      },
      {
        id: 8,
        chapter: "제7화: 거대 대게 요괴 합체",
        sceneTitle: "허공을 가르는 광속 비행",
        bg: "/assets/manga/19_interlocking_fingers_boost.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "내 미용 가위가 머리만 자르는 줄 알아?! 이 거대 갑각류 녀석, 오늘 게장으로 담가주마아아-!! 날아올라라, 오카룬!!",
        thought: "절대 얘 다치게 안 해... 우리 둘이서 신사 결계선까지 뛰어넘는다!!",
        mangaNote: "만화 7화 5p: 거대 집게발 사이를 아슬아슬하게 통과하며 신사 도리이를 향해 허공으로 솟구치는 두 사람의 다이내믹 공중 컷!",
        expression: "momo-determined",
        effect: "shake-heavy",
        sfx: "whoosh"
      },
      {
        id: 9,
        chapter: "제8화: 신사 결계 대폭발 성불",
        sceneTitle: "세이코의 황금빛 결계 폭발!",
        bg: "/assets/manga/20_shrine_barrier_explosion.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "콰아아아아앙!! 괴물의 집게발을 아슬아슬하게 피하며 신사 도리이 안으로 뛰어든 그 찰나! 대기하고 있던 아야세 세이코의 거대한 퇴마 결계진이 작동하며 눈부신 황금빛 폭풍이 밤하늘을 밝혔다!",
        thought: "",
        mangaNote: "만화 8화 1~2p 더블 스프레드: 도리이 결계선 안으로 유인된 괴수가 눈부신 황금빛 결계 폭발과 함께 한 줌의 푸른 재가 되어 성불하는 클라이맥스 컷!",
        expression: "narration",
        effect: "flash-white",
        sfx: "explosion"
      },
      {
        id: 10,
        chapter: "제8화: 신사 결계 대폭발 성불",
        sceneTitle: "터보 할멈의 귀여운 마스코트화",
        bg: "/assets/manga/21_turbo_cat_purified.jpg",
        speaker: "터보 할멈 (정화)",
        speakerType: "turbo",
        text: "퐁—! 갸릉...? 냐아앙... (요력을 완전히 잃고 손바닥만 한 통통하고 무해한 귀여운 마네키네코 인형으로 변신해 모모 품으로 쏙 파고든다)",
        thought: "젠장... 내 흉포한 요력이 싹 정화당했잖아... 그래도 따뜻하긴 하네...",
        mangaNote: "만화 8화 3p: 흉포함을 잃고 통통하고 귀여운 고양이 인형 마스코트 모습으로 변해 갸릉거리는 코믹 라스트 컷!",
        expression: "turbo-cat",
        effect: "",
        sfx: "pop"
      },
      {
        id: 11,
        chapter: "제8화 에필로그: 서로를 향한 오해",
        sceneTitle: "서로 싫어하는 건 아닐까... 복도를 맴도는 두 사람",
        bg: "/assets/manga/22_corridor_accidental_kiss.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "아야세 씨... 어젯밤 그렇게 무서운 일을 겪게 해드렸는데, 혹시 날 징그럽고 귀찮은 오타쿠라며 피하시는 건 아닐까...? 인사라도 제대로 건네고 싶은데...",
        thought: "복도를 몇 바퀴째 맴돌고 있는지 모르겠어... 나 같은 녀석이 먼저 다가가면 부담스러워하실 텐데...",
        mangaNote: "만화 8화 4p: 복도 벽에 기대어 서로를 마주칠까 봐 안절부절못하며 배회하는 오카룬과 모모의 엇갈리는 교차 컷.",
        expression: "okarun-nervous",
        effect: "",
        sfx: ""
      },
      {
        id: 12,
        chapter: "제8화 에필로그: 복도 모퉁이 돌발 충돌",
        sceneTitle: "모퉁이 충돌과 기습 뽀뽀?!",
        bg: "/assets/manga/22_corridor_accidental_kiss.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "우당탕—!! 복도 모퉁이를 급하게 돌던 오카룬과 모모가 정면으로 세게 충돌했다! 균형을 잃고 엉켜 넘어지던 찰나, 두 사람의 입술이 쪽— 하고 정면으로 포개졌다!!",
        thought: "",
        mangaNote: "만화 8화 5p 클라이맥스 컷: 모퉁이에서 우당탕 부딪히며 우연히 입술이 닿아버려 눈이 튀어나올 듯 얼어붙은 모모와 오카룬의 결정적 컷!",
        expression: "momo-shock",
        effect: "shake-heavy",
        sfx: "kiss"
      },
      {
        id: 13,
        chapter: "제8화 에필로그: 친구들의 목격과 질문 공세",
        sceneTitle: "친구들의 목격과 폭풍 질문 공세!",
        bg: "/assets/manga/22_corridor_accidental_kiss.jpg",
        speaker: "갸루 친구들",
        speakerType: "momo",
        text: "꺄아아아아악—?! 모모?! 너 지금 저 안경 남학생이랑 복도에서 뽀뽀한 거야?! 대박!! 타카쿠라 켄 닮은 상남자 찾는다더니 쟤랑 사귀는 거였어?!",
        thought: "",
        mangaNote: "만화 8화 6p: 입을 틀어막고 경악하며 달려드는 갸루 친구들과, 얼굴이 토마토처럼 새빨개져서 머리에서 김을 뿜는 모모의 아비규환!",
        expression: "momo-blush",
        effect: "shake-light",
        sfx: "scream"
      },
      {
        id: 14,
        chapter: "제8화 에필로그: 친구들의 목격과 질문 공세",
        sceneTitle: "화장실로의 탈출과 에피소드 3 클리어",
        bg: "/assets/manga/22_corridor_accidental_kiss.jpg",
        speaker: "모모 & 오카룬",
        speakerType: "okarun",
        text: "모모: '아, 아니야아아!! 사고라고, 100% 사고오오!!' / 오카룬: '히익?! 죄, 죄송합니다아아-!!' (패닉에 빠진 오카룬은 새빨개진 얼굴을 감싸 쥐고 복도 끝 화장실로 맹렬히 전력 질주했다!)",
        thought: "오카룬: 입술이... 아야세 씨 입술이 닿았어...!! 심장이 터질 것 같아!!",
        mangaNote: "만화 8화 라스트 컷: 혼비백산 화장실로 줄행랑치는 오카룬과 친구들에게 포위당한 모모. 에피소드 3 클리어!",
        expression: "okarun-screaming",
        effect: "flash-white",
        sfx: "run"
      }
    ]
  },

  // ==========================================
  // EPISODE 4: 9화~17화 (사라진 황금 구슬과 아크로바틱 사라사라 편 완결)
  // ==========================================
  4: {
    title: "에피소드 4: 〈사라진 황금 구슬, 시라토리 아이라와 아크로바틱 사라사라 편〉",
    range: "9화~17화",
    desc: "화장실에서 확인한 충격의 진실: 바나나는 돌아왔는데 불알이 사라졌다?! 터보 할멈의 요력이 담긴 황금 구슬을 줍고 영력이 각성한 시라토리 아이라, 아이라를 딸로 착각해 납치한 요괴 아크로바틱 사라사라와의 도심 공중전, 그리고 슬픈 모성애의 성불과 아이라의 기적적인 소생!",
    badge: "단다단 원작 9화~17화 · 아크로바틱 사라사라 완결편",
    script: [
      {
        id: 1,
        chapter: "제9화: 화장실의 비명과 사라진 황금 구슬",
        sceneTitle: "화장실 칸막이 안의 경악: 바나나는 있는데 불알이 없다?!",
        bg: "/assets/manga/23_missing_golden_ball.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "헉... 헉... 화장실 칸으로 무사히 도망쳤다... 진정하자, 타카쿠라 켄. 그보다 터보 할멈이 정화되었으니 내 소중한 곳은 어떻게 된 거지...?! (스윽 바지를 내린다) ...어? ...어라...?! 으아아아악!! 바나나는 돌아왔는데... 내 불알(킨타마)이... 둘 다 없잖아아아아-?!!",
        thought: "바나나만 덜렁 있고 알이 텅 비어있어!! 어디로 간 거야 내 알!! 학교 어딘가에 떨어진 건가?!",
        mangaNote: "만화 9화 1p: 화장실 변기 위에서 바지춤을 들여다보다가 영혼이 빠져나간 채 눈물 콧물 쏟으며 절규하는 오카룬의 전설적인 코믹 컷!",
        expression: "okarun-crying",
        effect: "shake-heavy",
        sfx: "scream"
      },
      {
        id: 2,
        chapter: "제9화: 화장실의 비명과 사라진 황금 구슬",
        sceneTitle: "옥상에서의 모모의 배꼽 잡는 폭소와 위로",
        bg: "/assets/manga/23_missing_golden_ball.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "푸하하하하!! 풉, 으하하하!! 진짜 못 살아!! 바나나가 돌아왔는데 알이 없다고?! 어떻게 알맹이만 쏙 빠져나가냐고, 멍청아!!",
        thought: "진짜 하루라도 평범할 날이 없네, 이 녀석은! 아까 뽀뽀한 것 때문에 얼굴 보기 어색했는데 덕분에 다 풀렸잖아.",
        mangaNote: "만화 9화 2p: 옥상 철조망 앞에서 바닥을 구르며 눈물 날 때까지 웃어젖히는 모모.",
        expression: "momo-laugh",
        effect: "shake-light",
        sfx: "laugh"
      },
      {
        id: 3,
        chapter: "제9화: 화장실의 비명과 사라진 황금 구슬",
        sceneTitle: "모모의 경악: 터보 할멈의 요력이 담긴 구슬!",
        bg: "/assets/manga/23_missing_golden_ball.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "...아니, 웃을 때가 아니잖아?! 터보 할멈의 강력한 요력이 그 구슬에 농축되어 봉인되어 있었다고! 만약 영력이 없는 일반인이 그걸 주우면 끔찍한 악령이 꼬여서 목숨을 잃는단 말이야!!",
        thought: "위험해... 학교에 엄청난 요기가 퍼질 수도 있어. 당장 찾아내야 해!",
        mangaNote: "만화 9화 3p: 얼굴이 굳어지며 사태의 심각성을 깨닫고 당장 구슬을 수색하자고 외치는 모모.",
        expression: "momo-angry",
        effect: "shake-light",
        sfx: ""
      },
      {
        id: 4,
        chapter: "제9화: 화장실의 비명과 사라진 황금 구슬",
        sceneTitle: "수색 개시와 오카룬의 비장한 각오",
        bg: "/assets/manga/23_missing_golden_ball.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "제... 제 불알 때문에 무고한 사람이 다칠 수도 있다는 겁니까...?! 아야세 씨, 무슨 일이 있어도 제 손으로 황금 구슬을 찾아내겠습니다!!",
        thought: "다른 사람에게 피해를 줄 순 없어... 내 소중한 킨타마는 반드시 내가 회수한다!",
        mangaNote: "만화 9화 4p: 안경을 고쳐 쓰며 비장하게 교내 수색을 결의하는 오카룬과 모모.",
        expression: "okarun-determined",
        effect: "flash-white",
        sfx: "talisman"
      },
      {
        id: 5,
        chapter: "제10화~13화: 시라토리 아이라와 사라사라",
        sceneTitle: "구슬을 주운 자칭 미소녀 전사 아이라",
        bg: "/assets/manga/25_aira_intro_ball.jpg",
        speaker: "시라토리 아이라",
        speakerType: "aira",
        text: "오호호호! 이 황금 구슬의 성스러운 빛... 역시 나는 신에게 선택받은 미소녀 전사였어! 아야세 모모, 네가 악마라는 걸 내 영력이 꿰뚫어 보고 있단다!",
        thought: "이 황금 구슬을 손에 넣은 뒤로 괴이한 영들이 보이기 시작했어. 모모 녀석, 악마의 하수인임에 틀림없어!",
        mangaNote: "만화 10화~13화: 손에 오카룬의 황금 구슬을 쥐고 도도하게 포즈를 취하는 자칭 미소녀 전사 시라토리 아이라의 첫 등장!",
        expression: "aira-smug",
        effect: "",
        sfx: "sparkle"
      },
      {
        id: 6,
        chapter: "제13화: 시라토리 아이라와 사라사라",
        sceneTitle: "아크로바틱 사라사라의 습격!",
        bg: "/assets/manga/26_acrobatic_sarasa_abduct.jpg",
        speaker: "아크로바틱 사라사라",
        speakerType: "sarasa",
        text: "내 딸... 내 딸이야아아아-!! (빨간 원피스를 휘날리며 관절을 꺾어 옥상 너머로 아이라를 낚아채 도약한다!)",
        thought: "",
        mangaNote: "만화 13화: 옥상을 뛰어넘으며 아이라를 품에 안고 유괴해 달아나는 빨간 원피스의 장신 요괴 아크로바틱 사라사라의 호러 컷!",
        expression: "sarasa-creep",
        effect: "shake-heavy",
        sfx: "screamer"
      },
      {
        id: 7,
        chapter: "제14화~15화: 아크로바틱 사라사라 격투",
        sceneTitle: "도심 상공의 곡예 격투: 오카룬 변신과 모모의 초능력 손!",
        bg: "/assets/manga/27_acro_silky_battle.jpg",
        speaker: "오카룬 (타카쿠라 켄)",
        speakerType: "okarun",
        text: "아야세 씨, 아이라 양을 구해야 합니다!! 제 킨타마 때문에 말려든 사람을 죽게 둘 순 없어요!! ...변신(헤타레 폼), 100km 질주우우우-!!",
        thought: "변신 제한은 딱 두 번... 온 힘을 다해 사라사라의 머리카락을 뚫어야 해!",
        mangaNote: "만화 14~15화: 변신한 오카룬과 모모의 거대 초능력 손이 도심 건물 옥상과 허공을 넘나들며 아크로바틱 사라사라의 날카로운 머리카락 공격에 맞서 격돌하는 다이내믹 배틀 컷!",
        expression: "okarun-berserk",
        effect: "shake-heavy",
        sfx: "punch"
      },
      {
        id: 8,
        chapter: "제14화~15화: 아크로바틱 사라사라 격투",
        sceneTitle: "아이라를 삼킨 사라사라와 절체절명의 공방",
        bg: "/assets/manga/27_acro_silky_battle.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "오카룬, 저 녀석 아이라를 머리카락 속으로 삼켜버렸어!! 내가 초능력으로 붙잡을 테니까, 틈을 노려서 아이라를 낚아채!!",
        thought: "요괴의 체내에 갇히면 일반인 영혼은 버티지 못해... 서둘러야 해!",
        mangaNote: "만화 15화: 붉은 원피스를 펄럭이며 관절을 비틀어 기괴하게 도약하는 사라사라와, 초능력으로 요괴를 옭아매는 모모의 결사적인 공방!",
        expression: "momo-determined",
        effect: "flash-white",
        sfx: "magic"
      },
      {
        id: 9,
        chapter: "제16화: 아크로바틱 사라사라의 슬픈 과거",
        sceneTitle: "흘러들어온 기억: 비극적인 어머니의 모성애",
        bg: "/assets/manga/28_sarasa_past_revelation.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "사라사라의 영력에 연결된 순간, 그녀의 생전 기억이 모모와 오카룬의 가슴을 짓눌렀다. 가난 속에서도 딸 하나만을 위해 필사적으로 발레를 추며 살아가던 어머니... 그러나 빚쟁이들에게 딸을 강제로 빼앗기고 절망 속에서 스스로 생을 마감했던 비극. 그리고 어릴 적 길 잃은 아이라가 건넸던 한마디—'엄마...?'",
        thought: "",
        mangaNote: "만화 16화: 비극적인 생전 기억 속에서 딸을 부둥켜안고 울부짖는 어머니의 회상과, 그 기억을 마주하며 눈물을 글썽이는 모모와 오카룬.",
        expression: "momo-crying",
        effect: "flash-white",
        sfx: "heartbeat"
      },
      {
        id: 10,
        chapter: "제16화: 아크로바틱 사라사라의 슬픈 과거",
        sceneTitle: "모모의 눈물: \"이 사람... 그저 딸을 사랑했던 엄마였어...\"",
        bg: "/assets/manga/28_sarasa_past_revelation.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "괴물이 아니었어... 그저 딸을 지키지 못했던 슬픔 때문에... 아이라를 딸로 착각해서 필사적으로 지켜주려고 했던 거잖아... 흐흑...",
        thought: "나쁜 요괴가 아니었어. 너무 가엽고 안타까운 사람이야...",
        mangaNote: "만화 16화: 사라사라의 가슴 아픈 진심을 깨닫고 눈물을 흘리며 요괴를 향한 적의를 거두는 모모.",
        expression: "momo-crying",
        effect: "",
        sfx: "tear"
      },
      {
        id: 11,
        chapter: "제17화: 다정한 세상으로",
        sceneTitle: "멈춰버린 아이라의 심장, 그리고 사라사라의 생명 양도",
        bg: "/assets/manga/29_aira_revival_salvation.jpg",
        speaker: "아크로바틱 사라사라",
        speakerType: "sarasa",
        text: "...내 딸... 널 또 잃을 수는 없어... 내 모든 힘과 오라를 너에게 줄게... 부디... 건강하고 다정한 세상에서 살아다오...",
        thought: "",
        mangaNote: "만화 17화: 체내 독기로 숨이 멎은 아이라를 살리기 위해 자신의 남은 모든 생명과 영력을 아이라에게 건네주며 온화한 미소를 짓는 사라사라의 성불 명장면!",
        expression: "sarasa-creep",
        effect: "flash-white",
        sfx: "magic"
      },
      {
        id: 12,
        chapter: "제17화: 다정한 세상으로",
        sceneTitle: "기적의 부활과 눈물의 성불",
        bg: "/assets/manga/29_aira_revival_salvation.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "눈부신 영력의 빛이 아이라의 가슴속으로 스며들며 멈췄던 심장이 다시 뛰기 시작했다! 아이라를 되살려낸 아크로바틱 사라사라는 더없는 평온과 안식의 눈물을 흘리며, 따스한 여명 속으로 조용히 성불했다. 그것은 진정한 사랑이 만들어낸 기적이었다.",
        thought: "",
        mangaNote: "만화 17화: 사라사라가 눈물을 흘리며 평온하게 승천하고, 기적처럼 숨을 몰아쉬며 깨어나는 아이라와 눈물 흘리는 모모와 오카룬.",
        expression: "momo-smile",
        effect: "flash-white",
        sfx: "talisman"
      },
      {
        id: 13,
        chapter: "제17화 에필로그: 다정한 세상으로",
        sceneTitle: "오카룬에게 반해버린 아이라와 츤데레 신경전!",
        bg: "/assets/manga/30_daily_trio_epilogue.jpg",
        speaker: "시라토리 아이라",
        speakerType: "aira",
        text: "...저기... 타카쿠라 군... 날 위험에서 구해준 거... 너 맞지...? (얼굴을 새빨갛게 붉히며 배배 꼬다가, 모모를 째려보며) 벼, 별로 아야세 너한테 고마운 건 아니거든?! 내가 타카쿠라 군을 악마에게서 구원해 줄 거니까 두고 봐!",
        thought: "뭐야 저 찌질해 보이던 안경잡이... 변신했을 때 너무 멋있었잖아... 심장이 터질 것 같아...!",
        mangaNote: "만화 17화 에필로그: 사라사라의 영력(트윈테일 헤어 능력)을 품게 된 아이라가 오카룬에게 완전히 반해 홍조를 띠고, 모모에게 츤데레 라이벌 선언을 하는 코믹 삼각관계 컷!",
        expression: "aira-smug",
        effect: "",
        sfx: "sparkle"
      },
      {
        id: 14,
        chapter: "제17화 에필로그: 다정한 세상으로",
        sceneTitle: "모모의 발끈: \"누가 누굴 구원한다는 거야?!\"",
        bg: "/assets/manga/30_daily_trio_epilogue.jpg",
        speaker: "아야세 모모",
        speakerType: "momo",
        text: "하아?! 구해줬더니 은혜도 모르고 누구한테 큰소리야?! 야, 오카룬! 넌 왜 멍하니 얼굴 붉히고 있어?! 얼른 안 따라오면 빵셔틀 곱빼기로 시킨다!!",
        thought: "아이라 저 계집애가 오카룬한테 꼬리치는 꼴을 그냥 두고 볼 줄 알고?! 절대 못 넘겨줘!",
        mangaNote: "만화 17화 라스트 컷: 모모와 아이라 사이에 끼어 쩔쩔매는 오카룬과, 새로운 유대와 삼각관계로 떠들썩해진 일상 복귀!",
        expression: "momo-angry",
        effect: "shake-light",
        sfx: "laugh"
      },
      {
        id: 15,
        chapter: "제17화 에필로그: 다정한 세상으로",
        sceneTitle: "단다단 에피소드 4 아크로바틱 사라사라 편 완결!",
        bg: "/assets/manga/30_daily_trio_epilogue.jpg",
        speaker: "나레이션",
        speakerType: "narration",
        text: "🎉 축하합니다! 단다단 정통 원작 스토리 1화부터 17화까지(아크로바틱 사라사라 편) 대단원 완결!\n\n소중한 황금 구슬을 찾는 여정 속에서 만난 새로운 동료 아이라와, 한층 더 깊어진 모모와 오카룬의 유대. 기괴하고도 다정한 오컬트 청춘 러브코미디는 앞으로도 계속됩니다!",
        thought: "",
        mangaNote: "🎉 CONGRATULATIONS! EPISODE 4 COMPLETE!",
        expression: "momo-smile",
        effect: "flash-white",
        sfx: "fanfare"
      }
    ]
  }
};

function buildFullGameHtml() {
  const episodesJson = JSON.stringify(episodesData);

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>단다단 라이트노벨 게임 (1화~17화 완편 플레이어)</title>
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

    .game-stage-container {
      aspect-ratio: 16 / 9;
      max-height: 85vh;
      width: 100%;
      position: relative;
      overflow: hidden;
      box-shadow: 0 0 50px rgba(236, 72, 153, 0.25), 0 0 100px rgba(6, 182, 212, 0.15);
    }

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

    .flash-white { animation: flashWhiteAnim 0.4s ease-out; }
    .flash-red { animation: flashRedAnim 0.5s ease-out; }
    .flash-green { animation: flashGreenAnim 0.6s ease-out; }

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

    .custom-scroll::-webkit-scrollbar { width: 6px; }
    .custom-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.5); }
    .custom-scroll::-webkit-scrollbar-thumb { background: #ec4899; border-radius: 4px; }

    @keyframes bounceArrow {
      0%, 100% { transform: translateY(0); opacity: 0.3; }
      50% { transform: translateY(6px); opacity: 1; }
    }
    .next-arrow { animation: bounceArrow 1s infinite ease-in-out; }

    .dialogue-glass {
      background: linear-gradient(180deg, rgba(16, 11, 29, 0.88) 0%, rgba(9, 6, 18, 0.98) 100%);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    }

    .active-ep-tab {
      background: linear-gradient(135deg, #ec4899, #8b5cf6) !important;
      color: white !important;
      border-color: transparent !important;
      box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
    }

    /* Vertical Pan Animation for tall manga panels */
    @keyframes verticalPanAnim {
      0% {
        background-position: 50% 0%;
      }
      18% {
        background-position: 50% 0%;
      }
      82% {
        background-position: 50% 100%;
      }
      100% {
        background-position: 50% 100%;
      }
    }

    .vertical-pan {
      background-size: cover !important;
      animation: verticalPanAnim 14s ease-in-out infinite alternate !important;
      will-change: background-position;
    }
  </style>
</head>
<body class="min-h-screen text-slate-100 flex flex-col justify-between">

  <!-- Top Navigation Header -->
  <header class="bg-[#100a20]/95 backdrop-blur border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-50">
    <div class="flex items-center gap-3">
      <a href="/preview.html" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 flex items-center gap-1.5 transition">
        <i class="fa-solid fa-book-open"></i>
        <span>소설 뷰어로</span>
      </a>
      <div class="h-4 w-px bg-white/20"></div>
      <h1 class="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
        <span class="px-2 py-0.5 rounded text-[11px] font-black bg-gradient-to-r from-pink-500 to-purple-600 text-white tracking-wider">VISUAL NOVEL</span>
        <span id="header-ep-title" class="truncate max-w-[200px] sm:max-w-md">단다단: 그것이 사랑의 시작이었어</span>
      </h1>
    </div>

    <!-- Episode Switcher Buttons -->
    <div class="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10 text-xs">
      <button onclick="changeEpisode(1)" id="ep-btn-1" class="px-2.5 py-1 rounded-xl font-bold transition active-ep-tab">1화~2화</button>
      <button onclick="changeEpisode(2)" id="ep-btn-2" class="px-2.5 py-1 rounded-xl font-bold transition text-slate-300 hover:text-white">3화~5화</button>
      <button onclick="changeEpisode(3)" id="ep-btn-3" class="px-2.5 py-1 rounded-xl font-bold transition text-slate-300 hover:text-white">6화~8화</button>
      <button onclick="changeEpisode(4)" id="ep-btn-4" class="px-2.5 py-1 rounded-xl font-bold transition text-slate-300 hover:text-white">9화~17화</button>
    </div>

    <!-- Stats & QoL Bar -->
    <div class="flex items-center gap-2.5">
      <div class="hidden lg:flex items-center gap-3 bg-black/40 px-3 py-1 rounded-xl border border-white/10 text-xs">
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
        <div class="bg-black/85 backdrop-blur border border-pink-500/30 px-3.5 py-1.5 rounded-xl text-xs text-pink-300 flex items-center gap-2 shadow-lg">
          <span class="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
          <span class="font-extrabold text-pink-400" id="chapter-label">제1화: 그것이 사랑의 시작이었어</span>
          <span class="text-slate-400 text-[11px] hidden sm:inline" id="scene-title-label">· 방과 후 복도의 결별</span>
        </div>

        <div class="bg-black/85 backdrop-blur border border-white/10 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 flex items-center gap-1.5 shadow-lg">
          <span id="pan-indicator" class="hidden px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/80 text-white animate-pulse"><i class="fa-solid fa-arrows-up-down mr-1"></i>세로 파노라마 연출</span>
          <span class="text-purple-400 font-bold">🎬 원작 연출:</span>
          <span id="manga-note-label" class="truncate max-w-[180px] sm:max-w-xs text-slate-200"></span>
        </div>
      </div>

      <!-- Layer 4: Interactive Dialogue Box (Bottom) -->
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
                <span id="speaker-name" class="px-3 py-1 rounded-lg text-xs sm:text-sm font-black tracking-wide shadow-md"></span>
                <span id="speaker-mood" class="text-[11px] text-slate-400 font-medium hidden sm:inline"></span>
              </div>
              <span class="text-[11px] text-slate-500 font-mono" id="dialogue-counter">1 / 51</span>
            </div>

            <!-- Dialogue Text with Typewriter Effect -->
            <p id="dialogue-text" class="text-sm sm:text-base font-medium text-white leading-relaxed pl-1 tracking-wide"></p>
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

      <!-- Layer 5: Modal Overlay for Interactive Choices -->
      <div id="choice-modal" class="absolute inset-0 bg-black/85 backdrop-blur-md z-50 hidden flex flex-col items-center justify-center p-6">
        <div class="max-w-lg w-full bg-[#150f29] border border-pink-500/40 rounded-3xl p-6 shadow-2xl animate-fade-in">
          <div class="flex items-center gap-2 mb-2 text-pink-400 text-xs font-bold">
            <i class="fa-solid fa-gamepad"></i>
            <span>운명의 분기점 (선택지)</span>
          </div>
          <h3 id="choice-prompt" class="text-base sm:text-lg font-bold text-white mb-5 leading-snug"></h3>
          <div id="choice-options-list" class="space-y-3"></div>
        </div>
      </div>

      <!-- Layer 6: Backlog Modal -->
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
        <div id="log-content" class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scroll text-xs sm:text-sm"></div>
      </div>

    </div>

  </main>

  <!-- Bottom Navigation / Chapter Jump Footer -->
  <footer class="bg-[#100a20]/95 backdrop-blur border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
    <div id="chapter-jump-container" class="flex flex-wrap items-center gap-2">
      <!-- Jump buttons dynamically populated based on current episode -->
    </div>

    <div class="flex items-center gap-2">
      <span class="text-pink-400 font-extrabold">단다단 원작 정통 스토리 라이트노벨 게임</span>
    </div>
  </footer>

  <!-- Web Audio Synthesizer & Game Engine Script -->
  <script>
    const allEpisodes = ${episodesJson};

    let currentEpNum = 1;
    let script = allEpisodes[1].script;
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

    // Web Audio Synthesizer
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
        } else if (type === 'punch' || type === 'slap') {
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
        } else if (type === 'magic' || type === 'talisman' || type === 'chime' || type === 'sparkle') {
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
        } else if (type === 'fanfare') {
          [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            gain.gain.setValueAtTime(0.2, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.35);
          });
        }
      } catch (e) {}
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

    const speakerStyles = {
      'momo': { name: '아야세 모모', class: 'bg-gradient-to-r from-pink-500 to-rose-600 text-white border border-pink-400/50' },
      'okarun': { name: '오카룬 (타카쿠라 켄)', class: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400/50' },
      'demon-okarun': { name: '요괴 오카룬 (폭주)', class: 'bg-gradient-to-r from-red-600 to-purple-800 text-white border border-red-500/50 animate-pulse' },
      'turbo': { name: '터보 할멈 (쇼타 터널 괴이)', class: 'bg-gradient-to-r from-purple-800 to-red-950 text-red-200 border border-red-500/40' },
      'seiko': { name: '아야세 세이코 (할머니)', class: 'bg-gradient-to-r from-amber-500 to-rose-600 text-white border border-amber-300/50' },
      'serpo': { name: '세르포 성인 (클론 외계인)', class: 'bg-gradient-to-r from-emerald-600 to-teal-800 text-emerald-100 border border-emerald-400/50' },
      'monster': { name: '플랫우즈 몬스터 (3m 스모 외계인)', class: 'bg-gradient-to-r from-amber-700 to-red-900 text-amber-100 border border-amber-500/50' },
      'aira': { name: '시라토리 아이라', class: 'bg-gradient-to-r from-yellow-400 to-pink-500 text-white border border-yellow-300/50' },
      'sarasa': { name: '아크로바틱 사라사라', class: 'bg-gradient-to-r from-rose-900 to-red-950 text-rose-200 border border-rose-500/50' },
      'jiji': { name: '엔죠지 진 (지진)', class: 'bg-gradient-to-r from-slate-200 to-indigo-300 text-slate-900 border border-indigo-400/50 font-black' },
      'delinquent': { name: '복도 불량배', class: 'bg-slate-700 text-slate-200 border border-slate-500/30' },
      'narration': { name: '나레이션', class: 'bg-gradient-to-r from-purple-600/80 to-indigo-700/80 text-purple-100 border border-purple-400/30' }
    };

    function changeEpisode(epNum) {
      if (!allEpisodes[epNum]) return;
      currentEpNum = epNum;
      script = allEpisodes[epNum].script;
      currentIndex = 0;

      // Update ep tabs
      document.querySelectorAll('[id^=\"ep-btn-\"]').forEach(btn => btn.classList.remove('active-ep-tab'));
      const activeBtn = document.getElementById('ep-btn-' + epNum);
      if (activeBtn) activeBtn.classList.add('active-ep-tab');

      document.getElementById('header-ep-title').textContent = allEpisodes[epNum].title;

      renderChapterJumpBar();
      renderCurrentScene();
    }

    function renderChapterJumpBar() {
      const container = document.getElementById('chapter-jump-container');
      const jumps = {
        1: [
          { name: '1화: 복도 내기', idx: 0 },
          { name: '1화: 폐병원 세르포', idx: 18 },
          { name: '1화: 턱 잡기 명장면', idx: 26 },
          { name: '2화: 킨타마 소실', idx: 29 },
          { name: '2화: 100km 스모 결전', idx: 38 }
        ],
        2: [
          { name: '3화: 세이코 등장', idx: 0 },
          { name: '3화: 배트 홈런', idx: 4 },
          { name: '3화: 손자사위 드립', idx: 7 },
          { name: '4화: 결계 훈련', idx: 9 },
          { name: '5화: 터널 출진', idx: 12 }
        ],
        3: [
          { name: '6화: 터널 100km 질주', idx: 0 },
          { name: '7화: 거대 대게 요괴', idx: 4 },
          { name: '7화: 손깍지 부스터', idx: 6 },
          { name: '8화: 신사 결계 대폭발', idx: 8 },
          { name: '8화: 마스코트 정화', idx: 9 },
          { name: '8화: 복도 뽀뽀 해프닝', idx: 11 }
        ],
        4: [
          { name: '9화: 사라진 황금 구슬', idx: 0 },
          { name: '10화: 아이라 등장', idx: 4 },
          { name: '13화: 사라사라 습격', idx: 5 },
          { name: '14~15화: 도심 공중전', idx: 6 },
          { name: '16화: 슬픈 모성애 회상', idx: 8 },
          { name: '17화: 성불과 아이라 소생', idx: 10 },
          { name: '17화: 삼각관계 에필로그', idx: 12 }
        ]
      };

      const curJumps = jumps[currentEpNum] || [];
      container.innerHTML = '<span class=\"font-bold text-white\">주요 씬 바로가기:</span>' + curJumps.map(j => \`
        <button onclick=\"jumpToScene(\${j.idx})\" class=\"px-2.5 py-1 rounded-lg bg-white/5 hover:bg-pink-500/20 hover:text-pink-300 border border-white/10 transition\">\${j.name}</button>
      \`).join('');
    }

    function renderCurrentScene() {
      const scene = script[currentIndex];
      if (!scene) return;

      document.getElementById('chapter-label').textContent = scene.chapter;
      document.getElementById('scene-title-label').textContent = '· ' + scene.sceneTitle;
      document.getElementById('manga-note-label').textContent = scene.mangaNote || '';
      document.getElementById('dialogue-counter').textContent = (currentIndex + 1) + ' / ' + script.length;

      // Background Image Auto-detect & Vertical Pan logic
      const bgLayer = document.getElementById('bg-layer');
      const stage = document.getElementById('game-stage');
      const panIndicator = document.getElementById('pan-indicator');
      if (scene.bg) {
        const testImg = new Image();
        testImg.onload = () => {
          bgLayer.style.backgroundImage = 'url(' + scene.bg + ')';
          
          // Check if image is taller than stage aspect ratio (16:9 = ~1.777)
          const stageRatio = (stage && stage.clientHeight > 0) ? (stage.clientWidth / stage.clientHeight) : (16 / 9);
          const imgRatio = testImg.naturalWidth / testImg.naturalHeight;
          
          // If image is taller/narrower than the screen (e.g. 3:4, 1:1, 4:3), enable smooth vertical pan
          if (imgRatio < stageRatio - 0.08) {
            bgLayer.classList.remove('vertical-pan');
            void bgLayer.offsetWidth; // trigger reflow to smoothly start from top
            bgLayer.classList.add('vertical-pan');
            if (panIndicator) panIndicator.classList.remove('hidden');
          } else {
            bgLayer.classList.remove('vertical-pan');
            bgLayer.style.backgroundPosition = 'center center';
            if (panIndicator) panIndicator.classList.add('hidden');
          }
        };
        testImg.onerror = () => {
          // Fallback to high-res thematic background if user hasn't added this specific cut yet
          bgLayer.style.backgroundImage = 'url(/assets/segye_occult/01_vol1_prologue.jpg)';
          bgLayer.classList.remove('vertical-pan');
          if (panIndicator) panIndicator.classList.add('hidden');
        };
        testImg.src = scene.bg;
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

      if (scene.sfx) playSound(scene.sfx);

      // Speaker Name
      const speakerConfig = speakerStyles[scene.speakerType] || { name: scene.speaker, class: 'bg-slate-700 text-white' };
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

      startTypewriter(scene.text);

      if (scene.choice) {
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
      if (scene.choice && document.getElementById('choice-modal').classList.contains('hidden') === false) return;

      if (isTyping) {
        finishTypewriter(scene.text);
      } else {
        nextDialogue();
      }
    }

    function nextDialogue() {
      if (currentIndex < script.length - 1) {
        currentIndex++;
        renderCurrentScene();
      } else {
        // If at end of episode, prompt next episode
        if (currentEpNum < 4) {
          if (confirm('축하합니다! 에피소드 ' + currentEpNum + '을 완료하셨습니다! 다음 에피소드 ' + (currentEpNum + 1) + '로 바로 이동하시겠습니까?')) {
            changeEpisode(currentEpNum + 1);
          }
        }
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

    function showChoiceModal(choiceData) {
      const modal = document.getElementById('choice-modal');
      document.getElementById('choice-prompt').textContent = choiceData.prompt;
      const list = document.getElementById('choice-options-list');
      list.innerHTML = '';

      choiceData.options.forEach((opt) => {
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

      if (opt.delta.includes('호감도')) {
        stats.momoHeart = Math.min(100, stats.momoHeart + 20);
        document.getElementById('stat-heart').textContent = stats.momoHeart + '%';
      }
      if (opt.delta.includes('각성') || opt.delta.includes('승부욕') || opt.delta.includes('신뢰도')) {
        stats.battleSync = Math.min(100, stats.battleSync + 25);
        document.getElementById('stat-sync').textContent = stats.battleSync + '%';
      }

      nextDialogue();
    }

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

    function quickSave(e) {
      if (e) e.stopPropagation();
      localStorage.setItem('dandadan_vn_save', JSON.stringify({
        epNum: currentEpNum,
        index: currentIndex,
        stats: stats,
        timestamp: new Date().toLocaleString()
      }));
      alert('💾 현재 위치(에피소드 ' + currentEpNum + ' · 대사 #' + (currentIndex + 1) + ')가 퀵 세이브 슬롯에 저장되었습니다!');
    }

    function quickLoad(e) {
      if (e) e.stopPropagation();
      const dataStr = localStorage.getItem('dandadan_vn_save');
      if (!dataStr) {
        alert('저장된 데이터가 없습니다.');
        return;
      }
      const data = JSON.parse(dataStr);
      if (data.epNum && data.epNum !== currentEpNum) {
        changeEpisode(data.epNum);
      }
      currentIndex = data.index || 0;
      stats = data.stats || stats;
      document.getElementById('stat-heart').textContent = stats.momoHeart + '%';
      document.getElementById('stat-sync').textContent = stats.battleSync + '%';
      renderCurrentScene();
      alert('📂 저장된 시점(에피소드 ' + data.epNum + ' · 대사 #' + (currentIndex + 1) + ' · ' + data.timestamp + ')을 불러왔습니다!');
    }

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        onDialogueBoxClick();
      } else if (e.code === 'ArrowRight') {
        nextDialogue();
      } else if (e.code === 'ArrowLeft') {
        prevDialogue();
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      changeEpisode(1);
    });
  </script>

</body>
</html>
`;
}

// Compile and write files
fs.writeFileSync(path.join(publicDir, 'game.html'), buildFullGameHtml(), 'utf8');
console.log('Successfully wrote public/game.html with all 4 episodes!');

fs.writeFileSync(path.join(brainDir, 'game.html'), buildFullGameHtml(), 'utf8');
console.log('Successfully wrote brain/game.html with all 4 episodes!');
