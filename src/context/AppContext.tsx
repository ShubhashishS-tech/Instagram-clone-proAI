import {
  createContext, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react';
import { load, save, uid } from '../lib/storage';
import {
  seedChats, seedNotifications, seedPosts, seedReels, seedStories, seedUsers,
} from '../lib/seed';
import type {
  Chat, ChatMessage, Comment, Notification, Post, Reel, Story, User,
} from '../lib/types';

interface SessionUser {
  id: string;
  email: string;
  username: string;
  handle: string;
  avatar: string;
  bio: string;
  onboarded: boolean;
  followers: number;
  following: number;
}

interface Toast {
  id: string;
  text: string;
}

interface AppState {
  session: SessionUser | null;
  users: User[];
  posts: Post[];
  stories: Story[];
  reels: Reel[];
  chats: Chat[];
  notifications: Notification[];
  toasts: Toast[];

  login: (email: string) => void;
  register: (email: string) => void;
  completeOnboarding: (handle: string, avatar: string, bio: string) => void;
  logout: () => void;

  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  repost: (postId: string) => void;
  addPost: (p: { image: string; caption: string; location?: string }) => void;
  addStory: (image: string) => void;
  addReel: (image: string, caption: string, audioTitle: string) => void;

  viewStory: (storyId: string) => void;

  sendMessage: (chatId: string, text: string) => void;
  markChatRead: (chatId: string) => void;

  markNotificationsRead: () => void;
  searchUsers: (q: string) => User[];

  pushToast: (text: string) => void;
  dismissToast: (id: string) => void;
}

const Ctx = createContext<AppState | null>(null);

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used within AppProvider');
  return v;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SessionUser | null>(() =>
    load<SessionUser | null>('session', null),
  );
  const [users] = useState<User[]>(() => load('users', seedUsers()));
  const [posts, setPosts] = useState<Post[]>(() => load('posts', seedPosts()));
  const [stories, setStories] = useState<Story[]>(() => load('stories', seedStories()));
  const [reels, setReels] = useState<Reel[]>(() => load('reels', seedReels()));
  const [chats, setChats] = useState<Chat[]>(() => load('chats', seedChats()));
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    load('notifications', seedNotifications()),
  );
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => save('session', session), [session]);
  useEffect(() => save('posts', posts), [posts]);
  useEffect(() => save('stories', stories), [stories]);
  useEffect(() => save('reels', reels), [reels]);
  useEffect(() => save('chats', chats), [chats]);
  useEffect(() => save('notifications', notifications), [notifications]);

  const pushToast = (text: string) => {
    const id = uid('t');
    setToasts((p) => [...p, { id, text }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 2200);
  };
  const dismissToast = (id: string) => setToasts((p) => p.filter((t) => t.id !== id));

  const login = (email: string) => {
    const existing = load<SessionUser | null>('session', null);
    if (existing && existing.email === email) {
      setSession(existing);
      return;
    }
    const id = uid('u');
    const s: SessionUser = {
      id, email, username: email.split('@')[0] || 'user',
      handle: email.split('@')[0] || 'user', avatar: '', bio: '', onboarded: false,
      followers: 0, following: 0,
    };
    setSession(s);
  };

  const register = (email: string) => login(email);

  const completeOnboarding = (handle: string, avatar: string, bio: string) => {
    setSession((s) => s ? { ...s, handle, username: handle, avatar, bio, onboarded: true } : s);
  };

  const logout = () => {
    setSession(null);
    save('session', null);
  };

  const toggleLike = (postId: string) => {
    setPosts((p) => p.map((x) =>
      x.id === postId
        ? { ...x, liked: !x.liked, likes: x.liked ? x.likes - 1 : x.likes + 1 }
        : x,
    ));
  };

  const addComment = (postId: string, text: string) => {
    if (!session) return;
    const c: Comment = {
      id: uid('c'), userId: session.id, username: session.handle,
      avatar: session.avatar, text, createdAt: Date.now(),
    };
    setPosts((p) => p.map((x) => x.id === postId ? { ...x, comments: [...x.comments, c] } : x));
  };

  const repost = (postId: string) => {
    if (!session) return;
    setPosts((p) => p.map((x) =>
      x.id === postId && x.repostedBy !== session.id
        ? { ...x, reposts: x.reposts + 1, repostedBy: session.id }
        : x,
    ));
    pushToast('Reposted to your profile');
  };

  const addPost = ({ image, caption, location }: { image: string; caption: string; location?: string }) => {
    if (!session) return;
    const p: Post = {
      id: uid('p'), userId: session.id, username: session.handle, avatar: session.avatar,
      location, image, caption, likes: 0, liked: false, reposts: 0,
      comments: [], createdAt: Date.now(),
    };
    setPosts((prev) => [p, ...prev]);
  };

  const addStory = (image: string) => {
    if (!session) return;
    const s: Story = {
      id: uid('s'), userId: session.id, username: session.handle,
      avatar: session.avatar, image, viewed: false, createdAt: Date.now(),
    };
    setStories((prev) => [s, ...prev]);
  };

  const addReel = (image: string, caption: string, audioTitle: string) => {
    if (!session) return;
    const r: Reel = {
      id: uid('r'), userId: session.id, username: session.handle, avatar: session.avatar,
      image, caption, audioTitle, likes: 0, liked: false, reposts: 0,
      comments: [], createdAt: Date.now(),
    };
    setReels((prev) => [r, ...prev]);
  };

  const viewStory = (storyId: string) => {
    setStories((s) => s.map((x) => x.id === storyId ? { ...x, viewed: true } : x));
  };

  const sendMessage = (chatId: string, text: string) => {
    if (!session) return;
    const msg: ChatMessage = { id: uid('m'), fromMe: true, text, createdAt: Date.now() };
    setChats((cs) => cs.map((c) => c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c));

    // Auto-reply after 1s with typing indicator handled in UI
    setTimeout(() => {
      const reply = generateAutoReply(text);
      const r: ChatMessage = { id: uid('m'), fromMe: false, text: reply, createdAt: Date.now() };
      setChats((cs) => cs.map((c) => c.id === chatId ? { ...c, messages: [...c.messages, r] } : c));
    }, 1400);
  };

  const markChatRead = (_chatId: string) => {};

  const markNotificationsRead = () => {
    setNotifications((n) => n.map((x) => ({ ...x, read: true })));
  };

  const searchUsers = (q: string) => {
    if (!q.trim()) return users;
    const lc = q.toLowerCase();
    return users.filter((u) =>
      u.handle.toLowerCase().includes(lc) || u.username.toLowerCase().includes(lc),
    );
  };

  const value: AppState = {
    session, users, posts, stories, reels, chats, notifications, toasts,
    login, register, completeOnboarding, logout,
    toggleLike, addComment, repost, addPost, addStory, addReel,
    viewStory, sendMessage, markChatRead, markNotificationsRead, searchUsers,
    pushToast, dismissToast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function generateAutoReply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('?')) return 'Good question — let me think on it and get back to you.';
  if (t.includes('hello') || t.includes('hi') || t.includes('hey')) return 'Hey! Great to hear from you 😊';
  if (t.includes('thanks') || t.includes('thank you')) return 'Anytime! Happy to help 🙌';
  if (t.includes('deploy') || t.includes('ship')) return 'Love that energy. Ship it and tag me when it is live!';
  if (t.includes('design')) return 'Design is everything. Send me a screenshot when ready!';
  if (t.includes('🔥') || t.includes('❤️')) return 'Right back at you 🔥';
  return 'Got it! Let me circle back on that shortly.';
}

export function smartReplies(lastMessage: string): string[] {
  const t = lastMessage.toLowerCase();
  if (t.includes('incredible') || t.includes('fire') || t.includes('🔥')) {
    return ['Thank you so much! 🙏', 'Appreciate it! Working hard on it 💪', 'Means a lot coming from you!'];
  }
  if (t.includes('help')) {
    return ['Could you walk me through it?', 'On it — sending details now', 'Thanks for the assist! 🙌'];
  }
  if (t.includes('?')) {
    return ['Great question!', 'Let me check and confirm', 'I think so, will verify'];
  }
  if (t.includes('welcome')) {
    return ['Excited to be here! 🎉', 'Thanks for having me!', 'Ready to dive in 🚀'];
  }
  return ['Sounds great! 👍', 'Let me get back to you', 'Totally agree with that'];
}
