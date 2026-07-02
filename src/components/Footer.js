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
