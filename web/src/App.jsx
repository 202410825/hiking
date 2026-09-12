import { useEffect, useState } from "react";
import TopBar from "./components/TopBar.jsx";
import GuideBanner from "./components/GuideBanner.jsx";
import TrailBoard from "./components/TrailBoard.jsx";
import StampModal from "./components/StampModal.jsx";
import BottomNav from "./components/BottomNav.jsx";
import PlaceholderView from "./components/PlaceholderView.jsx";
import KakaoMap from "./components/KakaoMap.jsx";
import { loadState, saveState } from "./utils/storage.js";
import defaultData from "./data/spots.json";

export default function App() {
  const [data, setData] = useState(() => loadState(defaultData));
  const [view, setView] = useState("board");
  const [guideOpen, setGuideOpen] = useState(false);
  const [modalSpotId, setModalSpotId] = useState(null);

  useEffect(() => {
    saveState(data);
  }, [data]);

  const modalSpot = data.spots.find((s) => s.id === modalSpotId) || null;
  const currentSpot = data.spots.find((s) => s.status === "current");
  const completedSpots = data.spots.filter((s) => s.status === "completed").length;

  function handleStamp(id) {
    setData((prev) => {
      const spots = prev.spots.map((s) => ({ ...s }));
      const idx = spots.findIndex((s) => s.id === id);
      spots[idx].status = "completed";
      const next = spots.find((s) => s.order === spots[idx].order + 1);
      if (next) next.status = "current";
      return { ...prev, spots };
    });
    setModalSpotId(null);
  }

  return (
    <div className="app-shell">
      <TopBar
        seasonLabel={data.seasonLabel}
        title={data.title}
        period={data.period}
        periodEnd={data.periodEnd}
        totalSpots={data.spots.length}
        completedSpots={completedSpots}
        onToggleGuide={() => setGuideOpen((v) => !v)}
      />
      <GuideBanner visible={guideOpen} title={data.guide.title} message={data.guide.message} />

      {view === "board" && (
        <TrailBoard
          spots={data.spots}
          finishReward={data.finishReward}
          onSelectSpot={setModalSpotId}
        />
      )}

      {view === "map" && <KakaoMap spots={data.spots} onSelectSpot={setModalSpotId} />}

      {view === "community" && (
        <PlaceholderView
          icon="💬"
          title="커뮤니티 준비 중"
          description="스팟별 리뷰와 사진을 나눌 수 있는 공간이 열려요."
        />
      )}

      {view === "settings" && (
        <PlaceholderView icon="⚙️" title="설정" description="">
          <a href="#">개인정보 처리방침</a>
        </PlaceholderView>
      )}

      <StampModal
        spot={modalSpot}
        onClose={() => setModalSpotId(null)}
        onStamp={handleStamp}
      />

      <BottomNav
        activeView={view}
        onChangeView={setView}
        onCamera={() => currentSpot && setModalSpotId(currentSpot.id)}
      />
    </div>
  );
}
