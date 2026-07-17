import { useEffect } from 'react';
import { usePresentationStore } from '../store/presentationStore';
import { PRESENTER_CHANNEL, PresenterMessage } from '../lib/presenterChannel';

/**
 * Main-window side of the presenter-view sync: broadcasts scene changes to the
 * presenter window and executes navigation commands coming back from it.
 */
export function usePresenterBridge() {
  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const channel = new BroadcastChannel(PRESENTER_CHANNEL);

    const broadcast = (index: number) => {
      channel.postMessage({ type: 'state', index } satisfies PresenterMessage);
    };

    channel.onmessage = (e: MessageEvent<PresenterMessage>) => {
      const store = usePresentationStore.getState();
      switch (e.data.type) {
        case 'hello':
          broadcast(store.currentSceneIndex);
          break;
        case 'nav':
          if (e.data.action === 'next') store.goNext();
          else if (e.data.action === 'prev') store.goPrev();
          else if (e.data.action === 'goto' && typeof e.data.index === 'number') store.goToScene(e.data.index);
          break;
      }
    };

    const unsubscribe = usePresentationStore.subscribe((state, prev) => {
      if (state.currentSceneIndex !== prev.currentSceneIndex) {
        broadcast(state.currentSceneIndex);
      }
    });

    return () => {
      unsubscribe();
      channel.close();
    };
  }, []);
}
