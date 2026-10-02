import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  reactStrictMode: true,

  // Required for Pantheon deployment.
  output: "standalone",

  // Back the Full Route Cache and Data Cache with Pantheon's shared cache (see cache-handler.mjs).
  // Only the singular `cacheHandler`: the plural `cacheHandlers` is for `use cache`, which needs
  // `cacheComponents: true`. That mode breaks 404s for a catch-all P1 route (the static shell
  // flushes a 200 before notFound() runs), so it stays off, as on Pantheon's own P1 docs site.
  cacheHandler: path.resolve(__dirname, "./cache-handler.mjs"),
  // Otherwise Next keeps an in-process LRU in front of the handler and serves entries that a
  // revalidateTag() already cleared from the shared cache.
  cacheMaxMemorySize: 0,

  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
  transpilePackages: [
    "@pantheon-systems/css-client",
    "@pantheon-systems/puck-css",
    "@pantheon-systems/p1-next-sdk",
    // NOT @pantheon-systems/nextjs-cache-handler: transpiling it drags its Node-only handlers
    // (fs, @google-cloud/storage) into the edge bundle for the proxy and breaks the build.
  ],
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      yjs: require.resolve("yjs"),
    };
    return config;
  },
};
