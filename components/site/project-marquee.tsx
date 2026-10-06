import { PROJECT_NAMES } from "@/lib/site/service-pillars"

// これまでのプロジェクト名を横に流す帯。継ぎ目なく回すため同じ並びを2回描く
export function ProjectMarquee() {
  return (
    <section aria-label="これまでに手がけたプロジェクト" className="overflow-hidden border-y border-line bg-surface-1 py-6 md:py-8">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {PROJECT_NAMES.map((name) => (
              <li key={name} className="flex items-center whitespace-nowrap">
                <span className="px-6 font-display text-3xl font-bold tracking-tight md:px-10 md:text-5xl">{name}</span>
                <span className="font-display text-2xl text-signal md:text-4xl" aria-hidden="true">
                  +
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
