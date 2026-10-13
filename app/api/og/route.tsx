import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "74px",
          background:
            "radial-gradient(ellipse at 82% 42%, #292119 0%, #11110f 30%, #080808 68%)",
          color: "#f5f2ec",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#d6b477",
            fontSize: "20px",
            letterSpacing: "5px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #d6b477",
              borderRadius: "50%",
              fontSize: "18px",
              letterSpacing: "0",
            }}
          >
            M.
          </div>
          MUJTABA ABBAS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              color: "#f5f2ec",
              fontSize: "69px",
              letterSpacing: "-3px",
              lineHeight: 1.08,
            }}
          >
            Engineering what&apos;s next.
          </div>
          <div
            style={{
              color: "#b8aa95",
              fontSize: "22px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Software Engineer · Agentic AI · Robotics
          </div>
        </div>
        <div
          style={{
            color: "#a5a198",
            fontSize: "16px",
            letterSpacing: "2px",
          }}
        >
          KARACHI, PAKISTAN
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
