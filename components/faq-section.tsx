import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "何も決まっていなくても相談できますか？",
    answer: "はい、「こんなことがしたい」というざっくりとしたイメージだけでもご相談いただけます。ヒアリングを通じて、目的に合った企画をご一緒に考えていきます。お気軽にお問い合わせください。",
  },
  {
    question: "小規模イベントでも依頼できますか？",
    answer: "可能です。個人主催の大会や少人数のイベントにも対応しています。規模に関わらず、企画から当日の運営サポートまで柔軟にお手伝いいたしますので、まずはご相談ください。",
  },
  {
    question: "修正は可能ですか？",
    answer: "納品前の修正は対応いたします。初回のご確認時にフィードバックをいただき、ご納得いただけるまで調整を行います。修正回数や範囲についてはプランによって異なりますので、詳しくはお問い合わせください。",
  },
  {
    question: "納期はどれくらいですか？",
    answer: "LP制作は最短1週間程度、通常のWebサイト制作は2〜4週間が目安です。内容やボリュームによって変動しますので、ご希望の納期がある場合はお早めにご相談いただければスケジュールを調整いたします。",
  },
  {
    question: "オンライン対応可能ですか？",
    answer: "全国対応可能です。打ち合わせはZoomやGoogle Meetなどのオンラインツールで行えますので、遠方の方でも問題ありません。チャットやメールでのやり取りも柔軟に対応しています。",
  },
]

export function FaqSection() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      }
    }))
  }

  return (
    <section id="faq" className="py-24 bg-secondary/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-accent font-medium mb-2">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            よくある質問
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground hover:text-accent">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
