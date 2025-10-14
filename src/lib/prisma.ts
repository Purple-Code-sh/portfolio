// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// This function creates the extended Prisma client
const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

// We get the exact type of the extended client using TypeScript's ReturnType
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// We declare the global variable using the new, correct type
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// We either use the existing instance from the global variable or create a new one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

// In development, we save the instance to the global variable to reuse it across hot reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
