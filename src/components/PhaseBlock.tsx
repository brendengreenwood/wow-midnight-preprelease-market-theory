import { T, FONT_DISPLAY, FONT_BODY } from '@/theme'

interface PhaseBlockProps {
  week: string
  label: string
  desc: string
  idx: number
}

export function PhaseBlock({ week, label, desc, idx }: PhaseBlockProps) {
  const colors = [T.green, T.goldBright, T.red]
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "32px" }}>
        <div style={{
          width: "12px", height: "12px", borderRadius: "50%",
          background: colors[idx], border: `2px solid ${colors[idx]}`,
          boxShadow: `0 0 8px ${colors[idx]}66`,
        }} />
        {idx < 2 && <div style={{ width: "2px", flex: 1, background: T.stoneLight }} />}
      </div>
      <div style={{ paddingBottom: "8px" }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: "11px", color: colors[idx], letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700 }}>{week}</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: "16px", color: T.text, fontWeight: 700, margin: "4px 0" }}>{label}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: "14px", color: T.textDim, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  )
}
