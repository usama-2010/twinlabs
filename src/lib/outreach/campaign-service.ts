import { getSupabase } from "@/lib/outreach/db";

export async function deleteCampaign(campaignId: string): Promise<void> {
  const supabase = getSupabase();

  const { data: campaign, error: fetchError } = await supabase
    .from("campaigns")
    .select("id")
    .eq("id", campaignId)
    .maybeSingle();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  if (!campaign) {
    throw new Error("Campaign not found.");
  }

  const { error: deleteError } = await supabase
    .from("campaigns")
    .delete()
    .eq("id", campaignId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }
}

export async function deleteAllCampaigns(): Promise<number> {
  const supabase = getSupabase();

  const { count, error: countError } = await supabase
    .from("campaigns")
    .select("id", { count: "exact", head: true });

  if (countError) {
    throw new Error(countError.message);
  }

  if (!count) {
    return 0;
  }

  const { error: deleteError } = await supabase
    .from("campaigns")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return count;
}
