// Service Worker for STEM Village Next.js
const CACHE_VERSION = 'sv-v4';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const CDN_CACHE = `cdn-${CACHE_VERSION}`;

// Only cache assets that actually live under /public
const SHELL_ASSETS = [
  new URL('offline.html', self.registration.scope).toString(),
  new URL('manifest.json', self.registration.scope).toString(),
  new URL('favicon.ico', self.registration.scope).toString(),
  new URL('logo-white.png', self.registration.scope).toString(),
  new URL('avatar-placeholder.png', self.registration.scope).toString()
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(async cache => {
      await Promise.all(SHELL_ASSETS.map(async u => {
        try { await cache.add(u); } catch (_) { /* ignore missing */ }
      }));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    const valid = new Set([SHELL_CACHE, RUNTIME_CACHE, CDN_CACHE]);
    await Promise.all(keys.filter(k => !valid.has(k)).map(k => caches.delete(k)));
  })());
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Bypass cache for non-GET requests
  if (req.method !== 'GET') {
    return event.respondWith(fetch(req));
  }

  // Navigation requests (HTML pages)
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const resp = await fetch(req);
        if (resp && resp.ok) {
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(req, resp.clone());
          return resp;
        }
        throw new Error('Network error');
      } catch {
        return caches.match(new URL('offline.html', self.registration.scope).toString());
      }
    })());
    return;
  }

  // Static assets (cache-first)
  if (/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|eot|mp3|mp4|webm|json)$/i.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const resp = await fetch(req);
        if (resp && resp.ok) cache.put(req, resp.clone());
        return resp;
      } catch {
        // Fallback to any cached shell asset or just fail gracefully
        return caches.match(new URL('offline.html', self.registration.scope).toString()) || Response.error();
      }
    })());
    return;
  }

  // CDN resources (stale-while-revalidate)
  if (/fonts\.|cdn\.|unpkg\.|jsdelivr\./.test(url.hostname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CDN_CACHE);
      const cached = await cache.match(req);
      const fetchAndCache = fetch(req).then(resp => {
        if (resp && resp.ok) cache.put(req, resp.clone());
        return resp;
      });
      return cached ? cached : fetchAndCache;
    })());
    return;
  }

  // API requests (network-first)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith((async () => {
      try {
        return await fetch(req);
      } catch {
        return new Response(JSON.stringify({ error: 'Offline', status: 503 }), { status: 503, headers: { 'Content-Type': 'application/json' } });
      }
    })());
    return;
  }

  // Default: network-first, fallback to cache
  event.respondWith((async () => {
    try {
      return await fetch(req);
    } catch {
      return caches.match(req);
    }
  })());
});
