// 料金表。金額の表記は旧サイトの各ページの表記（税込 / 税別）をそのまま引き継いでいる。
export type Plan = {
  name: string
  price: string
  unit: string
  initialFee: string
  contract: string
  features: readonly string[]
  isRecommended: boolean
}

export type PricedOption = {
  name: string
  price: string
  description: string
}

export const WEB_MONTHLY_PLANS: readonly Plan[] = [
  {
    name: "1ページプラン",
    price: "¥5,000",
    unit: "／月",
    initialFee: "初期費用 無料",
    contract: "最低契約期間なし",
    features: ["1ページの静的サイト（LP型）", "お問い合わせフォーム", "Googleマップ埋め込み", "サイト死活監視"],
    isRecommended: false,
  },
  {
    name: "エントリープラン",
    price: "¥10,000",
    unit: "／月",
    initialFee: "初期費用 無料",
    contract: "6ヶ月契約",
    features: ["5ページ以内の静的サイト", "お問い合わせフォーム", "Googleマップ埋め込み", "サイト死活監視"],
    isRecommended: false,
  },
  {
    name: "ライトプラン",
    price: "¥16,000",
    unit: "／月",
    initialFee: "初期費用 ¥9,800",
    contract: "6ヶ月契約",
    features: [
      "8ページ以内の静的サイト",
      "お問い合わせ＋LINE誘導",
      "Instagram・Googleマップ埋め込み",
      "月1回コンテンツ更新代行",
      "AI投稿文 月3本プレゼント",
      "月次アクセスレポート（LINE送付）",
    ],
    isRecommended: true,
  },
  {
    name: "スタンダードプラン",
    price: "¥30,000",
    unit: "／月",
    initialFee: "初期費用 ¥19,800",
    contract: "3ヶ月契約",
    features: [
      "ページ数無制限",
      "予約フォーム・ECカート連携",
      "月2回コンテンツ更新",
      "AI投稿文 月10本",
      "月次Googleアナリティクスレポート",
      "SEO基本対策",
    ],
    isRecommended: false,
  },
]

export const WEB_ONE_TIME_PLAN: Plan = {
  name: "スターターパック（買い切り）",
  price: "¥29,800",
  unit: "（一括）",
  initialFee: "縛りなし・一括払い",
  contract: "保守・更新は含まれません",
  features: [
    "5ページ以内の静的サイト",
    "お問い合わせフォーム",
    "Googleマップ埋め込み",
    "修正1回無料（追加修正 1回 ¥5,000）",
    "ファイル一式を圧縮して納品",
  ],
  isRecommended: false,
}

export const WEB_OPTIONS: readonly PricedOption[] = [
  { name: "ロゴ作成 — シンプル", price: "¥10,000", description: "テキスト＋アイコン。AI補助で制作。PNG・SVG納品。納期3〜5日" },
  { name: "ロゴ作成 — フルオリジナル", price: "¥39,800", description: "ヒアリング→複数案提案→修正2回込み。完全オリジナル。納期7〜10日" },
  { name: "追加ページ制作（1ページ）", price: "¥8,000", description: "制作のみ・保守別途" },
  { name: "Googleビジネスプロフィール設定", price: "¥9,800", description: "マップ掲載・写真登録・初期SEO最適化を代行" },
  { name: "Instagram初期設定＋投稿5本", price: "¥14,800", description: "プロフィール整備＋開始投稿5本をAIで作成・代行投稿" },
]

export const WEB_CORPORATE_PLAN_POINTS: readonly string[] = [
  "フルオーダーメイドで制作（デザイン・機能を自由に設計）",
  "料金はご要望をヒアリングの上でお見積り",
  "まず制作物をご確認いただいてから契約をご判断いただけます",
  "予約・EC・会員・多言語など各種システム連携に対応",
  "公開後の運用・保守までまとめてサポート",
]

export const MEO_MONTHLY_PLANS: readonly Plan[] = [
  {
    name: "スターター",
    price: "¥15,000",
    unit: "／月（税別）",
    initialFee: "初期費用 ¥0",
    contract: "契約期間の縛りなし",
    features: [
      "GBP最適化（初期設定・運用）",
      "構造化データ実装（5種類）",
      "口コミ管理・返信代行",
      "月2回のGBP投稿",
      "ALT属性・メタデータ修正",
      "月次レポート",
    ],
    isRecommended: false,
  },
  {
    name: "スタンダード",
    price: "¥25,000",
    unit: "／月（税別）",
    initialFee: "初期費用 ¥0",
    contract: "契約期間の縛りなし",
    features: [
      "スターターの全機能",
      "週2回のGBP投稿",
      "NAP一貫性チェック・修正",
      "FAQコンテンツ作成",
      "サイテーション構築",
      "月次分析レポート（詳細版）",
    ],
    isRecommended: true,
  },
  {
    name: "プレミアム",
    price: "¥40,000",
    unit: "／月（税別）",
    initialFee: "初期費用 ¥0",
    contract: "契約期間の縛りなし",
    features: [
      "スタンダードの全機能",
      "写真撮影ディレクション（月1回）",
      "SNS連携コンサルティング",
      "競合分析レポート",
      "隔週のオンラインMTG",
      "優先サポート",
    ],
    isRecommended: false,
  },
]

// トップと事業一覧に出す目安の料金
export const PRICE_GUIDE: readonly { service: string; price: string; href: string }[] = [
  { service: "Web制作・保守運用", price: "¥5,000〜／月", href: "/services/web" },
  { service: "SEO / MEO / LLMO 対策", price: "¥15,000〜／月（税別）", href: "/services/meo" },
  { service: "Webアプリ・AI・自動化の開発", price: "お見積り", href: "/services#app" },
  { service: "動画・コンテンツ制作", price: "お見積り", href: "/services#video" },
  { service: "イベントプロデュース", price: "¥50,000〜", href: "/services#event" },
  { service: "デザイン制作", price: "¥5,000〜", href: "/services#event" },
  { service: "ロゴ作成", price: "¥10,000〜", href: "/services/web#options" },
]
