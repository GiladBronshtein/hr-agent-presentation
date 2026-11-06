/**
 * SceneBase - Shared scene wrapper
 * Design: editorial "learning-path line" direction. Flat navy page, paper
 * white type, one amber accent, slate for secondary. No glow, no gradient
 * text, no ambient light.
 * Typography: Heebo
 */
import { ReactNode, useEffect, useState } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { getCurrentChapter } from '../../data/scenes';
import { RevealText } from '../motion/RevealText';
import { useReducedMotion } from '../motion/useReducedMotion';
import '../motion/motion.css';

const CHAPTER_COLORS: Record<string, string> = {
  'להבין': '#F2A93B',
  'לראות': '#F2A93B',
  'לבנות': '#F2A93B',
  'להטמיע': '#F2A93B',
  'נספח': '#8A93A8',
};

interface SceneBaseProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'deep-dark' | 'light' | 'chapter-break';
  chapterColor?: string;
  /** Skip the default background - scene manages its own */
  noBg?: boolean;
}

export function SceneBase({ children, className = '', variant = 'dark', noBg = false }: SceneBaseProps) {
  const bgStyles: Record<string, React.CSSProperties> = {
    'dark': { background: '#070B17' },
    'deep-dark': { background: '#070B17' },
    'light': { background: '#F3EEE4' },
    'chapter-break': { background: '#0D1326' },
  };

  return (
    <div
      className={`scene-base ${className}`}
      style={noBg ? undefined : bgStyles[variant]}
      dir="rtl"
    >
      {/* Paper grain */}
      <div className="noise-overlay" />

      {/* Content: no wrapper fade. The stage transition owns the slide-level
          entrance, so per-element staggers play on a visible parent. */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Layout helpers ───────────────────────────────────────────

export function ContentLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      dir="rtl"
      className={`w-full h-full flex flex-col items-center justify-center ${className}`}
      style={{
        padding: 'clamp(1.5rem, 3cqw, 3.5rem) clamp(2.5rem, 6cqw, 7rem) clamp(5rem, 8cqw, 7rem)',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}

export function TwoColumnLayout({
  left,
  right,
  className = '',
  gap = '3rem',
}: {
  left: ReactNode;
  right: ReactNode;
  className?: string;
  gap?: string;
}) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center px-10 md:px-16 ${className}`}
      style={{ gap }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>{right}</div>
      <div style={{ flex: 1, minWidth: 0 }}>{left}</div>
    </div>
  );
}

// ─── Typography helpers ───────────────────────────────────────

export function SceneTitle({
  children,
  size = 'lg',
  color,
  className = '',
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}) {
  const sizes = {
    sm: 'clamp(1.5rem, 2.5cqw, 2rem)',
    // Content-slide title: 60px on the 1920 stage, clearly above 30px body copy
    md: 'clamp(2.25rem, 3.1cqw, 3.75rem)',
    lg: 'clamp(2.5rem, 5cqw, 4rem)',
    xl: 'clamp(3rem, 7cqw, 6rem)',
  };

  const isReducedMotion = useReducedMotion();

  const style: React.CSSProperties = {
    fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
    fontSize: sizes[size],
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    margin: 0,
    textWrap: 'balance',
    color: color || '#F3EEE4',
  } as React.CSSProperties;

  if (isReducedMotion) {
    return (
      <h1 className={className} style={style}>
        {children}
      </h1>
    );
  }

  // Word-by-word reveal
  return (
    <h1 className={className} style={style}>
      <RevealText>{children}</RevealText>
    </h1>
  );
}

// Deck type scale (1920 stage): eyebrow 22px, title 60px (SceneTitle md),
// subtitle 28px, body 30px. Hebrew never gets tracking or uppercase.

export function SceneEyebrow({
  children,
  color,
  className = '',
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <p
      className={className}
      style={{
        color: color || 'rgba(243,238,228,0.62)',
        fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: "'Heebo', 'DM Sans', sans-serif",
        margin: '0 0 0.6rem',
      }}
    >
      {children}
    </p>
  );
}

export function SceneSubtitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={className}
      style={{
        color: 'rgba(243,238,228,0.7)',
        fontSize: 'clamp(1.2rem, 1.46cqw, 1.75rem)',
        lineHeight: 1.45,
        fontFamily: "'Heebo', 'DM Sans', sans-serif",
        margin: '0.6rem 0 0',
        textWrap: 'balance',
      } as React.CSSProperties}
    >
      {children}
    </p>
  );
}

export function Takeaway({
  children,
  color,
  className = '',
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  const { currentSceneIndex } = usePresentationStore();
  const chapter = getCurrentChapter(currentSceneIndex);
  const c = color || CHAPTER_COLORS[chapter] || '#F2A93B';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        background: c + '12',
        border: `1px solid ${c}28`,
        color: c,
        fontSize: 'clamp(1.1rem, 1.2cqw, 1.45rem)',
        fontWeight: 600,
        fontFamily: "'Heebo', 'DM Sans', sans-serif",
      }}
    >
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: c, flexShrink: 0 }} />
      {children}
    </div>
  );
}

// ─── Card helpers ─────────────────────────────────────────────

export function GlassCard({
  children,
  className = '',
  style,
  padding = '1.5rem',
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  padding?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: 'rgba(243,238,228,0.04)',
        border: '1px solid rgba(243,238,228,0.08)',
        borderRadius: '16px',
        padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function AccentCard({
  children,
  color,
  className = '',
  padding = '1.5rem',
}: {
  children: ReactNode;
  color: string;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: color + '0E',
        border: `1px solid ${color}28`,
        borderRadius: '16px',
        padding,
      }}
    >
      {children}
    </div>
  );
}

// ─── Animated counter ─────────────────────────────────────────

export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  color,
  duration = 1400,
  fontFamily = "'Space Grotesk', sans-serif",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  color?: string;
  duration?: number;
  /** Numbers set inside Hebrew text use Heebo figures */
  fontFamily?: string;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span style={{ color: color || '#F3EEE4', fontFamily, fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{displayed.toLocaleString('he-IL')}{suffix}
    </span>
  );
}

// ─── Chapter badge ─────────────────────────────────────────────

export function ChapterBadge({ label, color }: { label: string; color: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.25rem 0.625rem',
        borderRadius: '6px',
        background: color + '12',
        border: `1px solid ${color}25`,
        fontSize: '1rem',
        fontWeight: 700,
        color,
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}
    >
      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: color, display: 'inline-block' }} />
      {label}
    </div>
  );
}

// ─── Metric - conference-scale stat ───────────────────────────

export function Metric({
  label,
  value,
  number,
  suffix = '',
  strike,
  sub,
  color = '#F2A93B',
  size = 'lg',
}: {
  /** Small caption above the value */
  label?: string;
  /** Text value (rendered huge). Use `number` instead for count-up. */
  value?: string;
  /** Numeric value - animates counting up on mount */
  number?: number;
  suffix?: string;
  /** Old value shown small + struck-through next to the new one */
  strike?: string;
  /** Small caption below the value */
  sub?: string;
  color?: string;
  size?: 'md' | 'lg' | 'xl';
}) {
  const sizes = {
    md: 'clamp(2.5rem, 4cqw, 4rem)',
    lg: 'clamp(3.5rem, 6cqw, 6rem)',
    xl: 'clamp(4.5rem, 8cqw, 8rem)',
  };
  return (
    <div style={{ textAlign: 'center' }}>
      {label && (
        <div style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', fontWeight: 700, color: 'rgba(243,238,228,0.6)', fontFamily: "'Heebo', sans-serif", letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{
          fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
          fontSize: sizes[size], fontWeight: 900, lineHeight: 1,
          letterSpacing: '-0.03em', color,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {number !== undefined ? <AnimatedNumber value={number} suffix={suffix} color={color} /> : value}
        </span>
        {strike && (
          <span style={{ fontSize: 'clamp(1.4rem, 2.2cqw, 2.2rem)', fontWeight: 600, color: 'rgba(243,238,228,0.35)', textDecoration: 'line-through', fontFamily: "'Space Grotesk', 'Heebo', sans-serif" }}>
            {strike}
          </span>
        )}
      </div>
      {sub && (
        <div style={{ fontSize: 'clamp(1.05rem, 1.4cqw, 1.35rem)', color: 'rgba(243,238,228,0.62)', fontFamily: "'Heebo', sans-serif", marginTop: '0.45rem' }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── TakeawayBar - system-wide bottom takeaway pill ───────────

export function TakeawayBar({ children, color }: { children: ReactNode; color?: string }) {
  const { currentSceneIndex } = usePresentationStore();
  const chapter = getCurrentChapter(currentSceneIndex);
  const c = color || CHAPTER_COLORS[chapter] || '#F2A93B';
  return (
    <div style={{
      position: 'absolute', bottom: 'clamp(1.25rem, 2.5cqh, 2rem)', left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 4, pointerEvents: 'none',
      animation: 'fadeInUp 0.48s var(--mo-ease-out) 0.6s both',
    }}>
      <div style={{
        padding: 'clamp(0.5rem, 0.8cqw, 1rem) clamp(1.25rem, 2cqw, 2rem)',
        borderRadius: '100px',
        background: 'rgba(13,19,38,0.85)',
        border: `1px solid ${c}30`,
      }}>
        <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)', color: 'rgba(243,238,228,0.78)' }}>
          {children}
        </span>
      </div>
    </div>
  );
}

// ─── GhostWord - giant faded chapter motif ────────────────────

export function GhostWord({ children, color = 'rgba(243,238,228,0.04)', side = 'left' }: {
  children: ReactNode; color?: string; side?: 'left' | 'right';
}) {
  return (
    <div aria-hidden style={{
      position: 'absolute', [side]: '-2%', top: '50%', transform: 'translateY(-50%)',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 'clamp(18rem, 34cqw, 30rem)',
      fontWeight: 900, lineHeight: 1, letterSpacing: '-0.06em',
      color, userSelect: 'none', pointerEvents: 'none', zIndex: 2,
      direction: 'ltr',
    }}>
      {children}
    </div>
  );
}
