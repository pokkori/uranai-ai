"use client";
import { useState } from "react";
import Link from "next/link";

const SAMPLES = [
  {
    person: "💼 Aさん（1988年3月12日・女性）",
    context: "仕事か恋愛か、どちらを優先すべきか迷っている30代",
    types: [
      {
        label: "🌟 本質・性格",
        content: `【四柱推命×九星気学 総合鑑定】

■ あなたの命式
日柱：壬子（みずのえ・ね） 本元：壬水
九星：三碧木星

■ 本質的な性格
あなたは「水の中に宿る知性」を持つ人。壬水の日主は大海のように懐が深く、どんな状況でも冷静に本質を見抜く洞察力があります。

三碧木星の「雷のような行動力」と組み合わさり、アイデアが閃いた瞬間に即座に動く直感型。一方で、内面は計算が得意で、感情に流されない合理的な判断を下せる人です。

■ 才能の活かし方
あなたの強みは「言語化能力」と「新しい枠組みを作る力」。
クリエイティブ系・企画・コンサルなど、ゼロから価値を生む仕事に向いています。`,
      },
      {
        label: "💕 今月の恋愛運",
        content: `【2026年3月 恋愛運】

■ 運勢の流れ
今月（三碧木星月）はあなたの本星と同じ三碧の影響を受ける「回座の月」。
自分らしさが際立つ時期で、普段見せない素の部分が相手に伝わりやすい。

■ 転機の日
3/15〜20が最大のチャンス期。土日のどちらかに「初めての場所・初めての人」と出会う縁があります。断らずに誘いに乗ること。

■ アドバイス
「完璧な準備をしてから動く」タイプですが、今月は即行動が吉。
気になる人がいれば、準備中より「今の自分」で接触する方が縁が繋がります。

■ 相性が良い生まれ月
3月・6月・9月生まれとの相性◎。12月生まれとは今月特に縁が強い。`,
      },
      {
        label: "💼 今月の仕事運",
        content: `【2026年3月 仕事運】

■ 運勢の流れ
仕事面では「言葉の力」が増幅する月。プレゼン・提案書・交渉事は今月に集中させると良い結果が出やすい。

■ 注目ポイント
3/10前後：新しいプロジェクトや役割の話が来る可能性。即決せず3日間熟慮してから返答する。

3/22前後：人間関係の摩擦が起きやすい時期。感情的な言葉は避け、データと論理で話す。

■ 今月のキーワード
「自分から動く」「言語化して伝える」「断らない」

■ 注意点
壬水は「停滞」を嫌います。現状に不満があるなら今月が最適な行動月。
ただし水の性質上、一度動き始めると止まれなくなるため、方向性を最初に確認してから。`,
      },
    ],
  },
  {
    person: "🌸 Bさん（1995年11月28日・女性）",
    context: "結婚を意識している彼氏との関係に迷いがある20代後半",
    types: [
      {
        label: "🌟 本質・性格",
        content: `【四柱推命×九星気学 総合鑑定】

■ あなたの命式
日柱：辛亥（かのと・い） 本元：壬水
九星：六白金星

■ 本質的な性格
辛金（磨かれた宝石）の日主。一見クールに見えますが、内面は繊細で深い感受性の持ち主。

六白金星は「天のエネルギー」を持つ気。リーダーシップと高い理想を持ち、自分にも他者にも完璧を求めがちです。

■ 才能の活かし方
美的センス・品質へのこだわり・高い倫理観が武器。
「一流の仕事をする」という姿勢は確実に認められます。ただし、完璧主義が足を引っ張ることも。`,
      },
      {
        label: "💕 今月の恋愛運",
        content: `【2026年3月 恋愛運】

■ 運勢の流れ
六白金星の今月は「決断の月」。宙ぶらりんになっている関係に決着がつく時期です。

■ パートナーとの関係
彼との関係で「話し合いを避けていたこと」がある場合、今月がそれを解消する最適な時期。
逆に放置すると4〜5月に溝が深まる可能性があります。

■ 転機の日
3/18〜22は感情の流れが良い時期。二人の時間を意識的に作ると、互いの本音が伝わりやすい。

■ 大事なこと
六白金星の方は「完璧な状況を待つ」傾向がありますが、結婚・同棲などの大きな決断は「今が最適タイミング」ではなく「準備できていなくても動く」ことで縁が繋がります。

■ 相性の良いパートナー
8月・2月生まれの方と今月特に縁が深まります。`,
      },
      {
        label: "💼 今月の仕事運",
        content: `【2026年3月 仕事運】

■ 運勢の流れ
仕事面では「評価が上がる月」。今まで積み上げてきた実績が、上司や周囲に正しく認識される時期です。

■ 注目ポイント
3/5前後：昇進・異動・重要な任務の話が来る可能性あり。

3/20前後：新しいスキルや資格取得の動機付けが高まる。今月に学習を始めると継続しやすい。

■ 今月のキーワード
「実績を声に出す」「チームに頼る」「小さな完璧より大きな前進」

■ 注意点
辛金は「純粋さ・誠実さ」が最大の武器ですが、六白金星のプライドが邪魔をすることがあります。
今月は「助けを求めること」が実は最も速い成長につながります。`,
      },
    ],
  },
  {
    person: "🎯 Cさん（1982年7月4日・女性）",
    context: "転職か今の会社に残るかで迷っている40代",
    types: [
      {
        label: "🌟 本質・性格",
        content: `【四柱推命×九星気学 総合鑑定】

■ あなたの命式
日柱：癸丑（みずのと・うし） 本元：癸水
九星：九紫火星

■ 本質的な性格
癸水（清らかな小川）の日主。九紫火星と組み合わさることで「直感の鋭さ」と「情熱的なビジョン」の両方を持つ稀有なタイプ。

九紫火星の方は「未来を見通す力」があり、組織の中でいち早くトレンドを察知します。一方でこの火の性質は燃え尽きやすさも内包しています。

■ 才能の活かし方
「なぜこれが必要か」を言語化する力と、人を鼓舞するカリスマ性が最大の武器。
マネジメント・コーチング・新規事業など、人の可能性を引き出す仕事で真価を発揮します。`,
      },
      {
        label: "💕 今月の恋愛運",
        content: `【2026年3月 恋愛運】

■ 運勢の流れ
九紫火星の方にとって3月は「縁の整理と新しい縁の芽生え」が同時に起きる複合的な月。

■ 既婚・パートナーあり
パートナーとの関係で「言えずにいること」が積み重なっているなら、今月に率直に伝える機会が訪れます。感情的にならず、ビジョンを語るように「将来どうしたいか」を話し合うのが◎。

■ シングルの方
3/12〜18に職場・趣味の縁が動く時期。偶然の出会いに見えるものが実は意味ある縁である可能性大。

■ 今月のテーマ
「自分の本音に正直になること」が、対人関係全般を豊かにするキーワード。`,
      },
      {
        label: "💼 今月の仕事運",
        content: `【2026年3月 仕事運】

■ 運勢の流れ
【転職・独立を考えている方へ】
今月（〜3/20）は情報収集・下準備の時期として最適。
3/20以降は行動実行フェーズ。春分を境に運気が大きく変わります。

■ 転職に関する判断
九紫火星は「変化に強い星」。ただし今年（2026年）のあなたは五黄土星の影響下にあり、「動くなら徹底的に準備してから」がキーワード。急いで動くと空振りになりやすい。

■ 今の会社に残る場合
3月後半から新しい役割・プロジェクトが動き出す気配。チャンスが来たら積極的に手を挙げること。

■ キャリアの転換期
2026年〜2027年はあなたの九星サイクルで「南に飛ぶ（九紫回座）」の年。大きな飛躍が約束された2年間です。今月の決断がその方向性を決定します。

■ 今月のキーワード
「3年後のビジョンを描く」「小さくても動く」「直感を信じる」`,
      },
    ],
  },
];

export default function UranaiSampleSection() {
  const [activePerson, setActivePerson] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const sample = SAMPLES[activePerson];

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-block bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-purple-500/30">実際の鑑定サンプル</div>
        <h2 className="text-2xl font-bold text-white">こんな深さの鑑定が3分で届きます</h2>
        <p className="text-purple-300 text-sm mt-2">四柱推命×九星気学の本格鑑定。一般的な占いとは深さが違います。</p>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap justify-center">
        {SAMPLES.map((s, i) => (
          <button key={i} onClick={() => { setActivePerson(i); setActiveTab(0); }}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${activePerson === i ? "bg-purple-500 text-white" : "bg-white/10 text-purple-300 hover:bg-white/20 border border-white/10"}`}>
            {s.person}
          </button>
        ))}
      </div>

      <div className="bg-white/5 border border-purple-500/20 rounded-3xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 bg-white/5">
          <p className="text-xs text-purple-400 font-medium">鑑定対象者</p>
          <p className="text-sm text-purple-100 font-bold">{sample.context}</p>
        </div>
        <div className="p-6">
          <div className="flex gap-1 mb-5 flex-wrap">
            {sample.types.map((t, i) => (
              <button key={i} onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === i ? "bg-purple-500 text-white" : "bg-white/5 border border-white/10 text-purple-300 hover:bg-white/10"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <div className="bg-black/20 border border-white/5 rounded-2xl p-5">
            <pre className="text-xs text-purple-100 whitespace-pre-wrap font-sans leading-relaxed">{sample.types[activeTab].content}</pre>
          </div>
          <p className="text-purple-600 text-xs mt-3 text-center">※ 実際の鑑定はあなたの生年月日から個別に生成されます</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/uranai" className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-8 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg">
          🔮 自分の鑑定を今すぐ受ける（無料3回）→
        </Link>
      </div>
    </section>
  );
}
