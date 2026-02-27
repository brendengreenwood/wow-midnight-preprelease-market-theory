import { useState } from 'react'
import { T, FONT_BODY } from '@/theme'

interface GateItemProps {
  text: string
}

export function GateItem({ text }: GateItemProps) {
  const [checked, setChecked] = useState(false)
  return (
    <div onClick={() => setChecked(!checked)} style={{
      display: "flex", gap: "12px", alignItems: "center",
      padding: "10px 14px", marginBottom: "4px", cursor: "pointer",
      background: checked ? `${T.green}0D` : "transparent",
      borderLeft: `3px solid ${checked ? T.green : T.stoneLight}`,
      transition: "all 0.3s ease", userSelect: "none",
    }}>
      <div style={{
        width: "18px", height: "18px", borderRadius: "2px",
        border: `2px solid ${checked ? T.green : T.goldDim}`,
        background: checked ? T.green : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease", fontSize: "12px", color: T.ink, fontWeight: 900,
      }}>
        {checked ? "✓" : ""}
      </div>
      <span style={{
        fontFamily: FONT_BODY, fontSize: "15px",
        color: checked ? T.green : T.text,
        textDecoration: checked ? "line-through" : "none",
        transition: "all 0.3s ease",
      }}>{text}</span>
    </div>
  )
}
