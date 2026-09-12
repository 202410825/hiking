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
  const pct = totalSpots ? Math.round((completedSpots / totalSpots) * 100) : 0;

  return (
    <header className="topbar">
      <div className="header-row">
        <div>
          <span className="season-eyebrow">{seasonLabel}</span>
          <span className="header-title">{title}</span>
          <span className="header-date">{period}</span>
        </div>
        <button className="guide-toggle" onClick={onToggleGuide} aria-label="사용 안내 보기">
          ?
        </button>
      </div>

      <div className="progress-bar">
        <span className="progress-count">
          {completedSpots}/{totalSpots}
        </span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-meta">순서 자유</span>
        <span className="progress-dday">{dDay(periodEnd)}</span>
      </div>
    </header>
  );
}
