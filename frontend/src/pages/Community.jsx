import { useState } from 'react'

// TODO: GET /api/posts 로 피드 목록을 가져오고, POST /api/posts 로 새 글 등록
const INITIAL_POSTS = [
  {
    id: 1,
    user: '지우',
    time: '10분 전',
    badge: '📍 홍제천 산책로',
    text: '후문에서 나가서 홍제천 따라 걸으면 계단 하나 없이 청계천 방향까지 이어져요. 오늘 5번째 도장 찍었어요 🎉',
    likes: 12,
  },
  {
    id: 2,
    user: '민서',
    time: '42분 전',
    badge: '📍 부암동 카페거리',
    text: '부암동 골목 카페들 조용하고 뷰도 좋아서 시험기간 스트레스 풀기 딱이에요. 스탬프 인증하면 할인도 돼요!',
    likes: 8,
  },
  {
    id: 3,
    user: '하늘',
    time: '1시간 전',
    badge: '📍 경복궁',
    text: '오늘 드디어 스탬프 8개 다 모아서 배민 쿠폰 받았어요! 수뭉이 NFC 키링도 다음에 노려볼래요 🔮',
    likes: 21,
  },
]

export default function Community() {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [liked, setLiked] = useState({})
  const [draft, setDraft] = useState('')

  function toggleLike(id) {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function submitPost() {
    if (!draft.trim()) return
    setPosts((prev) => [
      { id: Date.now(), user: '나', time: '방금', badge: null, text: draft, likes: 0 },
      ...prev,
    ])
    setDraft('')
  }

  return (
    <div className="pb-4">
      <div className="px-5 pt-4 pb-2">
        <h2 className="font-display text-xl mb-1">동행 커뮤니티</h2>
        <p className="text-xs text-ink-soft mb-3">경사로 우회 팁이나 오늘의 발견을 나눠보세요.</p>
      </div>

      <div className="mx-5 mb-3 flex items-center gap-2 bg-white border border-line rounded-full pl-4 pr-1.5 py-1.5">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="오늘의 팁을 공유해보세요..."
          className="flex-1 text-xs outline-none bg-transparent"
        />
        <button onClick={submitPost} className="w-8 h-8 rounded-full bg-stamp text-white text-sm">
          +
        </button>
      </div>

      <div className="space-y-3 px-5">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-line rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-pine text-white text-[11px] flex items-center justify-center font-bold">
                {post.user[0]}
              </div>
              <span className="text-xs font-semibold">{post.user}</span>
              <span className="text-[10.5px] text-ink-soft ml-auto">{post.time}</span>
            </div>
            {post.badge && (
              <span className="inline-block text-[10px] bg-paper-dark text-pine px-2 py-0.5 rounded-full mb-2 font-semibold">
                {post.badge}
              </span>
            )}
            <p className="text-xs leading-relaxed mb-2">{post.text}</p>
            <div className="flex gap-3 text-[11.5px] text-ink-soft">
              <span
                onClick={() => toggleLike(post.id)}
                className={`cursor-pointer select-none ${liked[post.id] ? 'text-stamp font-bold' : ''}`}
              >
                👍 좋아요 {post.likes + (liked[post.id] ? 1 : 0)}
              </span>
              <span>💬 댓글</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
