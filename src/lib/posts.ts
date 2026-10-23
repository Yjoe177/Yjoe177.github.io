import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

interface PostQuery {
  /** In development, drafts are shown so they can be previewed. */
  includeDrafts?: boolean;
}

/**
 * Returns posts newest first. Production pages call this without overrides so
 * drafts disappear automatically from calendar pages, routes, and RSS.
 * Files beginning with "_" are repository templates, never site content.
 */
export async function getPosts({
  includeDrafts = import.meta.env.DEV,
}: PostQuery = {}): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data, id }) => {
    if (id.startsWith('_')) return false;
    if (!includeDrafts && data.draft) return false;
    return true;
  });

  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Word-count estimate at roughly 200 words per minute. */
export function readingTime(body: string | undefined): number {
  const text = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|=-]/g, ' ');

  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Groups posts by publication year, preserving newest-first order. */
export function groupByYear(posts: BlogPost[]): Array<{ year: number; posts: BlogPost[] }> {
  const groups = new Map<number, BlogPost[]>();
  for (const post of posts) {
    const year = post.data.pubDate.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()].map(([year, entries]) => ({ year, posts: entries }));
}
