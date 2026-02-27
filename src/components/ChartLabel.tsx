import { ReactNode } from 'react'
import { T, FONT_DISPLAY } from '@/theme'

interface ChartLabelProps {
  children: ReactNode
}

export function ChartLabel({ children }: ChartLabelProps) {
  return (
    <div style={{
      fontFamily: FONT_DISPLAY, fontSize: "13px", color: T.goldDim,
      letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700,
      marginBottom: "8px", textAlign: "center",
    }}>{children}</div>
  )
}
