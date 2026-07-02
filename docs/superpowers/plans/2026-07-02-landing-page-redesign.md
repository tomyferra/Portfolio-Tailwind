# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio from its black/green theme to a warm-neutral/editorial theme with dot-grid texture and scroll motion, add a free-tier view counter, and add SEO/GEO/ATS technical + copy improvements.

**Architecture:** Pure frontend change to an existing CRA + Tailwind React app. New color tokens in `tailwind.config.js` drive every component restyle. A small `useInView` hook + `FadeUp` wrapper add scroll-triggered motion, reused across sections. A standalone `ViewCounter` component calls a free hosted counter API and fails silently. SEO changes are static file edits (`public/index.html`, new `public/sitemap.xml` / `robots.txt` / `llms.txt`).

**Tech Stack:** React 18, Tailwind CSS 3, CRA/react-scripts 5 (Jest + `@testing-library/react` already installed), `react-icons`, `react-typed`, `lucide-react`.

## Global Constraints

- Color tokens must be exactly: `paper #f5f3ee`, `ink #141414`, `rust #b5451b`, `dot #c9c4b8`, `line #d8d4ca` (spec: Visual Direction).
- No new font imports — use system `font-mono` / `font-sans` stacks only (spec: Out of Scope).
- Hover language is a hard offset-shadow lift (`translateY` + `box-shadow: 3px 3px 0 <color>`), never blur/glow (spec: Visual Direction).
- No dark/light mode toggle; the new theme replaces the old one outright (spec: Out of Scope).
- `FadeUp` must respect `prefers-reduced-motion` (spec: Motion).
- View counter must gracefully hide (render `null`) on any failure — no error state, no placeholder dash (spec: View Counter).
- View counter values come from env vars `REACT_APP_COUNTER_WORKSPACE` / `REACT_APP_COUNTER_NAME`, never hardcoded (spec: View Counter).
- Nav labels/anchors (`About`/`Experience`/`Apps`/`Skills`/`Contact`) stay unchanged (spec: Content).
- Production URL for SEO tags: `https://tomasferrari.onrender.com` (from `README.md`).

---

### Task 1: Tailwind theme tokens

**Files:**
- Modify: `tailwind.config.js`

**Interfaces:**
- Produces: Tailwind color utilities `bg-paper`, `text-ink`, `text-rust`, `bg-dot`/`text-dot`, `border-line` (and `bg-ink`, `border-ink`, `bg-rust`, `border-rust` via Tailwind's automatic shade generation) available to every later task.

- [ ] **Step 1: Add color tokens**

Replace the file contents:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#f5f3ee',
        ink: '#141414',
        rust: '#b5451b',
        dot: '#c9c4b8',
        line: '#d8d4ca',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Verify Tailwind picks up the tokens**

Run: `npm run build`
Expected: build succeeds with no errors (Tailwind config errors fail the build immediately).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: add warm-neutral color tokens to tailwind config"
```

---

### Task 2: `useInView` hook

**Files:**
- Create: `src/hooks/useInView.js`
- Test: `src/hooks/useInView.test.js`

**Interfaces:**
- Produces: `useInView(options?: { once?: boolean, threshold?: number }) => [ref: React.RefObject, isInView: boolean]`. Default `once = true`, `threshold = 0.1`. Consumed by `FadeUp` (Task 3).

- [ ] **Step 1: Write the failing test**

```js
// src/hooks/useInView.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useInView } from './useInView';

let observerCallback;

class MockIntersectionObserver {
  constructor(callback) {
    observerCallback = callback;
  }
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  observerCallback = undefined;
  global.IntersectionObserver = MockIntersectionObserver;
});

function TestComponent() {
  const [ref, isInView] = useInView();
  return <div ref={ref}>{isInView ? 'in-view' : 'out-of-view'}</div>;
}

test('reports out-of-view initially, in-view after intersection fires', () => {
  render(<TestComponent />);
  expect(screen.getByText('out-of-view')).toBeInTheDocument();

  act(() => {
    observerCallback([{ isIntersecting: true }]);
  });

  expect(screen.getByText('in-view')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/hooks/useInView.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './useInView'`

- [ ] **Step 3: Write minimal implementation**

```js
// src/hooks/useInView.js
import { useEffect, useRef, useState } from 'react';

export function useInView({ once = true, threshold = 0.1 } = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return [ref, isInView];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/hooks/useInView.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/hooks/useInView.js src/hooks/useInView.test.js
git commit -m "feat: add useInView intersection observer hook"
```

---

### Task 3: `FadeUp` component

**Files:**
- Create: `src/components/FadeUp.js`
- Test: `src/components/FadeUp.test.js`

**Interfaces:**
- Consumes: `useInView()` from `src/hooks/useInView.js` (Task 2) — `[ref, isInView]`.
- Produces: `<FadeUp delay?: number, className?: string>{children}</FadeUp>` — a `div` wrapper. Consumed by Hero (Task 5), WorkExperience (Task 6), Projects (Task 7), Skills (Task 8).

- [ ] **Step 1: Write the failing test**

```js
// src/components/FadeUp.test.js
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import FadeUp from './FadeUp';

let observerCallback;

class MockIntersectionObserver {
  constructor(callback) {
    observerCallback = callback;
  }
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  observerCallback = undefined;
  global.IntersectionObserver = MockIntersectionObserver;
  window.matchMedia = window.matchMedia || (() => ({ matches: false }));
});

test('starts hidden and becomes visible once in view', () => {
  render(<FadeUp><span>content</span></FadeUp>);
  const wrapper = screen.getByText('content').parentElement;
  expect(wrapper.className).toMatch(/opacity-0/);

  act(() => {
    observerCallback([{ isIntersecting: true }]);
  });

  expect(wrapper.className).toMatch(/opacity-100/);
});

test('skips transform when prefers-reduced-motion is set', () => {
  window.matchMedia = () => ({ matches: true });
  render(<FadeUp><span>content2</span></FadeUp>);
  const wrapper = screen.getByText('content2').parentElement;
  expect(wrapper.style.transform).toBe('');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/FadeUp.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './FadeUp'`

- [ ] **Step 3: Write minimal implementation**

```jsx
// src/components/FadeUp.js
import React from 'react';
import { useInView } from '../hooks/useInView';

const FadeUp = ({ children, delay = 0, className = '' }) => {
  const [ref, isInView] = useInView();
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const style = prefersReducedMotion
    ? {}
    : {
        transitionDelay: `${delay}ms`,
        transform: isInView ? 'translateY(0)' : 'translateY(14px)',
      };

  const opacityClass = prefersReducedMotion
    ? ''
    : isInView
    ? 'opacity-100'
    : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${opacityClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default FadeUp;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/FadeUp.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/FadeUp.js src/components/FadeUp.test.js
git commit -m "feat: add FadeUp scroll-motion wrapper component"
```

---

### Task 4: Navbar restyle

**Files:**
- Modify: `src/components/Navbar.js`
- Test: `src/components/Navbar.test.js`

**Interfaces:**
- Consumes: none (no new interfaces).
- Produces: no exports beyond default `Navbar`; other tasks don't depend on internals.

- [ ] **Step 1: Write the failing test**

```js
// src/components/Navbar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders paper background and all nav links', () => {
  const { container } = render(<Navbar />);
  const root = container.firstChild;
  expect(root.className).toMatch(/bg-paper/);

  ['About', 'Experience', 'Apps', 'Skills', 'Contact'].forEach((label) => {
    expect(screen.getAllByText(label)[0]).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/Navbar.test.js --watchAll=false`
Expected: FAIL — root className does not match `/bg-paper/`

- [ ] **Step 3: Restyle the component**

Replace the file contents:

```jsx
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-ink bg-paper sticky top-0 z-10 border-b border-line">
      <p className="w-full text-3xl font-bold text-ink m-4">
        TOMAS FERRARI
      </p>
      <ul className="hidden md:flex font-mono text-sm">
        <li className="p-4 hover:text-rust hover:underline"><a href="#About">About</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Experience">Experience</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Apps">Apps</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Skills">Skills</a></li>
        <li className="p-4 hover:text-rust hover:underline"><a href="#Contact">Contact</a></li>
      </ul>
      <div className="block md:hidden text-ink" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          isMobileMenuOpen
            ? "fixed left-0 top-0 w-[70%] h-full border-r border-line bg-paper ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <p className="w-full text-3xl font-bold text-ink m-4">
          Tomas Ferrari
        </p>
        <ul className="pt-4 font-mono text-sm">
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#About">About</a></li>
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#Experience">Experience</a></li>
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#Apps">Apps</a></li>
          <li className="p-4 hover:text-rust border-b border-line"><a onClick={toggleMobileMenu} href="#Skills">Skills</a></li>
          <li className="p-4 hover:text-rust"><a onClick={toggleMobileMenu} href="#Contact">Contact</a></li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/Navbar.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.js src/components/Navbar.test.js
git commit -m "feat: restyle Navbar with warm-neutral theme"
```

---

### Task 5: Hero restyle, motion, and bio rewrite

**Files:**
- Modify: `src/components/Hero.js`
- Test: `src/components/Hero.test.js`

**Interfaces:**
- Consumes: `FadeUp` from `src/components/FadeUp.js` (Task 3).
- Produces: no exports beyond default `Hero`.

- [ ] **Step 1: Write the failing test**

```js
// src/components/Hero.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver;
});

test('renders keyword-led bio and dot-grid hero background', () => {
  const { container } = render(<Hero />);
  expect(screen.getByText(/Full-Stack Software Developer/)).toBeInTheDocument();
  expect(container.querySelector('.bg-dot-grid')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/Hero.test.js --watchAll=false`
Expected: FAIL — text not found / `.bg-dot-grid` not found

- [ ] **Step 3: Restyle the component**

Replace the file contents:

```jsx
import React from 'react'
import { ReactTyped } from "react-typed";
import resume from '../Resume Tomas Ferrari.pdf';
import { LuDownload } from "react-icons/lu";
import FadeUp from './FadeUp';

const Hero = () => {
  return (
    <div id='About' className='text-ink bg-paper relative'>
      <div
        className="bg-dot-grid absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(#c9c4b8 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage: 'radial-gradient(ellipse 60% 70% at 50% 45%, transparent 40%, black 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 45%, transparent 40%, black 100%)',
        }}
      />
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center relative z-10">
        <FadeUp>
          <h1 className='text-ink text-3xl font-bold p-2 md:text-5xl sm:text-4xl md:py-6'>Full-Stack Software Developer</h1>
        </FadeUp>
        <FadeUp delay={120}>
          <div className='flex justify-center items-center font-mono text-rust'>
            <ReactTyped className='pl-2 pb-5 md:text-5hx sm:text-4xl text-xl font-bold' strings={['Python', 'React', 'Django', 'FastAPI', 'Node', 'SQL']} typeSpeed={80} backSpeed={100} loop />
          </div>
        </FadeUp>
        <FadeUp delay={240}>
          <p className='p-5 md:text-2xl text-xl md:pl-4 text-ink/80'>Full-Stack Software Developer with 7 years of backend experience in Python, Django, FastAPI, and SQL, plus 5 years building React and Tailwind frontends. I design and ship complete web applications end to end.</p>
        </FadeUp>
        <FadeUp delay={360}>
          <div className="flex flex-row">
            <a download='Resume Tomas Ferrari' href={resume} className='inline-flex mx-auto items-center px-3 py-2 my-2 text-sm font-bold text-center text-white bg-ink rounded-none hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#b5451b] transition-transform'>Download Resume <LuDownload className='mx-2' /></a>
          </div>
        </FadeUp>
      </div>
    </div>
  )
}

export default Hero
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/Hero.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.js src/components/Hero.test.js
git commit -m "feat: restyle Hero with dot-grid, motion, and keyword-led bio"
```

---

### Task 6: WorkExperience restyle

**Files:**
- Modify: `src/components/WorkExperience.js`
- Test: `src/components/WorkExperience.test.js`

**Interfaces:**
- Consumes: `FadeUp` from `src/components/FadeUp.js` (Task 3).
- Produces: no exports beyond default `WorkExperience`.

- [ ] **Step 1: Write the failing test**

```js
// src/components/WorkExperience.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import WorkExperience from './WorkExperience';

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
}

beforeEach(() => {
  global.IntersectionObserver = MockIntersectionObserver;
});

test('renders all role titles on a paper-themed section', () => {
  const { container } = render(<WorkExperience />);
  expect(container.firstChild.className).toMatch(/bg-paper/);
  expect(screen.getByText(/Founder & Full Stack Developer at EntreVinos/)).toBeInTheDocument();
  expect(screen.getByText(/Software Engineer at JP Morgan Chase/)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/WorkExperience.test.js --watchAll=false`
Expected: FAIL — className does not match `/bg-paper/`

- [ ] **Step 3: Restyle the component**

Replace the file contents:

```jsx
import React from 'react'
import { MdWorkOutline } from "react-icons/md";
import FadeUp from './FadeUp';

const entries = [
  {
    date: 'January 2025 - Present',
    title: 'Founder & Full Stack Developer at EntreVinos',
    bullets: [
      'Architected a modern, responsive web application for wine enthusiasts using React, TypeScript, and Vite, featuring a robust social component for users to discover, rate, and follow others collections.',
      'Implemented client-side and server-side AI-powered image classification using TensorFlow.js (MobileNet) and Gemini AI to categorize wine labels and streamline the admin content moderation workflow.',
      'Built robust backend services utilizing Supabase, Postgres, and Node, encompassing automated email alerts, real-time user notifications, Google OAuth integration, and scheduled web scraping tasks.',
      'Designed an accessible and animated user interface leveraging Tailwind CSS, Shadcn UI, and Framer Motion, while managing complex state and data fetching with React Query.',
    ],
    technologies: 'React, TypeScript, Node, Supabase, Postgres, TensorFlow.js, Gemini AI, TailwindCSS, Shadcn UI, React Query, Framer Motion, Git',
  },
  {
    date: 'November 2024 - Present',
    title: 'Software Engineer at Athyna | Sparklight',
    bullets: [
      'Automate IP reservations using backend tools by creating a full stack web app with FastAPI and React.',
      'Modernize technologies written in PHP to have new codebase and created a FullStack application to interact.',
      'Created webapp that allows network devices configuration templates to be created using Jinja2, FastAPI and React',
      'Deploy containerized applications to Openshift',
    ],
    technologies: 'Python, FastAPI, GIT, Docker, React, Javascript, Openshift, Agile Methodologies, Unit tests',
  },
  {
    date: 'December 2021',
    title: 'Software Engineer at JP Morgan Chase',
    bullets: [
      'Developed and implemented automated scripts in Python using OOP to streamline financial reporting processes resulting in a reduction of financial incidents.',
      'Led and successfully orchestrated the migration from RedisCache to the AMPS server, ensuring a seamless transition and optimized performance. Achieved a notable improvement in throughput by 25% and a reduction in incidents. Coded all necessary scripts and conducted thorough unit tests to guarantee system reliability and stability.',
      'Got certified as AWS Cloud Practitioner.',
      'As Scrum Master, I improved agile methodologies and scrum practices, resulting in a 40% increase in team productivity and throughput of deliverables.',
    ],
    technologies: 'Python, OOP, SQL, GIT, AWS, React, Javascript, Unit Testing, Agile Methodologies, Splunk, PowerBi, Tableau',
  },
  {
    date: 'December 2019',
    title: 'Developer at ExxonMobil',
    bullets: [
      'Infrastructure, network and APM monitoring through Splunk, Appdynamics, Tableau and PowerBi. Automatic triggering actions to take effect if threshold are achieved.',
      'Developed an AI powered chatbot using NLP specifically designed to support incident managers in rapidly retrieving crucial information during ongoing incidents reducing Mean Time To Restore (MTTR) incidents.',
      'Developed Python – Flask backend API’s and React Frontend for web applications, ensuring seamless user experience and optimized performance simplifying the analysis of common root causes and enhancing the decision-making process.',
    ],
    technologies: 'Python, Django, Flask, Splunk, PowerBi, Tableau, AppDynamics, React, Git, SQL, Azure, Agile, Unit Testing, OOP',
  },
  {
    date: 'June 2019',
    title: 'RPA Bot Developer at Everis (NTT Data)',
    bullets: [
      'Establishing, testing, and overseeing automated workflows to guarantee optimal efficiency in business processes while mitigating the risk of errors.',
      'Got certified as a professional RPA Bot developer using Automation Anywhere tool.',
    ],
    technologies: 'Automation Anywhere, RPA, C#, Infrastructure, Agile',
  },
];

const WorkExperience = () => {
  return (
    <div id='Experience' className="bg-paper grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto px-7 mt-4 py-16">
      <MdWorkOutline className='mx-auto items-center' size={50} color='#141414' />
      <h2 className='text-ink text-3xl text-center font-bold p-2 md:text-5xl sm:text-4xl md:py-6'>Work Experience</h2>

      <ol className="relative border-s border-line">
        {entries.map((entry, i) => (
          <FadeUp key={entry.title} delay={i * 80}>
            <li className="mb-10 ms-4 p-4 border border-transparent hover:border-line hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#b5451b] transition-transform">
              <div className="absolute w-3 h-3 bg-rust rounded-full mt-1.5 -start-1.5 border border-paper"></div>
              <time className="mb-1 text-sm font-mono leading-none text-ink/60">{entry.date}</time>
              <h3 className="mb-4 text-lg font-semibold text-ink">{entry.title}</h3>
              {entry.bullets.map((bullet) => (
                <p key={bullet} className="mb-4 text-base font-normal text-ink/80">• {bullet}</p>
              ))}
              <div className='flex flex-wrap'>
                <p className="mb-4 text-base font-normal text-ink/60 underline pr-2">Technologies: </p>
                <p className="mb-4 text-base font-normal text-ink/60">{entry.technologies}</p>
              </div>
            </li>
          </FadeUp>
        ))}
      </ol>
    </div>
  )
}

export default WorkExperience;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/WorkExperience.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/WorkExperience.js src/components/WorkExperience.test.js
git commit -m "feat: restyle WorkExperience with paper theme and scroll motion"
```

---

### Task 7: Project card and Projects grid restyle

**Files:**
- Modify: `src/components/Project.js`
- Modify: `src/components/Projects.js`
- Test: `src/components/Project.test.js`

**Interfaces:**
- Consumes: `FadeUp` from `src/components/FadeUp.js` (Task 3), in `Projects.js` only.
- Produces: `Project` keeps its existing prop shape (`name, sitepicture, summary, url, technologies, isStar`) — unchanged, so `Projects.js`'s call sites need no prop changes.

- [ ] **Step 1: Write the failing test**

```js
// src/components/Project.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Project from './Project';

test('renders outline-style tech pills and descriptive image alt text', () => {
  render(
    <Project
      name="Test Project"
      sitepicture="test.webp"
      summary="A test project"
      url="https://example.com"
      technologies={['React', 'Python']}
    />
  );

  const img = screen.getByAltText(/Test Project/);
  expect(img).toBeInTheDocument();

  const pill = screen.getByText('React');
  expect(pill.className).toMatch(/border-ink/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/Project.test.js --watchAll=false`
Expected: FAIL — no element with alt text matching `/Test Project/` (current `alt=""`)

- [ ] **Step 3: Restyle `Project.js`**

Replace the file contents:

```jsx
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Trophy } from "lucide-react";

function Project({ name, sitepicture, summary, url, technologies, isStar }) {
  return (
    <div className="max-w-4xl w-full border border-line bg-paper relative">
      <img className="w-full object-cover" src={sitepicture} alt={`Screenshot of ${name} project`} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-ink flex items-center gap-2">
          {name}
          {isStar && <Trophy className="text-rust" size={20} />}
        </h5>
        <p className="mb-3 font-normal text-ink/80">
          {summary}
        </p>
        <a href={url}
          target='_blank'
          rel='noreferrer'
          className="inline-flex mx-auto items-center px-3 py-2 text-sm font-bold text-center text-white bg-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#b5451b] transition-transform"
        >
          Go To Site
          <FaArrowRight className="mx-1" />
        </a>
      </div>
      <div className="text-center items-center pb-4">
        {technologies.map((tech) =>
          <p key={tech} className="inline-block border border-ink rounded-none p-0.5 px-2 m-2 text-center font-mono text-xs text-ink hover:bg-ink hover:text-paper transition-colors">{tech}</p>
        )}
      </div>
    </div>
  );
}

export default Project;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/Project.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Restyle `Projects.js`**

Replace the file contents:

```jsx
import { FaCode } from "react-icons/fa6";
import EntreVinos from "../images/EntreVinos.webp";
import LLMtxt from "../images/LLMtxt.webp";
import Project from "./Project";
import FadeUp from "./FadeUp";

function Projects() {
  return (
    <div id='Apps' className="bg-paper grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto p-16 pt-24">
      <FaCode className='mx-auto items-center' size={50} color='#141414' />
      <h2 className='text-ink text-3xl text-center font-bold p-4 mb-8 md:text-5xl sm:text-4xl'>Apps</h2>
      <div className="grid sm:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-4 gap-4 justify-items-center items-stretch">
        <FadeUp>
          <Project
            name='EntreVinos'
            isStar={true}
            sitepicture={EntreVinos}
            summary="A modern, responsive full-stack platform for wine enthusiasts to discover, rate, and manage collections. It features a robust social component for community recommendations, AI-powered image classification (TensorFlow.js & Gemini) to categorize labels and streamline admin moderation, and real-time backend services with Supabase. Users can log ratings, follow members, and explore a constantly updated global wine database."
            url='https://wineme-app.vercel.app/'
            technologies={[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "Supabase",
              "PostgreSQL",
              "TensorFlow.js",
              "Gemini AI",
              "React Query"
            ]}
          />
        </FadeUp>
        <FadeUp delay={100}>
          <Project
            name='LLM.txt Generator'
            sitepicture={LLMtxt}
            summary="Full-stack web app (URL2LLM.txt Converter) that converts any webpage URL into a clean, downloadable `.txt` file optimized for LLM consumption. This LLM format is powered by Gemini AI using model gemini-3-flash-preview"
            url='https://url2llmtxt-frontend.onrender.com/'
            technologies={[
              "React",
              "TypeScript",
              "Tailwind CSS",
              "FastAPI",
              "Uvicorn",
              "Supabase S3 Bucket",
              "Playwright",
              "Gemini AI",
              "Pytest",
              "Pydantic"
            ]}
          />
        </FadeUp>
      </div>
    </div>
  )
}

export default Projects
```

- [ ] **Step 6: Run the full test suite for both files**

Run: `npx react-scripts test src/components/Project.test.js --watchAll=false`
Expected: PASS (Projects.js has no dedicated test — it's exercised indirectly via Project.test.js and manual verification in Task 12)

- [ ] **Step 7: Commit**

```bash
git add src/components/Project.js src/components/Projects.js src/components/Project.test.js
git commit -m "feat: restyle Project cards with outline pills and descriptive alt text"
```

---

### Task 8: Skills restyle

**Files:**
- Modify: `src/components/Skills.js`
- Test: `src/components/Skills.test.js`

**Interfaces:**
- Consumes: none.
- Produces: no exports beyond default `Skills`.

- [ ] **Step 1: Write the failing test**

```js
// src/components/Skills.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Skills from './Skills';

test('renders on a paper-themed section', () => {
  const { container } = render(<Skills />);
  expect(container.firstChild.className).toMatch(/bg-paper/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/Skills.test.js --watchAll=false`
Expected: FAIL — className does not match `/bg-paper/`

- [ ] **Step 3: Restyle the component**

In `src/components/Skills.js`, change line 20 (the root `div`'s `className`) and line 21 (the icon `color`):

```jsx
      <div id='Skills' className="bg-paper grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto p-16 pt-24">
        <GiSkills className='mx-auto items-center' size={50}  color='#141414'/>
        <h2 className='text-ink text-3xl text-center font-bold p-4 mb-8  md:text-5xl sm:text-4xl py-6'>Skills</h2>
```

Change every `hover:scale-105` image className (lines 24-37) to add the hard-shadow hover, e.g.:

```jsx
        <img className='w-20 mx-auto hover:scale-105 hover:shadow-[3px_3px_0_#b5451b] transition-transform' src={reactLogo} alt="Logo for React" />
```

Apply the same `hover:scale-105 hover:shadow-[3px_3px_0_#b5451b] transition-transform` className to all 14 `<img>` tags in the grid, keeping their existing `src`/`alt` props unchanged.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/Skills.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Skills.js src/components/Skills.test.js
git commit -m "feat: restyle Skills section with paper theme"
```

---

### Task 9: `ViewCounter` component

**Files:**
- Create: `src/components/ViewCounter.js`
- Test: `src/components/ViewCounter.test.js`

**Interfaces:**
- Produces: `buildCounterUrl(workspace: string, name: string) => string` (exported for testing) and default export `<ViewCounter />` — a `div` (or `null`). Consumed by `Footer` (Task 10).

- [ ] **Step 1: Write the failing test**

```js
// src/components/ViewCounter.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ViewCounter, { buildCounterUrl } from './ViewCounter';

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV, REACT_APP_COUNTER_WORKSPACE: 'ws', REACT_APP_COUNTER_NAME: 'portfolio' };
  global.fetch = jest.fn();
});

afterEach(() => {
  process.env = OLD_ENV;
  jest.restoreAllMocks();
});

test('buildCounterUrl builds the CounterAPI "up" endpoint', () => {
  expect(buildCounterUrl('ws', 'portfolio')).toBe('https://api.counterapi.dev/v1/ws/portfolio/up');
});

test('renders the count on a successful fetch', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ count: 42 }) });
  render(<ViewCounter />);
  await waitFor(() => expect(screen.getByText(/42 views/)).toBeInTheDocument());
});

test('renders nothing when the fetch fails', async () => {
  global.fetch.mockRejectedValueOnce(new Error('network error'));
  const { container } = render(<ViewCounter />);
  await waitFor(() => expect(container).toBeEmptyDOMElement());
});

test('renders nothing when env vars are missing', () => {
  process.env.REACT_APP_COUNTER_WORKSPACE = '';
  const { container } = render(<ViewCounter />);
  expect(container).toBeEmptyDOMElement();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('does not double-fetch under React.StrictMode double-invoked effects', async () => {
  global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ count: 5 }) });
  render(
    <React.StrictMode>
      <ViewCounter />
    </React.StrictMode>
  );
  await waitFor(() => expect(screen.getByText(/5 views/)).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledTimes(1);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/ViewCounter.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './ViewCounter'`

- [ ] **Step 3: Write minimal implementation**

```jsx
// src/components/ViewCounter.js
import React, { useEffect, useRef, useState } from 'react';

const COUNTER_API_BASE = 'https://api.counterapi.dev/v1';

export function buildCounterUrl(workspace, name) {
  return `${COUNTER_API_BASE}/${workspace}/${name}/up`;
}

const ViewCounter = () => {
  const [count, setCount] = useState(null);
  const [failed, setFailed] = useState(false);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const workspace = process.env.REACT_APP_COUNTER_WORKSPACE;
    const name = process.env.REACT_APP_COUNTER_NAME;

    if (!workspace || !name) {
      setFailed(true);
      return;
    }

    fetch(buildCounterUrl(workspace, name))
      .then((res) => {
        if (!res.ok) throw new Error('counter request failed');
        return res.json();
      })
      .then((data) => {
        if (typeof data.count === 'number') {
          setCount(data.count);
        } else {
          setFailed(true);
        }
      })
      .catch(() => setFailed(true));
  }, []);

  if (failed || count === null) return null;

  return (
    <div className="col-span-2 md:col-span-4 flex justify-center items-center text-ink text-xs font-mono gap-1 pt-2">
      <span role="img" aria-label="eye">👁</span>
      <span>{count.toLocaleString()} views</span>
    </div>
  );
};

export default ViewCounter;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/ViewCounter.test.js --watchAll=false`
Expected: PASS (all 5 tests)

- [ ] **Step 5: Commit**

```bash
git add src/components/ViewCounter.js src/components/ViewCounter.test.js
git commit -m "feat: add ViewCounter component backed by CounterAPI.dev"
```

---

### Task 10: Footer restyle + ViewCounter integration

**Files:**
- Modify: `src/components/Footer.js`
- Test: `src/components/Footer.test.js`

**Interfaces:**
- Consumes: `ViewCounter` from `src/components/ViewCounter.js` (Task 9).
- Produces: no exports beyond default `Footer`.

- [ ] **Step 1: Write the failing test**

```js
// src/components/Footer.test.js
import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

beforeEach(() => {
  global.fetch = jest.fn().mockRejectedValue(new Error('no counter in test'));
});

test('renders on a paper-themed section with all four social links', () => {
  const { container } = render(<Footer />);
  expect(container.firstChild.className).toMatch(/bg-paper|border-line/);
  const links = container.querySelectorAll('a');
  expect(links).toHaveLength(4);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/Footer.test.js --watchAll=false`
Expected: FAIL — className does not match `/bg-paper|border-line/` (current classes are `text-gray border-gray-600`, `border-line` won't match either)

- [ ] **Step 3: Restyle the component**

Replace the file contents:

```jsx
import React from 'react'
import { MdOutlineMail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import ViewCounter from './ViewCounter';

function Footer() {
  return (
    <div id='Contact' className='max-w-[1240px] mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-6 bg-paper border border-line m-10'>
      <div className='flex justify-center items-center'>
        <a href="https://www.linkedin.com/in/tomasmariaferrari/" className="text-ink hover:text-rust" target='_blank' rel='noreferrer' >
          <CiLinkedin className='mx-auto items-center' size={35} />
        </a>
      </div>
      <div className='flex justify-center items-center'>
        <a href="mailto:ferra.tomy@gmail.com" className="text-ink hover:text-rust" target='_blank' rel='noreferrer' >
          <MdOutlineMail className='mx-auto items-center' size={35} />
        </a>
      </div>
      <div className='flex justify-center items-center'>
        <a href="https://wa.me/5491169002457" className="text-ink hover:text-rust" target='_blank' rel='noreferrer' >
          <FaWhatsapp className='mx-auto items-center' size={35} />
        </a>
      </div>
      <div className='flex justify-center items-center'>
        <a href="https://github.com/tomyferra" className="text-ink hover:text-rust" target='_blank' rel='noreferrer' >
          <FaGithub className='mx-auto items-center' size={35} />
        </a>
      </div>
      <ViewCounter />
    </div>
  )
}

export default Footer
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/Footer.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.js src/components/Footer.test.js
git commit -m "feat: restyle Footer and integrate view counter"
```

---

### Task 11: SEO/GEO technical files

**Files:**
- Modify: `public/index.html`
- Create: `public/sitemap.xml`
- Create: `public/robots.txt`
- Create: `public/llms.txt`
- Test: `src/seo.test.js`

**Interfaces:**
- Consumes: none.
- Produces: none (terminal task — no other task depends on these files).

- [ ] **Step 1: Write the failing test**

```js
// src/seo.test.js
const fs = require('fs');
const path = require('path');

test('index.html has SEO meta tags and Person JSON-LD', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
  expect(html).toMatch(/Full-Stack Software Developer/);
  expect(html).toMatch(/property="og:title"/);
  expect(html).toMatch(/name="twitter:card"/);
  expect(html).toMatch(/application\/ld\+json/);
  expect(html).toMatch(/"@type":\s*"Person"/);
  expect(html).toMatch(/rel="canonical"/);
});

test('sitemap.xml, robots.txt, and llms.txt exist with expected content', () => {
  const sitemap = fs.readFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), 'utf8');
  expect(sitemap).toMatch(/<urlset/);
  expect(sitemap).toMatch(/tomasferrari\.onrender\.com/);

  const robots = fs.readFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), 'utf8');
  expect(robots).toMatch(/Sitemap:/);
  expect(robots).toMatch(/Allow: \//);

  const llms = fs.readFileSync(path.join(__dirname, '..', 'public', 'llms.txt'), 'utf8');
  expect(llms).toMatch(/Tomas Ferrari/);
  expect(llms).toMatch(/Full-Stack Software Developer/);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/seo.test.js --watchAll=false`
Expected: FAIL — `public/sitemap.xml` etc. don't exist yet, and `index.html` lacks the new tags

- [ ] **Step 3: Rewrite `public/index.html`**

Replace the file contents:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/icon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f5f3ee" />
    <meta
      name="description"
      content="Tomas Ferrari — Full-Stack Software Developer with 7 years backend experience (Python, Django, FastAPI, SQL) and 5 years frontend experience (React, Tailwind). Based in Buenos Aires, Argentina."
    />
    <link rel="canonical" href="https://tomasferrari.onrender.com/" />

    <meta property="og:type" content="profile" />
    <meta property="og:title" content="Tomas Ferrari — Full-Stack Software Developer" />
    <meta property="og:description" content="Full-Stack Software Developer with 7 years backend experience (Python, Django, FastAPI, SQL) and 5 years frontend experience (React, Tailwind)." />
    <meta property="og:url" content="https://tomasferrari.onrender.com/" />
    <meta property="og:image" content="https://tomasferrari.onrender.com/logo512.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Tomas Ferrari — Full-Stack Software Developer" />
    <meta name="twitter:description" content="Full-Stack Software Developer with 7 years backend experience (Python, Django, FastAPI, SQL) and 5 years frontend experience (React, Tailwind)." />
    <meta name="twitter:image" content="https://tomasferrari.onrender.com/logo512.png" />

    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Tomas Ferrari",
        "jobTitle": "Full-Stack Software Developer",
        "url": "https://tomasferrari.onrender.com/",
        "email": "mailto:ferra.tomy@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Buenos Aires",
          "addressCountry": "AR"
        },
        "knowsAbout": ["Python", "Django", "FastAPI", "React", "Tailwind CSS", "SQL", "Node.js", "AWS"],
        "sameAs": [
          "https://www.linkedin.com/in/tomasmariaferrari/",
          "https://github.com/tomyferra"
        ]
      }
    </script>

    <title>Tomas Ferrari — Full-Stack Software Developer</title>
  </head>
  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BNN1D2FB49"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-BNN1D2FB49');
</script>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>

  </body>
</html>
```

- [ ] **Step 4: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://tomasferrari.onrender.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

- [ ] **Step 5: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://tomasferrari.onrender.com/sitemap.xml
```

- [ ] **Step 6: Create `public/llms.txt`**

```
# Tomas Ferrari

Full-Stack Software Developer based in Buenos Aires, Argentina.

## Summary
7 years of backend experience (Python, Django, FastAPI, SQL) and 5 years of
frontend experience (React, Tailwind CSS, JavaScript). Currently Founder &
Full Stack Developer at EntreVinos and Software Engineer at Athyna |
Sparklight. Previously Software Engineer at JP Morgan Chase and ExxonMobil.

## Skills
Python, Django, Flask, FastAPI, SQL, React, TypeScript, Tailwind CSS,
Node.js, AWS, Docker, Git, Agile methodologies.

## Projects
- EntreVinos (https://wineme-app.vercel.app/): full-stack wine discovery
  and rating platform with AI-powered image classification.
- LLM.txt Generator (https://url2llmtxt-frontend.onrender.com/): converts
  any webpage URL into a clean .txt file optimized for LLM consumption.

## Contact
Email: ferra.tomy@gmail.com
LinkedIn: https://www.linkedin.com/in/tomasmariaferrari/
GitHub: https://github.com/tomyferra
Portfolio: https://tomasferrari.onrender.com/
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npx react-scripts test src/seo.test.js --watchAll=false`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add public/index.html public/sitemap.xml public/robots.txt public/llms.txt src/seo.test.js
git commit -m "feat: add SEO/GEO meta tags, JSON-LD, sitemap, robots.txt, and llms.txt"
```

---

### Task 12: Env var docs + full manual verification

**Files:**
- Modify: `README.md`
- Create: `.env.example`

**Interfaces:**
- Consumes: `REACT_APP_COUNTER_WORKSPACE` / `REACT_APP_COUNTER_NAME` (defined in Task 9).
- Produces: none — final task.

- [ ] **Step 1: Create `.env.example`**

```
# Free workspace/counter slug from https://counterapi.dev — required for the
# Footer view counter to render. Copy this file to .env.local and fill in
# your own values (create a free account + workspace at counterapi.dev first).
REACT_APP_COUNTER_WORKSPACE=
REACT_APP_COUNTER_NAME=
```

- [ ] **Step 2: Add setup instructions to `README.md`**

Append to the end of `README.md`:

```markdown

## View Counter Setup

The Footer shows a live view count powered by [CounterAPI.dev](https://counterapi.dev)
(free tier). To enable it:

1. Create a free account and workspace at https://counterapi.dev.
2. Copy `.env.example` to `.env.local`.
3. Set `REACT_APP_COUNTER_WORKSPACE` and `REACT_APP_COUNTER_NAME` to your
   workspace/counter slugs.
4. Restart `npm start` (CRA only reads `.env*` files at startup).

If these are unset, or the request fails, the counter simply doesn't render
— no error is shown.
```

- [ ] **Step 3: Run the full test suite**

Run: `npx react-scripts test --watchAll=false`
Expected: PASS — all tests from Tasks 2-11 pass together

- [ ] **Step 4: Run a production build**

Run: `npm run build`
Expected: build succeeds with no new warnings

- [ ] **Step 5: Manual smoke test**

Run: `npm start`, open `http://localhost:3000` in a browser, and confirm:
- All sections (Navbar, Hero, WorkExperience, Projects, Skills, Footer) show the paper/ink/rust theme with no leftover black/`#00df9a` green.
- Hero shows the dot-grid background, staggered entrance animation, and blinking cursor.
- Scrolling to WorkExperience/Projects/Skills triggers fade-up on each item.
- Mobile nav (resize below `md` breakpoint) still opens/closes correctly.
- Footer view counter is either hidden (no env vars configured yet) or shows a view count — no visible error.

- [ ] **Step 6: Commit**

```bash
git add README.md .env.example
git commit -m "docs: document view counter setup"
```
