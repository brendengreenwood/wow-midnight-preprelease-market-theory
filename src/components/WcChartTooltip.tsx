import { T, FONT_DISPLAY, FONT_BODY } from '@/theme'

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
    <div style={{
      background: `linear-gradient(170deg, ${T.stone}, ${T.stoneDark})`,
      border: `1px solid ${T.goldDim}`,
      borderRadius: "2px",
      padding: "10px 14px",
      boxShadow: `0 4px 20px rgba(0,0,0,0.6)`,
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: "11px", color: T.goldDim, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "2px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.textDim }}>{p.name}:</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "13px", color: p.color, fontWeight: 700 }}>
            {formatter ? formatter(p.value) : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}
