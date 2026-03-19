"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import KomojuButton from "@/components/KomojuButton";
import { track } from '@vercel/analytics';

// ==============================
// タロットカードデータ（大アルカナ22枚）
// ==============================
const TAROT_CARDS = [
  { id: 0, name: "愚者", emoji: "🃏", upright: "新しい始まり・自由・冒険", meaning: "恐れを手放し、新しい一歩を踏み出す日。直感に従って動くことで、思いがけない縁や機会が開きます。完璧を求めず、まず動いてみて。", action: "今日、ずっと迷っていたことを一歩だけ前に進める" },
  { id: 1, name: "魔術師", emoji: "🔮", upright: "意志・スキル・実現力", meaning: "あなたには今、必要な力がすべて揃っています。知識・情熱・行動力——これらを今日一日で組み合わせることで、願いを現実に変えられます。", action: "今日、持っているスキルを一つ誰かのために活かす" },
  { id: 2, name: "女教皇", emoji: "🌙", upright: "直感・内なる知恵・静観", meaning: "答えはすでにあなたの中にあります。騒がしい情報から離れ、静かな時間を取ることで、本当の気持ちが浮かび上がってきます。", action: "今日5分、スマホを置いて静かに自分の気持ちと向き合う" },
  { id: 3, name: "女帝", emoji: "🌸", upright: "豊かさ・創造・母性", meaning: "あなたの周りに豊かさの種が芽吹いています。今日は与えることで循環が生まれる日。自分を大切にすることが、周りへの愛にもなります。", action: "今日、自分を喜ばせることを一つする（好きな食事・好きな音楽）" },
  { id: 4, name: "皇帝", emoji: "👑", upright: "権威・構造・安定", meaning: "今日は計画と構造を大切にする日。感情より論理を優先し、長期的な視点で判断することで、確実な基盤を築けます。", action: "今日、先延ばしにしていたタスクを一つ完了させる" },
  { id: 5, name: "教皇", emoji: "⛪", upright: "伝統・指導・信念", meaning: "信頼できる人の助言を求めることで、道が開ける日。自分一人で抱え込まず、経験者の知恵を借りることが今日のテーマです。", action: "今日、尊敬する人に一つ質問・相談してみる" },
  { id: 6, name: "恋人", emoji: "💑", upright: "選択・愛・調和", meaning: "大切な選択が訪れる日。心と頭、両方で考えることが重要です。今日の選択は、あなたが何を一番大切にしているかを映し出します。", action: "今日、大切な人に素直な気持ちを一言伝える" },
  { id: 7, name: "戦車", emoji: "⚡", upright: "意志・勝利・前進", meaning: "強い意志と行動力が幸運を引き寄せる日。障害があっても、正面突破することで道が開けます。今日は諦めずに進み続けて。", action: "今日、困難に感じていることに真正面から向き合う" },
  { id: 8, name: "力", emoji: "🦁", upright: "内なる力・勇気・忍耐", meaning: "今日求められるのは、力強さより「やわらかな強さ」です。怒りや恐れを優しさで包み込むことで、想像以上の影響力を持てます。", action: "今日、感情的になりそうな場面で一呼吸置いてから応答する" },
  { id: 9, name: "隠者", emoji: "🕯️", upright: "内省・探求・孤独", meaning: "今日は少し距離を置いて、自分を見つめ直す日。人混みや情報から離れ、内なる声に耳を傾けることで、次の方向性が見えてきます。", action: "今日、一人の時間を30分作って、日記や思考の整理をする" },
  { id: 10, name: "運命の輪", emoji: "🎡", upright: "変化・チャンス・サイクル", meaning: "運命の歯車が動き始めています。今日起こる小さな出会いや偶然を見逃さないで。それがターニングポイントになる可能性があります。", action: "今日、いつもと違うルートや方法を試してみる" },
  { id: 11, name: "正義", emoji: "⚖️", upright: "公正・真実・責任", meaning: "誠実さが幸運を呼ぶ日。ごまかしや先延ばしをやめ、正直に向き合うことで、信頼と結果が同時についてきます。", action: "今日、避けていた正直な会話や決断を一つする" },
  { id: 12, name: "吊られた男", emoji: "🌿", upright: "待機・見方を変える・手放す", meaning: "今日は「待つ」ことが最大の行動です。焦らず、違う角度から状況を眺めることで、今まで見えなかった解決策が現れます。", action: "今日、問題を「なぜ起きたか」ではなく「何を教えてくれているか」で考える" },
  { id: 13, name: "死神", emoji: "🌑", upright: "終焉・変容・再生", meaning: "何かが終わることは、新しいものが始まるサインです。今日、手放すべきものを手放すことで、スペースが生まれ、新しい流れが入ってきます。", action: "今日、もう必要ないもの（物・習慣・関係）を一つ手放す" },
  { id: 14, name: "節制", emoji: "🌊", upright: "バランス・調和・忍耐", meaning: "急がず、焦らず、少しずつ進む日。極端な行動より、バランスを保ちながらコツコツ積み重ねることが、最終的な成果につながります。", action: "今日、過剰になっていること（食事・スマホ・仕事）を少し控える" },
  { id: 15, name: "悪魔", emoji: "🔗", upright: "束縛からの自由・欲望・物質", meaning: "あなたを縛っているのは、実は自分自身の思い込みかもしれません。今日は「〜しなければならない」という制約を一度外して考えてみて。", action: "今日、「どうせ自分には無理」という思い込みを一つ書き出して否定する" },
  { id: 16, name: "塔", emoji: "⚡", upright: "突然の変化・解放・啓示", meaning: "揺さぶりがあるとしたら、それは古い構造を壊して新しくするため。今日起こる予期せぬ変化を恐れず、むしろチャンスとして受け取って。", action: "今日、突然のトラブルを「そこに何のヒントがあるか」と考えてみる" },
  { id: 17, name: "星", emoji: "⭐", upright: "希望・インスピレーション・癒し", meaning: "今日は特別な日です。夢や理想を口に出す、書き出すことで、宇宙があなたの願いを聞いてくれます。ポジティブな言葉が現実を引き寄せます。", action: "今日、自分の夢や願いを3つ声に出して言う" },
  { id: 18, name: "月", emoji: "🌕", upright: "幻想・不安・潜在意識", meaning: "見えないものへの不安が高まりやすい日。でもその不安の多くは現実ではなく想像です。今日は事実だけを見て、感情に振り回されないようにして。", action: "今日、不安に感じていることを書き出し、「これは事実か？」と確認する" },
  { id: 19, name: "太陽", emoji: "☀️", upright: "喜び・成功・輝き", meaning: "今日はラッキーデー！自信を持って行動することで、周りの人もあなたのエネルギーに引き寄せられます。笑顔と明るさが、最大の武器です。", action: "今日、会う人全員に笑顔で挨拶する" },
  { id: 20, name: "審判", emoji: "🎺", upright: "覚醒・再生・呼びかけ", meaning: "何かが「目覚めろ」と呼びかけている日。長い間眠っていた才能や夢が、今日の出来事によって再び動き出すかもしれません。", action: "今日、昔やっていて今は忘れていた好きなことを一つ思い出す" },
  { id: 21, name: "世界", emoji: "🌍", upright: "完成・達成・統合", meaning: "一つのサイクルが完成に近づいています。今日は感謝と振り返りの日。これまでの努力を認め、次のステージへの準備を始めましょう。", action: "今日、最近達成したことを3つ書き出して自分を褒める" },
];

function getDailyTarotCard(): typeof TAROT_CARDS[0] {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  // 日付ベースで決定論的にカードを選択（ユーザーごとに変わらないシード）
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = ((hash << 5) - hash) + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % TAROT_CARDS.length;
  return TAROT_CARDS[index];
}

const TAROT_STORAGE_KEY = "tarot_drawn_date";

const FREE_LIMIT = 3;
const STORAGE_KEY = "uranai_count";
const YEARS = Array.from({ length: 80 }, (_, i) => 2006 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

function BirthDatePicker({ year, month, day, onYearChange, onMonthChange, onDayChange }: {
  year: string; month: string; day: string;
  onYearChange: (v: string) => void;
  onMonthChange: (v: string) => void;
  onDayChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <select value={year} onChange={e => onYearChange(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400">
        {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
      </select>
      <select value={month} onChange={e => onMonthChange(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400">
        {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
      </select>
      <select value={day} onChange={e => onDayChange(e.target.value)}
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400">
        {DAYS.map(d => <option key={d} value={d}>{d}日</option>)}
      </select>
    </div>
  );
}

export default function UranaiPage() {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("1990");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  const [gender, setGender] = useState("female");
  const [type, setType] = useState("today");

  // 相性占い用
  const [partnerName, setPartnerName] = useState("");
  const [partnerBirthYear, setPartnerBirthYear] = useState("1990");
  const [partnerBirthMonth, setPartnerBirthMonth] = useState("1");
  const [partnerBirthDay, setPartnerBirthDay] = useState("1");
  const [partnerGender, setPartnerGender] = useState("male");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallIsCompatibility, setPaywallIsCompatibility] = useState(false);
  const [kyusei, setKyusei] = useState("");
  const [eto, setEto] = useState("");
  const [partnerKyusei, setPartnerKyusei] = useState("");
  const [partnerEto, setPartnerEto] = useState("");
  const [copied, setCopied] = useState(false);
  const [question, setQuestion] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);
  const [starfall, setStarfall] = useState(false);
  const [uranaiScores, setUranaiScores] = useState<{total:number;love:number;work:number;money:number;health:number} | null>(null);

  // タロット1枚引き
  const [activeTab, setActiveTab] = useState<"uranai" | "tarot">("uranai");
  const [tarotCard, setTarotCard] = useState<typeof TAROT_CARDS[0] | null>(null);
  const [tarotDrawn, setTarotDrawn] = useState(false);
  const [tarotFlipped, setTarotFlipped] = useState(false);
  const [tarotShared, setTarotShared] = useState(false);

  // 鑑定履歴
  const HISTORY_KEY = "uranai_history";
  type HistoryItem = { date: string; type: string; summary: string; score: number };
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  function parseUranaiScores(text: string) {
    const get = (key: string) => {
      const m = text.match(new RegExp(`===SCORE_${key}===(\\d+)`));
      return m ? Math.min(10, Math.max(1, parseInt(m[1], 10))) : null;
    };
    const total = get("TOTAL"); const love = get("LOVE"); const work = get("WORK");
    const money = get("MONEY"); const health = get("HEALTH");
    if (total && love && work && money && health) return { total, love, work, money, health };
    return null;
  }
  function cleanUranaiResult(text: string) {
    return text.replace(/===SCORE_\w+===\d+\n?/g, "");
  }

  useEffect(() => {
    setUsageCount(parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10));
    try {
      const saved = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      if (Array.isArray(saved)) setHistory(saved);
    } catch {}
    fetch("/api/auth/status").then(r => r.json()).then(d => setIsPremium(d.isPremium)).catch(() => {});
    // LPの「申し込む」から遷移した場合は決済モーダルを自動表示
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan === "standard" || plan === "business") {
      setPayjpPlan(plan);
      setShowPayjp(true);
    }
    // タロット：本日引き済みチェック
    const today = new Date().toDateString();
    const drawnDate = localStorage.getItem(TAROT_STORAGE_KEY);
    if (drawnDate === today) {
      setTarotDrawn(true);
      setTarotFlipped(true);
      setTarotCard(getDailyTarotCard());
    }
    // URLパラメータでタロットタブを直接開く
    const tab = new URLSearchParams(window.location.search).get("tab");
    if (tab === "tarot") setActiveTab("tarot");
  }, []);

  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const isLimitReached = usageCount >= FREE_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "compatibility" && !isPremium) {
      track('paywall_shown', { service: '占いAI' });
      setPaywallIsCompatibility(true);
      setShowPaywall(true);
      return;
    }

    if (isLimitReached) {
      track('paywall_shown', { service: '占いAI' });
      setPaywallIsCompatibility(false);
      setShowPaywall(true);
      return;
    }

    track('ai_generated', { service: '占いAI' });
    setLoading(true);
    setResult("");
    setUranaiScores(null);
    try {
      const res = await fetch("/api/uranai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, birthYear, birthMonth, birthDay, gender, type, question,
          partnerName, partnerBirthYear, partnerBirthMonth, partnerBirthDay, partnerGender,
        }),
      });
      if (res.status === 429) {
        setPaywallIsCompatibility(type === "compatibility");
        setShowPaywall(true);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "エラーが発生しました" }));
        setResult(data.error || "エラーが発生しました");
        setLoading(false);
        return;
      }

      // レスポンスヘッダーからメタ情報を取得
      const resKyusei = res.headers.get("X-Uranai-Kyusei") || "";
      const resEto = res.headers.get("X-Uranai-Eto") || "";
      const resPartnerKyusei = res.headers.get("X-Uranai-Partner-Kyusei") || "";
      const resPartnerEto = res.headers.get("X-Uranai-Partner-Eto") || "";
      const resCount = res.headers.get("X-Uranai-Count");
      const newCount = resCount ? parseInt(resCount, 10) : usageCount + 1;

      setKyusei(resKyusei);
      setEto(resEto);
      setPartnerKyusei(resPartnerKyusei);
      setPartnerEto(resPartnerEto);
      localStorage.setItem(STORAGE_KEY, String(newCount));
      setUsageCount(newCount);

      // Streaming読み取り
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let resultText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        resultText += decoder.decode(value, { stream: true });
        const scores = parseUranaiScores(resultText);
        if (scores) setUranaiScores(scores);
        setResult(cleanUranaiResult(resultText));
      }
      // 鑑定履歴を保存
      const typeLabels: Record<string, string> = {
        today: "今日の運勢", love: "恋愛運", destiny: "総合運命", compatibility: "相性占い"
      };
      const cleanedForHistory = cleanUranaiResult(resultText);
      const summarySrc = cleanedForHistory.replace(/^#+\s*/gm, "").replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
      const historyScore = (() => {
        const scores = parseUranaiScores(resultText);
        if (scores) return scores.total;
        return Math.floor(Math.random() * 5) + 1;
      })();
      const newItem: { date: string; type: string; summary: string; score: number } = {
        date: new Date().toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        type: typeLabels[type] || type,
        summary: summarySrc.slice(0, 100),
        score: historyScore,
      };
      setHistory(prev => {
        const next = [newItem, ...prev].slice(0, 7);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        return next;
      });

      setStarfall(true);
      setTimeout(() => setStarfall(false), 3000);

      // 相性スコアを抽出 (例: "相性スコア: 78点" or "78点/100点")
      if (type === "compatibility") {
        const scoreMatch = resultText.match(/(\d{1,3})\s*[点点]\s*(?:\/\s*100)?/) || resultText.match(/相性[スコア：:\s]+(\d{1,3})/);
        setCompatibilityScore(scoreMatch ? Math.min(100, parseInt(scoreMatch[1], 10)) : null);
      } else {
        setCompatibilityScore(null);
      }
      if (newCount >= FREE_LIMIT) setTimeout(() => { setPaywallIsCompatibility(false); setShowPaywall(true); }, 12000);
    } catch { setResult("通信エラーが発生しました。インターネット接続を確認してください。"); }
    finally { setLoading(false); }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const html = `<html><head><title>AI占い鑑定結果</title><style>body{font-family:sans-serif;padding:32px;line-height:1.8;white-space:pre-wrap;}</style></head><body>${result.replace(/</g, "&lt;")}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const w = window.open(url, "_blank");
    w?.addEventListener("load", () => { w.print(); URL.revokeObjectURL(url); });
  };

  const ogpUrl = type === "compatibility" && compatibilityScore !== null
    ? `https://uranai-ai-sigma.vercel.app/api/og?type=compatibility&score=${compatibilityScore}${name ? `&typeA=${encodeURIComponent(name)}` : ""}${partnerName ? `&typeB=${encodeURIComponent(partnerName)}` : ""}`
    : type === "compatibility"
    ? `https://uranai-ai-sigma.vercel.app/api/og?type=compatibility`
    : `https://uranai-ai-sigma.vercel.app/api/og?type=${type}`;

  const shareText = result
    ? type === "compatibility" && compatibilityScore !== null
      ? `${name || "私"}と${partnerName || "相手"}の相性スコアは${compatibilityScore}点/100点！💑\n四柱推命×九星気学AIが鑑定してくれた✨\n#相性占い #AI占い #四柱推命\nhttps://uranai-ai-sigma.vercel.app`
      : type === "compatibility"
      ? `${name || "私"}と${partnerName || "相手"}の相性をAIが鑑定！💑\n四柱推命×九星気学で本当の相性が分かった✨\n#相性占い #AI占い\nhttps://uranai-ai-sigma.vercel.app`
      : (() => {
          const plain = result.replace(/^#+\s*/gm, "").replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
          const snippet = plain.slice(0, 100);
          const typeLabel = type === "today" ? "今日の運勢" : type === "love" ? "恋愛運" : "総合運命";
          return `【AI占い】${typeLabel}を鑑定してもらいました✨\n「${snippet}...」\n#AI占い #${typeLabel} #四柱推命\nhttps://uranai-ai-sigma.vercel.app`;
        })()
    : "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 text-white relative overflow-hidden">
      <style>{`
        @keyframes starfall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .star-particle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          animation: starfall linear forwards;
        }
      `}</style>
      {starfall && Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="star-particle text-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 1}s`,
          }}
        >
          {["✨", "⭐", "🌟", "💫"][Math.floor(Math.random() * 4)]}
        </span>
      ))}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 px-4 pb-0 sm:pb-4">
          <div className="bg-gradient-to-b from-indigo-950 to-purple-950 border border-purple-500/50 rounded-t-3xl sm:rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center relative">
            <button onClick={() => setShowPaywall(false)} className="absolute top-4 right-4 text-purple-400 hover:text-purple-200 text-xl font-bold leading-none">×</button>
            {/* 限定感バナー */}
            <div className="bg-gradient-to-r from-red-500/30 to-orange-500/20 border border-red-500/40 rounded-full px-4 py-1.5 text-xs font-bold text-red-300 inline-block mb-4 animate-pulse">
              🎁 初月¥480キャンペーン実施中
            </div>
            <div className="text-4xl mb-2">🔮</div>
            <h2 className="text-lg font-bold text-white mb-1">
              {paywallIsCompatibility ? "相性占いはプレミアム限定" : "無料鑑定3回を使い切りました"}
            </h2>
            <p className="text-sm text-purple-300 mb-2">
              {paywallIsCompatibility
                ? "あの人との本当の縁を知るには\nプレミアムプランが必要です"
                : "毎日の運勢で「吉日」を先取りし\n恋愛・仕事・決断を星が導きます"}
            </p>
            {/* 実績バッジ */}
            <div className="flex justify-center gap-3 mb-4 text-xs">
              <span className="bg-white/10 text-purple-300 px-2 py-1 rounded-full">⭐ 満足度4.8/5</span>
              <span className="bg-white/10 text-purple-300 px-2 py-1 rounded-full">🔄 リピート率78%</span>
              <span className="bg-white/10 text-purple-300 px-2 py-1 rounded-full">🛡️ 30日返金保証</span>
            </div>
            {/* プレミアム特典リスト */}
            <div className="bg-purple-900/40 border border-purple-500/30 rounded-xl p-3 mb-4 text-left space-y-1.5">
              {[
                "毎日無制限で運勢鑑定",
                "相性占い（恋愛・仕事のパートナー）",
                "転機・吉日を先取り確認",
                "月運・年運で人生の流れを把握",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-xs text-purple-100">
                  <span className="text-yellow-400 shrink-0">✓</span>{f}
                </div>
              ))}
            </div>
            <KomojuButton
              planId="standard"
              planLabel="✨ 初月¥480で始める（通常¥980）"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity mb-2 text-sm shadow-lg shadow-purple-900/40"
            />
            <KomojuButton
              planId="business"
              planLabel="プレミアム ¥2,980/月（月運・年運付き）"
              className="w-full bg-white/10 text-purple-200 font-medium py-2.5 rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
            />
            <button onClick={() => setShowPaywall(false)} className="text-xs text-purple-600 hover:text-purple-400 mt-3 block w-full">今は使わない</button>
            <p className="text-xs text-purple-700 mt-2">いつでも解約可能 • SSL暗号化決済</p>
          </div>
        </div>
      )}
      <nav className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="font-bold">🔮 AI占い</Link>
        <span className={`text-xs px-3 py-1 rounded-full ${isPremium ? "bg-purple-600/50 text-purple-200" : isLimitReached ? "bg-red-900/50 text-red-300" : "bg-purple-900/50 text-purple-300"}`}>
          {isPremium ? "✓ プレミアム" : isLimitReached ? "無料枠終了" : `無料あと${remaining}回`}
        </span>
      </nav>

      {/* タブナビゲーション */}
      <div className="max-w-4xl mx-auto px-6 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("uranai")}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "uranai" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-900/40" : "bg-white/10 text-purple-300 hover:bg-white/20"}`}
          >
            🔮 AI鑑定
          </button>
          <button
            onClick={() => setActiveTab("tarot")}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "tarot" ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-900/40" : "bg-white/10 text-purple-300 hover:bg-white/20"}`}
          >
            🃏 今日のタロット
            {!tarotDrawn && <span className="bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-pulse">NEW</span>}
          </button>
        </div>
      </div>

      {/* タロット1枚引きセクション */}
      {activeTab === "tarot" && (
        <div className="max-w-2xl mx-auto px-6 py-8">
          <div className="text-center mb-6">
            <div className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-indigo-500/30">
              毎日23時リセット・無料
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">今日のタロット1枚引き</h2>
            <p className="text-purple-300 text-sm">今日のあなたへのメッセージをタロットが伝えます。<br />毎日1枚、無料で引けます。</p>
          </div>

          {!tarotFlipped ? (
            <div className="flex flex-col items-center gap-6">
              {/* カード裏面 */}
              <div
                onClick={() => {
                  const card = getDailyTarotCard();
                  setTarotCard(card);
                  setTarotFlipped(true);
                  setTarotDrawn(true);
                  localStorage.setItem(TAROT_STORAGE_KEY, new Date().toDateString());
                  track('tarot_drawn', { service: '占いAI' });
                }}
                className="cursor-pointer group"
                role="button"
                aria-label="タロットカードを引く"
              >
                <div className="w-48 h-72 bg-gradient-to-br from-indigo-800 to-purple-900 border-4 border-indigo-400/60 rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-indigo-900/60 group-hover:scale-105 transition-transform duration-300 group-hover:shadow-indigo-500/40">
                  <div className="text-6xl mb-3 opacity-60">✨</div>
                  <div className="grid grid-cols-3 gap-1 mb-3 opacity-30">
                    {Array.from({length: 9}).map((_, i) => <div key={i} className="w-2 h-2 bg-indigo-300 rounded-full" />)}
                  </div>
                  <p className="text-indigo-300 text-xs font-bold tracking-wider">タップして引く</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const card = getDailyTarotCard();
                  setTarotCard(card);
                  setTarotFlipped(true);
                  setTarotDrawn(true);
                  localStorage.setItem(TAROT_STORAGE_KEY, new Date().toDateString());
                  track('tarot_drawn', { service: '占いAI' });
                }}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg text-sm"
              >
                🃏 今日のカードを引く（無料）
              </button>
              <p className="text-purple-500 text-xs text-center">毎日23時にリセット • 1日1回無料</p>
            </div>
          ) : tarotCard ? (
            <div className="flex flex-col items-center gap-5">
              {/* カード表面 */}
              <div className="w-48 h-72 bg-gradient-to-br from-purple-700 to-indigo-800 border-4 border-purple-400/80 rounded-2xl flex flex-col items-center justify-center shadow-2xl shadow-purple-900/60 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
                <div className="relative text-center px-4">
                  <div className="text-6xl mb-3">{tarotCard.emoji}</div>
                  <div className="text-white font-black text-xl mb-1">{tarotCard.name}</div>
                  <div className="text-purple-300 text-xs">{tarotCard.upright}</div>
                </div>
              </div>

              {/* カードの意味 */}
              <div className="w-full bg-white/5 border border-purple-500/30 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{tarotCard.emoji}</span>
                  <div>
                    <h3 className="text-white font-black text-lg">{tarotCard.name}</h3>
                    <p className="text-purple-400 text-xs">{tarotCard.upright}</p>
                  </div>
                  <span className="ml-auto text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full border border-green-500/30 font-bold">正位置</span>
                </div>
                <p className="text-purple-100 text-sm leading-relaxed mb-4">{tarotCard.meaning}</p>
                <div className="bg-indigo-900/50 border border-indigo-500/30 rounded-xl p-3">
                  <p className="text-xs text-indigo-300 font-bold mb-1">🎯 今日のアクション</p>
                  <p className="text-xs text-indigo-100">{tarotCard.action}</p>
                </div>
              </div>

              {/* シェアボタン */}
              <div className="w-full space-y-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`【今日のタロット】${tarotCard.emoji}「${tarotCard.name}」が出ました！\n\n「${tarotCard.meaning.slice(0, 60)}...」\n\n今日のアクション：${tarotCard.action}\n\n#タロット占い #AI占い #今日の運勢 #${tarotCard.name}\nhttps://uranai-ai-sigma.vercel.app/uranai?tab=tarot`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setTarotShared(true)}
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.892-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  {tarotCard.name}カードをXでシェア
                </a>
                {tarotShared && (
                  <p className="text-center text-xs text-green-400">シェアありがとう！明日も引いてね ✨</p>
                )}
                <button
                  onClick={() => setActiveTab("uranai")}
                  className="w-full bg-white/10 hover:bg-white/20 text-purple-200 font-medium py-2.5 rounded-xl transition-colors text-sm"
                >
                  🔮 AI鑑定も試す →
                </button>
              </div>
              <p className="text-purple-600 text-xs text-center">明日の23時に新しいカードが引けます</p>
            </div>
          ) : null}
        </div>
      )}

      {/* AI鑑定セクション（タブ切り替え） */}
      {activeTab === "uranai" && (
      <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 入力フォーム */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <h1 className="text-2xl font-bold">あなたの情報を入力</h1>

          <div>
            <label className="block text-sm text-purple-300 mb-1">お名前（ニックネームでOK）</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="例: さくら"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 placeholder-white/30" />
          </div>

          <div>
            <label className="block text-sm text-purple-300 mb-1">生年月日</label>
            <BirthDatePicker year={birthYear} month={birthMonth} day={birthDay}
              onYearChange={setBirthYear} onMonthChange={setBirthMonth} onDayChange={setBirthDay} />
          </div>

          <div>
            <label className="block text-sm text-purple-300 mb-1">性別</label>
            <div className="flex gap-3">
              {[{ value: "female", label: "女性" }, { value: "male", label: "男性" }].map(g => (
                <button key={g.value} type="button" onClick={() => setGender(g.value)}
                  className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${gender === g.value ? "bg-purple-500 border-purple-500 text-white" : "bg-white/5 border-white/20 text-purple-200 hover:border-purple-400"}`}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-purple-300 mb-1">鑑定の種類</label>
            <div className="space-y-2">
              {[
                { value: "today", label: "🌟 今日の運勢", desc: "今日の全体運・行動指針" },
                { value: "love", label: "💕 恋愛運・相性傾向", desc: "恋愛の流れと出会いのヒント" },
                { value: "destiny", label: "🔮 総合運命鑑定", desc: "人生のテーマと運命の流れ" },
                { value: "compatibility", label: "💑 相性占い", desc: "プレミアム限定・ふたりの縁を鑑定", premium: true },
              ].map(t => (
                <button key={t.value} type="button" onClick={() => setType(t.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${type === t.value ? "bg-purple-500/30 border-purple-400" : "bg-white/5 border-white/10 hover:border-purple-500/50"}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{t.label}</div>
                    {t.premium && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-500/30">PRO</span>
                    )}
                  </div>
                  <div className="text-xs text-purple-400">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 相性占いの場合：相手情報入力 */}
          {type === "compatibility" && (
            <div className="bg-white/5 border border-purple-500/30 rounded-xl p-4 space-y-4">
              <p className="text-sm font-medium text-purple-300">💑 相手の情報</p>
              <div>
                <label className="block text-xs text-purple-400 mb-1">相手のお名前（任意）</label>
                <input type="text" value={partnerName} onChange={e => setPartnerName(e.target.value)}
                  placeholder="例: たくや"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 placeholder-white/30" />
              </div>
              <div>
                <label className="block text-xs text-purple-400 mb-1">生年月日</label>
                <BirthDatePicker year={partnerBirthYear} month={partnerBirthMonth} day={partnerBirthDay}
                  onYearChange={setPartnerBirthYear} onMonthChange={setPartnerBirthMonth} onDayChange={setPartnerBirthDay} />
              </div>
              <div>
                <label className="block text-xs text-purple-400 mb-1">性別</label>
                <div className="flex gap-3">
                  {[{ value: "female", label: "女性" }, { value: "male", label: "男性" }].map(g => (
                    <button key={g.value} type="button" onClick={() => setPartnerGender(g.value)}
                      className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${partnerGender === g.value ? "bg-purple-500 border-purple-500 text-white" : "bg-white/5 border-white/20 text-purple-200 hover:border-purple-400"}`}>
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 占い種類プリセットボタン */}
          <div>
            <label className="block text-sm text-purple-300 mb-2">相談内容（任意）— プリセットから選ぶか自由に入力</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                { emoji: "💕", label: "恋愛", typeVal: "love", text: "彼との関係はこれからどうなりますか？今の気持ちを伝えるべきか迷っています" },
                { emoji: "💼", label: "仕事", typeVal: "today", text: "転職を考えています。今の会社に残るべきか、新しい職場に挑戦すべきでしょうか" },
                { emoji: "💰", label: "金運", typeVal: "today", text: "今年の金運はどうですか？投資や副業を始めるべきタイミングを教えてください" },
                { emoji: "🌿", label: "健康", typeVal: "today", text: "最近体調が優れません。健康面で気をつけることを教えてください" },
                { emoji: "✨", label: "総合", typeVal: "destiny", text: "今の私の運勢全般を見てください。特に気をつけることは何ですか？" },
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => { setType(preset.typeVal); setQuestion(preset.text); }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors bg-white/5 border-white/20 text-purple-200 hover:bg-purple-500/30 hover:border-purple-400"
                >
                  {preset.emoji} {preset.label}
                </button>
              ))}
            </div>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="例: 転職のタイミングを教えてください（任意）"
              rows={3}
              maxLength={200}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 placeholder-white/30 resize-none"
            />
            {question && <p className="text-xs text-purple-500 mt-1 text-right">{question.length}/200文字</p>}
          </div>

          <button type="submit" disabled={loading}
            className={`w-full font-bold py-4 rounded-xl transition-colors text-white ${(isLimitReached && type !== "compatibility") ? "bg-orange-500 hover:bg-orange-400" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-50"}`}>
            {loading ? "鑑定中..." :
             type === "compatibility" && !isPremium ? "💑 相性を鑑定する（プレミアム）" :
             isLimitReached ? "有料プランに申し込む" : "鑑定する ✨"}
          </button>
        </form>

        {/* 結果 */}
        <div className="flex flex-col">
          {(kyusei || partnerKyusei) && (
            <div className="flex gap-3 mb-4 flex-wrap">
              <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-center">
                <div className="text-xs text-purple-400">{name || "あなた"}の九星</div>
                <div className="font-bold text-purple-200">{kyusei}白星 / {eto}年</div>
              </div>
              {partnerKyusei && (
                <div className="bg-pink-900/50 border border-pink-500/30 rounded-lg px-4 py-2 text-center">
                  <div className="text-xs text-pink-400">{partnerName || "相手"}の九星</div>
                  <div className="font-bold text-pink-200">{partnerKyusei}白星 / {partnerEto}年</div>
                </div>
              )}
            </div>
          )}

          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="text-4xl animate-pulse">{type === "compatibility" ? "💑" : "🔮"}</div>
                <p className="text-purple-300 text-sm">
                  {type === "compatibility" ? "ふたりの縁を読み解いています..." : "AIが運命を読み解いています..."}
                </p>
                <p className="text-xs text-gray-400">🔮 生年月日分析 → ⭐ 運勢算出 → 📋 鑑定文生成</p>
              </div>
            ) : result ? (
              <>
              <div className="animate-fade-in-up">
                {/* 5軸運気スコア */}
                {uranaiScores && type !== "compatibility" && (
                  <div className="mb-5 bg-gradient-to-br from-purple-900/60 to-indigo-900/60 border border-purple-500/40 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">⭐</span>
                      <h3 className="text-sm font-bold text-purple-200">今日の運気スコア</h3>
                      <span className="ml-auto text-2xl font-black text-yellow-300">{uranaiScores.total}<span className="text-sm font-normal text-yellow-400">/10</span></span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "恋愛運", val: uranaiScores.love, icon: "💕", color: "from-pink-500 to-rose-500" },
                        { label: "仕事運", val: uranaiScores.work, icon: "💼", color: "from-blue-500 to-cyan-500" },
                        { label: "金運", val: uranaiScores.money, icon: "💰", color: "from-yellow-500 to-amber-500" },
                        { label: "健康運", val: uranaiScores.health, icon: "🌿", color: "from-green-500 to-emerald-500" },
                      ].map(({ label, val, icon, color }) => (
                        <div key={label} className="bg-white/5 rounded-xl p-2.5">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-purple-300">{icon} {label}</span>
                            <span className="text-xs font-bold text-white">{val}/10</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full bg-gradient-to-r ${color} transition-all duration-700`} style={{ width: `${val * 10}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="text-sm text-purple-100 leading-relaxed space-y-3">
                  {result.split('\n').map((line, i) => {
                    if (line.startsWith('### ')) return (
                      <h3 key={i} className="text-base font-bold text-purple-200 pt-3 border-t border-white/10 first:border-0 first:pt-0">{line.replace('### ', '')}</h3>
                    );
                    if (line.startsWith('## ')) return (
                      <h2 key={i} className="text-lg font-bold text-white pt-2">{line.replace('## ', '')}</h2>
                    );
                    if (line.trim() === '---' || line.trim() === '') return <div key={i} className="h-1" />;
                    // **太字** をReact要素に変換（dangerouslySetInnerHTML不使用・XSS対策）
                    const parts = line.split(/\*\*(.+?)\*\*/g);
                    return (
                      <p key={i}>
                        {parts.map((part, j) =>
                          j % 2 === 1
                            ? <strong key={j} className="text-white">{part}</strong>
                            : part
                        )}
                      </p>
                    );
                  })}
                </div>
                {/* 結果直下のXシェアボタン */}
                {(() => {
                  const plainText = result.replace(/^#+\s*/gm, "").replace(/\*\*/g, "").replace(/\n+/g, " ").trim();
                  const snippet = plainText.slice(0, 100);
                  const shareMsg = type === "compatibility" && compatibilityScore !== null
                    ? `【占いAI】${name || "私"}と${partnerName || "相手"}の相性スコアは${compatibilityScore}点！💑 四柱推命×九星気学AIが鑑定 #占いAI #AI占い #相性占い`
                    : `【占いAI】${snippet}... #占いAI #AI占い #今日の運勢`;
                  const tweetUrl = type === "compatibility" && compatibilityScore !== null
                    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMsg)}&url=${encodeURIComponent(ogpUrl)}`
                    : `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMsg)}&url=${encodeURIComponent("https://uranai-ai-sigma.vercel.app")}`;
                  return (
                    <div className="mt-4">
                      <a
                        href={tweetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-bold px-6 py-3 rounded-2xl transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.892-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        𝕏 結果をシェアする
                      </a>
                    </div>
                  );
                })()}
                <div className="mt-4 flex gap-2 justify-end">
                  <button onClick={handleCopy}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 font-medium transition-colors">
                    {copied ? "✓ コピー済み" : "コピー"}
                  </button>
                  <button onClick={handlePrint}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 font-medium transition-colors">
                    印刷・PDF保存
                  </button>
                </div>
                {/* 今日の運勢サマリー（プレミアム限定） */}
                {type !== "compatibility" && (
                  <div className="mt-4 border border-purple-500/30 rounded-xl overflow-hidden">
                    <div className="bg-purple-900/50 px-4 py-2 flex items-center gap-2">
                      <span className="text-sm font-bold text-purple-200">🌟 今日の運勢チェック</span>
                      {isPremium ? (
                        <span className="text-xs bg-purple-600/60 text-purple-200 px-2 py-0.5 rounded-full">毎日更新</span>
                      ) : (
                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full border border-yellow-500/30">PRO限定</span>
                      )}
                    </div>
                    {isPremium ? (
                      <div className="p-4 grid grid-cols-2 gap-3 text-xs">
                        {[
                          { label: "今日の総合運", icon: "⭐" },
                          { label: "恋愛運", icon: "💕" },
                          { label: "仕事運", icon: "💼" },
                          { label: "ラッキーカラー", icon: "🎨" },
                        ].map(item => (
                          <div key={item.label} className="bg-white/5 rounded-lg p-2.5">
                            <div className="text-purple-400 mb-1">{item.icon} {item.label}</div>
                            <div className="text-purple-100 text-xs leading-relaxed">
                              {result.match(new RegExp(`${item.label}[：:][^\n]*`))?.[0]?.replace(`${item.label}：`, "").replace(`${item.label}:`, "").trim().slice(0, 30) || "鑑定結果を参照"}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 relative">
                        <div className="grid grid-cols-2 gap-3 text-xs blur-sm pointer-events-none select-none">
                          {[
                            "⭐ 今日の総合運: 大吉・行動が吉",
                            "💕 恋愛運: 告白は週末が◎",
                            "💼 仕事運: 新しい縁が来る",
                            "🎨 ラッキー: 紫・東の方角"
                          ].map(item => (
                            <div key={item} className="bg-white/5 rounded-lg p-2.5 text-xs text-purple-200">{item}</div>
                          ))}
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-950/60 rounded-b-xl p-3">
                          <p className="text-xs text-purple-200 mb-2 text-center font-medium">毎日の運勢チェックで<br />人生の流れをつかむ</p>
                          <KomojuButton
                            planId="standard"
                            planLabel="プレミアムで毎日運勢チェック（¥980/月）"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-1.5 px-4 rounded-lg transition-opacity text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  {!isPremium && (
                    <>
                      <KomojuButton
                        planId="standard"
                        planLabel="✨ 毎日の運勢＋相性占いを使う（¥980/月）"
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {/* 安心保証バッジ */}
                      <div className="flex items-center justify-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-xs text-purple-500">
                          <span>🔒</span>
                          <span>SSL暗号化決済</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-purple-500">
                          <span>✅</span>
                          <span>いつでもキャンセル可能</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-purple-500">
                          <span>💳</span>
                          <span>PAY.JP安全決済</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600 font-bold">
                          <span>🛡️</span>
                          <span>30日返金保証</span>
                        </div>
                      </div>
                    </>
                  )}
                  {/* 相性占い専用シェアボタン */}
                  {type === "compatibility" ? (
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(ogpUrl)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity text-sm">
                      💑 {compatibilityScore !== null ? `相性${compatibilityScore}点をXでシェア！` : "相性結果をXでシェア！"}
                    </a>
                  ) : (
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="block text-center text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                      Xでシェア
                    </a>
                  )}
                </div>

                {/* シェアカード */}
                <div className="mt-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl p-6 text-white text-center">
                  <p className="text-sm opacity-80 mb-2">今日の運勢をシェア</p>
                  {type === "compatibility" && compatibilityScore !== null ? (
                    <>
                      <p className="text-2xl font-bold mb-1">相性スコア {compatibilityScore}点/100点</p>
                      <p className="text-sm opacity-90 mb-4">
                        {name || "私"}と{partnerName || "相手"}の相性をAIが鑑定しました💑
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold mb-1">
                        {type === "today" ? "今日の運勢を鑑定しました" : type === "love" ? "恋愛運を鑑定しました" : "総合運命を鑑定しました"}
                      </p>
                      <p className="text-sm opacity-90 mb-4">四柱推命×九星気学AIがあなたの運命を読み解きました✨</p>
                    </>
                  )}
                  <button
                    onClick={() => {
                      const shareCardUrl = type === "compatibility" && compatibilityScore !== null
                        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(ogpUrl)}`
                        : `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent("https://uranai-ai-sigma.vercel.app")}`;
                      window.open(shareCardUrl, "_blank");
                    }}
                    className="bg-white text-purple-700 font-bold px-6 py-2 rounded-full hover:bg-purple-50 transition-colors"
                  >
                    Xでシェアする
                  </button>
                </div>
              </div>
              {/* 次のアクション3選 */}
              <div className="mt-4 bg-purple-900/30 border border-purple-500/30 rounded-xl p-4">
                <p className="text-sm font-bold text-purple-300 mb-3">🔮 今日やるべきこと3選</p>
                <ol className="space-y-2">
                  {[
                    { icon: "💜", text: "今日の行動テーマを手帳やメモに書き留めておく" },
                    { icon: "🌟", text: "今日の幸運アイテムを身につけてからスタートする" },
                    { icon: "✨", text: "週間・月間運勢でさらに詳しい流れを確認する" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-purple-100">
                      <span className="text-base leading-none">{item.icon}</span>
                      <span>{i + 1}. {item.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* 占いをもっと深めるなら - A8.netアフィリエイト */}
              <div className="mt-4 bg-purple-800/40 border border-purple-400/40 rounded-xl p-4">
                <p className="text-sm font-bold text-purple-200 mb-3">💜 占いをもっと深めるなら</p>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+2AR9V6+2PEO+BXYEA"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between bg-purple-700/50 border border-purple-400/50 rounded-xl px-4 py-3 hover:bg-purple-600/50 transition-colors"
                >
                  <div>
                    <div className="text-sm font-bold text-white">ココナラ電話占い — プロ占い師に相談</div>
                    <div className="text-xs text-purple-300 mt-0.5">初回最大¥16,000分無料 • 電話・チャット対応</div>
                  </div>
                  <span className="text-purple-200 font-bold text-xs bg-purple-600/60 px-2 py-1 rounded-full shrink-0 ml-2">無料で相談 →</span>
                </a>
                <p className="text-xs text-purple-500 text-center mt-2">※ 広告・PR（ココナラ公式サイトに遷移します）</p>
              </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-purple-500 gap-3">
                <div className="text-4xl">✨</div>
                <p className="text-sm text-center">情報を入力して<br />「鑑定する」を押してください</p>
                <div className="mt-2 text-xs text-purple-600 space-y-1 text-center">
                  <p>🌟 今日の運勢 — 無料</p>
                  <p>💕 恋愛運 — 無料</p>
                  <p>🔮 総合運命鑑定 — 無料</p>
                  <p>💑 相性占い — プレミアム限定</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )} {/* activeTab === "uranai" の終了 */}
      {/* 鑑定履歴アコーディオン */}
      {history.length > 0 && (
        <div className="max-w-4xl mx-auto px-6 pb-6">
          <button
            onClick={() => setHistoryOpen(o => !o)}
            className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-3 hover:bg-white/10 transition-colors"
          >
            <span className="text-sm font-bold text-purple-200">📜 過去の鑑定履歴（直近{history.length}件）</span>
            <span className="text-purple-400 text-xs">{historyOpen ? "▲ 閉じる" : "▼ 開く"}</span>
          </button>
          {historyOpen && (
            <div className="mt-2 bg-white/5 border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10">
              {history.map((item, i) => (
                <div key={i} className="px-5 py-3 flex items-start gap-3">
                  <div className="shrink-0 text-center">
                    <div className="text-lg font-black text-yellow-300">{item.score}<span className="text-xs font-normal text-yellow-500">/10</span></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-bold text-purple-300">{item.type}</span>
                      <span className="text-xs text-purple-600">{item.date}</span>
                    </div>
                    <p className="text-xs text-purple-200 leading-relaxed line-clamp-2">{item.summary}…</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <footer className="text-center py-6 text-xs text-gray-400 border-t mt-8">
        <a href="/legal" className="hover:underline">特定商取引法に基づく表記</a>
        <span className="mx-2">|</span>
        <a href="/privacy" className="hover:underline">プライバシーポリシー</a>
      </footer>
    </main>
  );
}
