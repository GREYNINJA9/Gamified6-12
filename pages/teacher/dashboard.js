import { useEffect } from 'react';
import Layout from '../../components/Layout';

const DEBUG = true;

export default function TeacherDashboard() {
  useEffect(() => {
    const log = (...args) => { if (DEBUG) console.log('[TeacherDashboard]', ...args); };
    
    const initPageEffects = async () => {
      try {
        // Initialize i18n
        const { default: i18n } = await import('../../js/i18n.js');
        window.i18n = i18n;
        i18n.init();
        log('i18n initialized');

        // Initialize other modules
        const { default: Offline } = await import('../../js/offline.js');
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
    <Layout role="teacher" showSidebar={true}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4" data-aos="fade-up" data-i18n="analytics.dashboard">Teacher Analytics Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300" data-aos="fade-up" data-aos-delay="200">
            <h2 className="font-bold mb-4 text-xl flex items-center">
              <i data-feather="bar-chart-2" className="w-5 h-5 mr-2 text-green-500"></i>
              Class Performance
            </h2>
            <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <i data-feather="trending-up" className="w-12 h-12 text-green-600 mx-auto mb-2"></i>
                <p className="text-green-700 font-semibold">Performance Chart</p>
                <p className="text-sm text-green-600">Chart.js Integration</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300" data-aos="fade-up" data-aos-delay="300">
            <h2 className="font-bold mb-4 text-xl flex items-center">
              <i data-feather="users" className="w-5 h-5 mr-2 text-blue-500"></i>
              Student Activity
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Name</th>
                    <th className="px-4 py-2 font-semibold">Activity</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">Student A</td>
                    <td className="px-4 py-2 flex items-center">
                      <i data-feather="percent" className="w-4 h-4 mr-2 text-blue-500"></i>
                      Math
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Student B</td>
                    <td className="px-4 py-2 flex items-center">
                      <i data-feather="zap" className="w-4 h-4 mr-2 text-green-500"></i>
                      Science
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">In Progress</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Student C</td>
                    <td className="px-4 py-2 flex items-center">
                      <i data-feather="cpu" className="w-4 h-4 mr-2 text-purple-500"></i>
                      Technology
                    </td>
                    <td className="px-4 py-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Started</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="mt-8" data-aos="fade-up" data-aos-delay="400">
          <h2 className="font-bold mb-4 text-xl flex items-center">
            <i data-feather="alert-triangle" className="w-5 h-5 mr-2 text-red-500"></i>
            Weak Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-red-800 flex items-center">
                <i data-feather="calculator" className="w-4 h-4 mr-2"></i>
                Algebra
              </h3>
              <p className="text-sm text-red-600 mt-1">3 students struggling</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="font-semibold text-red-800 flex items-center">
                <i data-feather="zap" className="w-4 h-4 mr-2"></i>
                Physics: Motion
              </h3>
              <p className="text-sm text-red-600 mt-1">2 students struggling</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8" data-aos="fade-up" data-aos-delay="500">
          <h2 className="font-bold mb-4 text-xl flex items-center">
            <i data-feather="download" className="w-5 h-5 mr-2 text-green-500"></i>
            Data Export
          </h2>
          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
              <i data-feather="file-text" className="w-4 h-4 mr-2"></i>
              Export CSV
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
              <i data-feather="bar-chart" className="w-4 h-4 mr-2"></i>
              Generate Report
            </button>
          </div>
        </div>
        
        <div className="mt-8" data-aos="fade-up" data-aos-delay="600">
          <h2 className="font-bold mb-4 text-xl flex items-center">
            <i data-feather="settings" className="w-5 h-5 mr-2 text-gray-500"></i>
            Class Management
          </h2>
          <div className="flex gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
              <i data-feather="users" className="w-4 h-4 mr-2"></i>
              Manage Classes
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
              <i data-feather="user-plus" className="w-4 h-4 mr-2"></i>
              Add Students
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition duration-300 flex items-center">
              <i data-feather="book-open" className="w-4 h-4 mr-2"></i>
              Assign Activities
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
