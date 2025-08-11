import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const url = new URL("/", request.url);
  const res = NextResponse.redirect(url);
  // Clear a generic 'session' cookie if present (placeholder until NextAuth)
  res.cookies.set({name: "session", value: "", expires: new Date(0)});
  return res;
}

