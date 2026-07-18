/**
 * SceneStage - scale-to-fit rendering surface for scenes.
 *
 * Scenes always render on a fixed 16:9 virtual canvas (a size container, so
 * cqw/cqh resolve against it) that is scaled to fit the window, letterboxed
 * on the deck background. The full slide is therefore ALWAYS visible, at any
 * window size, windowed or fullscreen.
 *
 * Desktop uses a 1920x1080 canvas: at true fullscreen on a 1080p projector
 * the scale is exactly 1.0, so the conference rendering is pixel-identical
 * to the original design. Small screens use a 1600x900 canvas (slightly
 * larger effective type on phones). Every layout, animation and interaction
 * stays exactly as designed.
 */
import { ReactNode, useEffect, useState } from 'react';

export const STAGE_W = 1600;
export const STAGE_H = 900;
export const COMPACT_MAX_WIDTH = 1024;
export const COMPACT_MAX_HEIGHT = 600;

export function useViewportSize() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    // Re-measure after mount: some embedded/WebView contexts report a stale
    // (or zero) size at first render and do not always fire an initial resize.
    onResize();
    const raf = requestAnimationFrame(onResize);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);
  return size;
}

export function isCompactViewport(w: number, h: number) {
  // A zero/unknown viewport must never degrade the projector experience
  if (w <= 0 || h <= 0) return false;
  return w < COMPACT_MAX_WIDTH || h < COMPACT_MAX_HEIGHT;
}

export const DESKTOP_STAGE_W = 1920;
export const DESKTOP_STAGE_H = 1080;

export function SceneStage({ children }: { children: ReactNode }) {
  const { w, h } = useViewportSize();

  // Unknown/zero size (first paint in some embedded contexts): render
  // untransformed until the mount re-measure lands.
  if (w <= 0 || h <= 0) {
    return (
      <div style={{ width: '100%', height: '100%', containerType: 'size' }}>
        {children}
      </div>
    );
  }

  const compact = isCompactViewport(w, h);
  const stageW = compact ? STAGE_W : DESKTOP_STAGE_W;
  const stageH = compact ? STAGE_H : DESKTOP_STAGE_H;
  const scale = Math.min(w / stageW, h / stageH);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#03030A',
      }}
    >
      <div
        style={{
          width: stageW,
          height: stageH,
          containerType: 'size',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
