import { Project } from "@prisma/client";
import { Link, X } from "lucide-react"; // Importa el ícono 'X' para cerrar
import Image from "next/image"; // Para optimización de imágenes
import { useTranslations } from "next-intl";

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const t = useTranslations("Projects");
  return (
    <div
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 p-4 sm:p-6 lg:p-8 overflow-y-auto" // Permite scroll del fondo si el modal es muy alto
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-900 rounded-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden" // Max-height y overflow para scroll interno
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- Botón de Cerrar (Mejorado) --- */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg z-10 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" /> {/* Usamos el ícono 'X' */}
        </button>

        {/* --- Contenido Scrollable del Modal --- */}
        <div className="flex-grow overflow-y-auto p-6 lg:p-8">
          {/* --- Encabezado: Título, Link, Scope y Descripción --- */}
          <div className="mb-8 border-b border-neutral-700 pb-6">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
              {project.name}
            </h1>

            <p className="text-neutral-300 text-base leading-relaxed mb-2">
              {t(project.name + "." + project.description)}
            </p>

            <p className="text-sm font-medium bg-primary-600/50 text-primary-300 py-1 mb-2 rounded-full">
              {t(project.name + "." + project.scope)}
            </p>

            {project.site_url && (
              <a
                href={project.site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-base text-primary-500 hover:text-primary-400 hover:underline transition-colors duration-300"
              >
                <Link className="h-4 w-4" />
                {t("visit")}
              </a>
            )}
          </div>

          {/* --- Cuerpo: Layout Responsivo de Contenido --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Columna Izquierda (o arriba en móvil) */}
            <div>
              {/* Imagen Preview */}
              <div className="mb-8">
                <Image
                  src={project.imagePreview}
                  alt={`${project.name} preview`}
                  className="w-full h-auto rounded-lg object-cover shadow-lg border border-neutral-700"
                  width={800} // Dimensiones optimizadas (ajusta si la imagen es de otro tamaño)
                  height={450}
                  layout="responsive" // Hace la imagen responsiva
                />
              </div>

              {/* Tecnologías */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {t("stack")}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm font-medium bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded-full shadow-md hover:bg-primary-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Columna Derecha (o abajo en móvil) */}
            <div>
              {/* Mis Responsabilidades */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  {t("resp")}
                </h2>
                <ul className="list-none space-y-3 text-neutral-300 text-base">
                  {project.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-400 mr-2 text-xl font-bold">
                        &bull;
                      </span>
                      <span>{t(project.name + "." + resp)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipos */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  {t("teams")}
                </h2>
                <ul className="list-none space-y-3 text-neutral-300 text-base">
                  {project.teams.map((team, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-400 mr-2 text-xl font-bold">
                        &bull;
                      </span>
                      <span>{t(project.name + "." + team)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
