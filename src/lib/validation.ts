import { CategoryKey } from "../types";
import { CATEGORIES } from "./utils";

// 투두 텍스트 최대 길이 상수
const TODO_TEXT_MAX_LENGTH = 100;

/**
 * 투두 텍스트의 유효성을 검사합니다.
 * - 빈 문자열(공백만 있는 경우 포함) 거부
 * - 100자 초과 거부
 */
export function validateTodoText(text: string): { valid: boolean; error?: string } {
  const trimmed = text.trim();

  if (trimmed.length === 0) {
    return { valid: false, error: "할 일을 입력해주세요." };
  }

  if (trimmed.length > TODO_TEXT_MAX_LENGTH) {
    return {
      valid: false,
      error: `할 일은 ${TODO_TEXT_MAX_LENGTH}자 이하로 입력해주세요. (현재 ${trimmed.length}자)`,
    };
  }

  return { valid: true };
}

/**
 * 주어진 문자열이 유효한 CategoryKey인지 검사하는 타입 가드입니다.
 */
export function validateCategory(key: string): key is CategoryKey {
  return CATEGORIES.some((category) => category.key === key);
}
