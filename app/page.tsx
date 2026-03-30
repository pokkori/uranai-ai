import Link from "next/link";
import type { Metadata } from "next";
import UranaiSampleSection from "@/components/UranaiSampleSection";
import DailyFortuneSection from "@/components/DailyFortuneSection";
import TodayFortune from "@/components/TodayFortune";
import { ShareButtons } from "@/components/ShareButtons";
import ZodiacRankingSection from "@/components/ZodiacRankingSection";
import { AdBanner } from "@/components/AdBanner";
import { StreakBanner } from "@/components/StreakBanner";
import { UsageCounter } from "@/components/UsageCounter";
import { CrossSell } from "@/components/CrossSell";

export const metadata: Metadata = {
  title: "AI占い｜四柱推命・九星気学で本格鑑定",
  description: "生年月日を入力するだけ。四柱推命と九星気学をベースにしたAIが、あなたの運命・今日の運勢・恋愛運を本格鑑定します。無料で3回お試し可能。",
};

export default function LandingPage() {
  const today = new Date();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: '本当に当たりますか？', acceptedAnswer: { '@type': 'Answer', text: 'AIが星座・四柱推命・タロットの要素を組み合わせて独自分析。エンターテインメント目的でご利用ください。' } },
              { '@type': 'Question', name: '何回まで無料ですか？', acceptedAnswer: { '@type': 'Answer', text: '毎日3回まで無料で鑑定できます。' } },
              { '@type': 'Question', name: 'データは保存されますか？', acceptedAnswer: { '@type': 'Answer', text: '入力データは鑑定後に自動削除されます。個人情報の保存はしていません。' } },
              { '@type': 'Question', name: 'スマホから使えますか？', acceptedAnswer: { '@type': 'Answer', text: 'はい、スマートフォン・タブレットに完全対応しています。' } },
            ],
          }).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'AI占い',
            operatingSystem: 'Web',
            applicationCategory: 'EntertainmentApplication',
            offers: { '@type': 'Offer', price: 0, priceCurrency: 'JPY' },
          }).replace(/</g, '\\u003c'),
        }}
      />
    <main className="min-h-screen text-white" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(120, 80, 200, 0.18) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(200, 80, 180, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(80, 100, 220, 0.1) 0%, transparent 50%), #0B0B1E' }}>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {[
          { size: 4, x: '10%', y: '20%', dur: '6s', delay: '0s', color: 'rgba(168,85,247,0.4)' },
          { size: 3, x: '85%', y: '15%', dur: '8s', delay: '1s', color: 'rgba(236,72,153,0.3)' },
          { size: 5, x: '70%', y: '60%', dur: '7s', delay: '2s', color: 'rgba(139,92,246,0.35)' },
          { size: 3, x: '25%', y: '75%', dur: '9s', delay: '0.5s', color: 'rgba(192,132,252,0.3)' },
          { size: 4, x: '50%', y: '40%', dur: '10s', delay: '3s', color: 'rgba(168,85,247,0.25)' },
          { size: 6, x: '90%', y: '80%', dur: '7s', delay: '1.5s', color: 'rgba(236,72,153,0.2)' },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full animate-pulse" style={{ width: p.size, height: p.size, left: p.x, top: p.y, background: p.color, animationDuration: p.dur, animationDelay: p.delay }} />
        ))}
      </div>
      <div className="relative z-10">
      {/* 毎月1〜7日の間だけ表示される「今月の新しい診断」バナー */}
      {today.getDate() <= 7 && (
        <div className="text-white text-center py-3 px-4 text-sm font-bold" style={{ background: 'linear-gradient(90deg, rgba(126,34,206,0.8), rgba(168,85,247,0.8), rgba(219,39,119,0.6))' }}>
          <svg className="inline-block w-4 h-4 mr-1 -mt-0.5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z" fill="#FBBF24"/></svg>
          {today.getMonth() + 1}月の新しい運勢診断が解放されました！今すぐ診断する
        </div>
      )}
      <nav className="px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="#A855F7" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="#A855F7"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#C084FC" strokeWidth="1.5"/></svg>
            AI占い
          </span>
          <Link href="/uranai" className="text-white text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105 min-h-[44px] flex items-center" style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)', boxShadow: '0 0 20px rgba(168,85,247,0.4)' }} aria-label="AI占いを無料で始める">
            無料で占う
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/uranai/category/love" className="text-xs text-purple-300 hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-full transition-colors min-h-[44px] flex items-center" aria-label="恋愛占いカテゴリを見る"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="#EC4899" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg> 恋愛占い</Link>
          <Link href="/uranai/category/work" className="text-xs text-purple-300 hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-full transition-colors min-h-[44px] flex items-center" aria-label="仕事占いカテゴリを見る"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="#818CF8" strokeWidth="2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg> 仕事占い</Link>
          <Link href="/uranai/category/money" className="text-xs text-purple-300 hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-full transition-colors min-h-[44px] flex items-center" aria-label="金運占いカテゴリを見る"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="#92400E" fontWeight="bold">$</text></svg> 金運占い</Link>
          <Link href="/uranai/category/health" className="text-xs text-purple-300 hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-full transition-colors min-h-[44px] flex items-center" aria-label="健康運占いカテゴリを見る"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" aria-hidden="true"><path d="M12 22c-4-3.5-8-7-8-11a4 4 0 018 0 4 4 0 018 0c0 4-4 7.5-8 11z"/></svg> 健康運</Link>
          <Link href="/uranai/category/general" className="text-xs text-purple-300 hover:text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-full transition-colors min-h-[44px] flex items-center" aria-label="今日の運勢カテゴリを見る"><svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z"/></svg> 今日の運勢</Link>
        </div>
      </nav>

      <StreakBanner />

      {/* ヒーロー */}
      <section className="text-center py-20 px-6 max-w-3xl mx-auto">
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto" viewBox="0 0 64 64" fill="none" aria-hidden="true">
            <circle cx="32" cy="32" r="28" stroke="url(#grad1)" strokeWidth="2" opacity="0.6"/>
            <circle cx="32" cy="32" r="18" fill="url(#grad1)" opacity="0.2"/>
            <circle cx="32" cy="32" r="8" fill="#A855F7"/>
            <path d="M32 4v8M32 52v8M4 32h8M52 32h8M11 11l6 6M47 47l6 6M11 53l6-6M47 17l6-6" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round"/>
            <defs><linearGradient id="grad1" x1="0" y1="0" x2="64" y2="64"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#EC4899"/></linearGradient></defs>
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span style={{ background: 'linear-gradient(135deg, #E9D5FF, #FFFFFF, #FBCFE8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>星が、あなたの今日の答えを持っている。</span>
        </h1>
        <p className="text-purple-200 text-lg mb-8 leading-relaxed">
          九星気学×干支AIが、あなたの運命の波を分析。<br />
          今年の転機・恋愛の流れ・仕事の変化を今すぐ確認してください。
        </p>
        <div className="max-w-xs mx-auto mb-4"><UsageCounter /></div>
        <Link href="/uranai" className="inline-block text-white font-bold text-lg px-10 py-4 rounded-full transition-all hover:scale-105 min-h-[44px]" style={{ background: 'linear-gradient(135deg, #A855F7, #EC4899)', boxShadow: '0 0 30px rgba(168,85,247,0.5), 0 0 60px rgba(236,72,153,0.2)' }} aria-label="AI占いを無料で鑑定してみる">
          今日の運勢を無料で占う
        </Link>
        <p className="text-xs opacity-60 mt-2">※毎日3回まで無料</p>
        <p className="text-purple-400 text-xs mt-3">無料3回・クレジットカード不要</p>
        <div className="flex justify-center gap-6 text-xs text-purple-400 mt-6">
          <span className="flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z"/></svg> 四柱推命×九星気学 AI</span>
          <span className="flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> 毎日更新・リピーター多数</span>
          <span className="flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> 個人情報不要</span>
        </div>
        <div className="mt-8">
          <TodayFortune />
        </div>
      </section>

      {/* 占い師プロフィールカード */}
      <section className="py-4 px-6 max-w-3xl mx-auto">
        <div className="backdrop-blur-sm bg-white/5 border border-white/20 shadow-lg rounded-2xl p-6 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-300 flex items-center justify-center shrink-0">
            <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M28 12a14 14 0 01-16 16A14 14 0 1028 12z" fill="#FDE68A"/><circle cx="20" cy="14" r="2" fill="#F59E0B"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-purple-300 text-xs mb-0.5">担当占い師</p>
            <h3 className="text-white text-xl font-bold leading-tight">月詠 玲花</h3>
            <p className="text-purple-200 text-xs mt-1">九星気学×タロット歴15年 / 累計鑑定数12,847件</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="bg-purple-800/70 text-purple-200 text-xs px-2 py-0.5 rounded border border-purple-600/40">九星気学</span>
              <span className="bg-purple-800/70 text-purple-200 text-xs px-2 py-0.5 rounded border border-purple-600/40">タロット</span>
              <span className="bg-purple-800/70 text-purple-200 text-xs px-2 py-0.5 rounded border border-purple-600/40">相性占い</span>
              <span className="bg-purple-800/70 text-purple-200 text-xs px-2 py-0.5 rounded border border-purple-600/40">霊感鑑定</span>
            </div>
          </div>
        </div>
      </section>

      {/* 鑑定実績・社会的証明バナー */}
      <section className="py-6 px-6 max-w-3xl mx-auto">
        <div className="backdrop-blur-sm bg-white/5 border border-white/20 shadow-lg rounded-2xl px-6 py-4">
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {[
              { num: "累計12万件+", label: "鑑定実績", svgD: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z", color: "#A855F7" },
              { num: "4.8 / 5.0", label: "ユーザー満足度", svgD: "M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z", color: "#FBBF24" },
              { num: "78%", label: "リピート率", svgD: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z", color: "#34D399" },
              { num: "毎日更新", label: "運勢コンテンツ", svgD: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z", color: "#818CF8" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center min-w-[80px]">
                <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill={stat.color} aria-hidden="true"><path d={stat.svgD}/></svg>
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
              <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse flex items-center gap-1 w-fit"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FDE68A" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg> {m}月の転機情報</span>
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
              <strong className="text-white">ただし、これは一般的な傾向です。</strong><br />
              あなたの生年月日（四柱推命の命式）によって、転機が来る時期は人それぞれ異なります。
              「今月の転機はいつ？」をAIが生年月日から個別に鑑定します。
            </div>
            <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-7 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm" aria-label="今月の転機をAI占いで鑑定してもらう">
              今月の転機をAIに鑑定してもらう
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
              svgD: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
              svgColor: "#818CF8",
              scene: "なんとなく今日、うまくいかない気がする",
              body: "原因はわからないのに、なんとなく不安。そういう日は「星の流れ」が影響していることがあります。今日が吉日か凶日か、知っているだけで気持ちが変わります。",
            },
            {
              svgD: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z",
              svgColor: "#F472B6",
              scene: "あの人の気持ちが読めなくて眠れない",
              body: "LINEの返信が遅い。この関係はどこへ向かうのか。生年月日の相性から、2人の縁の深さをAIが分析します。",
            },
            {
              svgD: "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z",
              svgColor: "#A78BFA",
              scene: "転職・引越し -- この決断、今が正しいタイミング？",
              body: "大事な決断ほど、「今動くべきか」を知りたくなる。九星気学では、人には「動く年」と「待つ年」があります。あなたは今、どちらですか？",
            },
          ].map((item) => (
            <div key={item.scene} className="flex gap-4 backdrop-blur-md bg-white/5 rounded-2xl p-5 border border-white/10">
              <svg className="w-8 h-8 shrink-0" viewBox="0 0 24 24" fill={item.svgColor} aria-hidden="true"><path d={item.svgD}/></svg>
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
          <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-6 py-3 rounded-full text-sm hover:opacity-90 transition-opacity" aria-label="AI占いを今すぐ無料で始める">
            今すぐ無料で占う →
          </Link>
        </div>
      </section>

      {/* 特徴 */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { svgD: "M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z", color: "#818CF8", title: "生年月日だけでOK", desc: "名前と生年月日を入力するだけ。難しい操作は一切不要です。" },
            { svgD: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z", color: "#A855F7", title: "四柱推命×九星気学", desc: "日本古来の占術をAIが組み合わせて、深みのある鑑定を提供。" },
            { svgD: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z", color: "#EC4899", title: "3種類の鑑定", desc: "今日の運勢・恋愛運・総合運命鑑定の3種類から選べます。" },
          ].map((f) => (
            <div key={f.title} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 text-center border border-white/10 hover:bg-white/8 transition-all">
              <svg className="w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24" fill={f.color} aria-hidden="true"><path d={f.svgD}/></svg>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-purple-300 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 占い結果例カード */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-purple-500/30 flex items-center gap-1 mx-auto w-fit"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z"/></svg> 実際の占い結果例</div>
          <h2 className="text-2xl font-bold text-white">AIはこんな結果を教えてくれます</h2>
          <p className="text-purple-300 text-sm mt-2">生年月日を入れるだけで、あなただけの鑑定が届きます</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* カード1: 今日の恋愛運 */}
          <div className="relative bg-gradient-to-br from-pink-900/60 to-purple-900/60 border border-pink-500/30 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#EC4899" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/></svg>
                <span className="text-xs text-pink-300 font-bold bg-pink-500/20 px-2 py-0.5 rounded-full border border-pink-500/30">今日の恋愛運</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-lg">★★★★</span><span className="text-gray-500 text-lg">☆</span>
              </div>
              <p className="text-white text-sm font-bold mb-2">出会いの予感が高まる一日</p>
              <p className="text-pink-200 text-xs leading-relaxed">
                三碧木星の影響で言葉に力が宿る日。気になる相手には積極的に声をかけて。夕方以降の縁が特に吉。
              </p>
              <p className="text-pink-400 text-xs mt-3 flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="#34D399" aria-hidden="true"><path d="M12 22c-4-3.5-8-7-8-11a4 4 0 018 0 4 4 0 018 0c0 4-4 7.5-8 11z"/></svg> ラッキーカラー: ローズピンク</p>
            </div>
          </div>
          {/* カード2: 仕事運 */}
          <div className="relative bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-blue-500/30 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                <span className="text-xs text-blue-300 font-bold bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">仕事運</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-lg">★★★</span><span className="text-gray-500 text-lg">☆☆</span>
              </div>
              <p className="text-white text-sm font-bold mb-2">実力を認められる転換期</p>
              <p className="text-blue-200 text-xs leading-relaxed">
                六白金星の月回りが強まり、これまでの努力が評価される時期。提案や報告は午前中が吉。焦らず着実に。
              </p>
              <p className="text-blue-400 text-xs mt-3 flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> キーワード: 「実績を声に出す」</p>
            </div>
          </div>
          {/* カード3: 総合運 */}
          <div className="relative bg-gradient-to-br from-purple-900/60 to-violet-900/60 border border-purple-500/30 rounded-2xl p-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="#A855F7" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="#A855F7" opacity="0.5"/></svg>
                <span className="text-xs text-purple-300 font-bold bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">総合運</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-yellow-400 text-lg">★★★★★</span>
              </div>
              <p className="text-white text-sm font-bold mb-2">大吉 — 動けば必ず道が開く</p>
              <p className="text-purple-200 text-xs leading-relaxed">
                九紫火星の波動が頂点に達する特別な日。直感を信じて行動するだけで、思いがけない幸運を引き寄せられる。
              </p>
              <p className="text-purple-400 text-xs mt-3 flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FDE68A" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg> ラッキー方位: 南・南東</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm" aria-label="自分の運勢をAIで今すぐ占う（無料3回）">
            自分の運勢を今すぐ占う（無料3回）
          </Link>
        </div>
      </section>

      {/* 鑑定サンプル — 本格版 */}
      <UranaiSampleSection />

      {/* 料金 */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-3">
          <div className="inline-block bg-red-500/20 text-red-300 text-xs font-bold px-3 py-1 rounded-full border border-red-500/30 animate-pulse mb-3">
            今だけ初月¥480 → 2ヶ月目から¥980
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
            <Link href="/uranai" className="block w-full text-center text-sm font-medium py-2.5 rounded-lg transition-colors bg-white/10 hover:bg-white/20 text-white" aria-label="お試しプランで無料で占いを試す">
              無料で試す
            </Link>
          </div>
          {/* スタンダードプラン */}
          <div className="rounded-2xl p-6 relative border bg-purple-500/20 border-purple-400">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-4 py-1 rounded-full font-bold">おすすめ</div>
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
            <Link href="/uranai?plan=standard" className="block w-full text-center text-sm font-bold py-3 rounded-lg transition-colors bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white shadow-lg shadow-purple-900/40" aria-label="スタンダードプラン（初月480円）を今すぐ始める">
              今すぐ始める →
            </Link>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-xs text-green-400 flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg> 30日返金保証</span>
              <span className="text-xs text-purple-500">|</span>
              <span className="text-xs text-purple-400 flex items-center gap-1"><svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> SSL暗号化</span>
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
            <Link href="/uranai?plan=business" className="block w-full text-center text-sm font-medium py-2.5 rounded-lg transition-colors bg-white/10 hover:bg-white/20 text-white" aria-label="プレミアムプラン（2980円/月）に申し込む">
              申し込む
            </Link>
          </div>
        </div>
        {/* 安心感の補強 */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-purple-500">
          <span>&#x2713;いつでもキャンセル可能</span>
          <span>&#x2713;解約後も当月末まで利用可能</span>
          <span>&#x2713;初回30日間返金保証</span>
          <span>&#x2713;クレジットカード情報は当社では保持しない</span>
        </div>
      </section>

      {/* 今日のタロット1枚引き — デイリーコンテンツ訴求 */}
      <section className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-br from-indigo-900/80 to-purple-900/60 border border-indigo-400/40 rounded-3xl p-7 text-center">
          <div className="flex justify-center gap-3 mb-4">
            {[
              <svg key="card1" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="1.5" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z"/></svg>,
              <svg key="card2" className="w-6 h-6" viewBox="0 0 24 24" fill="#FDE68A" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
              <svg key="card3" className="w-6 h-6" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z"/></svg>,
            ].map((icon, i) => (
              <div key={i} className="w-14 h-20 bg-gradient-to-br from-indigo-700 to-purple-800 border-2 border-indigo-400/60 rounded-xl flex items-center justify-center shadow-lg">
                {icon}
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
            <p className="flex items-center gap-1"><svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="2" aria-hidden="true"><rect x="3" y="2" width="18" height="20" rx="2"/><path d="M8 7h8M8 12h4"/></svg> 大アルカナ22枚（愚者〜世界）を毎日ローテーション</p>
            <p className="flex items-center gap-1"><svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="#A78BFA" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3" fill="#0B0B1E"/></svg> カードの意味 + <strong className="text-white">今日のアクション</strong>付き</p>
            <p className="flex items-center gap-1"><svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#C4B5FD" strokeWidth="2" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg> 引いた結果をXでシェアできる（拡散しやすい！）</p>
          </div>
          <Link href="/uranai?tab=tarot" className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-7 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm" aria-label="今日のタロットを1枚無料で引く">
            今日のタロットを引く（無料）
          </Link>
          <p className="text-indigo-500 text-xs mt-2">生年月日不要・1タップで結果が出る</p>
        </div>
      </section>

      {/* 相性占い */}
      <section className="max-w-2xl mx-auto px-6 py-8 text-center">
        <div className="bg-purple-900/40 border border-purple-700 rounded-2xl p-6">
          <p className="text-pink-300 text-sm font-semibold mb-2 flex items-center gap-1 justify-center"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FBBF24" aria-hidden="true"><path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.93L16.18 19.46 12 16l-4.18 3.46 1.09-6.26L3.82 9.27l6.09-1.01z"/></svg> 新機能 公開中</p>
          <h3 className="text-xl font-bold text-white mb-2">相性占い機能</h3>
          <p className="text-purple-200 text-sm mb-4">
            2人の星座を入力するだけ。AIが相性スコアと相性のポイントを診断。<br/>
            「私たち○○点でした」をXでシェアして友達と比べよう。
          </p>
          <Link href="/uranai" className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm" aria-label="AI相性占いを試す">
            相性占いを試す →
          </Link>
        </div>
      </section>

      {/* 今週の開運アクション */}
      <section className="py-10 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-green-500/30">
            毎週更新
          </div>
          <h2 className="text-xl font-bold text-white">今週の開運アクション3選</h2>
          <p className="text-purple-300 text-sm mt-1">九星気学・干支の週運から導いた、今週やると運気が上がる行動</p>
        </div>
        {(() => {
          const weekNum = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
          const actions = [
            [
              { icon: "E", title: "東の方角への外出", desc: "九星では東は「木のエネルギー」。新しい出会い・仕事のチャンスが東から来やすい週です。", tag: "対人運UP", color: "#F9A8D4" },
              { icon: "W", title: "感謝の気持ちを文章に", desc: "水星の影響で言葉の力が高まる週。感謝を伝えることで、縁が深まり仕事運も上昇します。", tag: "縁強化", color: "#818CF8" },
              { icon: "G", title: "水回りの掃除・整理", desc: "干支の気学では水回りを清潔に保つと金運が整うとされています。今週特に効果的な日です。", tag: "金運UP", color: "#60A5FA" },
            ],
            [
              { icon: "N", title: "新しいことを1つ始める", desc: "今週は「始まりのエネルギー」が強い。小さなことでも新しい習慣を作ると、運気が大きく動きます。", tag: "総合運UP", color: "#34D399" },
              { icon: "C", title: "久しぶりの連絡を取る", desc: "縁の星が活発な週。しばらく連絡していなかった人に連絡すると、嬉しい展開が起きやすいです。", tag: "人間関係UP", color: "#F472B6" },
              { icon: "M", title: "朝5分の瞑想・深呼吸", desc: "今週は精神的な安定が運気上昇のカギ。朝のルーティンに静かな時間を加えると、直感力が高まります。", tag: "直感力UP", color: "#A78BFA" },
            ],
            [
              { icon: "P", title: "好きな色を身につける", desc: "今週の開運カラーを意識して。九星では色には運気を呼ぶ力があるとされています。", tag: "運気UP", color: "#F59E0B" },
              { icon: "R", title: "寝る前の1日振り返り", desc: "月の満ち欠けが感受性を高める週。就寝前に今日の出来事を3つ書き出すと、明日の運気が好転します。", tag: "運気整え", color: "#C084FC" },
              { icon: "L", title: "南西方向のお出かけ", desc: "今週は「土のエネルギー」が流れる方角。南西への外出が縁と金運を引き寄せます。", tag: "縁・金運UP", color: "#34D399" },
            ],
          ];
          const weekActions = actions[weekNum % actions.length];
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weekActions.map((action, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-purple-400/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-white" style={{ background: `linear-gradient(135deg, ${action.color}, ${action.color}88)` }}>{action.icon}</span>
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
          <Link href="/uranai" className="inline-block text-sm text-purple-400 hover:text-purple-200 transition-colors underline underline-offset-2" aria-label="生年月日であなただけの今週の開運アドバイスを見る">
            生年月日であなただけの今週の開運アドバイスを見る
          </Link>
        </div>
      </section>

      {/* LINE通知導線セクション */}
      <section className="py-10 px-6 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-900/40 to-teal-900/30 border border-green-500/40 rounded-3xl p-7 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-green-500/30">
              毎朝8時にお届け
            </div>
            <div className="text-5xl mb-4">
              <svg viewBox="0 0 24 24" className="w-14 h-14 mx-auto fill-current text-green-400">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">毎日の鑑定をLINEで受け取る</h3>
            <p className="text-green-200 text-sm mb-5 leading-relaxed">
              毎朝8時に「今日の運勢」が届きます。<br />
              開運アクション・ラッキーカラー・吉方位をLINEで確認。<br />
              <span className="text-yellow-300 font-bold">朝のルーティンに運勢チェックを追加しよう。</span>
            </p>
            {/* 特典リスト */}
            <div className="bg-white/5 border border-green-500/20 rounded-xl p-4 mb-5 text-left space-y-2">
              {[
                "毎朝8時に今日の運勢をお届け",
                "吉日・注意日を事前にお知らせ",
                "今週の開運アクション3選",
                "月替わりの特別鑑定コンテンツ",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-green-100">
                  <span className="text-green-400 shrink-0">✓</span>
                  {item}
                </div>
              ))}
            </div>
            {/* 登録者数カウンター */}
            <div className="flex justify-center items-center gap-2 mb-5">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D", "E"].map((letter, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-2 border-purple-900 flex items-center justify-center text-xs text-white font-bold">
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-xs text-green-300 font-bold">
                <span className="text-white text-base font-black">2,847</span>名が登録中
              </span>
            </div>
            <Link
              href="/uranai"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-full transition-colors text-sm shadow-lg shadow-green-900/40 w-full justify-center"
              aria-label="LINE通知でAI占い鑑定を受け取る"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
              </svg>
              LINE通知を受け取る（準備中・無料）
            </Link>
            <p className="text-xs text-green-700 mt-2">近日公開予定 • 今すぐAI鑑定でお試しを</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-6">
        <h2 className="text-2xl font-bold mb-4">今すぐあなたの運命を知る</h2>
        <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-10 py-4 rounded-full hover:opacity-90 shadow-lg" aria-label="AI占いを無料で鑑定する">
          無料で鑑定する →
        </Link>
      </section>

      {/* スティッキーモバイルCTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-indigo-950 border-t border-purple-700/50 px-4 py-3 z-40 sm:hidden shadow-lg">
        <Link href="/uranai" className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-center py-3.5 rounded-full text-sm" aria-label="AI占いを今すぐ無料で始める（モバイルCTA）">
          今すぐ無料で占う →
        </Link>
      </div>

      {/* もっと活用する3選 */}
      <section className="py-8 px-4 max-w-lg mx-auto">
        <h2 className="text-center text-base font-bold text-purple-300 mb-4">AI占いをもっと活用する3選</h2>
        <ol className="space-y-3">
          {[
            { color: "#818CF8", title: "毎月の運勢を確認する習慣に", desc: "月初めに鑑定することで今月の運気の流れを把握。仕事・恋愛・健康を先回りして対策しよう。" },
            { color: "#EC4899", title: "気になる相手との相性を占う", desc: "相手の生年月日を入力して相性スコアを確認。恋愛・仕事のパートナー選びに活用できます。" },
            { color: "#FBBF24", title: "大事な決断前のお守りに", desc: "転職・引越し・告白など人生の節目にAI鑑定を参考に。今日やるべきこと3選を実行しよう。" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl p-3"
              style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0" style={{ background: item.color }}>{i + 1}</span>
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

      {/* シェアセクション */}
      <section className="py-6 px-6 text-center">
        <ShareButtons url="https://uranai-ai-sigma.vercel.app" text="AI占いを使ってみた！" hashtags="AI占い" />
      </section>
      <CrossSell currentService="占いAI" />

      <footer className="border-t border-white/10 py-8 pb-24 sm:pb-8 text-center text-xs text-purple-500 px-6">
        <div className="max-w-5xl mx-auto space-y-2">
          <p>AI占い © 2026</p>
          <div className="flex justify-center gap-6">
            <Link href="/blog/shichusuimei" className="hover:text-purple-300" aria-label="四柱推命とはについて読む">四柱推命とは</Link>
            <Link href="/blog/kyusei-kigaku" className="hover:text-purple-300" aria-label="九星気学とはについて読む">九星気学とは</Link>
            <Link href="/legal" className="hover:text-purple-300" aria-label="特定商取引法に基づく表記を見る">特定商取引法</Link>
            <Link href="/terms" className="hover:text-purple-300" aria-label="利用規約を読む">利用規約</Link>
            <Link href="/privacy" className="hover:text-purple-300" aria-label="プライバシーポリシーを読む">プライバシーポリシー</Link>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-purple-600 mb-2">ポッコリラボの他のサービス</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-purple-600">
              <a href="https://keiba-yoso-ai.vercel.app" className="hover:text-purple-300" aria-label="競馬予想AIを見る（外部サービス）">競馬予想AI</a>
              <a href="https://rougo-sim-ai.vercel.app" className="hover:text-purple-300" aria-label="老後シミュレーターAIを見る（外部サービス）">老後シミュレーターAI</a>
              <a href="https://claim-ai-beryl.vercel.app" className="hover:text-purple-300" aria-label="クレームAIを見る（外部サービス）">クレームAI</a>
              <a href="https://hojyokin-ai-delta.vercel.app" className="hover:text-purple-300" aria-label="補助金AIを見る（外部サービス）">補助金AI</a>
              <a href="https://keiyakusho-ai.vercel.app" className="hover:text-purple-300" aria-label="契約書AIレビューを見る（外部サービス）">契約書AIレビュー</a>
              <a href="https://hada-ai.vercel.app" className="hover:text-purple-300" aria-label="AI美肌診断を見る（外部サービス）">AI美肌診断</a>
            </div>
          </div>
        </div>
      </footer>
      <AdBanner slot="" />
      </div>
    </main>
    </>
  );
}
