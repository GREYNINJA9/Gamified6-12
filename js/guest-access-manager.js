// GuestAccessManager: Anonymous guest access and local data management
// Integrates with offline.js and gamification-manager.js

class GuestAccessManager {
    init() {
        // Any guest access UI setup if needed
    }
    constructor() {
        this.sessionId = null;
    }

    createGuestSession() {
        // Generate unique guest session ID
        this.sessionId = 'guest_' + Date.now() + '_' + Math.floor(Math.random()*10000);
        // Store session in offline.js
        Offline.store('guest_sessions', this.sessionId, { created: Date.now() });
        return this.sessionId;
    }

    getGuestData(key) {
        // Retrieve guest data from offline.js
        return new Promise(resolve => {
            Offline.get('guest_progress', this.sessionId, resolve);
        });
    }

    storeGuestProgress(data) {
        // Store guest progress in offline.js
        Offline.store('guest_progress', this.sessionId, data);
    }

    async migrateToRegistered(credentials) {
        const guestSession = localStorage.getItem('sv_guest_session');
        if (!guestSession) return;
        // Example: migrate guest_progress to progress store
        const db = Offline.getDB();
        const tx = db.transaction(['guest_progress', 'progress', 'guest_sessions', 'gamification'], 'readwrite');
        const guestProgressStore = tx.objectStore('guest_progress');
        const progressStore = tx.objectStore('progress');
        const gamificationStore = tx.objectStore('gamification');
        // Migrate progress
        const guestProgressReq = guestProgressStore.get(guestSession);
        guestProgressReq.onsuccess = async () => {
            const guestProgress = guestProgressReq.result;
            if (guestProgress) {
                await progressStore.put({ key: credentials.email, data: guestProgress.data });
            }
            // Migrate gamification
            const guestGamificationReq = gamificationStore.get(guestSession);
            guestGamificationReq.onsuccess = async () => {
                const guestGamification = guestGamificationReq.result;
                if (guestGamification) {
                    await gamificationStore.put({ key: credentials.email, data: guestGamification.data });
                }
                // Cleanup guest data
                await guestProgressStore.delete(guestSession);
                await gamificationStore.delete(guestSession);
                localStorage.removeItem('sv_guest_session');
                // Log migration
                console.log('Guest data migrated to registered user:', credentials.email);
            };
        };
    }

    async exportGuestData() {
        const guestSession = localStorage.getItem('sv_guest_session');
        if (!guestSession) return null;
        const db = Offline.getDB();
        const tx = db.transaction(['guest_progress', 'gamification'], 'readonly');
        const guestProgressStore = tx.objectStore('guest_progress');
        const gamificationStore = tx.objectStore('gamification');
        const guestProgressReq = guestProgressStore.get(guestSession);
        guestProgressReq.onsuccess = () => {
            const guestProgress = guestProgressReq.result;
            const guestGamificationReq = gamificationStore.get(guestSession);
            guestGamificationReq.onsuccess = () => {
                const guestGamification = guestGamificationReq.result;
                return JSON.stringify({ progress: guestProgress, gamification: guestGamification });
            };
        };
    }

    async cleanupOldSessions() {
        const db = Offline.getDB();
        const tx = db.transaction(['guest_sessions', 'guest_progress'], 'readwrite');
        const guestSessionsStore = tx.objectStore('guest_sessions');
        const guestProgressStore = tx.objectStore('guest_progress');
        const now = Date.now();
        const thirtyDays = 30 * 24 * 60 * 60 * 1000;
        const sessionsReq = guestSessionsStore.getAll();
        sessionsReq.onsuccess = () => {
            const sessions = sessionsReq.result;
            for (const session of sessions) {
                if (session.data.created && now - session.data.created > thirtyDays) {
                    guestSessionsStore.delete(session.key);
                    guestProgressStore.delete(session.key);
                }
            }
        };
    }
    hasGuestData() {
        const guestSession = localStorage.getItem('sv_guest_session');
        return !!guestSession;
    }
}

window.GuestAccessManager = new GuestAccessManager();
