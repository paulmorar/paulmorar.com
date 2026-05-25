"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./page-transition.module.css";

/**
 * Plays a two-bar orange sweep across the viewport whenever the
 * pathname changes. The bars meet in the middle, then retract to the
 * opposite edges — like a curtain sliding open over the new page.
 */
export function PageTransition() {
  const pathname = usePathname();
  const [playing, setPlaying] = useState(false);
  const initial = useRef(true);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    setPlaying(true);
  }, [pathname]);

  // The trailing panel finishes last; reset state when its sweep ends so the
  // overlay returns to idle. Native listener (not React's onAnimationEnd)
  // makes the behaviour easy to assert in jsdom-based tests.
  useEffect(() => {
    const node = trailRef.current;
    if (!node) return;
    const onEnd = () => setPlaying(false);
    node.addEventListener("animationend", onEnd);
    return () => node.removeEventListener("animationend", onEnd);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`${styles.overlay} ${playing ? styles.playing : ""}`}
    >
      <div className={styles.panel} />
      <div ref={trailRef} className={styles.panel} data-trail="true" />
    </div>
  );
}
