// src/app/[locale]/components/LandingGrid.tsx
"use client"; // <-- Este SÍ es un componente de cliente porque necesita estado

import { useState } from "react";
import { Landing } from "@prisma/client"; // Prisma nos da los tipos de datos automáticamente
import { LandingCard } from "./LandingCard"; // Reutilizas los componentes que ya tienes
import { LandingModal } from "./LandingModal";

// Definimos que este componente recibe una lista de 'landings'
type LandingGridProps = {
  landings: Landing[];
};

export function LandingGrid({ landings }: LandingGridProps) {
  const [selectedLandingSrc, setSelectedLandingSrc] = useState<string | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {landings.map((landing) => (
          // Es importante que ProjectCard ahora acepte un tipo 'Landing'
          <LandingCard
            key={landing.id} // Usamos el ID de la base de datos, que es único
            landing={landing}
            onClick={() => setSelectedLandingSrc(landing.htmlSrc)}
          />
        ))}
      </div>

      {/* El modal funciona exactamente igual que antes */}
      {selectedLandingSrc && (
        <LandingModal
          src={selectedLandingSrc}
          onClose={() => setSelectedLandingSrc(null)}
        />
      )}
    </>
  );
}
