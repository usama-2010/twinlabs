import { NextResponse } from "next/server";
import { isOutreachAuthenticated, outreachUnauthorized } from "@/lib/outreach/auth";
import { isSupabaseConfigured } from "@/lib/outreach/db";
import { deleteCampaign } from "@/lib/outreach/campaign-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const { id } = await context.params;

  try {
    await deleteCampaign(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Outreach delete campaign]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete campaign" },
      { status: 500 }
    );
  }
}
