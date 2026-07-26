import {
  assembleEmail,
  pick,
} from "@/lib/outreach/compose-utils";
import { subjectLine } from "@/lib/outreach/subject-line";
import type { LeadBrief } from "@/lib/outreach/lead-brief";
import type { ComposedEmail, ComposeSource } from "@/lib/outreach/types";

function issueParagraph(brief: LeadBrief): string {
  const seed = brief.business_name;

  switch (brief.issue_type) {
    case "no_website":
      return pick(
        [
          "What stood out is that you're clearly doing good work — but there's no proper website for people to find you easily. A lot of customers search online first, and right now you're harder to reach than you should be.",
          "You've built a solid reputation locally, but without a website, people searching online may never find you — or they'll pick a competitor who shows up first.",
          "There's a gap between the reputation you've earned and how easy it is for new customers to find and contact you online.",
        ],
        seed
      );

    case "not_secure":
      return pick(
        [
          "One thing — when people visit your site, some browsers show a \"not secure\" warning. Can put people off before they even read about you.",
          "Your site doesn't show the little padlock most people look for. Sounds small but it matters.",
          "Looks like the website doesn't come across as fully secure in the browser — the kind of thing that makes people hesitate.",
        ],
        seed
      );

    case "not_audited":
      return pick(
        [
          "Your website is clearly live, but it doesn't quite match the quality of work you're doing — especially on phones.",
          "The website works, but it feels like it could do a lot more for you on phones and for people trying to get in touch.",
          "From the outside, the website could do a better job of showing off the business you've built — especially for people browsing on their phone.",
        ],
        seed
      );

    case "mobile_poor":
      return pick(
        [
          "Your site seems harder to use on a phone than it should be — and that's how most people will find you.",
          "Looks like the experience on a phone could be smoother for people trying to contact you on the go.",
          "Most of your customers will check you out on their phone first — and that's where things feel a bit clunky right now.",
        ],
        seed
      );

    case "booking_friction":
      return pick(
        [
          "It doesn't look straightforward for someone to book or get in touch online — and that's often where enquiries get lost.",
          "From what I can see, getting in touch or booking online could be easier for your customers.",
          "People who want to book or enquire shouldn't have to hunt around — and right now it feels like they might.",
        ],
        seed
      );

    case "website_underperforming":
      return pick(
        [
          "You've got a website up, which is good — but it could probably work harder for you day to day.",
          "Your site is live, though it feels like there's room to bring in more enquiries from the traffic you're already getting.",
          "The website exists, but it doesn't seem to be pulling its weight the way your reviews suggest it should.",
        ],
        seed
      );

    case "generic_issue":
      return pick(
        [
          "I had a look at your online presence — a few things stood out that might be costing you enquiries.",
          "I spotted a couple of things that might be worth a second look when it comes to how you show up online.",
        ],
        seed
      );

    case "unknown":
    default:
      return pick(
        [
          "Your online presence could probably do more to turn your good reputation into enquiries.",
          "From the outside, there's room to make it easier for new customers to find you and get in touch.",
        ],
        seed
      );
  }
}

export function composeScenarioTemplate(
  brief: LeadBrief
): ComposedEmail & { source: ComposeSource } {
  const issue =
    brief.issue_type === "generic_issue" && brief.website_issue?.trim()
      ? `One thing I noticed: ${brief.website_issue.replace(/\.$/, "")}.`
      : issueParagraph(brief);

  const text = assembleEmail(brief, issue);

  return {
    subject: subjectLine(brief),
    text,
    html: "",
    source: "template_scenario",
  };
}

export function composeGenericTemplate(
  brief: LeadBrief
): ComposedEmail & { source: ComposeSource } {
  const text = assembleEmail(brief, issueParagraph(brief));

  return {
    subject: subjectLine(brief),
    text,
    html: "",
    source: "template_generic",
  };
}
