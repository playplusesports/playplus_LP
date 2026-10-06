// 実績のカテゴリ。管理画面の選択肢・一覧のフィルタ・画像なし時の背景色はすべてここを正とする。
export const WORKS_CATEGORIES = ["大会運営", "イベント運営", "Web制作", "デザイン", "アプリ開発", "動画制作"] as const

export const WORKS_FILTERS = ["すべて", ...WORKS_CATEGORIES] as const

export const WORKS_PLACEHOLDER_GRADIENTS: Record<string, string> = {
  "大会運営": "bg-gradient-to-br from-purple-900 to-blue-900",
  "イベント運営": "bg-gradient-to-br from-amber-900 to-yellow-900",
  "Web制作": "bg-gradient-to-br from-emerald-900 to-teal-900",
  "デザイン": "bg-gradient-to-br from-orange-900 to-red-900",
  "アプリ開発": "bg-gradient-to-br from-sky-900 to-indigo-900",
  "動画制作": "bg-gradient-to-br from-rose-900 to-pink-900",
}
