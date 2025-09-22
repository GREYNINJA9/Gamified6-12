/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/login.html', destination: '/login', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/games.html', destination: '/games', permanent: true },
      { source: '/dashboard.html', destination: '/dashboard', permanent: true },
      { source: '/teacher-login.html', destination: '/teacher/login', permanent: true },
      { source: '/teacher-dashboard.html', destination: '/teacher/dashboard', permanent: true },
      { source: '/register.html', destination: '/register', permanent: true },
    ];
  },
  // Uncomment and set basePath if deploying under a subpath
  // basePath: '/learning/gamified6-12',
  // If basePath is set, ensure redirects and SW asset URLs are relative to basePath
};

module.exports = nextConfig;
