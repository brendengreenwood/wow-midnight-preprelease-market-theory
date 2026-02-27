interface WcSourceProps {
  text: string
  url: string
}

export function WcSource({ text, url }: WcSourceProps) {
  return (
    <div className="mt-4 px-4 py-3 -mx-4 bg-gradient-to-br from-[var(--wc-ink)] to-[#161210] border border-[var(--wc-stone-light)] border-l-[3px] border-l-[var(--wc-void-purple)] rounded-sm text-[13px] text-[var(--wc-text-dim)] leading-relaxed">
      <span className="fantasy text-[var(--wc-void-purple)] font-bold text-[10px] tracking-[1px] uppercase">
        Source
      </span>
      <br />
      <em>"{text}"</em>
      <br />
      <span className="text-[var(--wc-gold)] text-xs">— {url}</span>
    </div>
  )
}
