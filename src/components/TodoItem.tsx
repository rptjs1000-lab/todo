import React, { useRef } from "react";
import { Todo } from "../types";
import { CATEGORIES } from "../lib/utils";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
}

/**
 * 개별 투두 카드 컴포넌트
 * 원형 체크박스 + 텍스트 + 카테고리 뱃지 + 삭제 버튼
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const checkboxRef = useRef<HTMLButtonElement>(null);

  // 카테고리 메타 데이터 조회
  const categoryMeta = CATEGORIES.find((c) => c.key === todo.category);

  const handleToggle = () => {
    if (checkboxRef.current) {
      // 체크박스의 화면상 중앙 좌표를 파티클 시작 위치로 사용
      const rect = checkboxRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      onToggle(todo.id, x, y);
    }
  };

  return (
    <div className={`todo-item${todo.completed ? " completed" : ""}`}>
      {/* 원형 체크박스 */}
      <button
        ref={checkboxRef}
        className={`todo-checkbox${todo.completed ? " checked" : ""}`}
        onClick={handleToggle}
        aria-label={todo.completed ? "완료 취소" : "완료 표시"}
      >
        {todo.completed && (
          <span className="todo-checkbox-check">✓</span>
        )}
      </button>

      {/* 텍스트 + 카테고리 뱃지 */}
      <div className="todo-text-area">
        <p className={`todo-text${todo.completed ? " completed" : ""}`}>
          {todo.text}
        </p>
        {categoryMeta && (
          <span className={`category-badge ${todo.category}`}>
            {categoryMeta.emoji} {categoryMeta.label}
          </span>
        )}
      </div>

      {/* 삭제 버튼 */}
      <button
        className="todo-delete-btn"
        onClick={() => onDelete(todo.id)}
        aria-label="삭제"
      >
        🗑
      </button>
    </div>
  );
};

export default TodoItem;
