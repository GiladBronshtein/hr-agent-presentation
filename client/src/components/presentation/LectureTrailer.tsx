/**
 * LectureTrailer - the ~73s opening of the title slide (slide 2), drawn in
 * the deck's one visual language: a single pen line on navy paper, an amber
 * pen tip, plain editorial type. Nothing glows. The score (trailer/score.ts)
 * is felt piano, soft strings and the pen itself, and every stroke on screen
 * has its sound.
 *
 *   act 0   a heartbeat; the dot becomes a hesitant, stop-start line. "ידנית."
 *   act 1   one line runs back and forth between the tools of a learning
 *           program until it is a tangle; the clock runs; everything freezes
 *   01      the chapter number is written in one stroke (as on the deck's cards)
 *   act 2   a rigid right-angle route jams on the unknown; the agent's line
 *           flows around it to a goal, picking up its seven parts on the way
 *   02      the learning cycle is drawn as a loop with nine agents on it, then
 *           a live request in Slack becomes a plan, and a person approves it
 *   03      trust is drawn layer by layer, then fenced
 *   04      the 90-day road is drawn; "6 שבועות" is struck through
 *   finale  the line writes the title and becomes the underline of the real
 *           title slide (a match cut: the slide is revealed under it)
 *
 * Enter skips straight to the title.
 */
import { memo, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import type { LucideIcon } from 'lucide-react';
import {
  MessageCircle, Calendar, Folder, BarChart3, Target,
  BookOpen, Brain, Wrench, Database, ShieldAlert, UserCheck,
  ClipboardList, UserPlus, TrendingUp, Search, PenTool, Route, MessagesSquare,
  GraduationCap, Layers, FileSpreadsheet,
  Clock, MousePointer2, Monitor, Workflow, Shield, KeyRound,
} from 'lucide-react';
import { sound, type BufferPlayback } from '../../lib/sound';
import { SlackWindow, SlackMessage } from './SlackChat';
import { INK, writeNumber, pathFrom, spline, type Pt } from '../motion/path';
import * as L from './trailer/lines';
import { CH, CH_AT, CARD_HOLD, TRAILER_END, W, NUM_LEAD, NUM_DUR } from './trailer/score';
import { prepareTrailer, trailerAudio } from './trailer/prepare';

// The tools an L&D team juggles around one learning program
const SYSTEMS: { label: string; icon: LucideIcon }[] = [
  { label: 'LMS', icon: GraduationCap }, { label: 'Articulate', icon: Layers }, { label: 'Calendar', icon: Calendar },
  { label: 'Drive', icon: Folder }, { label: 'Forms', icon: ClipboardList }, { label: 'Excel', icon: FileSpreadsheet },
  { label: 'Slack', icon: MessageCircle },
];
const STATS = [
  { value: 6, unit: 'שבועות', label: 'לפיתוח קורס אחד' },
  { value: 9, unit: 'כלים', label: 'בכל תוכנית למידה' },
  { value: 5, unit: 'ימים', label: 'לאיסוף משוב ודוח' },
];
const COMPONENTS: { label: string; icon: LucideIcon }[] = [
  { label: 'מטרה', icon: Target }, { label: 'הקשר', icon: BookOpen }, { label: 'מודל', icon: Brain },
  { label: 'כלים', icon: Wrench }, { label: 'זיכרון', icon: Database }, { label: 'גבולות', icon: ShieldAlert },
  { label: 'אישור', icon: UserCheck },
];
// The nine L&D agents of the lecture, in their fixed order
const AGENTS: { label: string; icon: LucideIcon }[] = [
  { label: 'אבחון צרכים', icon: Search }, { label: 'פיתוח תוכן', icon: PenTool },
  { label: 'מסלול אישי', icon: Route }, { label: 'מדידת אימפקט', icon: BarChart3 },
  { label: 'תרגול בסימולציה', icon: MessagesSquare }, { label: 'למידה בתוך העבודה', icon: MessageCircle },
  { label: 'מיפוי מיומנויות', icon: TrendingUp }, { label: 'קליטה לומדת', icon: UserPlus },
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
const DEMO_REQUEST = 'צוות המכירות צריך להכיר את חבילת Pro עד ה-15 בחודש.';
const DEMO_STEPS = ['אבחון מקדים: 5 שאלות', '3 יחידות מיקרו-למידה, 7 דק׳ כל אחת', 'תרגול שיחת מכירה בסימולציה'];

// ── Typography (the canvas is a fixed 1920x1080 box, so px are design px) ──
const HEB = /[֐-׿]/;
const HEEBO = "'Heebo', sans-serif";
const GROTESK = "'Space Grotesk', 'Heebo', sans-serif";
const TITLE_FONT = "'Space Grotesk', 'Heebo', sans-serif";
const T = {
  hero: { fontFamily: HEEBO, fontWeight: 800, fontSize: 56, lineHeight: 1.2, color: INK.paper, letterSpacing: '-0.01em' } as React.CSSProperties,
  heading: { fontFamily: HEEBO, fontWeight: 900, fontSize: 66, lineHeight: 1, letterSpacing: '-0.015em' } as React.CSSProperties,
  mono: { fontFamily: GROTESK, direction: 'ltr', letterSpacing: '0.32em', fontSize: 18, fontWeight: 600, color: INK.slate } as React.CSSProperties,
  label: { fontFamily: HEEBO, fontWeight: 600, fontSize: 23, color: INK.paper } as React.CSSProperties,
};
const HAIR = 'rgba(243,238,228,0.22)';
const LINE = 'rgba(243,238,228,0.88)';

/** Masked word reveal. Consecutive non-Hebrew words merge into one LTR run
 *  (split inline-blocks are bidi-neutral and would otherwise reorder). */
function Reveal({ text, cls }: { text: string; cls?: string }) {
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
            <span className="ri" dir={g.ltr ? 'ltr' : undefined} style={{ display: 'inline-block' }}>{g.t}</span>
          </span>
          {i < groups.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

const at = (x: number, y: number): React.CSSProperties => ({ position: 'absolute', left: x, top: y });
const layer: React.CSSProperties = { position: 'absolute', inset: 0, visibility: 'hidden', pointerEvents: 'none' };
const svgFull: React.CSSProperties = { position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' };
const ink = { fill: 'none', stroke: LINE, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

/** A label on the line: plain type on a paper-thin pill, the line passing behind it. */
function Tag({ icon: Icon, text, cls, x, y, accent = false, font }: { icon?: LucideIcon; text: string; cls: string; x: number; y: number; accent?: boolean; font?: string }) {
  return (
    <div className={`${cls} c`} style={at(x, y)}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5em', whiteSpace: 'nowrap',
        padding: '0.36em 0.9em', borderRadius: '100px',
        background: INK.navy, border: `1px solid ${accent ? INK.amber : HAIR}`,
        ...T.label, ...(font ? { fontFamily: font, fontSize: 21 } : null),
      }}>
        {Icon && <span style={{ display: 'inline-flex', color: accent ? INK.amber : INK.slate }}><Icon size="0.95em" strokeWidth={2} /></span>}
        <span>{text}</span>
      </div>
    </div>
  );
}

/** How a ring label hangs off its node: outward from the cycle. */
function ringAnchor(i: number) {
  const ang = -Math.PI / 2 + (i / 9) * Math.PI * 2;
  const cx = Math.cos(ang);
  const sy = Math.sin(ang);
  return { xp: cx > 0.25 ? 0 : cx < -0.25 ? -100 : -50, yp: sy < -0.6 ? -100 : sy > 0.6 ? 0 : -50 };
}

interface TitleGeo { lines: { text: string; cx: number; x0: number; x1: number; base: number; font: number; ls: number }[]; ux0: number; ux1: number; uy: number; uh: number }

/** Measure the real title (rendered hidden by S01 during the trailer), so the
 *  finale writes it in place and its line lands exactly on the underline. */
function measureTitle(root: HTMLElement): TitleGeo {
  const fallback: TitleGeo = {
    lines: [
      { text: 'מאוטומציה', cx: 960, x0: 500, x1: 1420, base: 470, font: 211, ls: -10.5 },
      { text: 'לאייג׳נט', cx: 960, x0: 560, x1: 1360, base: 656, font: 211, ls: -10.5 },
    ],
    ux0: 888, ux1: 1032, uy: 700, uh: 4,
  };
  const host = root.parentElement;
  const rr = root.getBoundingClientRect();
  if (!host || !rr.width) return fallback;
  const s = rr.width / 1920;
  const X = (v: number) => (v - rr.left) / s;
  const Y = (v: number) => (v - rr.top) / s;
  const lines: TitleGeo['lines'] = [];
  host.querySelectorAll<HTMLElement>('[data-title-measure] [data-title-line]').forEach((h) => {
    const text = h.firstChild;
    const marker = h.querySelector('[data-baseline]');
    if (!text || text.nodeType !== Node.TEXT_NODE || !marker) return;
    const range = document.createRange();
    range.selectNodeContents(text);
    const r = range.getBoundingClientRect();
    const cs = getComputedStyle(h);
    const k = h.getBoundingClientRect().width / (h.offsetWidth || 1) / s;
    lines.push({
      text: text.textContent ?? '', cx: X((r.left + r.right) / 2), x0: X(r.left), x1: X(r.right),
      base: Y(marker.getBoundingClientRect().bottom), font: parseFloat(cs.fontSize) * k, ls: (parseFloat(cs.letterSpacing) || 0) * k,
    });
  });
  const u = host.querySelector<HTMLElement>('[data-title-measure] [data-title-underline]')?.getBoundingClientRect();
  if (lines.length !== 2 || !u || !u.width) return fallback;
  return { lines, ux0: X(u.left), ux1: X(u.right), uy: Y((u.top + u.bottom) / 2), uh: u.height / s };
}

// memo: the trailer renders once; parent re-renders (the reveal) must not re-diff its tree
export const LectureTrailer = memo(function LectureTrailer({ onImpact, onDone }: { onImpact: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
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

    // Master clock: the pre-rendered score's playhead when audio plays,
    // otherwise the performance clock. Visuals follow it, so picture and
    // sound can never drift apart.
    let audioBuf: AudioBuffer | null = null;
    let playback: BufferPlayback | null = null;
    let perfStart = 0;
    let started = false;
    let capturing = false;
    let naturalEnd = false;
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
          m,
          to: (targets: gsap.TweenTarget, vars: gsap.TweenVars, p: number) => { tl.to(targets, vars, m(p)); return X; },
          fromTo: (targets: gsap.TweenTarget, from: gsap.TweenVars, to: gsap.TweenVars, p: number) => { tl.fromTo(targets, from, to, m(p)); return X; },
          set: (targets: gsap.TweenTarget, vars: gsap.TweenVars, p: number) => { tl.set(targets, vars, m(p)); return X; },
          call: (fn: () => void, args: unknown[], p: number) => { tl.call(fn, args, m(p)); return X; },
        };
        return X;
      };
      const S = wrap(W);
      const R = wrap((t) => t);
      type TL = typeof S;
      const show = (sel: string, t: number, X: TL = S) => X.set(q(sel), { visibility: 'visible' }, t);
      const out = (sel: string, t: number, dur = 0.55, X: TL = S) =>
        X.to(q(sel), { autoAlpha: 0, duration: dur, ease: 'power2.in' }, t);
      const reveal = (sel: string, t: number, stagger = 0.075, X: TL = S) =>
        X.fromTo(q(`${sel} .ri`), { yPercent: 112, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger, ease: 'expo.out' }, t);
      const inkIn = (target: gsap.TweenTarget, t: number, X: TL = S) =>
        X.fromTo(target, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, t);
      /** Right-to-left wipe, the way a Hebrew line is read and written. */
      const wipe = (target: gsap.TweenTarget, t: number, dur = 0.55, X: TL = S) =>
        X.fromTo(target, { clipPath: 'inset(-20% 0% -20% 100%)' }, { clipPath: 'inset(-20% 0% -20% 0%)', duration: dur, ease: 'power2.out' }, t);

      // ── The pen: every line is drawn by a pure function of time, so the
      // trailer scrubs and exports frame-exactly. ──
      const lens = new Map<SVGGeometryElement, number>();
      const len = (p: SVGGeometryElement) => {
        let v = lens.get(p);
        if (v == null) { v = p.getTotalLength(); lens.set(p, v); }
        return v;
      };
      /** Show the part of a path between fractions a and b. */
      const seg = (p: SVGGeometryElement, a: number, b: number) => {
        const l = len(p);
        const d = Math.max(0, (b - a) * l);
        p.style.strokeDasharray = `${d} ${l * 2 + 10}`;
        p.style.strokeDashoffset = `${-a * l}`;
        p.style.strokeOpacity = d < 0.5 ? '0' : '';
      };
      const tipOf = (p: Element) => p.closest('svg')?.querySelector<SVGCircleElement>('.tip') ?? null;
      interface Pen { from?: number; to?: number; ease?: string; tip?: boolean; erase?: boolean; onP?: (pt: DOMPoint, f: number) => void }
      /** Draw (or erase from the tail) a path over story time [t, t + d]. */
      const draw = (p: SVGGeometryElement | undefined, t: number, d: number, X: TL = S, o: Pen = {}) => {
        if (!p) return;
        const st = { f: o.from ?? 0 };
        const tip = o.tip === false ? null : tipOf(p);
        const dur = Math.max(0.05, X.m(t + d) - X.m(t));
        const update = () => {
          if (o.erase) seg(p, st.f, 1); else seg(p, 0, st.f);
          if (tip || o.onP) {
            const pt = p.getPointAtLength(st.f * len(p));
            if (tip) { tip.setAttribute('cx', String(pt.x)); tip.setAttribute('cy', String(pt.y)); }
            o.onP?.(pt, st.f);
          }
        };
        tl.fromTo(st, { f: o.from ?? 0 }, { f: o.to ?? 1, duration: dur, ease: o.ease ?? 'none', immediateRender: false, onUpdate: update }, X.m(t));
        if (tip) {
          tl.set(tip, { autoAlpha: 1 }, X.m(t));
          tl.set(tip, { autoAlpha: 0 }, X.m(t) + dur + 0.02);
        }
      };
      const path = (sel: string) => q(sel)[0] as unknown as SVGGeometryElement | undefined;
      const paths = (sel: string) => q(sel) as unknown as SVGGeometryElement[];
      q('.ink').forEach((p) => seg(p as unknown as SVGGeometryElement, 0, 0));
      gsap.set(q('.tip'), { autoAlpha: 0 });

      // ── Letterbox ──
      S.fromTo(q('.lb-top, .lb-bot'), { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: 'expo.inOut' }, 0);

      // ── Act 0: a heartbeat; the dot becomes a hesitant line ──
      show('.a0', 0.2);
      S.fromTo(q('.a0-dot'), { attr: { r: 0 } }, { attr: { r: 9 }, duration: 0.5, ease: 'back.out(3)' }, 0.25);
      [0.6, 1.85].forEach((t) => S.to(q('.a0-dot'), { attr: { r: 15 }, duration: 0.11, yoyo: true, repeat: 1, ease: 'power2.out' }, t));
      S.set(q('.a0-dot'), { autoAlpha: 0 }, 1.9);
      const a0 = path('.a0-path');
      const [s1, s2, s3] = L.A0_STOPS;
      draw(a0, 1.9, 0.6, S, { to: s1, ease: 'power2.inOut' });
      draw(a0, 2.75, 0.55, S, { from: s1, to: s2, ease: 'power2.inOut' });
      draw(a0, 3.4, 0.14, S, { from: s2, to: s3 });
      draw(a0, 3.7, 1.0, S, { from: s3, to: 1, ease: 'power1.inOut' });
      reveal('.a0-line', 1.5, 0.09);
      wipe(q('.a0-hit'), 3.4, 0.22);
      S.fromTo(q('.a0-hit'), { y: 18 }, { y: 0, duration: 0.5, ease: 'back.out(2)' }, 3.4);
      out('.a0', 4.9, 0.6);

      // ── Act 1: the invisible work ──
      show('.a1', 6.2);
      inkIn(q('.a1-hub'), 6.3);
      q('.a1-sys').forEach((s, i) => inkIn(s, 6.5 + i * 0.12));
      inkIn(q('.a1-clock'), 6.4);
      const clock = { m: 0 };
      const clockEl = q('.a1-clock-t')[0];
      S.to(clock, { m: 47, duration: 6.4, ease: 'power1.in', onUpdate: () => { if (clockEl) clockEl.textContent = `08:${String(Math.round(clock.m)).padStart(2, '0')}`; } }, 6.5);
      draw(path('.a1-scr-a'), 6.45, 4.4);
      q('.a1-stat').forEach((s, i) => {
        S.fromTo(s, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.8 }, 9.0 + i * 0.6);
        const num = { v: 0 };
        const numEl = s.querySelector('.n');
        S.to(num, { v: STATS[i].value, duration: 0.9, ease: 'power3.out', onUpdate: () => { if (numEl) numEl.textContent = String(Math.round(num.v)); } }, 9.05 + i * 0.6);
      });
      // overload: the line goes frantic, everything shakes
      draw(path('.a1-scr-b'), 10.9, 1.9, S, { ease: 'power1.in' });
      const jit = q('.a1-sys > div, .a1-hub > div');
      const jitEnv = { a: 0 };
      S.fromTo(jitEnv, { a: 0 }, {
        a: 1, duration: 1.8, ease: 'power2.in', immediateRender: false,
        onUpdate: () => {
          const tt = tl.time();
          jit.forEach((e, i) => gsap.set(e, { x: Math.sin(tt * 47 + i * 1.7) * 9 * jitEnv.a, y: Math.cos(tt * 39 + i * 2.3) * 6 * jitEnv.a }));
        },
      }, 11.1);
      S.to(q('.a1-clock'), { color: INK.amber, duration: 0.3 }, 11.4);
      // freeze
      S.set(q('.a1-sys > div, .a1-hub > div'), { x: 0, y: 0 }, 12.9);
      S.to(q('.a1-scene'), { autoAlpha: 0.16, duration: 0.3, ease: 'power2.out' }, 12.9);
      reveal('.a1-cap', 13.1, 0.08);
      out('.a1', 14.4, 0.6);

      // ── Chapter cards: the number in one stroke, the word behind the pen ──
      CH.forEach((c, i) => {
        const card = `.card-${i}`;
        const t0 = c.at - NUM_LEAD;
        show(card, t0, R);
        draw(path(`${card} .ink`), t0, NUM_DUR, R, { ease: 'power1.inOut' });
        wipe(q(`${card} .cd-word`), c.at - 0.05, 0.62, R);
        R.fromTo(q(`${card} .cd-desc`), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, c.at + 0.35);
        const end = c.at + 1.3 + CARD_HOLD;
        draw(path(`${card} .ink`), end - 0.1, 0.4, R, { erase: true, ease: 'power2.in', tip: false });
        R.to(q(`${card} .cd-type`), { autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, end);
        R.set(q(card), { autoAlpha: 0 }, end + 0.45);
        // the journey rail in the letterbox
        R.to(q('.rail-fill'), { scaleX: (i * 2 + 1) / 8, duration: 1.1, ease: 'expo.inOut' }, c.at);
        R.to(q(`.rail-dot-${i}`), { backgroundColor: INK.amber, scale: 1.5, duration: 0.5 }, c.at + 0.3);
        R.to(q(`.rail-lbl-${i}`), { color: INK.paper, duration: 0.5 }, c.at + 0.3);
        if (i > 0) R.to(q(`.rail-dot-${i - 1}`), { scale: 1, duration: 0.4 }, c.at + 0.3);
      });
      R.fromTo(q('.lb-content'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, CH[0].at - 0.3);

      // ── Act 2: a route jams; a goal finds its way ──
      show('.a2', 17.1);
      draw(path('.a2-div'), 17.1, 0.8, S, { tip: false, ease: 'power2.inOut' });
      inkIn(q('.a2-auto-head'), 17.2);
      paths('.a2-auto').forEach((p, k) => draw(p, [18.0, 18.625, 19.25][k], 0.3, S, { ease: 'power3.inOut', tip: false }));
      S.fromTo(q('.a2-unknown'), { autoAlpha: 0, y: -160 }, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power3.in' }, 19.42);
      S.to(q('.a2-auto'), { stroke: INK.slate, duration: 0.2 }, 19.8);
      S.to(q('.a2-unknown > div'), { x: 6, duration: 0.05, repeat: 7, yoyo: true, ease: 'none' }, 19.8);
      reveal('.a2-cap-a', 20.1, 0.08);
      inkIn(q('.a2-agent-head'), 20.3);
      inkIn(q('.a2-block'), 20.3);
      const agentPath = path('.a2-agent');
      if (agentPath) L.COMP_AT.forEach((f, i) => {
        const pt = agentPath.getPointAtLength(f * len(agentPath));
        gsap.set(q(`.a2-node-${i}`), { attr: { cx: pt.x, cy: pt.y } });
        gsap.set(q(`.a2-comp-${i}`), { left: pt.x, top: pt.y + (i % 2 ? 50 : -50), xPercent: -50, yPercent: -50 });
      });
      draw(agentPath, 20.75, 1.65);
      L.COMP_AT.forEach((f, i) => {
        S.fromTo(q(`.a2-node-${i}`), { attr: { r: 0 } }, { attr: { r: 6 }, duration: 0.4, ease: 'back.out(3)' }, 20.75 + f * 1.65);
        inkIn(q(`.a2-comp-${i}`), 20.8 + f * 1.65);
      });
      paths('.a2-ring').forEach((p, k) => draw(p, 22.4 + k * 0.08, 0.5, S, { tip: false, ease: 'power2.out' }));
      S.fromTo(q('.a2-bull'), { attr: { r: 0 } }, { attr: { r: 12 }, duration: 0.5, ease: 'back.out(3)' }, 22.4);
      reveal('.a2-cap-b', 23.9, 0.08);
      S.to(q('.a2-ring'), { stroke: INK.amber, duration: 0.3, yoyo: true, repeat: 1, stagger: 0.1 }, 24.2);
      out('.a2', 26.5);

      // ── Act 3: the learning cycle, then a live request ──
      show('.a3', 28.9);
      const ring = path('.a3-ring');
      draw(ring, 28.9, 1.0, S, { ease: 'power1.inOut' });
      L.RING_NODES.forEach((_, i) => {
        const { xp, yp } = ringAnchor(i);
        gsap.set(q(`.a3-agent-${i}`), { xPercent: xp, yPercent: yp });
        S.fromTo(q(`.a3-node-${i}`), { attr: { r: 0 } }, { attr: { r: 8 }, duration: 0.4, ease: 'back.out(3)' }, 29.74 + i * 0.118);
        inkIn(q(`.a3-agent-${i}`), 29.78 + i * 0.118);
        S.to(q(`.a3-node-${i}`), { fill: INK.amber, stroke: INK.amber, duration: 0.2 }, 30.9 + i * 0.13);
      });
      // a second lap: the pen tip runs the cycle and lights each agent
      draw(ring, 30.9, 1.17, S, { from: 0, to: 1, onP: () => seg(ring!, 0, 1) });
      reveal('.a3-cap-a', 30.3, 0.07);
      S.to(q('.a3-cycle'), { autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, 32.1);
      S.fromTo(q('.a3-demo'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.0 }, 32.6);
      const typed = { n: 0 };
      const typedEl = q('.a3-typed')[0];
      S.to(typed, { n: DEMO_REQUEST.length, duration: 1.5, ease: 'none', onUpdate: () => { if (typedEl) typedEl.textContent = DEMO_REQUEST.slice(0, Math.round(typed.n)); } }, 33.1);
      S.fromTo(q('.a3-bot'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 34.85);
      S.fromTo(q('.a3-step'), { autoAlpha: 0, x: 22 }, { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.4 }, 35.35);
      S.fromTo(q('.a3-plan'), { scaleY: 0 }, { scaleY: 1, duration: W(36.6) - W(35.35), ease: 'none' }, 35.35);
      S.fromTo(q('.a3-wait'), { autoAlpha: 0, x: 22 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 36.55);
      inkIn(q('.a3-approve'), 36.95);
      S.fromTo(q('.a3-cursor'), { autoAlpha: 0, x: 220, y: 150 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.7, ease: 'power3.inOut' }, 37.05);
      S.to(q('.a3-approve-btn'), { scale: 0.94, duration: 0.07, yoyo: true, repeat: 1 }, 37.73);
      S.to(q('.a3-approve-btn'), { backgroundColor: INK.amber, borderColor: INK.amber, color: INK.navy, duration: 0.25 }, 37.8);
      S.set(q('.a3-approve-a'), { display: 'none' }, 37.8);
      S.set(q('.a3-approve-b'), { display: 'inline-flex' }, 37.8);
      draw(path('.a3-check'), 37.83, 0.3, S, { tip: false, ease: 'power2.out' });
      S.to(q('.a3-wait-icon'), { color: INK.amber, duration: 0.3 }, 37.8);
      reveal('.a3-cap-b', W(37.8) + 0.35, 0.09, R);
      out('.a3', CH_AT[2] - 0.45, 0.55, R);

      // ── Act 4: trust, layer by layer, then a fence ──
      show('.a4', 42.0);
      for (let k = 0; k < 5; k++) {
        const i = 4 - k;
        draw(path(`.a4-line-${i}`), 42.15 + k * 0.335, 0.3, S, { tip: false, ease: 'power2.out' });
        inkIn(q(`.a4-layer-${i}`), 42.22 + k * 0.335);
      }
      draw(path('.a4-fence'), 44.55, 0.9, S, { ease: 'power1.inOut' });
      paths('.a4-tie').forEach((p, k) => draw(p, 44.75 + k * 0.3, 0.2, S, { tip: false }));
      inkIn(q('.a4-chip-a'), 44.8);
      inkIn(q('.a4-chip-b'), 45.1);
      reveal('.a4-cap', 45.6, 0.1);
      for (let i = 0; i < 5; i++) S.to(q(`.a4-line-${i}`), { stroke: INK.amber, duration: 0.25, yoyo: true, repeat: 1 }, 46.4 + i * 0.12);
      out('.a4', 49.4);

      // ── Act 5: the road, and what it buys ──
      show('.a5', 51.7);
      inkIn(q('.a5-head'), 51.75);
      draw(path('.a5-road'), 51.7, 1.8);
      q('.a5-phase').forEach((s, i) => {
        S.fromTo(q(`.a5-node-${i}`), { attr: { r: 0 } }, { attr: { r: 9 }, duration: 0.4, ease: 'back.out(3)' }, 52.25 + i * 0.3);
        inkIn(s, 52.3 + i * 0.3);
      });
      inkIn(q('.a5-metric'), 54.3);
      draw(path('.a5-strike'), 55.1, 0.3, S, { tip: false, ease: 'power3.out' });
      S.to(q('.a5-old'), { opacity: 0.4, duration: 0.3 }, 55.2);
      wipe(q('.a5-new'), 55.4, 0.5);
      reveal('.a5-cap', 56.5, W(57.12) - W(56.5));
      out('.a5', 59.0, 0.5);
      S.to(q('.lb-content'), { autoAlpha: 0, duration: 0.6 }, 59.3);

      // ── Finale: the line writes the title and becomes its underline ──
      // The geometry depends on the real title, measured when the trailer starts.
      show('.fin', 59.4);
      const finA = path('.fin-a');
      const finB = path('.fin-b');
      let geo: TitleGeo | null = null;
      const clipTo = (i: number, x: number) => {
        const r = q(`.fin-clip-${i}`)[0];
        const ln = geo?.lines[i];
        if (!r || !ln) return;
        const left = Math.min(ln.x1 + 40, Math.max(ln.x0 - 40, x));
        r.setAttribute('x', String(left));
        r.setAttribute('width', String(Math.max(0, ln.x1 + 40 - left)));
      };
      // fractions of finA where the pen is under each word (set with the geometry)
      const marks = { w0: [0.2, 0.45], w1: [0.72, 1] };
      const buildFinale = (g: TitleGeo) => {
        geo = g;
        const [l0, l1] = g.lines;
        const y0 = l0.base + l0.font * 0.12;
        const half = g.uh / 2;
        const uR = g.ux1 - half;
        const uL = g.ux0 + half;
        q('.fin-word').forEach((t, i) => {
          const ln = g.lines[i];
          t.setAttribute('x', String(ln.cx));
          t.setAttribute('y', String(ln.base));
          t.setAttribute('font-size', String(ln.font));
          t.setAttribute('letter-spacing', String(ln.ls));
          clipTo(i, ln.x1 + 40);
          const r = q(`.fin-clip-${i}`)[0];
          r?.setAttribute('y', String(ln.base - ln.font * 1.1));
          r?.setAttribute('height', String(ln.font * 1.5));
        });
        const entry: Pt[] = [[2010, y0 - 120], [l0.x1 + 220, y0 - 30], [l0.x1 + 30, y0]];
        const under0: Pt[] = [[l0.cx, y0 + 4], [l0.x0 - 30, y0]];
        // a lasso around the second word, turning back into its underline
        const loop: Pt[] = [[l0.x0 - 110, (y0 + g.uy) / 2], [l1.x0 - 30, g.uy + 95], [l1.cx, g.uy + 115], [l1.x1 + 70, g.uy + 85], [l1.x1 + 115, g.uy + 35], [l1.x1 + 60, g.uy]];
        const under1: Pt[] = [[(l1.x1 + uR) / 2, g.uy], [uR, g.uy]];
        const pts = [...entry, ...under0, ...loop, ...under1];
        finA?.setAttribute('d', pathFrom(pts[0], spline(pts)));
        finB?.setAttribute('d', `M ${uR} ${g.uy} H ${uL}`);
        q('.fin-ink').forEach((p) => p.setAttribute('stroke-width', String(g.uh)));
        if (finA) {
          lens.delete(finA);
          // where the pen passes under each word, as fractions of the path
          const l = len(finA);
          const at = (x: number, from: number) => {
            for (let f = from; f <= 1; f += 0.002) if (finA.getPointAtLength(f * l).x <= x) return f;
            return 1;
          };
          marks.w0 = [at(l0.x1, 0), at(l0.x0 - 30, 0)];
          // the final pass under the second word: walk back from the end
          let f1 = 1;
          while (f1 > marks.w0[1] && finA.getPointAtLength(f1 * l).x < l1.x1) f1 -= 0.002;
          marks.w1 = [f1, 1];
          seg(finA, 0, 0);
        }
        if (finB) { lens.delete(finB); seg(finB, 0, 0); }
      };
      // story times: enter 59.4-60.0, under the first word 60.0-61.2, the
      // loop 61.3-62.4, under the second word to the underline 62.4-63.5,
      // the underline itself 63.5-63.75 (the impact).
      const finStroke = { f: 0 };
      const finTip = q('.fin .tip')[0];
      const finUpdate = () => {
        if (!finA || !geo) return;
        seg(finA, 0, finStroke.f);
        const pt = finA.getPointAtLength(finStroke.f * len(finA));
        finTip?.setAttribute('cx', String(pt.x));
        finTip?.setAttribute('cy', String(pt.y));
        clipTo(0, finStroke.f >= marks.w0[0] ? pt.x : geo.lines[0].x1 + 40);
        // the second word is revealed ahead of the pen, which stops at the underline
        const l1 = geo.lines[1];
        const span = Math.max(1, l1.x1 - (geo.ux1 - geo.uh / 2));
        clipTo(1, finStroke.f >= marks.w1[0] ? l1.x1 - ((l1.x1 - pt.x) / span) * (l1.x1 - l1.x0 + 40) : l1.x1 + 40);
        if (finStroke.f >= marks.w0[1]) clipTo(0, -1e4);
      };
      S.set(finTip, { autoAlpha: 1 }, 59.4);
      const finTo = (t: number, d: number, to: () => number, ease: string) =>
        tl.to(finStroke, { f: () => to(), duration: W(t + d) - W(t), ease, immediateRender: false, onUpdate: finUpdate }, W(t));
      finTo(59.4, 0.6, () => marks.w0[0], 'power1.in');
      finTo(60.0, 1.2, () => marks.w0[1], 'none');
      finTo(61.3, 1.1, () => marks.w1[0], 'power1.inOut');
      finTo(62.4, 1.1, () => 1, 'power1.in');
      draw(finB, 63.5, 0.25, S, { ease: 'power2.out' });
      S.set(finTip, { autoAlpha: 0 }, 63.5);
      // the impact: the title slide is revealed under the drawn words
      S.call(() => onImpact(), [], 63.75);
      draw(finA, 63.75, 0.45, S, { erase: true, ease: 'power2.inOut', tip: false });
      S.to(q('.lb-top, .lb-bot'), { scaleY: 0, duration: 0.9, ease: 'expo.inOut' }, 63.75);
      S.to(q('.bg'), { autoAlpha: 0, duration: 0.8, ease: 'power2.inOut' }, 63.75);
      S.to(q('.fin-word'), { autoAlpha: 0, duration: 0.6, ease: 'power1.inOut' }, 64.9);
      S.call(() => { naturalEnd = true; finish(); }, [], 65.85);

      function finish() {
        if (doneRef.current) return;
        doneRef.current = true;
        gsap.ticker.remove(tick);
        tl.kill();
        // invisible and inert right away; the parent unmounts it in idle time
        gsap.set(el, { pointerEvents: 'none', autoAlpha: 0 });
        onDone();
      }
      const tryAudio = () => {
        if (playback || capturing || !audioBuf || !started || doneRef.current) return;
        const t = clockNow();
        if (t > W(63)) return;
        playback = sound.playBuffer(audioBuf, t);
      };
      const tick = () => {
        if (!started || doneRef.current || capturing) return;
        tl.time(Math.min(clockNow(), tl.duration()));
      };
      const begin = () => {
        if (started || doneRef.current || !prepared || !audioSettled) return;
        buildFinale(measureTitle(el));
        started = true;
        perfStart = performance.now();
        tryAudio();
        gsap.ticker.add(tick);
      };
      prepareTrailer().then(() => { prepared = true; begin(); });
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
          tl,
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
    return () => {
      window.clearTimeout(audioWait);
      offSound();
      window.removeEventListener('keydown', onKey);
      // a natural ending lets the score's tail ring under the title slide
      if (!naturalEnd) playback?.stop(0.6);
      ctx.revert();
    };
    // Mount-once sequence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const credit: React.CSSProperties = { ...T.mono, fontSize: 16, color: 'rgba(243,238,228,0.55)', letterSpacing: '0.38em' };
  const tip = <circle className="tip" cx="0" cy="0" r="7" fill={INK.amber} />;

  return (
    // a fixed 1920x1080 design canvas, scaled to the stage: identical
    // proportions on every screen, from 4K to a phone
    <div ref={root} dir="rtl" style={{ position: 'absolute', left: 0, top: 0, width: '1920px', height: '1080px', transformOrigin: '0 0', containerType: 'size', zIndex: 60, overflow: 'hidden' }}>
      <div className="bg" style={{ position: 'absolute', inset: 0, background: INK.navy }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(243,238,228,0.07) 1.2px, transparent 1.6px)', backgroundSize: '48px 48px', backgroundPosition: '24px 24px' }} />
      </div>

      {/* ── Act 0 ── */}
      <div className="a0" style={layer}>
        <svg viewBox="0 0 1920 1080" style={svgFull}>
          <path className="ink a0-path" d={L.A0_PATH} {...ink} />
          <circle className="a0-dot" cx={L.A0_DOT[0]} cy={L.A0_DOT[1]} r="0" fill={INK.amber} />
          {tip}
        </svg>
        <div className="c" style={{ ...at(960, 690), width: 1650, textAlign: 'center' }}>
          <div style={{ ...T.hero, fontWeight: 300, fontSize: 62, color: 'rgba(243,238,228,0.9)' }}>
            <Reveal cls="a0-line" text="כל יום ב-L&D, ידע, אנשים ומערכות מחוברים" />
          </div>
          <div style={{ ...T.hero, fontWeight: 900, fontSize: 132, marginTop: 18, color: INK.amber }}>
            <span className="a0-hit" style={{ display: 'inline-block', clipPath: 'inset(-20% 0% -20% 100%)' }}>ידנית.</span>
          </div>
        </div>
      </div>

      {/* ── Act 1 ── */}
      <div className="a1" style={layer}>
        <div className="a1-scene" style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1920 1080" style={svgFull}>
            <path className="ink a1-scr-a" d={L.SCRIBBLE_A} {...ink} strokeWidth={2.4} />
            <path className="ink a1-scr-b" d={L.SCRIBBLE_B} {...ink} stroke="rgba(243,238,228,0.5)" strokeWidth={1.6} />
            {tip}
          </svg>
          <div className="a1-hub c" style={at(L.HUB[0], L.HUB[1])}>
            <div style={{ padding: '0.36em 1em', borderRadius: '100px', background: INK.navy, border: `1px solid ${INK.amber}`, ...T.label, fontFamily: GROTESK, color: INK.amber }}>L&amp;D</div>
          </div>
          {SYSTEMS.map((s, i) => (
            <Tag key={s.label} cls="a1-sys" icon={s.icon} text={s.label} x={L.TOOL_POS[i][0]} y={L.TOOL_POS[i][1]} font={GROTESK} />
          ))}
          <div className="a1-clock c" style={{ ...at(1500, 250), display: 'flex', alignItems: 'center', gap: '0.4em', fontFamily: GROTESK, direction: 'ltr', fontSize: 50, color: INK.paper, fontWeight: 700, letterSpacing: '0.04em' }}>
            <Clock size="0.75em" strokeWidth={2} /><span className="a1-clock-t">08:00</span>
          </div>
          <div className="c" style={{ ...at(1500, 540), width: 480, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {STATS.map((st) => (
              <div key={st.label} className="a1-stat" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                padding: '16px 28px', borderRadius: 14, background: INK.navy, border: `1px solid ${HAIR}`,
              }}>
                <span style={{ ...T.label, fontWeight: 500, color: 'rgba(243,238,228,0.85)' }}>{st.label}</span>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: '0.3em', direction: 'ltr' }}>
                  <span className="n" style={{ fontFamily: GROTESK, fontWeight: 700, fontSize: 64, lineHeight: 1, color: INK.amber, fontVariantNumeric: 'tabular-nums' }}>0</span>
                  <span style={{ fontFamily: HEEBO, fontWeight: 600, fontSize: 22, color: INK.paper }}>{st.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="c" style={{ ...at(960, 913), width: 1700, textAlign: 'center', ...T.hero }}>
          <Reveal cls="a1-cap" text="מה אם כל זה היה קורה אוטומטית?" />
        </div>
      </div>

      {/* ── Chapter cards (same language as the deck's chapter cards) ── */}
      {CH.map((c, i) => (
        <div key={c.num} className={`card-${i}`} style={{ ...layer, zIndex: 20 }}>
          <svg viewBox="0 0 1920 1080" style={svgFull}>
            <path className="ink" d={writeNumber(c.num, 960, 330, 1.05)} {...ink} stroke={INK.paper} strokeWidth={5} />
            {tip}
          </svg>
          <div className="cd-type" style={{ position: 'absolute', inset: 0 }}>
            <div className="cd-word" style={{
              position: 'absolute', left: 0, right: 0, top: 529, textAlign: 'center',
              fontFamily: HEEBO, fontWeight: 900, fontSize: 182, lineHeight: 1.05, color: INK.paper, letterSpacing: '-0.02em',
              clipPath: 'inset(-20% 0% -20% 100%)',
            }}>{c.label}</div>
            <div className="cd-desc" style={{ position: 'absolute', left: 0, right: 0, top: 756, textAlign: 'center', fontFamily: HEEBO, fontWeight: 400, fontSize: 36, color: INK.slate }}>{c.desc}</div>
          </div>
        </div>
      ))}

      {/* ── Act 2: automation vs agent ── */}
      <div className="a2" style={layer}>
        <svg viewBox="0 0 1920 1080" style={svgFull}>
          <path className="ink a2-div" d="M 960 300 V 820" {...ink} stroke={HAIR} strokeWidth={1.5} />
          {L.AUTO_SEGS.map((d) => <path key={d} className="ink a2-auto" d={d} {...ink} strokeLinecap="square" strokeLinejoin="miter" />)}
          <path className="ink a2-agent" d={L.AGENT_PATH} {...ink} />
          {COMPONENTS.map((_, i) => <circle key={i} className={`a2-node-${i}`} cx="0" cy="0" r="0" fill={INK.paper} />)}
          {[22, 40, 58].map((r, k) => (
            <circle key={r} className="ink a2-ring" cx={L.GOAL[0]} cy={L.GOAL[1]} r={r} {...ink} strokeWidth={k ? 2 : 3} transform={`rotate(180 ${L.GOAL[0]} ${L.GOAL[1]})`} />
          ))}
          <circle className="a2-bull" cx={L.GOAL[0]} cy={L.GOAL[1]} r="0" fill={INK.amber} />
          {tip}
        </svg>
        <div className="a2-auto-head c" style={{ ...at(1430, 200), textAlign: 'center' }}>
          <div style={{ ...T.heading, color: INK.slate }}>אוטומציה</div>
          <div style={{ ...T.mono, marginTop: 14 }}>IF → THEN</div>
        </div>
        {[['a2-unknown', L.AUTO_BLOCK, INK.paper], ['a2-block', L.AGENT_BLOCK, INK.slate]].map(([cls, p, col]) => (
          <div key={cls as string} className={`${cls} c`} style={at((p as Pt)[0], (p as Pt)[1])}>
            <div style={{ width: 92, height: 92, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: INK.navy, border: `2px solid ${col}`, color: col as string, fontFamily: GROTESK, fontWeight: 700, fontSize: 50 }}>?</div>
          </div>
        ))}
        <div className="a2-agent-head c" style={{ ...at(490, 200), textAlign: 'center' }}>
          <div style={{ ...T.heading, color: INK.paper }}>אייג׳נט</div>
          <div style={{ ...T.mono, color: INK.amber, marginTop: 14 }}>THINK → ACT</div>
        </div>
        {COMPONENTS.map((c, i) => (
          <div key={c.label} className={`a2-comp a2-comp-${i}`} style={{ ...at(0, 0), visibility: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em', whiteSpace: 'nowrap', ...T.label, fontSize: 21 }}>
              <span style={{ display: 'inline-flex', color: INK.slate }}><c.icon size="0.95em" strokeWidth={2} /></span>{c.label}
            </div>
          </div>
        ))}
        <div className="c" style={{ ...at(1430, 913), width: 840, textAlign: 'center', ...T.hero, fontSize: 46, whiteSpace: 'nowrap' }}>
          <Reveal cls="a2-cap-a" text="אוטומציה מבצעת מסלול." />
        </div>
        <div className="c" style={{ ...at(490, 913), width: 840, textAlign: 'center', ...T.hero, fontSize: 46, whiteSpace: 'nowrap' }}>
          <Reveal cls="a2-cap-b" text="אייג׳נט מנהל מטרה." />
        </div>
      </div>

      {/* ── Act 3: the learning cycle + live demo ── */}
      <div className="a3" style={layer}>
        <div className="a3-cycle" style={{ position: 'absolute', inset: 0 }}>
          <svg viewBox="0 0 1920 1080" style={svgFull}>
            <path className="ink a3-ring" d={L.RING_PATH} {...ink} strokeWidth={2.5} />
            {L.RING_NODES.map(([x, y], i) => <circle key={i} className={`a3-node-${i}`} cx={x} cy={y} r="0" fill={INK.navy} stroke={INK.paper} strokeWidth={2.5} />)}
            {tip}
          </svg>
          {AGENTS.map((a, i) => {
            const ang = -Math.PI / 2 + (i / 9) * Math.PI * 2;
            const cx = Math.cos(ang);
            const sy = Math.sin(ang);
            const x = L.RING_C[0] + cx * (L.RING_R + 30);
            const y = L.RING_C[1] + sy * (L.RING_R + 30);
            return (
              <div key={a.label} className={`a3-agent-${i}`} style={{ ...at(x, y), visibility: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4em', whiteSpace: 'nowrap', ...T.label, fontSize: 22 }}>
                  <span style={{ display: 'inline-flex', color: INK.slate }}><a.icon size="0.95em" strokeWidth={2} /></span>{a.label}
                </div>
              </div>
            );
          })}
          <div className="c" style={{ ...at(960, 913), width: 1700, textAlign: 'center', ...T.hero }}>
            <Reveal cls="a3-cap-a" text="תשעה אייג׳נטים לאורך מחזור הלמידה" />
          </div>
        </div>
        <div className="a3-demo c" style={{ ...at(960, 470), width: 900, visibility: 'hidden' }}>
          <SlackWindow channel="learning-requests">
            <SlackMessage initials="רא" name="רוני אברהם" time="09:42" color="#3B4256">
              <span style={{ color: INK.amber, fontWeight: 700, direction: 'ltr', unicodeBidi: 'isolate' }}>@LearnBot</span>{' '}
              <span className="a3-typed" />
            </SlackMessage>
            <div className="a3-bot">
              <SlackMessage initials="LB" name="LearnBot" time="09:42" color="#7A5A1E" isBot>
                <div style={{ marginBottom: '0.4rem' }}>קיבלתי. מכין מסלול למידה לצוות:</div>
                <div style={{ position: 'relative', paddingRight: 28 }}>
                  {/* the plan, drawn as a path: one line through its steps */}
                  <div className="a3-plan" style={{ position: 'absolute', right: 6, top: '0.8em', bottom: '0.8em', width: 2, background: INK.amber, transformOrigin: 'top center' }} />
                  {DEMO_STEPS.map((s) => (
                    <div key={s} className="a3-step" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', right: -28, width: 14, height: 14, borderRadius: '50%', background: '#1A1D21', border: `2px solid ${INK.amber}` }} />
                      <span>{s}</span>
                    </div>
                  ))}
                  <div className="a3-wait" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                    <span className="a3-wait-icon" style={{ position: 'absolute', right: -32, display: 'inline-flex', color: INK.slate, background: '#1A1D21' }}><Clock size="22px" /></span>
                    <span>פרסום ורישום 12 אנשים: <strong style={{ color: INK.paper }}>ממתין לאישורך</strong></span>
                  </div>
                </div>
              </SlackMessage>
            </div>
          </SlackWindow>
          <div className="a3-approve" style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
            <div className="a3-approve-btn" style={{
              position: 'relative', padding: '12px 56px', borderRadius: 12,
              background: INK.navy, border: `1.5px solid ${INK.paper}`, color: INK.paper,
              fontFamily: HEEBO, fontWeight: 800, fontSize: 30,
            }}>
              <span className="a3-approve-a">אישור וביצוע</span>
              <span className="a3-approve-b" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
                אושר
                <svg width="30" height="30" viewBox="0 0 26 26" style={{ overflow: 'visible' }}>
                  <path className="ink a3-check" d="M 4 13.5 L 10.5 20 L 22 6" fill="none" stroke={INK.navy} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="a3-cursor" style={{ position: 'absolute', left: '84%', top: '58%', display: 'inline-flex', color: INK.paper, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.6))', opacity: 0 }}>
                <MousePointer2 size={36} fill={INK.paper} />
              </span>
            </div>
          </div>
        </div>
        <div className="c" style={{ ...at(960, 913), width: 1700, textAlign: 'center', ...T.hero }}>
          <Reveal cls="a3-cap-b" text="האייג׳נט מכין. ההחלטה שלנו." />
        </div>
      </div>

      {/* ── Act 4: trust in layers ── */}
      <div className="a4" style={layer}>
        <svg viewBox="0 0 1920 1080" style={svgFull}>
          {L.LAYER_Y.map((y, i) => <path key={y} className={`ink a4-line-${i}`} d={`M ${L.LAYER_X[0]} ${y} H ${L.LAYER_X[1]}`} {...ink} strokeWidth={2.5} />)}
          <path className="ink a4-fence" d={L.FENCE} {...ink} stroke={INK.amber} strokeWidth={2.5} />
          {L.FENCE_TIES.map((d) => <path key={d} className="ink a4-tie" d={d} {...ink} stroke={INK.amber} strokeWidth={2} />)}
          {tip}
        </svg>
        {STACK.map((s, i) => (
          <Tag key={s.label} cls={`a4-layer-${i}`} icon={s.icon} text={s.label} x={960} y={L.LAYER_Y[i]} />
        ))}
        <Tag cls="a4-chip-a" icon={Shield} text="ממשל ובקרה" accent x={1651} y={490} />
        <Tag cls="a4-chip-b" icon={KeyRound} text="הרשאות מינימליות" accent x={269} y={490} />
        <div className="c" style={{ ...at(960, 913), width: 1700, textAlign: 'center', ...T.hero }}>
          <Reveal cls="a4-cap" text="אמון נבנה בשכבות." />
        </div>
      </div>

      {/* ── Act 5: the road ── */}
      <div className="a5" style={layer}>
        <svg viewBox="0 0 1920 1080" style={svgFull}>
          <path className="ink a5-road" d={L.ROAD_PATH} {...ink} />
          {L.ROAD_X.map((x, i) => <circle key={x} className={`a5-node-${i}`} cx={x} cy={L.ROAD_Y} r="0" fill={INK.navy} stroke={INK.amber} strokeWidth={3} />)}
          {tip}
        </svg>
        <div className="a5-head c" style={{ ...at(960, 227), ...T.heading, color: INK.paper, whiteSpace: 'nowrap' }}>מפת דרכים ל-90 יום</div>
        {ROADMAP.map((r, i) => (
          <div key={r.phase} className="a5-phase c" style={{ ...at(L.ROAD_X[i], L.ROAD_Y + 74), textAlign: 'center', whiteSpace: 'nowrap' }}>
            <div style={{ ...T.label, fontWeight: 500, color: INK.slate, fontSize: 20 }}>{r.weeks}</div>
            <div style={{ fontFamily: HEEBO, fontWeight: 800, fontSize: 38, color: INK.paper }}>{r.phase}</div>
          </div>
        ))}
        <div className="a5-metric c" style={{ ...at(960, 713), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ ...T.label, color: INK.slate, fontWeight: 500 }}>מבקשה ועד מסלול למידה מוכן</div>
          {/* reads right to left: the old time, then the new one */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 46, direction: 'rtl' }}>
            <span className="a5-old" style={{ position: 'relative', fontFamily: HEEBO, fontWeight: 700, fontSize: 70, color: INK.paper, whiteSpace: 'nowrap' }}>
              6 שבועות
              <svg viewBox="0 0 300 40" preserveAspectRatio="none" style={{ position: 'absolute', left: '-6%', width: '112%', top: '42%', height: 30, overflow: 'visible' }}>
                <path className="ink a5-strike" d="M 300 22 C 220 14 160 28 90 18 C 50 13 20 22 0 18" fill="none" stroke={INK.amber} strokeWidth={6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
            <span style={{ fontSize: 50, color: INK.slate }}>←</span>
            <span className="a5-new" style={{ fontFamily: HEEBO, fontWeight: 900, fontSize: 124, lineHeight: 1, color: INK.amber, whiteSpace: 'nowrap', clipPath: 'inset(-20% 0% -20% 100%)' }}>יומיים</span>
          </div>
        </div>
        <div className="c" style={{ ...at(960, 913), width: 1700, textAlign: 'center', ...T.hero }}>
          <Reveal cls="a5-cap" text="נתחיל קטן. נמדוד. נרחיב." />
        </div>
      </div>

      {/* ── Finale: the title, written by the line ── */}
      <div className="fin" style={{ ...layer, zIndex: 30 }}>
        <svg viewBox="0 0 1920 1080" style={svgFull}>
          <defs>
            {[0, 1].map((i) => <clipPath key={i} id={`fin-clip-${i}`}><rect className={`fin-clip-${i}`} x="0" y="0" width="0" height="0" /></clipPath>)}
          </defs>
          {['מאוטומציה', 'לאייג׳נט'].map((w, i) => (
            <text key={w} className="fin-word" clipPath={`url(#fin-clip-${i})`} textAnchor="middle" direction="rtl"
              fontFamily={TITLE_FONT} fontWeight={900} fill={i ? INK.paper : INK.slate}>{w}</text>
          ))}
          <path className="ink fin-ink fin-a" d="M 0 0" fill="none" stroke={INK.paper} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
          <path className="ink fin-ink fin-b" d="M 0 0" fill="none" stroke={INK.amber} strokeWidth={4} strokeLinecap="round" />
          {tip}
        </svg>
      </div>

      {/* ── Letterbox bars (top carries the journey rail) ── */}
      <div className="lb-top" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 119, background: '#04060D', zIndex: 40, transformOrigin: 'top center' }}>
        <div className="lb-content" style={{ position: 'absolute', inset: 0, opacity: 0 }}>
          <div style={{ position: 'absolute', right: 62, top: '50%', transform: 'translateY(-50%)', ...credit, direction: 'rtl', letterSpacing: 0, fontFamily: HEEBO, fontWeight: 500 }}>גלעד ברונשטיין</div>
          <div style={{ position: 'absolute', left: 62, top: '50%', transform: 'translateY(-50%)', ...credit }}>HR IMPACT 26</div>
          <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%, -50%)', width: 768, height: 2 }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(243,238,228,0.14)' }} />
            <div className="rail-fill" style={{ position: 'absolute', inset: 0, transformOrigin: 'right center', transform: 'scaleX(0)', background: INK.amber }} />
            {CH.map((c, i) => (
              <div key={c.num} style={{ position: 'absolute', right: `${12.5 + i * 25}%`, top: '50%', width: 0, height: 0 }}>
                <div className={`rail-dot-${i}`} style={{ position: 'absolute', width: 12, height: 12, marginLeft: -6, marginTop: -6, borderRadius: '50%', background: 'rgba(243,238,228,0.3)' }} />
                <div className={`rail-lbl-${i}`} style={{ position: 'absolute', top: 14, left: 0, transform: 'translateX(-50%)', whiteSpace: 'nowrap', fontFamily: HEEBO, fontWeight: 600, fontSize: 18, color: 'rgba(243,238,228,0.4)' }}>
                  {c.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lb-bot" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 119, background: '#04060D', zIndex: 40, transformOrigin: 'bottom center' }} />
    </div>
  );
});
