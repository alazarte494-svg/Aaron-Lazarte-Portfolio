import '../styles/Contact.css';

const IconGithub = () => (
  <svg width="18" height="18" fill="none" stroke="#CCFF00" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const IconFacebook = () => (
  <svg width="18" height="18" fill="#CCFF00" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const IconEmail = () => (
  <svg width="18" height="18" fill="none" stroke="#CCFF00" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const socialLinks = [
  {
    platform: 'GitHub',
    handle: 'alazarte494-svg',
    href: 'https://github.com/alazarte494-svg',
    icon: <IconGithub />,
  },
  {
    platform: 'Facebook',
    handle: 'Aaron Lazarte',
    href: 'https://www.facebook.com/aaron.lazarte.670555',
    icon: <IconFacebook />,
  },
  {
    platform: 'Email',
    handle: 'alazarte494@gmail.com',
    href: 'mailto:alazarte494@gmail.com',
    icon: <IconEmail />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-layout">

          {/* Left */}
          <div>
            <div className="section-tag reveal">Contact</div>
            <h2 className="contact-tagline reveal reveal-delay-1">
              Let's build<br />something <span>great</span><br />together.
            </h2>
            <p className="contact-subtext reveal reveal-delay-2">
              Whether it's a freelance project, internship opportunity, or just a
              conversation about tech — I'd love to hear from you.
            </p>
          </div>

          {/* Right */}
          <div className="social-links reveal reveal-delay-2">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                className="social-link"
                target={s.platform === 'Email' ? '_self' : '_blank'}
                rel={s.platform !== 'Email' ? 'noopener noreferrer' : ''}
              >
                <div className="social-icon">{s.icon}</div>
                <div className="social-info">
                  <div className="social-platform">{s.platform}</div>
                  <div className="social-handle">{s.handle}</div>
                </div>
                <div className="social-arrow"><IconArrow /></div>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}