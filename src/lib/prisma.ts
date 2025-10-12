// src/lib/prisma.ts

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Declara la variable global para evitar múltiples instancias en desarrollo
declare global {
  var prisma: PrismaClient | undefined;
}

// Crea el cliente de Prisma y extiéndelo con Accelerate
const prisma =
  globalThis.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
