// Service worker: app fast open + offline. Version badalne ki zaroorat nahi.
const C = 'geomap-v1';
const SHELL = ['./', 'index.html', 'manifest.json', 'lib/leaflet.js', 'lib/leaflet.css', 'lib/jszip.min.js', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => e.waitUntil(caches.open(C).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))).then(() => clients.claim())));

// cached foran dikhao, background me naya check karo (ETag/Last-Modified se)
async function swr(e, notify) {
  const r = e.request, c = await caches.open(C), old = await c.match(r, { ignoreSearch: true });
  const net = fetch(r, { cache: 'no-cache' }).then(async n => {
    if (n.ok) {
      if (notify && old) {
        const v = x => x.headers.get('etag') || x.headers.get('last-modified');
        if (v(old) !== v(n)) (await self.clients.matchAll()).forEach(k => k.postMessage({ t: 'upd', u: r.url }));
      }
      await c.put(r, n.clone());
    }
    return n;
  }).catch(() => null);
  e.waitUntil(net);
  return old || (await net) || Response.error();
}

self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return;      // map tiles browser khud handle karta hai
  if (u.pathname.endsWith('mouza-list.txt')) {                          // list hamesha taza (network first)
    e.respondWith(fetch(r, { cache: 'no-cache' }).then(n => { const k = n.clone(); caches.open(C).then(c => c.put(r, k)); return n; }).catch(() => caches.match(r)));
    return;
  }
  e.respondWith(swr(e, u.pathname.includes('/data/')));
});
