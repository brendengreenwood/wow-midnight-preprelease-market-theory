import { useState, useEffect, useRef } from 'react'
import { T, FONT_DISPLAY, FONT_BODY } from '@/theme'

interface StatRowProps {
  label: string
  value: string
  color: string
  delay?: number
}

export function StatRow({ label, value, color, delay = 0 }: StatRowProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 16px", marginBottom: "4px",
      background: visible ? `${color}0D` : "transparent",
      borderLeft: `3px solid ${visible ? color : "transparent"}`,
      transition: `all 0.5s ease ${delay}s`,
      opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)",
    }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: T.textDim }}>{label}</span>
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: "18px", fontWeight: 700, color, letterSpacing: "0.5px" }}>{value}</span>
    </div>
  )
}
