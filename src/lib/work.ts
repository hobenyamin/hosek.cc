import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'work'>;

/** Drafts never ship; `order` then title decides the rail's sequence. */
const byOrder = (a: Project, b: Project) =>
  a.data.order - b.data.order || a.data.title.localeCompare(b.data.title);

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('work', ({ data }) => !data.draft);
  return projects.sort(byOrder);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter(({ data }) => data.featured);
}
