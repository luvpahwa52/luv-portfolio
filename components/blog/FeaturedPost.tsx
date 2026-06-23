'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PostMeta } from '@/lib/blog';

export default function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block relative border border-border rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d0d0d] to-[#0a0a0a] p-6 md:p-12 hover:border-accent/40 transition-all duration-500"
        data-hover
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="flex items-center gap-2 mb-6 font-mono text-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-accent uppercase tracking-widest">featured · latest</span>
        </div>

        <h2 className="font-mono text-3xl md:text-5xl font-bold leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h2>

        <p className="text-muted text-sm md:text-lg max-w-2xl leading-relaxed mb-6">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 font-mono text-xs text-muted flex-wrap">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          <span>·</span>
          <div className="flex gap-2 flex-wrap">
            {post.tags.slice(0, 4).map((t) => (
              <span key={t} className="text-accent/70">
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-accent">
          <span>cat {post.slug}.mdx</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}