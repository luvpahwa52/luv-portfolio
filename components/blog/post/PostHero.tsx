'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Post } from '@/lib/blog';

export default function PostHero({ post }: { post: Post }) {
  return (
    <section className="relative max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-8 md:pb-12">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs md:text-sm text-white/50 mb-8 flex flex-wrap items-center gap-2"
      >
        /
        <span className="text-white/30">/</span>
        /blog
        <span className="text-white/30">/</span>
        <span className="text-accent">{post.slug}</span>
      </motion.div>

      {/* Category chip */}
      {post.category && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-block font-mono text-[11px] tracking-[0.25em] uppercase text-accent border border-accent/30 bg-accent/5 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </motion.div>
      )}

      {/* Title — wider, fills the page horizontally */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-mono text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-5xl"
      >
        {post.title}
      </motion.h1>

      {/* Excerpt — narrower for readability */}
      {post.excerpt && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-base md:text-lg lg:text-xl text-white/75 leading-relaxed max-w-3xl"
        >
          {post.excerpt}
        </motion.p>
      )}

      {/* Cover image — only if explicitly set */}
      {post.cover && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 md:mt-14 rounded-xl overflow-hidden border border-white/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {post.cover}
        </motion.div>
      )}

      {/* Divider into content */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10 md:mt-14 h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent origin-left"
      />
    </section>
  );
}