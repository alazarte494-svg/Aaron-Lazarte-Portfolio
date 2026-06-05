import { useEffect } from 'react';
import '../styles/Cursor.css';

export default function Cursor() {
  useEffect(() => {
    const hand = document.getElementById('hand-cursor');
    let mx = 0, my = 0, hx = 0, hy = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onMouseLeave = () => {
      hand.style.opacity = '0';
    };

    const onMouseEnter = () => {
      hand.style.opacity = '1';
    };

    function animateHand() {
      hx += (mx - hx) * 0.15;
      hy += (my - hy) * 0.15;
      hand.style.left = hx + 'px';
      hand.style.top = hy + 'px';
      requestAnimationFrame(animateHand);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animateHand();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <svg
      id="hand-cursor"
      className="hand-cursor"
      viewBox="0 0 40 40"
      width="40"
      height="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Palm */}
      <ellipse cx="20" cy="26" rx="10" ry="12" fill="var(--lime)" opacity="0.9" />
      
      {/* Thumb */}
      <path
        d="M 14 22 Q 8 20 6 14"
        stroke="var(--lime)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      
      {/* Index finger */}
      <path
        d="M 16 14 Q 16 6 16 2"
        stroke="var(--lime)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      
      {/* Middle finger */}
      <path
        d="M 20 12 Q 20 4 20 0"
        stroke="var(--lime)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      
      {/* Ring finger */}
      <path
        d="M 24 14 Q 24 6 24 2"
        stroke="var(--lime)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      
      {/* Pinky finger */}
      <path
        d="M 27 18 Q 30 12 32 6"
        stroke="var(--lime)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      
      {/* Glow filter */}
      <defs>
        <filter id="handGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Apply glow */}
      <style>{`
        #hand-cursor {
          filter: drop-shadow(0 0 4px rgba(204, 255, 0, 0.6));
        }
        body:has(a:hover) #hand-cursor,
        body:has(button:hover) #hand-cursor {
          filter: drop-shadow(0 0 8px rgba(204, 255, 0, 0.9)) drop-shadow(0 0 16px rgba(204, 255, 0, 0.4));
        }
      `}</style>
    </svg>
  );
}
