import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getNews, saveNews, type NewsItem } from '@/lib/news'

export const dynamic = 'force-dynamic'

export async function GET() {
  const news = await getNews()
  return NextResponse.json(news, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const body = await req.json()
  const news = await getNews()

  const newItem: NewsItem = {
    id: Date.now().toString(),
    date: body.date,
    category: body.category,
    title: body.title,
    content: body.content,
    ...(body.imageUrl ? { imageUrl: body.imageUrl } : {}),
  }

  news.unshift(newItem)
  await saveNews(news)

  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const body = await req.json()
  const news = await getNews()
  const index = news.findIndex((n) => n.id === body.id)

  if (index === -1) {
    return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 })
  }

  news[index] = { ...news[index], ...body }
  await saveNews(news)

  return NextResponse.json(news[index])
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const { id } = await req.json()
  const news = await getNews()
  const filtered = news.filter((n) => n.id !== id)

  // Save even if item wasn't found (may have been deleted by another request)
  await saveNews(filtered)
  return NextResponse.json({ success: true })
}
