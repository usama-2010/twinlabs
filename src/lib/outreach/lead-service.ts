import {
  composeOutreach,
  defaultComposeMode,
} from "@/lib/outreach/compose-outreach";
import { getSupabase } from "@/lib/outreach/db";
import { leadStatusFromEmail } from "@/lib/outreach/parse-import";
import type { ComposeMode, Lead } from "@/lib/outreach/types";

export async function recomposeLeadEmail(
  lead: Lead,
  composeMode: ComposeMode = defaultComposeMode()
) {
  const composed = await composeOutreach(
    {
      business_name: lead.business_name,
      contact_name: lead.contact_name ?? undefined,
      email: lead.email ?? undefined,
      phone: lead.phone ?? undefined,
      website: lead.website ?? undefined,
      location: lead.location ?? undefined,
      rating: lead.rating ?? undefined,
      reviews: lead.reviews ?? undefined,
      lead_score: lead.lead_score ?? undefined,
      website_issue: lead.website_issue ?? undefined,
      reason: lead.reason ?? undefined,
      source: lead.source ?? undefined,
      profession: lead.profession,
      priority: lead.priority,
    },
    composeMode
  );

  return {
    subject: composed.subject,
    body: composed.body,
    text: composed.text,
    html: composed.html,
    status: leadStatusFromEmail(lead.email ?? undefined),
    source: composed.source,
  };
}

export async function rewriteLeadEmail(
  id: string,
  composeMode: ComposeMode = "gemini"
) {
  const supabase = getSupabase();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (leadError || !lead) {
    throw new Error(leadError?.message ?? "Lead not found");
  }

  const composed = await recomposeLeadEmail(lead as Lead, composeMode);
  const now = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("campaign_leads")
    .update({
      rendered_subject: composed.subject,
      rendered_body_text: composed.text,
      rendered_body_html: composed.html,
      error: null,
    })
    .eq("lead_id", id)
    .in("status", ["skipped", "queued"]);

  if (updateError) {
    throw new Error(updateError.message);
  }

  await supabase
    .from("leads")
    .update({ updated_at: now })
    .eq("id", id);

  return composed;
}

export async function updateLeadEmail(id: string, email: string) {
  const supabase = getSupabase();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (leadError || !lead) {
    throw new Error(leadError?.message ?? "Lead not found");
  }

  const updatedLead = {
    ...lead,
    email: email.trim() || null,
  } as Lead;

  const { data: campaignLead } = await supabase
    .from("campaign_leads")
    .select("campaign_id, campaigns(compose_mode)")
    .eq("lead_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const composeMode =
    (campaignLead?.campaigns as { compose_mode?: ComposeMode } | null)
      ?.compose_mode ?? defaultComposeMode();

  const composed = await recomposeLeadEmail(updatedLead, composeMode);
  const now = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("leads")
    .update({
      email: updatedLead.email,
      status: composed.status,
      updated_at: now,
    })
    .eq("id", id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  const campaignLeadStatus = composed.status === "ready" ? "queued" : "skipped";

  await supabase
    .from("campaign_leads")
    .update({
      rendered_subject: composed.subject,
      rendered_body_text: composed.text,
      rendered_body_html: composed.html,
      status: campaignLeadStatus,
      error: null,
    })
    .eq("lead_id", id)
    .in("status", ["skipped", "queued"]);

  return { status: composed.status };
}

export async function markLeadDoNotContact(id: string) {
  const supabase = getSupabase();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("email")
    .eq("id", id)
    .single();

  if (leadError || !lead) {
    throw new Error(leadError?.message ?? "Lead not found");
  }

  const now = new Date().toISOString();

  await supabase
    .from("leads")
    .update({ status: "do_not_contact", updated_at: now })
    .eq("id", id);

  await supabase
    .from("campaign_leads")
    .update({ status: "skipped", error: "Do not contact" })
    .eq("lead_id", id)
    .neq("status", "sent");

  if (lead.email) {
    await supabase.from("suppression_list").upsert(
      {
        email: lead.email.toLowerCase(),
        reason: "Marked do not contact",
      },
      { onConflict: "email" }
    );
  }
}

export async function checkOutreachSetup(): Promise<{
  configured: boolean;
  database: boolean;
  resend: boolean;
  password: boolean;
  gemini: boolean;
  geminiModel?: string;
  message?: string;
}> {
  const configured = Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const resend = Boolean(process.env.RESEND_API_KEY);
  const password = Boolean(process.env.OUTREACH_PASSWORD);
  const gemini = Boolean(process.env.GEMINI_API_KEY);
  const geminiModel = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  if (!configured) {
    return {
      configured: false,
      database: false,
      resend,
      password,
      gemini,
      geminiModel,
      message: "Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local",
    };
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("leads").select("id").limit(1);

    if (error) {
      return {
        configured: true,
        database: false,
        resend,
        password,
        gemini,
        geminiModel,
        message:
          "Database tables missing. Run supabase/migrations/001_outreach.sql in Supabase SQL Editor.",
      };
    }

    return {
      configured: true,
      database: true,
      resend,
      password,
      gemini,
      geminiModel,
    };
  } catch {
    return {
      configured: true,
      database: false,
      resend,
      password,
      gemini,
      geminiModel,
      message: "Could not connect to Supabase.",
    };
  }
}
