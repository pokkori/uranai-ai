"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";
import { track } from '@vercel/analytics';

const FREE_LIMIT = 3;
const STORAGE_KEY = "uranai_count";
const PAYJP_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY ?? "";

const YEARS = Array.from({ length: 80 }, (_, i) => 2006 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

// startCheckout は PayjpModal で処理するため削除済み

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

function PaywallModal({ onClose, isCompatibility, onStartPayjp }: { onClose: () => void; isCompatibility?: boolean; onStartPayjp: (plan: string) => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-indigo-950 border border-purple-500/50 rounded-2xl p-6 max-w-sm w-full text-white text-center">
        <div className="text-4xl mb-3">{isCompatibility ? "💑" : "🔮"}</div>
        <h2 className="text-lg font-bold mb-2">
          {isCompatibility ? "相性占いはプレミアム限定" : "無料鑑定を使い切りました"}
        </h2>
        <p className="text-purple-300 text-sm mb-1">
          {isCompatibility ? "ふたりの深い縁を九星気学×干支で鑑定" : "毎日の運勢チェックで人生の流れをつかむ"}
        </p>
        <ul className="text-xs text-purple-400 text-left mb-5 space-y-1.5 mt-3">
          <li>✨ 毎日・毎月の運勢鑑定が無制限</li>
          <li>✨ 九星気学×干支の詳細分析</li>
          <li>💑 相性占い（相性スコア＋恋愛・仕事・友人の多角分析）</li>
          <li>✨ 恋愛・仕事・金運を毎日チェック</li>
          <li>✨ ラッキー情報・行動指針を毎日更新</li>
        </ul>
        <div className="space-y-3 mb-4">
          <button onClick={() => { track('upgrade_click', { service: '占いAI', plan: 'standard' }); onStartPayjp("standard"); }}
            className="block w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 rounded-xl transition-colors">
            毎日鑑定＋相性占いプラン ¥980/月
          </button>
          <button onClick={() => { track('upgrade_click', { service: '占いAI', plan: 'business' }); onStartPayjp("business"); }}
            className="block w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors text-sm">
            プレミアム ¥2,980/月（詳細版・優先生成）
          </button>
        </div>
        {/* 安心保証バッジ */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="flex items-center gap-1 text-xs text-purple-400">
            <span>🔒</span>
            <span>SSL暗号化決済</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-purple-400">
            <span>✅</span>
            <span>いつでもキャンセル可能</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-purple-400">
            <span>💳</span>
            <span>PAY.JP安全決済</span>
          </div>
        </div>
        <button onClick={onClose} className="text-xs text-purple-500 hover:text-purple-300">閉じる</button>
      </div>
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
  const [isPremium, setIsPremium] = useState(false);
  const [showPayjp, setShowPayjp] = useState(false);
  const [payjpPlan, setPayjpPlan] = useState("standard");
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);
  const [starfall, setStarfall] = useState(false);
  const [uranaiScores, setUranaiScores] = useState<{total:number;love:number;work:number;money:number;health:number} | null>(null);

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
    fetch("/api/auth/status").then(r => r.json()).then(d => setIsPremium(d.isPremium)).catch(() => {});
    // LPの「申し込む」から遷移した場合は決済モーダルを自動表示
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan === "standard" || plan === "business") {
      setPayjpPlan(plan);
      setShowPayjp(true);
    }
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
          name, birthYear, birthMonth, birthDay, gender, type,
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
      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} isCompatibility={paywallIsCompatibility} onStartPayjp={(plan) => { setPayjpPlan(plan); setShowPaywall(false); setShowPayjp(true); }} />}
      {showPayjp && (
        <PayjpModal
          publicKey={PAYJP_PUBLIC_KEY}
          planLabel={payjpPlan === "business" ? "プレミアムプラン ¥2,980/月" : "スタンダードプラン ¥980/月"}
          plan={payjpPlan}
          onSuccess={() => { setShowPayjp(false); setIsPremium(true); }}
          onClose={() => setShowPayjp(false)}
        />
      )}

      <nav className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="font-bold">🔮 AI占い</Link>
        <span className={`text-xs px-3 py-1 rounded-full ${isPremium ? "bg-purple-600/50 text-purple-200" : isLimitReached ? "bg-red-900/50 text-red-300" : "bg-purple-900/50 text-purple-300"}`}>
          {isPremium ? "✓ プレミアム" : isLimitReached ? "無料枠終了" : `無料あと${remaining}回`}
        </span>
      </nav>

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
              </div>
            ) : result ? (
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
                          <button onClick={() => { track('upgrade_click', { service: '占いAI', plan: 'standard' }); setPayjpPlan("standard"); setShowPayjp(true); }}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-1.5 px-4 rounded-lg transition-opacity text-xs">
                            プレミアムで毎日運勢チェック（¥980/月）
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                  {!isPremium && (
                    <>
                      <button onClick={() => { track('upgrade_click', { service: '占いAI', plan: 'standard' }); setPayjpPlan("standard"); setShowPayjp(true); }}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity text-sm">
                        ✨ 毎日の運勢＋相性占いを使う（¥980/月）
                      </button>
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
      <footer className="text-center py-6 text-xs text-gray-400 border-t mt-8">
        <a href="/legal" className="hover:underline">特定商取引法に基づく表記</a>
        <span className="mx-2">|</span>
        <a href="/privacy" className="hover:underline">プライバシーポリシー</a>
      </footer>
    </main>
  );
}
