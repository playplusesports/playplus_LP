// Play+ が毎日自動で動かしている仕組み。トップの「いま動いているもの」に表示する。
export type ScheduledOperation = {
  // 日本時間の実行時刻（時・分）
  hour: number
  minute: number
  title: string
  output: string
}

export const SCHEDULED_OPERATIONS: readonly ScheduledOperation[] = [
  { hour: 9, minute: 0, title: "雑学ショート", output: "YouTube に自動投稿" },
  { hour: 10, minute: 30, title: "作業用BGM（60分）", output: "音源から映像まで自動生成して投稿" },
  { hour: 12, minute: 15, title: "睡眠用朗読（90分）", output: "台本・ナレーションを生成して投稿" },
  { hour: 15, minute: 0, title: "Webデザイン見本", output: "ギャラリーに3件追加" },
]

export const DAILY_OPERATIONS_WITHOUT_FIXED_TIME: readonly { title: string; output: string }[] = [
  { title: "AI・金融トピック日報", output: "毎朝ニュースを収集・要約して公開" },
  { title: "計算ツールサイト", output: "検索需要のあるツールを毎日1本追加" },
]

export const STUDIO_FACTS: readonly { value: string; unit: string; label: string }[] = [
  { value: "10", unit: "+", label: "自社で開発・公開中のWebサービス" },
  { value: "1", unit: "週間〜", label: "LPの制作から公開まで（最短）" },
  { value: "150", unit: "+", label: "店舗向けに制作した提案サイト" },
  { value: "2023", unit: "〜", label: "eスポーツ大会を毎月開催" },
]
