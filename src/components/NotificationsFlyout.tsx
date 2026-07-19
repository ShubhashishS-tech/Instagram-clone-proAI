import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';
import { timeAgo } from './Feed';

export default function NotificationsFlyout({ onClose }: { onClose: () => void }) {
  const { notifications, markNotificationsRead } = useApp();

  useEffect(() => {
    const t = setTimeout(markNotificationsRead, 600);
    return () => clearTimeout(t);
  }, [markNotificationsRead]);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-[420px] bg-[#121212] border-l border-[#262626] h-full overflow-y-auto no-scrollbar animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-[#121212] border-b border-[#262626] flex items-center justify-between px-4 h-14">
          <h2 className="text-base font-semibold text-white">Notifications</h2>
          <button onClick={onClose} aria-label="Close">
            <X size={24} strokeWidth={1.5} className="text-white" />
          </button>
        </div>

        <div className="px-2 py-2">
          <p className="text-sm font-semibold text-white px-2 py-2">New</p>
          {notifications.filter((n) => !n.read).map((n) => (
            <NotifRow key={n.id} n={n} />
          ))}
          <p className="text-sm font-semibold text-white px-2 py-2 mt-2">Earlier</p>
          {notifications.filter((n) => n.read).map((n) => (
            <NotifRow key={n.id} n={n} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NotifRow({ n }: { n: ReturnType<typeof useApp>['notifications'][number] }) {
  return (
    <div className="flex items-center gap-3 px-2 py-2.5 hover:bg-[#1a1a1a] rounded-lg">
      <img src={n.avatar} alt={n.username} className="w-11 h-11 rounded-full object-cover" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <span className="font-semibold">{n.username}</span> {n.text}
        </p>
        <p className="text-xs text-[#737373] mt-0.5">{timeAgo(n.createdAt)}</p>
      </div>
      {n.type === 'follow' ? (
        <button className="bg-[#0095f6] text-white text-xs font-semibold rounded-lg px-4 py-1.5 hover:bg-[#1877f2]">
          Follow
        </button>
      ) : (
        <span className="text-[#737373] text-xs">•</span>
      )}
    </div>
  );
}
