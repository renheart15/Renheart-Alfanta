import { experience } from "../data/experience";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./Experience.module.css";

function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/**
 * Each experience item gets its own observer so they animate individually.
 * This component wraps a single timeline entry.
 */
function ExperienceItem({ exp, idx }) {
  const [itemRef, itemVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={itemRef}
      className={styles.item}
      style={{ "--i": idx }}
      data-reveal="slideLeft"
      data-revealed={itemVisible ? "true" : undefined}
    >
      {/* Timeline dot */}
      <div className={styles.timelineDot}>
        <div className={styles.dot} />
        <div className={styles.line} />
      </div>

      {/* Card */}
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <div className={styles.cardLeft}>
            <div className={styles.role}>{exp.title}</div>
            <div className={styles.company}>
              <BuildingIcon />
              {exp.company}
            </div>
          </div>
          <div className={styles.cardRight}>
            <span className={styles.duration}>
              <CalendarIcon />
              {exp.duration}
            </span>
            <span className={styles.location}>
              <MapPinIcon />
              {exp.location}
            </span>
          </div>
        </div>

        {exp.email && (
          <a href={`mailto:${exp.email}`} className={styles.email}>
            {exp.email}
          </a>
        )}

        <ul className={styles.highlights}>
          {exp.highlights.map((h, i) => (
            <li key={i} className={styles.highlight}>
              <span className={styles.checkIcon}><CheckIcon /></span>
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="experience" className={styles.section}>
      <div className="section-inner">

        <div
          ref={headerRef}
          className={styles.header}
          data-reveal="fadeUp"
          data-revealed={headerVisible ? "true" : undefined}
        >
          <p className="section-tag">Career</p>
          <h2 className={`section-title ${styles.title}`}>
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          {experience.map((exp, idx) => (
            <ExperienceItem key={exp.id} exp={exp} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
