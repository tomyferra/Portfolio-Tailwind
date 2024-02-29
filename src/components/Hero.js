import React from 'react'
import { ReactTyped } from "react-typed";


const Hero = () => {
  return (
    <div  id='About' className=' text-white'>
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <h1 className='text-[#00df9a] text-3xl font-bold p-2 md:text-5xl sm:text-4xl md: py-6'>Software Developer</h1>
        <div className='flex justify-center items-center'>
          <ReactTyped className='pl-2 pb-5 md:text-5hx sm:text-4xl text-xl font-bold' strings={['Python', 'React', 'Git', 'Javascript', 'Django', 'Tailwind']} typeSpeed={80} backSpeed={100} loop/>
        </div>
        <p className='p-5 md:text-2xl text-xl md:pl-4 text-gray-300'>I am an experienced backend developer with 5 years doing Python and SQL, complemented by 3 years of front-end work in React, Tailwind and JavaScript. Aspiring to become a full-stack developer driven to fuse technical depth with creative frontend solutions. Open to relocation for the right opportunity.</p>
      </div>

    </div>
  )
}

export default Hero