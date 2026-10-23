# Facts & Assets Needed

This is the owner-facing checklist of confirmed facts, remaining gaps, and
assets. It is intentionally separate from the public site. Never fill a gap with
a plausible guess.

## Confirmed and in use

- Name: **Youssef Amr**
- Role: **AI undergraduate**
- Institution: **Westlake University**, Hangzhou, China
- Degree: **B.S. in Artificial Intelligence**, Aug 2025 – Jun 2029
- Academic record: **2025–26 GPA 3.787; full scholarship recipient**
- Email: **youssef@westlake.edu.cn**
- GitHub: **https://github.com/Yjoe177**
- LinkedIn: **https://www.linkedin.com/in/youssef-amr**
- Research interests: efficient AI, agentic systems, embedded/edge AI, TinyML,
  inference optimization
- Research experience: **ENCODE Lab** (Supervisor: Prof. Huan Wang), 2025 –
  present; **Westlake Chemistry 2026 Summer Undergraduate Research Internship**
  (Prof. Yiqin Gao's group)
- Awards: National Undergraduate Innovation and Entrepreneurship Training
  Program (2026); Photon Cup finalist (2026); Ebhar Misr AI & Technology Program
- Teaching/outreach: Westlake Pre-college Physics Track TA (2026); Zhumadian
  “Tiny AI” science outreach (2026)
- Skills: Python, C/C++, PyTorch, NumPy, scikit-learn, model quantization,
  reproducible evaluation, ARM Cortex-M/STM32, ARM toolchains,
  STM32CubeIDE/CubeMX, Git, Linux/WSL
- Photograph: `Youssef.jpg` (original, local only) → web portrait at
  `public/images/youssef-amr.jpg`
- CVs: `Youssef_Amr_Research_Internship_CV_Classic.pdf` and
  `Youssef_Amr_Industry_Internship_Resume_Classic.pdf`, copied to `public/cv/`
- Website status: in local development / preparing for launch

## Remaining information

### 1. Personal background paragraph

The only visible content placeholder left on the public site is “Beyond
research” on the About page.

- [ ] A short first-person paragraph: where you are from, what brought you to
  AI, and what you enjoy outside research.

Where: `personalBackground` in `src/data/profile.ts`. Set
`isPlaceholder: false` when filled.

### 2. Research naming and details

The site currently uses the project names **TinySSM** and **Agentic MCU Kernel
Optimization**. The current CV uses **TinyMamba** and **Agentic TinyML**.

- [ ] Are TinySSM and TinyMamba the same project? Should the site rename it?
- [ ] Is Agentic MCU Kernel Optimization the same as Agentic TinyML?
- [ ] Project periods, your role, collaborators/lab names you want public.
- [ ] Public links: code, paper, poster, demo, write-up.
- [ ] Verified, reproducible results, if publicly shareable.
- [ ] Preferred status: ongoing, completed, or archived.

Where: `src/content/research/*.md`. Results are omitted until verified.

### 3. Publications

- [ ] Any journal articles, conference/workshop papers, preprints, theses, or
  forthcoming work, with exact title, authors, venue, year, status, DOI/PDF, and
  notes.
- [ ] If there are none, no action is needed. The site says none are listed.

Where: copy `src/content/publications/_template.md` to a normal filename.

### 4. Professional profiles still missing

- [ ] Google Scholar URL.
- [ ] ORCID URL.
- [ ] X/Twitter URL (optional).

Where: `src/config/site.ts`. Empty links are hidden.

### 5. Phone number in public CVs

Both public PDFs include a phone number and email.

- [ ] Confirm that publishing the phone number on the open web is acceptable, or
  provide redacted PDFs.

The website pages do not repeat the phone number. The CV page links directly to
the provided PDFs.

### 6. Award statistics

The current CV package asks you to verify ranks, participant counts, and the
grant amount against certificates. Those numbers are **not** on the website.

- [ ] If verified and you want them shown, provide the exact figures.

### 7. First journal entry

The journal is intentionally empty and has a designed landing state.

- [ ] Optional: write or paste the first real entry.

Where: `src/content/blog/`; see `CONTENT_GUIDE.md`. Starter templates are in
`src/content/_examples/blog/`.

### 8. News

- [ ] Confirm or replace the current “website is in local development” item.
- [ ] Add real updates only after they happen.

Where: `src/data/news.ts`.

### 9. Repository and deployment

- [ ] Rename the GitHub repository to **`Yjoe177.github.io`**. At the time of
  this build, `https://github.com/Yjoe177/Yjoe177.github.io` returns 404 and the
  only public repo is still `Youssef-Ahmed.github.io`.
- [ ] Approve the push.
- [ ] Enable **Settings → Pages → Source: GitHub Actions**.
- [ ] Confirm the target public URL: `https://yjoe177.github.io/`.

No remote has been configured because the renamed repository could not be
verified yet. The deployment workflow is ready at
`.github/workflows/deploy.yml`.

## Current placeholder locations

| Gap | Where it appears |
| --- | --- |
| Personal background | About → “Beyond research” |
| No publications | `/publications/` and `/cv/` (honest empty state) |
| Empty journal | `/blog/` (designed empty state, not fake posts) |
| Google Scholar / ORCID / X | Hidden until URLs are supplied |
| Research project naming/details | Existing TinySSM and Agentic MCU pages |

The portrait, CV downloads, email, GitHub, LinkedIn, education dates, awards,
activities, and skills are now real content.

## Please do not send

- Passwords or API keys in chat or content files.
- Unverifiable performance numbers.
- Private collaborator information without permission.
- A phone number or home address for the website itself unless you intend it to
  be public. The CV PDFs already contain a phone number; see section 5.
