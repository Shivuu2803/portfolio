import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Social sharing card (LinkedIn, Twitter, WhatsApp, etc.)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${profile.name} — ${profile.role}`;

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
          background: "#0a0e14",
          padding: 72,
          position: "relative",
        }}
      >
        {/* ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(79,143,255,0.28), transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -100,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(94,234,212,0.16), transparent 70%)",
            display: "flex",
          }}
        />

        {/* top row: monogram + status */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              border: "2px solid rgba(79,143,255,0.5)",
              background: "#121823",
            }}
          >
            <div
              style={{
                display: "flex",
                background: "linear-gradient(135deg, #4f8fff, #5eead4)",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 42,
                fontWeight: 700,
              }}
            >
              S
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 20,
              letterSpacing: 4,
              color: "#7d8794",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#5eead4",
                display: "flex",
              }}
            />
            STATUS: OPERATIONAL
          </div>
        </div>

        {/* main: name + role + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, color: "#e6edf5", letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 5,
              color: "#4f8fff",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {profile.role}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9aa4b2", maxWidth: 900, marginTop: 8 }}>
            {profile.tagline}
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#7d8794",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex" }}>{profile.location}</div>
          <div style={{ display: "flex" }}>github.com/Shivuu2803</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
