import type { ParsedLeadRow } from "@/lib/outreach/types";

export type IssueType =
  | "no_website"
  | "not_secure"
  | "not_audited"
  | "mobile_poor"
  | "booking_friction"
  | "website_underperforming"
  | "generic_issue"
  | "unknown";

export type LeadBrief = {
  business_name: string;
  contact_name?: string;
  contact_first_name?: string;
  profession?: string;
  priority?: string;
  location_city?: string;
  rating?: number;
  reviews?: number;
  lead_score?: number;
  has_website: boolean;
  website?: string;
  website_issue?: string;
  reason?: string;
  issue_type: IssueType;
};

function cityFromLocation(location?: string | null): string | undefined {
  if (!location?.trim()) return undefined;
  return location.split(",")[0]?.trim();
}

function firstName(contactName?: string | null): string | undefined {
  if (!contactName?.trim()) return undefined;
  return contactName.trim().split(/\s+/)[0];
}

function hasWebsiteValue(website?: string | null): boolean {
  if (!website?.trim()) return false;
  const value = website.trim().toLowerCase();
  return value !== "n/a" && value !== "none" && value !== "-";
}

export function detectIssueType(
  hasWebsite: boolean,
  websiteIssue?: string | null
): IssueType {
  if (!hasWebsite) return "no_website";

  const issue = websiteIssue?.trim().toLowerCase() ?? "";
  if (!issue) return "unknown";

  if (/https|not secure|ssl|padlock/i.test(issue)) return "not_secure";
  if (/not yet audited|not audited|recommend manual review/i.test(issue)) {
    return "not_audited";
  }
  if (/mobile|phone/i.test(issue) && /slow|old|outdated|poor/i.test(issue)) {
    return "mobile_poor";
  }
  if (/booking|enquiry|contact form/i.test(issue)) return "booking_friction";
  if (/website live/i.test(issue)) return "website_underperforming";

  return "generic_issue";
}

export function buildLeadBrief(
  row: ParsedLeadRow & { profession?: string | null; priority?: string | null }
): LeadBrief {
  const hasWebsite = hasWebsiteValue(row.website);

  return {
    business_name: row.business_name,
    contact_name: row.contact_name,
    contact_first_name: firstName(row.contact_name),
    profession: row.profession ?? undefined,
    priority: row.priority ?? undefined,
    location_city: cityFromLocation(row.location),
    rating: row.rating,
    reviews: row.reviews,
    lead_score: row.lead_score,
    has_website: hasWebsite,
    website: row.website,
    website_issue: row.website_issue,
    reason: row.reason,
    issue_type: detectIssueType(hasWebsite, row.website_issue),
  };
}
