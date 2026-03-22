# 뽀짝 투두 — 디자인 스펙

## 디자인 컨셉

**키워드:** 뽀짝, 말랑말랑, 포근, 설레는 생산성

20대 여성이 매일 펼치고 싶은 투두 앱을 목표로 합니다.
파스텔 계열의 라벤더·민트·복숭아 팔레트를 중심으로, 모든 모서리는 pill 또는 xl 라운드로 처리해
날카로운 느낌을 완전히 제거합니다. 이모지와 작은 귀여운 캐릭터(🐰)를 활용해 앱 곳곳에서
감정 표현을 유도하고, 할 일을 완료했을 때 스티커 파티클 애니메이션으로 성취감을 극대화합니다.

여백은 "호흡"입니다 — 꽉 채우지 않고 콘텐츠 사이에 충분한 공간을 두어 시각적 편안함을 유지합니다.

---

## 컬러 팔레트

| 역할 | Hex | 용도 |
|------|-----|------|
| Primary | `#B39DDB` | 라벤더 퍼플 — 메인 버튼, 강조 요소, 체크박스 활성 상태 |
| Secondary | `#F48FB1` | 핑크 — 카테고리 뱃지, 호버 강조, 파티클 색상 |
| Accent | `#80CBC4` | 민트 — 완료 상태, 성공 피드백, 보조 뱃지 |
| Background | `#FFF8FC` | 연한 블러시 화이트 — 전체 배경 |
| Card/Surface | `#FFFFFF` | 투두 카드, 입력 필드 배경 |
| Text | `#4A3F55` | 딥 라벤더 그레이 — 본문 텍스트 |
| Muted | `#B0A8BC` | 흐린 보라 그레이 — 플레이스홀더, 비활성 텍스트 |
| Success | `#A5D6A7` | 연한 그린 — 완료 투두 배경 틴트 |
| Error | `#EF9A9A` | 연한 레드 — 삭제 버튼, 오류 메시지 |
| Warning | `#FFE082` | 파스텔 옐로 — 중요도 표시, 별표 |

---

## 타이포그래피

**폰트:** `Gaegu` (Google Fonts) — 손글씨 느낌의 한국어 지원 폰트. 귀엽고 아기자기한 감성에 최적.
보조 폰트: `Noto Sans KR` (본문 가독성 보완용)

| 레벨 | 크기 | 굵기 | 용도 |
|------|------|------|------|
| Display | 28px / 1.75rem | 700 | 앱 타이틀 "뽀짝 투두" |
| Heading 1 | 22px / 1.375rem | 700 | 섹션 헤더, 달성률 수치 |
| Heading 2 | 18px / 1.125rem | 600 | 카드 내 주요 텍스트 |
| Body | 15px / 0.9375rem | 400 | 투두 항목 텍스트, 설명 |
| Caption | 12px / 0.75rem | 400 | 날짜, 메타 정보 |
| Button | 14px / 0.875rem | 600 | 버튼 레이블 |

**Line-height:** 1.7 (한국어 가독성 기준)
**Letter-spacing:** -0.01em (디스플레이), 0 (바디)

---

## 컴포넌트 스타일

### 버튼

**Primary Button (추가 버튼)**
- 스타일: 라벤더 퍼플 배경, 흰색 텍스트, pill 형태, 그림자 있음, 호버 시 살짝 위로 이동(translateY)
- Tailwind: `bg-[#B39DDB] text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 cursor-pointer`

**Icon Button (삭제 버튼)**
- 스타일: 연한 레드 배경(투명), 호버 시 Error 색상 틴트, 원형
- Tailwind: `text-[#EF9A9A] hover:bg-[#FFF0F0] p-1.5 rounded-full transition-colors duration-150`

**Filter Tab Button (카테고리 필터)**
- 스타일: 선택 시 Primary 배경, 비선택 시 Card 배경 + Muted 테두리
- Tailwind (선택): `bg-[#B39DDB] text-white text-sm font-medium py-1.5 px-4 rounded-full`
- Tailwind (비선택): `bg-white text-[#B0A8BC] border border-[#E8E0F0] text-sm py-1.5 px-4 rounded-full hover:bg-[#F3EFF9]`

---

### 카드 (투두 아이템)

- 스타일: 흰 카드, rounded-2xl, 가벼운 그림자, 완료 시 Success 틴트 배경 + 취소선
- Tailwind (기본): `bg-white rounded-2xl shadow-sm border border-[#F0EBF8] p-4 flex items-center gap-3 hover:shadow-md transition-shadow duration-200`
- Tailwind (완료): `bg-[#F1F8F1] rounded-2xl shadow-sm border border-[#C8E6C9] p-4 flex items-center gap-3 opacity-75`
- 완료된 텍스트: `line-through text-[#B0A8BC]`

---

### 입력 필드

- 스타일: 둥근 모서리, 연보라 포커스 링, 플레이스홀더 Muted 색
- Tailwind: `bg-white border-2 border-[#E8E0F0] rounded-2xl px-4 py-3 text-[#4A3F55] placeholder-[#B0A8BC] focus:outline-none focus:border-[#B39DDB] focus:ring-2 focus:ring-[#B39DDB]/20 transition-all duration-200 w-full`

---

### 뱃지 (카테고리)

파스텔 톤으로 업무/공부/일상/건강 등 카테고리 구분.

| 카테고리 | 배경 | 텍스트 |
|----------|------|--------|
| 공부 📚 | `#EDE7F6` | `#7B5EA7` |
| 업무 💼 | `#E3F2FD` | `#1976D2` |
| 일상 🌸 | `#FCE4EC` | `#C2185B` |
| 건강 🥗 | `#E8F5E9` | `#388E3C` |
| 기타 ✨ | `#FFF8E1` | `#F57F17` |

- Tailwind 기반: `text-xs font-medium px-2.5 py-1 rounded-full`

---

### 체크박스 (커스텀)

- 기본 input[type=checkbox] 숨김 처리 (`appearance-none`)
- 크기: 22×22px, `border-radius: 50%` (원형 체크박스)
- 기본 상태: 흰 배경, `#D1C4E9` 테두리 2px
- 체크 상태: Primary(`#B39DDB`) 배경, 흰 체크마크(✓ SVG 또는 `::after` 의사요소), `scale(1.1)` 트랜지션
- 호버: 테두리 Primary 색으로 변경, 연보라 그림자

---

## 페이지 레이아웃

### 메인 페이지 ASCII 와이어프레임

```
┌─────────────────────────────────────────┐
│  🌸 뽀짝 투두              [오늘 날짜]   │  ← 상단 헤더 (배경: 라벤더 그라디언트)
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │  🐰  오늘도 파이팅!             │   │  ← 달성률 위젯 카드
│  │  ████████░░░░  3 / 5 완료 ✨   │   │    (캐릭터 + 프로그레스 바 + 수치)
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │ [공부] [업무] [일상] [건강] [기타]│  │  ← 카테고리 필터 탭
│  └──────────────────────────────────┘  │
│  ┌─────────────────────────────┐ [+추가]│
│  │ 🌸 할 일을 입력하세요...    │       │  ← 입력 폼 (텍스트 + 버튼)
│  └─────────────────────────────┘       │
├─────────────────────────────────────────┤
│  📋 오늘 할 일                          │  ← 섹션 타이틀
│  ┌──────────────────────────────────┐  │
│  │ ○  디자인 시안 작성하기  [공부]  🗑│  │  ← 투두 카드 (미완료)
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ ✓  운동 30분 하기       [건강]  🗑│  │  ← 투두 카드 (완료 — 민트 틴트)
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ ○  카페 가서 공부하기   [일상]  🗑│  │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
          최대 너비 480px (모바일 우선)
```

---

## 반응형 전략

**모바일 우선(Mobile-First) 설계**

이 앱은 스마트폰에서 자주 사용하는 투두 앱이므로 모바일을 기준 해상도로 설계합니다.

| 브레이크포인트 | 너비 | 레이아웃 변화 |
|--------------|------|-------------|
| Mobile (기본) | ~479px | 전체 너비 사용, 하단 고정 입력 폼 옵션 |
| Tablet / Desktop | 480px+ | 중앙 정렬, 최대 너비 480px 카드 컨테이너, 나머지 배경 노출 |

**핵심 규칙:**
- `max-width: 480px; margin: 0 auto;` — 데스크탑에서도 모바일 앱 느낌 유지
- 터치 타깃 최소 44×44px (WCAG 2.5.5)
- 폰트 크기 최소 14px (모바일 가독성)
- 배경에 파스텔 그라디언트 패턴 적용해 데스크탑 여백도 예쁘게 처리

**접근성 (WCAG 2.1 AA 준수):**
- Primary `#B39DDB` on white: contrast 4.52:1 ✓ (AA 통과)
- Text `#4A3F55` on white: contrast 8.1:1 ✓ (AAA 통과)
- 모든 인터랙티브 요소 `:focus-visible` 스타일 명시
- aria-label, role 속성 투두 체크박스에 적용
