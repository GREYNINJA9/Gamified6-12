import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';

const DEBUG = true; // Set to true for debugging logs

export default function Home() {
  const vantaRef = useRef(null);
  const vantaInstance = useRef(null);
  const vantaError = useRef(null);
  const loading = useRef(true);

  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let mounted = true;
    const log = (...args) => { if (DEBUG) console.log('[Vanta]', ...args); };

    const initVanta = async () => {
      loading.current = true;
      try {
        const [{ default: THREE }, { default: VANTA }] = await Promise.all([
          import('three'),
          import('vanta/dist/vanta.globe.min'),
        ]);
        if (vantaRef.current) {
          vantaInstance.current = VANTA.GLOBE({
            el: vantaRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3b82f6,
            backgroundColor: 0x111827,
            size: 1.00
          });
          log('Vanta initialized');
        }
      } catch (err) {
        vantaError.current = 'Vanta.js failed to load';
        log('Vanta error:', err);
      } finally {
        loading.current = false;
      }
    };

    initVanta();

    const handleResize = () => {
      if (vantaInstance.current && vantaInstance.current.resize) {
        vantaInstance.current.resize();
        log('Vanta resized');
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
      if (vantaInstance.current && vantaInstance.current.destroy) {
        vantaInstance.current.destroy();
        log('Vanta destroyed');
      }
    };
  }, []);

  // Additional effect to ensure AOS and Feather icons work properly
  useEffect(() => {
    const log = (...args) => { if (DEBUG) console.log('[PageEffects]', ...args); };
    
    const initPageEffects = async () => {
      try {
        // Import and initialize AOS
        const { default: AOS } = await import('aos');
        AOS.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true
        });
        log('AOS initialized on page');
        
        // Import and initialize Feather icons
        const { default: feather } = await import('feather-icons');
        feather.replace();
        log('Feather icons replaced on page');
        
        // Refresh AOS after DOM is ready
        setTimeout(() => {
          AOS.refresh();
          log('AOS refreshed on page');
        }, 200);
        
      } catch (err) {
        log('Page effects error:', err);
      }
    };

    initPageEffects();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  }

  function validate() {
    if (!form.email.match(/^[^@]+@[^@]+\\.[^@]+$/)) return 'Enter a valid email.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirm) return 'Passwords do not match.';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setSuccess('Account created! (Demo only)');
    setError('');
    // TODO: Integrate with backend or offline.js
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Vanta.js Background */}
      <div id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div ref={vantaRef} className="absolute inset-0 z-0" id="vanta-bg"></div>
        <div className="container mx-auto px-6 z-10 relative">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">STEM Village</h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">Gamified learning platform for rural students in grades 6-12</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Student Login</a>
              <a href="/teacher/login" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Teacher Portal</a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <a href="#features" className="text-white animate-bounce">
            <i data-feather="chevron-down" className="w-10 h-10"></i>
          </a>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="text-blue-600 mb-4">
                <i data-feather="globe" className="w-10 h-10"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">Offline Access</h3>
              <p className="text-gray-600">Works without internet, perfect for areas with limited connectivity. Syncs progress when back online.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="text-green-600 mb-4">
                <i data-feather="award" className="w-10 h-10"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">Gamified Learning</h3>
              <p className="text-gray-600">Interactive games and challenges make STEM subjects fun and engaging for students.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300" data-aos="fade-up" data-aos-delay="300">
              <div className="text-purple-600 mb-4">
                <i data-feather="bar-chart-2" className="w-10 h-10"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">Teachers can monitor student performance and identify areas needing improvement.</p>
            </div>
            
            {/* Feature 4: AR Showcase */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300" data-aos="fade-up" data-aos-delay="400">
              <div className="text-yellow-600 mb-4">
                <i data-feather="camera" className="w-10 h-10"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">AR Showcase</h3>
              <p className="text-gray-600">Experience augmented reality features that enhance learning and engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">Explore STEM Subjects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Math */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2" data-aos="zoom-in">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i data-feather="divide-square" className="w-8 h-8 text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Mathematics</h3>
              <p className="text-gray-600 text-center">Interactive problems and real-world applications</p>
            </div>
            
            {/* Science */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2" data-aos="zoom-in" data-aos-delay="100">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i data-feather="flask" className="w-8 h-8 text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Science</h3>
              <p className="text-gray-600 text-center">Virtual experiments and discovery games</p>
            </div>
            
            {/* Technology */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2" data-aos="zoom-in" data-aos-delay="200">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i data-feather="cpu" className="w-8 h-8 text-purple-600"></i>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Technology</h3>
              <p className="text-gray-600 text-center">Coding challenges and tech simulations</p>
            </div>
            
            {/* Engineering */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-2" data-aos="zoom-in" data-aos-delay="300">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <i data-feather="tool" className="w-8 h-8 text-red-600"></i>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Engineering</h3>
              <p className="text-gray-600 text-center">Design challenges and problem-solving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">What Teachers Say</h2>
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md" data-aos="fade-right">
              <div className="flex items-center mb-4">
                <img src="http://static.photos/people/200x200/1" alt="Teacher" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Priya Sharma</h4>
                  <p className="text-gray-600 text-sm">Math Teacher, Odisha</p>
                </div>
              </div>
              <p className="text-gray-700">"My students are now excited about math! The gamification elements keep them engaged and motivated to learn."</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-md" data-aos="fade-left" data-aos-delay="100">
              <div className="flex items-center mb-4">
                <img src="http://static.photos/people/200x200/2" alt="Teacher" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">Rajesh Patel</h4>
                  <p className="text-gray-600 text-sm">Science Teacher, Odisha</p>
                </div>
              </div>
              <p className="text-gray-700">"The offline capability is a game-changer for our rural school. Students can continue learning even without internet."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">Ready to Transform Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">Join thousands of students and teachers using STEM Village to make learning fun and effective.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <a href="/register" className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300">Sign Up Free</a>
            <a href="/about" className="bg-transparent border-2 border-white hover:bg-blue-700 font-bold py-3 px-6 rounded-lg transition duration-300">Learn More</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Column 1 */}
            <div>
              <h4 className="text-xl font-bold mb-4">STEM Village</h4>
              <p className="text-gray-400">Gamified learning platform for rural education in Odisha.</p>
            </div>
            
            {/* Column 2 */}
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
                <li><a href="/subjects" className="text-gray-400 hover:text-white transition duration-300">Subjects</a></li>
                <li><a href="/games" className="text-gray-400 hover:text-white transition duration-300">Games</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h4 className="text-xl font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-gray-400 hover:text-white transition duration-300">FAQ</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
                <li><a href="/downloads" className="text-gray-400 hover:text-white transition duration-300">Downloads</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h4 className="text-xl font-bold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i data-feather="facebook"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i data-feather="twitter"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i data-feather="instagram"></i></a>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300"><i data-feather="youtube"></i></a>
              </div>
              <p className="text-gray-400 mt-4">support@stemvillage.edu.in</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400">
            <p>&copy; 2023 STEM Village. A Government of Odisha Initiative.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
