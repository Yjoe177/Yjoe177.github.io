/**
 * Central identity and site-wide configuration.
 *
 * Everything in this file is safe to edit. Components read from here so that
 * changing a name, email address, or navigation label only happens once.
 *
 * Optional fields left empty are hidden by the UI. Remaining gaps are tracked
 * in FACTS_NEEDED.md; do not replace them with guesses.
 */

import { academicLinks } from './academic';
import { writingSpace } from './writing';

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactLink {
  label: string;
  href: string;
  handle?: string;
}

export const siteConfig = {
  name: 'Youssef Amr',
  initials: 'YA',

  role: 'AI Undergraduate',
  affiliation: academicLinks.westlakeUniversity.name,
  affiliationUrl: academicLinks.westlakeUniversity.href,
  location: 'Hangzhou, China',

  /** Short label used in the header and footer. */
  tagline: 'Efficient AI, agentic systems, and learning at the edge.',

  /** Used for <meta name="description"> and RSS. */
  description:
    'Youssef Amr is an AI undergraduate at Westlake University in Hangzhou, China, interested in efficient AI, agentic systems, TinyML, embedded AI, and inference optimization.',

  /** Confirmed academic email from the current CV. */
  email: 'youssef@westlake.edu.cn',
  /** Optional display label for the email, e.g. "Academic email". */
  emailLabel: 'Academic email',

  /** Professional profiles confirmed in the current CV / GitHub account. */
  links: [
    { label: 'GitHub', href: 'https://github.com/Yjoe177', handle: '@Yjoe177' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/youssef-amr', handle: 'in/youssef-amr' },
    { label: 'Google Scholar', href: '', handle: '' },
    { label: 'ORCID', href: '', handle: '' },
    { label: 'X / Twitter', href: '', handle: '' },
  ] satisfies ContactLink[],

  researchInterests: [
    'Efficient AI',
    'Agentic systems',
    'TinyML',
    'Embedded & edge AI',
    'Inference optimization',
  ],

  /** Broader directions shown on the research index. */
  researchThemes: [
    {
      title: 'Efficient AI',
      description:
        'Models and training methods that deliver useful capability within real compute, memory, and energy budgets.',
    },
    {
      title: 'Agentic systems',
      description:
        'Language-model agents that can inspect a problem, use tools, test ideas, and improve software systems.',
    },
    {
      title: 'TinyML & edge AI',
      description:
        'Always-on sensing and inference on microcontrollers and other devices at the far edge of the network.',
    },
    {
      title: 'Inference optimization',
      description:
        'Kernels, memory layout, quantization, and deployment choices that make inference faster and more predictable.',
    },
  ],

  /** Current CV files, generated from the October 2026 LaTeX sources. */
  cv: {
    updated: 'October 2026',
    downloads: [
      { label: 'Research CV', path: '/cv/youssef-amr-research-cv.pdf' },
      { label: 'Industry resume', path: '/cv/youssef-amr-industry-resume.pdf' },
    ],
  },

  /** Web-optimized portrait derived from Youssef.jpg (original preserved). */
  portrait: {
    src: '/images/youssef-amr.jpg',
    alt: 'Portrait of Youssef Amr',
  },

  /** Default Open Graph image; regenerate with `npm run og:generate`. */
  ogImage: '/images/og-default.png',

  nav: [
    { label: 'Research', href: '/research/' },
    { label: 'Publications', href: '/publications/' },
    { label: writingSpace.title, href: '/blog/' },
    { label: 'About', href: '/about/' },
    { label: 'CV', href: '/cv/' },
    { label: 'Contact', href: '/contact/' },
  ] satisfies NavItem[],

  bio: {
    short:
      'I am an undergraduate studying artificial intelligence at Westlake University in Hangzhou, China. My interests sit where efficient machine learning meets systems: making models smaller, faster, and more useful at the edge.',
    long:
      'At Westlake University, I study artificial intelligence with a focus on efficiency. I am drawn to questions that sit between machine learning and computer systems: how a model can fit inside a microcontroller, how an agent can reason about low-level code, and how careful engineering can turn a promising idea into something that runs reliably. My current explorations include efficient sequence models for keyword spotting and agentic approaches to MCU kernel optimization. This site is a record of that work and a place for writing that does not fit in a paper.',
  },
} as const;

/** Only links with a real URL are displayed. */
export const activeContactLinks = siteConfig.links.filter((link) => link.href.trim().length > 0);

export const hasEmail = siteConfig.email.trim().length > 0;

export interface EmailParts {
  user: string;
  domain: string;
}

/** Split an email for lightly obfuscated rendering without client JavaScript. */
export function getEmailParts(): EmailParts | null {
  const email = siteConfig.email.trim();
  const at = email.lastIndexOf('@');
  if (at < 1) return null;
  return { user: email.slice(0, at), domain: email.slice(at + 1) };
}
