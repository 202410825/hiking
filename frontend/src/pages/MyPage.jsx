// TODO: 카카오 로그인 연동 후 실제 사용자 정보(GET /api/users/me)로 교체

export default function MyPage() {
  return (
    <div className="pb-4">
      <div className="px-5 pt-4 pb-2">
        <h2 className="font-display text-xl">마이페이지</h2>
      </div>

      <div className="mx-5 mb-4 bg-pine text-white rounded-2xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-mustard flex items-center justify-center text-xl">🎒</div>
        <div>
          <div className="font-bold text-sm">지우 님</div>
          <div className="text-[11px] opacity-85 mt-0.5">카카오 계정으로 로그인됨</div>
        </div>
      </div>

      <div className="mx-5 mb-4 grid grid-cols-3 gap-2.5">
        {[
          ['14', '누적 도장'],
          ['2', '받은 리워드'],
          ['6', '작성한 리뷰'],
        ].map(([num, label]) => (
          <div key={label} className="bg-white border border-line rounded-xl p-3 text-center">
            <div className="font-stamp text-lg text-stamp">{num}</div>
            <div className="text-[10.5px] text-ink-soft mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="px-5 mb-2 text-sm font-bold">보관함</div>

      <div className="mx-5 space-y-2.5">
        {[
          { name: '배달의민족 5,000원 쿠폰', sub: '8칸 도장 필요 · 3/8 진행중', tag: '진행중', style: 'bg-paper-dark text-ink-soft' },
          { name: '편의점 과자 교환권', sub: '사용 가능', tag: '사용하기', style: 'bg-mustard text-ink' },
          { name: '수뭉이 NFC 키링 (운세)', sub: '지난 시즌 · 사용 완료', tag: '완료', style: 'bg-paper-dark text-ink-soft' },
        ].map((r) => (
          <div key={r.name} className="bg-white border border-line rounded-xl px-4 py-3 flex justify-between items-center">
            <div>
              <div className="text-xs font-semibold">{r.name}</div>
              <div className="text-[10.5px] text-ink-soft mt-0.5">{r.sub}</div>
            </div>
            <span className={`text-[10.5px] px-2.5 py-1 rounded-full font-bold ${r.style}`}>{r.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
