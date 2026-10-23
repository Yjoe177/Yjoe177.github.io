/**
 * Short news items for the home page.
 *
 * Keep entries factual and dated. Add a new item at the top. `link` is optional
 * and should be an internal path or a full external URL.
 */

export interface NewsItem {
  date: string;
  text: string;
  link?: string;
  linkLabel?: string;
}

export const news: NewsItem[] = [
  {
    date: '2026-10-23',
    text: 'This personal website is now live at yjoe177.github.io, with research pages, Between the Lines, and the CV.',
  },
];
