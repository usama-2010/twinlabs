import { OutreachLoader } from "@/components/outreach/OutreachLoader";

export default function OutreachAppLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <OutreachLoader label="Loading…" size="lg" />
    </div>
  );
}
