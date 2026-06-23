import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import {
  getPostSlugs,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
} from '@/lib/blog';

import ReadingProgress from '@/components/blog/post/ReadingProgress';
import PostHero from '@/components/blog/post/PostHero';
import TableOfContents from '@/components/blog/post/TableOfContents';
import PostMeta from '@/components/blog/post/PostMeta';
import ShareBar from '@/components/blog/post/ShareBar';
import PostNav from '@/components/blog/post/PostNav';
import RelatedPosts from '@/components/blog/post/RelatedPosts';
import BackToTop from '@/components/blog/post/BackToTop';
import { extractToc } from '@/components/blog/post/extractToc';

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Luv Pahwa`,
    description: post.description || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

type Props = { params: Promise<{ slug: string }> };

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content: mdxContent } = await compileMDX({
    source: post.rawContent,
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }],
        ],
      },
    },
  });

  const toc = extractToc(post.rawContent);
  const { prev, next } = getAdjacentPosts(slug);
  const related = getRelatedPosts(slug, 3);

  return (
    <>
      <ReadingProgress />

      <main className="pt-24 md:pt-32 pb-32 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <PostHero post={post} />

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,720px)_1fr] gap-8">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={toc} />
              </div>
            </aside>

            <article className="min-w-0">
              <PostMeta post={post} />
              <div className="prose-custom mt-8">{mdxContent}</div>
              <ShareBar post={post} />
              <PostNav prev={prev} next={next} />
            </article>

            <aside className="hidden lg:block" />
          </div>

          {related.length > 0 && <RelatedPosts posts={related} />}
        </div>
      </main>

      <BackToTop />
      
    </>
  );
}