import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export const Separator = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 my-12",
        className
      )}
      {...props}
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--wc-gold-dim)]/40 to-transparent" />
      <div className="text-[var(--wc-gold-dim)] text-sm">⬥</div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--wc-gold-dim)]/40 to-transparent" />
    </div>
  )
)
Separator.displayName = "Separator"
