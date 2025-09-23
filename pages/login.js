import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

const VoiceNavigationSystem = dynamic(() => import('../js/voice-navigation-system.js'), { ssr: false });
const GuestAccessManager = dynamic(() => import('../js/guest-access-manager.js'), { ssr: false });

const DEBUG = true;

export default function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const log = (...args) => { if (DEBUG) console.log('[Login]', ...args); };
    
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
    if (!studentId || !password) {
      setError('Please enter both Student ID and Password');
      return;
    }
    // Mock auth for student
    if (studentId === '24001008040' && password === 'Grey3503') {
      setError('');
      window.location.href = '/dashboard';
      return;
    }
    setError('Invalid credentials');
  };

  const handleGuestAccess = () => {
    if (window.GuestAccessManager) {
      const sessionId = window.GuestAccessManager.createGuestSession();
      localStorage.setItem('sv_guest_session', sessionId);
      window.location.href = '/dashboard';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e3e6a7] to-[#8587ff]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-pink-50 min-h-screen">
      {/* Voice Navigation Header */}
      <header className="flex justify-between items-center px-4 py-2 bg-blue-50">
        <div className="flex items-center gap-3">
          <Image src="/logo-white.png" alt="Logo" width={36} height={36} className="rounded" />
          <div id="lang-toggle"></div>
        </div>
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
          {/* Toggle between Student and Teacher */}
          <div className="flex rounded-lg p-1 bg-blue-100 text-sm font-semibold">
            <Link href="/login" className="flex-1 text-center py-2 rounded-md bg-white shadow">Student</Link>
            <Link href="/teacher/login" className="flex-1 text-center py-2 rounded-md">Teacher</Link>
          </div>
          <div className="text-center">
            <img className="mx-auto h-24 w-auto" src="/static/logo.png" alt="STEM Village Logo" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900" data-i18n="login.title">
              Student Login
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your gamified learning dashboard
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="student-id" className="sr-only">Student ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i data-feather="user" className="h-5 w-5 text-gray-400"></i>
                  </div>
                  <input 
                    id="student-id" 
                    name="student-id" 
                    type="text" 
                    required 
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    placeholder="Student ID"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
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
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500" data-i18n="login.forgot">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300">
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <i data-feather="log-in" className="h-5 w-5 text-blue-300 group-hover:text-blue-200"></i>
                </span>
                <span data-i18n="login.button">Sign in</span>
              </button>
            </div>
          </form>

          {/* Guest Access Section */}
          <div className="mt-8 text-center">
            <button 
              id="guest-access-btn" 
              className="guest-access-btn w-full" 
              type="button" 
              data-i18n="guest.continue"
              onClick={handleGuestAccess}
            >
              Continue as Guest
            </button>
            <p className="guest-status mt-2" data-i18n="guest.benefits">
              No account needed, start learning immediately. Progress is saved locally.
            </p>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-gray-600">
              Don't have an account? 
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500" data-i18n="login.register">
                Register here
              </a>
            </p>
          </div>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <i data-feather="smartphone" className="h-5 w-5"></i>
                  <span className="ml-2" data-i18n="login.mobileotp">Mobile OTP</span>
                </a>
              </div>

              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <i data-feather="mail" className="h-5 w-5"></i>
                  <span className="ml-2" data-i18n="login.emailotp">Email OTP</span>
                </a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/teacher/login" className="text-blue-600 hover:underline">
              Teacher Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
