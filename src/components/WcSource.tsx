import { T, FONT_DISPLAY, FONT_BODY } from '@/theme'

interface WcSourceProps {
  text: string
  url: string
}

export function WcSource({ text, url }: WcSourceProps) {
  return (
    <div style={{
      marginTop: "16px", padding: "12px 16px",
      background: `linear-gradient(135deg, ${T.ink}, #161210)`,
      border: `1px solid ${T.stoneLight}`, borderLeft: `3px solid ${T.voidPurple}`,
      borderRadius: "2px", fontSize: "13px", fontFamily: FONT_BODY,
      color: T.textDim, lineHeight: 1.5,
    }}>
      <span style={{ color: T.voidPurple, fontWeight: 700, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", fontFamily: FONT_DISPLAY }}>Source</span>
      <br /><em>"{text}"</em>
      <br /><span style={{ color: T.gold, fontSize: "12px" }}>— {url}</span>
    </div>
  )
}
