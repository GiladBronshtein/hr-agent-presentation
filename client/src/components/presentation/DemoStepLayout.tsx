/**
 * DemoStepLayout - one header style and one content column for every live-demo
 * step slide: the four main-track steps (eyebrow "שלב 1" to "שלב 4") and the
 * appendix steps of the extended demo (S25, S27, S30, S31), which pass their
 * own `eyebrow` so the main track keeps its 1 to 4 numbering. The eyebrow and
 * title sit on the same top line on every step, and the content column keeps
 * one width, so stepping through the demo never makes the header or the
 * column jump.
 */
import { ReactNode } from 'react';
import { SceneEyebrow, SceneSubtitle, SceneTitle } from './SceneBase';

export function DemoStepLayout({
  step,
  eyebrow,
  tag,
  title,
  subtitle,
  children,
  gap = 'clamp(1rem, 2cqh, 1.75rem)',
  align = 'start',
}: {
  /** Main-track step number, shown as "שלב N" */
  step?: number;
  /** Replaces the "שלב N" eyebrow, e.g. "דמו מורחב" on the appendix steps */
  eyebrow?: ReactNode;
  /** Optional qualifier shown after the step number, e.g. Human-in-the-loop */
  tag?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  gap?: string;
  /** Content sits right under the header (default) or centered in the space left */
  align?: 'start' | 'center';
}) {
  return (
    <div
      dir="rtl"
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: 'clamp(2rem, 7.5cqh, 5.5rem) clamp(2.5rem, 6cqw, 7rem) clamp(5rem, 9cqh, 7rem)',
        boxSizing: 'border-box',
        gap: 'clamp(1.5rem, 3.2cqh, 2.5rem)',
      }}
    >
      <header style={{ textAlign: 'center', flexShrink: 0 }}>
        <SceneEyebrow>
          {eyebrow ?? <>שלב {step}</>}
          {tag && <> · <bdi>{tag}</bdi></>}
        </SceneEyebrow>
        <SceneTitle size="md">{title}</SceneTitle>
        {subtitle && <SceneSubtitle>{subtitle}</SceneSubtitle>}
      </header>
      <div
        style={{
          width: '100%', maxWidth: '72rem',
          flex: '1 1 auto', minHeight: 0,
          display: 'flex', flexDirection: 'column', justifyContent: align === 'center' ? 'center' : 'flex-start',
          gap,
        }}
      >
        {children}
      </div>
    </div>
  );
}
