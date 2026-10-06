// 実績のカテゴリ。管理画面の選択肢・一覧のフィルタ・カードの表示はすべてここを正とする。
export const WORKS_CATEGORIES = ["大会運営", "イベント運営", "Web制作", "デザイン", "アプリ開発", "動画制作"] as const

export const WORKS_FILTERS = ["すべて", ...WORKS_CATEGORIES] as const

export type WorksFilter = (typeof WORKS_FILTERS)[number]

// 画像がない実績のカバーに出す英字ラベル
const CATEGORY_CODES: Record<string, string> = {
  "大会運営": "ESPORTS",
  "イベント運営": "EVENT",
  "Web制作": "WEB",
  "デザイン": "DESIGN",
  "アプリ開発": "APP",
  "動画制作": "VIDEO",
}

const FALLBACK_CATEGORY_CODE = "WORK"

export function categoryCodeOf(category: string): string {
  return CATEGORY_CODES[category] ?? FALLBACK_CATEGORY_CODE
}
