/**
 * PresenterView - second-window presenter console (#/presenter).
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
import { PALETTE, SPECTRUM, textOn } from '../../lib/palette';

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
  const color = chapterInfo?.color ?? PALETTE.violet;
  const tint = textOn(color);

  const plannedMinutes = SCENES.slice(0, index).reduce((acc, s) => acc + s.estimatedMinutes, 0);

  return (
    <div dir="rtl" style={{
      minHeight: '100vh', color: PALETTE.paper,
      background: `radial-gradient(70% 50% at 85% -10%, ${color}26, transparent 70%), radial-gradient(60% 50% at 0% 110%, ${PALETTE.blue}1A, transparent 70%), ${PALETTE.bg0}`,
      borderTop: '2px solid transparent',
      borderImage: `${SPECTRUM} 1`,
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
            background: color + '22', color: tint, border: `1px solid ${color}55`, boxShadow: `0 0 18px -6px ${color}`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {chapterInfo?.label || chapter}
          </span>
          <span style={{ fontFamily: 'monospace', color: PALETTE.muted, fontSize: '1rem' }}>
            {String(index + 1).padStart(2, '0')}/{String(SCENES.length).padStart(2, '0')}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: PALETTE.muted, fontSize: '0.95rem' }}>
            <Timer size={14} />
            מתוכנן עד כאן: {plannedMinutes} דק׳
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '1.75rem', fontWeight: 700,
              color: running ? PALETTE.paper : PALETTE.muted,
            }}>
              {formatElapsed(elapsed)}
            </span>
            <button onClick={() => setRunning((r) => !r)} aria-label={running ? 'השהיה' : 'המשך'} style={btnStyle}>
              {running ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button onClick={() => { setElapsed(0); startRef.current = Date.now(); }} aria-label="איפוס" style={btnStyle}>
              <RotateCcw size={15} />
            </button>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '1.25rem', color: PALETTE.muted }}>
            {now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Current + Next */}
      <div className="presenter-grid-hero">
        <div style={{
          padding: '1.25rem 1.5rem', borderRadius: '16px',
          background: `linear-gradient(160deg, ${color}24, ${color}08)`, border: `1px solid ${color}55`,
          boxShadow: `0 0 50px -20px ${color}`,
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: tint, letterSpacing: '0.1em', marginBottom: '0.4rem', fontFamily: "'Space Grotesk', sans-serif" }}>
            סצנה נוכחית
          </div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800, lineHeight: 1.2 }}>
            {scene?.hebrewTitle}
          </div>
          <div style={{ marginTop: '0.4rem', color: 'rgba(246,242,234,0.8)', fontSize: '1.05rem' }}>
            {scene?.takeaway}
          </div>
        </div>

        <div style={{
          padding: '1.25rem 1.5rem', borderRadius: '16px',
          background: 'rgba(246,242,234,0.04)', border: '1px solid rgba(246,242,234,0.1)',
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: PALETTE.muted, letterSpacing: '0.1em', marginBottom: '0.4rem', fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ArrowLeft size={13} />
            הסצנה הבאה
          </div>
          {nextScene ? (
            <>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, lineHeight: 1.25, color: 'rgba(246,242,234,0.9)' }}>
                {nextScene.hebrewTitle}
              </div>
              <div style={{ marginTop: '0.35rem', color: PALETTE.muted, fontSize: '0.95rem' }}>
                {nextScene.takeaway}
              </div>
            </>
          ) : (
            <div style={{ color: PALETTE.muted }}>סוף המצגת</div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div style={{
        flex: 1, minHeight: 0, overflowY: 'auto',
        padding: '1.25rem 1.5rem', borderRadius: '16px',
        background: 'rgba(246,242,234,0.03)', border: '1px solid rgba(246,242,234,0.09)',
      }}>
        {notes ? (
          <div className="presenter-grid-notes">
            <NoteBlock label="מסר מרכזי" strong>{notes.mainMessage}</NoteBlock>
            <NoteBlock label="הסבר">{notes.explanation}</NoteBlock>
            <NoteBlock label="דוגמה">{notes.example}</NoteBlock>
            {notes.audienceQuestion && (
              <NoteBlock label="שאלה לקהל" icon={<MessageCircleQuestion size={13} />} color={PALETTE.teal}>
                {notes.audienceQuestion}
              </NoteBlock>
            )}
            <NoteBlock label="סיכון / מגבלה" icon={<AlertTriangle size={13} />} color={PALETTE.amber}>
              {notes.riskOrLimitation}
            </NoteBlock>
            <NoteBlock label="מעבר לסצנה הבאה" color={tint}>{notes.transition}</NoteBlock>
          </div>
        ) : (
          <div style={{ color: PALETTE.muted, fontSize: '1.05rem' }}>אין הערות לסצנה זו</div>
        )}
      </div>

      {/* Nav bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexShrink: 0 }}>
        <button onClick={() => send({ type: 'nav', action: 'prev' })} aria-label="סצנה קודמת" style={{ ...navBtnStyle, opacity: index === 0 ? 0.35 : 1 }}>
          <ChevronRight size={20} />
          קודם
        </button>
        {notes && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', color: PALETTE.muted, fontSize: '0.95rem', padding: '0 1rem' }}>
            <Clock size={14} />
            {notes.estimatedMinutes} דק׳ לסצנה
          </span>
        )}
        <button onClick={() => send({ type: 'nav', action: 'next' })} aria-label="סצנה הבאה" style={{ ...navBtnStyle, opacity: index >= SCENES.length - 1 ? 0.35 : 1 }}>
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
  background: 'rgba(246,242,234,0.06)', border: '1px solid rgba(246,242,234,0.14)',
  color: 'rgba(246,242,234,0.8)', cursor: 'pointer',
};

const navBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
  padding: '0.7rem 1.5rem', borderRadius: '12px',
  background: 'linear-gradient(180deg, rgba(246,242,234,0.12), rgba(246,242,234,0.05))', border: '1px solid rgba(187,162,255,0.45)',
  boxShadow: '0 0 24px -10px rgba(155,107,255,0.9)',
  color: PALETTE.paper, fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer',
  fontFamily: "'Heebo', sans-serif",
};

function NoteBlock({ label, children, icon, color, strong }: {
  label: string; children: React.ReactNode; icon?: React.ReactNode; color?: string; strong?: boolean;
}) {
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.3rem',
        fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em',
        color: color || PALETTE.muted, marginBottom: '0.35rem',
        fontFamily: "'Space Grotesk', sans-serif",
      }}>
        {icon}
        {label}
      </div>
      <p style={{
        margin: 0, lineHeight: 1.65,
        fontSize: strong ? '1.2rem' : '1.05rem',
        color: strong ? 'rgba(246,242,234,0.96)' : 'rgba(246,242,234,0.8)',
        fontWeight: strong ? 600 : 400,
      }}>
        {children}
      </p>
    </div>
  );
}
