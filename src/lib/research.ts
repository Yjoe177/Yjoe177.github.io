import { getCollection, type CollectionEntry } from 'astro:content';

export type ResearchProject = CollectionEntry<'research'>;
export type Publication = CollectionEntry<'publications'>;

interface ResearchQuery {
  includeDrafts?: boolean;
}

export async function getResearch({
  includeDrafts = import.meta.env.DEV,
}: ResearchQuery = {}): Promise<ResearchProject[]> {
  const projects = await getCollection('research', ({ data }) =>
    includeDrafts ? true : !data.draft,
  );

  return projects.sort((a, b) => {
    if (a.data.order !== b.data.order) return a.data.order - b.data.order;
    return a.data.title.localeCompare(b.data.title);
  });
}

export async function getPublications({
  includeDrafts = import.meta.env.DEV,
}: ResearchQuery = {}): Promise<Publication[]> {
  const publications = await getCollection('publications', ({ data, id }) => {
    // Files beginning with "_" are repository templates, never site content.
    if (id.startsWith('_')) return false;
    return includeDrafts ? true : !data.draft;
  });

  return publications.sort((a, b) => {
    if (a.data.year !== b.data.year) return b.data.year - a.data.year;
    return a.data.title.localeCompare(b.data.title);
  });
}

export const statusLabels = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  archived: 'Archived',
} as const;

export const publicationStatusLabels = {
  published: 'Published',
  forthcoming: 'Forthcoming',
  preprint: 'Preprint',
  ongoing: 'Ongoing',
} as const;

export const publicationTypeLabels = {
  journal: 'Journal article',
  conference: 'Conference paper',
  workshop: 'Workshop paper',
  preprint: 'Preprint',
  thesis: 'Thesis',
  other: 'Other',
} as const;
