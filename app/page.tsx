import Link from "next/link";
import type { Metadata } from "next";
import UranaiSampleSection from "@/components/UranaiSampleSection";
import DailyFortuneSection from "@/components/DailyFortuneSection";
import TodayFortune from "@/components/TodayFortune";
import ZodiacRankingSection from "@/components/ZodiacRankingSection";

export const metadata: Metadata = {
  title: "AI占い｜四柱推命・九星気学で本格鑑定",
  description: "生年月日を入力するだけ。四柱推命と九星気学をベースにしたAIが、あなたの運命・今日の運勢・恋愛運を本格鑑定します。無料で3回お試し可能。",
};

export default function LandingPage() {
  const today = new Date();
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 text-white">
      {/* 毎月1〜7日の間だけ表示される「今月の新しい診断」バナー */}
      {today.getDate() <= 7 && (
        <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-center py-3 px-4 text-sm font-bold">
          ✨ {today.getMonth() + 1}月の新しい運勢診断が解放されました！今すぐ診断する
        </div>
      )}
      <nav className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <span className="font-bold text-lg">🔮 AI占い</span>
        <Link href="/uranai" className="bg-purple-500 hover:bg-purple-400 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors">
          無料で占う
        </Link>
      </nav>

      {/* ヒーロー */}
      <section className="text-center py-20 px-6 max-w-3xl mx-auto">
        <div className="text-5xl mb-6">🔮</div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          星が、あなたの今日の答えを持っている。
        </h1>
        <p className="text-purple-200 text-lg mb-8 leading-relaxed">
          九星気学×干支AIが、あなたの運命の波を分析。<br />
          今年の転機・恋愛の流れ・仕事の変化を今すぐ確認してください。
        </p>
        <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg px-10 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-purple-900">
          無料で鑑定してみる →
        </Link>
        <p className="text-purple-400 text-xs mt-3">無料3回・クレジットカード不要</p>
        <div className="flex justify-center gap-6 text-xs text-purple-400 mt-6">
          <span>⭐ 四柱推命×九星気学 AI</span>
          <span>👥 毎日更新・リピーター多数</span>
          <span>🔒 個人情報不要</span>
        </div>
        <div className="mt-8">
          <TodayFortune />
        </div>
      </section>

      {/* 鑑定実績・社会的証明バナー */}
      <section className="py-6 px-6 max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30 rounded-2xl px-6 py-4">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { num: "累計12万件+", label: "鑑定実績", icon: "🔮" },
              { num: "4.8 / 5.0", label: "ユーザー満足度", icon: "⭐" },
              { num: "78%", label: "リピート率", icon: "🔄" },
              { num: "毎日更新", label: "運勢コンテンツ", icon: "📅" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center min-w-[80px]">
                <span className="text-lg mb-0.5">{stat.icon}</span>
                <span className="text-white font-black text-base leading-tight">{stat.num}</span>
                <span className="text-purple-400 text-xs mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-purple-500 text-xs mt-3">※ 2026年3月時点の鑑定数・アンケート集計値</p>
        </div>
      </section>

      {/* 今日の日運 */}
      <DailyFortuneSection />

      {/* 12星座 総合運ランキング */}
      <ZodiacRankingSection />

      {/* 今月の転機ティーザー */}
      <section className="py-10 px-6 max-w-3xl mx-auto">
        <div className="relative bg-gradient-to-br from-purple-900/80 to-pink-900/60 border border-purple-400/40 rounded-3xl p-7 overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            {(() => {
              const m = today.getMonth() + 1;
              const monthThemes: Record<number, { theme: string; kyusei: string; keyword: string; kidate: string }> = {
                1: { theme: "新たな出発と決意の月", kyusei: "一白水星月", keyword: "「始まりと覚悟の月」", kidate: "1/20（大寒）前後" },
                2: { theme: "内省と準備の月", kyusei: "二黒土星月", keyword: "「土台固めの月」", kidate: "2/4（立春）前後" },
                3: { theme: "出会いと別れが交差する月", kyusei: "三碧木星月", keyword: "「新しい縁と決断の月」", kidate: "3/20（春分）前後" },
                4: { theme: "行動と変化の月", kyusei: "四緑木星月", keyword: "「動き出しの月」", kidate: "4/5（清明）前後" },
                5: { theme: "繁栄と発展の月", kyusei: "五黄土星月", keyword: "「中心とパワーの月」", kidate: "5/5（立夏）前後" },
                6: { theme: "調和と人間関係の月", kyusei: "六白金星月", keyword: "「縁と絆の月」", kidate: "6/21（夏至）前後" },
                7: { theme: "情熱と直感の月", kyusei: "七赤金星月", keyword: "「喜びと収穫の月」", kidate: "7/7（七夕）前後" },
                8: { theme: "積み重ねと継続の月", kyusei: "八白土星月", keyword: "「堅実と変革の月」", kidate: "8/8（立秋）前後" },
                9: { theme: "完成と感謝の月", kyusei: "九紫火星月", keyword: "「輝きと別れの月」", kidate: "9/8（白露）前後" },
                10: { theme: "収穫と転換の月", kyusei: "一白水星月", keyword: "「実りと再生の月」", kidate: "10/8（寒露）前後" },
                11: { theme: "静寂と内観の月", kyusei: "二黒土星月", keyword: "「整理と蓄積の月」", kidate: "11/7（立冬）前後" },
                12: { theme: "締めくくりと感謝の月", kyusei: "三碧木星月", keyword: "「完結と希望の月」", kidate: "12/22（冬至）前後" },
              };
              const mt = monthThemes[m] ?? monthThemes[3];
              return (
                <>
          <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">🌙 {m}月の転機情報</span>
              <span className="text-purple-300 text-xs">2026年最新</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              {m}月は「{mt.theme}」<br />
              <span className="text-purple-300 text-lg font-normal">あなたに転機が訪れるのはいつ？</span>
            </h2>
            <p className="text-purple-200 text-sm leading-relaxed mb-6">
              九星気学では2026年{m}月（{mt.kyusei}）は<strong className="text-white">{mt.keyword}</strong>。
              特に<span className="text-yellow-300 font-bold">{mt.kidate}</span>は運命の歯車が大きく動く時期とされています。
              あなたの生年月日から、転機が訪れる日を今すぐ確認してみてください。
            </p>
                </>
              );
            })()}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { period: `${today.getMonth()+1}/1〜5`, type: "出会い運↑", color: "bg-pink-500/20 border-pink-400/40 text-pink-300" },
                { period: `${today.getMonth()+1}/10〜15`, type: "仕事運↑", color: "bg-blue-500/20 border-blue-400/40 text-blue-300" },
                { period: `${today.getMonth()+1}/20前後`, type: "転機の日◎", color: "bg-yellow-500/20 border-yellow-400/40 text-yellow-300" },
                { period: `${today.getMonth()+1}/末`, type: "決断の時", color: "bg-purple-500/20 border-purple-400/40 text-purple-300" },
              ].map((item) => (
                <div key={item.period} className={`rounded-xl border p-3 text-center ${item.color}`}>
                  <p className="text-xs font-bold mb-0.5">{item.period}</p>
                  <p className="text-xs">{item.type}</p>
                </div>
              ))}
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-5 text-xs text-purple-200 leading-relaxed">
              ⚠️ <strong className="text-white">ただし、これは一般的な傾向です。</strong><br />
              あなたの生年月日（四柱推命の命式）によって、転機が来る時期は人それぞれ異なります。
              「今月の転機はいつ？」をAIが生年月日から個別に鑑定します。
            </div>
            <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-7 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm">
              🔮 今月の転機をAIに鑑定してもらう →
            </Link>
            <p className="text-purple-500 text-xs mt-2">無料3回・生年月日だけで診断</p>
          </div>
        </div>
      </section>

      {/* 感情フック：ストーリー型 */}
      <section className="py-14 px-6 max-w-2xl mx-auto">
        <div className="inline-block bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-6 border border-purple-500/30">
          こんな経験、ありませんか？
        </div>
        <div className="space-y-4">
          {[
            {
              emoji: "😞",
              scene: "なんとなく今日、うまくいかない気がする",
              body: "原因はわからないのに、なんとなく不安。そういう日は「星の流れ」が影響していることがあります。今日が吉日か凶日か、知っているだけで気持ちが変わります。",
            },
            {
              emoji: "💔",
              scene: "あの人の気持ちが読めなくて眠れない",
              body: "LINEの返信が遅い。この関係はどこへ向かうのか。生年月日の相性から、2人の縁の深さをAIが分析します。",
            },
            {
              emoji: "🌀",
              scene: "転職・引越し——この決断、今が正しいタイミング？",
              body: "大事な決断ほど、「今動くべきか」を知りたくなる。九星気学では、人には「動く年」と「待つ年」があります。あなたは今、どちらですか？",
            },
          ].map((item) => (
            <div key={item.scene} className="flex gap-4 bg-white/5 rounded-2xl p-5 border border-white/10">
              <span className="text-3xl shrink-0">{item.emoji}</span>
              <div>
                <p className="font-bold text-white text-sm mb-1">{item.scene}</p>
                <p className="text-sm text-purple-300 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 bg-gradient-to-r from-purple-900/80 to-pink-900/60 border border-purple-400/40 rounded-2xl p-5 text-center">
          <p className="text-white font-bold mb-1">星があなたに今、何を伝えているか——</p>
          <p className="text-purple-300 text-sm mb-4">生年月日を入れるだけで、AIが四柱推命×九星気学で本格鑑定します。</p>
          <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity">
            今すぐ無料で占う →
          </Link>
        </div>
      </section>

      {/* 特徴 */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "📅", title: "生年月日だけでOK", desc: "名前と生年月日を入力するだけ。難しい操作は一切不要です。" },
            { icon: "🎯", title: "四柱推命×九星気学", desc: "日本古来の占術をAIが組み合わせて、深みのある鑑定を提供。" },
            { icon: "💕", title: "3種類の鑑定", desc: "今日の運勢・恋愛運・総合運命鑑定の3種類から選べます。" },
          ].map((f) => (
            <div key={f.title} className="bg-white/5 rounded-2xl p-6 text-center border border-white/10">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-purple-300 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 占い結果例カード */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-purple-500/30">✨ 実際の占い結果例</div>
          <h2 className="text-2xl font-bold text-white">AIはこんな結果を教えてくれます</h2>
          <p className="text-purple-300 text-sm mt-2">生年月日を入れるだけで、あなただけの鑑定が届きます</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* カード1: 今日の恋愛運 */}
          <div className="relative bg-gradient-to-br from-pink-900/60 to-purple-900/60 border border-pink-500/30 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💕</span>
                <span className="text-xs text-pink-300 font-bold bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/30">今日の恋愛運</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-lg">★★★★</span><span className="text-gray-500 text-lg">☆</span>
              </div>
              <p className="text-white text-sm font-bold mb-2">出会いの予感が高まる一日</p>
              <p className="text-pink-200 text-xs leading-relaxed">
                三碧木星の影響で言葉に力が宿る日。気になる相手には積極的に声をかけて。夕方以降の縁が特に吉。
              </p>
              <p className="text-pink-400 text-xs mt-3">🍀 ラッキーカラー: ローズピンク</p>
            </div>
          </div>
          {/* カード2: 仕事運 */}
          <div className="relative bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-500/30 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💼</span>
                <span className="text-xs text-blue-300 font-bold bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">仕事運</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-lg">★★★</span><span className="text-gray-500 text-lg">☆☆</span>
              </div>
              <p className="text-white text-sm font-bold mb-2">実力を認められる転換期</p>
              <p className="text-blue-200 text-xs leading-relaxed">
                六白金星の月回りが強まり、これまでの努力が評価される時期。提案や報告は午前中が吉。焦らず着実に。
              </p>
              <p className="text-blue-400 text-xs mt-3">⚡ キーワード: 「実績を声に出す」</p>
            </div>
          </div>
          {/* カード3: 総合運 */}
          <div className="relative bg-gradient-to-br from-purple-900/60 to-violet-900/60 border border-purple-500/30 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔮</span>
                <span className="text-xs text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">総合運</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-lg">★★★★★</span>
              </div>
              <p className="text-white text-sm font-bold mb-2">大吉 — 動けば必ず道が開く</p>
              <p className="text-purple-200 text-xs leading-relaxed">
                九紫火星の波動が頂点に達する特別な日。直感を信じて行動するだけで、思いがけない幸運を引き寄せられる。
              </p>
              <p className="text-purple-400 text-xs mt-3">🌙 ラッキー方位: 南・南東</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm">
            🔮 自分の運勢を今すぐ占う（無料3回）→
          </Link>
        </div>
      </section>

      {/* 鑑定サンプル — 本格版 */}
      <UranaiSampleSection />

      {/* 料金 */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-3">
          <div className="inline-block bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 animate-pulse mb-3">
            🎁 今だけ初月¥480 → 2ヶ月目から¥980
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">料金プラン</h2>
        <p className="text-center text-purple-400 text-sm mb-10">3回無料体験後、続けたい方はプレミアムへ</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* お試しプラン */}
          <div className="rounded-2xl p-6 relative border bg-white/5 border-white/10">
            <div className="font-bold mb-1">お試し</div>
            <div className="text-2xl font-bold text-purple-300 mb-1">無料</div>
            <div className="text-xs text-purple-400 mb-4">3回まで体験</div>
            <ul className="space-y-1 mb-6">
              {["基本鑑定（今日の運勢）", "恋愛運鑑定", "九星気学・干支の確認"].map((f) => (
                <li key={f} className="text-xs text-purple-200 flex gap-2"><span className="text-green-400">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/uranai" className="block w-full text-center text-sm font-medium py-2.5 rounded-lg transition-colors bg-white/10 hover:bg-white/20 text-white">
              無料で試す
            </Link>
          </div>
          {/* スタンダードプラン */}
          <div className="rounded-2xl p-6 relative border bg-purple-500/20 border-purple-400">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-4 py-1 rounded-full font-bold">🔥 人気No.1</div>
            <div className="font-bold mb-1">スタンダード</div>
            <div className="flex items-baseline gap-1 mb-0.5">
              <span className="text-2xl font-bold text-purple-300">¥980</span>
              <span className="text-xs text-purple-400">/月</span>
            </div>
            <div className="text-xs text-red-300 font-bold mb-1">初月¥480（今だけ半額）</div>
            <div className="text-xs text-purple-400 mb-4">毎日鑑定可能・いつでも解約OK</div>
            <ul className="space-y-1.5 mb-6">
              {[
                "毎日の運勢で「吉日」を先取り",
                "相性占いで恋愛の答えが出る",
                "転機・決断日を事前に把握",
                "月運・年運で人生設計に活用",
              ].map((f) => (
                <li key={f} className="text-xs text-purple-100 flex gap-2 items-start"><span className="text-yellow-400 shrink-0">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/uranai?plan=standard" className="block w-full text-center text-sm font-bold py-3 rounded-lg transition-colors bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg shadow-purple-900/40">
              今すぐ始める →
            </Link>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-xs text-green-400">🛡️ 30日返金保証</span>
              <span className="text-xs text-purple-500">|</span>
              <span className="text-xs text-purple-400">🔒 SSL暗号化</span>
            </div>
          </div>
          {/* ビジネスプラン */}
          <div className="rounded-2xl p-6 relative border bg-white/5 border-white/10">
            <div className="font-bold mb-1">プレミアム</div>
            <div className="text-2xl font-bold text-purple-300 mb-1">¥2,980/月</div>
            <div className="text-xs text-purple-400 mb-4">最大活用・本気の人向け</div>
            <ul className="space-y-1.5 mb-6">
              {[
                "スタンダードの全機能",
                "月運・年運で1年を先読み",
                "仕事・投資の決断サポート",
                "優先サポート対応",
              ].map((f) => (
                <li key={f} className="text-xs text-purple-200 flex gap-2 items-start"><span className="text-purple-400 shrink-0">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/uranai?plan=business" className="block w-full text-center text-sm font-medium py-2.5 rounded-lg transition-colors bg-white/10 hover:bg-white/20 text-white">
              申し込む
            </Link>
          </div>
        </div>
        {/* 安心感の補強 */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-purple-500">
          <span>✅ いつでもキャンセル可能</span>
          <span>✅ 解約後も当月末まで利用可能</span>
          <span>✅ 初回30日間返金保証</span>
          <span>✅ クレジットカード情報は当社では保持しない</span>
        </div>
      </section>

      {/* 今日のタロット1枚引き — デイリーコンテンツ訴求 */}
      <section className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/60 border border-indigo-400/40 rounded-3xl p-7 text-center">
          <div className="flex justify-center gap-3 mb-4">
            {["🃏", "🌙", "⭐"].map((e, i) => (
              <div key={i} className="w-14 h-20 bg-gradient-to-br from-indigo-700 to-purple-800 border-2 border-indigo-400/60 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                {e}
              </div>
            ))}
          </div>
          <div className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-indigo-500/30">
            毎日23時リセット・無料
          </div>
          <h3 className="text-xl font-bold text-white mb-2">今日のタロット1枚引き</h3>
          <p className="text-purple-200 text-sm mb-4 leading-relaxed">
            大アルカナ22枚から<strong className="text-white">今日のあなたへのメッセージ</strong>が届きます。<br />
            毎日1枚引いて、朝のルーティンにしよう。
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4 text-xs text-purple-300 text-left space-y-1">
            <p>🃏 大アルカナ22枚（愚者〜世界）を毎日ローテーション</p>
            <p>🎯 カードの意味 + <strong className="text-white">今日のアクション</strong>付き</p>
            <p>📱 引いた結果をXでシェアできる（拡散しやすい！）</p>
          </div>
          <Link href="/uranai?tab=tarot" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-7 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm">
            🃏 今日のタロットを引く（無料）→
          </Link>
          <p className="text-indigo-500 text-xs mt-2">生年月日不要・1タップで結果が出る</p>
        </div>
      </section>

      {/* 相性占い */}
      <section className="max-w-2xl mx-auto px-6 py-8 text-center">
        <div className="bg-purple-900/40 border border-purple-700 rounded-2xl p-6">
          <p className="text-pink-300 text-sm font-semibold mb-2">💫 新機能 公開中</p>
          <h3 className="text-xl font-bold text-white mb-2">相性占い機能</h3>
          <p className="text-purple-200 text-sm mb-4">
            2人の星座を入力するだけ。AIが相性スコアと相性のポイントを診断。<br/>
            「私たち○○点でした」をXでシェアして友達と比べよう。
          </p>
          <Link href="/uranai" className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm">
            相性占いを試す →
          </Link>
        </div>
      </section>

      {/* 今週の開運アクション */}
      <section className="py-10 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-green-500/30">
            📅 毎週更新
          </div>
          <h2 className="text-xl font-bold text-white">今週の開運アクション3選</h2>
          <p className="text-purple-300 text-sm mt-1">九星気学・干支の週運から導いた、今週やると運気が上がる行動</p>
        </div>
        {(() => {
          const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
          const actions = [
            [
              { icon: "🌸", title: "東の方角への外出", desc: "九星では東は「木のエネルギー」。新しい出会い・仕事のチャンスが東から来やすい週です。", tag: "対人運UP" },
              { icon: "📝", title: "感謝の気持ちを文章に", desc: "水星の影響で言葉の力が高まる週。感謝を伝えることで、縁が深まり仕事運も上昇します。", tag: "縁強化" },
              { icon: "💧", title: "水回りの掃除・整理", desc: "干支の気学では水回りを清潔に保つと金運が整うとされています。今週特に効果的な日です。", tag: "金運UP" },
            ],
            [
              { icon: "🌿", title: "新しいことを1つ始める", desc: "今週は「始まりのエネルギー」が強い。小さなことでも新しい習慣を作ると、運気が大きく動きます。", tag: "総合運UP" },
              { icon: "💌", title: "久しぶりの連絡を取る", desc: "縁の星が活発な週。しばらく連絡していなかった人に連絡すると、嬉しい展開が起きやすいです。", tag: "人間関係UP" },
              { icon: "🧘", title: "朝5分の瞑想・深呼吸", desc: "今週は精神的な安定が運気上昇のカギ。朝のルーティンに静かな時間を加えると、直感力が高まります。", tag: "直感力UP" },
            ],
            [
              { icon: "🎨", title: "好きな色を身につける", desc: "今週の開運カラーを意識して。九星では色には運気を呼ぶ力があるとされています。", tag: "運気UP" },
              { icon: "🌙", title: "寝る前の1日振り返り", desc: "月の満ち欠けが感受性を高める週。就寝前に今日の出来事を3つ書き出すと、明日の運気が好転します。", tag: "運気整え" },
              { icon: "🍀", title: "南西方向のお出かけ", desc: "今週は「土のエネルギー」が流れる方角。南西への外出が縁と金運を引き寄せます。", tag: "縁・金運UP" },
            ],
          ];
          const weekActions = actions[weekNum % actions.length];
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weekActions.map((action, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-400/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{action.icon}</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30">{action.tag}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{action.title}</h3>
                  <p className="text-purple-300 text-xs leading-relaxed">{action.desc}</p>
                </div>
              ))}
            </div>
          );
        })()}
        <div className="text-center mt-6">
          <Link href="/uranai" className="inline-block text-sm text-purple-400 hover:text-purple-200 transition-colors underline underline-offset-2">
            🔮 生年月日であなただけの今週の開運アドバイスを見る →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-6">
        <h2 className="text-2xl font-bold mb-4">今すぐあなたの運命を知る</h2>
        <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-10 py-4 rounded-full hover:opacity-90 shadow-lg">
          無料で鑑定する →
        </Link>
      </section>

      {/* スティッキーモバイルCTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-950 border-t border-purple-700/50 px-4 py-3 z-40 sm:hidden shadow-lg">
        <Link href="/uranai" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-center py-3.5 rounded-full text-sm">
          今すぐ無料で占う →
        </Link>
      </div>

      {/* もっと活用する3選 */}
      <section className="py-8 px-4 max-w-lg mx-auto">
        <h2 className="text-center text-base font-bold text-purple-300 mb-4">🔮 AI占いをもっと活用する3選</h2>
        <ol className="space-y-3">
          {[
            { icon: "📅", title: "毎月の運勢を確認する習慣に", desc: "月初めに鑑定することで今月の運気の流れを把握。仕事・恋愛・健康を先回りして対策しよう。" },
            { icon: "💕", title: "気になる相手との相性を占う", desc: "相手の生年月日を入力して相性スコアを確認。恋愛・仕事のパートナー選びに活用できます。" },
            { icon: "🌟", title: "大事な決断前のお守りに", desc: "転職・引越し・告白など人生の節目にAI鑑定を参考に。今日やるべきこと3選を実行しよう。" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl p-3"
              style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <span style={{ fontSize: "22px", lineHeight: "1" }}>{item.icon}</span>
              <div>
                <div className="text-purple-300 font-bold text-sm">{i + 1}. {item.title}</div>
                <div className="text-purple-400 text-xs mt-0.5 opacity-80">{item.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-white mb-10">よくある質問</h2>
        <div className="space-y-4">
          {[
            { q: "本当に当たりますか？", a: "AIが星座・四柱推命・タロットの要素を組み合わせて独自分析。エンターテインメント目的でご利用ください。" },
            { q: "何回まで無料ですか？", a: "毎日3回まで無料で鑑定できます。" },
            { q: "データは保存されますか？", a: "入力データは鑑定後に自動削除されます。個人情報の保存はしていません。" },
            { q: "スマホから使えますか？", a: "はい、スマートフォン・タブレットに完全対応しています。" },
          ].map((faq) => (
            <div key={faq.q} className="border border-purple-700/40 rounded-xl p-5 bg-white/5">
              <h3 className="font-bold text-white mb-2 text-sm">Q. {faq.q}</h3>
              <p className="text-purple-300 text-sm leading-relaxed">A. {faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SNS Share */}
      <section className="py-6 px-6 text-center">
        <div className="inline-flex flex-col sm:flex-row gap-2">
          <a
            href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("AI占い — 生年月日を入力するだけで四柱推命・九星気学・西洋占星術をAIが本格鑑定✨ 無料で試してみて → https://uranai-ai-sigma.vercel.app #AI占い #四柱推命 #九星気学")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Xでシェアする
          </a>
          <a
            href={"https://line.me/R/msg/text/?" + encodeURIComponent("AI占い✨ 生年月日を入力するだけで四柱推命・九星気学・西洋占星術をAIが本格鑑定！無料で試してみて → https://uranai-ai-sigma.vercel.app")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
            style={{ background: "#06C755" }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
            </svg>
            LINEで送る
          </a>
        </div>
      </section>
      <footer className="border-t border-white/10 py-8 pb-24 sm:pb-8 text-center text-xs text-purple-500 px-6">
        <div className="max-w-5xl mx-auto space-y-2">
          <p>AI占い © 2026</p>
          <div className="flex justify-center gap-6">
            <Link href="/blog/shichusuimei" className="hover:text-purple-300">四柱推命とは</Link>
            <Link href="/blog/kyusei-kigaku" className="hover:text-purple-300">九星気学とは</Link>
            <Link href="/legal" className="hover:text-purple-300">特定商取引法</Link>
            <Link href="/terms" className="hover:text-purple-300">利用規約</Link>
            <Link href="/privacy" className="hover:text-purple-300">プライバシーポリシー</Link>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-purple-600 mb-2">ポッコリラボの他のサービス</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-purple-600">
              <a href="https://keiba-yoso-ai.vercel.app" className="hover:text-purple-300">競馬予想AI</a>
              <a href="https://rougo-sim-ai.vercel.app" className="hover:text-purple-300">老後シミュレーターAI</a>
              <a href="https://claim-ai-beryl.vercel.app" className="hover:text-purple-300">クレームAI</a>
              <a href="https://hojyokin-ai-delta.vercel.app" className="hover:text-purple-300">補助金AI</a>
              <a href="https://keiyakusho-ai.vercel.app" className="hover:text-purple-300">契約書AIレビュー</a>
              <a href="https://hada-ai.vercel.app" className="hover:text-purple-300">AI美肌診断</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
