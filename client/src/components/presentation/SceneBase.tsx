import { ReactNode, useEffect, useRef, useState } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { CHAPTERS, getCurrentChapter } from '../../data/scenes';

interface SceneBaseProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'deep-dark' | 'light' | 'chapter-break';
  chapterColor?: string;
}

export function SceneBase({ children, className = '', variant = 'dark', chapterColor }: SceneBaseProps) {
  const { currentSceneIndex, isReducedMotion } = usePresentationStore();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const chapter = getCurrentChapter(currentSceneIndex);
  const chapterInfo = CHAPTERS.find((c) => c.id === chapter);
  const color = chapterColor || chapterInfo?.color || '#4F7CFF';

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const bgStyles: Record<string, React.CSSProperties> = {
    'dark': {
      background: 'radial-gradient(ellipse at 20% 50%, rgba(79,124,255,0.08) 0%, transparent 60%), linear-gradient(135deg, #09111f 0%, #0d1929 50%, #060e1a 100%)',
    },
    'deep-dark': {
      background: 'radial-gradient(ellipse at 80% 20%, rgba(255,107,107,0.06) 0%, transparent 50%), linear-gradient(135deg, #050a14 0%, #080f1c 100%)',
    },
    'light': {
      background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%)',
    },
    'chapter-break': {
      background: `radial-gradient(ellipse at 50% 50%, ${color}15 0%, transparent 70%), linear-gradient(135deg, #060e1a 0%, #0a1628 100%)`,
    },
  };

  return (
    <div
      ref={containerRef}
      className={`scene-base ${className}`}
      style={bgStyles[variant]}
      dir="rtl"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Accent glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full h-full"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted || isReducedMotion ? 'none' : 'translateY(12px)',
          transition: isReducedMotion ? 'none' : 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Layout helpers ───────────────────────────────────────────

interface ContentLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ContentLayout({ children, className = '' }: ContentLayoutProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 ${className}`}>
      {children}
    </div>
  );
}

export function TwoColumnLayout({
  left,
  right,
  className = '',
}: {
  left: ReactNode;
  right: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full h-full flex items-center justify-center px-8 md:px-16 gap-12 ${className}`}>
      <div className="flex-1 min-w-0">{right}</div>
      <div className="flex-1 min-w-0">{left}</div>
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
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
    xl: 'text-5xl md:text-6xl lg:text-7xl',
  };

  return (
    <h1
      className={`font-black leading-tight ${sizes[size]} ${className}`}
      style={{ color: color || 'white' }}
    >
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
    <p className={`text-white/60 text-lg md:text-xl leading-relaxed ${className}`}>
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
  const chapterInfo = CHAPTERS.find((c) => c.id === chapter);
  const c = color || chapterInfo?.color || '#4F7CFF';

  return (
    <div
      className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium ${className}`}
      style={{
        background: c + '15',
        border: `1px solid ${c}30`,
        color: c,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c }} />
      {children}
    </div>
  );
}

// ─── Card helpers ─────────────────────────────────────────────

export function GlassCard({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
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
}: {
  children: ReactNode;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{
        background: color + '10',
        border: `1px solid ${color}25`,
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
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  color?: string;
}) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (value - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span style={{ color: color || 'white' }}>
      {prefix}{displayed.toLocaleString('he-IL')}{suffix}
    </span>
  );
}
