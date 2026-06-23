'use client';
import { motion } from 'framer-motion';

const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'work', href: '#work' },
  { label: 'skills', href: '#skills' },
  { label: 'blog', href: '#blog' },
  { label: 'contact', href: '#contact' },
];

const resourceLinks = [
  { label: 'résumé', href: '/resume.pdf', external: true },
  { label: 'rss feed', href: '/feed.xml', external: true },
  { label: 'sitemap', href: '/sitemap.xml', external: true },
  { label: 'colophon', href: '/colophon' },
];

/* ------------ inline icons ------------ */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.73 18.27.5 12 .5z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ArrowUpRightIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const socials = [
  { label: 'github', href: 'https://github.com/luvpahwa52', Icon: GithubIcon },
  { label: 'linkedin', href: 'https://linkedin.com/in/luvpahwa', Icon: LinkedinIcon },
  { label: 'twitter', href: 'https://twitter.com/actually_luv_', Icon: XIcon },
  { label: 'email', href: 'mailto:luvpahwa52@gmail.com', Icon: MailIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/40 bg-[#0a0a0a]/40 backdrop-blur-sm mt-24">
      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 lg:px-14 py-16">
        {/* huge background watermark */}
        <div
          aria-hidden
          className="pointer-events-none select-none absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[clamp(6rem,18vw,16rem)] font-bold text-white/[0.015] leading-none whitespace-nowrap"
        >
          luv.pahwa
        </div>

        {/* top grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* brand + tagline */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="font-mono text-lg flex items-center gap-2 group">
              <span className="text-accent">~/</span>
              <span className="text-fg group-hover:text-accent transition-colors">
                luv.pahwa
              </span>
              <span className="w-[6px] h-[14px] bg-accent inline-block animate-pulse" />
            </a>
            <p className="text-fg/60 text-sm leading-relaxed max-w-sm">
              Cloud & AI engineer building intelligent systems on AWS, Azure, and
              the open web. Currently shipping{' '}
              <span className="text-accent">cloudops auditor</span>.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-fg/50 pt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>available for opportunities · chennai · IST</span>
            </div>
          </div>

          {/* spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* navigate */}
          <div className="md:col-span-2 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/40">
              navigate
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="font-mono text-sm text-fg/70 hover:text-accent transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-accent/40 group-hover:text-accent transition-colors">
                      ./
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* resources */}
          <div className="md:col-span-2 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/40">
              resources
            </p>
            <ul className="space-y-2.5">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? '_blank' : undefined}
                    rel={l.external ? 'noopener noreferrer' : undefined}
                    className="font-mono text-sm text-fg/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    {l.label}
                    {l.external && (
                      <ArrowUpRightIcon className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* connect */}
          <div className="md:col-span-2 space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fg/40">
              connect
            </p>
            <ul className="space-y-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-fg/70 hover:text-accent transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                      <Icon />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* divider */}
        <div className="relative mt-14 pt-8 border-t border-border/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* left — copyright */}
          <div className="font-mono text-xs text-fg/50 space-y-1">
            <p>© {year} Luv Pahwa · crafted with intent in India 🇮🇳</p>
            <p className="text-fg/35">
              <span className="text-accent/60">$</span> uptime · all systems
              operational
            </p>
          </div>

          {/* right — meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-fg/40">
            <span>v2.0.0</span>
            <span className="text-fg/20">/</span>
            <span>next.js 16</span>
            <span className="text-fg/20">/</span>
            <span>tailwind v4</span>
            <span className="text-fg/20">/</span>
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors group"
            >
              back to top
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↑
              </motion.span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}