import type {
  User, Post, Story, Reel, Chat, Notification,
} from './types';

export const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=256&h=256&crop=faces&q=80',
  'https://images.unsplash.com/photo-1490150028299-bf57d78394e0?auto=format&fit=crop&w=256&h=256&crop=faces&q=80',
  'https://images.unsplash.com/photo-1589525231707-f2de2428f59c?auto=format&fit=crop&w=256&h=256&crop=faces&q=80',
  'https://images.unsplash.com/photo-1532170579297-281918c8ae72?auto=format&fit=crop&w=256&h=256&crop=faces&q=80',
  'https://images.unsplash.com/photo-1486649567693-aaa9b2e59385?auto=format&fit=crop&w=256&h=256&crop=faces&q=80',
  'https://images.unsplash.com/photo-1581182800629-7d90925ad072?auto=format&fit=crop&w=256&h=256&crop=faces&q=80',
];

// Curated Unsplash tech/design imagery (stable URLs)
const GRID_IMAGES = [
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
];

export const PRESET_LAYOUTS = GRID_IMAGES.slice(0, 4);

const REEL_IMAGES = [
  'https://images.unsplash.com/photo-1550745165-9bc0b452705b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
];

export function seedUsers(): User[] {
  return [
    { id: 'u_gunjaan', username: 'Gunjaan Madaan', handle: 'gunjaan_madaan', avatar: AVATAR_OPTIONS[0], bio: 'Builder • Hackathons • AI', followers: 12400, following: 312, isOnline: true, verified: true },
    { id: 'u_vedam', username: 'Vedam Support', handle: 'vedam_tech', avatar: AVATAR_OPTIONS[3], bio: 'Official Vedam support', followers: 89200, following: 12, isOnline: true, verified: true },
    { id: 'u_jess', username: 'Jess Codes', handle: 'jess_codes', avatar: AVATAR_OPTIONS[1], bio: 'Full-stack dev • TypeScript', followers: 5400, following: 421, isOnline: true },
    { id: 'u_codesprint', username: 'CodeSprint Bot', handle: 'codesprint_bot', avatar: AVATAR_OPTIONS[5], bio: 'Automated • 24/7', followers: 210000, following: 0, isOnline: true, verified: true },
    { id: 'u_sophia', username: 'Sophia Martinez', handle: 'sophia_m', avatar: AVATAR_OPTIONS[2], bio: 'Product designer', followers: 9800, following: 233, isOnline: false },
  ];
}

export function seedPosts(): Post[] {
  const now = Date.now();
  return [
    {
      id: 'p1', userId: 'u_gunjaan', username: 'gunjaan_madaan', avatar: AVATAR_OPTIONS[0],
      location: 'San Francisco, CA', image: GRID_IMAGES[0],
      caption: 'Late-night build sessions hit different. Shipping the prototype tomorrow. 🚀',
      likes: 1284, liked: false, reposts: 42, createdAt: now - 3600_000,
      comments: [
        { id: 'c1', userId: 'u_jess', username: 'jess_codes', avatar: AVATAR_OPTIONS[1], text: 'This UI is clean 🔥', createdAt: now - 3000_000 },
        { id: 'c2', userId: 'u_sophia', username: 'sophia_m', avatar: AVATAR_OPTIONS[2], text: 'What stack are you using?', createdAt: now - 2800_000 },
      ],
    },
    {
      id: 'p2', userId: 'u_vedam', username: 'vedam_tech', avatar: AVATAR_OPTIONS[3],
      sponsored: true, image: GRID_IMAGES[1],
      caption: 'Sponsored • Build faster with Vedam Cloud. Deploy in seconds, scale infinitely.',
      likes: 5210, liked: false, reposts: 88, createdAt: now - 7200_000,
      comments: [
        { id: 'c3', userId: 'u_codesprint', username: 'codesprint_bot', avatar: AVATAR_OPTIONS[5], text: 'Trying this today!', createdAt: now - 6000_000 },
      ],
    },
    {
      id: 'p3', userId: 'u_jess', username: 'jess_codes', avatar: AVATAR_OPTIONS[1],
      location: 'Berlin', image: GRID_IMAGES[3],
      caption: 'Refactored the whole auth flow today. TypeScript generics are a superpower.',
      likes: 642, liked: false, reposts: 14, createdAt: now - 14400_000,
      comments: [],
    },
    {
      id: 'p4', userId: 'u_sophia', username: 'sophia_m', avatar: AVATAR_OPTIONS[2],
      location: 'Lisbon', image: GRID_IMAGES[5],
      caption: 'New design system drop. Soft shadows, deep contrast, intentional spacing.',
      likes: 2310, liked: false, reposts: 56, createdAt: now - 28800_000,
      comments: [
        { id: 'c4', userId: 'u_gunjaan', username: 'gunjaan_madaan', avatar: AVATAR_OPTIONS[0], text: 'Saving this for reference 👏', createdAt: now - 20000_000 },
      ],
    },
  ];
}

export function seedStories(): Story[] {
  return [
    { id: 's1', userId: 'u_gunjaan', username: 'gunjaan_madaan', avatar: AVATAR_OPTIONS[0], image: GRID_IMAGES[2], viewed: false, createdAt: Date.now() - 3600_000 },
    { id: 's2', userId: 'u_vedam', username: 'vedam_tech', avatar: AVATAR_OPTIONS[3], image: GRID_IMAGES[6], viewed: false, createdAt: Date.now() - 5400_000 },
    { id: 's3', userId: 'u_jess', username: 'jess_codes', avatar: AVATAR_OPTIONS[1], image: GRID_IMAGES[8], viewed: false, createdAt: Date.now() - 7200_000 },
    { id: 's4', userId: 'u_codesprint', username: 'codesprint_bot', avatar: AVATAR_OPTIONS[5], image: GRID_IMAGES[10], viewed: false, createdAt: Date.now() - 9000_000 },
  ];
}

export function seedReels(): Reel[] {
  const now = Date.now();
  return [
    {
      id: 'r1', userId: 'u_gunjaan', username: 'gunjaan_madaan', avatar: AVATAR_OPTIONS[0],
      image: REEL_IMAGES[0], caption: 'POV: your deploy just worked on the first try ✨',
      audioTitle: 'Lo-fi Beats — chillhop', likes: 18900, liked: false, reposts: 220, createdAt: now - 3600_000,
      comments: [
        { id: 'rc1', userId: 'u_jess', username: 'jess_codes', avatar: AVATAR_OPTIONS[1], text: 'Never happens to me 😭', createdAt: now - 3000_000 },
      ],
    },
    {
      id: 'r2', userId: 'u_jess', username: 'jess_codes', avatar: AVATAR_OPTIONS[1],
      image: REEL_IMAGES[1], caption: '60-second TypeScript crash course ⚡',
      audioTitle: 'Synthwave — nightdrive', likes: 8700, liked: false, reposts: 134, createdAt: now - 7200_000,
      comments: [],
    },
    {
      id: 'r3', userId: 'u_sophia', username: 'sophia_m', avatar: AVATAR_OPTIONS[2],
      image: REEL_IMAGES[2], caption: 'Designing a dark mode that actually looks good 🖤',
      audioTitle: 'Ambient — focus flow', likes: 14200, liked: false, reposts: 98, createdAt: now - 10800_000,
      comments: [],
    },
  ];
}

export function seedChats(): Chat[] {
  const now = Date.now();
  return [
    {
      id: 'ch1', name: 'Gunjaan Madaan', handle: 'gunjaan_madaan', avatar: AVATAR_OPTIONS[0], online: true,
      messages: [
        { id: 'm1', fromMe: false, text: 'Hey! Just saw your latest commit 👀', createdAt: now - 7200_000 },
        { id: 'm2', fromMe: true, text: 'Yeah, finally refactored the state layer', createdAt: now - 7000_000 },
        { id: 'm3', fromMe: false, text: 'Your hackathon prototype looks incredible! 🔥', createdAt: now - 600_000 },
      ],
    },
    {
      id: 'ch2', name: 'Vedam Support', handle: 'vedam_tech', avatar: AVATAR_OPTIONS[3], online: true,
      messages: [
        { id: 'm4', fromMe: false, text: 'Welcome to Vedam Cloud! How can we help?', createdAt: now - 14400_000 },
        { id: 'm5', fromMe: true, text: 'Quick question about edge functions', createdAt: now - 14000_000 },
        { id: 'm6', fromMe: false, text: 'Let us know if you need help presenting.', createdAt: now - 800_000 },
      ],
    },
    {
      id: 'ch3', name: 'CodeSprint Bot', handle: 'codesprint_bot', avatar: AVATAR_OPTIONS[5], online: true,
      messages: [
        { id: 'm7', fromMe: false, text: 'Sprint #14 starts in 2 hours. Ready?', createdAt: now - 21600_000 },
        { id: 'm8', fromMe: false, text: 'Welcome to the final dashboard! 🙌', createdAt: now - 400_000 },
      ],
    },
    {
      id: 'ch4', name: 'Sophia Martinez', handle: 'sophia_m', avatar: AVATAR_OPTIONS[2], online: false,
      messages: [
        { id: 'm9', fromMe: true, text: 'Loved your latest design system post', createdAt: now - 28800_000 },
        { id: 'm10', fromMe: false, text: 'The dark mode configuration looks spectacular!', createdAt: now - 1200_000 },
      ],
    },
  ];
}

export function seedNotifications(): Notification[] {
  const now = Date.now();
  return [
    { id: 'n1', type: 'like', username: 'gunjaan_madaan', avatar: AVATAR_OPTIONS[0], text: 'liked your post', createdAt: now - 600_000, read: false },
    { id: 'n2', type: 'follow', username: 'vedam_tech', avatar: AVATAR_OPTIONS[3], text: 'requested to follow you', createdAt: now - 3600_000, read: false },
    { id: 'n3', type: 'reel_comment', username: 'jess_codes', avatar: AVATAR_OPTIONS[1], text: 'and 2 others commented on your reel', createdAt: now - 7200_000, read: true },
    { id: 'n4', type: 'like', username: 'sophia_m', avatar: AVATAR_OPTIONS[2], text: 'liked your post', createdAt: now - 14400_000, read: true },
    { id: 'n5', type: 'comment', username: 'codesprint_bot', avatar: AVATAR_OPTIONS[5], text: 'commented: "This is fire 🔥"', createdAt: now - 28800_000, read: true },
  ];
}
