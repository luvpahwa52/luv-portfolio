# Luv Pahwa — Portfolio

![Next.js](https://nextjs.org/)
https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white](https://react.dev/)
https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwind.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#license)

> A modern, cinematic, developer‑centric portfolio built to showcase my work in **AI**, **Cloud**, and **Full‑Stack Engineering** — with a focus on motion design, performance, and SEO.

🔗 **Live Site:** _Coming soon — will be updated post Vercel deployment._

---

## ✨ Highlights

- ⚡ **Next.js 16** with the App Router and Turbopack for blazing‑fast builds
- 🎨 **Tailwind CSS v4** with a custom design system and dark‑first aesthetics
- 🎬 **Framer Motion** for cinematic page transitions and micro‑interactions
- 🪄 **Lenis** smooth scrolling for a buttery, native‑feel scroll experience
- 🖱️ **Custom CursorGlow** — an interactive, gradient‑aware cursor
- 🌌 **Animated ambient hero** with a subtle dot‑grid + parallax effect
- 📝 **MDX‑powered blog** for AI / Cloud / DevOps articles with full SEO
- 🗺️ **Sitemap, RSS feed, and OG metadata** for global discoverability
- 📱 **Fully responsive** — desktop, tablet, and mobile parity
- 🚀 **Optimized for Core Web Vitals** and Lighthouse scores

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Content | MDX (blog), Markdown |
| Icons | Lucide React |
| Deployment | Vercel |
| Tooling | ESLint, Prettier, Turbopack |

---

## 📂 Project Structure

```
luv-portfolio/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, providers)
│   ├── page.tsx                # Home page
│   ├── blog/                   # MDX blog routes
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt config
│   └── rss.xml/route.ts        # RSS feed endpoint
├── components/
│   ├── Hero.tsx
│   ├── HeroAmbient.tsx         # Animated dot grid + parallax
│   ├── About.tsx
│   ├── Work.tsx
│   ├── Projects.tsx
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── CursorGlow.tsx
│   └── SmoothScroll.tsx
├── content/
│   └── posts/                  # MDX blog posts
├── lib/
│   ├── mdx.ts                  # MDX utilities
│   └── seo.ts                  # SEO helpers
├── public/
│   ├── images/
│   ├── og/                     # Open Graph images
│   └── resume.pdf
├── styles/
│   └── globals.css
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm**, **pnpm**, or **yarn**
- A Vercel account (for deployment)

### 1. Clone the repository

```bash
git clone https://github.com/luvpahwa/luv-portfolio.git
cd luv-portfolio
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AUTHOR_NAME=Luv Pahwa
NEXT_PUBLIC_AUTHOR_EMAIL=your.email@example.com
```

> Replace these with your production values once deployed.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the dev server with Turbopack |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | Lint the codebase |
| `npm run format` | Format files with Prettier |

---

## 📝 Writing a Blog Post

1. Create a new `.mdx` file inside `content/posts/`, for example `my-new-post.mdx`.
2. Add frontmatter at the top:

   ```mdx
   ---
   title: "Your Post Title"
   description: "A short, SEO-friendly description."
   date: "2026-06-24"
   tags: ["AI", "Cloud", "Next.js"]
   cover: "/images/blog/my-new-post.jpg"
   ---

   Your content goes here in **MDX**. You can use React components too.
   ```

3. The post will automatically appear in the `/blog` index and be included in the sitemap and RSS feed.

---

## 🔍 SEO & Discoverability

- ✅ Per‑page metadata via the Next.js Metadata API
- ✅ Auto‑generated **sitemap.xml** at `/sitemap.xml`
- ✅ **RSS feed** at `/rss.xml`
- ✅ **Robots.txt** at `/robots.txt`
- ✅ Open Graph + Twitter card images
- ✅ Structured data (JSON‑LD) for Person and BlogPosting

---

## 🎨 Customization

Most personal details live in a single config file. Update the following to make this portfolio your own:

- `lib/seo.ts` — site name, default description, social handles
- `components/Hero.tsx` — headline, tagline, CTA buttons
- `components/About.tsx` — bio, skills, photo
- `components/Projects.tsx` — featured projects
- `public/resume.pdf` — replace with your latest resume

---

## 🚢 Deployment (Vercel)

1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add the environment variables from `.env.local` in the Vercel dashboard.
4. Click **Deploy**. Vercel will auto‑detect Next.js and configure everything.
5. Once live, update `NEXT_PUBLIC_SITE_URL` in Vercel to your production domain and redeploy.

> 💡 Subsequent pushes to the `main` branch will trigger automatic production deployments. Feature branches get preview deployments out of the box.

---

## 🗺️ Roadmap

- [ ] Wire live project demo links
- [ ] Generate dynamic OG images per blog post
- [ ] Finalize sitemap + RSS feed in production
- [ ] Run Lighthouse audit and tune Core Web Vitals
- [ ] Deploy to Vercel and connect custom domain
- [ ] Add view‑count analytics for blog posts

---

## 🤝 Contributing

This is a personal portfolio, but suggestions, bug reports, and ideas are very welcome.
Feel free to open an [issue](https://github.com/luvpahwa/luv-portfolio/issues) or start a discussion.

---

## 📬 Contact

**Luv Pahwa** — Engineer, Cloud & Infra Management

- 🌐 Website: _Coming soon_
- 💼 LinkedIn: [linkedin.com/in/luvpahwa](https://www.linkedin.com/in/luvpahwa)
- 🐙 GitHub: [github.com/luvpahwa](https://github.com/luvpahwa52)
- ✉️ Email: luvpahwa52@gmail.com

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

You are free to fork and adapt it for your own portfolio. A small credit back is appreciated but not required. ⭐

---

<p align="center">Built with ❤️ using Next.js, Tailwind, and Framer Motion.</p>