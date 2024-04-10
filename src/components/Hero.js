import React from 'react'
import { ReactTyped } from "react-typed";
import resume from '../Resume Tomas Ferrari.pdf';
import { LuDownload } from "react-icons/lu";


const Hero = () => {
  return (
    <div  id='About' className=' text-white'>
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className='text-[#00df9a] text-3xl font-bold p-2 md:text-5xl sm:text-4xl md: py-6'>Software Developer</h1>
        <div className='flex justify-center items-center'>
          <ReactTyped className='pl-2 pb-5 md:text-5hx sm:text-4xl text-xl font-bold' strings={['Python', 'React', 'Git', 'Javascript', 'Django', 'Tailwind']} typeSpeed={80} backSpeed={100} loop/>
        </div>
        <p className='p-5 md:text-2xl text-xl md:pl-4 text-gray-300'>I am an experienced backend developer with 5 years doing Python and SQL, complemented by 3 years of front-end work in React, Tailwind and JavaScript. Aspiring to become a full-stack developer driven to fuse technical depth with creative frontend solutions. Open to relocation for the right opportunity.</p>
        <div className="flex flex-row">
          <a download='Resume Tomas Ferrari' href={resume} className='inline-flex mx-auto items-center px-3 py-2 my-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"'>Download Resume <LuDownload className='mx-2'/></a>
        </div>
      </div>

    </div>
  )
}

export default Hero