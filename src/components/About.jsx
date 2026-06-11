import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./About.module.css";

const skills = [
  {
    category: "Frontend",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    color: "#3b82f6",
    items: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "JavaScript"],
  },
  {
    category: "Backend",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    color: "#8b5cf6",
    items: ["Laravel", "Node.js", "PHP", "REST APIs", "dompdf"],
  },
  {
    category: "Mobile",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    color: "#10b981",
    items: ["Flutter", ".NET MAUI", "React Native"],
  },
  {
    category: "Database",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    color: "#f59e0b",
    items: ["MySQL", "MongoDB", "Firebase"],
  },
  {
    category: "IoT & Tools",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M16.24 7.76a6 6 0 0 1 0 8.49M7.76 7.76a6 6 0 0 0 0 8.49M21 12h-3M6 12H3M12 3V6M12 18v3"/>
      </svg>
    ),
    color: "#06b6d4",
    items: ["Arduino", "IoT Systems", "Git", "FFmpeg", "WAMP", "Laragon"],
  },
  {
    category: "Specialization",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    color: "#f43f5e",
    items: ["Full-Stack Dev", "IoT Systems", "System Documentation", "Agile/Scrum"],
  },
];

export default function About() {
  // Header reveal — fires when heading enters viewport
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  // Grid reveal — fires when the grid wrapper enters viewport
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="about" className={styles.section}>
      <div className="section-inner">

        {/* Section header with a single fadeUp reveal */}
        <div
          ref={headerRef}
          className={styles.header}
          data-reveal="fadeUp"
          data-revealed={headerVisible ? "true" : undefined}
        >
          <p className="section-tag">Who I am</p>
          <h2 className={`section-title ${styles.title}`}>
            About <span className="gradient-text">Me</span>
          </h2>
          <p className={`section-lead ${styles.lead}`}>
            A passionate Full Stack Developer &amp; IoT Engineer based in Cebu, Philippines.
            I specialize in building scalable, user-centric applications and love bridging
            the gap between hardware and software through IoT solutions.
          </p>
        </div>

        {/* Cards grid — staggered fadeUp per card */}
        <div ref={gridRef} className={styles.grid}>
          {skills.map(({ category, icon, color, items }, idx) => (
            <div
              key={category}
              className={styles.card}
              style={{ "--card-color": color, "--i": idx }}
              data-reveal="fadeUp"
              data-revealed={gridVisible ? "true" : undefined}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon} style={{ color }}>{icon}</span>
                <h3 className={styles.cardTitle}>{category}</h3>
              </div>
              <div className={styles.tags}>
                {items.map(item => (
                  <span key={item} className={styles.tag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
