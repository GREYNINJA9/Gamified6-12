import Footer from '../components/Footer';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const bgRef = useRef(null);
  const [vanta, setVanta] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [{ default: NET }, { default: THREE }] = await Promise.all([
        import('vanta/dist/vanta.net.min.js'),
        import('three'),
      ]);
      if (!cancelled && bgRef.current && !vanta) {
        const instance = NET({
          el: bgRef.current,
          THREE,
          color: 0x2563eb,
          backgroundColor: 0xffffff,
          mouseControls: true,
          touchControls: true,
        });
        setVanta(instance);
      }
    })();
    return () => {
      cancelled = true;
      if (vanta && typeof vanta.destroy === 'function') vanta.destroy();
      setVanta(null);
    };
  }, [vanta]);

  return (
    <div>
      <section ref={bgRef} id="hero-bg" className="h-96 flex flex-col justify-center items-center text-center bg-blue-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Gamified Learning for Rural Odisha</h1>
        <p className="mb-6">Offline-first, interactive, and accessible STEM education for grades 6-12</p>
        <Link href="/login" className="bg-yellow-400 text-blue-900 px-6 py-2 rounded font-bold">Get Started</Link>
      </section>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow" data-aos="fade-up">
            <i data-feather="award" className="text-blue-500 text-3xl mb-2"></i>
            <h3 className="font-bold">Gamification</h3>
            <p>Earn coins, badges, and streaks for learning activities.</p>
          </div>
          <div className="bg-white p-4 rounded shadow" data-aos="fade-up">
            <i data-feather="wifi-off" className="text-blue-500 text-3xl mb-2"></i>
            <h3 className="font-bold">Offline Support</h3>
            <p>Access content and games even without internet.</p>
          </div>
          <div className="bg-white p-4 rounded shadow" data-aos="fade-up">
            <i data-feather="mic" className="text-blue-500 text-3xl mb-2"></i>
            <h3 className="font-bold">Voice Navigation</h3>
            <p>Navigate the platform using voice commands.</p>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Subjects</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-blue-100 p-4 rounded text-center">Math</div>
          <div className="bg-green-100 p-4 rounded text-center">Science</div>
          <div className="bg-yellow-100 p-4 rounded text-center">English</div>
          <div className="bg-pink-100 p-4 rounded text-center">Social Studies</div>
        </div>
      </section>
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow" data-aos="fade-right">
            <p>"This platform made learning fun and accessible for my child!"</p>
            <span className="block mt-2 font-bold">Parent, Odisha</span>
          </div>
          <div className="bg-white p-4 rounded shadow" data-aos="fade-left">
            <p>"I love earning coins and badges while studying!"</p>
            <span className="block mt-2 font-bold">Student, Grade 8</span>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start learning?</h2>
        <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded font-bold">Sign Up</Link>
      </section>
      <Footer />
    </div>
  );
}
