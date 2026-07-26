import { composeScenarioTemplate } from "@/lib/outreach/compose-email-templates";
import { buildLeadBrief } from "@/lib/outreach/lead-brief";
import type { ComposedEmail, ParsedLeadRow } from "@/lib/outreach/types";

type ComposeInput = ParsedLeadRow & {
  profession?: string | null;
};

/** Sync template composer — used as legacy fallback; prefer composeOutreach(). */
export function composeOutreachEmail(input: ComposeInput): ComposedEmail {
  const brief = buildLeadBrief(input);
  const result = composeScenarioTemplate(brief);
  return {
    subject: result.subject,
    text: result.text,
    html: result.html,
  };
}

export function composeOutreachEmailWithHtml(input: ComposeInput): ComposedEmail {
  return composeOutreachEmail(input);
}
