export interface User {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  isOnline?: boolean;
  verified?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  location?: string;
  sponsored?: boolean;
  image: string;
  caption: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  reposts: number;
  repostedBy?: string; // current user id who reposted
  createdAt: number;
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  image: string;
  viewed: boolean;
  createdAt: number;
}

export interface Reel {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  audioTitle: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  reposts: number;
  createdAt: number;
}

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  text: string;
  createdAt: number;
}

export interface Chat {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  online: boolean;
  messages: ChatMessage[];
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'reel_comment';
  username: string;
  avatar: string;
  text: string;
  createdAt: number;
  read: boolean;
}
