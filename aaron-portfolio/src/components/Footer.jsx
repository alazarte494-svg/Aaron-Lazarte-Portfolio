import '../styles/Contact.css';

export default function Footer() {
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
    <footer className="footer">
      <div className="footer-line" />
      <div className="footer-bottom">
        <p className="footer-copy">
          Designed and Developed by <span>Aaron Lazarte</span> &copy; 2026
        </p>
        <ul className="footer-links">
          {['home', 'projects', 'contact'].map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => { e.preventDefault(); smoothScroll(id); }}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
