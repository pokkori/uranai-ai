import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "四柱推命とは？生年月日でわかる運命の読み方",
  description: "四柱推命の基本的な仕組み、十干十二支、命式の読み方をわかりやすく解説。あなたの運命を知りたい方へ。",
};

export default function ShichusuimeiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 text-white">
      <nav className="px-6 py-4 flex items-center justify-between max-w-3xl mx-auto">
        <Link href="/" className="font-bold">🔮 AI占い</Link>
        <Link href="/uranai" className="bg-purple-500 hover:bg-purple-400 text-white text-sm font-medium px-4 py-2 rounded-full">無料で占う</Link>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-xs text-purple-400 mb-3">占い基礎知識</div>
        <h1 className="text-3xl font-bold mb-4">四柱推命とは？生年月日でわかる運命の読み方</h1>
        <p className="text-purple-400 text-sm mb-8">更新日: 2026年3月</p>
        <div className="space-y-8 text-purple-100 leading-relaxed">
          <p>四柱推命は、生年月日時を「年柱・月柱・日柱・時柱」の4つの柱に変換し、干支の組み合わせから運命を読み解く東洋占術です。中国で生まれ、日本で独自に発展してきた歴史ある占いです。</p>
          <section>
            <h2 className="text-xl font-bold text-purple-200 mb-3">四柱推命の基本的な仕組み</h2>
            <p>「四柱」とは年・月・日・時の4つのことで、それぞれを干支で表します。十干（じっかん）と十二支（じゅうにし）の組み合わせから命式（めいしき）を作り、そこから性格・才能・運勢の流れを読み取ります。</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-purple-200 mb-3">生年月日からわかること</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="text-purple-400">✦</span>本質的な性格と才能</li>
              <li className="flex gap-2"><span className="text-purple-400">✦</span>恋愛・結婚運の傾向</li>
              <li className="flex gap-2"><span className="text-purple-400">✦</span>仕事・財運の流れ</li>
              <li className="flex gap-2"><span className="text-purple-400">✦</span>人生の転機となる時期</li>
              <li className="flex gap-2"><span className="text-purple-400">✦</span>相性の良い人のタイプ</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-purple-200 mb-3">四柱推命とAI鑑定の組み合わせ</h2>
            <p>従来の四柱推命は、専門家による鑑定が必要で時間とお金がかかりました。AIを活用することで、生年月日を入力するだけで即座に本格的な鑑定結果を得られるようになっています。</p>
          </section>
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 text-center">
            <p className="font-bold mb-2">AIで今すぐ四柱推命鑑定</p>
            <p className="text-purple-300 text-sm mb-4">生年月日を入力するだけ。無料で3回お試しいただけます。</p>
            <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-full hover:opacity-90">無料で鑑定する →</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
