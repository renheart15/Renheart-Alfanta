import { SITE } from "../config";
import styles from "./Hero.module.css";

const techBadges = [
  "React", "Node.js", "Laravel", "Next.js", "IoT", "MongoDB"
];

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* Background grid lines */}
      <div className={styles.grid} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.content}>
          {/* Kicker */}
          <p className={styles.kicker}>
            {SITE.title}
          </p>

          {/* Name */}
          <h1 className={styles.name}>
            Hi, I'm{" "}
            <span className={styles.nameAccent}>{SITE.name.split(" ")[0]}</span>
          </h1>

          {/* Description */}
          <p className={styles.desc}>
            Building scalable web and IoT applications with clean code,
            maintainable architecture, and exceptional user experience.
            Turning ideas into real-world digital products.
          </p>

          {/* Tech badges */}
          <div className={styles.badges}>
            {techBadges.map(t => (
              <span key={t} className={styles.badge}>{t}</span>
            ))}
          </div>

          {/* CTAs */}
          <div className={styles.actions}>
            <a href="#projects" className={styles.ctaPrimary}>
              View my work <ArrowRightIcon />
            </a>
            <a href="#contact" className={styles.ctaSecondary}>
              Get in touch
            </a>
          </div>

          {/* Social links */}
          <div className={styles.socials}>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <span className={styles.socialDivider} />
            <span className={styles.socialInfo}>Cebu, Philippines</span>
          </div>
        </div>

        {/* Photo + decoration */}
        <div className={styles.photoCol}>
          <div className={styles.photoRing}>
            <div className={styles.photoGlow} />
            <img
              className={styles.photo}
              src={SITE.heroPhoto}
              alt={SITE.name}
              width={420}
              height={420}
            />
          </div>
          {/* Floating cards */}
          <div className={styles.floatCard1}>
            <span className={styles.floatIcon}>⚡</span>
            <div>
              <div className={styles.floatLabel}>Full Stack</div>
              <div className={styles.floatSub}>Developer</div>
            </div>
          </div>
          <div className={styles.floatCard2}>
            <span className={styles.floatIcon}>🔌</span>
            <div>
              <div className={styles.floatLabel}>IoT</div>
              <div className={styles.floatSub}>Engineer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
