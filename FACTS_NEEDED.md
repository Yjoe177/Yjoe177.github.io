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
- LinkedIn: **https://www.linkedin.com/in/youssef-amr-9b2541290/**
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
- Website status: live at `https://yjoe177.github.io/`

## Remaining information

### 1. Personal background paragraph (optional)

The “Beyond research” section now introduces **Between the Lines** and does not
pretend to be a full personal biography.

- [ ] Optional: provide a short first-person background paragraph if you want a
  dedicated personal-biography section later. No placeholder is currently shown.

Where: add it to the About page or extend `writingSpace.aboutNote` in
`src/config/writing.ts`. Do not invent personal details.

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

### 5. Phone number in CVs

The owner explicitly approved publishing the phone number and the name
**Youssef Ahmed** in both public CV PDFs. The website identity remains
**Youssef Amr**. Do not redact or rename the PDFs without new confirmation.

- [ ] No action needed. If the owner supplies a newer CV export, replace the
  public PDFs with that exact version.

### 6. Award statistics

The current CV package asks you to verify ranks, participant counts, and the
grant amount against certificates. Those numbers are **not** on the website.

- [ ] If verified and you want them shown, provide the exact figures.

### 7. More Between the Lines writing (optional)

The writing space currently contains four posts. Additional writing can be
added at any time.

- [ ] Optional: add more pieces.

Where: `src/content/blog/`; see `CONTENT_GUIDE.md`. There are no categories.
Starter templates are in `src/content/_examples/blog/`.

### 8. News

- [ ] Confirm or replace the current “website is live” item.
- [ ] Add real updates only after they happen.

Where: `src/data/news.ts`.

### 9. Repository and deployment

- [x] Repository is **`Yjoe177.github.io`**, owned by Yjoe177.
- [x] Local `main` tracks the verified `origin`.
- [x] GitHub Actions build/deploy completed successfully.
- [x] Public URL: `https://yjoe177.github.io/`.
- [ ] Optional: custom domain at a later date.

The deployment workflow lives at `.github/workflows/deploy.yml`.

## Current placeholder locations

| Gap | Where it appears |
| --- | --- |
| No publications | `/publications/` and `/cv/` (honest empty state) |
| Google Scholar / ORCID / X | Hidden until URLs are supplied |
| Research project naming/details | Existing TinySSM and Agentic MCU pages |

There are **no visible placeholder notes** on the public pages. The portrait, CV
downloads, email, GitHub, LinkedIn, education dates, awards, activities, and
skills are real content. Publications do not exist yet and are presented as an
honest empty state. Four Between the Lines posts are published.

## Please do not send

- Passwords or API keys in chat or content files.
- Unverifiable performance numbers.
- Private collaborator information without permission.
- A phone number or home address for the website itself unless you intend it to
  be public. The CV PDFs already include the phone number by explicit owner
  instruction; the website identity remains Youssef Amr.
