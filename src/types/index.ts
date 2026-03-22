// 카테고리 키 유니온 타입
export type CategoryKey = "study" | "work" | "life" | "health" | "etc";

// 투두 아이템 데이터 모델
export interface Todo {
  id: string;
  text: string;
  // 카테고리 키: study | work | life | health | etc
  category: string;
  completed: boolean;
  createdAt: string;   // ISO 8601 UTC
  createdDate: string; // YYYY-MM-DD 로컬 날짜 (타임존 보정)
  completedAt: string | null;
}

// 카테고리 정의 모델
export interface Category {
  key: string;
  label: string;
  emoji: string;
  color: string; // CSS 클래스명으로 사용 (study, work, life, health, etc)
}

// 파티클 트리거 데이터
export interface ParticleTrigger {
  id: string;
  x: number;
  y: number;
}

// 달성률 멘트 반환 타입
export interface AchievementMessage {
  emoji: string;
  text: string;
}

// 새 투두 추가 시 전달하는 페이로드 타입
export interface AddTodoPayload {
  text: string;
  category: string;
}

// localStorage에 저장되는 전체 상태 인터페이스
export interface TodoState {
  todos: Todo[];
  lastUpdated: string; // ISO 8601
}
