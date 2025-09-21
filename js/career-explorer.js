// CareerExplorer: STEM career guidance and inspiration
class CareerExplorer {
    constructor() {
        this.careers = [
            { id: 'software-engineer', name: 'Software Engineer', desc: 'Builds and maintains software systems.' },
            { id: 'data-scientist', name: 'Data Scientist', desc: 'Analyzes data to solve problems.' },
            { id: 'civil-engineer', name: 'Civil Engineer', desc: 'Designs and builds infrastructure.' },
            { id: 'mechanical-engineer', name: 'Mechanical Engineer', desc: 'Works with machines and engines.' },
            { id: 'environmental-scientist', name: 'Environmental Scientist', desc: 'Studies environment and solutions.' },
            { id: 'ai-ml-engineer', name: 'AI/ML Engineer', desc: 'Develops artificial intelligence systems.' }
        ];
    }
    getCareerPath(careerId) {
        const career = this.careers.find(c => c.id === careerId);
        if (!career) return null;
        return { ...career, path: ['Grade 6', 'Grade 10', 'Entrance Exam', 'Degree', 'Internship', 'Job'] };
    }
    takeCareerAssessment(studentId) {
        // Mock 5-question quiz
        const result = {
            studentId,
            answers: [1, 2, 3, 2, 1],
            recommendedCareer: this.careers[Math.floor(Math.random() * this.careers.length)].id
        };
        try {
            Offline.store('career_assessments', studentId, result);
            GamificationManager.awardBadge('career-explorer-1');
            return result;
        } catch (e) {
            return null;
        }
    }
    getLocalHeroes(region) {
        // Stub: return Odisha heroes
        return ['Dr. A.P.J. Abdul Kalam', 'Kiran Mazumdar-Shaw', 'Tessy Thomas'];
    }
    getRequiredSubjects(careerId) {
        return ['Math', 'Science', 'English'];
    }
    trackCareerInterest(careerId) {
        GamificationManager.awardCoins(10, { reason: 'career_interest', id: careerId });
    }
}
window.CareerExplorer = new CareerExplorer();
