import { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/Certificates.css';

const IconCarousel = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="18" rx="1" />
    <rect x="14" y="3" width="7" height="18" rx="1" />
  </svg>
);

const IconGrid = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconChevLeft = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const IconChevRight = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const certData = [
  {
    org: 'SimpleLearn',
    name: 'Introduction to Front-End Development',
     date: 'Issued: May 2026',
    image: '/certificate1.png',
  },
  {
    org: 'SimpleLearn',
    name: 'Python for Beginners',
    date: 'Issued: May 2026',
    image: '/certificate2.png',
  },
  {
    org: 'SimpleLearn',
    name: 'Free Full Stack Developer Coursen',
   date: 'Issued: May 2026',
    image: '/certificate3.png',
  },
];

function CertCard({ cert, onOpen, gridMode }) {
  return (
    <div className="cert-card" onClick={() => onOpen(cert)}>
      <div className="cert-img-area">
        <img 
          src={cert.image} 
          alt={cert.name}
          className="cert-image"
        />
      </div>
      <div className="cert-body">
        <div className="cert-org">{cert.org}</div>
        <div className="cert-name">{cert.name}</div>
        <div className="cert-date">{cert.date}</div>
      </div>
    </div>
  );
}

export default function Certificates() {
  const [view, setView] = useState('carousel');
  const [idx, setIdx] = useState(0);
  const [modal, setModal] = useState(null);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);

  const getItemsPerView = useCallback(() => {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }, []);

  const totalSlides = Math.ceil(certData.length / getItemsPerView());

  const goTo = useCallback(
    (i) => {
      const perView = getItemsPerView();
      const clampedIdx = Math.max(0, Math.min(i, Math.ceil(certData.length / perView) - 1));
      setIdx(clampedIdx);

      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector('.cert-card');
      if (!card) return;
      const cardWidth = card.offsetWidth + 16;
      track.style.transform = `translateX(-${clampedIdx * perView * cardWidth}px)`;
    },
    [getItemsPerView]
  );

  useEffect(() => {
    const handleResize = () => goTo(0);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [goTo]);

  const prev = () => {
    const perView = getItemsPerView();
    const total = Math.ceil(certData.length / perView);
    goTo(idx <= 0 ? total - 1 : idx - 1);
  };

  const next = () => {
    const perView = getItemsPerView();
    const total = Math.ceil(certData.length / perView);
    goTo(idx >= total - 1 ? 0 : idx + 1);
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const openModal = (cert) => {
    setModal(cert);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModal(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const perView = getItemsPerView();
  const dots = Math.ceil(certData.length / perView);

  return (
    <section id="certificates" className="certificates-section">
      <div className="certificates-inner">

        {/* Controls */}
        <div className="cert-controls reveal">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="section-tag">Achievements</div>
            <h2 className="section-title">
              Certificates &<br /><span className="accent">Credentials</span>
            </h2>
          </div>
         
        </div>

        {/* CAROUSEL VIEW */}
        {view === 'carousel' && (
          <div className="carousel-wrap">
            <div
              className="carousel-track-outer"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div className="carousel-track" ref={trackRef}>
                {certData.map((cert, i) => (
                  <CertCard cert={cert} key={i} onOpen={openModal} />
                ))}
              </div>
            </div>

            <div className="carousel-nav">
              <button className="carousel-btn" onClick={prev} aria-label="Previous">
                <IconChevLeft />
              </button>
              <div className="carousel-dots">
                {Array.from({ length: dots }).map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot${i === idx ? ' active' : ''}`}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button className="carousel-btn" onClick={next} aria-label="Next">
                <IconChevRight />
              </button>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {view === 'grid' && (
          <div className="cert-grid-view active">
            {certData.map((cert, i) => (
              <CertCard cert={cert} key={i} onOpen={openModal} gridMode />
            ))}
          </div>
        )}

      </div>

      {/* MODAL - Display larger image */}
      {modal && (
        <div
          className={`cert-modal${modal ? ' open' : ''}`}
          onClick={(e) => { if (e.target.classList.contains('cert-modal')) closeModal(); }}
        >
          <div className="modal-inner modal-with-image">
            <button className="modal-close" onClick={closeModal}>✕</button>
            <div className="modal-cert-image">
              <img 
                src={modal.image} 
                alt={modal.name}
                className="modal-cert-img"
              />
            </div>
            <div className="modal-org">{modal.org}</div>
            <div className="modal-name">{modal.name}</div>
            <div className="modal-date">{modal.date}</div>
          </div>
        </div>
      )}
    </section>
  );
}