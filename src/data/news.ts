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
    text: 'This personal website is being prepared for launch at yjoe177.github.io. Research pages, the journal, and the CV are being finalized.',
  },
];
