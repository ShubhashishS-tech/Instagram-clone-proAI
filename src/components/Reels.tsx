import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart, MessageCircle, Send, MoreHorizontal, Music, Play, Volume2,
} from 'lucide-react';
import { timeAgo } from './Feed';

export default function Reels() {
  const { reels } = useApp();
  return (
    <div className="h-screen snap-y-mandatory overflow-y-auto no-scrollbar pb-14">
      {reels.map((r) => (
        <ReelCard key={r.id} reel={r} />
      ))}
    </div>
  );
}

function ReelCard({ reel }: { reel: ReturnType<typeof useApp>['reels'][number] }) {
  const { toggleLike, repost, pushToast } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(reel.liked);
  const [likes, setLikes] = useState(reel.likes);

  const onLike = () => {
    setLiked((l) => !l);
    setLikes((n) => (liked ? n - 1 : n + 1));
  };

  return (
    <section className="h-screen snap-start-always relative bg-black flex items-center justify-center overflow-hidden">
      <img src={reel.image} alt="reel" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Center play hint */}
      <div className="relative z-10 opacity-30">
        <Play size={80} strokeWidth={1} className="text-white fill-white" />
      </div>

      {/* Top bar */}
      <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-20">
        <span className="text-lg font-semibold text-white drop-shadow">Reels</span>
        <button aria-label="More">
          <MoreHorizontal size={24} strokeWidth={1.5} className="text-white" />
        </button>
      </div>

      {/* Right action menu */}
      <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-20">
        <div className="flex flex-col items-center">
          <button onClick={onLike} aria-label="Like">
            <Heart
              size={30}
              strokeWidth={1.5}
              className={liked ? 'text-red-500 fill-red-500' : 'text-white'}
            />
          </button>
          <span className="text-xs text-white mt-1 font-semibold">{formatCount(likes)}</span>
        </div>
        <div className="flex flex-col items-center">
          <button onClick={() => setShowComments((s) => !s)} aria-label="Comment">
            <MessageCircle size={30} strokeWidth={1.5} className="text-white" />
          </button>
          <span className="text-xs text-white mt-1 font-semibold">{reel.comments.length}</span>
        </div>
        <div className="flex flex-col items-center">
          <button
            onClick={() => { repost(reel.id); pushToast('Reposted reel'); }}
            aria-label="Share"
          >
            <Send size={30} strokeWidth={1.5} className="text-white" />
          </button>
          <span className="text-xs text-white mt-1 font-semibold">{reel.reposts}</span>
        </div>
        <button
          onClick={() => pushToast('Share sheet opened')}
          aria-label="Share sheet"
        >
          <MoreHorizontal size={30} strokeWidth={1.5} className="text-white rotate-90" />
        </button>
        {/* Rotating vinyl */}
        <div className="w-9 h-9 rounded-full bg-black border-2 border-white flex items-center justify-center animate-spin-slow">
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-24 left-3 right-20 z-20">
        <div className="flex items-center gap-2 mb-2">
          <img src={reel.avatar} alt={reel.username} className="w-8 h-8 rounded-full object-cover" />
          <span className="text-sm font-semibold text-white drop-shadow">{reel.username}</span>
          <button className="ml-1 border border-white/70 text-white text-xs font-semibold rounded px-2 py-0.5">
            Follow
          </button>
        </div>
        <p className="text-sm text-white drop-shadow mb-2">{reel.caption}</p>
        <div className="flex items-center gap-2 text-white text-xs drop-shadow">
          <Music size={14} strokeWidth={1.5} />
          <span className="truncate">{reel.audioTitle}</span>
        </div>
      </div>

      {/* Comments drawer */}
      {showComments && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#121212] border-t border-[#262626] rounded-t-2xl max-h-[55%] flex flex-col animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
            <span className="text-sm font-semibold text-white">Comments</span>
            <button onClick={() => setShowComments(false)} className="text-white text-sm">Close</button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-2">
            {reel.comments.length === 0 && (
              <p className="text-sm text-[#737373] text-center py-6">No comments yet</p>
            )}
            {reel.comments.map((c) => (
              <div key={c.id} className="flex gap-2 py-2">
                <img src={c.avatar} alt={c.username} className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <p className="text-sm text-white">
                    <span className="font-semibold">{c.username}</span> {c.text}
                  </p>
                  <p className="text-xs text-[#737373]">{timeAgo(c.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-2.5 border-t border-[#262626]">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment…"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-[#737373]"
            />
            <button
              onClick={() => { if (comment.trim()) { pushToast('Comment posted'); setComment(''); } }}
              disabled={!comment.trim()}
              className="text-sm font-semibold text-[#3897f0] disabled:opacity-40"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}
