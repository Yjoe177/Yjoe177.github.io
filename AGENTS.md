# AGENTS.md — Working on Youssef Amr's website

This file is for future AI coding agents and human maintainers. Read it before
changing architecture, content models, or deployment settings. For day-to-day
content edits, use **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** instead. The
**[FACTS_NEEDED.md](FACTS_NEEDED.md)** file tracks unconfirmed owner facts and
assets; do not fill those gaps with guesses.

## Mission and non-negotiables

Build and maintain a fast, accessible, static academic and personal website for
**Youssef Amr**, an AI undergraduate at Westlake University.

1. **Never invent facts.** Do not add publications, awards, dates, metrics,
   titles, affiliations, or social URLs that the owner has not confirmed.
2. **Use honest empty states and hide unfinished sections.** Do not fill missing
   details with plausible guesses.
3. **Do not publish, push, or deploy without explicit authorization.** Local
   builds, previews, and tests are fine.
4. **Preserve unrelated existing files.** `opencode.jsonc` is the user's tool
   configuration; leave it alone.
5. **Keep dependencies minimal.** No React/Vue/Svelte, no CSS framework, no
   database, no backend, no analytics unless explicitly requested.
6. **Content stays separate from presentation.** New posts/projects belong in
   content collections, not hardcoded into pages.
7. **Static output only.** The site must build to plain files in `dist/`.

## Stack

| Piece | Version / choice |
| --- | --- |
| Astro | `^7.4.2` (static output) |
| TypeScript | `^6.0.3` (strict Astro config) |
| Node | `>=22.23.4` (verified on Node 25.9; CI uses Node 24) |
| npm | `11.12.1` locally; Astro requires >=9.6.5 |
| MDX | `@astrojs/mdx` v8 |
| RSS | `@astrojs/rss` v4 |
| Sitemap | `@astrojs/sitemap` v3 |
| Fonts | Self-hosted Newsreader + Inter variable WOFF2 |
| CSS | Hand-written, one global stylesheet + small scoped styles |
| Testing | `astro check`, production build, headless Chrome checks |

Astro 7 specifics that matter:

- Content collections use the Content Layer API with `glob()` loaders.
- All collections are defined in `src/content.config.ts` (not
  `src/content/config.ts`).
- Import Zod from `astro/zod` with `defineCollection` from `astro:content`.
- The default Markdown processor is **Sätteri** (GFM + SmartyPants). Do not add
  remark/rehype plugins without reading the Astro 7 docs; they require
  `@astrojs/markdown-remark` and `unified()`.
- `compressHTML` is explicitly set to `true`. Astro 7's default (`'jsx'`) strips
  spaces between inline elements, which can break text rendering here. Keep it.
- The Rust compiler is strict about unclosed/invalid HTML. Close every
  non-void tag. Prefer explicit `</path>` in SVG over self-closing elements.
- `src/fetch.ts` is reserved for advanced routing in Astro 7. Do not create it.

## Commands

On this Windows machine, PowerShell may block `npm.ps1`. Use `npm.cmd` if
necessary.

```powershell
npm install          # or npm ci for a clean install
npm run dev          # http://localhost:4321
npm run check        # Astro + TypeScript + content schema diagnostics
npm run build        # static build to dist/
npm run preview      # preview the production build
npm run og:generate      # regenerate the social card PNG from SVG
npm run portrait:generate # regenerate the web portrait from Youssef.jpg
```

If the dev server port is taken: `npm run dev -- --port 4322`.

## Architecture

```text
public/                     Unprocessed assets, copied to dist/
├─ cv/                      Research CV + industry resume PDFs
├─ fonts/                   Self-hosted WOFF2 (do not add Google Fonts <link>)
├─ images/                  Portrait, OG card, research/blog covers
└─ .nojekyll                Keep _astro/ assets on GitHub Pages

src/
├─ components/              Reusable UI
│  ├─ Header.astro          Desktop nav + mobile <details> nav + theme toggle
│  ├─ NavLinks.astro        Shared nav links and active state
│  ├─ Footer.astro
│  ├─ ThemeToggle.astro     Client script; localStorage key `theme`
│  ├─ SEO.astro             Title, canonical, OG, Twitter, JSON-LD
│  ├─ SectionHeading.astro
│  ├─ ProjectCard.astro
│  ├─ PublicationEntry.astro
│  ├─ BlogIndex.astro       Uncategorized writing list + empty state
│  ├─ PostPreview.astro     Compact home-page writing item
│  ├─ NewsList.astro
│  ├─ Portrait.astro
│  ├─ StatusBadge.astro
│  ├─ TagList.astro
│  ├─ Icon.astro            Inline SVG icon set
│  ├─ PlaceholderNote.astro
│  └─ Callout.astro         Used from MDX
├─ config/site.ts           Identity, contact, nav, interests, flags
├─ config/writing.ts        Between the Lines title/copy/emoji
├─ config/academic.ts       Shared Westlake/ENCODE/Huan Wang links
├─ content.config.ts        Blog/research/publication schemas
├─ content/
│  ├─ blog/                 Published writing + hidden _template.md
│  ├─ research/             TinySSM + agentic MCU projects
│  ├─ publications/         Hidden _template.md; no real pubs yet
│  └─ _examples/            Unloaded blog + publication templates
├─ data/
│  ├─ news.ts               Home-page news items
│  └─ profile.ts            Education, experience, awards, activities, skills
├─ layouts/
│  ├─ BaseLayout.astro      <html>, theme script, header/footer, global CSS
│  ├─ PageLayout.astro      Inner page header + optional .writing-page wrapper
│  └─ BlogPostLayout.astro  Article header, cover, prose, tags, prev/next
├─ lib/
│  ├─ posts.ts              Draft-aware queries, dates, reading time
│  └─ research.ts           Research/publication queries, labels
├─ pages/
│  ├─ index.astro
│  ├─ research/index.astro
│  ├─ research/[...slug].astro
│  ├─ publications.astro
│  ├─ blog/index.astro      Between the Lines
│  ├─ blog/[...slug].astro
│  ├─ about.astro
│  ├─ cv.astro
│  ├─ contact.astro
│  ├─ 404.astro
│  ├─ rss.xml.ts
│  └─ robots.txt.ts
└─ styles/global.css        Tokens, reset, layout, components, prose, print
```

**Important header detail:** the desktop navigation is a normal `<nav>`; the
mobile menu is a separate `<nav>` inside a `<details>` disclosure. Both use
`NavLinks.astro`. This duplication is deliberate. A single closed `<details>`
cannot participate correctly in the desktop flex layout (it gives the nav a
zero-width box and causes overflow). Do not "simplify" this back to one
`<details>` wrapper without testing the header at 921–1440 px.

## Data and rendering flow

1. Markdown/MDX entries are loaded via `glob()` in `src/content.config.ts`.
2. Queries live in `src/lib/posts.ts` and `src/lib/research.ts`; pages do not
   call `getCollection()` directly except in helper modules.
3. Drafts:
   - `getPosts()` defaults to `includeDrafts = import.meta.env.DEV`.
   - Production pages pass `includeDrafts: false` indirectly (build has
     `DEV === false`).
   - RSS explicitly uses `includeDrafts: false`.
   - `getPosts()` also filters entry IDs beginning with `_` (hidden templates).
4. Dynamic routes use rest params (`[...slug]`) so custom nested IDs work.
5. Reading time is computed from the raw body, not stored in frontmatter.
6. Dates are optional:
   - `pubDate` is the only field treated as an actual publication timestamp; it
     feeds RSS and SEO when present.
   - `displayDate` is visible on cards/articles but is **not** a publication
     timestamp and must not be sent to RSS or `datePublished` metadata.
   - `order` is an optional manual sort key; lower values appear first.
   - Sorting: explicit `order`, then actual `pubDate` newest first, then entry
     ID. Undated posts never receive generated dates.
   - The four current posts use `order` 1–4; *Through My 19th Year* is second and
     shows July 17, 2026 via `displayDate`.
7. Publication files beginning with `_` are hidden templates. Keep the filter in
   `getPublications()` if the folder has no real entries.
8. Between the Lines uses the `/blog/` URL but has **no categories**. The blog
   schema intentionally omits a `category` field; do not add one. Old category
   URLs redirect to `/blog/` via `astro.config.mjs`.
9. Academic destinations are centralized in `src/config/academic.ts`; profile
   entries carry structured URL and supervisor links for About/CV rendering.

## Design system

`src/styles/global.css` is organized by section: fonts, tokens, reset, layout,
header, footer, home, cards, page headers, prose, Between the Lines, research,
publications, about, CV, contact, 404, responsive, motion, print.

- Use the CSS custom properties in `:root` and `[data-theme='dark']`.
- Do not hardcode colors in components when a token exists.
- Light palette is warm paper + teal; Between the Lines locally overrides
  `--accent` to a warm brown via `.writing-page`.
- Headings use Newsreader; UI/body use Inter. Blog prose switches to Newsreader.
- Code blocks stay dark in both themes for token legibility.
- Radii are restrained (3–8 px), shadows are subtle, motion is minimal.
- `prefers-reduced-motion` disables transitions.
- Print styles hide site chrome and the CV actions.
- Contrast pairs were verified at >=4.5:1 for body-sized text in both themes.
  Re-check if you change tokens. `--ink-muted` on `--bg-sunken` is close
  (4.79:1); keep it above 4.5.

## Accessibility requirements

- One `<h1>` per page; preserve heading order.
- Every image has appropriate `alt` text (decorative images may use `alt=""`).
- The skip link must remain the first focusable element.
- Nav toggle (`<summary>`) is keyboard accessible; the mobile nav is hidden when
  closed. Do not add focusable hidden content.
- Wide prose tables are wrapped by a small progressive-enhancement script in
  `BaseLayout.astro`; the wrapper receives `tabindex="0"` and `role="region"`
  only while it actually scrolls. Do not remove the CSS fallback: tables still
  scroll horizontally without JavaScript.
- Footer inline links are underlined so they are distinguishable from
  surrounding text without relying on color.
- Theme toggle updates `aria-label`, `title`, and `aria-pressed`.
- Focus styles use `:focus-visible` and must stay visible.
- Do not remove the inline theme script in `BaseLayout`; it prevents a flash of
  the wrong theme. The toggle stores the preference under `theme`.
- Check desktop and mobile, light and dark, with keyboard navigation.
- Avoid icon-only links without an accessible name.

## SEO requirements

- `Astro.site` / `SITE_URL` is configured as `https://yjoe177.github.io/`.
  Update it if the production URL changes.
- `SEO.astro` provides title, description, canonical, Open Graph, Twitter, and
  optional JSON-LD. Use it through layouts rather than writing meta tags in
  pages.
- The default social image is PNG at `/images/og-default.png`; regenerate it
  after editing the SVG with `npm run og:generate`. Do not point Open Graph at
  SVG content covers.
- `/rss.xml`, `/robots.txt`, and the sitemap derive from `Astro.site`.
- `public/.nojekyll` is required for GitHub Pages to serve `_astro/` when
  deploying build output directly.
- `private/` is gitignored and holds unredacted CV originals; never copy it into
  `public/`.
- `BaseLayout` preloads the two main font files. Keep the RSS autodiscovery link.

## Coding conventions

- TypeScript strict; type component props with `interface Props`.
- Prefer `.astro` components; there is no client framework.
- Keep scripts tiny and framework-free. Existing scripts: theme toggle, the
  scrollable-table enhancement, and the CV print button.
- Use `class:list` for conditional classes.
- Use `siteConfig` for identity/contact; do not duplicate the name or email.
- Use root-relative links ending in `/` for internal pages.
- Use semantic HTML (`header`, `nav`, `main`, `article`, `aside`, `time`, `dl`).
- Avoid inline `style` attributes; add classes to `global.css` or scoped styles.
- Avoid `!important` except for the deliberate code-block background override and
  print hiding rules.
- Content components should accept content as slots; don't hardcode copy in
  reusable cards.
- Close all tags; do not use `<>...</>` fragments in Astro templates (use a real
  element or a `<g>` wrapper in SVG).
- Prefer editing existing components over creating parallel ones.
- No new runtime dependencies without a clear reason. Dev-only tooling is
  preferable.

## Adding features safely

**New page:** add `src/pages/...astro`, use `PageLayout` or `BaseLayout`, include
one `h1`, add it to `siteConfig.nav` only if it belongs in primary navigation,
and verify the build route.

**New content field:** update the schema in `src/content.config.ts`, add the
field to existing entries (or a default), update the display component, run
`npm run check`, and document it in `CONTENT_GUIDE.md`. Zod defaults matter:
defaults must match the output type (Zod 4).

**New writing:** add a Markdown/MDX file under `src/content/blog/`. Do not add
a `category` field. `pubDate` and `displayDate` are optional; use `order` for a
manual sequence. Optional tags are keywords only; they do not create filters or
routes. Remove `draft` when ready and verify `/blog/` and RSS. Undated posts
must not receive invented dates in HTML, RSS, or SEO metadata.

**New academic link:** add it to `src/config/academic.ts`, then reference the
shared object from data/components. Do not duplicate external URLs.

**New icon:** add a name to the union and an explicit SVG element in
`Icon.astro`; keep `aria-hidden="true"`.

**New publication:** copy `src/content/publications/_template.md`, use a
non-underscore filename, remove `draft`, and verify the grouping on
`/publications/`.

**Changing the design:** update tokens first, then component classes. Verify
contrast in both themes and table/code overflow at 320 px. Do not introduce
heavy animations or a generic SaaS landing-page aesthetic.

## Verification workflow

Run after every meaningful change:

```powershell
npm run check
npm run build
```

A clean build currently generates 14 HTML pages (the four articles, 404, About,
Between the Lines, Contact, CV, Publications, Research index, 2 research
details, and Home) plus five legacy category redirect pages. No draft or
starter-template routes should appear. The loader warning for an empty
collection should not appear because hidden `_template.md` entries exist and are
filtered out.

Manual/automated checks performed for this revision:

- Production crawl of every route, PDF, font, and image: all expected 200s;
  unknown and draft routes 404.
- Responsive checks at 1440, 1025, 1024, 921, 768, 430, and 320: 42 checks,
  no page overflow and one `h1` per page.
- The longer “Between the Lines” label fits the desktop nav at 1025px and
  switches to the mobile menu at 1024px.
- Theme toggle persists to `localStorage`; mobile menu opens and closes.
- Old category URLs redirect to `/blog/` in a browser.
- Academic links resolve: Huan Wang, ENCODE Lab, Westlake University.
- Temporary published MDX + draft test: published article rendered, draft route
  and RSS item excluded, tags and reading time rendered, no category markup.
- Four supplied posts preserve their exact article-body hashes. Only
  *Through My 19th Year* shows July 17, 2026; the other three render without any
  visible date. RSS/SEO contain no `pubDate`/`datePublished` for them.
- The four posts are in supplied zip order via `order` 1–4; *Through My 19th
  Year* is second in Between the Lines and on the homepage preview.
- LinkedIn config and both public CV PDFs point to
  `https://www.linkedin.com/in/youssef-amr-9b2541290/`; the PDFs remain redacted
  and one-page A4.
- axe-core audit across representative pages, themes, and widths: 0 violations
  (28 checks).
- Portrait face detection confirms the cropped face is fully inside the frame
  with 26% headroom and 36–37% side margins.
- Both public CV PDFs are one page, A4, and contain no phone number in extracted
  text, metadata, annotations, or `tel:` links. Text matches the private
  originals except for the removed phone number.
- CV print media hides header/footer/actions; the sheet becomes white and
  borderless.

If you can, repeat the responsive/link checks with a headless browser. A
temporary Chrome DevTools Protocol script was used during development and is
not committed. At minimum, inspect the home page, a research detail, the blog
index, a post, publications, about, CV, and contact in light/dark at desktop and
phone widths.

## Deployment constraints

- Production URL: `https://yjoe177.github.io/`.
- Target repository: `https://github.com/Yjoe177/Yjoe177.github.io`.
- The site is configured for **root deployment** (a `<username>.github.io`
  user site or a custom domain). No `base` path is set.
- `.github/workflows/deploy.yml` uses `actions/checkout@v7`,
  `withastro/action@v6` with Node 24, and `actions/deploy-pages@v5`.
- The repository exists, `origin` points at it, and `main` tracks
  `origin/main`. The GitHub Actions build/deploy completed successfully.
- A dormant legacy `pages-build-deployment` workflow remains visible from
  before; the Astro deploy workflow is the one used for new commits.
- Deploying is a separate action. Push only with the owner's authorization.
- The untouched source photograph `Youssef.jpg` is gitignored; the optimized
  crop is committed at `public/images/youssef-amr.jpg`.

## Known limitations / intentional omissions

- The “Beyond research” section now introduces Between the Lines; there are no
  visible placeholder notes on the public pages.
- No publications are listed; the site says so explicitly.
- Between the Lines contains four posts. Dates are optional; only *Through My
  19th Year* shows July 17, 2026, via `displayDate`. No publication dates are
  invented for the other three. The empty state remains available when no posts
  are published.
- Legacy category URLs are static meta-refresh redirects to `/blog/`, not HTTP
  301s, because the site is fully static.
- Research project naming is unresolved: the site uses TinySSM and Agentic MCU
  Kernel Optimization while the current CV uses TinyMamba and Agentic TinyML.
  Do not rename without owner confirmation.
- The public CV PDFs are recompiled without the phone number. Unredacted
  originals are preserved privately in `private/cv/` (gitignored) and must not
  be published.
- Contact uses email/profile links only; there is no form or backend.
- No search, comments, analytics, newsletter, or CMS.
- RSS is valid and reflects the published writing order. Posts without
  `pubDate` appear without a generated item date.
- The social card is a static PNG and must be regenerated after branding
  changes.
- Only Latin font subsets are self-hosted. Add more subsets if non-Latin content
  is introduced.
- The site assumes English content and `lang="en"`.
- The GitHub repository rename/deployment is still pending.

## Definition of done

A change is done when:

1. `npm run check` reports 0 errors.
2. `npm run build` succeeds and expected routes exist.
3. Drafts are absent from the production output unless intentionally published.
4. No unverified facts, broken links, or missing images were introduced.
5. Desktop/mobile and light/dark layouts remain intact.
6. Relevant docs (`CONTENT_GUIDE.md`, `AGENTS.md`, `README.md`) are updated.
7. The user has been told what changed, what was tested, and what remains
   placeholder or unverified.
