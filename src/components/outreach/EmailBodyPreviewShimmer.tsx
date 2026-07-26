function ShimmerBar({ className = "" }: { className?: string }) {
  return <div className={`outreach-shimmer-bar ${className}`} aria-hidden="true" />;
}

type EmailBodyPreviewShimmerProps = {
  className?: string;
};

export function EmailBodyPreviewShimmer({
  className = "",
}: EmailBodyPreviewShimmerProps) {
  return (
    <div
      className={`outreach-card mt-3 overflow-hidden border-teal-800/30 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Rewriting email"
    >
      <div className="border-b border-border bg-seafoam-50 px-4 py-3">
        <ShimmerBar className="h-2.5 w-24" />
        <ShimmerBar className="mt-3 h-3 w-[72%]" />
        <ShimmerBar className="mt-2 h-4 w-[48%]" />
      </div>

      <div className="space-y-4 px-5 py-5">
        <ShimmerBar className="h-3.5 w-20" />
        <div className="space-y-2">
          <ShimmerBar className="h-3 w-full" />
          <ShimmerBar className="h-3 w-[94%]" />
          <ShimmerBar className="h-3 w-[88%]" />
        </div>
        <div className="space-y-2">
          <ShimmerBar className="h-3 w-full" />
          <ShimmerBar className="h-3 w-[82%]" />
        </div>

        <div className="outreach-card-inset p-4">
          <ShimmerBar className="h-3 w-full" />
          <ShimmerBar className="mt-4 h-10 w-32 rounded-full" />
        </div>

        <div className="border-t border-border pt-5">
          <ShimmerBar className="h-3.5 w-16" />
          <div className="mt-4 flex gap-3">
            <ShimmerBar className="h-12 w-1 rounded-full" />
            <div className="flex-1 space-y-2">
              <ShimmerBar className="h-3.5 w-24" />
              <ShimmerBar className="h-3 w-32" />
            </div>
          </div>
        </div>
      </div>

      <p className="border-t border-border bg-seafoam-50 px-5 py-3 text-center text-xs font-medium text-teal-800">
        Rewriting with AI…
      </p>
    </div>
  );
}
