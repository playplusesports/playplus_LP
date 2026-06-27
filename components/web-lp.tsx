"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ScrollAnimate, StaggerContainer, StaggerItem } from "@/components/scroll-animate"
import {
  ArrowRight,
  Check,
  Phone,
  Mail,
  MessageCircle,
  Sparkles,
  Repeat,
  Zap,
  ChevronDown,
  ShieldCheck,
} from "lucide-react"

// 広告流入向けの1枚もの（LP）。お名前.com「AIホームページパック」LPの構成・トーンを参考に、
// Play+ のWeb制作・運用サービス向けに翻案。情報は実データのみ（架空のキャンペーン・割引は載せない）。
// 配色は白基調＋CTAを温かみのあるオレンジで強調。.weblp 配下で自己完結（ダークテーマの影響を受けない）。
// アニメーションは framer-motion（scroll-animate のヘルパー）でスクロール連動フェード＋スライドアップ。

type WorkItem = { id: string; title: string; category: string; description: string; imageUrl?: string }

const BLUE = "#1d4ed8"
const CTA = "#f5601e" // CTAは目立つオレンジ（ブランド #ff7a1a / #f5321e 系）

const PROBLEMS = [
  "制作会社が多すぎて、どこに頼めばいいかわからない",
  "作ったあと、自分たちで更新できる気がしない",
  "何を依頼すればいいのか、整理できていない",
  "費用が不透明で、相談しづらい",
  "サイトはあるが、集客につながっていない",
  "社内にWebに詳しい人がいない",
]

const FEATURES = [
  {
    icon: Sparkles,
    t: "丸ごとおまかせ",
    d: "企画・原稿・デザイン・制作・公開まで一気通貫。「何から始めれば」の段階からご相談いただけます。窓口はひとつだけ。",
  },
  {
    icon: Repeat,
    t: "公開後も、ずっと伴走",
    d: "“作って終わり”にしません。月額プランで更新代行・保守・改善まで対応。LINEで気軽にやり取りできます。",
  },
  {
    icon: Zap,
    t: "最短1週間で公開",
    d: "スピードが強み。LP制作なら最短1週間、通常サイトでも2〜4週間が目安。初回のご連絡には24時間以内に返信します。",
  },
]

const STEPS = [
  { n: "01", t: "無料相談・ヒアリング", d: "目的・予算・イメージをお聞かせください。決まっていなくてOK。最適なプランをご提案します。" },
  { n: "02", t: "ご提案・お見積り", d: "構成案とデザインの方向性、料金をご提示。ご納得いただいてからのスタートです。" },
  { n: "03", t: "制作・ご確認", d: "進捗を共有しながら制作。ご確認いただき、納得いくまで調整します。" },
  { n: "04", t: "公開・運用サポート", d: "公開して完了ではありません。更新・集客・改善まで月額プランで継続サポート。" },
]

const COMPARE = [
  { label: "初期費用", makers: "数十万円〜", free: "数万円〜", diy: "無料〜", plus: "抑えめ・要相談" },
  { label: "月額・運用", makers: "保守は別料金", free: "個人対応・不安定", diy: "数千円（自力運用）", plus: "5,000円〜／月" },
  { label: "納期", makers: "1〜3ヶ月", free: "ばらつきあり", diy: "自分次第", plus: "最短1週間" },
  { label: "デザイン品質", makers: "高い", free: "人による", diy: "テンプレ任せ", plus: "プロが対応" },
  { label: "公開後の更新", makers: "都度費用", free: "対応まちまち", diy: "すべて自分で", plus: "月額に込み／代行可" },
  { label: "集客・SEO/MEO", makers: "別途依頼", free: "対応外が多い", diy: "自力", plus: "対応可" },
  { label: "窓口", makers: "担当制", free: "個人", diy: "なし", plus: "一本化" },
]

const PRICING = [
  { nm: "Webサイト制作・保守運用", amt: "5,000円〜", unit: "／月", href: "/services/web", note: "制作から更新・管理まで月額で対応" },
  { nm: "ロゴ作成", amt: "10,000円〜", unit: "", href: "/services/web", note: "ブランドの顔をプロが制作" },
  { nm: "SEO / MEO / LLMO対策", amt: "15,000円〜", unit: "／月", href: "/services/meo", note: "検索・地図・AI検索からの集客を強化" },
]

const FAQS = [
  { q: "何も決まっていなくても相談できますか？", a: "はい。「こんなことがしたい」というざっくりしたイメージだけで大丈夫です。ヒアリングを通じて、目的に合った形をご一緒に考えます。" },
  { q: "デザインのイメージがうまく伝えられません。", a: "問題ありません。参考サイトや「こんな雰囲気」というキーワードから、プロが複数案でご提案します。言語化のお手伝いから始めます。" },
  { q: "公開したあと、自分で更新できますか？", a: "更新が不安な方向けに、月額プランで更新代行・保守に対応しています。LINEで「ここ直して」と送るだけでもOKです。" },
  { q: "費用はどのくらいかかりますか？", a: "Webサイト制作・保守運用は月額5,000円〜。内容に応じてお見積りします。初回のご相談・お見積りは無料です。" },
  { q: "納期はどれくらいですか？", a: "LP制作は最短1週間程度、通常のWebサイト制作は2〜4週間が目安です。お急ぎの場合はご相談ください。" },
  { q: "オンラインだけで対応できますか？", a: "全国対応可能です。打ち合わせはZoomやGoogle Meet、やり取りはLINE・メールで完結できます。" },
]

// ヒーローの入場アニメーション（読み込み時に下からフェードイン・スタッガー）
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function WebLp() {
  const [works, setWorks] = useState<WorkItem[]>([])

  useEffect(() => {
    let alive = true
    fetch("/api/works", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: WorkItem[]) => { if (alive) setWorks(d.slice(0, 6)) })
      .catch(() => {})
    return () => { alive = false }
  }, [])

  return (
    <div className="weblp min-h-screen bg-white pb-20 text-slate-800 antialiased lg:pb-0">
      {/* ===== TOP BAR（最小ナビ：ロゴ＋CTA） ===== */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Play+" className="h-7 w-7 object-contain" />
            <span>Play+</span>
          </Link>
          <Link href="/contact" className="rounded-full px-5 py-2 text-sm font-bold text-white shadow-sm transition-transform hover:-translate-y-0.5" style={{ background: CTA }}>
            無料で相談する
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        {/* 背景のふわっと動くブロブ */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(29,78,216,0.12)" }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(245,96,30,0.10)" }}
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-5xl px-4 pt-12 pb-14 text-center lg:pt-16"
        >
          <motion.span variants={heroItem} className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Web制作・運用 / Play+
          </motion.span>
          <motion.h1 variants={heroItem} className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-[1.35] tracking-tight text-slate-900 sm:text-4xl lg:text-[2.9rem]">
            集客できるWebサイトを、<br className="hidden sm:block" />
            <span style={{ color: BLUE }}>丸ごとおまかせ。</span>
          </motion.h1>
          <motion.p variants={heroItem} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
            企画・制作から、公開後の更新・集客まで。Play+ がワンストップで対応します。
            <br className="hidden sm:block" />
            <b className="font-bold text-slate-900">月額5,000円〜・最短1週間で公開</b>。専門知識は要りません。
          </motion.p>

          <motion.div variants={heroItem} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5" style={{ background: CTA }}>
              無料で相談する <ArrowRight className="h-5 w-5" />
            </Link>
            <a href="#works" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-8 py-4 text-base font-bold text-slate-700 transition-colors hover:bg-slate-50">
              実績を見る
            </a>
          </motion.div>

          <motion.div variants={heroItem} className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { n: "初回相談", u: "無料" },
              { n: "最短", u: "1週間" },
              { n: "5,000円〜", u: "／月" },
              { n: "全国", u: "対応" },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-200 bg-white px-3 py-4 transition-transform hover:-translate-y-1">
                <div className="text-lg font-extrabold text-slate-900">{s.n}</div>
                <div className="mt-0.5 text-xs font-semibold text-slate-500">{s.u}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== PROBLEMS ===== */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead title="こんなお悩み、ありませんか？" />
          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map((q) => (
              <StaggerItem key={q} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">?</span>
                <p className="text-sm font-medium leading-relaxed text-slate-700">{q}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollAnimate>
            <p className="mt-10 text-center text-base font-bold text-slate-900">
              その悩み、<span style={{ color: BLUE }}>Play+ がまとめて引き受けます。</span>
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="POINT" title="Play+ が選ばれる3つの理由" />
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => {
              const Icon = f.icon
              return (
                <StaggerItem key={f.t} className="rounded-2xl border border-slate-200 bg-white p-7 text-center transition-shadow hover:shadow-lg">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "rgba(29,78,216,0.08)", color: BLUE }}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <div className="mt-4 text-xs font-bold tracking-widest text-slate-300">0{i + 1}</div>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900">{f.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.d}</p>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== STEPS ===== */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="FLOW" title="ご相談から公開までの流れ" />
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <StaggerItem key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: BLUE }}>{s.n}</span>
                <h3 className="mt-4 font-extrabold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== COMPARE ===== */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="COMPARE" title="他の選択肢と比べてみてください" sub="制作会社・フリーランス・自作ツールと、Play+ を比較しました。" />
          <ScrollAnimate>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
                <thead>
                  <tr>
                    <th className="rounded-tl-xl border-b border-slate-200 bg-white px-4 py-4 text-left text-xs font-semibold text-slate-400"></th>
                    <th className="border-b border-slate-200 bg-slate-50 px-4 py-4 text-center font-bold text-slate-500">制作会社</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-4 py-4 text-center font-bold text-slate-500">フリーランス</th>
                    <th className="border-b border-slate-200 bg-slate-50 px-4 py-4 text-center font-bold text-slate-500">自作ツール</th>
                    <th className="rounded-t-xl border-x border-t-2 px-4 py-4 text-center font-extrabold text-white" style={{ background: BLUE, borderColor: BLUE }}>Play+</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr key={row.label}>
                      <th className="border-b border-slate-100 bg-white px-4 py-4 text-left font-bold text-slate-700">{row.label}</th>
                      <td className="border-b border-slate-100 bg-white px-4 py-4 text-center text-slate-500">{row.makers}</td>
                      <td className="border-b border-slate-100 bg-white px-4 py-4 text-center text-slate-500">{row.free}</td>
                      <td className="border-b border-slate-100 bg-white px-4 py-4 text-center text-slate-500">{row.diy}</td>
                      <td className={`border-x border-b border-slate-100 px-4 py-4 text-center font-bold text-slate-900 ${i === COMPARE.length - 1 ? "rounded-b-xl border-b-2" : ""}`} style={{ background: "rgba(29,78,216,0.06)", borderColor: i === COMPARE.length - 1 ? BLUE : undefined }}>
                        <span className="inline-flex items-center gap-1.5">
                          <Check className="h-4 w-4 flex-none" style={{ color: BLUE }} />{row.plus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollAnimate>
          <p className="mt-3 text-xs text-slate-400">※ 一般的な傾向の比較です。各社・各サービスにより異なります。</p>
        </div>
      </section>

      {/* ===== MID CTA ===== */}
      <ScrollAnimate>
        <section className="py-12" style={{ background: BLUE }}>
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-lg font-extrabold text-white sm:text-xl">まずは話を聞いてみませんか？</p>
            <p className="mt-2 text-sm text-blue-100">ご相談・お見積りは無料。しつこい営業はいたしません。</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold shadow-lg transition-transform hover:-translate-y-0.5" style={{ color: CTA }}>
              無料で相談する <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </ScrollAnimate>

      {/* ===== PRICING ===== */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <SecHead eyebrow="PRICE" title="料金プラン" sub="表示は税込・目安です。内容に応じてお見積りいたします。" />
          <StaggerContainer className="grid gap-5 md:grid-cols-3">
            {PRICING.map((p, i) => (
              <StaggerItem key={p.nm} className={`relative rounded-2xl border bg-white p-7 transition-transform hover:-translate-y-1 ${i === 0 ? "border-2 border-[#1d4ed8] shadow-lg" : "border-slate-200"}`}>
                {i === 0 && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs font-bold text-white" style={{ background: CTA }}>人気</span>
                )}
                <h3 className="text-sm font-bold text-slate-700">{p.nm}</h3>
                <div className="mt-3 flex items-baseline gap-0.5">
                  <span className="text-3xl font-extrabold text-slate-900">{p.amt}</span>
                  <span className="text-sm font-semibold text-slate-400">{p.unit}</span>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">{p.note}</p>
                <Link href={p.href} className="mt-5 inline-flex items-center gap-1 text-xs font-bold" style={{ color: BLUE }}>
                  詳しく見る <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollAnimate>
            <p className="mt-6 text-center text-sm font-bold text-slate-900">
              <span className="rounded-md bg-amber-100 px-2 py-1 text-amber-800">初回のご相談・お見積りは無料です</span>
            </p>
          </ScrollAnimate>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <section id="works" className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <SecHead eyebrow="WORKS" title="制作実績" sub="これまでに手がけた制作の一部です。" />
          {works.length > 0 ? (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((w) => (
                <StaggerItem key={w.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
                  <Link href={`/works?id=${w.id}`}>
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                      {w.imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={w.imageUrl} alt={`${w.title} のサムネイル`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-400">{w.category}</div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-bold" style={{ color: BLUE }}>{w.category}</span>
                      <h3 className="mt-1.5 font-bold text-slate-900">{w.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{w.description}</p>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <p className="text-center text-sm text-slate-400">実績を読み込んでいます…</p>
          )}
          <ScrollAnimate>
            <div className="mt-8 text-center">
              <Link href="/works" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900">
                すべての実績を見る <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <SecHead eyebrow="FAQ" title="こんな不安、ありませんか？" />
          <StaggerContainer className="space-y-3">
            {FAQS.map((f) => (
              <StaggerItem key={f.q}>
                <details className="group rounded-xl border border-slate-200 bg-white p-5 [&_svg]:open:rotate-180">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-900">
                    <span className="flex items-start gap-2">
                      <span className="font-extrabold" style={{ color: BLUE }}>Q.</span>{f.q}
                    </span>
                    <ChevronDown className="h-5 w-5 flex-none text-slate-400 transition-transform" />
                  </summary>
                  <p className="mt-3 pl-6 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20" style={{ background: CTA }}>
        <ScrollAnimate className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Webサイトのご相談、ここからはじめましょう</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-orange-50">
            「何も決まっていない」段階でも大丈夫。目的やご予算に合わせて、最適なプランをご提案します。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition-transform hover:-translate-y-0.5">
              <Mail className="h-5 w-5" /> 無料で相談する
            </Link>
            <a href="https://lin.ee/pYn3rVU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10">
              <MessageCircle className="h-5 w-5" /> LINEで相談
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-orange-50">
            <a href="tel:090-3866-4176" className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" /> 090-3866-4176</a>
            <a href="mailto:company@playplus.jp" className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" /> company@playplus.jp</a>
          </div>
        </ScrollAnimate>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-xs text-slate-400 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Play+</span>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-slate-700">通常サイト</Link>
            <Link href="/legal" className="hover:text-slate-700">特定商取引法に基づく表記</Link>
            <Link href="/privacy" className="hover:text-slate-700">プライバシーポリシー</Link>
          </div>
        </div>
      </footer>

      {/* ===== STICKY MOBILE CTA ===== */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <a href="https://lin.ee/pYn3rVU" target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-slate-300 py-3 text-sm font-bold text-slate-700">
            <MessageCircle className="h-4 w-4" /> LINE
          </a>
          <Link href="/contact" className="flex flex-[2] items-center justify-center gap-1.5 rounded-full py-3 text-sm font-bold text-white shadow" style={{ background: CTA }}>
            無料で相談する <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// 見出し：参考LP風に左右の装飾スラッシュ（＼ 見出し ／）付き。スクロールでフェードイン。
function SecHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <ScrollAnimate className="mb-10 text-center">
      {eyebrow ? <p className="text-xs font-bold tracking-[0.2em]" style={{ color: CTA }}>{eyebrow}</p> : null}
      <h2 className="mt-2 flex items-center justify-center gap-4 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        <span aria-hidden className="inline-block h-6 w-px rotate-[20deg] bg-slate-300" />
        {title}
        <span aria-hidden className="inline-block h-6 w-px -rotate-[20deg] bg-slate-300" />
      </h2>
      {sub ? <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{sub}</p> : null}
    </ScrollAnimate>
  )
}
