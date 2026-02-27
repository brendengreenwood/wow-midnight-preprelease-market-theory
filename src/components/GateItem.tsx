import { useState } from "react"
import { cn } from "@/lib/utils"

interface GateItemProps {
  text: string
}

export function GateItem({ text }: GateItemProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div
      onClick={() => setChecked(!checked)}
      className={cn(
        "flex gap-3 items-center px-3.5 py-2.5 mb-1 cursor-pointer select-none transition-all duration-300",
        checked
          ? "bg-[var(--wc-green)]/5 border-l-[3px] border-l-[var(--wc-green)]"
          : "border-l-[3px] border-l-[var(--wc-stone-light)]"
      )}
    >
      <div
        className={cn(
          "w-[18px] h-[18px] rounded-sm border-2 flex items-center justify-center transition-all duration-200 text-xs font-black",
          checked
            ? "border-[var(--wc-green)] bg-[var(--wc-green)] text-[var(--wc-ink)]"
            : "border-[var(--wc-gold-dim)] bg-transparent"
        )}
      >
        {checked ? "✓" : ""}
      </div>
      <span
        className={cn(
          "text-[15px] transition-all duration-300",
          checked
            ? "text-[var(--wc-green)] line-through"
            : "text-[var(--wc-text)]"
        )}
      >
        {text}
      </span>
    </div>
  )
}
