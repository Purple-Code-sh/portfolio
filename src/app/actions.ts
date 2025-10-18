// src/app/actions.ts
"use server"; // ¡Muy importante! Esto marca todas las funciones de este archivo como Server Actions.

import prisma from "@/lib/prisma"; // Importamos la librería de prisma
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Esta función recibe los datos del formulario directamente
export async function createLandingAction(formData: FormData) {
  // 1. Extraer y validar los datos del formulario
  const name = formData.get("name") as string;
  const imagePreview = formData.get("imagePreview") as string;
  const htmlSrc = formData.get("htmlSrc") as string;
  const description = formData.get("description") as string;
  const technologiesString = formData.get("technologies") as string;

  // Pequeña validación para asegurarse de que los campos no estén vacíos
  if (
    !name ||
    !imagePreview ||
    !htmlSrc ||
    !description ||
    !technologiesString
  ) {
    throw new Error("Todos los campos son requeridos.");
  }

  // Convertir el string de tecnologías en un array
  const technologies = technologiesString.split(",").map((tech) => tech.trim());

  // 2. Usar Prisma para crear el nuevo proyecto en la base de datos
  await prisma.landing.create({
    data: {
      name,
      imagePreview,
      htmlSrc,
      description,
      technologies,
    },
  });

  // 3. Limpiar el caché de la página principal para que muestre el nuevo proyecto
  revalidatePath("/"); // O la ruta donde muestres tus proyectos

  // 4. Redirigir al usuario de vuelta a la página principal
  redirect("/");
}

const parseLinesToArray = (text: string | null): string[] => {
  if (!text) return [];
  return text
    .split("\n") // Divide el string por cada salto de línea
    .map((s) => s.trim()) // Quita espacios en blanco al inicio y final
    .filter(Boolean); // Elimina líneas vacías
};

export async function createProjectAction(formData: FormData) {
  // 1. Extraer los datos simples
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imagePreview = formData.get("imagePreview") as string;
  const scope = formData.get("scope") as string;
  const site_url = formData.get("site_url") as string | null;

  // 2. Extraer y procesar los campos de array
  const responsibilities = parseLinesToArray(
    formData.get("responsibilities") as string
  );
  const teams = parseLinesToArray(formData.get("teams") as string);
  const technologies = parseLinesToArray(
    formData.get("technologies") as string
  );

  // Validación simple
  if (
    !name ||
    !description ||
    !imagePreview ||
    !scope ||
    responsibilities.length === 0 ||
    teams.length === 0 ||
    technologies.length === 0
  ) {
    throw new Error("Todos los campos son requeridos.");
  }

  // 3. Usar Prisma para crear el nuevo proyecto en el modelo "Project"
  await prisma.project.create({
    data: {
      name,
      description,
      imagePreview,
      scope,
      site_url,
      responsibilities,
      teams,
      technologies,
    },
  });

  // 4. Limpiar el caché de las páginas que muestran proyectos
  revalidatePath("/");
  redirect("/");
}
