import '../styles/Projects.css';

const IconExternal = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const IconGithub = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const projects = [
  {
    num: '01',
    total: '03',
    title: 'Emperors Barbershop',
    desc: 'A complete barbershop management system with online booking, appointment scheduling, customer management, and service tracking. Built for a real barbershop to streamline their daily operations and provide a seamless booking experience for customers.',
    stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    demo: 'https://emperorsbarber.infinityfreeapp.com/',
    github: 'https://github.com/alazarte494-svg/EmperorsBarberShop',
    image: 'emperor.png',
    secondaryImage: 'emperor.png',
  },
  {
    num: '02',
    total: '03',
    title: 'DuriaScan',
    desc: 'A mobile machine learning application for durian leaf disease detection. This innovative app uses TensorFlow Lite and image recognition to identify various durian leaf diseases, helping farmers detect issues early and improve crop yield. Features include real-time detection, disease database, and treatment recommendations.',
    stack: ['TensorFlow Lite', 'React Native', 'Python', 'ML Kit'],
    demo: null, // No demo link for this project
    github: 'https://github.com/alazarte494-svg/Duria-Scan',
    image: 'duriascan.png',
    secondaryImage: 'duriascan3.png',
    reverse: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">

        <div className="section-header reveal">
          <div className="section-tag">Featured Work</div>
          <h2 className="section-title">
            Selected <span className="accent">Projects</span>
          </h2>
        </div>

        <div className="project-showcase">
          {projects.map((p, index) => (
            <div
              className={`project-item reveal${p.reverse ? ' reverse' : ''}`}
              key={p.num}
            >
              {/* Visual */}
              <div className="project-visual">
                <div className="project-img-placeholder">
                  {p.image ? (
                    <div className="project-image-container">
                      <img 
                        src={`/${p.image}`} 
                        alt={p.title}
                        className="project-img"
                      />
                      {p.secondaryImage && p.secondaryImage !== p.image && (
                        <img 
                          src={`/${p.secondaryImage}`} 
                          alt={`${p.title} preview`}
                          className="project-img-secondary"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="project-img-icon">
                      {p.title === 'Emperors Barbershop' && '✂️'}
                      {p.title === 'DuriaScan' && '🌿'}
                    </div>
                  )}
                  <div className="proj-num">{p.num}</div>
                </div>
                <div className="project-visual-overlay" />
              </div>

              {/* Info */}
              <div className="project-info">
                <div className="project-index">
                  Project {p.num} / {p.total}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-stack">
                  {p.stack.map((t) => (
                    <span className="tech-badge" key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {/* Only show Live Demo button if demo exists and is not null */}
                  {p.demo && p.demo !== '#' && (
                    <a 
                      href={p.demo} 
                      className="btn-proj-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconExternal /> Live Demo
                    </a>
                  )}
                  <a 
                    href={p.github} 
                    className="btn-proj-secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconGithub /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}