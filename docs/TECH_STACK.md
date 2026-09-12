# TECH_STACK.md — 기술 스택 & 아키텍처 제안

학생 프로젝트로 빠르게 MVP를 만들고, 필요하면 확장할 수 있는 구성으로 제안한다.

## 1. 전체 아키텍처

```
[모바일 웹/앱 (React + PWA 또는 React Native)]
            │  REST API (HTTPS)
            ▼
[백엔드 (Node.js + Express)] ── [PostgreSQL]
            │
            ├── 카카오 로그인 API
            ├── 카카오맵 API
            ├── 카카오톡 채널/공유 API
            └── 이미지 저장소 (S3 호환 스토리지)
```

## 2. 프론트엔드

- **웹 우선 MVP**: React + Vite, PWA(홈 화면 추가 지원)로 시작 — 앱스토어 심사 없이 빠르게 배포/테스트 가능
- **추후 네이티브 전환 시**: React Native (코드 재사용 목적) 또는 Flutter
- 상태 관리: React Query(서버 상태) + 가벼운 전역 상태(Zustand 또는 Context)
- 지도: 카카오맵 JavaScript SDK
- 스타일: Tailwind CSS (또는 CSS Modules) — 여권/스탬프 컨셉의 커스텀 디자인 시스템 적용
- QR 스캔: `html5-qrcode` 또는 `zxing-js` (브라우저 카메라 접근)

## 3. 백엔드

- **런타임**: Node.js + Express (팀이 JS/TS에 익숙하다는 전제, 팀 상황에 따라 Spring Boot로 대체 가능)
- **언어**: TypeScript 권장 (타입 안정성)
- **인증**: 카카오 OAuth2 로그인 → JWT 세션 발급
- **API 문서화**: Swagger(OpenAPI)
- **부정 적립 방지**: 서버 사이드에서 QR 토큰 유효시간 검증 + 위치 좌표 보조 검증

## 4. 데이터베이스

- **PostgreSQL** (관계형 데이터: 사용자, 지점, 스탬프, 리워드, 리뷰 간 관계가 명확함)
- 주요 테이블(초안):
  - `users` (id, kakao_id, nickname, created_at)
  - `spots` (id, name, category, lat, lng, description, is_school, ramp_friendly)
  - `stamps` (id, user_id, spot_id, season_id, created_at)
  - `seasons` (id, name, start_date, end_date)
  - `rewards` (id, name, required_stamps, stock, description)
  - `user_rewards` (id, user_id, reward_id, status[진행중/사용가능/완료], issued_at, used_at)
  - `reviews` (id, user_id, spot_id, rating, content, photo_urls, created_at)
  - `posts` (id, user_id, spot_id nullable, content, created_at)
  - `likes` (id, user_id, post_id)

## 5. 인프라 / 배포

- **호스팅**: 초기에는 Render, Railway, 또는 Vercel(프론트) + Supabase/Render(백엔드+DB) 조합으로 무료/저비용 시작
- **이미지 스토리지**: Supabase Storage 또는 AWS S3
- **CI/CD**: GitHub Actions (push 시 자동 배포)
- **모니터링**: 초기엔 생략 가능, 필요 시 Sentry(에러 트래킹)

## 6. 외부 연동 API 목록

| 목적 | API |
|---|---|
| 로그인 | 카카오 로그인 (OAuth2) |
| 지도/장소 | 카카오맵 API |
| 알림/공유 | 카카오톡 채널, 카카오톡 공유 API |
| (선택) 결제/쿠폰 | 카카오페이 또는 자체 쿠폰 코드 발급 |

## 7. 선택 이유 요약

- 카카오 계열 API로 통일 → 한국 사용자 대상 서비스에 가장 자연스럽고 문서화가 잘 되어 있음
- React 기반 웹 PWA로 시작 → 학생 프로젝트 특성상 빠른 반복 개발과 배포가 중요하고, 앱스토어 등록 없이 QR/링크 공유만으로 테스트 가능
- PostgreSQL → 스탬프-리워드-리뷰 간 관계형 데이터 구조에 적합

## 8. 대안 및 트레이드오프
- Node.js 대신 Spring Boot: 팀에 Java/Kotlin 경험자가 많다면 더 적합할 수 있음
- PWA 대신 처음부터 React Native: 네이티브 카메라/푸시 경험이 중요하다면 고려, 다만 초기 개발 속도는 느려짐
