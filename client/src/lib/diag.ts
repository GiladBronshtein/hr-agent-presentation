/**
 * Field diagnostics for crashes we cannot reproduce (e.g. a phone that kills
 * the page). Off unless the deck was opened once with `?diag`. When on, each
 * step is written to localStorage right away, so the trail survives the crash;
 * read it at /diag.html on the same site. No effect on the normal deck.
 */
const KEY = 'diag-log';
let on = false;
try {
  if (typeof window !== 'undefined') {
    if (/[?&]diag\b/.test(location.search)) localStorage.setItem('diag-on', '1');
    if (/[?&]nodiag\b/.test(location.search)) localStorage.removeItem('diag-on');
    on = localStorage.getItem('diag-on') === '1';
  }
} catch { on = false; }

export const DIAG = on;

export function mark(msg: string) {
  if (!on) return;
  try {
    const log: string[] = JSON.parse(localStorage.getItem(KEY) || '[]');
    log.push(`${new Date().toISOString().slice(11, 23)} ${msg}`);
    while (log.length > 160) log.shift();
    localStorage.setItem(KEY, JSON.stringify(log));
  } catch { /* storage full or blocked */ }
}

if (on) {
  mark(`--- load ${location.hash} ${(navigator.userAgent.match(/(iPhone OS [\d_]+|iPad; CPU OS [\d_]+|Android [\d.]+|Mac OS X [\d_]+|Windows NT [\d.]+)/) || ['?'])[0] + (/CriOS/.test(navigator.userAgent) ? ' Chrome' : '')} dpr=${window.devicePixelRatio} ${screen.width}x${screen.height}`);
  window.addEventListener('error', (e) => mark(`ERROR ${e.message} @${(e.filename || '').split('/').pop()}:${e.lineno}`));
  window.addEventListener('unhandledrejection', (e) => mark(`REJECT ${String(e.reason).slice(0, 120)}`));
  document.addEventListener('visibilitychange', () => mark(`visibility ${document.visibilityState}`));
}
