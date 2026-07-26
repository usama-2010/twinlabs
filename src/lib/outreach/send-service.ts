import { Resend } from "resend";
import { getSupabase } from "@/lib/outreach/db";

function getOutreachFrom(): string {
  return (
    process.env.OUTREACH_FROM ??
    process.env.RESEND_FROM ??
    "TwinLabs <info@twinlabs.co.uk>"
  );
}

function getReplyTo(): string {
  return process.env.OUTREACH_REPLY_TO ?? "info@twinlabs.co.uk";
}

function getDailyCap(campaignCap: number): number {
  const envCap = Number(process.env.OUTREACH_DAILY_CAP ?? 25);
  return Math.min(campaignCap || envCap, envCap);
}

async function isSuppressed(email: string): Promise<boolean> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("suppression_list")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();
  return Boolean(data);
}

export type SendBatchResult = {
  sent: number;
  failed: number;
  skipped: number;
  remaining: number;
  completed: boolean;
};

export async function sendCampaignBatch(
  campaignId: string
): Promise<SendBatchResult> {
  const supabase = getSupabase();

  const { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", campaignId)
    .single();

  if (campaignError || !campaign) {
    throw new Error(campaignError?.message ?? "Campaign not found");
  }

  if (campaign.status === "completed") {
    return {
      sent: 0,
      failed: 0,
      skipped: 0,
      remaining: 0,
      completed: true,
    };
  }

  const dailyCap = getDailyCap(campaign.daily_cap);

  const { data: queued, error: queuedError } = await supabase
    .from("campaign_leads")
    .select("*, leads(*)")
    .eq("campaign_id", campaignId)
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(dailyCap);

  if (queuedError) {
    throw new Error(queuedError.message);
  }

  if (!queued?.length) {
    await supabase
      .from("campaigns")
      .update({ status: "completed", updated_at: new Date().toISOString() })
      .eq("id", campaignId);

    return {
      sent: 0,
      failed: 0,
      skipped: 0,
      remaining: 0,
      completed: true,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const item of queued) {
    const lead = item.leads as {
      email?: string | null;
      status?: string;
      id?: string;
    } | null;

    const email = lead?.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      await supabase
        .from("campaign_leads")
        .update({ status: "skipped", error: "Missing email" })
        .eq("id", item.id);
      skipped += 1;
      continue;
    }

    if (await isSuppressed(email)) {
      await supabase
        .from("campaign_leads")
        .update({ status: "skipped", error: "Suppressed" })
        .eq("id", item.id);
      skipped += 1;
      continue;
    }

    const { data, error } = await resend.emails.send({
      from: getOutreachFrom(),
      to: email,
      replyTo: getReplyTo(),
      subject: item.rendered_subject,
      text: item.rendered_body_text,
      html: item.rendered_body_html,
    });

    if (error) {
      await supabase
        .from("campaign_leads")
        .update({ status: "failed", error: error.message ?? "Send failed" })
        .eq("id", item.id);
      failed += 1;
      continue;
    }

    const now = new Date().toISOString();

    await supabase
      .from("campaign_leads")
      .update({
        status: "sent",
        sent_at: now,
        resend_id: data?.id ?? null,
        error: null,
      })
      .eq("id", item.id);

    if (lead?.id) {
      await supabase
        .from("leads")
        .update({ status: "sent", updated_at: now })
        .eq("id", lead.id);
    }

    sent += 1;
  }

  const { count: remaining } = await supabase
    .from("campaign_leads")
    .select("*", { count: "exact", head: true })
    .eq("campaign_id", campaignId)
    .eq("status", "queued");

  const completed = (remaining ?? 0) === 0;

  await supabase
    .from("campaigns")
    .update({
      status: completed ? "completed" : "active",
      sent_count: (campaign.sent_count ?? 0) + sent,
      skipped_count: (campaign.skipped_count ?? 0) + skipped,
      updated_at: new Date().toISOString(),
    })
    .eq("id", campaignId);

  return {
    sent,
    failed,
    skipped,
    remaining: remaining ?? 0,
    completed,
  };
}

export async function startCampaign(campaignId: string): Promise<SendBatchResult> {
  const supabase = getSupabase();

  await supabase
    .from("campaigns")
    .update({ status: "active", updated_at: new Date().toISOString() })
    .eq("id", campaignId);

  return sendCampaignBatch(campaignId);
}
