"use client";

import type { ImportProgress } from "@/lib/outreach/types";

type ImportProgressPanelProps = {
  progress: ImportProgress;
  useAi: boolean;
  onCancel?: () => void;
};

function phaseLabel(progress: ImportProgress, useAi: boolean): string {
  if (progress.phase === "complete") {
    return "Import complete";
  }

  switch (progress.phase) {
    case "starting":
      return useAi ? "Preparing to compose emails…" : "Preparing import…";
    case "composing":
      return useAi ? "Composing personalised emails" : "Building email templates";
    case "finishing":
      return "Saving campaign…";
    default:
      return "Processing…";
  }
}

function ShimmerBar({ className = "" }: { className?: string }) {
  return <div className={`outreach-shimmer-bar ${className}`} aria-hidden="true" />;
}

function EmailComposeRow({
  name,
  status,
}: {
  name: string;
  status: "done" | "active" | "pending";
}) {
  const isDone = status === "done";
  const isActive = status === "active";

  return (
    <div
      className={`rounded-xl border p-3 transition-colors duration-300 ${
        isDone
          ? "border-[#c5e6dc] bg-seafoam-50"
          : isActive
            ? "border-teal-800 bg-paper shadow-sm"
            : "border-border bg-[#fafcfc]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm ${
            isDone
              ? "bg-teal-800 text-white"
              : isActive
                ? "bg-seafoam-100 text-teal-800"
                : "bg-seafoam-50 text-muted"
          }`}
        >
          {isDone ? "✓" : isActive ? "…" : "·"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={`truncate text-sm font-medium ${
                isDone || isActive ? "text-foreground" : "text-muted"
              }`}
            >
              {name}
            </p>
            <span
              className={`outreach-badge shrink-0 ${
                isDone
                  ? "outreach-badge-teal"
                  : isActive
                    ? "outreach-badge-teal"
                    : "outreach-badge-neutral"
              }`}
            >
              {isDone ? "Ready" : isActive ? "Writing" : "Queued"}
            </span>
          </div>

          {isActive ? (
            <div className="mt-2.5 space-y-2">
              <ShimmerBar className="h-2.5 w-[42%]" />
              <ShimmerBar className="h-2.5 w-full" />
              <ShimmerBar className="h-2.5 w-[88%]" />
            </div>
          ) : !isDone ? (
            <div className="mt-2.5 space-y-2 opacity-70">
              <ShimmerBar className="h-2 w-[36%]" />
              <ShimmerBar className="h-2 w-full" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function getRowStatus(
  index: number,
  completed: number,
  phase: ImportProgress["phase"]
): "done" | "active" | "pending" {
  if (phase === "complete" || phase === "finishing" || index < completed) return "done";
  if (phase === "composing" && index === completed) return "active";
  return "pending";
}

export function ImportProgressPanel({
  progress,
  useAi,
  onCancel,
}: ImportProgressPanelProps) {
  const isComplete = progress.phase === "complete";
  const { completed, total, remaining, leadNames } = progress;
  const percent = isComplete
    ? 100
    : total > 0
      ? Math.min(100, Math.round((completed / total) * 100))
      : 0;

  const slots =
    leadNames && leadNames.length > 0
      ? leadNames
      : total > 0
        ? Array.from({ length: total }, (_, index) => `Lead ${index + 1}`)
        : Array.from({ length: 3 }, (_, index) => `Lead ${index + 1}`);

  return (
    <div
      className={`outreach-card mt-6 p-6 ${isComplete ? "border-teal-800/30 bg-seafoam-50/50" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy={!isComplete}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            {phaseLabel(progress, useAi)}
          </p>
          <p className="mt-1 text-sm text-muted">
            {isComplete ? (
              <>
                <span className="font-medium text-teal-800">{total}</span> emails
                composed — scroll down to preview samples.
              </>
            ) : total > 0 ? (
              <>
                <span className="font-medium text-teal-800">{completed}</span> of{" "}
                <span className="font-medium text-foreground">{total}</span> emails
                {remaining > 0 ? (
                  <>
                    {" "}
                    · <span className="font-medium">{remaining}</span> left
                  </>
                ) : null}
              </>
            ) : (
              "Reading spreadsheet…"
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <p className="outreach-stat-value mt-0 text-2xl">{percent}%</p>
          {!isComplete && onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-border bg-paper px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-seafoam-100">
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-out ${
            isComplete ? "bg-teal-800" : "bg-teal-800"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {!isComplete ? (
        <div className="mt-5 max-h-80 space-y-2 overflow-y-auto pr-1">
          {slots.map((name, index) => (
            <EmailComposeRow
              key={`${name}-${index}`}
              name={name}
              status={getRowStatus(index, completed, progress.phase)}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-lg border border-[#c5e6dc] bg-paper px-4 py-3 text-sm text-teal-800">
          All leads imported. Sample previews are ready below.
        </div>
      )}

      {useAi && progress.phase === "composing" && total > 0 ? (
        <p className="mt-4 text-xs leading-5 text-muted">
          Each email is written individually from your spreadsheet data — please
          keep this tab open.
        </p>
      ) : null}
    </div>
  );
}
