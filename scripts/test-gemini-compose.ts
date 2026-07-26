import { readFileSync } from "node:fs";
import { resolve } from "node:path";

for (const line of readFileSync(resolve(".env.local"), "utf8").split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  let value = trimmed.slice(eq + 1);
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  process.env[trimmed.slice(0, eq)] = value;
}

import { buildLeadBrief } from "../src/lib/outreach/lead-brief";
import { composeGeminiEmail } from "../src/lib/outreach/compose-email-gemini";

async function main() {
  const brief = buildLeadBrief({
    business_name: "Archway Automotive Ltd",
    contact_name: "James",
    email: "test@example.com",
    location: "Tunbridge Wells",
    rating: 4.9,
    reviews: 89,
    website: "https://example.com",
    website_issue: "HTTPS not secure",
    reason: "Website quality not yet audited",
    profession: "Automotive",
  });

  console.log("Model:", process.env.GEMINI_MODEL);
  console.log("Issue type:", brief.issue_type);

  const result = await composeGeminiEmail(brief);
  if (!result) {
    console.log("Result: NULL (validation failed or API error — check server logs)");
    process.exit(1);
  }

  console.log("Source:", result.source);
  console.log("Subject:", result.subject);
  console.log("\nBody preview:\n", result.text.slice(0, 500));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
