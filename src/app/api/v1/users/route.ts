import {NextResponse} from "next/server";
import {getPrisma} from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const prisma = await getPrisma();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        firstName: body.firstName ?? null,
        lastName: body.lastName ?? null,
        inviteCode: body.inviteCode ?? null,
      },
    });

    const {password, ...safe} = user;
    return NextResponse.json(safe, {status: 201});
  } catch (err: any) {
    const message = typeof err?.message === "string" ? err.message : "Unknown error";
    return NextResponse.json({error: message}, {status: 500});
  }
}

