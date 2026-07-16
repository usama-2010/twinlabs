import { siteConfig } from "@/lib/content/site";

const brand = {
  teal: "#1a6666",
  tealDark: "#135f5e",
  seafoam: "#f4faf8",
  seafoamBorder: "#d4ebe4",
  ink: "#0f1f1f",
  muted: "#4a6363",
  paper: "#ffffff",
};

export function getEmailSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    siteConfig.url
  ).replace(/\/$/, "");
}

export function getEmailLogoUrl(): string {
  return `${getEmailSiteUrl()}/brand/logo-horizontal.png`;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(value: string): string {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

type EmailLayoutOptions = {
  preheader: string;
  title: string;
  body: string;
};

export function renderEmailLayout({
  preheader,
  title,
  body,
}: EmailLayoutOptions): string {
  const logoUrl = getEmailLogoUrl();
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${brand.seafoam};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${brand.ink};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${brand.seafoam};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:${brand.paper};border:1px solid ${brand.seafoamBorder};border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px 20px;border-bottom:1px solid ${brand.seafoamBorder};background:linear-gradient(180deg, ${brand.seafoam} 0%, ${brand.paper} 100%);">
              <a href="${escapeHtml(getEmailSiteUrl())}" style="text-decoration:none;display:inline-block;">
                <img src="${escapeHtml(logoUrl)}" alt="${escapeHtml(siteConfig.name)}" width="160" height="26" style="display:block;border:0;outline:none;height:auto;max-width:160px;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${body}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px;border-top:1px solid ${brand.seafoamBorder};background-color:${brand.seafoam};">
              <p style="margin:0 0 8px;font-size:13px;line-height:1.5;color:${brand.muted};">
                ${escapeHtml(siteConfig.name)} · Custom software for any business
              </p>
              <p style="margin:0;font-size:12px;line-height:1.5;color:${brand.muted};">
                <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${brand.teal};text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
                · <a href="${escapeHtml(getEmailSiteUrl())}" style="color:${brand.teal};text-decoration:none;">${escapeHtml(getEmailSiteUrl().replace(/^https?:\/\//, ""))}</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;line-height:1.5;color:${brand.muted};">
                © ${year} ${escapeHtml(siteConfig.legalName)} · United Kingdom
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderEmailHeading(text: string): string {
  return `<h1 style="margin:0 0 8px;font-size:22px;line-height:1.3;font-weight:600;letter-spacing:-0.02em;color:${brand.ink};">${escapeHtml(text)}</h1>`;
}

export function renderEmailSubtext(text: string): string {
  return `<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${brand.muted};">${escapeHtml(text)}</p>`;
}

export function renderEmailBadge(text: string): string {
  return `<p style="margin:0 0 16px;"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background-color:${brand.seafoam};border:1px solid ${brand.seafoamBorder};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${brand.tealDark};">${escapeHtml(text)}</span></p>`;
}

export function renderEmailField(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${brand.seafoamBorder};vertical-align:top;width:120px;">
      <span style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${brand.muted};">${escapeHtml(label)}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid ${brand.seafoamBorder};font-size:15px;line-height:1.5;color:${brand.ink};">
      ${nl2br(value)}
    </td>
  </tr>`;
}

export function renderEmailQuote(text: string): string {
  return `<div style="margin:0 0 24px;padding:16px 18px;border-left:3px solid ${brand.teal};background-color:${brand.seafoam};border-radius:0 12px 12px 0;">
    <p style="margin:0;font-size:15px;line-height:1.65;color:${brand.ink};">${nl2br(text)}</p>
  </div>`;
}

export function renderEmailButton(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 0;">
    <tr>
      <td style="border-radius:999px;background-color:${brand.teal};">
        <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}

export { brand as emailBrand };
