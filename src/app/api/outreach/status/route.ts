import { NextResponse } from "next/server";
import { isOutreachAuthenticated, outreachUnauthorized } from "@/lib/outreach/auth";
import { checkOutreachSetup } from "@/lib/outreach/lead-service";

export async function GET() {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  const status = await checkOutreachSetup();
  return NextResponse.json(status);
}
