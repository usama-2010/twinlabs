"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EditableEmailPreview } from "@/components/outreach/EditableEmailPreview";
import { OutreachPageHeader } from "@/components/outreach/OutreachPageHeader";
import { OutreachLoader } from "@/components/outreach/OutreachLoader";
import { isAbortError } from "@/lib/outreach/abort-error";
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savingEmailId, setSavingEmailId] = useState<string | null>(null);
  const [rewritingId, setRewritingId] = useState<string | null>(null);
  const [chattingId, setChattingId] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");

  const aiAbortRef = useRef<AbortController | null>(null);

  function cancelAiOperation() {
    aiAbortRef.current?.abort();
    aiAbortRef.current = null;
    setRewritingId(null);
    setChattingId(null);
  }

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

  async function saveComposedEmail(
    id: string,
    payload: { subject: string; body: string }
  ) {
    setSavingEmailId(id);
    setEmailError("");

    const response = await fetch("/api/outreach/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        action: "update_email",
        subject: payload.subject,
        body: payload.body,
      }),
    });

    const data = await response.json();
    setSavingEmailId(null);

    if (!response.ok) {
      throw new Error(data.error ?? "Failed to save email.");
    }

    setLeads((current) =>
      current.map((lead) =>
        lead.id === id && lead.composed
          ? {
              ...lead,
              composed: {
                ...lead.composed,
                subject: data.subject,
                body: data.body,
                html: data.html,
              },
            }
          : lead
      )
    );
  }

  async function rewriteComposedEmail(id: string) {
    setRewritingId(id);
    setEmailError("");

    const controller = new AbortController();
    aiAbortRef.current = controller;

    try {
      const response = await fetch("/api/outreach/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action: "rewrite", composeMode: "gemini" }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        setEmailError(data.error ?? "Failed to rewrite email.");
        return;
      }

      setLeads((current) =>
        current.map((lead) =>
          lead.id === id
            ? {
                ...lead,
                composed: lead.composed
                  ? {
                      ...lead.composed,
                      subject: data.subject,
                      body: data.body ?? data.text,
                      html: data.html,
                    }
                  : {
                      subject: data.subject,
                      body: data.body ?? data.text,
                      html: data.html,
                      editable: true,
                    },
              }
            : lead
        )
      );
    } catch (err) {
      if (!isAbortError(err)) {
        setEmailError("Failed to rewrite email. Check your connection.");
      }
    } finally {
      if (aiAbortRef.current === controller) {
        aiAbortRef.current = null;
      }
      setRewritingId(null);
    }
  }

  async function chatModifyComposedEmail(
    id: string,
    instruction: string,
    history: Array<{ role: "user" | "assistant"; content: string }>
  ) {
    setChattingId(id);
    setEmailError("");

    const controller = new AbortController();
    aiAbortRef.current = controller;

    try {
      const response = await fetch("/api/outreach/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          action: "chat_modify",
          instruction,
          history,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to refine email.");
      }

      setLeads((current) =>
        current.map((lead) =>
          lead.id === id && lead.composed
            ? {
                ...lead,
                composed: {
                  ...lead.composed,
                  subject: data.subject,
                  body: data.body,
                  html: data.html,
                },
              }
            : lead
        )
      );

      return { assistantMessage: data.assistantMessage as string };
    } catch (error) {
      if (isAbortError(error)) {
        throw error;
      }
      const message =
        error instanceof Error ? error.message : "Failed to refine email.";
      setEmailError(message);
      throw error;
    } finally {
      if (aiAbortRef.current === controller) {
        aiAbortRef.current = null;
      }
      setChattingId(null);
    }
  }

  const canExpandEmail = (lead: Lead) =>
    lead.status !== "sent" &&
    lead.status !== "do_not_contact" &&
    Boolean(lead.composed?.subject);

  return (
    <div className="space-y-6">
      <OutreachPageHeader
        title="Leads"
        subtitle="Filter imported leads, add missing emails, and edit composed outreach."
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

      {emailError ? (
        <p className="text-sm text-red-600" role="alert">
          {emailError}
        </p>
      ) : null}

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
                <td colSpan={6} className="py-12">
                  <OutreachLoader label="Loading leads…" />
                </td>
              </tr>
            ) : leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-muted">
                  No leads yet. Upload a spreadsheet first.
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const expanded = expandedId === lead.id;
                const showEmail = canExpandEmail(lead);

                return (
                  <Fragment key={lead.id}>
                    <tr>
                      <td>
                        <p className="font-medium text-foreground">
                          {lead.business_name}
                        </p>
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
                          <span className="mt-1 block text-xs text-muted">
                            Saving…
                          </span>
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
                        <div className="flex flex-col items-start gap-2">
                          {showEmail ? (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedId(expanded ? null : lead.id)
                              }
                              className="inline-flex items-center gap-1 text-xs font-medium text-teal-800 hover:underline"
                            >
                              {expanded ? (
                                <ChevronUp className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5" />
                              )}
                              {expanded ? "Hide email" : "View email"}
                            </button>
                          ) : null}
                          {lead.status !== "do_not_contact" &&
                          lead.status !== "sent" ? (
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
                        </div>
                      </td>
                    </tr>
                    {expanded && lead.composed ? (
                      <tr>
                        <td colSpan={6} className="bg-seafoam-50/60 px-4 py-4">
                          <EditableEmailPreview
                            subject={lead.composed.subject}
                            body={lead.composed.body}
                            sessionKey={lead.id}
                            embedded
                            editable={lead.composed.editable}
                            showRewrite={lead.composed.editable}
                            showChat={lead.composed.editable}
                            rewriting={rewritingId === lead.id}
                            chatting={chattingId === lead.id}
                            saving={savingEmailId === lead.id}
                            onSave={(payload) => saveComposedEmail(lead.id, payload)}
                            onRewrite={() => rewriteComposedEmail(lead.id)}
                            onCancelAi={cancelAiOperation}
                            onChatModify={(instruction, history) =>
                              chatModifyComposedEmail(lead.id, instruction, history)
                            }
                          />
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
