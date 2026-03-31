import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Trophy } from "lucide-react";

function Project({ name, sitepicture, summary, url, technologies, Star: isStar }) {
  return (
    <div className="max-w-4xl w-full border rounded-lg shadow bg-gray-800 border-gray-400 relative">
      <img className="rounded-t-lg w-full object-cover" src={sitepicture} alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          {name}
          {isStar === "True" && <Trophy className="text-yellow-500" size={20} />}
        </h5>
        <p className="mb-3 font-normal text-gray-300">
          {summary}
        </p>
        <a href={url}
          className="inline-flex mx-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Go To Site
          <FaArrowRight className="mx-1" />
        </a>
      </div>
      <div className="text-center items-center">
        {technologies.map((tech) =>
          <p className="inline-block rounded-full p-0.5 px-2 m-2 text-center bg-slate-500 text-[#00df9a]">{tech}</p>
        )}
      </div>
    </div>
  );
}

export default Project;
