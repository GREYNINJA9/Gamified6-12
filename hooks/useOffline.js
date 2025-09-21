import { useState, useEffect } from 'react';

export default function useOffline() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    import('../js/offline.js').then(mod => {
      const Offline = mod.default || mod.Offline;
      setOffline(!Offline.isOnline());
    });
    window.addEventListener('online', () => setOffline(false));
    window.addEventListener('offline', () => setOffline(true));
    return () => {
      window.removeEventListener('online', () => setOffline(false));
      window.removeEventListener('offline', () => setOffline(true));
    };
  }, []);
  return { offline };
}
