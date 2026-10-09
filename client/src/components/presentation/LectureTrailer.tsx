/**
 * LectureTrailer - the ~66s cinematic opening of the title slide (slide 2).
 *
 * A GPU particle universe (trailer/Universe.tsx) morphs between formations
 * that tell the lecture's journey, framed by cinematic letterbox bars, with
 * masked Hebrew typography on top and a fully synthesized score
 * (lib/sound.ts: A minor, 96 BPM, building per chapter).
 *
 *   0-5.6    cold open: a heartbeat gathers the stars. "...ידנית."
 *   5.6-15   the invisible work: systems, manual links, the clock, overload, freeze
 *   15-27.5  01 להבין: a rigid automation rail jams; an agent assembles around a goal
 *   27.5-40  02 לראות: nine agents light up; a live mini demo ends in human approval
 *   40-50    03 לבנות: the stack lands layer by layer inside a trust shield
 *   50-60    04 להטמיע: the 90-day roadmap draws itself; 6h becomes 45m
 *   60-66    title drop: "אוטומציה" glitches, explodes into a network,
 *            collapses into a core, and bursts into the title itself
 *
 * Enter skips straight to the title.
 */
import { memo, useLayoutEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import type { LucideIcon } from 'lucide-react';
import {
  User, MessageCircle, Mail, Calendar, Folder, Building2, BarChart3, Target,
  BookOpen, Brain, Wrench, Database, ShieldAlert, UserCheck,
  ClipboardList, HeartHandshake, UserPlus, Briefcase, TrendingUp,
  CheckCircle2, Clock, MousePointer2, Monitor, Workflow, Shield, KeyRound,
} from 'lucide-react';
import { sound, type BufferPlayback } from '../../lib/sound';
import { SlackWindow, SlackMessage } from './SlackChat';
import { Universe, createUniverseCtl, type UniverseApi } from './trailer/Universe';
import * as F from './trailer/formations';
import { CH, CH_AT, CARD_HOLD, TRAILER_END, BEAT, FIN_AT, W } from './trailer/score';
import { prepareTrailer, getFormation, setFormation, trailerAudio } from './trailer/prepare';

const SYSTEMS: { label: string; icon: LucideIcon }[] = [
  { label: 'Slack', icon: MessageCircle }, { label: 'Gmail', icon: Mail }, { label: 'Calendar', icon: Calendar },
  { label: 'Drive', icon: Folder }, { label: 'HRIS', icon: Building2 }, { label: 'Excel', icon: BarChart3 },
  { label: 'Jira', icon: Target },
];
const STATS = [
  { value: 47, unit: 'דק׳', label: 'זמן ממוצע לקליטה', color: '#FB7185' },
  { value: 12, unit: 'מערכות', label: 'נגיעות ידניות', color: '#FBBF24' },
  { value: 3, unit: 'ימים', label: 'עד גישה מלאה', color: '#A5B4FC' },
];
const COMPONENTS: { label: string; icon: LucideIcon }[] = [
  { label: 'מטרה', icon: Target }, { label: 'הקשר', icon: BookOpen }, { label: 'מודל', icon: Brain },
  { label: 'כלים', icon: Wrench }, { label: 'זיכרון', icon: Database }, { label: 'גבולות', icon: ShieldAlert },
  { label: 'אישור', icon: UserCheck },
];
const AGENTS: { label: string; icon: LucideIcon }[] = [
  { label: 'פתיחת משרה', icon: ClipboardList }, { label: 'חוויית מועמדות', icon: HeartHandshake },
  { label: 'קליטה', icon: UserPlus }, { label: 'הכנת שיחות ניהול', icon: Briefcase },
  { label: 'למידה', icon: BookOpen }, { label: 'שירות HR', icon: MessageCircle },
  { label: 'מיומנויות ומוביליות', icon: TrendingUp }, { label: 'תובנות ארגוניות', icon: BarChart3 },
  { label: 'שימור ידע', icon: Database },
];
const STACK: { label: string; icon: LucideIcon }[] = [
  { label: 'ממשק', icon: Monitor }, { label: 'אורקסטרציה', icon: Workflow }, { label: 'מודל', icon: Brain },
  { label: 'כלים', icon: Wrench }, { label: 'זיכרון', icon: Database },
];
const ROADMAP = [
  { weeks: 'שבועות 1-2', phase: 'הגדרה' }, { weeks: 'שבועות 3-4', phase: 'בנייה' },
  { weeks: 'שבועות 5-8', phase: 'פיילוט' }, { weeks: 'שבועות 9-12', phase: 'הרחבה' },
];
const DEMO_REQUEST = 'יעל כהן מתחילה ב-15 ביולי. צריך תוכנית קליטה מלאה.';
const DEMO_STEPS = ['פגישת 1:1 תואמה: 14/7 09:00', 'בקשת גישות IT נשלחה', 'רישום לקורסים: PM-101'];

// ── Typography ──
const HEB = /[֐-׿]/;

/** Masked word reveal. Consecutive non-Hebrew words merge into one LTR run
 *  (split inline-blocks are bidi-neutral and would otherwise reorder). */
function Reveal({ text, cls, wordStyle }: { text: string; cls?: string; wordStyle?: React.CSSProperties }) {
  const groups: { t: string; ltr: boolean }[] = [];
  text.split(' ').forEach((w) => {
    const ltr = !HEB.test(w);
    const last = groups[groups.length - 1];
    if (ltr && last?.ltr) last.t += ' ' + w;
    else groups.push({ t: w, ltr });
  });
  return (
    <span className={cls}>
      {groups.map((g, i) => (
        <span key={i}>
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', padding: '0.06em 0.04em 0.14em', margin: '-0.06em -0.04em -0.14em' }}>
            <span className="ri" dir={g.ltr ? 'ltr' : undefined} style={{ display: 'inline-block', ...wordStyle }}>{g.t}</span>
          </span>
          {i < groups.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

const T = {
  hero: { fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: 'clamp(1.9rem, 3.3cqw, 3.6rem)', lineHeight: 1.2, color: '#F8FAFC', letterSpacing: '-0.01em', textShadow: '0 6px 40px rgba(0,0,0,0.75)' } as React.CSSProperties,
  heading: { fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 3.4cqw, 3.6rem)', lineHeight: 1, letterSpacing: '-0.015em' } as React.CSSProperties,
  mono: { fontFamily: "'Space Grotesk', monospace", direction: 'ltr', letterSpacing: '0.32em', fontSize: 'clamp(0.85rem, 1.05cqw, 1.15rem)', fontWeight: 600 } as React.CSSProperties,
  label: { fontFamily: "'Heebo', sans-serif", fontWeight: 700, fontSize: 'clamp(0.95rem, 1.2cqw, 1.3rem)', color: 'rgba(241,245,249,0.95)' } as React.CSSProperties,
};

const pos = (x: number, y: number): React.CSSProperties => ({ position: 'absolute', left: `${x}%`, top: `${y}%` });
const layer: React.CSSProperties = { position: 'absolute', inset: 0, visibility: 'hidden', pointerEvents: 'none' };

function Pill({ icon: Icon, text, color = '#A5B4FC', cls, x, y }: { icon?: LucideIcon; text: string; color?: string; cls: string; x: number; y: number }) {
  return (
    <div className={`${cls} c`} style={pos(x, y)}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5em', whiteSpace: 'nowrap',
        padding: '0.42em 0.95em', borderRadius: '100px',
        background: 'rgba(6,8,22,0.72)', border: `1px solid ${color}55`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.03) inset, 0 8px 30px rgba(0,0,0,0.5), 0 0 24px ${color}22`,
        ...T.label,
      }}>
        {Icon && <span style={{ display: 'inline-flex', color }}><Icon size="1.05em" strokeWidth={2.2} /></span>}
        <span>{text}</span>
      </div>
    </div>
  );
}

/** Measure the real title (rendered hidden by S01 during the trailer) so the
 *  particle title lands exactly on it, glyph for glyph. */
function measureTitle(root: HTMLElement): F.TitleLine[] | undefined {
  const host = root.parentElement;
  const rootRect = root.getBoundingClientRect();
  if (!host || !rootRect.width) return undefined;
  // screen px per design px (the trailer is a scaled 1920x1080 canvas)
  const rootScale = rootRect.width / 1920;
  const lines: F.TitleLine[] = [];
  host.querySelectorAll<HTMLElement>('[data-title-measure] [data-title-line]').forEach((h) => {
    const text = h.firstChild;
    const marker = h.querySelector('[data-baseline]');
    if (!text || text.nodeType !== Node.TEXT_NODE || !marker) return;
    const range = document.createRange();
    range.selectNodeContents(text);
    const r = range.getBoundingClientRect();
    const cs = getComputedStyle(h);
    // the title lives in the deck's stage, which may be scaled differently
    const k = (h.getBoundingClientRect().width / (h.offsetWidth || 1)) / rootScale;
    lines.push({
      text: text.textContent ?? '',
      xPct: (((r.left + r.right) / 2 - rootRect.left) / rootRect.width) * 100,
      yPct: ((marker.getBoundingClientRect().bottom - rootRect.top) / rootRect.height) * 100,
      fontPx: parseFloat(cs.fontSize) * k,
      letterSpacing: (parseFloat(cs.letterSpacing) || 0) * k,
      baseline: 'alphabetic',
    });
  });
  return lines.length === 2 ? lines : undefined;
}

// memo: the trailer renders once; parent re-renders (the reveal) must not re-diff its tree
export const LectureTrailer = memo(function LectureTrailer({ onImpact, onDone }: { onImpact: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const U = useMemo(() => createUniverseCtl(), []);
  const initial = useMemo(() => F.fVoid(), []);
  const startRef = useRef<() => void>(() => {});
  // The timeline and score start only when the WebGL world reports ready, so a
  // cold load never skips the opening morphs or drifts out of sync with audio.
  const api = useMemo(() => {
    let cur: UniverseApi | null = null;
    return {
      get current() { return cur; },
      set current(v: UniverseApi | null) { cur = v; if (v) startRef.current(); },
    } as React.MutableRefObject<UniverseApi | null>;
  }, []);
  const doneRef = useRef(false);
  const skipRef = useRef<() => void>(() => {});

  // fit the design canvas to the stage
  useLayoutEffect(() => {
    const el = root.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const fit = () => {
      const s = Math.min(host.clientWidth / 1920, host.clientHeight / 1080) || 1;
      el.style.transform = `translate(${(host.clientWidth - 1920 * s) / 2}px, ${(host.clientHeight - 1080 * s) / 2}px) scale(${s})`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    // Formations are prepared ahead of time (trailer/prepare.ts); the title is
    // measured from the real DOM title once fonts are in.
    const get = (k: string) => getFormation(k);
    const buildTitle = () => setFormation('title', F.fTitle(measureTitle(el)));

    // Master clock: the pre-rendered score's playhead when audio plays,
    // otherwise the performance clock. Visuals follow it, so picture and
    // sound can never drift apart.
    let audioBuf: AudioBuffer | null = null;
    let playback: BufferPlayback | null = null;
    let perfStart = 0;
    let started = false;
    let capturing = false;
    let naturalEnd = false;
    let canvasReady = false;
    let prepared = false;
    let audioSettled = false;
    const clockNow = () => (playback ? playback.time() : (performance.now() - perfStart) / 1000);
    let audioWait = 0;
    let offSound: () => void = () => {};

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(el);
      gsap.set(q('.c'), { xPercent: -50, yPercent: -50 });
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      // Placement: acts are authored in story time and placed through W (see
      // trailer/score.ts); chapter cards are placed on their downbeats as is.
      const wrap = (m: (t: number) => number) => {
        const X = {
          to: (targets: gsap.TweenTarget, vars: gsap.TweenVars, p: number) => { tl.to(targets, vars, m(p)); return X; },
          fromTo: (targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, p: number) => { tl.fromTo(targets, from, to, m(p)); return X; },
          set: (targets: gsap.TweenTarget, vars: gsap.TweenVars, p: number) => { tl.set(targets, vars, m(p)); return X; },
          call: (fn: () => void, args: unknown[], p: number) => { tl.call(fn, args, m(p)); return X; },
        };
        return X;
      };
      const T = wrap(W);
      const R = wrap((t) => t);
      type TL = typeof T;
      const morph = (k: string, t: number, dur: number, span: number, X: TL = T) => {
        X.call(() => api.current?.morphTo(get(k), span), [], t);
        X.fromTo(U, { morph: 0 }, { morph: 1, duration: dur, ease: 'none', immediateRender: false }, t);
      };
      const show = (sel: string, t: number, X: TL = T) => X.set(q(sel), { visibility: 'visible' }, t);
      const out = (sel: string, t: number, dur = 0.55, X: TL = T) =>
        X.to(q(sel), { autoAlpha: 0, y: -14, duration: dur, ease: 'power2.in' }, t);
      const reveal = (sel: string, t: number, stagger = 0.075, X: TL = T) =>
        X.fromTo(q(`${sel} .ri`), { yPercent: 115, filter: 'blur(10px)', opacity: 0 },
          { yPercent: 0, filter: 'blur(0px)', clearProps: 'filter', opacity: 1, duration: 0.95, stagger, ease: 'expo.out' }, t);
      const pop = (target: gsap.TweenTarget, t: number, from = 0.6, X: TL = T) =>
        X.fromTo(target, { autoAlpha: 0, scale: from, filter: 'blur(8px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', clearProps: 'filter', duration: 0.7, ease: 'expo.out' }, t);
      const glow = (i: number, t: number, v = 1.2, dur = 0.35, X: TL = T) =>
        X.to(U.g[i], { glow: v, duration: dur, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t);
      // deterministic shake: amplitude envelope here, oscillation in Universe
      const shake = (t: number, power = 0.012, dur = 0.5, X: TL = T) =>
        X.fromTo(U, { shake: power }, { shake: 0, duration: dur + 0.25, ease: 'power2.out', immediateRender: false }, t);

      // Idle-drift clock: runs, holds through the freeze, runs on.
      const FREEZE = W(12.9);
      const RESUME = CH_AT[0] - 0.15;
      R.fromTo(U, { t: 0 }, { t: FREEZE, duration: FREEZE, ease: 'none', immediateRender: false }, 0);
      R.fromTo(U, { t: FREEZE }, { t: FREEZE + (TRAILER_END + 1 - RESUME), duration: TRAILER_END + 1 - RESUME, ease: 'none', immediateRender: false }, RESUME);
      // Beat-synced pulse: kick envelope on every beat from chapter 2 to the
      // finale, a pure function of time so it lands exactly on the rendered kicks.
      tl.eventCallback('onUpdate', () => {
        const t = tl.time();
        if (t < CH_AT[1] || t >= FIN_AT) { U.beat = 0; return; }
        const ph = (t - CH_AT[1]) % BEAT;
        U.beat = Math.exp(-ph / 0.1) * (t < CH_AT[2] ? 0.6 : t < CH_AT[3] ? 0.8 : 1);
      });

      // ── Letterbox ──
      T.fromTo(q('.lb-top, .lb-bot'), { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: 'expo.inOut' }, 0);

      // ── Act 0: cold open ──
      T.to(U, { camZ: F.CAM_Z, duration: 5.4, ease: 'power2.out' }, 0);
      morph('heart', 0.3, 2.4, 0.45);
      [0.6, 1.85].forEach((t) => T.to(U, { pulse: 1.3, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, t));
      // each heartbeat (and the "ידנית." hit) sends a ring of light through the universe
      ([[0.6, 0.7], [1.85, 0.85], [3.4, 1.6], [4.75, 0.5]] as const).forEach(([t, amp]) => {
        T.fromTo(U, { ripple: 0, rippleAmp: amp }, { ripple: 1, rippleAmp: 0, duration: 1.2, ease: 'power1.out', immediateRender: false }, t);
      });
      show('.a0', 1.4);
      reveal('.a0-line', 1.5, 0.09);
      T.fromTo(q('.a0-hit .ri'), { scale: 1.45, opacity: 0, filter: 'blur(14px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', clearProps: 'filter', duration: 0.5, ease: 'back.out(2.4)' }, 3.4);
      T.fromTo(q('.a0-echo'), { opacity: 0.7, scale: 1 }, { opacity: 0, scale: (k: number) => 1.22 + k * 0.16, duration: 0.8, ease: 'power2.out', stagger: 0.08, immediateRender: false }, 3.46);
      T.to(U, { pulse: 2.6, duration: 0.1, yoyo: true, repeat: 1 }, 3.4);
      T.to(U.g[0], { red: 1, duration: 0.1 }, 3.4).to(U.g[0], { red: 0.25, duration: 1.2, ease: 'power2.out' }, 3.55);
      T.to(U, { aberration: 0.006, duration: 0.06, yoyo: true, repeat: 3 }, 3.4);
      shake(3.4, 0.01, 0.4);
      out('.a0', 4.9, 0.6);

      // ── Act 1: the invisible work ──
      T.to(U.g[0], { red: 0, duration: 0.6 }, 5.3);
      morph('chaos', 5.3, 3.6, 0.25);
      show('.a1', 6.2);
      pop(q('.a1-hub'), 6.35, 0.7);
      q('.a1-sys').forEach((s, i) => pop(s, 6.5 + i * 0.12, 0.7));
      pop(q('.a1-clock'), 6.4, 0.9);
      const clock = { m: 0 };
      const clockEl = q('.a1-clock-t')[0];
      T.to(clock, { m: 47, duration: 6.4, ease: 'power1.in', onUpdate: () => { if (clockEl) clockEl.textContent = `08:${String(Math.round(clock.m)).padStart(2, '0')}`; } }, 6.5);
      q('.a1-stat').forEach((s, i) => {
        T.fromTo(s, { autoAlpha: 0, x: 60, filter: 'blur(8px)' }, { autoAlpha: 1, x: 0, filter: 'blur(0px)', clearProps: 'filter', duration: 0.8 }, 9.0 + i * 0.6);
        const num = { v: 0 };
        const numEl = s.querySelector('.n');
        T.to(num, { v: STATS[i].value, duration: 0.9, ease: 'power3.out', onUpdate: () => { if (numEl) numEl.textContent = String(Math.round(num.v)); } }, 9.05 + i * 0.6);
      });
      // overload
      T.to(U, { chaos: 1, duration: 1.9, ease: 'power2.in' }, 10.9);
      T.to(U.g[8], { red: 1, duration: 1.2 }, 11.1);
      for (let i = 1; i <= 7; i++) T.to(U.g[i], { glow: 1.4, duration: 0.09, yoyo: true, repeat: 9, ease: 'none' }, 11 + i * 0.07);
      const jit = q('.a1-sys > div, .a1-hub > div');
      const jitEnv = { a: 0 };
      T.fromTo(jitEnv, { a: 0 }, {
        a: 1, duration: 1.8, ease: 'power2.in', immediateRender: false,
        onUpdate: () => {
          const tt = tl.time();
          jit.forEach((e, i) => gsap.set(e, { x: Math.sin(tt * 47 + i * 1.7) * 10 * jitEnv.a, y: Math.cos(tt * 39 + i * 2.3) * 7 * jitEnv.a }));
        },
      }, 11.1);
      T.to(q('.a1-clock'), { color: '#FB7185', duration: 0.3 }, 11.4);
      shake(11.6, 0.008, 1.2);
      // freeze
      T.to(U, { bloom: 0.55, duration: 0.4 }, 12.9);
      T.set(q('.a1-sys > div, .a1-hub > div'), { x: 0, y: 0 }, 12.9);
      T.to(q('.a1-scene'), { autoAlpha: 0.18, filter: 'grayscale(1)', duration: 0.35, ease: 'power2.out' }, 12.9);
      reveal('.a1-cap', 13.1, 0.08);
      out('.a1', 14.4, 0.6);

      // ── Chapter cards ──
      CH.forEach((c, i) => {
        const card = `.card-${i}`;
        // the previous figure disperses with the jump, so the word lands on a clean field
        morph('void', c.at - 0.75, 1.3, 0.5, R);
        R.set(U, { chaos: 0 }, c.at - 0.75);
        // hyperspace jump into the chapter: streaks build with the swell and
        // peak on the downbeat, the camera rushes forward, then settles
        R.fromTo(U, { warp: 0 }, { warp: 1, duration: 0.75, ease: 'power3.in', immediateRender: false }, c.at - 0.75);
        // the whole starfield rushes past with the jump
        R.to(U, { flyBoost: `+=${18}`, duration: 1.9, ease: 'power3.inOut' }, c.at - 0.75);
        R.to(U, { warp: 0, duration: 1.1, ease: 'power2.out' }, c.at);
        R.to(U, { camZ: 8.0, duration: 0.85, ease: 'power3.in' }, c.at - 0.75).to(U, { camZ: F.CAM_Z, duration: 1.3, ease: 'power2.inOut' }, c.at + 1.25 + CARD_HOLD);
        R.to(U, { bloom: 2.1, duration: 0.25, ease: 'power2.out' }, c.at).to(U, { bloom: 1.15, duration: 1.4, ease: 'power2.inOut' }, c.at + 0.3);
        R.to(U.g[F.GROUP_STARS], { glow: 1.2, duration: 0.2, yoyo: true, repeat: 1 }, c.at);
        show(card, c.at - 0.1, R);
        R.fromTo(q(`${card} .cd-rule`), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.inOut' }, c.at - 0.1);
        R.fromTo(q(`${card} .cd-kicker`), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.9 }, c.at);
        // kinetic slam on the downbeat with echo frames radiating out
        R.fromTo(q(`${card} .cd-word`), { opacity: 0, scale: 1.55, filter: 'blur(14px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', clearProps: 'filter', duration: 0.42, ease: 'expo.out' }, c.at);
        R.set(q(`${card} .cd-glow`), { opacity: 0.4 }, c.at + 0.04);
        R.fromTo(q(`${card} .cd-echo`), { opacity: 0.6, scale: 1 }, { opacity: 0, scale: (k: number) => 1.16 + k * 0.13, duration: 0.85, ease: 'power2.out', stagger: 0.07, immediateRender: false }, c.at + 0.08);
        shake(c.at, 0.006, 0.25, R);
        R.fromTo(q(`${card} .cd-word`), { backgroundPosition: '120% 50%' }, { backgroundPosition: '-20% 50%', duration: 1.3, ease: 'power2.inOut' }, c.at + 0.15);
        R.fromTo(q(`${card} .cd-desc`), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, c.at + 0.35);
        R.to(q(card), { autoAlpha: 0, scale: 1.04, duration: 0.45, ease: 'power2.in' }, c.at + 1.3 + CARD_HOLD);
        // journey rail
        R.to(q('.rail-fill'), { scaleX: (i * 2 + 1) / 8, duration: 1.1, ease: 'expo.inOut' }, c.at);
        R.to(q(`.rail-dot-${i}`), { backgroundColor: c.color, boxShadow: `0 0 14px ${c.color}`, scale: 1.5, duration: 0.5 }, c.at + 0.3);
        R.to(q(`.rail-lbl-${i}`), { color: '#FFFFFF', duration: 0.5 }, c.at + 0.3);
        if (i > 0) R.to(q(`.rail-dot-${i - 1}`), { scale: 1, duration: 0.4 }, c.at + 0.3);
      });
      R.fromTo(q('.lb-content'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, CH[0].at - 0.3);

      // ── Act 2: 01 understand ──
      morph('aa', 16.4, 7.0, 0.13);
      show('.a2', 17.1);
      pop(q('.a2-auto-head'), 17.2, 0.9);
      [18.0, 18.625, 19.25].forEach((t, k) => T.to(U.g[12], { shift: -(k + 1) * 2.5 * F.PCT, duration: 0.32, ease: 'power3.inOut' }, t));
      T.fromTo(q('.a2-unknown'), { autoAlpha: 0, y: -160 }, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power3.in' }, 19.42);
      T.to(U.g[12], { red: 1, duration: 0.15 }, 19.8);
      T.to(U.g[9], { red: 0.6, duration: 0.3 }, 19.8);
      T.to(U.g[12], { shift: '+=0.08', duration: 0.05, repeat: 7, yoyo: true, ease: 'none' }, 19.8);
      shake(19.8, 0.006, 0.3);
      reveal('.a2-cap-a', 20.1, 0.08);
      pop(q('.a2-agent-head'), 20.3, 0.9);
      q('.a2-comp').forEach((s, i) => pop(s, 20.9 + i * 0.21, 0.6));
      reveal('.a2-cap-b', 23.9, 0.08);
      T.to(U.g[10], { glow: 1.6, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 24.2);
      T.to(U.g[0], { glow: 1.2, duration: 0.6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 24.5);
      out('.a2', 26.5);
      T.set(U.g[12], { shift: 0, red: 0 }, 27.3);
      T.set(U.g[9], { red: 0 }, 27.3);

      // ── Act 3: 02 see ──
      morph('agents', 28.9, 2.8, 0.3);
      show('.a3', 29.6);
      q('.a3-agent').forEach((s, i) => pop(s, 29.74 + i * 0.118, 0.7));
      reveal('.a3-cap-a', 30.3, 0.07);
      for (let i = 0; i < 9; i++) glow(i, 30.9 + i * 0.13, 1.5, 0.28);
      T.to(q('.a3-agent, .a3-cap-a'), { autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, 32.1);
      morph('demo', 32.3, 1.8, 0.5);
      T.fromTo(q('.a3-demo'), { autoAlpha: 0, y: 50, rotationX: 14, transformPerspective: 1200 }, { autoAlpha: 1, y: 0, rotationX: 0, duration: 1.0 }, 32.6);
      const typed = { n: 0 };
      const typedEl = q('.a3-typed')[0];
      T.to(typed, { n: DEMO_REQUEST.length, duration: 1.5, ease: 'none', onUpdate: () => { if (typedEl) typedEl.textContent = DEMO_REQUEST.slice(0, Math.round(typed.n)); } }, 33.1);
      T.fromTo(q('.a3-bot'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 34.85);
      T.fromTo(q('.a3-step'), { autoAlpha: 0, x: 26 }, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.4 }, 35.35);
      T.fromTo(q('.a3-wait'), { autoAlpha: 0, x: 26 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 36.55);
      pop(q('.a3-approve'), 36.95, 0.8);
      T.fromTo(q('.a3-cursor'), { autoAlpha: 0, x: 240, y: 170 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.inOut' }, 37.05);
      T.to(q('.a3-approve-btn'), { scale: 0.92, duration: 0.07, yoyo: true, repeat: 1 }, 37.73);
      T.to(q('.a3-approve-btn'), { backgroundColor: '#059669', borderColor: '#34D399', boxShadow: '0 0 50px rgba(16,185,129,0.7)', duration: 0.3 }, 37.8);
      T.set(q('.a3-approve-a'), { display: 'none' }, 37.8);
      T.set(q('.a3-approve-b'), { display: 'inline' }, 37.8);
      T.to(q('.a3-wait-icon'), { color: '#34D399', duration: 0.3 }, 37.8);
      // closed-form confetti: a pure function of time, so it scrubs and exports
      const conf = q('.a3-confetti')[0] as HTMLCanvasElement | undefined;
      const confCtx = conf?.getContext('2d');
      // allocate the backing store now, not on the first confetti frame
      if (conf) { conf.width = conf.offsetWidth; conf.height = conf.offsetHeight; }
      let seed = 11;
      const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
      const COLORS = ['#818CF8', '#22D3EE', '#34D399', '#FCD34D', '#FB7185', '#C4B5FD'];
      const pieces = Array.from({ length: 120 }, () => {
        const a = -Math.PI / 2 + (rnd() - 0.5) * Math.PI * 1.05;
        const sp = 900 + rnd() * 1100;
        return { vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, s: 7 + rnd() * 9, r0: rnd() * 6.28, vr: (rnd() - 0.5) * 14, c: COLORS[Math.floor(rnd() * COLORS.length)], w: 0.45 + rnd() * 0.5 };
      });
      const drawConfetti = (ct: number) => {
        if (!conf || !confCtx) return;
        if (conf.width !== conf.offsetWidth) { conf.width = conf.offsetWidth; conf.height = conf.offsetHeight; }
        const W = conf.width;
        const H = conf.height;
        confCtx.clearRect(0, 0, W, H);
        if (ct <= 0 || ct >= 2.2) return;
        const k = W / 1920;
        const drag = 1.7;
        const g = 2600;
        const e = 1 - Math.exp(-drag * ct);
        const alpha = 1 - Math.min(1, Math.max(0, (ct - 1.4) / 0.8));
        for (const p of pieces) {
          const x = W * 0.5 + (p.vx * e / drag) * k;
          const y = H * 0.66 + ((p.vy * e) / drag + g * (ct / drag - e / (drag * drag))) * k;
          confCtx.save();
          confCtx.globalAlpha = alpha;
          confCtx.translate(x, y);
          confCtx.rotate(p.r0 + p.vr * ct);
          confCtx.fillStyle = p.c;
          confCtx.fillRect((-p.s / 2) * k, (-p.s * p.w / 2) * k, p.s * k, p.s * p.w * k);
          confCtx.restore();
        }
      };
      const confT = { v: 0 };
      T.fromTo(confT, { v: 0 }, { v: 2.2, duration: 2.2, ease: 'none', immediateRender: false, onUpdate: () => drawConfetti(confT.v), onReverseComplete: () => drawConfetti(0) }, 37.8);
      glow(0, 37.8, 0.9, 0.4);
      reveal('.a3-cap-b', W(37.8) + 0.35, 0.09, R);
      out('.a3', CH_AT[2] - 0.45, 0.55, R);

      // ── Act 4: 03 build ──
      morph('stack', 41.3, 3.4, 0.18);
      show('.a4', 42.0);
      for (let k = 0; k < 5; k++) pop(q(`.a4-layer-${4 - k}`), 42.15 + k * 0.335, 0.8);
      pop(q('.a4-chip-a'), 44.8, 0.6);
      pop(q('.a4-chip-b'), 45.1, 0.6);
      reveal('.a4-cap', 45.6, 0.1);
      for (let i = 0; i < 5; i++) glow(i, 46.4 + i * 0.12, 1.2, 0.3);
      glow(5, 47.1, 1.5, 0.5);
      out('.a4', 49.4);

      // ── Act 5: 04 adopt ──
      morph('road', 51.3, 3.4, 0.2);
      show('.a5', 51.7);
      pop(q('.a5-head'), 51.75, 0.92);
      q('.a5-phase').forEach((s, i) => pop(s, 52.25 + i * 0.3, 0.7));
      T.fromTo(q('.a5-metric'), { autoAlpha: 0, y: 26, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', clearProps: 'filter', duration: 0.8 }, 54.3);
      T.fromTo(q('.a5-strike'), { scaleX: 0 }, { scaleX: 1, duration: 0.32, ease: 'power3.out' }, 55.1);
      T.to(q('.a5-old'), { opacity: 0.35, duration: 0.3 }, 55.2);
      T.fromTo(q('.a5-new'), { autoAlpha: 0, scale: 1.7, filter: 'blur(16px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', clearProps: 'filter', duration: 0.7, ease: 'back.out(1.5)' }, 55.4);
      glow(4, 55.4, 1.6, 0.4);
      reveal('.a5-cap', 56.5, W(57.12) - W(56.5));
      out('.a5', 59.0, 0.5);
      T.to(q('.lb-content'), { autoAlpha: 0, duration: 0.6 }, 59.3);

      // ── Finale ──
      morph('word', 59.4, 1.1, 0.45);
      for (let k = 0; k < 6; k++) {
        T.to(U.g[0], { red: k % 2 ? 0 : 1, shift: k % 2 ? 0 : (k % 4 ? -0.18 : 0.22), duration: 0.05 }, 60.7 + k * 0.1);
        T.to(U, { aberration: k % 2 ? 0 : 0.012, duration: 0.05 }, 60.7 + k * 0.1);
      }
      T.set(U.g[0], { red: 0, shift: 0 }, 61.35);
      T.set(U, { aberration: 0 }, 61.35);
      morph('sphere', 61.4, 1.0, 0.4);
      T.fromTo(U, { spin: 0 }, { spin: 0.55, duration: 1.0, ease: 'power1.in', immediateRender: false }, 61.4);
      morph('core', 62.4, 1.3, 0.3);
      T.to(U, { spin: 4.6, bloom: 2.8, camZ: 9.1, duration: 1.35, ease: 'power2.in' }, 62.4);
      // impact
      T.set(U, { spin: 0 }, 63.75);
      morph('title', 63.75, 0.95, 0.25);
      T.to(U, { bloom: 1.5, camZ: F.CAM_Z, duration: 1.2, ease: 'expo.out' }, 63.8);
      T.fromTo(U, { aberration: 0.012 }, { aberration: 0, duration: 0.9, ease: 'expo.out', immediateRender: false }, 63.75);
      shake(63.75, 0.018, 0.45);
      T.fromTo(q('.flash'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, 63.75);
      T.fromTo(q('.shock'), { autoAlpha: 0.9, scale: 0.05 }, { autoAlpha: 0, scale: 2.4, duration: 1.15, ease: 'expo.out', immediateRender: false }, 63.75);
      T.fromTo(q('.shock2'), { autoAlpha: 0.7, scale: 0.05 }, { autoAlpha: 0, scale: 1.8, duration: 1.3, ease: 'expo.out', immediateRender: false }, 63.88);
      T.call(() => onImpact(), [], 64.6);
      T.to(q('.lb-top, .lb-bot'), { scaleY: 0, duration: 0.9, ease: 'expo.inOut' }, 64.6);
      T.set(el, { backgroundColor: 'transparent' }, 64.6);
      T.to(q('.u'), { autoAlpha: 0, duration: 1.0, ease: 'power2.inOut' }, 64.75);
      T.call(() => { naturalEnd = true; finish(); }, [], 65.85);

      function finish() {
        if (doneRef.current) return;
        doneRef.current = true;
        gsap.ticker.remove(tick);
        tl.kill();
        // invisible and inert right away; the parent unmounts it in idle time
        gsap.set(el, { pointerEvents: 'none' });
        gsap.set(q('.u'), { display: 'none' });
        onDone();
      }
      const tryAudio = () => {
        if (playback || capturing || !audioBuf || !started || doneRef.current) return;
        const at = clockNow();
        if (at > W(63)) return;
        playback = sound.playBuffer(audioBuf, at);
      };
      const tick = () => {
        if (!started || doneRef.current || capturing) return;
        tl.time(Math.min(clockNow(), tl.duration()));
      };
      const begin = () => {
        if (started || doneRef.current || !canvasReady || !prepared || !audioSettled) return;
        started = true;
        perfStart = performance.now();
        tryAudio();
        gsap.ticker.add(tick);
      };
      startRef.current = () => { canvasReady = true; begin(); };
      if (api.current) canvasReady = true;
      prepareTrailer().then(() => { buildTitle(); prepared = true; begin(); });
      trailerAudio().then((b) => { audioBuf = b; audioSettled = true; begin(); tryAudio(); });
      // never hold the picture hostage to the audio render
      audioWait = window.setTimeout(() => { audioSettled = true; begin(); }, 4000);
      offSound = sound.onChange(tryAudio);
      skipRef.current = () => {
        if (doneRef.current) return;
        playback?.stop(0.4);
        onImpact();
        finish();
      };
      if (import.meta.env.DEV) {
        (window as unknown as { __trailer?: unknown }).__trailer = {
          tl, U,
          get started() { return started; },
          end: TRAILER_END,
          get clock() { return playback ? 'audio' : 'performance'; },
          seek: (t: number) => tl.time(t),
          // export/QA: stop the live clock and audio; frames are then driven by seek()
          capture: () => { capturing = true; playback?.stop(0.05); playback = null; },
        };
      }
    }, el);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') { e.preventDefault(); skipRef.current(); }
    };
    window.addEventListener('keydown', onKey);
    // no WebGL: run the sequence anyway rather than hang on a black screen
    const fallback = window.setTimeout(() => startRef.current(), 2500);
    return () => {
      window.clearTimeout(fallback);
      window.clearTimeout(audioWait);
      offSound();
      window.removeEventListener('keydown', onKey);
      startRef.current = () => {};
      // a natural ending lets the score's tail ring under the title slide
      if (!naturalEnd) playback?.stop(0.6);
      ctx.revert();
    };
    // Mount-once sequence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const credit: React.CSSProperties = { ...T.mono, fontSize: 'clamp(0.75rem, 0.9cqw, 1rem)', color: 'rgba(226,232,240,0.55)', letterSpacing: '0.38em' };

  return (
    // a fixed 1920x1080 design canvas (its own size container), scaled to the
    // stage: identical proportions on every screen, from 4K to a phone
    <div ref={root} dir="rtl" style={{ position: 'absolute', left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '0 0', containerType: 'size', zIndex: 60, overflow: 'hidden', background: '#03030A' }}>
      <div className="u" style={{ position: 'absolute', inset: 0 }}>
        <Universe U={U} initial={initial} apiRef={api} />
      </div>

      {/* ── Act 0 ── */}
      <div className="a0" style={layer}>
        <div className="c" style={{ ...pos(50, 63), width: '86%', textAlign: 'center' }}>
          <div style={{ ...T.hero, fontWeight: 300, fontSize: 'clamp(2rem, 3.4cqw, 3.8rem)', color: 'rgba(241,245,249,0.92)' }}>
            <Reveal cls="a0-line" text="כל יום ב-HR, מידע, אנשים ומערכות מחוברים" />
          </div>
          <div style={{ ...T.hero, fontWeight: 900, fontSize: 'clamp(3.6rem, 7.2cqw, 8rem)', marginTop: '1.6cqh', color: '#FB7185', textShadow: '0 0 60px rgba(244,63,94,0.55)' }}>
            <span className="a0-hit" style={{ position: 'relative', display: 'inline-block' }}>
              {[0, 1].map((k) => (
                <span key={k} className="a0-echo" aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0, color: 'transparent', WebkitTextStroke: '2px #FB7185', textShadow: 'none', willChange: 'transform, opacity' }}>ידנית.</span>
              ))}
              <span className="ri" style={{ display: 'inline-block', opacity: 0 }}>ידנית.</span>
            </span>
          </div>
        </div>
      </div>

      {/* ── Act 1 ── */}
      <div className="a1" style={layer}>
        <div className="a1-scene" style={{ position: 'absolute', inset: 0 }}>
          <div className="a1-hub c" style={pos(F.HUB.x, F.HUB.y + 8.5)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45em', padding: '0.35em 0.95em', borderRadius: '100px', background: 'rgba(79,70,229,0.28)', border: '1px solid rgba(165,180,252,0.6)', ...T.label, fontFamily: "'Space Grotesk', sans-serif" }}>
              <User size="1.05em" /> HR
            </div>
          </div>
          {SYSTEMS.map((s, i) => (
            <div key={s.label} className="a1-sys c" style={pos(F.SYSTEM_POS[i].x, F.SYSTEM_POS[i].y + 6.4)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em', padding: '0.3em 0.8em', borderRadius: '100px', background: 'rgba(6,8,22,0.72)', border: `1px solid ${F.SYSTEM_COLORS[i]}66`, ...T.label, fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(0.85rem, 1.05cqw, 1.15rem)' }}>
                <span style={{ display: 'inline-flex', color: F.SYSTEM_COLORS[i] }}><s.icon size="1em" /></span>{s.label}
              </div>
            </div>
          ))}
          <div className="a1-clock c" style={{ ...pos(84, F.SYSTEM_POS[0].y), display: 'flex', alignItems: 'center', gap: '0.5em', ...T.mono, letterSpacing: '0.08em', fontSize: 'clamp(1.6rem, 2.6cqw, 2.9rem)', color: '#FCD34D', fontWeight: 700 }}>
            <Clock size="0.8em" /><span className="a1-clock-t">08:00</span>
          </div>
          <div className="c" style={{ ...pos(84, F.HUB.y + 4), width: '25%', display: 'flex', flexDirection: 'column', gap: '1.5cqh' }}>
            {STATS.map((st) => (
              <div key={st.label} className="a1-stat" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1cqw',
                padding: '1.5cqh 1.5cqw', borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(15,18,40,0.85), rgba(6,8,22,0.75))',
                border: `1px solid ${st.color}40`, boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}>
                <span style={{ ...T.label, color: 'rgba(226,232,240,0.85)' }}>{st.label}</span>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.3em', direction: 'ltr' }}>
                  <span className="n" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(2.4rem, 3.6cqw, 4rem)', lineHeight: 1, color: st.color, fontVariantNumeric: 'tabular-nums' }}>0</span>
                  <span style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 600, fontSize: 'clamp(0.9rem, 1.1cqw, 1.2rem)', color: st.color }}>{st.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="c" style={{ ...pos(50, 84.5), width: '90%', textAlign: 'center', ...T.hero }}>
          <Reveal cls="a1-cap" text="מה אם כל זה היה קורה אוטומטית?" />
        </div>
      </div>

      {/* ── Chapter cards ── */}
      {CH.map((c, i) => (
        <div key={c.num} className={`card-${i}`} style={{ ...layer, zIndex: 20 }}>
          <div className="c" style={{ ...pos(50, 50), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.2cqh' }}>
            <div className="cd-kicker" style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 600, fontSize: 'clamp(1rem, 1.35cqw, 1.5rem)', color: c.color, letterSpacing: 0, whiteSpace: 'nowrap' }}>
              פרק {c.num}
            </div>
            <div className="cd-rule" style={{ width: '18cqw', height: '1px', background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} />
            <div style={{ position: 'relative' }}>
              {/* static glow, rasterized once (an animated drop-shadow on text this size is GPU-heavy) */}
              <div aria-hidden className="cd-glow" style={{
                position: 'absolute', inset: 0, textAlign: 'center',
                fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: 'clamp(6rem, 11cqw, 13rem)', lineHeight: 1.05, letterSpacing: '-0.025em', whiteSpace: 'nowrap',
                color: c.color, opacity: 0, filter: 'blur(28px)', padding: '0 0.08em',
              }}>{c.label}</div>
              {[0, 1, 2].map((k) => (
                <div key={k} className="cd-echo" aria-hidden style={{
                  position: 'absolute', inset: 0, opacity: 0, textAlign: 'center',
                  fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: 'clamp(6rem, 11cqw, 13rem)', lineHeight: 1.05, letterSpacing: '-0.025em', whiteSpace: 'nowrap',
                  color: 'transparent', WebkitTextStroke: `2px ${c.color}`, padding: '0 0.08em', willChange: 'transform, opacity',
                }}>{c.label}</div>
              ))}
              <div className="cd-word" style={{
                position: 'relative',
                fontFamily: "'Heebo', sans-serif", fontWeight: 900, fontSize: 'clamp(6rem, 11cqw, 13rem)', lineHeight: 1.05, letterSpacing: '-0.025em', whiteSpace: 'nowrap',
                backgroundImage: `linear-gradient(100deg, #FFFFFF 0%, #FFFFFF 38%, ${c.color} 50%, #FFFFFF 62%, #FFFFFF 100%)`,
                backgroundSize: '250% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
                padding: '0 0.08em', willChange: 'transform, opacity',
              }}>{c.label}</div>
            </div>
            <div className="cd-desc" style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 400, fontSize: 'clamp(1.3rem, 1.9cqw, 2.1rem)', color: 'rgba(226,232,240,0.78)', whiteSpace: 'nowrap' }}>{c.desc}</div>
          </div>
        </div>
      ))}

      {/* ── Act 2: automation vs agent ── */}
      <div className="a2" style={layer}>
        <div className="a2-auto-head c" style={{ ...pos(74.5, 18.5), textAlign: 'center' }}>
          <div style={{ ...T.heading, color: 'rgba(203,213,225,0.92)' }}>אוטומציה</div>
          <div style={{ ...T.mono, color: 'rgba(148,163,184,0.85)', marginTop: '1.2cqh' }}>IF → THEN</div>
        </div>
        <div className="a2-unknown c" style={pos(54.2, 52.6)}>
          <div style={{
            width: '5.6cqh', height: '5.6cqh', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(244,63,94,0.2)', border: '2px solid #F43F5E', color: '#FDA4AF',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: '2cqw', boxShadow: '0 0 40px rgba(244,63,94,0.6)',
          }}>?</div>
        </div>
        <div className="a2-agent-head c" style={{ ...pos(F.AGENT_CENTER.x, 18.5), textAlign: 'center' }}>
          <div style={{ ...T.heading, background: 'linear-gradient(90deg, #C7D2FE, #67E8F9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>אייג׳נט</div>
          <div style={{ ...T.mono, color: 'rgba(165,180,252,0.9)', marginTop: '1.2cqh' }}>THINK → ACT</div>
        </div>
        {COMPONENTS.map((c, i) => (
          <Pill key={c.label} cls="a2-comp" icon={c.icon} text={c.label} color={F.COMPONENT_COLORS[i]} x={F.COMPONENT_POS[i].x} y={F.COMPONENT_POS[i].y + 4.6} />
        ))}
        <div className="c" style={{ ...pos(74.5, 85.5), width: '44%', textAlign: 'center', ...T.hero, fontSize: 'clamp(1.6rem, 2.5cqw, 2.8rem)', whiteSpace: 'nowrap' }}>
          <Reveal cls="a2-cap-a" text="אוטומציה מבצעת מסלול." />
        </div>
        <div className="c" style={{ ...pos(F.AGENT_CENTER.x, 85.5), width: '44%', textAlign: 'center', ...T.hero, fontSize: 'clamp(1.6rem, 2.5cqw, 2.8rem)', whiteSpace: 'nowrap' }}>
          <Reveal cls="a2-cap-b" text="אייג׳נט מנהל מטרה." wordStyle={{ background: 'linear-gradient(90deg, #A5B4FC, #67E8F9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }} />
        </div>
      </div>

      {/* ── Act 3: nine agents + live demo ── */}
      <div className="a3" style={layer}>
        {AGENTS.map((a, i) => (
          <Pill key={a.label} cls="a3-agent" icon={a.icon} text={a.label} color={F.AGENT_COLORS[i]} x={F.AGENT_GRID[i].x} y={F.AGENT_GRID[i].y + 4.4} />
        ))}
        <div className="c" style={{ ...pos(50, 85.5), width: '90%', textAlign: 'center', ...T.hero }}>
          <Reveal cls="a3-cap-a" text="תשעה אייג׳נטים לאורך מסע ההעסקה" />
        </div>
        {/* confetti bursts from behind the window, never over its text */}
        <canvas className="a3-confetti" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
        <div className="a3-demo c" style={{ ...pos(50, 46), width: '50%' }}>
          <div style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(99,102,241,0.25)', borderRadius: '18px' }}>
            <SlackWindow channel="hr-onboarding">
              <SlackMessage initials="דל" name="דוד לוי" time="09:42" color="#7C3AED">
                <span style={{ color: '#818CF8', fontWeight: 700, direction: 'ltr', unicodeBidi: 'isolate' }}>@OnboardBot</span>{' '}
                <span className="a3-typed" />
              </SlackMessage>
              <div className="a3-bot">
                <SlackMessage initials="OB" name="OnboardBot" time="09:42" color="#6366F1" isBot>
                  <div style={{ marginBottom: '0.4rem' }}>קיבלתי. מכין תוכנית קליטה מלאה:</div>
                  {DEMO_STEPS.map((s) => (
                    <div key={s} className="a3-step" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <span style={{ display: 'inline-flex', color: '#34D399' }}><CheckCircle2 size="1em" /></span><span>{s}</span>
                    </div>
                  ))}
                  <div className="a3-wait" style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span className="a3-wait-icon" style={{ display: 'inline-flex', color: '#FBBF24' }}><Clock size="1em" /></span>
                    <span>מייל ברכה: <strong style={{ color: 'white' }}>ממתין לאישורך</strong></span>
                  </div>
                </SlackMessage>
              </div>
            </SlackWindow>
          </div>
          <div className="a3-approve" style={{ display: 'flex', justifyContent: 'center', marginTop: '2.6cqh' }}>
            <div className="a3-approve-btn" style={{
              position: 'relative', padding: '1.1cqh 3.2cqw', borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366F1, #4F46E5)', border: '1px solid rgba(165,180,252,0.8)',
              boxShadow: '0 12px 40px rgba(79,70,229,0.5)', fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: 'clamp(1.2rem, 1.6cqw, 1.8rem)', color: 'white',
            }}>
              <span className="a3-approve-a">אישור וביצוע</span>
              <span className="a3-approve-b" style={{ display: 'none' }}>אושר</span>
              <span className="a3-cursor" style={{ position: 'absolute', left: '84%', top: '58%', display: 'inline-flex', color: 'white', filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.8))', opacity: 0 }}>
                <MousePointer2 size="1.9cqw" fill="white" />
              </span>
            </div>
          </div>
        </div>
        <div className="c" style={{ ...pos(50, 85.5), width: '90%', textAlign: 'center', ...T.hero }}>
          <Reveal cls="a3-cap-b" text="האייג׳נט מכין. ההחלטה שלנו." />
        </div>
      </div>

      {/* ── Act 4: stack + trust shield ── */}
      <div className="a4" style={layer}>
        {STACK.map((s, i) => (
          <Pill key={s.label} cls={`a4-layer-${i}`} icon={s.icon} text={s.label} color={F.STACK_COLORS[i]} x={50} y={F.STACK_Y[i] + 2.6} />
        ))}
        <Pill cls="a4-chip-a" icon={KeyRound} text="הרשאות מינימליות" color="#34D399" x={14} y={F.STACK_Y[2] + 2.6} />
        <Pill cls="a4-chip-b" icon={Shield} text="ממשל ובקרה" color="#34D399" x={86} y={F.STACK_Y[2] + 2.6} />
        <div className="c" style={{ ...pos(50, 85.5), width: '90%', textAlign: 'center', ...T.hero }}>
          <Reveal cls="a4-cap" text="אמון נבנה בשכבות." />
        </div>
      </div>

      {/* ── Act 5: roadmap + value ── */}
      <div className="a5" style={layer}>
        <div className="a5-head c" style={{ ...pos(50, 21), ...T.heading, color: '#FDE68A', whiteSpace: 'nowrap' }}>מפת דרכים ל-90 יום</div>
        {ROADMAP.map((r, i) => (
          <div key={r.phase} className="a5-phase c" style={{ ...pos(F.ROAD_X[i], F.ROAD_Y + 8.4), textAlign: 'center', whiteSpace: 'nowrap' }}>
            <div style={{ ...T.label, fontWeight: 500, color: 'rgba(203,213,225,0.8)', fontSize: 'clamp(0.85rem, 1.05cqw, 1.15rem)' }}>{r.weeks}</div>
            <div style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 1.9cqw, 2.1rem)', color: F.ROAD_COLORS[i], textShadow: `0 0 24px ${F.ROAD_COLORS[i]}88` }}>{r.phase}</div>
          </div>
        ))}
        <div className="a5-metric c" style={{ ...pos(50, 66), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8cqh' }}>
          <div style={{ ...T.label, color: 'rgba(226,232,240,0.8)', fontWeight: 500 }}>זמן לסיום תהליך</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.4cqw', direction: 'ltr' }}>
            <span className="a5-old" style={{ position: 'relative', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 'clamp(2.6rem, 4.2cqw, 4.8rem)', color: 'rgba(226,232,240,0.85)' }}>
              6h
              <span className="a5-strike" style={{ position: 'absolute', left: '-8%', right: '-8%', top: '52%', height: '0.45cqh', borderRadius: '4px', background: '#F43F5E', transformOrigin: 'left center', boxShadow: '0 0 12px rgba(244,63,94,0.8)' }} />
            </span>
            <span style={{ fontSize: 'clamp(1.8rem, 2.6cqw, 3rem)', color: 'rgba(226,232,240,0.45)' }}>→</span>
            <span className="a5-new" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(4.4rem, 7cqw, 8rem)', lineHeight: 1, color: '#FCD34D', textShadow: '0 0 60px rgba(245,158,11,0.65)' }}>45m</span>
          </div>
        </div>
        <div className="c" style={{ ...pos(50, 85.5), width: '90%', textAlign: 'center', ...T.hero }}>
          <Reveal cls="a5-cap" text="נתחיל קטן. נמדוד. נרחיב." />
        </div>
      </div>

      {/* ── Impact ── */}
      <div className="flash" style={{ position: 'absolute', inset: 0, zIndex: 45, pointerEvents: 'none', opacity: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.95) 0%, rgba(199,210,254,0.55) 28%, rgba(99,102,241,0.12) 60%, transparent 80%)' }} />
      <div className="shock c" style={{ ...pos(50, 50), zIndex: 44, width: '70cqh', height: '70cqh', borderRadius: '50%', border: '3px solid rgba(199,210,254,0.85)', boxShadow: '0 0 40px rgba(129,140,248,0.8), inset 0 0 40px rgba(129,140,248,0.5)', opacity: 0, pointerEvents: 'none' }} />
      <div className="shock2 c" style={{ ...pos(50, 50), zIndex: 44, width: '70cqh', height: '70cqh', borderRadius: '50%', border: '2px solid rgba(103,232,249,0.7)', opacity: 0, pointerEvents: 'none' }} />

      {/* ── Letterbox bars (top carries the journey rail) ── */}
      <div className="lb-top" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '11%', background: '#000', zIndex: 40, transformOrigin: 'top center' }}>
        <div className="lb-content" style={{ position: 'absolute', inset: 0, opacity: 0 }}>
          <div style={{ position: 'absolute', right: '3.2%', top: '50%', transform: 'translateY(-50%)', ...credit, direction: 'rtl', letterSpacing: 0, fontFamily: "'Heebo', sans-serif", fontWeight: 500 }}>גלעד ברונשטיין</div>
          <div style={{ position: 'absolute', left: '3.2%', top: '50%', transform: 'translateY(-50%)', ...credit }}>HR LEADERS SUMMIT 2026</div>
          <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, -50%)', width: '40cqw', height: '2px' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.12)' }} />
            <div className="rail-fill" style={{ position: 'absolute', inset: 0, transformOrigin: 'right center', transform: 'scaleX(0)', background: 'linear-gradient(270deg, #818CF8, #22D3EE, #34D399, #FCD34D)' }} />
            {CH.map((c, i) => (
              <div key={c.num} style={{ position: 'absolute', right: `${12.5 + i * 25}%`, top: '50%', width: 0, height: 0 }}>
                <div className={`rail-dot-${i}`} style={{ position: 'absolute', width: '0.7cqw', height: '0.7cqw', marginLeft: '-0.35cqw', marginTop: '-0.35cqw', borderRadius: '50%', background: 'rgba(255,255,255,0.28)' }} />
                <div className={`rail-lbl-${i}`} style={{ position: 'absolute', top: '1.4cqh', left: 0, transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: "'Heebo', sans-serif", fontWeight: 600, fontSize: 'clamp(0.75rem, 0.95cqw, 1.05rem)', color: 'rgba(255,255,255,0.38)' }}>
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lb-bot" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '11%', background: '#000', zIndex: 40, transformOrigin: 'bottom center' }} />
    </div>
  );
});
