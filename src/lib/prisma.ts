// Lightweight Prisma client accessor that avoids hard import errors during typecheck
// in environments where @prisma/client is not installed.
export async function getPrisma(): Promise<any> {
  // @ts-ignore - optional at typecheck time; resolved at runtime in real envs
  const {PrismaClient} = await import("@prisma/client");
  const g = globalThis as any;
  if (!g.__prisma) {
    g.__prisma = new PrismaClient();
  }
  return g.__prisma;
}

