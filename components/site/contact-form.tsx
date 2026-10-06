"use client"

import { useState } from "react"
import Link from "next/link"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"

// 送信内容は /api/contact 経由で Google Apps Script に転送される。キー名は GAS 側と合わせている
type InquiryForm = {
  name: string
  email: string
  company: string
  inquiryType: string
  budget: string
  message: string
}

const EMPTY_FORM: InquiryForm = { name: "", email: "", company: "", inquiryType: "", budget: "", message: "" }

const INQUIRY_TYPES = [...SERVICE_PILLARS.map((pillar) => `${pillar.title}について`), "その他"]

const BUDGET_RANGES = ["〜5万円", "5万円〜10万円", "10万円〜30万円", "30万円〜50万円", "50万円以上", "未定・相談したい"]

type SubmitState = "idle" | "sending" | "sent" | "failed"

export function ContactForm() {
  const [form, setForm] = useState<InquiryForm>(EMPTY_FORM)
  const [submitState, setSubmitState] = useState<SubmitState>("idle")

  const update = (field: keyof InquiryForm) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [field]: event.target.value }))

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSubmitState("sending")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error(`お問い合わせの送信に失敗しました（status ${response.status}）`)
      setSubmitState("sent")
    } catch (error) {
      console.error(error)
      setSubmitState("failed")
    }
  }

  if (submitState === "sent") {
    return (
      <div className="rounded-lg border border-line bg-surface-1 p-8 text-center md:p-12" role="status">
        <p className="font-pixel text-5xl text-signal">+1</p>
        <h2 className="mt-6 text-2xl font-black">お問い合わせありがとうございます</h2>
        <p className="mt-3 leading-relaxed text-fg-dim">内容を確認のうえ、2営業日以内にご連絡します。</p>
        <Link href="/" className="btn-secondary mt-8">
          トップへ戻る
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="お名前" isRequired>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="山田 太郎"
            value={form.name}
            onChange={update("name")}
            className="form-input"
          />
        </Field>
        <Field label="メールアドレス" isRequired>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update("email")}
            className="form-input"
          />
        </Field>
      </div>
      <Field label="会社名・団体名">
        <input name="company" autoComplete="organization" value={form.company} onChange={update("company")} className="form-input" />
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="ご相談の内容" isRequired>
          <select name="inquiryType" required value={form.inquiryType} onChange={update("inquiryType")} className="form-input">
            <option value="">選択してください</option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="ご予算">
          <select name="budget" value={form.budget} onChange={update("budget")} className="form-input">
            <option value="">選択してください</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="メッセージ" isRequired>
        <textarea
          name="message"
          required
          rows={7}
          placeholder="やりたいこと、困っていること、ご希望の時期など、わかる範囲でお書きください。"
          value={form.message}
          onChange={update("message")}
          className="form-input resize-y"
        />
      </Field>

      {submitState === "failed" && (
        <p className="rounded-md border border-signal/60 bg-signal/10 px-4 py-3 text-sm" role="alert">
          送信に失敗しました。時間をおいて再度お試しいただくか、LINEかメールでご連絡ください。
        </p>
      )}

      <p className="text-xs text-fg-dim">
        送信いただいた内容は
        <Link href="/privacy" className="text-link mx-1">
          プライバシーポリシー
        </Link>
        に沿って取り扱います。
      </p>

      <button
        type="submit"
        disabled={submitState === "sending"}
        className="btn-primary w-full py-4 text-base disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {submitState === "sending" ? "送信中…" : "送信する"}
      </button>
    </form>
  )
}

function Field({ label, isRequired = false, children }: { label: string; isRequired?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-bold">
        {label}
        {isRequired && <span className="rounded bg-signal/15 px-1.5 py-0.5 text-[10px] text-signal">必須</span>}
      </span>
      {children}
    </label>
  )
}
