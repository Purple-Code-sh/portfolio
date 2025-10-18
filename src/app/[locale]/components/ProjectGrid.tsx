"use client";

import { useState } from "react";
import { Project } from "@prisma/client";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedProjectDesc, setSelectedProjectDesc] = useState<string | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProjectDesc(project.description)}
          />
        ))}
      </div>

      {/* El modal funciona exactamente igual que antes */}
      {selectedProjectDesc && (
        <ProjectModal
          src={selectedProjectDesc}
          onClose={() => setSelectedProjectDesc(null)}
        />
      )}
    </>
  );
}
