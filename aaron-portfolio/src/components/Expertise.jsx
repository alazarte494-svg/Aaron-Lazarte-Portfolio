import '../styles/Expertise.css';

const skillCategories = [
  {
    name: 'Frontend Development',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Vue.js'],
  },
  {
    name: 'Backend Development',
    tags: ['Node.js', 'Firebase', 'PHP', 'MySQL', 'REST APIs'],
  },
  {
    name: 'UI/UX Design',
    tags: ['Figma', 'Prototyping', 'Responsive Design', 'Wireframing', 'User Research'],
  },
  {
    name: 'Tools & DevOps',
    tags: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel'],
  },
  {
    name: 'Mobile Dev',
    tags: ['React Native', 'Expo', 'PWA', 'Responsive UI'],
  },
  {
    name: 'Soft Skills',
    tags: ['Problem Solving', 'Team Collaboration', 'Agile', 'Communication'],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="expertise-section">
      <div className="expertise-inner">

        <div className="expertise-intro">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <div className="section-tag reveal">My Stack</div>
            <h2 className="section-title reveal reveal-delay-1">
              Skills &<br /><span className="accent">Expertise</span>
            </h2>
          </div>
        </div>

        <div className="skill-categories reveal reveal-delay-2">
          {skillCategories.map((cat, i) => (
            <div className="skill-cat" key={i}>
              <div className="skill-cat-number">0{i + 1}</div>
              <div className="skill-cat-name">{cat.name}</div>
              <div className="skill-tags">
                {cat.tags.map((tag) => (
                  <span className="skill-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}