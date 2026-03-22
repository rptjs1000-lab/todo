import React, { useEffect, useRef } from "react";
import { PARTICLE_COLORS } from "../lib/utils";

interface ParticleEffectProps {
  x: number;  // 파티클 중심 X 좌표 (viewport 기준)
  y: number;  // 파티클 중심 Y 좌표 (viewport 기준)
}

/**
 * 체크 완료 시 파티클 터짐 이펙트
 * CSS keyframes + JS로 파티클 24개 동적 생성
 * 600ms 후 자동 사라짐 (부모에서 700ms 후 언마운트)
 */
const ParticleEffect: React.FC<ParticleEffectProps> = ({ x, y }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 파티클 개수
    const PARTICLE_COUNT = 24;

    // 파티클 DOM 요소 생성 및 주입
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const el = document.createElement("div");
      el.className = "particle";

      const size = 6 + Math.random() * 6; // 6~12px
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 40 + Math.random() * 50; // 40~90px

      // 방사형 이동 벡터 계산
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        --tx: ${tx}px;
        --ty: ${ty}px;
      `;

      container.appendChild(el);
    }

    // 컴포넌트 언마운트 시 DOM 정리
    return () => {
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
    };
  }, [x, y]);

  return <div ref={containerRef} className="particle-container" />;
};

export default ParticleEffect;
