import { useEffect, useState } from 'react';
import { usePresentationStore } from '../../store/presentationStore';

const QUERY = '(prefers-reduced-motion: reduce)';

/** OS level reduced-motion preference, read once (no subscription). */
export function osPrefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(QUERY).matches;
}

/**
 * True when either the presenter toggled reduced motion in the store or the
 * operating system asks for it. The store value is persisted, so it can be
 * stale relative to the OS setting; this hook honours both.
 */
export function useReducedMotion(): boolean {
  const storeReduced = usePresentationStore((s) => s.isReducedMotion);
  const [osReduced, setOsReduced] = useState(osPrefersReducedMotion);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(QUERY);
    const onChange = () => setOsReduced(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return storeReduced || osReduced;
}
