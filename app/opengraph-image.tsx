import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AI占い｜四柱推命・相性占い・今日の運勢をAIが鑑定";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 12, display: "flex" }}>🔮</div>
        <div style={{ fontSize: 52, fontWeight: 700, color: "#e9d5ff", marginBottom: 12, textAlign: "center", display: "flex" }}>
          AI占い
        </div>
        <div style={{ fontSize: 26, color: "#c4b5fd", textAlign: "center", maxWidth: 900, marginBottom: 8, display: "flex" }}>
          四柱推命・相性占い・今日の運勢をAIが本格鑑定
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          {["今日の運勢", "相性占いPRO", "四柱推命", "登録不要"].map((label) => (
            <div
              key={label}
              style={{
                padding: "8px 20px",
                background: "rgba(196,181,253,0.15)",
                border: "1px solid rgba(196,181,253,0.4)",
                borderRadius: 24,
                fontSize: 18,
                color: "#ddd6fe",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 32,
            padding: "12px 36px",
            background: "#7c3aed",
            borderRadius: 40,
            fontSize: 22,
            color: "#fff",
            fontWeight: 600,
            display: "flex",
          }}
        >
          無料3回 → ¥980/月〜
        </div>
      </div>
    ),
    { ...size }
  );
}
