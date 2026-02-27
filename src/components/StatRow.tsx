import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface StatRowProps {
  label: string
  value: string
  color: "gold" | "gold-bright" | "ember" | "ember-bright" | "dim" | "purple"
  delay?: number
}

const colorMap = {
  gold: "var(--wc-gold)",
  "gold-bright": "var(--wc-gold-bright)",
  ember: "var(--wc-ember)",
  "ember-bright": "var(--wc-ember-bright)",
  dim: "var(--wc-text-dim)",
  purple: "var(--wc-void-purple)",
}

export function StatRow({ label, value, color, delay = 0 }: StatRowProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const colorValue = colorMap[color]

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-between items-center px-4 py-2.5 mb-1 -mx-4 transition-all duration-500",
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
      )}
      style={{
        transitionDelay: `${delay}s`,
        background: visible ? `color-mix(in srgb, ${colorValue} 5%, transparent)` : "transparent",
        borderLeft: `3px solid ${visible ? colorValue : "transparent"}`,
      }}
    >
      <span className="text-sm text-[var(--wc-text-dim)]">{label}</span>
      <span
        className="fantasy text-lg font-bold tracking-wide"
        style={{ color: colorValue }}
      >
        {value}
      </span>
    </div>
  )
}
