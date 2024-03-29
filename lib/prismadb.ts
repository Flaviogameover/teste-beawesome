import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient | undefined;
}
// previne que outras instancias do prisma sejam criadas no devmode
export const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;
