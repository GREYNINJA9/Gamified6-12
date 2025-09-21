import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useEffect } from 'react';

export default function Layout({ role = 'student', showSidebar = true, children }) {
  useEffect(() => {
    // Initialize global modules
    import('../js/i18n.js').then(mod => window.i18n = mod.default || mod);
    import('../js/offline.js').then(mod => window.Offline = mod.default || mod);
    import('../js/voice-navigation-system.js').then(mod => window.VoiceNavigationSystem = mod.default || mod);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${role === 'teacher' ? 'bg-green-50' : 'bg-blue-50'}`}>
      <Header role={role} />
      <div className="flex flex-1">
        {showSidebar && <Sidebar role={role} />}
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
