'use client';
import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';

type Props = {
  prev: PostMeta | null;
  next: PostMeta | null;
};

export default function PostNav({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group block border border-border rounded-lg p-5 hover:border-accent/60 hover:bg-accent/5 transition-colors"
        >
          <p className="text-xs text-accent mb-2 font-bold uppercase tracking-widest">
            ← older post
          </p>
          <p className="text-fg/90 text-sm group-hover:text-accent transition-colors line-clamp-2 font-bold">
            {prev.title}
          </p>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group block border border-border rounded-lg p-5 hover:border-accent/60 hover:bg-accent/5 transition-colors text-right"
        >
          <p className="text-xs text-accent mb-2 font-bold uppercase tracking-widest">
            newer post →
          </p>
          <p className="text-fg/90 text-sm group-hover:text-accent transition-colors line-clamp-2 font-bold">
            {next.title}
          </p>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}