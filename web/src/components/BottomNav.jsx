const TABS = [
  { key: "map", icon: "🗺️", label: "지도" },
  { key: "board", icon: "📖", label: "도장판" },
  { key: "stamp", icon: "📷", label: "인증" },
  { key: "community", icon: "💬", label: "커뮤니티" },
  { key: "settings", icon: "⚙️", label: "설정" },
];

export default function BottomNav({ activeView, onChangeView, onCamera }) {
  function handleClick(key) {
    if (key === "stamp") {
      onCamera();
      return;
    }
    onChangeView(key);
  }

  return (
    <nav className="tabbar">
      <div className="tabbar-inner">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn${activeView === tab.key ? " active" : ""}`}
            onClick={() => handleClick(tab.key)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
