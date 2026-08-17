import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

const WIDTH = 1584;
const HEIGHT = 396;

/** Space reserved bottom-left for LinkedIn company logo overlap. */
const LOGO_SAFE_WIDTH = 340;

async function main() {
  const image = new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        {/* Left zone — intentionally empty for profile logo */}
        <div
          style={{
            width: LOGO_SAFE_WIDTH,
            height: "100%",
            background: "#f4faf8",
            borderRight: "1px solid #e8f4f0",
          }}
        />

        {/* Main message — right of logo, vertically centred */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            paddingLeft: 56,
            paddingRight: 64,
          }}
        >
          <div
            style={{
              width: 4,
              height: 72,
              background: "#1a6666",
              borderRadius: 2,
              marginRight: 32,
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div
              style={{
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "#0f1f1f",
              }}
            >
              Build software. Ship with clarity.
            </div>
            <div
              style={{
                fontSize: 19,
                fontWeight: 400,
                lineHeight: 1.4,
                color: "#4a6363",
              }}
            >
              Custom software for UK SMEs
            </div>
          </div>
        </div>

        {/* Domain — top right, clear of logo */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 56,
            fontSize: 16,
            fontWeight: 600,
            color: "#1a6666",
            letterSpacing: "0.01em",
          }}
        >
          twinlabs.co.uk
        </div>

        {/* Brand accent */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background: "#1a6666",
          }}
        />
      </div>
    ),
    { width: WIDTH, height: HEIGHT }
  );

  const buffer = Buffer.from(await image.arrayBuffer());
  const outputPath = join(process.cwd(), "public/brand/linkedin-cover.png");
  await writeFile(outputPath, buffer);
  console.log(`Wrote ${outputPath} (${WIDTH}x${HEIGHT})`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
