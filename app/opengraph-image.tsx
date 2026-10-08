import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const runtime = "edge";
export const alt = "Lingua Language School | Learn a language with real confidence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#4f46e5",
          padding: 80,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: 9999,
            backgroundColor: "#a855f7",
            opacity: 0.55,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -160,
            left: -60,
            width: 380,
            height: 380,
            borderRadius: 9999,
            backgroundColor: "#38bdf8",
            opacity: 0.45,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
              fontWeight: 800,
              color: "#4f46e5",
            }}
          >
            L
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#ffffff" }}>{site.name}</div>
            <div style={{ fontSize: 18, color: "#c7d2fe", letterSpacing: 4, textTransform: "uppercase" }}>
              {site.tagline}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#ffffff", lineHeight: 1.05 }}>
            Speak a new language
          </div>
          <div style={{ fontSize: 76, fontWeight: 800, color: "#fbcfe8", lineHeight: 1.05 }}>
            with real confidence.
          </div>
          <div style={{ fontSize: 26, color: "#e0e7ff", marginTop: 24 }}>
            12 languages · Groups of 8 · A1 → C2 · Brussels & online
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#c7d2fe" }}>
          <div style={{ display: "flex" }}>lingua.example.com</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Free 45-minute trial lesson</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
