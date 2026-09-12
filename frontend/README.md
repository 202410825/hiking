# Hiking Frontend

React + Vite + Tailwind 기반 프론트엔드 뼈대입니다. 자세한 기술 선택 이유는 [`../docs/TECH_STACK.md`](../docs/TECH_STACK.md) 참고.

## 실행 방법

```bash
cd frontend
npm install
npm run dev
```

## 폴더 구조

```
frontend/
├── src/
│   ├── components/   # 공통 컴포넌트 (하단 네비게이션 등)
│   ├── pages/         # 화면 단위 (Home, MapPage, Scan, Community, MyPage)
│   ├── data/           # 목업 데이터 (백엔드 연동 전 임시)
│   ├── App.jsx         # 라우팅 + 상단바
│   └── main.jsx        # 진입점
├── tailwind.config.js  # 여권/스탬프 컨셉 색상 토큰
└── index.html
```

## 아직 안 된 것 (TODO)

- [ ] 카카오 로그인 실제 연동 (현재는 로그인된 것처럼 하드코딩)
- [ ] 카카오맵 SDK 연동 (`MapPage.jsx`에 위치 표시)
- [ ] QR 스캔 실제 카메라 인식 (`Scan.jsx`, `html5-qrcode` 등 사용 예정)
- [ ] 백엔드 API 연동 (`src/data/mockData.js`의 목업 데이터를 실제 API 호출로 교체)
- [ ] 리뷰 작성 화면
