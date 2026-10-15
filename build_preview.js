const fs = require('fs');
const path = require('path');

const brainDir = "C:/Users/Sim's/.gemini/antigravity/brain/d5aa5067-2fcb-48ff-987e-d41735d14a6a";
const publicDir = "C:/Users/Sim's/.gemini/antigravity/scratch/segye24-web/public";

// Complete detailed story data for Volume 1~4
const storyData = {
  1: {
    volumeNum: 1,
    title: "제1권: 〈자정의 폐교와 맞닿은 손가락〉",
    subtitle: "단다단 제1권 모티프 · 운명적 조우와 순수 영력의 전도",
    badge: "초기 호감도 25 · 파트너 성립",
    bannerImg: "vol1.jpg",
    summary: "심야 24시, 7대 불가사의에 휘말린 평범한 학생과 영력이 바닥난 채 홀로 악령과 사투를 벌이던 퇴마 갸루 '세계'의 첫 만남. 맞닿은 손끝에서 폭발한 미지의 영력으로 맺어진 두 사람의 운명적 오컬트 로맨스.",
    chapters: [
      {
        num: "제1장",
        title: "심야 24시, 녹슨 철문과 붉은 안광",
        art: "vol1_prologue.jpg",
        artCaption: "1권 프롤로그 · 칠흑 같은 구교사 복도와 다가오는 붉은 시선",
        paragraphs: [
          "시험이 끝난 금요일 밤, 교내에 비밀스럽게 전해져 내려오던 '구교사 7대 불가사의'를 확인하기 위해 무거운 철문을 밀고 폐교 안으로 들어섰다.",
          "낮에는 평범해 보이던 오래된 복도가 밤 12시가 넘어가자 전혀 다른 이계(異界)의 공간으로 변해 있었다. 바닥을 딛는 발소리조차 흡수해 버릴 듯한 짙은 어둠 속에서, 코끝을 찌르는 퀴퀴한 유황 냄새와 등골을 타고 흘러내리는 서늘한 냉기가 번져나갔다.",
          "스마트폰 플래시 불빛을 비추며 낡은 복도를 조심스레 나아가던 그때, 복도 끝 녹슨 철제 사물함 틈새에서 붉은빛의 기괴한 안광 수십 개가 일제히 깜빡였다.",
          "\"크흐흐흐... 산 놈의... 냄새가... 난다아아...\"",
          "귀를 찢는 듯한 음산한 속삭임과 함께, 사물함 문들이 일제히 덜컹거리며 검은 그림자 손들이 바닥을 기어 나와 내 발목을 향해 뻗쳐왔다. 공포에 질려 굳어버린 다리가 한 걸음도 움직이지 않던 바로 그 찰나——",
          "\"컁! 컁컁컁-!!\"",
          "어둠 속에서 웬 뚱뚱하고 복슬복슬한 털 뭉치 하나가 튀어나오며 내 머리채를 붙잡고 허겁지겁 매달렸다. 꼬리에 줄무늬가 선명한 라쿤 한 마리였다! 그리고 라쿤의 뒤편에서, 바람을 가르는 날카로운 은빛 궤적과 함께 붉은 부적이 어둠을 갈랐다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "다급하게 소리치는 츤데레 눈빛",
          text: "\"바보야!! 밤에 여길 왜 기어들어와?! 죽고 싶어서 환장했어?! 꽉 잡아, 놓치면 진짜 죽어!\"",
          thought: "\"하필 영력 바닥났을 때 일반인이 휘말리다니... 게다가 이 녀석 손, 왜 이렇게 크고 따뜻한 건데...?\""
        }
      },
      {
        num: "제2장",
        title: "비하인드 씬 1 · 낡은 사물함 속 초밀착과 숨결",
        art: "vol1_extra1_locker_hide.jpg",
        artCaption: "1권 비하인드 씬 1 · 숨소리조차 닿을 듯한 좁은 사물함 속 밀착",
        paragraphs: [
          "복도를 가득 채운 수십 마리의 그림자 원혼들이 거대한 거미 형태로 뭉쳐 들기 시작했다. 세계는 가디건 소매를 걷어붙이며 품에서 부적을 연달아 꺼냈지만, 며칠 동안 쉬지 않고 이어진 퇴마로 이미 영력이 바닥나 있었다.",
          "부적의 불꽃이 힘없이 사그라들자, 거대한 악령의 다리가 복도 천장을 부수며 내려앉았다. 세계의 가디건 어깨 한쪽이 찢겨 나가며 흰 속살이 언뜻 드러났다.",
          "\"젠장... 마나가 안 모여! 이쪽이야, 얼른 뛰어!\"",
          "세계는 다급히 내 멱살을 잡아끌며 복도 구석의 낡은 대형 철제 사물함 문을 열고 둘이 함께 몸을 던졌다. 쾅 소리와 함께 닫힌 좁디좁은 사물함 안.",
          "키 차이 때문에 세계의 정수리가 내 턱 끝에 닿았고, 헐떡이는 그녀의 숨결과 땀방울이 내 목덜미와 뺨에 고스란히 닿았다. 바깥에서 거대한 괴물이 쿵쾅거리며 사물함을 긁어대자, 세계는 파랗게 질린 얼굴로 조용히 제 검지손가락을 내 입술 위에 얹었다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "얼굴이 홍당무가 된 채 떨리는 목소리",
          text: "\"쉿... 숨소리도 내지 마, 바보야... 조금만 움직여도 캐비닛 문 삐걱거린단 말이야... 심장 소리 들릴 것 같아...\"",
          thought: "\"너무 좁아... 얘 가슴팍 체온이 온몸으로 느껴져서 미칠 것 같아... 내 심장 뛰는 소리 들리면 어쩌지?! 제발 얼른 지나가라...\""
        }
      },
      {
        num: "제3장",
        title: "본편 클라이맥스 · 맞닿은 손가락, 미지의 순수 영력 폭풍",
        art: "vol1.jpg",
        artCaption: "1권 본편 클라이맥스 · 손깍지로 폭발하는 순수 영력 전도와 가위질 퇴마",
        paragraphs: [
          "끼기기익- 쾅! 밖을 배회하던 악령이 결국 사물함 문을 찢어 발겼다. 시퍼런 발톱이 세계의 얼굴을 덮치려는 찰나, 공포 속에서 세계가 본능적으로 내 오른손을 꽉 낚아챘다.",
          "손가락과 손가락이 단단히 얽히는 순간—— 기적이 일어났다.",
          "츠츠츳- 콰아아앙!",
          "내 심장 깊은 곳에 억눌려 있던 미지의 거대한 순수 영력이, 마치 댐이 무너지듯 세계의 손바닥을 타고 폭포수처럼 쏟아져 들어갔다! 세계의 온몸을 휘감는 눈부신 푸른 도깨비불과 금빛 영력의 소용돌이. 방전되었던 그녀의 온몸에 마나가 순식간에 200% 풀충전되며, 긴 갈색 웨이브 머리가 중력을 무시하고 허공으로 휘날렸다.",
          "세계는 믿을 수 없다는 듯 두 눈을 부릅뜨고 내 손과 얼굴을 번갈아 바라보았다.",
          "\"너... 너 도대체 정체가 뭐야?! 뭔 손만 잡았는데 마나가 풀충전되는데...?!\"",
          "이내 붉어진 얼굴로 입술을 깨문 세계는, 내 손깍지를 더욱 꽉 쥐어짜며 허공으로 도약했다.",
          "\"착각하지 마! 내가 손잡고 싶어서 잡은 거 아니거든?! 넌 오늘부터 내 전용 보조배터리야! 손가락 풀기만 해봐, 죽는다 진짜!!\""
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "전율과 숨길 수 없는 츤데레 카리스마",
          text: "\"내 미용 가위가 머리만 자르는 줄 알았어?! 이 악령 찌꺼기 녀석, 오늘이 네 제삿날이다! 라쿤, 영력 증폭해!\"",
          thought: "\"미쳤나 봐... 얘 손, 왜 이렇게 크고 든든한 건데...? 왜 하필 손을 꼭 잡아야 기술이 나가는 건데 신령님 바보!\""
        }
      },
      {
        num: "제4장",
        title: "비하인드 씬 2 · 은빛 가위질 체술과 화려한 폭풍",
        art: "vol1_extra2_talisman_cut.jpg",
        artCaption: "1권 비하인드 씬 2 · 전직 미용사의 섬세하고 화려한 영력 가위질 체술",
        paragraphs: [
          "내 손에서 끊임없이 뿜어져 나오는 순수 영력을 연료 삼아, 세계는 은빛 미용 가위를 허공에 번뜩이며 현란한 체술을 선보였다.",
          "전직 미용실 스태프로 일하며 다져진 섬세하고 빠른 손목 스냅! 영력을 머금은 은빛 가위날이 허공을 십자 형태로 가르자, 수백 장의 붉은 영력 부적이 꽃잎처럼 흩날리며 악령의 거대한 팔다리를 순식간에 절단해 나갔다.",
          "\"컁컁! 캬릉!\" 라쿤이 내 어깨 위에서 신나게 박수를 치며 영력 구슬을 던져주었고, 세계의 마지막 가위질이 악령의 심장부를 꿰뚫었다. 푸른빛의 거대한 폭발과 함께 폐교 전체를 뒤흔들던 저주가 말끔히 정화되었다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "가쁜 숨을 몰아쉬며 으스대는 표정",
          text: "\"봤지? 내 가위질 한 번이면 어떤 악령도 3초 컷이야. ...뭐, 네가 배터리 노릇을 제법 잘해준 덕분이지만.\"",
          thought: "\"얘 앞에서 멋있는 모습 보여주고 싶었는데... 나 방금 좀 멋있었을까? 반했으면 좋겠다...\""
        }
      },
      {
        num: "제5장",
        title: "에필로그 엔딩 · 여명의 복도, 맞닿은 손가락과 보조배터리 계약",
        art: "vol1_epilogue.jpg",
        artCaption: "1권 에필로그 엔딩 · 푸르스름한 새벽빛 아래, 손을 놓지 못하는 두 사람",
        paragraphs: [
          "거대했던 악령의 파편들이 은은한 푸른 반딧불이가 되어 새벽 공기 속으로 흩어져 사라졌다.",
          "모든 힘을 쏟아부은 두 사람은 먼지 쌓인 복도 바닥에 나란히 등을 기대고 주저앉았다. 세계의 가디건은 완전히 흘러내려 있었고, 땀에 젖은 앞머리 사이로 발그레하게 상기된 볼이 여명의 푸른 햇살을 받아 투명하게 빛났다.",
          "라쿤은 완전히 안심한 듯 내 무릎 위에 둥글게 몸을 말고 행복하게 골골송을 부르고 있었다.",
          "고요해진 폐교 복도. 귓가에는 서로의 거친 호흡 소리만이 울려 퍼졌다. 그리고... 숨을 고르던 세계는, 악령이 사라진 지 한참이 지났음에도 나와 단단히 깍지 낀 손을 슬그머니 더 꼭 쥐어왔다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "여명의 안도감과 은은하게 붉어진 고백",
          text: "\"하아... 진짜 죽는 줄 알았네. ...야, 근데 손은 왜 안 놔? ...뭐, 네가 먼저 놓기 전까진 안 놔줄 거니까 착각하지 마. 내일 학교에서도... 손 잡아줄 거지?\"",
          thought: "\"결국 아침까지 손깍지 낀 채로 같이 있었네... 내일 학교에서 마주치면 어떻게 얼굴 보지? 심장이 너무 뛰어...\""
        }
      }
    ]
  },
  2: {
    volumeNum: 2,
    title: "제2권: 〈노을빛 옥상 순찰과 컵라면의 맛〉",
    subtitle: "단다단 제2권 모티프 · 옥상 위의 썸, 1mm의 물 선과 가디건의 온기",
    badge: "호감도 45 · 라면 메이트 & 옥상 파트너",
    bannerImg: "vol2.jpg",
    summary: "악령 퇴치 후 공식 '보조배터리' 계약을 맺은 두 사람. 방과 후 노을빛 옥상에서 펼쳐지는 세계의 라면에 대한 진심, 서로의 상처를 보듬는 따스한 대화, 그리고 밤바람 속에 전해지는 어깨의 온기.",
    chapters: [
      {
        num: "제1장",
        title: "방과 후 17시 20분, 옥상 철문과 편의점 비닐봉투",
        art: "vol2_prologue.jpg",
        artCaption: "2권 프롤로그 · 노을빛 옥상 문을 열고 나타난 라면에 진심인 세계",
        paragraphs: [
          "하교 종소리가 울려 퍼진 지 30분. 학생들의 발길이 완전히 끊긴 조용한 학교 옥상 구석 벤치에 앉아 붉게 물들어가는 가을 하늘을 바라보고 있었다.",
          "어제 새벽의 폐교 사건 이후, 학교에서 마주친 세계는 하루 종일 복도에서 눈이 마주칠 때마다 얼굴을 붉히며 홱 고개를 돌려버렸었다. '설마 날 피하는 건가' 싶어 멍하니 앉아 있던 그때——",
          "철컹- 끼익!",
          "무거운 옥상 철문이 열리며, 한 손에 편의점 비닐봉투를 달랑거리며 세계가 모습을 드러냈다. 헐렁한 오버핏 회색 니트 가디건에 흩날리는 긴 웨이브 머리. 봉투 안에서는 갓 편의점 온수기에서 부어온 진하고 구수한 라면 국물 냄새가 바람을 타고 확 풍겨왔다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "장난스런 윙크와 발그레한 뺨",
          text: "\"야! 너 여기서 멍때리고 있을 줄 알았다. 내가 제일 좋아하는 특제 컵라면 사 왔거든? 물 선 딱 1mm도 안 틀리고 완벽하게 맞췄으니까 불기 전에 얼른 와서 앉아!\"",
          thought: "\"라면 핑계 대긴 했는데... 그냥 방과 후에 얘랑 단둘이 옥상에서 노을 보면서 맛있는 거 먹고 싶었을 뿐이야.\""
        }
      },
      {
        num: "제2장",
        title: "비하인드 씬 1 · 단 1mm의 물 선과 첫 입 나눔",
        art: "vol2_extra1_ramen_blow.jpg",
        artCaption: "2권 비하인드 씬 1 · 백옥 피부를 붉히며 첫 젓가락을 후후 불어 먹여주는 세계",
        paragraphs: [
          "세계는 옥상 나무 벤치에 나란히 걸터앉자마자 컵라면 뚜껑을 뜯어 젓가락으로 꾹 눌러 고정했다. 라쿤 녀석은 이미 벤치 한쪽에 두 발로 서서 꼬리를 살랑거리며 소시지를 탐욕스럽게 바라보고 있었다.",
          "\"잘 봐. 라면은 물 붓고 딱 3분 30초, 면발이 살짝 꼬들꼬들할 때 첫 입을 먹어야 우주 최강의 맛이 나는 법이거든?\"",
          "시간이 되자 세계는 나무젓가락으로 갓 익은 면발을 듬뿍 집어 올렸다. 모락모락 피어오르는 하얀 김 사이로, 그녀의 투명하고 하얀 백옥 피부가 저녁노을빛을 받아 복숭앗빛으로 물들었다.",
          "\"후- 후-\"",
          "정성스럽게 입술을 모아 면발을 식힌 세계는, 이내 부끄러운 듯 시선을 옆으로 비스듬히 돌리며 내 입술 앞으로 젓가락을 쑥 내밀었다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "수줍게 고개를 돌리며 츤츤거리는 표정",
          text: "\"자, 입 벌려... 아- 해. 물 선 1mm 정확하게 맞춘 특제니까... 딱 한 입만 특별히 주는 거야. 음미하면서 먹어, 바보야!\"",
          thought: "\"내가 먹던 젓가락인데... 이거 완전 간접 키스 아니야?! 아 몰라, 얼굴 빨개진 거 김 때문에 그렇다고 우겨야지!\""
        }
      },
      {
        num: "제3장",
        title: "본편 클라이맥스 · 노을빛 옥상 순찰과 컵라면의 맛",
        art: "vol2.jpg",
        artCaption: "2권 본편 클라이맥스 · 보랏빛 황혼 아래, 서로의 마음을 털어놓는 시간",
        paragraphs: [
          "후루룩- 면발을 삼키는 소리와 함께 옥상에 따스한 침묵이 내려앉았다. 세계가 끓여준 라면은 과연 절묘하게 간이 맞아, 온몸의 긴장이 사르르 녹아내리는 듯했다.",
          "\"맛있지? 흥, 내가 끓인 라면 맛없다고 한 사람 한 명도 없거든.\"",
          "세계는 국물을 홀짝이며 먼 도시의 빌딩 숲과 보랏빛으로 물드는 저녁노을을 바라보았다.",
          "\"...사실 나, 어릴 때부터 귀신이 보여서 친구들이 다 미친 애 취급했거든. 영매 가문이니 뭐니 하는 것도 다 도망치고 싶었어. 그래서 고등학교 오자마자 머리도 볶고 화장도 진하게 하고 갸루처럼 입고 다닌 거야. 센 척이라도 안 하면 무서워서 못 버티니까.\"",
          "바람에 흩날리는 세계의 머리칼을 가만히 바라보자, 그녀가 살짝 쓸쓸한 미소를 지었다.",
          "\"근데... 네가 내 배터리가 되어준 뒤로는... 밤에 귀신 잡으러 다니는 게 하나도 안 무섭더라. 진짜야.\""
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "따스한 온기와 설레는 진심",
          text: "\"너 만나기 전까진 옥상에서 맨날 혼자 라면 먹었는데... 둘이서 먹으니까 라면이 백 배는 더 맛있네. ...내일도 같이 먹어줄 거지?\"",
          thought: "\"왜 쳐다만 봐도 자꾸 실실 웃음이 나지? 라면 국물 후후 불어주는 모습, 왜 이렇게 다정해 보이는 건데... 반칙이야.\""
        }
      },
      {
        num: "제4장",
        title: "비하인드 씬 2 · 서늘한 노을바람과 덮어준 가디건",
        art: "vol2_extra2_windy_cardigan.jpg",
        artCaption: "2권 비하인드 씬 2 · 바람에 떠는 세계의 어깨 위로 겉옷을 걸쳐준 순간",
        paragraphs: [
          "어느덧 해가 뉘엿뉘엿 넘어가고, 옥상 특유의 서늘한 가을 저녁 칼바람이 불어 닥쳤다.",
          "\"으으... 춥다...\"",
          "얇은 셔츠 위에 가디건 한 장만 걸치고 있던 세계가 양팔을 감싸 쥐며 작게 몸을 떨었다. 나는 말없이 입고 있던 교복 재킷을 벗어 세계의 가녀린 어깨 위로 조심스레 둘러주었다.",
          "온기가 닿자 세계는 깜짝 놀라 토끼처럼 둥근 눈망울로 나를 올려다보았다. 옷깃을 두 손으로 꼭 쥔 채, 그녀의 뺨이 라면 국물보다 더 붉게 타올랐다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "촉촉한 눈망울과 풋풋한 떨림",
          text: "\"...따뜻하네. 너 생각보다 눈치 빠르다? ...고마워. 감기 걸리지 말라고 딱 10분만 빌리는 거니까 오해는 마.\"",
          thought: "\"옷에서 좋은 섬유유연제 냄새 나... 심장 뛰는 소리가 옷감 너머로 다 들리는 것 같아. 벗기 싫다...\""
        }
      },
      {
        num: "제5장",
        title: "에필로그 엔딩 · 별빛 내리는 옥상, 어깨를 빌려준 10분의 시간",
        art: "vol2_epilogue.jpg",
        artCaption: "2권 에필로그 엔딩 · 서늘한 밤바람 속, 조용히 어깨에 머리를 기댄 세계",
        paragraphs: [
          "옥상 난간 아래로 도심의 네온사인 불빛들이 보석처럼 반짝이기 시작했다.",
          "바닥에는 국물 한 방울까지 깨끗하게 비운 빈 컵라면 용기 두 개가 놓여 있었다. 소시지를 배부르게 먹은 라쿤은 세계의 무릎 위에서 이미 새근새근 단잠에 빠져 있었다.",
          "차가운 밤공기 속에서 세계는 '춥다...'라며 슬그머니 내 옆으로 바짝 붙어 앉았다. 그리고는 아주 조심스럽게, 망설이던 고개를 내 어깨 위로 툭 기대어왔다.",
          "부드러운 갈색 머리칼에서 은은한 복숭아 샴푸 향기가 피어올랐고, 규칙적으로 내쉬는 따스한 숨결이 내 쇄골을 간질였다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "서늘한 밤바람 속 달콤한 밀착",
          text: "\"...진짜 맛있다. 네가 라면 국물까지 다 먹어줘서 기분 좋아. ...바람 추우니까 10분만 이러고 있자. 내 어깨 빌려줄 사람, 세상에서 너밖에 없으니까 가만히 있어.\"",
          thought: "\"어깨 진짜 단단하고 따뜻해... 라쿤도 얌전히 잠들었고, 이대로 시간이 영원히 멈췄으면 좋겠다.\""
        }
      }
    ]
  },
  3: {
    volumeNum: 3,
    title: "제3권: 〈소나기 내리는 사당과 젖은 셔츠의 비밀〉",
    subtitle: "단다단 제3권 아크로바틱 사라사라 모티프 · 눈물의 붕대와 애절한 고백",
    badge: "호감도 68 · 깊은 유대감과 눈물의 맹세",
    bannerImg: "vol3.jpg",
    summary: "하굣길 기습 폭우로 피신한 비밀 사당. 슬픈 모성애 원혼의 기습에서 세계를 지키려다 깊은 부상을 입은 플레이어. 눈물을 흘리며 붕대를 감아주는 세계의 애절한 고백과 천둥소리 속 와락 안긴 포옹.",
    chapters: [
      {
        num: "제1장",
        title: "기습적인 여름 폭우, 붉은 토리이 계단의 질주",
        art: "vol3_prologue.jpg",
        artCaption: "3권 프롤로그 · 억수같이 쏟아지는 소나기 속 사당으로 질주하는 두 사람",
        paragraphs: [
          "유난히 후텁지근하던 여름날 하굣길, 마른하늘에 먹구름이 순식간에 몰려들더니 양동이로 들이붓는 듯한 폭우가 쏟아져 내리기 시작했다.",
          "우산도 없이 처마 밑에서 발을 동동 구르던 내 손을, 세계가 사정없이 낚아챘다.",
          "\"바보야, 거기 서 있으면 벼락 맞아! 날 따라와!\"",
          "첨벙- 첨벙! 교복 구두가 물웅덩이를 튀기며 산자락으로 이어지는 울창한 숲길을 내달렸다. 숲속 깊숙이 붉은 칠이 벗겨진 거대한 목조 토리이 문이 안갯속에서 모습을 드러냈다.",
          "비에 흠뻑 젖은 머리카락에서 물방울이 사방으로 튀는 와중에도 세계는 웃고 있었다. 가문의 비밀 사당 처마 밑으로 간신히 몸을 던진 두 사람은 머리끝부터 발끝까지 물에 빠진 생쥐 꼴이었다. 라쿤 녀석은 커다란 나뭇잎을 우산처럼 머리에 얹고 뽈뽈거리며 사당 마루로 뛰어올랐다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "숨을 헐떡이며 빗속에서 웃는 얼굴",
          text: "\"하아, 하아... 진짜 무식하게 쏟아지네! 야, 빨리 들어와! 우리 가문 비밀 사당이라 아무도 안 와. 옷 다 젖었잖아 바보야!\"",
          thought: "\"물에 젖은 교복 셔츠 때문에 속살 다 비치는 거 아니야...?! 아 진짜 왜 하필 비가 와서 단둘이 사당에 갇히게 만드냐고!\""
        }
      },
      {
        num: "제2장",
        title: "비하인드 씬 1 · 젖은 머리칼과 수건의 온기",
        art: "vol3_extra1_wet_hair_dry.jpg",
        artCaption: "3권 비하인드 씬 1 · 미용사 손길로 정성스레 젖은 머리를 말려주는 세계",
        paragraphs: [
          "사당 툇마루에 걸터앉아 뚝뚝 떨어지는 빗물을 털어내고 있을 때, 세계가 사당 안쪽에서 보송보송한 커다란 면 수건 두 장을 가져왔다.",
          "\"가만히 있어 봐. 머리 그렇게 박박 문지르면 모발 다 상하거든?\"",
          "세계는 내 바로 앞에 바짝 다가와 무릎을 꿇고 앉더니, 수건으로 내 젖은 머리를 감싸 쥐었다. 전직 미용실 스태프 출신다운 능숙하고 섬세한 손길이 두피를 부드럽게 마사지하듯 물기를 닦아내기 시작했다.",
          "너무나 가까운 거리. 세계의 얇은 여름 셔츠 속으로 은은하게 비치는 어깨선과 빗물에 젖은 쇄골, 그리고 코끝을 스치는 젖은 복숭아 향기에 숨이 턱 막혀왔다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "섬세하고 나직한 체온 밀착",
          text: "\"얌전히 있어... 미용실 알바 짬밥이 얼만데. ...근데 너, 왜 그렇게 내 얼굴만 뚫어져라 봐? 침 삼키는 소리 다 들리거든?!\"",
          thought: "\"이렇게 가까이서 머리 말려주니까... 자꾸 눈이 마주치잖아. 내 심장 소리 들킬까 봐 손가락 떨리는 것 좀 봐...\""
        }
      },
      {
        num: "제3장",
        title: "본편 클라이맥스 · 수신 악령의 습격과 피 묻은 붕대",
        art: "vol3.jpg",
        artCaption: "3권 본편 클라이맥스 · 다친 팔에 눈물을 글썽이며 붕대를 감아주는 세계",
        paragraphs: [
          "그 평화는 오래가지 못했다. 콰르릉- 쾅! 거친 뇌우와 함께 사당 마당의 연못이 솟구치며, 비에 젖은 긴 붉은 옷을 휘감은 원혼(아크로바틱 사라사라 모티프)이 처마를 부수고 난입했다!",
          "아이를 잃은 슬픔으로 광기에 물든 수신 악령이 날카로운 물의 창을 무방비한 세계의 등 뒤로 내리꽂으려던 순간——",
          "나는 생각할 겨를도 없이 몸을 날려 세계를 품에 와락 끌어안았다.",
          "서걱-! 날카로운 영력의 물줄기가 내 오른팔을 깊숙이 베고 지나가며 붉은 피가 다다미 바닥으로 후두둑 떨어졌다.",
          "\"안 돼-!! 너 미쳤어?! 내 파트너한테 손대지 마아아앗!!\"",
          "피를 본 세계의 눈이 뒤집혔다. 분노로 폭주한 세계의 은빛 가위가 허공에서 수백 갈래의 빛의 참격을 뿜어내며 악령의 핵을 단숨에 베어 넘겼다. 한 맺힌 원혼이 성불하며 빗속으로 흩어진 뒤, 세계는 사시나무 떨듯 떨리는 손으로 구급상자를 안고 내 앞에 털썩 무릎을 꿇었다.",
          "소독약을 바르는 내내, 세계의 커다란 눈망울에서 눈물이 방울방울 흘러내려 붕대 위로 떨어졌다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "눈물이 글썽글썽한 애절한 슬픔",
          text: "\"다쳤으면 다쳤다고 말을 했어야지... 왜 미련하게 날 감싸고 그래?! 나 지켜주려다 다친 거잖아... 바보같이. 네가 잘못되면... 난 진짜 어떡하라고...\"",
          thought: "\"피 흘리는 거 보는데 진짜 가슴이 찢어지는 줄 알았어... 왜 날 위해 목숨까지 거는 건데? 나 얘 없으면 이제 평생 못 살아...\""
        }
      },
      {
        num: "제4장",
        title: "비하인드 씬 2 · 천둥 번개와 불시의 포옹",
        art: "vol3_extra2_thunder_hug.jpg",
        artCaption: "3권 비하인드 씬 2 · 우르릉 천둥소리에 기겁하며 품에 안겨든 세계",
        paragraphs: [
          "상처 치료를 거의 마쳐갈 무렵, 번쩍- 하는 섬광과 함께 온 천지를 뒤흔드는 거대한 벼락 소리가 사당 지붕 위로 내리꽂혔다.",
          "우르르릉 쾅쾅쾅-!!",
          "\"꺄아아악-!!\"",
          "평소 귀신 따윈 눈 하나 깜짝 않고 때려잡던 당찬 퇴마사 세계가, 소스라치게 비명을 지르며 내 품으로 번개처럼 뛰어들었다! 내 가슴팍에 제 얼굴을 파묻은 채 오들오들 떨며 내 옷자락을 쥐어뜯는 세계. 라쿤도 놀라 세계의 등 뒤로 숨어 꼬리를 바짝 세웠다.",
          "무방비하게 안겨든 그녀의 가녀린 체온과 두근거리는 심장 박동이 고스란히 전해져 왔다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "무방비한 깜짝 포옹과 새빨개진 얼굴",
          text: "\"...하, 하필 천둥이... 야, 절대로 나 비웃지 마라... 나 천둥 귀신은 상성이 최악이란 말이야! 딱 5분만... 아니 비 그칠 때까지 이러고 있을 거야!\"",
          thought: "\"품이 너무 넓고 따뜻해서 못 떨어지겠어... 천둥 더 쳤으면 좋겠다고 생각하면 나 진짜 나쁜 애지?\""
        }
      },
      {
        num: "제5장",
        title: "에필로그 엔딩 · 비 갠 뒤의 월광, 붕대 너머로 전해진 고백",
        art: "vol3_epilogue.jpg",
        artCaption: "3권 에필로그 엔딩 · 빗물 웅덩이에 비친 달빛 아래, 영원을 맹세하는 순간",
        paragraphs: [
          "어느덧 장대비가 거짓말처럼 잦아들고, 사당 처마 끝에서 맑은 빗방울만이 똑, 똑 떨어지는 소리가 고요하게 울려 퍼졌다.",
          "구름이 걷히며 밤하늘에 둥근 보름달이 모습을 드러냈다. 은빛 달빛이 다다미방 바닥을 환하게 비추자, 세계는 붕대가 칭칭 감긴 내 손을 제 두 손으로 조심스럽게 감싸 쥐었다.",
          "그리고는 그 손을 제 가슴팍, 심장이 뛰는 곳으로 지그시 끌어당겼다.",
          "방금 흘린 눈물로 촉촉하게 젖은 속눈썹, 달빛을 머금은 맑은 눈동자가 내 시선을 똑바로 응시했다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "달빛 아래 수줍고 진지한 맹세",
          text: "\"...네가 나 지키려다 피 흘리는 거, 다시는 못 보겠어. 그러니까 약속해. 위험할 땐 무조건 내 뒤로 숨는다고. ...그리고... 나 앞으로도 평생 네 상처 감싸줄게. 알았지?\"",
          thought: "\"평생 상처를 감싸주겠다니... 나 진짜 방금 돌직구 날려버렸네. 하지만 후회 안 해. 네 곁에 영원히 있을 거야.\""
        }
      }
    ]
  },
  4: {
    volumeNum: 4,
    title: "제4권: 〈화려한 선배 텐겐과 은밀한 손깍지〉",
    subtitle: "단다단 제4권 지진 모티프 · 198cm 은발 텐겐의 도발과 둘만의 비밀 라멘 데이트",
    badge: "호감도 100 달성 · 은밀한 손깍지와 완전한 연인 성립",
    bannerImg: "vol4.jpg",
    summary: "198cm 은발 장발 미남 텐겐 선배의 화려한 등장과 삼각관계 질투! 번화가 요괴 합동 토벌전에서 텐겐 몰래 등 뒤로 나눈 은밀한 손깍지, 그리고 단둘이 골목길을 내달려 성립된 영원한 라멘 데이트.",
    chapters: [
      {
        num: "제1장",
        title: "교문의 술렁임, 198cm 은발 미남 텐겐의 등장",
        art: "vol4_prologue.jpg",
        artCaption: "4권 프롤로그 · 교문 앞을 마비시킨 198cm 은발 쌩얼 미남 텐겐의 등장",
        paragraphs: [
          "따스한 봄바람에 분홍빛 벚꽃잎이 흩날리던 어느 날 아침 등굣길, 교문 앞이 평소보다 열 배는 시끄러운 여학생들의 비명과 환호성으로 가득 찼다.",
          "인파의 한가운데에는 믿을 수 없을 만큼 압도적인 피지컬을 자랑하는 남학생이 서 있었다. 198cm에 달하는 떡 벌어진 어깨, 실크처럼 찰랑이는 은빛 장발 머리를 어깨 뒤로 풀어헤친 채, 흠잡을 데 없는 조각 같은 얼굴로 호탕하게 웃고 있는 3학년 우즈이 텐겐 선배였다.",
          "그 눈부신 연예인급 아우라에 나도 모르게 기가 죽어 멍하니 서 있던 순간, 뒤에서 누군가가 내 교복 재킷을 툭툭 쳤다.",
          "돌아보니 뾰로통하게 입술을 내민 세계가 팔짱을 낀 채 서 있었다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "당당한 질투 차단과 애정 어린 미소",
          text: "\"야, 뭘 그렇게 넋 놓고 쳐다보고 있어? 키만 쓸데없이 크고 시끄러운 은발 원숭이일 뿐이거든? ...내 눈엔 네가 백 배는 더 잘생겼으니까, 기죽지 말고 얼른 들어가자.\"",
          thought: "\"질투하는 표정 봐... 귀여워 미치겠네. 텐겐 선배가 아무리 잘생겨봤자 내 마음속엔 너 하나밖에 없는데.\""
        }
      },
      {
        num: "제2장",
        title: "비하인드 씬 1 · 은발 텐겐의 도발과 세계의 앞막아서기",
        art: "vol4_extra1_tengen_tease.jpg",
        artCaption: "4권 비하인드 씬 1 · 양팔을 벌려 볼을 부풀리며 플레이어를 철벽 방어하는 세계",
        paragraphs: [
          "점심시간, 텐겐 선배가 능글맞은 미소를 지으며 복도에서 우리 앞을 턱 가로막았다.",
          "\"어이, 꼬맹이 퇴마사 세계! 들리는 소문엔 요즘 웬 보조배터리 하나 데리고 다니면서 화려하게 귀신 잡고 다닌다며? 그딴 어설픈 녀석 말고, 이 화려한 형님이랑 정식으로 팀 짜지 않을래?\"",
          "텐겐이 나를 힐끗 내려다보며 어깨를 툭 치려던 그 찰나——",
          "세계가 번개처럼 내 앞을 가로막아서며 양팔을 활짝 벌렸다! 볼을 복어처럼 빵빵하게 부풀리고 올려다보며 으르렁거리는 귀여운 맹수 세계. 가방 속에 숨어 있던 라쿤도 고개를 쏙 내밀고 텐겐을 향해 캬릉거리며 앞발을 휘둘렀다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "귀여운 질투 방어와 맹렬한 독점욕",
          text: "\"텐겐 선배! 쓸데없는 소리 하지 말고 체육관이나 가시죠?! 내 파트너한테 털끝 하나 손대지 마요! 이 바보는... 나만 데리고 다닐 수 있단 말이에요!\"",
          thought: "\"텐겐 선배한테 말려들면 안 돼... 내 파트너는 오직 나만 독점할 수 있단 말이야! 절대로 안 뺏겨!\""
        }
      },
      {
        num: "제3장",
        title: "본편 클라이맥스 · 화려한 선배 텐겐과 은밀한 손깍지",
        art: "vol4.jpg",
        artCaption: "4권 본편 클라이맥스 · 텐겐 몰래 등 뒤로 나눈 은밀한 손깍지와 윙크",
        paragraphs: [
          "방과 후, 학교 뒤편 번화가 골목에 텐겐 선배가 추적하던 도심형 특급 요괴가 출몰했다.",
          "198cm 텐겐의 압도적인 피지컬 격투술과 세계의 부적 가위질이 맞물리며 치열한 난전이 벌어졌다. 텐겐이 호쾌하게 앞장서서 악령을 몰아붙이는 그 틈을 타, 내 곁으로 다가온 세계가 등 뒤로 슬그머니 손을 뻗어왔다.",
          "그리고는 텐겐 선배의 시선이 닿지 않는 등 뒤에서, 내 손가락 사이사이로 깊숙하게 자신의 손가락을 밀어 넣어 빈틈없이 손깍지를 꼭 맞물렸다!",
          "쿵쾅거리는 심장 소리. 깜짝 놀라 굳어버린 내 얼굴을 올려다보며, 세계는 새빨개진 얼굴로 수줍고 사랑스러운 윙크를 살짝 보냈다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "은밀한 스릴과 넘쳐나는 사랑",
          text: "\"쉿... 삐진 표정 짓지 마, 바보야. 텐겐 선배는 어릴 때부터 알던 동네 오빠일 뿐이거든? ...내 손가락 깍지 낀 거 느껴지지? 내 파트너는... 세상에서 너 하나뿐이야.\"",
          thought: "\"등 뒤로 손깍지 꼭 쥐어주니까 이제야 안심하는 것 봐. 텐겐 선배가 아무리 축제 같이 가자고 졸라도 난 너랑 라면 먹으러 갈 거거든!\""
        }
      },
      {
        num: "제4장",
        title: "에필로그 엔딩 · 노을빛 골목길, 둘만의 비밀 라면집 탈출기",
        art: "vol4_epilogue.jpg",
        artCaption: "4권 에필로그 엔딩 · 텐겐을 따돌리고 비밀 라면집 골목으로 도망쳐 환하게 웃는 세계",
        paragraphs: [
          "요괴 토벌이 끝나고 텐겐 선배가 \"좋았어, 오늘 화려했다! 내가 시원하게 고기 쏜다!\"라며 뒤를 돌아보는 바로 그 순간——",
          "세계는 텐겐의 말이 끝나기도 전에 내 손을 낚아채고 냅다 전력 질주로 골목길을 내달리기 시작했다!",
          "\"야, 세계!! 어디 가?!\" 저 멀리서 텐겐 선배의 황당해하는 고함이 울려 퍼졌지만, 우리는 좁은 골목길을 꺾고 또 꺾으며 미친 듯이 달렸다. 숨이 턱 끝까지 차오르고 바람에 머리칼이 마구 헝클어졌지만, 서로를 마주 보며 터져 나오는 웃음을 도저히 참을 수 없었다.",
          "도착한 곳은 붉은 제등이 따스하게 켜진 세계의 비밀 단골 라면집 골목이었다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "사랑의 승리와 장난기 넘치는 미소",
          text: "\"크큭... 텐겐 선배 멍때리는 표정 봤어?! 쌤통이다 진짜! ...거봐, 내가 말했지? 세상에서 제일 맛있는 라면은 너랑 단둘이 먹는 라면이라고. 가자, 오늘은 내가 풀코스로 쏜다!\"",
          thought: "\"너랑 손잡고 골목 달릴 때... 심장 터지는 줄 알았어. 이제 우린 그 누구도 끼어들 수 없는 영원한 파트너야.\""
        }
      },
      {
        num: "제5장",
        title: "비하인드 씬 2 · 단골 라면집 골목과 다정한 팔짱",
        art: "vol4_extra2_ramen_date.jpg",
        artCaption: "4권 비하인드 씬 2 · 따스한 저녁 골목길, 팔짱을 꼭 끼고 환하게 웃는 세계",
        paragraphs: [
          "붉은 제등 불빛 아래 은은한 차슈 육수 냄새가 골목을 가득 채우고 있었다.",
          "세계는 내 팔에 제 팔을 꼬옥 얽어맨 채, 단 한 뼘의 틈도 주지 않고 내 어깨에 제 뺨을 기댔다. 메뉴판을 손가락으로 가리키며 세상을 다 가진 아이처럼 환하게 웃는 세계.",
          "라쿤은 세계의 어깨 위에 올라타 꼬리를 살랑거리며 입맛을 쩝쩝 다시고 있었다. 봄밤의 공기는 달콤했고, 맞닿은 팔 너머로 전해지는 심장 박동은 하나가 된 듯 규칙적으로 울리고 있었다."
        ],
        dialogueBox: {
          speaker: "세계 (퇴마 갸루)",
          mood: "완전한 행복감과 둘만의 야식 데이트",
          text: "\"여기 차슈 추가가 진짜 예술이거든? 너 배 터질 때까지 먹여줄 테니까 각오해! 라쿤도 찬성이지? ...내일도, 모레도... 계속 내 곁에 있어줘.\"",
          thought: "\"팔짱 낀 채로 골목 걷는 거... 진짜 연인 같아서 심장 터질 것 같아. 영원히 이러고 싶다.\""
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
      'vol2_prologue.jpg': '/assets/segye_occult/02_vol2_prologue.jpg',
      'vol2.jpg': '/assets/segye_occult/02_vol2_patrol_rooftop.jpg',
      'vol2_epilogue.jpg': '/assets/segye_occult/02_vol2_epilogue.jpg',
      'vol2_extra1_ramen_blow.jpg': '/assets/segye_occult/02_vol2_extra1_ramen_blow.jpg',
      'vol2_extra2_windy_cardigan.jpg': '/assets/segye_occult/02_vol2_extra2_windy_cardigan.jpg',
      'vol3_prologue.jpg': '/assets/segye_occult/03_vol3_prologue.jpg',
      'vol3.jpg': '/assets/segye_occult/03_vol3_rain_hideout.jpg',
      'vol3_epilogue.jpg': '/assets/segye_occult/03_vol3_epilogue.jpg',
      'vol3_extra1_wet_hair_dry.jpg': '/assets/segye_occult/03_vol3_extra1_wet_hair_dry.jpg',
      'vol3_extra2_thunder_hug.jpg': '/assets/segye_occult/03_vol3_extra2_thunder_hug.jpg',
      'vol4_prologue.jpg': '/assets/segye_occult/04_vol4_prologue.jpg',
      'vol4.jpg': '/assets/segye_occult/04_vol4_tengen_jealousy.jpg',
      'vol4_epilogue.jpg': '/assets/segye_occult/04_vol4_epilogue.jpg',
      'vol4_extra1_tengen_tease.jpg': '/assets/segye_occult/04_vol4_extra1_tengen_tease.jpg',
      'vol4_extra2_ramen_date.jpg': '/assets/segye_occult/04_vol4_extra2_ramen_date.jpg'
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
  <title>세계 (퇴마 갸루) 1~4권 전체 장편 스토리 &amp; 인터랙티브 뷰어</title>
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <style>
    .active-vol-tab {
      background: linear-gradient(135deg, #ec4899, #8b5cf6) !important;
      color: white !important;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(236, 72, 153, 0.35);
      border-color: transparent !important;
    }
    .active-mode-btn {
      background: rgba(236, 72, 153, 0.25) !important;
      color: #f472b6 !important;
      border-color: #ec4899 !important;
      font-weight: 700;
    }
    .prose-bubble {
      position: relative;
    }
    .prose-bubble::before {
      content: "";
      position: absolute;
      left: 1rem;
      top: 0;
      bottom: 0;
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
              <span>세계 <span class="text-pink-400 font-normal text-lg">(Segye)</span></span>
            </h1>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">퇴마 갸루</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">단다단 각색 1~4권 완편</span>
          </div>
          <p class="text-xs text-slate-400">
            실제 인물 페르소나 기반 21종 고화질 삽화 수록 · 소설/웹툰 풀 에피소드 정독 &amp; 인터랙티브 시뮬레이션
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2.5 self-end md:self-auto">
        <a href="${galleryUrl}" class="px-3.5 py-2 rounded-xl border border-pink-500/40 bg-pink-500/10 text-pink-300 font-bold text-xs hover:bg-pink-500/20 transition flex items-center gap-1.5">
          <span>🖼️ 21종 고화질 화보 갤러리</span>
        </a>
        <a href="${webAppUrl}" target="_blank" class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition shadow-md flex items-center gap-1.5">
          <span>💬 실시간 AI 대화 웹앱</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </header>

    <!-- Volume Tabs Navigation -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
      <button onclick="selectVolume(1)" id="vol-btn-1" class="vol-btn active-vol-tab p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500/50 transition text-left flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-pink-400 font-bold tracking-wider uppercase">Volume 01</span>
          <span class="text-xs">👻</span>
        </div>
        <span class="font-bold text-xs sm:text-sm truncate">자정의 폐교와 손가락</span>
        <span class="text-[11px] text-slate-400 truncate">영력 전도 &amp; 배터리 계약</span>
      </button>

      <button onclick="selectVolume(2)" id="vol-btn-2" class="vol-btn p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500/50 transition text-left flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-pink-400 font-bold tracking-wider uppercase">Volume 02</span>
          <span class="text-xs">🍜</span>
        </div>
        <span class="font-bold text-xs sm:text-sm truncate">노을빛 옥상 순찰</span>
        <span class="text-[11px] text-slate-400 truncate">1mm 물 선 &amp; 가디건 온기</span>
      </button>

      <button onclick="selectVolume(3)" id="vol-btn-3" class="vol-btn p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500/50 transition text-left flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-pink-400 font-bold tracking-wider uppercase">Volume 03</span>
          <span class="text-xs">🌧️</span>
        </div>
        <span class="font-bold text-xs sm:text-sm truncate">소나기 내리는 사당</span>
        <span class="text-[11px] text-slate-400 truncate">눈물의 붕대 &amp; 천둥 포옹</span>
      </button>

      <button onclick="selectVolume(4)" id="vol-btn-4" class="vol-btn p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-pink-500/50 transition text-left flex flex-col gap-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] text-pink-400 font-bold tracking-wider uppercase">Volume 04</span>
          <span class="text-xs">✨</span>
        </div>
        <span class="font-bold text-xs sm:text-sm truncate">화려한 선배 텐겐</span>
        <span class="text-[11px] text-slate-400 truncate">은밀한 손깍지 &amp; 라멘 데이트</span>
      </button>
    </div>

    <!-- Mode Selector & Volume Meta Bar -->
    <div class="bg-[#150f24] border border-white/10 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <h2 id="vol-title-display" class="text-lg font-bold text-white"></h2>
          <span id="vol-badge-display" class="px-2 py-0.5 rounded text-[11px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30"></span>
        </div>
        <p id="vol-subtitle-display" class="text-xs text-slate-400"></p>
      </div>

      <div class="flex items-center gap-2 self-stretch sm:self-auto">
        <button onclick="setMode('story')" id="mode-story-btn" class="mode-btn active-mode-btn flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:border-pink-500/40 transition flex items-center justify-center gap-1.5">
          <span>📖 장편 소설 정독 모드</span>
        </button>
        <button onclick="setMode('interactive')" id="mode-interactive-btn" class="mode-btn flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 hover:border-pink-500/40 transition flex items-center justify-center gap-1.5">
          <span>🎮 대화 분기 시뮬레이션</span>
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
      <!-- 5 Phase Navigator -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4">
        <button onclick="selectPhase(0)" id="phase-btn-0" class="phase-tab px-3 py-1.5 rounded-xl text-xs font-bold border border-pink-500 bg-pink-500/20 text-pink-300">1. 프롤로그</button>
        <button onclick="selectPhase(1)" id="phase-btn-1" class="phase-tab px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 bg-white/5 text-slate-300">2. 비하인드 씬 1</button>
        <button onclick="selectPhase(2)" id="phase-btn-2" class="phase-tab px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 bg-white/5 text-slate-300">3. 본편 클라이맥스</button>
        <button onclick="selectPhase(3)" id="phase-btn-3" class="phase-tab px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 bg-white/5 text-slate-300">4. 비하인드 씬 2</button>
        <button onclick="selectPhase(4)" id="phase-btn-4" class="phase-tab px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 bg-white/5 text-slate-300">5. 에필로그 엔딩</button>
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
            <div id="interactive-paragraphs" class="text-xs text-slate-300 leading-relaxed space-y-2 mb-4 bg-black/30 p-3 rounded-xl border border-white/5 max-h-48 overflow-y-auto"></div>

            <!-- Dialogue Bubble -->
            <div class="p-3.5 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/10 border border-pink-500/30 mb-4">
              <div class="flex items-center justify-between text-xs font-bold text-pink-400 mb-1">
                <span>세계의 실시간 대사</span>
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
    const storyData = ${JSON.stringify(storyData)};

    // Map filenames to public or brain relative paths
    const isPublic = ${isPublic ? 'true' : 'false'};
    const pathMapping = {
      'main.jpg': isPublic ? '/assets/segye_occult/segye_main.jpg' : 'main.jpg',
      'vol1_prologue.jpg': isPublic ? '/assets/segye_occult/01_vol1_prologue.jpg' : 'vol1_prologue.jpg',
      'vol1.jpg': isPublic ? '/assets/segye_occult/01_vol1_encounter.jpg' : 'vol1.jpg',
      'vol1_epilogue.jpg': isPublic ? '/assets/segye_occult/01_vol1_epilogue.jpg' : 'vol1_epilogue.jpg',
      'vol1_extra1_locker_hide.jpg': isPublic ? '/assets/segye_occult/01_vol1_extra1_locker_hide.jpg' : 'vol1_extra1_locker_hide.jpg',
      'vol1_extra2_talisman_cut.jpg': isPublic ? '/assets/segye_occult/01_vol1_extra2_talisman_cut.jpg' : 'vol1_extra2_talisman_cut.jpg',
      'vol2_prologue.jpg': isPublic ? '/assets/segye_occult/02_vol2_prologue.jpg' : 'vol2_prologue.jpg',
      'vol2.jpg': isPublic ? '/assets/segye_occult/02_vol2_patrol_rooftop.jpg' : 'vol2.jpg',
      'vol2_epilogue.jpg': isPublic ? '/assets/segye_occult/02_vol2_epilogue.jpg' : 'vol2_epilogue.jpg',
      'vol2_extra1_ramen_blow.jpg': isPublic ? '/assets/segye_occult/02_vol2_extra1_ramen_blow.jpg' : 'vol2_extra1_ramen_blow.jpg',
      'vol2_extra2_windy_cardigan.jpg': isPublic ? '/assets/segye_occult/02_vol2_extra2_windy_cardigan.jpg' : 'vol2_extra2_windy_cardigan.jpg',
      'vol3_prologue.jpg': isPublic ? '/assets/segye_occult/03_vol3_prologue.jpg' : 'vol3_prologue.jpg',
      'vol3.jpg': isPublic ? '/assets/segye_occult/03_vol3_rain_hideout.jpg' : 'vol3.jpg',
      'vol3_epilogue.jpg': isPublic ? '/assets/segye_occult/03_vol3_epilogue.jpg' : 'vol3_epilogue.jpg',
      'vol3_extra1_wet_hair_dry.jpg': isPublic ? '/assets/segye_occult/03_vol3_extra1_wet_hair_dry.jpg' : 'vol3_extra1_wet_hair_dry.jpg',
      'vol3_extra2_thunder_hug.jpg': isPublic ? '/assets/segye_occult/03_vol3_extra2_thunder_hug.jpg' : 'vol3_extra2_thunder_hug.jpg',
      'vol4_prologue.jpg': isPublic ? '/assets/segye_occult/04_vol4_prologue.jpg' : 'vol4_prologue.jpg',
      'vol4.jpg': isPublic ? '/assets/segye_occult/04_vol4_tengen_jealousy.jpg' : 'vol4.jpg',
      'vol4_epilogue.jpg': isPublic ? '/assets/segye_occult/04_vol4_epilogue.jpg' : 'vol4_epilogue.jpg',
      'vol4_extra1_tengen_tease.jpg': isPublic ? '/assets/segye_occult/04_vol4_extra1_tengen_tease.jpg' : 'vol4_extra1_tengen_tease.jpg',
      'vol4_extra2_ramen_date.jpg': isPublic ? '/assets/segye_occult/04_vol4_extra2_ramen_date.jpg' : 'vol4_extra2_ramen_date.jpg'
    };

    function resolveImg(name) {
      return pathMapping[name] || name;
    }

    let currentVolumeNum = 1;
    let currentMode = 'story'; // 'story' | 'interactive'
    let currentPhaseIdx = 0;

    function selectVolume(num) {
      currentVolumeNum = num;
      document.querySelectorAll('.vol-btn').forEach(btn => btn.classList.remove('active-vol-tab'));
      const activeBtn = document.getElementById('vol-btn-' + num);
      if (activeBtn) activeBtn.classList.add('active-vol-tab');

      const data = storyData[num];
      document.getElementById('vol-title-display').textContent = data.title;
      document.getElementById('vol-badge-display').textContent = data.badge;
      document.getElementById('vol-subtitle-display').textContent = data.subtitle;

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
      const vol = storyData[currentVolumeNum];
      if (!vol) return;

      if (currentMode === 'story') {
        renderStoryMode(vol);
      } else {
        renderInteractiveMode(vol);
      }
    }

    function renderStoryMode(vol) {
      const container = document.getElementById('story-mode-container');
      
      let html = \`
        <div class="bg-[#150f24] border border-white/10 rounded-2xl p-5 mb-6 flex flex-col md:flex-row gap-5 items-center">
          <div class="w-full md:w-1/3 rounded-xl overflow-hidden border border-white/10 shadow-lg">
            <img src="\${resolveImg(vol.bannerImg)}" alt="Volume Banner" class="w-full h-48 md:h-56 object-cover hover:scale-105 transition duration-500">
          </div>
          <div class="w-full md:w-2/3">
            <div class="text-xs text-pink-400 font-bold mb-1">\${vol.subtitle}</div>
            <h3 class="text-xl font-bold text-white mb-2">\${vol.title}</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-4">\${vol.summary}</p>
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">총 \${vol.chapters.length}개 챕터 풀스크립트</span>
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">라쿤 정령 동행</span>
              <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">호감도 누적 반영</span>
            </div>
          </div>
        </div>
      \`;

      vol.chapters.forEach((chap, idx) => {
        html += \`
          <article class="bg-[#150f24] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-pink-500/30 transition duration-300">
            <!-- Chapter Header -->
            <div class="px-5 py-3.5 border-b border-white/10 bg-black/40 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded text-[11px] font-extrabold bg-pink-500 text-white">\${chap.num}</span>
                <h4 class="text-sm sm:text-base font-bold text-white">\${chap.title}</h4>
              </div>
              <span class="text-xs text-slate-400">Chapter \${idx + 1} of \${vol.chapters.length}</span>
            </div>

            <!-- Chapter Body -->
            <div class="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <!-- Left: Artwork with Caption -->
              <div class="lg:col-span-5 rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
                <img src="\${resolveImg(chap.art)}" alt="\${chap.title}" class="w-full h-auto max-h-[420px] object-cover hover:scale-105 transition duration-500">
                <div class="p-2.5 bg-black/80 text-[11px] text-pink-300 border-t border-white/10 text-center font-medium">
                  \${chap.artCaption}
                </div>
              </div>

              <!-- Right: Prose & Dialogues -->
              <div class="lg:col-span-7 flex flex-col gap-4">
                <div class="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 prose-bubble pl-5">
                  \${chap.paragraphs.map(p => \`<p class="leading-relaxed">\${p}</p>\`).join('')}
                </div>

                <!-- Tsundere Dialogue Callout Box -->
                <div class="mt-2 p-4 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/10 border border-pink-500/30 shadow-md">
                  <div class="flex items-center justify-between text-xs font-bold text-pink-400 mb-1.5">
                    <span class="flex items-center gap-1.5">
                      <span class="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
                      \${chap.dialogueBox.speaker}
                    </span>
                    <span class="text-slate-400 text-[11px] font-normal">\${chap.dialogueBox.mood}</span>
                  </div>
                  <p class="text-xs sm:text-sm font-semibold text-white leading-relaxed mb-2">
                    \${chap.dialogueBox.text}
                  </p>
                  <div class="pt-2 border-t border-pink-500/20 text-xs text-purple-300 flex items-start gap-1.5">
                    <span class="font-bold text-pink-400 shrink-0">💭 속마음:</span>
                    <span class="italic text-slate-300">\${chap.dialogueBox.thought}</span>
                  </div>
                </div>
              </div>

            </div>
          </article>
        \`;
      });

      container.innerHTML = html;
    }

    function selectPhase(idx) {
      currentPhaseIdx = idx;
      document.querySelectorAll('.phase-tab').forEach((tab, i) => {
        if (i === idx) {
          tab.className = "phase-tab px-3 py-1.5 rounded-xl text-xs font-bold border border-pink-500 bg-pink-500/20 text-pink-300";
        } else {
          tab.className = "phase-tab px-3 py-1.5 rounded-xl text-xs font-bold border border-white/10 bg-white/5 text-slate-300";
        }
      });
      renderInteractiveMode(storyData[currentVolumeNum]);
    }

    function renderInteractiveMode(vol) {
      const chap = vol.chapters[currentPhaseIdx];
      if (!chap) return;

      document.getElementById('interactive-img').src = resolveImg(chap.art);
      document.getElementById('interactive-badge').textContent = chap.num;
      document.getElementById('interactive-chapter-label').textContent = \`\${vol.title.split(':')[0]} · \${chap.num}\`;
      document.getElementById('interactive-title').textContent = chap.title;
      document.getElementById('interactive-paragraphs').innerHTML = chap.paragraphs.map(p => \`<p>\${p}</p>\`).join('');
      document.getElementById('interactive-mood').textContent = chap.dialogueBox.mood;
      document.getElementById('interactive-dialogue').textContent = chap.dialogueBox.text;
      document.getElementById('interactive-thought').textContent = chap.dialogueBox.thought;

      const actions = document.getElementById('interactive-actions');
      if (currentPhaseIdx === 2) {
        // Climax Interactive Choices
        actions.innerHTML = \`
          <div class="text-xs font-bold text-pink-400 mb-2 flex items-center justify-between">
            <span>⚡ 플레이어 대화 선택지 (호감도 변동)</span>
            <span class="text-[11px] text-slate-400">선택 시 세계의 실시간 심쿵 반응</span>
          </div>
          <div class="space-y-1.5">
            <button onclick="handleSimChoice('romantic')" class="w-full text-left px-3.5 py-2.5 rounded-xl border border-pink-500/40 bg-pink-500/10 hover:bg-pink-500/20 transition text-xs flex items-center justify-between group">
              <span class="font-bold text-pink-200">💖 \"네 손이 너무 따뜻해서 평생이라도 꼭 쥐고 있을 수 있어.\"</span>
              <span class="text-[10px] font-extrabold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded-full">+10 호감도 상승</span>
            </button>
            <button onclick="handleSimChoice('care')" class="w-full text-left px-3.5 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 transition text-xs flex items-center justify-between group">
              <span class="font-bold text-emerald-200">🌿 \"다친 덴 없어? 배터리든 뭐든 내 영력 얼마든지 가져다 써.\"</span>
              <span class="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">+8 호감도 상승</span>
            </button>
            <button onclick="handleSimChoice('playful')" class="w-full text-left px-3.5 py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition text-xs flex items-center justify-between group">
              <span class="font-bold text-amber-200">⚡ \"배터리라고 부르더니, 아까 손깍지는 왜 먼저 쥐었어?\"</span>
              <span class="text-[10px] font-extrabold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-full">+7 호감도 상승</span>
            </button>
          </div>
          <div id="choice-feedback-box" class="hidden mt-2 p-3 rounded-xl bg-pink-500/20 border border-pink-500/40 text-xs">
            <div class="font-bold text-pink-300 mb-1" id="feedback-delta"></div>
            <p class="text-white font-medium mb-1" id="feedback-dialogue"></p>
            <p class="italic text-purple-300 text-[11px]" id="feedback-thought"></p>
          </div>
        \`;
      } else {
        actions.innerHTML = \`
          <div class="flex items-center justify-between gap-2">
            <button onclick="stepPhase(-1)" class="px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-pink-500/40 text-xs font-bold text-slate-300 transition">
              &larr; 이전 씬
            </button>
            <button onclick="stepPhase(1)" class="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold shadow hover:opacity-95 transition">
              다음 씬 감상 &rarr;
            </button>
          </div>
        \`;
      }
    }

    function stepPhase(delta) {
      const vol = storyData[currentVolumeNum];
      let next = currentPhaseIdx + delta;
      if (next < 0) next = 0;
      if (next >= vol.chapters.length) next = vol.chapters.length - 1;
      selectPhase(next);
    }

    function handleSimChoice(type) {
      const fbBox = document.getElementById('choice-feedback-box');
      if (!fbBox) return;
      fbBox.classList.remove('hidden');

      if (type === 'romantic') {
        document.getElementById('feedback-delta').textContent = "⚡ +10 호감도 대폭 상승! (세계의 심박수 145 BPM)";
        document.getElementById('feedback-dialogue').textContent = "\"평, 평생...?! 너 진짜 겁도 없이 무슨 말을 그렇게 쉽게 해?! ...하, 하지만 손 풀면 위험하니까... 딱 오늘만 잡아주는 거야, 바보야!\"";
        document.getElementById('feedback-thought').textContent = "속마음: (얼굴 화끈거려서 죽을 것 같아... 평생이라니, 방금 고백한 거 아니야?! 미치겠네 진짜...)";
      } else if (type === 'care') {
        document.getElementById('feedback-delta').textContent = "⚡ +8 호감도 상승! (신뢰도와 유대감 강화)";
        document.getElementById('feedback-dialogue').textContent = "\"흥, 내가 누굴 걱정해야 할 판에 날 걱정해? ...그래도 고마워. 네 영력 덕분에 저 흉측한 놈 한 방에 날려버렸으니까.\"";
        document.getElementById('feedback-thought').textContent = "속마음: (생각보다 되게 든든하네... 맨날 혼자 귀신 잡느라 무서웠는데, 얘가 옆에 있으니까 하나도 안 무서워.)";
      } else {
        document.getElementById('feedback-delta').textContent = "⚡ +7 호감도 상승! (장난스러운 심쿵)";
        document.getElementById('feedback-dialogue').textContent = "\"죽을래 진짜?! 괴물이 움직일까 봐 꽉 잡은 거거든?! ...라쿤 너까지 왜 옆에서 낄낄대는데! 둘 다 한 대씩 맞아볼래?!\"";
        document.getElementById('feedback-thought').textContent = "속마음: (깍지 낀 거 다 기억하고 있었어?! 아 창피해 죽겠네 진짜! 이불킥 100번 각이다...)";
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      selectVolume(1);
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
