import { forwardRef, HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  highlight?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, highlight, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative",
        "border-solid border-t-[60px] border-x-[40px] border-b-[40px] wc-card-border",
        "[border-image-slice:60_40_40_40_fill] [border-image-repeat:stretch]",
        "px-4 py-4",
        highlight && "shadow-[inset_0_0_30px_rgba(201,168,76,0.08),0_0_20px_rgba(201,168,76,0.15)]",
        className
      )}
      {...props}
    >
      {highlight && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--wc-gold-bright)] to-transparent" />
      )}
      {children}
    </div>
  )
)
Card.displayName = "Card"

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-3", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "fantasy text-xs font-bold tracking-[2px] uppercase text-[var(--wc-gold-dim)] mb-3",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-base leading-relaxed", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"
