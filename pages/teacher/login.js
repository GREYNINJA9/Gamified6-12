import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';

const VoiceNavigationSystem = dynamic(() => import('../../js/voice-navigation-system.js'), { ssr: false });

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = e => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both Email and Password');
      return;
    }
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <Header role="teacher" />
      <form className="bg-white p-8 rounded shadow w-full max-w-md mt-8" onSubmit={handleLogin}>
        <h2 className="text-2xl font-bold mb-4">Teacher Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded font-bold">Login</button>
        <a href="https://gov.odisha.gov.in/" target="_blank" rel="noopener" className="block mt-2 text-green-700 hover:underline">Government Portal</a>
      </form>
      <div className="mt-4 text-center">
        <a href="/login" className="text-green-600 hover:underline">Student Login</a>
      </div>
    </div>
  );
}
