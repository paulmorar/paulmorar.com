import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  summary: string;
  date: string;
  tags?: string[];
};

export type PostMeta = PostFrontmatter & {
  slug: string;
  readingMinutes: number;
  year: number;
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "content", "writing");

function readPostFile(filename: string): Post {
  const filepath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);
  const front = data as PostFrontmatter;
  const slug = filename.replace(/\.mdx?$/, "");
  return {
    ...front,
    slug,
    content,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    year: new Date(front.date).getFullYear(),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): Post | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const c of candidates) {
    const p = path.join(POSTS_DIR, c);
    if (fs.existsSync(p)) return readPostFile(c);
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
