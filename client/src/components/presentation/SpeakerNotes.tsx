import { usePresentationStore } from '../../store/presentationStore';
import { SCENES } from '../../data/scenes';
import { SPEAKER_NOTES } from '../../data/speakerNotes';
import { X, Clock, AlertTriangle, ArrowLeft } from 'lucide-react';

export function SpeakerNotes() {
  const { isPresenterNotesOpen, togglePresenterNotes, currentSceneIndex } = usePresentationStore();
  const currentScene = SCENES[currentSceneIndex];
  const notes = currentScene ? SPEAKER_NOTES[currentScene.id] : null;

  return (
    <div
      className={`presenter-panel ${isPresenterNotesOpen ? 'open' : ''}`}
      role="complementary"
      aria-label="הערות מציג"
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Scene title */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-white/60 text-base font-mono">
              {String(currentSceneIndex + 1).padStart(2, '0')}
            </span>
            <h3 className="text-white font-bold text-xl truncate">
              {currentScene?.hebrewTitle}
            </h3>
            {notes && (
              <div className="flex items-center gap-1 text-white/60 text-base shrink-0">
                <Clock size={12} />
                <span>{notes.estimatedMinutes} דקות</span>
              </div>
            )}
          </div>

          {notes ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
              {/* Main message */}
              <div>
                <div className="text-base text-white/60 uppercase tracking-wide mb-1">מסר מרכזי</div>
                <p className="text-white/90 leading-relaxed">{notes.mainMessage}</p>
              </div>

              {/* Explanation */}
              <div>
                <div className="text-base text-white/60 uppercase tracking-wide mb-1">הסבר</div>
                <p className="text-white/70 leading-relaxed">{notes.explanation}</p>
              </div>

              {/* Example */}
              <div>
                <div className="text-base text-white/60 uppercase tracking-wide mb-1">דוגמה</div>
                <p className="text-white/70 leading-relaxed">{notes.example}</p>
              </div>

              {/* Risk/Limitation */}
              {notes.riskOrLimitation && (
                <div>
                  <div className="flex items-center gap-1 text-base text-yellow-400/70 uppercase tracking-wide mb-1">
                    <AlertTriangle size={10} />
                    <span>סיכון / מגבלה</span>
                  </div>
                  <p className="text-white/60 leading-relaxed">{notes.riskOrLimitation}</p>
                </div>
              )}

              {/* Audience question */}
              {notes.audienceQuestion && (
                <div>
                  <div className="text-base text-blue-400/70 uppercase tracking-wide mb-1">שאלה לקהל</div>
                  <p className="text-blue-300/80 leading-relaxed italic">"{notes.audienceQuestion}"</p>
                </div>
              )}

              {/* Transition */}
              <div>
                <div className="flex items-center gap-1 text-base text-white/60 uppercase tracking-wide mb-1">
                  <ArrowLeft size={10} />
                  <span>מעבר לסצנה הבאה</span>
                </div>
                <p className="text-white/65 leading-relaxed italic">{notes.transition}</p>
              </div>
            </div>
          ) : (
            <p className="text-white/60 text-lg">אין הערות לסצנה זו</p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={togglePresenterNotes}
          className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="סגור הערות"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
