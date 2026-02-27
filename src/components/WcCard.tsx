import { ReactNode, CSSProperties } from 'react'
import { T, goldBorderStyle } from '@/theme'

interface WcCardProps {
  children: ReactNode
  highlight?: boolean
  style?: CSSProperties
}

export function WcCard({ children, highlight, style }: WcCardProps) {
  return (
    <div style={{
      background: `linear-gradient(170deg, ${T.stone} 0%, ${T.stoneDark} 100%)`,
      borderRadius: "3px",
      padding: "28px 32px",
      position: "relative",
      ...goldBorderStyle(highlight),
      ...style,
    }}>
      {highlight && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent 0%, ${T.goldBright} 50%, transparent 100%)`,
        }} />
      )}
      {children}
    </div>
  )
}
