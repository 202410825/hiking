// TODO: 백엔드 API 연동 전까지 사용하는 목업 데이터
// 실제 구현 시 GET /api/spots, GET /api/rewards 등으로 교체

export const SPOTS = [
  {
    id: 'gate',
    name: '정문 (홍제역 방면)',
    category: '학교 내 건물',
    lat: 37.5885,
    lng: 126.9569,
    description: '캠퍼스 정문. 홍제역으로 이어지는 완만한 길이라 진입이 가장 편한 지점이에요.',
    rampFriendly: true,
  },
  {
    id: 'backgate',
    name: '후문 (홍제천)',
    category: '학교 내 건물',
    lat: 37.5901,
    lng: 126.9542,
    description: '후문을 나서면 바로 홍제천 산책로로 연결돼요. 급경사 없이 걷기 좋은 구간.',
    rampFriendly: true,
  },
  {
    id: 'buam',
    name: '부암동 카페거리',
    category: '식당&카페',
    lat: 37.5945,
    lng: 126.9622,
    description: '조용한 골목의 소규모 카페들이 모여있는 동네. 스탬프 인증 시 일부 매장 음료 할인.',
    rampFriendly: false,
  },
  {
    id: 'cheonggye',
    name: '청계천',
    category: '산책로',
    lat: 37.5695,
    lng: 126.9784,
    description: '물길을 따라 걷는 대표 산책 코스. 계절마다 풍경이 달라 재방문 인증이 인기예요.',
    rampFriendly: true,
  },
  {
    id: 'gyeongbok',
    name: '경복궁',
    category: '관광지',
    lat: 37.5796,
    lng: 126.9770,
    description: '대표 고궁 관광지. 도보로 접근 가능해 학생·지역주민 모두에게 인기 스탬프 지점.',
    rampFriendly: true,
  },
  {
    id: 'gwanghwamun',
    name: '광화문',
    category: '관광지',
    lat: 37.5759,
    lng: 126.9769,
    description: '경복궁과 이어지는 광장. 야간에도 조명이 예뻐 저녁 산책 코스로 추천돼요.',
    rampFriendly: true,
  },
]

export const REWARDS = [
  { id: 'coffee', name: '커피 쿠폰', requiredStamps: 8 },
  { id: 'snack', name: '편의점 과자 교환권', requiredStamps: 4 },
  { id: 'baemin', name: '배달의민족 5,000원 쿠폰', requiredStamps: 8 },
  { id: 'discount10', name: '10% 할인 (선결제)', requiredStamps: 6 },
  { id: 'sumungi', name: '수뭉이 NFC 키링 (운세)', requiredStamps: 12 },
  { id: 'bookmark', name: '책갈피', requiredStamps: 2 },
]
