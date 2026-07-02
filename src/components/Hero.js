import React from 'react'
import { ReactTyped } from "react-typed";
import resume from '../Resume Tomas Ferrari.pdf';
import { LuDownload } from "react-icons/lu";
import FadeUp from './FadeUp';

const Hero = () => {
  return (
    <div id='About' className='text-ink bg-paper relative scroll-mt-20'>
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
