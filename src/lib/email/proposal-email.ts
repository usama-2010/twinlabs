import { siteConfig } from "@/lib/content/site";
import {
  renderEmailBadge,
  renderEmailFinePrint,
  renderEmailHeading,
  renderEmailLayout,
  renderEmailList,
  renderEmailParagraph,
  renderEmailSubtext,
} from "@/lib/email/template";

export type ProposalEmailData = {
  recipientName: string;
  attachmentFilename: string;
  keyPoints: string[];
};

export function buildProposalEmailSubject(): string {
  return "Evolux AI MVP Proposal – As Requested";
}

export function buildProposalEmailText(data: ProposalEmailData): string {
  return [
    `Hi ${data.recipientName},`,
    ``,
    `Hope you're having a good week.`,
    ``,
    `As promised, please find attached the proposal for the Evolux AI MVP development.`,
    ``,
    `Key points:`,
    ...data.keyPoints.map((point) => `· ${point}`),
    ``,
    `We're happy to schedule a call to walk through any part of the proposal or answer questions.`,
    ``,
    `Let us know when you've had a chance to review.`,
    ``,
    `Best regards,`,
    ``,
    `The ${siteConfig.name} Team`,
  ].join("\n");
}

export function buildProposalEmailHtml(data: ProposalEmailData): string {
  const body = [
    renderEmailBadge("Proposal attached"),
    renderEmailHeading(`Hi ${data.recipientName.split(" ")[0] || data.recipientName}`),
    renderEmailSubtext("Hope you're having a good week."),
    renderEmailParagraph(
      "As promised, please find attached the proposal for the Evolux AI MVP development.",
      { strong: false }
    ),
    renderEmailParagraph("Key points", { strong: true }),
    renderEmailList(data.keyPoints),
    renderEmailParagraph(
      "We're happy to schedule a call to walk through any part of the proposal or answer questions."
    ),
    renderEmailParagraph("Let us know when you've had a chance to review."),
    renderEmailParagraph("Best regards,"),
    renderEmailParagraph(`The ${siteConfig.name} Team`, { strong: true }),
    renderEmailFinePrint(
      `Attachment: ${data.attachmentFilename} · Reply to this email if you have any questions.`
    ),
  ].join("");

  return renderEmailLayout({
    preheader: "Your Evolux AI MVP proposal is attached.",
    title: buildProposalEmailSubject(),
    body,
  });
}

export const evoluxProposalKeyPoints = [
  "Fixed investment: £72,500 ex VAT",
  "Timeline: 18 weeks from mobilisation",
  "Scope: Full customer, supplier and admin platforms with AI Concierge, supplier matching, booking engine and payment integrations",
  "Warranty: 60-day defect warranty included",
  "Validity: 30 days from 14 August 2026",
] as const;
