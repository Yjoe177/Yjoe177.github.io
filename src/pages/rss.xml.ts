import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { siteConfig } from '../config/site';
import { writingSpace } from '../config/writing';
import { getPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPosts({ includeDrafts: false });

  return rss({
    title: `${siteConfig.name} — ${writingSpace.title}`,
    description: writingSpace.description,
    site: context.site ?? new URL('https://yjoe177.github.io/'),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-US</language><copyright>© ${new Date().getUTCFullYear()} ${siteConfig.name}</copyright>`,
  });
}
