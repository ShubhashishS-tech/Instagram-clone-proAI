import { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { PRESET_LAYOUTS } from '../lib/seed';
import {
  X, Image as ImageIcon, Film, Square, Sparkles, Share, Upload, Search,
} from 'lucide-react';

type Mode = 'post' | 'story' | 'reel';
type Category = 'Tech' | 'Travel' | 'Lifestyle';

export default function CreatorStudio({ onDone }: { onDone: () => void }) {
  const { addPost, addStory, addReel, pushToast } = useApp();
  const [mode, setMode] = useState<Mode>('post');
  const [image, setImage] = useState<string>(PRESET_LAYOUTS[0]);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<Category>('Tech');
  const [keyword, setKeyword] = useState('');
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(f);
  };

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const { caption: c, hashtags } = aiCaption(category, keyword);
      setCaption(`${c}\n\n${hashtags.join(' ')}`);
      setGenerating(false);
      pushToast('AI caption generated ✨');
    }, 900);
  };

  const share = () => {
    if (mode === 'post') addPost({ image, caption });
    else if (mode === 'story') addStory(image);
    else addReel(image, caption, 'AI Generated — Original Audio');
    pushToast(`${mode === 'post' ? 'Post' : mode === 'story' ? 'Story' : 'Reel'} shared!`);
    onDone();
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="flex items-center justify-between px-4 h-14 border-b border-[#262626]">
        <button onClick={onDone} aria-label="Cancel">
          <X size={24} strokeWidth={1.5} className="text-white" />
        </button>
        <h2 className="text-base font-semibold text-white">Create</h2>
        <button onClick={share} className="text-sm font-semibold text-[#3897f0]">
          Share
        </button>
      </header>

      {/* Mode tabs */}
      <div className="flex justify-center gap-2 py-3 px-4">
        {(['post', 'story', 'reel'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold capitalize ${
              mode === m ? 'bg-white text-black' : 'bg-[#121212] text-white border border-[#262626]'
            }`}
          >
            {m === 'post' && <Square size={14} strokeWidth={1.5} />}
            {m === 'story' && <ImageIcon size={14} strokeWidth={1.5} />}
            {m === 'reel' && <Film size={14} strokeWidth={1.5} />}
            {m}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="px-4">
        <div className={`relative bg-[#121212] border border-[#262626] rounded-xl overflow-hidden ${mode === 'reel' ? 'aspect-[9/16] max-w-[280px] mx-auto' : 'aspect-square'}`}>
          <img src={image} alt="preview" className="w-full h-full object-cover" />
        </div>

        {/* Upload */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 bg-[#121212] border border-[#262626] rounded-lg py-2.5 text-sm text-white hover:bg-[#1a1a1a]"
          >
            <Upload size={16} strokeWidth={1.5} />
            Upload
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
        </div>

        {/* Presets */}
        <p className="text-xs text-[#737373] mt-4 mb-2">Or pick a preset layout</p>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_LAYOUTS.map((url, i) => (
            <button
              key={i}
              onClick={() => setImage(url)}
              className={`aspect-square rounded-md overflow-hidden border-2 ${
                image === url ? 'border-[#0095f6]' : 'border-transparent'
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* AI Caption Generator */}
        <div className="mt-5 bg-[#121212] border border-[#262626] rounded-xl p-3">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} strokeWidth={1.5} className="text-[#3897f0]" />
            <span className="text-sm font-semibold text-white">AI Caption Writer</span>
          </div>

          <div className="flex gap-2 mb-2">
            {(['Tech', 'Travel', 'Lifestyle'] as Category[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  category === c ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white border border-[#262626]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 mb-2">
            <Search size={14} strokeWidth={1.5} className="text-[#737373]" />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Keywords (e.g. hackathon, dark mode)"
              className="flex-1 bg-transparent text-sm text-white outline-none px-2 placeholder-[#737373]"
            />
          </div>

          <button
            onClick={generate}
            disabled={generating}
            className="w-full bg-[#0095f6] text-white text-sm font-semibold rounded-lg py-2 hover:bg-[#1877f2] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <Sparkles size={16} strokeWidth={1.5} className={generating ? 'animate-spin-fast' : ''} />
            {generating ? 'Generating…' : 'AI Generate'}
          </button>
        </div>

        {/* Caption box */}
        <div className="mt-4">
          <label className="text-xs text-[#737373]">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            placeholder="Write a caption…"
            className="w-full bg-[#121212] border border-[#262626] rounded-lg mt-1 px-3 py-2.5 text-sm text-white outline-none focus:border-[#737373]"
          />
        </div>

        <button
          onClick={share}
          className="w-full mt-4 bg-[#0095f6] text-white text-sm font-semibold rounded-lg py-2.5 hover:bg-[#1877f2] flex items-center justify-center gap-2"
        >
          <Share size={16} strokeWidth={1.5} />
          Share to {mode === 'post' ? 'Feed' : mode === 'story' ? 'Story' : 'Reels'}
        </button>
      </div>
    </div>
  );
}

function aiCaption(category: Category, keyword: string): { caption: string; hashtags: string[] } {
  const k = keyword.trim();
  const base: Record<Category, { caption: string; hashtags: string[] }> = {
    Tech: {
      caption: `Just shipped something I am proud of${k ? ` — ${k}` : ''}. Late nights, clean code, and a UI that finally feels right. The future is being built one commit at a time.`,
      hashtags: ['#tech', '#buildinpublic', '#coding', '#developer', '#startup'],
    },
    Travel: {
      caption: `Chasing horizons and collecting moments${k ? ` in ${k}` : ''}. Sometimes the best plan is no plan at all — just a bag, a camera, and curiosity.`,
      hashtags: ['#travel', '#wanderlust', '#explore', '#adventure', '#travelgram'],
    },
    Lifestyle: {
      caption: `Slow mornings, intentional spaces, and a little extra time for the things that matter${k ? ` — ${k}` : ''}. This is the version of life I want to keep building.`,
      hashtags: ['#lifestyle', '#mindfulness', '#dailyvibes', '#aesthetic', '#selfcare'],
    },
  };
  return base[category];
}
