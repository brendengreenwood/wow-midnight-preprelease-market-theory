import { Badge } from "./ui/badge"

type Tier = "S" | "A" | "B"

interface MatRowProps {
  name: string
  desc: string
  tier: Tier
}

const tierVariants = {
  S: { variant: "ember" as const, bg: "var(--wc-ember)" },
  A: { variant: "gold" as const, bg: "var(--wc-gold)" },
  B: { variant: "default" as const, bg: "var(--wc-parchment)" },
}

export function MatRow({ name, desc, tier }: MatRowProps) {
  const { variant, bg } = tierVariants[tier]

  return (
    <div
      className="flex gap-4 items-start px-4 py-3.5 mb-1 -mx-4"
      style={{
        background: `color-mix(in srgb, ${bg} 8%, transparent)`,
        borderLeft: `3px solid ${bg}`,
      }}
    >
      <Badge variant={variant}>{tier}</Badge>
      <div>
        <div className="fantasy text-sm font-bold text-[var(--wc-text)]">
          {name}
        </div>
        <div className="text-[13px] text-[var(--wc-text-dim)] mt-0.5 leading-snug">
          {desc}
        </div>
      </div>
    </div>
  )
}
