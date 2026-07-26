const SIGN_OFF_LINE =
  /^(cheers|best|thanks for reading|thanks|usama|twinlabs|co-founder)/i;

const GREETING_PREFIX =
  /^((?:Hello|Hi|Hey)(?: there|[A-Za-z][A-Za-z'-]*)?,)\s*(.*)$/i;

const GREETING_ONLY =
  /^(?:Hello|Hi|Hey)(?: there|[A-Za-z][A-Za-z'-]*)?,\s*$/i;

const FINE_PRINT_MARKER = "\n\n—\n";
const SEE_OUR_WORK_MARKER = /\n\nSee our work:/i;

const TARGET_BODY_PARAGRAPHS = 3;
const MIN_SENTENCES_PER_PARAGRAPH = 2;
const MAX_SENTENCES_PER_PARAGRAPH = 3;

export type EmailSections = {
  paragraphs: string[];
  signOffLines: string[];
};

export function isGreetingParagraph(text: string): boolean {
  return GREETING_ONLY.test(text.trim());
}

/** Strip CTA, signature, and fine print when parsing stored send text. */
export function stripSendTemplate(text: string | undefined | null): string {
  if (!text) return "";

  let cleaned = text.replace(/\r\n/g, "\n").trim();

  const finePrintIdx = cleaned.indexOf(FINE_PRINT_MARKER);
  if (finePrintIdx !== -1) {
    cleaned = cleaned.slice(0, finePrintIdx).trim();
  }

  const ctaIdx = cleaned.search(SEE_OUR_WORK_MARKER);
  if (ctaIdx !== -1) {
    cleaned = cleaned.slice(0, ctaIdx).trim();
  }

  return cleaned;
}

export function splitOutreachEmailText(text: string): {
  body: string;
  finePrint?: string;
} {
  const idx = text.indexOf(FINE_PRINT_MARKER);
  if (idx === -1) {
    return { body: stripSendTemplate(text) };
  }

  return {
    body: stripSendTemplate(text.slice(0, idx)),
    finePrint: text.slice(idx + FINE_PRINT_MARKER.length).trim(),
  };
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z"I'])/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function extractGreeting(text: string): { greeting?: string; rest: string } {
  const match = text.match(GREETING_PREFIX);
  if (!match) {
    return { rest: text.trim() };
  }

  return {
    greeting: match[1].trim(),
    rest: match[2].trim(),
  };
}

function isSignOffBlock(text: string): boolean {
  const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.length > 0 && lines.every((line) => SIGN_OFF_LINE.test(line));
}

function parseSignOffFragment(fragment: string): string[] {
  const lines: string[] = [];
  const trimmed = fragment.trim();
  if (!trimmed) return lines;

  if (/^cheers,/i.test(trimmed)) {
    lines.push("Cheers,");
    const rest = trimmed.replace(/^cheers,\s*/i, "");
    if (/usama/i.test(rest)) lines.push("Usama");
    if (/twinlabs/i.test(rest)) lines.push("TwinLabs");
    return lines;
  }

  return trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function extractTrailingSignOff(paragraph: string): {
  text: string;
  signOffLines: string[];
} {
  const match = paragraph.match(/^(.*?)(?:[.!?]\s+|\s+)(Cheers,[\s\S]*)$/i);
  if (!match?.[1]?.trim()) {
    return { text: paragraph, signOffLines: [] };
  }

  return {
    text: match[1].trim(),
    signOffLines: parseSignOffFragment(match[2]),
  };
}

function groupSentencesIntoParagraphs(sentences: string[]): string[] {
  if (sentences.length === 0) return [];

  if (sentences.length <= TARGET_BODY_PARAGRAPHS) {
    return sentences;
  }

  const chunkSize = Math.min(
    MAX_SENTENCES_PER_PARAGRAPH,
    Math.max(
      MIN_SENTENCES_PER_PARAGRAPH,
      Math.ceil(sentences.length / TARGET_BODY_PARAGRAPHS)
    )
  );

  const paragraphs: string[] = [];
  let chunk: string[] = [];

  for (const sentence of sentences) {
    chunk.push(sentence);
    if (chunk.length >= chunkSize) {
      paragraphs.push(chunk.join(" "));
      chunk = [];
    }
  }

  if (chunk.length) {
    const last = paragraphs[paragraphs.length - 1];
    if (last && chunk.length < MIN_SENTENCES_PER_PARAGRAPH) {
      paragraphs[paragraphs.length - 1] = `${last} ${chunk.join(" ")}`;
    } else {
      paragraphs.push(chunk.join(" "));
    }
  }

  return paragraphs;
}

function formatWallOfText(text: string): {
  paragraphs: string[];
  signOffLines: string[];
} {
  const { greeting, rest } = extractGreeting(text);
  const content = greeting ? rest : text;

  const sentences = splitSentences(content);
  const paragraphs: string[] = [];

  if (greeting) {
    paragraphs.push(greeting);
  }

  paragraphs.push(...groupSentencesIntoParagraphs(sentences));

  return { paragraphs, signOffLines: [] };
}

function formatPrefixedBlocks(blocks: string[]): {
  paragraphs: string[];
  signOffLines: string[];
} {
  const paragraphs: string[] = [];
  const signOffLines: string[] = [];

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (isSignOffBlock(block)) {
      signOffLines.push(
        ...block.split("\n").map((line) => line.trim()).filter(Boolean)
      );
      continue;
    }

    if (index === 0) {
      const { greeting, rest } = extractGreeting(block);
      if (greeting) {
        paragraphs.push(greeting);
        if (rest) paragraphs.push(rest);
        continue;
      }
    }

    paragraphs.push(block);
  }

  return { paragraphs, signOffLines };
}

export function parseEmailSections(text: string | undefined | null): EmailSections {
  const cleaned = stripSendTemplate(text?.replace(/\r\n/g, "\n").trim() ?? "");
  if (!cleaned) {
    return { paragraphs: [], signOffLines: [] };
  }

  let blocks = cleaned
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 1) {
    const lines = cleaned.split("\n").map((line) => line.trim()).filter(Boolean);
    if (
      lines.length > 1 &&
      lines.some((line) => isGreetingParagraph(line)) &&
      lines.every((line) => isGreetingParagraph(line) || line.length < 320)
    ) {
      blocks = lines;
    }
  }

  let result =
    blocks.length >= 2
      ? formatPrefixedBlocks(blocks)
      : formatWallOfText(blocks[0] ?? cleaned);

  const first = result.paragraphs[0];
  if (first && !isGreetingParagraph(first)) {
    const { greeting, rest } = extractGreeting(first);
    if (greeting && rest) {
      const tail = result.paragraphs.slice(1);
      const middle = groupSentencesIntoParagraphs(splitSentences(rest));
      result.paragraphs = [greeting, ...middle, ...tail];
    }
  }

  const [greeting, ...bodyParts] = result.paragraphs;
  const mergedBody =
    bodyParts.length > TARGET_BODY_PARAGRAPHS + 1
      ? bodyParts
      : mergeShortParagraphs(bodyParts);

  let paragraphs =
    greeting && isGreetingParagraph(greeting)
      ? [greeting, ...mergedBody]
      : result.paragraphs;

  paragraphs = paragraphs.filter((p) => p.trim() && !isSignOffBlock(p));

  const signOffLines = [...result.signOffLines];

  if (paragraphs.length > 0) {
    const lastIndex = paragraphs.length - 1;
    const extracted = extractTrailingSignOff(paragraphs[lastIndex]);
    if (extracted.signOffLines.length > 0) {
      paragraphs[lastIndex] = extracted.text;
      signOffLines.unshift(...extracted.signOffLines);
    }
  }

  return {
    paragraphs: paragraphs.filter(Boolean),
    signOffLines,
  };
}

function mergeShortParagraphs(paragraphs: string[]): string[] {
  if (paragraphs.length <= 1) return paragraphs;

  const allSentences = paragraphs.flatMap((paragraph) => splitSentences(paragraph));
  if (allSentences.length <= TARGET_BODY_PARAGRAPHS) {
    return paragraphs;
  }

  return groupSentencesIntoParagraphs(allSentences);
}

export function normalizeEmailBody(text: string): string {
  return parseEmailSections(text).paragraphs.join("\n\n");
}

export function emailBodyParagraphs(text: string): string[] {
  return parseEmailSections(text).paragraphs;
}

export const defaultSignOff = ["Cheers,", "Usama", "TwinLabs"];

export function resolveSignOff(signOffLines: string[]): string[] {
  const flat = signOffLines
    .flatMap((line) => line.split("\n").map((part) => part.trim()))
    .filter(Boolean);

  if (flat.length === 0) return defaultSignOff;

  const unique: string[] = [];
  for (const line of flat) {
    if (!unique.some((existing) => existing.toLowerCase() === line.toLowerCase())) {
      unique.push(line);
    }
  }

  return unique;
}
