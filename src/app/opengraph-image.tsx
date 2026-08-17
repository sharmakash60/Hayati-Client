import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hayati – Next-Gen Functional Hydration";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d0d0f",
          backgroundImage: "radial-gradient(circle at 50% 30%, rgba(163, 230, 53, 0.25), transparent 70%)",
          color: "#fafafa",
          padding: "60px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 24px",
            borderRadius: "9999px",
            backgroundColor: "rgba(163, 230, 53, 0.15)",
            border: "1px solid rgba(163, 230, 53, 0.4)",
            color: "#a3e635",
            fontSize: "18px",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          450MG IONIC ELECTROLYTES • ZERO SUGAR • 100% ALUMINUM
        </div>

        {/* Brand Display Mark */}
        <div
          style={{
            fontSize: "84px",
            fontWeight: "900",
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            color: "#ffffff",
            marginBottom: "16px",
          }}
        >
          HAYATI
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: "600",
            color: "#a3e635",
            letterSpacing: "-0.01em",
            marginBottom: "24px",
          }}
        >
          Liquid Precision. Zero Compromise.
        </div>

        <div
          style={{
            fontSize: "20px",
            color: "#a1a1aa",
            maxWidth: "750px",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Engineered functional hydration formulated with bioavailable alpine marine salts and botanical adaptogens.
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "88%",
            fontSize: "16px",
            color: "#71717a",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "20px",
          }}
        >
          <span>HAYATI BEVERAGES INC.</span>
          <span style={{ color: "#a3e635" }}>BATCH 001 ALLOCATION LIVE</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
