interface StepItemProps {
  num: string
  text: string
}

export function StepItem({ num, text }: StepItemProps) {
  return (
    <div className="flex gap-4 items-start mb-3.5">
      <div className="fantasy text-[22px] font-black text-[var(--wc-gold-dim)] min-w-[36px] leading-none">
        {num}
      </div>
      <div className="text-base text-[var(--wc-text)] leading-relaxed pt-0.5">
        {text}
      </div>
    </div>
  )
}
