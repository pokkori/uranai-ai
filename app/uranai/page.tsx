"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const FREE_LIMIT = 3;
const STORAGE_KEY = "uranai_count";

const YEARS = Array.from({ length: 80 }, (_, i) => 2006 - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

async function startCheckout(plan: string) {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

function PaywallModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-indigo-950 border border-purple-500/50 rounded-2xl p-6 max-w-sm w-full text-white text-center">
        <div className="text-4xl mb-3">🔮</div>
        <h2 className="text-lg font-bold mb-2">無料鑑定を使い切りました</h2>
        <p className="text-purple-300 text-sm mb-1">毎日の運勢チェックで人生の流れをつかむ</p>
        <ul className="text-xs text-purple-400 text-left mb-5 space-y-1.5 mt-3">
          <li>✨ 毎日・毎月の運勢鑑定が無制限</li>
          <li>✨ 九星気学×干支の詳細分析</li>
          <li>✨ 恋愛・仕事・金運を毎日チェック</li>
          <li>✨ ラッキー情報・行動指針を毎日更新</li>
        </ul>
        <div className="space-y-3 mb-4">
          <button onClick={() => startCheckout("standard")}
            className="block w-full bg-purple-500 hover:bg-purple-400 text-white font-bold py-3 rounded-xl transition-colors">
            毎日鑑定プラン ¥980/月
          </button>
          <button onClick={() => startCheckout("business")}
            className="block w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-colors text-sm">
            プレミアム ¥2,980/月（相性鑑定・詳細版）
          </button>
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
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const [kyusei, setKyusei] = useState("");
  const [eto, setEto] = useState("");

  useEffect(() => {
    setUsageCount(parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10));
  }, []);

  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const isLimitReached = usageCount >= FREE_LIMIT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimitReached) { setShowPaywall(true); return; }
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/uranai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthYear, birthMonth, birthDay, gender, type }),
      });
      if (res.status === 429) { setShowPaywall(true); setLoading(false); return; }
      const data = await res.json();
      if (!res.ok) { setResult(data.error || "エラーが発生しました"); setLoading(false); return; }
      const newCount = data.count ?? usageCount + 1;
      localStorage.setItem(STORAGE_KEY, String(newCount));
      setUsageCount(newCount);
      setResult(data.result || "生成に失敗しました");
      setKyusei(data.kyusei || "");
      setEto(data.eto || "");
      if (newCount >= FREE_LIMIT) setTimeout(() => setShowPaywall(true), 2000);
    } catch { setResult("通信エラーが発生しました。インターネット接続を確認してください。"); }
    finally { setLoading(false); }
  };

  const shareText = result ? `AIが私の運命を鑑定してくれました✨ #AI占い\nhttps://uranai-ai.vercel.app` : "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 text-white">
      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}

      <nav className="px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
        <Link href="/" className="font-bold">🔮 AI占い</Link>
        <span className={`text-xs px-3 py-1 rounded-full ${isLimitReached ? "bg-red-900/50 text-red-300" : "bg-purple-900/50 text-purple-300"}`}>
          {isLimitReached ? "無料枠終了" : `無料あと${remaining}回`}
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
            <div className="grid grid-cols-3 gap-2">
              <select value={birthYear} onChange={e => setBirthYear(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400">
                {YEARS.map(y => <option key={y} value={y}>{y}年</option>)}
              </select>
              <select value={birthMonth} onChange={e => setBirthMonth(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400">
                {MONTHS.map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
              <select value={birthDay} onChange={e => setBirthDay(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-400">
                {DAYS.map(d => <option key={d} value={d}>{d}日</option>)}
              </select>
            </div>
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
                { value: "love", label: "💕 恋愛運・相性", desc: "恋愛の流れと出会いのヒント" },
                { value: "destiny", label: "🔮 総合運命鑑定", desc: "人生のテーマと運命の流れ" },
              ].map(t => (
                <button key={t.value} type="button" onClick={() => setType(t.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${type === t.value ? "bg-purple-500/30 border-purple-400" : "bg-white/5 border-white/10 hover:border-purple-500/50"}`}>
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-xs text-purple-400">{t.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className={`w-full font-bold py-4 rounded-xl transition-colors text-white ${isLimitReached ? "bg-orange-500 hover:bg-orange-400" : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 disabled:opacity-50"}`}>
            {loading ? "鑑定中..." : isLimitReached ? "有料プランに申し込む" : "鑑定する ✨"}
          </button>
        </form>

        {/* 結果 */}
        <div className="flex flex-col">
          {kyusei && (
            <div className="flex gap-3 mb-4">
              <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-center">
                <div className="text-xs text-purple-400">九星</div>
                <div className="font-bold text-purple-200">{kyusei}白星</div>
              </div>
              <div className="bg-purple-900/50 border border-purple-500/30 rounded-lg px-4 py-2 text-center">
                <div className="text-xs text-purple-400">干支</div>
                <div className="font-bold text-purple-200">{eto}年生</div>
              </div>
            </div>
          )}

          <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 min-h-[400px]">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="text-4xl animate-pulse">🔮</div>
                <p className="text-purple-300 text-sm">AIが運命を読み解いています...</p>
              </div>
            ) : result ? (
              <div>
                <pre className="text-sm text-purple-100 whitespace-pre-wrap font-sans leading-relaxed">{result}</pre>
                <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
                  <button onClick={() => startCheckout("standard")}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-opacity text-sm">
                    ✨ 毎日の運勢をチェックする（¥980/月）
                  </button>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="block text-center text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors">
                    Xでシェア
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-purple-500 gap-3">
                <div className="text-4xl">✨</div>
                <p className="text-sm text-center">情報を入力して<br />「鑑定する」を押してください</p>
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
