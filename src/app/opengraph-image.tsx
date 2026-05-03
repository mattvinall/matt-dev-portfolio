import { ImageResponse } from "next/og";

export const alt = "Matt Vinall · Full-Stack AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          color: "#fafafa",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#a1a1aa",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Beamsville, ON · Available for work
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 140,
              lineHeight: 0.95,
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            Matt
          </div>
          <div
            style={{
              fontSize: 140,
              lineHeight: 0.95,
              fontStyle: "italic",
              color: "#f97316",
              letterSpacing: "-0.04em",
            }}
          >
            Vinall.
          </div>
          <div style={{ marginTop: 30, fontSize: 28, color: "#a1a1aa" }}>
            Full-Stack AI Engineer · 8 years shipping products.
          </div>
        </div>
      </div>
    ),
    size
  );
}
