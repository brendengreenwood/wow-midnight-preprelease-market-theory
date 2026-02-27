import { forwardRef, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-block px-3 py-0.5 text-[11px] fantasy font-bold tracking-[1.5px] uppercase rounded-sm border",
  {
    variants: {
      variant: {
        default: "text-[var(--wc-gold)] bg-[var(--wc-gold)]/10 border-[var(--wc-gold)]/35",
        purple: "text-[var(--wc-void-purple)] bg-[var(--wc-void-purple)]/10 border-[var(--wc-void-purple)]/35",
        ember: "text-[var(--wc-ember)] bg-[var(--wc-ember)]/10 border-[var(--wc-ember)]/35",
        gold: "text-[var(--wc-gold-bright)] bg-[var(--wc-gold-bright)]/10 border-[var(--wc-gold-bright)]/35",
        green: "text-[var(--wc-green)] bg-[var(--wc-green)]/10 border-[var(--wc-green)]/35",
        red: "text-[var(--wc-red)] bg-[var(--wc-red)]/10 border-[var(--wc-red)]/35",
        blue: "text-[var(--wc-blue)] bg-[var(--wc-blue)]/10 border-[var(--wc-blue)]/35",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
)
Badge.displayName = "Badge"
