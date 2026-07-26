import type { LeadBrief } from "@/lib/outreach/lead-brief";
import { humanizeReason } from "@/lib/outreach/tech-jargon";

export function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function pick<T>(items: T[], seed: string): T {
  return items[hashString(seed) % items.length];
}

export function greeting(brief: LeadBrief): string {
  if (brief.contact_first_name) return `Hi ${brief.contact_first_name},`;
  return "Hi there,";
}

export function openerLine(brief: LeadBrief): string {
  const { business_name, location_city, rating, reviews } = brief;
  const seed = business_name;

  if (location_city && rating != null && reviews != null && reviews > 0) {
    return pick(
      [
        `I was looking at garages in ${location_city} and came across ${business_name}. Looks like you've got a good reputation locally.`,
        `Found ${business_name} on Google while looking around ${location_city}.`,
        `Was going through businesses in ${location_city} and ${business_name} came up — decent reviews too.`,
      ],
      seed
    );
  }

  if (location_city) {
    return pick(
      [
        `I came across ${business_name} while looking at businesses in ${location_city}.`,
        `Found you on Google while looking around ${location_city}.`,
      ],
      seed
    );
  }

  if (rating != null && reviews != null && reviews > 0) {
    return pick(
      [
        `Came across ${business_name} online — looks like you've built up a solid reputation.`,
        `I've been looking at ${business_name} on Google.`,
      ],
      seed
    );
  }

  return `I came across ${business_name} and thought I'd drop you a quick note.`;
}

export function reasonLine(brief: LeadBrief): string | null {
  if (!brief.reason?.trim()) return null;

  const usedRating =
    brief.rating != null && brief.reviews != null && brief.reviews > 0;
  const cleaned = humanizeReason(brief.reason, usedRating);
  if (!cleaned) return null;

  return pick(
    [
      cleaned,
      `Also — ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`,
      cleaned.charAt(0).toLowerCase() + cleaned.slice(1),
    ],
    brief.business_name
  );
}

export function offerLine(brief: LeadBrief): string {
  const key = brief.profession?.toLowerCase() ?? "";
  const seed = brief.business_name;

  if (/automotive|mechanic|garage|ford dealer/i.test(key)) {
    return pick(
      [
        "I'm Usama — I run TwinLabs with my co-founder here in the UK. We build websites and booking bits for garages. Fixed quote before we start, no agency nonsense.",
        "My co-founder and I run TwinLabs. We mostly work with garages on websites and making it easier for people to book or get in touch online.",
      ],
      seed
    );
  }

  if (/hair|salon|barber|beauty/i.test(key)) {
    return pick(
      [
        "We're TwinLabs — a small UK studio. We build booking systems and websites for salons that cut no-shows and stop reception drowning in calls.",
        "My co-founder and I run TwinLabs. We work with salons and barbers on booking, websites, and the admin that eats into your day.",
      ],
      seed
    );
  }

  if (/restaurant|cafe|takeaway|hotel/i.test(key)) {
    return pick(
      [
        "We're TwinLabs — two founders, no account managers. We build online booking and simple tools for hospitality businesses that match how you actually run things.",
        "I co-founded TwinLabs here in the UK. We help restaurants, cafés, and hotels with websites and tools that fit how you work — not the other way around.",
      ],
      seed
    );
  }

  return pick(
    [
      "I'm Usama — I run TwinLabs with my co-founder in the UK. We build websites and simple booking tools for small businesses. Quote upfront, no agency runaround.",
      "My co-founder and I run TwinLabs. We help UK businesses with websites and the boring admin stuff around bookings and enquiries.",
    ],
    seed
  );
}

export function ctaLine(seed: string): string {
  return pick(
    [
      "Happy to jump on a quick call if useful — even 10 minutes.",
      "If you want, we could do a quick call this week. No pressure.",
      "Worth a quick chat? I can tell you straight if we'd be a fit or not.",
    ],
    seed
  );
}

export function signOff(seed: string): string {
  return pick(
    [
      "Cheers,\nUsama\nTwinLabs",
      "Thanks for reading,\nUsama\nCo-founder, TwinLabs",
      "Best,\nUsama\nTwinLabs",
    ],
    seed
  );
}

export function assembleEmail(brief: LeadBrief, issueParagraph: string | null): string {
  const paragraphs = [greeting(brief), openerLine(brief)];

  if (issueParagraph) paragraphs.push(issueParagraph);

  const reason = reasonLine(brief);
  if (reason) paragraphs.push(reason);

  paragraphs.push(offerLine(brief));
  paragraphs.push(ctaLine(brief.business_name));
  paragraphs.push(signOff(brief.business_name));

  return paragraphs.filter(Boolean).join("\n\n");
}
