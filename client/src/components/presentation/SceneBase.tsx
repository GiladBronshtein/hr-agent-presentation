/**
 * SceneBase - Shared scene wrapper and building blocks.
 * Design: "Spectrum", a dark concert stage. Every slide stands on a deep
 * midnight floor lit by slow drifting colored light in its chapter's color
 * (lib/palette.ts CHAPTER_LIGHTS), with a key light above the title, a
 * faint grid of light and film grain. Cards are lit glass with colored
 * edges. Type: paper white Heebo / Space Grotesk.
 * Motion: ambient loops move transform/opacity only and stop under reduced
 * motion; the chapter color is fixed when a slide mounts, so the outgoing
 * slide never changes color during a transition.
 */
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { usePresentationStore } from '../../store/presentationStore';
import { CHAPTERS, SCENES, getCurrentChapter } from '../../data/scenes';
import { CHAPTER_COLORS, CHAPTER_LIGHTS, PALETTE, fromLegacy, isLegacyAccent, textOn } from '../../lib/palette';
import { RevealText } from '../motion/RevealText';
import { useReducedMotion } from '../motion/useReducedMotion';
import '../motion/motion.css';

// ─── Chapter light ────────────────────────────────────────────

export interface SceneLight {
  /** Scene index the light was taken from */
  index: number;
  /** 0..4, into CHAPTERS / CHAPTER_COLORS */
  chapterIndex: number;
  /** The chapter color */
  color: string;
  /** Text-safe tint of the chapter color */
  text: string;
  /** Chapter color plus two spectrum neighbours */
  lights: readonly [string, string, string];
}

function lightFor(index: number): SceneLight {
  const chapter = getCurrentChapter(index);
  const ci = Math.max(0, CHAPTERS.findIndex((c) => c.id === chapter));
  const color = CHAPTER_COLORS[ci] ?? PALETTE.violet;
  return { index, chapterIndex: ci, color, text: textOn(color), lights: CHAPTER_LIGHTS[ci] ?? CHAPTER_LIGHTS[0] };
}

/**
 * A scene file's own accent: its chapter color (`c`, for fills, borders and
 * glows) and the text-safe tint of it (`t`, for type). Called once at module
 * level with the scene id, so it never changes during a transition.
 */
export function accentFor(sceneId: string): { c: string; t: string; lights: readonly [string, string, string] } {
  const scene = SCENES.find((x) => x.id === sceneId);
  const l = lightFor(scene ? scene.index : 0);
  return { c: l.color, t: l.text, lights: l.lights };
}

/** The scene being mounted: the URL hash wins (deep links paint before the store syncs). */
function mountingSceneIndex(): number {
  if (typeof window !== 'undefined') {
    const m = window.location.hash.match(/^#\/scene\/([\w-]+)$/);
    const s = m ? SCENES.find((x) => x.id === m[1]) : undefined;
    if (s) return s.index;
  }
  return usePresentationStore.getState().currentSceneIndex;
}

const SceneLightContext = createContext<SceneLight | null>(null);

/**
 * The current slide's chapter light. Inside a SceneBase it is the light the
 * slide mounted with; elsewhere it follows the store.
 */
export function useSceneLight(): SceneLight {
  const ctx = useContext(SceneLightContext);
  const live = usePresentationStore((s) => s.currentSceneIndex);
  return ctx ?? lightFor(live);
}

/** Resolves a color prop: legacy amber becomes the chapter color, other legacy hexes map to Spectrum. */
function resolveAccent(color: string | undefined, light: SceneLight): string {
  if (!color || isLegacyAccent(color)) return light.color;
  return fromLegacy(color);
}

// ─── Scene wrapper ────────────────────────────────────────────

interface SceneBaseProps {
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'deep-dark' | 'light' | 'chapter-break';
  /** Overrides the chapter color that lights the slide */
  chapterColor?: string;
  /** Skip the default background - scene manages its own */
  noBg?: boolean;
  /** Faint grid of light behind the content (default on, off for deep-dark) */
  grid?: boolean;
}

const VARIANT_AMBIENCE: Record<NonNullable<SceneBaseProps['variant']>, number> = {
  'dark': 1,
  'deep-dark': 0.6,
  'light': 0,
  'chapter-break': 1.15,
};

/**
 * Bright hues (amber, teal) light the floor far more than violet or blue at
 * the same alpha, so the light is scaled by the color's luminance to keep
 * every chapter at the same perceived level and body text at AA.
 */
function lightWeight(hex: string): number {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const lum = 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  return Math.max(0.55, Math.min(1, Math.sqrt(0.24 / Math.max(lum, 0.01))));
}

export function SceneBase({ children, className = '', variant = 'dark', chapterColor, noBg = false, grid }: SceneBaseProps) {
  const reduced = useReducedMotion();
  const [base] = useState(() => lightFor(mountingSceneIndex()));
  const light: SceneLight = chapterColor
    ? { ...base, color: fromLegacy(chapterColor), text: textOn(fromLegacy(chapterColor)), lights: [fromLegacy(chapterColor), base.lights[1], base.lights[2]] }
    : base;
  const [a, b, c] = light.lights;
  const showGrid = grid ?? variant !== 'deep-dark';

  const vars = {
    '--ch': a,
    '--ch-b': b,
    '--ch-c': c,
    '--ch-text': light.text,
    '--fx-amb': +(VARIANT_AMBIENCE[variant] * lightWeight(a)).toFixed(3),
  } as React.CSSProperties;

  return (
    <SceneLightContext.Provider value={light}>
      <div
        className={`scene-base${reduced ? ' fx-rm mx-rm' : ''} ${className}`}
        style={noBg ? vars : { ...vars, background: variant === 'light' ? PALETTE.paper : PALETTE.bg0 }}
        dir="rtl"
      >
        {!noBg && variant !== 'light' && (
          <StageLight preset={light.index % 4} grid={showGrid} spots={variant === 'chapter-break'} />
        )}

        {/* Film grain: dithers the gradients and keeps the dark alive */}
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
    </SceneLightContext.Provider>
  );
}

/**
 * The living backdrop: base gradient, three drifting light pools in the
 * chapter's colors, a floor light, a key light above the title, an optional
 * grid of light and (chapter breaks) two stage spots. Pure CSS; every moving
 * layer is a pre-rasterized gradient that only changes transform/opacity.
 */
function StageLight({ preset, grid, spots }: { preset: number; grid: boolean; spots: boolean }) {
  return (
    <div className={`fx-stage fx-p${preset}`} aria-hidden data-decorative>
      <div className="fx-stage-base" />
      <div className="fx-aurora">
        <div className="fx-blob fx-blob-a" />
        <div className="fx-blob fx-blob-b" />
        <div className="fx-blob fx-blob-c" />
      </div>
      <div className="fx-scrim" />
      <div className="fx-key" />
      <div className="fx-floor" />
      {spots && (
        <>
          <div className="fx-spot fx-spot-r" />
          <div className="fx-spot fx-spot-l" />
        </>
      )}
      {grid && <div className="fx-grid" />}
      <div className="fx-vignette" />
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
  variant = 'lit',
  className = '',
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  /**
   * lit: paper type with a faint halo of chapter light (default)
   * glow: a stronger colored glow, for a hero line
   * gradient: paper flowing into the chapter color
   * spectrum: the signature gradient, for one moment per chapter at most
   * plain: no light at all
   */
  variant?: 'lit' | 'glow' | 'gradient' | 'spectrum' | 'plain';
  className?: string;
}) {
  const sizes = {
    sm: 'clamp(1.5rem, 2.5cqw, 2rem)',
    // Content-slide title: 60px on the 1920 stage, clearly above 30px body copy
    md: 'clamp(2.25rem, 3.1cqw, 3.75rem)',
    lg: 'clamp(2.5rem, 5cqw, 4rem)',
    xl: 'clamp(3rem, 7cqw, 6rem)',
  };

  const light = useSceneLight();
  const isReducedMotion = useReducedMotion();
  const tone = color ? fromLegacy(color) : PALETTE.paper;
  const filled = variant === 'gradient' || variant === 'spectrum';
  const glowClass = variant === 'glow' ? 'fx-glow-text' : variant === 'lit' ? 'fx-glow-soft' : '';

  const style: React.CSSProperties = {
    fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
    fontSize: sizes[size],
    fontWeight: 800,
    lineHeight: 1.15,
    letterSpacing: '-0.03em',
    margin: 0,
    textWrap: 'balance',
    color: tone,
    '--fx-c': color && !isLegacyAccent(color) ? tone : light.color,
  } as React.CSSProperties;

  if (filled) {
    // Gradient type is revealed as one unit (background-clip needs one box)
    const fill = variant === 'spectrum' ? 'fx-spectrum-text' : 'fx-chapter-text';
    return (
      <h1 className={className} style={style}>
        <RevealText whole>
          <span className={`${fill} fx-shine-once`}>{children}</span>
        </RevealText>
      </h1>
    );
  }

  if (isReducedMotion) {
    return (
      <h1 className={`${glowClass} ${className}`} style={style}>
        {children}
      </h1>
    );
  }

  // Word-by-word reveal
  return (
    <h1 className={`${glowClass} ${className}`} style={style}>
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
  const light = useSceneLight();
  const accent = resolveAccent(color, light);
  const isPaper = accent === PALETTE.paper;
  const text = isPaper ? 'rgba(246,242,234,0.86)' : textOn(accent);
  return (
    <p
      className={className}
      style={{
        color: text,
        fontSize: 'clamp(1.05rem, 1.15cqw, 1.375rem)',
        fontWeight: 600,
        lineHeight: 1.3,
        fontFamily: "'Heebo', 'DM Sans', sans-serif",
        margin: '0 0 0.6rem',
        '--fx-c': accent,
      } as React.CSSProperties}
    >
      <span aria-hidden className="fx-eyebrow-mark" />
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
        color: 'rgba(246,242,234,0.78)',
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
  const light = useSceneLight();
  const c = resolveAccent(color, light);

  return (
    <div
      className={`fx-chip ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.625rem',
        padding: '0.5rem 1.1rem',
        borderRadius: '12px',
        color: textOn(c),
        fontSize: 'clamp(1.1rem, 1.2cqw, 1.45rem)',
        fontWeight: 600,
        fontFamily: "'Heebo', 'DM Sans', sans-serif",
        '--fx-c': c,
      } as React.CSSProperties}
    >
      <span className="fx-beacon" style={{ width: '7px', height: '7px', color: c }} />
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
      className={`fx-glass fx-sheen ${className}`}
      style={{
        borderRadius: '18px',
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
  const light = useSceneLight();
  const c = resolveAccent(color, light);
  return (
    <div
      className={`fx-accent fx-sheen ${className}`}
      style={{
        borderRadius: '18px',
        padding,
        '--fx-c': c,
      } as React.CSSProperties}
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
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(reduced ? value : 0);
  const [settled, setSettled] = useState(reduced);

  useEffect(() => {
    if (reduced) { setDisplayed(value); setSettled(true); return; }
    setSettled(false);
    const startTime = performance.now();
    let raf = 0;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setSettled(true);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduced]);

  const c = color ? fromLegacy(color) : PALETTE.paper;
  return (
    <span
      className={settled ? 'fx-count-land' : undefined}
      style={{ color: c, fontFamily, fontVariantNumeric: 'tabular-nums', '--fx-c': c } as React.CSSProperties}
    >
      {prefix}{displayed.toLocaleString('he-IL')}{suffix}
    </span>
  );
}

// ─── Chapter badge ─────────────────────────────────────────────

export function ChapterBadge({ label, color }: { label: string; color: string }) {
  const light = useSceneLight();
  const c = resolveAccent(color, light);
  return (
    <div
      className="fx-chip"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.3rem 0.8rem',
        borderRadius: '100px',
        fontSize: '1rem',
        fontWeight: 700,
        color: textOn(c),
        fontFamily: "'Space Grotesk', sans-serif",
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        '--fx-c': c,
      } as React.CSSProperties}
    >
      <span className="fx-beacon" style={{ width: '6px', height: '6px', color: c }} />
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
  color,
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
  const light = useSceneLight();
  const c = resolveAccent(color, light);
  const sizes = {
    md: 'clamp(2.5rem, 4cqw, 4rem)',
    lg: 'clamp(3.5rem, 6cqw, 6rem)',
    xl: 'clamp(4.5rem, 8cqw, 8rem)',
  };
  return (
    <div style={{ textAlign: 'center' }}>
      {label && (
        <div style={{ fontSize: 'clamp(1rem, 1.3cqw, 1.25rem)', fontWeight: 700, color: PALETTE.muted, fontFamily: "'Heebo', sans-serif", letterSpacing: '0.04em', marginBottom: '0.35rem' }}>
          {label}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span className="fx-glow-text" style={{
          fontFamily: "'Space Grotesk', 'Heebo', sans-serif",
          fontSize: sizes[size], fontWeight: 900, lineHeight: 1,
          letterSpacing: '-0.03em', color: textOn(c),
          fontVariantNumeric: 'tabular-nums',
          '--fx-c': c,
        } as React.CSSProperties}>
          {number !== undefined ? <AnimatedNumber value={number} suffix={suffix} color={textOn(c)} /> : value}
        </span>
        {strike && (
          <span style={{ fontSize: 'clamp(1.4rem, 2.2cqw, 2.2rem)', fontWeight: 600, color: PALETTE.dim, textDecoration: 'line-through', fontFamily: "'Space Grotesk', 'Heebo', sans-serif" }}>
            {strike}
          </span>
        )}
      </div>
      {sub && (
        <div style={{ fontSize: 'clamp(1.05rem, 1.4cqw, 1.35rem)', color: PALETTE.muted, fontFamily: "'Heebo', sans-serif", marginTop: '0.45rem' }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// ─── TakeawayBar - system-wide bottom takeaway pill ───────────

export function TakeawayBar({ children, color }: { children: ReactNode; color?: string }) {
  const light = useSceneLight();
  const c = resolveAccent(color, light);
  return (
    <div style={{
      position: 'absolute', bottom: 'clamp(1.25rem, 2.5cqh, 2rem)', left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 4, pointerEvents: 'none',
    }}>
      <div className="fx-takeaway fx-in" style={{
        '--fx-delay': '600ms',
        padding: 'clamp(0.55rem, 0.8cqw, 1rem) clamp(1.4rem, 2.2cqw, 2.2rem)',
        borderRadius: '100px',
        display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
        '--fx-c': c,
      } as React.CSSProperties}>
        <span className="fx-beacon" style={{ width: '8px', height: '8px', color: c }} />
        <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: 'clamp(1.05rem, 1.2cqw, 1.45rem)', color: 'rgba(246,242,234,0.9)' }}>
          {children}
        </span>
      </div>
    </div>
  );
}

// ─── GhostWord - giant faded chapter motif ────────────────────

export function GhostWord({ children, color, side = 'left' }: {
  children: ReactNode; color?: string; side?: 'left' | 'right';
}) {
  return (
    <div aria-hidden style={{
      position: 'absolute', [side]: '-2%', top: '50%', transform: 'translateY(-50%)',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 'clamp(18rem, 34cqw, 30rem)',
      fontWeight: 900, lineHeight: 1, letterSpacing: '-0.06em',
      color: color ?? 'color-mix(in oklab, var(--ch) 9%, transparent)',
      userSelect: 'none', pointerEvents: 'none', zIndex: 2,
      direction: 'ltr',
    }}>
      {children}
    </div>
  );
}
