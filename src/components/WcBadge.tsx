import { ReactNode } from 'react'
import { T, FONT_DISPLAY } from '@/theme'

interface WcBadgeProps {
  children: ReactNode
  color?: string
}

export function WcBadge({ children, color = T.gold }: WcBadgeProps) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 12px", fontSize: "11px",
      fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: "1.5px",
      textTransform: "uppercase", color,
      background: `${color}18`, border: `1px solid ${color}55`, borderRadius: "2px",
    }}>
      {children}
    </span>
  )
}
