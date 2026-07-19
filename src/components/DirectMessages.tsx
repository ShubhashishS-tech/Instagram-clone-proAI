import { useEffect, useRef, useState } from 'react';
import { useApp, smartReplies } from '../context/AppContext';
import {
  X, Send, ChevronLeft, Phone, Video, Info, Sparkles, Smile, Plus,
} from 'lucide-react';
import { timeAgo } from './Feed';

const EMOJIS = ['😀','😂','😍','🔥','👏','🙌','👍','❤️','🎉','🚀','✨','😎','🤔','💡','🎯','💯','👀','💪','🫶','😊'];

export default function DirectMessages({ onClose }: { onClose: () => void }) {
  const { chats } = useApp();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = chats.find((c) => c.id === activeId) || null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-fade-in">
      {active ? (
        <ChatThread chat={active} onBack={() => setActiveId(null)} />
      ) : (
        <>
          <header className="flex items-center justify-between px-4 h-14 border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white">{useApp().session?.handle}</h2>
            </div>
            <button onClick={onClose} aria-label="Close">
              <X size={24} strokeWidth={1.5} className="text-white" />
            </button>
          </header>

          <div className="px-4 py-3">
            <div className="bg-[#121212] rounded-lg px-3 py-2 flex items-center gap-2">
              <Plus size={18} strokeWidth={1.5} className="text-white" />
              <span className="text-sm text-white font-semibold">New message</span>
            </div>
          </div>

          <div className="px-3 pb-3">
            <p className="text-sm font-semibold text-white px-1 py-2">Messages</p>
            <div className="space-y-1">
              {chats.map((c) => {
                const last = c.messages[c.messages.length - 1];
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#121212] text-left"
                  >
                    <div className="relative">
                      <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-full object-cover" />
                      {c.online && (
                        <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-black" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{c.name}</p>
                      <p className="text-sm text-[#737373] truncate">
                        {last?.fromMe ? 'You: ' : ''}{last?.text} · {last ? timeAgo(last.createdAt) : ''}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ChatThread({ chat, onBack }: { chat: ReturnType<typeof useApp>['chats'][number]; onBack: () => void }) {
  const { sendMessage, chats } = useApp();
  const live = chats.find((c) => c.id === chat.id) || chat;
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [live.messages, typing]);

  const lastMsg = live.messages[live.messages.length - 1];
  const replies = lastMsg ? smartReplies(lastMsg.text) : ['Hey! 👋', 'How are you?', 'Great to connect'];

  const handleSend = (value: string) => {
    const v = value.trim();
    if (!v) return;
    sendMessage(live.id, v);
    setText('');
    setShowReplies(false);
    setTyping(true);
    setTimeout(() => setTyping(false), 1400);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center gap-3 px-3 h-14 border-b border-[#262626]">
        <button onClick={onBack} aria-label="Back">
          <ChevronLeft size={26} strokeWidth={1.5} className="text-white" />
        </button>
        <div className="relative">
          <img src={live.avatar} alt={live.name} className="w-8 h-8 rounded-full object-cover" />
          {live.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-black" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{live.name}</p>
          <p className="text-xs text-[#737373]">{live.online ? 'Active now' : 'Active 2h ago'}</p>
        </div>
        <Phone size={20} strokeWidth={1.5} className="text-white" />
        <Video size={22} strokeWidth={1.5} className="text-white" />
        <Info size={22} strokeWidth={1.5} className="text-white" />
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-4 space-y-2">
        <div className="flex flex-col items-center py-6">
          <img src={live.avatar} alt={live.name} className="w-16 h-16 rounded-full object-cover" />
          <p className="text-base font-semibold text-white mt-2">{live.name}</p>
          <p className="text-xs text-[#737373] mt-0.5">{live.handle} · Instagram</p>
        </div>

        {live.messages.map((m) => (
          <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm ${
                m.fromMe
                  ? 'bg-[#3797f0] text-white rounded-br-md'
                  : 'bg-[#262626] text-white rounded-bl-md'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-[#262626] px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
              <span className="typing-dot w-1.5 h-1.5 bg-[#737373] rounded-full" />
              <span className="typing-dot w-1.5 h-1.5 bg-[#737373] rounded-full" />
              <span className="typing-dot w-1.5 h-1.5 bg-[#737373] rounded-full" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Smart replies */}
      {showReplies && (
        <div className="px-3 py-2 border-t border-[#262626] flex gap-2 overflow-x-auto no-scrollbar animate-fade-in">
          {replies.map((r, i) => (
            <button
              key={i}
              onClick={() => handleSend(r)}
              className="shrink-0 bg-[#121212] border border-[#262626] text-sm text-white px-3 py-1.5 rounded-full hover:bg-[#1a1a1a]"
            >
              {r}
            </button>
          ))}
        </div>
      )}

      {/* Emoji drawer */}
      {showEmoji && (
        <div className="px-3 py-2 border-t border-[#262626] grid grid-cols-10 gap-1 animate-fade-in">
          {EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setText((t) => t + e)}
              className="text-xl p-1 hover:bg-[#1a1a1a] rounded"
            >
              {e}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <div className="px-3 py-2.5 border-t border-[#262626] flex items-center gap-2">
        <button
          onClick={() => setShowEmoji((s) => !s)}
          className="text-white"
          aria-label="Emoji"
        >
          <Smile size={26} strokeWidth={1.5} />
        </button>
        <div className="flex-1 flex items-center bg-[#121212] border border-[#262626] rounded-full px-3 py-2 focus-within:border-[#737373]">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(text)}
            placeholder="Message…"
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-[#737373]"
          />
          <button
            onClick={() => setShowReplies((s) => !s)}
            className={`ml-2 ${showReplies ? 'text-[#3897f0]' : 'text-white'}`}
            aria-label="AI Smart Reply"
            title="AI Smart Reply"
          >
            <Sparkles size={20} strokeWidth={1.5} />
          </button>
        </div>
        {text.trim() ? (
          <button onClick={() => handleSend(text)} className="text-[#3897f0]">
            <Send size={24} strokeWidth={1.5} />
          </button>
        ) : (
          <button onClick={() => handleSend('👍')} className="text-[#3897f0]">
            <Send size={24} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
