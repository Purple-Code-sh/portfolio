// src/app/[locale]/components/PagesCreated.tsx
// MUY IMPORTANTE: Este archivo ya NO debe tener "use client" al principio.

import { Dices } from "lucide-react";
import prisma from "@/lib/prisma"; // Importas tu conexión a la DB
import { LandingGrid } from "./LandingGrid"; // Importaremos el componente para la parte interactiva

// Convertimos la función en 'async' para poder usar 'await'
export default async function PagesCreated() {
  // AQUÍ OCURRE LA MAGIA:
  // Se conecta a tu base de datos de Vercel y trae todos los registros de la tabla "landing"
  const landings = await prisma.landing.findMany({
    orderBy: {
      id: "desc", // Opcional: muestra los más nuevos primero
    },
  });

  return (
    <section className="w-full py-8 md:py-12 xl:py-16">
      <div className="mb-6 lg:mb-8 flex gap-3 justify-between flex-wrap items-center">
        <h2>
          Websites I have created{" "}
          <span className="md:text-base text-sm">(+160)</span>
        </h2>
        <button className="bg-white hover:bg-primary-500 transition-colors duration-300 hover:text-white cursor-pointer w-fit flex shrink-0 gap-2 items-center text-black font-bold py-2 px-4 rounded-full text-sm md:text-base">
          Show more
          <Dices className="h-5 w-auto font-bold transition-transform" />
        </button>
      </div>

      {/* Pasamos los datos leídos de la DB a un componente hijo que se encargará de la interactividad */}
      <LandingGrid landings={landings} />
    </section>
  );
}
