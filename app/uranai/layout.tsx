import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const SITE_URL = "https://uranai-ai-sigma.vercel.app";

type Props = {
  children: React.ReactNode;
  params: Promise<Record<string, string>>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;

  const type = (Array.isArray(sp.type) ? sp.type[0] : sp.type) ?? "today";
  const score = Array.isArray(sp.score) ? sp.score[0] : sp.score;
  const typeA = Array.isArray(sp.typeA) ? sp.typeA[0] : sp.typeA;
  const typeB = Array.isArray(sp.typeB) ? sp.typeB[0] : sp.typeB;

  const typeLabels: Record<string, string> = {
    today: "今日の運勢",
    love: "恋愛運・相性傾向",
    destiny: "総合運命鑑定",
    compatibility: "相性占い",
  };
  const typeLabel = typeLabels[type] ?? "AI占い鑑定";

  // 動的OGP URLを構築
  const ogParams = new URLSearchParams({ type });
  if (score) ogParams.set("score", score);
  if (typeA) ogParams.set("typeA", typeA);
  if (typeB) ogParams.set("typeB", typeB);
  const ogImageUrl = `${SITE_URL}/api/og?${ogParams.toString()}`;

  const isCompatibility = type === "compatibility";
  const title =
    isCompatibility && typeA && typeB
      ? `${typeA}と${typeB}の相性鑑定 | AI占い`
      : isCompatibility
      ? `相性占い鑑定結果 | AI占い`
      : `${typeLabel}の鑑定結果 | AI占い`;

  const description =
    isCompatibility && score
      ? `相性スコア${score}点！四柱推命×九星気学AIがあなたと相手の相性を本格鑑定。`
      : `九星気学×干支でAIが本格鑑定。${typeLabel}の結果を見てみよう。`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/uranai`,
      siteName: "AI占い",
      locale: "ja_JP",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function UranaiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
