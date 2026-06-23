'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Post } from '@/lib/blog';

export default function ShareBar({ post }: { post: Post }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = encodeURIComponent(`${post.title} — by @luvpahwa`);
  const enc = encodeURIComponent(url);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <p className="font-mono text-xs text-muted mb-4 uppercase tracking-widest">
        // found this useful? share it
      </p>
      <div className="flex flex-wrap gap-3 font-mono text-xs">
        <a
          href={`https://twitter.com/intent/tweet?text=${text}&url=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-md border border-border text-muted hover:border-accent hover:text-accent transition-colors"
        >
          𝕏 / twitter
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-md border border-border text-muted hover:border-accent hover:text-accent transition-colors"
        >
          in / linkedin
        </a>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={copy}
          className={`px-4 py-2 rounded-md border transition-colors ${
            copied
              ? 'border-accent text-accent bg-accent/10'
              : 'border-border text-muted hover:border-accent hover:text-accent'
          }`}
        >
          {copied ? '✓ copied' : '🔗 copy link'}
        </motion.button>
      </div>
    </div>
  );
}