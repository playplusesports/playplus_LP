import Link from "next/link"

type Crumb = { label: string; href: string }

type PageIntroProps = {
  title: React.ReactNode
  lead?: React.ReactNode
  crumbs?: readonly Crumb[]
  children?: React.ReactNode
}

// 下層ページの冒頭。トップと同じ紙の地と十字キー模様で質感をそろえる
export function PageIntro({ title, lead, crumbs = [], children }: PageIntroProps) {
  return (
    <section className="plus-pattern border-b border-line pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="site-container">
        <nav aria-label="パンくずリスト" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-fg-dim">
          <Link href="/" className="hover:text-fg">
            トップ
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span aria-hidden="true">›</span>
              <Link href={crumb.href} className="hover:text-fg">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl leading-relaxed text-fg-dim md:text-lg">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
