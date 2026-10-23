import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config/site';
import { getPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts({ includeDrafts: false });

  return rss({
    title: `${siteConfig.name} — Journal`,
    description:
      'Essays, stories, research notes, and personal writing by Youssef Amr.',
    site: context.site ?? new URL('https://yjoe177.github.io/'),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>en-US</language><copyright>© ${new Date().getUTCFullYear()} ${siteConfig.name}</copyright>`,
  });
}
