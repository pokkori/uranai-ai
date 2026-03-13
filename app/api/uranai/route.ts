import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { isActiveSubscription } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const FREE_LIMIT = 3;
const COOKIE_KEY = "uranai_use_count";
const APP_ID = "uranai";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

// 九星気学：本命星の計算
function calcKyusei(year: number, month: number, day: number): string {
  const adjustedYear = (month === 1 || (month === 2 && day < 4)) ? year - 1 : year;
  const sum = String(adjustedYear).split("").reduce((a, b) => a + parseInt(b), 0);
  const reduced = sum > 9 ? Math.floor(sum / 10) + (sum % 10) : sum;
  const baseNumbers = [5, 4, 3, 2, 1, 9, 8, 7, 6];
  return String(baseNumbers[(reduced - 1) % 9]);
}

// 干支の計算（立春基準）
function calcEto(year: number, month: number, day: number): string {
  const adjustedYear = (month === 1 || (month === 2 && day < 4)) ? year - 1 : year;
  const signs = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  return signs[((adjustedYear - 4) % 12 + 12) % 12];
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }
  const email = req.cookies.get("user_email")?.value;
  let isPremium = false;
  if (email) {
    isPremium = await isActiveSubscription(email, APP_ID);
  } else {
    isPremium = req.cookies.get("premium")?.value === "1" || req.cookies.get("stripe_premium")?.value === "1";
  }
  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0");
  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 }); }

  const { name, birthYear, birthMonth, birthDay, gender, type,
          partnerName, partnerBirthYear, partnerBirthMonth, partnerBirthDay, partnerGender } = body as Record<string, string>;

  if (!birthYear || !birthMonth || !birthDay) {
    return NextResponse.json({ error: "生年月日は必須です" }, { status: 400 });
  }
  if (name && name.length > 50) return NextResponse.json({ error: "名前は50文字以内で入力してください" }, { status: 400 });

  // 相性占いはプレミアムのみ
  if (type === "compatibility" && !isPremium) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }

  const y = Number(birthYear);
  const m = Number(birthMonth);
  const d = Number(birthDay);
  const kyusei = calcKyusei(y, m, d);
  const eto = calcEto(y, m, d);

  const today = new Date();
  const todayStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  let prompt = "";

  if (type === "compatibility") {
    if (!partnerBirthYear || !partnerBirthMonth || !partnerBirthDay) {
      return NextResponse.json({ error: "相手の生年月日は必須です" }, { status: 400 });
    }
    const py = Number(partnerBirthYear);
    const pm = Number(partnerBirthMonth);
    const pd = Number(partnerBirthDay);
    const partnerKyusei = calcKyusei(py, pm, pd);
    const partnerEto = calcEto(py, pm, pd);

    prompt = `あなたは30年のキャリアを持つ占術師です。九星気学・干支・数秘術を組み合わせた相性鑑定を行います。読んだ人が「ドキッとするほど当たっている」と感じる深い鑑定文を書いてください。

【あなた】
名前: ${name || "あなた"}
生年月日: ${birthYear}年${birthMonth}月${birthDay}日（${eto}年・${kyusei}白星）
性別: ${gender === "male" ? "男性" : "女性"}

【相手】
名前: ${partnerName || "相手"}
生年月日: ${partnerBirthYear}年${partnerBirthMonth}月${partnerBirthDay}日（${partnerEto}年・${partnerKyusei}白星）
性別: ${partnerGender === "male" ? "男性" : "女性"}

本日: ${todayStr}

---

## 💑 ${name || "あなた"}と${partnerName || "相手"}の相性鑑定

### 🌟 ふたりの総合相性スコア
（100点満点でスコアを出し、一言で関係性を表現してください）
**相性スコア: ○○点 「○○な関係」**

### 🔮 九星気学×干支から見た相性の本質
（${kyusei}白星×${eto}と${partnerKyusei}白星×${partnerEto}の組み合わせから、ふたりの根本的な相性を400文字で。「ふたりは〜」と語りかけるスタイルで。）

### 💪 ふたりの強み・相乗効果
（互いの長所が掛け合わさる部分を具体的に3点。この関係ならではの可能性。）

### ⚠️ ふたりの注意点・乗り越えるべき壁
（ぶつかりやすいパターンを正直に2点。解決策とセットで書く。）

### 💕 恋愛・結婚における相性
（恋愛・結婚パートナーとしての相性を300文字で。「お互いに○○すると関係が深まる」という具体的なアドバイス付き。）

### 🤝 仕事・友人としての相性
（仕事仲間や友人としての相性と、うまく付き合うコツを200文字で。）

### 🌈 ふたりへのメッセージ
（この組み合わせならではの可能性を最大化するための、温かいメッセージを100文字で。）

---
※ 占いは統計学的な傾向であり、参考としてご活用ください。`;

    try {
      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2500,
        messages: [{ role: "user", content: prompt }],
      });
      const text = message.content[0].type === "text" ? message.content[0].text : "";
      const newCount = cookieCount + 1;
      const res = NextResponse.json({ result: text, kyusei, eto, partnerKyusei, partnerEto, count: newCount });
      res.cookies.set(COOKIE_KEY, String(newCount), { maxAge: 60 * 60 * 24 * 30, sameSite: "lax", httpOnly: true, secure: true });
      return res;
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" }, { status: 500 });
    }
  }

  // 通常鑑定
  const typeLabel = type === "today" ? "今日の運勢" : type === "love" ? "恋愛運・相性" : "総合運命鑑定";

  const loveSection = type === "love" ? `
### 💑 恋愛・パートナーシップ詳細鑑定
（${eto}年生まれ×${kyusei}白の恋愛傾向、理想の相手の特徴、今の恋愛運の流れ、出会いのタイミング・場所のヒントを400文字で。具体的に。）

### 🤝 相性の良い干支・九星
（特に縁がある干支を3つ、その理由も簡潔に）` : "";

  prompt = `あなたは30年のキャリアを持つ占術師です。九星気学・干支・数秘術を組み合わせた独自鑑定で、読んだ人が「ドキッとするほど当たっている」と感じる、深く具体的な鑑定文を書いてください。

【鑑定対象者】
名前: ${name || "あなた"}
生年月日: ${birthYear}年${birthMonth}月${birthDay}日
性別: ${gender === "male" ? "男性" : "女性"}
干支: ${eto}年生まれ
九星: ${kyusei}白星
本日: ${todayStr}

【鑑定種別】${typeLabel}

【重要】本日${todayStr}に特有の運勢を必ず反映させてください。鑑定文の最後に以下の形式で1段落追記すること:
「本日（${today.getMonth() + 1}月${today.getDate()}日）の運勢として...」という書き出しで、今日という日付に基づいた特有のアドバイスや注意点・チャンスを100〜150文字で書いてください。毎日異なる内容になるよう、今日の日付エネルギーを読み解いた具体的な内容にしてください。

---

## ✨ ${name || "あなた"}への特別鑑定

### 🌟 あなたという人間の本質
（${eto}と${kyusei}白の組み合わせから読み解く、生まれ持った才能・使命・人生のテーマを300文字で。「あなたは〜な人です」と直接語りかけるスタイルで。）

### 💫 ${typeLabel}（${todayStr}時点）
（現在の星回りと干支の運気サイクルを踏まえ、具体的な状況・転換期・注意すべき時期を400文字で。「今月は〜」「〇月頃に〜」など時期を明示して。）
${loveSection}

### 🎯 今後3ヶ月の行動指針
（運気を最大化する具体的な行動を3つ。「〜するとよい」ではなく「〜してください」と断言するスタイルで。）

### ⚡ 今月の転換点
（特に注意または積極的に動くべき日を「〇月〇日頃」で1〜2点）

### 🔮 あなたのラッキー情報
**ラッキーカラー:** （2色・理由も一言）
**ラッキーアイテム:** （日常で取り入れやすいもの）
**ラッキーナンバー:** （数字と意味）
**ラッキーワード:** （今月心がけるキーワード）

### 💌 最後に${name || "あなた"}へ
（50〜80文字の温かいメッセージ）

---
※ 占いは統計学的な傾向であり、参考としてご活用ください。`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2500,
      messages: [{ role: "user", content: prompt }],
    });
    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const newCount = cookieCount + 1;
    const res = NextResponse.json({ result: text, kyusei, eto, count: newCount });
    res.cookies.set(COOKIE_KEY, String(newCount), { maxAge: 60 * 60 * 24 * 30, sameSite: "lax", httpOnly: true, secure: true });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" }, { status: 500 });
  }
}
