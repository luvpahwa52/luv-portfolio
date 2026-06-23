'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { PostMeta } from '@/lib/blog';

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  return (
    <section className="mt-24 max-w-6xl mx-auto">
      <p className="font-mono text-xs text-accent mb-2 uppercase tracking-widest">
        // ls --related
      </p>
      <h2 className="font-mono text-2xl md:text-3xl font-bold mb-8">you might also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {posts.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/blog/${p.slug}`}
              className="group block border border-border rounded-xl p-5 hover:border-accent/40 transition-colors h-full flex flex-col"
            >
              <p className="font-mono text-xs text-muted mb-3">{p.date}</p>
              <h3 className="font-mono text-base font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                {p.title}
              </h3>
              <p className="text-muted text-xs leading-relaxed line-clamp-3 mb-4">{p.excerpt}</p>
              <div className="mt-auto flex flex-wrap gap-1 font-mono text-[10px]">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="text-accent/60">
                    #{t}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}