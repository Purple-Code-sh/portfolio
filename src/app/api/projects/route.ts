// src/app/api/landings/random/route.ts

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const query = Prisma.sql`SELECT * FROM "Project"`;

    // Prisma ejecuta la consulta de forma segura
    const projects = await prisma.$queryRaw(query);

    // Se devuelve el resultado como una respuesta JSON
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching all projects:", error);
    // En caso de un error, se devuelve un mensaje claro y un estado 500
    return NextResponse.json(
      { error: "The projects could not be fetched." },
      { status: 500 }
    );
  }
}
