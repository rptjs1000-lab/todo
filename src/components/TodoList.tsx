import React from "react";
import { Todo, ParticleTrigger } from "../types";
import TodoItem from "./TodoItem";
import ParticleEffect from "./ParticleEffect";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
  particleTrigger: ParticleTrigger | null;
}

/**
 * 오늘 할 일 목록 섹션
 * 빈 상태일 때 안내 메시지 표시
 */
const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  particleTrigger,
}) => {
  return (
    <section className="todo-list-section">
      <p className="todo-list-title">📋 오늘 할 일 ({todos.length}개)</p>

      {todos.length === 0 ? (
        <div className="todo-list-empty">
          <div className="todo-list-empty-icon">🌱</div>
          <p>할 일을 추가해 봐요!</p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos.map((todo) => (
            <li key={todo.id}>
              <TodoItem
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}

      {/* 파티클 이펙트 — 완료 체크 시 터짐 */}
      {particleTrigger && (
        <ParticleEffect x={particleTrigger.x} y={particleTrigger.y} />
      )}
    </section>
  );
};

export default TodoList;
