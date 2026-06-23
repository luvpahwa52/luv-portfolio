'use client';
import { useEffect, useState } from 'react';
import type { TocItem } from './extractToc';

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="font-mono">
      <p className="text-accent text-xs font-bold mb-4 uppercase tracking-widest">
        // contents
      </p>
      <ul className="space-y-3 border-l-2 border-border pl-5">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <li
              key={it.id}
              style={{ paddingLeft: `${(it.level - 2) * 14}px` }}
              className="leading-snug relative"
            >
              {isActive && (
                <span className="absolute -left-[22px] top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-full shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
              )}
              <a
                href={`#${it.id}`}
                className={`block text-sm transition-all hover:text-accent hover:translate-x-1 ${
                  isActive ? 'text-accent font-bold' : 'text-fg/70'
                }`}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}