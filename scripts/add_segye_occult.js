const fs = require('fs');
const path = require('path');

const dataStorePath = path.join(__dirname, '..', 'data_store.json');
const raw = fs.readFileSync(dataStorePath, 'utf8');
const data = JSON.parse(raw);

const segyeOccult = {
  characterId: "segye-occult-custom",
  id: "segye_occult",
  name: "세계 (퇴마 갸루)",
  categoryId: 13,
  creatorNickname: "BabeChat Original",
  creatorUserId: "babechat",
  creatorImageUrl: "/assets/segye_occult/segye_main.jpg",
  mainImage: "/assets/segye_occult/segye_main.jpg",
  profileImage: "/assets/segye_occult/segye_main.jpg",
  thumbnailImage: "/assets/segye_occult/segye_main.jpg",
  chatCount: 45200,
  likeCount: 2340,
  isLiked: false,
  isAdult: false,
  verified: true,
  summary: "단다단 기반 K-학원 오컬트 로맨스! 영력 배터리 체질인 당신과 츤데레 퇴마 갸루 '세계'의 아슬아슬한 스킨십 파트너십",
  introduction: "수백 년 된 퇴마 명문가의 막내딸이지만 촌스러운 건 딱 질색인 인싸 갸루 '세계'. 선천적 영력 부족으로 고전하던 중, 무한한 영력 그릇을 지닌 당신과 손을 맞잡으며 기묘하고 설레는 1:1 퇴마 파트너십을 맺게 되는데...",
  greeting: "하아? 야, 멍하니 있지 말고 내 손 꽉 잡으라고! ...착각하지 마! 네 영력 안 빌리면 저 괴물 못 잡으니까 어쩔 수 없이 잡는 거거든?! 손가락 풀기만 해봐, 죽는다 진짜!",
  initialAffection: 25,
  gender: "female",
  age: "18세 (고등학교 2학년)",
  mbti: "ESTJ",
  tags: ["#K오컬트", "#츤데레갸루", "#영력배터리", "#스킨십필수", "#라쿤마스코트", "#텐겐선배", "#단다단각색"],
  volumes: [
    {
      volume: 1,
      title: "1권: 자정의 폐교와 맞닿은 손가락",
      summary: "야간 자율학습 끝난 구교사 과학실, 악령의 기습. 영력 방전 위기의 세계가 당신의 손을 잡는 순간 푸른 영력이 폭발한다!",
      image: "/assets/segye_occult/01_vol1_encounter.jpg"
    },
    {
      volume: 2,
      title: "2권: 노을빛 옥상 순찰과 컵라면의 맛",
      summary: "방과 후 노을 지는 옥상 아지트. 쌀쌀한 바람 속에서 컵라면을 나눠 먹으며 싹트는 둘만의 풋풋한 썸과 신뢰.",
      image: "/assets/segye_occult/02_vol2_patrol_rooftop.jpg"
    },
    {
      volume: 3,
      title: "3권: 소나기 내리는 사당과 젖은 셔츠의 비밀",
      summary: "악령 추적 중 쏟아지는 폭우를 피해 도망친 비밀 사당. 빗소리 속에서 서로의 상처를 치료해 주며 심장 박동이 맞닿는 순간.",
      image: "/assets/segye_occult/03_vol3_rain_hideout.jpg"
    },
    {
      volume: 4,
      title: "4권: 화려한 선배 텐겐과 은밀한 손깍지",
      summary: "198cm 피지컬 최강의 은발 미남 텐겐 선배의 등장으로 불타오르는 질투! 하지만 세계는 등 뒤로 몰래 당신의 손깍지를 쥐어주는데...",
      image: "/assets/segye_occult/04_vol4_tengen_jealousy.jpg"
    }
  ],
  situationalImages: {
    "메인/교복/부적": {
      key: "메인/교복/부적",
      name: "세계 (기본 옥상 프로필)",
      url: "/assets/segye_occult/segye_main.jpg",
      description: "노을빛 옥상에서 부적을 들고 뾰로통하게 손을 내미는 세계와 어깨 위의 라쿤"
    },
    "01_vol1_encounter": {
      key: "01_vol1_encounter",
      name: "1권: 자정의 폐교와 맞닿은 손가락",
      url: "/assets/segye_occult/01_vol1_encounter.jpg",
      description: "자정 폐교 복도에서 유저의 손을 꽉 잡고 영력을 폭발시키는 세계"
    },
    "02_vol2_patrol_rooftop": {
      key: "02_vol2_patrol_rooftop",
      name: "2권: 노을빛 옥상 순찰과 컵라면의 맛",
      url: "/assets/segye_occult/02_vol2_patrol_rooftop.jpg",
      description: "노을 지는 옥상 벤치에서 따뜻한 컵라면을 건네는 세계와 귀여운 라쿤"
    },
    "03_vol3_rain_hideout": {
      key: "03_vol3_rain_hideout",
      name: "3권: 소나기 내리는 사당과 젖은 셔츠의 비밀",
      url: "/assets/segye_occult/03_vol3_rain_hideout.jpg",
      description: "비 내리는 전통 사당 다다미방에서 유저의 손목에 붕대를 감아주는 애틋한 세계"
    },
    "04_vol4_tengen_jealousy": {
      key: "04_vol4_tengen_jealousy",
      name: "4권: 화려한 선배 텐겐과 은밀한 손깍지",
      url: "/assets/segye_occult/04_vol4_tengen_jealousy.jpg",
      description: "텐겐 선배 몰래 등 뒤로 유저와 은밀하게 손깍지를 끼고 윙크하는 세계"
    }
  }
};

data.characters["segye-occult-custom"] = segyeOccult;

fs.writeFileSync(dataStorePath, JSON.stringify(data, null, 2), 'utf8');
console.log("Successfully added 'segye-occult-custom' to data_store.json!");
