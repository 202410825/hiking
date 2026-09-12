export default function TopBar({ region, period, onToggleGuide }) {
  return (
    <header className="topbar">
      <div className="region-pill">
        {region}
        <span className="period">{period}</span>
      </div>
      <button className="guide-toggle" onClick={onToggleGuide} aria-label="사용 안내 보기">
        🦌
      </button>
    </header>
  );
}
