import { useState } from 'react'
import { Link } from 'react-router-dom'

const TOTAL_STAMPS = 8
const STAMP_LABELS = ['정문', '후문', '부암동', '청계천', '경복궁', '광화문', '편의점', '카페']

export default function Home() {
  // TODO: 실제로는 GET /api/users/me/stamps 로 진행도를 가져온다
  const [stampCount] = useState(3)

  return (
    <div className="pb-4">
      <div className="px-5 pt-4 pb-2">
        <h2 className="font-display text-xl mb-1">나의 스탬프 여권</h2>
        <p className="text-xs text-ink-soft leading-relaxed mb-4">
          학교 주변과 근처 명소를 다니며 QR로 도장을 모아보세요. 8개를 모으면 리워드로 교환할 수 있어요.
        </p>
      </div>

      <div className="mx-5 mb-4 bg-white rounded-2xl border border-line p-5 shadow-[0_6px_0_#E7DCC2]">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[11px] text-ink-soft">이번 시즌 진행도</div>
            <div className="font-stamp text-2xl text-stamp">
              {stampCount}
              <span className="text-sm text-ink-soft">/{TOTAL_STAMPS}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-ink-soft">다음 리워드까지</div>
            <div className="font-bold text-sm text-pine">{TOTAL_STAMPS - stampCount}칸 남음</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {STAMP_LABELS.map((label, i) => {
            const filled = i < stampCount
            return (
              <div key={label} className="relative flex flex-col items-center">
                <div
                  className={`aspect-square w-full rounded-full flex items-center justify-center font-stamp text-xs
                    ${filled ? 'border-2 border-stamp text-stamp' : 'border-2 border-dashed border-line text-ink-soft'}`}
                >
                  {filled ? '✓' : i + 1}
                </div>
                <span className={`text-[8.5px] mt-1 ${filled ? 'text-pine font-semibold' : 'text-ink-soft'}`}>
                  {label}
                </span>
              </div>
            )
          })}
        </div>

        <div className="mt-6 bg-pine text-white rounded-xl px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-[11px] opacity-85">모으는 중인 선물</div>
            <div className="text-sm font-semibold mt-0.5">배달의민족 5,000원 쿠폰</div>
          </div>
          <Link to="/my" className="bg-mustard text-ink text-[11.5px] font-bold px-3 py-2 rounded-full">
            보관함
          </Link>
        </div>
      </div>

      <Link
        to="/scan"
        className="block mx-5 bg-stamp text-white text-center py-4 rounded-2xl font-bold shadow-[0_5px_0_#9C3521] active:translate-y-1"
      >
        📍 도착 지점 QR 스캔하기
      </Link>

      <div className="mx-5 mt-4 bg-paper-dark rounded-xl px-4 py-3 text-[11.5px] text-ink-soft leading-relaxed border-l-[3px] border-pine">
        💡 <b>오늘의 추천 동선</b> — 정문 → 홍제천 산책로 → 후문. 캠퍼스 급경사 대신 경사도가 낮은 길로 안내해드려요.
      </div>
    </div>
  )
}
