// src/app/api/landings/random/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    // Esta es la consulta SQL que pide 3 registros aleatorios de la tabla "Landing"
    // Nota: El nombre de la tabla "Landing" es sensible a mayúsculas aquí.
    const query = Prisma.sql`SELECT * FROM "Landing" ORDER BY RANDOM() LIMIT 3`;

    // Prisma ejecuta la consulta de forma segura
    const landings = await prisma.$queryRaw(query);

    // Se devuelve el resultado como una respuesta JSON
    return NextResponse.json(landings);
  } catch (error) {
    console.error("Error fetching random landings:", error);
    // En caso de un error, se devuelve un mensaje claro y un estado 500
    return NextResponse.json(
      { error: "No se pudieron obtener los landings aleatorios." },
      { status: 500 }
    );
  }
}
