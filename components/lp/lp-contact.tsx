"use client"

import { useState } from "react"
import Link from "next/link"
import { ScrollAnimate } from "@/components/scroll-animate"
import { LpHeader, LpFooter, LpStickyCta, SecHead, LP_BLUE as BLUE, LP_CTA as CTA, LP_LINE } from "@/components/lp/lp-chrome"
import { Mail, MessageSquare, CheckCircle, ArrowRight, Clock, ShieldCheck } from "lucide-react"

// LP（/lp/contact）：通常 /contact と同じ /api/contact を流用したクリーンな問い合わせフォーム。
const INQUIRY_TYPES = [
  "Webサイト制作について",
  "SEO / MEO / LLMO対策について",
  "デザイン制作について",
  "イベントの企画・運営について",
  "その他",
]
const BUDGETS = ["〜5万円", "5万円〜10万円", "10万円〜30万円", "30万円〜50万円", "50万円以上", "未定・相談したい"]

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#1d4ed8]/20"

export function LpContact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", company: "", inquiryType: "", budget: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error()
      setIsSubmitted(true)
    } catch {
      setError("送信に失敗しました。時間をおいて再度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white text-slate-800 antialiased">
        <LpHeader />
        <section className="mx-auto max-w-2xl px-4 py-28 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full" style={{ background: "rgba(29,78,216,0.1)" }}>
            <CheckCircle className="h-8 w-8" style={{ color: BLUE }} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">お問い合わせありがとうございます</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">内容を確認の上、2営業日以内にご連絡いたします。</p>
          <Link href="/lp/web" className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white shadow-sm" style={{ background: CTA }}>
            サービスページに戻る <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
        <LpFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pb-20 text-slate-800 antialiased lg:pb-0">
      <LpHeader />

      {/* HERO */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-14">
        <ScrollAnimate className="mx-auto max-w-3xl px-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-bold text-blue-700">
            <ShieldCheck className="h-3.5 w-3.5" /> CONTACT / Play+
          </span>
          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">無料でご相談ください</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
            「何も決まっていない」段階でも大丈夫です。2営業日以内にご返信します。初回のご相談・お見積りは無料です。
          </p>
        </ScrollAnimate>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-3">
          {/* FORM */}
          <ScrollAnimate className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="お名前" required>
                  <input name="name" required placeholder="山田 太郎" value={formData.name} onChange={handleChange} className={inputCls} />
                </Field>
                <Field label="メールアドレス" required>
                  <input name="email" type="email" required placeholder="example@email.com" value={formData.email} onChange={handleChange} className={inputCls} />
                </Field>
              </div>
              <Field label="会社名・団体名">
                <input name="company" placeholder="株式会社〇〇" value={formData.company} onChange={handleChange} className={inputCls} />
              </Field>
              <Field label="お問い合わせ種別" required>
                <select name="inquiryType" required value={formData.inquiryType} onChange={handleChange} className={inputCls}>
                  <option value="">選択してください</option>
                  {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="ご予算の目安">
                <select name="budget" value={formData.budget} onChange={handleChange} className={inputCls}>
                  <option value="">選択してください</option>
                  {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </Field>
              <Field label="お問い合わせ内容" required>
                <textarea name="message" rows={6} required placeholder="ご相談内容をご記入ください" value={formData.message} onChange={handleChange} className={inputCls} />
              </Field>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto" style={{ background: CTA }}>
                {isSubmitting ? "送信中..." : <>送信する <ArrowRight className="h-5 w-5" /></>}
              </button>
            </form>
          </ScrollAnimate>

          {/* SIDEBAR */}
          <ScrollAnimate className="space-y-5">
            <a href={LP_LINE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl border border-[#06C755]/30 bg-[#06C755]/10 p-5 transition-colors hover:bg-[#06C755]/20">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#06C755]"><MessageSquare className="h-5 w-5 text-white" /></span>
              <span>
                <span className="block text-sm font-bold text-slate-900">LINEで相談</span>
                <span className="block text-xs text-slate-500">いちばん早くやり取りできます</span>
              </span>
            </a>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5" style={{ color: BLUE }} />
                <div>
                  <p className="text-sm font-bold text-slate-900">メール</p>
                  <a href="mailto:company@playplus.jp" className="text-sm text-slate-600 hover:underline">company@playplus.jp</a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-900"><Clock className="h-4 w-4" style={{ color: BLUE }} /> 返信の目安</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>・2営業日以内にご連絡します</li>
                <li>・漠然としたご相談でもOK</li>
                <li>・初回相談は無料です</li>
              </ul>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      {/* FAQ quick */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-3xl px-4">
          <SecHead eyebrow="FAQ" title="お問い合わせ前のよくある質問" />
          <div className="space-y-3">
            {[
              { q: "相談料はかかりますか？", a: "初回のご相談・お見積りは無料です。" },
              { q: "まだ何も決まっていなくても相談できますか？", a: "もちろんです。漠然としたイメージでも構いません。一緒に整理します。" },
              { q: "返信までどのくらいかかりますか？", a: "2営業日以内にご連絡いたします。お急ぎの場合はLINEが便利です。" },
            ].map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-slate-900"><span className="font-extrabold" style={{ color: BLUE }}>Q. </span>{f.q}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LpFooter />
      <LpStickyCta href={LP_LINE} label="LINEで相談" />
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  )
}
