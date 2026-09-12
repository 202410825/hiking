import { useEffect, useRef, useState } from "react";

const KAKAO_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

let kakaoLoadPromise = null;

function loadKakaoSdk() {
  if (window.kakao && window.kakao.maps) return Promise.resolve(window.kakao);
  if (kakaoLoadPromise) return kakaoLoadPromise;

  kakaoLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&autoload=false`;
    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) {
        kakaoLoadPromise = null;
        reject(new Error("kakao.maps 를 찾을 수 없어요."));
        return;
      }
      window.kakao.maps.load(() => resolve(window.kakao));
    };
    script.onerror = (e) => {
      kakaoLoadPromise = null; // allow retrying on next attempt
      reject(e);
    };
    document.head.appendChild(script);
  });

  return kakaoLoadPromise;
}

export default function KakaoMap({ spots, onSelectSpot }) {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);

  const validSpots = spots.filter(
    (s) => typeof s.lat === "number" && typeof s.lng === "number"
  );

  useEffect(() => {
    if (!KAKAO_KEY) {
      setError("카카오맵 키가 설정되지 않았어요. 배포 환경변수(VITE_KAKAO_MAP_KEY)를 확인해주세요.");
      return;
    }
    if (validSpots.length === 0) {
      setError("스팟에 좌표(lat/lng) 정보가 없어요. spots.json을 확인해주세요.");
      return;
    }

    let cancelled = false;

    loadKakaoSdk()
      .then((kakao) => {
        if (cancelled || !mapRef.current) return;

        try {
          const center = new kakao.maps.LatLng(validSpots[0].lat, validSpots[0].lng);
          const map = new kakao.maps.Map(mapRef.current, { center, level: 6 });
          const bounds = new kakao.maps.LatLngBounds();

          validSpots.forEach((spot) => {
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
        } catch (e) {
          console.error("Kakao map init error:", e);
          if (!cancelled) {
            setError(
              "지도를 그리는 중 문제가 생겼어요. 카카오 디벨로퍼스 콘솔의 도메인 등록 상태를 확인해주세요."
            );
          }
        }
      })
      .catch((e) => {
        console.error("Kakao SDK load error:", e);
        if (!cancelled) {
          setError("카카오맵 SDK를 불러오지 못했어요. 도메인 등록과 키 값을 확인해주세요.");
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
