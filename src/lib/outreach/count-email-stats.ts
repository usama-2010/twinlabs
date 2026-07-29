import {
  leadStatusFromEmail,
  parseSpreadsheetBuffer,
} from "@/lib/outreach/parse-import";

export type EmailStats = {
  total: number;
  withEmail: number;
  needsEmail: number;
};

export function countEmailStatsFromRows(
  rows: Array<{ email?: string }>
): EmailStats {
  let withEmail = 0;
  let needsEmail = 0;

  for (const row of rows) {
    if (leadStatusFromEmail(row.email) === "ready") {
      withEmail += 1;
    } else {
      needsEmail += 1;
    }
  }

  return { total: rows.length, withEmail, needsEmail };
}

export async function scanSpreadsheetEmailStats(
  file: File,
  meta?: { profession?: string; priority?: string }
): Promise<EmailStats> {
  const buffer = await file.arrayBuffer();
  const rows = parseSpreadsheetBuffer(buffer, meta);
  return countEmailStatsFromRows(rows);
}
