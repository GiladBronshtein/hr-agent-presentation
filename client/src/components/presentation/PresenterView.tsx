/**
 * PresenterView — second-window presenter console (#/presenter).
 * Synced with the main window over BroadcastChannel; renders no heavy scenes,
 * just what the presenter needs: current/next slide, notes, timer, clock.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { SCENES, CHAPTERS, getCurrentChapter } from '../../data/scenes';
import { SPEAKER_NOTES } from '../../data/speakerNotes';
import { PRESENTER_CHANNEL, PresenterMessage } from '../../lib/presenterChannel';
import {
  ChevronRight, ChevronLeft, Clock, Play, Pause, RotateCcw,
  AlertTriangle, MessageCircleQuestion, ArrowLeft, Timer,
} from 'lucide-react';

const CHAPTER_COLORS: Record<string, string> = {
  'להבין': '#6366F1',
  'לראות': '#0891B2',
  'לבנות': '#10B981',
  'להטמיע': '#F59E0B',
  'נספח': '#64748B',
};

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function formatElapsed(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, '0');
  const ss = String(s).padStart(2, '0');
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}

export function PresenterView() {
  const [index, setIndex] = useState(0);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Elapsed talk timer
  const [running, setRunning] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number>(Date.now());
  useEffect(() => {
    if (!running) return;
    startRef.current = Date.now() - elapsed;
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 500);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  const now = useClock();

  useEffect(() => {
    const channel = new BroadcastChannel(PRESENTER_CHANNEL);
    channelRef.current = channel;
    channel.onmessage = (e: MessageEvent<PresenterMessage>) => {
      if (e.data.type === 'state') setIndex(e.data.index);
    };
    channel.postMessage({ type: 'hello' } satisfies PresenterMessage);
    return () => channel.close();
  }, []);

  const send = useCallback((msg: PresenterMessage) => {
    channelRef.current?.postMessage(msg);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); send({ type: 'nav', action: 'next' }); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); send({ type: 'nav', action: 'prev' }); }
      if (e.key === ' ') { e.preventDefault(); send({ type: 'nav', action: 'next' }); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [send]);

  const scene = SCENES[index];
  const nextScene = SCENES[index + 1];
  const notes = scene ? SPEAKER_NOTES[scene.id] : undefined;
  const chapter = getCurrentChapter(index);
  const chapterInfo = CHAPTERS.find((c) => c.id === chapter);
  const color = CHAPTER_COLORS[chapter] || '#6366F1';

  const plannedMinutes = SCENES.slice(0, index).reduce((acc, s) => acc + s.estimatedMinutes, 0);

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', background: '#07070F', color: 'white',
      fontFamily: "'Heebo', 'DM Sans', sans-serif",
      display: 'flex', flexDirection: 'column',
      padding: '1.25rem 1.5rem',
      gap: '1rem',
    }}>
      {/* Top bar: timer + clock */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700,
            background: color + '1A', color, border: `1px solid ${color}35`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {chapterInfo?.label || chapter}
          </span>
          <span style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)', fontSize: '1rem' }}>
            {String(index + 1).padStart(2, '0')}/{String(SCENES.length).padStart(2, '0')}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem' }}>
            <Timer size={14} />
            מתוכנן עד כאן: {plannedMinutes} דק׳
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '1.75rem', fontWeight: 700,
              color: running ? '#22D3EE' : 'rgba(255,255,255,0.55)',
            }}>
              {formatElapsed(elapsed)}
            </span>
            <button onClick={() => setRunning((r) => !r)} aria-label={running ? 'השהה' : 'המשך'} style={btnStyle}>
              {running ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button onClick={() => { setElapsed(0); startRef.current = Date.now(); }} aria-label="אפס" style={btnStyle}>
              <RotateCcw size={15} />
            </button>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '1.25rem', color: 'rgba(255,255,255,0.55)' }}>
            {now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Current + Next */}
      <div className="presenter-grid-hero">
        <div style={{
          padding: '1.25rem 1.5rem', borderRadius: '16px',
          background: color + '10', border: `1px solid ${color}30`,
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color, letterSpacing: '0.1em', marginBottom: '0.4rem', fontFamily: "'Space Grotesk', sans-serif" }}>
            סלייד נוכחי
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.2 }}>
            {scene?.hebrewTitle}
          </div>
          <div style={{ marginTop: '0.4rem', color: 'rgba(255,255,255,0.62)', fontSize: '1.05rem' }}>
            {scene?.takeaway}
          </div>
        </div>

        <div style={{
          padding: '1.25rem 1.5rem', borderRadius: '16px',
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
        }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', marginBottom: '0.4rem', fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowLeft size={13} />
            הסלייד הבא
          </div>
          {nextScene ? (
            <>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.25, color: 'rgba(255,255,255,0.85)' }}>
                {nextScene.hebrewTitle}
              </div>
              <div style={{ marginTop: '0.35rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
                {nextScene.takeaway}
              </div>
            </>
          ) : (
            <div style={{ color: 'rgba(255,255,255,0.5)' }}>סוף המצגת</div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div style={{
        flex: 1, minHeight: 0, overflowY: 'auto',
        padding: '1.25rem 1.5rem', borderRadius: '16px',
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {notes ? (
          <div className="presenter-grid-notes">
            <NoteBlock label="מסר מרכזי" strong>{notes.mainMessage}</NoteBlock>
            <NoteBlock label="הסבר">{notes.explanation}</NoteBlock>
            <NoteBlock label="דוגמה">{notes.example}</NoteBlock>
            {notes.audienceQuestion && (
              <NoteBlock label="שאלה לקהל" icon={<MessageCircleQuestion size={13} />} color="#22D3EE">
                {notes.audienceQuestion}
              </NoteBlock>
            )}
            <NoteBlock label="מגבלה / סיכון" icon={<AlertTriangle size={13} />} color="#F59E0B">
              {notes.riskOrLimitation}
            </NoteBlock>
            <NoteBlock label="מעבר לסלייד הבא" color="#10B981">{notes.transition}</NoteBlock>
          </div>
        ) : (
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '1.05rem' }}>אין הערות לסצנה זו</div>
        )}
      </div>

      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <button onClick={() => send({ type: 'nav', action: 'prev' })} aria-label="סלייד קודם" style={{ ...navBtnStyle, opacity: index === 0 ? 0.35 : 1 }}>
          <ChevronRight size={20} />
          קודם
        </button>
        {notes && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', padding: '0 1rem' }}>
            <Clock size={14} />
            {notes.estimatedMinutes} דק׳ לסלייד
          </span>
        )}
        <button onClick={() => send({ type: 'nav', action: 'next' })} aria-label="סלייד הבא" style={{ ...navBtnStyle, opacity: index >= SCENES.length - 1 ? 0.35 : 1 }}>
          הבא
          <ChevronLeft size={20} />
        </button>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  width: '32px', height: '32px', borderRadius: '8px',
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
};

const navBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  padding: '0.7rem 1.5rem', borderRadius: '12px',
  background: 'rgba(99,102,241,0.14)', border: '1px solid rgba(99,102,241,0.3)',
  color: '#A5B4FC', fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer',
  fontFamily: "'Heebo', sans-serif",
};

function NoteBlock({ label, children, icon, color, strong }: {
  label: string; children: React.ReactNode; icon?: React.ReactNode; color?: string; strong?: boolean;
}) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em',
        color: color || 'rgba(255,255,255,0.45)', marginBottom: '0.35rem',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {icon}
        {label}
      </div>
      <p style={{
        margin: 0, lineHeight: 1.65,
        fontSize: strong ? '1.2rem' : '1.05rem',
        color: strong ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.75)',
        fontWeight: strong ? 600 : 400,
      }}>
        {children}
      </p>
    </div>
  );
}
