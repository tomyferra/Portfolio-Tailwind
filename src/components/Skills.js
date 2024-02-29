import React from 'react'
import { GiSkills } from "react-icons/gi";
import reactLogo from '../images/react.webp'
import gitLogo from '../images/gitLogo.png'
import javascriptLogo from '../images/javascriptLogo.webp'
import bootstrapLogo from '../images/bootstrapLogo.webp'
import HTMLLogo from '../images/HTMLLogo.webp'
import CSSLogo from '../images/CSSLogo.webp'
import pythonLogo from '../images/pythonLogo.png'
import tableauLogo from '../images/tableauLogo.png'
import powerBiLogo from '../images/powerBiLogo.webp'
import TailwindLogo from '../images/TailwindLogo.webp'
import MongoDBLogo from '../images/MongoDb.webp'
import PostmanLogo from '../images/PostmanLogo.webp'
import AWSLogo from '../images/awsLogo.webp'

function Skills() {
  return (
    <div id='Skills' className="grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto p-16 pt-24">
      <GiSkills className='mx-auto items-center' size={50}  color='white'/>
      <h1 className='text-[#00df9a] text-3xl text-center font-bold p-4 mb-8  md:text-5xl sm:text-4xl py-6'>Skills</h1>
      <div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6 justify-center">
        <img className='w-20 mx-auto' src={reactLogo} alt="Logo for React" />
        <img className='w-20 mx-auto' src={gitLogo} alt="Logo for Git" />
        <img className='w-20 mx-auto' src={javascriptLogo} alt="Logo for JS" />
        <img className='w-20 mx-auto' src={bootstrapLogo} alt="Logo for Bootstrap" />
        <img className='w-20 mx-auto' src={HTMLLogo} alt="Logo for HTML" />
        <img className='w-20 mx-auto' src={CSSLogo} alt="Logo for CSS" />
        <img className='w-20 mx-auto' src={TailwindLogo} alt="Logo for Tailwind" />
        <img className='w-20 mx-auto' src={MongoDBLogo} alt="Logo for MongoDB" />
        <img className='w-20 mx-auto' src={PostmanLogo} alt="Logo for Postman" />
        <img className='w-20 mx-auto' src={pythonLogo} alt="Logo for Python" />
        <img className='w-20 mx-auto' src={tableauLogo} alt="Logo for Tableu" />
        <img className='w-20 mx-auto' src={powerBiLogo} alt="Logo for PowerBI" />
        <img className='w-20 mx-auto' src={AWSLogo} alt="Logo for AWS" />
      </div>



    </div>
  )
}

export default Skills;