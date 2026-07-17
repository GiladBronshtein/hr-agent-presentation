/** Central registry of static media so scenes and the prefetcher share one source of truth. */
export const PHOTO_URL = `${import.meta.env.BASE_URL}images/gilad-photo-2026.webp`;
export const QR_URL = `${import.meta.env.BASE_URL}images/linkedin-qr.png`;

export const PREFETCH_IMAGES = [PHOTO_URL, QR_URL];

let prefetched = false;

/** Warm the browser cache for slide images during idle time so they appear instantly. */
export function prefetchMediaAssets() {
  if (prefetched) return;
  prefetched = true;
  const load = () => {
    PREFETCH_IMAGES.forEach((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  };
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(load);
  } else {
    setTimeout(load, 2000);
  }
}
