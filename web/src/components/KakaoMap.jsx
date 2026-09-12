import { useEffect, useRef, useState } from "react";

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

function loadKakaoSdk() {
  if (window.kakao && window.kakao.maps) return Promise.resolve(window.kakao);

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("kakao-map-sdk");
    if (existing) {
      existing.addEventListener("load", () => window.kakao.maps.load(() => resolve(window.kakao)));
      return;
    }
    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`;
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function KakaoMap({ spots, onSelectSpot }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!KAKAO_KEY) {
      setError("카카오맵 키가 설정되지 않았어요. web/.env의 VITE_KAKAO_MAP_KEY를 확인해주세요.");
      return;
    }

    let cancelled = false;

    loadKakaoSdk()
      .then((kakao) => {
        if (cancelled || !mapRef.current) return;

        const center = new kakao.maps.LatLng(spots[0].lat, spots[0].lng);
        const map = new kakao.maps.Map(mapRef.current, { center, level: 6 });

        const bounds = new kakao.maps.LatLngBounds();

        spots.forEach((spot) => {
          const position = new kakao.maps.LatLng(spot.lat, spot.lng);
          bounds.extend(position);

          const marker = new kakao.maps.Marker({ position, map });

          const overlay = new kakao.maps.CustomOverlay({
            position,
            yAnchor: 1.4,
            content: `<div style="
              background:#fff9ee;border:2px solid #2c2620;border-radius:10px;
              padding:3px 8px;font-size:12px;white-space:nowrap;">
              ${spot.icon} ${spot.name}
            </div>`,
          });
          overlay.setMap(map);

          kakao.maps.event.addListener(marker, "click", () => onSelectSpot(spot.id));
        });

        map.setBounds(bounds);
      })
      .catch(() => {
        if (!cancelled) setError("카카오맵을 불러오지 못했어요. 도메인 등록 여부를 확인해주세요.");
      });

    return () => {
      cancelled = true;
    };
  }, [spots, onSelectSpot]);

  if (error) {
    return (
      <main className="view">
        <div className="placeholder-view">
          <span className="big">🗺️</span>
          <h2>지도를 불러올 수 없어요</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="view">
      <div ref={mapRef} style={{ width: "100%", height: "70vh" }} />
    </main>
  );
}
