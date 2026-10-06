import { put, list, del } from '@vercel/blob'

export type WorkItem = {
  id: string
  title: string
  category: string
  description: string
  period: string
  location: string
  scale: string
  tags: string[]
  imageUrl?: string
  // lib/works-code-managed.ts で定義された実績。管理画面からは編集・削除できない
  managedInCode?: true
}

const BLOB_PREFIX = 'works-data-'

export async function getWorks(): Promise<WorkItem[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX })
    if (blobs.length === 0) return []

    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    const response = await fetch(sorted[0].url, { cache: 'no-store' })
    if (!response.ok) throw new Error(`status ${response.status}`)
    const data = await response.json()

    if (sorted.length > 1) {
      for (let i = 1; i < sorted.length; i++) {
        del(sorted[i].url).catch((error) => console.error('古いworksデータの削除に失敗しました', error))
      }
    }

    return data
  } catch (error) {
    // 読めなかったときに空や既定値で返すと、管理画面の保存で本物のデータを上書きしてしまうので投げる
    throw new Error('worksデータ（Vercel Blob）の読み込みに失敗しました', { cause: error })
  }
}

export async function saveWorks(works: WorkItem[]): Promise<void> {
  const newKey = `${BLOB_PREFIX}${Date.now()}.json`
  await put(newKey, JSON.stringify(works), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })

  const { blobs } = await list({ prefix: BLOB_PREFIX })
  const oldBlobs = blobs.filter((b) => !b.pathname.includes(newKey))
  for (const blob of oldBlobs) {
    await del(blob.url)
  }
}
