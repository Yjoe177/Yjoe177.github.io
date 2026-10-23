import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { BLOG_CATEGORY_NAMES } from './lib/categories';

const linkSchema = z.object({
  label: z.string().min(1),
  url: z.url(),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1).max(140),
    description: z.string().min(1).max(320),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(BLOG_CATEGORY_NAMES),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

const research = defineCollection({
  loader: glob({ base: './src/content/research', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1).max(160),
    description: z.string().min(1).max(360),
    status: z.enum(['ongoing', 'completed', 'archived']),
    period: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
    topics: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    links: z.array(linkSchema).default([]),
    draft: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    authors: z.array(z.string()).min(1),
    venue: z.string().min(1),
    year: z.number().int().min(1900).max(2100),
    type: z.enum(['journal', 'conference', 'workshop', 'preprint', 'thesis', 'other']),
    status: z.enum(['published', 'forthcoming', 'preprint', 'ongoing']),
    abstract: z.string().optional(),
    links: z.array(linkSchema).default([]),
    note: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, research, publications };
