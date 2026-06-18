/** A technology chip. `icon` = devicon-plain name; otherwise a `mono` badge. */
export interface Tech {
  label: string;
  /** devicon-plain icon name. */
  icon?: string;
  /** Short badge text when there is no icon. */
  mono?: string;
  /** Accent color for the icon/badge. */
  color: string;
  /** "Where I use it" tooltip. */
  note: string;
}

export interface Layer {
  mark: string;
  idx: string;
  name: string;
  note: string;
  techs: Tech[];
}

export const stack: Layer[] = [
  {
    mark: 'F',
    idx: '01',
    name: 'Frontend',
    note: 'React 19 · Next.js 15 clients',
    techs: [
      { label: 'React', icon: 'react', color: '#2aa9c9', note: 'Client UIs across every product.' },
      { label: 'Next.js', icon: 'nextjs', color: '#1c222e', note: 'App Router & SSR — Makevi web.' },
      { label: 'Zustand', mono: 'Zu', color: '#7a5e3a', note: 'Lightweight global state.' },
      { label: 'React Query', mono: 'RQ', color: '#d24d57', note: 'TanStack — server-state caching.' },
      { label: 'MUI', mono: 'MUI', color: '#2f6faf', note: 'Material UI component system.' },
      { label: 'Ant Design', mono: 'AntD', color: '#2f74c0', note: 'POS & ERP UI kit.' },
    ],
  },
  {
    mark: 'B',
    idx: '02',
    name: 'Backend',
    note: 'Event-driven NestJS APIs',
    techs: [
      { label: 'TypeScript', mono: 'TS', color: '#2f6db0', note: 'End-to-end typing.' },
      { label: 'Node.js', icon: 'nodejs', color: '#4f8a3d', note: 'NestJS & Fastify runtime.' },
      { label: 'NestJS', icon: 'nestjs', color: '#c23a52', note: 'Modular APIs across products.' },
      { label: 'Prisma', mono: 'Pr', color: '#2d3748', note: 'Type-safe ORM — 58 models on Makevi.' },
      { label: 'REST APIs', mono: 'API', color: '#4a5160', note: 'Primary integration surface.' },
      { label: 'GraphQL', icon: 'graphql', color: '#b83a86', note: 'Smart Building & Joint specs.' },
    ],
  },
  {
    mark: 'D',
    idx: '03',
    name: 'Databases',
    note: 'Relational & document stores',
    techs: [
      { label: 'PostgreSQL', icon: 'postgresql', color: '#35699a', note: 'Primary store via Prisma.' },
      { label: 'MongoDB', icon: 'mongodb', color: '#3f8a5e', note: 'Cosmic Latte datasets.' },
    ],
  },
  {
    mark: 'O',
    idx: '04',
    name: 'DevOps & Tools',
    note: 'Containerized delivery & CI/CD',
    techs: [
      { label: 'Docker', icon: 'docker', color: '#2f7fc4', note: 'Multi-stage images.' },
      { label: 'AWS', mono: 'AWS', color: '#b6792e', note: 'EC2 · RDS · S3 · SES · SNS.' },
      { label: 'GitHub Actions', mono: 'GHA', color: '#3a4760', note: 'Lint · test · build · deploy.' },
      { label: 'CI/CD', mono: 'CI', color: '#4a5160', note: 'Automated pipelines.' },
      { label: 'VPS', mono: 'VPS', color: '#4a5160', note: 'Linux VPS hosting.' },
      { label: 'Traefik', mono: 'Tk', color: '#2f8a9a', note: 'HTTPS reverse proxy.' },
      { label: 'Kubernetes', icon: 'kubernetes', color: '#345b8c', note: 'MicroK8s on Cosmic Latte.' },
      { label: 'Git', icon: 'git', color: '#c4572f', note: 'Version control.' },
      { label: 'Linux', icon: 'linux', color: '#2b3340', note: 'Server operations.' },
      { label: 'Cursor', mono: 'Cur', color: '#4a5160', note: 'AI-assisted development.' },
      { label: 'Claude CLI', mono: 'AI', color: '#d8623f', note: 'AI-assisted development.' },
    ],
  },
];
