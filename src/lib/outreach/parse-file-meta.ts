export function parseFileNameMeta(fileName: string): {
  profession?: string;
  priority?: string;
} {
  const base = fileName.replace(/\.(xlsx|xls|csv)$/i, "");
  const match = base.match(
    /^(.+?)\s*-\s*(High|Medium|Low)\s*Priority(?:\s*-\s*.+)?$/i
  );
  if (!match) return {};

  return {
    profession: match[1].trim(),
    priority: match[2].toLowerCase(),
  };
}

export function parseImportPath(relativePath?: string): {
  profession?: string;
  priority?: string;
} {
  if (!relativePath) return {};

  const parts = relativePath.split(/[/\\]/).filter(Boolean);
  if (parts.length < 2) return parseFileNameMeta(parts[0] ?? "");

  const profession = parts.find(
    (part) => !/priority/i.test(part) && !/\.(xlsx|xls|csv)$/i.test(part)
  );
  const priorityPart = parts.find((part) => /priority/i.test(part));

  return {
    profession,
    priority: priorityPart?.replace(/\s*priority\s*/i, "").toLowerCase(),
  };
}

export function parseUploadFileMeta(file: File): {
  profession?: string;
  priority?: string;
} {
  const relativePath = (file as File & { webkitRelativePath?: string })
    .webkitRelativePath;

  if (relativePath) {
    const fromPath = parseImportPath(relativePath);
    if (fromPath.profession || fromPath.priority) return fromPath;
  }

  return parseFileNameMeta(file.name);
}
