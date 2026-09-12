const STATUS_LABEL = {
  completed: "완료",
  current: "지금 여기",
  locked: "",
};

export default function SpotBadge({ spot, onSelect }) {
  return (
    <li className={`spot-node status-${spot.status}`} data-id={spot.id}>
      <button className="spot-badge" aria-label={spot.name} onClick={() => onSelect(spot.id)}>
        {spot.icon}
      </button>
      <div className="spot-info" onClick={() => onSelect(spot.id)}>
        <div className="spot-text">
          <span className="spot-name">{spot.name}</span>
          <span className="spot-category">{spot.category}</span>
        </div>
        <span className="spot-status-tag">{STATUS_LABEL[spot.status]}</span>
      </div>
    </li>
  );
}
