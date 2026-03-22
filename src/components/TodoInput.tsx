import React, { useState, useEffect } from "react";
import { CATEGORIES } from "../lib/utils";

interface TodoInputProps {
  onAdd: (text: string, category: string) => void;
  selectedCategory: string | null;  // 필터에서 선택된 카테고리를 기본값으로 사용
}

/**
 * 할 일 입력 폼 컴포넌트
 * 이모지 카테고리 선택 드롭다운 + 텍스트 입력 + 추가 버튼
 */
const TodoInput: React.FC<TodoInputProps> = ({ onAdd, selectedCategory }) => {
  const [text, setText] = useState("");
  // 필터에서 선택된 카테고리를 기본값으로, 없으면 첫 번째 카테고리
  const [category, setCategory] = useState<string>(
    selectedCategory ?? CATEGORIES[0].key
  );

  // 부모 필터 변경 시 카테고리 동기화
  useEffect(() => {
    if (selectedCategory !== null) setCategory(selectedCategory);
  }, [selectedCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, category);
    setText("");
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      {/* 카테고리 선택 드롭다운 */}
      <select
        className="todo-category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="카테고리 선택"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat.key} value={cat.key}>
            {cat.emoji}
          </option>
        ))}
      </select>

      {/* 할 일 텍스트 입력 */}
      <input
        className="todo-input-field"
        type="text"
        placeholder="🌸 할 일 입력..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={100}
        aria-label="할 일 입력"
      />

      {/* 추가 버튼 */}
      <button type="submit" className="todo-add-btn" disabled={!text.trim()}>
        + 추가
      </button>
    </form>
  );
};

export default TodoInput;
