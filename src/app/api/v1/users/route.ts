import {NextResponse} from "next/server";
import {getPrisma} from "@/lib/prisma";
import {hashPassword} from "@/lib/passwords";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prisma = await getPrisma();
    const hashed = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashed,
        firstName: body.firstName ?? null,
        lastName: body.lastName ?? null,
        inviteCode: body.inviteCode ?? null,
      },
    });

    const safe = {...(user as Record<string, unknown>)} as Record<string, unknown>;
    delete (safe as Record<string, unknown>)["password"];
    return NextResponse.json(safe as unknown, {status: 201});
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({error: message}, {status: 500});
  }
}
