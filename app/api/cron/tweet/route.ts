import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TWEET_TOPICS = [
  "今日の運勢：九星気学で読む今週の注意点",
  "干支別・今月の金運と仕事運のポイント",
  "九星気学で見る「今すぐやめるべき習慣」",
  "恋愛運が上がる行動と下がる行動・干支別",
  "今月の転換期：チャンスを掴む人の共通点",
  "ラッキーカラーの選び方・九星気学の基本",
  "人間関係がうまくいく干支の組み合わせ",
  "直感を信じるべき日・慎重に動くべき日の見分け方",
  "金運を引き寄せる九星気学の開運アクション",
  "恋愛成就しやすい出会いの場所・タイミング",
  "仕事運アップ：九星気学で見る転職・昇進の吉時期",
  "今週のラッキーアイテム・行動指針",
];

async function generateTweetContent(topic: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const prompt = `あなたは占い師・開運アドバイザーです。X（旧Twitter）向けに、運勢や開運情報に興味がある20〜40代の方に向けた投稿を作成してください。

テーマ: ${topic}

条件:
- 140文字以内（日本語）
- 「〇〇な人は要注意」「実は〜だった」など興味を引くフレーミング
- ハッシュタグを2〜3個含める（#九星気学 #占い #開運 #運勢 から選択）
- 絵文字を2〜3個使って親しみやすく
- 最後に「✨AIで詳しく鑑定できます」などの軽いCTAを含めてよい（任意）

本文のみ出力してください。`;

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });
  return message.content[0].type === "text" ? message.content[0].text.trim() : "";
}

async function postTweet(text: string): Promise<{ id: string }> {
  const { TwitterApi } = await import("twitter-api-v2");
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY!,
    appSecret: process.env.TWITTER_API_SECRET!,
    accessToken: process.env.TWITTER_ACCESS_TOKEN!,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
  });
  const tweet = await client.v2.tweet(text);
  return { id: tweet.data.id };
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const topic = TWEET_TOPICS[Math.floor(Math.random() * TWEET_TOPICS.length)];
    const tweetText = await generateTweetContent(topic);
    if (!tweetText) throw new Error("Empty tweet content");

    const result = await postTweet(tweetText);
    console.log(`[cron/tweet] Posted: ${result.id} | Topic: ${topic}`);
    return NextResponse.json({ ok: true, id: result.id, topic });
  } catch (err) {
    console.error("[cron/tweet] Error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
