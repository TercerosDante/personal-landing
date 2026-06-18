/** Hero "Core stack" chips. `icon` = devicon-plain name; otherwise `mono` badge text. */
export interface CoreChip {
  label: string;
  icon?: string;
  mono?: string;
}

export const coreStack: CoreChip[] = [
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'React', icon: 'react' },
  { label: 'Next.js', icon: 'nextjs' },
  { label: 'Node.js', icon: 'nodejs' },
  { label: 'NestJS', icon: 'nestjs' },
  { label: 'PostgreSQL', icon: 'postgresql' },
  { label: 'Prisma', mono: 'Pr' },
  { label: 'AWS', mono: 'AWS' },
  { label: 'Docker', icon: 'docker' },
];
