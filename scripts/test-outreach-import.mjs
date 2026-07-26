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

const fileBuffer = readFileSync(samplePath);
const blob = new Blob([fileBuffer], {
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});

console.log("TwinLabs outreach import test\n");
console.log(`Server: ${baseUrl}`);
console.log(`File: ${samplePath.split("/").pop()}\n`);

const loginResponse = await fetch(`${baseUrl}/api/outreach/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password }),
});

if (!loginResponse.ok) {
  console.error("Login failed:", loginResponse.status, await loginResponse.text());
  process.exit(1);
}

const cookie = loginResponse.headers.get("set-cookie")?.split(";")[0];
if (!cookie) {
  console.error("No session cookie returned from login.");
  process.exit(1);
}

const formData = new FormData();
formData.append("file", blob, "Automotive - Low Priority - TEST.xlsx");
formData.append("composeMode", process.env.GEMINI_API_KEY ? "gemini" : "template");

const importResponse = await fetch(`${baseUrl}/api/outreach/import`, {
  method: "POST",
  headers: { Cookie: cookie },
  body: formData,
});

const result = await importResponse.json();

if (!importResponse.ok) {
  console.error("Import failed:", result.error ?? importResponse.status);
  process.exit(1);
}

console.log("Import summary");
console.log("─".repeat(40));
console.log(`Imported:          ${result.imported}`);
console.log(`Updated:           ${result.updated}`);
console.log(`Ready to send:     ${result.ready}`);
console.log(`Needs email:       ${result.needsEmail}`);
console.log(`Compose mode:      ${result.composeMode}`);
console.log(`AI composed:       ${result.aiComposed}`);
console.log(`Template scenario: ${result.templateScenario}`);
console.log(`Template generic:  ${result.templateGeneric}`);
console.log(`Campaign ID:       ${result.campaignId}\n`);

console.log("Sample previews");
console.log("─".repeat(40));

for (const sample of result.samples ?? []) {
  console.log(`\n▸ ${sample.business_name} [${sample.status}${sample.source ? ` · ${sample.source}` : ""}]`);
  console.log(`  Subject: ${sample.subject}`);
  console.log(sample.text.slice(0, 400) + (sample.text.length > 400 ? "…" : ""));
}

console.log("\n✓ Import test complete");
