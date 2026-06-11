import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal
 *
 * Returns [ref, isVisible].
 * - Observes the element attached to `ref`.
 * - Sets `isVisible = true` the first time the element enters the viewport.
 * - Immediately resolves to `true` when the user prefers reduced motion.
 * - Unobserves after first trigger so the animation plays only once.
 *
 * @param {object} options
 * @param {number}  options.threshold  — 0..1, fraction of element visible before trigger (default 0.08)
 * @param {string}  options.rootMargin — CSS margin shorthand (default "0px 0px -56px 0px")
 */
export default function useScrollReveal({
  threshold = 0.08,
  rootMargin = "0px 0px -56px 0px",
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately show for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once only
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}
