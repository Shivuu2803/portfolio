import { ImageResponse } from "next/og";

// Favicon — "S" monogram on the brand background, blue→mint gradient.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e14",
          borderRadius: 7,
          border: "1.5px solid rgba(79,143,255,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: "sans-serif",
            background: "linear-gradient(135deg, #4f8fff, #5eead4)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          S
        </div>
      </div>
    ),
    { ...size }
  );
}
