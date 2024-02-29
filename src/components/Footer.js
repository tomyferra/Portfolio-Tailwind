import React from 'react'
import { MdOutlineMail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";





function Footer() {
  return (
    <div id='Contact' className=' max-w-[1240px] mx-auto p-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-gray border border-gray-600 m-10'>
      <div className='flex justify-center items-center'>
        <a href="https://www.linkedin.com/in/tomasmariaferrari/" className=" text-white" target='_blank' rel='noreferrer' >
          <CiLinkedin className='mx-auto items-center text-white' size={35}  color='white'/>
        </a>
      </div>
      <div className='flex justify-center items-center'>
        <a href="mailto:ferra.tomy@gmail.com" className="text-white" target='_blank' rel='noreferrer' >
          <MdOutlineMail className='mx-auto items-center' size={35}  color='white'/>
        </a>
      </div>
      <div className='flex justify-center items-center'>
        <a href="https://wa.me/5491169002457" className="text-white" target='_blank' rel='noreferrer' >
          <FaWhatsapp className='mx-auto items-center' size={35}  color='white'/>
        </a>
      </div>
      <div className='flex justify-center items-center'>
        <a href="https://github.com/tomyferra" className="text-white" target='_blank' rel='noreferrer' >
          <FaGithub className='mx-auto items-center' size={35}  color='white'/>
        </a>
      </div>

    </div>

  )
}

export default Footer