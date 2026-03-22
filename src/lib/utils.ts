import { Category, AchievementMessage } from "../types";

/**
 * 고유 ID를 생성합니다.
 * crypto.randomUUID()를 우선 사용하고, 지원하지 않는 환경에서는 fallback합니다.
 */
export function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // fallback: 타임스탬프 + 랜덤 문자열 조합
  const timestamp = Date.now().toString(36);
  const random1 = Math.random().toString(36).slice(2, 9);
  const random2 = Math.random().toString(36).slice(2, 9);
  return `${timestamp}-${random1}-${random2}`;
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환합니다. (로컬 타임존 기준)
 */
export function getTodayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * 오늘 날짜를 한국어 형식으로 반환합니다.
 * 예: 2026년 3월 23일 (일)
 */
export function getTodayKorean(): string {
  const now = new Date();
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = days[now.getDay()];
  return `${year}년 ${month}월 ${date}일 (${day})`;
}

/**
 * 달성률에 따른 캐릭터 이모지와 멘트를 반환합니다.
 */
export function getAchievementMessage(rate: number): AchievementMessage {
  if (rate === 0) return { emoji: "🐰", text: "아직 시작 전이야! 파이팅! 🌟" };
  if (rate < 50) return { emoji: "🐰", text: "시작이 반이야! 조금만 더! ✨" };
  if (rate < 80) return { emoji: "🐰", text: "반 넘었어! 잘하고 있어! 🎉" };
  if (rate < 100) return { emoji: "🐰", text: "거의 다 왔어! 조금만 더! 💪" };
  return { emoji: "🎉", text: "와아! 오늘 할 일 다 끝냈어! 최고야! 🏆" };
}

/**
 * 앱에서 사용하는 카테고리 목록 상수
 * color 필드는 CSS 클래스명으로 사용됨 (globals.css의 .category-badge.{color})
 */
export const CATEGORIES: Category[] = [
  { key: "study", label: "공부", emoji: "📚", color: "study" },
  { key: "work", label: "업무", emoji: "💼", color: "work" },
  { key: "life", label: "일상", emoji: "🌸", color: "life" },
  { key: "health", label: "건강", emoji: "🥗", color: "health" },
  { key: "etc", label: "기타", emoji: "✨", color: "etc" },
];

/**
 * 완료 모달에서 사용할 랜덤 스티커 이모지를 반환합니다.
 */
export function getRandomSticker(): string {
  const stickers = ["🌟", "✨", "🎉", "💫", "🌸"];
  return stickers[Math.floor(Math.random() * stickers.length)];
}

/**
 * 파티클 색상 배열 — 랜덤 선택에 사용
 */
export const PARTICLE_COLORS = ["#B39DDB", "#F48FB1", "#80CBC4", "#FFE082"];
