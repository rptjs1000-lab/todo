import React from "react";
import { getTodayKorean } from "../lib/utils";

/**
 * 앱 상단 헤더 컴포넌트
 * 라벤더→핑크 그라디언트 배경, 타이틀 + 날짜 표시
 */
const Header: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">🌸 뽀짝 투두</h1>
      <span className="header-date">{getTodayKorean()}</span>
    </header>
  );
};

export default Header;
