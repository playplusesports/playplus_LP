// Play+ の5つの事業。トップの事業一覧・サービスページ・問い合わせ種別はこの並びを使う。
export type ServicePillar = {
  slug: string
  code: string
  // トップの見出し「◯◯に、プラスを。」の◯◯
  heroWord: string
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
    heroWord: "Webに、",
    title: "Webサイト制作・集客",
    lead: "お店や会社のサイトを、月額で制作・更新します。",
    description:
      "店舗や中小企業のWebサイトを、月額5,000円から制作・更新しています。Googleマップでの表示対策（MEO）や検索対策も、同じ窓口でご相談いただけます。",
    offerings: [
      "サイト制作（1ページ〜複数ページ）",
      "月額の更新・保守",
      "MEO・SEO 対策",
      "Googleビジネスプロフィール・Instagram の初期設定",
    ],
    proofs: ["Hu-Mam コーポレートサイト", "CAFEMANO MEO最適化", "mauve サイト制作・集客改善"],
    priceLabel: "個人 月額 ¥5,000〜 / 法人 お見積り",
    detailLinks: [
      { label: "Web制作・保守の料金", href: "/services/web" },
      { label: "SEO / MEO / LLMO 対策", href: "/services/meo" },
    ],
  },
  {
    slug: "app",
    code: "APP",
    heroWord: "アプリに、",
    title: "Webアプリ・サービス開発",
    lead: "予約、会員、決済、マッチングなどの仕組みをつくります。",
    description:
      "業務で使うツールや、一般向けのWebサービスを開発しています。自社でもマッチングサービスや投稿サイトを公開・運営しているので、公開したあとの運用までまとめてご相談いただけます。",
    offerings: [
      "Webサービス・業務ツールの開発",
      "決済（Stripe）・会員登録・ログイン",
      "LINE 公式アカウントとの連携",
      "管理画面・データベースの設計",
    ],
    proofs: ["マッチングサービス DuoVC", "Toybox", "スマノート", "レスバアリーナ"],
    priceLabel: "お見積り",
    detailLinks: [],
  },
  {
    slug: "automation",
    code: "AUTO",
    heroWord: "仕組みに、",
    title: "業務の仕組み化・自動化",
    lead: "毎日の手作業を、自動で回る仕組みに置き換えます。",
    description:
      "問い合わせへの返信、毎日の更新作業、SNSへの投稿など、手で繰り返している作業を自動化します。自社でも、動画の投稿やサイトの更新を毎日決まった時刻に自動で回しています。",
    offerings: ["業務ツールの開発", "更新・投稿作業の自動化", "毎日自動で更新されるサイト", "LINE 公式アカウントの返信管理"],
    proofs: ["トピック日報サイト", "サッと計算", "おやすみ物語"],
    priceLabel: "お見積り",
    detailLinks: [],
  },
  {
    slug: "video",
    code: "VIDEO",
    heroWord: "動画に、",
    title: "動画制作",
    lead: "YouTube向けの動画を、企画から投稿まで引き受けます。",
    description:
      "台本、ナレーション、編集、サムネイル、投稿までを一通り行っています。自社でもYouTubeチャンネルを複数運営し、毎日の投稿を続けています。",
    offerings: ["YouTube ショート", "図解入りの解説動画", "作業用BGM・朗読などの長尺動画", "投稿・運用の代行"],
    proofs: ["雑学ショートチャンネル", "図解解説動画", "作業用BGM・睡眠用朗読"],
    priceLabel: "お見積り",
    detailLinks: [],
  },
  {
    slug: "event",
    code: "EVENT",
    heroWord: "イベントに、",
    title: "イベント・eスポーツ・デザイン",
    lead: "ゲーム大会の運営が、Play+ の出発点です。",
    description:
      "2023年から、毎月1回のeスポーツ大会を企画・運営しています。大会やイベントの企画・運営・配信に加えて、ロゴやポスター、SNS用の画像などのデザインも引き受けます。",
    offerings: ["イベント・大会の企画運営", "配信", "ロゴ・ポスター・チラシ", "SNS用のデザイン"],
    proofs: ["eスポーツ大会の定期開催（2023年〜）", "ロゴデザイン 16件以上", "告知ポスター・フライヤー制作"],
    priceLabel: "イベント ¥50,000〜 / デザイン ¥5,000〜",
    detailLinks: [],
  },
]
