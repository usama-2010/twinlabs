import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Resend } from "resend";
import {
  buildProposalEmailHtml,
  buildProposalEmailSubject,
  buildProposalEmailText,
  evoluxProposalKeyPoints,
} from "../src/lib/email/proposal-email";

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

const PDF_PATH =
  process.argv[2] ??
  "/Users/ahm3d/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents/ABC8FDA2-AE6A-4CD1-AC7D-5C99200E6179/EVOLUX-AI-MVP-PROPOSAL.pdf";
const TO_EMAIL = process.argv[3] ?? "uolf2022@gmail.com";
const CC_EMAIL = process.argv[4] ?? "usama@twinlabs.co.uk";
const RECIPIENT_NAME = process.argv[5] ?? "Tanveer";
const ATTACHMENT_FILENAME = "EVOLUX-AI-MVP-PROPOSAL.pdf";

async function main() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY in .env.local");
    process.exit(1);
  }

  const from =
    process.env.RESEND_FROM ?? "TwinLabs <info@twinlabs.co.uk>";
  const replyTo = process.env.CONTACT_EMAIL ?? "info@twinlabs.co.uk";

  const pdfBuffer = readFileSync(PDF_PATH);
  const emailData = {
    recipientName: RECIPIENT_NAME,
    attachmentFilename: ATTACHMENT_FILENAME,
    keyPoints: [...evoluxProposalKeyPoints],
  };

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to: TO_EMAIL,
    cc: CC_EMAIL,
    replyTo,
    subject: buildProposalEmailSubject(),
    text: buildProposalEmailText(emailData),
    html: buildProposalEmailHtml(emailData),
    attachments: [
      {
        filename: ATTACHMENT_FILENAME,
        content: pdfBuffer,
      },
    ],
  });

  if (error) {
    console.error("Failed to send:", error);
    process.exit(1);
  }

  console.log(`Sent to ${TO_EMAIL} (cc: ${CC_EMAIL})`);
  console.log(`Subject: ${buildProposalEmailSubject()}`);
  console.log(`Resend id: ${data?.id ?? "unknown"}`);
  console.log(`Attachment: ${ATTACHMENT_FILENAME} (${pdfBuffer.length} bytes)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
