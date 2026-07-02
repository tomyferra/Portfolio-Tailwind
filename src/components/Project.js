import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Trophy } from "lucide-react";

function Project({ name, sitepicture, summary, url, technologies, isStar }) {
  return (
    <div className="max-w-4xl w-full border border-line bg-paper relative">
      <img className="w-full object-cover" src={sitepicture} alt={`Screenshot of ${name} project`} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-ink flex items-center gap-2">
          {name}
          {isStar && <Trophy className="text-rust" size={20} />}
        </h5>
        <p className="mb-3 font-normal text-ink/80">
          {summary}
        </p>
        <a href={url}
          target='_blank'
          rel='noreferrer'
          className="inline-flex mx-auto items-center px-3 py-2 text-sm font-bold text-center text-white bg-ink hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#b5451b] transition-transform"
        >
          Go To Site
          <FaArrowRight className="mx-1" />
        </a>
      </div>
      <div className="text-center items-center pb-4">
        {technologies.map((tech) =>
          <p key={tech} className="inline-block border border-ink rounded-none p-0.5 px-2 m-2 text-center font-mono text-xs text-ink hover:bg-ink hover:text-paper transition-colors">{tech}</p>
        )}
      </div>
    </div>
  );
}

export default Project;
