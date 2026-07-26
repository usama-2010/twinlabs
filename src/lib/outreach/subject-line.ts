import type { LeadBrief } from "@/lib/outreach/lead-brief";

const SPAMMY_SUBJECT =
  /\b(urgent|alert|critical|free|guarantee|act now|limited time|don't miss|last chance)\b/i;

const AI_SUBJECT_PATTERN =
  /[★⭐]|—\s*(wow|impressive)|\b(impressive|well deserved|one thing about|noticed something|noticed this|i wanted to reach|just wanted to reach)\b/i;

const GENERIC_SUBJECT_PATTERNS = [
  /^quick note about /i,
  /^reaching out about /i,
  /^thought i'd reach out/i,
  /^following up/i,
  /^important message/i,
  /^hello from /i,
  /^introduction /i,
  /^partnership opportunity/i,
];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pick<T>(items: T[], seed: string): T {
  return items[hashString(seed) % items.length];
}

function subjectSeed(brief: LeadBrief): string {
  return [
    brief.business_name,
    brief.issue_type,
    brief.location_city ?? "",
    brief.contact_first_name ?? "",
  ].join("|");
}

function uniqueOptions(options: string[]): string[] {
  return [...new Set(options.filter(Boolean))];
}

function shortBusinessName(name: string): string {
  if (name.length <= 28) return name;
  return name.split(/\s+/).slice(0, 2).join(" ");
}

/** Plain human subject — like a real person wrote it in Gmail. */
export function subjectLine(brief: LeadBrief): string {
  const {
    business_name,
    location_city,
    contact_first_name,
    issue_type,
  } = brief;

  const shortName = shortBusinessName(business_name);
  const options: string[] = [];

  if (contact_first_name) {
    options.push(
      contact_first_name,
      `${contact_first_name} - quick question`,
      `question for ${contact_first_name}`
    );
  }

  options.push(shortName, `${shortName}`, shortBusinessName(business_name));

  if (location_city) {
    options.push(
      location_city,
      `saw you in ${location_city}`,
      `${shortName} ${location_city}`.trim()
    );
  }

  switch (issue_type) {
    case "no_website":
      options.push("finding you online", "your business online", "quick question");
      break;
    case "not_secure":
      options.push("your website", "question about the site", "the website");
      break;
    case "mobile_poor":
      options.push("your website", "site on mobile", "quick one");
      break;
    case "booking_friction":
      options.push("booking online", "your website", "quick question");
      break;
    default:
      options.push("your website", "quick question", "quick one");
  }

  return pick(uniqueOptions(options), subjectSeed(brief));
}

export function isGenericSubject(subject: string, brief: LeadBrief): boolean {
  const cleaned = subject.trim();
  if (!cleaned) return true;

  if (
    GENERIC_SUBJECT_PATTERNS.some((pattern) => pattern.test(cleaned)) ||
    AI_SUBJECT_PATTERN.test(cleaned)
  ) {
    return true;
  }

  const businessToken = brief.business_name.split(/\s+/)[0]?.toLowerCase();
  const firstName = brief.contact_first_name?.toLowerCase();
  const city = brief.location_city?.toLowerCase();
  const lower = cleaned.toLowerCase();

  const hasPersonalRef =
    (businessToken && businessToken.length > 2 && lower.includes(businessToken)) ||
    (firstName && lower.includes(firstName)) ||
    (city && lower.includes(city)) ||
    /^(quick question|quick one|your website|the website|question about)/i.test(cleaned);

  return !hasPersonalRef;
}

export function acceptGeminiSubject(
  subject: string | undefined | null,
  brief: LeadBrief
): string {
  const cleaned = (subject ?? "").trim().replace(/\s+/g, " ");

  if (
    cleaned.length >= 2 &&
    cleaned.length <= 60 &&
    !SPAMMY_SUBJECT.test(cleaned) &&
    !GENERIC_SUBJECT_PATTERNS.some((pattern) => pattern.test(cleaned)) &&
    !AI_SUBJECT_PATTERN.test(cleaned)
  ) {
    return cleaned;
  }

  return subjectLine(brief);
}

export function finalizeOutreachSubject(
  subject: string | undefined | null,
  brief: LeadBrief,
  source?: "gemini" | "template"
): string {
  if (source === "gemini") {
    return acceptGeminiSubject(subject, brief);
  }

  const cleaned = (subject ?? "").trim().replace(/\s+/g, " ");

  if (
    cleaned.length >= 2 &&
    cleaned.length <= 60 &&
    !SPAMMY_SUBJECT.test(cleaned) &&
    !isGenericSubject(cleaned, brief)
  ) {
    return cleaned;
  }

  return subjectLine(brief);
}

export function subjectAngleHint(brief: LeadBrief): string {
  const { issue_type, location_city, contact_first_name, business_name } = brief;

  const parts: string[] = [
    "write like a real person sending gmail — plain, short, not clever",
    `business: ${business_name}`,
  ];

  if (contact_first_name) parts.push(`can use first name only: ${contact_first_name}`);
  if (location_city) parts.push(`or city: ${location_city}`);
  if (issue_type === "no_website") parts.push("topic: hard to find online");
  if (issue_type === "not_secure") parts.push("topic: website (don't explain in subject)");
  if (issue_type === "mobile_poor") parts.push("topic: website on phone");

  parts.push("no star ratings, no impressive, no marketing hooks");

  return parts.join("; ");
}
