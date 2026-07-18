/**
 * CelebrationBurst — a one-shot confetti particle burst for milestone moments
 * (e.g. approving the agent's plan in the live demo). Fires once on the
 * rising edge of `active`, ~1.8s, then cleans up. Skipped under reduced motion.
 */
import { useEffect, useRef } from 'react';
import { usePresentationStore } from '../../store/presentationStore';

const COLORS = ['#6366F1', '#22D3EE', '#10B981', '#F59E0B', '#F43F5E', '#A78BFA'];

export function CelebrationBurst({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firedRef = useRef(false);
  const { isReducedMotion } = usePresentationStore();

  useEffect(() => {
    if (!active) { firedRef.current = false; return; }
    if (firedRef.current || isReducedMotion) return;
    firedRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cx = canvas.width / 2;
    const cy = canvas.height * 0.55;
    const particles = Array.from({ length: 90 }, () => {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.1;
      const speed = 6 + Math.random() * 11;
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.3,
        life: 1,
      };
    });

    const start = performance.now();
    let animId = 0;
    const DURATION = 1800;

    const tick = (now: number) => {
      const t = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (t >= DURATION) return;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // gravity
        p.vx *= 0.985;
        p.rot += p.vr;
        p.life = Math.max(0, 1 - t / DURATION);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [active, isReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}
    />
  );
}
