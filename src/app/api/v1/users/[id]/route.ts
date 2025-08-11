import {NextResponse} from "next/server";
import {getPrisma} from "@/lib/prisma";

export async function DELETE(_request: Request, context: {params: {id: string}}) {
  const id = context.params.id;
  try {
    const prisma = await getPrisma();
    await prisma.user.delete({where: {id}});
    return new NextResponse(null, {status: 204});
  } catch (err: any) {
    // If not found, respond 404; otherwise generic 500
    const code = err?.code === "P2025" ? 404 : 500;
    const message = code === 404 ? "Not Found" : (typeof err?.message === "string" ? err.message : "Unknown error");
    if (code === 404) return NextResponse.json({error: message}, {status: 404});
    return NextResponse.json({error: message}, {status: 500});
  }
}

