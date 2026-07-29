"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type EmailChatPanelProps = {
  sessionKey: string;
  disabled?: boolean;
  chatting?: boolean;
  onRevisingChange?: (revising: boolean) => void;
  onSend: (
    instruction: string,
    history: ChatMessage[]
  ) => Promise<{ assistantMessage: string }>;
};

export function EmailChatPanel({
  sessionKey,
  disabled = false,
  chatting = false,
  onRevisingChange,
  onSend,
}: EmailChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const loading = sending || chatting;

  useEffect(() => {
    setMessages([]);
    setInput("");
    setError("");
    setSending(false);
  }, [sessionKey]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || disabled || loading) return;

    setError("");
    setSending(true);
    onRevisingChange?.(true);
    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const priorHistory = messages;
    setMessages((current) => [...current, userMessage]);
    setInput("");

    try {
      const { assistantMessage } = await onSend(trimmed, priorHistory);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: assistantMessage?.trim() || "Email updated.",
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refine email.");
    } finally {
      setSending(false);
      onRevisingChange?.(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSend();
    }
  }

  return (
    <div className="outreach-card-inset mt-4 overflow-hidden">
      <div className="border-b border-border px-3 py-2.5">
        <p className="text-sm font-medium text-foreground">Refine with AI</p>
        <p className="mt-0.5 text-xs text-muted">
          Describe how to change this email — saved automatically after each reply.
        </p>
      </div>

      {messages.length > 0 ? (
        <div
          ref={listRef}
          className="max-h-[220px] space-y-3 overflow-y-auto px-3 py-3"
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "user"
                  ? "rounded-lg border border-border bg-paper px-3 py-2"
                  : "rounded-lg bg-paper/60 px-3 py-2"
              }
            >
              <p className="mono-label mb-1 text-[10px]">
                {message.role === "user" ? "You" : "AI"}
              </p>
              <p
                className={
                  message.role === "user"
                    ? "text-sm text-foreground"
                    : "text-sm text-muted"
                }
              >
                {message.content}
              </p>
            </div>
          ))}
          {loading ? (
            <div className="flex items-center gap-2 px-1 text-sm text-muted">
              <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              Revising email…
            </div>
          ) : null}
        </div>
      ) : null}

      {error ? (
        <p className="px-3 pb-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-2 border-t border-border p-3 sm:flex-row sm:items-end">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g. "Make it shorter" or "Mention their 4.9 rating"'
          rows={2}
          disabled={disabled || loading}
          className="outreach-input min-h-[2.75rem] flex-1 resize-none py-2 text-sm leading-relaxed"
        />
        <button
          type="button"
          onClick={() => void handleSend()}
          disabled={!input.trim() || disabled || loading}
          className="btn-primary shrink-0 px-4 py-2.5 text-sm disabled:opacity-50 sm:min-w-[5.5rem]"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </span>
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
}
