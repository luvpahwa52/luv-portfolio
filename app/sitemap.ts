import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/colophon`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Dynamic blog posts
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}