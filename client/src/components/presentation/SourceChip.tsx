/**
 * SourceChip - a small, clickable source label next to a number or claim:
 * "publisher, year". Every factual number on a slide carries one. The full
 * list is on the sources slide in the appendix. Styled by .fx-source in
 * index.css: muted text on dark glass, a hairline in the chapter color.
 */
import { Link } from 'lucide-react';
import { SOURCES } from '../../data/sources';

export function SourceChip({ id, style }: { id: string; style?: React.CSSProperties }) {
  const s = SOURCES[id];
  if (!s) {
    if (import.meta.env.DEV) console.warn(`SourceChip: unknown source "${id}"`);
    return null;
  }
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`${s.title} (${s.year})`}
      onClick={(e) => e.stopPropagation()}
      className="fx-source"
      style={{ fontSize: 'clamp(0.95rem, 1cqw, 1.2rem)', ...style }}
    >
      <Link size="0.9em" />
      <span>{s.publisher}, {s.year}</span>
    </a>
  );
}
