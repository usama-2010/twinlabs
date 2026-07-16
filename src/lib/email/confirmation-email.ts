import { siteConfig } from "@/lib/content/site";
import {
  getEmailSiteUrl,
  renderEmailBadge,
  renderEmailButton,
  renderEmailHeading,
  renderEmailLayout,
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
    `<p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#4a6363;">What you sent us</p>`,
    renderEmailQuote(data.description),
    `<p style="margin:0 0 8px;font-size:15px;line-height:1.6;color:#0f1f1f;"><strong>What happens next</strong></p>`,
    `<ul style="margin:0 0 24px;padding-left:20px;font-size:15px;line-height:1.7;color:#4a6363;">
      <li style="margin-bottom:8px;">We review your project scope and budget.</li>
      <li style="margin-bottom:8px;">If we're a fit, we reply with a written scope and fixed quote.</li>
      <li>No commitment until you're ready to proceed.</li>
    </ul>`,
    renderEmailButton("Visit TwinLabs", getEmailSiteUrl()),
    `<p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#4a6363;">Questions? Reply to this email or contact us at ${siteConfig.email}.</p>`,
  ].join("");

  return renderEmailLayout({
    preheader: `We received your enquiry — ${siteConfig.name} will reply within one working day.`,
    title: `We received your enquiry — ${siteConfig.name}`,
    body,
  });
}
