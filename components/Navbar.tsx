'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { label: 'home', id: 'home', cmd: 'cd ~/' },
  { label: 'about', id: 'about', cmd: 'cat about.md' },
  { label: 'work', id: 'work', cmd: 'ls projects/' },
  { label: 'skills', id: 'skills', cmd: 'cat stack.json' },
  { label: 'blog', id: 'blog', cmd: 'cd blog/' },
  { label: 'contact', id: 'contact', cmd: 'mail luv' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [pendingScroll, setPendingScroll] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();
  const isBlog = pathname.startsWith('/blog');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isBlog) return;
    const sections = ['home', 'about', 'work', 'skills', 'blog', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isBlog]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (pendingScroll && pathname === '/') {
      let attempts = 0;
      const tryScroll = () => {
        if (pendingScroll === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setPendingScroll(null);
          return;
        }
        const el = document.getElementById(pendingScroll);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setPendingScroll(null);
        } else if (attempts < 40) {
          attempts++;
          setTimeout(tryScroll, 80);
        } else {
          setPendingScroll(null);
        }
      };
      setTimeout(tryScroll, 120);
    }
  }, [pathname, pendingScroll]);

  const scrollToId = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSectionClick = (id: string) => {
    setMobileOpen(false);
    if (pathname !== '/') {
      setPendingScroll(id);
      router.push('/');
    } else {
      scrollToId(id);
    }
  };

  const handleBrandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ' +
          (scrolled
            ? 'bg-[#0a0a0a]/70 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-transparent')
        }
      >
        <div className="w-full px-6 md:px-10 lg:px-14 py-4 flex items-center justify-between">
          {/* LEFT — Brand */}
          <BrandLink onClick={handleBrandClick} />

          {/* RIGHT — Nav + Status cluster */}
          <div className="hidden md:flex items-center gap-4">
            <ul
              className="flex items-center gap-2 font-mono text-[15px] relative"
              onMouseLeave={() => setHoveredItem(null)}
            >
              {navItems.map((item) => {
                const isActive = !isBlog && item.id === activeSection;
                const isHovered = hoveredItem === item.label;
                return (
                  <li key={item.label} className="relative">
                    <button
                      onClick={() => handleSectionClick(item.id)}
                      onMouseEnter={() => setHoveredItem(item.label)}
                      className="relative px-4 py-2 rounded-md inline-flex items-center gap-1.5 transition-colors duration-300 group cursor-pointer"
                      data-hover
                    >
                      {isHovered && !isActive && (
                        <motion.span
                          layoutId="nav-hover"
                          className="absolute inset-0 bg-fg/5 rounded-md -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        />
                      )}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 bg-accent/10 border border-accent/30 rounded-md -z-10 shadow-[0_0_20px_rgba(0,255,136,0.15)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span
                        className={
                          'text-accent/50 transition-all duration-300 ' +
                          (isHovered || isActive
                            ? 'opacity-100 text-accent'
                            : 'opacity-0 -ml-2')
                        }
                      >
                        ./
                      </span>
                      <span
                        className={
                          isActive ? 'text-accent' : 'text-fg/80 group-hover:text-fg'
                        }
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* divider + online status */}
            <div className="flex items-center gap-2 pl-4 border-l border-border/60 text-xs text-muted font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span>online</span>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            aria-label="Open menu"
            data-hover
          >
            <span className="w-6 h-[2px] bg-fg" />
            <span className="w-4 h-[2px] bg-accent ml-auto" />
            <span className="w-6 h-[2px] bg-fg" />
          </button>
        </div>

        <motion.div
          style={{ scaleX, transformOrigin: '0% 50%' }}
          className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-accent via-accent/70 to-accent/20 origin-left"
        />
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 p-2 font-mono text-accent text-sm"
              aria-label="Close menu"
            >
              [esc] close
            </button>
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="h-full flex flex-col justify-center px-8 font-mono"
            >
              <p className="text-muted text-xs mb-6">
                <span className="text-accent">luv@portfolio:~$</span> ls --menu
              </p>
              <ul className="space-y-4">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <button
                      onClick={() => handleSectionClick(item.id)}
                      className="flex items-baseline gap-3 group w-full text-left"
                    >
                      <span className="text-accent text-2xl">→</span>
                      <span className="text-3xl text-fg">{item.label}</span>
                      <span className="text-xs text-muted hidden sm:inline">
                        {item.cmd}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function BrandLink({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <a
      href="/"
      onClick={onClick}
      className="font-mono text-sm md:text-base flex items-center gap-2 group cursor-pointer"
      data-hover
    >
      <span className="text-accent group-hover:text-accent/80 transition-colors">
        ~/
      </span>
      <span className="text-fg group-hover:text-accent transition-colors duration-300">
        luv.pahwa
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1.1 }}
        className="w-[6px] h-[14px] bg-accent inline-block ml-0.5"
      />
    </a>
  );
}