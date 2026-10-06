import type { Plan } from "@/lib/site/pricing"

const RECOMMENDED_LABEL = "おすすめ"

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl border p-7 ${
        plan.isRecommended ? "theme-ink border-transparent shadow-[0_24px_50px_-24px_rgba(13,13,51,0.6)]" : "border-line bg-surface-1"
      }`}
    >
      {plan.isRecommended && (
        <p className="absolute -top-3 right-6 rounded-full bg-signal px-3 py-1 text-[11px] font-bold text-white">{RECOMMENDED_LABEL}</p>
      )}
      <h3 className="text-lg font-bold">{plan.name}</h3>
      <p className="mt-1 font-mono text-[11px] text-fg-dim">{plan.initialFee}</p>
      <p className="mt-6 flex items-baseline gap-1">
        <span className="font-display text-4xl font-extrabold tracking-tight">{plan.price}</span>
        <span className="text-xs text-fg-dim">{plan.unit}</span>
      </p>
      <p className="mt-1 text-xs text-fg-dim">{plan.contract}</p>
      <ul className="mt-7 space-y-2.5 border-t border-line pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm leading-snug">
            <span className="font-display font-bold text-signal" aria-hidden="true">
              +
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  )
}
