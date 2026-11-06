/**
 * The deck's color system ("Spectrum"): a deep midnight base, warm paper
 * text, and a full spectrum of light accents. Each chapter owns one color,
 * and the signature gradient runs through all of them. Glow is welcome:
 * use `glow()` for colored light (text-shadow / box-shadow / drop-shadow).
 *
 * index.css mirrors these values as CSS custom properties (--c-*, --ch-*),
 * so a change here needs the same change there.
 */
export const PALETTE = {
  bg0: '#060918',
  bg1: '#0B1030',
  bg2: '#131A44',
  paper: '#F6F2EA',
  muted: '#A3ABCF',
  /** Hairlines, disabled states and large captions only: 5.7:1 on bg0 */
  dim: '#7F88B0',
  blue: '#4F7CFF',
  violet: '#9B6BFF',
  magenta: '#F0469E',
  coral: '#FF7A59',
  amber: '#FFC24B',
  teal: '#2DD4BF',
} as const;

/**
 * Lighter tints of the accents for small text on the dark stage. Blue, violet
 * and magenta sit near 5:1 on bg0 and drop under 4.5:1 on a lit card, so body
 * copy in those hues uses these (7:1 or better on bg0, 5.5:1 on bg2).
 */
export const TEXT_TINTS: Record<string, string> = {
  [PALETTE.blue]: '#8FA9FF',
  [PALETTE.violet]: '#BBA2FF',
  [PALETTE.magenta]: '#FF85BF',
  [PALETTE.coral]: '#FF9A80',
  [PALETTE.amber]: PALETTE.amber,
  [PALETTE.teal]: PALETTE.teal,
};

/** A text-safe version of an accent (unknown colors pass through). */
export const textOn = (hex: string) => TEXT_TINTS[hex.toUpperCase()] ?? hex;

/** One color per chapter, in order: להבין, לראות, לבנות, להטמיע, נספח. */
export const CHAPTER_COLORS = [PALETTE.violet, PALETTE.teal, PALETTE.coral, PALETTE.amber, PALETTE.blue] as const;

/**
 * The light each chapter's stage is lit with: its own color first, then two
 * neighbours on the spectrum for the drifting aurora.
 */
export const CHAPTER_LIGHTS = [
  [PALETTE.violet, PALETTE.blue, PALETTE.magenta],
  [PALETTE.teal, PALETTE.blue, PALETTE.violet],
  [PALETTE.coral, PALETTE.magenta, PALETTE.amber],
  [PALETTE.amber, PALETTE.coral, PALETTE.magenta],
  [PALETTE.blue, PALETTE.violet, PALETTE.teal],
] as const;

/**
 * The learning cycle's five stages, in order: אבחון, תכנון, פיתוח, הפעלה,
 * הערכה. Every slide that shows a stage (the cycle, the agent map, each
 * agent) uses the same color for it.
 */
export const CYCLE_COLORS = [PALETTE.blue, PALETTE.violet, PALETTE.magenta, PALETTE.coral, PALETTE.amber] as const;

/** The spectrum in order, for series that cycle through colors. */
export const SPECTRUM_STOPS = [PALETTE.blue, PALETTE.violet, PALETTE.magenta, PALETTE.coral, PALETTE.amber, PALETTE.teal] as const;

/** The signature gradient, through every chapter color. */
export const SPECTRUM = `linear-gradient(90deg, ${PALETTE.blue}, ${PALETTE.violet}, ${PALETTE.magenta}, ${PALETTE.coral}, ${PALETTE.amber})`;

/** A soft colored light around an element or glyph. */
export const glow = (color: string, strength = 1) =>
  `0 0 ${Math.round(18 * strength)}px ${color}88, 0 0 ${Math.round(48 * strength)}px ${color}44`;

/** `#RRGGBB` plus alpha (0..1). */
export const alpha = (hex: string, a: number) => hex + Math.round(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, '0');

/**
 * Colors of the previous (single amber) look, still written into scene files.
 * Shared components translate them so every slide picks up the new palette.
 */
const LEGACY: Record<string, string> = {
  '#F2A93B': PALETTE.amber,
  '#8A93A8': PALETTE.muted,
  '#F3EEE4': PALETTE.paper,
  '#070B17': PALETTE.bg0,
  '#0D1326': PALETTE.bg1,
};

/** Maps a legacy deck color to its Spectrum equivalent (others pass through). */
export const fromLegacy = (hex: string) => LEGACY[hex.toUpperCase()] ?? hex;

/** True for the old single accent, which shared components replace with the chapter color. */
export const isLegacyAccent = (hex?: string) => !!hex && hex.toUpperCase() === '#F2A93B';
