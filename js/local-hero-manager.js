// LocalHeroManager: Inspirational STEM hero stories
class LocalHeroManager {
    constructor() {
        this.heroes = [
            { id: 'kalam', name: 'Dr. A.P.J. Abdul Kalam', story: 'Scientist-President from rural Tamil Nadu.', audio: '/audio/kalam.mp3' },
            { id: 'shaw', name: 'Kiran Mazumdar-Shaw', story: 'Biocon founder and biotech leader.', audio: '/audio/shaw.mp3' },
            { id: 'tessy', name: 'Tessy Thomas', story: 'Missile Woman of India.', audio: '/audio/tessy.mp3' }
        ];
    }
    getFeaturedHero() {
        return this.heroes[0];
    }
    getHeroStory(heroId) {
        return this.heroes.find(h => h.id === heroId) || null;
    }
    playHeroAudio(heroId) {
        const hero = this.getHeroStory(heroId);
        if (!hero) return false;
        let audio = document.getElementById('hero-audio');
        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'hero-audio';
            document.body.appendChild(audio);
        }
        audio.src = hero.audio;
        audio.play();
        return true;
    }
    submitReflection(heroId, reflection, studentId) {
        try {
            Offline.bulkStore('hero_reflections', [{ heroId, reflection, studentId, ts: Date.now() }]);
            GamificationManager.awardBadge('hero-reflection');
            return true;
        } catch (e) {
            return false;
        }
    }
    getWeeklyHero() {
        return this.heroes[Math.floor(Math.random() * this.heroes.length)];
    }
}
window.LocalHeroManager = new LocalHeroManager();
