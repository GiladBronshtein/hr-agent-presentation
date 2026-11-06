/**
 * AgentSceneTemplate - shared layout for the L&D agent slides: four in the
 * main track (S14-S17, "שימוש · 1/4" to 4/4) and five in the appendix
 * (S18-S22, "נספח · 1/5" to 5/5). Each slide gets a conference-scale
 * before-to-after hero, a faint ghost icon, and series dots so the audience
 * always knows where they are in its own run.
 * Each agent owns one spectrum color (legacy amber is mapped by series
 * position), and the whole stage is lit in it.
 */
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SceneBase } from './SceneBase';
import { SourceChip } from './SourceChip';
import { PALETTE, SPECTRUM_STOPS, fromLegacy, isLegacyAccent, textOn } from '../../lib/palette';
import { RevealText } from '../motion/RevealText';
import { useReducedMotion } from '../motion/useReducedMotion';
import '../motion/motion.css';

export interface AgentSceneProps {
  /** 1-based position in this slide's series */
  seriesIndex: number;
  /** Number of slides in the series (4 in the main track, 5 in the appendix) */
  seriesTotal: number;
  /** Series name shown before the count, e.g. "שימוש" or "נספח" */
  seriesLabel?: string;
  title: string;
  icon: LucideIcon;
  color: string;
  before: string;
  after: string;
  value: string;
  warning: string;
  /** Source ids (data/sources) behind the example; shown as chips under it */
  sources?: string[];
}

/** One hue per agent, in series order: teal first (the chapter), then the spectrum */
const AGENT_HUES = [PALETTE.teal, ...SPECTRUM_STOPS.filter((c) => c !== PALETTE.teal)];

export function AgentScene({ seriesIndex, seriesTotal, seriesLabel = 'שימוש', title, icon: Icon, color: colorProp, before, after, value, warning, sources }: AgentSceneProps) {
  const reduced = useReducedMotion();
  const color = isLegacyAccent(colorProp) ? AGENT_HUES[(seriesIndex - 1) % AGENT_HUES.length] : fromLegacy(colorProp);
  const tint = textOn(color);

  return (
    <SceneBase chapterColor={color}>
      {/* Giant ghost icon - per-agent identity */}
      <div aria-hidden style={{
        position: 'absolute', left: '-4%', top: '50%', transform: 'translateY(-50%)',
        fontSize: 'clamp(16rem, 26cqw, 24rem)', lineHeight: 1,
        color: color + '14', pointerEvents: 'none', userSelect: 'none', zIndex: 2,
        display: 'flex',
      }}>
        <Icon size="1em" strokeWidth={1} />
      </div>

      <div dir="rtl" className={reduced ? 'mx-rm' : undefined} style={{
        '--fx-c': color,
        position: 'relative', zIndex: 10, width: '100%', height: '100%',
        // Top-anchored so the title sits on the same line on every agent slide,
        // however many lines the "after" text wraps to
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start',
        padding: 'clamp(3rem, 19cqh, 13rem) clamp(3rem, 7cqw, 8rem) clamp(4.5rem, 8cqh, 6rem)',
        gap: 'clamp(1.25rem, 2.6cqh, 2.25rem)',
      } as React.CSSProperties}>

        {/* Eyebrow + title */}
        <div className="animate-fade-in-up stagger-1" style={{ textAlign: 'center' }}>
          <div className="fx-chip" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.4rem 1.1rem', borderRadius: '100px',
            marginBottom: 'clamp(0.75rem, 1.4cqh, 1.25rem)',
          }}>
            <span style={{ display: 'inline-flex', color: tint, fontSize: 'clamp(1rem, 1.3cqw, 1.2rem)' }}><Icon size="1em" /></span>
            <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: tint }}>
              {seriesLabel} · <bdi>{seriesIndex}/{seriesTotal}</bdi>
            </span>
          </div>
          <h1 className="fx-glow-soft" style={{
            fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
            fontSize: 'clamp(2.5rem, 4.6cqw, 4.4rem)',
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em',
            color: PALETTE.paper, margin: 0,
          }}><RevealText delay={160}>{title}</RevealText></h1>
        </div>

        {/* Before → After hero */}
        <div className="animate-fade-in-up stagger-2" style={{
          display: 'flex', alignItems: 'stretch', gap: 'clamp(1rem, 2cqw, 2rem)',
          width: '100%', maxWidth: '1250px',
          minHeight: 'clamp(12rem, 27cqh, 18.5rem)',
        }}>
          {/* Before: dims and gets struck through once the after is about to land */}
          <div className="mx-agent-before" style={{
            flex: 1, padding: 'clamp(1.25rem, 2.4cqh, 2rem) clamp(1.25rem, 2cqw, 2rem)',
            borderRadius: '20px', background: 'rgba(12,17,50,0.55)',
            border: '1px solid rgba(246,242,234,0.1)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: PALETTE.muted, fontFamily: "'Heebo', sans-serif" }}>לפני</div>
            <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.6rem, 2.7cqw, 2.6rem)', fontWeight: 600, color: PALETTE.muted, lineHeight: 1.25, textWrap: 'balance' } as React.CSSProperties}>
              <span className="mx-agent-strike" style={{ backgroundImage: `linear-gradient(${PALETTE.coral}, ${PALETTE.coral})` }}>{before}</span>
            </div>
          </div>

          <div className="mx-agent-arrow" style={{ display: 'flex', alignItems: 'center', color: tint, filter: `drop-shadow(0 0 10px ${color}AA)` }}>
            <ArrowLeft size={40} strokeWidth={2.5} />
          </div>

          {/* After: settles in right after the strike */}
          <div className="mx-agent-after fx-accent fx-sheen" style={{
            '--fx-sheen-delay': '1.1s',
            flex: 1.15, padding: 'clamp(1.25rem, 2.4cqh, 2rem) clamp(1.25rem, 2cqw, 2rem)',
            borderRadius: '20px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem',
            textAlign: 'center',
          } as React.CSSProperties}>
            <div style={{ fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)', fontWeight: 600, color: tint, fontFamily: "'Heebo', sans-serif" }}>אחרי</div>
            <div style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(2rem, 3.4cqw, 3.3rem)', fontWeight: 800, color: PALETTE.paper, lineHeight: 1.2, textWrap: 'balance' } as React.CSSProperties}>
              {after}
            </div>
          </div>
        </div>

        {/* Value sentence */}
        <div className="animate-fade-in-up stagger-4 fx-glass" style={{
          padding: 'clamp(0.875rem, 1.6cqh, 1.4rem) clamp(1.5rem, 2.6cqw, 2.5rem)',
          borderRadius: '16px', maxWidth: '1050px',
        }}>
          <p style={{ margin: 0, fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.25rem, 1.9cqw, 1.85rem)', color: 'rgba(246,242,234,0.9)', lineHeight: 1.5, textAlign: 'center', textWrap: 'balance' } as React.CSSProperties}>
            {value}
          </p>
          {sources && sources.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'clamp(0.5rem, 1cqh, 0.8rem)' }}>
              {sources.map((id) => <SourceChip key={id} id={id} />)}
            </div>
          )}
        </div>

        {/* Guardrail */}
        <div className="animate-fade-in stagger-6" style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: 'clamp(0.625rem, 1.1cqh, 1rem) clamp(1.1rem, 1.8cqw, 1.6rem)',
          borderRadius: '100px', background: 'rgba(255,194,75,0.07)', border: '1px solid rgba(255,194,75,0.28)',
        }}>
          <span style={{ color: PALETTE.amber, display: 'inline-flex', flexShrink: 0, fontSize: 'clamp(1.1rem, 1.5cqw, 1.4rem)' }}><AlertTriangle size="1em" /></span>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.25cqw, 1.5rem)', color: 'rgba(246,242,234,0.86)' }}>{warning}</span>
        </div>
      </div>

      {/* Series progress dots */}
      <div dir="rtl" style={{
        position: 'absolute', bottom: 'clamp(1.5rem, 3cqh, 2.25rem)', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '0.5rem', zIndex: 6, pointerEvents: 'none',
      }}>
        {Array.from({ length: seriesTotal }, (_, i) => {
          const active = i + 1 === seriesIndex;
          const done = i + 1 < seriesIndex;
          return (
            <span key={i} className={active ? 'mx-dot mx-dot-active' : 'mx-dot'} style={{
              width: active ? '26px' : '8px', height: '8px', borderRadius: '4px',
              background: active ? color : done ? color + '66' : 'rgba(246,242,234,0.18)',
              boxShadow: active ? `0 0 14px ${color}` : undefined,
              '--mx-dot-delay': `${(active ? 380 : 260) + i * 45}ms`,
            } as React.CSSProperties} />
          );
        })}
      </div>
    </SceneBase>
  );
}
