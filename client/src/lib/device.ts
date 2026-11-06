/**
 * Device profile. Phones and tablets get a lighter path: no WebGL particle
 * universe, no live audio synthesis, no CSS blur filters. Together those
 * can exhaust the memory iOS gives a web page and make Safari kill it.
 */
import { mark } from './diag';
const touch = typeof window !== 'undefined'
  && (navigator.maxTouchPoints > 0 || window.matchMedia?.('(pointer: coarse)').matches);
const small = typeof window !== 'undefined' && Math.min(screen.width, screen.height) < 1100;

export const LITE = !!(touch && small);

/** iPhone, iPad (also iPadOS reporting a Mac), iPod: every browser there is WebKit. */
export const IOS = typeof navigator !== 'undefined'
  && (/iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

/**
 * Stream long soundtracks through a media element instead of decoding them
 * into memory: iOS 18 kills the page while decodeAudioData runs on them
 * (seen in field diagnostics). Desktops keep the decoded, sample-exact path.
 */
export const MEDIA_AUDIO = IOS || LITE;

// ── Field test switches (query string): narrow down a crash on a real device ──
const params = typeof location !== 'undefined' ? new URLSearchParams(location.search) : new URLSearchParams();
/** Parts to leave out, e.g. `?off=lp,sky`: lp (lines of light), sky (phone night sky), mute (mute button). */
export const OFF = new Set((params.get('off') || '').split(',').filter(Boolean));
/**
 * The opening trailer on phones and tablets. Off by default there until the
 * iOS crash in its first seconds is found; `?trailer=1` forces it on.
 */
export const PHONE_TRAILER = params.get('trailer') === '1';
export const SKIP_TRAILER = (IOS || LITE) && !PHONE_TRAILER;

/** Apple's WebKit (Safari, every iOS browser): prefer AAC, which it decodes natively. */
export const PREFERS_AAC = typeof navigator !== 'undefined'
  && (/^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent) || /iPhone|iPad|iPod/.test(navigator.userAgent));

/** The candidate files for a pre-rendered sound, best first for this device. */
export function audioFiles(base: string): string[] {
  return PREFERS_AAC || LITE ? [`${base}.m4a`, `${base}.flac`] : [`${base}.flac`, `${base}.m4a`];
}

/** Fetch and decode the first file that works; null if none does. */
export async function loadAudio(base: string): Promise<AudioBuffer | null> {
  if (typeof OfflineAudioContext === 'undefined') return null;
  for (const url of audioFiles(base)) {
    try {
      mark(`audio fetch ${url.split('/').pop()}`);
      const res = await fetch(url);
      if (!res.ok) continue;
      const bytes = await res.arrayBuffer();
      mark(`audio decode ${Math.round(bytes.byteLength / 1024)}KB`);
      const b = await new OfflineAudioContext(2, 1, 48000).decodeAudioData(bytes);
      mark(`audio ok ${b.duration.toFixed(1)}s`);
      return b;
    } catch (e) { mark(`audio fail ${String(e).slice(0, 80)}`); }
  }
  return null;
}
