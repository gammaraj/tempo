import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
          borderRadius: 40,
        }}
      >
        {/* Crosshair circle */}
        <div
          style={{
            position: "absolute",
            width: 108,
            height: 108,
            borderRadius: "50%",
            border: "5.5px solid rgba(255, 255, 255, 0.85)",
          }}
        />
        {/* Inner dashed ring */}
        <div
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            borderRadius: "50%",
            border: "3.5px dashed rgba(255, 255, 255, 0.5)",
          }}
        />
        {/* Top tick */}
        <div
          style={{
            position: "absolute",
            width: 5.5,
            height: 26,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.85)",
            top: 8,
          }}
        />
        {/* Bottom tick */}
        <div
          style={{
            position: "absolute",
            width: 5.5,
            height: 26,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.85)",
            bottom: 8,
          }}
        />
        {/* Left tick */}
        <div
          style={{
            position: "absolute",
            width: 26,
            height: 5.5,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.85)",
            left: 8,
          }}
        />
        {/* Right tick */}
        <div
          style={{
            position: "absolute",
            width: 26,
            height: 5.5,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.85)",
            right: 8,
          }}
        />
        {/* Focal point */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "white",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
