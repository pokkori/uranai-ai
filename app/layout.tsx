import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";


const SITE_URL = "https://uranai-ai-sigma.vercel.app";
const TITLE = "AI占い｜無料・九星気学×干支で本格鑑定・今日の運勢・恋愛運・相性占い｜登録不要";
const DESC = "AI占いが無料3回から。生年月日を入力するだけで九星気学×干支による今日の運勢・恋愛運・仕事運・総合運命をAIが本格鑑定。相性占い（相性スコア＋恋愛・仕事相性分析）もプレミアムで利用可能。タロット占い・数秘術より精度が高いと好評。登録不要・今すぐ無料占い。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔮</text></svg>" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "AI占い",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/api/og?type=default", width: 1200, height: 630, alt: "AI占い｜四柱推命×九星気学で本格鑑定" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/api/og?type=default"],
  },
  metadataBase: new URL(SITE_URL),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "AI占い",
      "url": SITE_URL,
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Web",
      "keywords": "AI占い,無料占い,九星気学,干支,運勢,恋愛運,相性占い,今日の運勢,本格鑑定",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "JPY", "description": "無料3回・プレミアムプラン ¥980/月" },
      "description": DESC,
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "どんな占いができますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "九星気学×干支を組み合わせた本格AI鑑定が可能です。今日の運勢・恋愛運・仕事運・総合運命の分析に加え、プレミアムプランでは相性占い（相性スコア・恋愛相性・仕事相性の詳細分析）もご利用いただけます。"
          }
        },
        {
          "@type": "Question",
          "name": "相性占いはどのように使いますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "プレミアムプランにアップグレード後、自分と相手の生年月日を入力するだけで、0〜100点の相性スコアと詳細な恋愛・仕事の相性分析レポートが表示されます。"
          }
        },
        {
          "@type": "Question",
          "name": "無料で使えますか？",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "登録不要で3回分の占いを無料でお試しいただけます。プレミアムプラン（¥980/月）で占い回数無制限・相性占い・詳細な運命分析が利用可能になります。"
          }
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen text-white" style={{ background: '#0B0B1E' }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
