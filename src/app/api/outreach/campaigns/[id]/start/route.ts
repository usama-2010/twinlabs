import { NextResponse } from "next/server";
import { isOutreachAuthenticated, outreachUnauthorized } from "@/lib/outreach/auth";
import { startCampaign } from "@/lib/outreach/send-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  const { id } = await context.params;

  try {
    const result = await startCampaign(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Outreach start campaign]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to start campaign" },
      { status: 500 }
    );
  }
}
