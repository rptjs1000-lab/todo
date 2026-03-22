import React from "react";
import { CATEGORIES } from "../lib/utils";

interface CategoryFilterProps {
  selected: string | null;  // 현재 선택된 카테고리 키 (null = 전체)
  onSelect: (key: string | null) => void;
}

/**
 * 카테고리 필터 탭 바
 * 가로 스크롤, 스크롤바 숨김
 */
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <nav className="category-filter" aria-label="카테고리 필터">
      {/* 전체 탭 */}
      <button
        className={`category-tab${selected === null ? " active" : ""}`}
        onClick={() => onSelect(null)}
      >
        🗂 전체
      </button>

      {/* 카테고리별 탭 */}
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`category-tab${selected === cat.key ? " active" : ""}`}
          onClick={() => onSelect(cat.key)}
        >
          {cat.emoji} {cat.label}
        </button>
      ))}
    </nav>
  );
};

export default CategoryFilter;
