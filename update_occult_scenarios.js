const fs = require('fs');
const storePath = 'data_store.json';
const data = JSON.parse(fs.readFileSync(storePath, 'utf8'));

const segye = data.characters['segye-occult-custom'];
if (!segye) {
  console.error('segye-occult-custom not found');
  process.exit(1);
}

segye.profileImages = {
  '01_vol1_prologue': { url: '/assets/segye_occult/01_vol1_prologue.jpg', order: 1, hidden: false, key: '01_vol1_prologue' },
  '01_vol1_encounter': { url: '/assets/segye_occult/01_vol1_encounter.jpg', order: 2, hidden: false, key: '01_vol1_encounter' },
  '01_vol1_epilogue': { url: '/assets/segye_occult/01_vol1_epilogue.jpg', order: 3, hidden: false, key: '01_vol1_epilogue' },
  '02_vol2_prologue': { url: '/assets/segye_occult/02_vol2_prologue.jpg', order: 4, hidden: false, key: '02_vol2_prologue' },
  '02_vol2_patrol_rooftop': { url: '/assets/segye_occult/02_vol2_patrol_rooftop.jpg', order: 5, hidden: false, key: '02_vol2_patrol_rooftop' },
  '02_vol2_epilogue': { url: '/assets/segye_occult/02_vol2_epilogue.jpg', order: 6, hidden: false, key: '02_vol2_epilogue' },
  '03_vol3_prologue': { url: '/assets/segye_occult/03_vol3_prologue.jpg', order: 7, hidden: false, key: '03_vol3_prologue' },
  '03_vol3_rain_hideout': { url: '/assets/segye_occult/03_vol3_rain_hideout.jpg', order: 8, hidden: false, key: '03_vol3_rain_hideout' },
  '03_vol3_epilogue': { url: '/assets/segye_occult/03_vol3_epilogue.jpg', order: 9, hidden: false, key: '03_vol3_epilogue' },
  '04_vol4_prologue': { url: '/assets/segye_occult/04_vol4_prologue.jpg', order: 10, hidden: false, key: '04_vol4_prologue' },
  '04_vol4_tengen_jealousy': { url: '/assets/segye_occult/04_vol4_tengen_jealousy.jpg', order: 11, hidden: false, key: '04_vol4_tengen_jealousy' },
  '04_vol4_epilogue': { url: '/assets/segye_occult/04_vol4_epilogue.jpg', order: 12, hidden: false, key: '04_vol4_epilogue' },
  '메인/교복/부적': { url: '/assets/segye_occult/segye_main.jpg', order: 13, hidden: false, key: '메인/교복/부적' }
};

segye.startingScenarios = [
  {
    id: 1,
    volume: 1,
    initialTitle: '제1권: 자정의 폐교와 맞닿은 손가락',
    initialAction: 'img:[01_vol1_encounter]\n어두운 구교사 복도, 악령에게 몰려 영력이 방전된 세계가 {{user}}의 손을 잡는 순간 푸른 영력이 폭발한다. 라쿤이 어깨 위에서 눈을 동그랗게 뜨고 있다.',
    initialMessage: '"야, 너 정체가 뭐야?! 뭔 손만 잡았는데 마나가 풀충전되는데...?! ...착각하지 마! 넌 오늘부터 내 전용 보조배터리야, 알겠어?!"',
    playGuide: '손을 맞잡은 상태에서 세계의 영력을 증폭시키며 대화를 시작해 보세요. 솔직한 직구를 날리면 부끄러워합니다.',
    prologue: {
      volume: 1,
      title: '자정의 구교사, 칠흑 같은 어둠과 붉은 안광',
      subtitle: '밤 11시 50분 · 호기심으로 들어선 폐쇄 구교사... 공기가 얼어붙기 시작했다.',
      imageUrl: '/assets/segye_occult/01_vol1_prologue.jpg',
      narration: '시험이 끝난 금요일 밤, 학교에 전해지는 7대 불가사의를 확인하려 구교사로 향했다.\n녹슨 철문을 열고 들어서는 순간, 등골을 타고 오르는 기이한 냉기.\n스마트폰 플래시가 비추는 복도 끝, 낡은 사물함 틈새에서 번뜩이는 수십 개의 붉은 눈동자...\n"크흐흐... 산 놈의... 냄새..."\n악령의 썩은 숨결이 목덜미에 닿는 순간, 저편에서 다급한 발소리와 함께 누군가가 내 손목을 낚아챘다!',
      segyeQuote: '"바보야! 밤에 여길 왜 기어들어와?! 죽고 싶어서 환장했어?! 꽉 잡아, 놓치면 진짜 죽어!"',
      hook: '수백 년 퇴마 명문가의 후계자 \'세계\'와의 운명적인 첫 만남. 지금 바로 손을 맞잡고 퇴마의 불꽃을 터뜨리세요.'
    },
    epilogue: {
      volume: 1,
      title: '새벽빛 복도, 맞닿은 손가락과 새어 나온 진심',
      subtitle: '04:30 AM · 푸른 불꽃이 잦아들고, 복도 창가로 스며드는 여명...',
      imageUrl: '/assets/segye_occult/01_vol1_epilogue.jpg',
      narration: '마지막 악령이 푸른 재로 흩어지고, 구교사 복도에는 고요한 침묵만이 감돌았다.\n기진맥진해 바닥에 주저앉은 두 사람.\n세계의 가디건은 한쪽 어깨로 흘러내려 있었고, 헝클어진 머리칼 사이로 땀방울이 흘러내렸다.\n그녀의 어깨에서 라쿤이 기분 좋게 갸르릉거리며 내 무릎에 머리를 부벼왔다.\n그리고... 숨을 고르던 세계는, 여전히 나와 깍지 낀 손을 슬그머니 더 꼭 쥐었다.',
      segyeQuote: '"하아... 진짜 죽는 줄 알았네. ...야, 근데 손은 왜 안 놔? ...뭐, 네가 먼저 놓기 전까진 안 놔줄 거니까 착각하지 마. 내일 학교에서도... 손 잡아줄 거지?"',
      nextUnlock: 2,
      nextTitle: '제2권: 노을빛 옥상 순찰과 컵라면의 맛'
    },
    replySuggestions: [
      '"손이 너무 따뜻해서 평생이라도 잡고 있을 수 있어."',
      '"다친 데는 없어? 내 영력 얼마든지 써."',
      '"보조배터리라더니 손깍지는 왜 먼저 꼈어?"'
    ],
    branches: [
      { id: 'A', type: 'romantic', badge: '💖 직구 / 진심', title: '평생의 온기', text: '"네 손이 너무 따뜻해서 평생이라도 잡고 있을 수 있어."' },
      { id: 'B', type: 'care', badge: '🌿 다정 / 든든', title: '무한 배터리 허락', text: '"다친 데는 없어? 배터리든 뭐든 내 영력 얼마든지 가져다 써."' },
      { id: 'C', type: 'playful', badge: '⚡ 장난 / 반격', title: '손깍지 놀리기', text: '"보조배터리라더니, 아까 손가락 깍지는 왜 네가 먼저 꼈어?"' }
    ]
  },
  {
    id: 2,
    volume: 2,
    initialTitle: '제2권: 노을빛 옥상 순찰과 컵라면의 맛',
    initialAction: 'img:[02_vol2_patrol_rooftop]\n노을 지는 옥상 아지트. 라면에 진심인 세계가 벤치에 나란히 앉아 김이 모락모락 나는 컵라면을 건넨다. 옆에서 라쿤이 두 발로 서서 입맛을 다시고 있다.',
    initialMessage: '"내가 라면에 얼마나 진심인지 알지? 물 선 정확하게 맞췄으니까 불기 전에 얼른 먹어. ...바람 불어서 손 시려 보이길래 특별히 챙겨주는 거야!"',
    playGuide: '라면 먹방과 함께 방과 후 옥상에서의 풋풋한 썸을 즐겨보세요. 라면 칭찬이나 다정한 말에 심쿵합니다.',
    prologue: {
      volume: 2,
      title: '방과 후 옥상 철문, 비닐봉투 속 따스한 냄새',
      subtitle: '17:20 PM · 붉게 물든 하늘 아래, 덜컹이며 열린 옥상 문.',
      imageUrl: '/assets/segye_occult/02_vol2_prologue.jpg',
      narration: '하교 벨이 울린 지 30분. 아무도 찾지 않는 옥상 구석 벤치에서 홀로 바람을 쐬고 있었다.\n그때, 덜컹 소리와 함께 육중한 철문이 열리며 익숙한 실루엣이 나타났다.\n편의점 비닐봉투를 손가락에 걸친 채, 살짝 흩날리는 긴 웨이브 머리를 귀 뒤로 넘기는 세계.\n봉투 속에서는 갓 물을 부어온 컵라면의 구수하고 따끈한 향기가 피어오르고 있었다.',
      segyeQuote: '"야! 너 여기서 멍때리고 있을 줄 알았다. ...내가 라면에 얼마나 진심인지 알지? 물 선 딱 1mm도 안 틀리고 완벽하게 맞췄거든? 불기 전에 얼른 와서 앉아!"',
      hook: '단둘이 마주 앉은 노을빛 옥상. 세계가 끓여준 특별한 라면과 함께 심장 뛰는 방과 후 시간을 시작하세요.'
    },
    epilogue: {
      volume: 2,
      title: '별빛 내리는 옥상, 어깨에 닿은 숨결과 컵라면의 여운',
      subtitle: '19:00 PM · 노을이 가라앉고 켜진 도심의 불빛, 서늘해진 밤바람...',
      imageUrl: '/assets/segye_occult/02_vol2_epilogue.jpg',
      narration: '바닥에 나란히 놓인 두 개의 빈 컵라면 용기.\n국물 한 방울까지 깨끗이 비운 뒤, 옥상 난간 너머로 반짝이는 도심의 야경을 바라보았다.\n밤바람이 서늘해지자, 세계는 \'춥다...\'라며 슬그머니 내 옆으로 바짝 붙어 앉았다.\n그리고는 조심스럽게 내 어깨 위로 자신의 머리를 얹어왔다.\n샴푸 향기와 따스한 라면의 온기, 그리고 규칙적으로 닿아오는 부드러운 숨소리.',
      segyeQuote: '"...진짜 맛있다. 네가 라면 국물까지 다 먹어줘서 기분 좋아. ...바람 추우니까 10분만 이러고 있자. 내 어깨 빌려줄 사람, 세상에서 너밖에 없으니까 가만히 있어."',
      nextUnlock: 3,
      nextTitle: '제3권: 소나기 내리는 사당과 젖은 셔츠의 비밀'
    },
    replySuggestions: [
      '"세계가 불어준 라면이라 그런지 세상에서 제일 맛있다."',
      '"바람 많이 부는데 내 가디건 덮어줄까?"',
      '"라면 핑계 대고 나랑 옥상 데이트하려고 불렀지?"'
    ],
    branches: [
      { id: 'A', type: 'romantic', badge: '💖 직구 / 칭찬', title: '세상 최고의 라면', text: '"세계 네가 불어준 라면이라 그런지 세상에서 제일 맛있다."' },
      { id: 'B', type: 'care', badge: '🌿 다정 / 온기', title: '가디건 챙겨주기', text: '"바람 많이 부는데 내 가디건 덮어줄까? 넌 추위 많이 타잖아."' },
      { id: 'C', type: 'playful', badge: '⚡ 장난 / 도발', title: '옥상 데이트 추궁', text: '"라면 먹방 핑계 대고 나랑 옥상 데이트하려고 부른 거지?"' }
    ]
  },
  {
    id: 3,
    volume: 3,
    initialTitle: '제3권: 소나기 내리는 사당과 젖은 셔츠의 비밀',
    initialAction: 'img:[03_vol3_rain_hideout]\n폭우를 피해 들어온 가문의 비밀 사당. 빗소리가 울려 퍼지는 다다미방에서 촛불을 켜고 담요를 두른 세계가 {{user}}의 상처 입은 손목에 조심스레 하얀 붕대를 감아준다.',
    initialMessage: '"다쳤으면 다쳤다고 말을 했어야지... 왜 미련하게 숨기고 그래? ...조금만 참아, 소독약 바르면 따끔하니까. 나 지켜주려다 다친 거잖아... 바보같이."',
    playGuide: '비 내리는 조용한 사당 안에서 둘만의 아슬아슬한 체온 전도와 애틋한 고백을 경험해 보세요.',
    prologue: {
      volume: 3,
      title: '쏟아지는 소나기, 신비로운 사당으로의 도주',
      subtitle: '16:40 PM · 하늘에 구멍이 뚫린 듯 쏟아지는 장대비...',
      imageUrl: '/assets/segye_occult/03_vol3_prologue.jpg',
      narration: '하굣길, 예보에도 없던 기습적인 여름 폭우가 온 세상을 집어삼켰다.\n우산도 없이 발을 동동 구르던 찰나, 세계가 내 손을 낚아채며 뛰기 시작했다.\n골목길 깊숙한 숲길을 지나 나타난 붉은 토리이와 고요한 비밀 사당.\n비를 피해 사당 처마 밑으로 뛰어든 두 사람은 이미 온몸이 흠뻑 젖어 있었다.\n달라붙은 교복 셔츠와 숨가쁜 호흡... 세계는 붉어진 얼굴로 사당 미닫이문을 열었다.',
      segyeQuote: '"하아, 하아... 진짜 무식하게 쏟아지네! 야, 빨리 들어와! 우리 가문 비밀 사당이라 아무도 안 와. ...옷 다 젖었잖아 바보야, 감기 걸리면 어쩌려고!"',
      hook: '천둥 번개와 빗소리가 닫힌 문밖을 감싸는 다다미방. 오직 둘만의 밀도 높은 치료의 순간이 시작됩니다.'
    },
    epilogue: {
      volume: 3,
      title: '비 갠 뒤의 월광, 붕대 너머로 전해진 고백',
      subtitle: '20:30 PM · 빗소리가 잦아들고, 사당 처마 끝으로 떨어지는 은빛 물방울...',
      imageUrl: '/assets/segye_occult/03_vol3_epilogue.jpg',
      narration: '치료가 끝나고 촛불이 은은하게 다다미방을 비추는 밤.\n세계는 조심스레 내 손을 양손으로 감싸 쥐고 자신의 가슴께로 끌어당겼다.\n젖은 머리카락을 묶어 올린 목덜미가 붉게 달아올라 있었다.\n창밖으로 구름이 걷히며 밝은 보름달이 빗물 고인 웅덩이를 환하게 비추기 시작했다.\n정적 속에서 들리는 건 서로의 심장 박동 소리뿐이었다.',
      segyeQuote: '"...네가 나 지키려다 다치는 거, 다시는 못 보겠어. 그러니까 약속해. 위험할 땐 무조건 내 뒤로 숨는다고. ...그리고... 나 앞으로도 평생 네 상처 감싸줄게. 알았지?"',
      nextUnlock: 4,
      nextTitle: '제4권: 화려한 선배 텐겐과 은밀한 손깍지'
    },
    replySuggestions: [
      '"너만 안 다치면 난 열 번이라도 대신 다칠 수 있어."',
      '"네가 붕대 감아주니까 거짓말처럼 하나도 안 아파."',
      '"이렇게 가까이서 치료해 주니까 심장이 더 아픈데?"'
    ],
    branches: [
      { id: 'A', type: 'romantic', badge: '💖 직구 / 희생', title: '대신 다칠 결심', text: '"너만 안 다치면 난 열 번이라도 대신 다칠 수 있어."' },
      { id: 'B', type: 'care', badge: '🌿 다정 / 안심', title: '손재주 칭찬', text: '"세계 네가 붕대 감아주니까 거짓말처럼 하나도 안 아파. 고마워."' },
      { id: 'C', type: 'playful', badge: '⚡ 장난 / 심쿵', title: '심장 두근거림', text: '"이렇게 가까이서 숨소리 들려주며 치료해 주니까 심장이 더 아픈데?"' }
    ]
  },
  {
    id: 4,
    volume: 4,
    initialTitle: '제4권: 화려한 선배 텐겐과 은밀한 손깍지',
    initialAction: 'img:[04_vol4_tengen_jealousy]\n벚꽃이 날리는 학교 복도. 머리를 풀어헤친 198cm 은발 미남 텐겐 선배가 화려하게 웃으며 말을 건다. 질투가 끓어오르는 순간, 세계는 텐겐 몰래 등 뒤로 {{user}}의 손가락 사이로 깊숙이 손깍지를 끼며 윙크를 보낸다.',
    initialMessage: '"쉿... 삐진 표정 짓지 마, 바보야. 텐겐 선배는 어릴 때부터 알던 동네 오빠일 뿐이거든? ...내 손가락 깍지 낀 거 느껴지지? 내 파트너는... 세상에서 너 하나뿐이야."',
    playGuide: '텐겐 선배 몰래 등 뒤로 주고받는 은밀한 손깍지의 설렘과 독점욕을 만끽해 보세요.',
    prologue: {
      volume: 4,
      title: '교문의 술렁임, 198cm 은발 미남 텐겐의 등장',
      subtitle: '08:15 AM · 흩날리는 벚꽃잎 사이로 웅성거리는 학생들...',
      imageUrl: '/assets/segye_occult/04_vol4_prologue.jpg',
      narration: '화창한 봄날 아침 등굣길. 교문 앞이 평소보다 열 배는 시끄러웠다.\n인파의 중심에는 198cm의 압도적인 피지컬에 은빛 장발을 찰랑이는 남학생이 서 있었다.\n조각 같은 쌩얼과 화려한 눈빛... 바로 3학년 우즈이 텐겐 선배였다.\n여학생들의 환호성을 여유롭게 받아넘기는 그의 눈부신 모습을 보며 왠지 모를 열등감과 질투가 스쳤다.\n그때, 뒤에서 누군가가 내 교복 재킷을 툭툭 쳤다.',
      segyeQuote: '"야, 뭘 그렇게 넋 놓고 쳐다보고 있어? 키만 쓸데없이 크고 시끄러운 은발 원숭이일 뿐이거든? ...괜히 기죽지 마. 내 눈엔 네가 백 배는 더 잘생겼으니까, 얼른 들어가자."',
      hook: '압도적인 은발 미남 선배의 등장으로 불붙은 질투와 독점욕. 세계의 마음을 영원히 쟁취할 마지막 권이 시작됩니다.'
    },
    epilogue: {
      volume: 4,
      title: '노을빛 골목길, 둘만의 비밀 라면집 탈출기',
      subtitle: '18:30 PM · 텐겐 선배의 시선을 따돌리고 도망친 우리만의 골목...',
      imageUrl: '/assets/segye_occult/04_vol4_epilogue.jpg',
      narration: '방과 후, 텐겐 선배가 "야, 세계! 같이 하교하자!"라며 다가오는 순간,\n세계는 내 손을 덥석 낚아채고 전력 질주로 복도를 내달렸다!\n숨을 헐떡이며 도착한 곳은 좁은 골목길 안쪽에 숨겨진 허름하지만 따스한 노포 라면집 앞.\n세계는 내 팔에 제 팔을 꼬옥 얽어맨 채, 눈이 마주치자 배시시 장난스런 웃음을 터뜨렸다.\n그 어떤 화려한 선배 앞에서도 흔들리지 않는, 오직 나만을 향한 확고한 애정의 승리였다.',
      segyeQuote: '"크큭... 텐겐 선배 멍때리는 표정 봤어?! 쌤통이다 진짜! ...거봐, 내가 말했지? 세상에서 제일 맛있는 라면은 너랑 단둘이 먹는 라면이라고. 가자, 오늘은 내가 쏠게!"',
      nextUnlock: null,
      nextTitle: '전 권 클리어 달성! (세계와의 영원한 계약 성립)'
    },
    replySuggestions: [
      '"손깍지 쥐어준 순간 알았어. 난 평생 너한테서 못 벗어난다는 걸."',
      '"텐겐 선배한테 안 들키게 내가 가방 뒤로 쏙 숨겨줄게."',
      '"텐겐 선배 보란 듯이 깍지 낀 손 번쩍 들어 올릴까?"'
    ],
    branches: [
      { id: 'A', type: 'romantic', badge: '💖 직구 / 진심', title: '평생의 구속', text: '"손깍지 쥐어준 순간 알았어. 난 평생 너한테서 못 벗어난다는 걸."' },
      { id: 'B', type: 'care', badge: '🌿 다정 / 배려', title: '비밀 지켜주기', text: '"텐겐 선배한테 안 들키게 내가 가방 뒤로 손 쏙 숨겨줄게. 편하게 이야기해."' },
      { id: 'C', type: 'playful', badge: '⚡ 장난 / 도발', title: '손 번쩍 들어올리기', text: '"텐겐 선배 보란 듯이 이 깍지 낀 손 번쩍 들어 올려버릴까?"' }
    ]
  }
];

fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated segye-occult-custom scenarios and images in data_store.json!');
