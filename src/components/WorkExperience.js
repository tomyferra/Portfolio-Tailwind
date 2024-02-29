import React from 'react'
import { MdWorkOutline } from "react-icons/md";



const WorkExperience = () => {
  return (
    <div id='Experience' className="grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto px-7 mt-4">
      <MdWorkOutline className='mx-auto items-center' size={50}  color='white'/>
      <h1 className='text-[#00df9a] text-3xl text-center font-bold p-2 md:text-5xl sm:text-4xl md: py-6'>Work Experience</h1>

      <ol class="relative border-s border-gray-200 dark:border-gray-700">
        <li class="mb-10 ms-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">December 2021</time>
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Software Engineer at JP Morgan Chase</h3>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Developed and implemented automated scripts in Python using OOP to streamline financial reporting processes resulting in a reduction of financial incidents.</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Led and successfully orchestrated the migration from RedisCache to the AMPS server, ensuring a seamless transition and optimized performance. Achieved a notable improvement in throughput by 25% and a reduction in incidents. Coded all necessary scripts and conducted thorough unit tests to guarantee system reliability and stability.</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Got certified as AWS Cloud Practitioner. </p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• As Scrum Master, I improved agile methodologies and scrum practices, resulting in a 40% increase in team productivity and throughput of deliverables.</p>
            <div className='flex'>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 underline pr-2">Technologies: </p>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Python, OOP, SQL, GIT, AWS, React, Javascript, Unit Testing, Agile Methodologies, Splunk, PowerBi, Tableau</p>
            </div>
        </li>
        <li class="mb-10 ms-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">December 2019</time>
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Developer at ExxonMobil</h3>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Infrastructure, network and APM monitoring through Splunk, Appdynamics, Tableau and PowerBi. Automatic triggering actions to take effect if threshold are achieved.</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Developed an AI powered chatbot using NLP specifically designed to support incident managers in rapidly retrieving crucial information during ongoing incidents reducing Mean Time To Restore (MTTR) incidents.</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Developed Python – Flask backend API’s and React Frontend for web applications, ensuring seamless user experience and optimized performance simplifying the analysis of common root causes and enhancing the decision-making process.</p>
            <div className='flex'>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 underline pr-2">Technologies: </p>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Python, Django, Flask, Splunk, PowerBi, Tableau, AppDynamics, React, Git, SQL, Azure, Agile, Unit Testing, OOP</p>
            </div>
        </li>
        <li class="mb-4 ms-4">
            <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">June 2019</time>
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">RPA Bot Developer at Everis (NTT Data)</h3>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Establishing, testing, and overseeing automated workflows to guarantee optimal efficiency in business processes while mitigating the risk of errors.</p>
            <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">• Got certified as a professional RPA Bot developer using Automation Anywhere tool.</p>
            <div className='flex'>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400 underline pr-2">Technologies: </p>
              <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Automation Anywhere, RPA, C#, Infrastructure, Agile</p>
            </div>
        </li>
      </ol>


    </div>
  )
}

export default WorkExperience;