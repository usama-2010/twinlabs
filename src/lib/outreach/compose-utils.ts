import type { LeadBrief } from "@/lib/outreach/lead-brief";
import { humanizeReason } from "@/lib/outreach/tech-jargon";
import {
  growthOutcomeLine,
  growthProofLine,
} from "@/lib/outreach/email-growth-stats";

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
        "I'm Usama — I run TwinLabs with my co-founder here in the UK. A trades firm we work with cut office admin by about 73% — less phone tag, more jobs booked.",
        "My co-founder and I run TwinLabs. We help garages turn enquiries into booked jobs — one client saved roughly 73% of the admin their office was doing weekly.",
      ],
      seed
    );
  }

  if (/hair|salon|barber|beauty/i.test(key)) {
    return pick(
      [
        "We're TwinLabs — a small UK studio. We help salons fill the diary and cut no-shows — one client dropped empty chairs by about 70%.",
        "My co-founder and I run TwinLabs. We work with salons on booking and reminders — roughly 70% fewer no-shows is typical once it's sorted properly.",
      ],
      seed
    );
  }

  if (/restaurant|cafe|takeaway|hotel/i.test(key)) {
    return pick(
      [
        "We're TwinLabs — two founders, no account managers. One restaurant group saw online bookings go up about 3× after we fixed their flow.",
        "I co-founded TwinLabs here in the UK. We build booking tools for hospitality — a five-venue client tripled online covers without hiring.",
      ],
      seed
    );
  }

  return pick(
    [
      "I'm Usama — I run TwinLabs with my co-founder in the UK. Recent builds: ~70% fewer no-shows, 3× online bookings, ~73% less admin. Quote upfront.",
      "My co-founder and I run TwinLabs. We help UK businesses get more from the same team — one trades client cut weekly admin by about 73%.",
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

  const growth = growthOutcomeLine(brief);
  paragraphs.push(growth);
  paragraphs.push(growthProofLine(brief));

  const reason = reasonLine(brief);
  if (reason) paragraphs.push(reason);

  paragraphs.push(offerLine(brief));
  paragraphs.push(ctaLine(brief.business_name));
  paragraphs.push(signOff(brief.business_name));

  return paragraphs.filter(Boolean).join("\n\n");
}
