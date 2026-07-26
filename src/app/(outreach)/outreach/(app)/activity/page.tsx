"use client";

import { useCallback, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { OutreachPageHeader } from "@/components/outreach/OutreachPageHeader";
import { OutreachLoader } from "@/components/outreach/OutreachLoader";
import type { Campaign, CampaignLead } from "@/lib/outreach/types";

type ActivityResponse = {
  campaigns: Campaign[];
  recent: Array<CampaignLead & { business_name?: string }>;
};

export default function OutreachActivityPage() {
  const [data, setData] = useState<ActivityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);
  const [error, setError] = useState("");
  const campaignCount = data?.campaigns.length ?? 0;
  const isDeleting = deletingAll || Boolean(deletingId);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    const response = await fetch("/api/outreach/campaigns");
    const json = await response.json();

    if (!response.ok) {
      setError(json.error ?? "Failed to load activity.");
      setData(null);
    } else {
      setData(json);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDeleteAll() {
    if (!campaignCount) return;

    const confirmed = window.confirm(
      `Delete all ${campaignCount} campaign${campaignCount === 1 ? "" : "s"}?\n\nThis clears all campaign and send history. Imported leads stay in Leads.`
    );

    if (!confirmed) return;

    setDeletingAll(true);
    setError("");

    try {
      const response = await fetch("/api/outreach/campaigns", {
        method: "DELETE",
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error ?? "Failed to delete campaigns.");
        return;
      }

      await load();
    } catch {
      setError("Failed to delete campaigns. Check your connection.");
    } finally {
      setDeletingAll(false);
    }
  }

  async function handleDelete(campaign: Campaign) {
    const confirmed = window.confirm(
      `Delete "${campaign.name}"?\n\nThis removes the campaign and its send history. Imported leads stay in Leads.`
    );

    if (!confirmed) return;

    setDeletingId(campaign.id);
    setError("");

    try {
      const response = await fetch(`/api/outreach/campaigns/${campaign.id}`, {
        method: "DELETE",
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error ?? "Failed to delete campaign.");
        return;
      }

      await load();
    } catch {
      setError("Failed to delete campaign. Check your connection.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {isDeleting ? (
        <OutreachLoader
          variant="overlay"
          label={deletingAll ? "Deleting all campaigns…" : "Deleting campaign…"}
          size="lg"
        />
      ) : null}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <OutreachPageHeader
          title="Activity"
          subtitle="Campaign progress and recently sent outreach emails."
        />
        {!loading && campaignCount > 0 ? (
          <button
            type="button"
            onClick={handleDeleteAll}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:border-red-200 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.75} />
            {deletingAll ? "Deleting all…" : "Delete all"}
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <OutreachLoader variant="card" label="Loading activity…" size="lg" />
      ) : (
        <>
          {(data?.campaigns ?? []).length === 0 ? (
            <div className="outreach-card px-5 py-10 text-center text-sm text-muted">
              No campaigns yet. Upload a spreadsheet to create one.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {(data?.campaigns ?? []).map((campaign) => (
                <article key={campaign.id} className="outreach-card p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-semibold text-foreground">{campaign.name}</h2>
                      <p className="mt-1 text-sm text-muted">
                        {campaign.profession ?? "Mixed"} ·{" "}
                        {campaign.priority ?? "mixed"} priority
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="outreach-badge outreach-badge-teal">
                        {campaign.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(campaign)}
                        disabled={isDeleting}
                        className="rounded-lg p-2 text-muted transition-colors hover:bg-seafoam-50 hover:text-red-600 disabled:opacity-50"
                        aria-label={`Delete ${campaign.name}`}
                        title="Delete campaign"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
                    {[
                      ["Total", campaign.total_leads],
                      ["Sent", campaign.sent_count],
                      ["Skipped", campaign.skipped_count],
                    ].map(([label, value]) => (
                      <div key={label as string} className="text-center">
                        <p className="mono-label">{label}</p>
                        <p className="outreach-stat-value text-xl">{value}</p>
                      </div>
                    ))}
                  </div>
                  {deletingId === campaign.id ? (
                    <p className="mt-3 text-xs text-muted">Deleting…</p>
                  ) : null}
                </article>
              ))}
            </div>
          )}

          <div className="outreach-table-wrap">
            <div className="border-b border-border bg-paper px-4 py-3 sm:px-5">
              <h2 className="text-base font-semibold text-foreground">Recent sends</h2>
            </div>
            <table className="outreach-table min-w-[36rem] w-full text-left">
                <thead>
                  <tr>
                    <th>Business</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Sent</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.recent ?? []).length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-10 text-center text-muted">
                        No activity yet.
                      </td>
                    </tr>
                  ) : (
                    data?.recent.map((item) => (
                      <tr key={item.id}>
                        <td className="font-medium text-foreground">
                          {item.business_name ?? "—"}
                        </td>
                        <td className="text-muted">{item.rendered_subject}</td>
                        <td>
                          <span className="outreach-badge outreach-badge-neutral">
                            {item.status}
                          </span>
                        </td>
                        <td className="text-muted">
                          {item.sent_at
                            ? new Date(item.sent_at).toLocaleString("en-GB")
                            : "—"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
          </div>
        </>
      )}
    </div>
  );
}
