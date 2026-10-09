/**
 * SoundArmHint - browsers block audio until the page itself receives a click
 * or key press. When the deck is driven from the presenter window, the
 * audience window may never get one, so the title intro would play silently.
 * This hint appears only while sound is on but not yet armed in this window,
 * and only on the title slide while its trailer is framed by the letterbox
 * bars: it sits inside the bottom bar (bottom-left), so it never touches
 * slide content. It renders inside the scaled stage (see PresentationShell).
 */
import { useEffect, useState } from 'react';
import { Volume2 } from 'lucide-react';
import { sound } from '../../lib/sound';
import { usePresentationStore } from '../../store/presentationStore';
import { SCENES } from '../../data/scenes';

/** True while the title trailer's bottom letterbox bar is fully open */
function letterboxOpen(): boolean {
  const bar = document.querySelector('.lb-bot');
  if (!bar) return false;
  const t = getComputedStyle(bar).transform;
  if (!t || t === 'none') return true;
  const m = t.match(/matrix\(([^)]+)\)/);
  if (!m) return true;
  const scaleY = parseFloat(m[1].split(',')[3]);
  return scaleY > 0.98;
}

export function SoundArmHint() {
  const { isSoundEnabled, currentSceneIndex } = usePresentationStore();
  const onTitle = SCENES[currentSceneIndex]?.id === 'title';
  const [armed, setArmed] = useState(sound.armed);
  const [ready, setReady] = useState(false);
  const [barOpen, setBarOpen] = useState(false);

  useEffect(() => sound.onChange(() => setArmed(sound.armed)), []);
  // Give a normal key press a moment to arm it before showing anything
  useEffect(() => { const t = setTimeout(() => setReady(true), 2500); return () => clearTimeout(t); }, []);

  // Follow the trailer's bottom bar (it opens at the start, closes at the end)
  useEffect(() => {
    if (!onTitle || armed || !isSoundEnabled) { setBarOpen(false); return; }
    const tick = () => setBarOpen(letterboxOpen());
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [onTitle, armed, isSoundEnabled]);

  if (!isSoundEnabled || armed || !ready || !onTitle || !barOpen) return null;

  return (
    <button
      dir="rtl"
      data-sound-hint
      onClick={() => sound.unlock()}
      style={{
        // Stage coordinates: centered in the bottom letterbox bar (11% tall)
        position: 'absolute', bottom: '5.5%', left: '3.2%', transform: 'translateY(50%)', zIndex: 90,
        display: 'flex', alignItems: 'center', gap: '0.55rem',
        padding: '0.45rem 1rem', borderRadius: '100px',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(252,211,77,0.32)',
        color: 'rgba(252,211,77,0.9)', fontFamily: "'Heebo', sans-serif", fontSize: '1.1rem', fontWeight: 500,
        lineHeight: 1.2, whiteSpace: 'nowrap', cursor: 'pointer',
        animation: 'fadeIn 0.4s var(--mo-ease-out) both',
      }}
    >
      <Volume2 size={18} />
      לחיצה אחת בחלון הזה מפעילה את הצליל
    </button>
  );
}
