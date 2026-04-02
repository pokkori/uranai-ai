'use client';

// ===================================================================
// AffiliateSectionコンポーネント — A8.netアフィリエイトCTA（占い特化）
// 環境変数:
//   NEXT_PUBLIC_A8_COCONALA_URL   — ココナラ電話占い（単価¥16,000）
//   NEXT_PUBLIC_A8_URANAI_URL     — その他占いサービス
// A8.netプログラムID取得後に .env.local / Vercel環境変数に設定してください。
// ===================================================================

interface AffiliateItem {
  title: string;
  description: string;
  cta: string;
  href: string;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
}

const ITEMS: AffiliateItem[] = [
  {
    title: 'より詳しく占ってもらいたい方へ',
    description: 'ココナラ電話占いで本格鑑定。タロット・霊感・恋愛・仕事・金運など人気占い師が電話で丁寧に鑑定します。初回無料特典あり。',
    cta: '電話占いで本格鑑定',
    // A8.net: ココナラ電話占い（単価¥16,000）— 取得後に差し替え
    href: process.env.NEXT_PUBLIC_A8_COCONALA_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_ココナラ電話占い_取得後に差し替え】',
    accentColor: '#7C3AED',
    badgeBg: 'bg-violet-50',
    borderColor: 'border-violet-100',
  },
  {
    title: '恋愛・仕事・金運を詳しく占う',
    description: '有名占い師が在籍する電話占いサービス。24時間いつでも相談OK。初回特典でお試し鑑定を低価格で受けられます。',
    cta: '今すぐ鑑定を受ける',
    href: process.env.NEXT_PUBLIC_A8_URANAI_URL ?? 'https://px.a8.net/svt/ejp?a8mat=【A8netプログラムID_占いサービス_取得後に差し替え】',
    accentColor: '#9333EA',
    badgeBg: 'bg-purple-50',
    borderColor: 'border-purple-100',
  },
];

export function AffiliateSection() {
  return (
    <section
      className="mt-8 rounded-2xl border border-violet-100 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, rgba(245,243,255,0.97) 0%, rgba(250,245,255,0.97) 100%)' }}
      aria-labelledby="affiliate-heading-uranai"
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <h2 id="affiliate-heading-uranai" className="text-sm font-bold text-gray-700">
          さらに詳しく占ってもらいたい方へ
        </h2>
        {/* 景表法対応: PR表記 */}
        <span className="text-xs font-bold text-gray-400 border border-gray-300 rounded px-1.5 py-0.5">PR</span>
      </div>

      {/* カードリスト */}
      <ul className="px-4 pb-4 space-y-3" role="list">
        {ITEMS.map((item) => (
          <li key={item.title} className={`bg-white rounded-xl border ${item.borderColor} shadow-sm`}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-3 px-4 py-3 group"
              aria-label={`${item.title} — 外部サービスへのリンク（PR）`}
              style={{ minHeight: '44px' }}
            >
              <div className="flex-1 min-w-0">
                {/* SVGアイコン: 占い・星 */}
                <div className="flex items-center gap-2 mb-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke={item.accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-snug">{item.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${item.badgeBg}`} style={{ color: item.accentColor }}>
                  {item.cta}
                </span>
                {/* 矢印アイコン */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* 景表法対応: 広告表記フッター */}
      <p className="text-xs text-gray-400 text-center pb-3">
        ※ 外部サービスへのリンクです（アフィリエイト広告）。各社公式サイトに遷移します。
      </p>
    </section>
  );
}
