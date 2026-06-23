import Hero from '@/components/Hero';
import About from '@/components/About';
import Work from '@/components/work/Work';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Reveal from '@/components/Reveal';
import HomeBlog from '@/components/blog/HomeBlog';

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      {/* About fades in soft, like a memory surfacing */}
      <Reveal variant="blur" duration={1}>
        <About />
      </Reveal>

      {/* Work emerges as a bento gallery — click to dive into case studies */}
      <Reveal variant="tilt" duration={0.9}>
        <Work />
      </Reveal>

      {/* Skills slides in from the side — dynamic, confident */}
      <Reveal variant="slide" duration={0.8}>
        <Skills />
      </Reveal>

      {/* Blog dispatches — the writer behind the engineer */}
      <Reveal variant="blur" duration={0.9}>
        <HomeBlog />
      </Reveal>

      {/* Contact zooms in like a closing shot */}
      <Reveal variant="scale" duration={0.9}>
        <Contact />
      </Reveal>
    </main>
  );
}