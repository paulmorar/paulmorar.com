export type Job = {
  company: string;
  href: string;
  title: string;
  start: string;
  end: string;
  description: string;
};

export const about = {
  intro: [
    "I'm Paul, a software engineer based in Copenhagen. I started out designing and shipping front-ends, gradually slid down the stack, and these days I spend most of my time on the seams between product engineering and the platforms that hold it up.",
    "I lead engineers at Banking Circle, where I work on observability, internal tooling, and the boring-but-vital infrastructure that lets teams move quickly without breaking things in production. Before that I built core features and pushed the performance and UX of Saxo Bank's trading app, helped Vivino grow from an online community into a unified e-commerce shop, and shipped the pricing insights at AutoUncle that helped drivers and dealers actually sell their cars.",
  ],
  tools:
    "These days I reach for TypeScript, Go, Kubernetes, OpenTelemetry, Terraform, and a stubborn amount of bash.",
  work: [
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      title: "Principal DevOps Engineer, Technical Lead",
      start: "2024",
      end: "Now",
      description:
        "Leading platform and observability work across the engineering org.",
    },
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      title: "Senior DevOps Engineer, Technical Lead",
      start: "2022",
      end: "2024",
      description:
        "Architected and led the observability initiative. Built reusable platform components for internal engineering teams.",
    },
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      title: "Technical Lead",
      start: "2022",
      end: "2022",
      description:
        "Led a UI team and built core tooling: monorepo, component library, feature flag system.",
    },
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      title: "Lead Front-End Engineer",
      start: "2019",
      end: "2022",
      description:
        "Directed UI architecture and quality. Drove the CI/CD migration and pushed the team toward trunk-based development.",
    },
    {
      company: "Saxo Bank",
      href: "https://www.home.saxo/",
      title: "Senior Software Engineer",
      start: "2018",
      end: "2019",
      description:
        "Worked on multi-window Electron trading apps. Led the Selenium → Cypress migration. Mentored juniors.",
    },
    {
      company: "Vivino",
      href: "https://www.vivino.com/",
      title: "Front-End Engineer",
      start: "2016",
      end: "2018",
      description:
        "Shipped features across Rails, Ember and React/Redux. Pushed BEM and TDD. Led the jQuery/Bootstrap retirement.",
    },
    {
      company: "AutoUncle",
      href: "https://www.autouncle.dk/",
      title: "Designer / Front-End Engineer",
      start: "2015",
      end: "2016",
      description:
        "Designed and built full-stack features. Owned the dealer-facing product and the first two versions of the trading/evaluation flow.",
    },
  ] satisfies Job[],
};
