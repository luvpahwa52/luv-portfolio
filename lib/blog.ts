import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

export type Post = {
  // Core (existing)
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;

  // New — all optional, backwards compatible
  cover?: string;            // manual cover override; if absent, auto OG used
  category?: Category;       // primary bucket
  featured?: boolean;        // shows in story carousel at top of /blog
  description?: string;      // SEO meta (falls back to excerpt)
  keywords?: string[];       // SEO keywords
  author?: string;           // defaults to "Luv Pahwa"
  wordCount: number;         // auto-calculated
  rawContent: string;        // for search + related-post matching
};

export type Category =
  | 'AI'
  | 'Cloud'
  | 'DevOps'
  | 'Tutorial'
  | 'Opinion'
  | 'Personal';

// Lightweight version for list pages (excludes rawContent for perf)
export type PostMeta = Omit<Post, 'rawContent'>;

// ---------- Core loaders ----------

function readPost(file: string): Post {
  const slug = file.replace(/\.mdx$/, '');
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? '',
    readingTime: rt.text,
    cover: data.cover,
    category: data.category,
    featured: data.featured ?? false,
    description: data.description ?? data.excerpt ?? '',
    keywords: data.keywords ?? data.tags ?? [],
    author: data.author ?? 'Luv Pahwa',
    wordCount: rt.words,
    rawContent: content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((file) => {
      const { rawContent, ...meta } = readPost(file);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return readPost(`${slug}.mdx`);
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

// ---------- Discovery helpers ----------

export function getFeaturedPost(): PostMeta | null {
  const all = getAllPosts();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) =>
    p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  getAllPosts().forEach((p) =>
    p.tags.forEach((t) => counts.set(t, (counts.get(t) ?? 0) + 1))
  );
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const current = getAllPosts().find((p) => p.slug === slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const all = getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: all[idx + 1] ?? null, // older
    next: all[idx - 1] ?? null, // newer
  };
}

export function getBlogStats() {
  const all = getAllPosts();
  return {
    totalPosts: all.length,
    totalWords: all.reduce((sum, p) => sum + p.wordCount, 0),
    totalTags: getAllTags().length,
    lastUpdated: all[0]?.date ?? '',
  };
}

// ---------- Backwards-compatible aliases (your old code keeps working) ----------

export type Note = PostMeta;
export const getAllblog = getAllPosts;
export const getbloglugs = getPostSlugs;