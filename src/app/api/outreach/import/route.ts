import { NextResponse } from "next/server";
import { isOutreachAuthenticated, outreachUnauthorized } from "@/lib/outreach/auth";
import { isSupabaseConfigured } from "@/lib/outreach/db";
import { importSpreadsheet } from "@/lib/outreach/import-service";
import type { ImportStreamEvent } from "@/lib/outreach/types";

function streamNdjson(
  handler: (send: (event: ImportStreamEvent) => void) => Promise<void>
) {
  const encoder = new TextEncoder();

  const body = new ReadableStream({
    async start(controller) {
      const send = (event: ImportStreamEvent) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      try {
        await handler(send);
      } catch (error) {
        send({
          type: "error",
          error:
            error instanceof Error
              ? error.message
              : "Import failed. Make sure Supabase tables exist (run migration SQL).",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}

export async function POST(request: Request) {
  if (!(await isOutreachAuthenticated())) {
    return outreachUnauthorized();
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Excel file is required." }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const profession = String(formData.get("profession") ?? "").trim() || undefined;
    const priority = String(formData.get("priority") ?? "").trim() || undefined;
    const composeModeRaw = String(formData.get("composeMode") ?? "").trim();
    const composeMode =
      composeModeRaw === "template"
        ? "template"
        : composeModeRaw === "gemini"
          ? "gemini"
          : undefined;
    const stream = String(formData.get("stream") ?? "") === "1";

    const importOptions = {
      buffer,
      fileName: file.name,
      profession,
      priority,
      composeMode,
    } as const;

    if (stream) {
      return streamNdjson(async (send) => {
        const summary = await importSpreadsheet({
          ...importOptions,
          onProgress: (progress) => {
            send({ type: "progress", progress });
          },
        });
        send({ type: "complete", summary });
      });
    }

    const summary = await importSpreadsheet(importOptions);
    return NextResponse.json(summary);
  } catch (error) {
    console.error("[Outreach import]", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Import failed. Make sure Supabase tables exist (run migration SQL).",
      },
      { status: 500 }
    );
  }
}
