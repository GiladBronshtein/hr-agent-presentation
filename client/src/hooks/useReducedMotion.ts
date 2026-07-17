import { useEffect } from 'react';
import { usePresentationStore } from '../store/presentationStore';

export function useReducedMotion() {
  const { isReducedMotion, toggleReducedMotion } = usePresentationStore();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches !== isReducedMotion) {
        toggleReducedMotion();
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [isReducedMotion, toggleReducedMotion]);

  return isReducedMotion;
}
