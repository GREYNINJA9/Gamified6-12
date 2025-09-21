// STEM Village i18n core
const i18n = (() => {
  // Dictionaries: Add all static text keys for all pages here
  const dict = {
  en: {
  // Teacher Analytics
  'analytics.dashboard': 'Analytics Dashboard',
  'analytics.metrics': 'Performance Metrics',
  'analytics.classComparison': 'Class Comparison',
  'analytics.exportReports': 'Export Reports',
  'analytics.dateRange': 'Date Range',
  'analytics.filterOptions': 'Filter Options',
  'analytics.dataViz': 'Data Visualization',
  'analytics.studentAnalytics': 'Student Analytics',
  'analytics.performanceTrends': 'Performance Trends',
  'analytics.subjectComparison': 'Subject Comparison',
  'analytics.engagementLevels': 'Engagement Levels',
  'analytics.difficultyProgression': 'Difficulty Progression',
  'analytics.completionRates': 'Completion Rates',
  'analytics.learningCurves': 'Learning Curves',
  'analytics.activityPatterns': 'Activity Patterns',
  'analytics.scoreDistribution': 'Score Distribution',
  'analytics.exportCSV': 'Export to CSV',
  'analytics.downloadReport': 'Download Report',
  'analytics.selectDateRange': 'Select Date Range',
  'analytics.chooseMetrics': 'Choose Metrics',
  'analytics.generateReport': 'Generate Report',
  'analytics.exportComplete': 'Export Complete',
  'analytics.exportFailed': 'Export Failed',
  'analytics.customReport': 'Custom Report',
  'analytics.reportType': 'Report Type',
  'analytics.fileDownloaded': 'File Downloaded',
  'analytics.weakTopics': 'Weak Topics',
  'analytics.strugglingStudents': 'Struggling Students',
  'analytics.interventionNeeded': 'Intervention Needed',
  'analytics.conceptDifficulty': 'Concept Difficulty',
  'analytics.remedialActivities': 'Remedial Activities',
  'analytics.progressTracking': 'Progress Tracking',
  'analytics.supportRequired': 'Support Required',
  'analytics.improvementSuggestions': 'Improvement Suggestions',
  'analytics.adaptiveDifficulty': 'Adaptive Difficulty',
  'analytics.challengeLevel': 'Challenge Level',
  'analytics.difficultyAdjustment': 'Difficulty Adjustment',
  'analytics.optimalLevel': 'Optimal Level',
  'analytics.performancePrediction': 'Performance Prediction',
  'analytics.learningCurve': 'Learning Curve',
  'analytics.skillAssessment': 'Skill Assessment',
  'analytics.personalizedLearning': 'Personalized Learning',
  'analytics.studentProgress': 'Student Progress',
  'analytics.individualPerformance': 'Individual Performance',
  'analytics.learningPatterns': 'Learning Patterns',
  'analytics.engagementScore': 'Engagement Score',
  'analytics.activityCompletion': 'Activity Completion',
  'analytics.timeSpent': 'Time Spent',
  'analytics.successRate': 'Success Rate',
  'analytics.improvementRate': 'Improvement Rate',
  'analytics.classOverview': 'Class Overview',
  'analytics.studentList': 'Student List',
  'analytics.performanceSummary': 'Performance Summary',
  'analytics.comparativeAnalysis': 'Comparative Analysis',
  'analytics.classAverage': 'Class Average',
  'analytics.topPerformers': 'Top Performers',
  'analytics.classRanking': 'Class Ranking',
  'analytics.studentComparison': 'Student Comparison',
  'analytics.dailyProgress': 'Daily Progress',
  'analytics.weeklyTrends': 'Weekly Trends',
  'analytics.monthlySummary': 'Monthly Summary',
  'analytics.historicalData': 'Historical Data',
  'analytics.recentActivity': 'Recent Activity',
  'analytics.longTermTrends': 'Long-term Trends',
  'analytics.progressTimeline': 'Progress Timeline',
  'analytics.activityHistory': 'Activity History',
  'analytics.alert': 'Alert',
  'analytics.attentionNeeded': 'Attention Needed',
  'analytics.improvementDetected': 'Improvement Detected',
  'analytics.goalAchieved': 'Goal Achieved',
  'analytics.milestoneReached': 'Milestone Reached',
  'analytics.interventionSuggested': 'Intervention Suggested',
  'analytics.performanceWarning': 'Performance Warning',
  'analytics.successNotification': 'Success Notification',
  'analytics.dataLoading': 'Data Loading',
  'analytics.noData': 'No Data Available',
  'analytics.syncRequired': 'Sync Required',
  'analytics.offlineMode': 'Offline Mode',
  'analytics.updateAvailable': 'Update Available',
  'analytics.connectionError': 'Connection Error',
  'analytics.processingData': 'Processing Data',
  'analytics.subject.math': 'Mathematics',
  'analytics.subject.science': 'Science',
  'analytics.subject.physics': 'Physics',
  'analytics.subject.chemistry': 'Chemistry',
  'analytics.subject.technology': 'Technology',
  'analytics.subject.engineering': 'Engineering',
  'analytics.subject.topic': 'Topic',
  'analytics.subject.concept': 'Concept',
  'analytics.help.analytics': 'View detailed analytics and reports for your class.',
  'analytics.help.chart': 'This chart shows trends and comparisons for your selected class or subject.',
  'analytics.help.export': 'Export analytics data as CSV for offline use or sharing.',
  'analytics.help.weakTopics': 'Weak topics are identified based on student performance patterns.',
  'analytics.help.difficulty': 'Adaptive difficulty tracks how the system adjusts challenge levels.',
  'analytics.help.engagement': 'Engagement is calculated from activity, streaks, and coin earning.',
  'analytics.help.time': 'Time-based analytics show learning patterns over days, weeks, and months.',
  'analytics.error.loading': 'Error loading analytics data.',
  'analytics.error.export': 'Export failed. Please try again.',
  'analytics.status.exporting': 'Exporting...',
  'analytics.status.exported': 'Export complete.',
  'analytics.status.loading': 'Loading analytics...',
  'analytics.status.updating': 'Updating analytics...',
  'analytics.status.synced': 'Analytics synced.',
  'analytics.status.offline': 'Offline analytics mode.',
  'analytics.status.fallback': 'Showing cached analytics data.',
  // Add more as needed
  // Gamification
  'coins.title': 'Knowledge Coins',
  'coins.earn': 'Earn Coins',
  'coins.spend': 'Spend Coins',
  'coins.balance': 'Coin Balance',
  'coins.bonus': 'Bonus Coins',
  'badge.mathWhiz': 'Math Whiz',
  'badge.physicsMaster': 'Physics Master',
  'badge.chemistryExpert': 'Chemistry Expert',
  'badge.streakMaster': 'Streak Master',
  'badge.perfectPlayer': 'Perfect Player',
  'badge.speedDemon': 'Speed Demon',
  'badge.100Activities': '100 Activities',
  'badge.30DayStreak': '30-Day Streak',
  'badge.villageBuilder': 'Village Builder',
  'badge.unlocked': 'Badge Unlocked!',
  'streak.daily': 'Daily Streak',
  'streak.activity': 'Activity Streak',
  'streak.perfect': 'Perfect Streak',
  'streak.bonus': 'Streak Bonus',
  'streak.milestone': 'Streak Milestone!',
  'village.title': 'Village',
  'village.upgrade': 'Upgrade',
  'village.building': 'Building',
  'village.school': 'School',
  'village.library': 'Library',
  'village.solarPanels': 'Solar Panels',
  'village.waterWell': 'Water Well',
  'village.computerLab': 'Computer Lab',
  'village.scienceLab': 'Science Lab',
  'village.sportsField': 'Sports Field',
  'village.artCenter': 'Art Center',
  'village.medicalCenter': 'Medical Center',
  'village.market': 'Market',
  'village.temple': 'Temple',
  'village.communityGarden': 'Community Garden',
  'leaderboard.title': 'Leaderboard',
  'leaderboard.rank': 'Rank',
  'leaderboard.weekly': 'Weekly Rankings',
  'leaderboard.monthly': 'Monthly Rankings',
  'leaderboard.village': 'Village Rankings',
  'leaderboard.topPlayers': 'Top Players',
  'leaderboard.yourRank': 'Your Rank',
  'challenge.daily': 'Daily Challenge',
  'challenge.complete': 'Challenge Complete',
  'challenge.streakBonus': 'Streak Bonus',
  'challenge.quickMath': 'Quick Math',
  'challenge.scienceTrivia': 'Science Trivia',
  'challenge.physicsPuzzle': 'Physics Puzzle',
  'challenge.chemistryQuiz': 'Chemistry Quiz',
  'challenge.codingLogic': 'Coding Logic',
  'challenge.stemRiddles': 'STEM Riddles',
  'achievement.congrats': 'Congratulations!',
  'achievement.badgeUnlocked': 'Badge Unlocked!',
  'achievement.streakMilestone': 'Streak Milestone!',
  'achievement.villageUpgraded': 'Village Upgraded!',
  'achievement.challengeComplete': 'Challenge Complete!',
  'social.friends': 'Friends',
  'social.visitVillage': 'Visit Village',
  'social.shareScore': 'Share Score',
  'social.challengeFriend': 'Challenge Friend',
  'social.kudos': 'Kudos',
  'notification.coinsEarned': 'Coins Earned!',
  'notification.badgeUnlocked': 'Badge Unlocked!',
  'notification.streakBonus': 'Streak Bonus!',
  'notification.villageUpgrade': 'Village Upgraded!',
  'notification.challengeComplete': 'Challenge Complete!',
  'notification.friendChallenge': 'Friend Challenge!',
  'notification.error': 'Error',
  'notification.help': 'Help',
      'page.index.title': 'STEM Village',
      'page.index.desc': 'Gamified learning for rural Odisha',
      'nav.dashboard': 'Dashboard',
      'nav.courses': 'Courses',
      'nav.games': 'Games',
      'nav.progress': 'Progress',
      'nav.leaderboard': 'Leaderboard',
      'nav.myclasses': 'My Classes',
      'nav.reports': 'Progress Reports',
      'nav.assignments': 'Assignments',
      'nav.resources': 'Resources',
      'hero.title': 'Welcome to STEM Village',
      'hero.subtitle': 'Empowering students through gamified STEM learning',
      'login.title': 'Student Login',
      'login.studentId': { text: 'Student ID', placeholder: 'Student ID' },
      'login.password': { text: 'Password', placeholder: 'Password' },
      'login.button': 'Sign in',
      'login.forgot': 'Forgot password?',
      'login.register': 'Register here',
      'login.contact': 'Contact support',
      'login.mobileotp': 'Mobile OTP',
      'login.emailotp': 'Email OTP',
      'teacherlogin.title': 'Teacher Portal',
      'teacherlogin.email': { text: 'Email address', placeholder: 'Email address' },
      'teacherlogin.password': { text: 'Password', placeholder: 'Password' },
      'teacherlogin.button': 'Sign in',
      'teacherlogin.govt': 'Government Login',
      'games.title': 'Learning Games',
      'games.search': { text: 'Search games...', placeholder: 'Search games...' },
      'games.cat.all': 'All Games',
      'games.cat.math': 'Mathematics',
      'games.cat.sci': 'Science',
      'games.cat.tech': 'Technology',
      'games.cat.eng': 'Engineering',
      'games.cat.puzzle': 'Puzzles',
      // Game titles and descriptions
      'game.gravityMaster.title': 'Gravity Master',
      'game.gravityMaster.desc': 'Guide the ball using gravity wells and barriers.',
      'game.collisionCourse.title': 'Collision Course',
      'game.collisionCourse.desc': 'Create chain reactions using collisions and momentum.',
      'game.numberMaze.title': 'Number Maze',
      'game.numberMaze.desc': 'Solve math problems to escape the maze.',
      'game.algebraAdventure.title': 'Algebra Adventure',
      'game.algebraAdventure.desc': 'Solve algebraic equations to progress.',
      'game.moleculeBuilder.title': 'Molecule Builder',
      'game.moleculeBuilder.desc': 'Build molecules by dragging atoms together.',
      'game.reactionLab.title': 'Reaction Lab',
      'game.reactionLab.desc': 'Balance chemical equations and simulate reactions.',
      // Game UI
      'game.play': 'Play',
      'game.pause': 'Pause',
      'game.levelComplete': 'Level Complete!',
      'game.tryAgain': 'Try Again',
      'game.hint': 'Hint',
      'game.score': 'Score',
      'game.stars': 'Stars',
      'game.level': 'Level',
      'game.difficulty.beginner': 'Beginner',
      'game.difficulty.intermediate': 'Intermediate',
      'game.difficulty.advanced': 'Advanced',
      // Physics terminology
      'physics.gravity': 'Gravity',
      'physics.momentum': 'Momentum',
      'physics.collision': 'Collision',
      'physics.force': 'Force',
      'physics.energy': 'Energy',
      // Math terminology
      'math.equation': 'Equation',
      'math.variable': 'Variable',
      'math.solution': 'Solution',
      'math.algebra': 'Algebra',
      'math.geometry': 'Geometry',
      // Chemistry terminology
      'chem.molecule': 'Molecule',
      'chem.atom': 'Atom',
      'chem.bond': 'Bond',
      'chem.reaction': 'Reaction',
      'chem.element': 'Element',
      // Progress & achievement
      'progress.levelUnlocked': 'Level Unlocked!',
      'progress.badgeEarned': 'New Badge Earned!',
      'progress.perfectScore': 'Perfect Score!',
      'progress.mastery': 'Mastery Achieved!',
      'progress.nextLevel': 'Next Level',
      'progress.recommended': 'Recommended Game',
      // Controls & instructions
      'game.controls': 'Controls',
      'game.objective': 'Objective',
      'game.instructions': 'Instructions',
      'game.error': 'Error',
      'game.help': 'Help',
      // Achievements
      'badge.physicsMaster': 'Physics Master',
      'badge.mathWizard': 'Math Wizard',
      'badge.chemistryExpert': 'Chemistry Expert',
      // Add more keys as needed
    },
    hi: {
  // Teacher Analytics (Hindi)
  'analytics.dashboard': 'एनालिटिक्स डैशबोर्ड',
  'analytics.metrics': 'प्रदर्शन मीट्रिक्स',
  'analytics.classComparison': 'कक्षा तुलना',
  'analytics.exportReports': 'रिपोर्ट निर्यात करें',
  'analytics.dateRange': 'तिथि सीमा',
  'analytics.filterOptions': 'फ़िल्टर विकल्प',
  'analytics.dataViz': 'डेटा विज़ुअलाइज़ेशन',
  'analytics.studentAnalytics': 'छात्र एनालिटिक्स',
  'analytics.performanceTrends': 'प्रदर्शन प्रवृत्तियाँ',
  'analytics.subjectComparison': 'विषय तुलना',
  'analytics.engagementLevels': 'सगाई स्तर',
  'analytics.difficultyProgression': 'कठिनाई प्रगति',
  'analytics.completionRates': 'पूर्णता दर',
  'analytics.learningCurves': 'अधिगम वक्र',
  'analytics.activityPatterns': 'गतिविधि पैटर्न',
  'analytics.scoreDistribution': 'स्कोर वितरण',
  'analytics.exportCSV': 'CSV में निर्यात करें',
  'analytics.downloadReport': 'रिपोर्ट डाउनलोड करें',
  'analytics.selectDateRange': 'तिथि सीमा चुनें',
  'analytics.chooseMetrics': 'मीट्रिक्स चुनें',
  'analytics.generateReport': 'रिपोर्ट बनाएं',
  'analytics.exportComplete': 'निर्यात पूर्ण',
  'analytics.exportFailed': 'निर्यात विफल',
  'analytics.customReport': 'कस्टम रिपोर्ट',
  'analytics.reportType': 'रिपोर्ट प्रकार',
  'analytics.fileDownloaded': 'फ़ाइल डाउनलोड हुई',
  'analytics.weakTopics': 'कमजोर विषय',
  'analytics.strugglingStudents': 'संघर्षरत छात्र',
  'analytics.interventionNeeded': 'हस्तक्षेप आवश्यक',
  'analytics.conceptDifficulty': 'संकल्पना कठिनाई',
  'analytics.remedialActivities': 'सहायक गतिविधियाँ',
  'analytics.progressTracking': 'प्रगति ट्रैकिंग',
  'analytics.supportRequired': 'सहायता आवश्यक',
  'analytics.improvementSuggestions': 'सुधार सुझाव',
  'analytics.adaptiveDifficulty': 'अनुकूली कठिनाई',
  'analytics.challengeLevel': 'चुनौती स्तर',
  'analytics.difficultyAdjustment': 'कठिनाई समायोजन',
  'analytics.optimalLevel': 'सर्वोत्तम स्तर',
  'analytics.performancePrediction': 'प्रदर्शन पूर्वानुमान',
  'analytics.learningCurve': 'अधिगम वक्र',
  'analytics.skillAssessment': 'कौशल मूल्यांकन',
  'analytics.personalizedLearning': 'व्यक्तिगत अधिगम',
  'analytics.studentProgress': 'छात्र प्रगति',
  'analytics.individualPerformance': 'व्यक्तिगत प्रदर्शन',
  'analytics.learningPatterns': 'अधिगम पैटर्न',
  'analytics.engagementScore': 'सगाई स्कोर',
  'analytics.activityCompletion': 'गतिविधि पूर्णता',
  'analytics.timeSpent': 'समय व्यतीत',
  'analytics.successRate': 'सफलता दर',
  'analytics.improvementRate': 'सुधार दर',
  'analytics.classOverview': 'कक्षा अवलोकन',
  'analytics.studentList': 'छात्र सूची',
  'analytics.performanceSummary': 'प्रदर्शन सारांश',
  'analytics.comparativeAnalysis': 'तुलनात्मक विश्लेषण',
  'analytics.classAverage': 'कक्षा औसत',
  'analytics.topPerformers': 'शीर्ष प्रदर्शनकर्ता',
  'analytics.classRanking': 'कक्षा रैंकिंग',
  'analytics.studentComparison': 'छात्र तुलना',
  'analytics.dailyProgress': 'दैनिक प्रगति',
  'analytics.weeklyTrends': 'साप्ताहिक प्रवृत्तियाँ',
  'analytics.monthlySummary': 'मासिक सारांश',
  'analytics.historicalData': 'ऐतिहासिक डेटा',
  'analytics.recentActivity': 'हाल की गतिविधि',
  'analytics.longTermTrends': 'दीर्घकालिक प्रवृत्तियाँ',
  'analytics.progressTimeline': 'प्रगति समयरेखा',
  'analytics.activityHistory': 'गतिविधि इतिहास',
  'analytics.alert': 'चेतावनी',
  'analytics.attentionNeeded': 'ध्यान आवश्यक',
  'analytics.improvementDetected': 'सुधार पाया गया',
  'analytics.goalAchieved': 'लक्ष्य प्राप्त',
  'analytics.milestoneReached': 'मील का पत्थर पहुँचा',
  'analytics.interventionSuggested': 'हस्तक्षेप सुझाया गया',
  'analytics.performanceWarning': 'प्रदर्शन चेतावनी',
  'analytics.successNotification': 'सफलता सूचना',
  'analytics.dataLoading': 'डेटा लोड हो रहा है',
  'analytics.noData': 'कोई डेटा उपलब्ध नहीं',
  'analytics.syncRequired': 'सिंक आवश्यक',
  'analytics.offlineMode': 'ऑफलाइन मोड',
  'analytics.updateAvailable': 'अपडेट उपलब्ध',
  'analytics.connectionError': 'कनेक्शन त्रुटि',
  'analytics.processingData': 'डेटा संसाधित हो रहा है',
  'analytics.subject.math': 'गणित',
  'analytics.subject.science': 'विज्ञान',
  'analytics.subject.physics': 'भौतिकी',
  'analytics.subject.chemistry': 'रसायन',
  'analytics.subject.technology': 'प्रौद्योगिकी',
  'analytics.subject.engineering': 'इंजीनियरिंग',
  'analytics.subject.topic': 'विषय',
  'analytics.subject.concept': 'संकल्पना',
  'analytics.help.analytics': 'अपनी कक्षा के लिए विस्तृत एनालिटिक्स और रिपोर्ट देखें।',
  'analytics.help.chart': 'यह चार्ट आपके चयनित कक्षा या विषय के लिए प्रवृत्तियाँ और तुलना दिखाता है।',
  'analytics.help.export': 'एनालिटिक्स डेटा को CSV के रूप में निर्यात करें।',
  'analytics.help.weakTopics': 'कमजोर विषय छात्र प्रदर्शन पैटर्न के आधार पर पहचाने जाते हैं।',
  'analytics.help.difficulty': 'अनुकूली कठिनाई ट्रैक करती है कि सिस्टम चुनौती स्तर कैसे समायोजित करता है।',
  'analytics.help.engagement': 'सगाई गतिविधि, स्ट्रीक्स और सिक्का कमाई से गणना की जाती है।',
  'analytics.help.time': 'समय-आधारित एनालिटिक्स दिनों, हफ्तों और महीनों में अधिगम पैटर्न दिखाते हैं।',
  'analytics.error.loading': 'एनालिटिक्स डेटा लोड करने में त्रुटि।',
  'analytics.error.export': 'निर्यात विफल। कृपया पुनः प्रयास करें।',
  'analytics.status.exporting': 'निर्यात हो रहा है...',
  'analytics.status.exported': 'निर्यात पूर्ण।',
  'analytics.status.loading': 'एनालिटिक्स लोड हो रहा है...',
  'analytics.status.updating': 'एनालिटिक्स अपडेट हो रहा है...',
  'analytics.status.synced': 'एनालिटिक्स सिंक हो गया।',
  'analytics.status.offline': 'ऑफलाइन एनालिटिक्स मोड।',
  'analytics.status.fallback': 'कैश्ड एनालिटिक्स डेटा दिखा रहे हैं।',
  // Add more as needed
      'page.index.title': 'स्टेम विलेज',
      'page.index.desc': 'ग्रामीण ओडिशा के लिए गेमिफाइड लर्निंग',
      'nav.dashboard': 'डैशबोर्ड',
      'nav.courses': 'कोर्सेस',
      'nav.games': 'खेल',
      'nav.progress': 'प्रगति',
      'nav.leaderboard': 'लीडरबोर्ड',
      'nav.myclasses': 'मेरी कक्षाएं',
      'nav.reports': 'प्रगति रिपोर्ट',
      'nav.assignments': 'असाइनमेंट्स',
      'nav.resources': 'संसाधन',
      'hero.title': 'स्टेम विलेज में आपका स्वागत है',
      'hero.subtitle': 'गेमिफाइड STEM लर्निंग के माध्यम से छात्रों को सशक्त बनाना',
      'login.title': 'छात्र लॉगिन',
      'login.studentId': { text: 'छात्र आईडी', placeholder: 'छात्र आईडी' },
      'login.password': { text: 'पासवर्ड', placeholder: 'पासवर्ड' },
      'login.button': 'साइन इन करें',
      'login.forgot': 'पासवर्ड भूल गए?',
      'login.register': 'यहाँ रजिस्टर करें',
      'login.contact': 'संपर्क सहायता',
      'login.mobileotp': 'मोबाइल ओटीपी',
      'login.emailotp': 'ईमेल ओटीपी',
      'teacherlogin.title': 'शिक्षक पोर्टल',
      'teacherlogin.email': { text: 'ईमेल पता', placeholder: 'ईमेल पता' },
      'teacherlogin.password': { text: 'पासवर्ड', placeholder: 'पासवर्ड' },
      'teacherlogin.button': 'साइन इन करें',
      'teacherlogin.govt': 'सरकारी लॉगिन',
      'games.title': 'लर्निंग गेम्स',
      'games.search': { text: 'खेल खोजें...', placeholder: 'खेल खोजें...' },
      'games.cat.all': 'सभी खेल',
      'games.cat.math': 'गणित',
      'games.cat.sci': 'विज्ञान',
      'games.cat.tech': 'प्रौद्योगिकी',
      'games.cat.eng': 'इंजीनियरिंग',
      'games.cat.puzzle': 'पहेलियाँ',
      // Add more keys as needed
    },
    or: {
  // Teacher Analytics (Odia)
  'analytics.dashboard': 'ବିଶ୍ଲେଷଣ ଡ୍ୟାସବୋର୍ଡ',
  'analytics.metrics': 'କାର୍ଯ୍ୟଦକ୍ଷତା ମାପ',
  'analytics.classComparison': 'ଶ୍ରେଣୀ ତୁଳନା',
  'analytics.exportReports': 'ରିପୋର୍ଟ ନିର୍ୟାତ',
  'analytics.dateRange': 'ତାରିଖ ଅବଧି',
  'analytics.filterOptions': 'ଫିଲ୍ଟର୍ ବିକଳ୍ପ',
  'analytics.dataViz': 'ଡାଟା ଭିଜୁଆଲାଇଜେସନ୍',
  'analytics.studentAnalytics': 'ଛାତ୍ର ବିଶ୍ଲେଷଣ',
  'analytics.performanceTrends': 'କାର୍ଯ୍ୟଦକ୍ଷତା ପ୍ରବୃତ୍ତି',
  'analytics.subjectComparison': 'ବିଷୟ ତୁଳନା',
  'analytics.engagementLevels': 'ଅଂଶଗ୍ରହଣ ସ୍ତର',
  'analytics.difficultyProgression': 'କଠିନତା ପ୍ରଗତି',
  'analytics.completionRates': 'ସମାପ୍ତି ହାର',
  'analytics.learningCurves': 'ଅଧିଗମ ବକ୍ର',
  'analytics.activityPatterns': 'କାର୍ଯ୍ୟ ପ୍ରକୃତି',
  'analytics.scoreDistribution': 'ସ୍କୋର ବଣ୍ଟନ',
  'analytics.exportCSV': 'CSV କୁ ନିର୍ୟାତ',
  'analytics.downloadReport': 'ରିପୋର୍ଟ ଡାଉନଲୋଡ୍',
  'analytics.selectDateRange': 'ତାରିଖ ଅବଧି ଚୟନ',
  'analytics.chooseMetrics': 'ମାପ ଚୟନ',
  'analytics.generateReport': 'ରିପୋର୍ଟ ତିଆରି',
  'analytics.exportComplete': 'ନିର୍ୟାତ ସମ୍ପୂର୍ଣ୍ଣ',
  'analytics.exportFailed': 'ନିର୍ୟାତ ବିଫଳ',
  'analytics.customReport': 'କଷ୍ଟମ୍ ରିପୋର୍ଟ',
  'analytics.reportType': 'ରିପୋର୍ଟ ପ୍ରକାର',
  'analytics.fileDownloaded': 'ଫାଇଲ୍ ଡାଉନଲୋଡ୍ ହେଲା',
  'analytics.weakTopics': 'ଦୁର୍ବଳ ବିଷୟ',
  'analytics.strugglingStudents': 'ସଂଘର୍ଷ କରୁଥିବା ଛାତ୍ର',
  'analytics.interventionNeeded': 'ହସ୍ତକ୍ଷେପ ଆବଶ୍ୟକ',
  'analytics.conceptDifficulty': 'ଧାରଣା କଠିନତା',
  'analytics.remedialActivities': 'ପୁନଃସଂସ୍କାର କାର୍ଯ୍ୟ',
  'analytics.progressTracking': 'ପ୍ରଗତି ଟ୍ରାକିଂ',
  'analytics.supportRequired': 'ସହଯୋଗ ଆବଶ୍ୟକ',
  'analytics.improvementSuggestions': 'ସୁଧାର ସୁପାରିଶ',
  'analytics.adaptiveDifficulty': 'ଅନୁକୂଳ କଠିନତା',
  'analytics.challengeLevel': 'ଚ୍ୟାଲେଞ୍ଜ ସ୍ତର',
  'analytics.difficultyAdjustment': 'କଠିନତା ସମଯୋଜନ',
  'analytics.optimalLevel': 'ଉତ୍ତମ ସ୍ତର',
  'analytics.performancePrediction': 'କାର୍ଯ୍ୟଦକ୍ଷତା ପୂର୍ବାନୁମାନ',
  'analytics.learningCurve': 'ଅଧିଗମ ବକ୍ର',
  'analytics.skillAssessment': 'ଦକ୍ଷତା ମୂଲ୍ୟାୟନ',
  'analytics.personalizedLearning': 'ବ୍ୟକ୍ତିଗତ ଅଧିଗମ',
  'analytics.studentProgress': 'ଛାତ୍ର ପ୍ରଗତି',
  'analytics.individualPerformance': 'ବ୍ୟକ୍ତିଗତ କାର୍ଯ୍ୟଦକ୍ଷତା',
  'analytics.learningPatterns': 'ଅଧିଗମ ପ୍ରକୃତି',
  'analytics.engagementScore': 'ଅଂଶଗ୍ରହଣ ସ୍କୋର',
  'analytics.activityCompletion': 'କାର୍ଯ୍ୟ ସମାପ୍ତି',
  'analytics.timeSpent': 'ବ୍ୟୟ ହୋଇଥିବା ସମୟ',
  'analytics.successRate': 'ସଫଳତା ହାର',
  'analytics.improvementRate': 'ସୁଧାର ହାର',
  'analytics.classOverview': 'ଶ୍ରେଣୀ ସାରାଂଶ',
  'analytics.studentList': 'ଛାତ୍ର ତାଲିକା',
  'analytics.performanceSummary': 'କାର୍ଯ୍ୟଦକ୍ଷତା ସାରାଂଶ',
  'analytics.comparativeAnalysis': 'ତୁଳନାତ୍ମକ ବିଶ୍ଲେଷଣ',
  'analytics.classAverage': 'ଶ୍ରେଣୀ ହାରାହାରି',
  'analytics.topPerformers': 'ଶ୍ରେଷ୍ଠ ପ୍ରଦର୍ଶନକାରୀ',
  'analytics.classRanking': 'ଶ୍ରେଣୀ ର୍ୟାଙ୍କିଂ',
  'analytics.studentComparison': 'ଛାତ୍ର ତୁଳନା',
  'analytics.dailyProgress': 'ଦୈନିକ ପ୍ରଗତି',
  'analytics.weeklyTrends': 'ସାପ୍ତାହିକ ପ୍ରବୃତ୍ତି',
  'analytics.monthlySummary': 'ମାସିକ ସାରାଂଶ',
  'analytics.historicalData': 'ଇତିହାସିକ ତଥ୍ୟ',
  'analytics.recentActivity': 'ସাম্প୍ରତିକ କାର୍ଯ୍ୟ',
  'analytics.longTermTrends': 'ଦୀର୍ଘକାଳୀନ ପ୍ରବୃତ୍ତି',
  'analytics.progressTimeline': 'ପ୍ରଗତି ଟାଇମ୍ଲାଇନ୍',
  'analytics.activityHistory': 'କାର୍ଯ୍ୟ ଇତିହାସ',
  'analytics.alert': 'ସତର୍କ',
  'analytics.attentionNeeded': 'ଲକ୍ଷ୍ୟ ଦେବା ଆବଶ୍ୟକ',
  'analytics.improvementDetected': 'ସୁଧାର ଚିହ୍ନଟ',
  'analytics.goalAchieved': 'ଲକ୍ଷ୍ୟ ପ୍ରାପ୍ତ',
  'analytics.milestoneReached': 'ମାଇଲସ୍ଟୋନ୍ ପ୍ରାପ୍ତ',
  'analytics.interventionSuggested': 'ହସ୍ତକ୍ଷେପ ସୁପାରିଶ',
  'analytics.performanceWarning': 'କାର୍ଯ୍ୟଦକ୍ଷତା ସତର୍କ',
  'analytics.successNotification': 'ସଫଳତା ସୂଚନା',
  'analytics.dataLoading': 'ତଥ୍ୟ ଲୋଡ଼ ହେଉଛି',
  'analytics.noData': 'କୌଣସି ତଥ୍ୟ ନାହିଁ',
  'analytics.syncRequired': 'ସିଙ୍କ୍ ଆବଶ୍ୟକ',
  'analytics.offlineMode': 'ଅଫଲାଇନ୍ ମୋଡ୍',
  'analytics.updateAvailable': 'ଅପଡେଟ୍ ଉପଲବ୍ଧ',
  'analytics.connectionError': 'ସଂଯୋଗ ତ୍ରୁଟି',
  'analytics.processingData': 'ତଥ୍ୟ ପ୍ରକ୍ରିୟା',
  'analytics.subject.math': 'ଗଣିତ',
  'analytics.subject.science': 'ବିଜ୍ଞାନ',
  'analytics.subject.physics': 'ଭୌତିକ',
  'analytics.subject.chemistry': 'ରସାୟନ',
  'analytics.subject.technology': 'ପ୍ରଯୁକ୍ତି',
  'analytics.subject.engineering': 'ଇଞ୍ଜିନିୟରିଂ',
  'analytics.subject.topic': 'ବିଷୟ',
  'analytics.subject.concept': 'ଧାରଣା',
  'analytics.help.analytics': 'ଆପଣଙ୍କର ଶ୍ରେଣୀ ପାଇଁ ବିସ୍ତୃତ ବିଶ୍ଲେଷଣ ଏବଂ ରିପୋର୍ଟ ଦେଖନ୍ତୁ।',
  'analytics.help.chart': 'ଏହି ଚାର୍ଟ ଆପଣଙ୍କ ଚୟନିତ ଶ୍ରେଣୀ କିମ୍ବା ବିଷୟ ପାଇଁ ପ୍ରବୃତ୍ତି ଏବଂ ତୁଳନା ଦେଖାଏ।',
  'analytics.help.export': 'ବିଶ୍ଲେଷଣ ତଥ୍ୟକୁ CSV ଭାବରେ ନିର୍ୟାତ କରନ୍ତୁ।',
  'analytics.help.weakTopics': 'ଦୁର୍ବଳ ବିଷୟ ଛାତ୍ର କାର୍ଯ୍ୟଦକ୍ଷତା ପ୍ରକୃତି ଉପରେ ଆଧାରିତ।',
  'analytics.help.difficulty': 'ଅନୁକୂଳ କଠିନତା ସିଷ୍ଟମ୍ କିପରି ଚ୍ୟାଲେଞ୍ଜ ସ୍ତର ସମଯୋଜନ କରେ ଟ୍ରାକ୍ କରେ।',
  'analytics.help.engagement': 'ଅଂଶଗ୍ରହଣ କାର୍ଯ୍ୟ, ଷ୍ଟ୍ରିକ୍ସ ଏବଂ ସିକ୍କା ଆଧାରିତ।',
  'analytics.help.time': 'ସମୟ ଆଧାରିତ ବିଶ୍ଲେଷଣ ଦିନ, ସପ୍ତାହ, ମାସରେ ଅଧିଗମ ପ୍ରକୃତି ଦେଖାଏ।',
  'analytics.error.loading': 'ବିଶ୍ଲେଷଣ ତଥ୍ୟ ଲୋଡ଼ ତ୍ରୁଟି।',
  'analytics.error.export': 'ନିର୍ୟାତ ବିଫଳ। ଦୟାକରି ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ।',
  'analytics.status.exporting': 'ନିର୍ୟାତ ହେଉଛି...',
  'analytics.status.exported': 'ନିର୍ୟାତ ସମ୍ପୂର୍ଣ୍ଣ।',
  'analytics.status.loading': 'ବିଶ୍ଲେଷଣ ଲୋଡ଼ ହେଉଛି...',
  'analytics.status.updating': 'ବିଶ୍ଲେଷଣ ଅଦ୍ୟତନ ହେଉଛି...',
  'analytics.status.synced': 'ବିଶ୍ଲେଷଣ ସିଙ୍କ୍ ହେଲା।',
  'analytics.status.offline': 'ଅଫଲାଇନ୍ ବିଶ୍ଲେଷଣ ମୋଡ୍।',
  'analytics.status.fallback': 'କ୍ୟାଶ୍ ହୋଇଥିବା ବିଶ୍ଲେଷଣ ତଥ୍ୟ ଦେଖାଯାଉଛି।',
  // Add more as needed
      'page.index.title': 'ଷ୍ଟେମ୍ ଭିଲେଜ୍',
      'page.index.desc': 'ଗ୍ରାମୀଣ ଓଡିଶା ପାଇଁ ଗେମିଫାଇଡ୍ ଶିକ୍ଷା',
      'nav.dashboard': 'ଡ୍ୟାସବୋର୍ଡ',
      'nav.courses': 'ପାଠ୍ୟକ୍ରମ',
      'nav.games': 'ଖେଳ',
      'nav.progress': 'ପ୍ରଗତି',
      'nav.leaderboard': 'ଲିଡରବୋର୍ଡ',
      'nav.myclasses': 'ମୋ କ୍ଲାସ୍',
      'nav.reports': 'ପ୍ରଗତି ରିପୋର୍ଟ',
      'nav.assignments': 'ଅସାଇନମେଣ୍ଟ',
      'nav.resources': 'ସମ୍ପଦ',
      'hero.title': 'ଷ୍ଟେମ୍ ଭିଲେଜ୍ କୁ ସ୍ୱାଗତ',
      'hero.subtitle': 'ଗେମିଫାଇଡ୍ STEM ଶିକ୍ଷା ଦ୍ୱାରା ଛାତ୍ରମାନେ ସଶକ୍ତ',
      'login.title': 'ଛାତ୍ର ଲଗଇନ୍',
      'login.studentId': { text: 'ଛାତ୍ର ଆଇଡି', placeholder: 'ଛାତ୍ର ଆଇଡି' },
      'login.password': { text: 'ପାସୱାର୍ଡ', placeholder: 'ପାସୱାର୍ଡ' },
      'login.button': 'ସାଇନ୍ ଇନ୍',
      'login.forgot': 'ପାସୱାର୍ଡ ଭୁଲିଗଲେ?',
      'login.register': 'ଏଠାରେ ରେଜିଷ୍ଟର୍ କରନ୍ତୁ',
      'login.contact': 'ସହଯୋଗ ସମ୍ପର୍କ',
      'login.mobileotp': 'ମୋବାଇଲ୍ OTP',
      'login.emailotp': 'ଇମେଲ୍ OTP',
      'teacherlogin.title': 'ଶିକ୍ଷକ ପୋର୍ଟାଲ୍',
      'teacherlogin.email': { text: 'ଇମେଲ୍ ଠିକଣା', placeholder: 'ଇମେଲ୍ ଠିକଣା' },
      'teacherlogin.password': { text: 'ପାସୱାର୍ଡ', placeholder: 'ପାସୱାର୍ଡ' },
      'teacherlogin.button': 'ସାଇନ୍ ଇନ୍',
      'teacherlogin.govt': 'ସରକାରୀ ଲଗଇନ୍',
      'games.title': 'ଲର୍ଣିଂ ଗେମ୍ସ୍',
      'games.search': { text: 'ଖେଳ ଖୋଜନ୍ତୁ...', placeholder: 'ଖେଳ ଖୋଜନ୍ତୁ...' },
      'games.cat.all': 'ସମସ୍ତ ଖେଳ',
      'games.cat.math': 'ଗଣିତ',
      'games.cat.sci': 'ବିଜ୍ଞାନ',
      'games.cat.tech': 'ପ୍ରଯୁକ୍ତି',
      'games.cat.eng': 'ଇଞ୍ଜିନିୟରିଂ',
      'games.cat.puzzle': 'ପହେଳି',
      // Add more keys as needed
    }
  };

  let currentLang = 'en';

  function getDict(key) {
    const d = dict[currentLang];
    let val = d[key];
    if (!val) return dict['en'][key] || key;
    return val;
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('sv_lang', lang);
    document.documentElement.lang = lang;
    translateDOM();
    updateToggleUI();
  }

  function updateToggleUI() {
    const toggle = document.getElementById('lang-toggle');
    if (!toggle) return;
    Array.from(toggle.querySelectorAll('button[data-lang]')).forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });
  }

  function createLanguageToggle() {
    if (document.getElementById('lang-toggle')) return;
    const toggle = document.createElement('div');
    toggle.id = 'lang-toggle';
    toggle.className = 'flex gap-2 items-center';
    toggle.innerHTML = `
      <button data-lang="en" class="px-2 py-1 rounded bg-gray-200 text-xs">EN</button>
      <button data-lang="hi" class="px-2 py-1 rounded bg-gray-200 text-xs">हिंदी</button>
      <button data-lang="or" class="px-2 py-1 rounded bg-gray-200 text-xs">ଓଡିଆ</button>
    `;
    toggle.addEventListener('click', e => {
      if (e.target.matches('button[data-lang]')) {
        setLang(e.target.getAttribute('data-lang'));
      }
    });
    // Insert into header or before main
    const header = document.querySelector('header');
    if (header) header.appendChild(toggle);
    else document.body.insertBefore(toggle, document.body.firstChild);
    updateToggleUI();
  }

  function translateDOM() {
    // Page title
    const page = document.body.getAttribute('data-page') || 'index';
    document.title = getDict(`page.${page}.title`);
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', getDict(`page.${page}.desc`));
    // All elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      let val = getDict(key);
      if (typeof val === 'object' && val.text) val = val.text;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.value = val;
      } else {
        el.textContent = val;
      }
    });
    // Attribute translations
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const attrs = el.getAttribute('data-i18n-attr').split(',');
      const val = getDict(key);
      if (typeof val === 'object') {
        attrs.forEach(attr => {
          if (val[attr]) el.setAttribute(attr, val[attr]);
        });
      } else {
        attrs.forEach(attr => {
          el.setAttribute(attr, val);
        });
      }
    });
    // Speaker buttons
    document.querySelectorAll('button.speak[data-i18n-key]').forEach(btn => {
      btn.onclick = () => speak(btn.getAttribute('data-i18n-key'));
    });
  }

  function speak(key) {
    const val = getDict(key);
    let text = typeof val === 'object' ? val.text : val;
    if (!window.speechSynthesis) return;
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = currentLang === 'or' ? 'or-IN' : (currentLang === 'hi' ? 'hi-IN' : 'en-US');
    // Prefer native voice
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.startsWith(utter.lang));
    if (match) utter.voice = match;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  function init() {
    currentLang = localStorage.getItem('sv_lang') || 'en';
    document.documentElement.lang = currentLang;
    createLanguageToggle();
    translateDOM();
    // Remove i18n-wait class for FOUC prevention
    document.documentElement.classList.remove('i18n-wait');
  }

  return { init, setLang, translateDOM, speak, createLanguageToggle };
})();
