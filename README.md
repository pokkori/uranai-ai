# AI占い

> 生年月日を入力するだけで、四柱推命・九星気学をベースにしたAIが本格鑑定するSaaSサービス

**本番URL**: https://uranai-ai.vercel.app

---

## サービス概要

生年月日と性別を入力するだけで、Claude Haiku AIが九星気学・干支に基づいた本格占いを提供。
今日の運勢・恋愛運・総合運命鑑定の3種類から選択可能。

## 料金プラン

| プラン | 価格 | 制限 |
|--------|------|------|
| お試し | 無料 | 3回まで |
| スタンダード | ¥980/月 | 毎日鑑定可能 |
| ビジネス | ¥2,980/月 | 無制限 |

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイル**: Tailwind CSS
- **AI**: Anthropic Claude Haiku (claude-haiku-4-5-20251001)
- **デプロイ**: Vercel
- **決済**: Stripe（サブスクリプション）
- **アナリティクス**: Vercel Analytics

## ディレクトリ構成

```
uranai-ai/
├── app/
│   ├── page.tsx          # LP（ランディングページ）
│   ├── layout.tsx        # レイアウト・メタデータ
│   ├── uranai/
│   │   └── page.tsx      # 鑑定画面（フォーム・結果表示・Paywall）
│   ├── success/
│   │   └── page.tsx      # 決済完了ページ
│   ├── blog/             # SEOブログ記事
│   └── api/
│       ├── uranai/
│       │   └── route.ts  # Claude API呼び出し・九星/干支計算・Cookie管理
│       └── stripe/
│           ├── checkout/
│           │   └── route.ts  # Stripeセッション作成
│           └── verify/
│               └── route.ts  # 決済完了確認・Cookie付与
├── .env.local            # 環境変数（Vercelに設定済み）
└── package.json
```

## 占術計算ロジック

- **九星気学**: 立春（2月4日）を年の境界として九星を計算
- **干支**: 立春基準で干支（子丑寅卯...）を計算
- 計算結果をAIプロンプトに組み込み、精度の高い鑑定を実現

## セキュリティ・制限

- **使用制限**: Cookieベースでサーバー側管理（3回まで無料）
- **レート制限**: 1分間10リクエストまで/IP
- **エラーハンドリング**: API障害・タイムアウト対応済み

## 環境変数

| 変数名 | 説明 |
|--------|------|
| `ANTHROPIC_API_KEY` | Anthropic APIキー |
| `STRIPE_SECRET_KEY` | Stripe シークレットキー |
| `STRIPE_PRICE_STD` | スタンダードプランの Price ID |
| `STRIPE_PRICE_BIZ` | ビジネス（プレミアム）プランの Price ID |

## ローカル起動

```bash
npm install
echo "ANTHROPIC_API_KEY=your_key" > .env.local
npm run dev
```

## デプロイ

```bash
npx vercel --prod
```
