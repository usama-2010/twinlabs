import { NextResponse } from "next/server";
import { isOutreachAuthenticated, outreachUnauthorized } from "@/lib/outreach/auth";
import { isSupabaseConfigured } from "@/lib/outreach/db";
import {
  markLeadDoNotContact,
  rewriteLeadEmail,
  updateLeadEmail,
} from "@/lib/outreach/lead-service";

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

  return NextResponse.json({ leads: data ?? [] });
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

    const result = await updateLeadEmail(id, email ?? "");
    return NextResponse.json({ success: true, status: result.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    );
  }
}
