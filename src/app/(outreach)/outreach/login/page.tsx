import { Suspense } from "react";
import { OutreachLoginForm } from "@/components/outreach/OutreachLoginForm";

export default function OutreachLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="outreach-card w-full max-w-sm p-6 text-sm text-muted">
          Loading…
        </div>
      }
    >
      <OutreachLoginForm />
    </Suspense>
  );
}
