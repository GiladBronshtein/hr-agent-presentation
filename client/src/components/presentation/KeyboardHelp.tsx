/**
 * KeyboardHelp — Keyboard shortcuts overlay
 * Design: AI-Native UI glassmorphic modal — hidden by default, shown only when isKeyboardHelpOpen
 */
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { usePresentationStore } from '../../store/presentationStore';

const SHORTCUTS = [
  { keys: ['→', 'Space'], description: 'סצנה הבאה' },
  { keys: ['←'], description: 'סצנה קודמת' },
  { keys: ['Home'], description: 'סצנה ראשונה' },
  { keys: ['End'], description: 'סצנה אחרונה' },
  { keys: ['Esc'], description: 'פתח/סגור מפת מצגת' },
  { keys: ['F'], description: 'מסך מלא' },
  { keys: ['P'], description: 'הערות מציג' },
  { keys: ['N'], description: 'חלון מציג (מסך שני)' },
  { keys: ['B'], description: 'מסך שחור (הפסקה)' },
  { keys: ['R'], description: 'אפס דמו' },
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
          maxWidth: '400px',
          margin: '0 1rem',
          borderRadius: '20px',
          background: 'rgba(12, 12, 30, 0.97)',
          border: '1px solid rgba(99,102,241,0.22)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)',
          padding: '1.75rem',
          animation: 'scaleIn 0.25s cubic-bezier(0.23, 1, 0.32, 1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '1.25rem',
        }}>
          <h2 style={{
            margin: 0, fontSize: '1.05rem', fontWeight: 700,
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
            aria-label="סגור"
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
                padding: '0.45rem 0',
                borderBottom: i < SHORTCUTS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <span style={{
                color: 'rgba(255,255,255,0.6)', fontSize: '2.1rem',
                fontFamily: "'Heebo', sans-serif",
              }}>
                {shortcut.description}
              </span>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    style={{
                      padding: '0.18rem 0.45rem', borderRadius: '5px',
                      fontSize: '1rem', fontFamily: "'Space Grotesk', monospace",
                      fontWeight: 600, color: 'rgba(255,255,255,0.68)',
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
          marginTop: '1rem', color: 'rgba(255,255,255,0.18)',
          fontSize: '1rem', textAlign: 'center',
          fontFamily: "'Heebo', sans-serif",
        }}>
          לחץ H בכל עת לפתיחת עזרה זו
        </p>
      </div>
    </div>
  );
}
