import { site } from "@/lib/site";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <span>
        © {new Date().getFullYear()} Paul Morar · {site.location}
      </span>
      <div className={styles.links}>
        <a href={site.social.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={site.social.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={site.social.x} target="_blank" rel="noreferrer">
          X
        </a>
        <a href="/writing/rss.xml">RSS</a>
      </div>
    </footer>
  );
}
