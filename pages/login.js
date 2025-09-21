import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Link from 'next/link';

const VoiceNavigationSystem = dynamic(() => import('../js/voice-navigation-system.js'), { ssr: false });
const GuestAccessManager = dynamic(() => import('../js/guest-access-manager.js'), { ssr: false });

export default function Login() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    if (!studentId || !password) {
      setError('Please enter both Student ID and Password');
      return;
    }
    // Integrate with login logic
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <Header role="student" />
      <form className="bg-white p-8 rounded shadow w-full max-w-md mt-8" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Student Login</h2>
        <input type="text" placeholder="Student ID" value={studentId} onChange={e => setStudentId(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold">Login</button>
        <button type="button" className="w-full bg-gray-300 text-blue-900 p-2 rounded font-bold mt-2">Guest Access</button>
      </form>
      <div className="mt-4 text-center">
        <Link href="/teacher/login" className="text-blue-600 hover:underline">Teacher Login</Link>
      </div>
    </div>
  );
}
