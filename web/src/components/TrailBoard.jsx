import { useEffect, useRef, useState } from "react";
import SpotBadge from "./SpotBadge.jsx";

function Mascot() {
  return (
    <svg viewBox="0 0 64 64" width="46" height="46">
      <ellipse cx="32" cy="40" rx="16" ry="18" fill="#e8ac3d" stroke="#2c2620" strokeWidth="2.5" />
      <path d="M20 20 Q14 4 22 8 Q22 18 24 22" fill="#e8ac3d" stroke="#2c2620" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M44 20 Q50 4 42 8 Q42 18 40 22" fill="#e8ac3d" stroke="#2c2620" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="26" cy="34" r="2.4" fill="#2c2620" />
      <circle cx="38" cy="34" r="2.4" fill="#2c2620" />
      <path d="M25 41 Q32 47 39 41" fill="none" stroke="#2c2620" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function TrailBoard({ spots, finishReward, onSelectSpot }) {
  const wrapRef = useRef(null);
  const [gridMode, setGridMode] = useState(false);
  const [pathD, setPathD] = useState("");
  const [mascotPos, setMascotPos] = useState(null);

  const ordered = [...spots].sort((a, b) => a.order - b.order).reverse();
  const currentSpot = spots.find((s) => s.status === "current");

  useEffect(() => {
    if (gridMode) {
      setPathD("");
      setMascotPos(null);
      return;
    }

    function draw() {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const badges = [...wrap.querySelectorAll(".spot-badge")];
      if (!badges.length) return;

      const wrapRect = wrap.getBoundingClientRect();
      const points = badges.map((b) => {
        const r = b.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - wrapRect.left,
          y: r.top + r.height / 2 - wrapRect.top,
        };
      });

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const cur = points[i];
        const midY = (prev.y + cur.y) / 2;
        d += ` C ${prev.x} ${midY}, ${cur.x} ${midY}, ${cur.x} ${cur.y}`;
      }
      setPathD(d);

      if (currentSpot) {
        const badgeEl = wrap.querySelector(`.spot-node[data-id="${currentSpot.id}"] .spot-badge`);
        if (badgeEl) {
          const r = badgeEl.getBoundingClientRect();
          setMascotPos({
            left: r.left + r.width / 2 - wrapRect.left + 46,
            top: r.top + r.height / 2 - wrapRect.top,
          });
        }
      } else {
        setMascotPos(null);
      }
    }

    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [spots, gridMode, currentSpot]);

  return (
    <main className="view" id="view-board">
      <div className="summit-flag">
        <span className="flag-icon">🚩</span>
        전부 모으면 {finishReward} 획득!
      </div>
      <button className="view-toggle" onClick={() => setGridMode((v) => !v)}>
        {gridMode ? "산길로 보기" : "모아보기"}
      </button>
      <div className={`trail-wrap${gridMode ? " grid-mode" : ""}`} ref={wrapRef}>
        <svg className="path-svg">{pathD && <path d={pathD} />}</svg>
        <ol className="spot-list">
          {ordered.map((spot) => (
            <SpotBadge key={spot.id} spot={spot} onSelect={onSelectSpot} />
          ))}
        </ol>
        {!gridMode && mascotPos && (
          <div className="mascot-marker" style={{ left: mascotPos.left, top: mascotPos.top }}>
            <Mascot />
          </div>
        )}
      </div>
      <div className="trail-start">출발 지점</div>
    </main>
  );
}
