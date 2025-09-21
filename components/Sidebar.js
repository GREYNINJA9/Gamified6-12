import Link from 'next/link';

const studentLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: 'home' },
  { href: '/games', label: 'Games', icon: 'gamepad' },
  { href: '/login', label: 'Login', icon: 'user' },
];
const teacherLinks = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: 'bar-chart-2' },
  { href: '/teacher/login', label: 'Login', icon: 'user-check' },
];

export default function Sidebar({ role = 'student', activeRoute = '/' }) {
  const links = role === 'teacher' ? teacherLinks : studentLinks;
  return (
    <aside className={`w-64 p-4 ${role === 'teacher' ? 'bg-green-100' : 'bg-blue-100'} min-h-full`}>
      <div className="mb-6">
        <div className="font-bold">{role === 'teacher' ? 'Teacher' : 'Student'} Profile</div>
        <div className="text-sm text-gray-500">{role === 'teacher' ? 'teacher@school.edu' : 'student@school.edu'}</div>
      </div>
      <nav>
        {links.map(link => (
          <Link key={link.href} href={link.href} className={`flex items-center gap-2 p-2 rounded hover:bg-gray-200 ${activeRoute === link.href ? 'bg-gray-300' : ''}`}>
            <i data-feather={link.icon}></i>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <button className="mt-8 w-full p-2 bg-red-500 text-white rounded">Logout</button>
    </aside>
  );
}
