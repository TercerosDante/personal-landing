/** Section anchors. Labels live in `src/i18n/content.ts` under `nav.<key>`. */
export interface NavItem {
  href: string;
  key: 'about' | 'experience' | 'projects' | 'education' | 'aiDev' | 'contact';
}

export const nav: NavItem[] = [
  { href: '#about', key: 'about' },
  { href: '#projects', key: 'projects' },
  { href: '#experience', key: 'experience' },
  { href: '#ai-dev', key: 'aiDev' },
  { href: '#education', key: 'education' },
  { href: '#contact', key: 'contact' },
];
