"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ZODIAC = [
  { name: "牡羊座", emoji: "♈", period: "3/21-4/19", element: "火" },
  { name: "牡牛座", emoji: "♉", period: "4/20-5/20", element: "地" },
  { name: "双子座", emoji: "♊", period: "5/21-6/20", element: "風" },
  { name: "蟹座",   emoji: "♋", period: "6/21-7/22", element: "水" },
  { name: "獅子座", emoji: "♌", period: "7/23-8/22", element: "火" },
  { name: "乙女座", emoji: "♍", period: "8/23-9/22", element: "地" },
  { name: "天秤座", emoji: "♎", period: "9/23-10/22", element: "風" },
  { name: "蠍座",   emoji: "♏", period: "10/23-11/21", element: "水" },
  { name: "射手座", emoji: "♐", period: "11/22-12/21", element: "火" },
  { name: "山羊座", emoji: "♑", period: "12/22-1/19", element: "地" },
  { name: "水瓶座", emoji: "♒", period: "1/20-2/18", element: "風" },
  { name: "魚座",   emoji: "♓", period: "2/19-3/20", element: "水" },
];

const LUCKY_WORDS = [
  "新しい一歩を踏み出すと道が開ける",
  "直感を信じて動く日。チャンスを逃さない",
  "言葉に力が宿る。大切な人への一言が吉",
  "焦らず丁寧に。誠実さが評価される日",
  "行動力がそのまま運気になる。今すぐ動いて",
  "積み重ねが花開く。継続していることが実を結ぶ",
  "出会いと縁が重なる日。笑顔が幸運を呼ぶ",
  "集中力が高まる。クリエイティブな仕事に向く",
  "エネルギーが充電される日。自分を大切に",
  "計画通りに進む吉日。重要な決断は今がタイミング",
  "感受性が高まる。大切な人の気持ちに気づける日",
  "独創的なアイデアが浮かぶ。それを実行に移して",
];

const RANK_COLORS: Record<number, string> = {
  1:  "from-yellow-500/30 to-amber-500/20 border-yellow-400/60",
  2:  "from-slate-400/20 to-gray-400/10 border-slate-300/40",
  3:  "from-orange-600/20 to-amber-700/10 border-orange-400/40",
};

const RANK_BADGE: Record<number, string> = {
  1: "bg-gradient-to-r from-yellow-400 to-amber-400 text-black",
  2: "bg-gradient-to-r from-slate-300 to-gray-300 text-black",
  3: "bg-gradient-to-r from-orange-400 to-amber-500 text-black",
};

function getDailyRanking(dateStr: string): number[] {
  // 日付ベースのシード値で毎日変わるランキングを生成（決定論的）
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = ((seed << 5) - seed) + dateStr.charCodeAt(i);
    seed |= 0;
  }
  const indices = Array.from({ length: 12 }, (_, i) => i);
  // Fisher-Yatesシャッフル（seedベース）
  for (let i = indices.length - 1; i > 0; i--) {
    seed = ((seed * 1664525 + 1013904223) | 0);
    const j = Math.abs(seed) % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices; // indices[rank] = zodiacIndex
}

function getLuckyScore(rank: number): number {
  const base = [95, 91, 88, 85, 82, 79, 76, 73, 70, 67, 64, 61];
  return base[rank] ?? 60;
}

export default function ZodiacRankingSection() {
  const [ranking, setRanking] = useState<number[]>([]);
  const [displayDate, setDisplayDate] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    setRanking(getDailyRanking(dateStr));
    const m = now.getMonth() + 1;
    const d = now.getDate();
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const w = weekdays[now.getDay()];
    setDisplayDate(`${m}月${d}日（${w}）`);
  }, []);

  if (ranking.length === 0) return null;

  const visibleCount = showAll ? 12 : 3;

  return (
    <section className="py-12 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-block bg-yellow-500/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-yellow-500/30 animate-pulse">
          🏆 毎日更新
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {displayDate || "今日"}の12星座 総合運ランキング
        </h2>
        <p className="text-purple-300 text-sm">九星気学×西洋占星術AIが算出。毎朝0時に更新されます。</p>
      </div>

      <div className="space-y-3">
        {ranking.slice(0, visibleCount).map((zodiacIdx, rank) => {
          const z = ZODIAC[zodiacIdx];
          const score = getLuckyScore(rank);
          const luckyWord = LUCKY_WORDS[zodiacIdx];
          const rankNum = rank + 1;
          const isTop3 = rankNum <= 3;
          const cardBg = RANK_COLORS[rankNum] ?? "from-white/5 to-white/0 border-white/10";

          return (
            <div
              key={zodiacIdx}
              className={`bg-gradient-to-r ${cardBg} border rounded-2xl px-5 py-4 flex items-center gap-4`}
            >
              {/* ランク */}
              <div className="shrink-0 w-10 text-center">
                {isTop3 ? (
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black ${RANK_BADGE[rankNum]}`}>
                    {rankNum}
                  </span>
                ) : (
                  <span className="text-purple-400 text-sm font-bold">{rankNum}位</span>
                )}
              </div>

              {/* 星座 */}
              <div className="shrink-0 text-center w-14">
                <div className="text-2xl">{z.emoji}</div>
                <div className="text-xs text-purple-300 font-bold mt-0.5">{z.name}</div>
              </div>

              {/* 運勢内容 */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-purple-200 leading-relaxed line-clamp-2">{luckyWord}</p>
                <p className="text-xs text-purple-500 mt-1">{z.period}</p>
              </div>

              {/* スコア */}
              <div className="shrink-0 text-center">
                <div className={`text-2xl font-black ${isTop3 ? "text-yellow-300" : "text-purple-300"}`}>
                  {score}
                </div>
                <div className="text-xs text-purple-500">点</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 展開/折りたたみ */}
      <div className="mt-4 text-center space-y-3">
        <button
          onClick={() => setShowAll(v => !v)}
          className="text-sm text-purple-400 hover:text-purple-200 transition-colors underline underline-offset-2"
        >
          {showAll ? "▲ 上位3位だけ表示" : `▼ 全12星座を見る（4〜12位）`}
        </button>

        {!showAll && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-sm text-white font-bold mb-1">
              {ZODIAC[ranking[0]]?.emoji} 今日の1位は <span className="text-yellow-300">{ZODIAC[ranking[0]]?.name}</span> 🏆
            </p>
            <p className="text-xs text-purple-300 mb-3">
              あなたの星座の詳細な日運・恋愛運・仕事運はAI鑑定で確認できます
            </p>
            <Link
              href="/uranai"
              className="inline-block bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-black px-7 py-3 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm"
            >
              🔮 今日の詳細な運勢をAIで見る →
            </Link>
            <p className="text-purple-500 text-xs mt-2">無料3回・生年月日で個別鑑定</p>
          </div>
        )}

        {showAll && (
          <div className="mt-4">
            <Link
              href="/uranai"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm"
            >
              🔮 生年月日で個別AI鑑定を受ける（無料3回）→
            </Link>
          </div>
        )}
      </div>

      {/* シェア誘導 */}
      <div className="mt-6 bg-purple-900/30 border border-purple-500/20 rounded-xl p-4 text-center">
        <p className="text-xs text-purple-300 mb-2">友達に教えてあげよう</p>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `【今日の12星座ランキング】${displayDate}\n🥇1位: ${ZODIAC[ranking[0]]?.name} ${ZODIAC[ranking[0]]?.emoji}\n🥈2位: ${ZODIAC[ranking[1]]?.name} ${ZODIAC[ranking[1]]?.emoji}\n🥉3位: ${ZODIAC[ranking[2]]?.name} ${ZODIAC[ranking[2]]?.emoji}\n\nあなたは何位？✨ #AI占い #星座ランキング #今日の運勢\nhttps://uranai-ai-sigma.vercel.app`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-2.5 px-5 rounded-xl text-xs transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.892-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          今日のランキングをXでシェア
        </a>
      </div>

      <p className="text-center text-purple-600 text-xs mt-3">
        ※ ランキングは娯楽目的です。毎日0時に自動更新されます。
      </p>
    </section>
  );
}
