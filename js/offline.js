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

  // --- DB Initialization ---
  let dbReadyPromise = null;
  function initDB() {
    // IndexedDB with advanced analytics stores
    dbReadyPromise = new Promise((resolve, reject) => {
      const req = window.indexedDB.open('sv_db', 9); // version bump for assignments, submissions, files, notifications
      req.onupgradeneeded = e => {
        db = e.target.result;
        // --- Analytics Stores ---
        const stores = [
          ['progress', { keyPath: 'key' }],
          ['activities', { keyPath: 'key' }],
          ['queue', { keyPath: 'id', autoIncrement: true }],
          ['users', { keyPath: 'key' }],
          ['sessions', { keyPath: 'key' }],
          // ...existing code...
        ];
        for (const [name, opts] of stores) {
          if (!db.objectStoreNames.contains(name)) db.createObjectStore(name, opts);
        }
        // ...existing code...
      };
      req.onsuccess = e => {
        db = e.target.result;
        resolve(db);
      };
      req.onerror = e => reject(e);
  });
  return dbReadyPromise;
  }
  function getAsync(store, key) {
    return new Promise(res => {
      get(store, key, res);
    });
  }
  // ...existing code...
// --- Analytics Data Storage Methods ---
function storeActivityEvent(eventData) {
  if (!db) return;
  const tx = db.transaction('activity_events', 'readwrite');
  tx.objectStore('activity_events').add(eventData);
}
function getActivityEventsByTimeframe(classId, startDate, endDate, cb) {
  if (!db) return;
  const tx = db.transaction('activity_events', 'readonly');
  const store = tx.objectStore('activity_events');
  const req = store.openCursor();
  const results = [];
  req.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      const v = cursor.value;
      if ((!classId || v.classId === classId) && v.timestamp >= startDate && v.timestamp <= endDate) results.push(v);
      cursor.continue();
    } else {
      cb(results);
    }
  };
}
function bulkStorePerformanceData(performanceArray) {
  if (!db) return;
  const tx = db.transaction('student_performance', 'readwrite');
  for (const item of performanceArray) {
    tx.objectStore('student_performance').put(item);
  }
            // ...existing code...
  function updateWeakTopics(classId, weakTopicsData) {
    if (!db) return;
    const tx = db.transaction('weak_topics', 'readwrite');
    tx.objectStore('weak_topics').put({ classId, data: weakTopicsData, lastUpdated: Date.now() });
  }
  function getWeakTopicsHistory(classId, timeframe, cb) {
    if (!db) return;
    const tx = db.transaction('weak_topics', 'readonly');
    const store = tx.objectStore('weak_topics');
    const req = store.get(classId);
    req.onsuccess = () => {
      const val = req.result;
      if (!val) return cb([]);
      if (!timeframe) return cb(val.data);
      // Filter by timeframe
      cb(val.data.filter(t => t.lastUpdated >= Date.now() - timeframe));
    };
  }
  function compareWeakTopicsAcrossClasses(classIds, cb) {
    if (!db) return;
    const tx = db.transaction('weak_topics', 'readonly');
    const store = tx.objectStore('weak_topics');
    const req = store.openCursor();
    const results = [];
    req.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        if (classIds.includes(cursor.value.classId)) results.push(cursor.value);
        cursor.continue();
      } else {
        cb(results);
      }
    };
  }
  function getTopicPerformanceTimeline(classId, topicId, cb) {
    if (!db) return;
    // ...implementation for topic timeline...
    cb([]);
  }
  // --- Analytics Caching System ---
  function cacheAnalyticsResult(key, data, ttl) {
    if (!db) return;
    const tx = db.transaction('analytics_cache', 'readwrite');
    tx.objectStore('analytics_cache').put({ cacheKey: key, data, computedAt: Date.now(), expiresAt: Date.now() + (ttl || 3600)*1000 });
  }
  function getCachedAnalytics(key, cb) {
    if (!db) return cb(null);
    const tx = db.transaction('analytics_cache', 'readonly');
    const req = tx.objectStore('analytics_cache').get(key);
    req.onsuccess = () => {
      const val = req.result;
      if (!val || val.expiresAt < Date.now()) return cb(null);
      cb(val.data);
    };
  }
  function invalidateAnalyticsCache(pattern) {
    if (!db) return;
    const tx = db.transaction('analytics_cache', 'readwrite');
    const store = tx.objectStore('analytics_cache');
    const req = store.openCursor();
    req.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.key.includes(pattern)) store.delete(cursor.key);
        cursor.continue();
      }
    };
  }
  function getAnalyticsCacheStats(cb) {
    if (!db) return cb({});
    const tx = db.transaction('analytics_cache', 'readonly');
    const store = tx.objectStore('analytics_cache');
    const req = store.openCursor();
    let count = 0;
    req.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor) {
        count++;
        cursor.continue();
      } else {
        cb({ count });
      }
    };
  }
  // --- Data Export and Reporting ---
  function exportAnalyticsData(format, filters, options) {
    // ...implementation for export...
  }
  function generateAnalyticsReport(template, parameters) {
    // ...implementation for report generation...
  }
  function getAnalyticsDataForCSV(classId, metrics, timeframe, cb) {
    // ...implementation for CSV export...
    cb([]);
  }
  function anonymizeAnalyticsData(data, level) {
    // ...implementation for privacy...
    return data;
  }
  // --- Real-time Analytics Support ---
  function subscribeToActivityEvents(callback) {
    // ...event streaming...
  }
  function getRecentActivitySummary(classId, limit, cb) {
    if (!db) return cb([]);
    const tx = db.transaction('activity_events', 'readonly');
    const store = tx.objectStore('activity_events');
    const req = store.openCursor(null, 'prev');
    const results = [];
    req.onsuccess = e => {
      const cursor = e.target.result;
      if (cursor && results.length < (limit || 20)) {
        if (!classId || cursor.value.classId === classId) results.push(cursor.value);
        cursor.continue();
      } else {
        cb(results);
      }
    };
  }
  function getCurrentPerformanceSnapshot(classId, cb) {
    // ...implementation for real-time dashboard...
    cb({});
  }
  // ...existing code...

function deleteAssignment(assignmentId) {
  if (!db) return;
  const tx = db.transaction('assignments', 'readwrite');
  tx.objectStore('assignments').delete(assignmentId);
  // Cascade delete submissions/files/notifications
  const txSub = db.transaction('submissions', 'readwrite');
  const subStore = txSub.objectStore('submissions');
  const reqSub = subStore.openCursor();
  reqSub.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.assignmentId === assignmentId) subStore.delete(cursor.key);
      cursor.continue();
    }
  };
  const txFiles = db.transaction('assignment_files', 'readwrite');
  const fileStore = txFiles.objectStore('assignment_files');
  const reqFiles = fileStore.openCursor();
  reqFiles.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.assignmentId === assignmentId) fileStore.delete(cursor.key);
      cursor.continue();
    }
  };
  const txNotif = db.transaction('assignment_notifications', 'readwrite');
  const notifStore = txNotif.objectStore('assignment_notifications');
  const reqNotif = notifStore.openCursor();
  reqNotif.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.assignmentId === assignmentId) notifStore.delete(cursor.key);
      cursor.continue();
    }
  };
}

// --- Submission Management ---
function storeSubmission(submissionData) {
  if (!db) return;
  const tx = db.transaction('submissions', 'readwrite');
  tx.objectStore('submissions').put(submissionData);
}

function getSubmissionsByAssignment(assignmentId, cb) {
  if (!db) return;
  const tx = db.transaction('submissions', 'readonly');
  const store = tx.objectStore('submissions');
  const req = store.openCursor();
  const results = [];
  req.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.assignmentId === assignmentId) results.push(cursor.value);
      cursor.continue();
    } else {
      cb(results);
    }
  };
}

function getSubmissionsByStudent(studentId, cb) {
  if (!db) return;
  const tx = db.transaction('submissions', 'readonly');
  const store = tx.objectStore('submissions');
  const req = store.openCursor();
  const results = [];
  req.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.studentId === studentId) results.push(cursor.value);
      cursor.continue();
    } else {
      cb(results);
    }
  };
}

function updateSubmissionGrade(submissionId, grade, feedback) {
  if (!db) return;
  const tx = db.transaction('submissions', 'readwrite');
  const store = tx.objectStore('submissions');
  const req = store.get(submissionId);
  req.onsuccess = () => {
    if (req.result) {
      req.result.grade = grade;
      req.result.feedback = feedback;
      store.put(req.result);
    }
  };
}

// --- File Storage System ---
function storeAssignmentFile(fileData, metadata) {
  if (!db) return;
  const tx = db.transaction('assignment_files', 'readwrite');
  tx.objectStore('assignment_files').put({ ...metadata, fileData });
}

function getAssignmentFile(fileId, cb) {
  if (!db) return;
  const tx = db.transaction('assignment_files', 'readonly');
  const store = tx.objectStore('assignment_files');
  const req = store.get(fileId);
  req.onsuccess = () => cb(req.result ? req.result.fileData : null);
}

// --- Assignment Analytics Storage ---
function storeAssignmentAnalytics(assignmentId, analyticsData) {
  if (!db) return;
  const tx = db.transaction('teacher_analytics', 'readwrite');
  tx.objectStore('teacher_analytics').put({ type: 'assignment_' + assignmentId, data: analyticsData });
}

// --- Queue System Enhancement ---
function queueAssignmentOp(op) {
  if (!db) return;
  const tx = db.transaction('queue', 'readwrite');
  tx.objectStore('queue').add(op);
}

// --- Notification Storage ---
function storeAssignmentNotification(notification) {
  if (!db) return;
  const tx = db.transaction('assignment_notifications', 'readwrite');
  tx.objectStore('assignment_notifications').put(notification);
}

function getAssignmentNotifications(userId, cb) {
  if (!db) return;
  const tx = db.transaction('assignment_notifications', 'readonly');
  const store = tx.objectStore('assignment_notifications');
  const req = store.openCursor();
  const results = [];
  req.onsuccess = e => {
    const cursor = e.target.result;
    if (cursor) {
      if (cursor.value.userId === userId) results.push(cursor.value);
      cursor.continue();
    } else {
      cb(results);
    }
  };
}

// --- Data Migration and Cleanup ---
function migrateToV7() {
  // Data migration logic for v7 upgrade
  // ...
}

function cleanupExpiredAssignments() {
  // Remove expired assignments
  // ...
}

function exportAssignmentData() {
  // Export assignments for backup
  // ...
}

function anonymizeAssignmentData() {
  // Anonymize assignment data for privacy
  // ...
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
      navigator.serviceWorker.register('/sw.js').then(reg => {
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

  // --- User/session helpers (global, non-ESM) ---
  function storeUser(email, userData) {
    return new Promise((resolve, reject) => {
      if (!db) return reject(new Error('DB not initialized'));
      const tx = db.transaction('users', 'readwrite');
      const s = tx.objectStore('users');
      s.put({ key: email, data: userData });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  function getUser(email) {
    return new Promise((resolve, reject) => {
      if (!db) return resolve(null);
      const tx = db.transaction('users', 'readonly');
      const s = tx.objectStore('users');
      const req = s.get(email);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => reject(req.error);
    });
  }

  function storeSession(token, sessionData) {
    return new Promise((resolve, reject) => {
      if (!db) return reject(new Error('DB not initialized'));
      const tx = db.transaction('sessions', 'readwrite');
      const s = tx.objectStore('sessions');
      s.put({ key: token, data: sessionData });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  function getSession(token) {
    return new Promise((resolve, reject) => {
      if (!db) return resolve(null);
      const tx = db.transaction('sessions', 'readonly');
      const s = tx.objectStore('sessions');
      const req = s.get(token);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => reject(req.error);
    });
  }

  function deleteSession(token) {
    return new Promise((resolve, reject) => {
      if (!db) return resolve();
      const tx = db.transaction('sessions', 'readwrite');
      const s = tx.objectStore('sessions');
      s.delete(token);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }
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
    // Analytics
    storeActivityEvent,
    getActivityEventsByTimeframe,
    bulkStorePerformanceData,
    getAggregatedPerformanceData,
    updateWeakTopics,
    getWeakTopicsHistory,
    compareWeakTopicsAcrossClasses,
    getTopicPerformanceTimeline,
    cacheAnalyticsResult,
    getCachedAnalytics,
    invalidateAnalyticsCache,
    getAnalyticsCacheStats,
    exportAnalyticsData,
    generateAnalyticsReport,
    getAnalyticsDataForCSV,
    anonymizeAnalyticsData,
    subscribeToActivityEvents,
    getRecentActivitySummary,
    getCurrentPerformanceSnapshot,
    getActiveStudentsCount,
    getDB,
    getAsync,
    initDB,
    isLiteMode,
    toggleLiteMode,
    init,
    store,
    get,
    queue,
    flushQueue,
    fetchWithQueue,
    updateStatusIndicator,
    // Auth/session
    storeUser,
    getUser,
    storeSession,
    getSession,
    deleteSession,
    // Analytics
    storeAnalytics,
    getClassData,
    getStudentPerformance,
    aggregatePerformanceData,
    bulkStore,
    bulkGet,
    anonymize,
    // Assignment system
    storeAssignment,
    getAssignmentsByTeacher,
    getAssignmentsByStudent,
    updateAssignmentStatus,
    deleteAssignment,
    storeSubmission,
    getSubmissionsByAssignment,
    getSubmissionsByStudent,
    updateSubmissionGrade,
    storeAssignmentFile,
    getAssignmentFile,
    storeAssignmentAnalytics,
    queueAssignmentOp,
    storeAssignmentNotification,
    getAssignmentNotifications,
    migrateToV7,
    cleanupExpiredAssignments,
    exportAssignmentData
  };
}
})();

// Expose globally for legacy usage
try { window.Offline = Offline; } catch (_) {}
export default Offline;
