// src/app/admin/add-project/page.tsx
import { createProjectAction } from "@/app/actions"; // Importaremos la acción que crearemos en el siguiente paso

export default function AddProjectPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-8">
        Añadir Nuevo Proyecto Destacado
      </h1>

      {/* Esta forma llama directamente a tu Server Action */}
      <form
        action={createProjectAction}
        className="w-full max-w-2xl bg-neutral-800 p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Nombre del Proyecto
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="imagePreview"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            URL de la Imagen Preview
          </label>
          <input
            type="text"
            id="imagePreview"
            name="imagePreview"
            required
            placeholder="https://dominio.com/imagen.webp"
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="scope"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Alcance (Scope)
          </label>
          <input
            type="text"
            id="scope"
            name="scope"
            required
            placeholder="Internacional"
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="site_url"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            URL del Sitio Web (Opcional)
          </label>
          <input
            type="url"
            id="site_url"
            name="site_url"
            placeholder="https://example.com"
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="responsibilities"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Responsabilidades (una por línea)
          </label>
          <textarea
            id="responsibilities"
            name="responsibilities"
            required
            rows={5}
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="teams"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Equipos (uno por línea)
          </label>
          <textarea
            id="teams"
            name="teams"
            required
            rows={5}
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="technologies"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Tecnologías (una por línea)
          </label>
          <textarea
            id="technologies"
            name="technologies"
            required
            rows={5}
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg w-full p-2.5"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Proyecto
        </button>
      </form>
    </main>
  );
}
