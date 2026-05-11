import { site } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Stringified once at render time; never user input so injection-safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.jobTitle,
  worksFor: {
    "@type": "Organization",
    name: site.worksFor.name,
    url: site.worksFor.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Copenhagen",
    addressCountry: "DK",
  },
  sameAs: [site.social.github, site.social.linkedin, site.social.x],
  image: `${site.url}/apple-icon`,
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en-GB",
  publisher: { "@id": `${site.url}/#person` },
} as const;

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  tags?: readonly string[];
}) {
  const url = `${site.url}/writing/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-GB",
    keywords: post.tags?.join(", "),
    timeRequired: `PT${post.readingMinutes}M`,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    image: `${url}/opengraph-image`,
    url,
  } as const;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}
