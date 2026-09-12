const ACTION_LABEL = {
  completed: null,
  current: "지금 인증하기",
  locked: "인증하기",
};

export default function SpotBadge({ spot, index, onSelect }) {
  const side = index % 2 === 0 ? "left" : "right";
  const action = ACTION_LABEL[spot.status];

  return (
    <li className={`spot-node status-${spot.status} side-${side}`} data-id={spot.id}>
      <div className="spot-stamp-slot">
        {spot.status === "locked" ? (
          <span className="spot-stamp-empty">?</span>
        ) : (
          <span>{spot.icon}</span>
        )}
      </div>

      <button className="spot-card" onClick={() => onSelect(spot.id)}>
        <div className="spot-card-head">
          <span className="spot-order">{String(spot.order).padStart(2, "0")}</span>
          <span className="spot-name">{spot.name}</span>
        </div>
        <p className="spot-desc">{spot.description}</p>
        <div className="spot-card-foot">
          <span className="spot-category-tag">{spot.category}</span>
          {spot.status === "completed" && <span className="spot-done-tag">완료</span>}
          {action && (
            <span className={`spot-action-tag${spot.status === "current" ? " urgent" : ""}`}>
              {action}
            </span>
          )}
        </div>
      </button>
    </li>
  );
}
