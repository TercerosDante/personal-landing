/**
 * Structural education data — years and proficiency percentages only. Titles,
 * institutions, language names and levels live in `src/i18n/content.ts` under
 * `edu.items[i]` / `edu.langs[i]` (same order).
 */
export interface Education {
  year: string;
}

export interface Language {
  /** Proficiency bar width, %. */
  pct: number;
}

export const education: Education[] = [
  { year: '2019' },
  { year: '2018' },
  { year: '2015–17' },
];

export const languages: Language[] = [{ pct: 80 }, { pct: 100 }];
