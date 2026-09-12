const TABS = [
  { key: "map", icon: "/assets/icons/nav-map.png", label: "지도" },
  { key: "board", icon: "/assets/icons/nav-board.png", label: "도장판" },
  { key: "stamp", icon: "/assets/icons/nav-cert.png", label: "인증" },
  { key: "community", icon: "/assets/icons/nav-community.png", label: "커뮤니티" },
  { key: "settings", icon: "/assets/icons/nav-settings.png", label: "설정" },
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
            <img className="tab-icon-img" src={tab.icon} alt="" />
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
