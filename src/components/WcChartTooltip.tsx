interface PayloadItem {
  color: string
  name: string
  value: number
}

interface WcChartTooltipProps {
  active?: boolean
  payload?: PayloadItem[]
  label?: string
  formatter?: (value: number) => string
}

export function WcChartTooltip({ active, payload, label, formatter }: WcChartTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div className="bg-gradient-to-br from-[var(--wc-stone)] to-[var(--wc-stone-dark)] border border-[var(--wc-gold-dim)] rounded-sm px-3.5 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <div className="fantasy text-[11px] text-[var(--wc-gold-dim)] tracking-[1px] uppercase mb-1.5">
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} className="flex gap-2 items-center mb-0.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-[13px] text-[var(--wc-text-dim)]">{p.name}:</span>
          <span
            className="fantasy text-[13px] font-bold"
            style={{ color: p.color }}
          >
            {formatter ? formatter(p.value) : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}
