export interface Tag {
  label: string;
  hot?: boolean;
}

export interface Role {
  name: string;
  client: string;
  description: string;
  tags: Tag[];
}

export interface Company {
  name: string;
  meta: string;
  when: string;
  roles: Role[];
}

export const experience: Company[] = [
  {
    name: 'Bolivian Devs',
    meta: 'Full-Stack Developer · Bolivia (Remote)',
    when: 'Feb 2024 – Present',
    roles: [
      {
        name: 'TsunaGo',
        client: 'JP Client',
        description:
          'Mobile-first web platform for assisted-transport taxi matching. NestJS + TypeScript + PostgreSQL (Prisma) backend with a modular, event-driven structure and JWT auth (access/refresh) with RBAC. Idempotent Stripe payments layer with HMAC verification, scheduled background jobs, AWS (S3, SES, SNS) and Google Maps integrations. CI/CD on GitHub Actions, deployed on EC2 behind Traefik over HTTPS. Mobile-first client with React Native + Expo.',
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
        client: 'JP Client',
        description:
          'SaaS for Shopee seller management. REST API in NestJS 11 + Prisma 6 over PostgreSQL (58 models). Stripe subscriptions with signature-verified webhooks, Shopee integration (OAuth, product/order sync) and a resilient sync framework. Frontend in Next.js 15 + React 19 with MUI, TanStack Query and Zod.',
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
        client: 'JP Client',
        description:
          'Restaurant operations platform — full-stack work across backend APIs and frontend features.',
        tags: [{ label: 'NestJS' }, { label: 'Prisma' }, { label: 'React' }],
      },
      {
        name: 'Joint',
        client: 'JP Client',
        description:
          'Enterprise integration platform (iPaaS). Authored OpenAPI specifications to onboard services into an existing adapter-generation pipeline.',
        tags: [{ label: 'OpenAPI' }, { label: 'iPaaS' }, { label: 'Integrations' }],
      },
    ],
  },
  {
    name: 'Jalasoft',
    meta: 'Full-Stack Developer · Bolivia (Remote / in-site)',
    when: '2020 – 2024',
    roles: [
      {
        name: 'Cosmic Latte',
        client: 'BO Client',
        description:
          'Survey and evaluation platform. Backend services in Node.js (Fastify) with complex MongoDB queries over large datasets. Built a Python/FastAPI sentiment-analysis API serving a pre-trained BERT model, replaced the event emitter with a RabbitMQ messaging layer and designed a webhook delivery system. Containerized with Docker + Kubernetes (MicroK8s), CI/CD on GitLab. Frontend in React and Meteor.',
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
        client: 'US Client · Outsourcing',
        description:
          'Building data-tracking application. Built the React + TypeScript frontend (GraphQL, MUI, Redux) and contributed to the NestJS + Firestore backend implementation.',
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
