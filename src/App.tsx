import React, { useState, useCallback } from "react";
import { Todo } from "./types";
import { saveTodos, loadTodos } from "./lib/storage";
import { generateId, getTodayISO } from "./lib/utils";
import Header from "./components/Header";
import AchievementWidget from "./components/AchievementWidget";
import CategoryFilter from "./components/CategoryFilter";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import CompletedModal from "./components/CompletedModal";

const App: React.FC = () => {
  // 투두 목록 상태 — localStorage에서 초기값 로드
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  // 선택된 카테고리 필터 (null = 전체)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // 완료 목록 모달 열림 상태
  const [completedModalOpen, setCompletedModalOpen] = useState(false);
  // 파티클 트리거: { id: string; x: number; y: number } | null
  const [particleTrigger, setParticleTrigger] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  // 할 일 추가 — 함수형 업데이터로 stale closure 방지
  const handleAdd = useCallback((text: string, category: string) => {
    const newTodo: Todo = {
      id: generateId(),
      text,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
      createdDate: getTodayISO(),
      completedAt: null,
    };
    setTodos((prev) => {
      const next = [newTodo, ...prev];
      saveTodos(next);
      return next;
    });
  }, []);

  // 완료 토글 — 함수형 업데이터 + 파티클 트리거 분리
  const handleToggle = useCallback((id: string, x: number, y: number) => {
    let shouldTriggerParticle = false;
    setTodos((prev) => {
      const target = prev.find((t) => t.id === id);
      if (target && !target.completed) shouldTriggerParticle = true;
      const next = prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
            }
          : t
      );
      saveTodos(next);
      return next;
    });
    if (shouldTriggerParticle) {
      setParticleTrigger({ id, x, y });
      setTimeout(() => setParticleTrigger(null), 700);
    }
  }, []);

  // 할 일 삭제 — 함수형 업데이터로 stale closure 방지
  const handleDelete = useCallback((id: string) => {
    setTodos((prev) => {
      const next = prev.filter((t) => t.id !== id);
      saveTodos(next);
      return next;
    });
  }, []);

  // 오늘 날짜 기준 미완료 투두만 필터 (createdDate 우선, 없으면 UTC 폴백)
  const todayStr = getTodayISO();
  const isToday = (t: Todo) => (t.createdDate ?? t.createdAt.slice(0, 10)) === todayStr;
  const activeTodos = todos.filter((t) => !t.completed && isToday(t));
  const completedTodos = todos.filter((t) => t.completed);

  // 카테고리 필터 적용
  const filteredActive = selectedCategory
    ? activeTodos.filter((t) => t.category === selectedCategory)
    : activeTodos;

  // 달성률 계산 (오늘 생성한 투두 기준)
  const todayTodos = todos.filter(isToday);
  const todayCompleted = todayTodos.filter((t) => t.completed).length;
  const achievementRate =
    todayTodos.length === 0
      ? 0
      : Math.round((todayCompleted / todayTodos.length) * 100);

  return (
    <div className="app-root">
      <div className="app-container">
        <Header />

        <AchievementWidget
          rate={achievementRate}
          completed={todayCompleted}
          total={todayTodos.length}
        />

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <TodoInput onAdd={handleAdd} selectedCategory={selectedCategory} />

        <TodoList
          todos={filteredActive}
          onToggle={handleToggle}
          onDelete={handleDelete}
          particleTrigger={particleTrigger}
        />

        {/* 완료 목록 모달 트리거 버튼 */}
        <button
          className="completed-trigger-btn"
          onClick={() => setCompletedModalOpen(true)}
        >
          ✨ 완료한 일 보기 ({completedTodos.length}개)
        </button>
      </div>

      <CompletedModal
        isOpen={completedModalOpen}
        todos={completedTodos}
        onClose={() => setCompletedModalOpen(false)}
      />
    </div>
  );
};

export default App;
