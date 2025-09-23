// Comprehensive Teacher Analytics System
class TeacherAnalytics {
    // --- Subject-wise Activity Frequency ---
    async getSubjectActivityFrequency(classId = null, limit = 100) {
        // Fetch recent activity events
        const events = await Offline.bulkGet('activity_events');
        // Optionally filter by classId, support 'all'
        let filtered = events;
        if (classId && classId !== 'all') filtered = events.filter(ev => ev.classId === classId);
        // Count frequency per subject
        const freq = {};
        filtered.slice(-limit).forEach(ev => {
            if (ev.subject) freq[ev.subject] = (freq[ev.subject] || 0) + 1;
        });
        return freq;
    }
    // --- Recent Activity API for Dashboard ---
    async getRecentActivity(limit = 20, classId = null) {
        // Fetch recent activity events from Offline
        const events = await Offline.bulkGet('activity_events');
        // Optionally filter by classId
        const filtered = classId ? events.filter(ev => ev.classId === classId) : events;
        // Sort by timestamp descending
        filtered.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        // Map to dashboard format
        return filtered.slice(0, limit).map(ev => ({
            studentId: ev.studentId,
            studentName: ev.studentName,
            type: ev.activityType || ev.type,
            subject: ev.subject,
            score: ev.score,
            timeSpent: ev.timeSpent || ev.duration,
            difficulty: ev.difficulty,
            classId: ev.classId,
            timestamp: ev.timestamp
        }));
    }
    constructor() {
        this.db = null;
        this.cache = {};
        this.activityListeners = [];
        this._initEventListeners();
    }

    async init() {
        if (!window.Offline) throw new Error('Offline module required');
        // Offline.init() should be called elsewhere; getDB is now promise-based
        this.db = await Offline.getDB();
        this.cache = {};
    }

    // --- Real-time Activity Event System ---
    _initEventListeners() {
        window.addEventListener('sv-activity', e => {
            this.trackStudentActivity(e.detail);
            // Invalidate analytics cache for affected class
            const classId = e.detail.classId || 'all';
            this.invalidateAnalyticsCache(classId);
            this.refreshDashboards();
        });
    }
    subscribeToActivityEvents(cb) {
        this.activityListeners.push(cb);
    }
    emitActivityEvent(activityData) {
        window.dispatchEvent(new CustomEvent('sv-activity', { detail: activityData }));
        this.activityListeners.forEach(cb => cb(activityData));
    }

    // --- Core Analytics Engine ---
    async aggregateClassData(classId) {
        const classData = await Offline.getClassData(classId);
        const students = classData?.students || [];
        const results = [];
        for (const studentId of students) {
            const perf = await this.getStudentAnalytics(studentId);
            results.push(perf);
        }
        return results;
    }
    async getStudentAnalytics(studentId) {
        const perf = await Offline.getStudentPerformance(studentId);
        const coins = await Offline.getAsync('coins', studentId);
        const badges = await Offline.getAsync('badges', studentId);
        const streaks = await Offline.getAsync('streaks', studentId);
        const activities = await Offline.getAsync('activities', studentId);
        return { studentId, perf, coins, badges, streaks, activities };
    }
    async getClassPerformance(classId) {
        const data = await this.aggregateClassData(classId);
        // Calculate averages, trends, distributions
        let totalScore = 0, count = 0, trends = [], subjectDist = {};
        for (const s of data) {
            if (s.perf && s.perf.scores) {
                for (const subj in s.perf.scores) {
                    subjectDist[subj] = subjectDist[subj] || [];
                    subjectDist[subj].push(s.perf.scores[subj]);
                    totalScore += s.perf.scores[subj];
                    count++;
                }
            }
        }
        let avg = count ? (totalScore / count) : 0;
        return { avg, trends, subjectDist, raw: data };
    }
    async getWeakTopics(classId) {
        // Check cache first
        const cacheKey = `weakTopics_${classId}`;
        const cached = await this.getCachedAnalytics(cacheKey);
        if (cached) return cached;

        // Aggregate per-topic performance from student_performance and quiz/game data
        const perfArr = await Offline.aggregatePerformanceData({ classId });
        let topicStats = {};
        for (const perf of perfArr) {
            if (perf.topicScores) {
                for (const topic in perf.topicScores) {
                    let arr = topicStats[topic] = topicStats[topic] || [];
                    arr.push(perf.topicScores[topic]);
                }
            }
            // Optionally include quiz/game breakdowns
            if (perf.quizHistory) {
                for (const quiz of perf.quizHistory) {
                    if (quiz.topic) {
                        let arr = topicStats[quiz.topic] = topicStats[quiz.topic] || [];
                        arr.push(quiz.score);
                    }
                }
            }
        }
        let weak = [];
        for (const topic in topicStats) {
            let vals = topicStats[topic];
            let avg = vals.reduce((a,b)=>a+b,0)/vals.length;
            let failRate = vals.filter(v => v < 50).length / vals.length;
            if (avg < 60 || failRate > 0.4) weak.push({ topic, avgScore: avg, count: vals.length, failRate });
        }
        // Cache result in teacher_analytics or analytics_cache
        await Offline.cacheAnalyticsResult(cacheKey, weak, 1800); // 30 min TTL
        return weak;
    }
    async getAdaptiveDifficultyData(classId) {
        // Query difficulty_tracking store
        return await Offline.bulkGet('difficulty_tracking');
    }
    async getStudentEngagement(studentId) {
        // Analyze login/activity/coin/streak data
        const perf = await Offline.getStudentPerformance(studentId);
        if (!perf) return 0;
        let score = 0;
        if (perf.loginCount) score += perf.loginCount * 2;
        if (perf.activities) score += perf.activities.length;
        if (perf.streak) score += perf.streak * 3;
        return score;
    }
    async predictAtRiskStudents(classId) {
        // Trend analysis to find at-risk students
        const data = await this.aggregateClassData(classId);
        return data.filter(s => s.perf && s.perf.trend && s.perf.trend < 0);
    }
    async exportAnalyticsData(type, filters) {
        // Prepare structured data for CSVExporter
        if (type === 'student') {
            return await this.aggregateClassData(filters.classId);
        }
        if (type === 'weakTopics') {
            return await this.getWeakTopics(filters.classId);
        }
        // ...other types...
        return [];
    }
    async storeAnalytics(type, data) {
        return Offline.storeAnalytics(type, data);
    }

    // --- Real-time Activity Tracking ---
    async trackStudentActivity(activityData) {
        // Store event in IndexedDB
        if (Offline.storeActivityEvent) Offline.storeActivityEvent(activityData);
        // Optionally update cache
        this.cache.lastActivity = activityData;
    }
    async updateActivityTable() {
        // Fetch recent activity and update dashboard table
        const events = await Offline.getRecentActivitySummary?.('current', 20) || [];
        // ...update DOM or notify listeners...
    }
    refreshDashboards() {
        // Notify all listeners to refresh charts/tables
        this.activityListeners.forEach(cb => cb('refresh'));
    }

    // --- Chart Generation ---
    async generateSubjectFrequencyChart() {
        // Return subject frequency data for chart
        const perfArr = await Offline.aggregatePerformanceData({});
        let freq = {};
        for (const perf of perfArr) {
            if (perf.subject) freq[perf.subject] = (freq[perf.subject] || 0) + 1;
        }
        return freq;
    }
    async generatePerformanceTrendChart(classId = null) {
        // Use cache for performance trend
        const cacheKey = `perfTrend_${classId || 'all'}`;
        let cached = await this.getCachedAnalytics(cacheKey);
        if (cached) return cached;
        const perfArr = await Offline.aggregatePerformanceData(classId && classId !== 'all' ? { classId } : {});
        let trend = perfArr.map(p => p.trend || 0);
        await this.cacheAnalyticsResult(cacheKey, trend, 900); // 15 min TTL
        return trend;
    }
    async generateEngagementChart(classId = null) {
        // Use cache for engagement chart
        const cacheKey = `engagement_${classId || 'all'}`;
        let cached = await this.getCachedAnalytics(cacheKey);
        if (cached) return cached;
        const perfArr = await Offline.aggregatePerformanceData(classId && classId !== 'all' ? { classId } : {});
        let engagement = perfArr.map(p => p.engagement || 0);
        await this.cacheAnalyticsResult(cacheKey, engagement, 900);
        return engagement;
    }
    async generateDifficultyProgressionChart(classId = null) {
        // Use cache for difficulty progression
        const cacheKey = `difficulty_${classId || 'all'}`;
        let cached = await this.getCachedAnalytics(cacheKey);
        if (cached) return cached;
        const arr = await Offline.bulkGet('difficulty_tracking');
        let filtered = (classId && classId !== 'all') ? arr.filter(d => d.classId === classId) : arr;
        await this.cacheAnalyticsResult(cacheKey, filtered, 900);
        return filtered;
    }

    // --- Weak Topics Analysis ---
    async analyzeWeakTopics(classId) {
        // Algorithm to analyze quiz/game performance by topic
        return await this.getWeakTopics(classId);
    }

    // --- Report Generation ---
    async exportAnalyticsData(type, filters) {
        // Prepare data for CSVExporter
        if (type === 'student') return await this.aggregateClassData(filters.classId);
        if (type === 'weakTopics') return await this.getWeakTopics(filters.classId);
        return [];
    }
    async generateComprehensiveReport(classId, dateRange) {
        // Aggregate all analytics for report
        const perf = await this.getClassPerformance(classId);
        const weak = await this.getWeakTopics(classId);
        return { perf, weak };
    }

    // --- Data Integration Methods ---
    async syncWithGamificationData() {
        // Pull coins, badges, streaks from GamificationManager
        if (window.GamificationManager) {
            // ...integration logic...
        }
    }
    async aggregateQuizData() {
        // Process quiz results from DailyChallengeSystem
        if (window.DailyChallengeSystemInstance) {
            // ...integration logic...
        }
    }
    async processAssignmentData() {
        // Include assignment performance in analytics
        // ...integration logic...
    }
    async updateStudentPerformanceCache() {
        // Maintain up-to-date performance summaries
        // ...caching logic...
    }

    // --- Caching and Performance ---
    async cacheAnalyticsResult(key, data, ttl=3600) {
        this.cache[key] = { data, expires: Date.now() + ttl*1000 };
    }
    async getCachedAnalytics(key) {
        const c = this.cache[key];
        if (c && c.expires > Date.now()) return c.data;
        return null;
    }
    async invalidateAnalyticsCache(pattern) {
        for (const k in this.cache) if (k.includes(pattern)) delete this.cache[k];
        // Also invalidate persistent cache in Offline
        if (Offline.invalidateAnalyticsCache) Offline.invalidateAnalyticsCache(pattern);
    }
}

window.TeacherAnalytics = new TeacherAnalytics();
