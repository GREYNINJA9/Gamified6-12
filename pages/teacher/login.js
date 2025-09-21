import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const VoiceNavigationSystem = dynamic(() => import('../../js/voice-navigation-system.js'), { ssr: false });

const DEBUG = true;

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const log = (...args) => { if (DEBUG) console.log('[TeacherLogin]', ...args); };
    
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

        setLoading(false);
      } catch (err) {
        log('Page effects error:', err);
        setLoading(false);
      }
    };

    initPageEffects();
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both Email and Password');
      return;
    }
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Voice Navigation Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-green-50">
        <div id="lang-toggle"></div>
        <div className="flex gap-2">
          <button id="voice-nav-btn" className="voice-nav-btn" title="Start Voice Navigation" data-i18n="voice.start">
            <i data-feather="mic"></i>
          </button>
          <button id="voice-help-btn" className="voice-nav-btn" title="Voice Help" data-i18n="voice.help">
            <i data-feather="help-circle"></i>
          </button>
          <span id="voice-status" className="voice-status" data-i18n="voice.status.idle">Idle</span>
        </div>
      </header>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl" data-aos="fade-up">
          <div className="text-center">
            <img className="mx-auto h-24 w-auto" src="/static/logo.png" alt="STEM Village Logo" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900" data-i18n="teacherlogin.title">
              Teacher Portal
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Track student progress and manage classes
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-feather="mail" className="h-5 w-5 text-gray-400"></i>
                  </div>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-feather="lock" className="h-5 w-5 text-gray-400"></i>
                  </div>
                  <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    autoComplete="current-password" 
                    required 
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-green-600 hover:text-green-500" data-i18n="login.forgot">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <i data-feather="log-in" className="h-5 w-5 text-green-300 group-hover:text-green-200"></i>
                </span>
                <span data-i18n="teacherlogin.button">Sign in</span>
              </button>
            </div>
          </form>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Need help accessing your account? 
              <a href="/contact" className="font-medium text-green-600 hover:text-green-500" data-i18n="login.contact">
                Contact support
              </a>
            </p>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500" data-i18n="teacherlogin.govt">
                  Government Login
                </span>
              </div>
            </div>

            <div className="mt-6">
              <a href="https://gov.odisha.gov.in/" target="_blank" rel="noopener" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <i data-feather="shield" className="h-5 w-5"></i>
                <span className="ml-2">Government Portal</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <Link href="/login" className="text-green-600 hover:underline">
              Student Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
