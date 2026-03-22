import { Todo, TodoState, AddTodoPayload } from "../types";
import { generateId, getTodayISO } from "./utils";

// localStorage 키 상수
const STORAGE_KEY = "ppojjak-todos";

/** 런타임 타입 가드 — localStorage에서 읽은 데이터 검증 */
function isValidTodo(item: unknown): item is Todo {
  if (typeof item !== "object" || item === null) return false;
  const t = item as Record<string, unknown>;
  return (
    typeof t.id === "string" &&
    typeof t.text === "string" &&
    typeof t.category === "string" &&
    typeof t.completed === "boolean" &&
    typeof t.createdAt === "string" &&
    (t.completedAt === null || typeof t.completedAt === "string")
  );
}

/**
 * localStorage에서 투두 목록을 불러옵니다.
 * 파싱 실패 또는 접근 불가 시 빈 배열을 반환합니다.
 */
export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return [];

    const parsed: unknown = JSON.parse(raw);

    // 저장된 데이터가 TodoState 구조인지 확인
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "todos" in parsed &&
      Array.isArray((parsed as TodoState).todos)
    ) {
      return (parsed as TodoState).todos.filter(isValidTodo);
    }

    // 하위 호환: 배열 형태로 저장된 경우
    if (Array.isArray(parsed)) {
      return (parsed as unknown[]).filter(isValidTodo);
    }

    return [];
  } catch {
    // JSON 파싱 오류 또는 시크릿 모드 등 localStorage 접근 불가
    console.warn("[storage] localStorage 로드 실패, 빈 배열로 초기화합니다.");
    return [];
  }
}

/**
 * 투두 목록을 localStorage에 저장합니다.
 * 시크릿 모드 등 저장 불가 환경에서는 경고만 출력합니다.
 */
export function saveTodos(todos: Todo[]): boolean {
  try {
    const state: TodoState = {
      todos,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    console.warn("[storage] localStorage 저장 실패. 변경사항이 유지되지 않을 수 있습니다.");
    return false;
  }
}

/**
 * 새 투두를 생성하고 저장한 뒤 생성된 투두를 반환합니다.
 */
export function addTodo(payload: AddTodoPayload): Todo {
  const todos = loadTodos();

  const newTodo: Todo = {
    id: generateId(),
    text: payload.text.trim(),
    category: payload.category,
    completed: false,
    createdAt: new Date().toISOString(),
    createdDate: getTodayISO(),
    completedAt: null,
  };

  saveTodos([...todos, newTodo]);
  return newTodo;
}

/**
 * 특정 id의 투두 완료 상태를 토글합니다.
 * 완료 처리 시 completedAt을 현재 시각으로, 취소 시 null로 초기화합니다.
 */
export function toggleTodo(id: string, todos: Todo[]): Todo[] {
  const updated = todos.map((todo) => {
    if (todo.id !== id) return todo;
    const nowCompleted = !todo.completed;
    return {
      ...todo,
      completed: nowCompleted,
      completedAt: nowCompleted ? new Date().toISOString() : null,
    };
  });

  saveTodos(updated);
  return updated;
}

/**
 * 특정 id의 투두를 목록에서 제거합니다.
 */
export function deleteTodo(id: string, todos: Todo[]): Todo[] {
  const updated = todos.filter((todo) => todo.id !== id);
  saveTodos(updated);
  return updated;
}

/**
 * 오늘 날짜(YYYY-MM-DD)에 생성된 투두만 필터링하여 반환합니다.
 */
export function getTodayTodos(todos: Todo[]): Todo[] {
  const todayStr = new Date().toISOString().slice(0, 10);
  return todos.filter((todo) => todo.createdAt.slice(0, 10) === todayStr);
}
