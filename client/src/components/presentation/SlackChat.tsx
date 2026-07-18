/**
 * SlackChat - realistic Slack-style chat window for the live demo slides.
 * The audience instantly recognizes the tool, which sells the "this is real"
 * moment better than an abstract terminal.
 */
import { ReactNode } from 'react';
import { Hash } from 'lucide-react';

export function SlackWindow({ channel, children }: { channel: string; children: ReactNode }) {
  return (
    <div style={{
      borderRadius: '18px', overflow: 'hidden',
      background: '#1A1D21',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      textAlign: 'right',
    }}>
      {/* Channel header */}
      <div dir="rtl" style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: 'clamp(0.7rem, 1.2cqh, 1rem) clamp(1rem, 1.6cqw, 1.4rem)',
        borderBottom: '1px solid rgba(255,255,255,0.09)',
        background: '#222529',
      }}>
        <span style={{ display: 'inline-flex', color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(1rem, 1.3cqw, 1.2rem)' }}>
          <Hash size="1em" />
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(1.05rem, 1.4cqw, 1.3rem)', color: 'rgba(255,255,255,0.92)', direction: 'ltr' }}>
          {channel}
        </span>
        <span style={{ marginRight: 'auto', display: 'flex', gap: '6px' }}>
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
        fontSize: 'clamp(0.95rem, 1.3cqw, 1.2rem)', color: 'white',
      }}>
        {initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.2rem' }}>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: 'clamp(1.05rem, 1.4cqw, 1.3rem)', color: 'rgba(255,255,255,0.95)' }}>{name}</span>
          {isBot && (
            <span style={{
              fontSize: 'clamp(0.7rem, 0.9cqw, 0.8rem)', fontWeight: 700, letterSpacing: '0.04em',
              padding: '0.1rem 0.4rem', borderRadius: '4px',
              background: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)',
              fontFamily: "'DM Sans', sans-serif",
            }}>APP</span>
          )}
          <span style={{ fontSize: 'clamp(0.85rem, 1.1cqw, 1rem)', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', direction: 'ltr' }}>{time}</span>
        </div>
        <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.15rem, 1.7cqw, 1.6rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.55, overflowWrap: 'break-word' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator({ name }: { name: string }) {
  return (
    <div dir="rtl" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.5)', fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(0.95rem, 1.2cqw, 1.1rem)' }}>
      <span style={{ display: 'inline-flex', gap: '4px' }}>
        {[0, 1, 2].map((d) => (
          <span key={d} style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            animation: `glowPulse 1.1s ease-in-out ${d * 0.18}s infinite`,
            display: 'inline-block',
          }} />
        ))}
      </span>
      {name} מקליד...
    </div>
  );
}
