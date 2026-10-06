type SectionHeadingProps = {
  index: string
  code: string
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "start" | "split"
}

// 各セクションの見出し。split は大きな見出しと説明文を左右に分ける
export function SectionHeading({ index, code, title, lead, align = "start" }: SectionHeadingProps) {
  const label = (
    <p className="eyebrow flex items-center gap-3">
      <span className="text-signal">{index}</span>
      <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
      {code}
    </p>
  )

  if (align === "split") {
    return (
      <div className="mb-14 grid gap-6 md:mb-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
        <div>
          {label}
          <h2 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
        </div>
        {lead && <p className="leading-relaxed text-fg-dim md:text-lg">{lead}</p>}
      </div>
    )
  }

  return (
    <div className="mb-14 max-w-3xl md:mb-20">
      {label}
      <h2 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">{title}</h2>
      {lead && <p className="mt-6 leading-relaxed text-fg-dim md:text-lg">{lead}</p>}
    </div>
  )
}
