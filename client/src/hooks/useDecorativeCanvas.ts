import { useEffect, useRef } from 'react';
import { usePresentationStore } from '../store/presentationStore';

export interface CanvasFrame {
  /** Seconds since the loop started */
  t: number;
  /** Seconds since the previous frame (0 on the first frame) */
  dt: number;
}

type DrawFn = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frame: CanvasFrame) => void;
type SetupFn = (canvas: HTMLCanvasElement) => DrawFn;

/**
 * Decorative canvas animation with conference-safe behavior:
 * - throttled to `fps` (default 30) — half the main-thread cost of a raw rAF loop
 * - pauses entirely when the tab is hidden
 * - reduced motion or "lightweight" quality renders a single static frame
 * - handles sizing + resize
 *
 * `setup` runs once per mount (create particles there) and returns the draw function.
 * Pass a stable reference (module-level or useCallback).
 */
export function useDecorativeCanvas(setup: SetupFn, fps = 30) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isReducedMotion, qualityLevel } = usePresentationStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const draw = setup(canvas);
    const isStatic = isReducedMotion || qualityLevel === 'lightweight';
    const interval = 1000 / fps;

    let animId = 0;
    let running = false;
    let start = 0;
    let last = 0;
    let prevT = 0;

    const loop = (now: number) => {
      if (!running) return;
      animId = requestAnimationFrame(loop);
      if (now - last < interval) return;
      last = now;
      const t = (now - start) / 1000;
      draw(ctx, canvas, { t, dt: Math.min(t - prevT, 0.1) });
      prevT = t;
    };

    const startLoop = () => {
      if (running || isStatic) return;
      running = true;
      start = performance.now() - prevT * 1000;
      last = 0;
      animId = requestAnimationFrame(loop);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    draw(ctx, canvas, { t: 0, dt: 0 });
    startLoop();

    const onVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stopLoop();
      window.removeEventListener('resize', setSize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [setup, fps, isReducedMotion, qualityLevel]);

  return canvasRef;
}
