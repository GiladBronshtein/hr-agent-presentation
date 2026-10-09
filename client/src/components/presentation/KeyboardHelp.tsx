/**
 * KeyboardHelp - Keyboard shortcuts overlay
 * Design: AI-Native UI glassmorphic modal - hidden by default, shown only when isKeyboardHelpOpen
 */
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { usePresentationStore } from '../../store/presentationStore';

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
        background: 'rgba(3, 3, 12, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
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
          background: 'rgba(12, 12, 30, 0.97)',
          border: '1px solid rgba(99,102,241,0.22)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          padding: 'clamp(1.1rem, 3vh, 1.75rem) clamp(1.1rem, 4vw, 1.75rem)',
          animation: 'scaleIn 0.3s var(--mo-ease-out) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 'clamp(0.5rem, 1.6vh, 1rem)',
        }}>
          <h2 style={{
            margin: 0, fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3,
            color: 'white', fontFamily: "'Heebo', sans-serif",
          }}>
            קיצורי מקלדת
          </h2>
          <button
            onClick={toggleKeyboardHelp}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.68)',
              cursor: 'pointer',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'rgba(255,255,255,0.14)';
              btn.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.background = 'rgba(255,255,255,0.06)';
              btn.style.color = 'rgba(255,255,255,0.68)';
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
                borderBottom: i < SHORTCUTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span style={{
                color: 'rgba(255,255,255,0.78)', fontSize: '1.0625rem', lineHeight: 1.35,
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
                      fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
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
          margin: 'clamp(0.5rem, 1.6vh, 1rem) 0 0', color: 'rgba(255,255,255,0.5)',
          fontSize: '0.875rem', lineHeight: 1.4, textAlign: 'center',
          fontFamily: "'Heebo', sans-serif",
        }}>
          לחיצה על H בכל עת פותחת עזרה זו
        </p>
      </div>
    </div>
  );
}
