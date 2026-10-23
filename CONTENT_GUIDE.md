# Content Guide

This website keeps content separate from the components that display it. Most
updates are edits to Markdown or one small TypeScript data file — you should not
need to touch layouts or CSS to publish a post, project, or update.

## Ground rules

1. **Only publish confirmed information.** Do not add guessed dates, metrics,
   awards, publications, titles, or profile URLs.
2. **Use honest empty states and hidden sections instead of guesses.** Where a
   detail is missing, leave it out or mark it clearly. Empty is better than
   invented.
3. **Keep claims verifiable.** For research, report results only when they have
   been measured and can be reproduced. Descriptive, hedged language is fine.
4. **Use plain text content.** No page builder, database, or CMS is involved.
5. **Run `npm run check` and `npm run build` after edits.**

## Content map

| Content | Location |
| --- | --- |
| Between the Lines posts | `src/content/blog/*.{md,mdx}` |
| Writing starter templates (not built) | `src/content/_examples/blog/` |
| Research projects | `src/content/research/*.{md,mdx}` |
| Publications | `src/content/publications/*.{md,mdx}` |
| News items | `src/data/news.ts` |
| Education, research experience, awards, activities, skills | `src/data/profile.ts` |
| Name, bio, email, navigation, interests | `src/config/site.ts` |
| Writing-space title and introduction | `src/config/writing.ts` |
| Academic external links | `src/config/academic.ts` |
| Research CV PDF | `public/cv/youssef-amr-research-cv.pdf` |
| Industry resume PDF | `public/cv/youssef-amr-industry-resume.pdf` |
| Web portrait | `public/images/youssef-amr.jpg` |
| Original photo source | `Youssef.jpg` (local only, gitignored) |
| Research/blog cover images | `public/images/research/`, `public/images/blog/` |
| Social sharing card | `public/images/og-default.svg` + `.png` |

Content files are loaded by **Astro content collections**, validated against the
schemas in `src/content.config.ts`, and rendered by dynamic routes. Adding a file
adds a page automatically.

---

## Between the Lines posts

The personal writing space is titled **Between the Lines** but keeps the
`/blog/` URL and the existing Astro content collection. There are **no
categories** and no category filtering. Every published piece appears in one
deterministic reading order.

### Create a post

1. Add a file in `src/content/blog/`, for example
   `src/content/blog/on-attention.md` or `.mdx`.
2. Use a lowercase, hyphenated filename. The filename becomes the URL:
   `on-attention.md` → `/blog/on-attention/`.
3. Add frontmatter and write the body in Markdown or MDX.
4. Run `npm run dev` and open `/blog/`.

### Frontmatter reference

```yaml
---
title: 'On Attention'
description: 'A short summary that appears in the index, RSS, and search results.'
# pubDate: 2026-11-01          # optional actual publication timestamp
# displayDate: 2026-07-17      # optional visible date, not a publish timestamp
# order: 10                    # optional manual order, lower first
updatedDate: 2026-11-03        # optional
tags: ['Attention', 'Notes']  # optional keywords, not categories
draft: false                  # optional, defaults to false
cover: '/images/blog/my-cover.jpg' # optional
coverAlt: 'A description of the cover image' # required if cover is used
---
```

`category` is intentionally **not** part of the schema. Do not add one.

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Max 140 characters. |
| `description` | Yes | Max 320 characters. Used in cards, RSS, and SEO. |
| `pubDate` | No | Actual publication timestamp (`YYYY-MM-DD`). Used for sorting, RSS, and `article:published_time`/JSON-LD. Omit it when no real publication timestamp exists. |
| `displayDate` | No | A meaningful visible date such as a birthday (`YYYY-MM-DD`). It appears on cards and the article page but is **never** used as the publication timestamp in RSS or SEO. |
| `order` | No | Integer manual order; lower numbers appear first. Use it to preserve a deliberate sequence for undated pieces. |
| `updatedDate` | No | Shows an “Updated” label and can supply `dateModified`; it does not create a publication date. |
| `tags` | No | Optional free-form keywords; they do not create filters or categories. |
| `draft` | No | `true` hides the piece from production builds and RSS. |
| `cover` | No | Public path, e.g. `/images/blog/cover.jpg`. |
| `coverAlt` | If cover | Describe the image for screen readers. |

### Dates and ordering

- `pubDate` is the only field treated as an actual publication timestamp.
- `displayDate` is shown to readers but is not used in RSS or SEO metadata. It
  does not claim the piece was published on that day.
- Omit both fields for a completely undated piece. No artificial date is
  generated.
- Sorting is deterministic: explicit `order` first (ascending), then actual
  `pubDate` newest first, then entry ID.
- The four current posts use explicit `order` 1–4 to preserve their supplied
  sequence. *Through My 19th Year* is second and shows July 17, 2026 via
  `displayDate`; the other three have no date.
- To insert a piece at a specific position, give it an `order` value between
  neighboring posts.

### Drafts

- `draft: true` → visible at `http://localhost:4321` with a **Draft** badge.
- Production builds, the writing index, and RSS exclude drafts entirely.
- A draft's route is not generated in production.
- Remove the `draft` line, or set it to `false`, to publish.

### Starter templates

Four published pieces currently live in `src/content/blog/`. Three unloaded
templates remain outside the content collection in
`src/content/_examples/blog/`:

- `post-template.mdx` — an essay-style entry.
- `research-note-template.mdx` — demonstrates headings, callouts, code, tables,
  and the MDX `Callout` component.
- `draft-template.md` — shows the draft frontmatter pattern.

To use one, copy it into `src/content/blog/` with a lowercase, hyphenated
filename, replace the content, and remove `draft: true` when ready. The
`Callout` import path assumes the file is inside `src/content/blog/`.

`src/content/blog/_template.md` is a hidden schema template (filename starts
with `_`) and is never published. Do not give a real post a filename beginning
with an underscore.

### Listing, filters, and legacy category URLs

- `/blog/` is the only listing. It has no category filters or category cards.
- Every published piece shows its title and description. A date is shown only
  when `displayDate` or `pubDate` exists.
- The old `/blog/category/thoughts/`, `/stories/`, `/research-notes/`, and
  `/life/` URLs redirect to `/blog/` via `astro.config.mjs`.
- Do not recreate category routes or re-add a `category` field.

### Images and covers

- Put files in `public/images/blog/`.
- Reference them from the site root: `/images/blog/name.jpg`.
- Recommended cover size: **1200 × 600** (2:1), under roughly 300 KB.
- Provide meaningful `coverAlt` text. If the image is purely decorative, describe
  that briefly rather than leaving alt empty.
- Photos should be JPG/WebP/PNG. SVG is fine for diagrams.
- External image URLs are possible but make the site depend on another server.
  Prefer local files.

### MDX

Use `.mdx` when you need a component. The template post imports the callout
component:

```mdx
import Callout from '../../components/Callout.astro';

<Callout title="A note" tone="warning">
  Markdown and **formatting** work inside the component.
</Callout>
```

Standard Markdown is enough for most pieces. Avoid adding interactive
components unless they are genuinely necessary; Between the Lines is
intentionally static and fast.

### Links and formatting

- Internal links must be root-relative and include the trailing slash:
  `[TinySSM](/research/tinyssm-keyword-spotting/)`.
- External links are fine in Markdown and open in the same tab by default. Add
  HTML only if you need `target="_blank"`; most external links do not need it.
- Headings, lists, tables, blockquotes, inline code, and fenced code blocks are
  styled by `src/styles/global.css`.
- Tables scroll horizontally on very narrow screens instead of breaking the
  page layout.
- Code blocks use a dark theme in both light and dark site modes.

### Remove a post

Delete the Markdown file. Its route, index entry, and RSS item disappear on the
next build. If other pieces link to it, update those links.

---

## Research projects

### Create a project

Add `src/content/research/my-project.md` (or `.mdx`). The filename becomes
`/research/my-project/`.

```yaml
---
title: 'Project title'
description: 'One or two sentences for cards and metadata.'
status: 'ongoing'          # ongoing | completed | archived
period: 'Ongoing'          # optional display label; do not invent dates
featured: true             # show on the home page
order: 3                   # lower numbers appear first
topics:
  - TinyML
  - Edge AI
technologies:
  - Embedded inference
  - Model compression
results: []               # only verified, reproducible results
cover: '/images/research/my-project.svg'
coverAlt: 'Description of the diagram'
links:
  - label: 'Code'
    url: 'https://github.com/...'
  - label: 'Paper'
    url: 'https://doi.org/...'
draft: false
---
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Max 160 characters. |
| `description` | Yes | Max 360 characters; used on the card and detail header. |
| `status` | Yes | `ongoing`, `completed`, or `archived`. |
| `period` | No | Display text such as `Ongoing` or `2025–2026` once confirmed. |
| `featured` | No | Home page shows up to two featured projects. |
| `order` | No | Defaults to 100; lower first. |
| `topics` | No | Short conceptual labels. |
| `technologies` | No | Methods, tools, or approaches (shown as “Approaches”). |
| `results` | No | Array of verified result statements; empty by default. |
| `cover` | No | Public image path. Recommended 1200 × 750 (16:10). |
| `coverAlt` | If cover | Describe the image. |
| `links` | No | `label` + absolute `url`; rendered as buttons. |
| `draft` | No | Excluded from production pages. |

### Writing the body

The detail page renders the Markdown below the frontmatter. A useful structure:

```md
## Overview
## Motivation
## Approach
## Current status
## Open questions
```

Be explicit about uncertainty. “The project is exploratory” and “No benchmark
claims are published yet” are good sentences. Do not add performance numbers,
publication claims, or dates until they are confirmed.

### Research index and home page

- All non-draft projects appear at `/research/` in `order`.
- `featured: true` projects appear on the home page.
- If no projects are featured, the first projects are shown instead.
- The publications page also lists projects with `status: ongoing` under
  “Ongoing research”.

### Renaming a project

The filename is the URL. If you rename the file, update internal links in posts,
the home page, and any external links you have shared.

---

## Publications

Publication entries live in `src/content/publications/`. The collection is
intentionally empty of real entries and has **no confirmed publications**. A
hidden template file, `_template.md`, keeps the schema visible in the repo.

### Add a publication

1. Copy `src/content/publications/_template.md` to a real filename, e.g.
   `my-paper.md`.
2. Fill in confirmed metadata.
3. Remove `draft: true` (or set it to `false`).
4. Run the build and check `/publications/`.

```yaml
---
title: 'Paper title'
authors:
  - 'Youssef Amr'
  - 'Coauthor Name'
venue: 'Conference or journal name'
year: 2026
type: 'conference'   # journal | conference | workshop | preprint | thesis | other
status: 'published'  # published | forthcoming | preprint | ongoing
abstract: 'Optional abstract.'
links:
  - label: 'PDF'
    url: 'https://example.com/paper.pdf'
  - label: 'DOI'
    url: 'https://doi.org/10.0000/example'
note: 'Optional note, e.g. equal contribution.'
draft: false
---
```

### How entries are grouped

- **Published & forthcoming** — `status: published` or `forthcoming`.
- **Preprints & work in progress** — `status: preprint` or `ongoing`.
- **Ongoing research** — pulled from the research collection, not publications.

Files whose names start with `_` are ignored by `getPublications()` and never
render. Do not start a real publication filename with an underscore.

The body below the frontmatter is not currently rendered on the publications
page. Use the metadata fields. If you later want full publication detail pages,
add a route and a `PublicationEntry` link.

---

## News items

Edit `src/data/news.ts`:

```ts
export const news: NewsItem[] = [
  {
    date: '2026-11-01',
    text: 'Presented a poster at the lab retreat.',
    link: '/research/tinyssm-keyword-spotting/', // optional
    linkLabel: 'Project page',                    // optional
  },
];
```

- Newest items are sorted automatically and three appear on the home page.
- Keep entries factual and short.
- Internal links start with `/`; external links start with `https://`.
- Do not use unconfirmed announcements.

---

## Education, research experience, awards, and activities

Edit `src/data/profile.ts`.

### Education

```ts
export const education: EducationEntry[] = [
  {
    institution: 'Westlake University',
    institutionUrl: 'https://en.westlake.edu.cn/',
    degree: 'B.S. in Artificial Intelligence',
    location: 'Hangzhou, China',
    period: 'Aug 2025 – Jun 2029',
    details: ['2025–26 GPA: 3.787; full scholarship recipient.'],
  },
];
```

`institutionUrl` makes the university name clickable on About and the online CV.

### Research experience

```ts
export const researchExperience: ResearchExperienceEntry[] = [
  {
    title: 'Undergraduate Researcher',
    organization: 'ENCODE Lab',
    organizationUrl: 'https://westlake-encode-lab.github.io/',
    institution: 'Westlake University',
    institutionUrl: 'https://en.westlake.edu.cn/',
    supervisor: { name: 'Prof. Huan Wang', url: 'https://huanwang.tech/' },
    period: '2025 – Present',
    description: 'Factual project description.',
  },
];
```

Use `src/config/academic.ts` for shared academic URLs instead of repeating strings.
The supervisor and lab names are rendered as real links on About and CV.

### Awards, activities, service

```ts
export const awards: TimelineEntry[] = [
  {
    title: 'Award name',
    organization: 'Westlake University',
    organizationUrl: 'https://en.westlake.edu.cn/',
    period: '2026',
    description: 'One or two factual sentences.',
  },
];
```

The same shape applies to `activities` and `service`. Empty arrays are fine:
the About and CV pages show honest empty states. Optional `organizationUrl`
makes the organization name clickable.

Competitiveness statistics and grant amounts were intentionally omitted from
the current entries because the CV package notes that they should be verified
against award certificates. Add them only after confirmation.

### Skills

```ts
export const skillGroups: SkillGroup[] = [
  { title: 'ML & research', items: ['Python', 'PyTorch'] },
  { title: 'Systems', items: ['STM32', 'Git'] },
];
```

These appear on the CV page. Keep them consistent with the downloadable PDFs.

### Beyond research

The About page’s “Beyond research” paragraph introduces Between the Lines. Its
copy lives in `src/config/writing.ts` as `writingSpace.aboutNote`; edit it there.
There is no longer a personal-background placeholder object.

---

## Academic links

Shared academic destinations live in `src/config/academic.ts`:

```ts
export const academicLinks = {
  westlakeUniversity: { name: 'Westlake University', href: 'https://en.westlake.edu.cn/' },
  encodeLab: { name: 'ENCODE Lab', href: 'https://westlake-encode-lab.github.io/' },
  huanWang: { name: 'Prof. Huan Wang', href: 'https://huanwang.tech/' },
} as const;
```

Use these objects in components and data rather than hardcoding URLs. The
homepage, About, and online CV consume the same links. The downloadable CV PDFs
are unchanged and are generated separately from LaTeX.

---

## Identity, contact, CV, and portrait

All of this is in `src/config/site.ts`.

### Contact details

```ts
email: 'your-confirmed-address@westlake.edu.cn',
links: [
  { label: 'GitHub', href: 'https://github.com/your-handle', handle: '@your-handle' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/...', handle: '' },
],
```

- An empty `email` hides email links on Contact, footer, and CV.
- Links with `href: ''` are filtered out completely.
- Only add profiles you actually have. Do not add placeholder URLs that look
  real.
- `handle` is optional and used on the Contact page.

Current confirmed links: GitHub (`Yjoe177`), LinkedIn
(`youssef-amr-9b2541290`), and the Westlake academic email. Google Scholar,
ORCID, and X remain empty.

### CV

The CV page offers two downloads from `src/config/site.ts`:

```ts
cv: {
  updated: 'October 2026',
  downloads: [
    { label: 'Research CV', path: '/cv/youssef-amr-research-cv.pdf' },
    { label: 'Industry resume', path: '/cv/youssef-amr-industry-resume.pdf' },
  ],
},
```

1. Replace the relevant PDF in `public/cv/` when a new version is compiled.
2. Update `cv.updated`.
3. Keep `src/data/profile.ts` in sync with the PDF content.
4. Do not add a placeholder PDF as a downloadable CV.

The public PDFs were rebuilt from the LaTeX sources with the phone number
removed from the contact line. All other text is unchanged. The unredacted
originals are preserved privately in `private/cv/` (gitignored) and in the
original LaTeX package. Do not publish the private originals.

The CV page links only to the redacted public copies. If you update the CV,
rebuild redacted versions from the LaTeX source rather than editing the PDF
visually.

The `/cv/` page can also be printed to PDF from the browser as a fallback; its
print stylesheet hides navigation and chrome.

### Portrait

The web portrait is `public/images/youssef-amr.jpg` (800 × 1000, 4:5). It is
generated from the original `Youssef.jpg` at the project root:

```powershell
npm run portrait:generate
```

The original is deliberately gitignored and remains untouched locally. The
generation script crops with a face-centered composition verified by face
detection. If you replace the photo, update the crop in
`scripts/generate-portrait.mjs` and re-check that the face is not cut off.

### Talking about yourself

- `tagline` is the short sentence on the home hero.
- `bio.short` is the home-page introduction.
- `bio.long` is used on the About page.
- `researchInterests` appears as chips across the site.
- `researchThemes` powers the research directions grid.
- `nav` controls the header, mobile menu, and footer.

Keep the claims consistent with the rest of the site.

---

## Site URL and social preview

- Set the production URL in `astro.config.mjs` or via the `SITE_URL` environment
  variable. The configured production URL is `https://yjoe177.github.io/`.
- Canonical tags, Open Graph tags, the RSS feed, `robots.txt`, and the sitemap
  use this URL.
- The default social card is `public/images/og-default.png`. Edit the SVG in
  `public/images/og-default.svg`, then run `npm run og:generate`.
- Research and blog SVG covers are intentionally **not** used as Open Graph
  images, because social platforms are inconsistent about SVG. The default PNG
  card is used instead.

---

## Pre-publish checklist

- [ ] Confirm the GitHub repository is named `Yjoe177.github.io`.
- [ ] Confirm no `draft: true` content is meant to be public.
- [ ] Confirm the email and profile URLs are current.
- [ ] Confirm the two CV PDFs are the intended public versions.
- [ ] Confirm the two redacted CV PDFs open and do not contain a phone number.
- [ ] Confirm the portrait crop and alt text.
- [ ] Confirm only *Through My 19th Year* displays July 17, 2026.
- [ ] Confirm the other three posts display no date in the index, homepage, or article page.
- [ ] Confirm RSS/SEO do not treat `displayDate` as a publication timestamp.
- [ ] Confirm both public CVs use the new LinkedIn URL and no phone number.
- [ ] Verify every research claim and remove any unverified numbers.
- [ ] Add real publications only if they exist; leave `_template.md` hidden.
- [ ] Run `npm run check` (0 errors).
- [ ] Run `npm run build` (all routes generated).
- [ ] Run `npm run preview` and check the production output, including:
      - `/`, `/research/`, both project pages
      - `/publications/`, `/blog/` (the single writing index)
      - `/about/`, `/cv/`, `/contact/`, `/rss.xml`, `/robots.txt`, `/404.html`
- [ ] Confirm drafts and templates are absent from the production build.
- [ ] Confirm old category URLs redirect to `/blog/`.
- [ ] Confirm internal links, PDFs, the portrait, and images return 200.
- [ ] Check light and dark mode, desktop and a narrow phone width.
- [ ] Confirm both CV PDFs open.
- [ ] Push to `main` and enable GitHub Pages (GitHub Actions).
- [ ] Do not commit secrets, `.env` files, `node_modules/`, or `opencode.jsonc`.

---

## Troubleshooting

**The build fails with a content schema error.**
Check the exact field names and types in `src/content.config.ts`. Dates must be
`YYYY-MM-DD`; `tags` and `authors` must be arrays; `year` must be a number.
Writing entries must not include a `category` field.

**A draft does not appear in the built site.**
That is intentional. Drafts only appear during `npm run dev`.

**A draft appears in RSS.**
RSS always excludes drafts, regardless of environment. Template files outside
`src/content/blog/` are never loaded, and files beginning with `_` are filtered
out.

**The publications page is empty.**
Only the hidden `_template.md` exists. Add a real publication or copy the
template. A benign loader warning appears if the folder has no files at all;
the hidden template prevents that.

**An old category URL is missing.**
The four former category URLs are configured to redirect to `/blog/` in
`astro.config.mjs`. Do not add new category routes.

**An image is broken.**
Use a path starting with `/images/...` and confirm the file exists under
`public/`. Paths are case-sensitive on GitHub Pages even if Windows is not.

**A link 404s.**
Internal links should end with `/` and match the generated route, for example
`/blog/my-post/`. Renaming a content file changes its URL.

**`npm` is blocked by PowerShell.**
Use `npm.cmd run dev` / `npm.cmd run build`, or allow local scripts with
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

**Port 4321 is in use.**
Run `npm run dev -- --port 4322` or stop the other process.

**The canonical URL is `https://yjoe177.github.io/`.**
That is the configured production URL, including in local preview. Override
`SITE_URL` if you build for a different domain.

---

## Writing style

- Prefer precise, calm prose over marketing language.
- Use sentence case for headings.
- Explain the question and the reasoning, not only the result.
- Use “ongoing” and “exploratory” honestly.
- Keep paragraphs short enough to read on a phone.
- Link to sources rather than repeating claims without context.
- Use Between the Lines for unfinished ideas; use research pages for structured
  project records.
