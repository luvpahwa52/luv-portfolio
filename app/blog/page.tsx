// app/blog/page.tsx
import Link from 'next/link';
import { getAllblog } from '@/lib/blog';
import SectionHeader from '@/components/SectionHeader';

export const metadata = {
  title: 'Blog — Luv Pahwa',
  description: 'Thoughts, build logs, and learnings on AI, cloud, and code.',
};

export default function BlogPage() {
  const blog = getAllblog();

  return (
    <main className="relative min-h-screen pb-24 md:pb-32">
      <SectionHeader
        label="Dispatches"
        heading="The complete archive."
        headingAccent="archive."
        tagline="Field notes, experiments, and lessons from production — every essay I've shipped, in one place."
      />

      <div className="max-w-4xl mx-auto px-5 md:px-8 mt-16 md:mt-24">
        {blog.length === 0 ? (
          <p className="font-mono text-white/60 text-center py-20">
            no posts yet. soon.™
          </p>
        ) : (
          <ul className="flex flex-col">
            {blog.map((n: any, i: number) => {
              const href = `/blog/${n.slug}`;
              return (
                <li
                  key={n.slug}
                  className={`group py-8 md:py-10 ${
                    i !== 0 ? 'border-t border-white/10' : ''
                  }`}
                >
                  <Link href={href} className="block">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <h2 className="font-mono text-xl md:text-3xl font-bold text-white leading-tight group-hover:text-accent transition-colors">
                          {n.title}
                        </h2>

                        {n.excerpt && (
                          <p className="mt-4 text-white/75 leading-relaxed max-w-2xl">
                            {n.excerpt}
                          </p>
                        )}

                        <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs">
                          <span className="text-white/50">{n.readingTime}</span>
                          {n.tags.length > 0 && (
                            <span className="text-white/30">·</span>
                          )}
                          {n.tags.map((t: string) => (
                            <span
                              key={t}
                              className="text-accent/90 border border-accent/30 bg-accent/5 px-2 py-1 rounded"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <span className="font-mono text-xs text-white/50 whitespace-nowrap pt-2">
                        {n.date}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-16 md:mt-20 pt-8 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-accent transition-colors"
          >
            <span className="font-mono">← back home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}