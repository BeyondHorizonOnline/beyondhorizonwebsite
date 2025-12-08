// File: src/app/utils/format.utils.ts
import { SeriesCode } from '../models/catalog.models';

export function seriesColor(series: SeriesCode): string {
  // Standard cards use cyan only. Rare/legendary variants can use gold/special colors later.
  // For now, all series badges unified to cyan for clean, consistent grid presentation.
  switch (series) {
    case 'VX':
    case 'CX':
    case 'BX':
    case 'EX':
    case 'MX':
    case 'HX':
    default:
      return 'var(--color-cyan)';
  }
}

export function matchesFilter(text: string, query: string): boolean {
  return text.toLowerCase().includes(query.toLowerCase());
}
