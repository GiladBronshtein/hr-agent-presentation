import { useEffect } from 'react';
import { usePresentationStore } from '../store/presentationStore';
import { SCENES } from '../data/scenes';

function sceneIndexFromHash(hash: string): number | null {
  const match = hash.match(/^#\/scene\/([\w-]+)$/);
  if (!match) return null;
  const scene = SCENES.find((s) => s.id === match[1]);
  return scene ? scene.index : null;
}

/**
 * Keeps location.hash and currentSceneIndex in sync:
 * - #/scene/<id> in the URL wins on load (deep links)
 * - navigation updates the hash via replaceState (no history spam)
 * - a hash edited/pasted while running navigates the deck
 */
export function useHashSync() {
  useEffect(() => {
    const { goToScene } = usePresentationStore.getState();

    const initialIndex = sceneIndexFromHash(window.location.hash);
    if (initialIndex !== null) {
      goToScene(initialIndex);
    } else {
      const scene = SCENES[usePresentationStore.getState().currentSceneIndex];
      if (scene) window.history.replaceState(null, '', `#/scene/${scene.id}`);
    }

    const onHashChange = () => {
      const index = sceneIndexFromHash(window.location.hash);
      if (index !== null && index !== usePresentationStore.getState().currentSceneIndex) {
        goToScene(index);
      }
    };
    window.addEventListener('hashchange', onHashChange);

    const unsubscribe = usePresentationStore.subscribe((state) => {
      const scene = SCENES[state.currentSceneIndex];
      if (!scene) return;
      const target = `#/scene/${scene.id}`;
      if (window.location.hash !== target) {
        window.history.replaceState(null, '', target);
      }
    });

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      unsubscribe();
    };
  }, []);
}
