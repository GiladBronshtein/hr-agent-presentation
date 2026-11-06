/**
 * Ahead-of-time preparation for the trailer, so nothing heavy runs while it
 * plays: every particle formation is built in idle slices, and the whole
 * score is rendered offline into one AudioBuffer. Idempotent; started early
 * (on the first slide) and awaited by the trailer itself.
 */
import { sound } from '../../../lib/sound';
import * as F from './formations';
import { buildScore, TRAILER_AUDIO_SECONDS } from './score';

const BUILDERS: Record<string, () => F.Formation> = {
  void: F.fVoid, heart: F.fHeart, chaos: F.fChaos, aa: F.fAutomationAgent, agents: F.fAgents,
  demo: F.fDemo, stack: F.fStack, road: F.fRoad, sphere: F.fSphere, core: F.fCore, word: F.fWord,
};
const ORDER = ['void', 'heart', 'chaos', 'aa', 'agents', 'demo', 'stack', 'road', 'word', 'sphere', 'core'];

const cache = new Map<string, F.Formation>();
let formationsReady: Promise<void> | null = null;
let audioReady: Promise<AudioBuffer | null> | null = null;

const idle = () => new Promise<void>((resolve) => {
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (ric) ric(() => resolve(), { timeout: 120 });
  else setTimeout(resolve, 16);
});

/** A formation by key; built synchronously if preparation has not reached it yet. */
export function getFormation(key: string): F.Formation {
  let f = cache.get(key);
  if (!f) {
    f = (BUILDERS[key] ?? F.fVoid)();
    cache.set(key, f);
  }
  return f;
}

export function setFormation(key: string, f: F.Formation) {
  cache.set(key, f);
}

/**
 * The score as one buffer. It ships pre-rendered (lossless FLAC, rendered by
 * this same engine), so nothing is synthesized at runtime; if the file is
 * missing it is rendered on the fly. `?render-score` forces a live render.
 */
export function trailerAudio(): Promise<AudioBuffer | null> {
  audioReady ??= (async () => {
    if (typeof OfflineAudioContext === 'undefined') return null;
    if (!location.search.includes('render-score')) {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}audio/trailer-score.flac`);
        if (res.ok) return await new OfflineAudioContext(2, 1, 48000).decodeAudioData(await res.arrayBuffer());
      } catch { /* fall through to a live render */ }
    }
    return sound.renderScore(buildScore(), TRAILER_AUDIO_SECONDS).catch(() => null);
  })();
  return audioReady;
}

export function prepareTrailer(): Promise<void> {
  formationsReady ??= (async () => {
    // text formations sample the webfont; wait for it
    try { await document.fonts.load('900 100px Heebo'); } catch { /* fall back to whatever is loaded */ }
    for (const key of ORDER) {
      if (!cache.has(key)) {
        await idle();
        getFormation(key);
      }
    }
  })();
  void trailerAudio();
  return formationsReady;
}

// Dev helper: render the score and download it as a 16-bit WAV (see score.ts).
if (import.meta.env.DEV) {
  (window as unknown as { __downloadTrailerScore?: () => Promise<void> }).__downloadTrailerScore = async () => {
    const buf = await sound.renderScore(buildScore(), TRAILER_AUDIO_SECONDS);
    const L = buf.getChannelData(0);
    const R = buf.getChannelData(1);
    const data = new DataView(new ArrayBuffer(44 + buf.length * 4));
    const str = (o: number, t: string) => { for (let i = 0; i < t.length; i++) data.setUint8(o + i, t.charCodeAt(i)); };
    str(0, 'RIFF'); data.setUint32(4, 36 + buf.length * 4, true); str(8, 'WAVE'); str(12, 'fmt ');
    data.setUint32(16, 16, true); data.setUint16(20, 1, true); data.setUint16(22, 2, true);
    data.setUint32(24, buf.sampleRate, true); data.setUint32(28, buf.sampleRate * 4, true);
    data.setUint16(32, 4, true); data.setUint16(34, 16, true); str(36, 'data'); data.setUint32(40, buf.length * 4, true);
    for (let i = 0; i < buf.length; i++) {
      data.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 32767, true);
      data.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i])) * 32767, true);
    }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/wav' }));
    a.download = 'trailer-score.wav';
    a.click();
  };
}
