"use client";

import { RefreshCw } from "lucide-react";

type RewriteEmailButtonProps = {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  title?: string;
};

export function RewriteEmailButton({
  onClick,
  loading = false,
  disabled = false,
  title = "Rewrite with AI",
}: RewriteEmailButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
      aria-label={title}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-paper text-muted transition-colors hover:border-teal-800 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <RefreshCw
        className={`h-4 w-4 ${loading ? "animate-spin text-teal-800" : ""}`}
        strokeWidth={1.75}
      />
    </button>
  );
}
