export interface Education {
  year: string;
  title: string;
  inst: string;
}

export interface Language {
  name: string;
  level: string;
  /** Proficiency bar width, %. */
  pct: number;
}

export const education: Education[] = [
  {
    year: '2019',
    title: 'Research & Development Program',
    inst: 'Jala Foundation — software engineering training within a production project.',
  },
  {
    year: '2018',
    title: 'Commercial Software Development Training',
    inst: 'Jala Foundation — commercial development & engineering best practices.',
  },
  {
    year: '2015–17',
    title: 'Higher Technical Degree in Computer Systems',
    inst: 'CEFTE Institute, Bolivia — 3-year post-secondary technical program.',
  },
];

export const languages: Language[] = [
  { name: 'English', level: 'Professional', pct: 80 },
  { name: 'Spanish', level: 'Native', pct: 100 },
];
