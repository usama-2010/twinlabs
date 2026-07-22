import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hero } from "@/lib/content/site";
import { ogImageSize, socialShare } from "@/lib/seo/social";

export const alt = socialShare.imageAlt;
export const size = ogImageSize;
export const contentType = "image/png";

export default async function OgImage() {
  const logoBuffer = await readFile(
    join(process.cwd(), "public/brand/logo-horizontal.png")
  );

  const logoSrc = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "64px 72px",
          background: "#f4faf8",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <img
          src={logoSrc}
          width={240}
          height={39}
          alt=""
          style={{ objectFit: "contain" }}
        />

        <p
          style={{
            marginTop: 44,
            maxWidth: 920,
            fontSize: 26,
            lineHeight: 1.35,
            color: "#4a6363",
          }}
        >
          {hero.eyebrow}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginTop: 36,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
              color: "#0f1f1f",
            }}
          >
            {hero.headline}
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.98,
              color: "#4a6363",
            }}
          >
            Ship with clarity.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginTop: 36,
            fontSize: 24,
            lineHeight: 1.2,
            color: "#1e3333",
          }}
        >
          {socialShare.stackLines.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            right: 72,
            bottom: 56,
            fontSize: 22,
            fontWeight: 600,
            color: "#1a6666",
          }}
        >
          {socialShare.domain}
        </div>
      </div>
    ),
    size
  );
}
