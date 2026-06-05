import '../styles/Hero.css';

export default function Hero() {
  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
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

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="hero-grid-bg" />

      <div className="hero-content">
       

        <h1 className="hero-name">
          <span className="line1">Aaron</span>
          <span className="line2">Lazarte</span>
        </h1>

        <p className="hero-tagline">
          <span>IT Student</span>{' '}
          &nbsp;•&nbsp;{' '}
          <span>Web Developer</span>{' '}
          &nbsp;•&nbsp;{' '}
          <span>Software Enthusiast</span>
        </p>

        <p className="hero-desc">
          I build <em>modern digital experiences</em> focused on usability,
          performance, and innovation. Turning complex problems into elegant,
          functional solutions.
        </p>

        <div className="hero-actions">
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); smoothScroll('projects'); }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-secondary"
            onClick={(e) => { e.preventDefault(); smoothScroll('contact'); }}
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
