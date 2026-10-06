import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getWorks, saveWorks } from '@/lib/works'
import { codeManagedWorksNotIn } from '@/lib/works-code-managed'

export const dynamic = 'force-dynamic'

// コード管理の実績を、管理画面で編集・削除できる通常の投稿（Blob）として先頭に取り込む
export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 })
  }

  const works = await getWorks()
  const imported = codeManagedWorksNotIn(works).map(({ managedInCode: _, ...work }) => work)
  if (imported.length === 0) {
    return NextResponse.json({ imported: 0 })
  }

  await saveWorks([...imported, ...works])
  return NextResponse.json({ imported: imported.length })
}
