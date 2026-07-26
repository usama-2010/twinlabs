#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

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

const baseUrl = process.env.OUTREACH_TEST_URL ?? "http://localhost:3000";
const password = process.env.OUTREACH_PASSWORD ?? "twinlabs";
const samplePath = resolve(
  process.cwd(),
  "samples/outreach/Automotive - Low Priority - TEST.xlsx"
);

async function login() {
  const response = await fetch(`${baseUrl}/api/outreach/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const cookie = response.headers.get("set-cookie")?.split(";")[0];
  if (!cookie) throw new Error("No session cookie returned.");
  return cookie;
}

console.log("TwinLabs outreach send test\n");
console.log(`Server: ${baseUrl}`);
console.log(`Target: delivered@resend.dev (via test spreadsheet)\n`);

const cookie = await login();

const fileBuffer = readFileSync(samplePath);
const formData = new FormData();
formData.append(
  "file",
  new Blob([fileBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  }),
  "Automotive - Low Priority - TEST.xlsx"
);
formData.append("composeMode", process.env.GEMINI_API_KEY ? "gemini" : "template");

console.log("Step 1 — Importing and composing emails…");
const importResponse = await fetch(`${baseUrl}/api/outreach/import`, {
  method: "POST",
  headers: { Cookie: cookie },
  body: formData,
});

const summary = await importResponse.json();
if (!importResponse.ok) {
  console.error("Import failed:", summary.error ?? importResponse.status);
  process.exit(1);
}

console.log(`  Ready: ${summary.ready} · AI: ${summary.aiComposed} · Template: ${summary.templateScenario + summary.templateGeneric}`);
console.log(`  Campaign: ${summary.campaignId}\n`);

if (summary.ready === 0) {
  console.error("No leads ready to send. Add emails to the spreadsheet first.");
  process.exit(1);
}

console.log("Step 2 — Sending batch…");
const sendResponse = await fetch(
  `${baseUrl}/api/outreach/campaigns/${summary.campaignId}/start`,
  { method: "POST", headers: { Cookie: cookie } }
);

const sendResult = await sendResponse.json();
if (!sendResponse.ok) {
  console.error("Send failed:", sendResult.error ?? sendResponse.status);
  process.exit(1);
}

console.log("Send result");
console.log("─".repeat(40));
console.log(`Sent:      ${sendResult.sent}`);
console.log(`Failed:    ${sendResult.failed}`);
console.log(`Skipped:   ${sendResult.skipped}`);
console.log(`Remaining: ${sendResult.remaining}`);
console.log(`Completed: ${sendResult.completed ? "yes" : "no"}\n`);

if (sendResult.sent > 0) {
  console.log("✓ Test emails dispatched to Resend.");
  console.log("  Check delivered@resend.dev in your Resend dashboard.");
  console.log("  Activity: http://localhost:3000/outreach/activity");
} else if (sendResult.failed > 0) {
  console.log("✗ Sends failed — check Resend domain verification and API key.");
  process.exit(1);
} else {
  console.log("No emails sent (may already be sent or suppressed).");
}

console.log("\nSample subject lines from this import:");
for (const sample of summary.samples ?? []) {
  if (sample.status === "ready") {
    console.log(`  • ${sample.business_name}: "${sample.subject}"`);
  }
}
