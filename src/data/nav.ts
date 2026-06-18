/** Section anchors. Labels live in `src/i18n/content.ts` under `nav.<key>`. */
export interface NavItem {
  href: string;
  key: 'about' | 'experience' | 'projects' | 'stack' | 'education' | 'contact';
}

export const nav: NavItem[] = [
  { href: '#about', key: 'about' },
  { href: '#experience', key: 'experience' },
  { href: '#projects', key: 'projects' },
  { href: '#stack', key: 'stack' },
  { href: '#education', key: 'education' },
  { href: '#contact', key: 'contact' },
];
