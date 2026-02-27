import { T, FONT_DISPLAY, FONT_BODY } from '@/theme'
import { WcBadge } from './WcBadge'

type Tier = 'S' | 'A' | 'B'

interface MatRowProps {
  name: string
  desc: string
  tier: Tier
}

const tierColors: Record<Tier, string> = { S: T.emberBright, A: T.goldBright, B: T.parchmentDim }
const tierBg: Record<Tier, string> = { S: `${T.ember}22`, A: `${T.gold}15`, B: `${T.parchment}10` }

export function MatRow({ name, desc, tier }: MatRowProps) {
  return (
    <div style={{
      display: "flex", gap: "16px", alignItems: "flex-start",
      padding: "14px 16px", marginBottom: "4px",
      background: tierBg[tier], borderLeft: `3px solid ${tierColors[tier]}`,
    }}>
      <WcBadge color={tierColors[tier]}>{tier}</WcBadge>
      <div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: "14px", color: T.text, fontWeight: 700 }}>{name}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.textDim, marginTop: "2px", lineHeight: 1.4 }}>{desc}</div>
      </div>
    </div>
  )
}
