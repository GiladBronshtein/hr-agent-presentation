/**
 * Whether the opening trailer is playing, and how to skip it. While it plays,
 * "next" (key, swipe, button) skips to the finished title slide instead of
 * leaving it, so the title always stands on its own.
 */
export const trailerState: { active: boolean; skip: () => void } = { active: false, skip: () => {} };
