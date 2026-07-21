// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Lato',
      cssVariable: '--font-lato',
      weights: [300, 400, 700, 900],
      styles: ['normal', 'italic'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inconsolata',
      cssVariable: '--font-inconsolata',
      weights: ['200 900'],
      fallbacks: ['monospace'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
