import { siteConfig } from "@/lib/content/site";

/** Light palette — default (matches the live site). */
const light = {
  teal: "#1a6666",
  tealDark: "#135f5e",
  seafoam: "#f4faf8",
  seafoam100: "#e8f4f0",
  border: "#d4ebe4",
  ink: "#0f1f1f",
  muted: "#4a6363",
  paper: "#ffffff",
  btnText: "#ffffff",
};

/** Dark palette — when the recipient's email client is in dark mode. */
const dark = {
  teal: "#5ec4c4",
  tealDark: "#7dd4d4",
  seafoam: "#0f2828",
  seafoam100: "#0a1e1e",
  border: "#1e3a3a",
  ink: "#eef6f4",
  muted: "#94a8a8",
  paper: "#0c2222",
  btnText: "#ffffff",
};

const emailStyles = `
  :root {
    color-scheme: light dark;
    supported-color-schemes: light dark;
  }

  /* Light mode (default) */
  body, .email-bg { background-color: ${light.seafoam} !important; }
  .email-card { background-color: ${light.paper} !important; border-color: ${light.border} !important; }
  .email-header, .email-body-cell { background-color: ${light.paper} !important; border-color: ${light.border} !important; }
  .email-footer { background-color: ${light.seafoam100} !important; border-color: ${light.border} !important; }
  .email-text, .email-heading, h1 { color: ${light.ink} !important; }
  .email-muted, .email-label, li { color: ${light.muted} !important; }
  .email-link { color: ${light.teal} !important; }
  .email-badge {
    background-color: ${light.seafoam} !important;
    border-color: ${light.border} !important;
    color: ${light.tealDark} !important;
  }
  .email-quote {
    background-color: ${light.seafoam} !important;
    border-left-color: ${light.teal} !important;
  }
  .email-field-border { border-color: ${light.border} !important; }
  .email-btn { background-color: ${light.teal} !important; }
  .email-btn a { color: ${light.btnText} !important; }
  .email-logo-light { display: block !important; }
  .email-logo-dark { display: none !important; }

  /* Dark mode — follows system / email client preference */
  @media (prefers-color-scheme: dark) {
    body, .email-bg { background-color: ${dark.seafoam100} !important; }
    .email-card { background-color: ${dark.paper} !important; border-color: ${dark.border} !important; }
    .email-header, .email-body-cell { background-color: ${dark.paper} !important; border-color: ${dark.border} !important; }
    .email-footer { background-color: ${dark.seafoam} !important; border-color: ${dark.border} !important; }
    .email-text, .email-heading, h1, td.email-text, p.email-text { color: ${dark.ink} !important; }
    .email-muted, .email-label, li { color: ${dark.muted} !important; }
    .email-link, a.email-link { color: ${dark.teal} !important; }
    .email-badge {
      background-color: ${dark.seafoam} !important;
      border-color: ${dark.border} !important;
      color: ${dark.tealDark} !important;
    }
    .email-quote {
      background-color: ${dark.seafoam} !important;
      border-left-color: ${dark.teal} !important;
    }
    .email-field-border { border-color: ${dark.border} !important; }
    .email-btn { background-color: ${light.teal} !important; }
    .email-btn a { color: ${dark.btnText} !important; }
    .email-logo-light { display: none !important; }
    .email-logo-dark { display: block !important; }
  }

  /* Outlook.com dark mode */
  [data-ogsc] body, [data-ogsc] .email-bg { background-color: ${dark.seafoam100} !important; }
  [data-ogsc] .email-card, [data-ogsc] .email-header, [data-ogsc] .email-body-cell { background-color: ${dark.paper} !important; }
  [data-ogsc] .email-footer { background-color: ${dark.seafoam} !important; }
  [data-ogsc] .email-text, [data-ogsc] .email-heading { color: ${dark.ink} !important; }
  [data-ogsc] .email-muted, [data-ogsc] .email-label { color: ${dark.muted} !important; }
  [data-ogsc] .email-link { color: ${dark.teal} !important; }
  [data-ogsc] .email-logo-light { display: none !important; }
  [data-ogsc] .email-logo-dark { display: block !important; }
`;

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

export function getEmailLogoDarkUrl(): string {
  return `${getEmailSiteUrl()}/brand/logo-horizontal-white.png`;
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
  const logoLight = getEmailLogoUrl();
  const logoDark = getEmailLogoDarkUrl();
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(title)}</title>
  <style type="text/css">${emailStyles}</style>
</head>
<body class="email-bg body" style="margin:0;padding:0;background-color:${light.seafoam};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${light.ink};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" class="email-bg" width="100%" cellpadding="0" cellspacing="0" bgcolor="${light.seafoam}" style="background-color:${light.seafoam};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" class="email-card" width="100%" cellpadding="0" cellspacing="0" bgcolor="${light.paper}" style="max-width:560px;background-color:${light.paper};border:1px solid ${light.border};border-radius:16px;overflow:hidden;">
          <tr>
            <td class="email-header" bgcolor="${light.paper}" style="padding:28px 32px 20px;border-bottom:1px solid ${light.border};background-color:${light.paper};">
              <a href="${escapeHtml(getEmailSiteUrl())}" style="text-decoration:none;display:inline-block;">
                <img class="email-logo-light" src="${escapeHtml(logoLight)}" alt="${escapeHtml(siteConfig.name)}" width="160" height="26" style="display:block;border:0;outline:none;height:auto;max-width:160px;" />
                <img class="email-logo-dark" src="${escapeHtml(logoDark)}" alt="${escapeHtml(siteConfig.name)}" width="160" height="26" style="display:none;border:0;outline:none;height:auto;max-width:160px;" />
              </a>
            </td>
          </tr>
          <tr>
            <td class="email-body-cell email-text" bgcolor="${light.paper}" style="padding:32px;background-color:${light.paper};color:${light.ink};">
              ${body}
            </td>
          </tr>
          <tr>
            <td class="email-footer" bgcolor="${light.seafoam100}" style="padding:20px 32px 24px;border-top:1px solid ${light.border};background-color:${light.seafoam100};">
              <p class="email-muted" style="margin:0;font-size:12px;line-height:1.5;color:${light.muted};">
                The ${escapeHtml(siteConfig.name)} team · ${escapeHtml(siteConfig.legalName)}
              </p>
              <p class="email-muted" style="margin:8px 0 0;font-size:11px;line-height:1.5;color:${light.muted};">
                © ${year} · United Kingdom
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
  return `<h1 class="email-heading email-text" style="margin:0 0 8px;font-size:22px;line-height:1.3;font-weight:600;letter-spacing:-0.02em;color:${light.ink};">${escapeHtml(text)}</h1>`;
}

export function renderEmailSubtext(text: string): string {
  return `<p class="email-muted" style="margin:0 0 24px;font-size:15px;line-height:1.6;color:${light.muted};">${escapeHtml(text)}</p>`;
}

export function renderEmailBadge(text: string): string {
  return `<p style="margin:0 0 16px;"><span class="email-badge" style="display:inline-block;padding:6px 12px;border-radius:999px;background-color:${light.seafoam};border:1px solid ${light.border};font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:${light.tealDark};">${escapeHtml(text)}</span></p>`;
}

export function renderEmailField(label: string, value: string): string {
  return `<tr>
    <td class="email-label email-field-border" style="padding:10px 0;border-bottom:1px solid ${light.border};vertical-align:top;width:120px;">
      <span style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${light.muted};">${escapeHtml(label)}</span>
    </td>
    <td class="email-text email-field-border" style="padding:10px 0 10px 16px;border-bottom:1px solid ${light.border};font-size:15px;line-height:1.5;color:${light.ink};">
      ${nl2br(value)}
    </td>
  </tr>`;
}

export function renderEmailQuote(text: string): string {
  return `<div class="email-quote" style="margin:0 0 24px;padding:16px 18px;border-left:3px solid ${light.teal};background-color:${light.seafoam};border-radius:0 12px 12px 0;">
    <p class="email-text" style="margin:0;font-size:15px;line-height:1.65;color:${light.ink};">${nl2br(text)}</p>
  </div>`;
}

export function renderEmailButton(label: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 0;">
    <tr>
      <td class="email-btn" bgcolor="${light.teal}" style="border-radius:999px;background-color:${light.teal};">
        <a href="${escapeHtml(href)}" style="display:inline-block;padding:12px 22px;font-size:14px;font-weight:600;color:${light.btnText};text-decoration:none;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}

export function renderEmailLabel(text: string): string {
  return `<p class="email-label" style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${light.muted};">${escapeHtml(text)}</p>`;
}

export function renderEmailParagraph(text: string, options?: { strong?: boolean }): string {
  const weight = options?.strong ? "font-weight:600;" : "";
  return `<p class="email-text" style="margin:0 0 8px;font-size:15px;line-height:1.6;color:${light.ink};${weight}">${escapeHtml(text)}</p>`;
}

export function renderEmailList(items: string[]): string {
  const lis = items
    .map(
      (item, i) =>
        `<li class="email-muted" style="margin-bottom:${i < items.length - 1 ? "8px" : "0"};color:${light.muted};">${escapeHtml(item)}</li>`
    )
    .join("");
  return `<ul class="email-muted" style="margin:0 0 24px;padding-left:20px;font-size:15px;line-height:1.7;color:${light.muted};">${lis}</ul>`;
}

export function renderEmailFinePrint(text: string): string {
  return `<p class="email-muted" style="margin:0;font-size:13px;line-height:1.5;color:${light.muted};">${escapeHtml(text)}</p>`;
}

/** @deprecated use `light` — kept for any existing imports */
export const brand = light;
export { light as emailLight, dark as emailDark };
