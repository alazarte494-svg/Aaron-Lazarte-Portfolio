import { useEffect } from 'react';
import './styles/global.css';

import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function SectionDivider() {
  return <div className="section-divider" />;
}

export default function App() {
  /* ── Scroll reveal ── */
  useEffect(() => {
    const observe = () => {
      const elements = document.querySelectorAll('.reveal');
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible');
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      elements.forEach((el) => io.observe(el));
      return io;
    };

    // Small delay so all components have mounted
    const timer = setTimeout(() => {
      const io = observe();
      return () => io.disconnect();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>
        <SectionDivider />
        
        <section id="about">
          <About />
        </section>
        <SectionDivider />
        
        <section id="expertise">
          <Expertise />
        </section>
        <SectionDivider />
        
        <section id="projects">
          <Projects />
        </section>
        <SectionDivider />
        
        <section id="certificates">
          <Certificates />
        </section>
        <SectionDivider />
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}