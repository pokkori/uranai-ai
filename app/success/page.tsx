"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function Confetti() {
  const [particles, setParticles] = useState<{ id: number; left: number; delay: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ["#a855f7", "#c084fc", "#e879f9", "#f0abfc", "#fbbf24", "#818cf8"];
    const ps = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 6,
    }));
    setParticles(ps);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}

function SuccessContent() {
  const [showConfetti, setShowConfetti] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    // Komoju session verify
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      fetch(`/api/komoju/verify?session_id=${sessionId}`).catch(() => {});
    }
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="max-w-lg w-full mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-7xl mb-4">🔮</div>
          <h1 className="text-3xl font-black mb-2 text-white">プレミアム登録完了！</h1>
          <p className="text-purple-300">宇宙の叡智があなたに開かれました</p>
        </div>

        <div className="bg-purple-900/40 border border-purple-500/40 rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-purple-300 mb-3 text-sm">✨ プレミアム特典</h2>
          <ul className="space-y-2 text-sm text-purple-100">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">✓</span>
              九星気学×四柱推命 AIによる本格鑑定が無制限
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">✓</span>
              恋愛・仕事・金運・対人の4ジャンル詳細鑑定
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">✓</span>
              相性占い（気になる相手との相性スコア）
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">✓</span>
              月運・年運の長期トレンド予測
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">✓</span>
              ラッキーカラー・開運アドバイス毎日更新
            </li>
          </ul>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="font-bold text-purple-200 text-center text-sm">まずはこの3ステップ</h2>

          <Link href="/uranai" className="flex items-center gap-4 bg-purple-900/30 border border-purple-700/50 rounded-xl p-4 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/30 transition-all group">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-purple-500">1</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">生年月日を入力して本格鑑定</p>
              <p className="text-xs text-purple-400">九星気学と四柱推命を組み合わせた本格分析</p>
            </div>
            <span className="text-purple-600 group-hover:text-purple-300 transition-colors">→</span>
          </Link>

          <Link href="/uranai" className="flex items-center gap-4 bg-purple-900/30 border border-purple-700/50 rounded-xl p-4 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/30 transition-all group">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-purple-500">2</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">気になる相手との相性を占う</p>
              <p className="text-xs text-purple-400">二人の生年月日で相性スコアを算出</p>
            </div>
            <span className="text-purple-600 group-hover:text-purple-300 transition-colors">→</span>
          </Link>

          <Link href="/uranai" className="flex items-center gap-4 bg-purple-900/30 border border-purple-700/50 rounded-xl p-4 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-900/30 transition-all group">
            <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0 group-hover:bg-purple-500">3</div>
            <div className="flex-1">
              <p className="font-bold text-white text-sm">今月の月運をチェックする</p>
              <p className="text-xs text-purple-400">恋愛・仕事・金運の今月のトレンドを確認</p>
            </div>
            <span className="text-purple-600 group-hover:text-purple-300 transition-colors">→</span>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-purple-500 mb-1">ご感想をお聞かせください（30秒）</p>
          <a href="mailto:support@pokkorilab.com?subject=占いAI感想&body=サービス名：占いAI%0A感想：" className="text-xs text-purple-400 underline hover:text-purple-200">感想を送る →</a>
        </div>
        <div className="text-center bg-purple-900/30 rounded-xl p-4 border border-purple-700/40 mt-4">
          <p className="text-xs text-purple-500 mb-1">いつでもすぐアクセス</p>
          <p className="text-sm font-bold text-purple-200">このサイトをブックマークしておきましょう</p>
        </div>
      </div>
    </>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 text-white flex items-center justify-center py-12 px-4">
      <Suspense fallback={<p className="text-purple-400">読み込み中...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
