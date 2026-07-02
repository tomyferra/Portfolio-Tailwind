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
          <li key={entry.title} className="mb-10 ms-4 p-4 border border-transparent hover:border-line hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#b5451b] transition-transform">
            <FadeUp delay={i * 80}>
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
            </FadeUp>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default WorkExperience;
