import { useState, useEffect, useCallback } from "react";
import { projects } from "../data/projects";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./Projects.module.css";

/* ── Icons ──────────────────────────────────────── */
function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function MonitorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}

const projectColors = [
  "#3b82f6", "#8b5cf6", "#06b6d4", "#10b981",
  "#f59e0b", "#f43f5e", "#f97316", "#a78bfa",
];

function thumbUrl(url) {
  return `https://s0.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=450`;
}

function placeholderLabel(p) {
  const stack = p.stack.map(s => s.toLowerCase());
  if (stack.includes("flutter") || stack.includes("react native") || stack.includes(".net maui")) return "Mobile App";
  if (p.description.toLowerCase().includes("not yet deployed")) return "Not Deployed";
  return "In Development";
}

/* ── Project Detail Modal ───────────────────────── */
function ProjectModal({ project, color, index, onClose }) {
  const isMobile = placeholderLabel(project) === "Mobile App";

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal thumbnail */}
        <div className={styles.modalThumb}>
          <div className={styles.thumbAccent} style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          {project.live ? (
            <img
              src={thumbUrl(project.live)}
              alt={`${project.title} preview`}
              className={styles.modalThumbImg}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <div className={styles.thumbPlaceholder} style={{ "--proj-color": color }}>
              <div className={styles.thumbPlaceholderDots}><span /><span /><span /></div>
              <div style={{ color, opacity: 0.45 }}>
                {isMobile ? <MonitorIcon /> : <LockIcon />}
              </div>
              <span className={styles.thumbPlaceholderLabel}>{placeholderLabel(project)}</span>
            </div>
          )}
        </div>

        {/* Modal body */}
        <div className={styles.modalBody}>
          <div className={styles.modalHeader}>
            <span className={styles.modalNum} style={{ color }}>
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.modalTitle}>{project.title}</h3>
          </div>

          <p className={styles.modalDesc}>{project.description}</p>

          <div className={styles.modalStack}>
            {project.stack.map(tag => (
              <span key={tag} className={styles.tag} style={{ "--tag-color": color }}>{tag}</span>
            ))}
          </div>

          <div className={styles.modalLinks}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
                <GithubIcon /> View Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className={styles.linkBtnPrimary} style={{ "--link-color": color }}>
                Visit Site <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>

        {/* Close button */}
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────── */
export default function Projects() {
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  const [gridRef, gridVisible]     = useScrollReveal({ threshold: 0.04 });
  const [selected, setSelected]    = useState(null); // { project, color, index }

  const closeModal = useCallback(() => setSelected(null), []);

  const sorted = [
    ...projects.filter(p => p.live),
    ...projects.filter(p => !p.live),
  ];

  return (
    <section id="projects" className={styles.section}>
      <div className="section-inner">

        {/* Header */}
        <div
          ref={headerRef}
          className={styles.header}
          data-reveal="fadeUp"
          data-revealed={headerVisible ? "true" : undefined}
        >
          <p className="section-tag">Portfolio</p>
          <h2 className={`section-title ${styles.title}`}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className={`section-lead ${styles.lead}`}>
            A selection of projects spanning full-stack web apps, IoT systems, and platform engineering.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className={styles.grid}>
          {sorted.map((p, idx) => {
            const color    = projectColors[idx % projectColors.length];
            const isMobile = placeholderLabel(p) === "Mobile App";

            return (
              <article
                key={p.id}
                className={styles.card}
                style={{ "--proj-color": color, "--i": idx }}
                data-reveal="fadeUp"
                data-revealed={gridVisible ? "true" : undefined}
              >
                {/* Thumbnail — click goes to live site */}
                <div className={styles.thumb}>
                  <div className={styles.thumbAccent} style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

                  {p.live ? (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className={styles.thumbLink} aria-label={`Visit ${p.title}`}>
                      <img
                        src={thumbUrl(p.live)}
                        alt={`${p.title} preview`}
                        className={styles.thumbImg}
                        loading="lazy"
                        onError={e => { e.currentTarget.style.display = "none"; }}
                      />
                      <div className={styles.thumbHint}>↗ Visit site</div>
                    </a>
                  ) : (
                    <div className={styles.thumbPlaceholder} style={{ "--proj-color": color }}>
                      <div className={styles.thumbPlaceholderDots}><span /><span /><span /></div>
                      <div style={{ color, opacity: 0.45 }}>
                        {isMobile ? <MonitorIcon /> : <LockIcon />}
                      </div>
                      <span className={styles.thumbPlaceholderLabel}>{placeholderLabel(p)}</span>
                    </div>
                  )}
                </div>

                {/* Bottom strip */}
                <div className={styles.strip}>
                  <div className={styles.stripLeft}>
                    <span className={styles.num} style={{ color }}>{String(idx + 1).padStart(2, "0")}</span>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                  </div>

                  <button
                    className={styles.seeMoreBtn}
                    style={{ "--proj-color": color }}
                    onClick={() => setSelected({ project: p, color, index: idx })}
                    aria-label={`See details for ${p.title}`}
                  >
                    See more <ArrowIcon />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal
          project={selected.project}
          color={selected.color}
          index={selected.index}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
