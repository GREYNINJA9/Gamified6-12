// STEM Village Offline Module
const Offline = (() => {
  let db = null;
  let liteMode = false;

  function isLiteMode() {
    return liteMode;
  }

  function toggleLiteMode() {
    liteMode = !liteMode;
    localStorage.setItem('sv_lite', liteMode ? '1' : '0');
    document.documentElement.classList.toggle('lite', liteMode);
  }

  function initDB() {
    // IndexedDB with stores: progress, activities, queue, meta, coins, badges, streaks, village, leaderboard, challenges, teacher_analytics, class_data, student_performance, weak_topics, difficulty_tracking
    return new Promise((resolve, reject) => {
      const req = window.indexedDB.open('sv_db', 4); // version bump for analytics
      req.onupgradeneeded = e => {
        db = e.target.result;
        if (!db.objectStoreNames.contains('progress')) db.createObjectStore('progress', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('activities')) db.createObjectStore('activities', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('queue')) db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
        if (!db.objectStoreNames.contains('meta')) db.createObjectStore('meta', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('coins')) db.createObjectStore('coins', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('badges')) db.createObjectStore('badges', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('streaks')) db.createObjectStore('streaks', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('village')) db.createObjectStore('village', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('leaderboard')) db.createObjectStore('leaderboard', { keyPath: 'key' });
        if (!db.objectStoreNames.contains('challenges')) db.createObjectStore('challenges', { keyPath: 'key' });
        // Teacher analytics stores
        if (!db.objectStoreNames.contains('teacher_analytics')) db.createObjectStore('teacher_analytics', { keyPath: 'type' });
        if (!db.objectStoreNames.contains('class_data')) db.createObjectStore('class_data', { keyPath: 'classId' });
        if (!db.objectStoreNames.contains('student_performance')) db.createObjectStore('student_performance', { keyPath: 'studentId' });
        if (!db.objectStoreNames.contains('weak_topics')) db.createObjectStore('weak_topics', { keyPath: 'classId' });
        if (!db.objectStoreNames.contains('difficulty_tracking')) db.createObjectStore('difficulty_tracking', { keyPath: 'id', autoIncrement: true });
      };
      req.onsuccess = e => { db = e.target.result; resolve(); };
      req.onerror = reject;
    });
  }

  function store(storeName, key, data) {
    if (!db) return;
    if (!db.objectStoreNames.contains(storeName)) return;
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put({ key, data });
  }

  function get(storeName, key, cb) {
    if (!db) return;
    if (!db.objectStoreNames.contains(storeName)) return;
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).get(key);
    req.onsuccess = () => cb(req.result ? req.result.data : null);
  }

  function queue(request) {
    if (!db) return;
    const tx = db.transaction('queue', 'readwrite');
    tx.objectStore('queue').add(request);
    updateStatusIndicator('Syncing');
  }

  function flushQueue() {
    if (!db || !navigator.onLine) return;
    const tx = db.transaction('queue', 'readwrite');
    const store = tx.objectStore('queue');
    const req = store.openCursor();
    req.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        fetch(cursor.value.url, cursor.value.opts).then(() => {
          store.delete(cursor.key);
          updateStatusIndicator('Synced');
        }).catch(() => updateStatusIndicator('Syncing'));
        cursor.continue();
      } else {
        updateStatusIndicator(navigator.onLine ? 'Online' : 'Offline');
      }
    };
  }

  function fetchWithQueue(url, opts) {
    return fetch(url, opts).catch(() => {
      if (!navigator.onLine) {
        queue({ url, opts });
        updateStatusIndicator('Syncing');
      }
    });
  }

  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/learning/gamified6-12/sw.js').then(reg => {
        reg.onupdatefound = () => {
          const installing = reg.installing;
          installing.onstatechange = () => {
            if (installing.state === 'installed') {
              // Optionally notify user
            }
          };
        };
      }).catch(() => {
        // Fallback or notify user
      });
    }
  }

  function updateStatusIndicator(status) {
    const el = document.getElementById('offline-status');
    if (!el) return;
    el.textContent = status || (navigator.onLine ? 'Online' : 'Offline');
    el.className = navigator.onLine ? 'text-green-600' : 'text-red-600';
  }

  function init() {
    liteMode = localStorage.getItem('sv_lite') === '1';
    if (liteMode) document.documentElement.classList.add('lite');
    registerSW();
    initDB().then(() => {
      window.addEventListener('online', flushQueue);
      window.addEventListener('online', () => updateStatusIndicator('Online'));
      window.addEventListener('offline', () => updateStatusIndicator('Offline'));
      updateStatusIndicator();
      flushQueue();
    });
  }

  // --- Analytics-specific functions ---
  function storeAnalytics(type, data) {
    if (!db) return;
    const tx = db.transaction('teacher_analytics', 'readwrite');
    tx.objectStore('teacher_analytics').put({ type, data });
  }

  function getClassData(classId) {
    return new Promise(resolve => {
      if (!db) return resolve(null);
      const tx = db.transaction('class_data', 'readonly');
      const req = tx.objectStore('class_data').get(classId);
      req.onsuccess = () => resolve(req.result ? req.result : null);
    });
  }

  function getStudentPerformance(studentId) {
    return new Promise(resolve => {
      if (!db) return resolve(null);
      const tx = db.transaction('student_performance', 'readonly');
      const req = tx.objectStore('student_performance').get(studentId);
      req.onsuccess = () => resolve(req.result ? req.result : null);
    });
  }

  function aggregatePerformanceData(filters) {
    // Example: aggregate all student_performance for a class
    return new Promise(resolve => {
      if (!db) return resolve([]);
      const tx = db.transaction('student_performance', 'readonly');
      const store = tx.objectStore('student_performance');
      const req = store.openCursor();
      const results = [];
      req.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
          // Optionally filter by classId, date, etc.
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  }

  function bulkStore(storeName, items) {
    if (!db) return;
    const tx = db.transaction(storeName, 'readwrite');
    for (const item of items) {
      tx.objectStore(storeName).put(item);
    }
  }

  function bulkGet(storeName) {
    return new Promise(resolve => {
      if (!db) return resolve([]);
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.openCursor();
      const results = [];
      req.onsuccess = e => {
        const cursor = e.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  }

  // Data anonymization (simple hash)
  function anonymize(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return 'u' + Math.abs(hash);
  }

  return {
    init,
    store,
    get,
    queue,
    flushQueue,
    fetchWithQueue,
    toggleLiteMode,
    isLiteMode,
    updateStatusIndicator,
    // Analytics
    storeAnalytics,
    getClassData,
    getStudentPerformance,
    aggregatePerformanceData,
    bulkStore,
    bulkGet,
    anonymize
  };
})();
