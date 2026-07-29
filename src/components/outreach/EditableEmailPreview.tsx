"use client";

import { useEffect, useRef, useState } from "react";
import {
  EmailChatPanel,
  type ChatMessage,
} from "@/components/outreach/EmailChatPanel";
import { EmailBodyPreview } from "@/components/outreach/EmailBodyPreview";
import { EmailBodyPreviewShimmer } from "@/components/outreach/EmailBodyPreviewShimmer";
import { RewriteEmailButton } from "@/components/outreach/RewriteEmailButton";

type EditableEmailPreviewProps = {
  subject: string;
  body: string;
  sessionKey?: string;
  embedded?: boolean;
  editable?: boolean;
  showRewrite?: boolean;
  showChat?: boolean;
  rewriting?: boolean;
  chatting?: boolean;
  saving?: boolean;
  onSave: (payload: { subject: string; body: string }) => Promise<void>;
  onRewrite?: () => void;
  onCancelAi?: () => void;
  onChatModify?: (
    instruction: string,
    history: ChatMessage[]
  ) => Promise<{ assistantMessage: string }>;
};

export function EditableEmailPreview({
  subject,
  body,
  sessionKey = "default",
  embedded = true,
  editable = true,
  showRewrite = false,
  showChat = false,
  rewriting = false,
  chatting = false,
  saving = false,
  onSave,
  onRewrite,
  onCancelAi,
  onChatModify,
}: EditableEmailPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftSubject, setDraftSubject] = useState(subject);
  const [draftBody, setDraftBody] = useState(body);
  const [error, setError] = useState("");
  const [highlightPreview, setHighlightPreview] = useState(false);
  const [revising, setRevising] = useState(false);
  const contentKeyRef = useRef(`${subject}|${body}`);

  useEffect(() => {
    if (!isEditing) {
      setDraftSubject(subject);
      setDraftBody(body);
    }
  }, [subject, body, isEditing]);

  useEffect(() => {
    setRevising(false);
  }, [sessionKey]);

  useEffect(() => {
    const nextKey = `${subject}|${body}`;
    if (contentKeyRef.current === nextKey || isEditing) {
      contentKeyRef.current = nextKey;
      return;
    }

    contentKeyRef.current = nextKey;
    setHighlightPreview(true);
    const timer = window.setTimeout(() => setHighlightPreview(false), 1200);
    return () => window.clearTimeout(timer);
  }, [subject, body, isEditing]);

  const busy = rewriting || saving || chatting || revising;
  const showPreviewShimmer = chatting || revising;

  async function handleSave() {
    setError("");
    try {
      await onSave({
        subject: draftSubject.trim(),
        body: draftBody.trim(),
      });
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save email.");
    }
  }

  function handleCancel() {
    setDraftSubject(subject);
    setDraftBody(body);
    setError("");
    setIsEditing(false);
  }

  if (rewriting) {
    return (
      <EmailBodyPreviewShimmer
        label="Rewriting with AI…"
        onCancel={onCancelAi}
      />
    );
  }

  return (
    <div className="mt-3">
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
        {editable && !isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            disabled={busy}
            className="text-xs font-medium text-teal-800 hover:underline disabled:opacity-50"
          >
            Edit email
          </button>
        ) : null}
        {showRewrite && onRewrite && !isEditing ? (
          <RewriteEmailButton
            loading={false}
            disabled={busy}
            onClick={onRewrite}
          />
        ) : null}
      </div>

      {isEditing ? (
        <div className="mt-3 space-y-4 rounded-lg border border-border bg-seafoam-50 p-4">
          <div>
            <label className="mono-label block">Subject</label>
            <input
              value={draftSubject}
              onChange={(event) => setDraftSubject(event.target.value)}
              className="outreach-input mt-2 text-sm"
              maxLength={120}
              disabled={saving}
            />
          </div>
          <div>
            <label className="mono-label block">Message</label>
            <textarea
              value={draftBody}
              onChange={(event) => setDraftBody(event.target.value)}
              rows={8}
              className="outreach-input mt-2 resize-y text-sm leading-relaxed"
              maxLength={2000}
              disabled={saving}
            />
            <p className="mt-2 text-xs text-muted">
              CTA block, signature, and unsubscribe line are added automatically when
              sent.
            </p>
          </div>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="btn-primary"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="rounded-lg border border-border bg-paper px-4 py-2 text-sm font-medium text-muted hover:text-foreground disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            className={
              highlightPreview
                ? "rounded-lg ring-2 ring-teal-800/25 transition-shadow duration-300"
                : ""
            }
          >
            {showPreviewShimmer ? (
              <EmailBodyPreviewShimmer
                label="Revising with AI…"
                onCancel={onCancelAi}
              />
            ) : (
              <EmailBodyPreview subject={subject} body={body} embedded={embedded} />
            )}
          </div>

          {showChat && onChatModify && editable ? (
            <EmailChatPanel
              sessionKey={sessionKey}
              disabled={busy}
              chatting={chatting}
              onRevisingChange={setRevising}
              onCancel={onCancelAi}
              onSend={onChatModify}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
