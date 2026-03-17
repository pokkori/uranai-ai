import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const SITE_URL = "uranai-ai-sigma.vercel.app";

function starsFromScore(score: number): number {
  if (score >= 90) return 5;
  if (score >= 75) return 4;
  if (score >= 55) return 3;
  if (score >= 35) return 2;
  return 1;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "default";
  const scoreParam = searchParams.get("score");
  const score = scoreParam ? Math.min(100, Math.max(0, parseInt(scoreParam, 10))) : null;
  const typeA = searchParams.get("typeA") || "";
  const typeB = searchParams.get("typeB") || "";

  const isCompatibility = type === "compatibility";

  const typeLabels: Record<string, string> = {
    today: "今日の運勢",
    love: "恋愛運・相性傾向",
    destiny: "総合運命鑑定",
    compatibility: "相性占い",
  };
  const typeLabel = typeLabels[type] || "AI占い鑑定";

  const starCount = isCompatibility && score !== null ? starsFromScore(score) : null;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #db2777 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* 背景装飾 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 40%)",
            display: "flex",
          }}
        />

        {isCompatibility && score !== null ? (
          /* 相性スコアカード */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: 64, display: "flex", marginBottom: 8 }}>💑</div>
            {(typeA || typeB) && (
              <div style={{ fontSize: 28, color: "rgba(255,255,255,0.85)", display: "flex", marginBottom: 16, gap: 16 }}>
                {typeA && <span>{typeA}</span>}
                {typeA && typeB && <span style={{ opacity: 0.6 }}>×</span>}
                {typeB && <span>{typeB}</span>}
              </div>
            )}
            <div style={{ fontSize: 30, color: "rgba(255,255,255,0.9)", display: "flex", marginBottom: 16 }}>
              相性スコア
            </div>
            <div
              style={{
                fontSize: 120,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                display: "flex",
                alignItems: "baseline",
                gap: 8,
              }}
            >
              <span>{score}</span>
              <span style={{ fontSize: 40, fontWeight: 700, color: "rgba(255,255,255,0.8)" }}>点 / 100点</span>
            </div>
            {starCount !== null && (
              <div style={{ display: "flex", gap: 8, marginTop: 20, marginBottom: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 44,
                      color: i < starCount ? "#fbbf24" : "rgba(255,255,255,0.25)",
                      display: "flex",
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            )}
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.75)", display: "flex", marginTop: 12 }}>
              四柱推命×九星気学AIが鑑定
            </div>
          </div>
        ) : (
          /* 通常鑑定カード */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              zIndex: 1,
            }}
          >
            <div style={{ fontSize: 72, display: "flex", marginBottom: 16 }}>🔮</div>
            <div style={{ fontSize: 52, fontWeight: 800, color: "#ffffff", display: "flex", marginBottom: 12 }}>
              AI占い鑑定結果
            </div>
            <div
              style={{
                display: "flex",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 32,
                padding: "10px 32px",
                fontSize: 30,
                color: "#ffffff",
                marginTop: 8,
              }}
            >
              {typeLabel}
            </div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.75)", display: "flex", marginTop: 28 }}>
              四柱推命×九星気学で本格鑑定
            </div>
          </div>
        )}

        {/* ウォーターマーク */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 40,
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            display: "flex",
          }}
        >
          {SITE_URL}
        </div>

        {/* ブランド左下 */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 40,
            fontSize: 22,
            color: "rgba(255,255,255,0.7)",
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>🔮</span>
          <span>AI占い</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
