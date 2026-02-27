interface PhaseBlockProps {
  week: string
  label: string
  desc: string
  idx: number
}

const colors = ["var(--wc-green)", "var(--wc-gold-bright)", "var(--wc-red)"]

export function PhaseBlock({ week, label, desc, idx }: PhaseBlockProps) {
  const color = colors[idx]

  return (
    <div className="flex gap-4 mb-4">
      <div className="flex flex-col items-center min-w-[32px]">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: color,
            border: `2px solid ${color}`,
            boxShadow: `0 0 8px color-mix(in srgb, ${color} 40%, transparent)`,
          }}
        />
        {idx < 2 && (
          <div className="w-0.5 flex-1 bg-[var(--wc-stone-light)]" />
        )}
      </div>
      <div className="pb-2">
        <div
          className="fantasy text-[11px] tracking-[1.5px] uppercase font-bold"
          style={{ color }}
        >
          {week}
        </div>
        <div className="fantasy text-base font-bold text-[var(--wc-text)] my-1">
          {label}
        </div>
        <div className="text-sm text-[var(--wc-text-dim)] leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  )
}
