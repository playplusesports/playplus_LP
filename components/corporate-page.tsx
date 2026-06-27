"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Calendar,
  Palette,
  Globe,
  Gamepad2,
  Check,
  Phone,
  Mail,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
} from "lucide-react"

// 営業・法人向けのフォーマル版トップ（/corporate）。
// 情報は overdrive 版トップ（/）と同一。見せ方を「信頼感×クリーン」の白基調に作り替えたもの。
// ダークテーマ既定の影響を受けないよう、配色はすべて明示クラスで指定し .corp 配下で自己完結させる。

const ACCENT = "#1d4ed8" // 落ち着いたコーポレートブルー（ブランド #4660ff を抑えめに）

type WorkItem = { id: string; title: string; category: string; description: string; imageUrl?: string }

const NAV = [
  { label: "サービス", href: "#services" },
  { label: "選ばれる理由", href: "#why" },
  { label: "実績", href: "#works" },
  { label: "料金", href: "#pricing" },
  { label: "ご相談の流れ", href: "#process" },
]

const PROBLEMS = [
  "イベントを開催したいが、やり方がわからない",
  "Webサイトを作りたいが、制作会社が多すぎて選べない",
  "デザインを頼みたいが、イメージを言語化できない",
  "ITやSNSが必要だと感じているが、手が回らない",
  "社内に詳しい人材がいない",
  "予算感がわからず、相談しにくい",
]

const SERVICES = [
  {
    no: "01",
    icon: Calendar,
    title: "イベントプロデュース",
    en: "EVENT",
    desc: "企画・運営・当日進行まで一貫対応。リアルとオンラインのハイブリッド設計が得意領域です。大会運営の実務経験をもとに、集客から当日のオペレーションまで設計します。",
    tags: ["企画", "運営", "配信"],
  },
  {
    no: "02",
    icon: Palette,
    title: "デザイン制作",
    en: "DESIGN",
    desc: "ロゴ・グラフィック・モーション。見た目の強さと、伝わる設計の両立にこだわります。バナー・ポスター・配信オーバーレイなど、用途に合わせて制作します。",
    tags: ["VI", "グラフィック", "3D / モーション"],
  },
  {
    no: "03",
    icon: Globe,
    title: "Web / SNS",
    en: "WEB & SNS",
    desc: "サイト制作からSNS運用・MEO/SEO/LLMO対策まで。公開して終わりではなく、数値で改善し続ける運用が本質です。月額の保守運用にも対応します。",
    tags: ["制作", "運用", "分析"],
  },
  {
    no: "04",
    icon: Gamepad2,
    title: "eスポーツ",
    en: "ESPORTS",
    desc: "大会運営・配信・コミュニティ構築。競技シーンの熱量をビジネスへ接続します。企業の販促・採用イベントとしてのeスポーツ活用もご提案します。",
    tags: ["大会", "配信", "コミュニティ"],
  },
]

const BENEFITS = [
  { t: "ワンストップ対応", d: "企画から制作・運用まで一括対応。複数社への発注の手間をなくし、窓口を一本化します。" },
  { t: "イベント特化の知見", d: "大会・イベント運営の実務経験をもとに設計。現場で機能する導線をご提案します。" },
  { t: "柔軟な対応", d: "企業・団体・個人すべてに対応。小規模案件から大規模イベントまで規模を問いません。" },
  { t: "相談しやすい価格帯", d: "小規模案件から対応可能。予算が固まっていない段階でもお気軽にご相談ください。" },
  { t: "スピード対応", d: "最短1週間でLP制作が可能。初回のご連絡には24時間以内の返信を目安にしています。" },
  { t: "全国・オンライン対応", d: "打ち合わせはZoom / Google Meet で全国対応。遠方の方でも問題ありません。" },
]

const PRICING = [
  { nm: "イベントプロデュース", amt: "50,000円〜", href: "/contact" },
  { nm: "Web制作・保守運用", amt: "5,000円〜／月", href: "/services/web" },
  { nm: "デザイン制作", amt: "5,000円〜", href: "/contact" },
  { nm: "ロゴ作成", amt: "10,000円〜", href: "/services/web" },
  { nm: "Googleビジネスプロフィール設定", amt: "9,800円", href: "/services/meo" },
  { nm: "Instagram初期設定＋投稿5本", amt: "14,800円", href: "/services/meo" },
  { nm: "SEO / MEO / LLMO対策", amt: "15,000円〜／月", href: "/services/meo" },
]

const PROCESS = [
  { n: "01", t: "ヒアリング", d: "目的・予算・KPIを言語化。曖昧な「なんとなく」を、測れる目標に変換します。" },
  { n: "02", t: "ご提案・設計", d: "企画とデザインの方向性を複数案で提示。根拠を添えて、選べる状態にします。" },
  { n: "03", t: "制作・実行", d: "進捗を可視化しながら制作・運営。中間レビューで軌道修正します。" },
  { n: "04", t: "振り返り", d: "結果をKPIで評価し、次の打ち手を提案。一度きりで終わらせません。" },
]

const FAQS = [
  { q: "何も決まっていなくても相談できますか？", a: "はい、「こんなことがしたい」というざっくりとしたイメージだけでもご相談いただけます。ヒアリングを通じて、目的に合った企画をご一緒に考えていきます。" },
  { q: "小規模イベントでも依頼できますか？", a: "可能です。個人主催の大会や少人数のイベントにも対応しています。規模に関わらず、企画から当日の運営サポートまで柔軟にお手伝いいたします。" },
  { q: "修正は可能ですか？", a: "納品前の修正は対応いたします。初回のご確認時にフィードバックをいただき、ご納得いただけるまで調整を行います。回数や範囲はプランによって異なります。" },
  { q: "納期はどれくらいですか？", a: "LP制作は最短1週間程度、通常のWebサイト制作は2〜4週間が目安です。内容やボリュームによって変動しますので、お早めにご相談ください。" },
  { q: "オンライン対応可能ですか？", a: "全国対応可能です。打ち合わせはZoomやGoogle Meetなどで行えますので、遠方の方でも問題ありません。チャットやメールでのやり取りも柔軟に対応します。" },
]

export function CorporatePage() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [works, setWorks] = useState<WorkItem[]>([])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    let alive = true
    fetch("/api/works", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: WorkItem[]) => { if (alive) setWorks(d.slice(0, 6)) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  return (
    <div className="corp min-h-screen bg-white text-slate-800 antialiased">
      {/* ===== HEADER ===== */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur shadow-[0_1px_0_rgba(15,23,42,0.08)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          <Link href="/corporate" className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Play+" className="h-8 w-8 object-contain" />
            <span className="text-lg">Play+</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact" className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90" style={{ background: ACCENT }}>
              お問い合わせ
            </Link>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          >
            {open ? <X className="h-6 w-6 text-slate-900" /> : <Menu className="h-6 w-6 text-slate-900" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-slate-100 bg-white lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-slate-50 py-3 text-sm font-medium text-slate-700">
                  {n.label}
                </a>
              ))}
              <Link href="/contact" onClick={() => setOpen(false)} className="mt-3 rounded-full px-5 py-3 text-center text-sm font-semibold text-white" style={{ background: ACCENT }}>
                お問い合わせ
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              Creative Tech Studio / Play+
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-[1.3] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.9rem]">
              イベント・デザイン・Web/SNS・<br className="hidden sm:block" />eスポーツを、
              <span style={{ color: ACCENT }}>ひとつのチーム</span>で。
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
              4つの領域を横断するクリエイティブテックスタジオ。企画から制作・運用までワンストップで伴走し、
              企業・団体の「やりたい」を成果につながる形にします。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90" style={{ background: ACCENT }}>
                無料で相談する <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#works" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                実績を見る
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.15)]">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { n: "4", u: "領域", l: "事業領域" },
                  { n: "100", u: "%", l: "一貫対応率" },
                  { n: "24", u: "h", l: "初回返信目安" },
                  { n: "全国", u: "", l: "対応エリア" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-3xl font-bold text-slate-900">{s.n}</span>
                      <span className="text-sm font-semibold text-slate-400">{s.u}</span>
                    </div>
                    <div className="mt-1 text-xs font-medium text-slate-500">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-slate-100 pt-6">
                <p className="text-sm font-semibold text-slate-700">対応領域</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["EVENT", "DESIGN", "WEB & SNS", "ESPORTS"].map((t) => (
                    <span key={t} className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEMS ===== */}
      <Section id="problem" eyebrow="Issues" title="こんなお悩みはありませんか？" sub="多くの企業・団体が、同じ課題を抱えています。Play+ が一気通貫で引き受けます。">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((q) => (
            <div key={q} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: ACCENT }}>?</span>
              <p className="text-sm leading-relaxed text-slate-700">{q}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== SOLUTION ===== */}
      <section className="bg-slate-900 py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <p className="text-sm font-semibold tracking-widest" style={{ color: "#7d93ff" }}>SOLUTION</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-2xl font-bold leading-snug text-white sm:text-3xl">
            その課題、<span style={{ color: "#7d93ff" }}>すべて解決</span>できます。
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300">
            企画段階から伴走し、目的に合わせた最適な形をご提案します。
            必要な機能だけを、必要な分だけ。窓口はひとつに。
          </p>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {["イベントの企画・運営支援", "集客用Webサイト制作", "バナー・ポスター・ロゴ制作", "参加者管理・導線設計", "SNS活用支援"].map((s) => (
              <span key={s} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <Section id="services" eyebrow="Services" title="サービス" sub="4つの事業を、独立したサービスではなく、ひとつの体験設計として提供します。">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.no} className="group rounded-2xl border border-slate-200 bg-white p-7 transition-shadow hover:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.25)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(29,78,216,0.08)", color: ACCENT }}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-bold tracking-widest text-slate-300">{s.no}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {s.title} <span className="ml-1 text-xs font-semibold tracking-wide text-slate-400">{s.en}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{t}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      {/* ===== WHY ===== */}
      <section className="bg-slate-50 py-20 lg:py-24" id="why">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHead eyebrow="Why Play+" title="選ばれる理由" sub="ワンストップ × イベント特化 × スピード。" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.t} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" style={{ color: ACCENT }} />
                  <h3 className="font-bold text-slate-900">{b.t}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <Section id="works" eyebrow="Works" title="制作・運営実績" sub="これまでに手がけた制作・運営の一部です。">
        {works.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((w) => (
              <Link key={w.id} href={`/works?id=${w.id}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.25)]">
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  {w.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={w.imageUrl} alt={`${w.title} のサムネイル`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">{w.category}</div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold tracking-wide" style={{ color: ACCENT }}>{w.category}</span>
                  <h3 className="mt-1.5 font-bold text-slate-900">{w.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{w.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-slate-400">実績を読み込んでいます…</p>
        )}
        <div className="mt-10 text-center">
          <Link href="/works" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900">
            すべての実績を見る <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ===== PRICING ===== */}
      <section className="bg-slate-50 py-20 lg:py-24" id="pricing">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <SectionHead eyebrow="Pricing" title="料金" sub="参考料金です。内容に応じてお見積りいたします。" />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {PRICING.map((p) => (
                  <tr key={p.nm} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-800">{p.nm}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{p.amt}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={p.href} className="text-xs font-semibold" style={{ color: ACCENT }}>詳しく見る →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            ※ 表示は税込・目安です。詳細は <Link href="/services/web" className="underline">Web制作</Link> / <Link href="/services/meo" className="underline">SEO/MEO/LLMO</Link> の各ページをご覧ください。
          </p>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <Section id="process" eyebrow="Process" title="ご相談の流れ" sub="ヒアリングから振り返りまで。各フェーズで数値と仮説を共有し、判断を一緒に行います。">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <div key={p.n} className="relative rounded-xl border border-slate-200 bg-white p-6">
              <span className="text-2xl font-bold text-slate-200">{p.n}</span>
              <h3 className="mt-2 font-bold text-slate-900">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <section className="bg-slate-50 py-20 lg:py-24" id="faq">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <SectionHead eyebrow="FAQ" title="よくある質問" sub="気になる点はお気軽にお問い合わせください。" />
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-5 [&_svg]:open:rotate-180">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                  {f.q}
                  <ChevronDown className="h-5 w-5 flex-none text-slate-400 transition-transform" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 lg:py-24" id="contact" style={{ background: ACCENT }}>
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">まずはお気軽にご相談ください</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-blue-100">
            「何も決まっていない」段階でも大丈夫です。目的やご予算に合わせて、最適なプランをご提案します。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-sm transition-transform hover:-translate-y-0.5">
              <Mail className="h-4 w-4" /> お問い合わせフォーム
            </Link>
            <a href="https://lin.ee/pYn3rVU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <MessageCircle className="h-4 w-4" /> LINEで無料相談
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-blue-100">
            <a href="tel:090-3866-4176" className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" /> 090-3866-4176</a>
            <a href="mailto:company@playplus.jp" className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" /> company@playplus.jp</a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
            <div>
              <div className="flex items-center gap-2 font-bold text-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Play+" className="h-8 w-8 object-contain" />
                <span className="text-lg">Play+</span>
              </div>
              <p className="mt-3 max-w-sm text-sm text-slate-500">
                イベントプロデュース / Web制作 / デザイン制作。「好きを、もっと面白く。」
              </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
              <div className="flex flex-col gap-2">
                <a href="#services" className="text-slate-600 hover:text-slate-900">サービス</a>
                <Link href="/works" className="text-slate-600 hover:text-slate-900">実績</Link>
                <a href="#pricing" className="text-slate-600 hover:text-slate-900">料金</a>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/contact" className="text-slate-600 hover:text-slate-900">お問い合わせ</Link>
                <Link href="/" className="text-slate-600 hover:text-slate-900">通常サイトを見る</Link>
                <Link href="/legal" className="text-slate-600 hover:text-slate-900">特定商取引法に基づく表記</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Play+
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ---- セクション共通 ---- */
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm font-semibold tracking-widest" style={{ color: ACCENT }}>{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      {sub ? <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">{sub}</p> : null}
    </div>
  )
}

function Section({ id, eyebrow, title, sub, children }: { id: string; eyebrow: string; title: string; sub?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHead eyebrow={eyebrow} title={title} sub={sub} />
        {children}
      </div>
    </section>
  )
}
