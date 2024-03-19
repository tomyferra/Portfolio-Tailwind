import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Project({ name, sitepicture, summary, url, urlgithub }) {
  return (
    <div class="max-w-sm border rounded-lg shadow bg-gray-800 border-gray-400">
      <img class="rounded-t-lg" src={sitepicture} alt="" />
      <div class="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {name}
        </h5>
        <p className="mb-3 font-normal text-gray-300">
          {summary}
        </p>
        <a href={url}
          className="inline-flex mx-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Go To Site
          <FaArrowRight className="mx-1"/>
        </a>
      </div>
    </div>
  );
}

export default Project;
