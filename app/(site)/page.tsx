import Link from "next/link"
import { ContactBand } from "@/components/site/contact-band"
import { FaqList, FaqSchema } from "@/components/site/faq-list"
import { LiveOperations } from "@/components/site/live-operations"
import { PlusField } from "@/components/site/plus-field"
import { SectionHeading } from "@/components/site/section-heading"
import { WorksGallery } from "@/components/site/works-gallery"
import { listPublicNews } from "@/lib/public-news"
import { listPublicWorks } from "@/lib/public-works"
import { STUDIO_FACTS } from "@/lib/site/daily-operations"
import { GENERAL_FAQS } from "@/lib/site/faqs"
import { PRICE_GUIDE } from "@/lib/site/pricing"
import { SERVICE_PILLARS } from "@/lib/site/service-pillars"
import { WORKFLOW_STEPS } from "@/lib/site/workflow"

export const dynamic = "force-dynamic"

const FEATURED_WORKS_COUNT = 6
const LATEST_NEWS_COUNT = 3

export default async function HomePage() {
  const [works, news] = await Promise.all([listPublicWorks(), listPublicNews()])

  return (
    <>
      <FaqSchema faqs={GENERAL_FAQS} />
      <Hero />
      <Concept />

      <section id="services" className="border-t border-line py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            index="01"
            code="SERVICES"
            title="5つの「つくる」を、ひとつの窓口で。"
            lead="Webサイトから、アプリ、AIの自動化、動画、イベントまで。分野ごとに別の会社を探さなくても、Play+ がまとめて引き受けます。"
          />
          <ol className="border-t border-line">
            {SERVICE_PILLARS.map((pillar, position) => (
              <li key={pillar.slug} className="border-b border-line">
                <Link
                  href={`/services#${pillar.slug}`}
                  className="group grid gap-4 py-8 transition-colors md:grid-cols-[5rem_14rem_1fr_auto] md:items-center md:gap-8 md:py-10"
                >
                  <span className="font-mono text-sm text-text-dim">{String(position + 1).padStart(2, "0")}</span>
                  <span className="font-pixel text-3xl tracking-[0.12em] text-play transition-colors group-hover:text-signal-bright md:text-4xl">
                    {pillar.code}
                  </span>
                  <span>
                    <span className="block text-xl font-bold md:text-2xl">{pillar.title}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-text-dim">{pillar.lead}</span>
                  </span>
                  <span className="flex items-center gap-3 font-mono text-xs text-text-dim">
                    {pillar.priceLabel}
                    <span className="font-pixel text-xl text-white transition-transform duration-300 group-hover:rotate-90">+</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="running" className="relative overflow-hidden border-t border-line bg-ink-1/40 py-24 md:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <SectionHeading
            index="02"
            code="NOW RUNNING"
            title={
              <>
                いまも、
                <br />
                毎日動いている。
              </>
            }
            lead="動画の制作と投稿、サイトの更新、ニュースの要約。Play+ では自社の仕組みが毎日決まった時刻に自動で動いています。同じ技術で、お客様のくり返し作業も仕組みに置き換えます。"
          />
          <LiveOperations />
        </div>
      </section>

      <section id="works" className="border-t border-line py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            index="03"
            code="WORKS"
            title="つくってきたもの"
            lead="お客様の案件と、自社で開発・運用しているサービスの一部です。"
          />
          <WorksGallery works={works.slice(0, FEATURED_WORKS_COUNT)} showFilters={false} />
          <div className="mt-12">
            <Link href="/works" className="btn-outline">
              すべての実績を見る（{works.length}件）
            </Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-line py-24 md:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading
            index="04"
            code="PRICING"
            title="料金の目安"
            lead="内容に合わせてお見積りします。予算が固まっていない段階でもご相談ください。"
          />
          <div>
            <ul className="border-t border-line">
              {PRICE_GUIDE.map((row) => (
                <li key={row.service} className="border-b border-line">
                  <Link href={row.href} className="group flex items-center justify-between gap-4 py-5">
                    <span className="font-bold">{row.service}</span>
                    <span className="flex items-center gap-3 text-right font-mono text-sm text-text-dim group-hover:text-white">
                      {row.price}
                      <span aria-hidden="true" className="text-play transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-text-dim">※ 税込・税別の区分は各サービスページの表記に準じます。</p>
          </div>
        </div>
      </section>

      <section id="process" className="border-t border-line bg-ink-1/40 py-24 md:py-32">
        <div className="site-container">
          <SectionHeading
            index="05"
            code="PROCESS"
            title="ご相談から公開まで"
            lead="各ステップで進み具合を共有し、判断を一緒に行います。"
          />
          <ol className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
            {WORKFLOW_STEPS.map((step, position) => (
              <li key={step.title} className="bg-ink-0 p-6 md:p-8">
                <p className="font-pixel text-sm text-signal-bright">STEP {position + 1}</p>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {news.length > 0 && (
        <section id="news" className="border-t border-line py-24 md:py-32">
          <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeading index="06" code="NEWS" title="お知らせ" />
            <div>
              <ul className="border-t border-line">
                {news.slice(0, LATEST_NEWS_COUNT).map((item) => (
                  <li key={item.id} className="border-b border-line">
                    <Link href={`/news/${item.id}`} className="group grid gap-1 py-5 sm:grid-cols-[7rem_6rem_1fr] sm:items-center sm:gap-4">
                      <span className="font-mono text-xs text-text-dim">{item.date}</span>
                      <span className="w-fit rounded border border-line-strong px-2 py-0.5 text-[11px] text-text-dim">{item.category}</span>
                      <span className="font-bold group-hover:text-play">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/news" className="text-link mt-6 inline-block text-sm">
                お知らせ一覧へ →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="faq" className="border-t border-line py-24 md:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading index={news.length > 0 ? "07" : "06"} code="FAQ" title="よくある質問" />
          <FaqList faqs={GENERAL_FAQS} />
        </div>
      </section>

      <ContactBand />
    </>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-32 md:items-center md:pb-0">
      <PlusField />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(6,7,26,0.9),rgba(6,7,26,0.35)_55%,transparent_80%)]"
        aria-hidden="true"
      />
      <div className="site-container pointer-events-none relative">
        <p className="pixel-label">CREATIVE TECH STUDIO / OSAKA</p>
        <h1 className="mt-6 text-[clamp(3.2rem,11vw,8.5rem)] font-black leading-[1.02] tracking-tight">
          遊びに、
          <br />
          プラス<span className="text-signal-bright">を。</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-dim md:text-lg">
          Webサイト、アプリ、AIの自動化、動画、イベント。
          <br />
          つくる技術と、楽しませる発想で、
          <br className="hidden sm:block" />
          あなたの「やりたい」にプラスを足します。
        </p>
        <div className="pointer-events-auto mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-signal">
            相談する（無料）
          </Link>
          <Link href="/works" className="btn-outline bg-ink-0/60 backdrop-blur">
            実績を見る
          </Link>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-5 gap-y-2 font-pixel text-xs tracking-[0.2em] text-text-dim" aria-label="事業領域">
          {SERVICE_PILLARS.map((pillar) => (
            <li key={pillar.slug}>
              <span className="text-play">+</span> {pillar.code}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Concept() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="site-container grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <p className="pixel-label">CONCEPT</p>
          <p className="mt-6 text-2xl font-bold leading-relaxed md:text-3xl md:leading-relaxed">
            Play+ は、ゲーム大会の会場から始まりました。
            <br />
            人が夢中になる瞬間をつくってきた経験を、
            <span className="text-play">Web</span>にも、<span className="text-play">アプリ</span>にも、
            <span className="text-play">AI</span>にも持ち込んでいます。
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-text-dim">
            「便利」だけでは、人は使い続けてくれません。触って楽しい、見ていて飽きない、毎日動き続ける。そんな“遊び心”をプラスして、成果につながる形に仕上げます。
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-lg border border-line bg-line">
          {STUDIO_FACTS.map((fact) => (
            <div key={fact.label} className="bg-ink-0 p-5 md:p-7">
              <dd className="font-pixel text-4xl text-white md:text-5xl">
                {fact.value}
                <span className="ml-1 text-xl text-signal-bright md:text-2xl">{fact.unit}</span>
              </dd>
              <dt className="mt-3 text-xs leading-relaxed text-text-dim md:text-sm">{fact.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
