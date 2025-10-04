import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Cloud } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled || !isHome ? 'bg-white/90 shadow-sm backdrop-blur-sm dark:bg-slate-900/90' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Container className="h-8 w-8 text-brand-primary" />
              <Cloud className="h-4 w-4 text-brand-accent absolute -top-1 -right-1" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              CustomCloud: DockLaunch
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-brand-primary dark:text-slate-200 transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-slate-700 hover:text-brand-primary dark:text-slate-200 transition-colors">
              Features
            </Link>
          
            <a
                href="https://github.com/phyrnna05"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 px-4"
              >
                Get Started
              </a>
          </nav>
          
          <button className="md:hidden text-slate-700 dark:text-slate-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;