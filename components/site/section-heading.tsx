type SectionHeadingProps = {
  index: string
  code: string
  title: React.ReactNode
  lead?: React.ReactNode
}

// 各セクションの見出し。「01 / SERVICES」のような番号ラベル＋日本語の見出し
export function SectionHeading({ index, code, title, lead }: SectionHeadingProps) {
  return (
    <div className="mb-12 max-w-3xl md:mb-16">
      <p className="pixel-label flex items-center gap-3">
        <span className="text-signal-bright">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        {code}
      </p>
      <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">{title}</h2>
      {lead && <p className="mt-5 leading-relaxed text-text-dim md:text-lg">{lead}</p>}
    </div>
  )
}
