import { useState } from "react";
import SpotBadge from "./SpotBadge.jsx";

export default function TrailBoard({ spots, finishReward, onSelectSpot }) {
  const [gridMode, setGridMode] = useState(false);
  const ordered = [...spots].sort((a, b) => a.order - b.order);

  return (
    <main className="view" id="view-board">
      <button className="view-toggle" onClick={() => setGridMode((v) => !v)}>
        {gridMode ? "목록으로 보기" : "모아보기"}
      </button>

      <div className={`trail-wrap${gridMode ? " grid-mode" : ""}`}>
        <ol className="spot-list">
          {ordered.map((spot) => (
            <SpotBadge key={spot.id} spot={spot} onSelect={onSelectSpot} />
          ))}
        </ol>
      </div>

      <div className="summit-flag">
        <span className="flag-icon">🏁</span>
        전부 모으면 {finishReward} 획득!
      </div>
    </main>
  );
}
