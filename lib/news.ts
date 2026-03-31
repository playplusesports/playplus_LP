import { put, list, del } from '@vercel/blob'

export type NewsItem = {
  id: string
  date: string
  category: string
  title: string
  content: string
  imageUrl?: string
}

const BLOB_KEY = 'news.json'

export async function getNews(): Promise<NewsItem[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_KEY })
    if (blobs.length === 0) return getDefaultNews()

    const response = await fetch(blobs[0].url, { cache: 'no-store' })
    return await response.json()
  } catch {
    return getDefaultNews()
  }
}

export async function saveNews(news: NewsItem[]): Promise<void> {
  // Delete existing blob
  const { blobs } = await list({ prefix: BLOB_KEY })
  for (const blob of blobs) {
    await del(blob.url)
  }

  // Save new data
  await put(BLOB_KEY, JSON.stringify(news), {
    access: 'public',
    contentType: 'application/json',
  })
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
