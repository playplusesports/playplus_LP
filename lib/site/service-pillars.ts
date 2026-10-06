// Play+ の5つの事業。トップの事業一覧・サービスページ・問い合わせ種別はこの並びを使う。
export type ServicePillar = {
  slug: string
  code: string
  title: string
  lead: string
  description: string
  offerings: readonly string[]
  proofs: readonly string[]
  priceLabel: string
  detailLinks: readonly { label: string; href: string }[]
}

export const SERVICE_PILLARS: readonly ServicePillar[] = [
  {
    slug: "web",
    code: "WEB",
    title: "Webサイト制作・集客",
    lead: "つくって終わりにしない、集まるWebサイト。",
    description:
      "店舗や中小企業のWebサイトを、制作から更新・集客まで月額でまるごとお任せいただけます。Googleマップ（MEO）や検索・AI検索（SEO / LLMO）の対策まで一つの窓口で。",
    offerings: [
      "サイト制作（LP〜複数ページ）",
      "月額の更新・保守",
      "MEO / SEO / LLMO 対策",
      "Googleビジネスプロフィール・Instagram 初期設定",
    ],
    proofs: ["Hu-Mam コーポレートサイト", "CAFEMANO MEO最適化", "mauve サイト制作・集客改善"],
    priceLabel: "月額 ¥5,000〜",
    detailLinks: [
      { label: "Web制作・保守の料金", href: "/services/web" },
      { label: "SEO / MEO / LLMO 対策", href: "/services/meo" },
    ],
  },
  {
    slug: "app",
    code: "APP",
    title: "Webアプリ・サービス開発",
    lead: "予約も、決済も、マッチングも。「動く仕組み」をつくる。",
    description:
      "会員・決済・予約・マッチングなど、業務やサービスの核になる仕組みを企画から公開・運用まで開発します。自社サービスを毎月リリースし続けている開発体制で、小さく早く形にします。",
    offerings: ["Webサービス・業務アプリ開発", "決済（Stripe）・会員・ログイン", "LINE 連携", "管理画面・データベース設計"],
    proofs: ["マッチングサービス DuoVC", "Toybox", "スマノート", "レスバアリーナ"],
    priceLabel: "お見積り",
    detailLinks: [],
  },
  {
    slug: "ai",
    code: "AI",
    title: "AI活用・業務の自動化",
    lead: "くり返しの作業は、AIと仕組みに任せる。",
    description:
      "問い合わせ返信の下書き、毎日の情報収集とサイト更新、SNS投稿。人が毎回やっている作業をAIと自動化に置き換え、人は判断と仕上げだけに集中できる状態をつくります。",
    offerings: ["AIを組み込んだツール開発", "定型業務・更新作業の自動化", "毎日自動で更新されるサイト", "社内のAI活用の相談"],
    proofs: ["公式LINE管理アプリ", "AI・金融トピック日報", "サッと計算", "おやすみ物語"],
    priceLabel: "お見積り",
    detailLinks: [],
  },
  {
    slug: "video",
    code: "VIDEO",
    title: "動画・コンテンツ制作",
    lead: "毎日更新を、気合いではなく仕組みで。",
    description:
      "台本・ナレーション・映像・サムネイル・投稿までを仕組み化し、複数のYouTubeチャンネルを毎日更新しています。その制作ラインを、企業の発信や動画施策にも活かします。",
    offerings: ["YouTube ショート", "図解つき解説動画", "作業用BGM・朗読などの長尺動画", "投稿・運用の自動化"],
    proofs: ["雑学ショートチャンネル", "図解解説動画", "作業用BGM・睡眠用朗読"],
    priceLabel: "お見積り",
    detailLinks: [],
  },
  {
    slug: "event",
    code: "EVENT",
    title: "イベント・eスポーツ・デザイン",
    lead: "Play+ の原点は、ゲーム大会の会場。",
    description:
      "2023年から月1回のeスポーツ大会「INNOSUMA!!」を企画・運営しています。大会・イベントの企画運営や配信、ロゴ・ポスター・SNS用画像などのデザインまで対応します。",
    offerings: ["イベント・大会の企画運営", "配信", "ロゴ・ポスター・チラシ", "SNS用デザイン"],
    proofs: ["eスポーツ大会 INNOSUMA!! 定期開催", "ロゴデザイン 16件以上", "告知ポスター・フライヤー制作"],
    priceLabel: "イベント ¥50,000〜 / デザイン ¥5,000〜",
    detailLinks: [],
  },
]
