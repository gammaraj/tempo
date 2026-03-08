import { ImageResponse } from "next/og";

export const alt = "Tempo – Focus Timer & Pomodoro Productivity App";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: 22,
            background: "rgba(255, 255, 255, 0.12)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            marginBottom: 32,
            fontSize: 44,
            fontWeight: 800,
            color: "white",
          }}
        >
          T
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            letterSpacing: -2,
          }}
        >
          Tempo
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.6)",
            marginTop: 16,
          }}
        >
          Focus Timer &amp; Pomodoro Productivity App
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 48,
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: 18,
          }}
        >
          <span>Free forever</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span>No sign-up required</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span>Works offline</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
