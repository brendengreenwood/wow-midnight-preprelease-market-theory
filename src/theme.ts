export const T = {
  gold: "#C9A84C",
  goldBright: "#FFD700",
  goldDim: "#8B7332",
  voidPurple: "#7B4FBF",
  voidDeep: "#3D1F6D",
  ember: "#D4551A",
  emberBright: "#FF6B2B",
  stone: "#2A2318",
  stoneDark: "#1A170F",
  stoneLight: "#3D3628",
  parchment: "#C4B48A",
  parchmentDim: "#9E8F6E",
  ink: "#0D0B08",
  text: "#E8DCC8",
  textDim: "#9E9480",
  green: "#1EBB4F",
  blue: "#4A9EFF",
  red: "#E03E3E",
} as const

export const FONT_DISPLAY = "'Cinzel', 'Georgia', serif"
export const FONT_BODY = "'Crimson Text', 'Georgia', serif"

export function goldBorderStyle(highlight = false) {
  return {
    border: `2px solid ${highlight ? T.goldBright : T.goldDim}`,
    boxShadow: highlight
      ? `inset 0 0 30px rgba(201,168,76,0.08), 0 0 20px rgba(201,168,76,0.15)`
      : `inset 0 0 20px rgba(0,0,0,0.4)`,
  }
}
