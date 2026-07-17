/**
 * SceneBase — Shared scene wrapper
 * Design: AI-Native UI + Glassmorphism + Dark Mode OLED
 * Colors: Deep Space #0A0A1A, Indigo #6366F1, Cyan #0891B2
 * Typography: Space Grotesk (headings), DM Sans (body)
 */
import { ReactNode, useEffect, useState } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { CHAPTERS, getCurrentChapter } from '../../data/scenes';

const CHAPTER_COLORS: Record<string, string> = {
  'להבין': '#6366F1',
  'לראות': '#0891B2',
  'לבנות': '#10B981',
  'להטמיע': '#F59E0B',
  'נספח': '#64748B',
};

interface SceneBaseProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'deep-dark' | 'light' | 'chapter-break';
  chapterColor?: string;
  /** Skip the default background — scene manages its own */
  noBg?: boolean;
}

export function SceneBase({ children, className = '', variant = 'dark', chapterColor, noBg = false }: SceneBaseProps) {
  const { currentSceneIndex, isReducedMotion } = usePresentationStore();
  const [mounted, setMounted] = useState(false);

  const chapter = getCurrentChapter(currentSceneIndex);
  const color = chapterColor || CHAPTER_COLORS[chapter] || '#6366F1';

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const bgStyles: Record<string, React.CSSProperties> = {
    'dark': {
      background: `
        radial-gradient(ellipse 70% 60% at 20% 30%, rgba(99,102,241,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 50% 60% at 80% 70%, rgba(8,145,178,0.06) 0%, transparent 60%),
        #0A0A1A
      `,
    },
    'deep-dark': {
      background: `
        radial-gradient(ellipse 60% 50% at 80% 20%, rgba(244,63,94,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 20% 80%, rgba(99,102,241,0.07) 0%, transparent 55%),
        #07071A
      `,
    },
    'light': {
      background: 'linear-gradient(135deg, #EEF2FF 0%, #E0F2FE 100%)',
    },
    'chapter-break': {
      background: `
        radial-gradient(ellipse 80% 70% at 50% 40%, ${color}12 0%, transparent 65%),
        radial-gradient(ellipse 40% 40% at 85% 75%, rgba(8,145,178,0.06) 0%, transparent 60%),
        #0A0A1A
      `,
    },
  };

  return (
    <div
      className={`scene-base ${className}`}
      style={noBg ? undefined : bgStyles[variant]}
      dir="rtl"
    >
      {/* Fine grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent 0%, ${color}40 30%, rgba(34,211,238,0.25) 70%, transparent 100%)`,
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          opacity: mounted ? 1 : 0,
          transform: mounted || isReducedMotion ? 'none' : 'translateY(10px)',
          transition: isReducedMotion ? 'none' : 'opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1)',
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
        padding: 'clamp(1.5rem, 3vw, 3.5rem) clamp(2.5rem, 6vw, 7rem) clamp(5rem, 8vw, 7rem)',
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
  gradient,
  className = '',
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  className?: string;
}) {
  const sizes = {
    sm: 'clamp(1.5rem, 2.5vw, 2rem)',
    md: 'clamp(2rem, 3.5vw, 2.75rem)',
    lg: 'clamp(2.5rem, 5vw, 4rem)',
    xl: 'clamp(3rem, 7vw, 6rem)',
  };

  const style: React.CSSProperties = {
    fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
    fontSize: sizes[size],
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    margin: 0,
  };

  if (gradient) {
    style.background = gradient;
    style.WebkitBackgroundClip = 'text';
    style.WebkitTextFillColor = 'transparent';
    style.backgroundClip = 'text';
  } else {
    style.color = color || 'white';
  }

  return (
    <h1 className={className} style={style}>
      {children}
    </h1>
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
        color: 'rgba(255,255,255,0.5)',
        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
        lineHeight: 1.7,
        fontFamily: "'DM Sans', 'Heebo', sans-serif",
        margin: 0,
      }}
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
  const c = color || CHAPTER_COLORS[chapter] || '#6366F1';

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
        fontSize: '1.1rem',
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
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
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
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
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  color?: string;
  duration?: number;
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
    <span style={{ color: color || 'white', fontFamily: "'Space Grotesk', sans-serif", fontVariantNumeric: 'tabular-nums' }}>
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
