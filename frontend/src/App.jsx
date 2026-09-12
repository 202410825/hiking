import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import Scan from './pages/Scan'
import Community from './pages/Community'
import MyPage from './pages/MyPage'

export default function App() {
  return (
    <div className="max-w-[420px] mx-auto min-h-screen flex flex-col bg-paper">
      <header className="flex items-center justify-between px-5 pt-6 pb-3 border-b border-dashed border-line">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border-2 border-stamp flex items-center justify-center text-stamp text-sm -rotate-6">
            山
          </div>
          <div>
            <div className="font-display font-bold text-[17px] leading-none">Hiking</div>
            <div className="text-[10px] text-ink-soft mt-0.5">상명대 주변 스탬프 투어</div>
          </div>
        </div>
        {/* TODO: 카카오 로그인 상태에 따라 로그인 버튼 / 로그인됨 표시 전환 */}
        <span className="text-[11px] bg-[#FFE300] text-[#3A1D1D] px-2.5 py-1 rounded-full font-semibold">
          카카오 연동됨
        </span>
      </header>

      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/community" element={<Community />} />
          <Route path="/my" element={<MyPage />} />
        </Routes>
      </main>

      <BottomNav />
    </div>
  )
}
