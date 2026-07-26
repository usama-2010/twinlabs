#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  const content = readFileSync(envPath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    let value = trimmed.slice(eq + 1);
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnv();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const tables = ["leads", "campaigns", "campaign_leads", "suppression_list"];

console.log("Checking TwinLabs Outreach setup...\n");

for (const table of tables) {
  const { error } = await supabase.from(table).select("id").limit(1);
  if (error) {
    console.log(`✗ ${table}: ${error.message}`);
  } else {
    console.log(`✓ ${table}: OK`);
  }
}

console.log(`\nResend: ${process.env.RESEND_API_KEY ? "configured" : "missing RESEND_API_KEY"}`);
console.log(`Outreach password: ${process.env.OUTREACH_PASSWORD ? "configured" : "missing OUTREACH_PASSWORD"}`);
console.log(
  `Gemini AI: ${process.env.GEMINI_API_KEY ? `configured (${process.env.GEMINI_MODEL ?? "gemini-2.5-flash"})` : "optional — template-only mode"}`
);
