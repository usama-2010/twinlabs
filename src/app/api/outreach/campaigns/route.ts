import { NextResponse } from "next/server";
import { deleteAllCampaigns } from "@/lib/outreach/campaign-service";
import { isOutreachAuthenticated, outreachUnauthorized } from "@/lib/outreach/auth";
import { getSupabase, isSupabaseConfigured } from "@/lib/outreach/db";

export async function GET() {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ campaigns: [], recent: [] });
  }

  const supabase = getSupabase();

  const { data: campaigns, error: campaignsError } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  if (campaignsError) {
    return NextResponse.json({ error: campaignsError.message }, { status: 500 });
  }

  const { data: recentRows, error: recentError } = await supabase
    .from("campaign_leads")
    .select("*, leads(business_name)")
    .in("status", ["sent", "failed", "skipped"])
    .order("created_at", { ascending: false })
    .limit(50);

  if (recentError) {
    return NextResponse.json({ error: recentError.message }, { status: 500 });
  }

  const recent = (recentRows ?? []).map((row) => ({
    ...row,
    business_name:
      (row.leads as { business_name?: string } | null)?.business_name ?? undefined,
  }));

  return NextResponse.json({ campaigns: campaigns ?? [], recent });
}

export async function DELETE() {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  try {
    const deleted = await deleteAllCampaigns();
    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.error("[Outreach delete all campaigns]", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete campaigns" },
      { status: 500 }
    );
  }
}
