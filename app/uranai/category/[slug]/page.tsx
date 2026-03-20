import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const SITE_URL = "https://uranai-ai-sigma.vercel.app";

const CATEGORIES = {
  "love": {
    title: "恋愛占い",
    emoji: "💕",
    keyword: "love",
    description: "AI恋愛占いで今日の恋愛運・片思い・復縁・相性を無料鑑定。九星気学×干支で「彼は本気？」「告白のタイミング」「相性診断」をAIが詳細分析します。登録不要で今すぐ無料占い。",
    h1: "AI恋愛占い｜片思い・復縁・相性を無料鑑定【九星気学×干支】",
    lead: "恋愛に関するお悩みをAIが九星気学と干支で本格鑑定。片思い・復縁・相性・彼の気持ち・告白タイミングなど、恋愛のあらゆる疑問に答えます。",
    points: [
      { icon: "💑", title: "片思い・好きな人の気持ち", body: "今の彼/彼女はあなたのことをどう思っている？九星気学で相手の本心を読み解きます。" },
      { icon: "💌", title: "告白・アプローチのベストタイミング", body: "運気の流れと相性スコアから、最適な告白タイミングと成功率の高いアプローチ方法を提案。" },
      { icon: "💔", title: "復縁・別れの危機", body: "復縁の可能性と最適な行動を鑑定。別れの危機にある場合は関係修復のアドバイスも。" },
      { icon: "💍", title: "婚活・結婚の時期", body: "結婚運の高まる時期と婚活での注意点。相手の生年月日から相性スコアも算出できます。" },
    ],
    faqs: [
      { q: "片思い中の彼の気持ちがわかりますか？", a: "はい。生年月日から九星気学・干支を算出し、相手が今どんな気持ちであるか、アプローチに好意的かどうかをAIが鑑定します。相性占い機能では0〜100点の相性スコアも算出可能です。" },
      { q: "復縁できる可能性はどのくらいですか？", a: "現在の運気の流れと過去の関係性から復縁の可能性を分析します。ただし、占いはあくまで指針であり、行動することが大切です。" },
      { q: "相性占いは無料で使えますか？", a: "基本の恋愛占いは無料3回まで利用可能。相性スコア詳細・恋愛相性レポートはプレミアムプラン（¥980/月）で利用できます。" },
    ],
    relatedKeywords: ["片思い占い", "復縁占い", "相性占い無料", "彼の気持ち占い", "告白タイミング占い", "恋愛運今日", "好きな人 占い", "彼氏できる占い"],
  },
  "work": {
    title: "仕事占い",
    emoji: "💼",
    keyword: "work",
    description: "AI仕事占いで転職・昇進・職場の人間関係・副業の運気を無料鑑定。九星気学×干支でキャリアの転換点・今年の仕事運・上司との相性をAIが本格分析。登録不要で今すぐ無料占い。",
    h1: "AI仕事占い｜転職・昇進・職場の人間関係を無料鑑定【九星気学×干支】",
    lead: "転職・昇進・職場の人間関係・副業など仕事に関する悩みをAIが九星気学と干支で本格鑑定。キャリアの転換点と最適な行動タイミングをお伝えします。",
    points: [
      { icon: "🚀", title: "転職・キャリアチェンジのタイミング", body: "今が転職の好機か、もう少し待つべきか。九星気学から見た運気の流れでベストタイミングを鑑定。" },
      { icon: "📈", title: "昇進・評価アップの運気", body: "評価される時期と注意すべき時期を分析。上司へのアピール方法と昇進チャンスを活かすコツも。" },
      { icon: "🤝", title: "職場の人間関係・上司との相性", body: "職場の人間関係のトラブル解決策と、上司・同僚との相性スコアを算出。円滑な職場環境のために。" },
      { icon: "💡", title: "副業・独立・起業の吉凶", body: "副業を始めるべきか、独立の適期はいつか。あなたの運気と才能から最適な副業・起業タイミングを鑑定。" },
    ],
    faqs: [
      { q: "転職するべきか迷っています。占いで分かりますか？", a: "現在の仕事運の流れ・転換点の時期・新しい環境との相性をAIが分析します。転職に適した運気かどうかの判断材料になります。" },
      { q: "職場での人間関係のトラブルを解決できますか？", a: "特定の相手との相性占いで、人間関係がうまくいかない原因と改善策をAIが提示します。コミュニケーションの取り方のヒントも得られます。" },
      { q: "副業・起業の占いはできますか？", a: "はい。今年の仕事運・財運の流れと、あなたの九星気学上の才能分野から、副業・起業に適したタイミングと分野を鑑定できます。" },
    ],
    relatedKeywords: ["転職占い", "仕事運 今年", "キャリア占い", "仕事運 無料", "職場人間関係 占い", "昇進 占い", "副業 占い", "起業 運気"],
  },
  "money": {
    title: "金運占い",
    emoji: "💰",
    keyword: "money",
    description: "AI金運占いで今年・今月の金運・宝くじ当選・投資の吉凶・金運アップ方法を無料鑑定。九星気学×干支で収入アップのタイミング・浪費注意時期をAIが本格分析。登録不要で今すぐ。",
    h1: "AI金運占い｜収入アップ・宝くじ・投資の吉凶を無料鑑定【九星気学×干支】",
    lead: "お金に関するあらゆる悩みをAIが九星気学と干支で本格鑑定。収入アップの時期・投資の吉凶・宝くじの当選運・浪費注意時期を詳しく分析します。",
    points: [
      { icon: "💴", title: "収入アップ・臨時収入の時期", body: "給与アップや臨時収入が入りやすい時期を九星気学から算出。金運の高まりを最大限に活かすアドバイス。" },
      { icon: "📊", title: "投資・資産運用の吉凶判断", body: "株・FX・不動産・仮想通貨など投資判断の参考に。今が攻めの時期か守りの時期かを運気で分析。" },
      { icon: "🎰", title: "宝くじ・ギャンブルの当選運", body: "金運の波が高まる吉日と注意日を算出。宝くじ購入・馬券購入などのベストタイミングを鑑定。" },
      { icon: "🛡️", title: "浪費・散財・詐欺の注意時期", body: "金運が下がりやすい時期に潜む浪費・詐欺リスクを事前に把握して防衛策を取りましょう。" },
    ],
    faqs: [
      { q: "今年の金運はどうですか？", a: "生年月日から九星気学・干支を算出し、今年の金運の流れ・収入アップの時期・注意すべき時期をAIが詳しく鑑定します。" },
      { q: "投資を始めるべきか占いで分かりますか？", a: "現在の財運の流れと、あなたの九星気学上の金運タイプから投資への適性と今が適切な時期かどうかを分析します。" },
      { q: "金運アップの方法を教えてもらえますか？", a: "はい。九星気学から見たラッキーカラー・ラッキーアイテム・金運アップに効果的な行動を毎月更新してお伝えします。" },
    ],
    relatedKeywords: ["金運占い無料", "今年の金運", "金運アップ 方法", "宝くじ 当選 占い", "投資 吉日 占い", "臨時収入 占い", "お金 引き寄せ 占い", "財運 九星気学"],
  },
  "health": {
    title: "健康運占い",
    emoji: "🌿",
    keyword: "health",
    description: "AI健康運占いで今月の体調変化・病気・ストレス・体力の流れを無料鑑定。九星気学×干支で注意すべき時期・養生のタイミング・ダイエット吉日をAIが本格分析。登録不要で無料占い。",
    h1: "AI健康運占い｜体調・ストレス・病気リスクを無料鑑定【九星気学×干支】",
    lead: "健康・体調に関するお悩みをAIが九星気学と干支で本格鑑定。体調が崩れやすい時期・病気のリスク・ストレス解消のアドバイスを詳しくお伝えします。",
    points: [
      { icon: "🏥", title: "体調変化・病気リスクの予測", body: "健康運が下がる時期を事前に把握して予防策を。注意すべき体の部位や病気リスクを九星気学で鑑定。" },
      { icon: "🧘", title: "ストレス・メンタルヘルスの管理", body: "精神的に消耗しやすい時期とその対処法を鑑定。自分に合ったストレス解消法と心身のリカバリータイミング。" },
      { icon: "🏃", title: "ダイエット・運動開始の吉日", body: "健康運・体力の流れから最適なダイエット開始時期・運動習慣をつけるべきタイミングを算出。" },
      { icon: "😴", title: "睡眠・養生・休息の重要時期", body: "無理をするとダウンしやすい時期を知り、適切な休息を取ることで運気の低迷を最小限に抑えます。" },
    ],
    faqs: [
      { q: "体調不良が続いています。健康運で原因が分かりますか？", a: "九星気学から健康運の流れを分析し、今の体調不良の時期的な背景と回復のタイミングをお伝えします。医療的な診断ではありませんが、養生の指針になります。" },
      { q: "ダイエットを始めるタイミングを占えますか？", a: "はい。今年の健康運の流れと体力が増す時期から、ダイエット・新しい運動習慣を始めるベストタイミングを鑑定します。" },
      { q: "精神的に辛い時期はいつ終わりますか？", a: "九星気学でメンタルが落ち込みやすい時期とその終わりの時期を算出。次に運気が上がるタイミングとその間の過ごし方をアドバイスします。" },
    ],
    relatedKeywords: ["健康運 占い", "体調 占い 無料", "病気 占い 九星気学", "ダイエット 吉日", "ストレス解消 占い", "メンタルヘルス 占い", "養生 時期 占い", "体調不良 いつ治る"],
  },
  "general": {
    title: "今日の運勢",
    emoji: "⭐",
    keyword: "general",
    description: "AI占いで今日の運勢・総合運を無料鑑定。九星気学×干支でラッキーカラー・ラッキーアイテム・注意事項・今日のアドバイスをAIが本格分析。登録不要で毎日の運勢チェック。",
    h1: "AI今日の運勢｜総合運・ラッキーアイテムを無料鑑定【九星気学×干支】",
    lead: "毎日の運勢をAIが九星気学と干支で本格鑑定。総合運・恋愛運・仕事運・金運・健康運の6軸レーダーチャートとラッキーカラー・今日のアドバイスをお届けします。",
    points: [
      { icon: "🔮", title: "6軸レーダーチャートで運気を可視化", body: "恋愛・仕事・金運・健康・対人・学習の6つの運気軸をヘキサゴンチャートで一目で確認。どの運気が高いか低いかがひと目で分かります。" },
      { icon: "🌈", title: "今日のラッキーカラー・ラッキーアイテム", body: "九星気学と干支から導き出した今日のラッキーカラー・ラッキーナンバー・ラッキーアイテムで運気をアップ。" },
      { icon: "📅", title: "月間運気予報カレンダー", body: "今月の運気の波を先読みして、大切な予定は運気の良い日に。吉日・注意日がひと目で分かるカレンダー。" },
      { icon: "✨", title: "今日のメッセージ・アドバイス", body: "AIが今日のあなたに最適なアドバイスと注意点をパーソナライズして提示。毎日新しいメッセージでモチベーションアップ。" },
    ],
    faqs: [
      { q: "毎日無料で運勢を見られますか？", a: "無料プランでは1日1回（3回まで）今日の運勢を鑑定できます。プレミアムプラン（¥980/月）で回数無制限・全カテゴリ占い放題になります。" },
      { q: "九星気学とは何ですか？", a: "九星気学は古代中国の「洛書」に由来する日本の伝統的な占術です。生年月日から一白水星・二黒土星など9種の星に分類され、その年の運気の流れや相性を分析します。" },
      { q: "干支占いと何が違いますか？", a: "本サービスは九星気学と干支を組み合わせた複合鑑定です。干支だけでは分からない細かな運気の波・相性の相互作用をAIが総合的に分析します。" },
    ],
    relatedKeywords: ["今日の運勢 無料", "運勢 占い 九星気学", "ラッキーカラー 今日", "総合運 今日", "運勢 干支", "今日の運勢 当たる", "無料占い 今日", "占い 登録不要"],
  },
} as const;

type Slug = keyof typeof CATEGORIES;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES[slug as Slug];
  if (!cat) return {};
  return {
    title: `${cat.h1}｜AI占い`,
    description: cat.description,
    openGraph: {
      title: `${cat.h1}｜AI占い`,
      description: cat.description,
      url: `${SITE_URL}/uranai/category/${slug}`,
      siteName: "AI占い",
      locale: "ja_JP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.h1}｜AI占い`,
      description: cat.description,
    },
    alternates: { canonical: `${SITE_URL}/uranai/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = CATEGORIES[slug as Slug];
  if (!cat) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": cat.h1,
        "url": `${SITE_URL}/uranai/category/${slug}`,
        "description": cat.description,
        "isPartOf": { "@type": "WebSite", "name": "AI占い", "url": SITE_URL },
      },
      {
        "@type": "FAQPage",
        "mainEntity": cat.faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0a1e] via-[#1a0f3c] to-[#0d0a1e] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="pt-12 pb-8 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">{cat.emoji}</div>
          <h1 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">{cat.h1}</h1>
          <p className="text-purple-200 text-sm md:text-base leading-relaxed mb-6">{cat.lead}</p>
          <Link
            href="/uranai"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl shadow-purple-900/60 transition-all duration-200 active:scale-95"
          >
            {cat.emoji} {cat.title}を今すぐ無料鑑定
          </Link>
          <p className="text-purple-400 text-xs mt-2">登録不要・無料3回・今すぐ結果表示</p>
        </div>
      </section>

      {/* 特徴4点 */}
      <section className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-purple-200 text-center mb-4">AI占い {cat.title}でわかること</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cat.points.map((p, i) => (
            <div key={i} className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4">
              <div className="text-2xl mb-2">{p.icon}</div>
              <h3 className="font-bold text-white text-sm mb-1">{p.title}</h3>
              <p className="text-purple-200 text-xs leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 他のカテゴリへの内部リンク */}
      <section className="max-w-2xl mx-auto px-4 py-4">
        <h2 className="text-sm font-bold text-purple-300 text-center mb-3">他のカテゴリで占う</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {Object.entries(CATEGORIES)
            .filter(([s]) => s !== slug)
            .map(([s, c]) => (
              <Link
                key={s}
                href={`/uranai/category/${s}`}
                className="bg-purple-900/40 border border-purple-500/30 hover:border-purple-400/60 text-purple-200 text-xs px-3 py-2 rounded-full transition-colors"
              >
                {c.emoji} {c.title}
              </Link>
            ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-purple-200 text-center mb-4">{cat.title}についてよくある質問</h2>
        <div className="space-y-3">
          {cat.faqs.map((faq, i) => (
            <div key={i} className="bg-purple-900/30 border border-purple-500/20 rounded-xl p-4">
              <div className="font-bold text-white text-sm mb-2">Q. {faq.q}</div>
              <div className="text-purple-200 text-xs leading-relaxed">A. {faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 関連キーワード（SEO） */}
      <section className="max-w-2xl mx-auto px-4 py-4">
        <h2 className="text-xs font-bold text-purple-400 mb-2">関連キーワード</h2>
        <div className="flex flex-wrap gap-2">
          {cat.relatedKeywords.map((kw, i) => (
            <span key={i} className="text-xs text-purple-400 bg-purple-900/20 border border-purple-800/30 px-2 py-1 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="max-w-2xl mx-auto px-4 py-8 text-center">
        <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 rounded-2xl p-6">
          <div className="text-3xl mb-3">{cat.emoji}</div>
          <h2 className="text-lg font-black text-white mb-2">今すぐ{cat.title}を体験</h2>
          <p className="text-purple-200 text-xs mb-4">生年月日を入力するだけ。AI鑑定結果が即表示されます。</p>
          <Link
            href="/uranai"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-xl text-base shadow-xl transition-all duration-200 active:scale-95"
          >
            無料で{cat.title}を始める →
          </Link>
          <div className="flex justify-center gap-4 mt-3 text-xs text-purple-400">
            <span>✓ 登録不要</span>
            <span>✓ 無料3回</span>
            <span>✓ 即時表示</span>
          </div>
        </div>
      </section>

      {/* Footer nav */}
      <footer className="border-t border-purple-900/40 py-6 px-4 text-center">
        <div className="flex flex-wrap justify-center gap-4 text-xs text-purple-400">
          <Link href="/" className="hover:text-purple-200">トップページ</Link>
          <Link href="/uranai" className="hover:text-purple-200">AI占いを始める</Link>
          <Link href="/legal" className="hover:text-purple-200">特定商取引法</Link>
          <Link href="/privacy" className="hover:text-purple-200">プライバシーポリシー</Link>
        </div>
        <p className="text-purple-600 text-xs mt-3">© 2025 AI占い. All rights reserved.</p>
      </footer>
    </div>
  );
}
