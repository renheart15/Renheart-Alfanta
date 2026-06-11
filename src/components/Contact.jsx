import { useState } from "react";
import { SITE } from "../config";
import useScrollReveal from "../hooks/useScrollReveal";
import styles from "./Contact.module.css";

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.45 2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.7a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

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

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );
}

const contactInfo = [
  { icon: <MailIcon />,   label: "Email",    value: SITE.contactEmail, href: `mailto:${SITE.contactEmail}` },
  { icon: <PhoneIcon />,  label: "Phone",    value: SITE.phone,        href: `tel:${SITE.phone}` },
  { icon: <MapPinIcon />, label: "Location", value: SITE.location,     href: null },
];

const socials = [
  { label: "GitHub",   icon: <GithubIcon />,   href: SITE.github },
  { label: "LinkedIn", icon: <LinkedinIcon />, href: SITE.linkedin },
];

export default function Contact() {
  const [status,  setStatus]  = useState("idle"); // idle | loading | success | error
  const [errMsg,  setErrMsg]  = useState("");
  const [focused, setFocused] = useState(null);

  // Header
  const [headerRef, headerVisible] = useScrollReveal({ threshold: 0.2 });
  // Info column — slide from left
  const [infoRef, infoVisible]     = useScrollReveal({ threshold: 0.1 });
  // Info cards stagger
  const [cardsRef, cardsVisible]   = useScrollReveal({ threshold: 0.1 });
  // Form — slide from right
  const [formRef, formVisible]     = useScrollReveal({ threshold: 0.08 });

  async function handleSubmit(e) {
    e.preventDefault();
    const form    = e.target;
    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    if (!email || !message) return;

    setStatus("loading");
    setErrMsg("");

    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrMsg(err.message || "Failed to send. Please try again.");
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className="section-inner">

        {/* Header */}
        <div
          ref={headerRef}
          className={styles.header}
          data-reveal="fadeUp"
          data-revealed={headerVisible ? "true" : undefined}
        >
          <p className="section-tag">Get in touch</p>
          <h2 className={`section-title ${styles.title}`}>
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className={`section-lead ${styles.lead}`}>
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            Feel free to reach out through any channel below.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: info column — slides from left */}
          <div
            ref={infoRef}
            className={styles.info}
            data-reveal="slideLeft"
            data-revealed={infoVisible ? "true" : undefined}
          >
            {/* Contact info cards — each staggered */}
            <div ref={cardsRef} className={styles.infoCards}>
              {contactInfo.map(({ icon, label, value, href }, idx) => (
                <div
                  key={label}
                  className={styles.infoCard}
                  style={{ "--i": idx }}
                  data-reveal="fadeUp"
                  data-revealed={cardsVisible ? "true" : undefined}
                >
                  <span className={styles.infoIcon}>{icon}</span>
                  <div>
                    <div className={styles.infoLabel}>{label}</div>
                    {href ? (
                      <a href={href} className={styles.infoValue}>{value}</a>
                    ) : (
                      <span className={styles.infoValue}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.socialBlock}>
              <p className={styles.socialTitle}>Find me on</p>
              <div className={styles.socials}>
                {socials.map(({ label, icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label={label}
                  >
                    {icon}
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form — slides from right */}
          <div
            ref={formRef}
            className={styles.formWrap}
            data-reveal="slideRight"
            data-revealed={formVisible ? "true" : undefined}
          >
            {status === "success" ? (
              <div className={styles.successMsg} role="status">
                <div className={styles.successIcon}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <h3>Message sent!</h3>
                <p>
                  Thanks for reaching out — I'll get back to you within 24–48 hours.
                  A confirmation has been sent to your email.
                </p>
                <button className={styles.resetBtn} onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <div className={`${styles.field} ${focused === "name" ? styles.fieldFocused : ""}`}>
                    <label className={styles.label} htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      className={styles.input}
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      disabled={status === "loading"}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div className={`${styles.field} ${focused === "email" ? styles.fieldFocused : ""}`}>
                    <label className={styles.label} htmlFor="contact-email">
                      Email <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      className={styles.input}
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      disabled={status === "loading"}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>
                <div className={`${styles.field} ${focused === "message" ? styles.fieldFocused : ""}`}>
                  <label className={styles.label} htmlFor="contact-message">
                    Message <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    className={styles.textarea}
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project or opportunity…"
                    required
                    disabled={status === "loading"}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Error alert */}
                {status === "error" && (
                  <div className={styles.errorAlert} role="alert">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {errMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className={styles.spinner} aria-hidden />
                      Sending…
                    </>
                  ) : (
                    <>
                      <SendIcon />
                      Send message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
