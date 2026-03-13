import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_URL = "https://uranai-ai-sigma.vercel.app";
const TITLE = "AI占い｜九星気学×干支で本格鑑定・相性占いも｜無料3回";
const DESC = "生年月日を入力するだけ。AIが九星気学×干支で今日の運勢・恋愛運・総合運命を鑑定。プレミアムでは相性占い（相性スコア＋恋愛・仕事分析）も。無料3回から。";

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
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
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
      "offers": { "@type": "Offer", "price": "980", "priceCurrency": "JPY", "description": "プレミアムプラン ¥980/月" },
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
