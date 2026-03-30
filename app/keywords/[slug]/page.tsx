import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrossSell } from "@/components/CrossSell";

const SITE_URL = "https://uranai-ai-sigma.vercel.app";

export const KEYWORDS: Record<
  string,
  {
    title: string;
    description: string;
    faqs: { q: string; a: string }[];
    lastUpdated: string;
  }
> = {
  "ai-uranai-muryou": {
    title: "AI占い 無料",
    description:
      "AIが四柱推命×九星気学で本格鑑定。毎日3回まで無料",
    faqs: [
      {
        q: "AI占いは本当に無料で使えますか？",
        a: "はい。1日3回まで完全無料でご利用いただけます。登録も不要です。",
      },
      {
        q: "無料版と有料版の違いは何ですか？",
        a: "無料版は1日3回の鑑定が可能です。プレミアム版では回数無制限に加え、相性占いや詳細な運勢分析が利用できます。",
      },
      {
        q: "AI占いの精度はどのくらいですか？",
        a: "四柱推命と九星気学の理論をベースにAIが総合判断するため、従来のランダム占いより深い鑑定結果をお届けします。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "kyou-no-unsei": {
    title: "今日の運勢",
    description:
      "今日の総合運・恋愛運・仕事運・金運をAIが毎朝更新",
    faqs: [
      {
        q: "今日の運勢は毎日更新されますか？",
        a: "はい。毎日0時に最新の運勢が更新されます。九星気学の日盤をベースにAIが鑑定します。",
      },
      {
        q: "生年月日を入力するだけで占えますか？",
        a: "はい。生年月日を入力するだけで、総合運・恋愛運・仕事運・金運の4項目を即座に鑑定します。",
      },
      {
        q: "過去の日の運勢も見られますか？",
        a: "現在は当日の運勢のみ対応しています。毎日チェックすることで運勢の流れを把握できます。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "renai-un-uranai": {
    title: "恋愛運 占い",
    description:
      "気になる人との相性もAI鑑定。恋愛運を四柱推命で深堀り",
    faqs: [
      {
        q: "恋愛運はどのように鑑定されますか？",
        a: "四柱推命の命式から恋愛に関わる星の配置を読み解き、AIが総合的に恋愛運を鑑定します。",
      },
      {
        q: "片思いの相手との相性も占えますか？",
        a: "はい。プレミアム版の相性占い機能で、お相手の生年月日を入力すると相性スコアと詳細分析が得られます。",
      },
      {
        q: "恋愛運を上げるアドバイスはもらえますか？",
        a: "鑑定結果にはラッキーカラーやラッキーアイテムなど、運気アップのアドバイスも含まれます。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "aishou-uranai-ai": {
    title: "相性占い AI",
    description:
      "二人の生年月日からAIが相性スコアを算出",
    faqs: [
      {
        q: "相性占いに必要な情報は何ですか？",
        a: "二人の生年月日のみで鑑定できます。氏名やその他の個人情報は不要です。",
      },
      {
        q: "相性スコアはどのように計算されますか？",
        a: "四柱推命の命式と九星気学の本命星を組み合わせ、AIが恋愛・仕事・総合の相性スコアを算出します。",
      },
      {
        q: "友人や同僚との相性も占えますか？",
        a: "はい。恋愛だけでなく、仕事や友人関係の相性も分析可能です。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "shigoto-un-uranai": {
    title: "仕事運 占い",
    description:
      "転職・昇進・適職をAIが星の配置から読み解く",
    faqs: [
      {
        q: "転職のタイミングを占えますか？",
        a: "はい。九星気学の年盤・月盤からAIが転職に適した時期をアドバイスします。",
      },
      {
        q: "自分に向いている職業が分かりますか？",
        a: "四柱推命の命式から適職の傾向を読み解き、AIが具体的な職種や業界の方向性を示します。",
      },
      {
        q: "仕事運の鑑定は無料ですか？",
        a: "基本的な仕事運の鑑定は1日3回まで無料です。より詳しい適職分析はプレミアム版で利用できます。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "tanjyoubi-uranai-2026": {
    title: "誕生日占い 2026",
    description:
      "2026年の運勢を誕生日から本格鑑定",
    faqs: [
      {
        q: "2026年の年間運勢は占えますか？",
        a: "はい。生年月日を入力すると、2026年の総合運・恋愛運・仕事運・金運をAIが本格鑑定します。",
      },
      {
        q: "誕生日占いと星座占いの違いは何ですか？",
        a: "星座占いは12分類ですが、当サービスでは四柱推命×九星気学でより細かく個人の運勢を鑑定します。",
      },
      {
        q: "何歳でも占えますか？",
        a: "はい。年齢に関係なく、生年月日があれば誰でも鑑定可能です。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "kusei-kigaku-ai": {
    title: "九星気学 AI占い",
    description:
      "九星気学をベースにAIが方位・吉日・運勢を鑑定",
    faqs: [
      {
        q: "九星気学とは何ですか？",
        a: "生年月日から「本命星」を割り出し、運勢・方位・吉日を読み解く東洋占術です。当サービスではAIがこれを高精度に自動鑑定します。",
      },
      {
        q: "引っ越しや旅行の方位も占えますか？",
        a: "九星気学の方位学に基づき、AIが吉方位・凶方位をアドバイスします。",
      },
      {
        q: "九星気学と四柱推命の違いは何ですか？",
        a: "九星気学は方位や時期の吉凶に強く、四柱推命は性格や人生の流れの鑑定に強い占術です。当サービスでは両方を組み合わせています。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "tarot-ai-muryou": {
    title: "タロット AI 無料",
    description:
      "タロットの要素を取り入れたAI鑑定を無料で体験",
    faqs: [
      {
        q: "タロット占いは本当に無料ですか？",
        a: "はい。タロットの要素を取り入れたAI鑑定を1日3回まで無料でご利用いただけます。",
      },
      {
        q: "タロットカードはどのように使われますか？",
        a: "AIがタロットのアーキタイプ（元型）を四柱推命の結果と組み合わせ、より直感的な鑑定メッセージをお届けします。",
      },
      {
        q: "従来のタロット占いとの違いは何ですか？",
        a: "AIが四柱推命・九星気学の論理的な鑑定にタロットの象徴的要素を加え、より奥深い結果を提供します。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "unmei-kantei-ai": {
    title: "運命鑑定 AI",
    description:
      "あなたの星の配置からAIが運命の流れを読み解く",
    faqs: [
      {
        q: "運命鑑定では何が分かりますか？",
        a: "人生全体の流れ、転機の時期、性格の傾向、適職、恋愛傾向などをAIが総合的に鑑定します。",
      },
      {
        q: "運命は変えられますか？",
        a: "鑑定結果は傾向を示すものです。結果を参考にすることで、より良い選択ができるようになります。",
      },
      {
        q: "鑑定結果はどのくらいの文量ですか？",
        a: "AIが800〜1500文字程度の詳細な鑑定文をリアルタイムで生成します。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
  "fuufu-aishou-uranai": {
    title: "夫婦 相性占い",
    description:
      "パートナーとの相性をAIが本格分析",
    faqs: [
      {
        q: "夫婦の相性占いには何が必要ですか？",
        a: "ご夫婦それぞれの生年月日を入力するだけで鑑定できます。",
      },
      {
        q: "相性が悪い結果でも大丈夫ですか？",
        a: "鑑定結果には相性を良くするためのアドバイスも含まれます。弱点を知ることで関係改善に役立ちます。",
      },
      {
        q: "結婚前のカップルでも使えますか？",
        a: "はい。夫婦に限らず、カップルや婚約中の方も同じように相性鑑定が可能です。",
      },
    ],
    lastUpdated: "2026-03-31",
  },
};

const FEATURES = [
  {
    icon: "🔮",
    title: "AIの高精度鑑定",
    desc: "四柱推命×九星気学の理論をAIが総合分析。従来の占いより深い鑑定結果をお届け。",
  },
  {
    icon: "📊",
    title: "四柱推命×九星気学",
    desc: "東洋占術の二大体系を組み合わせることで、性格・運勢・方位を多角的に読み解きます。",
  },
  {
    icon: "✨",
    title: "毎日3回まで無料",
    desc: "登録不要で1日3回まで完全無料。生年月日を入力するだけですぐに鑑定開始。",
  },
];

export function generateStaticParams() {
  return Object.keys(KEYWORDS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const kw = KEYWORDS[slug];
  if (!kw) return {};
  return {
    title: `${kw.title}｜AI占い - 四柱推命×九星気学で本格鑑定`,
    description: kw.description,
    other: {
      "article:modified_time": kw.lastUpdated,
    },
    openGraph: {
      title: `${kw.title}｜AI占い - 四柱推命×九星気学で本格鑑定`,
      description: kw.description,
      url: `${SITE_URL}/keywords/${slug}`,
      siteName: "AI占い",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${kw.title}｜AI占い`,
      description: kw.description,
    },
    alternates: { canonical: `${SITE_URL}/keywords/${slug}` },
  };
}

export default async function KeywordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kw = KEYWORDS[slug];
  if (!kw) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: kw.title,
        url: `${SITE_URL}/keywords/${slug}`,
        description: kw.description,
        isPartOf: { "@type": "WebSite", name: "AI占い", url: SITE_URL },
      },
      {
        "@type": "FAQPage",
        "dateModified": kw.lastUpdated,
        mainEntity: kw.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-slate-950 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative px-4 pt-20 pb-16 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-2xl">
          <p className="mb-3 text-sm font-medium tracking-wider text-purple-400 uppercase">
            AI占い｜四柱推命×九星気学
          </p>
          <h1 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            {kw.title}
          </h1>
          <p className="mb-8 text-base text-white/70 sm:text-lg">
            {kw.description}
          </p>
          <Link
            href="/uranai"
            className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-bold shadow-lg shadow-purple-900/50 transition hover:scale-105 hover:shadow-xl hover:shadow-purple-900/60"
          >
            無料で占う
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          AI占いの<span className="text-purple-400">3つの特長</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
            >
              <div className="mb-3 text-4xl">{f.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-violet-400">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          よくある質問
        </h2>
        <div className="space-y-4">
          {kw.faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
            >
              <summary className="cursor-pointer px-6 py-4 text-base font-semibold text-white/90 marker:[content:''] group-open:text-purple-400">
                <span className="mr-2 text-purple-400">Q.</span>
                {f.q}
              </summary>
              <div className="px-6 pb-5 text-sm leading-relaxed text-white/70">
                <span className="mr-2 font-semibold text-pink-400">A.</span>
                {f.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA repeat */}
      <section className="px-4 py-16 text-center">
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h2 className="mb-4 text-2xl font-bold">
            今すぐ<span className="text-purple-400">無料</span>で占ってみる
          </h2>
          <p className="mb-6 text-white/60">
            登録不要・生年月日を入力するだけ
          </p>
          <Link
            href="/uranai"
            className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-bold shadow-lg shadow-purple-900/50 transition hover:scale-105 hover:shadow-xl hover:shadow-purple-900/60"
          >
            無料で占う
          </Link>
        </div>
      </section>

      {/* LastUpdated */}
      <p className="text-center text-xs text-white/40 mt-8">
        最終更新: 2026年3月31日
      </p>

      {/* CrossSell */}
      <section className="px-4 pb-20">
        <CrossSell currentService="AI占い" />
      </section>
    </main>
  );
}
