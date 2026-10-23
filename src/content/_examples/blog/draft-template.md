---
title: A Draft in Progress
description: A template draft used to verify that unfinished writing appears locally but never in a production build.
pubDate: 2026-10-19
tags:
  - Draft
  - Template
draft: true
---

This template has `draft: true` in its frontmatter. It lives outside the
published collection so it cannot appear on the site.

While the development server is running it appears in Between the Lines with a
**Draft** label. When the site is built for production, the filter in
`src/lib/posts.ts` removes it from the index, its route, and the RSS feed.

Use drafts for writing that is not ready for readers. Remove the `draft` line â€”
or set it to `false` â€” when the entry is ready. See `CONTENT_GUIDE.md` for the
full workflow.
