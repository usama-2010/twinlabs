import * as XLSX from "xlsx";
import { parseFileNameMeta, parseImportPath } from "@/lib/outreach/parse-file-meta";
import type { ParsedLeadRow } from "@/lib/outreach/types";

export { parseFileNameMeta, parseImportPath } from "@/lib/outreach/parse-file-meta";

const HEADER_MAP: Record<string, keyof ParsedLeadRow> = {
  "business name": "business_name",
  "contact name": "contact_name",
  email: "email",
  phone: "phone",
  website: "website",
  location: "location",
  rating: "rating",
  reviews: "reviews",
  "lead score": "lead_score",
  "website status/issue": "website_issue",
  "reason they may need our agency": "reason",
  source: "source",
};

function normalizeHeader(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function asString(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;
  return String(value).trim();
}

function asNumber(value: unknown): number | undefined {
  if (value == null || value === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

export function getDedupeKey(row: ParsedLeadRow): string {
  if (row.website) {
    try {
      const url = new URL(
        row.website.startsWith("http") ? row.website : `https://${row.website}`
      );
      return url.hostname.replace(/^www\./i, "").toLowerCase();
    } catch {
      // fall through
    }
  }

  if (row.phone) {
    return row.phone.replace(/\D/g, "");
  }

  return row.business_name.toLowerCase().trim();
}

export function parseSpreadsheetBuffer(
  buffer: ArrayBuffer,
  meta?: { profession?: string; priority?: string }
): Array<ParsedLeadRow & { profession?: string; priority?: string }> {
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) return [];

  const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: "",
  }) as unknown[][];

  if (rows.length < 2) return [];

  const headers = rows[0].map(normalizeHeader);
  const mappedIndexes = headers
    .map((header, index) => ({ header, index }))
    .filter(({ header }) => header in HEADER_MAP);

  const parsed: Array<ParsedLeadRow & { profession?: string; priority?: string }> =
    [];

  for (const row of rows.slice(1)) {
    const record: ParsedLeadRow = { business_name: "" };

    for (const { header, index } of mappedIndexes) {
      const key = HEADER_MAP[header];
      const value = row[index];

      if (key === "rating" || key === "reviews" || key === "lead_score") {
        record[key] = asNumber(value);
      } else if (key === "business_name") {
        record.business_name = asString(value) ?? "";
      } else {
        const str = asString(value);
        if (str !== undefined) {
          record[key] = str;
        }
      }
    }

    if (!record.business_name?.trim()) continue;

    parsed.push({
      ...record,
      business_name: record.business_name.trim(),
      profession: meta?.profession,
      priority: meta?.priority,
    });
  }

  return parsed;
}

export function leadStatusFromEmail(email?: string): "ready" | "needs_email" {
  return email?.includes("@") ? "ready" : "needs_email";
}
