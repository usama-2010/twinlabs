import { GoogleGenerativeAI } from "@google/generative-ai";
import type { LeadBrief } from "@/lib/outreach/lead-brief";
import type { ComposedEmail, ComposeSource } from "@/lib/outreach/types";
import {
  parseGeminiJson,
  validateGeminiBodyOnly,
  validateGeminiOutput,
  validateGeminiSubject,
} from "@/lib/outreach/validations/gemini-compose";
import { subjectAngleHint } from "@/lib/outreach/subject-line";
import type { ChatTurn } from "@/lib/outreach/validations/chat-modify";
import {
  chatModifyResponseSchema,
} from "@/lib/outreach/validations/chat-modify";

const SUBJECT_SYSTEM_PROMPT = `You write email subject lines the way a real UK founder would — typing quickly in Gmail before moving on.

It should look like a normal email from a person, NOT marketing copy or AI.

Good (human, boring-is-fine):
- "Heathcote Auto"
- "Mike"
- "quick question"
- "your website"
- "Archway Automotive"
- "saw your garage in Marlow"
- "Leamington Spa"
- "question about the site"

Bad (AI / marketing — never write these):
- "4.9★ in Tunbridge Wells — impressive"
- "One thing about your business"
- "Noticed something on your website"
- "Quick note about..."
- "Important opportunity"
- Anything with ★, "impressive", "well deserved", or em-dash flair

Rules:
- 1–6 words is ideal. Plain and personal.
- Use the brief: first name OR business name OR city — pick one, don't cram everything in
- Lowercase is fine for casual ones: "quick question", "your website"
- No jargon: HTTPS, SSL, URL, UX, SEO
- Must feel like you'd send this to someone you barely know — not a newsletter
- Return JSON only: { "subject": "..." }`;

const SYSTEM_PROMPT = `You write short cold emails as Usama from TwinLabs — a small UK software studio (websites, booking systems).

Write like a real person sending email from Gmail on a Tuesday afternoon. Not ChatGPT. Not a sales sequence.

Voice:
- Short sentences. Contractions are fine (I'm, you're, it's).
- Sound like you'd message someone you met once at a local business event.
- Never open with "My name is Usama", "Hope you're well", "I wanted to reach out", or "I hope this finds you well".
- Never use: delve, landscape, utilize, synergy, leverage, exciting, thrilled, passionate, cutting-edge, stood out, impressive, robust, seamless.
- Do not write the subject line — body only (subject is generated separately).
- Use ONLY facts from the JSON brief. Never invent problems, ratings, locations, or services.
- Plain English only. Never use: HTTPS, HTTP, SSL, URL, UX, UI, SEO, API.
- Do not mention or repeat website addresses.

Bad (AI / marketing — never write like this):
- "What stood out is your strong reputation..."
- "From the outside, there's room to..."
- "I wanted to reach out because..."
- "4.9 stars — genuinely impressive"
- "I'd love to connect and explore how we might..."

Good (human):
- "I was looking at garages in Tunbridge Wells and came across you."
- "One thing — your site shows a 'not secure' warning in Chrome."
- "I'm Usama, I run TwinLabs with my co-founder. We do websites for garages."

Structure (use \\n\\n between blocks):
1. Greeting alone: "Hi James," or "Hi there,"
2. Two or three short paragraphs — 1–3 sentences each, grouped naturally
3. Optional soft CTA in the last paragraph (no links)

- Keep total length 70–110 words. Shorter is better.
- Mention TwinLabs once, briefly — two founders, UK-based, quote upfront.
- If issue_type is "no_website": do NOT mention fixing their website. Talk about being hard to find online.
- If issue_type is "not_secure": explain browser "not secure" warnings or missing padlock in plain language.
- One soft CTA only (e.g. quick call, no pressure) — no website links; we append those.
- End with sign-off only:
Cheers,
Usama
TwinLabs
- Do NOT include website URLs, email addresses, or "see our work" in the body.
- Return JSON only: { "body": "..." }`;

const CHAT_MODIFY_SYSTEM_PROMPT = `You revise cold outreach email drafts based on user feedback.

You write as Usama from TwinLabs — a small UK software studio. Sound human, not like ChatGPT or a sales sequence.

Voice rules (always apply):
- Short sentences. Contractions are fine.
- Never use: delve, landscape, utilize, synergy, leverage, exciting, thrilled, impressive, stood out, cutting-edge.
- Never open with "Hope you're well", "I wanted to reach out", or "I hope this finds you well".
- Plain English only. Never use: HTTPS, HTTP, SSL, URL, UX, UI, SEO, API.
- Use ONLY facts from lead_brief. Never invent problems, ratings, locations, or services.
- Do not mention or repeat website addresses.

Revision rules:
- Apply the user's instruction to current_email while keeping the same overall purpose (cold outreach).
- Update subject if the instruction affects it; otherwise keep a similar human subject.
- Body must end with sign-off only:
Cheers,
Usama
TwinLabs
- Keep body 70–110 words unless the user explicitly asks for shorter/longer.
- prior_requests lists earlier user instructions for context — honour the latest instruction most.

Return JSON only:
{ "subject": "...", "body": "...", "summary": "One short sentence describing what you changed." }`;

function getModelName(): string {
  return process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
}

function briefForGemini(
  brief: LeadBrief
): Omit<LeadBrief, "website"> & { subject_angle_hint: string } {
  const { website: _website, ...safe } = brief;
  return {
    ...safe,
    subject_angle_hint: subjectAngleHint(brief),
  };
}

export function isGeminiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY);
}

async function requestGeminiEmail(
  brief: LeadBrief,
  timeoutMs: number
): Promise<(ComposedEmail & { source: ComposeSource }) | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({
    model: getModelName(),
    systemInstruction: SYSTEM_PROMPT,
  });

  const result = await Promise.race([
    model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: JSON.stringify(briefForGemini(brief), null, 2) }],
        },
      ],
      generationConfig: {
        temperature: 0.55,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      },
    }),
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Gemini request timed out")), timeoutMs);
    }),
  ]);

  const text = result.response.text();
  const parsed = parseGeminiJson(text);
  const bodyOnly = validateGeminiBodyOnly(parsed);
  const legacy = bodyOnly ? null : validateGeminiOutput(parsed);
  const body = bodyOnly?.body ?? legacy?.body;

  if (!body) return null;

  return {
    subject: "",
    text: body,
    html: "",
    source: "gemini",
  };
}

async function requestGeminiSubject(
  brief: LeadBrief,
  timeoutMs: number
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({
    model: getModelName(),
    systemInstruction: SUBJECT_SYSTEM_PROMPT,
  });

  const result = await Promise.race([
    model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: JSON.stringify(briefForGemini(brief), null, 2) }],
        },
      ],
      generationConfig: {
        temperature: 0.75,
        maxOutputTokens: 512,
        responseMimeType: "application/json",
      },
    }),
    new Promise<never>((_, reject) => {
      setTimeout(
        () => reject(new Error("Gemini subject request timed out")),
        timeoutMs
      );
    }),
  ]);

  const text = result.response.text();
  const parsed = parseGeminiJson(text);
  return validateGeminiSubject(parsed);
}

export async function composeGeminiEmail(
  brief: LeadBrief
): Promise<(ComposedEmail & { source: ComposeSource }) | null> {
  const timeoutMs = 30_000;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const composed = await requestGeminiEmail(brief, timeoutMs);
      if (composed) return composed;
    } catch (error) {
      console.error(
        `[Gemini compose fallback] ${brief.business_name} (attempt ${attempt}):`,
        error instanceof Error ? error.message : error
      );
    }
  }

  return null;
}

export async function composeGeminiSubject(
  brief: LeadBrief
): Promise<string | null> {
  const timeoutMs = 15_000;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const subject = await requestGeminiSubject(brief, timeoutMs);
      if (subject) return subject;
    } catch (error) {
      console.error(
        `[Gemini subject fallback] ${brief.business_name} (attempt ${attempt}):`,
        error instanceof Error ? error.message : error
      );
    }
  }

  return null;
}

export type { ChatTurn };

async function requestGeminiChatModify(
  input: {
    brief: LeadBrief;
    currentSubject: string;
    currentBody: string;
    instruction: string;
    history?: ChatTurn[];
  },
  timeoutMs: number
): Promise<{ subject: string; body: string; summary: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const priorRequests =
    input.history?.filter((turn) => turn.role === "user").map((turn) => turn.content) ??
    [];

  const payload = {
    lead_brief: briefForGemini(input.brief),
    current_email: {
      subject: input.currentSubject,
      body: input.currentBody,
    },
    instruction: input.instruction,
    prior_requests: priorRequests,
  };

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({
    model: getModelName(),
    systemInstruction: CHAT_MODIFY_SYSTEM_PROMPT,
  });

  const result = await Promise.race([
    model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: JSON.stringify(payload, null, 2) }],
        },
      ],
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 2048,
        responseMimeType: "application/json",
      },
    }),
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Gemini request timed out")), timeoutMs);
    }),
  ]);

  const text = result.response.text();
  const parsed = parseGeminiJson(text);
  const validated = chatModifyResponseSchema.safeParse(parsed);
  if (!validated.success) return null;

  const subject = validateGeminiSubject({ subject: validated.data.subject });
  const bodyResult = validateGeminiBodyOnly({ body: validated.data.body });

  if (!subject || !bodyResult) return null;

  return {
    subject,
    body: bodyResult.body,
    summary: validated.data.summary.trim(),
  };
}

export async function modifyGeminiEmailWithChat(input: {
  brief: LeadBrief;
  currentSubject: string;
  currentBody: string;
  instruction: string;
  history?: ChatTurn[];
}): Promise<{ subject: string; body: string; summary: string } | null> {
  const timeoutMs = 30_000;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const revised = await requestGeminiChatModify(input, timeoutMs);
      if (revised) return revised;
    } catch (error) {
      console.error(
        `[Gemini chat modify] ${input.brief.business_name} (attempt ${attempt}):`,
        error instanceof Error ? error.message : error
      );
    }
  }

  return null;
}
