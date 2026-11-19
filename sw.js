/* Match3Poker service worker (web build only).
 * Generated into dist-web/sw.js by vite.config.ts: the version and precache list are filled in at build time.
 * All URLs are relative to this file, so the game works from the site root or from any subfolder. */
const VERSION = 'c1b3e88bfb1a';
const CACHE = 'm3p-' + VERSION;
const PRECACHE = ["./","assets/index-BN_cRdfX.css","assets/index-DdVfOGHx.js","assets/joker-avatar-D8cgSUAc.png","assets/roboto-cyrillic-200-italic-DWDwiriU.woff2","assets/roboto-cyrillic-500-italic-CFOZTHyM.woff2","assets/roboto-cyrillic-700-italic-DhNJyfCT.woff2","assets/roboto-cyrillic-700-normal-C2o7G-SM.woff2","assets/roboto-cyrillic-ext-200-italic-Cga7V_zX.woff2","assets/roboto-cyrillic-ext-500-italic-C-yqETei.woff2","assets/roboto-cyrillic-ext-700-italic-BPGsVrTY.woff2","assets/roboto-cyrillic-ext-700-normal-DmFxo5wj.woff2","assets/roboto-greek-200-italic-D7VzvubH.woff2","assets/roboto-greek-500-italic-Dqz20l7v.woff2","assets/roboto-greek-700-italic-DawR0hnC.woff2","assets/roboto-greek-700-normal-0aHWxGLu.woff2","assets/roboto-latin-200-italic-EyIq4zYy.woff2","assets/roboto-latin-500-italic-DOe3GFcv.woff2","assets/roboto-latin-700-italic-Cb9agdGy.woff2","assets/roboto-latin-700-normal-BZpUvMxY.woff2","assets/roboto-latin-ext-200-italic-BWJ6EvQQ.woff2","assets/roboto-latin-ext-500-italic-B5teBpxj.woff2","assets/roboto-latin-ext-700-italic-CBdFfgzf.woff2","assets/roboto-latin-ext-700-normal-DSBUz0N1.woff2","assets/roboto-math-200-italic-D8wuurk9.woff2","assets/roboto-math-500-italic-BaDHGWdF.woff2","assets/roboto-math-700-italic-BTlAqkAP.woff2","assets/roboto-math-700-normal-B8YqGHVc.woff2","assets/roboto-symbols-200-italic-UnMKiqme.woff2","assets/roboto-symbols-500-italic-BiGHMB5Q.woff2","assets/roboto-symbols-700-italic-Bj79QYOr.woff2","assets/roboto-symbols-700-normal-BiFDindJ.woff2","assets/roboto-vietnamese-200-italic-DYrPBHLy.woff2","assets/roboto-vietnamese-500-italic-BddoBFd0.woff2","assets/roboto-vietnamese-700-italic-CVc74C74.woff2","assets/roboto-vietnamese-700-normal-BEVeWqJt.woff2","assets/web-B4SRTPx5.js","assets/web-CB-3zewV.js","assets/web-WALZChao.js","favicon-32.png","favicon-48.png","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/maskable-192.png","icons/maskable-512.png","index.html","manifest.webmanifest"];
const INDEX = new URL('./', self.location).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      // `reload` skips the HTTP cache so a fresh deploy never precaches stale files.
      .then((c) => c.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('m3p-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(INDEX)) return;

  // Pages: network first (picks up new deploys), cached index.html when offline.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(INDEX, copy)); }
          return res;
        })
        .catch(() => caches.match(INDEX, { cacheName: CACHE }).then((r) => r || caches.match(INDEX))),
    );
    return;
  }

  // Assets (content-hashed by Vite): cache first, then network (and remember it).
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    })),
  );
});
