import type { Faq } from "@/lib/site/faqs"

// 開閉は <details> に任せる（JavaScript 不要で、検索エンジンにも本文が見える）
export function FaqList({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-pixel text-play">Q</span>
            <span className="flex-1 font-bold leading-relaxed">{faq.question}</span>
            <span className="font-pixel text-xl leading-none text-text-dim transition-transform duration-300 group-open:rotate-45 group-open:text-signal-bright">
              +
            </span>
          </summary>
          <p className="pb-6 pl-8 pr-8 leading-relaxed text-text-dim">{faq.answer}</p>
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
