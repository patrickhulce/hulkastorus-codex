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
    PrismaClientCtor = (await import("@prisma/client")).PrismaClient as unknown as {
      new (): PrismaLike;
    };
  } catch {
    throw new Error("Prisma client not available at runtime. Ensure @prisma/client is installed.");
  }

  globalThis.__prisma = new PrismaClientCtor();
  return globalThis.__prisma;
}
