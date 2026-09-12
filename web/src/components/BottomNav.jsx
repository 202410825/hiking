const TABS = [
  { key: "map", icon: "🗺️", label: "지도" },
  { key: "board", icon: "📖", label: "도감" },
];

export default function BottomNav({ activeView, onChangeView, onCamera }) {
  return (
    <nav className="tabbar">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={`tab-btn${activeView === tab.key ? " active" : ""}`}
          onClick={() => onChangeView(tab.key)}
        >
          <span className="tab-icon">{tab.icon}</span>
          {tab.label}
        </button>
      ))}

      <button className="tab-btn tab-camera" onClick={onCamera}>
        <span className="tab-icon">📷</span>
        인증
      </button>

      <button
        className={`tab-btn${activeView === "community" ? " active" : ""}`}
        onClick={() => onChangeView("community")}
      >
        <span className="tab-icon">💬</span>
        커뮤니티
      </button>
      <button
        className={`tab-btn${activeView === "settings" ? " active" : ""}`}
        onClick={() => onChangeView("settings")}
      >
        <span className="tab-icon">⚙️</span>
        설정
      </button>
    </nav>
  );
}
