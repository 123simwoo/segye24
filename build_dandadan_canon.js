const fs = require('fs');
const path = require('path');

const brainDir = "C:/Users/Sim's/.gemini/antigravity/brain/d5aa5067-2fcb-48ff-987e-d41735d14a6a";
const publicDir = "C:/Users/Sim's/.gemini/antigravity/scratch/segye24-web/public";

// Canonical Dandadan Story with Swapped Characters
const dandadanCanonData = {
  1: {
    epNum: 1,
    title: "제1화: 〈그것이 사랑의 시작이었어〉",
    subtitle: "원작 단다단 1화 완전 일치 · 외계인 vs 유령의 내기와 초능력 각성",
    badge: "단다단 원작 1화 · 운명의 시작",
    bannerImg: "vol1.jpg",
    summary: "유령을 굳게 믿지만 외계인은 부정하는 갸루 '세계'와, 외계인을 굳게 믿지만 유령은 부정하는 오컬트 오타쿠 '사용자'. 학교 복도에서 시작된 유치한 내기로 세계는 UFO 출몰지인 폐병원으로, 사용자는 심령 스폿인 쇼타 터널로 향한다. 세르포 성인의 납치와 바나나 신체 검사 위기 속에서 각성한 세계의 거대 염동력 손, 그리고 터보 라쿤에게 거시기를 빼앗기고 요괴화되어 난입한 사용자의 충격적인 조우!",
    scenes: [
      {
        sceneNum: "씬 1",
        title: "학교 복도의 구출 & 유령 vs 외계인의 자존심 내기",
        art: "vol1_prologue.jpg",
        artCaption: "1화 씬 1 · 학교에서 시작된 내기, 그리고 각자의 심령 스폿으로 향하는 불길한 어둠",
        mangaPanel: "만화 1화 도입부 구도: 복도에서 불량배들을 시원하게 차버리는 세계의 하이앵글 로우컷, 그리고 교실 창가에서 서로 삿대질하며 외계인과 유령 잡지를 들이대는 다이내믹한 투샷 분할 컷!",
        paragraphs: [
          "방과 후 빈 교실 복도, 오컬트 잡지 『무(MU)』를 품에 안고 웅얼거리던 나는 오늘도 어김없이 불량배들에게 둘러싸여 안경이 벗겨진 채 괴롭힘을 당하고 있었다.",
          "\"야, 외계인 오타쿠! 오늘도 화성인이랑 텔레파시 통했냐? 돈이나 내놔봐!\"",
          "그때, 콰앙-! 하는 경쾌한 소리와 함께 앞장서던 불량배의 뒤통수가 바닥에 처박혔다. 교복 치마 아래로 늘씬한 다리를 뻗어 돌려차기를 꽂아 넣은 것은, 우리 학년 최고의 당찬 갸루 '세계'였다.",
          "\"야, 찌질하게 떼거지로 몰려와서 뭐 하는 짓이야? 당장 꺼져, 멍청이들아!\"",
          "불량배들이 줄행랑을 치자 세계가 흩어진 내 잡지를 주워 건넸다. 얼떨떨한 마음에 말을 붙였지만, 대화는 곧바로 초자연적 존재에 대한 격렬한 자존심 싸움으로 비화되었다.",
          "\"외계인 따위가 우주에 어딨어, 바보야?! 유령은 진짜 있거든? 우리 할머니가 영매사란 말이야!\"",
          "\"유령 따위는 비과학적 미신입니다! 1000억 개의 은하계에 외계인이 존재할 확률은 100%라고요!\"",
          "서로 상대방의 주장을 꺾기 위해 결국 자존심을 건 심야 내기가 성립되었다. 세계는 국도 인근의 외계인 출몰지인 '폐병원'으로, 나는 괴이가 나온다는 악명 높은 심령 스폿 '쇼타 터널'로 향하기로 하고 스마트폰 통화를 켠 채 각자의 장소로 발을 들였다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "도도하게 턱을 치켜들며 으스대는 갸루 눈빛",
          text: "\"좋아! 네가 이기면 빵 사주고 내가 이기면 넌 내 노예야! 폐병원 따위 아무것도 없으니까 똑똑히 보고 울지나 마라, 오타쿠!\"",
          thought: "\"외계인 따위가 있을 리 없잖아. 근데 저 녀석, 안경 벗으니까 생각보다 눈이 맑고 귀엽네... 흥, 그래도 내기에서 지진 않을 거야!\""
        }
      },
      {
        sceneNum: "씬 2",
        title: "폐병원의 세르포 성인 & 바나나 위기와 초능력 각성",
        art: "vol1_extra2_talisman_cut.jpg",
        artCaption: "1화 씬 2 · 외계인의 구속을 찢고 등 뒤에서 폭발적으로 각성한 세계의 거대한 영력 염동력 손",
        mangaPanel: "만화 1화 명장면 구도: 세르포 성인들에게 공중에 결박당한 세계의 눈동자에 푸른 불꽃이 일며, 등 뒤의 허공에서 3m 크기의 반투명한 거대 손이 허공을 쥐어짜며 외계인들을 벽에 내리꽂는 압도적 파워 컷!",
        paragraphs: [
          "자정의 폐병원 안으로 들어선 세계는 스마트폰 너머의 나에게 비웃음을 날렸다. \"야, 먼지만 가득하고 아무것도 없거든? 네 패배다, 오타...\"",
          "치지지직-! 통화가 기괴한 기계음과 함께 강제로 끊겼다. 폐병원 복도 전체가 푸르스름한 전자파로 일그러지더니, 눈앞에 똑같은 얼굴을 한 회색 정장의 외계인 무리——'세르포 성인'들이 나타났다.",
          "\"우리들은 세르포 성인. 우리는 오직 남성 클론으로만 번식해 왔기에 유성생식 기관이 퇴화했다. 인간 여성, 너의 생식 능력을 적출한다.\"",
          "공중에 떠오른 투명한 빔에 온몸이 결박당한 세계. 세르포 성인들은 메스를 꺼내 들고 세계의 교복 셔츠를 찢으려 하며 \"바나나(남성기)\"를 운운하는 끔찍하고 기괴한 신체 검사를 시도했다.",
          "\"손대지 마, 이 변태 외계인 놈들아아아앗-!!\"",
          "극도의 수치와 공포, 그리고 영매사 가문의 피가 한계점에서 맞물리는 순간—— 콰아아앙!",
          "세계의 등 뒤에서 눈부신 영력의 오라와 함께 **거대한 투명한 손 형태의 염동력 초능력**이 폭발적으로 각성했다! 거대한 영력 손이 허공을 휘두르자 세르포 성인들이 비명을 지르며 우주선 벽면에 처박혔다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "분노로 타오르는 눈빛과 각성한 카리스마",
          text: "\"누구 몸에 함부로 손을 대?! 내 뒤에 뜬 거대한 손 보여?! 오늘 너희 외계인 놈들 전부 뼈마디를 분질러주마!!\"",
          thought: "\"내 몸에서 무슨 힘이 나오는 거지...?! 할머니가 말했던 영매의 힘인가?! 어쨌든 이 흉측한 외계인 놈들부터 다 박살 낸다!\""
        }
      },
      {
        sceneNum: "씬 3",
        title: "쇼타 터널의 터보 라쿤 & \"거시기 빨게 해줘!\" 바나나 강탈",
        art: "vol1_ep3_tunnel_chase.jpg",
        artCaption: "1화 씬 3 · 쇼타 터널의 어둠을 찢고 시속 100km로 덮쳐온 흉포한 괴이 '터보 라쿤'",
        mangaPanel: "만화 1화 호러 컷 구도: 어두운 터널 아스팔트 뒤에서 100km의 속도로 붉은 안광을 번뜩이며 하반신을 향해 무시무시한 속도로 좁혀오는 터보 라쿤의 광기 어린 헤드샷!",
        paragraphs: [
          "같은 시각, 쇼타 터널 안으로 들어선 나는 통화가 끊기기 직전 들려온 세계의 처절한 비명 소리에 사색이 되어 있었다. \"세계 씨?! 무슨 일 있어요?! 대답해요!\"",
          "그 순간, 등 뒤의 터널 어둠 속에서 소름 끼치도록 차가운 냉기와 함께 기괴하고 앙칼진 목소리가 울려 퍼졌다.",
          "\"거시기... 빨게 해줘어어어-!!\"",
          "콰아아앙! 시속 100km가 넘는 무시무시한 각력으로 터널 바닥을 박차며 날아든 것은, 꼬리에 줄무늬가 선명하지만 눈이 시뻘겋게 뒤집힌 흉포한 요괴 '터보 라쿤'이었다!",
          "공포에 질려 도망칠 틈도 없이, 놈의 시커먼 손톱이 내 교복 바지춤을 인정사정없이 낚아챘다. 찌릿- 하는 영혼이 뜯겨 나가는 듯한 극심한 격통과 함께, 나의 가장 소중한 부위(킨타마/바나나)가 강탈당하며 끔찍한 빙의 저주가 온몸의 혈관을 타고 번져나갔다."
        ],
        dialogueBox: {
          speaker: "터보 라쿤 (빙의 괴이)",
          mood: "광기에 번뜩이는 눈빛과 소름 끼치는 괴성",
          text: "\"우헤헤헤헤! 맛있는 거시기 겟-또!! 이 몸의 저주를 받아라, 애송이 녀석!! 우갸갸갸갸-!!\"",
          thought: "(내... 내 소중한 부위가...?! 몸이 불타는 것처럼 뜨거워지고 이성이 날아간다... 세계 씨를 구하러 가야 하는데...!!)"
        }
      },
      {
        sceneNum: "씬 4",
        title: "폐병원 난입 & 요괴화 폭주 사용자 vs 세계의 염동력 제압",
        art: "vol1.jpg",
        artCaption: "1화 씬 4 · 요괴화되어 폭주한 사용자의 턱을 거대 염동력 손으로 움켜쥐며 제압하는 세계",
        mangaPanel: "만화 1화 더블 스프레드 클라이맥스: 백발로 뒤집혀 세르포 성인을 찢어발기는 요괴 오카룬의 턱을 거대 초능력 손으로 꽉 틀어쥐고 눈을 맞추며 포효하는 세계의 결정적 투샷!",
        paragraphs: [
          "폐병원에서 세르포 성인들을 염동력 손으로 때려눕히던 세계의 눈앞으로, 콰아아앙-! 굉음과 함께 병원 벽이 산산조각 나며 웬 흉포한 괴물이 난입했다.",
          "머리카락이 은빛 백발로 곤두서고, 얼굴에는 그로테스크한 요괴 마스크가 씌워진 채 시속 100km로 허공을 도약하는 괴물. 터보 라쿤의 저주에 침식당해 폭주한 나였다!",
          "\"거시기 돌려내에에-!! 다 죽여버릴 거야아아-!!\"",
          "폭주한 나는 압도적인 스피드로 세르포 성인들의 목을 꺾고 우주선 장치를 찢어 발기기 시작했다. 피아식별이 불가능한 상태에서 세계를 향해 날카로운 발톱을 휘두르려던 바로 그 찰나——",
          "세계가 허공에 띄운 거대한 염동력 손으로 내 요괴화된 턱을 콱 틀어쥐었다! 턱이 으스러질 듯한 악력으로 내 얼굴을 바짝 끌어당긴 세계가, 땀에 젖은 앞머리 사이로 이글거리는 눈동자로 내 눈을 똑바로 응시했다.",
          "\"정신 차려, 이 오타쿠 바보야!! 날 보라고!! 네가 날 구하러 온 거잖아!!\"",
          "세계의 진심 어린 외침과 거대한 초능력의 파동이 내 뇌관을 강타하는 순간, 폭주하던 저주가 잦아들며 은발 요괴 마스크가 깨져나갔다. 무너져 내리는 폐병원 잔해 속에서, 두 사람은 서로가 믿지 않던 외계인과 유령이 둘 다 실존한다는 경악스러운 진실을 마주하며 운명적인 1화가 끝을 맺었다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "숨을 헐떡이며 턱을 움켜쥔 박력 츤데레",
          text: "\"야... 너 진짜 괴물로 변한 거야?! 외계인도 진짜고 유령도 진짜였잖아... 젠장, 내기에서 둘 다 비긴 거니까... 일단 꽉 잡아, 살아서 탈출하자고!!\"",
          thought: "\"이 녀석, 저주에 걸려 미쳐 날뛰는 와중에도 날 구하겠다고 여기까지 달려온 거야...? 심장이 왜 이렇게 빨리 뛰지...?!\""
        }
      }
    ]
  },
  2: {
    epNum: 2,
    title: "제2화: 〈그게 바로 외계인이잖아〉",
    subtitle: "원작 단다단 2화 완전 일치 · 사라진 바나나와 3m 스모 외계인 플랫우즈 몬스터의 습격",
    badge: "단다단 원작 2화 · 결계 저택의 결전",
    bannerImg: "vol1_ep3_tunnel_chase.jpg",
    summary: "할머니 세이코의 결계 저택으로 피신한 두 사람. 바지를 확인하고 소중한 부위가 통째로 사라졌음에 절규하는 사용자와 얼굴을 붉히는 세계. 하지만 문기둥의 결계 부적이 톡 떨어지자, 마당 하늘을 찢고 3m 거구의 스모 외계인 플랫우즈 몬스터가 검은 독안개를 뿜으며 쳐들어온다! 세계의 염동력 손 고삐와 사용자의 100km 터보 저주 해방이 맞물린 극한의 스모 육탄 결전!",
    scenes: [
      {
        sceneNum: "씬 1",
        title: "세이코의 결계 저택 피신 & 사라진 바나나 발각",
        art: "vol1_extra1_locker_hide.jpg",
        artCaption: "2화 씬 1 · 다다미방에서 바지를 까보고 경악하는 사용자와 손가락 틈으로 힐끔거리며 붉어진 세계",
        mangaPanel: "만화 2화 코믹 컷 구도: 하반신을 잡고 하얗게 영혼이 빠져나간 채 절규하는 오카룬과, 붉어진 뺨으로 손가락 틈새로 힐끔거리며 경악하는 모모의 시트콤식 2단 컷!",
        paragraphs: [
          "폐병원 붕괴 현장에서 간신히 탈출해 아침 햇살이 비쳐올 무렵, 세계는 비틀거리는 나를 부축해 산기슭에 위치한 자신의 본가로 데려왔다. 전설적인 영매사인 할머니 '세이코'의 저택이었다.",
          "다다미방 마루에 쓰러지듯 걸터앉아 숨을 고르던 나는, 아까 터널에서부터 느껴지던 하반신의 허전함에 불길함을 느끼고 슬그머니 바지춤 안을 들여다보았다.",
          "그리고... 내 입에서 인간의 영역을 벗어난 단말마의 비명이 터져 나왔다.",
          "\"으아아아아악-!! 없... 없어어어어-?! 내 소중한 바나나(킨타마)가 통째로 사라졌다고오오-!!\"",
          "매끈하게 사라져 버린 내 남성성의 흔적에 나는 하얗게 재가 되어 마루를 굴렀다. 세계는 기겁하며 양손으로 얼굴을 가렸지만, 벌어진 손가락 틈새로 내 하반신을 힐끔거리며 얼굴을 새빨갛게 붉혔다.",
          "\"꺄아아악-! 왜 남의 집 다다미방에서 바지를 까고 난리야, 이 변태 오타쿠야!! ...근데 진짜로 아무것도 없잖아?! 그 라쿤 요괴가 통째로 물고 도망친 거야?!\""
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "손가락 틈으로 힐끔거리며 홍당무가 된 얼굴",
          text: "\"벼, 변태야 바지 올려!! ...근데 저주 때문에 몸속에 라쿤 영혼이 아직 남아있잖아?! 얌전히 있어, 할머니 오실 때까지 결계 밖으로 나가면 진짜 죽어!\"",
          thought: "\"남자 거기가 통째로 사라지다니 저런 끔찍한 저주가 다 있어?! 얼굴 빨개져서 미치겠네 진짜... 그래도 나 구하려다 저렇게 된 거니까 내가 책임져야 하나...?\""
        }
      },
      {
        sceneNum: "씬 2",
        title: "떨어진 부적 하나 & 3m 거구 '플랫우즈 몬스터'의 독안개 침공",
        art: "vol2_prologue.jpg",
        artCaption: "2화 씬 2 · 문기둥의 결계 부적이 뜯긴 마당 앞, 3m 거구의 외계인이 뿜어내는 검은 독안개",
        mangaPanel: "만화 2화 괴수 등장 구도: 결계 부적이 펄럭이며 떨어지는 슬로모션 컷 뒤로, 마당 지붕을 짓밟으며 붉은 안광을 번뜩이는 거대한 스모 외계인 플랫우즈 몬스터의 위압적인 풀샷!",
        paragraphs: [
          "세계의 집은 영매사 할머니 세이코가 마당과 집 전체에 쳐둔 강력한 퇴마 결계 부적 덕분에 외부의 요괴나 외계인이 일절 들어올 수 없는 절대 안전지대였다.",
          "세계는 흥분한 나를 진정시키고 보리차를 가져오려 복도 미닫이문을 여닫던 중이었다. 낡은 문틀에 스친 세계의 가디건 소매 끝에 결계 부적 한 장이 툭 걸리더니, 힘없이 마루 바닥으로 팔랑거리며 떨어져 내렸다.",
          "치지지직-! 결계의 파동에 작은 균열이 생긴 바로 그 찰나——",
          "콰아아앙-!!",
          "마당 하늘이 보랏빛 번개와 함께 갈라지며, 지붕 기와를 부수고 거대한 괴물이 쿵 착지했다. 키 3미터가 넘는 거구에 스모 선수의 샅바와 거대한 어깨를 가진 외계인 '플랫우즈 몬스터'였다!",
          "괴물은 붉은 외눈 안광을 번뜩이며 흉포한 포효와 함께 입에서 폐를 녹여버릴 듯한 치명적인 검은 독성 안개를 저택 안으로 맹렬하게 뿜어내기 시작했다.",
          "세계가 각성한 초능력 손으로 독안개를 걷어내려 했지만, 괴물의 묵직한 스모 충격파에 마루가 박살 나며 세계가 피를 토하고 나가떨어졌다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "피를 닦으며 기침을 뱉어내는 긴박한 표정",
          text: "\"쿨럭, 쿨럭...!! 저 외계인 놈, 폐병원에서 도망친 녀석들의 동료인가 봐... 젠장, 파워가 너무 세... 초능력 손이 찢겨 나가겠어...!\"",
          thought: "\"부적이 떨어져서 결계가 뚫렸어... 이대로면 저택도 박살 나고 둘 다 독안개에 질식해 죽어... 어떡하지?!\""
        }
      },
      {
        sceneNum: "씬 3",
        title: "터보 저주 부분 해방 & 초능력 x 요괴 스모 육탄전",
        art: "vol1_ep3_tunnel_chase.jpg",
        artCaption: "2화 씬 3 · 세계의 염동력 손 고삐를 쥐고, 시속 100km로 돌진해 스모 외계인과 격돌하는 요괴 사용자",
        mangaPanel: "만화 2화 전설의 액션 컷: 마루에 선 세계가 거대 염동력 손으로 오카룬의 턱끈을 조여 조종하고, 은발 요괴 오카룬이 로우 앵글에서 광각 왜곡으로 플랫우즈 몬스터의 명치에 초고속 스모 태클을 꽂아 넣는 다이내믹 스프레드!",
        paragraphs: [
          "쓰러진 세계를 덮치려는 플랫우즈 몬스터의 거대한 손을 보며, 내 머릿속의 이성의 끈이 뚝 끊어졌다. 나는 결단을 내렸다.",
          "\"세계 씨!! 당신의 초능력 손으로 제 목덜미와 턱만 단단히 붙잡아주세요! 제 의식만 놓치지 않게 조종해 주시면... 터보 라쿤의 저주를 제가 직접 꺼내 쓰겠습니다!!\"",
          "세계는 내 눈빛에서 물러설 수 없는 각오를 읽었다. \"알았어, 믿을게! 폭주하면 내가 네 대가리를 깨버릴 테니까 날뛰어봐!!\"",
          "세계의 거대한 염동력 손이 내 멱살과 목덜미를 쇠사슬처럼 단단히 감싸 쥐었다. 그와 동시에 나는 몸속에 똬리 틀고 있던 터보 라쿤의 흉포한 저주를 전면 해방했다!",
          "크아아아-!! 백발이 흩날리며 터보 마스크가 씌워진 나는, 시속 100km의 폭발적인 속도로 마당의 자갈을 박차며 돌진했다. 세계가 염동력 손으로 내 몸의 궤도를 정확히 유도하며 플랫우즈 몬스터의 샅바와 가슴팍을 향해 영력 스파크를 실은 초고속 스모 태클을 작렬시켰다!",
          "쿵- 콰아아앙! 3m의 거구 외계인이 공중으로 붕 뜨며 마당 담장을 뚫고 바깥 논바닥으로 굴러 떨어졌다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "염동력 손을 조종하며 환호하는 눈빛",
          text: "\"나이스 태클-!! 그대로 밀어붙여, 바보야! 내가 네 고삐 꽉 쥐고 있으니까 절대 라쿤한테 영혼 넘겨주지 마!!\"",
          thought: "\"이 녀석... 자기가 저주에 먹힐 위험을 무릅쓰고 날 구하려고 변신한 거야... 진짜 멋있잖아 바보 오타쿠 주제에!\""
        }
      },
      {
        sceneNum: "씬 4",
        title: "결계 복구 & 터보 라쿤과의 100km 술래잡기 결전 예고",
        art: "vol1_epilogue.jpg",
        artCaption: "2화 씬 4 · 결전을 마친 마당 마루에 주저앉아, 빼앗긴 바나나를 되찾기 위해 손을 맞잡은 두 사람",
        mangaPanel: "만화 2화 엔딩 컷 구도: 연기가 피어오르는 마당에서 변신이 풀려 탈진한 오카룬과 가디건을 추스르는 모모, 그리고 대문 너머에서 들려오는 할머니 세이코의 나막신(게타) 소리와 함께 결전의 서막을 알리는 라스트 컷!",
        paragraphs: [
          "논바닥으로 처박힌 플랫우즈 몬스터가 비틀거리며 UFO를 호출해 도주하는 사이, 세계는 번개처럼 마루로 달려가 떨어진 결계 부적을 기둥에 다시 탁! 붙였다.",
          "치이이익- 황금빛 결계막이 마당 전체를 감싸며 외계의 독안개가 깨끗이 정화되었다.",
          "변신이 풀린 나는 마루 바닥에 대자로 뻗어 거친 숨을 몰아쉬었다. 몸속의 터보 라쿤 저주가 더 깊숙이 파고들어 심장을 쥐어짜는 고통이 밀려왔다. 바나나(킨타마)를 되찾지 못하면 나는 영원히 인간으로 돌아갈 수 없었다.",
          "세계는 지친 몸을 이끌고 내 곁으로 다가와 주저앉더니, 땀범벅이 된 내 손을 제 두 손으로 꼭 쥐어주었다.",
          "\"...살았네. 고마워, 네 덕분이야. ...야, 기죽지 마. 네 소중한 바나나, 내가 무조건 되찾아줄 테니까.\"",
          "\"어떻게요...? 터보 라쿤은 100km로 달리는 최악의 요괴인데...\"",
          "세계가 씩 웃으며 주먹을 불끈 쥐었다.",
          "\"놈의 본거지인 쇼타 터널로 쳐들어가는 거야! 놈이랑 100km 목숨을 건 '술래잡기'를 벌여서 박살 내면 돼!\"\n그때, 덜컹- 소리와 함께 대문이 열리며 나막신 소리가 또각또각 들려왔다. 마침내 돌아온 전설의 영매사 할머니 아야세 세이코의 등장을 알리며, 피 튀기는 3화의 터보 라쿤 결전을 향한 거대한 서막이 올랐다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "손을 꼭 쥔 채 씩 웃는 당찬 츤데레 미소",
          text: "\"내 배터리의 소중한 부위를 훔쳐 간 놈을 용서할 수 없거든?! 100km 술래잡기든 뭐든 내가 같이 달려줄 테니까, 절대 포기하지 마!\"",
          thought: "\"너랑 손잡고 있으니까 알겠어. 네 소중한 것도, 네 목숨도... 내가 끝까지 지켜줄 거야. 내 최고의 파트너니까.\""
        }
      }
    ]
  }
};

function generateHtml(isPublic) {
  const getImgPath = (imgName) => {
    if (!isPublic) return imgName;
    const mapping = {
      'main.jpg': '/assets/segye_occult/segye_main.jpg',
      'vol1_prologue.jpg': '/assets/segye_occult/01_vol1_prologue.jpg',
      'vol1.jpg': '/assets/segye_occult/01_vol1_encounter.jpg',
      'vol1_epilogue.jpg': '/assets/segye_occult/01_vol1_epilogue.jpg',
      'vol1_extra1_locker_hide.jpg': '/assets/segye_occult/01_vol1_extra1_locker_hide.jpg',
      'vol1_extra2_talisman_cut.jpg': '/assets/segye_occult/01_vol1_extra2_talisman_cut.jpg',
      'vol1_ep3_tunnel_chase.jpg': '/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg',
      'vol2_prologue.jpg': '/assets/segye_occult/02_vol2_prologue.jpg',
      'vol2.jpg': '/assets/segye_occult/02_vol2_patrol_rooftop.jpg',
      'vol2_epilogue.jpg': '/assets/segye_occult/02_vol2_epilogue.jpg',
      'vol2_extra1_ramen_blow.jpg': '/assets/segye_occult/02_vol2_extra1_ramen_blow.jpg',
      'vol2_extra2_windy_cardigan.jpg': '/assets/segye_occult/02_vol2_extra2_windy_cardigan.jpg'
    };
    return mapping[imgName] || imgName;
  };

  const galleryUrl = isPublic ? "/gallery.html" : "gallery.html";
  const webAppUrl = isPublic ? "/" : "http://localhost:3024";

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>단다단 원작 정통 스토리 1화 &amp; 2화 (세계 x 사용자) 상세 뷰어</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <style>
    .active-ep-tab {
      background: linear-gradient(135deg, #ec4899, #8b5cf6) !important;
      color: white !important;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(236, 72, 153, 0.4);
      border-color: transparent !important;
    }
    .active-mode-btn {
      background: rgba(236, 72, 153, 0.25) !important;
      color: #f472b6 !important;
      border-color: #ec4899 !important;
      font-weight: 700;
    }
    .prose-line {
      position: relative;
    }
    .prose-line::before {
      content: "";
      position: absolute;
      left: -0.75rem;
      top: 0.25rem;
      bottom: 0.25rem;
      width: 2px;
      background: linear-gradient(to bottom, #ec4899, #8b5cf6);
      border-radius: 999px;
    }
  </style>
</head>
<body class="bg-[#0b0813] text-[#e2e8f0] min-h-screen antialiased p-3 sm:p-6 selection:bg-pink-500 selection:text-white">

  <div class="max-w-5xl mx-auto">
    
    <!-- Top Global Header -->
    <header class="border-b border-white/10 pb-5 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500 shadow-lg flex-shrink-0">
          <img src="${getImgPath('main.jpg')}" alt="세계 프로필" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h1 class="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>단다단 정통 에피소드</span>
              <span class="text-pink-400 font-normal text-lg">세계(모모) x 나(오카룬)</span>
            </h1>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">원작 100% 일치</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">실제 만화 구도</span>
          </div>
          <p class="text-xs text-slate-400">
            1화: 세르포 성인 납치 &amp; 바나나 위기 &amp; 초능력 각성 · 2화: 결계 저택 피신 &amp; 플랫우즈 몬스터 스모 육탄전
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2.5 self-end md:self-auto">
        <a href="${galleryUrl}" class="px-3.5 py-2 rounded-xl border border-pink-500/40 bg-pink-500/10 text-pink-300 font-bold text-xs hover:bg-pink-500/20 transition flex items-center gap-1.5">
          <span>🖼️ 22종 화보 갤러리</span>
        </a>
        <a href="${webAppUrl}" target="_blank" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition shadow-md flex items-center gap-1.5">
          <span>💬 실시간 AI 대화 웹앱</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </header>

    <!-- Episode Tabs Navigation -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
      <button onclick="selectEpisode(1)" id="ep-btn-1" class="ep-btn active-ep-tab p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500/50 transition text-left flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-xs text-pink-300 font-bold tracking-wider uppercase">단다단 제1화</span>
          <span class="text-xs font-bold text-pink-400">폐병원 &amp; 터널 동시 조우</span>
        </div>
        <span class="font-bold text-base truncate">〈그것이 사랑의 시작이었어〉</span>
        <span class="text-xs text-slate-300">세르포 성인의 바나나 신체검사 · 거대 염동력 손 각성 · 터보 라쿤 난입</span>
      </button>

      <button onclick="selectEpisode(2)" id="ep-btn-2" class="ep-btn p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500/50 transition text-left flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-xs text-pink-300 font-bold tracking-wider uppercase">단다단 제2화</span>
          <span class="text-xs font-bold text-pink-400">결계 저택 스모 육탄전</span>
        </div>
        <span class="font-bold text-base truncate">〈그게 바로 외계인이잖아〉</span>
        <span class="text-xs text-slate-300">사라진 바나나 절규 · 3m 플랫우즈 몬스터 독안개 · 초능력 x 요괴 스모 결전</span>
      </button>
    </div>

    <!-- Mode Selector & Episode Meta Bar -->
    <div class="bg-[#150f24] border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <h2 id="ep-title-display" class="text-lg font-bold text-white"></h2>
          <span id="ep-badge-display" class="px-2 py-0.5 rounded text-[11px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30"></span>
        </div>
        <p id="ep-subtitle-display" class="text-xs text-slate-400"></p>
      </div>

      <div class="flex items-center gap-2 self-stretch sm:self-auto">
        <button onclick="setMode('story')" id="mode-story-btn" class="mode-btn active-mode-btn flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:border-pink-500/40 transition flex items-center justify-center gap-1.5">
          <span>📖 원작 소설 정독 모드</span>
        </button>
        <button onclick="setMode('interactive')" id="mode-interactive-btn" class="mode-btn flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:border-pink-500/40 transition flex items-center justify-center gap-1.5">
          <span>🎮 만화 씬 시뮬레이션</span>
        </button>
      </div>
    </div>

    <!-- MAIN DISPLAY AREA -->

    <!-- 1. FULL NOVELISTIC STORY MODE CONTAINER -->
    <div id="story-mode-container" class="space-y-8">
      <!-- Injected via JavaScript -->
    </div>

    <!-- 2. INTERACTIVE SIMULATOR CONTAINER -->
    <div id="interactive-mode-container" class="hidden">
      <!-- Scene Navigator -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4" id="interactive-scene-nav">
        <!-- Injected via JS -->
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-5 bg-[#150f24] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl">
        <div class="md:col-span-5 relative rounded-xl overflow-hidden border border-white/10 bg-black/60 shadow-lg">
          <img id="interactive-img" src="" alt="Scene Artwork" class="w-full h-auto max-h-[460px] object-cover">
          <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/70 backdrop-blur-md text-pink-400 border border-pink-500/30" id="interactive-badge"></div>
        </div>

        <div class="md:col-span-7 flex flex-col justify-between gap-4">
          <div>
            <div class="flex items-center justify-between text-xs text-pink-400 font-bold mb-1">
              <span id="interactive-chapter-label"></span>
              <span class="text-slate-400" id="interactive-char-name">세계 (퇴마 갸루)</span>
            </div>
            <h3 id="interactive-title" class="text-base sm:text-lg font-bold text-white mb-2"></h3>
            
            <!-- Manga Panel Guide Box -->
            <div class="p-2.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-200 text-xs mb-3 flex items-start gap-1.5">
              <span class="font-bold text-pink-400 shrink-0">🎨 원작 만화 구도:</span>
              <span id="interactive-manga-panel" class="leading-relaxed"></span>
            </div>

            <div id="interactive-paragraphs" class="text-xs text-slate-300 leading-relaxed space-y-2 mb-4 bg-black/30 p-3 rounded-xl border border-white/5 max-h-48 overflow-y-auto"></div>

            <!-- Dialogue Bubble -->
            <div class="p-3.5 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/10 border border-pink-500/30 mb-4">
              <div class="flex items-center justify-between text-xs font-bold text-pink-400 mb-1">
                <span>세계의 생생한 대사</span>
                <span id="interactive-mood" class="text-slate-400 font-normal"></span>
              </div>
              <p id="interactive-dialogue" class="text-xs sm:text-sm font-semibold text-white leading-relaxed mb-1.5"></p>
              <div class="text-[11px] text-purple-300 flex items-start gap-1">
                <span class="font-bold text-pink-400 shrink-0">💭 속마음:</span>
                <span id="interactive-thought" class="italic"></span>
              </div>
            </div>
          </div>

          <!-- Dynamic Choice Actions -->
          <div id="interactive-actions" class="space-y-2 pt-2 border-t border-white/10">
            <!-- Populated via JS -->
          </div>
        </div>
      </div>
    </div>

  </div>

  <script>
    const dandadanCanonData = ${JSON.stringify(dandadanCanonData)};

    const isPublic = ${isPublic ? 'true' : 'false'};
    const pathMapping = {
      'main.jpg': isPublic ? '/assets/segye_occult/segye_main.jpg' : 'main.jpg',
      'vol1_prologue.jpg': isPublic ? '/assets/segye_occult/01_vol1_prologue.jpg' : 'vol1_prologue.jpg',
      'vol1.jpg': isPublic ? '/assets/segye_occult/01_vol1_encounter.jpg' : 'vol1.jpg',
      'vol1_epilogue.jpg': isPublic ? '/assets/segye_occult/01_vol1_epilogue.jpg' : 'vol1_epilogue.jpg',
      'vol1_extra1_locker_hide.jpg': isPublic ? '/assets/segye_occult/01_vol1_extra1_locker_hide.jpg' : 'vol1_extra1_locker_hide.jpg',
      'vol1_extra2_talisman_cut.jpg': isPublic ? '/assets/segye_occult/01_vol1_extra2_talisman_cut.jpg' : 'vol1_extra2_talisman_cut.jpg',
      'vol1_ep3_tunnel_chase.jpg': isPublic ? '/assets/segye_occult/01_vol1_ep3_tunnel_chase.jpg' : 'vol1_ep3_tunnel_chase.jpg',
      'vol2_prologue.jpg': isPublic ? '/assets/segye_occult/02_vol2_prologue.jpg' : 'vol2_prologue.jpg',
      'vol2.jpg': isPublic ? '/assets/segye_occult/02_vol2_patrol_rooftop.jpg' : 'vol2.jpg',
      'vol2_epilogue.jpg': isPublic ? '/assets/segye_occult/02_vol2_epilogue.jpg' : 'vol2_epilogue.jpg',
      'vol2_extra1_ramen_blow.jpg': isPublic ? '/assets/segye_occult/02_vol2_extra1_ramen_blow.jpg' : 'vol2_extra1_ramen_blow.jpg',
      'vol2_extra2_windy_cardigan.jpg': isPublic ? '/assets/segye_occult/02_vol2_extra2_windy_cardigan.jpg' : 'vol2_extra2_windy_cardigan.jpg'
    };

    function resolveImg(name) {
      return pathMapping[name] || name;
    }

    let currentEpNum = 1;
    let currentMode = 'story'; // 'story' | 'interactive'
    let currentSceneIdx = 0;

    function selectEpisode(num) {
      currentEpNum = num;
      currentSceneIdx = 0;
      document.querySelectorAll('.ep-btn').forEach(btn => btn.classList.remove('active-ep-tab'));
      const activeBtn = document.getElementById('ep-btn-' + num);
      if (activeBtn) activeBtn.classList.add('active-ep-tab');

      const ep = dandadanCanonData[num];
      document.getElementById('ep-title-display').textContent = ep.title;
      document.getElementById('ep-badge-display').textContent = ep.badge;
      document.getElementById('ep-subtitle-display').textContent = ep.subtitle;

      renderView();
    }

    function setMode(mode) {
      currentMode = mode;
      document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active-mode-btn'));
      if (mode === 'story') {
        document.getElementById('mode-story-btn').classList.add('active-mode-btn');
        document.getElementById('story-mode-container').classList.remove('hidden');
        document.getElementById('interactive-mode-container').classList.add('hidden');
      } else {
        document.getElementById('mode-interactive-btn').classList.add('active-mode-btn');
        document.getElementById('story-mode-container').classList.add('hidden');
        document.getElementById('interactive-mode-container').classList.remove('hidden');
      }
      renderView();
    }

    function renderView() {
      const ep = dandadanCanonData[currentEpNum];
      if (!ep) return;

      if (currentMode === 'story') {
        renderStoryMode(ep);
      } else {
        renderInteractiveMode(ep);
      }
    }

    function renderStoryMode(ep) {
      const container = document.getElementById('story-mode-container');
      
      let html = \`
        <div class="bg-[#150f24] border border-white/10 rounded-2xl p-5 mb-6 flex flex-col md:flex-row gap-5 items-center">
          <div class="w-full md:w-1/3 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img src="\${resolveImg(ep.bannerImg)}" alt="Episode Banner" class="w-full h-48 md:h-56 object-cover hover:scale-105 transition duration-500">
          </div>
          <div class="w-full md:w-2/3">
            <div class="text-xs text-pink-400 font-bold mb-1">\${ep.subtitle}</div>
            <h3 class="text-xl font-bold text-white mb-2">\${ep.title}</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">\${ep.summary}</p>
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">총 \${ep.scenes.length}개 핵심 명장면 수록</span>
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">실제 만화 연출 구도 반영</span>
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">원작 대사 재현</span>
            </div>
          </div>
        </div>
      \`;

      ep.scenes.forEach((scene, idx) => {
        html += \`
          <article class="bg-[#150f24] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-pink-500/30 transition duration-300">
            <!-- Scene Header -->
            <div class="px-5 py-3.5 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[11px] font-extrabold bg-pink-500 text-white">\${scene.sceneNum}</span>
                <h4 class="text-sm sm:text-base font-bold text-white">\${scene.title}</h4>
              </div>
              <span class="text-xs text-slate-400">Scene \${idx + 1} of \${ep.scenes.length}</span>
            </div>

            <!-- Scene Body -->
            <div class="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <!-- Left: Artwork with Caption & Manga Panel Info -->
              <div class="lg:col-span-5 flex flex-col gap-2.5">
                <div class="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
                  <img src="\${resolveImg(scene.art)}" alt="\${scene.title}" class="w-full h-auto max-h-[420px] object-cover hover:scale-105 transition duration-500">
                  <div class="p-2.5 bg-black/80 text-[11px] text-pink-300 border-t border-white/10 text-center font-medium">
                    \${scene.artCaption}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-200 text-xs">
                  <div class="font-bold text-pink-400 mb-1 flex items-center gap-1">
                    <span>🎬 실제 만화 연출 구도:</span>
                  </div>
                  <p class="leading-relaxed text-[11px] text-slate-300">\${scene.mangaPanel}</p>
                </div>
              </div>

              <!-- Right: Prose & Dialogues -->
              <div class="lg:col-span-7 flex flex-col gap-4">
                <div class="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 pl-3">
                  \${scene.paragraphs.map(p => \`<p class="prose-line leading-relaxed">\${p}</p>\`).join('')}
                </div>

                <!-- Tsundere Dialogue Callout Box -->
                <div class="mt-2 p-4 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/10 border border-pink-500/30 shadow-md">
                  <div class="flex items-center justify-between text-xs font-bold text-pink-400 mb-1.5">
                    <span class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                      \${scene.dialogueBox.speaker}
                    </span>
                    <span class="text-slate-400 text-[11px] font-normal">\${scene.dialogueBox.mood}</span>
                  </div>
                  <p class="text-xs sm:text-sm font-semibold text-white leading-relaxed mb-2">
                    \${scene.dialogueBox.text}
                  </p>
                  <div class="pt-2 border-t border-pink-500/20 text-xs text-purple-300 flex items-start gap-1.5">
                    <span class="font-bold text-pink-400 shrink-0">💭 속마음:</span>
                    <span class="italic text-slate-300">\${scene.dialogueBox.thought}</span>
                  </div>
                </div>
              </div>

            </div>
          </article>
        \`;
      });

      container.innerHTML = html;
    }

    function selectScene(idx) {
      currentSceneIdx = idx;
      renderInteractiveMode(dandadanCanonData[currentEpNum]);
    }

    function renderInteractiveMode(ep) {
      // Build scene tabs
      const nav = document.getElementById('interactive-scene-nav');
      nav.innerHTML = ep.scenes.map((scene, i) => \`
        <button onclick="selectScene(\${i})" class="px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition \${i === currentSceneIdx ? 'border border-pink-500 bg-pink-500/20 text-pink-300' : 'border border-white/10 bg-white/5 text-slate-300'}">
          \${scene.sceneNum}: \${scene.title.split('&')[0].trim()}
        </button>
      \`).join('');

      const scene = ep.scenes[currentSceneIdx];
      if (!scene) return;

      document.getElementById('interactive-img').src = resolveImg(scene.art);
      document.getElementById('interactive-badge').textContent = scene.sceneNum;
      document.getElementById('interactive-chapter-label').textContent = \`\${ep.title.split(':')[0]} · \${scene.sceneNum}\`;
      document.getElementById('interactive-title').textContent = scene.title;
      document.getElementById('interactive-manga-panel').textContent = scene.mangaPanel;
      document.getElementById('interactive-paragraphs').innerHTML = scene.paragraphs.map(p => \`<p>\${p}</p>\`).join('');
      document.getElementById('interactive-mood').textContent = scene.dialogueBox.mood;
      document.getElementById('interactive-dialogue').textContent = scene.dialogueBox.text;
      document.getElementById('interactive-thought').textContent = scene.dialogueBox.thought;

      const actions = document.getElementById('interactive-actions');
      actions.innerHTML = \`
        <div class="text-xs font-bold text-pink-400 mb-2 flex items-center justify-between">
          <span>⚡ 플레이어 대화 선택지</span>
          <span class="text-[11px] text-slate-400">원작 감정선 반영 반응</span>
        </div>
        <div class="space-y-1.5">
          <button onclick="handleSimChoice('brave')" class="w-full text-left px-3.5 py-2.5 rounded-xl border border-pink-500/40 bg-pink-500/10 hover:bg-pink-500/20 transition text-xs flex items-center justify-between group">
            <span class="font-bold text-pink-200">💥 \"세계 씨, 절 믿고 제 턱을 잡아주세요! 제가 돌진하겠습니다!\"</span>
            <span class="text-[10px] font-extrabold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded-full">신뢰도 +12 상승</span>
          </button>
          <button onclick="handleSimChoice('comic')" class="w-full text-left px-3.5 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition text-xs flex items-center justify-between group">
            <span class="font-bold text-emerald-200">😱 \"제 바나나가 사라졌다고요! 바나나를 되찾아야 인간으로 살 수 있어요!\"</span>
            <span class="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">코믹 심쿵 +9 상승</span>
          </button>
          <button onclick="handleSimChoice('tsun')" class="w-full text-left px-3.5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition text-xs flex items-center justify-between group">
            <span class="font-bold text-amber-200">⚡ \"외계인도 유령도 둘 다 진짜였잖아요! 우리 내기는 비긴 겁니다!\"</span>
            <span class="text-[10px] font-extrabold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">티키타카 +8 상승</span>
          </button>
        </div>
        <div id="choice-feedback-box" class="hidden mt-2 p-3 rounded-xl bg-pink-500/20 border border-pink-500/40 text-xs">
          <div class="font-bold text-pink-300 mb-1" id="feedback-delta"></div>
          <p class="text-white font-medium mb-1" id="feedback-dialogue"></p>
          <p class="italic text-purple-300 text-[11px]" id="feedback-thought"></p>
        </div>
      \`;
    }

    function handleSimChoice(type) {
      const fbBox = document.getElementById('choice-feedback-box');
      if (!fbBox) return;
      fbBox.classList.remove('hidden');

      if (type === 'brave') {
        document.getElementById('feedback-delta').textContent = "⚡ +12 신뢰도 폭발! (원작 모모와 오카룬의 완벽한 전투 호흡)";
        document.getElementById('feedback-dialogue').textContent = "\"알았어, 널 믿을게! 내 염동력 손으로 고삐 꽉 쥐고 있을 테니까 시원하게 날려버려, 파트너!!\"";
        document.getElementById('feedback-thought').textContent = "속마음: (찌질한 줄 알았는데... 날 지키겠다고 목숨 걸고 돌진하는 모습, 진짜 반할 것 같잖아...!)";
      } else if (type === 'comic') {
        document.getElementById('feedback-delta').textContent = "⚡ +9 코믹 심쿵 상승! (얼굴 붉히며 당황하는 세계)";
        document.getElementById('feedback-dialogue').textContent = "\"부끄럽게 대낮부터 바나나 소리 좀 그만해, 변태야!! ...내가 되찾아준다고 약속했잖아! 절대 기죽지 마!\"";
        document.getElementById('feedback-thought').textContent = "속마음: (진짜 저러다 평생 고자로 살면 어떡해... 내가 책임져야 하나?! 아 무슨 생각을 하는 거야!)";
      } else {
        document.getElementById('feedback-delta').textContent = "⚡ +8 티키타카 호감도 상승! (츤데레 맞불)";
        document.getElementById('feedback-dialogue').textContent = "\"시끄러워! 내가 먼저 구해줬으니까 내가 이긴 거거든?! ...하지만 외계인이 진짜 있을 줄은 몰랐어. 인정할게, 바보야.\"";
        document.getElementById('feedback-thought').textContent = "속마음: (비겼으니까 빵도 안 사주고 노예도 안 시킬 거야. 대신... 계속 내 옆에 있어줘.)";
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      selectEpisode(1);
    });
  </script>

</body>
</html>
`;
}

// Generate brain version
fs.writeFileSync(path.join(brainDir, 'preview.html'), generateHtml(false), 'utf8');
console.log('Successfully generated brain/preview.html');

// Generate public version
fs.writeFileSync(path.join(publicDir, 'preview.html'), generateHtml(true), 'utf8');
console.log('Successfully generated public/preview.html');
