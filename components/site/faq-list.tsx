import type { Faq } from "@/lib/site/faqs"

// 開閉は <details> に任せる（JavaScript 不要で、検索エンジンにも本文が見える）
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="panel group px-6 transition-colors open:border-fg/30 md:px-8">
          <summary className="flex cursor-pointer list-none items-center gap-4 py-6 [&::-webkit-details-marker]:hidden">
            <span className="flex-1 font-bold leading-relaxed md:text-lg">{faq.question}</span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 font-display text-xl transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-signal group-open:text-white"
            >
              +
            </span>
          </summary>
          <p className="pb-7 pr-12 leading-relaxed text-fg-dim">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}

export function FaqSchema({ faqs }: { faqs: readonly Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
