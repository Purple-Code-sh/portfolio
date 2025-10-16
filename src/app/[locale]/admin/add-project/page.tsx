// src/app/admin/add-project/page.tsx
import { createProjectAction } from "@/app/actions"; // Importaremos la acción que crearemos en el siguiente paso

export default function AddProjectPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-8">Añadir Nuevo Proyecto</h1>

      {/* El Server Action se conecta directamente al 'action' del formulario */}
      <form
        action={createProjectAction}
        className="w-full max-w-lg bg-neutral-800 p-8 rounded-lg shadow-lg"
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
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
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
            placeholder="/landings/proyecto/image.png"
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="htmlSrc"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            URL del HTML
          </label>
          <input
            type="text"
            id="htmlSrc"
            name="htmlSrc"
            required
            placeholder="/landings/proyecto/index.html"
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
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
            rows={3}
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            htmlFor="technologies"
            className="block mb-2 text-sm font-medium text-neutral-300"
          >
            Tecnologías (separadas por coma)
          </label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            required
            placeholder="html,tailwind,react,next"
            className="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-primary-500 hover:bg-primary-400 focus:ring-4 focus:outline-none focus:ring-primary-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Proyecto
        </button>
      </form>
    </main>
  );
}
