import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const DEBUG = true;

export default function useLibraryEffects() {
  const router = useRouter();
  const featherRef = useRef(null);
  const aosRef = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const log = (...args) => { if (DEBUG) console.log('[LibraryEffects]', ...args); };

    const importLibs = async () => {
      try {
        const [{ default: feather }, { default: AOS }] = await Promise.all([
          import('feather-icons'),
          import('aos'),
        ]);
        featherRef.current = feather;
        aosRef.current = AOS;
        
        // Initialize AOS first
        if (AOS.init) {
          AOS.init({ 
            duration: 800,
            easing: 'ease-in-out',
            once: true 
          });
          log('AOS initialized');
        }
        
        // Replace feather icons
        feather.replace();
        log('Feather icons replaced');
        
        // Refresh AOS after a short delay to ensure DOM is ready
        setTimeout(() => {
          if (AOS.refresh) {
            AOS.refresh();
            log('AOS refreshed');
          }
        }, 100);
        
        initialized.current = true;
        log('Feather and AOS initialized');
      } catch (err) {
        log('Library import error:', err);
      }
    };

    importLibs();

    const onRouteChange = () => {
      log('Route change detected');
      setTimeout(() => {
        try {
          if (featherRef.current) featherRef.current.replace();
          if (aosRef.current && aosRef.current.refreshHard) aosRef.current.refreshHard();
          else if (aosRef.current && aosRef.current.refresh) aosRef.current.refresh();
          log('Feather replaced and AOS refreshed');
        } catch (err) {
          log('Route change effect error:', err);
        }
      }, 0);
    };
    router.events.on('routeChangeComplete', onRouteChange);

    return () => {
      isMounted = false;
      router.events.off('routeChangeComplete', onRouteChange);
      log('Cleanup library effects');
    };
  }, [router.events]);
}
