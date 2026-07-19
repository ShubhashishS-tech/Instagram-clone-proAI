import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, BadgeCheck } from 'lucide-react';

const GRID = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b452705b?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcab5ba?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1535223289827-42a429c0fe8e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14fa8d5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1607799273242-2a14a0a0a9e3?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
];

export default function Explore() {
  const { searchUsers } = useApp();
  const [q, setQ] = useState('');

  const results = q.trim() ? searchUsers(q) : [];

  return (
    <div className="px-3 pt-3">
      {/* Search */}
      <div className="flex items-center bg-[#121212] border border-[#262626] rounded-lg px-3 py-2.5 mb-3 focus-within:border-[#737373]">
        <Search size={16} strokeWidth={1.5} className="text-[#737373]" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="flex-1 bg-transparent text-sm text-white outline-none px-2 placeholder-[#737373]"
        />
        {q && (
          <button onClick={() => setQ('')} aria-label="Clear">
            <X size={16} strokeWidth={1.5} className="text-[#737373]" />
          </button>
        )}
      </div>

      {/* User search results */}
      {results.length > 0 && (
        <div className="mb-4 space-y-2">
          {results.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#121212]">
              <img src={u.avatar} alt={u.username} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-white">{u.handle}</span>
                  {u.verified && <BadgeCheck size={14} className="text-[#3897f0]" strokeWidth={1.5} />}
                </div>
                <p className="text-xs text-[#737373]">{u.bio}</p>
              </div>
              <button className="text-sm font-semibold text-[#3897f0]">Follow</button>
            </div>
          ))}
        </div>
      )}

      {/* Masonry grid */}
      <div className="grid grid-cols-3 gap-0.5">
        {GRID.map((url, i) => {
          const big = i % 7 === 3;
          return (
            <div
              key={i}
              className={`relative overflow-hidden ${big ? 'row-span-2 col-span-2' : ''}`}
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover aspect-square"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
