import { useEffect } from 'react';
import Layout from '../components/Layout';
import GamificationWidgets from '../components/GamificationWidgets';

const DEBUG = true;

export default function Dashboard() {
  useEffect(() => {
    const log = (...args) => { if (DEBUG) console.log('[Dashboard]', ...args); };
    
    const initPageEffects = async () => {
      try {
        // Initialize i18n
        const { default: i18n } = await import('../js/i18n.js');
        window.i18n = i18n;
        i18n.init();
        log('i18n initialized');

        // Initialize other modules
        const { default: Offline } = await import('../js/offline.js');
        window.Offline = Offline;
        Offline.init();
        log('Offline initialized');

        // Initialize AOS
        const { default: AOS } = await import('aos');
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true
        });
        log('AOS initialized');

        // Initialize Feather icons
        const { default: feather } = await import('feather-icons');
        feather.replace();
        log('Feather icons replaced');

        // Refresh AOS after DOM is ready
        setTimeout(() => {
          AOS.refresh();
          log('AOS refreshed');
        }, 200);

      } catch (err) {
        log('Page effects error:', err);
      }
    };

    initPageEffects();
  }, []);

  return (
    <Layout role="student" showSidebar={true}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4" data-aos="fade-up" data-i18n="hero.title">Welcome to Your Dashboard</h1>
        <div data-aos="fade-up" data-aos-delay="100">
          <GamificationWidgets />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300" data-aos="fade-up" data-aos-delay="200">
            <h2 className="font-bold mb-4 text-xl flex items-center">
              <i data-feather="zap" className="w-5 h-5 mr-2 text-yellow-500"></i>
              Quick Actions
            </h2>
            <div className="flex gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
                <i data-feather="play" className="w-4 h-4 mr-2"></i>
                Start Game
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
                <i data-feather="award" className="w-4 h-4 mr-2"></i>
                Daily Challenge
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300" data-aos="fade-up" data-aos-delay="300">
            <h2 className="font-bold mb-4 text-xl flex items-center">
              <i data-feather="calendar" className="w-5 h-5 mr-2 text-blue-500"></i>
              Today's Activities
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <i data-feather="puzzle" className="w-4 h-4 mr-3 text-purple-500"></i>
                Math Escape Room
              </li>
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <i data-feather="users" className="w-4 h-4 mr-3 text-green-500"></i>
                Peer Learning Session
              </li>
              <li className="flex items-center p-2 bg-gray-50 rounded-lg">
                <i data-feather="user-plus" className="w-4 h-4 mr-3 text-pink-500"></i>
                Avatar Creation
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
          <h2 className="font-bold mb-4 text-xl flex items-center">
            <i data-feather="star" className="w-5 h-5 mr-2 text-yellow-500"></i>
            Recent Badges
          </h2>
          <div className="flex gap-3 flex-wrap">
            <span className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-full flex items-center">
              <i data-feather="award" className="w-4 h-4 mr-2"></i>
              Math Master
            </span>
            <span className="bg-green-200 text-green-800 px-4 py-2 rounded-full flex items-center">
              <i data-feather="award" className="w-4 h-4 mr-2"></i>
              Science Star
            </span>
            <span className="bg-blue-200 text-blue-800 px-4 py-2 rounded-full flex items-center">
              <i data-feather="award" className="w-4 h-4 mr-2"></i>
              Tech Explorer
            </span>
          </div>
        </div>
        
        <div className="mt-8" data-aos="fade-up" data-aos-delay="500">
          <h2 className="font-bold mb-4 text-xl flex items-center">
            <i data-feather="user-plus" className="w-5 h-5 mr-2 text-pink-500"></i>
            Avatar Creator
          </h2>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
            <i data-feather="edit" className="w-4 h-4 mr-2"></i>
            Create Avatar
          </button>
        </div>
        
        <div className="mt-8" data-aos="fade-up" data-aos-delay="600">
          <h2 className="font-bold mb-4 text-xl flex items-center">
            <i data-feather="volume-2" className="w-5 h-5 mr-2 text-blue-500"></i>
            Audio Guidance
          </h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
            <i data-feather="play" className="w-4 h-4 mr-2"></i>
            Play Guidance
          </button>
        </div>
      </div>
    </Layout>
  );
}
