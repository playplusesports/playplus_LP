import Link from "next/link"

type Crumb = { label: string; href: string }

type PageIntroProps = {
  code: string
  title: React.ReactNode
  lead?: React.ReactNode
  crumbs?: readonly Crumb[]
  children?: React.ReactNode
}

// 下層ページの冒頭。トップと同じ紙の地・十字キー模様・特大の見出しで質感をそろえる
export function PageIntro({ code, title, lead, crumbs = [], children }: PageIntroProps) {
  return (
    <section className="plus-pattern relative border-b border-line pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="site-container">
        <nav aria-label="パンくずリスト" className="mb-10 flex flex-wrap items-center gap-2 font-mono text-xs text-fg-dim">
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link href={crumb.href} className="hover:text-fg">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
        <p className="eyebrow flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
          {code}
        </p>
        <h1 className="mt-6 text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">{title}</h1>
        {lead && <p className="mt-8 max-w-2xl leading-relaxed text-fg-dim md:text-lg">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
