import React from "react";
import { getAchievementMessage } from "../lib/utils";

interface AchievementWidgetProps {
  rate: number;       // 0~100 달성률
  completed: number;  // 완료 개수
  total: number;      // 전체 개수
}

/**
 * 오늘의 달성률 위젯
 * 🐰 캐릭터 + 진행률 바 + 멘트
 */
const AchievementWidget: React.FC<AchievementWidgetProps> = ({
  rate,
  completed,
  total,
}) => {
  const { emoji, text } = getAchievementMessage(rate);

  return (
    <div className="achievement-widget">
      <div className="achievement-emoji">{emoji}</div>
      <div className="achievement-content">
        <p className="achievement-message">{text}</p>
        <div className="achievement-progress-bar">
          <div
            className="achievement-progress-fill"
            style={{ width: `${rate}%` }}
            role="progressbar"
            aria-valuenow={rate}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
        <span className="achievement-stats">
          {total === 0
            ? "아직 할 일이 없어요"
            : `${completed} / ${total} 완료 ✨`}
        </span>
      </div>
    </div>
  );
};

export default AchievementWidget;
