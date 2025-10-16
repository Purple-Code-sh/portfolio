"use client"; // <-- ¡MUY IMPORTANTE! Esto lo convierte en un Client Component

import { useState, useEffect } from "react";
import { Dices, LoaderCircle } from "lucide-react";
import { Landing } from "@prisma/client";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export default function PagesCreated() {
  // Estado para guardar los landings que se están mostrando
  const [landings, setLandings] = useState<Landing[]>([]);
  // Estado para el modal (funciona igual que antes)
  const [selectedProjectSrc, setSelectedProjectSrc] = useState<string | null>(
    null
  );
  // Estado para mostrar un indicador de carga
  const [isLoading, setIsLoading] = useState(true);

  // Función para llamar a tu API y traer 3 landings nuevos
  const fetchRandomLandings = async () => {
    setIsLoading(true); // Activa el indicador de carga
    try {
      const response = await fetch("/api/landings/random");
      if (!response.ok) {
        throw new Error("La respuesta de la red no fue exitosa");
      }
      const data = await response.json();
      setLandings(data); // Actualiza el estado con los nuevos landings
    } catch (error) {
      console.error("Error al traer los landings:", error);
      // Opcional: podrías poner un estado de error aquí para mostrar un mensaje al usuario
    } finally {
      setIsLoading(false); // Desactiva el indicador de carga
    }
  };

  // useEffect se ejecuta UNA SOLA VEZ cuando el componente se carga por primera vez
  useEffect(() => {
    fetchRandomLandings();
  }, []); // El array vacío asegura que solo se ejecute al inicio

  return (
    <section className="w-full py-8 md:py-12 xl:py-16">
      <div className="mb-6 lg:mb-8 flex gap-3 justify-between flex-wrap items-center">
        <h2>
          Websites I have created{" "}
          <span className="md:text-base text-sm">(+160)</span>
        </h2>
        {/* El botón ahora llama a la función fetchRandomLandings */}
        <button
          onClick={fetchRandomLandings}
          disabled={isLoading}
          className="bg-gradient-to-t from-primary-500 to-gray-100 hover:from-primary-400 hover:to-white transition-colors duration-300 hover:scale-[102%] cursor-pointer w-fit flex shrink-0 gap-2 items-center text-black font-bold py-2 px-4 rounded-full text-sm md:text-base disabled:bg-neutral-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Cargando..." : "Mostrar otros"}
          <Dices className="h-5 w-auto font-bold transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 min-h-[300px]">
        {isLoading ? (
          // Muestra un ícono de carga mientras se traen los datos
          <div className="col-span-3 flex justify-center items-center">
            <LoaderCircle className="h-12 w-12 animate-spin" />
          </div>
        ) : (
          // Mapea sobre los landings guardados en el estado
          landings.map((landing) => (
            <ProjectCard
              key={landing.id}
              project={landing}
              onClick={() => setSelectedProjectSrc(landing.htmlSrc)}
            />
          ))
        )}
      </div>

      {/* El modal no necesita cambios */}
      {selectedProjectSrc && (
        <ProjectModal
          src={selectedProjectSrc}
          onClose={() => setSelectedProjectSrc(null)}
        />
      )}
    </section>
  );
}
