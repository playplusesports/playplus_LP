import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getWorks, saveWorks, type WorkItem } from '@/lib/works'

export const dynamic = 'force-dynamic'

export async function GET() {
  const works = await getWorks()
  return NextResponse.json(works, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const body = await req.json()
  const works = await getWorks()

  const newItem: WorkItem = {
    id: Date.now().toString(),
    title: body.title,
    category: body.category,
    description: body.description,
    period: body.period,
    location: body.location,
    scale: body.scale,
    tags: body.tags || [],
    ...(body.imageUrl ? { imageUrl: body.imageUrl } : {}),
  }

  works.unshift(newItem)
  await saveWorks(works)
  return NextResponse.json(newItem, { status: 201 })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const body = await req.json()
  const works = await getWorks()
  const index = works.findIndex((w) => w.id === body.id)

  if (index === -1) {
    return NextResponse.json({ error: '実績が見つかりません' }, { status: 404 })
  }

  works[index] = { ...works[index], ...body }
  await saveWorks(works)
  return NextResponse.json(works[index])
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const { id } = await req.json()
  const works = await getWorks()
  const filtered = works.filter((w) => w.id !== id)
  await saveWorks(filtered)
  return NextResponse.json({ success: true })
}
