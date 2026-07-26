import { Suspense } from "react";
import { OutreachLoader } from "@/components/outreach/OutreachLoader";
import { OutreachLoginForm } from "@/components/outreach/OutreachLoginForm";

export default function OutreachLoginPage() {
  return (
    <Suspense fallback={<OutreachLoader variant="card" label="Loading…" size="lg" />}>
      <OutreachLoginForm />
    </Suspense>
  );
}
