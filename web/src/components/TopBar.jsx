function dDay(periodEnd) {
  if (!periodEnd) return null;
  const end = new Date(`${periodEnd}T23:59:59`);
  const today = new Date();
  const diffMs = end.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const days = Math.round(diffMs / 86400000);
  if (days < 0) return "종료";
  if (days === 0) return "D-DAY";
  return `D-${days}`;
}

export default function TopBar({
  seasonLabel,
  title,
  period,
  periodEnd,
  totalSpots,
  completedSpots,
  onToggleGuide,
}) {
  const dots = Array.from({ length: totalSpots }, (_, i) => i < completedSpots);

  return (
    <header className="topbar">
      <span className="season-eyebrow">{seasonLabel}</span>

      <div className="header-row">
        <div className="header-card">
          <div className="header-title-row">
            <span className="header-title">{title}</span>
            <span className="header-date">{period}</span>
          </div>
        </div>

        <button className="guide-toggle" onClick={onToggleGuide} aria-label="사용 안내 보기">
          🦌
        </button>
      </div>

      <div className="progress-bar">
        {dots.map((filled, i) => (
          <span key={i} className={`progress-dot${filled ? " filled" : ""}`} />
        ))}
        <span className="progress-count">
          도장 {completedSpots} / {totalSpots}
        </span>
        <span className="progress-spacer" />
        <span className="progress-free">순서 자유</span>
        <span className="progress-dday">{dDay(periodEnd)}</span>
      </div>
    </header>
  );
}
