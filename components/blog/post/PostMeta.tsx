'use client';
import type { Post } from '@/lib/blog';

export default function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 py-5 border-y border-border font-mono text-sm">
      <span className="text-fg/80">📅 {post.date}</span>
      <span className="text-fg/80">⏱ {post.readingTime}</span>
      <span className="text-fg/80">📝 {post.wordCount.toLocaleString()} words</span>
      <span className="text-fg/80">✍ {post.author}</span>
      {post.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-accent border border-accent/30 bg-accent/5 px-2 py-0.5 rounded text-xs font-bold"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}