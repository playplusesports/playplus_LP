import type { Faq } from "@/lib/site/faqs"

// 開閉は <details> に任せる（JavaScript 不要で、検索エンジンにも本文が見える）
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="flex-1 font-bold leading-relaxed">{faq.question}</span>
            <span aria-hidden="true" className="text-xl leading-none text-fg-dim transition-transform duration-200 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-6 pr-8 leading-relaxed text-fg-dim">{faq.answer}</p>
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
