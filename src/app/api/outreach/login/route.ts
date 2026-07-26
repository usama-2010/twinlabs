import { NextResponse } from "next/server";
import {
  createSessionToken,
  isOutreachAuthenticated,
  OUTREACH_COOKIE,
  verifyPassword,
} from "@/lib/outreach/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password as string | undefined;

  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(OUTREACH_COOKIE, await createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });

  return response;
}

export async function GET() {
  const authed = await isOutreachAuthenticated();
  return NextResponse.json({ authenticated: authed });
}
