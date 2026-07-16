import { siteConfig } from "@/lib/content/site";
import {
  renderEmailBadge,
  renderEmailFinePrint,
  renderEmailHeading,
  renderEmailLabel,
  renderEmailLayout,
  renderEmailList,
  renderEmailParagraph,
  renderEmailQuote,
  renderEmailSubtext,
} from "@/lib/email/template";

export type ConfirmationEmailData = {
  name: string;
  businessName: string;
  description: string;
};

export function buildConfirmationEmailText(data: ConfirmationEmailData): string {
  return [
    `Hi ${data.name},`,
    ``,
    `Thanks for getting in touch with ${siteConfig.name}. We've received your enquiry from ${data.businessName}.`,
    ``,
    `What you sent us:`,
    data.description,
    ``,
    `We'll review your project details and reply within one working day with an honest scope and next steps if we're a fit.`,
    ``,
    `If anything urgent comes up in the meantime, reply to this email or write to ${siteConfig.email}.`,
    ``,
    `— ${siteConfig.name}`,
  ].join("\n");
}

export function buildConfirmationEmailHtml(data: ConfirmationEmailData): string {
  const body = [
    renderEmailBadge("Enquiry received"),
    renderEmailHeading(`Thanks, ${data.name.split(" ")[0] || data.name}`),
    renderEmailSubtext(
      `We've received your enquiry from ${data.businessName}. Our team will review the details and come back within one working day.`
    ),
    renderEmailLabel("What you sent us"),
    renderEmailQuote(data.description),
    renderEmailParagraph("What happens next", { strong: true }),
    renderEmailList([
      "We review your project scope and budget.",
      "If we're a fit, we reply with a written scope and fixed quote.",
      "No commitment until you're ready to proceed.",
    ]),
    renderEmailFinePrint("Questions? Just reply to this email."),
  ].join("");

  return renderEmailLayout({
    preheader: `We received your enquiry — ${siteConfig.name} will reply within one working day.`,
    title: `We received your enquiry — ${siteConfig.name}`,
    body,
  });
}
