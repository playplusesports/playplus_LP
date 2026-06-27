"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import { LpHeader, LpFooter, LpStickyCta, SecHead, LP_BLUE as BLUE, LP_CTA as CTA, LP_LINE } from "@/components/lp/lp-chrome"
import {
  CheckCircle2, Monitor, Smartphone, RefreshCw, BarChart3, MessageCircle,
  Sparkles, ArrowRight, AlertTriangle, ShieldCheck,
} from "lucide-react"

// LP（/lp/services/web）：通常 /services/web と同一情報を、LPの白基調テイストで再構成。
const FEATURES = [
  { icon: Monitor, title: "サイト制作", description: "AIを活用し、高品質なサイトを短期間・低コストで制作。ランディングページから複数ページサイトまで対応します。" },
  { icon: Smartphone, title: "スマホ対応（レスポンシブ）", description: "スマートフォン・タブレット・PCすべてで最適に表示されるレスポンシブデザインで制作します。" },
  { icon: MessageCircle, title: "お問い合わせフォーム＋LINE誘導", description: "お問い合わせフォームの設置に加え、LINEでの問い合わせ導線も構築。お客様からの連絡を逃しません。" },
  { icon: RefreshCw, title: "月次コンテンツ更新代行", description: "お知らせやブログの更新をお任せください。LINEで内容を送るだけで対応します。" },
  { icon: Sparkles, title: "AI投稿文作成", description: "AIを活用してSNS投稿文を毎月作成。Instagram・X等の運用もサポートします。" },
  { icon: BarChart3, title: "月次アクセスレポート", description: "サイトの訪問者数・検索流入・ページ閲覧数を毎月わかりやすくレポート。LINEでお届けします。" },
]

const STEPS = [
  { num: "1", title: "無料相談（30分）", description: "お店の雰囲気・載せたい情報をヒアリング。Zoom or 対面どちらでも対応します。" },
  { num: "2", title: "サイト制作（3〜5日）", description: "AIを活用して高速制作。デザイン案をLINEで確認していただきます。" },
  { num: "3", title: "公開・契約開始", description: "サイト公開後、月額プランがスタートします。初回修正は1回まで無料です。" },
  { num: "4", title: "毎月のサポート", description: "更新代行・投稿文・月次レポートをお届け。LINEでいつでも相談できます。" },
]

const MONTHLY = [
  { name: "1ページプラン", initial: "無料", price: "5,000", contract: "最低契約期間なし", recommended: false, badge: "初期費用 ¥0", items: ["1ページの静的サイト（LP型）", "お問い合わせフォーム", "Googleマップ埋め込み", "サイト死活監視"] },
  { name: "エントリープラン", initial: "無料", price: "10,000", contract: "6ヶ月契約", recommended: false, badge: "", items: ["5ページ以内の静的サイト", "お問い合わせフォーム", "Googleマップ埋め込み", "サイト死活監視"] },
  { name: "ライトプラン", initial: "¥9,800", price: "16,000", contract: "6ヶ月契約", recommended: true, badge: "", items: ["8ページ以内の静的サイト", "お問い合わせ＋LINE誘導", "Instagram・Googleマップ埋め込み", "月1回コンテンツ更新代行", "AI投稿文 月3本プレゼント", "月次アクセスレポート（LINE送付）"] },
  { name: "スタンダードプラン", initial: "¥19,800", price: "30,000", contract: "3ヶ月契約", recommended: false, badge: "", items: ["ページ数無制限", "予約フォーム・ECカート連携", "月2回コンテンツ更新", "AI投稿文 月10本", "月次Googleアナリティクスレポート", "SEO基本対策"] },
]

const ONETIME = ["5ページ以内の静的サイト", "お問い合わせフォーム", "Googleマップ埋め込み", "修正1回無料", "追加修正：1回 ¥5,000", "納品：ファイル一式を圧縮してお渡し"]

const OPTIONS = [
  { name: "ロゴ作成 — シンプル", price: "¥10,000", desc: "テキスト＋アイコン。AI補助で制作。PNG・SVG納品。納期3〜5日", highlight: true },
  { name: "ロゴ作成 — フルオリジナル", price: "¥39,800", desc: "ヒアリング→複数案提案→修正2回込み。完全オリジナル。納期7〜10日", highlight: true },
  { name: "追加ページ制作（1ページ）", price: "¥8,000", desc: "スターターへの追加など。制作のみ・保守別途", highlight: false },
  { name: "Googleビジネスプロフィール設定", price: "¥9,800", desc: "マップ掲載・写真登録・初期SEO最適化を代行", highlight: false },
  { name: "Instagram初期設定＋投稿5本", price: "¥14,800", desc: "プロフィール整備＋開始投稿5本をAIで作成・代行投稿", highlight: false },
]

const CORPORATE = [
  "フルオーダーメイドで制作（デザイン・機能を自由に設計）",
  "料金はご相談（ご要望をヒアリングの上お見積もり）",
  "制作後のご契約も可能（まず制作物をご確認いただいてからご判断いただけます）",
  "予約・EC・会員・多言語など各種システム連携に対応",
  "公開後の運用・保守までまとめてサポート",
]

const FAQS = [
  { q: "パソコンが苦手でも大丈夫ですか？", a: "はい、問題ありません。更新や連絡はLINEで完結します。難しい操作は一切不要です。" },
  { q: "今すでにサイトがある場合はどうなりますか？", a: "現在のサイトの内容を引き継いで作り直すことも可能です。まずはご相談ください。" },
  { q: "写真や文章は自分で用意する必要がありますか？", a: "写真はスマホで撮影したものをLINEで送っていただければ対応します。文章はAIを使ってPlay+側で作成することも可能です。" },
  { q: "月額プランはいつでも解約できますか？", a: "1ページプランは最低契約期間がなく、いつでも解約いただけます。エントリー・ライトは6ヶ月、スタンダードは3ヶ月の最低契約期間があります。期間内の解約には違約金（¥19,800）が発生します。" },
  { q: "買い切りプランとは何ですか？", a: "制作費用を一度だけお支払いいただき、完成したサイトのファイル一式をお渡しするプランです。その後の更新・保守はお客様ご自身で行っていただく形となります。" },
  { q: "法人での依頼やオーダーメイド制作はできますか？", a: "はい、法人のお客様にはフルオーダーメイドの「法人プラン」をご用意しています。料金はヒアリングの上でのお見積もりとなり、まず制作物をご確認いただいてから契約をご判断いただくことも可能です。" },
]

type Tab = "monthly" | "onetime" | "options" | "corporate"
const TABS: { key: Tab; label: string }[] = [
  { key: "monthly", label: "月額（個人・個人事業主）" },
  { key: "onetime", label: "買い切り" },
  { key: "options", label: "オプション" },
  { key: "corporate", label: "法人プラン" },
]

export function LpWebService() {
  const [tab, setTab] = useState<Tab>("monthly")

  return (
    <div className="min-h-screen bg-white pb-20 text-slate-800 antialiased lg:pb-0">
      <LpHeader />

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 text-center">
        <ScrollAnimate className="mx-auto max-w-3xl px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Webサイト制作・保守運用
          </span>
          <h1 className="mt-5 text-2xl font-extrabold leading-snug tracking-tight text-slate-900 sm:text-3xl">
            サイトの制作から更新・管理まで、<br className="hidden sm:block" /><span style={{ color: BLUE }}>月額でまるごとおまかせ。</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600">
            LINEで気軽にやり取りできるので、パソコンが苦手な方でも安心。初期費用¥0のプランからご用意しています。
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

      {/* FEATURES */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="FEATURES" title="サービス内容" />
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <StaggerItem key={f.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(29,78,216,0.08)", color: BLUE }}><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.description}</p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* FLOW */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <SecHead eyebrow="FLOW" title="サービスの流れ" />
          <div>
            {STEPS.map((s, i) => (
              <ScrollAnimate key={s.num}>
                <div className={`relative pl-12 pb-8 ${i < STEPS.length - 1 ? "border-l-2 border-blue-200" : ""}`}>
                  <span className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: BLUE }}>{s.num}</span>
                  <h3 className="font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.description}</p>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SecHead eyebrow="PRICING" title="料金プラン" sub="個人・個人事業主の方は月額／買い切り、法人のお客様はフルオーダーの法人プランをご用意しています。" />

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {TABS.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)} className={`rounded-full px-4 py-2 text-sm font-bold transition ${tab === t.key ? "text-white shadow" : "border border-slate-300 text-slate-600 hover:bg-slate-50"}`} style={tab === t.key ? { background: BLUE } : undefined}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === "monthly" && (
            <div className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {MONTHLY.map((p) => (
                <div key={p.name} className={`relative overflow-hidden rounded-2xl border bg-white p-6 text-center ${p.recommended ? "border-2 border-[#1d4ed8] shadow-lg" : p.badge ? "border-2 border-green-500" : "border-slate-200"}`}>
                  {p.recommended && <div className="absolute inset-x-0 top-0 py-1.5 text-xs font-bold text-white" style={{ background: BLUE }}>おすすめ</div>}
                  {p.badge && <div className="absolute inset-x-0 top-0 bg-green-500 py-1.5 text-xs font-bold text-white">{p.badge}</div>}
                  <div className={p.recommended || p.badge ? "pt-6" : ""}>
                    <h3 className="font-bold text-slate-900">{p.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">初期費用 <span className={`font-bold ${p.badge ? "text-green-600" : "text-slate-900"}`}>{p.initial}</span></p>
                    <div className="mt-2 flex items-baseline justify-center gap-0.5">
                      <span className="text-3xl font-extrabold text-slate-900">¥{p.price}</span>
                      <span className="text-xs text-slate-400">／月</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{p.contract}</p>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-left">
                    {p.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BLUE }} />{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {tab === "onetime" && (
            <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-7">
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900">スターターパック</h3>
                <div className="mt-3 flex items-baseline justify-center gap-1"><span className="text-4xl font-extrabold text-slate-900">¥29,800</span><span className="text-sm text-slate-400">（一括）</span></div>
                <p className="mt-1 text-xs text-slate-400">縛りなし・一括払い</p>
              </div>
              <ul className="mt-6 space-y-2.5">
                {ONETIME.map((it) => <li key={it} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BLUE }} />{it}</li>)}
              </ul>
              <div className="mt-6 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <p className="text-xs text-amber-700">保守・更新は含まれません。ファイルの管理はお客様側となります。</p>
              </div>
            </div>
          )}

          {tab === "options" && (
            <div className="mx-auto max-w-3xl space-y-4">
              {OPTIONS.map((o) => (
                <div key={o.name} className={`flex flex-col justify-between gap-3 rounded-xl border bg-white p-5 sm:flex-row sm:items-center ${o.highlight ? "border-blue-200 bg-blue-50/40" : "border-slate-200"}`}>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{o.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{o.desc}</p>
                  </div>
                  <p className="shrink-0 text-xl font-extrabold text-slate-900">{o.price}</p>
                </div>
              ))}
              <p className="mt-4 text-center text-xs text-slate-400">※ ロゴ作成のシンプルとフルオリジナルはどちらか1つのみ選択可能です。</p>
            </div>
          )}

          {tab === "corporate" && (
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-[#1d4ed8] bg-white">
              <div className="py-1.5 text-center text-xs font-bold text-white" style={{ background: BLUE }}>法人のお客様向け</div>
              <div className="p-7">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900">法人プラン</h3>
                  <p className="mt-2 text-3xl font-extrabold text-slate-900">お見積り</p>
                  <p className="mt-1 text-xs text-slate-400">ご要件に合わせて個別にご提案・お見積もりいたします</p>
                </div>
                <ul className="mt-6 space-y-2.5 text-left">
                  {CORPORATE.map((it) => <li key={it} className="flex items-start gap-2 text-sm text-slate-600"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: BLUE }} />{it}</li>)}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a href={LP_LINE} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-sm font-bold text-white"><MessageCircle className="h-4 w-4" /> LINEで相談</a>
                  <Link href="/lp/contact" className="flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: CTA }}>お問い合わせ <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-1 text-center text-xs text-slate-400">
            <p>※ 表示価格はすべて税込です。</p>
            <p>※ 独自ドメイン・サーバー費用はプラン料金に含まれています。</p>
            <p>※ 内容によってはお見積りとなる場合があります。</p>
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
          <p className="mx-auto mt-3 max-w-xl text-sm text-orange-50">お気軽にLINEかフォームでご連絡ください。</p>
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
