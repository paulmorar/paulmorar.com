import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { about } from "@/lib/about";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "About Paul Morar — engineer in Copenhagen.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="about" />
      <main className={styles.main}>
        <h1 className={styles.title}>About</h1>

        <div className={styles.prose}>
          {about.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <p className={styles.tools}>{about.tools}</p>

        <section className={styles.section} aria-labelledby="work-heading">
          <h2 id="work-heading" className={styles.sectionTitle}>
            Work
          </h2>
          <ol className={styles.timeline}>
            {about.work.map((job, i) => (
              <li key={i} className={styles.job}>
                <div className={styles.years}>
                  {job.start} — {job.end}
                </div>
                <div className={styles.role}>
                  <h3>{job.title}</h3>
                  <span className={styles.company}>
                    <a href={job.href} target="_blank" rel="noreferrer">
                      {job.company}
                    </a>
                  </span>
                  <p>{job.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
