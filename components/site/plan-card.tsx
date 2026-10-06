import type { Plan } from "@/lib/site/pricing"

const RECOMMENDED_LABEL = "おすすめ"

export function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex flex-col rounded-lg border p-6 ${
        plan.isRecommended ? "border-signal bg-ink-1 shadow-[0_0_0_1px_var(--signal)]" : "border-line bg-ink-1/60"
      }`}
    >
      {plan.isRecommended && (
        <p className="absolute -top-3 left-6 rounded bg-signal px-2 py-0.5 text-[11px] font-bold text-white">{RECOMMENDED_LABEL}</p>
      )}
      <h3 className="font-bold">{plan.name}</h3>
      <p className="mt-1 font-mono text-[11px] text-text-dim">{plan.initialFee}</p>
      <p className="mt-5 flex items-baseline gap-1">
        <span className="font-mono text-3xl font-bold tracking-tight text-white">{plan.price}</span>
        <span className="text-xs text-text-dim">{plan.unit}</span>
      </p>
      <p className="mt-1 text-xs text-text-dim">{plan.contract}</p>
      <ul className="mt-6 space-y-2 border-t border-line pt-5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm leading-snug">
            <span className="font-pixel text-play" aria-hidden="true">
              +
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </article>
  )
}
