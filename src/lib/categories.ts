/**
 * Blog categories are defined once here and used by the content schema,
 * category routes, navigation, and post layouts.
 */
export const BLOG_CATEGORIES = [
  {
    name: 'Thoughts',
    slug: 'thoughts',
    description: 'Essays, opinions, and ideas that are still taking shape.',
  },
  {
    name: 'Stories',
    slug: 'stories',
    description: 'Narratives and observations, usually with a beginning and an end.',
  },
  {
    name: 'Research Notes',
    slug: 'research-notes',
    description: 'Working notes from reading, experiments, and technical projects.',
  },
  {
    name: 'Life',
    slug: 'life',
    description: 'Personal updates, places, routines, and everything outside the lab.',
  },
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]['name'];

/** Tuple form required by Zod's enum validator. */
export const BLOG_CATEGORY_NAMES = BLOG_CATEGORIES.map((category) => category.name) as [
  BlogCategory,
  ...BlogCategory[],
];

export function categorySlug(name: BlogCategory): string {
  return BLOG_CATEGORIES.find((category) => category.name === name)?.slug ?? 'thoughts';
}
