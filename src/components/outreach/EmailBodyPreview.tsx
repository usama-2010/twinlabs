import { siteConfig } from "@/lib/content/site";
import { getOutreachPreviewMeta, getOutreachPreviewSections } from "@/lib/email/outreach-email";
import { resolveSignOff } from "@/lib/outreach/email-format";

type EmailBodyPreviewProps = {
  subject?: string | null;
  body?: string | null;
  className?: string;
  embedded?: boolean;
};

export function EmailBodyPreview({
  subject,
  body,
  className = "",
  embedded = false,
}: EmailBodyPreviewProps) {
  const content = body?.trim() ?? "";
  const subjectLine = subject?.trim() ?? "(no subject)";
  const { email } = getOutreachPreviewMeta();

  if (!content) {
    return (
      <div
        className={`mt-3 rounded-lg border border-border bg-seafoam-50 px-4 py-3 text-sm text-muted ${className}`}
      >
        No preview available for this sample.
      </div>
    );
  }

  const { paragraphs, signOffLines } = getOutreachPreviewSections(content);
  const signOff = resolveSignOff(signOffLines);
  const closing = signOff[0] ?? "Cheers,";
  const name = signOff.find((line) => /^usama/i.test(line)) ?? "Usama";
  const { ctaLabel, ctaHref, siteUrl } = getOutreachPreviewMeta();

  const shellClass = embedded
    ? "mt-3 overflow-hidden rounded-lg border border-border bg-paper"
    : "outreach-card mt-3 overflow-hidden";

  return (
    <div className={`${shellClass} ${className}`}>
      <div className="border-b border-border bg-seafoam-50 px-4 py-3">
        <p className="mono-label">Email preview</p>
        <p className="mt-2 text-xs text-muted">
          From{" "}
          <span className="font-medium text-foreground">
            Usama · {siteConfig.name}
          </span>{" "}
          &lt;{email}&gt;
        </p>
        <p className="mt-1 text-sm font-semibold text-foreground">{subjectLine}</p>
      </div>

      <div className="space-y-[18px] px-5 py-5">
        {paragraphs.map((paragraph, index) => {
          const isGreeting = /^(?:Hello|Hi|Hey)(?: there|[A-Za-z][A-Za-z'-]*)?,\s*$/.test(
            paragraph.trim()
          );

          return (
            <p
              key={`${index}-${paragraph.slice(0, 24)}`}
              className={`text-[15px] leading-[1.75] text-foreground ${
                isGreeting ? "mb-1 font-medium" : ""
              }`}
            >
              {paragraph}
            </p>
          );
        })}

        <div className="rounded-lg border border-border bg-seafoam-50 p-4">
          <p className="text-sm leading-6 text-foreground">
            We build websites and booking tools for UK businesses — fixed quotes,
            no runaround.
          </p>
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            className={
              embedded
                ? "mt-3 inline-flex rounded-full bg-teal-800 px-4 py-2 text-sm font-medium text-white no-underline"
                : "btn-primary mt-3"
            }
          >
            {ctaLabel}
          </a>
        </div>

        <div className="border-t border-border pt-5">
          <p className="text-[15px] leading-7 text-foreground">{closing}</p>
          <div className="mt-4 flex gap-3">
            <div className="w-1 shrink-0 rounded-full bg-teal-800" />
            <div>
              <p className="text-[15px] font-semibold text-foreground">{name}</p>
              <p className="mt-1 text-sm text-muted">Co-founder, TwinLabs</p>
              <p className="mt-1 text-sm">
                <a
                  href={siteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-teal-800 no-underline hover:underline"
                >
                  twinlabs.co.uk
                </a>
                <span className="text-muted"> · </span>
                <a
                  href={`mailto:${email}`}
                  className="font-medium text-teal-800 no-underline hover:underline"
                >
                  {email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="border-t border-border bg-seafoam-50 px-5 py-3 text-xs leading-5 text-muted">
        Not relevant? Just reply &quot;unsubscribe&quot; and I won&apos;t follow up.
      </p>
    </div>
  );
}
