# paulmorar.com

The source for [paulmorar.com](https://paulmorar.com) — my personal site. A small, fast, content-first site for the writing I want to keep, the work I've done, and a way to find me.

Built deliberately with no UI framework, no CSS-in-JS runtime, and no client-side state. Just MDX, CSS Modules, and Next.js doing the static-site thing it's good at.

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack, RSC)
- **React 19**, **TypeScript 5** (strict)
- **CSS Modules** + native nesting + `clamp()` for fluid type — no Tailwind
- **MDX** via [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) with [`rehype-pretty-code`](https://rehype-pretty-code.netlify.app/) and Shiki for syntax highlighting
- **[Vitest 4](https://vitest.dev)** + Testing Library + jsdom
- Deployed on **Vercel**

## Structure

```
src/
├── app/                      # Next App Router
│   ├── layout.tsx            # Root layout, metadata, JSON-LD
│   ├── page.tsx              # Home (business card)
│   ├── globals.css           # Design tokens + base styles
│   ├── about/                # About page
│   ├── writing/              # Blog index, post pages, RSS feed
│   ├── icon.tsx              # 32×32 favicon (generated)
│   ├── apple-icon.tsx        # 180×180 apple touch icon (generated)
│   ├── opengraph-image.tsx   # /og social card (generated, per-route)
│   ├── robots.ts             # /robots.txt
│   └── sitemap.ts            # /sitemap.xml
├── components/               # Site chrome (header, footer)
├── content/writing/          # MDX posts (frontmatter + content)
└── lib/                      # site config, posts loader, SEO helpers
tests/                        # Vitest tests
public/                       # Static assets + web manifest
```

Posts live as MDX files under [src/content/writing](src/content/writing). Frontmatter shape:

```mdx
---
title: "Post title"
summary: "One sentence summary used in the index, RSS, and OG image."
date: "YYYY-MM-DD"
tags: ["platform", "observability"]
---

Body in MDX. Code fences support `title="…"` and `{1,3-5}` line highlighting via rehype-pretty-code.
```

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Vitest with v8 coverage report |

## Writing a post

1. Create `src/content/writing/<slug>.mdx` with the frontmatter above.
2. Write. Use fenced code blocks for highlighting.
3. The post is automatically picked up by the writing index, the RSS feed, the sitemap, and gets its own OG image.

## SEO & metadata

The site ships with:

- Per-route `generateMetadata` with canonical URLs, OpenGraph, and Twitter cards
- JSON-LD: `Person`, `WebSite`, `Blog`, `BlogPosting`, `BreadcrumbList`, `ProfilePage`
- Auto-generated `/sitemap.xml` and `/robots.txt`
- File-convention OG images per route (home, about, writing, individual posts) rendered with [`next/og`](https://nextjs.org/docs/app/api-reference/functions/image-response) using Caveat + DM Sans bundled locally via `@fontsource`
- Auto-generated favicon and apple-touch-icon

See [src/lib/seo.tsx](src/lib/seo.tsx) and [src/lib/site.ts](src/lib/site.ts) for the source of truth.

## Design system

Defined as CSS custom properties in [src/app/globals.css](src/app/globals.css):

- **Palette** — warm cream `#FEFDF8`, ink `#1B1B1F`, accent orange `#E8603C`, available-dot green `#10B981`
- **Type** — Caveat for orange accents, DM Sans for body, JetBrains Mono for code
- **Scale** — `--step-0` through `--step-5`, fluid via `clamp()`
- **Layout** — 60rem content width with fluid padding

## Tests

```bash
npm test
```

Covers the post loader, RSS escaping, page rendering, and site chrome. Tests mock `next/font`, `next/navigation`, and `next-mdx-remote/rsc` (see [tests/setup.tsx](tests/setup.tsx)) so they run in jsdom without hitting the network.

## Deployment

Push to `master`. Vercel deploys.

## License

[MIT](LICENSE).
