import { T, FONT_DISPLAY, FONT_BODY } from '@/theme'

interface StepItemProps {
  num: string
  text: string
}

export function StepItem({ num, text }: StepItemProps) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "14px" }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: "22px", fontWeight: 900, color: T.goldDim, minWidth: "36px", lineHeight: 1 }}>{num}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: "16px", color: T.text, lineHeight: 1.5, paddingTop: "2px" }}>{text}</div>
    </div>
  )
}
