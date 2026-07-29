import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { isOutreachAuthenticated, outreachUnauthorized } from "@/lib/outreach/auth";
import { isSupabaseConfigured } from "@/lib/outreach/db";
import {
  bodyFromStoredEmail,
  chatModifyLeadEmail,
  markLeadDoNotContact,
  rewriteLeadEmail,
  updateLeadEmail,
  updateLeadEmailContent,
} from "@/lib/outreach/lead-service";
import { chatModifyRequestSchema } from "@/lib/outreach/validations/chat-modify";
import type { Lead, LeadComposedEmail } from "@/lib/outreach/types";

type CampaignLeadRow = {
  lead_id: string;
  rendered_subject: string;
  rendered_body_text: string;
  rendered_body_html: string;
  status: string;
  created_at: string;
};

function mapComposed(row: CampaignLeadRow): LeadComposedEmail {
  return {
    subject: row.rendered_subject,
    body: bodyFromStoredEmail(row.rendered_body_text),
    html: row.rendered_body_html,
    editable: row.status === "queued" || row.status === "skipped",
  };
}

export async function GET(request: Request) {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ leads: [] });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  const { getSupabase } = await import("@/lib/outreach/db");
  const supabase = getSupabase();
  let query = supabase
    .from("leads")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(200);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const leads = (data ?? []) as Lead[];
  const leadIds = leads.map((lead) => lead.id);

  if (leadIds.length === 0) {
    return NextResponse.json({ leads: [] });
  }

  const { data: campaignLeads, error: campaignError } = await supabase
    .from("campaign_leads")
    .select(
      "lead_id, rendered_subject, rendered_body_text, rendered_body_html, status, created_at"
    )
    .in("lead_id", leadIds)
    .order("created_at", { ascending: false });

  if (campaignError) {
    return NextResponse.json({ error: campaignError.message }, { status: 500 });
  }

  const composedByLead = new Map<string, LeadComposedEmail>();

  for (const row of (campaignLeads ?? []) as CampaignLeadRow[]) {
    if (!composedByLead.has(row.lead_id)) {
      composedByLead.set(row.lead_id, mapComposed(row));
    }
  }

  const enriched = leads.map((lead) => ({
    ...lead,
    composed: composedByLead.get(lead.id) ?? null,
  }));

  return NextResponse.json({ leads: enriched });
}

export async function PATCH(request: Request) {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  const body = await request.json().catch(() => null);
  const id = body?.id as string | undefined;
  const action = body?.action as string | undefined;
  const email = body?.email as string | undefined;

  if (!id) {
    return NextResponse.json({ error: "Lead id is required." }, { status: 400 });
  }

  try {
    if (action === "do_not_contact") {
      await markLeadDoNotContact(id);
      return NextResponse.json({ success: true, status: "do_not_contact" });
    }

    if (action === "rewrite") {
      const composeMode =
        body?.composeMode === "template" ? "template" : "gemini";

      const composed = await rewriteLeadEmail(id, composeMode);
      return NextResponse.json({
        success: true,
        subject: composed.subject,
        body: composed.body,
        text: composed.text,
        html: composed.html,
        source: composed.source,
      });
    }

    if (action === "update_email") {
      const subject = body?.subject as string | undefined;
      const emailBody = body?.body as string | undefined;

      if (subject == null || emailBody == null) {
        return NextResponse.json(
          { error: "Subject and body are required." },
          { status: 400 }
        );
      }

      const updated = await updateLeadEmailContent(id, {
        subject,
        body: emailBody,
      });

      return NextResponse.json({
        success: true,
        subject: updated.subject,
        body: updated.body,
        text: updated.text,
        html: updated.html,
      });
    }

    if (action === "chat_modify") {
      const parsed = chatModifyRequestSchema.parse({
        instruction: body?.instruction,
        history: body?.history,
      });

      const result = await chatModifyLeadEmail(
        id,
        parsed.instruction,
        parsed.history
      );

      return NextResponse.json({
        success: true,
        subject: result.subject,
        body: result.body,
        text: result.text,
        html: result.html,
        assistantMessage: result.assistantMessage,
        source: result.source,
      });
    }

    const result = await updateLeadEmail(id, email ?? "");
    return NextResponse.json({ success: true, status: result.status });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid email content." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}
