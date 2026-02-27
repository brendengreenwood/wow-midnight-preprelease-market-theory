import { ReactNode } from "react"

interface ChartLabelProps {
  children: ReactNode
}

export function ChartLabel({ children }: ChartLabelProps) {
  return (
    <div className="fantasy text-[13px] text-[var(--wc-gold-dim)] tracking-[1.5px] uppercase font-bold mb-2 text-center">
      {children}
    </div>
  )
}
