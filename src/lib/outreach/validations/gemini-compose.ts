import { z } from "zod";
import { stripTechJargon } from "@/lib/outreach/tech-jargon";

const blockedPattern =
  /\b(https|http|ssl|seo|api)\b|\bux\b/i;

const alarmistSubjectPattern =
  /\b(urgent|alert|critical|immediate action|security breach)\b/i;

export const geminiComposeSchema = z.object({
  subject: z.string().min(5).max(120),
  body: z.string().min(80).max(1200),
});

export const geminiSubjectSchema = z.object({
  subject: z.string().min(2).max(60),
});

const AI_SUBJECT_PATTERN =
  /[★⭐]|—\s*(wow|impressive|well deserved)|\b(impressive|well deserved|just wanted to|i noticed something|one thing about|noticed something|curiosity|leverage|synergy|delve|landscape)\b/i;

const AI_BODY_PATTERN =
  /\b(i wanted to reach out|hope this (?:email )?finds you|hope you're well|what stood out|from the outside|i'd love to connect|explore how we might|genuinely impressive|speaks for itself|no small thing|delve|landscape|utilize|synergy|leverage|cutting-edge|thrilled|passionate|robust solution|seamless)\b|[★⭐]/i;

export function validateGeminiSubject(raw: unknown): string | null {
  const parsed = geminiSubjectSchema.safeParse(raw);
  if (!parsed.success) return null;

  if (blockedPattern.test(parsed.data.subject)) return null;
  if (alarmistSubjectPattern.test(parsed.data.subject)) return null;
  if (AI_SUBJECT_PATTERN.test(parsed.data.subject)) return null;
  if (/^quick note about /i.test(parsed.data.subject)) return null;
  if (/^reaching out about /i.test(parsed.data.subject)) return null;
  if (/^important /i.test(parsed.data.subject)) return null;

  return stripTechJargon(parsed.data.subject);
}

export const geminiBodySchema = z.object({
  body: z.string().min(80).max(1200),
});

export function validateGeminiBodyOnly(raw: unknown): { body: string } | null {
  const parsed = geminiBodySchema.safeParse(raw);
  if (!parsed.success) return null;
  if (blockedPattern.test(parsed.data.body)) return null;
  if (AI_BODY_PATTERN.test(parsed.data.body)) return null;

  return {
    body: stripTechJargon(parsed.data.body),
  };
}

export function validateGeminiOutput(raw: unknown): {
  subject: string;
  body: string;
} | null {
  const parsed = geminiComposeSchema.safeParse(raw);
  if (!parsed.success) return null;

  if (blockedPattern.test(parsed.data.body)) return null;
  if (blockedPattern.test(parsed.data.subject)) return null;
  if (alarmistSubjectPattern.test(parsed.data.subject)) return null;

  return {
    subject: stripTechJargon(parsed.data.subject),
    body: stripTechJargon(parsed.data.body),
  };
}

export function parseGeminiJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced?.[1]?.trim() ?? trimmed;

  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}
