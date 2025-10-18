"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { Project } from "@prisma/client";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectModal } from "../components/ProjectModal";

export default function ImportantProjects() {
  const t = useTranslations("Landings");
  // Estado para guardar los landings que se están mostrando
  const [projects, setProjects] = useState<Project[]>([]);
  // Estado para el modal (funciona igual que antes)
  const [selectedProjectSrc, setSelectedProjectSrc] = useState<string | null>(
    null
  );
  // Estado para mostrar un indicador de carga
  const [isLoading, setIsLoading] = useState(true);

  // Función para llamar a tu API y traer 3 landings nuevos
  const fetchProjects = async () => {
    setIsLoading(true); // Activa el indicador de carga
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("La respuesta de la red no fue exitosa");
      }
      const data = await response.json();
      setProjects(data); // Actualiza el estado con los nuevos landings
    } catch (error) {
      console.error("Error al traer los landings:", error);
      // Opcional: podrías poner un estado de error aquí para mostrar un mensaje al usuario
    } finally {
      setIsLoading(false); // Desactiva el indicador de carga
    }
  };

  // useEffect se ejecuta UNA SOLA VEZ cuando el componente se carga por primera vez
  useEffect(() => {
    fetchProjects();
  }, []); // El array vacío asegura que solo se ejecute al inicio

  return (
    <section className="w-full pb-8 md:pb-12 xl:pb-16">
      <div className="mb-6 lg:mb-8 flex gap-3 justify-between flex-wrap items-center">
        <h2>
          {t("title")}{" "}
          <span className="md:text-base text-sm">{t("count")}</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 min-h-[300px]">
        {isLoading ? (
          // Muestra un ícono de carga mientras se traen los datos
          <div className="col-span-3 flex justify-center items-center">
            <LoaderCircle className="h-12 w-12 animate-spin" />
          </div>
        ) : (
          // Mapea sobre los landings guardados en el estado
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProjectSrc(project.description)}
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
