import { put, list, del } from '@vercel/blob'

export type NewsItem = {
  id: string
  date: string
  category: string
  title: string
  content: string
  imageUrl?: string
}

const BLOB_PREFIX = 'news-data-'

export async function getNews(): Promise<NewsItem[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX })
    if (blobs.length === 0) return []

    // Always use the most recently uploaded blob
    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    const response = await fetch(sorted[0].url, { cache: 'no-store' })
    if (!response.ok) throw new Error(`status ${response.status}`)
    const data = await response.json()

    // Clean up old blobs in the background (keep only the latest)
    if (sorted.length > 1) {
      for (let i = 1; i < sorted.length; i++) {
        del(sorted[i].url).catch((error) => console.error('古いnewsデータの削除に失敗しました', error))
      }
    }

    return data
  } catch (error) {
    // 読めなかったときに空や既定値で返すと、管理画面の保存で本物のデータを上書きしてしまうので投げる
    throw new Error('newsデータ（Vercel Blob）の読み込みに失敗しました', { cause: error })
  }
}

export async function saveNews(news: NewsItem[]): Promise<void> {
  // Write new blob with unique name (timestamp ensures uniqueness)
  const newKey = `${BLOB_PREFIX}${Date.now()}.json`
  await put(newKey, JSON.stringify(news), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
  })

  // Delete all old blobs
  const { blobs } = await list({ prefix: BLOB_PREFIX })
  const oldBlobs = blobs.filter((b) => !b.pathname.includes(newKey))
  for (const blob of oldBlobs) {
    await del(blob.url)
  }
}
