/**
 * Structural education data: years only. Titles, institutions, language names
 * and levels live in `src/i18n/content.ts` under `edu.items[i]` / `edu.langs[i]`
 * (same order). Languages have no structural data; the copy array is the list.
 */
export interface Education {
  year: string;
}

export const education: Education[] = [
  { year: '2019' },
  { year: '2018' },
  { year: '2015-17' },
];
