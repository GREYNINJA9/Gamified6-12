// Service Worker for STEM Village Next.js
const CACHE_VERSION = 'sv-v3';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const CDN_CACHE = `cdn-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  '/offline.html',
  '/js/i18n.js',
  '/js/offline.js',
  '/js/game-engine.js',
  '/js/game-progression.js',
  '/js/low-poly-renderer.js',
  '/js/games/physics-puzzles.js',
  '/js/games/math-escape-rooms.js',
  '/js/games/chemistry-simulations.js',
  '/js/gamification-manager.js',
  '/js/village-game.js',
  '/js/leaderboard-system.js',
  '/js/daily-challenge-system.js',
  '/js/teacher-analytics.js',
  '/js/csv-exporter.js',
  '/js/adaptive-difficulty-tracker.js',
  '/css/gamification.css',
  '/css/accessibility.css',
  '/css/games.css',
  '/logo-white.png',
  '/avatar-placeholder.png',
  '/favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => {
      return cache.addAll(SHELL_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => ![SHELL_CACHE, RUNTIME_CACHE, CDN_CACHE].includes(k)).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  // Next.js pages and API routes
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          if (resp.status === 200) {
            caches.open(RUNTIME_CACHE).then(cache => {
              cache.put(event.request, resp.clone());
            });
          }
          return resp;
        })
        .catch(() => caches.match(event.request).then(resp => resp || caches.match('/offline.html')))
    );
    return;
  }
  // ...existing code for other asset types...
});
