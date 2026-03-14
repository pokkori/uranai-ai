"use client";
import { useEffect, useState } from "react";

const FORTUNES = [
  { sign: "♈牡羊座", today: "仕事運◎ 行動力が吉を呼ぶ日", lucky: "赤", score: 88 },
  { sign: "♉牡牛座", today: "金運○ 堅実な判断が◎", lucky: "グリーン", score: 82 },
  { sign: "♊双子座", today: "恋愛運◎ 積極的な一言が転機に", lucky: "イエロー", score: 90 },
  { sign: "♋蟹座", today: "対人運○ 信頼関係が深まる日", lucky: "シルバー", score: 79 },
  { sign: "♌獅子座", today: "仕事運◎ リーダーシップを発揮", lucky: "ゴールド", score: 91 },
  { sign: "♍乙女座", today: "健康運○ 規則正しい生活が吉", lucky: "ネイビー", score: 76 },
  { sign: "♎天秤座", today: "恋愛運◎ バランス感覚が光る", lucky: "ピンク", score: 85 },
  { sign: "♏蠍座", today: "金運◎ 直感を信じて動く日", lucky: "ダークレッド", score: 87 },
  { sign: "♐射手座", today: "総合運○ 新しい出会いに期待", lucky: "パープル", score: 83 },
  { sign: "♑山羊座", today: "仕事運◎ 計画通りに進む吉日", lucky: "ブラウン", score: 89 },
  { sign: "♒水瓶座", today: "対人運◎ 独自の発想が評価される", lucky: "ターコイズ", score: 86 },
  { sign: "♓魚座", today: "恋愛運○ 感受性が高まる一日", lucky: "ラベンダー", score: 81 },
];

export default function TodayFortune() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // 日付ベースで固定（毎日変わる）
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    setIdx(dayOfYear % FORTUNES.length);
  }, []);

  const f = FORTUNES[idx];
  return (
    <div className="bg-purple-900/40 border border-purple-500/40 rounded-2xl p-4 mb-6 max-w-md mx-auto">
      <p className="text-xs text-purple-400 mb-1">🔮 今日の運勢ピックアップ</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-white text-sm">{f.sign}</p>
          <p className="text-purple-200 text-xs mt-0.5">{f.today}</p>
          <p className="text-yellow-400 text-xs mt-1">ラッキーカラー: {f.lucky}</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black text-yellow-300">{f.score}</p>
          <p className="text-xs text-purple-400">/ 100</p>
        </div>
      </div>
      <p className="text-xs text-purple-500 mt-2 text-center">全12星座の詳細鑑定はプレミアムで →</p>
    </div>
  );
}
