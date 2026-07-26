import { cookies } from "next/headers";
import {
  OUTREACH_COOKIE,
  verifySessionToken,
} from "@/lib/outreach/auth-token";

export { OUTREACH_COOKIE, createSessionToken, verifyPassword } from "@/lib/outreach/auth-token";

export async function isOutreachAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(OUTREACH_COOKIE)?.value);
}

export function outreachUnauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
