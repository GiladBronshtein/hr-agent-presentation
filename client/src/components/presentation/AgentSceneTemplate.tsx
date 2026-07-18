/**
 * AgentSceneTemplate — shared cinematic layout for the nine HR agent slides
 * (S14-S22). Gives each agent a color identity, a conference-scale
 * before→after hero, a giant ghost icon, and series progress dots so the
 * audience always knows where they are in the 9-agent run.
 */
import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { SceneBase } from './SceneBase';

const SERIES_LENGTH = 9;

export interface AgentSceneProps {
  /** 1-based position in the 9-agent series */
  index: number;
  title: string;
  icon: React.ElementType;
  color: string;
  before: string;
  after: string;
  value: string;
  warning: string;
}

export function AgentScene({ index, title, icon: Icon, color, before, after, value, warning }: AgentSceneProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  return (
    <SceneBase>
      {/* Giant ghost icon — per-agent identity */}
      <div aria-hidden style={{
        position: 'absolute', left: '-4%', top: '50%', transform: 'translateY(-50%)',
        fontSize: 'clamp(16rem, 26cqw, 24rem)', lineHeight: 1,
        color: color + '0D', pointerEvents: 'none', userSelect: 'none', zIndex: 2,
        display: 'flex',
      }}>
        <Icon size="1em" strokeWidth={1} />
      </div>

      <div dir="rtl" style={{
        position: 'relative', zIndex: 10, width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(2rem, 4cqh, 3.5rem) clamp(3rem, 7cqw, 8rem) clamp(4.5rem, 8cqh, 6rem)',
        gap: 'clamp(1.25rem, 2.6cqh, 2.25rem)',
        opacity: mounted ? 1 : 0, transition: 'opacity 0.5s ease',
      }}>

        {/* Eyebrow + title */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.4rem 1rem', borderRadius: '100px',
            background: color + '14', border: `1px solid ${color}30`,
            marginBottom: 'clamp(0.75rem, 1.4cqh, 1.25rem)',
          }}>
            <span style={{ display: 'inline-flex', color, fontSize: 'clamp(1rem, 1.3cqw, 1.2rem)' }}><Icon size="1em" /></span>
            <span style={{ fontFamily: "'Space Grotesk', 'Heebo', sans-serif", fontSize: 'clamp(0.95rem, 1.2cqw, 1.1rem)', fontWeight: 700, color, letterSpacing: '0.08em' }}>
              שימוש {index}/{SERIES_LENGTH}
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(2.5rem, 4.6cqw, 4.4rem)',
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em',
            color: 'white', margin: 0,
          }}>{title}</h1>
        </div>

        {/* Before → After hero */}
        <div className="animate-fade-in-up stagger-2" style={{
          display: 'flex', alignItems: 'stretch', gap: 'clamp(1rem, 2cqw, 2rem)',
          width: '100%', maxWidth: '1250px',
        }}>
          <div style={{
            flex: 1, padding: 'clamp(1.25rem, 2.4cqh, 2rem) clamp(1.25rem, 2cqw, 2rem)',
            borderRadius: '20px', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 'clamp(0.95rem, 1.2cqw, 1.1rem)', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', fontFamily: "'Space Grotesk', 'Heebo', sans-serif" }}>לפני</div>
            <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.6rem, 2.7cqw, 2.6rem)', fontWeight: 600, color: 'rgba(255,255,255,0.55)', lineHeight: 1.25 }}>
              {before}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', color, opacity: mounted ? 1 : 0, transition: 'opacity 0.4s ease 0.5s' }}>
            <ArrowLeft size={40} strokeWidth={2.5} style={{ filter: `drop-shadow(0 0 12px ${color})`, animation: 'float 2.4s ease-in-out infinite' }} />
          </div>

          <div style={{
            flex: 1.15, padding: 'clamp(1.25rem, 2.4cqh, 2rem) clamp(1.25rem, 2cqw, 2rem)',
            borderRadius: '20px', background: color + '10',
            border: `1px solid ${color}40`,
            boxShadow: `0 0 48px ${color}1F`,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem',
            textAlign: 'center',
            animation: mounted ? 'popIn 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0.55s both' : 'none',
          }}>
            <div style={{ fontSize: 'clamp(0.95rem, 1.2cqw, 1.1rem)', fontWeight: 700, color: color + 'CC', letterSpacing: '0.14em', fontFamily: "'Space Grotesk', 'Heebo', sans-serif" }}>אחרי</div>
            <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(2rem, 3.4cqw, 3.3rem)', fontWeight: 800, color: 'white', lineHeight: 1.2, textShadow: `0 0 40px ${color}60` }}>
              {after}
            </div>
          </div>
        </div>

        {/* Value sentence */}
        <div className="animate-fade-in-up stagger-4" style={{
          padding: 'clamp(0.875rem, 1.6cqh, 1.4rem) clamp(1.5rem, 2.6cqw, 2.5rem)',
          borderRadius: '16px', background: 'rgba(255,255,255,0.035)',
          border: '1px solid rgba(255,255,255,0.09)', maxWidth: '1050px',
        }}>
          <p style={{ margin: 0, fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.25rem, 1.9cqw, 1.85rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, textAlign: 'center' }}>
            {value}
          </p>
        </div>

        {/* Guardrail */}
        <div className="animate-fade-in stagger-6" style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: 'clamp(0.625rem, 1.1cqh, 1rem) clamp(1.1rem, 1.8cqw, 1.6rem)',
          borderRadius: '100px', background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)',
        }}>
          <span style={{ color: '#FB7185', display: 'inline-flex', flexShrink: 0, fontSize: 'clamp(1.1rem, 1.5cqw, 1.4rem)' }}><AlertTriangle size="1em" /></span>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.4cqw, 1.3rem)', color: 'rgba(255,255,255,0.72)' }}>{warning}</span>
        </div>
      </div>

      {/* Series progress dots */}
      <div dir="rtl" style={{
        position: 'absolute', bottom: 'clamp(1.5rem, 3cqh, 2.25rem)', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 6, pointerEvents: 'none',
      }}>
        {Array.from({ length: SERIES_LENGTH }, (_, i) => (
          <span key={i} style={{
            width: i + 1 === index ? '26px' : '8px', height: '8px', borderRadius: '4px',
            background: i + 1 === index ? color : 'rgba(255,255,255,0.16)',
            boxShadow: i + 1 === index ? `0 0 12px ${color}90` : 'none',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </SceneBase>
  );
}
