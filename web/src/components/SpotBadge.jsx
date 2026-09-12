export default function SpotBadge({ spot, onSelect }) {
  const rot = (spot.id % 2 === 0 ? -1 : 1) * (3 + (spot.id % 3) * 2);
  const align = spot.order % 2 === 0 ? "align-right" : "align-left";

  return (
    <li
      className={`spot-node status-${spot.status} ${align}`}
      data-id={spot.id}
    >
      <button
        className="spot-badge"
        style={{ "--rot": `${rot}deg` }}
        aria-label={spot.name}
        onClick={() => onSelect(spot.id)}
      >
        {spot.icon}
      </button>
      <div className="spot-info">
        <span className="spot-name">{spot.name}</span>
        <span className="spot-category">{spot.category}</span>
      </div>
    </li>
  );
}
