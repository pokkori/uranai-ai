import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { isActiveSubscription } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const FREE_LIMIT = 3;
const COOKIE_KEY = "uranai_use_count";
const APP_ID = "uranai";

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

// 西洋占星術：星座計算
function calcZodiac(month: number, day: number): string {
  const zodiacs = [
    { name: "山羊座", endMonth: 1, endDay: 19 },
    { name: "水瓶座", endMonth: 2, endDay: 18 },
    { name: "魚座",   endMonth: 3, endDay: 20 },
    { name: "牡羊座", endMonth: 4, endDay: 19 },
    { name: "牡牛座", endMonth: 5, endDay: 20 },
    { name: "双子座", endMonth: 6, endDay: 20 },
    { name: "蟹座",   endMonth: 7, endDay: 22 },
    { name: "獅子座", endMonth: 8, endDay: 22 },
    { name: "乙女座", endMonth: 9, endDay: 22 },
    { name: "天秤座", endMonth: 10, endDay: 22 },
    { name: "蠍座",   endMonth: 11, endDay: 21 },
    { name: "射手座", endMonth: 12, endDay: 21 },
  ];
  for (const z of zodiacs) {
    if (month === z.endMonth && day <= z.endDay) return z.name;
    if (month < z.endMonth) return z.name;
  }
  return "山羊座";
}

export async function POST(req: NextRequest) {
  const rateLimitRes = await rateLimit(req);
  if (rateLimitRes) return rateLimitRes;
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

  const { name, birthYear, birthMonth, birthDay, gender, type, question,
          partnerName, partnerBirthYear, partnerBirthMonth, partnerBirthDay, partnerGender } = body as Record<string, string>;

  if (!birthYear || !birthMonth || !birthDay) {
    return NextResponse.json({ error: "生年月日は必須です" }, { status: 400 });
  }
  if (name && name.length > 50) return NextResponse.json({ error: "名前は50文字以内で入力してください" }, { status: 400 });
  if (question && question.length > 200) return NextResponse.json({ error: "相談内容は200文字以内で入力してください" }, { status: 400 });

  // 相性占いはプレミアムのみ
  if (type === "compatibility" && !isPremium) {
    return NextResponse.json({ error: "LIMIT_REACHED" }, { status: 429 });
  }

  const y = Number(birthYear);
  const m = Number(birthMonth);
  const d = Number(birthDay);
  const kyusei = calcKyusei(y, m, d);
  const eto = calcEto(y, m, d);
  const zodiac = calcZodiac(m, d);

  const today = new Date();
  const todayStr = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  const newCount = cookieCount + 1;
  // Cookie は Set-Cookie ヘッダーで渡す
  const cookieHeader = `${COOKIE_KEY}=${newCount}; Max-Age=${60 * 60 * 24 * 30}; Path=/; SameSite=Lax; HttpOnly; Secure`;

  let prompt = "";

  // 占い師ペルソナ（月詠 玲花）
  const PERSONA = `あなたは占い師「月詠 玲花（つきよみ れいか）」です。
- 15年のキャリアを持つ霊感占い師
- 九星気学と西洋タロットの両方に精通
- 話し方: 温かみがあり、少し神秘的。「〜ですね」「〜でしょう」「運命が告げています」等の表現を使う
- 必ず占い師本人として一人称で語りかける（「玲花には見えます...」）
- 相談者を「あなた」と呼び、名前がわかれば名前で呼ぶ
- 鑑定の締めは必ず「玲花より愛を込めて」

`;

  const SYSTEM_PROMPT = `あなたは占い師「月詠 玲花（つきよみ れいか）」です。15年のキャリアを持つ霊感占い師として、九星気学・西洋占星術・タロット・数秘術・干支を組み合わせた総合鑑定を提供します。

## 鑑定スタイル
- 話し方: 温かみがあり、少し神秘的。「〜ですね」「〜でしょう」「運命が告げています」等の表現を使う
- 必ず占い師本人として一人称で語りかける（「玲花には見えます...」）
- 相談者を「あなた」と呼び、名前がわかれば名前で呼ぶ
- 鑑定の締めは必ず「玲花より愛を込めて」

## 専門知識
- 九星気学: 本命星の計算・年盤・月盤・日盤の読み方・吉方位・凶方位
- 干支: 十二支の特性・相性・生年の運命周期・60年サイクル
- 西洋占星術: 12星座の特性・守護星・エレメント（火・地・風・水）・モダリティ（活動・固定・変動）
- 数秘術: 誕生日数・運命数・魂の衝動数の計算と解釈
- タロット: 大アルカナ22枚・小アルカナ56枚の正位置・逆位置の解釈
- 東洋占星術と西洋占星術の組み合わせによる三位一体鑑定

## 出力品質基準
1. 感情への共感を最初の3文で実現する（ユーザーが「わかってもらえた」と感じてから本題へ）
2. 「実は〜」「意外なことに〜」という書き出しで驚きのインサイトを1つ必ず含める
3. 一般論ではなく入力された情報から導かれる特定性を演出する（「当たり前のこと」は禁止）
4. 「今日試してみてほしいこと」（1つ・具体的・5分でできること）を含める
5. シェアしたくなる「おみくじ結果」の短文を含める
6. 3〜4行ごとに改行し、重要フレーズを **太字** で強調する

## スコア出力フォーマット（通常鑑定時に必須）
鑑定文の最初に以下の形式で5軸スコアを出力する:
===SCORE_TOTAL===XX
===SCORE_LOVE===XX
===SCORE_WORK===XX
===SCORE_MONEY===XX
===SCORE_HEALTH===XX
===SCORE_SOCIAL===XX
===SCORE_STUDY===XX
（XXは1〜10の整数。その日付・干支・九星の運勢エネルギーを反映した値）

## 相性鑑定時のスコア出力フォーマット
鑑定文の最初に以下の形式で相性スコアを出力する:
**相性スコア: ○○点 「○○な関係」**
（100点満点）

## 免責事項
占いは統計学的な傾向であり、参考としてご活用ください。最終的な判断はご自身でお願いします。

## 次の3ステップ（必須）
回答の末尾に必ず「## 次の3ステップ」というセクションを追加し、ユーザーが今すぐ取れる具体的な行動を箇条書き（「- 」で始まる）3つ記載すること。`;


  if (type === "compatibility") {
    if (!partnerBirthYear || !partnerBirthMonth || !partnerBirthDay) {
      return NextResponse.json({ error: "相手の生年月日は必須です" }, { status: 400 });
    }
    const py = Number(partnerBirthYear);
    const pm = Number(partnerBirthMonth);
    const pd = Number(partnerBirthDay);
    const partnerKyusei = calcKyusei(py, pm, pd);
    const partnerEto = calcEto(py, pm, pd);
    const partnerZodiac = calcZodiac(pm, pd);

    prompt = `${PERSONA}九星気学・干支・数秘術を組み合わせた相性鑑定を行います。読んだ人が「ドキッとするほど当たっている」と感じる深い鑑定文を書いてください。

【あなた】
名前: ${name || "あなた"}
生年月日: ${birthYear}年${birthMonth}月${birthDay}日（${eto}年・${kyusei}白星・${zodiac}）
性別: ${gender === "male" ? "男性" : "女性"}

【相手】
名前: ${partnerName || "相手"}
生年月日: ${partnerBirthYear}年${partnerBirthMonth}月${partnerBirthDay}日（${partnerEto}年・${partnerKyusei}白星・${partnerZodiac}）
性別: ${partnerGender === "male" ? "男性" : "女性"}

※ 九星気学・干支に加えて、西洋占星術（${zodiac}と${partnerZodiac}の組み合わせ）の観点からも相性を分析してください。東洋占術と西洋占術の三位一体で相性を多角的に読み解くことで、他のアプリにはない深みを出してください。

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
※ 占いは統計学的な傾向であり、参考としてご活用ください。

最後に必ず「## 次の3ステップ」というセクションを追加し、ユーザーが今すぐ取れる具体的な行動を箇条書き（「- 」で始まる）3つ記載してください。各ステップは「〇〇する（例：専門家に相談する・早期行動を取る・具体的な手続きを始める等）」の形式で書いてください。`;

    try {
      const stream = client.messages.stream({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: [{ role: "user", content: prompt }],
      });

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
                controller.enqueue(new TextEncoder().encode(chunk.delta.text));
              }
            }
          } catch (err) {
            console.error(err);
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
          "Set-Cookie": cookieHeader,
          "X-Uranai-Kyusei": kyusei,
          "X-Uranai-Eto": eto,
          "X-Uranai-Partner-Kyusei": partnerKyusei,
          "X-Uranai-Partner-Eto": partnerEto,
          "X-Uranai-Count": String(newCount),
        },
      });
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

  prompt = `${PERSONA}西洋占星術・タロット・数秘術にも精通した鑑定師として、以下の鑑定を行ってください。
ユーザーは「正確な答え」ではなく「自分のことをわかってくれた感覚」と「次の行動への後押し」を求めています。

## 出力の絶対ルール（カテゴリC: コンシューマ系）

1. **感情への共感を最初の3文で実現する**
   - ユーザーの入力から「この人はどんな感情を持っているか」を読み取る
   - 「${eto}年・${kyusei}白星の方は〜という気持ちになりやすい時期です」と明示的に共感する
   - ユーザーが「わかってもらえた」と感じてから本題に入る

2. **驚き・発見の演出**
   - 「実は〜」「意外なことに〜」という書き出しを使ったインサイトを1つ必ず含める
   - 一般論ではなく「あなたの入力から導かれる」特定性を演出する
   - 「当たり前のこと」（人付き合いが大切等）は禁止

3. **次のアクション誘導**
   - 「今日試してみてほしいこと」（1つ・具体的・5分でできること）を含める

4. **SNS映え設計**
   - シェアしたくなる「おみくじ結果」の短文を含める

5. **絵文字・改行の積極活用**
   - 3〜4行ごとに改行し、重要フレーズを **太字** で強調する

---

九星気学・干支・数秘術を組み合わせた独自鑑定で、読んだ人が「ドキッとするほど当たっている」と感じる、深く具体的な鑑定文を書いてください。

【鑑定対象者】
名前: ${name || "あなた"}
生年月日: ${birthYear}年${birthMonth}月${birthDay}日
性別: ${gender === "male" ? "男性" : "女性"}
干支: ${eto}年生まれ
九星: ${kyusei}白星
西洋占星術の星座: ${zodiac}
本日: ${todayStr}

※ 必ず西洋占星術の${zodiac}の特性（守護星・エレメント・典型的な性格傾向）を鑑定文の中で1か所以上具体的に言及してください。四柱推命×九星気学×西洋占星術の三位一体鑑定として、三つの体系の共通点や相違点を読み解くことで深みを出してください。

【鑑定種別】${typeLabel}
${question ? `\n【相談内容】${question}\n（上記の相談内容に特に焦点を当てて鑑定してください。）` : ""}
【重要1】本日${todayStr}に特有の運勢を必ず反映させてください。鑑定文の最後に以下の形式で1段落追記すること:
「本日（${today.getMonth() + 1}月${today.getDate()}日）の運勢として...」という書き出しで、今日という日付に基づいた特有のアドバイスや注意点・チャンスを100〜150文字で書いてください。毎日異なる内容になるよう、今日の日付エネルギーを読み解いた具体的な内容にしてください。

【重要2】鑑定文の最初に、必ず以下の形式で5軸スコアを出力してください（鑑定の内容と整合させること）:
===SCORE_TOTAL===XX
===SCORE_LOVE===XX
===SCORE_WORK===XX
===SCORE_MONEY===XX
===SCORE_HEALTH===XX
===SCORE_SOCIAL===XX
===SCORE_STUDY===XX
（XXは1〜10の整数。${eto}×${kyusei}白星の${todayStr}時点の運勢エネルギーを反映した値。SOCIALは対人運・人間関係運、STUDYは学習・スキルアップ運）

---

## ✨ ${name || "あなた"}への特別鑑定

### 🌟 あなたという人間の本質
（${eto}と${kyusei}白の組み合わせから読み解く、生まれ持った才能・使命・人生のテーマを300文字で。「あなたは〜な人です」と直接語りかけるスタイルで。具体的なエピソードや傾向・他者からどう見られているかも含める。）

### 💫 ${typeLabel}（${todayStr}時点）
（現在の星回りと干支の運気サイクルを踏まえ、具体的な状況・転換期・注意すべき時期を400文字で。「今月は〜」「〇月頃に〜」など時期を明示して。読んだ人が「なぜわかるの？」と思うような、日常生活に刺さる具体的な描写を入れること。）
${loveSection}

### 🎯 今後3ヶ月の行動指針
（運気を最大化する具体的な行動を3つ。「〜するとよい」ではなく「〜してください」と断言するスタイルで。それぞれの理由・タイミング・期待できる変化も記載。）

### ⚡ 今月の転換点
（特に注意または積極的に動くべき日を「〇月〇日頃」で1〜2点。その理由と、その日に何をすべきかの具体的行動も添える。）

### 🔮 あなたのラッキー情報
**ラッキーカラー:** （2色・理由も一言）
**ラッキーアイテム:** （日常で取り入れやすいもの・なぜそれが開運につながるかも）
**ラッキーナンバー:** （数字と意味）
**ラッキーワード:** （今月心がけるキーワード）

### 💌 最後に${name || "あなた"}へ
（70〜100文字の温かいメッセージ。その人の干支・九星の特質に触れ、今の時期を乗り越えるための勇気づけの言葉で締める。）

### 📱 シェア用おみくじ結果
以下の形式で必ず出力してください（SNS投稿用）：
【今日の運勢】大吉・中吉・小吉・末吉・吉・凶のいずれか + 一言（15文字以内）
【シェアするとしたら】「${eto}年生まれ・${kyusei}白星の私の今日の運勢は○○でした！${todayStr}の占いが当たりすぎて驚いた… #占いAI #九星気学 #${eto}年生まれ」

---
※ 占いは統計学的な傾向であり、参考としてご活用ください。

最後に必ず「## 次の3ステップ」というセクションを追加し、ユーザーが今すぐ取れる具体的な行動を箇条書き（「- 」で始まる）3つ記載してください。各ステップは「〇〇する（例：専門家に相談する・早期行動を取る・具体的な手続きを始める等）」の形式で書いてください。`;

  try {
    const stream = client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 4000,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: prompt }],
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
              controller.enqueue(new TextEncoder().encode(chunk.delta.text));
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Set-Cookie": cookieHeader,
        "X-Uranai-Kyusei": kyusei,
        "X-Uranai-Eto": eto,
        "X-Uranai-Count": String(newCount),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "AI生成中にエラーが発生しました。しばらく待ってから再試行してください。" }, { status: 500 });
  }
}
