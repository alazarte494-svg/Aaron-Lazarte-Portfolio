import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const navItems = ['home', 'about', 'expertise', 'projects', 'certificates', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection - IMPROVED
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = s.id;
        }
      });
      
      // If no section is active and at top, set home as active
      if (current === '' && window.scrollY < 100) {
        current = 'home';
      }
      
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial active state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Close mobile menu first
      setMenuOpen(false);
      document.body.style.overflow = '';
      
      // Smooth scroll with offset for navbar
      const navbarHeight = 80;
      const targetPosition = element.offsetTop - navbarHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1 second
      let start = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      if (!prev) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return !prev;
    });
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        {/* Logo */}
        <a
          href="#home"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
        >
          AL <span className="nav-logo-dot" />
        </a>

        {/* Desktop links */}
        <ul className="nav-links">
          {navItems.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={active === id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="nav-cta"
          onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navItems.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => { e.preventDefault(); handleNavClick(id); }}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </>
  );
}