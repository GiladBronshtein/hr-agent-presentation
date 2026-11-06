/**
 * Cinematic sound engine (Web Audio API). Everything is synthesized in code,
 * so the deck needs no audio files and works fully offline.
 *
 * Signal flow (stereo):
 *   voices -> session bus (music | fx) -> music bus (sidechain duck) -> mix
 *          \-> reverb send (lush stereo hall) -> mix
 *          \-> delay send (dotted-eighth ping-pong) -> mix
 *   mix -> warm saturation -> glue compressor -> brickwall limiter -> out
 *
 * Instruments are context-agnostic (they take everything from the Bus), so a
 * whole score can be rendered ahead of time with an OfflineAudioContext into
 * one AudioBuffer (`renderScore`) and played back as a single source
 * (`playBuffer`). Nothing is synthesized while visuals are animating, which
 * removes audio dropouts, and the buffer's playhead becomes the master clock
 * the visuals follow.
 *
 * Browsers only allow audio after a user gesture in the page: call
 * `sound.unlock()` from a keydown/pointerdown handler once.
 */
import { getSceneById } from '../data/scenes';

export interface Bus {
  ctx: BaseAudioContext;
  music: AudioNode;
  fx: AudioNode;
  rev: AudioNode;
  dly: AudioNode;
  noise: AudioBuffer;
  duck: AudioParam | null;
}

export interface ScoreEvent { at: number; play: (bus: Bus, t: number) => void }

/** A playing pre-rendered buffer; `time()` is the audible playhead in seconds. */
export interface BufferPlayback { time: () => number; stop: (fade?: number) => void }

const BPM = 96;
const BEAT = 60 / BPM;

interface Chain {
  mix: GainNode;
  musicBus: GainNode;
  duck: GainNode;
  reverbIn: GainNode;
  delayIn: GainNode;
  noise: AudioBuffer;
}

class Session implements Bus {
  readonly music: GainNode;
  readonly fx: GainNode;
  readonly rev: GainNode;
  readonly dly: GainNode;
  readonly noise: AudioBuffer;
  readonly duck: AudioParam;
  private stopped = false;
  constructor(readonly ctx: BaseAudioContext, chain: Chain) {
    this.music = ctx.createGain();
    this.fx = ctx.createGain();
    this.rev = ctx.createGain();
    this.dly = ctx.createGain();
    this.music.connect(chain.musicBus);
    this.fx.connect(chain.mix);
    this.rev.connect(chain.reverbIn);
    this.dly.connect(chain.delayIn);
    this.noise = chain.noise;
    this.duck = chain.duck.gain;
  }
  stop(fade = 0.35) {
    if (this.stopped) return;
    this.stopped = true;
    const t = this.ctx.currentTime;
    [this.music, this.fx, this.rev, this.dly].forEach((g) => {
      g.gain.cancelScheduledValues(t);
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + fade);
    });
    setTimeout(() => [this.music, this.fx, this.rev, this.dly].forEach((g) => g.disconnect()), (fade + 4) * 1000);
  }
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private out: GainNode | null = null;
  private chain: Chain | null = null;
  private enabled = true;
  private listeners = new Set<() => void>();
  // Streamed soundtrack (see lib/device.ts MEDIA_AUDIO): a media element that
  // is primed inside the first user gesture, then played and seeked later.
  private media: HTMLAudioElement | null = null;
  private mediaPrimed = false;
  /** The soundtrack to stream on devices that must not decode it. Set at startup. */
  mediaUrl: string | null = null;

  get armed() {
    return !!this.ctx && this.ctx.state === 'running';
  }
  get ready() {
    return this.armed && this.enabled;
  }
  onChange(cb: () => void) {
    this.listeners.add(cb);
    return () => { this.listeners.delete(cb); };
  }
  private emit() { this.listeners.forEach((cb) => cb()); }

  /** Create/resume the AudioContext. Must run inside a user gesture the first time. */
  unlock() {
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor({ latencyHint: 'playback' });
      this.ctx = ctx;
      this.out = ctx.createGain();
      this.out.gain.value = this.enabled ? 1 : 0;
      this.out.connect(ctx.destination);
      ctx.onstatechange = () => this.emit();
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().then(() => this.emit()).catch(() => {});
    else this.emit();
    this.primeMedia();
  }

  /** iOS lets a media element play later only if it first played inside a gesture. */
  private primeMedia() {
    if (!this.mediaUrl || this.media) return;
    const a = new Audio();
    a.preload = 'auto';
    a.setAttribute('playsinline', '');
    a.muted = true;
    a.src = this.mediaUrl;
    this.media = a;
    a.play().then(() => {
      a.pause();
      a.currentTime = 0;
      a.muted = !this.enabled;
      this.mediaPrimed = true;
      this.emit();
    }).catch(() => { this.media = null; });
  }

  /** Play the streamed soundtrack from `offset` seconds. Same contract as playBuffer. */
  playMedia(offset = 0): BufferPlayback | null {
    const a = this.media;
    if (!a || !this.mediaPrimed) return null;
    a.muted = !this.enabled;
    try { a.currentTime = Math.max(0, offset); } catch { /* not seekable yet */ }
    void a.play().catch(() => {});
    let lastCt = -1;
    let lastAt = 0;
    let stopped = false;
    return {
      // currentTime advances in coarse steps on some devices: interpolate between them
      time: () => {
        const ct = a.currentTime;
        const now = performance.now();
        if (ct !== lastCt) { lastCt = ct; lastAt = now; }
        return a.paused ? ct : ct + Math.min(0.5, (now - lastAt) / 1000);
      },
      stop: () => {
        if (stopped) return;
        stopped = true;
        a.pause();
      },
    };
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (this.out && this.ctx) this.out.gain.setTargetAtTime(on ? 1 : 0, this.ctx.currentTime, 0.05);
    if (this.media && this.mediaPrimed) this.media.muted = !on;
    this.emit();
  }

  /** Mix bus, reverb, delay and mastering, built on any context. */
  private buildChain(ctx: BaseAudioContext, dest: AudioNode): Chain {
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -2;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.002;
    limiter.release.value = 0.12;
    const glue = ctx.createDynamicsCompressor();
    glue.threshold.value = -18;
    glue.knee.value = 8;
    glue.ratio.value = 2.5;
    glue.attack.value = 0.015;
    glue.release.value = 0.25;
    const sat = ctx.createWaveShaper();
    sat.curve = this.satCurve(1.6);
    sat.oversample = '4x';
    const master = ctx.createGain();
    master.gain.value = 0.9;
    const mix = ctx.createGain();
    mix.gain.value = 0.8;
    mix.connect(sat);
    sat.connect(glue);
    glue.connect(limiter);
    limiter.connect(master);
    master.connect(dest);

    // Music bus with sidechain duck
    const musicBus = ctx.createGain();
    const duck = ctx.createGain();
    musicBus.connect(duck);
    duck.connect(mix);

    // Lush stereo reverb with tone shaping
    const reverbIn = ctx.createGain();
    const preDelay = ctx.createDelay(0.1);
    preDelay.delayTime.value = 0.025;
    const reverb = ctx.createConvolver();
    reverb.buffer = this.hallImpulse(ctx, 3.8);
    const revHp = ctx.createBiquadFilter();
    revHp.type = 'highpass';
    revHp.frequency.value = 180;
    const revLp = ctx.createBiquadFilter();
    revLp.type = 'lowpass';
    revLp.frequency.value = 7500;
    const revOut = ctx.createGain();
    revOut.gain.value = 0.55;
    reverbIn.connect(preDelay);
    preDelay.connect(reverb);
    reverb.connect(revHp);
    revHp.connect(revLp);
    revLp.connect(revOut);
    revOut.connect(mix);

    // Ping-pong delay (dotted eighth)
    const delayIn = ctx.createGain();
    const dT = BEAT * 0.75;
    const dl = ctx.createDelay(2);
    const dr = ctx.createDelay(2);
    dl.delayTime.value = dT;
    dr.delayTime.value = dT;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    const dLp = ctx.createBiquadFilter();
    dLp.type = 'lowpass';
    dLp.frequency.value = 3200;
    const merger = ctx.createChannelMerger(2);
    const dOut = ctx.createGain();
    dOut.gain.value = 0.32;
    delayIn.connect(dl);
    dl.connect(dLp);
    dLp.connect(dr);
    dr.connect(fb);
    fb.connect(dl);
    dl.connect(merger, 0, 0);
    dr.connect(merger, 0, 1);
    merger.connect(dOut);
    dOut.connect(mix);
    dOut.connect(reverbIn);

    return { mix, musicBus, duck, reverbIn, delayIn, noise: this.makeNoise(ctx, 3) };
  }

  /** Start a stoppable live sequence. Returns null when audio is unavailable or muted. */
  session(): { s: Session; t0: number } | null {
    if (!this.ready || !this.ctx || !this.out) return null;
    this.chain ??= this.buildChain(this.ctx, this.out);
    return { s: new Session(this.ctx, this.chain), t0: this.ctx.currentTime + 0.05 };
  }

  /**
   * Render a whole score offline into one stereo buffer (same instruments,
   * same mix and mastering). Events are created in 2s windows while the
   * offline render is suspended, so no single main-thread burst is large.
   */
  async renderScore(score: ScoreEvent[], duration: number, sampleRate = 48000): Promise<AudioBuffer> {
    const off = new OfflineAudioContext(2, Math.ceil(duration * sampleRate), sampleRate);
    const sess = new Session(off, this.buildChain(off, off.destination));
    const events = [...score].sort((a, b) => a.at - b.at);
    let idx = 0;
    const scheduleUntil = (until: number) => {
      while (idx < events.length && events[idx].at < until) {
        const ev = events[idx++];
        ev.play(sess, ev.at);
      }
    };
    const WINDOW = 2;
    scheduleUntil(WINDOW + 0.5);
    for (let w = WINDOW; w < duration; w += WINDOW) {
      const at = w;
      off.suspend(at).then(() => { scheduleUntil(at + WINDOW + 0.5); return off.resume(); });
    }
    return off.startRendering();
  }

  /**
   * Play a pre-rendered buffer from `offset` seconds. The returned `time()`
   * is the audible playhead (output latency compensated, smoothed with the
   * performance clock), to be used as the master clock for visuals.
   */
  playBuffer(buf: AudioBuffer, offset = 0): BufferPlayback | null {
    if (!this.armed || !this.ctx || !this.out) return null;
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const g = ctx.createGain();
    src.connect(g);
    g.connect(this.out);
    const startAt = ctx.currentTime + 0.04;
    const from = Math.max(0, Math.min(offset, buf.duration - 0.01));
    src.start(startAt, from);
    const latency = (ctx as AudioContext & { outputLatency?: number }).outputLatency || ctx.baseLatency || 0;
    let stopped = false;
    return {
      time: () => {
        const ts = ctx.getOutputTimestamp?.();
        const now = ts && ts.contextTime !== undefined && ts.performanceTime !== undefined
          ? ts.contextTime + (performance.now() - ts.performanceTime) / 1000
          : ctx.currentTime - latency;
        return from + Math.max(0, now - startAt);
      },
      stop: (fade = 0.35) => {
        if (stopped) return;
        stopped = true;
        const t = ctx.currentTime;
        g.gain.cancelScheduledValues(t);
        g.gain.setValueAtTime(g.gain.value, t);
        g.gain.linearRampToValueAtTime(0, t + fade);
        src.stop(t + fade + 0.05);
      },
    };
  }

  // ── Building blocks ──

  private env(g: GainNode, t: number, peak: number, attack: number, decay: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  private pan(dest: AudioNode, value: number) {
    const p = dest.context.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, value));
    p.connect(dest);
    return p;
  }

  private send(src: AudioNode, b: Bus, rev: number, dly = 0) {
    const ctx = b.ctx;
    if (rev > 0) { const g = ctx.createGain(); g.gain.value = rev; src.connect(g); g.connect(b.rev); }
    if (dly > 0) { const g = ctx.createGain(); g.gain.value = dly; src.connect(g); g.connect(b.dly); }
  }

  private noiseSrc(b: Bus, t: number, dur: number) {
    const s = b.ctx.createBufferSource();
    s.buffer = b.noise;
    s.loop = true;
    s.start(t, Math.random() * 2);
    s.stop(t + dur + 0.05);
    return s;
  }

  /** Sidechain: pump the music bus on every kick. */
  duckAt(b: Bus, t: number, depth = 0.4, release = 0.24) {
    if (!b.duck) return;
    const g = b.duck;
    g.setValueAtTime(1, t);
    g.linearRampToValueAtTime(1 - depth, t + 0.008);
    g.setTargetAtTime(1, t + 0.02, release / 3);
  }

  // ── Drums ──

  kick(b: Bus, t: number, vol = 0.9) {
    const ctx = b.ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(190, t);
    o.frequency.exponentialRampToValueAtTime(58, t + 0.05);
    o.frequency.exponentialRampToValueAtTime(41, t + 0.32);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.setTargetAtTime(0.0001, t + 0.06, 0.1);
    const shaper = ctx.createWaveShaper();
    shaper.curve = this.satCurve(2.5);
    o.connect(shaper);
    shaper.connect(g);
    g.connect(b.fx);
    o.start(t);
    o.stop(t + 0.6);
    const n = this.noiseSrc(b, t, 0.02);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 2500;
    const ng = ctx.createGain();
    this.env(ng, t, vol * 0.18, 0.001, 0.012);
    n.connect(hp); hp.connect(ng); ng.connect(b.fx);
    this.duckAt(b, t);
  }

  /** 808-style metallic hat: six detuned squares through band/high-pass. */
  hat(b: Bus, t: number, vol = 0.12, open = false, panV = 0.25) {
    const ctx = b.ctx;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 10000;
    bp.Q.value = 0.8;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 7000;
    const g = ctx.createGain();
    this.env(g, t, vol, 0.001, open ? 0.32 : 0.055);
    bp.connect(hp); hp.connect(g); g.connect(this.pan(b.fx, panV));
    [263, 400, 421, 474, 587, 845].forEach((f) => {
      const o = ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = f * 1.7;
      o.connect(bp);
      o.start(t);
      o.stop(t + (open ? 0.4 : 0.1));
    });
  }

  /** Layered clap with room. */
  clap(b: Bus, t: number, vol = 0.32) {
    const ctx = b.ctx;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 1350;
    bp.Q.value = 0.9;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    [0, 0.011, 0.023].forEach((off) => {
      g.gain.setValueAtTime(vol, t + off);
      g.gain.exponentialRampToValueAtTime(vol * 0.15, t + off + 0.009);
    });
    g.gain.setValueAtTime(vol * 0.7, t + 0.034);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    const n = this.noiseSrc(b, t, 0.3);
    n.connect(bp); bp.connect(g); g.connect(b.fx);
    this.send(g, b, 0.35);
  }

  // ── Tonal ──

  /** FM glass bell: the musical replacement for UI beeps. */
  glass(b: Bus, t: number, freq: number, vol = 0.12, panV = 0, decay = 1.3) {
    const ctx = b.ctx;
    const car = ctx.createOscillator();
    car.type = 'sine';
    car.frequency.value = freq;
    const mod = ctx.createOscillator();
    mod.type = 'sine';
    mod.frequency.value = freq * 3.5;
    const mg = ctx.createGain();
    mg.gain.setValueAtTime(freq * 2.2, t);
    mg.gain.exponentialRampToValueAtTime(1, t + decay * 0.5);
    mod.connect(mg); mg.connect(car.frequency);
    const g = ctx.createGain();
    this.env(g, t, vol, 0.003, decay);
    const p = this.pan(b.fx, panV);
    car.connect(g); g.connect(p);
    this.send(g, b, 0.4, 0.25);
    const over = ctx.createOscillator();
    over.type = 'sine';
    over.frequency.value = freq * 2;
    const og = ctx.createGain();
    this.env(og, t, vol * 0.3, 0.002, decay * 0.35);
    over.connect(og); og.connect(p);
    [car, mod, over].forEach((o) => { o.start(t); o.stop(t + decay + 0.1); });
  }

  /** Synth pluck for arpeggios. */
  pluck(b: Bus, t: number, freq: number, vol = 0.1, cutoff = 1800, panV = 0) {
    const ctx = b.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 5;
    lp.frequency.setValueAtTime(cutoff * 3, t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(160, cutoff * 0.4), t + 0.28);
    const g = ctx.createGain();
    this.env(g, t, vol, 0.004, 0.45);
    lp.connect(g);
    g.connect(this.pan(b.music, panV));
    this.send(g, b, 0.22, 0.32);
    [-7, 7].forEach((det) => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = freq;
      o.detune.value = det;
      o.connect(lp);
      o.start(t);
      o.stop(t + 0.5);
    });
    const sq = ctx.createOscillator();
    sq.type = 'square';
    sq.frequency.value = freq / 2;
    const sg = ctx.createGain();
    sg.gain.value = 0.35;
    sq.connect(sg); sg.connect(lp);
    sq.start(t); sq.stop(t + 0.5);
  }

  /** Wide supersaw pad (5 detuned voices per note, split L/R). */
  pad(b: Bus, t: number, freqs: number[], dur: number, vol = 0.05, bright = 1400) {
    const ctx = b.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 0.6;
    lp.frequency.setValueAtTime(bright * 0.6, t);
    lp.frequency.linearRampToValueAtTime(bright, t + dur * 0.6);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + Math.min(0.9, dur * 0.35));
    g.gain.setValueAtTime(vol, t + dur * 0.8);
    g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.6);
    lp.connect(g);
    g.connect(b.music);
    this.send(g, b, 0.5);
    const left = this.pan(lp, -0.55);
    const right = this.pan(lp, 0.55);
    freqs.forEach((f) => {
      [-16, -8, 0, 8, 16].forEach((det, i) => {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f;
        o.detune.value = det + (Math.random() - 0.5) * 3;
        o.connect(i % 2 ? left : right);
        o.start(t);
        o.stop(t + dur + 0.7);
      });
    });
  }

  /** Sub + filtered saw bass. */
  bass(b: Bus, t: number, freq: number, dur: number, vol = 0.32) {
    const ctx = b.ctx;
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = freq;
    const saw = ctx.createOscillator();
    saw.type = 'sawtooth';
    saw.frequency.value = freq;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 3;
    lp.frequency.setValueAtTime(900, t);
    lp.frequency.exponentialRampToValueAtTime(220, t + 0.25);
    const sg = ctx.createGain();
    sg.gain.value = 0.3;
    saw.connect(sg); sg.connect(lp);
    sub.connect(lp);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.setValueAtTime(vol * 0.8, t + dur * 0.7);
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    lp.connect(g); g.connect(b.music);
    [sub, saw].forEach((o) => { o.start(t); o.stop(t + dur + 0.05); });
  }

  /** Bright chord stab with long tail. */
  stab(b: Bus, t: number, freqs: number[], vol = 0.09) {
    const ctx = b.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 2;
    lp.frequency.setValueAtTime(6000, t);
    lp.frequency.exponentialRampToValueAtTime(700, t + 0.5);
    const g = ctx.createGain();
    this.env(g, t, vol, 0.004, 0.9);
    lp.connect(g); g.connect(b.fx);
    this.send(g, b, 0.6, 0.3);
    freqs.forEach((f, i) => {
      [-10, 10].forEach((det) => {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f;
        o.detune.value = det;
        o.connect(this.pan(lp, (i / Math.max(1, freqs.length - 1) - 0.5) * 0.8));
        o.start(t);
        o.stop(t + 1);
      });
    });
  }

  // ── Cinematic ──

  /** Trailer "braam": massive low brass swell with a sub boom. */
  braam(b: Bus, t: number, root = 55, vol = 0.32, dur = 3.2) {
    const ctx = b.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 1.2;
    lp.frequency.setValueAtTime(140, t);
    lp.frequency.exponentialRampToValueAtTime(1600, t + 0.22);
    lp.frequency.exponentialRampToValueAtTime(260, t + dur);
    const drive = ctx.createWaveShaper();
    drive.curve = this.satCurve(3.2);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.07);
    g.gain.setTargetAtTime(0.0001, t + 0.4, dur / 4);
    lp.connect(drive); drive.connect(g); g.connect(b.fx);
    this.send(g, b, 0.55);
    [root, root * 2, root * 3, root * 2.378].forEach((f, i) => {
      [-12, 0, 12].forEach((det) => {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f;
        o.detune.value = det;
        o.connect(this.pan(lp, det / 30 + (i % 2 ? 0.15 : -0.15)));
        o.start(t);
        o.stop(t + dur + 0.2);
      });
    });
    this.sub(b, t, root * 1.2, root * 0.6, vol * 1.3, dur * 0.7);
  }

  /** Pitch-dropping sub boom. */
  sub(b: Bus, t: number, from = 80, to = 32, vol = 0.5, dur = 1.6) {
    const ctx = b.ctx;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(b.fx);
    o.start(t); o.stop(t + dur + 0.05);
  }

  /** Heartbeat: two muffled thumps. */
  heartbeat(b: Bus, t: number, vol = 0.55) {
    const ctx = b.ctx;
    [0, 0.21].forEach((off, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(78, t + off);
      o.frequency.exponentialRampToValueAtTime(40, t + off + 0.12);
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 220;
      const g = ctx.createGain();
      this.env(g, t + off, vol * (i ? 0.65 : 1), 0.006, 0.26);
      o.connect(lp); lp.connect(g); g.connect(b.fx);
      this.send(g, b, 0.18);
      o.start(t + off); o.stop(t + off + 0.4);
    });
  }

  /** Dark evolving drone bed with air. */
  drone(b: Bus, t: number, dur: number, vol = 0.12) {
    const ctx = b.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 2;
    lp.frequency.setValueAtTime(160, t);
    lp.frequency.linearRampToValueAtTime(700, t + dur * 0.8);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + Math.min(2.5, dur * 0.3));
    g.gain.setValueAtTime(vol, t + dur * 0.8);
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    lp.connect(g); g.connect(b.fx);
    this.send(g, b, 0.6);
    ([[55, -0.4], [55.25, 0.4], [82.41, -0.2], [110.3, 0.2]] as const).forEach(([f, p]) => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.value = f;
      o.connect(this.pan(lp, p));
      o.start(t); o.stop(t + dur + 0.1);
    });
    const n = this.noiseSrc(b, t, dur);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(600, t);
    bp.frequency.linearRampToValueAtTime(2400, t + dur);
    bp.Q.value = 0.7;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.linearRampToValueAtTime(vol * 0.12, t + dur * 0.5);
    ng.gain.linearRampToValueAtTime(0.0001, t + dur);
    n.connect(bp); bp.connect(ng); ng.connect(b.fx);
    this.send(ng, b, 0.5);
  }

  /** Air whoosh that travels across the stereo field. */
  whoosh(b: Bus, t: number, dur = 0.9, from = 300, to = 4200, vol = 0.32, panFrom = -0.7, panTo = 0.7) {
    const ctx = b.ctx;
    const n = this.noiseSrc(b, t, dur);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 1.6;
    bp.frequency.setValueAtTime(from, t);
    bp.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.6);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner();
    p.pan.setValueAtTime(panFrom, t);
    p.pan.linearRampToValueAtTime(panTo, t + dur);
    n.connect(bp); bp.connect(g); g.connect(p); p.connect(b.fx);
    this.send(g, b, 0.35);
  }

  /** Tension riser: noise sweep + rising detuned saws with tremolo, hard cut at the end. */
  riser(b: Bus, t: number, dur = 2.5, vol = 0.22) {
    const ctx = b.ctx;
    const end = t + dur;
    const n = this.noiseSrc(b, t, dur);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(400, t);
    bp.frequency.exponentialRampToValueAtTime(9000, end);
    bp.Q.setValueAtTime(0.8, t);
    bp.Q.linearRampToValueAtTime(4, end);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.0001, t);
    ng.gain.exponentialRampToValueAtTime(vol, end - 0.02);
    ng.gain.linearRampToValueAtTime(0.0001, end);
    n.connect(bp); bp.connect(ng); ng.connect(b.fx);
    this.send(ng, b, 0.3);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(500, t);
    lp.frequency.exponentialRampToValueAtTime(7000, end);
    const trem = ctx.createGain();
    trem.gain.value = 0.5;
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(4, t);
    lfo.frequency.exponentialRampToValueAtTime(22, end);
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.5;
    lfo.connect(lfoG); lfoG.connect(trem.gain);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol * 0.6, end - 0.02);
    g.gain.linearRampToValueAtTime(0.0001, end);
    lp.connect(trem); trem.connect(g); g.connect(b.fx);
    this.send(g, b, 0.3);
    [-15, 0, 15].forEach((det, i) => {
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(110 * (i === 1 ? 2 : 1), t);
      o.frequency.exponentialRampToValueAtTime(880 * (i === 1 ? 2 : 1), end);
      o.detune.value = det;
      o.connect(this.pan(lp, (i - 1) * 0.6));
      o.start(t); o.stop(end + 0.02);
    });
    lfo.start(t); lfo.stop(end + 0.02);
  }

  /** Reverse swell into a hit (reverse-cymbal feel). */
  swell(b: Bus, t: number, dur = 1.2, vol = 0.25) {
    const ctx = b.ctx;
    const n = this.noiseSrc(b, t, dur);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(2000, t);
    hp.frequency.exponentialRampToValueAtTime(5000, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur - 0.01);
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    n.connect(hp); hp.connect(g); g.connect(b.fx);
    this.send(g, b, 0.4);
  }

  /** Cinematic impact: sub drop + transient + body + braam + long tail. */
  impact(b: Bus, t: number, vol = 0.8) {
    const ctx = b.ctx;
    this.sub(b, t, 95, 26, vol * 0.9, 1.8);
    const n1 = this.noiseSrc(b, t, 0.05);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1800;
    const g1 = ctx.createGain();
    this.env(g1, t, vol * 0.5, 0.001, 0.04);
    n1.connect(hp); hp.connect(g1); g1.connect(b.fx);
    const n2 = this.noiseSrc(b, t, 1.2);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(5200, t);
    lp.frequency.exponentialRampToValueAtTime(140, t + 0.9);
    const g2 = ctx.createGain();
    this.env(g2, t, vol * 0.42, 0.002, 1.0);
    n2.connect(lp); lp.connect(g2); g2.connect(b.fx);
    this.send(g2, b, 0.7);
    this.braam(b, t, 55, vol * 0.42, 3.6);
  }

  /** Data glitch: granular noise stutter with a tape-stop zip. */
  glitch(b: Bus, t: number, dur = 0.5, vol = 0.18) {
    const ctx = b.ctx;
    const grains = 12;
    for (let i = 0; i < grains; i++) {
      const st = t + (i * dur) / grains;
      const n = this.noiseSrc(b, st, 0.03);
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = [900, 2400, 5200, 1500, 3600][i % 5];
      bp.Q.value = 6;
      const g = ctx.createGain();
      this.env(g, st, vol * (0.5 + Math.random() * 0.5), 0.001, 0.025);
      n.connect(bp); bp.connect(g); g.connect(this.pan(b.fx, (Math.random() - 0.5) * 1.2));
    }
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(420, t);
    o.frequency.exponentialRampToValueAtTime(38, t + dur);
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 1400;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol * 0.5, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(lp); lp.connect(g); g.connect(b.fx);
    o.start(t); o.stop(t + dur + 0.02);
  }

  /** Soft mechanical key. */
  click(b: Bus, t: number, vol = 0.08) {
    const ctx = b.ctx;
    const n = this.noiseSrc(b, t, 0.03);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 2600 + Math.random() * 1200;
    bp.Q.value = 2.2;
    const g = ctx.createGain();
    this.env(g, t, vol, 0.001, 0.022);
    n.connect(bp); bp.connect(g); g.connect(this.pan(b.fx, (Math.random() - 0.5) * 0.4));
  }

  /** Airy shimmer chord (glass bells, cascading). */
  shimmer(b: Bus, t: number, notes = [880, 1046.5, 1318.5, 1760, 2093], vol = 0.06) {
    notes.forEach((f, i) => this.glass(b, t + i * 0.07, f, vol, (i / (notes.length - 1) - 0.5) * 1.2, 2.2));
  }

  /** Transition swoosh used by chapter changes elsewhere in the deck. */
  swoosh(vol = 0.22) {
    const sess = this.session();
    if (!sess) return;
    this.whoosh(sess.s, sess.t0, 0.75, 2600, 420, vol, 0.6, -0.6);
    setTimeout(() => sess.s.stop(1), 3000);
  }

  // ── The deck's melody (slide transitions) ──

  /** Felt piano: soft attack, warm decay, a little hammer. */
  felt(b: Bus, t: number, freq: number, vol = 0.08, decay = 1.8, panV = 0) {
    const ctx = b.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 0.4;
    lp.frequency.setValueAtTime(Math.min(5200, freq * 6), t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(500, freq * 1.6), t + decay);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.006);
    g.gain.exponentialRampToValueAtTime(vol * 0.35, t + 0.18);
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay);
    lp.connect(g);
    const p = this.pan(b.fx, panV);
    g.connect(p);
    this.send(g, b, 0.38, 0.1);
    ([['sine', 1, 1, 0], ['sine', 2, 0.26, 0], ['triangle', 1, 0.34, 4], ['sine', 3, 0.07, -3]] as const).forEach(([type, mul, lvl, det]) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq * mul;
      o.detune.value = det;
      const og = ctx.createGain();
      og.gain.value = lvl;
      o.connect(og); og.connect(lp);
      o.start(t); o.stop(t + decay + 0.05);
    });
    const n = this.noiseSrc(b, t, 0.03);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = Math.min(4000, freq * 4);
    bp.Q.value = 1.2;
    const ng = ctx.createGain();
    this.env(ng, t, vol * 0.18, 0.001, 0.025);
    n.connect(bp); bp.connect(ng); ng.connect(p);
  }

  /** Soft bowed strings: detuned saws, slow bow, gentle vibrato, dark filter. */
  strings(b: Bus, t: number, freqs: number[], dur: number, vol = 0.04, attack = 0.8, bright = 1600) {
    const ctx = b.ctx;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.Q.value = 0.5;
    lp.frequency.setValueAtTime(bright * 0.55, t);
    lp.frequency.linearRampToValueAtTime(bright, t + Math.min(dur, attack * 1.6));
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    g.gain.setValueAtTime(vol, t + Math.max(attack, dur - 0.05));
    g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.9);
    lp.connect(g);
    g.connect(b.music);
    this.send(g, b, 0.55, 0.12);
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.1;
    const vg = ctx.createGain();
    vg.gain.value = 7;
    vib.connect(vg);
    freqs.forEach((f, k) => {
      [-6, 6].forEach((det, i) => {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = f;
        o.detune.value = det;
        vg.connect(o.detune);
        o.connect(this.pan(lp, (i ? 0.45 : -0.45) * (k % 2 ? 1 : 0.6)));
        o.start(t); o.stop(t + dur + 1);
      });
    });
    vib.start(t); vib.stop(t + dur + 1);
  }

  /** A pen stroke on paper: filtered noise with a fine tremor, traveling across the stereo field. */
  pen(b: Bus, t: number, dur = 0.4, vol = 0.05, panFrom = 0.6, panTo = -0.6) {
    const ctx = b.ctx;
    const n = this.noiseSrc(b, t, dur);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1400;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(2600, t);
    bp.frequency.linearRampToValueAtTime(3800, t + dur * 0.6);
    bp.frequency.linearRampToValueAtTime(2900, t + dur);
    const trem = ctx.createGain();
    trem.gain.value = 0.6;
    const lfo = ctx.createOscillator();
    lfo.type = 'square';
    lfo.frequency.setValueAtTime(19, t);
    lfo.frequency.linearRampToValueAtTime(27, t + dur);
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.35;
    lfo.connect(lfoG); lfoG.connect(trem.gain);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.04);
    g.gain.setValueAtTime(vol, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner();
    p.pan.setValueAtTime(panFrom, t);
    p.pan.linearRampToValueAtTime(panTo, t + dur);
    n.connect(hp); hp.connect(bp); bp.connect(trem); trem.connect(g); g.connect(p); p.connect(b.fx);
    this.send(g, b, 0.12);
    lfo.start(t); lfo.stop(t + dur + 0.02);
  }

  /**
   * One step through the deck: the pen draws the transition line, and the
   * note for the arriving slide sounds as the next slide opens. The notes
   * form one melody across the lecture (A minor, the trailer's key) that
   * resolves on the closing slide; a chapter opens with a full chord.
   */
  step(index: number, dir: 1 | -1, chapter = false) {
    const CLOSING_INDEX = getSceneById('personal-closing')?.index ?? -1;
    if (index === 1) return; // the title slide plays its own score
    const sess = this.session();
    if (!sess) return;
    const { s, t0: t } = sess;
    const A4 = 440, C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99, A5 = 880;
    // 28 notes, one per main-track slide (chapters open on 9, 21, 24)
    const MELODY = [A4, A4, C5, E5, D5, E5, C5, E5, G5, A5, G5, E5, D5, E5, C5, D5, E5, G5, E5, D5, C5, D5, E5, G5, E5, D5, C5, A4];
    const APPX = [E5, D5, C5, D5, E5, G5, E5, D5, C5, A4, C5, D5];
    const note = index < MELODY.length ? MELODY[index] : APPX[(index - MELODY.length) % APPX.length];
    if (index === CLOSING_INDEX && dir === 1) {
      // into the closing slide: a soft, rising breath of light, not a hit.
      // The line draws, air rises, and a slow roll of felt piano opens in
      // A minor, the key the closing music continues in.
      this.pen(s, t, 0.5, 0.025, 0.6, -0.6);
      this.swell(s, t + 0.05, 0.8, 0.03);
      [220, 329.63, 440, 523.25, 659.25].forEach((f, k) => this.felt(s, t + 0.3 + k * 0.11, f, 0.032 - k * 0.003, 2.4, (k / 4 - 0.5) * 0.6));
      this.felt(s, t + 0.3, 110, 0.03, 2.6);
      this.shimmer(s, t + 0.75, [1318.51, 1760], 0.01);
      setTimeout(() => s.stop(1.6), 4500);
      return;
    }
    if (chapter) {
      this.pen(s, t, 0.95, 0.05, 0.7, -0.7);
      const chords: Record<number, number[]> = {
        9: [261.63, 329.63, 392, 587.33],   // C(add9): לראות
        21: [174.61, 220, 261.63, 329.63],  // Fmaj7: לבנות
        24: [196, 246.94, 293.66, 329.63],  // G6sus: להטמיע
        28: [220, 261.63, 329.63, 493.88],  // Am(add9): נספח
      };
      const chord = chords[index] ?? [220, 261.63, 329.63, 493.88];
      chord.forEach((f, i) => this.felt(s, t + 0.12 + i * 0.07, f, 0.05, 2.8, (i / 3 - 0.5) * 0.8));
      this.felt(s, t + 0.1, chord[0] / 2, 0.06, 3.2);
      this.felt(s, t + 0.62, note, 0.06, 2.4);
      this.swell(s, t, 0.5, 0.05);
      // the burst of rays out of the written number, and a warm low thump
      this.shimmer(s, t + 0.98, [note * 2, note * 3, note * 4], 0.03);
      this.sub(s, t + 0.5, 70, 38, 0.22, 1.2);
    } else {
      this.pen(s, t, 0.42, 0.045, dir === 1 ? 0.6 : -0.6, dir === 1 ? -0.6 : 0.6);
      this.felt(s, t + 0.3, dir === 1 ? note : note / 2, 0.065, 2.0, 0);
      // the burst at the node: a breath of air and a few sparks
      this.whoosh(s, t + 0.2, 0.35, 900, 5200, 0.05, dir === 1 ? 0.3 : -0.3, dir === 1 ? -0.3 : 0.3);
      this.glass(s, t + 0.3, note * 2, 0.018, 0, 0.9);
    }
    setTimeout(() => s.stop(1.2), 4500);
  }

  // ── Buffers ──

  private satCurve(amount: number) {
    const n = 2048;
    const curve = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const x = (i / (n - 1)) * 2 - 1;
      curve[i] = Math.tanh(x * amount) / Math.tanh(amount);
    }
    return curve;
  }

  private makeNoise(ctx: BaseAudioContext, seconds: number) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /** Stereo hall impulse: early reflections + decorrelated, darkening tail. */
  private hallImpulse(ctx: BaseAudioContext, seconds: number) {
    const sr = ctx.sampleRate;
    const len = Math.floor(sr * seconds);
    const buf = ctx.createBuffer(2, len, sr);
    for (let ch = 0; ch < 2; ch++) {
      const d = buf.getChannelData(ch);
      let lp = 0;
      for (let i = 0; i < len; i++) {
        const tt = i / len;
        const decay = Math.pow(1 - tt, 3.2);
        const a = 0.25 + 0.7 * tt;
        lp = lp * a + (Math.random() * 2 - 1) * (1 - a);
        d[i] = lp * decay * 1.6;
      }
      [0.011, 0.019, 0.027, 0.041, 0.053, 0.067].forEach((s, k) => {
        const idx = Math.floor((s + ch * 0.003) * sr);
        if (idx < len) d[idx] += (k % 2 ? -1 : 1) * (0.6 - k * 0.07);
      });
    }
    return buf;
  }
}

export const sound = new SoundEngine();
export type SoundSession = Session;
