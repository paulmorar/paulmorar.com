import { Icons } from "@/components/icons";

export const DATA = {
  name: "Paul Morar",
  initials: "PM",
  url: "https://paulmorar.com",
  location: "Copenhagen, Denmark",
  locationLink: "https://www.google.com/maps/place/copenhagen",
  description:
    "Front-End Engineer turned DevOps. I love building things and helping people.",
  summary:
    "Driven by curiosity and a hands-on approach, I have contributed to the development of market-leading products spanning e-commerce and trading applications. Beyond coding, I dedicate my time to family and fostering community engagement. As a co-organizer of the Copenhagen React Meetup and an active member of several programming communities in Copenhagen, I am passionate about sharing knowledge and connecting with like-minded professionals.",
  avatarUrl:
    "https://scontent-cph2-1.xx.fbcdn.net/v/t1.6435-9/94884268_3558506654165406_1295462050297806848_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=fe5cV7hR7W0Q7kNvgG13Iox&_nc_zt=23&_nc_ht=scontent-cph2-1.xx&_nc_gid=AKuykLPeyhFzjg17ODVa773&oh=00_AYADbreEDX4MukxllutjONpyLMVIpUe-4W8-dcEvRL3CGg&oe=678FC218",
  contact: {
    email: "paul@devpill.dk",
    tel: "+4526128555",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/paulmorar",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/paulmorar/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/paulmorar",
        icon: Icons.x,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      badges: [],
      location: "Copenhagen, Denmark",
      title: "Principal DevOps Engineer, Technical Lead",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C560BAQElcEWv2j5lpA/company-logo_100_100/company-logo_100_100/0/1630612375697/saxo_payments_a_s_logo?e=1743638400&v=beta&t=0a6LSvtiT5kguUhTW6_MBMqM7FhnsTyQBBN9rc0aykU",
      start: "January 2024",
      end: "Now",
      description: ["Ongoing..."],
    },
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      badges: [],
      location: "Copenhagen, Denmark",
      title: "Senior DevOps Engineer, Technical Lead",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C560BAQElcEWv2j5lpA/company-logo_100_100/company-logo_100_100/0/1630612375697/saxo_payments_a_s_logo?e=1743638400&v=beta&t=0a6LSvtiT5kguUhTW6_MBMqM7FhnsTyQBBN9rc0aykU",
      start: "December 2022",
      end: "January 2024",
      description: [
        "Architected, built, and led the observability initiative across the organization, ensuring robust monitoring, logging, and metrics solutions for all systems.",
        "Led a team of engineers to design and develop core platform components, creating scalable and reusable solutions for internal engineering teams.",
        "Optimized and streamlined development workflows, facilitating the migration and integration of shared components across the engineering organization.",
      ],
    },
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      badges: [],
      location: "Copenhagen, Denmark",
      title: "Technical Lead",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C560BAQElcEWv2j5lpA/company-logo_100_100/company-logo_100_100/0/1630612375697/saxo_payments_a_s_logo?e=1743638400&v=beta&t=0a6LSvtiT5kguUhTW6_MBMqM7FhnsTyQBBN9rc0aykU",
      start: "April 2022",
      end: "December 2022",
      description: [
        "Architected and led the development of key UI tooling, including monorepo solutions, a UI component library, and a feature flag system, enhancing development efficiency and consistency.",
        "Contributed to an internal team focused on automation, with primary objectives centered on release processes and infrastructure optimization.",
        "Led a team of UI developers, delivering high-quality solutions for both client-facing and internal applications while fostering collaboration and technical excellence.",
      ],
    },
    {
      company: "Banking Circle",
      href: "https://www.bankingcircle.com/",
      badges: [],
      location: "Copenhagen, Denmark",
      title: "Lead Front-End Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C560BAQElcEWv2j5lpA/company-logo_100_100/company-logo_100_100/0/1630612375697/saxo_payments_a_s_logo?e=1743638400&v=beta&t=0a6LSvtiT5kguUhTW6_MBMqM7FhnsTyQBBN9rc0aykU",
      start: "December 2019",
      end: "April 2022",
      description: [
        "Directed the development and implementation of all UI solutions, prioritizing quality, performance, and scalability.",
        "Facilitated a core CI/CD migration, leading strategy and execution to streamline deployment processes.",
        "Outlined and architected new core system applications, ensuring robust and maintainable designs aligned with business objectives.",
        "Established and implemented an agile development process centered on trunk-based development, improving team collaboration and delivery speed.",
      ],
    },
    {
      company: "Saxo",
      href: "https://www.home.saxo/",
      badges: [],
      location: "Copenhagen, Denmark",
      title: "Senior Software Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQGZpPwTEW-BbA/company-logo_100_100/company-logo_100_100/0/1663238574892/saxo_bank_logo?e=1743638400&v=beta&t=zNk8qqayPXNz4JrsNsp_Za3dae4_UXHXW30BMvOjKSc",
      start: "March 2018",
      end: "December 2019",
      description: [
        "Maintained and enhanced a monolithic JavaScript architecture, ensuring reliability and scalability.",
        "Contributed to the development of a multi-window trading application built on Electron, improving usability and performance for end users.",
        "Led the migration from Selenium to Cypress.js for automated testing, significantly improving testing efficiency and reliability.",
        "Coached and mentored junior developers, fostering skill development and ensuring high-quality contributions.",
        "Worked across multiple trading applications, leveraging React, Redux, and C# to deliver robust and efficient solutions.",
      ],
    },
    {
      company: "Vivino",
      href: "https://www.vivino.com/",
      badges: [],
      location: "Copenhagen, Denmark",
      title: "Front-End Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQFVdaUYFi8Dxg/company-logo_100_100/company-logo_100_100/0/1630584480110/vivino_logo?e=1743638400&v=beta&t=nNydmVoBHJGTUlN0jWdfmjp07Fky2o450riX-ceVzuE",
      start: "August 2016",
      end: "March 2018",
      description: [
        "Designed and developed applications using modern frameworks, including Ruby on Rails, Ember, and React with Redux, ensuring scalable and maintainable solutions.",
        "Spearheaded the adoption of a component-based architecture by implementing the BEM methodology, enhancing reusability and readability of UI components.",
        "Advocated for and practiced Test-Driven Development (TDD) using Enzyme with Jest for JavaScript and RSpec for Ruby, ensuring high-quality, reliable code.",
        "Created custom utility libraries for event tracking and analytics, streamlining tracking implementation across applications.",
        "Led the migration away from jQuery and Bootstrap, modernizing all applications and reducing reliance on outdated dependencies.",
      ],
    },
    {
      company: "AutoUncle",
      href: "https://www.autouncle.dk/",
      badges: [],
      location: "Aarhus, Denmark",
      title: "Designer / Front-End Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQFN3d2ZihT2Fw/company-logo_100_100/company-logo_100_100/0/1631341012081?e=1743638400&v=beta&t=lk8XhIC1FqbhPLmNa0JqQxFW0gyaYKi5eLkA34SnII4",
      start: "July 2015",
      end: "August 2016",
      description: [
        "Designed and developed full-stack features, delivering scalable and impactful solutions.",
        "Owned the development and roadmap of all auto-dealer-facing features, ensuring alignment with business objectives and user needs.",
        "Spearheaded the design and implementation of versions 1 and 2 of the company's core car trading and evaluation feature, now a central part of their platform.",
      ],
    },
  ],
  education: [
    {
      school: "Business Academy Aarhus",
      href: "https://www.baaa.dk/",
      degree: "Bachelor's Degree of Web Development",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/D4E0BAQHF6YW9LsBx_w/company-logo_100_100/company-logo_100_100/0/1664796105183/erhvervsakademi_aarhus_business_academy_aarhus_logo?e=1743638400&v=beta&t=12FM3J7oYGE1TnpmYY_7jd1ds5UzZpGURRSvURaB_CE",
      start: "2011",
      end: "2013",
    },
    {
      school: "Aarhus Tech",
      href: "https://www.aarhustech.dk/",
      degree: "AP Degree, Multimedia Design and Communication",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQFmy2E82LlF5g/company-logo_100_100/company-logo_100_100/0/1631347640689?e=1743638400&v=beta&t=8IG5zG4FdvhzfeXlz5_BcHc_9yYF9ZMWjnpheIvkoAs",
      start: "2009",
      end: "2011",
    },
    {
      school: "Emil Racovita High School - Mathemathics and Computer Science",
      href: "#",
      degree: "High School and IB Diploma",
      logoUrl: "",
      start: "2005",
      end: "2009",
    },
  ],
};
