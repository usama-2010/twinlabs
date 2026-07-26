export function stripTechJargon(text: string): string {
  return text
    .replace(/\bHTTPS\b/gi, "the secure padlock on websites")
    .replace(/\bHTTP\b/gi, "an unsecured web address")
    .replace(/\bSSL\b/gi, "website security")
    .replace(/\bURL\b/gi, "web address")
    .replace(/\bUX\b/gi, "ease of use")
    .replace(/\bUI\b/gi, "look and feel")
    .replace(/\bSEO\b/gi, "showing up on Google")
    .replace(/mobile UX/gi, "using the site on a phone")
    .replace(
      /Listed URL not HTTPS[^.;]*/gi,
      "the site doesn't show as fully secure to visitors"
    )
    .replace(/\(unverified[^)]*\)/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function humanizeReason(
  reason: string,
  alreadyMentionedRating: boolean
): string {
  let text = reason.trim();

  if (alreadyMentionedRating) {
    text = text.replace(/^Strong Google reputation \([^)]+\);\s*/i, "");
  }

  text = stripTechJargon(text)
    .replace(
      /website quality not yet audited in detail — worth a closer look for design, mobile UX and booking\/enquiry setup\.?/gi,
      "the website probably isn't doing you justice yet — especially on phones and for people trying to book or get in touch"
    )
    .replace(
      /worth a closer look for design, mobile UX and booking\/enquiry setup\.?/gi,
      "might be worth improving how the site looks, how it works on phones, and how easy it is to get in touch"
    )
    .replace(
      /website live; listed url not https[^.]*/gi,
      "the website is live, but it doesn't show as fully secure to visitors"
    )
    .replace(/;\s*/g, ". ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!text) return "";
  if (!/[.!?]$/.test(text)) text += ".";

  return text.charAt(0).toUpperCase() + text.slice(1);
}
