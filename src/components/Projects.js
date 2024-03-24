import React from 'react'
import { FaCode } from "react-icons/fa6";
import CryptoApp from "../images/CryptoApp.webp";
import WineApp from "../images/WineMe.webp";
import FutbolArgentino from "../images/FutbolArgentino.webp";
import Project from "./Project";

function Projects() {
  return (
    <div id='Apps' className="grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto p-16 pt-24">
      <FaCode className='mx-auto items-center' size={50}  color='white'/>
      <h1 className='text-[#00df9a] text-3xl text-center font-bold p-4 mb-8 md:text-5xl sm:text-4xl'>Apps</h1>
      <div class="grid sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 gap-4 justify-center">
        <Project name='Futbol Argentino Game' sitepicture={FutbolArgentino} summary='This is a simple web app game where you can try guessing which Argentina futbol team has the biggest stadium. You add one score by each guess. Next task: Add a leaderboard where all high scores will be displayed' url='https://futbolargentinojuego.vercel.app/' technologies={["React", "Javascript", "Tailwind", "Postgres", "Github", "Django", "Django Rest Framework"]}/>
        <Project name='WineMe' sitepicture={WineApp} summary="This web app lets users rate wines from Argentina based on personal preferences. The wine list comes from a constantly updated MongoDB database, and the app provides wine details, such as origin and grape variety. Users can explore the list and rate wines via an easy-to-use interface." url='https://wineme.onrender.com/' technologies={["React", "Javascript", "Bootstrap", "Github", "Node.JS", "Express", "MongoDB" ]}/>
        <Project name='Crypto Converter' sitepicture={CryptoApp} summary='This web application allows users to convert Bitcoin to other currencies using the latest price data from Binance. It provides a comprehensive list of commonly traded currencies and real-time exchange rates. This app is perfect for investors and traders who need quick access to accurate market data.' url='https://tomyferra.github.io/cryptoconverter/' technologies={["React", "Javascript", "Bootstrap","Github", "API"]}/>
      </div>
    </div>
  )
}

export default Projects