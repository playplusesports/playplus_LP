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
    if (blobs.length === 0) return getDefaultNews()

    // Always use the most recently uploaded blob
    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    const response = await fetch(sorted[0].url, { cache: 'no-store' })
    const data = await response.json()

    // Clean up old blobs in the background (keep only the latest)
    if (sorted.length > 1) {
      for (let i = 1; i < sorted.length; i++) {
        del(sorted[i].url).catch(() => {})
      }
    }

    return data
  } catch {
    return getDefaultNews()
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

function getDefaultNews(): NewsItem[] {
  return [
    {
      id: '1',
      date: '2026.03.28',
      category: 'お知らせ',
      title: 'Webサイトをリニューアルしました',
      content: 'Play+のWebサイトをリニューアルしました。サービス内容や実績をより分かりやすくお伝えできるよう、デザインと構成を一新しています。',
    },
    {
      id: '2',
      date: '2026.03.15',
      category: 'イベント',
      title: '春季オフライン大会の参加受付を開始しました',
      content: '2026年4月に開催予定のオフライン大会の参加受付を開始しました。詳細はSNSをご確認ください。',
    },
    {
      id: '3',
      date: '2026.03.01',
      category: 'お知らせ',
      title: '新サービス「イベント配信パッケージ」を開始',
      content: 'オンライン配信のセットアップから運営までをパッケージ化した新サービスの提供を開始しました。',
    },
  ]
}
