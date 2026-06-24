import { FaCode } from "react-icons/fa6";
import EntreVinos from "../images/EntreVinos.webp";
import LLMtxt from "../images/LLMtxt.webp";
import TrailCarbTracker from "../images/TrailCarbTracker.webp";
import Project from "./Project";

function Projects() {
  return (
    <div id='Apps' className="grid grid-cols-1 justify-between items-center max-w-[1240px] mx-auto p-16 pt-24">
      <FaCode className='mx-auto items-center' size={50} color='white' />
      <h1 className='text-[#00df9a] text-3xl text-center font-bold p-4 mb-8 md:text-5xl sm:text-4xl'>Apps</h1>
      <div className="grid sm:grid-cols-2 sm:gap-4 md:grid-cols-2 md:gap-4 gap-4 justify-items-center items-stretch">
        <Project
          name='EntreVinos'
          isStar={true}
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
        />
        <Project
          name='LLM.txt Generator'
          sitepicture={LLMtxt}
          summary="Full-stack web app (URL2LLM.txt Converter) that converts any webpage URL into a clean, downloadable `.txt` file optimized for LLM consumption. This LLM format is powered by Gemini AI using model gemini-3-flash-preview"
          url='https://url2llmtxt-frontend.onrender.com/'
          technologies={[
            "React",
            "TypeScript",
            "Tailwind CSS",
            "FastAPI",
            "Uvicorn",
            "Supabase S3 Bucket",
            "Playwright",
            "Gemini AI",
            "Pytest",
            "Pydantic"
          ]}
        />
        
      </div>
    </div>
  )
}

export default Projects