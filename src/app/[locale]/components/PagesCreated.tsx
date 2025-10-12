"use client";

import { useState } from "react";
import { Dices } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export type Project = {
  name: string;
  imagePreview: string;
  htmlSrc: string;
  technologies: string[];
  description: string;
};

const projects: Project[] = [
  {
    name: "MX Encuestas",
    imagePreview: "/landings/mxencuestas/image.png",
    htmlSrc: "/landings/mxencuestas/index.html",
    technologies: ["html", "tailwind", "css", "javscript-ES6", "cloudflare"],
    description: "",
  },
  {
    name: "ATourGuidesJournel",
    imagePreview: "/landings/atourguidesjournel/image.png",
    htmlSrc: "/landings/atourguidesjournel/index.html",
    technologies: ["html", "tailwind", "css", "javscript-ES6", "cloudflare"],
    description: "",
  },
  {
    name: "xCrossMotor",
    imagePreview: "/landings/xcrossmotor/image.png",
    htmlSrc: "/landings/xcrossmotor/index.html",
    technologies: ["html", "tailwind", "css", "javscript-ES6", "cloudflare"],
    description: "",
  },
];

export default function PagesCreated() {
  const [selectedProjectSrc, setSelectedProjectSrc] = useState<string | null>(
    null
  );

  return (
    <section className="w-full py-8 md:py-12 xl:py-16">
      <div className="mb-6 lg:mb-8 flex gap-3 justify-between flex-wrap items-center">
        <h2>
          Websites I have created{" "}
          <span className="md:text-base text-sm">(+160)</span>
        </h2>
        <button className="bg-white hover:bg-primary-500 transition-colors duration-300 hover:text-white cursor-pointer w-fit flex shrink-0 gap-2 items-center text-black font-bold py-2 px-4 rounded-full text-sm md:text-base">
          Show more
          <Dices className="h-5 w-auto font-bold transition-transform" />
        </button>
      </div>

      {/* Grid Layout for Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            project={project}
            onClick={() => setSelectedProjectSrc(project.htmlSrc)}
          />
        ))}
      </div>

      {/* Conditionally render the modal */}
      {selectedProjectSrc && (
        <ProjectModal
          src={selectedProjectSrc}
          onClose={() => setSelectedProjectSrc(null)}
        />
      )}
    </section>
  );
}
