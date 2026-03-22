# 뽀짝 투두 (Ppojjak Todo)

귀엽고 가볍게, 오늘 할 일을 관리하는 미니멀 투두 앱.
React 19 + TypeScript + Vite로 만들어진 순수 정적 웹앱입니다.
데이터는 브라우저 localStorage에 저장되어 서버 없이 바로 실행됩니다.

---

## 기술 스택

| 항목 | 버전/내용 |
|------|-----------|
| React | 19.x |
| TypeScript | 5.x |
| Vite | 6.x |
| 스타일 | CSS (globals.css) |
| 데이터 저장 | localStorage |
| 배포 | Docker + nginx |

---

## 주요 기능

- 할 일 추가 / 완료 체크 / 삭제
- 완료 시 스티커 파티클 애니메이션 🎉
- 이모지 카테고리 태그 (공부📚 업무💼 일상🌸 건강🥗 기타✨)
- 오늘의 달성률 위젯 (🐰 캐릭터 표정/멘트 변화)
- 완료 목록 슬라이드업 모달
- localStorage 영구 저장 (새로고침해도 유지)
- 서버 불필요 — 완전한 오프라인 동작

---

## 설치 및 실행

### 사전 요구사항
- Node.js 20 이상
- npm 10 이상

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

---

## 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

빌드 결과 미리보기:
```bash
npm run preview
```

---

## Docker로 실행하기

```bash
# 빌드 및 실행
docker compose up --build

# 백그라운드 실행
docker compose up --build -d

# 중지
docker compose down
```

브라우저에서 http://localhost:3000 접속

---

## 프로젝트 구조

```
ppojjak-todo/
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types/index.ts
│   ├── lib/
│   │   ├── storage.ts
│   │   ├── utils.ts
│   │   └── validation.ts
│   ├── styles/globals.css
│   └── components/
│       ├── Header.tsx
│       ├── AchievementWidget.tsx
│       ├── CategoryFilter.tsx
│       ├── TodoInput.tsx
│       ├── TodoList.tsx
│       ├── TodoItem.tsx
│       ├── CompletedModal.tsx
│       └── ParticleEffect.tsx
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 라이선스

MIT
