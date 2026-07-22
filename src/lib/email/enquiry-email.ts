import {
  renderEmailBadge,
  renderEmailField,
  renderEmailFinePrint,
  renderEmailHeading,
  renderEmailLabel,
  renderEmailLayout,
  renderEmailQuote,
  renderEmailSubtext,
} from "@/lib/email/template";
import { getContactPackageLabel } from "@/lib/content/pricing";

export type EnquiryEmailData = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  projectPackage: string;
  budget: string;
  description: string;
};

export function buildEnquiryEmailText(data: EnquiryEmailData): string {
  return [
    `Name: ${data.name}`,
    `Business: ${data.businessName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Package: ${getContactPackageLabel(data.projectPackage)}`,
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
    renderEmailField("Package", getContactPackageLabel(data.projectPackage)),
    renderEmailField("Budget", data.budget),
    `</table>`,
    renderEmailLabel("Project details"),
    renderEmailQuote(data.description),
    renderEmailFinePrint(`Reply directly to this email to respond to ${data.name}.`),
  ].join("");

  return renderEmailLayout({
    preheader: `New enquiry from ${data.businessName} — ${data.name}`,
    title: `New enquiry from ${data.businessName}`,
    body,
  });
}
