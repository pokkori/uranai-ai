import Link from "next/link";
import type { Metadata } from "next";
import UranaiSampleSection from "@/components/UranaiSampleSection";
import DailyFortuneSection from "@/components/DailyFortuneSection";
import TodayFortune from "@/components/TodayFortune";

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

      {/* 今日の日運 */}
      <DailyFortuneSection />

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
        <h2 className="text-2xl font-bold text-center mb-2">料金プラン</h2>
        <p className="text-center text-purple-400 text-sm mb-10">まずは無料で3回お試しください</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "お試し", price: "無料", limit: "3回まで", features: ["基本鑑定", "今日の運勢", "恋愛運"], url: "/uranai", highlight: false },
            { name: "スタンダード", price: "¥980/月", limit: "毎日鑑定可能", features: ["全鑑定タイプ", "毎日の運勢", "相性診断"], url: "/uranai?plan=standard", highlight: true },
            { name: "ビジネス", price: "¥2,980/月", limit: "無制限", features: ["スタンダードの全機能", "月運・年運鑑定", "優先サポート"], url: "/uranai?plan=business", highlight: false },
          ].map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-6 relative border ${plan.highlight ? "bg-purple-500/20 border-purple-400" : "bg-white/5 border-white/10"}`}>
              {plan.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs px-3 py-0.5 rounded-full">おすすめ</div>}
              <div className="font-bold mb-1">{plan.name}</div>
              <div className="text-2xl font-bold text-purple-300 mb-1">{plan.price}</div>
              <div className="text-xs text-purple-400 mb-4">{plan.limit}</div>
              <ul className="space-y-1 mb-6">
                {plan.features.map((f) => <li key={f} className="text-xs text-purple-200 flex gap-2"><span>✓</span>{f}</li>)}
              </ul>
              <Link href={plan.url} className={`block w-full text-center text-sm font-medium py-2.5 rounded-lg transition-colors ${plan.highlight ? "bg-purple-500 hover:bg-purple-400 text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                {plan.name === "お試し" ? "無料で試す" : "申し込む"}
              </Link>
            </div>
          ))}
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

      {/* X Share */}
      <section className="py-6 px-6 text-center">
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
