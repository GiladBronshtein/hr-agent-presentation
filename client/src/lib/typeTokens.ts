import { textOn } from './palette';

/**
 * Shared text tokens for scenes.
 *
 * TEXT_TINT maps the saturated 500-level accent colors (fine for borders and
 * fills) to their 300-level tints, which keep small text at 4.5:1 or better
 * on the deck's near-black background.
 */
export const TEXT_TINT: Record<string, string> = {
  '#6366F1': '#A5B4FC',
  '#818CF8': '#A5B4FC',
  '#0891B2': '#67E8F9',
  '#22D3EE': '#67E8F9',
  '#10B981': '#6EE7B7',
  '#34D399': '#6EE7B7',
  '#A78BFA': '#C4B5FD',
  '#F59E0B': '#FCD34D',
  '#F43F5E': '#FDA4AF',
  '#64748B': '#CBD5E1',
};

export const textTint = (c: string) => TEXT_TINT[c.toUpperCase()] ?? textOn(c);

/** Code-style text: a Latin monospace, with Hebrew falling back to Heebo
 * instead of a gappy system monospace. */
export const CODE_FONT = "ui-monospace, 'SF Mono', Monaco, Consolas, 'Heebo', Menlo, monospace";
