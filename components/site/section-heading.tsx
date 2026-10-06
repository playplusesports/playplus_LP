type SectionHeadingProps = {
  title: React.ReactNode
  lead?: React.ReactNode
  align?: "start" | "split"
}

// 各セクションの見出し。split は見出しと説明文を左右に分ける
export function SectionHeading({ title, lead, align = "start" }: SectionHeadingProps) {
  if (align === "split") {
    return (
      <div className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
        <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
        {lead && <p className="leading-relaxed text-fg-dim md:text-lg">{lead}</p>}
      </div>
    )
  }

  return (
    <div className="mb-12 max-w-3xl md:mb-16">
      <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {lead && <p className="mt-5 leading-relaxed text-fg-dim md:text-lg">{lead}</p>}
    </div>
  )
}
