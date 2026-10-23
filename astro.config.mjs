import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Production site: https://yjoe177.github.io/ (GitHub Pages user site, root path).
// SITE_URL can still override this for local/preview deployments.
const site = process.env.SITE_URL ?? 'https://yjoe177.github.io/';

export default defineConfig({
  site,
  // Astro 7 defaults to JSX whitespace handling. HTML-aware compression keeps
  // spaces between inline elements predictable in this mostly-static site.
  compressHTML: true,
  integrations: [mdx(), sitemap()],
  // The unified writing space has no categories. Preserve old category URLs.
  redirects: {
    '/blog/category': '/blog/',
    '/blog/category/thoughts': '/blog/',
    '/blog/category/stories': '/blog/',
    '/blog/category/research-notes': '/blog/',
    '/blog/category/life': '/blog/',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
