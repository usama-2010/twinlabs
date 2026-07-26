import { NextResponse, type NextRequest } from "next/server";
import {
  OUTREACH_COOKIE,
  verifySessionToken,
} from "@/lib/outreach/auth-token";

const PUBLIC_PATHS = ["/outreach/login", "/api/outreach/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isOutreachPage = pathname.startsWith("/outreach");
  const isOutreachApi =
    pathname.startsWith("/api/outreach") &&
    !pathname.startsWith("/api/outreach/login");

  if (!isOutreachPage && !isOutreachApi) {
    return NextResponse.next();
  }

  if (PUBLIC_PATHS.some((path) => pathname === path)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(OUTREACH_COOKIE)?.value;
  if (await verifySessionToken(token)) {
    return NextResponse.next();
  }

  if (isOutreachApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/outreach/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/outreach/:path*", "/api/outreach/:path*"],
};
