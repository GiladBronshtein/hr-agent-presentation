/**
 * ChapterInterstitial - cinematic chapter card shown when the deck moves
 * forward onto the first scene of a chapter. A chapter-colored wash sweeps in
 * from the left (the forward travel direction of this RTL deck), the chapter
 * kicker, hairline, word and description land, then the wash wipes away to the right and
 * reveals the new slide. Purely visual: pointer-events none, aria-hidden.
 * Lifetime (skip on key or navigation) is owned by SceneRenderer.
 */
import { useEffect, type CSSProperties } from 'react';
import { CHAPTERS } from '../../data/scenes';
import './motion.css';

export const CHAPTER_CARD_MS = 1600;

// Light text tints (projector contrast) and descriptions, matching the
// chapter cards of the title trailer (LectureTrailer CH). Keep in sync.
const TINTS: Record<string, string> = {
  'להבין': '#818CF8',
  'לראות': '#22D3EE',
  'לבנות': '#34D399',
  'להטמיע': '#FCD34D',
  'נספח': '#CBD5E1',
};
const DESCS: Record<string, string> = {
  'להבין': 'מה הם אייג׳נטים ואיך הם עובדים',
  'לראות': 'תשעה שימושים ודמו חי',
  'לבנות': 'כלים, ארכיטקטורה ואמון',
  'להטמיע': 'פיילוט ב-90 יום',
};

export function ChapterInterstitial({ chapterIndex, onDone }: { chapterIndex: number; onDone: () => void }) {
  const chapter = CHAPTERS[chapterIndex];

  // Timer instead of animationend: robust if the tab is hidden or CSS is disabled
  useEffect(() => {
    const t = window.setTimeout(onDone, CHAPTER_CARD_MS + 40);
    return () => window.clearTimeout(t);
  }, [onDone]);

  if (!chapter) return null;
  const c = chapter.color;
  const tint = TINTS[chapter.id] ?? c;
  const desc = DESCS[chapter.id];
  const isAppendix = chapterIndex >= 4;
  const number = String(chapterIndex + 1).padStart(2, '0');

  return (
    <div className="mx-ci" aria-hidden style={{ '--mx-ci-dur': `${CHAPTER_CARD_MS}ms` } as CSSProperties}>
      <div
        className="mx-ci-panel"
        style={{
          background: `
            radial-gradient(ellipse 55% 60% at 50% 46%, ${c}40 0%, transparent 70%),
            linear-gradient(90deg, ${c}26 0%, transparent 38%, transparent 70%, ${c}38 100%),
            #05050F
          `,
        }}
      >
        <div className="mx-ci-edge" style={{ background: `linear-gradient(90deg, ${c} 0%, ${c}66 22%, transparent 100%)` }} />
        <div className="mx-ci-trail" style={{ background: `linear-gradient(90deg, transparent 0%, ${c}55 70%, ${c}CC 100%)` }} />

        {/* Same anatomy as the title trailer chapter cards: kicker, hairline,
            big gradient word, short description. No masks, so no glow is
            ever clipped; Hebrew gets no letter-spacing. */}
        <div className="mx-ci-content" dir="rtl">
          {!isAppendix && (
            <div className="mx-ci-kicker" style={{ color: tint }}>פרק {number}</div>
          )}
          <div
            className="mx-ci-rule"
            style={{ background: `linear-gradient(90deg, transparent, ${tint}, transparent)` }}
          />
          <div
            className="mx-ci-word"
            style={{
              backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 45%, ${tint} 100%)`,
              filter: `drop-shadow(0 0 36px ${c}66)`,
            }}
          >
            {chapter.label}
          </div>
          {desc && <div className="mx-ci-desc">{desc}</div>}
        </div>
      </div>
    </div>
  );
}
