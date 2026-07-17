/**
 * SmoothImage — progressive image with shimmer placeholder and blur-up reveal.
 * - Shimmer sweep (glassmorphism-toned) fills the box while loading
 * - Image fades in and un-blurs on load (respects prefers-reduced-motion)
 * - Cache-aware: already-loaded images render instantly with no animation
 */
import { useEffect, useRef, useState, CSSProperties } from 'react';

interface SmoothImageProps {
  src: string;
  alt: string;
  style?: CSSProperties;
  className?: string;
  /** Render an absolute shimmer overlay while loading (parent needs position: relative) */
  shimmer?: boolean;
  /** Reveal duration in ms */
  duration?: number;
}

export function SmoothImage({ src, alt, style, className, shimmer = false, duration = 650 }: SmoothImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setInstant(true);
      setLoaded(true);
    }
  }, []);

  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = !instant && !reduceMotion;

  const callerFilter = style?.filter ? String(style.filter) : '';
  const loadingFilter = `${callerFilter} blur(14px)`.trim();

  return (
    <>
      {shimmer && !loaded && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
              backgroundSize: '220% 100%',
              animation: 'shimmerSweep 1.3s ease-in-out infinite',
            }}
          />
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        decoding="async"
        className={className}
        onLoad={() => setLoaded(true)}
        style={{
          ...style,
          opacity: loaded ? ((style?.opacity as number | undefined) ?? 1) : 0,
          filter: loaded ? (callerFilter || undefined) : loadingFilter,
          transition: animate ? `opacity ${duration}ms ease, filter ${duration}ms ease` : undefined,
        }}
      />
    </>
  );
}
