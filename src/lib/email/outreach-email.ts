import { siteConfig } from "@/lib/content/site";
import {
  escapeHtml,
  getEmailSiteUrl,
  renderEmailButton,
  renderEmailFinePrint,
  renderEmailLayout,
} from "@/lib/email/template";
import {
  defaultSignOff,
  parseEmailSections,
  resolveSignOff,
  stripSendTemplate,
} from "@/lib/outreach/email-format";
import { outreachEmailCta } from "@/lib/outreach/email-growth-copy";

const INK = "#0f1f1f";
const MUTED = "#4a6363";
const TEAL = "#1a6666";
const BORDER = "#d4ebe4";
const SEAFOAM = "#f4faf8";

function outreachSiteUrl(): string {
  return getEmailSiteUrl();
}

function outreachWorkUrl(): string {
  return `${outreachSiteUrl()}/work`;
}

function paragraphToHtml(paragraph: string): string {
  const isGreeting = /^(?:Hello|Hi|Hey)(?: there|[A-Za-z][A-Za-z'-]*)?,\s*$/.test(
    paragraph.trim()
  );
  const marginBottom = isGreeting ? "4px" : "18px";
  const weight = isGreeting ? "font-weight:500;" : "";
  const style = `margin:0 0 ${marginBottom};font-size:16px;line-height:1.75;color:${INK};${weight}`;

  return `<p class="email-text" style="${style}">${escapeHtml(paragraph)}</p>`;
}

function renderBodyParagraphs(paragraphs: string[]): string {
  return paragraphs.map(paragraphToHtml).join("");
}

function renderCtaBlock(): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 4px;">
    <tr>
      <td class="email-quote" style="padding:20px 22px;border-radius:12px;background-color:${SEAFOAM};border:1px solid ${BORDER};">
        <p class="email-text" style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
          ${escapeHtml(outreachEmailCta.body)}
        </p>
        ${renderEmailButton(outreachEmailCta.buttonLabel, outreachWorkUrl())}
      </td>
    </tr>
  </table>`;
}

function renderSignatureBlock(signOffLines: string[]): string {
  const lines = resolveSignOff(signOffLines.length ? signOffLines : defaultSignOff);
  const closing = lines[0] ?? "Cheers,";
  const name = lines.find((line) => /^usama/i.test(line)) ?? "Usama";

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
    <tr>
      <td style="padding:16px 0 0;border-top:1px solid ${BORDER};">
        <p class="email-text" style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${INK};">${escapeHtml(closing)}</p>
        <table role="presentation" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:4px;background-color:${TEAL};border-radius:4px;">&nbsp;</td>
            <td style="padding-left:16px;">
              <p style="margin:0;font-size:16px;font-weight:600;line-height:1.4;color:${INK};">${escapeHtml(name)}</p>
              <p style="margin:4px 0 0;font-size:14px;line-height:1.5;color:${MUTED};">Co-founder, TwinLabs</p>
              <p style="margin:6px 0 0;font-size:14px;line-height:1.5;">
                <a href="${escapeHtml(outreachSiteUrl())}" class="email-link" style="color:${TEAL};text-decoration:none;font-weight:500;">twinlabs.co.uk</a>
                <span style="color:${MUTED};"> · </span>
                <a href="mailto:${escapeHtml(siteConfig.email)}" class="email-link" style="color:${TEAL};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>`;
}

export function buildOutreachEmailHtml({
  subject,
  body,
  signOffLines = [],
  unsubscribeUrl,
}: {
  subject: string;
  body: string;
  signOffLines?: string[];
  unsubscribeUrl?: string;
}): string {
  const { paragraphs, signOffLines: parsedSignOff } = parseEmailSections(body);
  const signOff = signOffLines.length ? signOffLines : parsedSignOff;

  const content = [
    renderBodyParagraphs(paragraphs),
    renderCtaBlock(),
    renderSignatureBlock(signOff),
    `<p style="margin:24px 0 12px;border-top:1px solid ${BORDER};height:0;line-height:0;font-size:0;">&nbsp;</p>`,
    renderEmailFinePrint(
      unsubscribeUrl
        ? `Not relevant? Reply "unsubscribe" or use this link: ${unsubscribeUrl}`
        : 'Not relevant? Reply "unsubscribe" and we won\'t follow up.'
    ),
  ].join("");

  return renderEmailLayout({
    preheader: subject,
    title: subject,
    body: content,
  });
}

export function buildOutreachEmailText(
  body: string,
  signOffLines: string[] = []
): string {
  const { paragraphs, signOffLines: parsedSignOff } = parseEmailSections(body);
  const signOff = resolveSignOff(
    signOffLines.length ? signOffLines : parsedSignOff
  );

  return [
    paragraphs.join("\n\n"),
    "",
    "See our work:",
    outreachWorkUrl(),
    "",
    ...signOff,
    siteConfig.email,
    "",
    "—",
    'Not relevant? Just reply "unsubscribe" and I won\'t follow up.',
  ].join("\n");
}

export function getOutreachPreviewMeta() {
  return {
    ctaLabel: outreachEmailCta.buttonLabel,
    ctaBody: outreachEmailCta.body,
    ctaHref: outreachWorkUrl(),
    siteUrl: outreachSiteUrl(),
    email: siteConfig.email,
  };
}

/** Preview helper — accepts body or legacy full send text. */
export function getOutreachPreviewSections(input: string | undefined | null) {
  return parseEmailSections(stripSendTemplate(input));
}
