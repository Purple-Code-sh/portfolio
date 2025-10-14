// src/app/[locale]/components/LandingGrid.tsx
"use client"; // <-- Este SÍ es un componente de cliente porque necesita estado

import { useState } from "react";
import { Landing } from "@prisma/client"; // Prisma nos da los tipos de datos automáticamente
import { ProjectCard } from "./ProjectCard"; // Reutilizas los componentes que ya tienes
import { ProjectModal } from "./ProjectModal";

// Definimos que este componente recibe una lista de 'landings'
type LandingGridProps = {
  landings: Landing[];
};

export function LandingGrid({ landings }: LandingGridProps) {
  const [selectedProjectSrc, setSelectedProjectSrc] = useState<string | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {landings.map((landing) => (
          // Es importante que ProjectCard ahora acepte un tipo 'Landing'
          <ProjectCard
            key={landing.id} // Usamos el ID de la base de datos, que es único
            project={landing}
            onClick={() => setSelectedProjectSrc(landing.htmlSrc)}
          />
        ))}
      </div>

      {/* El modal funciona exactamente igual que antes */}
      {selectedProjectSrc && (
        <ProjectModal
          src={selectedProjectSrc}
          onClose={() => setSelectedProjectSrc(null)}
        />
      )}
    </>
  );
}
