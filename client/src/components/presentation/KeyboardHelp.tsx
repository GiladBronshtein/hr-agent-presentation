/**
 * KeyboardHelp - Keyboard shortcuts overlay
 * Design: dark glass modal with a spectrum hairline, lit key caps; hidden by
 * default, shown only when isKeyboardHelpOpen
 */
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { usePresentationStore } from '../../store/presentationStore';
import { PALETTE, SPECTRUM } from '../../lib/palette';

const SHORTCUTS = [
  { keys: ['→', 'Space'], description: 'סצנה הבאה' },
  { keys: ['←'], description: 'סצנה קודמת' },
  { keys: ['Home'], description: 'סצנה ראשונה' },
  { keys: ['End'], description: 'סצנה אחרונה' },
  { keys: ['Esc'], description: 'פתיחה / סגירה של מפת המצגת' },
  { keys: ['F'], description: 'מסך מלא' },
  { keys: ['P'], description: 'הערות מציג' },
  { keys: ['N'], description: 'חלון מציג (מסך שני)' },
  { keys: ['B'], description: 'מסך שחור (הפסקה)' },
  { keys: ['M'], description: 'השתקה / הפעלת צליל' },
  { keys: ['I'], description: 'ניגון חוזר של פתיח הכותרת' },
  { keys: ['R'], description: 'איפוס דמו' },
  { keys: ['H', '?'], description: 'עזרה' },
];

export function KeyboardHelp() {
  const { isKeyboardHelpOpen, toggleKeyboardHelp } = usePresentationStore();

  // Close on Escape key
  useEffect(() => {
    if (!isKeyboardHelpOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        toggleKeyboardHelp();
      }
    };
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [isKeyboardHelpOpen, toggleKeyboardHelp]);

  // Render nothing when closed
  if (!isKeyboardHelpOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        boxSizing: 'border-box',
        background: 'radial-gradient(80% 70% at 50% 40%, rgba(19,26,68,0.9), rgba(6,9,24,0.96))',
        animation: 'fadeIn 0.2s ease both',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) toggleKeyboardHelp();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="קיצורי מקלדת"
    >
      <div
        dir="rtl"
        style={{
          width: '100%',
          maxWidth: '520px',
          maxHeight: '100%',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          boxSizing: 'border-box',
          borderRadius: '20px',
          background: 'linear-gradient(180deg, rgba(246,242,234,0.06), rgba(246,242,234,0.01) 40%), rgba(9,13,38,0.97)',
          border: '1px solid rgba(246,242,234,0.16)',
          boxShadow: '0 0 0 1px rgba(155,107,255,0.12), 0 40px 100px -40px rgba(155,107,255,0.5), 0 30px 70px rgba(0,0,0,0.6)',
          position: 'relative',
          padding: 'clamp(1.1rem, 3vh, 1.75rem) clamp(1.1rem, 4vw, 1.75rem)',
          animation: 'scaleIn 0.3s var(--mo-ease-out) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 22, right: 22, height: 2, borderRadius: 2, background: SPECTRUM, boxShadow: '0 0 14px rgba(240,70,158,0.55)' }} />
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 'clamp(0.5rem, 1.6vh, 1rem)',
        }}>
          <h2 style={{
            margin: 0, fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3,
            color: PALETTE.paper, fontFamily: "'Heebo', sans-serif",
          }}>
            קיצורי מקלדת
          </h2>
          <button
            onClick={toggleKeyboardHelp}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'rgba(246,242,234,0.06)',
              border: '1px solid rgba(246,242,234,0.12)',
              color: 'rgba(246,242,234,0.78)',
              cursor: 'pointer',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'rgba(246,242,234,0.14)';
              btn.style.color = PALETTE.paper;
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'rgba(246,242,234,0.06)';
              btn.style.color = 'rgba(246,242,234,0.78)';
            }}
            aria-label="סגירה"
          >
            <X size={15} />
          </button>
        </div>

        {/* Shortcuts list */}
        <div>
          {SHORTCUTS.map((shortcut, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: '1rem',
                padding: 'clamp(0.3rem, 0.9vh, 0.55rem) 0',
                borderBottom: i < SHORTCUTS.length - 1 ? '1px solid rgba(246,242,234,0.07)' : 'none',
              }}
            >
              <span style={{
                color: 'rgba(246,242,234,0.86)', fontSize: '1.0625rem', lineHeight: 1.35,
                fontFamily: "'Heebo', sans-serif", minWidth: 0, textWrap: 'balance',
              }}>
                {shortcut.description}
              </span>
              <div dir="ltr" style={{ display: 'flex', gap: '0.3rem', flexShrink: 0 }}>
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: '2rem', height: '1.75rem', padding: '0 0.5rem', borderRadius: '6px',
                      boxSizing: 'border-box', lineHeight: 1,
                      // Arrow glyphs are tiny in Space Grotesk: draw them in the system font
                      ...(key.length === 1 && /[←→]/.test(key)
                        ? { fontSize: '1.05rem', fontFamily: 'system-ui, sans-serif' }
                        : { fontSize: '0.875rem', fontFamily: "'Space Grotesk', monospace" }),
                      fontWeight: 600, color: PALETTE.paper,
                      background: 'linear-gradient(180deg, rgba(246,242,234,0.12), rgba(246,242,234,0.04))',
                      border: '1px solid rgba(187,162,255,0.35)',
                      boxShadow: '0 2px 0 rgba(0,0,0,0.35), 0 0 14px -6px rgba(155,107,255,0.8)',
                    }}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{
          margin: 'clamp(0.5rem, 1.6vh, 1rem) 0 0', color: PALETTE.muted,
          fontSize: '0.875rem', lineHeight: 1.4, textAlign: 'center',
          fontFamily: "'Heebo', sans-serif",
        }}>
          לחיצה על H בכל עת פותחת עזרה זו
        </p>
      </div>
    </div>
  );
}
