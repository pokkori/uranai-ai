import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const FREE_LIMIT = 3;
const COOKIE_KEY = "uranai_use_count";

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
  // 立春（2月4日頃）前は前年として計算
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
  const cookieCount = parseInt(req.cookies.get(COOKIE_KEY)?.value || "0");
  if (cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }
  let body: Record<string, unknown>;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "リクエストの形式が正しくありません" }, { status: 400 }); }

  const { name, birthYear, birthMonth, birthDay, gender, type } = body as Record<string, string>;
  if (!birthYear || !birthMonth || !birthDay) {
    return NextResponse.json({ error: "生年月日は必須です" }, { status: 400 });
  }
  if (name && name.length > 50) return NextResponse.json({ error: "名前は50文字以内で入力してください" }, { status: 400 });

  const y = Number(birthYear);
  const m = Number(birthMonth);
  const d = Number(birthDay);
  const kyusei = calcKyusei(y, m, d);
  const eto = calcEto(y, m, d);
  const typeLabel = type === "today" ? "今日の運勢" : type === "love" ? "恋愛運・相性" : "総合運命鑑定";

  const prompt = `あなたは四柱推命と九星気学の第一人者である占い師です。
深みがあり、具体的で、読んだ人が「当たっている」と感じる鑑定文を書いてください。

【鑑定対象者】
名前: ${name || "あなた"}
生年月日: ${birthYear}年${birthMonth}月${birthDay}日
性別: ${gender === "male" ? "男性" : "女性"}
干支: ${eto}年生まれ
九星: ${kyusei}白

【鑑定種別】${typeLabel}

以下の構成で鑑定してください：

## ✨ ${name || "あなた"}への鑑定結果

### 🌟 あなたの本質的な性格
（生まれ持った才能、気質、人生のテーマを200文字で）

### 💫 ${typeLabel}
（具体的な状況、注意点、好転するための行動を300文字で）

### 🎯 今後3ヶ月のアドバイス
（具体的な行動指針を3つ、箇条書きで）

### 🔮 ラッキーアイテム・カラー
ラッキーカラー:
ラッキーアイテム:
ラッキーナンバー:

文体は温かく、希望が持てる内容にしてください。`;

  try {
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
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
