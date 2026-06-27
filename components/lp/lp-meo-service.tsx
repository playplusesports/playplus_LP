"use client"

import Link from "next/link"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import { LpHeader, LpFooter, LpStickyCta, SecHead, LP_BLUE as BLUE, LP_CTA as CTA, LP_LINE } from "@/components/lp/lp-chrome"
import {
  MapPin, Star, TrendingUp, MessageCircle, Camera, FileText, Search, Bot, Globe,
  CheckCircle2, ArrowRight, ShieldCheck,
} from "lucide-react"

// LP（/lp/services/meo）：通常 /services/meo と同一情報を、LPの白基調テイストで再構成。
const STATS = [
  { value: "+35%", label: "クリック率向上", desc: "写真が充実したGBPはクリック率が35%向上", icon: TrendingUp },
  { value: "+42%", label: "ルート検索増加", desc: "最適化されたGBPは経路案内が42%増加", icon: MapPin },
  { value: "+28%", label: "検索順位改善", desc: "週1回以上の投稿で検索順位が28%改善", icon: Search },
]

const MEO = [
  { icon: MapPin, title: "GBP最適化", items: ["ビジネス情報の完全な最適化", "カテゴリ・属性の戦略的設定", "メニュー情報の構造化登録", "写真のジオタグ・EXIF最適化", "商品セクションの充実"] },
  { icon: Star, title: "口コミ管理", items: ["全口コミへの迅速な返信体制", "ネガティブレビューへの戦略的対応", "口コミ獲得の仕組み（QRコード等）", "口コミ分析レポート（月次）", "競合の口コミ動向モニタリング"] },
  { icon: FileText, title: "定期投稿", items: ["週2回以上のGBP投稿作成・投稿", "イベント投稿の活用", "季節メニュー・限定情報の発信", "写真付き投稿で視覚的訴求"] },
  { icon: Camera, title: "写真戦略", items: ["プロ品質の写真撮影ディレクション", "カテゴリ別写真の最適配置", "写真のメタデータ最適化", "定期的な写真更新"] },
]

const LLMO = [
  { icon: Globe, title: "構造化データ実装", desc: "LocalBusiness・Restaurant・Menu・FAQ・BreadcrumbListの5種類のスキーマを実装。Google検索でリッチスニペット表示を実現します。" },
  { icon: Bot, title: "AI検索最適化", desc: "ChatGPT・Gemini・Perplexity等のAI検索であなたのお店が推薦されるよう、情報構造を最適化します。" },
  { icon: Search, title: "画像SEO対策", desc: "全画像へのALT属性設定、ジオタグ・EXIFデータの最適化で、画像検索からの流入を強化します。" },
  { icon: FileText, title: "FAQコンテンツ作成", desc: "よくある質問をFAQスキーマ付きで作成。Google検索結果に直接表示され、AI検索でも参照されます。" },
]

const PLANS = [
  { name: "SEO + MEO + LLMO スターター", price: "15,000", recommended: false, items: ["GBP最適化（初期設定・運用）", "構造化データ実装（5種類）", "口コミ管理・返信代行", "月2回のGBP投稿", "ALT属性・メタデータ修正", "月次レポート"] },
  { name: "SEO + MEO + LLMO スタンダード", price: "25,000", recommended: true, items: ["スターターの全機能", "週2回のGBP投稿", "NAP一貫性チェック・修正", "FAQコンテンツ作成", "サイテーション構築", "月次分析レポート（詳細版）"] },
  { name: "SEO + MEO + LLMO プレミアム", price: "40,000", recommended: false, items: ["スタンダードの全機能", "写真撮影ディレクション（月1回）", "SNS連携コンサルティング", "競合分析レポート", "隔週のオンラインMTG", "優先サポート"] },
]

const STEPS = [
  { num: "1", title: "ご契約", desc: "契約書の締結・プラン確定" },
  { num: "2", title: "初期分析", desc: "GBP詳細分析・競合調査・キーワード選定" },
  { num: "3", title: "技術実装", desc: "構造化データ実装・GBP最適化・ALT属性修正" },
  { num: "4", title: "運用開始", desc: "定期投稿スタート・口コミ管理開始・月次レポート" },
  { num: "5", title: "効果測定", desc: "検索順位レポート・流入分析・改善提案" },
]

const FAQS = [
  { q: "MEO対策とは何ですか？", a: "MEO（Map Engine Optimization）は、Googleマップでの検索順位を向上させる施策です。「地域名+業種」で検索した際に上位表示されることで、来店数の増加につながります。" },
  { q: "LLMO対策とは何ですか？", a: "LLMO（Large Language Model Optimization）は、ChatGPTやGeminiなどのAI検索であなたのお店が推薦されるよう最適化する施策です。構造化データの実装やFAQコンテンツの整備が含まれます。" },
  { q: "効果はどのくらいで出ますか？", a: "最短2週間で技術実装が完了し、1ヶ月目から検索順位の変化を実感いただけます。MEO対策は3〜6ヶ月で安定した効果が出る傾向があります。" },
  { q: "Googleビジネスプロフィールを持っていなくても大丈夫ですか？", a: "はい、初期設定から対応いたします。アカウントの作成・オーナー確認・基本情報の登録まですべてサポートします。" },
  { q: "途中でプラン変更はできますか？", a: "はい、効果を見ながらいつでもプラン変更可能です。まずはスターターから始めて、ステップアップされるお客様が多いです。" },
]

export function LpMeoService() {
  return (
    <div className="min-h-screen bg-white pb-20 text-slate-800 antialiased lg:pb-0">
      <LpHeader />

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 text-center">
        <ScrollAnimate className="mx-auto max-w-3xl px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" /> SEO / MEO / LLMO対策
          </span>
          <h1 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl">
            検索 × Googleマップ × AI検索で<br className="hidden sm:block" /><span style={{ color: BLUE }}>集客力を強化する。</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">
            SEOで検索上位、MEOでGoogleマップ上位、LLMOでChatGPT・GeminiなどのAI検索に推薦されるお店へ。データに基づく改善で、確実に集客につなげます。
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/lp/contact" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: CTA }}>
              無料で相談する <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={LP_LINE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50">
              <MessageCircle className="h-4 w-4" /> LINEで相談
            </a>
          </div>
        </ScrollAnimate>
      </section>

      {/* STATS */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4">
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {STATS.map((s) => {
              const Icon = s.icon
              return (
                <StaggerItem key={s.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: "rgba(29,78,216,0.08)", color: BLUE }}><Icon className="h-7 w-7" /></span>
                  <p className="mt-4 text-3xl font-extrabold" style={{ color: BLUE }}>{s.value}</p>
                  <p className="mt-1 font-bold text-slate-900">{s.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* MEO */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="MEO対策" title="Googleマップで上位表示を実現" sub="4つの施策でGBP（Googleビジネスプロフィール）を最適化します。" />
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {MEO.map((f) => {
              const Icon = f.icon
              return (
                <StaggerItem key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(29,78,216,0.08)", color: BLUE }}><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {f.items.map((it) => <li key={it} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BLUE }} />{it}</li>)}
                  </ul>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* LLMO */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="LLMO対策" title="AI検索で推薦されるお店へ" sub="ChatGPT・Gemini・Perplexity等のAI検索に対応する次世代SEO。" />
          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {LLMO.map((f) => {
              const Icon = f.icon
              return (
                <StaggerItem key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(29,78,216,0.08)", color: BLUE }}><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* FLOW */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SecHead eyebrow="FLOW" title="導入の流れ" sub="最短2週間で技術実装が完了します。" />
          <div>
            {STEPS.map((s, i) => (
              <ScrollAnimate key={s.num}>
                <div className={`relative pl-12 pb-8 ${i < STEPS.length - 1 ? "border-l-2 border-blue-200" : ""}`}>
                  <span className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: BLUE }}>{s.num}</span>
                  <h3 className="font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="PRICING" title="料金プラン" sub="初期費用¥0・最低契約期間なし。" />
          <div className="grid items-start gap-6 md:grid-cols-3">
            {PLANS.map((p) => (
              <div key={p.name} className={`relative overflow-hidden rounded-2xl border bg-white p-6 text-center ${p.recommended ? "border-2 border-[#1d4ed8] shadow-lg" : "border-slate-200"}`}>
                {p.recommended && <div className="absolute inset-x-0 top-0 py-1.5 text-xs font-bold text-white" style={{ background: BLUE }}>おすすめ</div>}
                <div className={p.recommended ? "pt-6" : ""}>
                  <h3 className="text-sm font-bold text-slate-900">{p.name}</h3>
                  <p className="mt-1 text-xs text-slate-500">初期費用 <span className="font-bold text-slate-900">¥0</span></p>
                  <div className="mt-2 flex items-baseline justify-center gap-0.5">
                    <span className="text-3xl font-extrabold text-slate-900">¥{p.price}</span>
                    <span className="text-xs text-slate-400">／月（税別）</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">契約期間の縛りなし</p>
                </div>
                <ul className="mt-5 space-y-2.5 text-left">
                  {p.items.map((it) => <li key={it} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BLUE }} />{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-1 text-center text-xs text-slate-400">
            <p>※ 表示価格は税別です。</p>
            <p>※ 効果を見ながらいつでもプラン変更可能です。</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SecHead eyebrow="FAQ" title="よくある質問" />
          <div className="space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-slate-900"><span className="font-extrabold" style={{ color: BLUE }}>Q. </span>{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: CTA }}>
        <ScrollAnimate className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-extrabold text-white">まずは無料でご相談ください</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-orange-50">現在のGoogleビジネスプロフィールの診断も無料で承ります。</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/lp/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5">お問い合わせフォーム <ArrowRight className="h-4 w-4" /></Link>
            <a href={LP_LINE} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"><MessageCircle className="h-4 w-4" /> LINEで相談</a>
          </div>
        </ScrollAnimate>
      </section>

      <LpFooter />
      <LpStickyCta />
    </div>
  )
}
