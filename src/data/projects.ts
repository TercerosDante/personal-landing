/**
 * Structural project data, grouped by collaboration kind. Titles, years, live
 * badges, alt text and descriptions live in `src/i18n/content.ts` under
 * `proj.groups[g].items[i]` (same order).
 */
import type { ImageMetadata } from 'astro';
import pos from '../assets/pos.png';
import homs from '../assets/homs.png';
import tsunago from '../assets/tsunago.png';
import makevi from '../assets/makevi.png';
import type { Tag } from './experience';

export interface Project {
  /** Project screenshot. */
  image: ImageMetadata;
  tags: Tag[];
  /** Empty = no live link (placeholder / NDA-safe). */
  link: string;
  /**
   * Repo note: `walkthrough` = own private repo, offer a guided walkthrough
   * (links to contact). `private` = client/NDA work, just label it private.
   */
  repo?: 'walkthrough' | 'private';
}

export interface ProjectGroup {
  /** `independent` = solo/freelance · `team` = co-developed at work. */
  kind: 'independent' | 'team';
  items: Project[];
}

export const projectGroups: ProjectGroup[] = [
  {
    kind: 'independent',
    items: [
      {
        image: pos,
        tags: [
          { label: 'React 18' },
          { label: 'Vite' },
          { label: 'Ant Design' },
          { label: 'Zustand' },
          { label: 'Capacitor' },
          { label: 'Electron' },
          { label: 'Turborepo' },
          { label: 'Zod' },
          { label: 'Docker' },
          { label: 'Traefik' },
          { label: 'DDD · Multi-tenant', hot: true },
        ],
        link: 'https://erp.artd-app.lat',
        repo: 'walkthrough',
      },
      {
        image: homs,
        tags: [
          { label: 'NestJS' },
          { label: 'PostgreSQL' },
          { label: 'Prisma' },
          { label: 'Gemini OCR', hot: true },
          { label: 'React' },
          { label: 'Vite' },
          { label: 'Ant Design' },
          { label: 'TanStack Query' },
          { label: 'dnd-kit' },
          { label: 'Cloudinary' },
        ],
        link: 'https://homs-app.lat',
        repo: 'walkthrough',
      },
    ],
  },
  {
    kind: 'team',
    items: [
      {
        image: tsunago,
        tags: [
          { label: 'NestJS' },
          { label: 'TypeScript' },
          { label: 'PostgreSQL' },
          { label: 'Prisma' },
          { label: 'Stripe', hot: true },
          { label: 'AWS' },
          { label: 'Google Maps' },
          { label: 'React Native' },
          { label: 'Expo' },
          { label: 'Traefik' },
        ],
        link: 'https://tsuna-gou.jp',
        repo: 'private',
      },
      {
        image: makevi,
        tags: [
          { label: 'NestJS 11' },
          { label: 'Prisma 6' },
          { label: 'PostgreSQL' },
          { label: 'Stripe', hot: true },
          { label: 'Shopee OAuth', hot: true },
          { label: 'Next.js 15' },
          { label: 'React 19' },
          { label: 'MUI' },
          { label: 'TanStack Query' },
          { label: 'Zod' },
        ],
        link: '',
        repo: 'private',
      },
    ],
  },
];
