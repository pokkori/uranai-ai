"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ZODIAC = [
  { name: "牡羊座", emoji: "♈", period: "3/21-4/19" },
  { name: "牡牛座", emoji: "♉", period: "4/20-5/20" },
  { name: "双子座", emoji: "♊", period: "5/21-6/20" },
  { name: "蟹座",   emoji: "♋", period: "6/21-7/22" },
  { name: "獅子座", emoji: "♌", period: "7/23-8/22" },
  { name: "乙女座", emoji: "♍", period: "8/23-9/22" },
  { name: "天秤座", emoji: "♎", period: "9/23-10/22" },
  { name: "蠍座",   emoji: "♏", period: "10/23-11/21" },
  { name: "射手座", emoji: "♐", period: "11/22-12/21" },
  { name: "山羊座", emoji: "♑", period: "12/22-1/19" },
  { name: "水瓶座", emoji: "♒", period: "1/20-2/18" },
  { name: "魚座",   emoji: "♓", period: "2/19-3/20" },
];

const FORTUNE_LEVELS = ["大吉", "吉", "中吉", "小吉", "末吉"] as const;
type FortuneLevel = typeof FORTUNE_LEVELS[number];

const FORTUNE_COLOR: Record<FortuneLevel, string> = {
  "大吉": "text-yellow-300 border-yellow-400/60 bg-yellow-400/10",
  "吉":   "text-pink-300  border-pink-400/60  bg-pink-400/10",
  "中吉": "text-purple-300 border-purple-400/60 bg-purple-400/10",
  "小吉": "text-blue-300  border-blue-400/60  bg-blue-400/10",
  "末吉": "text-indigo-300 border-indigo-400/60 bg-indigo-400/10",
};

const FORTUNE_STARS: Record<FortuneLevel, string> = {
  "大吉": "★★★★★",
  "吉":   "★★★★☆",
  "中吉": "★★★☆☆",
  "小吉": "★★☆☆☆",
  "末吉": "★☆☆☆☆",
};

const FORTUNE_HINT: Record<FortuneLevel, string> = {
  "大吉": "今日は行動力が高まる最良の日。積極的に動いて。",
  "吉":   "全体的に流れが良い日。大切な人に連絡してみて。",
  "中吉": "穏やかな運気の流れ。丁寧に過ごすことが吉。",
  "小吉": "小さな幸運が潜む日。見逃さず拾い上げて。",
  "末吉": "慎重に進むことで運気が開ける日。焦りは禁物。",
};

function getDailyFortune(zodiacIndex: number, dateStr: string): FortuneLevel {
  const digits = dateStr.replace(/\D/g, "").split("");
  const sum = digits.reduce((a, b) => a + parseInt(b, 10), 0);
  return FORTUNE_LEVELS[(sum + zodiacIndex) % FORTUNE_LEVELS.length];
}

function getTodayStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}${m}${d}`;
}

function formatDisplayDate(): string {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const w = weekdays[now.getDay()];
  return `${m}/${d}（${w}）`;
}

export default function DailyFortuneSection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [dateStr, setDateStr] = useState("");
  const [displayDate, setDisplayDate] = useState("");

  // クライアントサイドで日付を取得（ハイドレーションエラー防止）
  useEffect(() => {
    setDateStr(getTodayStr());
    setDisplayDate(formatDisplayDate());
  }, []);

  const fortune: FortuneLevel | null =
    selected !== null && dateStr ? getDailyFortune(selected, dateStr) : null;

  return (
    <section className="py-14 px-6 max-w-3xl mx-auto">
      {/* バナー */}
      <div className="mb-8 bg-gradient-to-r from-purple-800/60 to-indigo-800/60 border border-purple-400/30 rounded-2xl px-5 py-3 flex items-center gap-3">
        <span className="text-yellow-300 text-lg">✨</span>
        <p className="text-sm text-purple-100">
          {displayDate ? (
            <>今日（<span className="font-bold text-white">{displayDate}</span>）の運勢更新済み — あなたの星座をチェック</>
          ) : (
            <>今日の運勢を更新中…</>
          )}
        </p>
      </div>

      {/* メインカード */}
      <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-purple-400/30 rounded-3xl overflow-hidden shadow-2xl shadow-purple-950/50">
        {/* ヘッダー */}
        <div className="px-7 pt-7 pb-5 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-bold px-3 py-0.5 rounded-full">
              毎日更新
            </span>
            <span className="text-purple-400 text-xs">日運プレビュー</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2">今日の日運チェック</h2>
          <p className="text-purple-300 text-sm mt-1">
            12星座から選ぶだけ。九星気学×四柱推命AIが今日の運気を判定します。
          </p>
        </div>

        {/* 星座グリッド */}
        <div className="p-6">
          <p className="text-xs text-purple-400 mb-4 font-medium">あなたの星座を選んでください</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {ZODIAC.map((z, i) => (
              <button
                key={z.name}
                onClick={() => setSelected(i)}
                className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-xs font-medium transition-all ${
                  selected === i
                    ? "bg-purple-500/30 border-purple-400 text-white scale-105 shadow-lg shadow-purple-900/40"
                    : "bg-white/5 border-white/10 text-purple-300 hover:bg-white/10 hover:border-purple-400/40"
                }`}
              >
                <span className="text-base mb-0.5">{z.emoji}</span>
                <span>{z.name}</span>
                <span className="text-purple-500 text-[10px]">{z.period}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 結果表示 */}
        {selected !== null && fortune && (
          <div className="px-6 pb-7">
            <div className={`border rounded-2xl p-5 mb-5 ${FORTUNE_COLOR[fortune]}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{ZODIAC[selected].emoji}</span>
                  <span className="font-bold text-white text-lg">{ZODIAC[selected].name}</span>
                </div>
                <span className="text-sm">{FORTUNE_STARS[fortune]}</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-3xl font-bold ${FORTUNE_COLOR[fortune].split(" ")[0]}`}>
                  {fortune}
                </span>
                <span className="text-white/80 text-xs leading-relaxed">{FORTUNE_HINT[fortune]}</span>
              </div>

              {/* ぼかしプレビュー */}
              <div className="mt-4 relative">
                <div className="bg-black/30 rounded-xl p-4">
                  <p className="text-xs text-purple-300 font-medium mb-2">今日の詳細運勢（AIが個別分析）</p>
                  <div className="space-y-1.5">
                    {["恋愛運：", "仕事運：", "金運：　", "ラッキーカラー：", "注意すべき時間帯："].map((label) => (
                      <div key={label} className="flex items-center gap-2 text-xs">
                        <span className="text-purple-400 shrink-0">{label}</span>
                        <span className="inline-block bg-purple-300/20 text-transparent select-none rounded px-2 py-0.5 blur-[5px]">
                          ████████████
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* ロックオーバーレイ */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/40 backdrop-blur-[2px] rounded-xl inset-0 absolute" />
                  <span className="relative text-white/70 text-xs font-medium bg-black/50 px-3 py-1 rounded-full border border-white/20">
                    有料プランで全て確認
                  </span>
                </div>
              </div>
            </div>

            {/* 有料誘導ボタン */}
            <div className="text-center">
              <Link
                href="/uranai"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/50 text-sm"
              >
                🔮 今日の詳細な運勢・対策をAIで見る →
              </Link>
              <p className="text-purple-500 text-xs mt-2">無料3回お試し可 · クレジットカード不要</p>
            </div>
          </div>
        )}

        {/* 未選択時のCTA */}
        {selected === null && (
          <div className="px-6 pb-7 text-center text-purple-500 text-sm">
            星座を選ぶと今日の運勢レベルが表示されます
          </div>
        )}
      </div>

      {/* 景表法注意書き */}
      <p className="text-center text-purple-600 text-xs mt-4">
        ※ 占いは娯楽目的です。運勢は参考程度にお楽しみください。
      </p>
    </section>
  );
}
