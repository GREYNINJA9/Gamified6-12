const CACHE_VERSION = 'sv-v2';
const SHELL_CACHE = `shell-${CACHE_VERSION}`;
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const CDN_CACHE = `cdn-${CACHE_VERSION}`;

const SHELL_ASSETS = [
  '/learning/gamified6-12/index.html',
  '/learning/gamified6-12/dashboard.html',
  '/learning/gamified6-12/teacher-dashboard.html',
  '/learning/gamified6-12/login.html',
  '/learning/gamified6-12/teacher-login.html',
  '/learning/gamified6-12/games.html',
  '/learning/gamified6-12/offline.html',
  '/learning/gamified6-12/js/i18n.js',
  '/learning/gamified6-12/js/offline.js',
  '/learning/gamified6-12/js/game-engine.js',
  '/learning/gamified6-12/js/game-progression.js',
  '/learning/gamified6-12/js/low-poly-renderer.js',
  '/learning/gamified6-12/js/games/physics-puzzles.js',
  '/learning/gamified6-12/js/games/math-escape-rooms.js',
  '/learning/gamified6-12/js/games/chemistry-simulations.js',
  '/learning/gamified6-12/js/gamification-manager.js',
  '/learning/gamified6-12/js/village-game.js',
  '/learning/gamified6-12/js/leaderboard-system.js',
  '/learning/gamified6-12/js/daily-challenge-system.js',
  '/learning/gamified6-12/js/ar.js',
  '/learning/gamified6-12/js/career.js',
  '/learning/gamified6-12/js/hero.js',
  '/learning/gamified6-12/js/parent.js',
  '/learning/gamified6-12/js/teacher-analytics.js',
  '/learning/gamified6-12/js/csv-exporter.js',
  '/learning/gamified6-12/js/adaptive-difficulty-tracker.js',
  '/css/main.css',
  '/css/games.css',
  '/css/gamification.css',
  '/learning/gamified6-12/css/teacher-analytics.css',
  '/static/logo-white.png',
  '/static/avatar-placeholder.png',
  '/static/favicon.ico'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE).then(cache => cache.addAll(SHELL_ASSETS))
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
  
  // HTML navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          // Optionally cache
          return resp;
        })
        .catch(() => caches.match(event.request).then(resp => resp || caches.match('/learning/gamified6-12/offline.html')))
    );
    return;
  }
  
  // Gamification assets (village, badges, confetti, etc)
  if (/\/gamified6-12\/(village|badges|confetti|leaderboard|challenge)\/.+\.(png|jpg|jpeg|svg|json)$/.test(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache =>
        cache.match(event.request).then(resp => resp || fetch(event.request).then(netResp => {
          cache.put(event.request, netResp.clone());
          return netResp;
        }).catch(() => caches.match('/static/logo-white.png')))
      )
    );
    return;
  }
  
  // Game assets (sprites, sounds, level data)
  if (/\/games\/.+\.(png|jpg|jpeg|svg|mp3|json)$/.test(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache =>
        cache.match(event.request).then(resp => resp || fetch(event.request).then(netResp => {
          cache.put(event.request, netResp.clone());
          return netResp;
        }).catch(() => caches.match('/static/logo-white.png')))
      )
    );
    return;
  }
  

  // Analytics data and CSV exports (runtime cache)
  if (/teacher_analytics|class_data|student_performance|weak_topics|difficulty_tracking|\.csv$/.test(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache =>
        cache.match(event.request).then(resp => resp || fetch(event.request).then(netResp => {
          cache.put(event.request, netResp.clone());
          return netResp;
        }))
      )
    );
    return;
  }

  // Static assets (HTML, CSS, JS, images)
  if (SHELL_ASSETS.some(asset => url.includes(asset))) {
    event.respondWith(
      caches.match(event.request).then(resp => resp || fetch(event.request).then(netResp => {
        caches.open(SHELL_CACHE).then(cache => cache.put(event.request, netResp.clone()));
        return netResp;
      }).catch(() => caches.match('/learning/gamified6-12/offline.html')))
    );
    return;
  }
  
  // CDN dependencies
  if (/cdn\.tailwindcss\.com|unpkg\.com|cdn\.jsdelivr\.net/.test(url)) {
    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(event.request).then(resp => resp || fetch(event.request).then(netResp => {
          cache.put(event.request, netResp.clone());
          return netResp;
        }))
      )
    );
    return;
  }
  
  // External images (static.photos)
  if (/static\.photos/.test(url)) {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(cache =>
        cache.match(event.request).then(resp => resp || fetch(event.request).then(netResp => {
          cache.put(event.request, netResp.clone());
          return netResp;
        }).catch(() => caches.match('/static/avatar-placeholder.png')))
      )
    );
    return;
  }
  
  // API calls: network first, fallback to queue/cached
  if (url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Default: cache first, fallback to offline.html for HTML
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).catch(() => {
      if (event.request.destination === 'document') {
        return caches.match('/learning/gamified6-12/offline.html');
      }
    }))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SYNC_QUEUE') {
    // Handle sync queue items here (stub)
    // Could postMessage to client after sync
  }
});