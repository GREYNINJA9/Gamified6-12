import { useState, useEffect } from 'react';
import Link from 'next/link';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [confirmValid, setConfirmValid] = useState(null);

  useEffect(() => {
    (async () => {
      if (typeof window !== 'undefined') {
        // i18n
        try {
          const i18n = (await import('../js/i18n.js')).default;
          i18n.init();
        } catch {}
        // Offline
        try {
          const offline = (await import('../js/offline.js')).default;
          if (offline && offline.init) offline.init();
        } catch {}
        // AOS
        try {
          const AOS = (await import('aos')).default;
          AOS.init({ once: true });
        } catch {}
        // Feather icons
        try {
          const feather = (await import('feather-icons')).default;
          feather.replace();
        } catch {}
      }
    })();
  }, []);

  useEffect(() => {
    setEmailValid(emailRegex.test(email));
    setPasswordValid(passwordRegex.test(password));
    setConfirmValid(password && confirmPassword && password === confirmPassword);
  }, [email, password, confirmPassword]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!emailValid) return setError('Please enter a valid email address.');
    if (!passwordValid) return setError('Password must be at least 8 characters, include uppercase, lowercase, and a number.');
    if (!confirmValid) return setError('Passwords do not match.');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess('Account created! (Demo only)');
    }, 1200);
  }

  const isFormValid = emailValid && passwordValid && confirmValid && email && password && confirmPassword;

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 w-full">
        <header className="w-full py-6 flex justify-center items-center bg-stem-blue-600 text-white shadow">
          <h1 className="text-3xl font-bold tracking-tight" data-i18n="register.title">Create your account</h1>
          <button
            aria-label="Voice Navigation"
            className="ml-4 p-2 rounded-full bg-stem-blue-500 hover:bg-stem-blue-700 focus:outline-none focus:ring-2 focus:ring-stem-blue-300"
          >
            <i data-feather="mic" className="h-5 w-5"></i>
          </button>
        </header>
      </div>
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl" data-aos="fade-up">
        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          {/* Email */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-stem-blue-700 mb-1" data-i18n="register.email.text">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`form-input w-full pl-10 border focus:outline-none rounded transition
                ${emailValid === false ? 'border-stem-orange-400' : emailValid ? 'border-stem-green-400' : 'border-gray-300'}
                focus:ring-2 focus:ring-stem-blue-400`}
              placeholder="you@example.com"
              data-i18n="register.email.placeholder"
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-invalid={emailValid === false}
              aria-describedby="email-error"
            />
            <span className="absolute left-3 top-2.5 text-stem-blue-400">
              <i data-feather="mail" className="h-5 w-5"></i>
            </span>
            {email && (
              <div id="email-error" className={`text-xs mt-1 ${emailValid ? 'text-stem-green-600' : 'text-red-600'}`}>{emailValid ? 'Valid email' : 'Invalid email address'}</div>
            )}
          </div>
          {/* Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-stem-blue-700 mb-1" data-i18n="register.password.text">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className={`form-input w-full pl-10 border focus:outline-none rounded transition
                ${passwordValid === false ? 'border-stem-orange-400' : passwordValid ? 'border-stem-green-400' : 'border-gray-300'}
                focus:ring-2 focus:ring-stem-green-400`}
              placeholder="Password"
              data-i18n="register.password.placeholder"
              value={password}
              onChange={e => setPassword(e.target.value)}
              aria-invalid={passwordValid === false}
              aria-describedby="password-error"
            />
            <span className="absolute left-3 top-2.5 text-stem-green-400">
              <i data-feather="lock" className="h-5 w-5"></i>
            </span>
            {password && (
              <div id="password-error" className={`text-xs mt-1 ${passwordValid ? 'text-stem-green-600' : 'text-red-600'}`}>{passwordValid ? 'Strong password' : 'Password must be at least 8 characters, include uppercase, lowercase, and a number.'}</div>
            )}
          </div>
          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-stem-blue-700 mb-1" data-i18n="register.confirm.text">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className={`form-input w-full pl-10 border focus:outline-none rounded transition
                ${confirmValid === false ? 'border-stem-orange-400' : confirmValid ? 'border-stem-green-400' : 'border-gray-300'}
                focus:ring-2 focus:ring-stem-orange-400`}
              placeholder="Confirm Password"
              data-i18n="register.confirm.placeholder"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              aria-invalid={confirmValid === false}
              aria-describedby="confirm-error"
            />
            <span className="absolute left-3 top-2.5 text-stem-orange-400">
              <i data-feather="lock" className="h-5 w-5"></i>
            </span>
            {confirmPassword && (
              <div id="confirm-error" className={`text-xs mt-1 ${confirmValid ? 'text-stem-green-600' : 'text-red-600'}`}>{confirmValid ? 'Passwords match' : 'Passwords do not match'}</div>
            )}
          </div>
          {/* Error and success messages */}
          {error && <div className="text-red-600 mb-2 text-center" role="alert">{error}</div>}
          {success && <div className="text-stem-green-600 mb-2 text-center" role="status">{success}</div>}
          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-gradient-to-r from-stem-blue-500 via-stem-green-400 to-stem-orange-400 text-white font-semibold rounded shadow hover:scale-105 transition-transform group"
            disabled={!isFormValid || loading}
            data-i18n="register.button"
            aria-disabled={!isFormValid || loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Signing up...
              </span>
            ) : (
              'Sign up'
            )}
          </button>
        </form>
        {/* Links */}
        <div className="mt-4 text-center">
          <Link href="/login" className="text-stem-blue-600 hover:underline">Already have an account? Login</Link>
        </div>
        <div className="mt-2 text-center">
          <Link href="/teacher/login" className="text-stem-green-600 hover:underline">Teacher Login</Link>
        </div>
      </div>
    </div>
  );
}
