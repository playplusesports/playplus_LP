import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "何も決まっていなくても相談できますか？",
    answer: "はい、企画段階から対応可能です。",
  },
  {
    question: "小規模イベントでも依頼できますか？",
    answer: "可能です。個人主催の大会も対応しています。",
  },
  {
    question: "修正は可能ですか？",
    answer: "納品前の修正は対応いたします。",
  },
  {
    question: "納期はどれくらいですか？",
    answer: "LP制作は最短1週間程度です。",
  },
  {
    question: "オンライン対応可能ですか？",
    answer: "全国対応可能です。",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-24 bg-secondary/30">
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
