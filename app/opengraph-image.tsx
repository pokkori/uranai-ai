import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI占い｜四柱推命×九星気学で本格鑑定・相性スコアも";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, marginBottom: 12, display: "flex" }}>🔮</div>
        <div style={{ fontSize: 48, fontWeight: 700, color: "#c084fc", marginBottom: 12, textAlign: "center", display: "flex" }}>
          AI占い
        </div>
        <div style={{ fontSize: 24, color: "#e9d5ff", textAlign: "center", maxWidth: 900, marginBottom: 4, display: "flex" }}>
          四柱推命×九星気学でAIが本格鑑定
        </div>
        <div style={{ fontSize: 24, color: "#e9d5ff", textAlign: "center", maxWidth: 900, marginBottom: 16, display: "flex" }}>
          今日の運勢・恋愛運・相性スコアを無料で診断
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {["今日の運勢", "恋愛・仕事運", "相性スコア診断"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                background: "rgba(192,132,252,0.15)",
                border: "1px solid rgba(192,132,252,0.4)",
                borderRadius: 24,
                fontSize: 18,
                color: "#d8b4fe",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 28,
            padding: "12px 36px",
            background: "#7c3aed",
            borderRadius: 40,
            fontSize: 22,
            color: "#fff",
            fontWeight: 700,
            display: "flex",
          }}
        >
          無料3回 → プレミアム¥980/月〜
        </div>
      </div>
    ),
    { ...size }
  );
}
