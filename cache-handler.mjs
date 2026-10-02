import { createCacheHandler } from "@pantheon-systems/nextjs-cache-handler";

/**
 * Pantheon's shared cache handler for Next's Full Route Cache and Data Cache.
 *
 * Without it both caches live in .next on one container's local disk: empty after every deploy
 * and not shared between Pantheon's horizontally scaled containers. It also ties revalidateTag()
 * to Pantheon's CDN surrogate keys.
 *
 * `type: "auto"` uses GCS when CACHE_BUCKET is set (Pantheon sets it) and the filesystem locally,
 * so `next dev` / `next start` need no configuration.
 *
 * ESM (.mjs) because the package is `"type": "module"`.
 */
export default createCacheHandler({ type: "auto" });
