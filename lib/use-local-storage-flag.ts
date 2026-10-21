import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
};

/**
 * Whether a localStorage key is set. Returns false on the server and during
 * hydration, then the real value, so markup matches without a post-mount
 * setState-in-effect (which react-hooks v7 flags).
 */
export function useLocalStorageFlag(key: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        return !!localStorage.getItem(key);
      } catch {
        return false;
      }
    },
    () => false,
  );
}
