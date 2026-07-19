import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { X } from 'lucide-react';

export default function StoryViewer({
  startIndex, onClose,
}: { startIndex: number; onClose: () => void }) {
  const { stories, viewStory } = useApp();
  const [index, setIndex] = useState(startIndex);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    if (stories[index]) viewStory(stories[index].id);
    setProgressKey((k) => k + 1);
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const t = setTimeout(() => {
      if (index < stories.length - 1) setIndex((i) => i + 1);
      else onClose();
    }, 5000);
    return () => clearTimeout(t);
  }, [index, progressKey, stories.length, onClose]);

  if (!stories[index]) return null;
  const s = stories[index];

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <img src={s.image} alt="story" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Progress bars */}
      <div className="absolute top-2 left-2 right-2 flex gap-1">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            {i < index && <div className="h-full w-full bg-white" />}
            {i === index && (
              <div key={progressKey} className="h-full bg-white story-progress-bar" />
            )}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-6 left-3 right-3 flex items-center gap-2">
        <img src={s.avatar} alt={s.username} className="w-8 h-8 rounded-full object-cover" />
        <span className="text-sm font-semibold text-white drop-shadow">{s.username}</span>
        <span className="text-xs text-white/70">2h</span>
        <button onClick={onClose} className="ml-auto text-white" aria-label="Close">
          <X size={26} strokeWidth={1.5} />
        </button>
      </div>

      {/* Tap zones */}
      <button
        className="absolute left-0 top-0 bottom-0 w-1/3"
        onClick={() => index > 0 && setIndex((i) => i - 1)}
        aria-label="Previous"
      />
      <button
        className="absolute right-0 top-0 bottom-0 w-1/3"
        onClick={() => index < stories.length - 1 ? setIndex((i) => i + 1) : onClose()}
        aria-label="Next"
      />

      {/* Reply bar */}
      <div className="absolute bottom-6 left-3 right-3">
        <div className="flex items-center gap-2 border border-white/40 rounded-full px-4 py-2.5 bg-black/30 backdrop-blur">
          <input
            placeholder={`Reply to ${s.username}…`}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/70"
          />
          <span className="text-white/80 text-xs">❤️</span>
          <span className="text-white/80 text-xs">📨</span>
        </div>
      </div>
    </div>
  );
}
