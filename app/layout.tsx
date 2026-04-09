import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAdScript } from "@/components/GoogleAdScript";
import CookieBanner from "@/components/CookieBanner";
import OrbBackground from "@/components/OrbBackground";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const SITE_URL = "https://uranai-ai-sigma.vercel.app";
const TITLE = "AI占い｜無料・九星気学×干支で本格鑑定・今日の運勢・恋愛運・相性占い｜登録不要";
const DESC = "AI占いが無料3回から。生年月日を入力するだけで九星気学×干支による今日の運勢・恋愛運・仕事運・総合運命をAIが本格鑑定。相性占い（相性スコア＋恋愛・仕事相性分析）もプレミアムで利用可能。タロット占い・数秘術より精度が高いと好評。登録不要・今すぐ無料占い。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='55' r='35' fill='%238b5cf6'/><circle cx='50' cy='55' r='20' fill='%23a78bfa' opacity='0.6'/><ellipse cx='50' cy='88' rx='25' ry='6' fill='%236d28d9'/></svg>" },
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
    <html lang="ja" className={notoSansJP.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen text-white" style={{ background: '#0f0a1e' }}>
        <OrbBackground theme="purple" />
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
          <InstallPrompt />
          <Analytics />
          <SpeedInsights />
          <GoogleAdScript />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
