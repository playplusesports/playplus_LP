import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()

  const gasUrl = process.env.GAS_WEBHOOK_URL
  if (!gasUrl) {
    return NextResponse.json(
      { error: "送信先が設定されていません" },
      { status: 500 }
    )
  }

  const res = await fetch(gasUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
