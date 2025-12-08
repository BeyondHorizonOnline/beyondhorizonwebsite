// File: src/app/utils/format.utils.ts
import { SeriesCode } from '../models/catalog.models';

export function seriesColor(series: SeriesCode): string {
  switch (series) {
    case 'VX': return 'var(--color-cyan)';
    case 'CX': return 'var(--color-gold)';
    case 'BX': return 'var(--color-purple)';
    case 'EX': return 'var(--color-text-secondary)';
    case 'MX': return 'var(--color-red)';
    case 'HX': return 'var(--color-cyan)';
    default: return 'var(--color-text-secondary)';
  }
}

export function matchesFilter(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}
