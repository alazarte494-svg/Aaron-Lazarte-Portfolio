import { useRef, useState } from 'react';
import '../styles/About.css';



export default function About() {
  const frameRef = useRef(null);
  const tearTimeout = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  /* 3D Tilt */
  const handleMouseMove = (e) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;
    frame.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  /* Paper tear + shards */
  const createShards = (cx, cy) => {
    for (let i = 0; i < 14; i++) {
      const shard = document.createElement('div');
      shard.className = 'tear-shard';
      const angle = (i / 14) * Math.PI * 2;
      const dist = 50 + Math.random() * 90;
      const tx = Math.cos(angle) * dist * (Math.random() * 0.8 + 0.5);
      const ty = Math.sin(angle) * dist * (Math.random() * 0.8 + 0.5) - 30;
      const rot = (Math.random() - 0.5) * 180;
      shard.style.setProperty('--tx', `${tx}px`);
      shard.style.setProperty('--ty', `${ty}px`);
      shard.style.setProperty('--rot', `${rot}deg`);
      shard.style.left = `${cx}px`;
      shard.style.top = `${cy}px`;
      shard.style.width = `${5 + Math.random() * 14}px`;
      shard.style.height = `${3 + Math.random() * 10}px`;
      document.body.appendChild(shard);
      setTimeout(() => shard.remove(), 800);
    }
  };

  const handleClick = () => {
    const frame = frameRef.current;
    if (!frame || tearTimeout.current) return;
    const rect = frame.getBoundingClientRect();
    createShards(rect.left + rect.width / 2, rect.top + rect.height / 2);

    frame.classList.add('flip-card');
    const img = frame.querySelector('img');
    if (img) { img.style.filter = 'brightness(1.3) contrast(1.2)'; }

    // Toggle flip state after animation starts
    setTimeout(() => {
      setIsFlipped(!isFlipped);
    }, 300);

    tearTimeout.current = setTimeout(() => {
      frame.classList.remove('flip-card');
      if (img) img.style.filter = '';
      tearTimeout.current = null;
    }, 600);
  };

  return (
    <section id="about" className="about-section">
      <div className="about-layout">

        {/* Photo */}
        <div className="about-visual reveal">
          <div
            className="photo-frame"
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          >
            <div className="photo-placeholder">
              {/* Replace src with your actual photo path */}
           <img src={isFlipped ? "/profileback2.png" : "/profile.JPG"} alt="Aaron Lazarte" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="about-info">
          <div className="section-header">
            <div className="section-tag">About Me</div>
            <h2 className="section-title reveal reveal-delay-1">
              Learning <span className="accent">Building</span><br />Improving
            </h2>
          </div>

          <p className="about-bio reveal reveal-delay-2">
            Hi, I'm Aaron Lazarte, an IT student and aspiring software developer. I enjoy building meaningful projects, learning new technologies, and growing my skills every day.
          </p>

          <blockquote className="about-mission reveal reveal-delay-3">
            "My goal is to keep learning, grow as a developer, and create projects that make a positive impact."
          </blockquote>

          
        </div>

      </div>
    </section>
  );
}
