/**
 * SceneStage — mobile-safe rendering surface for scenes.
 *
 * Desktop / projector (>=1024px wide and >=600px tall): a transparent
 * full-size container. Scene cq units resolve against the viewport size,
 * so rendering is pixel-identical to the original design. No transform.
 *
 * Small screens: scenes render on a fixed 1600x900 virtual canvas
 * (a size container, so cqw/cqh resolve against it) that is scaled to fit
 * the screen, letterboxed on the deck background. Every layout, animation
 * and interaction stays exactly as designed, just smaller.
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

export function SceneStage({ children }: { children: ReactNode }) {
  const { w, h } = useViewportSize();

  if (!isCompactViewport(w, h)) {
    return (
      <div style={{ width: '100%', height: '100%', containerType: 'size' }}>
        {children}
      </div>
    );
  }

  const scale = Math.min(w / STAGE_W, h / STAGE_H);
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
          width: STAGE_W,
          height: STAGE_H,
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
