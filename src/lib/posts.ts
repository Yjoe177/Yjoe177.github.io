import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

interface PostQuery {
  /** In development, drafts are shown so they can be previewed. */
  includeDrafts?: boolean;
}

/**
 * Deterministic ordering:
 * 1. Explicit `order` values first, ascending.
 * 2. Then actual publication dates, newest first.
 * 3. Then undated posts by id.
 *
 * Cards and article headers may show `displayDate` even when no `pubDate`
 * exists, but `displayDate` is never treated as a publication timestamp.
 */
function comparePosts(a: BlogPost, b: BlogPost): number {
  const aOrder = a.data.order;
  const bOrder = b.data.order;

  if (aOrder !== undefined || bOrder !== undefined) {
    if (aOrder === undefined) return 1;
    if (bOrder === undefined) return -1;
    if (aOrder !== bOrder) return aOrder - bOrder;
  }

  const aTime = a.data.pubDate?.getTime();
  const bTime = b.data.pubDate?.getTime();

  if (aTime !== undefined && bTime !== undefined && aTime !== bTime) {
    return bTime - aTime;
  }
  if (aTime !== undefined && bTime === undefined) return -1;
  if (aTime === undefined && bTime !== undefined) return 1;

  return a.id.localeCompare(b.id);
}

/**
 * Returns posts in deterministic reading order. Production pages call this
 * without overrides so drafts disappear automatically from the index, routes,
 * and RSS. Files beginning with "_" are repository templates, never content.
 */
export async function getPosts({
  includeDrafts = import.meta.env.DEV,
}: PostQuery = {}): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data, id }) => {
    if (id.startsWith('_')) return false;
    if (!includeDrafts && data.draft) return false;
    return true;
  });

  return posts.sort(comparePosts);
}

/** Visible date: a meaningful display date first, then actual publication date. */
export function getPostDisplayDate(post: BlogPost): Date | undefined {
  return post.data.displayDate ?? post.data.pubDate;
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
