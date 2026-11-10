// 問い合わせが届いたことを、受付担当のメールに知らせる。
// 送信は Resend（無料枠）。playplus.jp は Resend で送信元として認証済み。
// 返信ボタンでそのまま相手に返せるよう、Reply-To に問い合わせた人のアドレスを入れる。

const RESEND_ENDPOINT = "https://api.resend.com/emails"
const SENDER = "Play+ お問い合わせ <noreply@playplus.jp>"
const SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1FEAIu_zH2dO1vqnI5fF4WExqllXMCX-C9gmFMyq1A7s/edit"

export type Inquiry = {
  name: string
  email: string
  company: string
  inquiryType: string
  budget: string
  message: string
}

const FIELD_LABELS: readonly [keyof Inquiry, string][] = [
  ["name", "お名前"],
  ["email", "メールアドレス"],
  ["company", "会社名"],
  ["inquiryType", "種別"],
  ["budget", "ご予算"],
]

export function toInquiry(body: unknown): Inquiry {
  const source = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : {}
  const read = (key: keyof Inquiry) => (typeof source[key] === "string" ? (source[key] as string).trim() : "")
  return {
    name: read("name"),
    email: read("email"),
    company: read("company"),
    inquiryType: read("inquiryType"),
    budget: read("budget"),
    message: read("message"),
  }
}

function subjectOf(inquiry: Inquiry): string {
  const type = inquiry.inquiryType || "お問い合わせ"
  const who = inquiry.company || inquiry.name || "名前なし"
  return `【問い合わせ】${type}｜${who}`
}

function bodyOf(inquiry: Inquiry): string {
  const details = FIELD_LABELS.filter(([key]) => inquiry[key] !== "").map(([key, label]) => `${label}：${inquiry[key]}`)
  return [...details, "", inquiry.message, "", "――", "このメールに返信すると、問い合わせた方に届きます。", `一覧：${SPREADSHEET_URL}`].join("\n")
}

// 通知が送れなくても問い合わせ自体はスプレッドシートに残っているので、失敗は例外にせずログに残す。
export async function notifyInquiryReceived(inquiry: Inquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.INQUIRY_NOTIFY_TO
  if (!apiKey || !recipient) {
    console.error("[inquiry-notification] RESEND_API_KEY か INQUIRY_NOTIFY_TO が未設定のため、通知メールを送れませんでした")
    return
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: SENDER,
      to: recipient,
      subject: subjectOf(inquiry),
      text: bodyOf(inquiry),
      ...(inquiry.email ? { reply_to: inquiry.email } : {}),
    }),
  })
  if (!response.ok) {
    console.error(`[inquiry-notification] 通知メールの送信に失敗しました（status ${response.status}）: ${await response.text()}`)
  }
}
