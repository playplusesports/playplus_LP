// 実績のカテゴリ。管理画面の選択肢・一覧のフィルタ・カードの表示はすべてここを正とする。
export const WORKS_CATEGORIES = ["大会運営", "イベント運営", "Web制作", "MEO・LLMO対策", "デザイン", "アプリ開発", "動画制作", "研修・セミナー"] as const

export const WORKS_FILTERS = ["すべて", ...WORKS_CATEGORIES] as const

export type WorksFilter = (typeof WORKS_FILTERS)[number]
