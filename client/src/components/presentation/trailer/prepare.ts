/**
 * Ahead-of-time preparation for the trailer, so nothing heavy runs while it
 * plays: the webfont is loaded (the finale writes the title in it) and the
 * whole score is decoded (or rendered offline) into one AudioBuffer.
 * Idempotent; started early (on the first slide) and awaited by the trailer.
 */
import { sound } from '../../../lib/sound';
import { buildScore, TRAILER_AUDIO_SECONDS } from './score';

let fontsReady: Promise<void> | null = null;
let audioReady: Promise<AudioBuffer | null> | null = null;

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
  fontsReady ??= (async () => {
    try {
      await Promise.all([document.fonts.load('900 100px Heebo'), document.fonts.load('900 100px "Space Grotesk"')]);
    } catch { /* fall back to whatever is loaded */ }
  })();
  void trailerAudio();
  return fontsReady;
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
