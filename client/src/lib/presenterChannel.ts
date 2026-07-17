/**
 * BroadcastChannel protocol between the main presentation window and the
 * presenter-view window. Both windows are same-origin, so the channel works
 * fully offline.
 *
 * main window  → presenter: { type: 'state', index }
 * presenter    → main:      { type: 'nav', action: 'next' | 'prev' | 'goto', index? }
 * presenter    → main:      { type: 'hello' }  (request current state on open)
 */
export const PRESENTER_CHANNEL = 'hr-agent-presenter';

export type PresenterMessage =
  | { type: 'state'; index: number }
  | { type: 'nav'; action: 'next' | 'prev' | 'goto'; index?: number }
  | { type: 'hello' };

export function openPresenterWindow() {
  const url = `${window.location.pathname}#/presenter`;
  window.open(url, 'hr-presenter-view', 'width=1150,height=760,noopener=no');
}
