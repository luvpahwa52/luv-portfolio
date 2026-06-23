// components/blog/HomeBlog.tsx
import { getAllPosts } from '@/lib/blog';
import HomeBlogClient from './HomeBlogClient';

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: string;
};

export default function HomeBlog() {
  const posts = getAllPosts().slice(0, 3) as Post[];
  if (posts.length === 0) return null;
  return <HomeBlogClient posts={posts} />;
}