// Site-wide profile (not an Astro collection — imported directly).
// Profile seeded from the digital-garden-2024 portfolio.
export const site = {
  name: 'ALTR',
  nickname: 'Chuan',
  firstName: 'Phattharanat',
  fullName: 'Phattharanat Khunakornophat',
  tagline: "An ordinary Data Scientist who loves SAWANO Hiroyuki's music",
  intros: [
    '💻 Data Scientist | Developer',
    '📊 I take an avid interest in data visualisation',
    '🌱 Digital Gardener',
    '🏓 Table Tennis',
    '🎹 Sawano Hiroyuki music enjoyer',
  ],
  avatar: '/lucy.jpg', // in public/
  github: 'https://github.com/chuan-khuna',
  timezone: 'Asia/Bangkok', // owner's timezone (for the "My time" card)
  url: 'https://nexus.altrf.dev',
} as const;
