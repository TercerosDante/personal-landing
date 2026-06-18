/**
 * Structural experience data. Company/role NAMES (proper nouns) and tech TAGS
 * stay here; metas, dates, client labels and descriptions live in
 * `src/i18n/content.ts` under `exp.companies[i]` (same order).
 */
export interface Tag {
  label: string;
  hot?: boolean;
}

export interface Role {
  name: string;
  tags: Tag[];
}

export interface Company {
  name: string;
  roles: Role[];
}

export const experience: Company[] = [
  {
    name: 'Bolivian Devs',
    roles: [
      {
        name: 'TsunaGo',
        tags: [
          { label: 'NestJS' },
          { label: 'TypeScript' },
          { label: 'PostgreSQL' },
          { label: 'Prisma' },
          { label: 'JWT · RBAC' },
          { label: 'Stripe', hot: true },
          { label: 'AWS' },
          { label: 'Google Maps' },
          { label: 'GitHub Actions' },
          { label: 'Traefik' },
          { label: 'React Native' },
          { label: 'Expo' },
        ],
      },
      {
        name: 'Makevi',
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
      },
      {
        name: 'RING',
        tags: [{ label: 'NestJS' }, { label: 'Prisma' }, { label: 'React' }],
      },
      {
        name: 'Joint',
        tags: [
          { label: 'OpenAPI' },
          { label: 'iPaaS' },
          { label: 'Integrations' },
        ],
      },
    ],
  },
  {
    name: 'Jalasoft',
    roles: [
      {
        name: 'Cosmic Latte',
        tags: [
          { label: 'Node.js' },
          { label: 'Fastify' },
          { label: 'MongoDB' },
          { label: 'Python · FastAPI', hot: true },
          { label: 'BERT', hot: true },
          { label: 'RabbitMQ' },
          { label: 'Docker' },
          { label: 'Kubernetes' },
          { label: 'GitLab CI' },
          { label: 'React' },
          { label: 'Meteor' },
        ],
      },
      {
        name: 'Smart Building Utility Management',
        tags: [
          { label: 'React' },
          { label: 'TypeScript' },
          { label: 'GraphQL' },
          { label: 'MUI' },
          { label: 'Redux' },
          { label: 'NestJS' },
          { label: 'Firestore' },
        ],
      },
    ],
  },
];
