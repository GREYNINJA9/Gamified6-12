import { useState } from 'react';

export default function Header({ role = 'student', showNavigation = true, offlineStatus = false, userInfo = {} }) {
  const [lang, setLang] = useState('en');
  return (
    <header className={`w-full flex items-center justify-between px-4 py-2 shadow ${role === 'teacher' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
      <div className="flex items-center gap-2">
        <button aria-label="Voice Navigation" className="p-2"><i data-feather="mic"></i></button>
        <span className="font-bold text-lg">{role === 'teacher' ? 'Teacher Portal' : 'STEM Village'}</span>
      </div>
      <div className="flex items-center gap-4">
        {showNavigation && <button className="p-2"><i data-feather="menu"></i></button>}
        <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="p-2">{lang.toUpperCase()}</button>
        {offlineStatus && <span className="text-yellow-300">Offline</span>}
        {role === 'student' && (
          <div className="flex gap-2">
            <span>Coins: {userInfo.coins || 0}</span>
            <span>Streak: {userInfo.streak || 0}</span>
            <span>Badges: {userInfo.badges || 0}</span>
          </div>
        )}
      </div>
    </header>
  );
}
