import {
  renderEmailBadge,
  renderEmailField,
  renderEmailHeading,
  renderEmailLayout,
  renderEmailQuote,
  renderEmailSubtext,
} from "@/lib/email/template";

export type EnquiryEmailData = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  budget: string;
  description: string;
};

export function buildEnquiryEmailText(data: EnquiryEmailData): string {
  return [
    `Name: ${data.name}`,
    `Business: ${data.businessName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Budget: ${data.budget}`,
    ``,
    `Description:`,
    data.description,
  ].join("\n");
}

export function buildEnquiryEmailHtml(data: EnquiryEmailData): string {
  const body = [
    renderEmailBadge("New enquiry"),
    renderEmailHeading(`Enquiry from ${data.businessName}`),
    renderEmailSubtext("A new contact form submission is ready to review."),
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">`,
    renderEmailField("Name", data.name),
    renderEmailField("Business", data.businessName),
    renderEmailField("Email", data.email),
    renderEmailField("Phone", data.phone),
    renderEmailField("Budget", data.budget),
    `</table>`,
    `<p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#4a6363;">Project details</p>`,
    renderEmailQuote(data.description),
    `<p style="margin:0;font-size:13px;line-height:1.5;color:#4a6363;">Reply directly to this email to respond to ${data.name}.</p>`,
  ].join("");

  return renderEmailLayout({
    preheader: `New enquiry from ${data.businessName} — ${data.name}`,
    title: `New enquiry from ${data.businessName}`,
    body,
  });
}
