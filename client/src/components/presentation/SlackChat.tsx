/**
 * SlackChat - realistic Slack-style chat window for the live demo slides.
 * The audience instantly recognizes the tool, which sells the "this is real"
 * moment better than an abstract terminal. The window keeps Slack's own
 * colors and sits on the stage like a lit screen: a hairline of chapter light
 * on its edge and a soft colored glow behind it.
 */
import { ReactNode } from 'react';
import { Hash } from 'lucide-react';

export function SlackWindow({ channel, children }: { channel: string; children: ReactNode }) {
  return (
    <div className="fx-hairline" style={{
      borderRadius: '18px',
      background: '#1A1D21',
      border: '1px solid rgba(246,242,234,0.1)',
      boxShadow: '0 0 0 1px color-mix(in oklab, var(--ch) 18%, transparent), 0 0 90px -30px color-mix(in oklab, var(--ch) 75%, transparent), 0 30px 70px -20px rgba(0,0,0,0.65)',
      textAlign: 'right',
    }}>
      {/* Channel header */}
      <div dir="rtl" style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: 'clamp(0.7rem, 1.2cqh, 1rem) clamp(1rem, 1.6cqw, 1.4rem)',
        borderBottom: '1px solid rgba(246,242,234,0.09)',
        background: '#222529',
        borderRadius: '18px 18px 0 0',
      }}>
        <span style={{ display: 'inline-flex', color: 'rgba(246,242,234,0.62)', fontSize: 'clamp(1rem, 1.3cqw, 1.2rem)' }}>
          <Hash size="1em" />
        </span>
        <span style={{ fontFamily: "'DM Sans', 'Heebo', sans-serif", fontWeight: 700, fontSize: 'clamp(1.05rem, 1.4cqw, 1.3rem)', color: 'rgba(246,242,234,0.94)', direction: 'ltr' }}>
          {channel}
        </span>
        {/* macOS window dots: red, amber, green from the left (LTR inside the RTL bar) */}
        <span dir="ltr" style={{ marginRight: 'auto', display: 'flex', gap: '6px' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F43F5E' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
        </span>
      </div>
      <div style={{ padding: 'clamp(1rem, 1.8cqh, 1.5rem) clamp(1.1rem, 1.8cqw, 1.6rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(0.875rem, 1.6cqh, 1.4rem)' }}>
        {children}
      </div>
    </div>
  );
}

export function SlackMessage({
  initials, name, time, color, isBot = false, children,
}: {
  initials: string; name: string; time: string; color: string; isBot?: boolean; children: ReactNode;
}) {
  return (
    <div dir="rtl" style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
      <div style={{
        width: 'clamp(38px, 3.4cqw, 46px)', height: 'clamp(38px, 3.4cqw, 46px)',
        borderRadius: '10px', flexShrink: 0,
        background: color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Heebo', sans-serif", fontWeight: 800,
        fontSize: 'clamp(0.95rem, 1.3cqw, 1.2rem)', color: '#060918',
        boxShadow: isBot ? `0 0 18px -2px ${color}` : undefined,
      }}>
        {initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: 'clamp(1.05rem, 1.4cqw, 1.3rem)', color: 'rgba(246,242,234,0.96)' }}>{name}</span>
          {isBot && (
            <span style={{
              fontSize: 'clamp(0.85rem, 0.9cqw, 1rem)', fontWeight: 700, letterSpacing: '0.04em',
              padding: '0.1rem 0.4rem', borderRadius: '4px',
              background: 'rgba(246,242,234,0.14)', color: 'rgba(246,242,234,0.82)',
              fontFamily: "'DM Sans', 'Heebo', sans-serif",
            }}>APP</span>
          )}
          <span style={{ fontSize: 'clamp(0.85rem, 1.1cqw, 1rem)', color: 'rgba(246,242,234,0.6)', fontFamily: "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace", direction: 'ltr' }}>{time}</span>
        </div>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.15rem, 1.7cqw, 1.6rem)', color: 'rgba(246,242,234,0.88)', lineHeight: 1.55, overflowWrap: 'break-word' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator({ name }: { name: string }) {
  return (
    <div dir="rtl" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(246,242,234,0.66)', fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(0.95rem, 1.2cqw, 1.1rem)' }}>
      <span style={{ display: 'inline-flex', gap: '4px' }}>
        {[0, 1, 2].map((d) => (
          <span key={d} className="fx-typing-dot" style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--ch-text, #A3ABCF)',
            animationDelay: `${d * 0.16}s`,
            display: 'inline-block',
          }} />
        ))}
      </span>
      {name} בהקלדה...
    </div>
  );
}
