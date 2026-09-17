/** Hero "Core stack" chips. `icon` = an `Icon.astro` name (devicon-plain, `si:` or `ph:`); otherwise `mono` badge text. */
export interface CoreChip {
  label: string;
  icon?: string;
  mono?: string;
}

export const coreStack: CoreChip[] = [
  { label: 'TypeScript', icon: 'typescript' },
  { label: 'React', icon: 'si:react' },
  { label: 'Next.js', icon: 'nextjs' },
  { label: 'Node.js', icon: 'nodejs' },
  { label: 'NestJS', icon: 'nestjs' },
  { label: 'PostgreSQL', icon: 'postgresql' },
  { label: 'Docker', icon: 'docker' },
  { label: 'CI/CD', icon: 'ph:infinity' },
];
