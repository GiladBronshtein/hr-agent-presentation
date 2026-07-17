import { usePresentationStore } from '../../store/presentationStore';
import { X } from 'lucide-react';

const SHORTCUTS = [
  { keys: ['→', 'Space'], description: 'סצנה הבאה' },
  { keys: ['←'], description: 'סצנה קודמת' },
  { keys: ['Home'], description: 'סצנה ראשונה' },
  { keys: ['End'], description: 'סצנה אחרונה' },
  { keys: ['Esc'], description: 'פתח/סגור מפת מצגת' },
  { keys: ['F'], description: 'מסך מלא' },
  { keys: ['P'], description: 'הערות מציג' },
  { keys: ['M'], description: 'הפעל/השתק' },
  { keys: ['R'], description: 'אפס דמו' },
  { keys: ['H', '?'], description: 'עזרה' },
  { keys: ['Ctrl+Shift+D'], description: 'אבחון (מפתחים)' },
];

export function KeyboardHelp() {
  const { isKeyboardHelpOpen, toggleKeyboardHelp } = usePresentationStore();

  return (
    <div
      className={`chapter-map ${isKeyboardHelpOpen ? 'open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="קיצורי מקלדת"
    >
      <div className="w-full max-w-md p-8" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">קיצורי מקלדת</h2>
          <button
            onClick={toggleKeyboardHelp}
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="סגור"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {SHORTCUTS.map((shortcut, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
              <span className="text-white/70 text-sm">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key) => (
                  <kbd
                    key={key}
                    className="px-2 py-0.5 rounded text-xs font-mono text-white/60"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-white/30 text-xs text-center">
          לחץ H או ? בכל עת לפתיחת עזרה זו
        </p>
      </div>
    </div>
  );
}
