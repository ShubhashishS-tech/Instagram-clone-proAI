import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings, Grid3x3, Film, Bookmark, LogOut, ChevronLeft, Plus, X,
  BadgeCheck, User as UserIcon,
} from 'lucide-react';

type Tab = 'grid' | 'reels' | 'saved';

export default function Profile({ onLogout }: { onLogout: () => void }) {
  const { session, posts, reels } = useApp();
  const [tab, setTab] = useState<Tab>('grid');
  const [showSettings, setShowSettings] = useState(false);

  if (!session) return null;

  const myPosts = posts.filter((p) => p.userId === session.id || p.repostedBy === session.id);
  const myReels = reels.filter((r) => r.userId === session.id);

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-14 border-b border-[#262626]">
        <div className="flex items-center gap-1.5">
          <span className="text-base font-semibold text-white">{session.handle}</span>
          <BadgeCheck size={16} className="text-[#3897f0]" strokeWidth={1.5} />
        </div>
        <button onClick={() => setShowSettings(true)} aria-label="Settings">
          <Settings size={24} strokeWidth={1.5} className="text-white" />
        </button>
      </header>

      {/* Stats */}
      <div className="flex items-center px-4 py-4 gap-6">
        <div className="story-ring">
          <div className="bg-black rounded-full p-0.5">
            <img src={session.avatar} alt={session.handle} className="w-20 h-20 rounded-full object-cover" />
          </div>
        </div>
        <div className="flex-1 flex justify-around">
          <Stat label="Posts" value={myPosts.length} />
          <Stat label="Followers" value={formatCount(session.followers)} />
          <Stat label="Following" value={formatCount(session.following)} />
        </div>
      </div>

      {/* Bio */}
      <div className="px-4 pb-3">
        <p className="text-sm font-semibold text-white">{session.username}</p>
        <p className="text-sm text-white whitespace-pre-line">{session.bio}</p>
      </div>

      {/* Edit / Share buttons */}
      <div className="flex gap-2 px-4 pb-3">
        <button className="flex-1 bg-[#262626] text-white text-sm font-semibold rounded-lg py-1.5 hover:bg-[#333]">
          Edit profile
        </button>
        <button className="flex-1 bg-[#262626] text-white text-sm font-semibold rounded-lg py-1.5 hover:bg-[#333]">
          Share profile
        </button>
        <button className="bg-[#262626] text-white rounded-lg px-3 py-1.5 hover:bg-[#333]">
          <Plus size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Highlights placeholder row */}
      <div className="flex gap-3 px-4 pb-3 overflow-x-auto no-scrollbar">
        {['New', 'Build', 'Travel', 'Team'].map((h) => (
          <div key={h} className="flex flex-col items-center gap-1 shrink-0">
            <div className="w-14 h-14 rounded-full border border-[#262626] flex items-center justify-center bg-[#121212]">
              <span className="text-xs text-[#737373]">{h[0]}</span>
            </div>
            <span className="text-xs text-white">{h}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-y border-[#262626]">
        <TabBtn icon={Grid3x3} active={tab === 'grid'} onClick={() => setTab('grid')} />
        <TabBtn icon={Film} active={tab === 'reels'} onClick={() => setTab('reels')} />
        <TabBtn icon={Bookmark} active={tab === 'saved'} onClick={() => setTab('saved')} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {tab === 'grid' && myPosts.map((p) => (
          <div key={p.id} className="aspect-square">
            <img src={p.image} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        {tab === 'reels' && myReels.map((r) => (
          <div key={r.id} className="aspect-[9/16] relative">
            <img src={r.image} alt="" className="w-full h-full object-cover" />
            <span className="absolute bottom-1 left-1 text-xs text-white drop-shadow">
              ▶ {formatCount(r.likes)}
            </span>
          </div>
        ))}
        {tab === 'saved' && (
          <div className="col-span-3 py-16 flex flex-col items-center text-[#737373]">
            <Bookmark size={40} strokeWidth={1} />
            <p className="text-sm mt-2">Saved</p>
            <p className="text-xs">Only you can see what you've saved</p>
          </div>
        )}
        {tab === 'grid' && myPosts.length === 0 && (
          <div className="col-span-3 py-16 flex flex-col items-center text-[#737373]">
            <UserIcon size={40} strokeWidth={1} />
            <p className="text-sm mt-2">No posts yet</p>
          </div>
        )}
        {tab === 'reels' && myReels.length === 0 && (
          <div className="col-span-3 py-16 flex flex-col items-center text-[#737373]">
            <Film size={40} strokeWidth={1} />
            <p className="text-sm mt-2">No reels yet</p>
          </div>
        )}
      </div>

      {/* Settings drawer */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end justify-center" onClick={() => setShowSettings(false)}>
          <div
            className="w-full max-w-[470px] bg-[#121212] border-t border-[#262626] rounded-t-2xl pb-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
              <button onClick={() => setShowSettings(false)} className="text-white">
                <ChevronLeft size={24} strokeWidth={1.5} />
              </button>
              <span className="text-sm font-semibold text-white">Settings</span>
              <span className="w-6" />
            </div>

            <div className="px-2 py-2">
              {[
                'Account', 'Privacy', 'Notifications', 'Theme', 'Help',
              ].map((s) => (
                <div key={s} className="flex items-center justify-between px-3 py-3.5 hover:bg-[#1a1a1a] rounded-lg">
                  <span className="text-sm text-white">{s}</span>
                  <ChevronLeft size={18} strokeWidth={1.5} className="text-[#737373] rotate-180" />
                </div>
              ))}
            </div>

            <div className="px-4 mt-2">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] border border-[#262626] text-red-500 text-sm font-semibold rounded-lg py-3 hover:bg-[#262626]"
              >
                <LogOut size={18} strokeWidth={1.5} />
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-base font-semibold text-white">{value}</span>
      <span className="text-xs text-[#f3f4f6]">{label}</span>
    </div>
  );
}

function TabBtn({
  icon: Icon, active, onClick,
}: { icon: typeof Grid3x3; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center py-3 border-b-2 ${
        active ? 'border-white text-white' : 'border-transparent text-[#737373]'
      }`}
    >
      <Icon size={22} strokeWidth={1.5} />
    </button>
  );
}

function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}
