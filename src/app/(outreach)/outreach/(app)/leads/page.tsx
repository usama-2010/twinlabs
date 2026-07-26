"use client";

import { useEffect, useState } from "react";
import { OutreachPageHeader } from "@/components/outreach/OutreachPageHeader";
import type { Lead } from "@/lib/outreach/types";

const FILTERS = [
  ["all", "All"],
  ["ready", "Ready"],
  ["needs_email", "Needs email"],
  ["sent", "Sent"],
  ["do_not_contact", "Do not contact"],
] as const;

export default function OutreachLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [savingId, setSavingId] = useState<string | null>(null);

  async function loadLeads(status?: string) {
    setLoading(true);
    const query = status && status !== "all" ? `?status=${status}` : "";
    const response = await fetch(`/api/outreach/leads${query}`);
    const data = await response.json();
    setLeads(data.leads ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadLeads(filter);
  }, [filter]);

  async function markDoNotContact(id: string) {
    await fetch("/api/outreach/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "do_not_contact" }),
    });
    loadLeads(filter);
  }

  async function saveEmail(id: string, email: string) {
    setSavingId(id);
    await fetch("/api/outreach/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, email }),
    });
    setSavingId(null);
    loadLeads(filter);
  }

  return (
    <div className="space-y-6">
      <OutreachPageHeader
        title="Leads"
        subtitle="Filter imported leads and add missing email addresses before sending."
      />

      <div className="flex flex-wrap gap-2">
        {FILTERS.map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            data-active={filter === value ? "true" : "false"}
            className="outreach-filter-pill"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="outreach-table-wrap">
        <table className="outreach-table min-w-[44rem] w-full text-left">
          <thead>
            <tr>
              <th>Business</th>
              <th>Email</th>
              <th>Profession</th>
              <th>Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-muted">
                  Loading…
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-muted">
                  No leads yet. Upload a spreadsheet first.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <p className="font-medium text-foreground">{lead.business_name}</p>
                    <p className="mt-0.5 text-xs text-muted">{lead.location}</p>
                  </td>
                  <td>
                    <input
                      defaultValue={lead.email ?? ""}
                      placeholder="Add email"
                      className="outreach-input min-w-[180px] py-2 text-sm"
                      onBlur={(event) => {
                        const value = event.target.value.trim();
                        if (value !== (lead.email ?? "")) {
                          saveEmail(lead.id, value);
                        }
                      }}
                    />
                    {savingId === lead.id ? (
                      <span className="mt-1 block text-xs text-muted">Saving…</span>
                    ) : null}
                  </td>
                  <td className="text-muted">{lead.profession ?? "—"}</td>
                  <td className="text-muted">{lead.lead_score ?? "—"}</td>
                  <td>
                    <span className="outreach-badge outreach-badge-teal">
                      {lead.status.replaceAll("_", " ")}
                    </span>
                  </td>
                  <td>
                    {lead.status !== "do_not_contact" && lead.status !== "sent" ? (
                      <button
                        type="button"
                        onClick={() => markDoNotContact(lead.id)}
                        className="link-arrow text-xs no-underline"
                      >
                        Do not contact
                      </button>
                    ) : (
                      <span className="text-xs text-muted">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
