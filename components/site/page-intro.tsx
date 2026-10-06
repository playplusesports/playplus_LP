import Link from "next/link"

type Crumb = { label: string; href: string }

type PageIntroProps = {
  code: string
  title: React.ReactNode
  lead?: React.ReactNode
  crumbs?: readonly Crumb[]
  children?: React.ReactNode
}

// 下層ページの冒頭。トップと同じ十字キー模様を敷き、質感をそろえる
export function PageIntro({ code, title, lead, crumbs = [], children }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="plus-pattern absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="site-container relative">
        <nav aria-label="パンくずリスト" className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs text-text-dim">
          <Link href="/" className="hover:text-white">
            home
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <span aria-hidden="true">/</span>
              <Link href={crumb.href} className="hover:text-white">
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>
        <p className="pixel-label">{code}</p>
        <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl leading-relaxed text-text-dim md:text-lg">{lead}</p>}
        {children}
      </div>
    </section>
  )
}
