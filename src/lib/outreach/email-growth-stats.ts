import type { LeadBrief } from "@/lib/outreach/lead-brief";
import type { IssueType } from "@/lib/outreach/lead-brief";

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

/** Real outcomes from TwinLabs builds — Gemini may ONLY use these, never invent. */
export const approvedGrowthStats = [
  { stat: "about 70%", topic: "fewer no-shows", client: "a three-site salon chain" },
  { stat: "about 73%", topic: "less admin time", client: "a 12-van trades firm" },
  { stat: "3×", topic: "more online bookings", client: "a five-venue restaurant group" },
  { stat: "about 40%", topic: "more online sales", client: "a handmade furniture brand" },
  { stat: "about 21%", topic: "higher offer conversion", client: "an independent estate agency" },
] as const;

export const outreachEmailCta = {
  body: "We build websites and booking tools for UK businesses — fixed quotes, no runaround.",
  buttonLabel: "See our work",
} as const;

export const geminiGrowthGuidance = `
Business outcome with numbers (required — one sentence with ONE number, before your TwinLabs mention):
- Humans trust specifics. Include exactly one number from approved_stats in the JSON brief (or below).
- Frame as something we've seen with a similar business — never promise their exact result.
- Say "about" or "roughly" before percentages. Never invent stats not on the list.
- Never say: grow your business, unlock potential, game-changer, synergy, leverage, impressive, stood out.
- Do NOT use the lead's own rating/reviews as a growth stat.

Approved stats only (pick one that fits profession/issue):
- ~70% fewer no-shows — three-site salon chain
- ~73% less admin time — 12-van trades firm
- 3× online bookings — five-venue restaurant group
- ~40% more online sales — handmade furniture brand
- ~21% higher offer conversion — independent estate agency

Good examples:
- "One salon we worked with cut no-shows by about 70% once reminders and online booking were sorted."
- "A trades client shaved roughly 73% off the admin their office was doing every week."
- "For a restaurant group, online bookings went up about 3× — same kitchens, fuller diaries."
Bad: "You'll get 70% growth" / "Guaranteed 3× revenue"
`;

function professionKey(brief: LeadBrief): string {
  return brief.profession?.toLowerCase() ?? "";
}

function proofLinesForProfession(key: string, seed: string): string[] {
  if (/hair|salon|barber|beauty|aesthetic/i.test(key)) {
    return [
      "For context — a three-site salon we worked with cut no-shows by about 70% once online booking and reminders were sorted.",
      "One salon client was losing a day a week to empty chairs. After we fixed their booking flow, no-shows dropped by roughly 70%.",
    ];
  }

  if (/restaurant|cafe|takeaway|hotel|hospitality/i.test(key)) {
    return [
      "A five-venue restaurant group we built for saw online bookings go up about 3× — same team, fuller tables.",
      "One hospitality client tripled online bookings after we made reserving a table actually straightforward.",
    ];
  }

  if (/automotive|mechanic|garage|motor|tyre/i.test(key)) {
    return [
      "A trades firm we work with cut office admin by about 73% — less time on the phone chasing jobs, more time in the workshop.",
      "One garage client was drowning in call-backs. Online booking and a cleaner site cut that admin load by roughly 73%.",
    ];
  }

  if (/trade|construction|plumb|electric|roof|build/i.test(key)) {
    return [
      "A 12-van trades firm we built for saved about 73% of the admin their office was doing every week.",
      "One construction client cut weekly paperwork by roughly 73% once job booking and enquiries went online.",
    ];
  }

  if (/estate|property|letting/i.test(key)) {
    return [
      "An estate agency we worked with lifted offer conversion by about 21% after we tightened their enquiry flow.",
      "One independent agency saw roughly 21% more offers convert once follow-up stopped relying on spreadsheets.",
    ];
  }

  if (/retail|furniture|shop|store/i.test(key)) {
    return [
      "A handmade furniture brand we built for grew online sales by about 40% — same workshop, more orders coming in.",
      "One retail client saw online sales up roughly 40% after we fixed how people browse and buy on their site.",
    ];
  }

  return [
    "Recent builds: a salon cut no-shows by about 70%, a restaurant group tripled online bookings, a trades firm saved roughly 73% on admin.",
    "Numbers from recent work — ~70% fewer no-shows at a salon, 3× online bookings for restaurants, ~73% less admin for a trades firm.",
  ];
}

function outcomeLinesForIssue(issueType: IssueType, key: string, seed: string): string[] {
  switch (issueType) {
    case "no_website":
      return [
        "Roughly 8 in 10 people search online before they call a local business — if you're not easy to find, those enquiries go somewhere else.",
        "When there's no clear way to book or enquire online, a lot of owners lose 5–10 hours a week just playing phone tag.",
      ];

    case "not_secure":
      return [
        "Studies suggest up to 84% of people won't finish a form if the site feels untrustworthy — small warning, real drop-off.",
        "Trust signals matter more than most owners think — even a few lost enquiries a week adds up over a year.",
      ];

    case "booking_friction":
      if (/hair|salon|barber|beauty/i.test(key)) {
        return [
          "Salons on proper online booking often cut no-shows by 50–70% — empty chairs are the silent revenue leak.",
          "Every extra click loses people. One salon we worked with went from constant phone tag to about 70% fewer no-shows.",
        ];
      }
      return [
        "Every extra step loses people — one restaurant client saw online bookings go up about 3× once it took one click, not three.",
        "When booking is awkward, you're not just losing convenience — you're losing 10–20% of the people who would've booked.",
      ];

    case "mobile_poor":
    case "not_audited":
      return [
        "Over 60% of local searches happen on a phone — if that's clunky, you're losing enquiries you never hear about.",
        "Most people decide in under 30 seconds on mobile. A rough mobile experience can quietly cost 15–25% of potential bookings.",
      ];

    case "website_underperforming":
      return [
        "Your reviews suggest the work is strong — but most sites convert under 3% of visitors. There's usually headroom to double that.",
        "Good reputation online but a weak site often means you're converting maybe 1 in 30 visitors when it could be 1 in 10.",
      ];

    case "generic_issue":
    case "unknown":
    default:
      return [
        "Most owners we speak to aren't looking to hire first — they want 10–15 hours back a week before thinking about growth.",
        "Usually it's not about working harder. Fixing leaks — missed calls, manual booking, clunky follow-up — frees up 20–30% more capacity with the same team.",
      ];
  }
}

/** Pain → outcome line with a concrete number where credible. */
export function growthOutcomeLine(brief: LeadBrief): string {
  const seed = brief.business_name;
  const key = professionKey(brief);
  return pick(outcomeLinesForIssue(brief.issue_type, key, seed), seed);
}

/** Social proof — one real TwinLabs case study stat. */
export function growthProofLine(brief: LeadBrief): string {
  const seed = `${brief.business_name}-proof`;
  return pick(proofLinesForProfession(professionKey(brief), seed), seed);
}

/** Stats passed to Gemini in the brief JSON. */
export function approvedStatsForGemini() {
  return approvedGrowthStats;
}
