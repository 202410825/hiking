import { useState } from "react";
import SpotBadge from "./SpotBadge.jsx";

export default function TrailBoard({ spots, finishReward, onSelectSpot }) {
  const [gridMode, setGridMode] = useState(false);
  const ordered = [...spots].sort((a, b) => a.order - b.order);
  const completed = ordered.filter((s) => s.status === "completed").length;
  const remaining = ordered.length - completed;

  return (
    <main className="view" id="view-board">
      <button className="view-toggle" onClick={() => setGridMode((v) => !v)}>
        {gridMode ? "목록으로 보기" : "모아보기"}
      </button>

      <div className={`trail-wrap${gridMode ? " grid-mode" : ""}`}>
        {!gridMode && (
          <>
            <img className="trail-bg-img trail-bg-1" src="/assets/bg-1.png" alt="" />
            <img className="trail-bg-img trail-bg-2" src="/assets/bg-2.png" alt="" />
            <img className="trail-bg-img trail-bg-3" src="/assets/bg-3.png" alt="" />
          </>
        )}
        <ol className="spot-list">
          {ordered.map((spot, i) => (
            <SpotBadge key={spot.id} spot={spot} index={i} onSelect={onSelectSpot} />
          ))}
        </ol>
      </div>

      <div className="summit-flag">
        <span className="flag-icon">🏅</span>
        <div>
          <strong>완주 뱃지</strong>
          <span>
            {remaining > 0
              ? `남은 칸 ${remaining}곳 · 어느 곳부터 찍어도 괜찮아요`
              : `전부 모았어요! ${finishReward} 획득!`}
          </span>
        </div>
      </div>
    </main>
  );
}
