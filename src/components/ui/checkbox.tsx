import { forwardRef, InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || `checkbox-${Math.random().toString(36).slice(2)}`

    return (
      <div className="flex items-center gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className={cn(
            "checkbox checkbox-default w-6 h-6 cursor-pointer",
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className="fantasy text-[15px] text-[var(--wc-text)] cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"
