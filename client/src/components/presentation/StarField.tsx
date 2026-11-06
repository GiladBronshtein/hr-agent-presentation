/**
 * StarField - the night sky the trailer ends in: twinkling stars in the
 * deck's colors, with a few bright ones that carry a soft halo. Used behind
 * the title slide and the closing slide. A decorative canvas (throttled,
 * paused when hidden, a single static frame under reduced motion).
 */
import { useDecorativeCanvas } from '../../hooks/useDecorativeCanvas';
import { PALETTE } from '../../lib/palette';

const setupStars = (canvas: HTMLCanvasElement) => {
  const tints = [PALETTE.paper, PALETTE.paper, PALETTE.paper, PALETTE.violet, PALETTE.teal, PALETTE.amber, PALETTE.blue, PALETTE.magenta];
  const stars = Array.from({ length: 260 }, (_, i) => {
    const bright = i % 14 === 0;
    return {
      x: Math.random(), y: Math.random(),
      r: bright ? 2.2 + Math.random() * 1.4 : 0.6 + Math.random() * 1.5,
      a: bright ? 0.95 : 0.4 + Math.random() * 0.55,
      s: 0.5 + Math.random() * 1.8, o: Math.random() * 6.28,
      c: tints[i % tints.length], bright,
    };
  });
  return (ctx: CanvasRenderingContext2D, cnv: HTMLCanvasElement, { t }: { t: number }) => {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    // stars stay the same size on screen whatever the canvas resolution
    const k = Math.max(1, cnv.width / 1600);
    for (const st of stars) {
      const tw = 0.6 + 0.4 * Math.sin(t * st.s + st.o);
      const x = st.x * cnv.width;
      const y = st.y * cnv.height;
      const r = st.r * k;
      if (st.bright) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
        g.addColorStop(0, st.c);
        g.addColorStop(1, 'transparent');
        ctx.globalAlpha = 0.35 * tw;
        ctx.fillStyle = g;
        ctx.fillRect(x - r * 6, y - r * 6, r * 12, r * 12);
      }
      ctx.globalAlpha = Math.max(0, st.a * tw);
      ctx.fillStyle = st.c;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
};

export function StarField({ zIndex = 1, opacity = 1 }: { zIndex?: number; opacity?: number }) {
  const ref = useDecorativeCanvas(setupStars);
  return <canvas ref={ref} aria-hidden data-decorative style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex, opacity }} />;
}
