/**
 * Structural project data. Titles, years, live badges, alt text and
 * descriptions live in `src/i18n/content.ts` under `proj.items[i]` (same order).
 */
import type { ImageMetadata } from 'astro';
import pos from '../assets/pos.png';
import homs from '../assets/homs.png';
import type { Tag } from './experience';

export interface Project {
  image: ImageMetadata;
  tags: Tag[];
  /** Placeholder — wire up when available. */
  link: string;
}

export const projects: Project[] = [
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
    link: '',
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
    link: '',
  },
];
