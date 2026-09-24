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

/**
 * A project's gallery frames: every image or video in
 * src/assets/work/<project id>/ except the mockup, in filename order — so
 * 01, 02, 03… is the sequence, and adding a frame is dropping in a file.
 */
export type Frame =
  | { kind: 'image'; src: ImageMetadata }
  | { kind: 'video'; src: string };

const images = import.meta.glob<ImageMetadata>(
  '/src/assets/work/*/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' },
);
const videos = import.meta.glob<string>('/src/assets/work/*/*.{mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const byName = (a: string, b: string) =>
  a.localeCompare(b, undefined, { numeric: true });

export function getFrames(id: string): Frame[] {
  const dir = `/src/assets/work/${id}/`;
  const inDir = (path: string) =>
    path.startsWith(dir) && !/\/mockup\.[^/]+$/.test(path);

  return [
    ...Object.entries(images)
      .filter(([path]) => inDir(path))
      .map(([path, src]) => [path, { kind: 'image', src }] as const),
    ...Object.entries(videos)
      .filter(([path]) => inDir(path))
      .map(([path, src]) => [path, { kind: 'video', src }] as const),
  ]
    .sort(([a], [b]) => byName(a, b))
    .map(([, frame]) => frame);
}
