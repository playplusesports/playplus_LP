import { NextRequest, NextResponse } from "next/server"
import { notifyInquiryReceived, toInquiry } from "@/lib/inquiry-notification"

// 問い合わせを GAS 経由でスプレッドシートに記録し、受付担当へメールで知らせる。
// ひと名刺（meishi.playplus.jp）の問い合わせもここに転送されてくる。
export async function POST(request: NextRequest) {
  const inquiry = toInquiry(await request.json())

  const gasUrl = process.env.GAS_WEBHOOK_URL
  if (!gasUrl) {
    return NextResponse.json({ error: "送信先が設定されていません" }, { status: 500 })
  }

  const res = await fetch(gasUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiry),
  })

  if (!res.ok) {
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 })
  }

  await notifyInquiryReceived(inquiry)
  return NextResponse.json({ success: true })
}
