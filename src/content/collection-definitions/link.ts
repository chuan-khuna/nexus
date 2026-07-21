import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One `.mdx` file per link (src/content/links/). Frontmatter drives the button;
// the MDX body renders as an optional description under it.
export const linksCollection = defineCollection({
  loader: glob({ base: 'src/content/links', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    label: z.string(),
    url: z.string().url(),
    icon: z.string().optional(), // Iconify id, e.g. "simple-icons:github"
    order: z.number().default(0), // ascending sort
  }),
});
