// Site-wide profile + social links (not an Astro collection — imported directly).
// Profile seeded from the digital-garden-2024 portfolio; fill in real social URLs.
export const site = {
  name: 'ALTR',
  nickname: 'Chuan',
  fullName: 'Phattharanat Khunakornophat',
  tagline: 'I take an avid interest in data science and data visualisation.',
  intros: [
    '💻 Data Scientist | Developer',
    '📊 Data visualisation enthusiast',
    '🌱 Digital Gardener',
  ],
  avatar: '/lucy.jpg', // in public/
  url: 'https://nexus.altrf.dev',
  socials: [
    { label: 'GitHub', url: 'https://github.com/chuan-khuna', icon: 'simple-icons:github' },
    { label: 'X', url: 'https://x.com/', icon: 'simple-icons:x' }, // TODO: add handle
    { label: 'LinkedIn', url: 'https://linkedin.com/in/', icon: 'simple-icons:linkedin' }, // TODO
    { label: 'Email', url: 'mailto:you@example.com', icon: 'lucide:mail' }, // TODO
  ],
} as const;
