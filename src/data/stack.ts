/**
 * Structural stack data. Tech LABELS (tokens), icons, badges and colors stay
 * here; layer names/notes and the per-tech tooltips live in
 * `src/i18n/content.ts` under `stack.items[i]` (same order).
 */
export interface Tech {
  label: string;
  /** devicon-plain icon name. */
  icon?: string;
  /** Short badge text when there is no icon. */
  mono?: string;
  /** Accent color for the icon/badge. */
  color: string;
}

export interface Layer {
  mark: string;
  idx: string;
  techs: Tech[];
}

export const stack: Layer[] = [
  {
    mark: 'F',
    idx: '01',
    techs: [
      { label: 'React', icon: 'react', color: '#2aa9c9' },
      { label: 'Next.js', icon: 'nextjs', color: '#1c222e' },
      { label: 'Zustand', mono: 'Zu', color: '#7a5e3a' },
      { label: 'React Query', mono: 'RQ', color: '#d24d57' },
      { label: 'MUI', mono: 'MUI', color: '#2f6faf' },
      { label: 'Ant Design', mono: 'AntD', color: '#2f74c0' },
    ],
  },
  {
    mark: 'B',
    idx: '02',
    techs: [
      { label: 'TypeScript', mono: 'TS', color: '#2f6db0' },
      { label: 'Node.js', icon: 'nodejs', color: '#4f8a3d' },
      { label: 'NestJS', icon: 'nestjs', color: '#c23a52' },
      { label: 'Prisma', mono: 'Pr', color: '#2d3748' },
      { label: 'REST APIs', mono: 'API', color: '#4a5160' },
      { label: 'GraphQL', icon: 'graphql', color: '#b83a86' },
    ],
  },
  {
    mark: 'D',
    idx: '03',
    techs: [
      { label: 'PostgreSQL', icon: 'postgresql', color: '#35699a' },
      { label: 'MongoDB', icon: 'mongodb', color: '#3f8a5e' },
    ],
  },
  {
    mark: 'O',
    idx: '04',
    techs: [
      { label: 'Docker', icon: 'docker', color: '#2f7fc4' },
      { label: 'AWS', mono: 'AWS', color: '#b6792e' },
      { label: 'GitHub Actions', mono: 'GHA', color: '#3a4760' },
      { label: 'CI/CD', mono: 'CI', color: '#4a5160' },
      { label: 'VPS', mono: 'VPS', color: '#4a5160' },
      { label: 'Traefik', mono: 'Tk', color: '#2f8a9a' },
      { label: 'Kubernetes', icon: 'kubernetes', color: '#345b8c' },
      { label: 'Git', icon: 'git', color: '#c4572f' },
      { label: 'Linux', icon: 'linux', color: '#2b3340' },
      { label: 'Cursor', mono: 'Cur', color: '#4a5160' },
      { label: 'Claude CLI', mono: 'AI', color: '#d8623f' },
    ],
  },
];
