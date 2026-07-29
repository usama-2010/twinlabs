import {
  composeOutreach,
  defaultComposeMode,
} from "@/lib/outreach/compose-outreach";
import {
  isGeminiConfigured,
  modifyGeminiEmailWithChat,
} from "@/lib/outreach/compose-email-gemini";
import {
  buildOutreachEmailHtml,
  buildOutreachEmailText,
} from "@/lib/email/outreach-email";
import { buildLeadBrief } from "@/lib/outreach/lead-brief";
import { parseEmailSections, stripSendTemplate } from "@/lib/outreach/email-format";
import { getSupabase } from "@/lib/outreach/db";
import { leadStatusFromEmail } from "@/lib/outreach/parse-import";
import { finalizeOutreachSubject } from "@/lib/outreach/subject-line";
import {
  manualEmailEditSchema,
  type ManualEmailEditInput,
} from "@/lib/outreach/validations/manual-email-edit";
import type { ChatTurn } from "@/lib/outreach/validations/chat-modify";
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

export async function updateLeadEmailContent(
  id: string,
  input: ManualEmailEditInput
) {
  const parsed = manualEmailEditSchema.parse(input);
  const supabase = getSupabase();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("id")
    .eq("id", id)
    .single();

  if (leadError || !lead) {
    throw new Error(leadError?.message ?? "Lead not found");
  }

  const { signOffLines } = parseEmailSections(parsed.body);
  const text = buildOutreachEmailText(parsed.body, signOffLines);
  const html = buildOutreachEmailHtml({
    subject: parsed.subject,
    body: parsed.body,
    signOffLines,
  });
  const now = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("campaign_leads")
    .update({
      rendered_subject: parsed.subject,
      rendered_body_text: text,
      rendered_body_html: html,
      error: null,
    })
    .eq("lead_id", id)
    .in("status", ["skipped", "queued"]);

  if (updateError) {
    throw new Error(updateError.message);
  }

  await supabase.from("leads").update({ updated_at: now }).eq("id", id);

  return {
    subject: parsed.subject,
    body: parsed.body,
    text,
    html,
  };
}

export async function chatModifyLeadEmail(
  id: string,
  instruction: string,
  history?: ChatTurn[]
) {
  if (!isGeminiConfigured()) {
    throw new Error("AI is not configured. Add GEMINI_API_KEY to use chat refine.");
  }

  const supabase = getSupabase();

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (leadError || !lead) {
    throw new Error(leadError?.message ?? "Lead not found");
  }

  const { data: campaignLead, error: campaignError } = await supabase
    .from("campaign_leads")
    .select("rendered_subject, rendered_body_text, status")
    .eq("lead_id", id)
    .in("status", ["skipped", "queued"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (campaignError) {
    throw new Error(campaignError.message);
  }

  if (!campaignLead) {
    throw new Error("This email can't be edited — it may already be sent.");
  }

  const currentSubject = campaignLead.rendered_subject ?? "";
  const currentBody = bodyFromStoredEmail(campaignLead.rendered_body_text);

  const brief = buildLeadBrief({
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
  });

  const revised = await modifyGeminiEmailWithChat({
    brief,
    currentSubject,
    currentBody,
    instruction,
    history,
  });

  if (!revised) {
    throw new Error("AI couldn't revise this email. Try rephrasing your instruction.");
  }

  const subject = finalizeOutreachSubject(revised.subject, brief, "gemini");
  const { signOffLines } = parseEmailSections(revised.body);
  const text = buildOutreachEmailText(revised.body, signOffLines);
  const html = buildOutreachEmailHtml({
    subject,
    body: revised.body,
    signOffLines,
  });
  const now = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("campaign_leads")
    .update({
      rendered_subject: subject,
      rendered_body_text: text,
      rendered_body_html: html,
      error: null,
    })
    .eq("lead_id", id)
    .in("status", ["skipped", "queued"]);

  if (updateError) {
    throw new Error(updateError.message);
  }

  await supabase.from("leads").update({ updated_at: now }).eq("id", id);

  return {
    subject,
    body: revised.body,
    text,
    html,
    assistantMessage: revised.summary,
    source: "gemini" as const,
  };
}

export function bodyFromStoredEmail(storedText: string | null | undefined): string {
  return stripSendTemplate(storedText ?? "");
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
