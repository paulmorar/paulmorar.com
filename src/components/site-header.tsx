import Link from "next/link";
import styles from "./site-header.module.css";

export function SiteHeader({ active }: { active?: "about" | "writing" }) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand}>
        Paul Morar
      </Link>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/about" data-active={active === "about"}>
          About
        </Link>
        <Link href="/writing" data-active={active === "writing"}>
          Writing
        </Link>
      </nav>
    </header>
  );
}
