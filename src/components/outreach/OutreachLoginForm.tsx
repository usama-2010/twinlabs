"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export function OutreachLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/outreach/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Incorrect password.");
      return;
    }

    const next = searchParams.get("next") ?? "/outreach";
    router.push(next);
    router.refresh();
  }

  return (
    <div className="outreach-card w-full max-w-sm p-6 sm:p-8">
      <Logo linked={false} className="h-6" />
      <p className="mono-label mt-6">Internal access</p>
      <h1 className="outreach-page-title mt-1">Sign in</h1>
      <p className="outreach-page-subtitle mt-2">
        Enter your outreach password to continue.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="password" className="mono-label block">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="outreach-input mt-2"
            autoComplete="current-password"
            required
          />
        </div>

        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary group w-full justify-center"
        >
          {loading ? "Signing in…" : "Continue"}
          {!loading ? (
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          ) : null}
        </button>
      </form>
    </div>
  );
}
