// src/app/[locale]/components/PagesCreated.tsx
"use client"; // This must be a client component to use state and event handlers

import Image from "next/image";
import { useState } from "react";
import { Dices } from "lucide-react";

// (Paste the type and projects array from Step 1 here)
type Project = {
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
    technologies: ["next", "tailwind", "typescript", "html", "css"],
    description: "",
  },
  {
    name: "ATourGuidesJournel",
    imagePreview: "/landings/atourguidesjournel/image.png",
    htmlSrc: "/landings/atourguidesjournel/index.html",
    technologies: ["next", "tailwind", "typescript", "html", "css"],
    description: "",
  },
  {
    name: "xCrossMotor",
    imagePreview: "/landings/xcrossmotor/image.png",
    htmlSrc: "/landings/xcrossmotor/index.html",
    technologies: ["next", "tailwind", "typescript", "html", "css"],
    description: "",
  },
];

export default function PagesCreated() {
  // State to hold the src of the selected project. null = modal is closed.
  const [selectedProjectSrc, setSelectedProjectSrc] = useState<string | null>(
    null
  );

  // Type-safe handler to open the modal
  const openModal = (project: Project) => {
    setSelectedProjectSrc(project.htmlSrc);
  };

  const closeModal = () => {
    setSelectedProjectSrc(null);
  };

  return (
    <section className="w-full py-8 md:py-12 xl:py-16">
      <div className="mb-6 lg:mb-8 flex  gap-3 justify-between flex-wrap items-center">
        <h2>
          Websites I have created{" "}
          <span className="md:text-base text-sm">(+160)</span>
        </h2>
        <button className="bg-white hover:bg-primary-500 transition-colors duration-300 hover:text-white cursor-pointer w-fit flex shrink-0 gap-2 items-center text-black hover: font-bold py-2 px-4 rounded-full text-sm md:text-base">
          Show more
          <Dices className="h-5 w-auto font-bold transition-transform" />
        </button>
      </div>

      {/* Grid Layout for Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="bg-neutral-800 border-primary-600/25 border rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-xl"
            onClick={() => openModal(project)}
          >
            <Image
              src={project.imagePreview}
              alt={`${project.name} preview`}
              className="w-full h-32 lg:h-48 object-cover"
              width={358}
              height={192}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white">
                {project.name}
              </h3>
              {/* <p className="text-neutral-400 mt-2">{project.description}</p> */}

              <div className="mt-3">
                {project.technologies.map((technology) => (
                  <div
                    key={technology}
                    className="bg-neutral-700 text-white px-2 py-1 rounded-full text-xs"
                  >
                    {technology}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - rendered conditionally */}
      {selectedProjectSrc && (
        // Modal Backdrop: fixed position, covers screen, semi-transparent bg, centers content
        <div
          className="fixed inset-0 bg-black/80 sh-container flex justify-center items-center z-50"
          onClick={closeModal}
        >
          {/* Modal Content: stops click propagation, responsive width/height */}
          <div
            className="relative w-11/12 h-5/6 bg-neutral-900 rounded-lg shadow-2xl flex flex-col p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-[-15px] right-[-15px] bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg z-10"
            >
              &times;
            </button>
            {/* Iframe to display the page */}
            <iframe
              src={selectedProjectSrc}
              title="Project Preview"
              className="w-full h-full border-0 rounded-md"
            />
          </div>
        </div>
      )}
    </section>
  );
}
