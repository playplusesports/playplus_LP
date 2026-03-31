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
}

const BLOB_PREFIX = 'works-data-'

const defaultCategories = ["大会運営", "イベント運営", "Web制作", "デザイン"]
export { defaultCategories as worksCategories }

export async function getWorks(): Promise<WorkItem[]> {
  try {
    const { blobs } = await list({ prefix: BLOB_PREFIX })
    if (blobs.length === 0) return getDefaultWorks()

    const sorted = blobs.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    const response = await fetch(sorted[0].url, { cache: 'no-store' })
    const data = await response.json()

    if (sorted.length > 1) {
      for (let i = 1; i < sorted.length; i++) {
        del(sorted[i].url).catch(() => {})
      }
    }

    return data
  } catch {
    return getDefaultWorks()
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

function getDefaultWorks(): WorkItem[] {
  return [
    {
      id: 'offline-128',
      title: '128名規模オフライン大会',
      category: '大会運営',
      description: '大手ゲームタイトルの公式大会を企画から運営まで一貫してサポート。128名のトーナメント管理、会場設営、配信環境の構築を担当しました。',
      period: '2025年8月',
      location: '東京都内イベントホール',
      scale: '参加者128名 / 来場者300名',
      tags: ['企画', '運営', '配信', '会場設営'],
    },
    {
      id: 'facility-event',
      title: '施設主催eスポーツイベント',
      category: 'イベント運営',
      description: '商業施設でのeスポーツ体験イベントの運営をサポート。親子向けの体験ブース設計から当日の進行管理まで対応しました。',
      period: '2025年5月',
      location: '大阪市内商業施設',
      scale: '来場者500名以上',
      tags: ['イベント企画', '体験ブース', '進行管理'],
    },
    {
      id: 'tournament-website',
      title: 'eスポーツ大会公式Webサイト',
      category: 'Web制作',
      description: '大会の告知・エントリー受付用のランディングページを制作。レスポンシブ対応、エントリーフォーム、大会ルール掲載ページを含む構成です。',
      period: '2025年7月',
      location: 'オンライン',
      scale: 'LP + 5ページ構成',
      tags: ['LP制作', 'フォーム', 'レスポンシブ'],
    },
    {
      id: 'branding-design',
      title: '大会専用ブランディングデザイン',
      category: 'デザイン',
      description: '大会ロゴ、ポスター、SNS用バナー、配信オーバーレイを統一デザインで制作。ブランドイメージの一貫性を重視しました。',
      period: '2025年6月',
      location: '-',
      scale: 'ロゴ + ポスター + バナー5点 + オーバーレイ',
      tags: ['ロゴ', 'ポスター', 'バナー', 'オーバーレイ'],
    },
    {
      id: 'corporate-tournament',
      title: '企業対抗eスポーツ大会',
      category: '大会運営',
      description: '企業間交流を目的としたeスポーツ大会をプロデュース。8社参加のチーム戦トーナメントの企画・運営・配信を一括で担当しました。',
      period: '2025年10月',
      location: '名古屋市内貸切スペース',
      scale: '8チーム / 40名参加',
      tags: ['企業向け', 'チーム戦', '企画', '配信'],
    },
    {
      id: 'corporate-site',
      title: 'コーポレートサイトリニューアル',
      category: 'Web制作',
      description: 'eスポーツ関連企業のコーポレートサイトをフルリニューアル。モダンなデザインとSEO対策を施した5ページ構成のサイトを制作しました。',
      period: '2025年9月',
      location: 'オンライン',
      scale: '5ページ構成',
      tags: ['コーポレート', 'リニューアル', 'SEO'],
    },
    {
      id: 'stream-overlay',
      title: '配信オーバーレイパッケージ',
      category: 'デザイン',
      description: 'ゲーム配信者向けのオーバーレイデザインをパッケージで制作。待機画面、ゲーム画面、エンディング画面のセットを統一デザインで提供しました。',
      period: '2025年4月',
      location: '-',
      scale: '3画面セット',
      tags: ['配信', 'オーバーレイ', 'パッケージ'],
    },
    {
      id: 'school-league',
      title: '学校対抗eスポーツリーグ',
      category: 'イベント運営',
      description: '高校生を対象としたeスポーツリーグの運営支援。予選から決勝まで3ヶ月にわたるリーグ戦の進行管理とオンライン配信を担当しました。',
      period: '2025年4月〜6月',
      location: 'オンライン + 決勝オフライン',
      scale: '16校参加',
      tags: ['学校', 'リーグ戦', '長期運営', '配信'],
    },
  ]
}
