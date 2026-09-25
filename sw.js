/* GCS Rawalpindi Portal — service worker
 * Strategy: network-first for everything (so anything you upload to the website
 * shows up straight away), falling back to the saved copy when offline.
 * You never need to edit this file when you update data.json or index.html.
 */
const CACHE = 'gcs-portal-v3';
const SHELL = [
  './',
  './index.html',
  './timetable-engine.js',
  './data.json',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then((r) => { clearTimeout(t); resolve(r); }, (e) => { clearTimeout(t); reject(e); });
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;       // leave external links alone
  if (url.pathname.endsWith('/admin.html')) return;       // never cache the editor

  const isPage = req.mode === 'navigate';
  const cacheKey = isPage ? './index.html' : url.pathname.endsWith('/data.json') ? './data.json' : req;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const fresh = await withTimeout(isPage ? fetch(req) : fetch(req, { cache: 'no-cache' }), NETWORK_TIMEOUT_MS);
      if (fresh && fresh.ok) {
        cache.put(cacheKey, fresh.clone());
        return fresh;
      }
      const cached = await cache.match(cacheKey, { ignoreSearch: true });
      return cached || fresh;
    } catch (err) {
      const cached = await cache.match(cacheKey, { ignoreSearch: true });
      if (cached) return cached;
      if (isPage) {
        const shell = await cache.match('./index.html');
        if (shell) return shell;
      }
      return new Response('Offline and not saved yet.', { status: 503, headers: { 'Content-Type': 'text/plain' } });
    }
  })());
});
