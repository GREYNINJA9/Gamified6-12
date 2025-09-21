import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'aos/dist/aos.css';

export default function useLibraryEffects() {
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const [{ default: feather }, { default: AOS }] = await Promise.all([
        import('feather-icons'),
        import('aos'),
      ]);
      feather.replace();
      AOS.init({ once: true });
    };
    init();
    const onRouteChange = () => init();
    router.events.on('routeChangeComplete', onRouteChange);
    return () => router.events.off('routeChangeComplete', onRouteChange);
  }, [router.events]);
}
