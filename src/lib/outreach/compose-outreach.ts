import {
  buildOutreachEmailHtml,
  buildOutreachEmailText,
} from "@/lib/email/outreach-email";
import { parseEmailSections } from "@/lib/outreach/email-format";
import { finalizeOutreachSubject } from "@/lib/outreach/subject-line";
import type { LeadBrief } from "@/lib/outreach/lead-brief";
import {
  composeGeminiEmail,
  composeGeminiSubject,
} from "@/lib/outreach/compose-email-gemini";
import {
  composeGenericTemplate,
  composeScenarioTemplate,
} from "@/lib/outreach/compose-email-templates";
import { buildLeadBrief } from "@/lib/outreach/lead-brief";
import type { ParsedLeadRow } from "@/lib/outreach/types";
import type {
  ComposedEmail,
  ComposeMode,
  ComposeResult,
  ComposeSource,
} from "@/lib/outreach/types";

type ComposeInput = ParsedLeadRow & {
  profession?: string | null;
  priority?: string | null;
};

function wrapEmail(
  composed: ComposedEmail & { source: ComposeSource },
  brief: LeadBrief
): ComposeResult {
  const { paragraphs, signOffLines } = parseEmailSections(composed.text ?? "");
  const body = paragraphs.join("\n\n");
  const subjectSource = composed.source === "gemini" ? "gemini" : "template";
  const subject = finalizeOutreachSubject(
    composed.subject,
    brief,
    subjectSource
  );
  const text = buildOutreachEmailText(body, signOffLines);
  const html = buildOutreachEmailHtml({
    subject,
    body,
    signOffLines,
  });

  return {
    subject,
    body,
    text,
    html,
    source: composed.source,
  };
}

export function defaultComposeMode(): ComposeMode {
  return process.env.GEMINI_API_KEY ? "gemini" : "template";
}

export async function composeOutreach(
  input: ComposeInput,
  mode: ComposeMode = defaultComposeMode()
): Promise<ComposeResult> {
  const brief = buildLeadBrief(input);

  if (mode === "gemini") {
    const [geminiBody, geminiSubject] = await Promise.all([
      composeGeminiEmail(brief),
      composeGeminiSubject(brief),
    ]);

    if (geminiBody) {
      return wrapEmail(
        {
          ...geminiBody,
          subject: geminiSubject ?? "",
        },
        brief
      );
    }
  }

  if (brief.issue_type !== "unknown" || brief.reason) {
    return wrapEmail(composeScenarioTemplate(brief), brief);
  }

  return wrapEmail(composeGenericTemplate(brief), brief);
}
