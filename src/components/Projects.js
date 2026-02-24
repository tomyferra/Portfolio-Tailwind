import { FaCode } from "react-icons/fa6";
import EntreVinos from "../images/EntreVinos.webp";
import Project from "./Project";

function Projects() {
  return (
    <div id='Apps' className="grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto p-16 pt-24">
      <FaCode className='mx-auto items-center' size={50} color='white' />
      <h1 className='text-[#00df9a] text-3xl text-center font-bold p-4 mb-8 md:text-5xl sm:text-4xl'>Apps</h1>
      <div className="grid sm:grid-cols-1 sm:gap-4 md:grid-cols-1 md:gap-4 gap-4 justify-items-center items-stretch">
        <Project
          name='EntreVinos'
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
        />        {/* <Project name='Futbol Argentino Game' sitepicture={FutbolArgentino} summary='This is a simple web app game where you can try guessing which Argentina futbol team has the biggest stadium. You add one score by each guess. Next task: Add a leaderboard where all high scores will be displayed' url='https://futbolargentinojuego.vercel.app/' technologies={["React", "Javascript", "Tailwind", "Postgres", "Github", "Django", "Django Rest Framework"]}/> */}
        {/* <Project name='Crypto Converter' sitepicture={CryptoApp} summary='This web application allows users to convert Bitcoin to other currencies using the latest price data from Binance. It provides a comprehensive list of commonly traded currencies and real-time exchange rates. This app is perfect for investors and traders who need quick access to accurate market data.' url='https://tomyferra.github.io/cryptoconverter/' technologies={["React", "Javascript", "Bootstrap","Github", "API"]}/> */}
      </div>
    </div>
  )
}

export default Projects