/**
 * Device profile. Phones and tablets get a lighter path: no WebGL particle
 * universe, no live audio synthesis, no CSS blur filters. Together those
 * can exhaust the memory iOS gives a web page and make Safari kill it.
 */
const touch = typeof window !== 'undefined'
  && (navigator.maxTouchPoints > 0 || window.matchMedia?.('(pointer: coarse)').matches);
const small = typeof window !== 'undefined' && Math.min(screen.width, screen.height) < 1100;

export const LITE = !!(touch && small);

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
      const res = await fetch(url);
      if (!res.ok) continue;
      return await new OfflineAudioContext(2, 1, 48000).decodeAudioData(await res.arrayBuffer());
    } catch { /* try the next format */ }
  }
  return null;
}
