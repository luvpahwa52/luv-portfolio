'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { PostMeta } from '@/lib/blog';

export default function PostCard({ post, index }: { post: PostMeta; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  const offsetClass = index % 2 === 0 ? 'md:ml-0 md:mr-12' : 'md:ml-12 md:mr-0';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200, transformStyle: 'preserve-3d' }}
      className={offsetClass}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block border border-border rounded-xl p-6 md:p-8 bg-[#0d0d0d]/60 hover:border-accent/40 hover:bg-[#0d0d0d] transition-colors duration-500 relative overflow-hidden"
        data-hover
      >
        <div className="absolute top-4 right-5 font-mono text-xs text-muted/40 group-hover:text-accent/60 transition-colors">
          0{(index + 2).toString().padStart(2, '0')}
        </div>

        <div className="font-mono text-xs text-muted mb-3 flex gap-3">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="font-mono text-xl md:text-2xl font-bold leading-tight mb-3 group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-muted text-sm md:text-base leading-relaxed mb-5 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {post.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="text-muted border border-border px-2 py-0.5 rounded group-hover:border-accent/30 group-hover:text-accent/80 transition-colors"
            >
              #{t}
            </span>
          ))}
        </div>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-6 right-6 font-mono text-xs text-accent flex items-center gap-1"
        >
          read →
        </motion.div>
      </Link>
    </motion.div>
  );
}