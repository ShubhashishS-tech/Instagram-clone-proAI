import { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Post } from '../lib/types';
import {
  Heart, MessageCircle, Send, MoreHorizontal, Bookmark, BadgeCheck, Plus,
} from 'lucide-react';

export default function Feed({ onOpenStory }: { onOpenStory: (i: number) => void }) {
  const { stories, session, posts } = useApp();

  return (
    <div>
      {/* Stories tray */}
      <div className="border-b border-[#262626] bg-black overflow-x-auto no-scrollbar">
        <div className="flex gap-4 px-3 py-3">
          {/* Your story */}
          <button className="flex flex-col items-center gap-1 shrink-0">
            <div className="relative">
              <div className="rounded-full p-0.5 bg-[#262626]">
                <img
                  src={session?.avatar}
                  alt="You"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 bg-[#0095f6] rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                <Plus size={12} strokeWidth={2.5} className="text-white" />
              </span>
            </div>
            <span className="text-xs text-[#f3f4f6]">Your story</span>
          </button>

          {stories.map((s, i) => (
            <button
              key={s.id}
              onClick={() => onOpenStory(i)}
              className="flex flex-col items-center gap-1 shrink-0"
            >
              <div className={s.viewed ? 'story-ring-viewed' : 'story-ring'}>
                <div className="bg-black rounded-full p-0.5">
                  <img src={s.avatar} alt={s.username} className="w-16 h-16 rounded-full object-cover" />
                </div>
              </div>
              <span className="text-xs text-[#f3f4f6] max-w-[68px] truncate">
                {s.username}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div>
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const { toggleLike, addComment, repost, pushToast } = useApp();
  const [showHeart, setShowHeart] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [saved, setSaved] = useState(false);
  const lastTap = useRef(0);

  const onImageTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      if (!post.liked) toggleLike(post.id);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
    lastTap.current = now;
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    addComment(post.id, comment.trim());
    setComment('');
  };

  return (
    <article className="border-b border-[#262626]">
      {/* Header */}
      <div className="flex items-center px-3 py-2.5">
        <div className="story-ring">
          <div className="bg-black rounded-full p-0.5">
            <img src={post.avatar} alt={post.username} className="w-8 h-8 rounded-full object-cover" />
          </div>
        </div>
        <div className="ml-2 flex-1">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-white">{post.username}</span>
            {post.userId === 'u_codesprint' && <BadgeCheck size={14} className="text-[#3897f0]" strokeWidth={1.5} />}
            <span className="text-xs text-[#737373]">• {timeAgo(post.createdAt)}</span>
          </div>
          {post.location && <p className="text-xs text-white">{post.location}</p>}
          {post.sponsored && <p className="text-xs text-[#737373]">Sponsored</p>}
        </div>
        <button className="text-white" aria-label="More">
          <MoreHorizontal size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* Image */}
      <div className="relative bg-black select-none" onClick={onImageTap}>
        <img src={post.image} alt="post" className="w-full aspect-square object-cover" />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart size={96} strokeWidth={1.5} className="text-white fill-white animate-heart-pop drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center px-3 pt-2.5 pb-1">
        <button onClick={() => toggleLike(post.id)} className="hover:opacity-60 transition" aria-label="Like">
          <Heart
            size={26}
            strokeWidth={1.5}
            className={post.liked ? 'text-red-500 fill-red-500' : 'text-white'}
          />
        </button>
        <button onClick={() => setShowComments((s) => !s)} className="ml-4 hover:opacity-60 transition" aria-label="Comment">
          <MessageCircle size={26} strokeWidth={1.5} className="text-white" />
        </button>
        <button
          onClick={() => pushToast('Share sheet opened')}
          className="ml-4 hover:opacity-60 transition"
          aria-label="Share"
        >
          <Send size={26} strokeWidth={1.5} className="text-white" />
        </button>
        <button
          onClick={() => { setSaved((s) => !s); pushToast(saved ? 'Removed from saved' : 'Saved'); }}
          className="ml-auto hover:opacity-60 transition"
          aria-label="Save"
        >
          <Bookmark size={26} strokeWidth={1.5} className={saved ? 'text-white fill-white' : 'text-white'} />
        </button>
      </div>

      {/* Repost bar */}
      <div className="flex items-center px-3 pb-1">
        <button
          onClick={() => repost(post.id)}
          className="flex items-center gap-1.5 text-xs text-[#737373] hover:text-white"
        >
          <Send size={14} strokeWidth={1.5} className="rotate-180" />
          <span>{post.reposts} reposts</span>
        </button>
      </div>

      {/* Likes + caption */}
      <div className="px-3 pb-2">
        <p className="text-sm font-semibold text-white">{post.likes.toLocaleString()} likes</p>
        <p className="text-sm text-white mt-1">
          <span className="font-semibold">{post.username}</span> {post.caption}
        </p>
        {post.comments.length > 0 && !showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="text-sm text-[#737373] mt-1"
          >
            View all {post.comments.length} comments
          </button>
        )}
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-3 pb-3 border-t border-[#1a1a1a] pt-2">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2 py-1.5">
              <img src={c.avatar} alt={c.username} className="w-7 h-7 rounded-full object-cover shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-white">
                  <span className="font-semibold">{c.username}</span> {c.text}
                </p>
                <p className="text-xs text-[#737373] mt-0.5">{timeAgo(c.createdAt)}</p>
              </div>
              <button className="text-[#737373] hover:text-red-500 self-start mt-1">
                <Heart size={12} strokeWidth={1.5} />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2 border-t border-[#1a1a1a] pt-2">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitComment()}
              placeholder="Add a comment…"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder-[#737373]"
            />
            <button
              onClick={submitComment}
              disabled={!comment.trim()}
              className="text-sm font-semibold text-[#3897f0] disabled:opacity-40"
            >
              Post
            </button>
          </div>
        </div>
      )}

      {!showComments && (
        <div className="flex items-center gap-2 px-3 pb-3 border-t border-[#1a1a1a] pt-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submitComment()}
            placeholder="Add a comment…"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-[#737373]"
          />
          <button
            onClick={submitComment}
            disabled={!comment.trim()}
            className="text-sm font-semibold text-[#3897f0] disabled:opacity-40"
          >
            Post
          </button>
        </div>
      )}
    </article>
  );
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}
