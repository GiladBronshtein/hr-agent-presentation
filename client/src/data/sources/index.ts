import type { Source } from './types';
import { MAIN_SOURCES } from './main';
import { APPENDIX_SOURCES } from './appendix';

export type { Source };

/** Every source in the deck, main track first, without duplicates. */
export const ALL_SOURCES: Source[] = (() => {
  const seen = new Map<string, Source>();
  for (const s of [...MAIN_SOURCES, ...APPENDIX_SOURCES]) {
    const prev = seen.get(s.id);
    if (prev) prev.usedIn = Array.from(new Set(prev.usedIn.concat(s.usedIn)));
    else seen.set(s.id, { ...s, usedIn: [...s.usedIn] });
  }
  return Array.from(seen.values());
})();

export const SOURCES: Record<string, Source> = Object.fromEntries(ALL_SOURCES.map((s) => [s.id, s]));
