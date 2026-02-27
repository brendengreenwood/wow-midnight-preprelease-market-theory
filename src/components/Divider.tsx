import { T } from '@/theme'

export function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "48px 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${T.goldDim}66, transparent)` }} />
      <div style={{ color: T.goldDim, fontSize: "14px" }}>⬥</div>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${T.goldDim}66, transparent)` }} />
    </div>
  )
}
