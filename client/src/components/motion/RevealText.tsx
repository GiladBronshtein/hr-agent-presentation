/**
 * RevealText - word-by-word title reveal (clip mask + slide up + blur to sharp).
 *
 * Bidi safety: every animated word is an inline-block, and the bidi algorithm
 * treats an inline-block as a neutral object. Inside an RTL title that would
 * reorder Latin and number runs ("Agent Canvas" would read "Canvas Agent").
 * So runs that resolve LTR (Latin words, numbers that follow Latin, and the
 * punctuation between them) are wrapped together in one dir="ltr" isolate,
 * which keeps their internal order; Hebrew words are split one by one.
 * Anything ambiguous (a mixed Hebrew/Latin word touching a Latin run, edge
 * punctuation on a Latin word, Latin spread over several nested elements)
 * falls back to a whole-title reveal so text order never changes.
 */
import {
  Fragment,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';
import { useReducedMotion } from './useReducedMotion';
import './motion.css';

type Dir = 'L' | 'R';
type Kind = 'R' | 'L' | 'N' | 'M' | 'P';

const HEB = /[֐-׿יִ-ﭏ]/;
const LAT = /[A-Za-zÀ-ɏ]/;
const DIG = /[0-9]/;
const ALNUM = /[A-Za-zÀ-ɏ0-9]/;

function kindOf(word: string): Kind {
  const h = HEB.test(word);
  const l = LAT.test(word);
  if (h && l) return 'M';
  if (h) return 'R';
  if (l) return 'L';
  if (DIG.test(word)) return 'N';
  return 'P';
}

function edgeStrong(word: string, fromEnd: boolean): Dir {
  const chars = Array.from(word);
  if (fromEnd) chars.reverse();
  for (const ch of chars) {
    if (HEB.test(ch)) return 'R';
    if (LAT.test(ch)) return 'L';
  }
  return 'R';
}

interface WordInfo {
  kind: Kind;
  /** Resolved direction at the word's start / end edge */
  first: Dir;
  last: Dir;
  /** Belongs to an LTR run */
  ltr: boolean;
}

/** Resolves each word roughly the way the Unicode bidi algorithm would in an RTL paragraph. */
function resolveWords(words: string[]): { info: WordInfo[]; safe: boolean } {
  const info: WordInfo[] = words.map((w) => ({ kind: kindOf(w), first: 'R', last: 'R', ltr: false }));

  // Pass 1: strong words and numbers (W7: a number after Latin joins the Latin run)
  let prevStrong: Dir = 'R';
  info.forEach((it, i) => {
    if (it.kind === 'R') { it.first = it.last = 'R'; prevStrong = 'R'; }
    else if (it.kind === 'L') { it.first = it.last = 'L'; it.ltr = true; prevStrong = 'L'; }
    else if (it.kind === 'M') {
      it.first = edgeStrong(words[i], false);
      it.last = edgeStrong(words[i], true);
      prevStrong = it.last;
    } else if (it.kind === 'N') {
      it.ltr = prevStrong === 'L';
      it.first = it.last = it.ltr ? 'L' : 'R';
    }
  });

  // Pass 2: punctuation-only words take L only when both sides resolve L (N1)
  info.forEach((it, i) => {
    if (it.kind !== 'P') return;
    let before: Dir = 'R';
    for (let j = i - 1; j >= 0; j--) if (info[j].kind !== 'P') { before = info[j].last; break; }
    let after: Dir = 'R';
    for (let j = i + 1; j < info.length; j++) if (info[j].kind !== 'P') { after = info[j].first; break; }
    it.ltr = before === 'L' && after === 'L';
    it.first = it.last = it.ltr ? 'L' : 'R';
  });

  let safe = true;
  for (let i = 0; i < info.length; i++) {
    const it = info[i];
    // A Latin word with edge punctuation would move that punctuation
    if (it.ltr && it.kind !== 'P') {
      const w = words[i];
      if (!ALNUM.test(w[0]) || !ALNUM.test(w[w.length - 1])) safe = false;
    }
    // A mixed word cannot join an LTR run without splitting it
    if (i > 0) {
      const a = info[i - 1];
      if (a.last === 'L' && it.first === 'L' && (a.kind === 'M' || it.kind === 'M')) safe = false;
    }
  }
  return { info, safe };
}

interface Ctx {
  n: number;
  safe: boolean;
  delay: number;
  stagger: number;
  duration: number;
}

function wordNode(text: string, ctx: Ctx, key: string): ReactNode {
  const i = ctx.n++;
  const vars = {
    '--mx-wr-delay': `${ctx.delay + i * ctx.stagger}ms`,
    '--mx-wr-dur': `${ctx.duration}ms`,
  } as CSSProperties;
  return (
    <span key={key} className="mx-wr-mask" style={vars}>
      <span className="mx-wr-word">{text}</span>
    </span>
  );
}

function splitText(text: string, ctx: Ctx, keyBase: string): ReactNode {
  const tokens = text.split(/(\s+)/).filter((t) => t !== '');
  const words = tokens.filter((t) => !/^\s+$/.test(t));
  const { info, safe } = resolveWords(words);
  if (!safe) ctx.safe = false;

  const out: ReactNode[] = [];
  let group: ReactNode[] | null = null;
  let pendingSpace = '';
  let w = 0;

  const closeGroup = () => {
    if (group) {
      out.push(
        <span key={`${keyBase}g${out.length}`} dir="ltr" style={{ unicodeBidi: 'isolate' }}>
          {group}
        </span>,
      );
      group = null;
    }
  };

  tokens.forEach((tok, ti) => {
    if (/^\s+$/.test(tok)) {
      pendingSpace += tok;
      return;
    }
    const it = info[w++];
    const node = wordNode(tok, ctx, `${keyBase}w${ti}`);
    if (it.ltr) {
      if (group) {
        if (pendingSpace) group.push(pendingSpace);
      } else {
        if (pendingSpace) out.push(pendingSpace);
        group = [];
      }
      pendingSpace = '';
      group.push(node);
    } else {
      closeGroup();
      if (pendingSpace) out.push(pendingSpace);
      pendingSpace = '';
      out.push(node);
    }
  });
  closeGroup();
  if (pendingSpace) out.push(pendingSpace);
  return out;
}

function splitNode(node: ReactNode, ctx: Ctx, keyBase: string): ReactNode {
  if (typeof node === 'string' || typeof node === 'number') {
    return splitText(String(node), ctx, keyBase);
  }
  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <Fragment key={`${keyBase}.${i}`}>{splitNode(child as ReactNode, ctx, `${keyBase}.${i}`)}</Fragment>
    ));
  }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    const isHost = typeof el.type === 'string';
    if ((isHost || el.type === Fragment) && el.type !== 'br' && el.props.children != null) {
      return cloneElement(el, undefined, splitNode(el.props.children, ctx, `${keyBase}c`));
    }
  }
  return node;
}

/** Collects every text segment, to detect Latin spread over several nested elements. */
function collectText(node: ReactNode, acc: string[]) {
  if (typeof node === 'string' || typeof node === 'number') { acc.push(String(node)); return; }
  if (Array.isArray(node)) { node.forEach((n) => collectText(n as ReactNode, acc)); return; }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props.children != null) collectText(el.props.children, acc);
  }
}

export interface RevealTextProps {
  children: ReactNode;
  /** Delay before the first word, ms */
  delay?: number;
  /** Delay between words, ms */
  stagger?: number;
  /** Per-word duration, ms */
  duration?: number;
  /** Reveal the whole text as one unit (used for gradient titles) */
  whole?: boolean;
  /** Extra style on the animated unit in whole mode (gradient fill lives here) */
  wholeStyle?: CSSProperties;
}

/**
 * Renders the children with a staggered word reveal. Under reduced motion it
 * returns the children untouched. Place it inside the heading element.
 */
export function RevealText({
  children,
  delay = 120,
  stagger = 50,
  duration = 600,
  whole = false,
  wholeStyle,
}: RevealTextProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return wholeStyle ? <span style={{ display: 'block', ...wholeStyle }}>{children}</span> : <>{children}</>;
  }

  const renderWhole = () => (
    <span
      className="mx-wr-mask mx-wr-block"
      style={{ '--mx-wr-delay': `${delay}ms`, '--mx-wr-dur': `${duration + 100}ms` } as CSSProperties}
    >
      <span className="mx-wr-word mx-wr-block" style={wholeStyle}>{children}</span>
    </span>
  );

  if (whole) return renderWhole();

  const texts: string[] = [];
  collectText(children, texts);
  if (texts.length > 1 && texts.some((t) => LAT.test(t))) return renderWhole();

  const ctx: Ctx = { n: 0, safe: true, delay, stagger, duration };
  const split = splitNode(children, ctx, 'r');
  if (!ctx.safe) return renderWhole();
  return <>{split}</>;
}
