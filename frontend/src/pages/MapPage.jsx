import { useState } from 'react'
import { SPOTS } from '../data/mockData'

export default function MapPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="pb-4">
      <div className="px-5 pt-4 pb-2">
        <h2 className="font-display text-xl mb-1">주변 스탬프 지도</h2>
        <p className="text-xs text-ink-soft leading-relaxed mb-3">
          학교 내 건물(초록)과 지역사회·관광지(빨강)를 확인하고, 다녀온 곳에는 리뷰를 남겨보세요.
        </p>
      </div>

      {/*
        TODO: 카카오맵 JavaScript SDK 연동
        1. index.html에 <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KEY&autoload=false"></script> 추가
        2. useEffect에서 kakao.maps.load(() => { ... new kakao.maps.Map(...) })
        3. SPOTS 배열의 lat/lng로 마커(kakao.maps.Marker) 생성
        지금은 실제 지도 대신 리스트로 지점을 보여주는 임시 화면입니다.
      */}
      <div className="mx-5 space-y-2">
        {SPOTS.map((spot) => (
          <button
            key={spot.id}
            onClick={() => setSelected(spot)}
            className={`w-full text-left bg-white border rounded-xl px-4 py-3 flex items-center justify-between
              ${selected?.id === spot.id ? 'border-stamp' : 'border-line'}`}
          >
            <div>
              <div className="text-sm font-semibold">{spot.name}</div>
              <div className="text-[10.5px] text-ink-soft mt-0.5">{spot.category}</div>
            </div>
            <span
              className={`text-[10px] px-2 py-1 rounded-full text-white ${
                spot.category === '학교 내 건물' ? 'bg-pine' : 'bg-stamp'
              }`}
            >
              {spot.category === '학교 내 건물' ? '교내' : '지역'}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mx-5 mt-4 bg-white border border-line rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div className="font-bold text-sm">{selected.name}</div>
          </div>
          <p className="text-xs text-ink-soft mt-2 leading-relaxed">{selected.description}</p>
          <button
            className="w-full mt-3 py-2 rounded-lg border border-pine text-pine text-xs font-bold"
            onClick={() => alert('리뷰 작성 화면 (구현 예정)')}
          >
            ✏️ 리뷰 / 추천 남기기
          </button>
        </div>
      )}
    </div>
  )
}
