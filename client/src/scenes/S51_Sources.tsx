/**
 * S51 (appendix, last): every source behind a number or claim in the deck,
 * read from data/sources. Three topics, each in its own spectrum color,
 * flow through four balanced columns. Every compact row (publisher and year,
 * then the title) is a link to the page that states the claim.
 */
import { ExternalLink } from 'lucide-react';
import { SceneBase, SceneTitle, SceneSubtitle } from '../components/presentation/SceneBase';
import { ALL_SOURCES, type Source } from '../data/sources';
import { PALETTE, alpha, textOn } from '../lib/palette';

const TOOL_SCENES = new Set(['appendix-tool-map', 'appendix-n8n-blueprint']);
const TRUST_PUBLISHERS = new Set(['Anthropic', 'NIST', 'EU AI Act', 'OWASP', 'W3C']);

const GROUPS: { id: string; label: string; color: string; match: (s: Source) => boolean }[] = [
  { id: 'tools', label: 'כלים ו-n8n', color: PALETTE.coral, match: (s) => s.usedIn.every((u) => TOOL_SCENES.has(u)) },
  { id: 'trust', label: 'אמון, ממשל ו-AI', color: PALETTE.violet, match: (s) => TRUST_PUBLISHERS.has(s.publisher) },
  { id: 'research', label: 'מחקר ולמידה', color: PALETTE.teal, match: () => true },
];

/** Research first (reading order), then trust, then tools */
const ORDER = ['research', 'trust', 'tools'];
const GROUPED = (() => {
  const by: Record<string, Source[]> = { research: [], trust: [], tools: [] };
  for (const s of ALL_SOURCES) by[GROUPS.find((g) => g.match(s))!.id].push(s);
  return ORDER.map((id) => ({ ...GROUPS.find((g) => g.id === id)!, items: by[id] })).filter((g) => g.items.length);
})();

const ROW_FONT = 'clamp(0.9rem, 0.98cqw, 1.15rem)';

export default function S51_Sources() {
  return (
    <SceneBase variant="deep-dark">
      <div dir="rtl" style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        padding: 'clamp(1.5rem, 4cqh, 3rem) clamp(2rem, 5.5cqw, 6.5rem) clamp(1.5rem, 4cqh, 3rem)',
        gap: 'clamp(0.9rem, 2.2cqh, 1.6rem)',
      }}>
        <div className="text-center" style={{ flexShrink: 0 }}>
          <SceneTitle size="md">מקורות</SceneTitle>
          <SceneSubtitle>כל מספר וכל טענה בהרצאה, ומאיפה הם מגיעים</SceneSubtitle>
        </div>

        {/* Four balanced columns; the three topics flow through them in order */}
        <div style={{ flex: 1, minHeight: 0, columnCount: 4, columnGap: 'clamp(1.25rem, 2.2cqw, 2.5rem)', columnFill: 'balance' }}>
          {GROUPED.map((g, gi) => (
            <section key={g.id} style={{ display: 'contents' }}>
              <h3 className="mo-fade" style={{
                breakAfter: 'avoid', breakInside: 'avoid',
                display: 'flex', alignItems: 'center', gap: '0.55em',
                margin: gi === 0 ? '0 0 0.45em' : '0.8em 0 0.45em',
                fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1rem, 1.1cqw, 1.3rem)', fontWeight: 800,
                color: textOn(g.color), animationDelay: `${0.15 + gi * 0.1}s`,
              }}>
                <span aria-hidden className="fx-beacon" style={{ width: 8, height: 8, color: g.color }} />
                {g.label}
                <span style={{ color: PALETTE.muted, fontWeight: 600 }}>{g.items.length}</span>
                <span aria-hidden style={{ flex: 1, height: 1, background: `linear-gradient(270deg, ${alpha(g.color, 0.6)}, transparent)` }} />
              </h3>
              {g.items.map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="fx-source-row"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    '--fx-c': g.color,
                    display: 'flex', gap: '0.55em', alignItems: 'flex-start',
                    textDecoration: 'none', breakInside: 'avoid',
                    padding: '0.24em 0.5em', margin: '0 -0.5em',
                    borderRadius: '8px',
                    fontFamily: "'Heebo', sans-serif", fontSize: ROW_FONT, lineHeight: 1.3,
                  } as React.CSSProperties}>
                  <span aria-hidden style={{ color: textOn(g.color), display: 'inline-flex', flexShrink: 0, marginTop: '0.25em' }}><ExternalLink size="0.85em" /></span>
                  {/* Publisher line, then the title: each its own isolated run, so
                      English titles keep their order inside the RTL column */}
                  <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <bdi style={{ color: PALETTE.paper, fontWeight: 700, textAlign: 'right' }}>{s.publisher}, {s.year}</bdi>
                    <span dir="auto" style={{ color: PALETTE.muted, fontSize: '0.9em', textAlign: 'right' }}>{s.title}</span>
                  </span>
                </a>
              ))}
            </section>
          ))}
        </div>
      </div>
    </SceneBase>
  );
}
