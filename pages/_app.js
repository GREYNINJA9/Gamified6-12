import 'aos/dist/aos.css';
import '../styles/globals.css';
import '../css/main.css';
import useLibraryEffects from '../hooks/useLibraryEffects';

export default function App({ Component, pageProps }) {
  useLibraryEffects();
  return <Component {...pageProps} />;
}
