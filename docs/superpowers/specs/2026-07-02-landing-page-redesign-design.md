# Landing Page Redesign — Design Spec

Date: 2026-07-02

## Goal

Modernize the portfolio's UI/UX, improve SEO/GEO/ATS discoverability, and add a
view counter — without losing the site's existing content or identity as a
backend-leaning full-stack developer's portfolio.

## Visual Direction (approved via mockup review)

Move from the current black/`#00df9a`-green theme to a **warm neutral,
editorial** theme, deliberately avoiding "AI slop" tropes (gradient text,
glassmorphism/blur, purple-gradient blobs). Flat solid colors, sharp corners,
hard-edged hover shadows instead of glow/blur.

**Palette** (added to `tailwind.config.js theme.extend.colors`):
- `paper`: `#f5f3ee` (background)
- `ink`: `#141414` (primary text / accents)
- `rust`: `#b5451b` (accent — links, role text, active states)
- `dot`: `#c9c4b8` (background dot-grid texture)
- `line`: `#d8d4ca` (borders)

**Texture:** grey dot-grid background (`radial-gradient(#c9c4b8 1px, transparent 1px)`,
22px pitch) applied to the Hero section, faded out behind text via a
radial mask so copy stays legible. Optionally repeated at low density on
other section backgrounds for continuity.

**Typography:** system sans for body/headings; monospace (`font-mono`, system
mono stack — no new font import needed) for role text, tech tags, and
timestamps — keeps the "developer" flavor without leaning on the green
terminal theme.

**Interaction style:** hover = 2-3px translateY lift + hard offset-shadow
(`box-shadow: 3px 3px 0 <ink|rust>`), no blur/glow. This is the site-wide
hover language for buttons, cards, and tags.

## Motion

- `src/hooks/useInView.js` — small IntersectionObserver hook, returns
  `[ref, isInView]`, `once: true` by default.
- `src/components/FadeUp.js` — wrapper component: renders children with a
  `translateY(14px)+opacity:0 → translateY(0)+opacity:1` transition when
  `isInView`, optional `delay` prop for stagger. Reads
  `prefers-reduced-motion` and skips the transform (opacity-only, or none) if
  set.
- Hero: staggered entrance already applied on mount (not scroll-triggered,
  since it's above the fold) — name → role (with blinking cursor) → tags →
  bio → buttons, ~120ms stagger. Matches the approved mockup.
- WorkExperience, Projects, Skills sections: each card/list item wrapped in
  `FadeUp` triggered on scroll-into-view.

## Component Changes

All components below move from the black/green theme to the paper/ink/rust
theme and adopt the hard-shadow hover language. No structural/content
rewrites beyond what's listed under Content below.

- **Navbar** (`src/components/Navbar.js`): paper background (sticky), ink
  text, rust underline-on-hover for links. Mobile menu panel restyled to
  match (currently `bg-[#000300]`).
- **Hero** (`src/components/Hero.js`): dot-grid background, entrance motion,
  blinking cursor after role text, rust role color, ink solid buttons with
  hard-shadow hover. Bio copy rewritten (see Content).
- **WorkExperience** (`src/components/WorkExperience.js`): timeline dot
  markers → rust, entries wrapped in `FadeUp`, card-style hover on each
  entry (subtle, since it's a dense list — border + hard-shadow on hover,
  not a full card treatment).
- **Projects / Project** (`src/components/Projects.js`,
  `src/components/Project.js`): card → paper bg, sharp border (`border-line`),
  tech chips become outline pills (ink border, transparent bg, invert on
  hover) instead of filled `bg-slate-500`. "Go To Site" button restyled to
  match (currently blue Tailwind default).
- **Skills** (`src/components/Skills.js`): grid stays, background → paper,
  hover lift kept (`hover:scale-105` → add hard-shadow or keep scale, minor).
- **Footer** (`src/components/Footer.js`): icon colors → ink/rust, adds the
  view counter as a small stat chip (see below).

## View Counter

Free hosted counter API — **CounterAPI.dev** (free tier, JSON response,
CORS-enabled, no backend to run). New component
`src/components/ViewCounter.js`:

- On mount, calls the CounterAPI "up" endpoint for a configured
  workspace/counter slug (e.g. `portfolio-tomasferrari`), incrementing and
  returning the current count.
- Displays as a small styled chip in the Footer: `👁 1,234 views` (icon +
  animated count-up on load), in the paper/ink style, not a raw `<img>`
  badge (those can't be restyled to match).
- **Failure handling:** if the fetch fails or the API rate-limits, the chip
  is hidden entirely (no error state, no "—" placeholder) — the counter is a
  nice-to-have, not critical UI.
- Slug/workspace values passed via env var (`REACT_APP_COUNTER_WORKSPACE`,
  `REACT_APP_COUNTER_NAME`) so they're not hardcoded; documented in README.
  User must create a free CounterAPI.dev account and workspace before this
  goes live — noted as a manual setup step, not something the code can do
  for them.
- Guard against double-increment in React 18 StrictMode dev double-mount
  using a `useRef` guard.

## SEO / GEO / ATS

**Technical (`public/index.html` and new public files):**
- Real `<title>` ("Tomas Ferrari — Full-Stack Software Developer (Python,
  React)") and meta description summarizing stack + experience.
- OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:url`,
  `og:type=profile`) and Twitter card tags (`summary_large_image`). Reuses
  an existing project screenshot or a simple generated OG image is out of
  scope — use `logo512.png` as a placeholder `og:image` unless the user
  supplies one.
- `<link rel="canonical">`.
- JSON-LD `Person` schema in `index.html`: `name`, `jobTitle`, `worksFor`
  (current role), `knowsAbout` (skills list), `sameAs` (LinkedIn, GitHub).
- `public/sitemap.xml` (single-page site — one `<url>` entry) and
  `public/robots.txt` (`Allow: /`, sitemap reference).
- `public/llms.txt` — plain-text summary of who Tomas is, stack, experience,
  projects, contact — for AI/GEO crawlers. Thematically fits since one of
  the portfolio's own projects is an LLM.txt generator.
- Semantic HTML pass: confirm one `<h1>` (Hero name), section headings as
  `<h2>`, all `<img>` alt text present (Skills logos already have alt text;
  Project screenshots currently have `alt=""` — fix to descriptive alt).

**Content (rewritten for keyword density, ATS + GEO):**
- Hero bio rewritten to lead with the explicit title "Full-Stack Software
  Developer" and keep concrete keywords (Python, React, Django, FastAPI,
  Node, SQL, AWS) near the front rather than buried in a long sentence.
- Section headings and nav labels stay the same (About/Experience/Apps/
  Skills/Contact) — changing them risks breaking anchor links and isn't
  needed for ATS/GEO purposes.
- WorkExperience bullets are already keyword-dense (tech stacks listed
  per role) — left as-is except minor tightening for readability, not
  rewritten wholesale.

## Out of Scope

- No new pages/routing (still a single-page site).
- No CMS or backend beyond the counter API call.
- No new font imports (uses system mono/sans stacks).
- No changes to resume PDF content.
- No dark/light mode toggle — the new theme replaces the old one outright.

## Testing

- `npm run build` succeeds with no warnings introduced.
- Manual check in browser: all sections render in new theme, motion
  triggers on scroll, reduced-motion respected (via OS/emulated setting),
  view counter renders or gracefully hides, mobile nav still works.
- Verify JSON-LD validates (Google Rich Results Test or schema.org
  validator, manually by the user post-deploy — not automatable here).
