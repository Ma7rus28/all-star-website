import { ImageResponse } from "next/og"

// Preview card shown when a page is shared on WhatsApp, LinkedIn, X and similar.
export const alt = "All Star Productions — Events, Exhibitions and Advertising in Saudi Arabia"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 90,
          background: "#050505",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(212,175,55,0.55), transparent 45%), radial-gradient(circle at 10% 95%, rgba(212,175,55,0.35), transparent 40%)",
          color: "#f3efe6",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 10, color: "#d4af37" }}>
          EVENTS · EXHIBITIONS · ADVERTISING
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 112, fontWeight: 700, letterSpacing: 6 }}>
          ALL <span style={{ color: "#d4af37", marginLeft: 36 }}>STAR</span>
        </div>
        <div style={{ display: "flex", fontSize: 54, letterSpacing: 4 }}>PRODUCTIONS</div>
        <div style={{ display: "flex", marginTop: 44, fontSize: 32, color: "#b5ae9d" }}>
          Riyadh · Saudi Arabia
        </div>
      </div>
    ),
    size
  )
}
