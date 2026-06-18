import type { ImageMetadata } from 'astro';
import pos from '../assets/pos.png';
import homs from '../assets/homs.png';
import type { Tag } from './experience';

export interface Project {
  title: string;
  year: string;
  image: ImageMetadata;
  alt: string;
  /** Optional "live" badge text. */
  live?: string;
  description: string;
  tags: Tag[];
  /** Placeholder — wire up when available. */
  link: string;
}

export const projects: Project[] = [
  {
    title: 'Multi-Tenant ERP / POS for Restaurants',
    year: '2026 · Independent',
    image: pos,
    alt: 'Multi-Tenant ERP / POS for Restaurants — interface preview',
    live: 'Live · 2 active clients',
    description:
      'Multi-tenant architecture (AsyncLocalStorage TenantContext, tenantId isolation, JWT with tenant/location claims) with three auth layers. A modular "Lego" system activates core modules (POS, inventory, cash) and industry modules through a catalog and guards. DDD with unit-tested domain logic and event-driven cross-module communication. POS frontend (React 18, Vite, Ant Design, Zustand) runs on Android (Capacitor) and desktop (Electron) from one codebase. pnpm/Turborepo monorepo with shared Zod contracts, GitHub Actions, Docker + Traefik on a VPS.',
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
    title: 'Textile Manufacturing ERP',
    year: '2025 · Freelance · finished',
    image: homs,
    alt: 'Textile Manufacturing ERP — interface preview',
    description:
      'Textile manufacturing domain modeled in PostgreSQL/Prisma — products with variants, size groups, per-order garment matrices, state history and price tiers per client group. Integrated Google Gemini OCR for automatic garment-matrix extraction from images (~85% less order-entry time). NestJS API with 15+ domain modules. React frontend (Vite, Ant Design, TanStack Query, React Hook Form) with drag-and-drop order building (dnd-kit), Cloudinary uploads, WhatsApp share and Word/Excel export.',
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
