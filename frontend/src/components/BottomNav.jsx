import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/', label: '홈', icon: '🏠' },
  { to: '/map', label: '지도', icon: '🗺️' },
  { to: '/scan', label: '스캔', icon: '▦', isScan: true },
  { to: '/community', label: '커뮤니티', icon: '💬' },
  { to: '/my', label: '마이', icon: '👤' },
]

export default function BottomNav() {
  return (
    <nav className="flex border-t border-line bg-white/90 backdrop-blur px-1.5 pt-2 pb-3">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 text-[9.5px] ${
              isActive ? 'text-stamp font-bold' : 'text-ink-soft'
            }`
          }
        >
          {({ isActive }) =>
            tab.isScan ? (
              <>
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white -mt-5 text-base shadow-lg ${
                    isActive ? 'bg-stamp-dark' : 'bg-stamp'
                  }`}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </>
            ) : (
              <>
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </>
            )
          }
        </NavLink>
      ))}
    </nav>
  )
}
