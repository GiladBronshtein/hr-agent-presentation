/**
 * RotateHint - on compact portrait screens, suggests rotating to landscape
 * for the full cinematic layout. Auto-dismisses and never comes back within
 * the session once dismissed or rotated.
 */
import { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { isCompactViewport, useViewportSize } from './SceneStage';

export function RotateHint() {
  const { w, h } = useViewportSize();
  const [dismissed, setDismissed] = useState(false);

  const isPortraitCompact = isCompactViewport(w, h) && h > w;

  useEffect(() => {
    if (!isPortraitCompact) return;
    const t = setTimeout(() => setDismissed(true), 5000);
    return () => clearTimeout(t);
  }, [isPortraitCompact]);

  if (!isPortraitCompact || dismissed) return null;

  return (
    <div
      dir="rtl"
      onClick={() => setDismissed(true)}
      style={{
        position: 'fixed',
        top: '1rem',
        left: 0,
        right: 0,
        marginInline: 'auto',
        width: 'fit-content',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.55rem 1rem',
        borderRadius: '100px',
        background: 'rgba(8, 8, 20, 0.92)',
        border: '1px solid rgba(99,102,241,0.35)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        color: '#A5B4FC',
        fontSize: '0.9rem',
        fontWeight: 600,
        fontFamily: "'Heebo', sans-serif",
        animation: 'fadeInUp 0.4s ease both',
        cursor: 'pointer',
        maxWidth: '92vw',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
    >
      <RotateCcw size={15} style={{ flexShrink: 0 }} />
      סובבו את המכשיר לרוחב לתצוגה מיטבית
    </div>
  );
}
