'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: string;
};

export default function HomeBlogClient({ posts }: { posts: Post[] }) {
  const [featured, ...rest] = posts;
  if (!featured) return null;

  return (
    <section
      id="blog"
      aria-label="Latest writing by Luv Pahwa"
      className="relative pb-20 md:pb-32 scroll-mt-24"
    >
      <SectionHeader
        label="Dispatches"
        heading="Notes from the build."
        headingAccent="from the build."
        tagline="Lessons, experiments, and small revelations — written between deploys."
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
          <FeaturedCard post={featured} />

          <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
            {rest.map((p, i) => (
              <RecentCard key={p.slug} post={p} index={i} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-2"
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 mt-4 text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
              >
                <span>Read all dispatches</span>
                <motion.span
                  className="inline-block"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="md:col-span-7"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] overflow-hidden hover:border-white/25 transition-colors h-full min-h-[420px]"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 30% 20%, rgba(122,162,247,0.10), transparent 60%)',
          }}
        />

        <div className="relative flex flex-col h-full p-6 md:p-10">
          <div className="flex items-center justify-between">
            <p className="text-[11px] tracking-[0.3em] uppercase text-white/50">
              Featured · {formatDate(post.date)}
            </p>
            <ArrowUpRight
              size={18}
              className="text-white/40 group-hover:text-white group-hover:rotate-12 transition-all duration-300"
            />
          </div>

          <div className="mt-auto pt-12">
            {post.tags?.[0] && (
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/45 mb-4">
                {post.tags[0]}
              </p>
            )}
            <h3 className="text-3xl md:text-4xl font-light tracking-tight text-white leading-[1.15] mb-4">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
                {post.excerpt}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-white/50">
              <span>{post.readingTime ?? '5 min read'}</span>
              <span className="h-px w-6 bg-white/30" />
              <span className="text-white/70">Read essay →</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function RecentCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block relative rounded-xl border border-white/10 bg-[#0a0a0a] p-5 md:p-6 hover:border-white/25 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/45 mb-3">
              {formatDate(post.date)}
              {post.tags?.[0] && (
                <span className="ml-2 text-white/30">· {post.tags[0]}</span>
              )}
            </p>
            <h4 className="text-lg md:text-xl font-light tracking-tight text-white leading-snug">
              {post.title}
            </h4>
            {post.excerpt && (
              <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
          <ArrowUpRight
            size={16}
            className="text-white/30 group-hover:text-white group-hover:rotate-12 transition-all duration-300 shrink-0 mt-1"
          />
        </div>
      </Link>
    </motion.div>
  );
}

function formatDate(date: string) {
  if (!date) return '';
  try {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return date;
  }
}