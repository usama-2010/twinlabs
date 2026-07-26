import { getSupabase } from "@/lib/outreach/db";
import {
  composeOutreach,
  defaultComposeMode,
} from "@/lib/outreach/compose-outreach";
import {
  getDedupeKey,
  leadStatusFromEmail,
  parseFileNameMeta,
  parseImportPath,
  parseSpreadsheetBuffer,
} from "@/lib/outreach/parse-import";
import type {
  ComposeMode,
  ComposeSource,
  ImportProgress,
  ImportSummary,
  LeadStatus,
  ParsedLeadRow,
} from "@/lib/outreach/types";

type ImportOptions = {
  buffer: ArrayBuffer;
  fileName: string;
  relativePath?: string;
  profession?: string;
  priority?: string;
  composeMode?: ComposeMode;
  onProgress?: (progress: ImportProgress) => void;
};

type RowResult = {
  imported: number;
  updated: number;
  skipped: number;
  needsEmail: number;
  ready: number;
  aiComposed: number;
  templateScenario: number;
  templateGeneric: number;
  sample?: ImportSummary["samples"][number];
};

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
  onItemComplete?: (index: number, item: T) => void
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function runWorker() {
    while (true) {
      const current = index;
      index += 1;
      if (current >= items.length) break;
      results[current] = await worker(items[current], current);
      onItemComplete?.(current, items[current]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => runWorker())
  );

  return results;
}

export async function importSpreadsheet(
  options: ImportOptions
): Promise<ImportSummary> {
  const pathMeta = parseImportPath(options.relativePath ?? options.fileName);
  const fileMeta = parseFileNameMeta(options.fileName);

  const profession =
    options.profession ?? pathMeta.profession ?? fileMeta.profession ?? null;
  const priority =
    options.priority ?? pathMeta.priority ?? fileMeta.priority ?? null;
  const composeMode = options.composeMode ?? defaultComposeMode();
  const concurrency = Number(process.env.OUTREACH_AI_CONCURRENCY ?? 3);

  const rows = parseSpreadsheetBuffer(options.buffer, {
    profession: profession ?? undefined,
    priority: priority ?? undefined,
  });

  const supabase = getSupabase();

  const campaignName = [
    profession ?? "Imported",
    priority ? `${priority} priority` : null,
    new Date().toLocaleDateString("en-GB"),
  ]
    .filter(Boolean)
    .join(" · ");

  const campaignPayload: Record<string, unknown> = {
    name: campaignName,
    profession,
    priority,
    status: "draft",
    daily_cap: Number(process.env.OUTREACH_DAILY_CAP ?? 25),
    total_leads: 0,
    sent_count: 0,
    skipped_count: 0,
    compose_mode: composeMode,
  };

  let { data: campaign, error: campaignError } = await supabase
    .from("campaigns")
    .insert(campaignPayload)
    .select("*")
    .single();

  if (campaignError?.message?.includes("compose_mode")) {
    const fallback = { ...campaignPayload };
    delete fallback.compose_mode;
    const retry = await supabase.from("campaigns").insert(fallback).select("*").single();
    campaign = retry.data;
    campaignError = retry.error;
  }

  if (campaignError || !campaign) {
    throw new Error(campaignError?.message ?? "Failed to create campaign");
  }

  const emitProgress = (progress: ImportProgress) => {
    options.onProgress?.(progress);
  };

  emitProgress({
    phase: "starting",
    completed: 0,
    total: rows.length,
    remaining: rows.length,
    leadNames: rows.map((row) => row.business_name),
  });

  const sampleIndices = new Set<number>();
  if (rows.length > 0) sampleIndices.add(0);
  if (rows.length > 1) sampleIndices.add(Math.floor(rows.length / 2));
  if (rows.length > 2) sampleIndices.add(rows.length - 1);

  let completedCount = 0;

  const results = await mapPool(
    rows,
    concurrency,
    async (row: ParsedLeadRow & { profession?: string; priority?: string }, rowIndex) => {
      const dedupeKey = getDedupeKey(row);
      const status = leadStatusFromEmail(row.email);

      const composed = await composeOutreach(
        { ...row, profession, priority },
        composeMode
      );

      const result: RowResult = {
        imported: 0,
        updated: 0,
        skipped: 0,
        needsEmail: status === "needs_email" ? 1 : 0,
        ready: status === "ready" ? 1 : 0,
        aiComposed: composed.source === "gemini" ? 1 : 0,
        templateScenario: composed.source === "template_scenario" ? 1 : 0,
        templateGeneric: composed.source === "template_generic" ? 1 : 0,
      };

      const leadPayload = {
        business_name: row.business_name,
        contact_name: row.contact_name ?? null,
        email: row.email ?? null,
        phone: row.phone ?? null,
        website: row.website ?? null,
        location: row.location ?? null,
        rating: row.rating ?? null,
        reviews: row.reviews ?? null,
        lead_score: row.lead_score ?? null,
        website_issue: row.website_issue ?? null,
        reason: row.reason ?? null,
        source: row.source ?? null,
        profession,
        priority,
        status,
        dedupe_key: dedupeKey,
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from("leads")
        .select("id")
        .eq("dedupe_key", dedupeKey)
        .maybeSingle();

      let leadId = existing?.id as string | undefined;

      if (existing?.id) {
        const { error } = await supabase
          .from("leads")
          .update(leadPayload)
          .eq("id", existing.id);
        if (error) throw new Error(error.message);
        result.updated = 1;
        leadId = existing.id;
      } else {
        const { data: inserted, error } = await supabase
          .from("leads")
          .insert(leadPayload)
          .select("id")
          .single();
        if (error) throw new Error(error.message);
        result.imported = 1;
        leadId = inserted.id;
      }

      if (!leadId) {
        result.skipped = 1;
        return result;
      }

      const campaignLeadStatus = status === "ready" ? "queued" : "skipped";

      const { error: campaignLeadError } = await supabase
        .from("campaign_leads")
        .upsert(
          {
            campaign_id: campaign.id,
            lead_id: leadId,
            rendered_subject: composed.subject,
            rendered_body_text: composed.text,
            rendered_body_html: composed.html,
            status: campaignLeadStatus,
          },
          { onConflict: "campaign_id,lead_id" }
        );

      if (campaignLeadError) {
        throw new Error(campaignLeadError.message);
      }

      if (sampleIndices.has(rowIndex)) {
        result.sample = {
          leadId,
          business_name: row.business_name,
          subject: composed.subject,
          text: composed.body ?? composed.text ?? "",
          html: composed.html,
          status: status as LeadStatus,
          source: composed.source as ComposeSource,
        };
      }

      return result;
    },
    (_index, row) => {
      completedCount += 1;
      emitProgress({
        phase: "composing",
        completed: completedCount,
        total: rows.length,
        remaining: Math.max(rows.length - completedCount, 0),
        businessName: row.business_name,
      });
    }
  );

  emitProgress({
    phase: "finishing",
    completed: rows.length,
    total: rows.length,
    remaining: 0,
  });

  const totals = results.reduce(
    (acc, row) => ({
      imported: acc.imported + row.imported,
      updated: acc.updated + row.updated,
      skipped: acc.skipped + row.skipped,
      needsEmail: acc.needsEmail + row.needsEmail,
      ready: acc.ready + row.ready,
      aiComposed: acc.aiComposed + row.aiComposed,
      templateScenario: acc.templateScenario + row.templateScenario,
      templateGeneric: acc.templateGeneric + row.templateGeneric,
    }),
    {
      imported: 0,
      updated: 0,
      skipped: 0,
      needsEmail: 0,
      ready: 0,
      aiComposed: 0,
      templateScenario: 0,
      templateGeneric: 0,
    }
  );

  const samples = results
    .map((row) => row.sample)
    .filter((sample): sample is NonNullable<typeof sample> => Boolean(sample));

  await supabase
    .from("campaigns")
    .update({
      total_leads: rows.length,
      skipped_count: totals.needsEmail,
      updated_at: new Date().toISOString(),
    })
    .eq("id", campaign.id);

  return {
    ...totals,
    campaignId: campaign.id,
    composeMode,
    samples,
  };
}
