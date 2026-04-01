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
  {
    question: "月額プランはいつでも解約できますか？",
    answer: "エントリープランは縛りなしでいつでも解約いただけます。ライトプランは6ヶ月、スタンダードプランは3ヶ月の最低契約期間があります。期間内の解約には違約金（¥19,800）が発生します。",
  },
  {
    question: "買い切りプランとは何ですか？",
    answer: "制作費用を一度だけお支払いいただき、完成したサイトのファイル一式をお渡しするプランです。その後の更新・保守はお客様ご自身で行っていただく形となります。",
  },
  {
    question: "ロゴ制作もお願いできますか？",
    answer: "はい、オプションで承ります。テキスト＋アイコンのシンプルなものは¥10,000、ヒアリングから複数案提案・修正込みのフルオリジナルは¥39,800です。",
  },
  {
    question: "オプションはどのプランでも追加できますか？",
    answer: "はい、月額プラン・買い切りプランいずれにも追加いただけます。ロゴ作成のシンプルとフルオリジナルはどちらか1つのみ選択可能です。",
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
