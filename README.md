# Youssef Amr — Academic & Writing Website

A fast, static personal website for **Youssef Amr**, AI undergraduate at
Westlake University. It combines an academic research profile with **Between
the Lines**, a personal writing space, built with Astro 7, TypeScript, content
collections, and hand-written CSS.

- **Production URL:** <https://yjoe177.github.io/>
- **Target repository:** <https://github.com/Yjoe177/Yjoe177.github.io>
- Research project pages with structured metadata
- Publication record separated from ongoing work
- Between the Lines: uncategorized writing, optional dates, manual ordering,
  drafts, covers, RSS
- Clickable academic links for Westlake University, ENCODE Lab, and Prof. Huan Wang
- CV page with two downloadable one-page A4 PDFs (phone number redacted)
- Featured photograph on Home and About
- Light/dark mode, responsive layout, keyboard-friendly navigation
- No client framework, no database, no backend

## Requirements

- **Node.js 22.23.4 or newer** (Astro 7 requirement)
- **npm 9.6.5 or newer**
- Git

This machine was verified with Node `25.9.0`, npm `11.12.1`, and Git `2.54.0`.
The deployment workflow pins Node `24`.

## Run locally

```powershell
npm install
npm run dev
```

Open the URL printed by Astro, normally
**http://localhost:4321/**.

> **PowerShell note:** if `npm` is blocked by the execution policy
> (`npm.ps1 cannot be loaded`), use `npm.cmd install`, `npm.cmd run dev`, etc.,
> or allow local scripts with
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

### Other commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with draft previews |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Type-check Astro files and content schemas |
| `npm run og:generate` | Regenerate the social sharing PNG from its SVG |
| `npm run portrait:generate` | Rebuild the web portrait from `Youssef.jpg` |

## Project structure

```text
.
├─ .github/workflows/deploy.yml  # GitHub Pages deployment
├─ public/
│  ├─ cv/                        # Redacted public CV + industry resume PDFs
│  ├─ fonts/                     # Self-hosted variable fonts + OFL license
│  ├─ images/                    # Portrait, research covers, social card
│  └─ .nojekyll                  # GitHub Pages: keep /_astro assets
├─ private/                      # Gitignored: unredacted CV originals
├─ scripts/                      # Portrait + OG image generators
├─ src/
│  ├─ components/                # Reusable UI (header, cards, lists, icons)
│  ├─ config/site.ts             # Identity, contact, navigation, interests
│  ├─ config/writing.ts          # Between the Lines title and introduction
│  ├─ config/academic.ts         # Shared academic external links
│  ├─ content/
│  │  ├─ blog/                   # Between the Lines entries + hidden template
│  │  ├─ research/               # Research projects (.md/.mdx)
│  │  ├─ publications/           # Publication entries (.md/.mdx)
│  │  └─ _examples/blog/         # Unloaded starter templates
│  ├─ content.config.ts          # Collection schemas
│  ├─ data/                      # News, education, awards, activities, skills
│  ├─ layouts/                   # Base, inner-page, and blog layouts
│  ├─ lib/                       # Content queries, dates, ordering
│  ├─ pages/                     # Routes (static output)
│  └─ styles/global.css          # Design tokens, components, prose, print
├─ CONTENT_GUIDE.md              # How to add/edit all content
├─ AGENTS.md                     # Architecture and maintenance for AI agents
├─ FACTS_NEEDED.md               # Remaining owner-supplied information
├─ THIRD_PARTY_NOTICES.md        # Font and asset credits
└─ astro.config.mjs              # Site URL, MDX, sitemap, syntax highlighting
```

## Editing content

Everything reader-facing is separated from the components.

| What | Where |
| --- | --- |
| Name, role, bio, email, profile links | `src/config/site.ts` |
| Between the Lines title and introduction | `src/config/writing.ts` |
| Academic external links | `src/config/academic.ts` |
| Between the Lines posts | `src/content/blog/` |
| Writing starter templates | `src/content/_examples/blog/` |
| Research projects | `src/content/research/` |
| Publications | `src/content/publications/` |
| News | `src/data/news.ts` |
| Education, research experience, awards, skills | `src/data/profile.ts` |
| Research CV PDF (public, redacted) | `public/cv/youssef-amr-research-cv.pdf` |
| Industry resume PDF (public, redacted) | `public/cv/youssef-amr-industry-resume.pdf` |
| Unredacted CV originals (private) | `private/cv/` (gitignored) |
| Web portrait | `public/images/youssef-amr.jpg` |
| Original photo source (local only) | `Youssef.jpg` (gitignored) |
| Social sharing image | `public/images/og-default.svg` → `.png` |

See **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** for field-by-field instructions,
draft behavior, the uncategorized writing workflow, and a pre-publish checklist.
The separate **[FACTS_NEEDED.md](FACTS_NEEDED.md)** lists every unconfirmed fact
and asset still needed from the owner.

## Site URL and SEO

The production URL is configured in `astro.config.mjs` and can be overridden by
the `SITE_URL` environment variable:

```js
const site = process.env.SITE_URL ?? 'https://yjoe177.github.io/';
```

The canonical URL, Open Graph metadata, RSS feed, sitemap, and `robots.txt` all
derive from that value.

## Deploying to GitHub Pages

Deployment is already defined in `.github/workflows/deploy.yml` using the
current official Astro setup:

- `actions/checkout@v7`
- `withastro/action@v6` with Node `24`
- `actions/deploy-pages@v5`

This is a **user site**, so no Astro `base` path is required. The workflow runs
on pushes to `main` and can also be started manually.

Deployment is active:

1. Pages is configured to use **GitHub Actions**.
2. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).
3. The workflow builds and deploys the `dist/` artifact.
4. The public site is <https://yjoe177.github.io/>.

If the repository is ever renamed away from `<username>.github.io`, update both
`astro.config.mjs` and `.github/workflows/deploy.yml`, and configure `base`.
Internal links currently assume root deployment.

The included `public/.nojekyll` keeps Astro's `_astro/` asset directory from
being hidden by Jekyll.

## Content status

The site uses confirmed information from the owner's current CV, GitHub account,
and photographs. It intentionally does **not** invent publications, metrics, or
missing personal details. Remaining gaps are tracked in `FACTS_NEEDED.md`.
There are no visible placeholder notes on public pages.

The writing space, **Between the Lines**, currently contains four posts. Dates
are optional: *Through My 19th Year* shows July 17, 2026 via `displayDate`, while
the other three are intentionally undated. Date display is controlled without
inventing publication timestamps in RSS or SEO. Posts use explicit `order` 1–4
to preserve the supplied sequence.

## Credits

Design and code are original. Fonts are self-hosted **Newsreader** and
**Inter** under the SIL Open Font License; the license text is included at
`public/fonts/OFL.txt`, with full attributions in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Built with
[Astro](https://astro.build/).
