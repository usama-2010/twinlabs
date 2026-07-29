"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EditableEmailPreview } from "@/components/outreach/EditableEmailPreview";
import { ImportProgressPanel } from "@/components/outreach/ImportProgressPanel";
import { OutreachLoader } from "@/components/outreach/OutreachLoader";
import { OutreachPageHeader } from "@/components/outreach/OutreachPageHeader";
import { PrioritySelect } from "@/components/outreach/PrioritySelect";
import {
  scanSpreadsheetEmailStats,
  type EmailStats,
} from "@/lib/outreach/count-email-stats";
import { parseUploadFileMeta } from "@/lib/outreach/parse-file-meta";
import type {
  ComposeSource,
  ImportProgress,
  ImportStreamEvent,
  ImportSummary,
} from "@/lib/outreach/types";

type SetupStatus = {
  configured: boolean;
  database: boolean;
  resend: boolean;
  password: boolean;
  gemini?: boolean;
  geminiModel?: string;
  message?: string;
};

export default function OutreachUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [profession, setProfession] = useState("");
  const [priority, setPriority] = useState("");
  const [useAi, setUseAi] = useState(true);
  const [loading, setLoading] = useState(false);
  const [importProgress, setImportProgress] = useState<ImportProgress | null>(
    null
  );
  const [error, setError] = useState("");
  const [summary, setSummary] = useState<ImportSummary | null>(null);
  const [starting, setStarting] = useState(false);
  const [startResult, setStartResult] = useState<string>("");
  const [setup, setSetup] = useState<SetupStatus | null>(null);
  const [setupLoading, setSetupLoading] = useState(true);
  const [rewritingLeadId, setRewritingLeadId] = useState<string | null>(null);
  const [savingLeadId, setSavingLeadId] = useState<string | null>(null);
  const [rewriteError, setRewriteError] = useState("");
  const [fileStats, setFileStats] = useState<EmailStats | null>(null);
  const [scanningFile, setScanningFile] = useState(false);
  const [chattingLeadId, setChattingLeadId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/outreach/status")
      .then((response) => response.json())
      .then((data: SetupStatus) => {
        setSetup(data);
        setUseAi(Boolean(data.gemini));
      })
      .catch(() => null)
      .finally(() => setSetupLoading(false));
  }, []);

  async function handleFileChange(selected: File | null) {
    setFile(selected);
    setFileStats(null);
    setSummary(null);
    setError("");

    if (!selected) return;

    const meta = parseUploadFileMeta(selected);
    if (meta.profession) setProfession(meta.profession);
    if (meta.priority) setPriority(meta.priority);

    setScanningFile(true);
    try {
      const stats = await scanSpreadsheetEmailStats(selected, {
        profession: meta.profession || profession || undefined,
        priority: meta.priority || priority || undefined,
      });
      setFileStats(stats);
    } catch {
      setFileStats(null);
    } finally {
      setScanningFile(false);
    }
  }

  async function runImport() {
    if (!file) return;

    setLoading(true);
    setError("");
    setSummary(null);
    setStartResult("");
    setImportProgress(null);

    const formData = new FormData();
    formData.append("file", file);
    if (profession) formData.append("profession", profession);
    if (priority) formData.append("priority", priority);
    formData.append("composeMode", useAi && setup?.gemini ? "gemini" : "template");
    formData.append("stream", "1");

    try {
      const response = await fetch("/api/outreach/import", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error ?? "Import failed.");
        return;
      }

      if (!response.body) {
        setError("Import failed — no response from server.");
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;

      while (!finished) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.trim()) continue;

          const event = JSON.parse(line) as ImportStreamEvent;

          if (event.type === "progress") {
            setImportProgress(event.progress);
          }

          if (event.type === "complete") {
            setSummary(event.summary);
            finished = true;
          }

          if (event.type === "error") {
            setError(event.error);
            finished = true;
          }
        }
      }
    } catch {
      setError("Import failed. Check your connection and try again.");
    } finally {
      setLoading(false);
      setImportProgress(null);
    }
  }

  async function handleImport(event: FormEvent) {
    event.preventDefault();
    if (!file) return;

    if (fileStats && fileStats.needsEmail > 0) {
      const confirmed = window.confirm(
        `${fileStats.needsEmail} of ${fileStats.total} leads have no email address.\n\nWe'll still compose emails for every row, but those leads won't send until you add addresses in Leads.\n\nContinue?`
      );
      if (!confirmed) return;
    }

    await runImport();
  }

  async function handleStartSending() {
    if (!summary?.campaignId) return;

    setStarting(true);
    setStartResult("");

    const response = await fetch(
      `/api/outreach/campaigns/${summary.campaignId}/start`,
      { method: "POST" }
    );
    const data = await response.json();
    setStarting(false);

    if (!response.ok) {
      setStartResult(data.error ?? "Failed to start sending.");
      return;
    }

    setStartResult(
      `Sent ${data.sent} email${data.sent === 1 ? "" : "s"} today. ${data.remaining} remaining in queue.`
    );
  }

  async function handleRewriteSample(leadId: string) {
    if (!summary || rewritingLeadId) return;

    setRewritingLeadId(leadId);
    setRewriteError("");

    try {
      const response = await fetch("/api/outreach/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          action: "rewrite",
          composeMode: "gemini",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRewriteError(data.error ?? "Failed to rewrite email.");
        return;
      }

      setSummary((current) => {
        if (!current) return current;

        return {
          ...current,
          samples: current.samples.map((sample) =>
            sample.leadId === leadId
              ? {
                  ...sample,
                  subject: data.subject,
                  text: data.body ?? data.text ?? sample.text,
                  html: data.html ?? sample.html,
                  source: (data.source as ComposeSource) ?? sample.source,
                }
              : sample
          ),
        };
      });
    } catch {
      setRewriteError("Failed to rewrite email. Check your connection.");
    } finally {
      setRewritingLeadId(null);
    }
  }

  async function handleSaveSample(
    leadId: string,
    payload: { subject: string; body: string }
  ) {
    setSavingLeadId(leadId);
    setRewriteError("");

    const response = await fetch("/api/outreach/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: leadId,
        action: "update_email",
        subject: payload.subject,
        body: payload.body,
      }),
    });

    const data = await response.json();
    setSavingLeadId(null);

    if (!response.ok) {
      throw new Error(data.error ?? "Failed to save email.");
    }

    setSummary((current) => {
      if (!current) return current;

      return {
        ...current,
        samples: current.samples.map((sample) =>
          sample.leadId === leadId
            ? {
                ...sample,
                subject: data.subject,
                text: data.body,
                html: data.html,
              }
            : sample
        ),
      };
    });
  }

  async function handleChatModifySample(
    leadId: string,
    instruction: string,
    history: Array<{ role: "user" | "assistant"; content: string }>
  ) {
    setChattingLeadId(leadId);
    setRewriteError("");

    try {
      const response = await fetch("/api/outreach/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          action: "chat_modify",
          instruction,
          history,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to refine email.");
      }

      setSummary((current) => {
        if (!current) return current;

        return {
          ...current,
          samples: current.samples.map((sample) =>
            sample.leadId === leadId
              ? {
                  ...sample,
                  subject: data.subject,
                  text: data.body,
                  html: data.html,
                }
              : sample
          ),
        };
      });

      return { assistantMessage: data.assistantMessage as string };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to refine email.";
      setRewriteError(message);
      throw error;
    } finally {
      setChattingLeadId(null);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      {starting ? <OutreachLoader variant="overlay" label="Starting send…" size="lg" /> : null}

      <OutreachPageHeader
        title="Upload leads"
        subtitle="Import a spreadsheet, preview composed emails, then send in daily batches."
      />

      {setupLoading ? (
        <OutreachLoader variant="card" label="Checking setup…" size="lg" />
      ) : (
        <>
      {setup && (!setup.database || !setup.resend) ? (
        <div className="outreach-alert">
          {!setup.database ? (
            <p>
              <strong>Database not ready.</strong>{" "}
              {setup.message ??
                "Run supabase/migrations/001_outreach.sql in Supabase SQL Editor."}
            </p>
          ) : null}
          {!setup.resend ? (
            <p className={setup.database ? "" : "mt-2"}>
              <strong>Resend not configured.</strong> Add RESEND_API_KEY to send
              emails.
            </p>
          ) : null}
        </div>
      ) : null}

      <form onSubmit={handleImport} className="outreach-card p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mono-label block">Excel file</label>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(event) =>
                handleFileChange(event.target.files?.[0] ?? null)
              }
              className="outreach-file-input mt-2"
              required
            />
            {file && (profession || priority) ? (
              <p className="mt-2 text-xs font-medium text-teal-800">
                Detected from filename:{" "}
                {[profession, priority ? `${priority} priority` : null]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : file ? (
              <p className="mt-2 text-xs text-muted">
                Couldn&apos;t detect profession/priority from filename — fill in
                manually if needed.
              </p>
            ) : null}
            {scanningFile ? (
              <p className="mt-2 text-xs text-muted">Scanning file…</p>
            ) : null}
            {fileStats && fileStats.total > 0 ? (
              <div className="outreach-notice mt-3">
                {fileStats.needsEmail > 0 ? (
                  <p>
                    <strong>{fileStats.needsEmail}</strong> of{" "}
                    <strong>{fileStats.total}</strong> rows have no email. We&apos;ll
                    still compose emails for every row, but those leads won&apos;t
                    send until you add addresses in Leads.
                  </p>
                ) : (
                  <p>
                    All <strong>{fileStats.total}</strong> rows have an email address.
                  </p>
                )}
              </div>
            ) : null}
          </div>

          <div>
            <label className="mono-label block">Profession</label>
            <input
              value={profession}
              onChange={(event) => setProfession(event.target.value)}
              placeholder="Automotive"
              className="outreach-input mt-2"
            />
          </div>

          <div>
            <PrioritySelect value={priority} onChange={setPriority} />
          </div>

          {setup?.gemini ? (
            <div className="outreach-toggle-card sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={useAi}
                  onChange={(event) => setUseAi(event.target.checked)}
                  className="mt-1 accent-teal-800"
                />
                <span>
                  <span className="block text-sm font-medium text-foreground">
                    Write emails with AI
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    Unique email per lead from spreadsheet facts. Falls back to
                    issue-specific templates if AI fails.
                  </span>
                </span>
              </label>
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="mt-5 text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading || !file}
          className="btn-primary group mt-6"
        >
          {loading ? "Importing…" : "Import and preview"}
          {!loading ? (
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          ) : null}
        </button>

        {loading ? (
          <ImportProgressPanel
            progress={
              importProgress ?? {
                phase: "starting",
                completed: 0,
                total: 0,
                remaining: 0,
              }
            }
            useAi={Boolean(useAi && setup?.gemini)}
          />
        ) : null}
      </form>

      {summary ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Ready to send", summary.ready],
              ["Needs email", summary.needsEmail],
              ["Imported", summary.imported],
              ["Updated", summary.updated],
            ].map(([label, value]) => (
              <div key={label as string} className="outreach-stat-card">
                <p className="mono-label">{label}</p>
                <p className="outreach-stat-value">{value}</p>
              </div>
            ))}
          </div>

          <div className="outreach-card p-5 sm:p-6">
            <h2 className="text-base font-semibold text-foreground">Sample previews</h2>
            <p className="mt-1 text-sm text-muted">
              First, middle, and last row · AI {summary.aiComposed} · templates{" "}
              {summary.templateScenario + summary.templateGeneric}
              {setup?.gemini ? (
                <>
                  {" "}
                  · Use <strong className="font-medium text-foreground">Refine with AI</strong>{" "}
                  below each email to edit with chat
                </>
              ) : null}
            </p>

            <div className="mt-5 divide-y divide-border">
              {summary.samples.map((sample) => {
                const sampleKey = sample.leadId ?? sample.business_name;
                const isRewriting = rewritingLeadId === sample.leadId;
                const isSaving = savingLeadId === sample.leadId;
                const isChatting = chattingLeadId === sample.leadId;

                return (
                  <article key={sampleKey} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium text-foreground">
                        {sample.business_name}
                      </h3>
                      <span className="outreach-badge outreach-badge-white">
                        {sample.status.replace("_", " ")}
                      </span>
                      {sample.source ? (
                        <span className="outreach-badge outreach-badge-teal">
                          {sample.source.replace("_", " ")}
                        </span>
                      ) : null}
                    </div>
                    {sample.leadId ? (
                      <EditableEmailPreview
                        subject={sample.subject}
                        body={sample.text ?? ""}
                        sessionKey={sample.leadId}
                        embedded
                        editable
                        showRewrite={Boolean(setup?.gemini)}
                        showChat={Boolean(setup?.gemini)}
                        rewriting={isRewriting}
                        chatting={isChatting}
                        saving={isSaving}
                        onSave={(payload) => handleSaveSample(sample.leadId!, payload)}
                        onRewrite={() => handleRewriteSample(sample.leadId!)}
                        onChatModify={(instruction, history) =>
                          handleChatModifySample(sample.leadId!, instruction, history)
                        }
                      />
                    ) : (
                      <EditableEmailPreview
                        subject={sample.subject}
                        body={sample.text ?? ""}
                        embedded
                        editable={false}
                        showRewrite={false}
                        onSave={async () => {}}
                      />
                    )}
                  </article>
                );
              })}
            </div>

            {rewriteError ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {rewriteError}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
              <button
                type="button"
                onClick={handleStartSending}
                disabled={starting || summary.ready === 0}
                className="btn-primary group"
              >
                {starting ? "Starting…" : "Start sending"}
                {!starting ? (
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
              {summary.ready === 0 ? (
                <p className="text-sm text-muted">
                  No emails to send — add addresses in Leads first.
                </p>
              ) : null}
            </div>

            {startResult ? (
              <p className="mt-4 text-sm font-medium text-teal-800">{startResult}</p>
            ) : null}
          </div>
        </div>
      ) : null}
        </>
      )}
    </div>
  );
}
