import { useState } from 'react';
import { useApp } from './context/AppContext';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import LogoutScreen from './components/LogoutScreen';
import Feed from './components/Feed';
import Explore from './components/Explore';
import Reels from './components/Reels';
import CreatorStudio from './components/CreatorStudio';
import Profile from './components/Profile';
import DirectMessages from './components/DirectMessages';
import StoryViewer from './components/StoryViewer';
import NotificationsFlyout from './components/NotificationsFlyout';
import { InstagramWordmark } from './components/BrandIcons';
import {
  Home, Search, PlusSquare, Film, User, Heart, MessageCircle,
} from 'lucide-react';

export type Tab = 'home' | 'explore' | 'reels' | 'create' | 'profile' | 'dm';

export default function App() {
  const { session } = useApp();
  const [tab, setTab] = useState<Tab>('home');
  const [showLogout, setShowLogout] = useState(false);
  const [storyIndex, setStoryIndex] = useState<number | null>(null);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showDm, setShowDm] = useState(false);

  if (!session) return <Login />;
  if (showLogout) {
    return (
      <LogoutScreen
        onDone={() => {
          setShowLogout(false);
          setTab('home');
        }}
      />
    );
  }
  if (!session.onboarded) return <Onboarding />;

  const openStory = (i: number) => setStoryIndex(i);

  return (
    <div className="min-h-screen bg-black text-[#f3f4f6]">
      <div className="mx-auto max-w-[470px] min-h-screen bg-black relative">
        {/* Top bar (hidden on reels & dm) */}
        {tab !== 'reels' && tab !== 'dm' && (
          <header className="sticky top-0 z-30 bg-black border-b border-[#262626] flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-3">
              {tab === 'home' ? (
                <InstagramWordmark className="w-28 h-8 text-white" />
              ) : (
                <button onClick={() => setTab('home')} aria-label="Back">
                  <InstagramWordmark className="w-28 h-8 text-white" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => setShowNotifs(true)} className="hover:opacity-60 transition" aria-label="Notifications">
                <Heart size={24} strokeWidth={1.5} />
              </button>
              <button onClick={() => setShowDm(true)} className="hover:opacity-60 transition" aria-label="Direct messages">
                <MessageCircle size={24} strokeWidth={1.5} />
              </button>
            </div>
          </header>
        )}

        {/* Tab content */}
        <main className={tab === 'reels' ? '' : 'pb-20'}>
          {tab === 'home' && <Feed onOpenStory={openStory} />}
          {tab === 'explore' && <Explore />}
          {tab === 'reels' && <Reels />}
          {tab === 'create' && (
            <CreatorStudio onDone={() => setTab('home')} />
          )}
          {tab === 'profile' && <Profile onLogout={() => setShowLogout(true)} />}
        </main>

        {/* Overlays */}
        {storyIndex !== null && (
          <StoryViewer startIndex={storyIndex} onClose={() => setStoryIndex(null)} />
        )}
        {showNotifs && <NotificationsFlyout onClose={() => setShowNotifs(false)} />}
        {showDm && <DirectMessages onClose={() => setShowDm(false)} />}

        {/* Bottom nav (always present) */}
        <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[470px] border-t border-[#262626] flex items-center justify-around h-14 z-40 ${
          tab === 'reels' ? 'bg-black/90 backdrop-blur' : 'bg-black'
        }`}>
          <NavBtn icon={Home} active={tab === 'home'} onClick={() => setTab('home')} />
          <NavBtn icon={Search} active={tab === 'explore'} onClick={() => setTab('explore')} />
          <NavBtn icon={PlusSquare} active={tab === 'create'} onClick={() => setTab('create')} />
          <NavBtn icon={Film} active={tab === 'reels'} onClick={() => setTab('reels')} />
          <NavBtn icon={User} active={tab === 'profile'} onClick={() => setTab('profile')} />
        </nav>

        {/* Toasts */}
        <ToastHost />
      </div>
    </div>
  );
}

function NavBtn({
  icon: Icon, active, onClick,
}: { icon: typeof Home; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-2" aria-label="nav">
      <Icon
        size={26}
        strokeWidth={1.5}
        className={active ? 'fill-white text-white' : 'text-white hover:opacity-60'}
      />
    </button>
  );
}

function ToastHost() {
  const { toasts } = useApp();
  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-toast-in bg-[#262626] text-white text-sm px-4 py-2.5 rounded-lg shadow-lg border border-[#404040]"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
