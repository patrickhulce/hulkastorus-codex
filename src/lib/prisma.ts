// Lightweight Prisma client accessor that avoids hard import errors during typecheck
// in environments where @prisma/client is not installed.
export type PrismaLike = {
  user: {
    create: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
    delete: (args: Record<string, unknown>) => Promise<unknown>;
  };
};

declare global {
  var __prisma: PrismaLike | undefined;
}

export async function getPrisma(): Promise<PrismaLike> {
  if (globalThis.__prisma) return globalThis.__prisma;

  let PrismaClientCtor: {new (): PrismaLike};
  try {
    const mod = (await Function("m", "return import(m)")("@prisma/client")) as unknown as {
      PrismaClient: {new (): PrismaLike};
    };
    PrismaClientCtor = mod.PrismaClient;
  } catch {
    throw new Error("Prisma client not available at runtime. Ensure @prisma/client is installed.");
  }

  globalThis.__prisma = new PrismaClientCtor();
  return globalThis.__prisma;
}
