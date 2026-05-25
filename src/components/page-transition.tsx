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

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    setPlaying(true);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`${styles.overlay} ${playing ? styles.playing : ""}`}
      onAnimationEnd={(event) => {
        // The trailing panel ends last; reset state after it finishes.
        if ((event.target as HTMLElement).dataset.trail === "true") {
          setPlaying(false);
        }
      }}
    >
      <div className={styles.panel} />
      <div className={styles.panel} data-trail="true" />
    </div>
  );
}
