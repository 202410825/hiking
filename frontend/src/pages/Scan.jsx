import { useState } from 'react'

// TODO: html5-qrcode 또는 zxing-js로 실제 카메라 QR 인식 구현
// 예: import { Html5Qrcode } from 'html5-qrcode'
// 스캔 성공 시 POST /api/stamps { spotId, qrToken } 호출 → 서버에서 유효성 검증 후 스탬프 적립

export default function Scan() {
  const [status, setStatus] = useState('idle') // idle | scanning | success

  function startScan() {
    setStatus('scanning')
    // 데모용: 1.4초 후 인식 성공으로 처리
    setTimeout(() => setStatus('success'), 1400)
  }

  return (
    <div className="px-5 pt-6 pb-4 flex flex-col items-center text-center">
      <h2 className="font-display text-xl mb-1">QR 스캔</h2>
      <p className="text-xs text-ink-soft mb-6">지점에 부착된 QR을 카메라 화면 안에 맞춰주세요.</p>

      <div className="w-40 h-40 bg-ink rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
        {status !== 'success' ? (
          <span className="text-white text-5xl opacity-80">▦</span>
        ) : (
          <span className="text-white text-lg">✓</span>
        )}
      </div>

      {status === 'idle' && (
        <button onClick={startScan} className="bg-stamp text-white px-6 py-3 rounded-full font-bold text-sm">
          카메라로 스캔 시작
        </button>
      )}

      {status === 'scanning' && <p className="text-sm text-ink-soft">인식하는 중...</p>}

      {status === 'success' && (
        <div className="bg-white border border-line rounded-xl p-5 w-full">
          <div className="font-bold text-sm mb-1">도장 획득!</div>
          <p className="text-xs text-ink-soft">청계천 지점 도장이 여권에 찍혔어요. 오늘도 한 걸음 더 걸으셨네요 🙌</p>
        </div>
      )}
    </div>
  )
}
