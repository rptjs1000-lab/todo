import React, { useEffect, useState } from "react";
import { Todo } from "../types";
import { CATEGORIES, getRandomSticker } from "../lib/utils";

interface CompletedModalProps {
  isOpen: boolean;
  todos: Todo[];
  onClose: () => void;
}

// 완료 아이템에 스티커를 고정 할당하기 위한 캐시 맵
const stickerCache = new Map<string, string>();

/**
 * 완료 목록 슬라이드업 모달
 * 하단에서 올라오는 시트 형태, 오버레이 클릭으로 닫기 가능
 */
const CompletedModal: React.FC<CompletedModalProps> = ({
  isOpen,
  todos,
  onClose,
}) => {
  // 오버레이 클래스에 지연 적용하여 CSS 트랜지션 트리거
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // 마운트 직후 한 프레임 뒤에 open 클래스 추가
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // 오버레이 배경 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // isOpen이 false이고 visible도 false면 DOM에서 제거
  if (!isOpen && !visible) return null;

  return (
    <div
      className={`modal-overlay${visible ? " open" : ""}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="완료한 일 목록"
    >
      <div className="modal-sheet">
        {/* 모달 헤더 */}
        <div className="modal-header">
          <h2 className="modal-title">🎉 완료한 일</h2>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="모달 닫기"
          >
            ✕
          </button>
        </div>

        {/* 완료 항목 목록 */}
        {todos.length === 0 ? (
          <div className="modal-empty">
            <p>아직 완료한 일이 없어요 🌱</p>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {todos.map((todo) => {
              // 스티커 캐싱 — 같은 투두에는 항상 같은 스티커 표시
              if (!stickerCache.has(todo.id)) {
                stickerCache.set(todo.id, getRandomSticker());
              }
              const sticker = stickerCache.get(todo.id)!;
              const categoryMeta = CATEGORIES.find(
                (c) => c.key === todo.category
              );

              return (
                <li key={todo.id} className="completed-item">
                  <span className="completed-item-sticker">{sticker}</span>
                  <span className="completed-item-text">{todo.text}</span>
                  {categoryMeta && (
                    <span
                      className={`category-badge ${todo.category} completed-item-badge`}
                    >
                      {categoryMeta.emoji}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CompletedModal;
