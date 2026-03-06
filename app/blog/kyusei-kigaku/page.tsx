import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "九星気学とは？生まれ年でわかるあなたの星と運勢",
  description: "九星気学の9つの星（一白水星〜九紫火星）の特徴と2026年の運勢を解説。あなたの星はどれ？",
};

const STARS = [
  { star: "一白水星", years: "1918,1927,1936,1945,1954,1963,1972,1981,1990,1999,2008", trait: "柔軟性と直感力に優れた知性派。水のように状況に適応し、深い洞察力を持つ。" },
  { star: "二黒土星", years: "1917,1926,1935,1944,1953,1962,1971,1980,1989,1998,2007", trait: "粘り強く誠実な努力家。大地のように安定した信頼感と、養育本能が強い。" },
  { star: "三碧木星", years: "1925,1934,1943,1952,1961,1970,1979,1988,1997,2006,2015", trait: "エネルギッシュで行動力抜群。新しいことへの挑戦を好む革新者。" },
  { star: "四緑木星", years: "1924,1933,1942,1951,1960,1969,1978,1987,1996,2005,2014", trait: "協調性が高く信頼される調整役。風のように人と人をつなぐ橋渡し役。" },
  { star: "五黄土星", years: "1923,1932,1941,1950,1959,1968,1977,1986,1995,2004,2013", trait: "強力なリーダーシップを持つ中心的存在。カリスマ性と破壊・再生の力。" },
  { star: "六白金星", years: "1922,1931,1940,1949,1958,1967,1976,1985,1994,2003,2012", trait: "高い理想と完璧主義。天のような大きな視野と、強い正義感を持つ。" },
  { star: "七赤金星", years: "1921,1930,1939,1948,1957,1966,1975,1984,1993,2002,2011", trait: "社交的で魅力的な人気者。喜びを周囲に広げ、楽しみを大切にする。" },
  { star: "八白土星", years: "1920,1929,1938,1947,1956,1965,1974,1983,1992,2001,2010", trait: "変革と蓄積の力を持つ。山のような安定感と、変化を乗り越える強さ。" },
  { star: "九紫火星", years: "1919,1928,1937,1946,1955,1964,1973,1982,1991,2000,2009", trait: "輝くような存在感と直感力。火のように情熱的で、美意識と表現力が高い。" },
];

export default function KyuseiKigakuPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 to-purple-950 text-white">
      <nav className="px-6 py-4 flex items-center justify-between max-w-3xl mx-auto">
        <Link href="/" className="font-bold">🔮 AI占い</Link>
        <Link href="/uranai" className="bg-purple-500 hover:bg-purple-400 text-white text-sm font-medium px-4 py-2 rounded-full">無料で占う</Link>
      </nav>
      <article className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-xs text-purple-400 mb-3">占い基礎知識</div>
        <h1 className="text-3xl font-bold mb-4">九星気学とは？生まれ年でわかるあなたの星</h1>
        <p className="text-purple-400 text-sm mb-8">更新日: 2026年3月</p>
        <div className="space-y-8 text-purple-100 leading-relaxed">
          <p>九星気学は、生まれた年から「一白水星〜九紫火星」の9つの星を算出し、性格・運勢・相性を読み解く日本の占術です。九星はそれぞれ独自の特徴を持ち、毎年・毎月変化する運気と組み合わせて運勢を読みます。</p>
          <section>
            <h2 className="text-xl font-bold text-purple-200 mb-4">9つの星の特徴</h2>
            <div className="space-y-4">
              {STARS.map((s) => (
                <div key={s.star} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="font-bold text-purple-200 mb-1">⭐ {s.star}</div>
                  <div className="text-xs text-purple-400 mb-2">{s.years.split(",").slice(0,5).join("・")}年生まれ など</div>
                  <p className="text-sm">{s.trait}</p>
                </div>
              ))}
            </div>
          </section>
          <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-6 text-center">
            <p className="font-bold mb-2">AIがあなたの九星を鑑定</p>
            <p className="text-purple-300 text-sm mb-4">生年月日を入力するだけで、あなたの九星と詳細な運勢がわかります。</p>
            <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-3 rounded-full hover:opacity-90">無料で鑑定する →</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
