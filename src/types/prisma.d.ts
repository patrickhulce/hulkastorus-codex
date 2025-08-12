declare module "@prisma/client" {
  export class PrismaClient {
    user: {
      create: (args: Record<string, unknown>) => Promise<Record<string, unknown>>;
      delete: (args: Record<string, unknown>) => Promise<unknown>;
    };
  }
}
