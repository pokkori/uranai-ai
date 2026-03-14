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
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 text-white">
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
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">🌙 3月の転機情報</span>
              <span className="text-purple-300 text-xs">2026年最新</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-3">
              3月は「出会いと別れが交差する月」<br />
              <span className="text-purple-300 text-lg font-normal">あなたに転機が訪れるのはいつ？</span>
            </h2>
            <p className="text-purple-200 text-sm leading-relaxed mb-6">
              九星気学では2026年3月（三碧木星月）は<strong className="text-white">「新しい縁と決断の月」</strong>。
              特に<span className="text-yellow-300 font-bold">3/20（春分）前後</span>は運命の歯車が大きく動く時期とされています。
              あなたの生年月日から、転機が訪れる日を今すぐ確認してみてください。
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { period: "3/1〜5", type: "出会い運↑", color: "bg-pink-500/20 border-pink-400/40 text-pink-300" },
                { period: "3/10〜15", type: "仕事運↑", color: "bg-blue-500/20 border-blue-400/40 text-blue-300" },
                { period: "3/20前後", type: "転機の日◎", color: "bg-yellow-500/20 border-yellow-400/40 text-yellow-300" },
                { period: "3/28〜31", type: "決断の時", color: "bg-purple-500/20 border-purple-400/40 text-purple-300" },
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

      {/* 相性占い予告 */}
      <section className="max-w-2xl mx-auto px-6 py-8 text-center">
        <div className="bg-purple-900/40 border border-purple-700 rounded-2xl p-6">
          <p className="text-purple-300 text-sm font-semibold mb-2">✨ 近日公開</p>
          <h3 className="text-xl font-bold text-white mb-2">相性占い機能</h3>
          <p className="text-purple-200 text-sm">
            2人の星座を入力するだけ。AIが相性スコアと相性のポイントを診断。<br/>
            「私たち○○点でした」をXでシェアして友達と比べよう。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-6">
        <h2 className="text-2xl font-bold mb-4">今すぐあなたの運命を知る</h2>
        <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-10 py-4 rounded-full hover:opacity-90 shadow-lg">
          無料で鑑定する →
        </Link>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-purple-500 px-6">
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
