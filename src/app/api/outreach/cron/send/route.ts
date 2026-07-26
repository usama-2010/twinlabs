import { NextResponse } from "next/server";
import { getSupabase, isSupabaseConfigured } from "@/lib/outreach/db";
import { sendCampaignBatch } from "@/lib/outreach/send-service";

export async function GET(request: Request) {
  const secret = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected || secret !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ processed: 0 });
  }

  const supabase = getSupabase();
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id")
    .eq("status", "active")
    .limit(10);

  const results = [];

  for (const campaign of campaigns ?? []) {
    try {
      const result = await sendCampaignBatch(campaign.id);
      results.push({ campaignId: campaign.id, ...result });
    } catch (error) {
      results.push({
        campaignId: campaign.id,
        error: error instanceof Error ? error.message : "Send failed",
      });
    }
  }

  return NextResponse.json({ processed: results.length, results });
}
