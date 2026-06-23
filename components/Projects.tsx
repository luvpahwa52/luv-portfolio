'use client';
import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { ArrowUpRight } from 'lucide-react';

export default function Projects() {
  return (
    <section id="work" className="px-6 md:px-12 py-32 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-16">
          /<span className="text-accent">work</span>
        </h2>
      </motion.div>

      <div className="space-y-px">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 8 }}
            className="group block border-t border-border py-8 hover:bg-fg/[0.02] transition-colors px-4"
            data-hover
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3 flex-wrap">
                  <span className="text-muted text-sm">0{i + 1}</span>
                  <h3 className="text-2xl md:text-4xl font-bold group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 border ${
                      p.status === 'shipped'
                        ? 'border-accent text-accent'
                        : 'border-muted text-muted'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="text-fg/70 max-w-2xl mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-muted border border-border px-2 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowUpRight className="w-8 h-8 text-muted group-hover:text-accent group-hover:rotate-45 transition-all flex-shrink-0" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}