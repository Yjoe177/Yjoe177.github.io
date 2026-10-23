/**
 * Structured biography data used by the About page and the CV.
 *
 * The entries below are taken from the current research CV (October 2026).
 * Competitiveness statistics and grant amounts that the CV package flags for
 * verification are intentionally omitted. Add new verified facts only; see
 * FACTS_NEEDED.md before filling any remaining gap.
 */

import { academicLinks } from '../config/academic';

export interface EducationEntry {
  institution: string;
  institutionUrl?: string;
  degree: string;
  location: string;
  period: string;
  details: string[];
}

export interface TimelineEntry {
  title: string;
  organization?: string;
  organizationUrl?: string;
  period?: string;
  description: string;
}

export interface ResearchExperienceEntry extends TimelineEntry {
  institution?: string;
  institutionUrl?: string;
  supervisor?: {
    name: string;
    url: string;
  };
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export const education: EducationEntry[] = [
  {
    institution: academicLinks.westlakeUniversity.name,
    institutionUrl: academicLinks.westlakeUniversity.href,
    degree: 'B.S. in Artificial Intelligence',
    location: 'Hangzhou, China',
    period: 'Aug 2025 – Jun 2029',
    details: [
      '2025–26 GPA: 3.787; full scholarship recipient.',
      'Coursework: data structures & algorithms, linear algebra, calculus, physics, AI/CS.',
    ],
  },
];

export const researchExperience: ResearchExperienceEntry[] = [
  {
    title: 'Undergraduate Researcher',
    organization: academicLinks.encodeLab.name,
    organizationUrl: academicLinks.encodeLab.href,
    institution: academicLinks.westlakeUniversity.name,
    institutionUrl: academicLinks.westlakeUniversity.href,
    supervisor: {
      name: academicLinks.huanWang.name,
      url: academicLinks.huanWang.href,
    },
    period: '2025 – Present',
    description:
      'Investigating hardware-aware neural networks on ARM Cortex-M microcontrollers, including architecture, quantization, C/C++ implementation, memory profiling, and host/device verification. Developing reproducible experimentation pipelines that combine structured agent outputs, compiler/build gates, static and semantic checks, automated tests, and MCU measurements.',
  },
  {
    title: 'Summer Undergraduate Research Intern',
    organization: 'Westlake Chemistry 2026 Summer Undergraduate Research Internship',
    institution: academicLinks.westlakeUniversity.name,
    institutionUrl: academicLinks.westlakeUniversity.href,
    period: 'Summer 2026',
    description:
      "Prof. Yiqin Gao's group · Computational chemistry. Conducted SPONGE molecular-dynamics experiments on 862 TIP3P water molecules and analyzed the oxygen–oxygen radial distribution function to characterize liquid-water structure.",
  },
];

export const awards: TimelineEntry[] = [
  {
    title: 'National Undergraduate Innovation and Entrepreneurship Training Program',
    organization: 'National level',
    period: '2026',
    description:
      'The TinyMamba project was selected at the national level for undergraduate innovation and entrepreneurship training.',
  },
  {
    title: 'Photon Cup Finalist',
    organization: academicLinks.westlakeUniversity.name,
    organizationUrl: academicLinks.westlakeUniversity.href,
    period: '2026',
    description:
      'Finalist in the university-level innovation competition with the TinyMamba project.',
  },
  {
    title: 'Ebhar Misr AI & Technology Program',
    organization: 'Technology track',
    description:
      'Selected for the AI and technology track of the Ebhar Misr program.',
  },
];

export const activities: TimelineEntry[] = [
  {
    title: 'Teaching Assistant, Pre-college Physics Track',
    organization: academicLinks.westlakeUniversity.name,
    organizationUrl: academicLinks.westlakeUniversity.href,
    period: '2026',
    description:
      'Supported high-school students with Su–Schrieffer–Heeger (SSH) circuit experiments, oscilloscope measurements, and troubleshooting.',
  },
  {
    title: 'Tiny AI Science Outreach',
    organization: 'Zhumadian',
    period: '2026',
    description:
      'Led five “Tiny AI” sessions for local middle- and high-school students, translating audio recognition and embedded-AI research into interactive lessons.',
  },
];

/** TODO: add reviewing, volunteering, mentoring, or other formal service. */
export const service: TimelineEntry[] = [];

export const skillGroups: SkillGroup[] = [
  {
    title: 'ML & research',
    items: [
      'Python',
      'C/C++',
      'PyTorch',
      'NumPy',
      'scikit-learn',
      'Model quantization',
      'Reproducible evaluation',
    ],
  },
  {
    title: 'Systems',
    items: [
      'ARM Cortex-M / STM32',
      'ARM toolchains',
      'STM32CubeIDE / CubeMX',
      'Git',
      'Linux / WSL',
    ],
  },
];
