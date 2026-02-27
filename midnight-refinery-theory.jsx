import { useState, useEffect, useRef } from "react";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, ReferenceLine, Legend } from "recharts";

// ── Warcraft III Design Tokens (matching warcraftcn aesthetic) ──
const T = {
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
};

const FONT_DISPLAY = "'Cinzel', 'Georgia', serif";
const FONT_BODY = "'Crimson Text', 'Georgia', serif";

// ── Gold border (WC3 panel frame style) ──
const goldBorderStyle = (highlight = false) => ({
  border: `2px solid ${highlight ? T.goldBright : T.goldDim}`,
  boxShadow: highlight
    ? `inset 0 0 30px rgba(201,168,76,0.08), 0 0 20px rgba(201,168,76,0.15)`
    : `inset 0 0 20px rgba(0,0,0,0.4)`,
});

// ── WC3 Card ──
function WcCard({ children, highlight, style }) {
  return (
    <div style={{
      background: `linear-gradient(170deg, ${T.stone} 0%, ${T.stoneDark} 100%)`,
      borderRadius: "3px",
      padding: "28px 32px",
      position: "relative",
      ...goldBorderStyle(highlight),
      ...style,
    }}>
      {highlight && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent 0%, ${T.goldBright} 50%, transparent 100%)`,
        }} />
      )}
      {children}
    </div>
  );
}

// ── WC3 Badge ──
function WcBadge({ children, color = T.gold }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 12px", fontSize: "11px",
      fontFamily: FONT_DISPLAY, fontWeight: 700, letterSpacing: "1.5px",
      textTransform: "uppercase", color,
      background: `${color}18`, border: `1px solid ${color}55`, borderRadius: "2px",
    }}>
      {children}
    </span>
  );
}

// ── Source citation ──
function WcSource({ text, url }) {
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
  );
}

// ── Stat row ──
function StatRow({ label, value, color, delay = 0 }) {
  const [v, setV] = useState(false);
  const r = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.3 });
    if (r.current) obs.observe(r.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={r} style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "10px 16px", marginBottom: "4px",
      background: v ? `${color}0D` : "transparent",
      borderLeft: `3px solid ${v ? color : "transparent"}`,
      transition: `all 0.5s ease ${delay}s`,
      opacity: v ? 1 : 0, transform: v ? "translateX(0)" : "translateX(-20px)",
    }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: "14px", color: T.textDim }}>{label}</span>
      <span style={{ fontFamily: FONT_DISPLAY, fontSize: "18px", fontWeight: 700, color, letterSpacing: "0.5px" }}>{value}</span>
    </div>
  );
}

// ── Phase timeline ──
function PhaseBlock({ week, label, desc, idx }) {
  const colors = [T.green, T.goldBright, T.red];
  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "32px" }}>
        <div style={{
          width: "12px", height: "12px", borderRadius: "50%",
          background: colors[idx], border: `2px solid ${colors[idx]}`,
          boxShadow: `0 0 8px ${colors[idx]}66`,
        }} />
        {idx < 2 && <div style={{ width: "2px", flex: 1, background: T.stoneLight }} />}
      </div>
      <div style={{ paddingBottom: "8px" }}>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: "11px", color: colors[idx], letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700 }}>{week}</div>
        <div style={{ fontFamily: FONT_DISPLAY, fontSize: "16px", color: T.text, fontWeight: 700, margin: "4px 0" }}>{label}</div>
        <div style={{ fontFamily: FONT_BODY, fontSize: "14px", color: T.textDim, lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── Interactive gate checklist ──
function GateItem({ text }) {
  const [checked, setChecked] = useState(false);
  return (
    <div onClick={() => setChecked(!checked)} style={{
      display: "flex", gap: "12px", alignItems: "center",
      padding: "10px 14px", marginBottom: "4px", cursor: "pointer",
      background: checked ? `${T.green}0D` : "transparent",
      borderLeft: `3px solid ${checked ? T.green : T.stoneLight}`,
      transition: "all 0.3s ease", userSelect: "none",
    }}>
      <div style={{
        width: "18px", height: "18px", borderRadius: "2px",
        border: `2px solid ${checked ? T.green : T.goldDim}`,
        background: checked ? T.green : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s ease", fontSize: "12px", color: T.ink, fontWeight: 900,
      }}>
        {checked ? "✓" : ""}
      </div>
      <span style={{
        fontFamily: FONT_BODY, fontSize: "15px",
        color: checked ? T.green : T.text,
        textDecoration: checked ? "line-through" : "none",
        transition: "all 0.3s ease",
      }}>{text}</span>
    </div>
  );
}

// ── Step item ──
function StepItem({ num, text }) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "14px" }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: "22px", fontWeight: 900, color: T.goldDim, minWidth: "36px", lineHeight: 1 }}>{num}</div>
      <div style={{ fontFamily: FONT_BODY, fontSize: "16px", color: T.text, lineHeight: 1.5, paddingTop: "2px" }}>{text}</div>
    </div>
  );
}

// ── Material tier row ──
function MatRow({ name, desc, tier }) {
  const tierColors = { S: T.emberBright, A: T.goldBright, B: T.parchmentDim };
  const tierBg = { S: `${T.ember}22`, A: `${T.gold}15`, B: `${T.parchment}10` };
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
  );
}

// ── Scroll-reveal ──
function Reveal({ children, delay = 0 }) {
  const [v, setV] = useState(false);
  const r = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (r.current) obs.observe(r.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={r} style={{
      opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)",
      transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    }}>{children}</div>
  );
}

// ── Divider ──
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "48px 0" }}>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${T.goldDim}66, transparent)` }} />
      <div style={{ color: T.goldDim, fontSize: "14px" }}>⬥</div>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${T.goldDim}66, transparent)` }} />
    </div>
  );
}

// ── Chart data ──

// Chart 1: Cumulative gold — mat seller vs crafter
const cumulativeData = [
  { week: "EA", label: "Early Access", seller: 0, crafter: -45000, crafterLabel: "Leveling Cost" },
  { week: "W1", label: "Week 1", seller: 120000, crafter: -20000 },
  { week: "W2", label: "Week 2", seller: 200000, crafter: 40000 },
  { week: "W3", label: "Week 3", seller: 250000, crafter: 180000 },
  { week: "W4", label: "Week 4", seller: 280000, crafter: 380000 },
  { week: "W5", label: "Week 5", seller: 300000, crafter: 600000 },
  { week: "W6", label: "Week 6", seller: 315000, crafter: 850000 },
  { week: "W8", label: "Week 8", seller: 330000, crafter: 1200000 },
  { week: "W10", label: "Week 10", seller: 340000, crafter: 1500000 },
  { week: "W12", label: "Week 12", seller: 345000, crafter: 1750000 },
];

// Chart 2: Dual demand curves
const demandData = [
  { week: "EA", crafter: 90, consumer: 5 },
  { week: "W1", crafter: 100, consumer: 15 },
  { week: "W2", crafter: 75, consumer: 40 },
  { week: "W3", crafter: 40, consumer: 70 },
  { week: "S1", crafter: 20, consumer: 100 },
  { week: "W5", crafter: 12, consumer: 90 },
  { week: "W6", crafter: 8, consumer: 80 },
  { week: "W8", crafter: 5, consumer: 65 },
  { week: "W10", crafter: 3, consumer: 55 },
  { week: "W12", crafter: 2, consumer: 45 },
];

// Chart 3: Service margin (commission per craft)
const marginData = [
  { week: "EA", margin: 5000, label: "Few buyers" },
  { week: "W1", margin: 15000, label: "" },
  { week: "W2", margin: 25000, label: "" },
  { week: "W3", margin: 40000, label: "Season 1" },
  { week: "W4", margin: 65000, label: "" },
  { week: "W5", margin: 80000, label: "PEAK" },
  { week: "W6", margin: 70000, label: "" },
  { week: "W8", margin: 45000, label: "" },
  { week: "W10", margin: 30000, label: "" },
  { week: "W12", margin: 18000, label: "Compression" },
];

// Chart 4: Concentration value per point over time
const concData = [
  { week: "EA", value: 50, label: "Low demand" },
  { week: "W1", value: 80, label: "" },
  { week: "W2", value: 120, label: "" },
  { week: "W3", value: 200, label: "Season 1 opens" },
  { week: "W4", value: 280, label: "" },
  { week: "W5", value: 320, label: "PEAK" },
  { week: "W6", value: 300, label: "" },
  { week: "W8", value: 200, label: "" },
  { week: "W10", value: 140, label: "" },
  { week: "W12", value: 90, label: "Mature" },
];

// ── WC3-themed chart tooltip ──
function WcChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: `linear-gradient(170deg, ${T.stone}, ${T.stoneDark})`,
      border: `1px solid ${T.goldDim}`,
      borderRadius: "2px",
      padding: "10px 14px",
      boxShadow: `0 4px 20px rgba(0,0,0,0.6)`,
    }}>
      <div style={{ fontFamily: FONT_DISPLAY, fontSize: "11px", color: T.goldDim, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>
        {label}
      </div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "2px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
          <span style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.textDim }}>{p.name}:</span>
          <span style={{ fontFamily: FONT_DISPLAY, fontSize: "13px", color: p.color, fontWeight: 700 }}>
            {formatter ? formatter(p.value) : p.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Chart section label ──
function ChartLabel({ children }) {
  return (
    <div style={{
      fontFamily: FONT_DISPLAY, fontSize: "13px", color: T.goldDim,
      letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 700,
      marginBottom: "8px", textAlign: "center",
    }}>{children}</div>
  );
}

// ══════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════
export default function App() {
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&display=swap');
      * { margin: 0; padding: 0; box-sizing: border-box; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
      body { background: ${T.ink}; -webkit-text-stroke: 0.45px rgba(255,255,255,0.1); }
      h1, h2, h3, p, span, div, em, strong { transform: translateZ(0); backface-visibility: hidden; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: ${T.ink}; }
      ::-webkit-scrollbar-thumb { background: ${T.goldDim}; border-radius: 4px; }
      ::selection { background: ${T.voidPurple}55; color: ${T.goldBright}; }
    `;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 50% 0%, ${T.voidDeep}44 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, ${T.ember}08 0%, transparent 40%), ${T.ink}`,
      color: T.text, fontFamily: FONT_BODY,
    }}>
      {/* HERO */}
      <header style={{ padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 49px, ${T.goldDim}08 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, ${T.goldDim}08 50px)`,
          opacity: 0.3,
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <WcBadge color={T.voidPurple}>WoW Midnight · Early Access Strategy</WcBadge>
          <h1 style={{
            fontFamily: FONT_DISPLAY, fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900,
            color: T.gold, lineHeight: 1.1, margin: "24px 0 16px",
            textShadow: `0 2px 20px ${T.gold}33`,
          }}>The Refinery Theory</h1>
          <p style={{
            fontFamily: FONT_BODY, fontSize: "clamp(16px, 2.5vw, 20px)", color: T.parchment,
            fontStyle: "italic", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.5,
          }}>
            Why burning your materials beats selling them — and the economic data to prove it.
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
            <WcBadge color={T.ember}>Crafting</WcBadge>
            <WcBadge color={T.goldBright}>Gold Making</WcBadge>
            <WcBadge color={T.voidPurple}>Market Theory</WcBadge>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "680px", margin: "0 auto", padding: "0 20px 80px" }}>
        {/* THESIS */}
        <Reveal><WcCard highlight>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>⚔ The Thesis</div>
          <p style={{ fontSize: "20px", fontFamily: FONT_DISPLAY, color: T.gold, lineHeight: 1.4, fontWeight: 700 }}>
            The biggest gold play in WoW Midnight isn't selling raw materials on the Auction House.
          </p>
          <p style={{ fontSize: "18px", fontFamily: FONT_DISPLAY, color: T.text, lineHeight: 1.4, marginTop: "12px" }}>
            It's <em>consuming</em> those materials to powerlevel your crafting profession and become one of the first max-skill crafters on your server when Season 1 opens.
          </p>
          <div style={{ marginTop: "20px", padding: "16px 20px", background: `${T.voidDeep}88`, borderLeft: `3px solid ${T.goldBright}`, fontFamily: FONT_DISPLAY, fontSize: "16px", color: T.goldBright, fontWeight: 700, fontStyle: "italic" }}>
            "You're not Cargill. You're the refinery."
          </div>
        </WcCard></Reveal>

        <Divider />

        {/* CONTANGO */}
        <Reveal delay={0.05}><WcCard>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>📈 The Market is in Contango</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6 }}>
            Early Access starts <strong style={{ color: T.goldBright }}>Feb 26</strong>. Full launch is <strong style={{ color: T.goldBright }}>March 2</strong>. Season 1 opens <strong style={{ color: T.goldBright }}>~March 17</strong>.
          </p>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6, marginTop: "12px" }}>
            Spot price on mats is low because the buyer pool is tiny. The futures price — what those mats will be worth when millions of players flood in — is significantly higher. Classic contango.
          </p>
          <p style={{ fontSize: "15px", color: T.parchment, lineHeight: 1.6, marginTop: "16px", fontStyle: "italic" }}>
            But here's the twist: there are <strong>two demand curves</strong> stacked on top of each other.
          </p>
        </WcCard></Reveal>

        <Divider />

        {/* TWO DEMAND CURVES */}
        <Reveal delay={0.05}><WcCard>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>📊 Two Demand Curves</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6 }}>
            The first wave isn't end consumers wanting gear. It's <strong style={{ color: T.ember }}>crafters themselves</strong> burning through massive volumes of materials just to level 1→100, unlock specializations, and hit skill thresholds to craft Rank 2.
          </p>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6, marginTop: "12px" }}>
            Every Jewelcrafter prospecting ore is bidding against every Blacksmith smelting the same ore. They're all racing because the first to hit max skill capture the early commission market when margins are fattest.
          </p>
          <WcSource text="Initial leveling typically reaches skill 60 via trainer recipes, after which rare recipes from reputation vendors, dungeons, and world drops become mandatory." url="Epiccarry — Midnight Professions Tier List" />
          <div style={{ marginTop: "24px" }}>
            <ChartLabel>The Handoff — Two Waves, Not One</ChartLabel>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={demandData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradCrafter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.ember} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={T.ember} stopOpacity={0.03} />
                  </linearGradient>
                  <linearGradient id="gradConsumer" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.blue} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={T.blue} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={`${T.stoneLight}44`} />
                <XAxis dataKey="week" tick={{ fill: T.textDim, fontSize: 11, fontFamily: FONT_DISPLAY }} stroke={T.stoneLight} />
                <YAxis tick={{ fill: T.textDim, fontSize: 11 }} stroke={T.stoneLight} tickFormatter={(v) => `${v}%`} domain={[0, 110]} />
                <RTooltip content={<WcChartTooltip formatter={(v) => `${v}%`} />} />
                <ReferenceLine x="W2" stroke={T.goldBright} strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "✕ HANDOFF", fill: T.goldBright, fontSize: 10, fontFamily: FONT_DISPLAY, position: "insideTopRight" }} />
                <Area type="monotone" dataKey="crafter" name="Crafter Leveling" stroke={T.ember} strokeWidth={3} fill="url(#gradCrafter)" dot={{ fill: T.ember, r: 4, strokeWidth: 2, stroke: T.stoneDark }} activeDot={{ r: 6, fill: T.emberBright }} />
                <Area type="monotone" dataKey="consumer" name="Consumer Gear" stroke={T.blue} strokeWidth={3} fill="url(#gradConsumer)" dot={{ fill: T.blue, r: 4, strokeWidth: 2, stroke: T.stoneDark }} activeDot={{ r: 6, fill: "#7BC4FF" }} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "14px", height: "4px", background: T.ember, borderRadius: "2px" }} />
                <span style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.textDim }}>Crafter leveling demand</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "14px", height: "4px", background: T.blue, borderRadius: "2px" }} />
                <span style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.textDim }}>Consumer gear demand</span>
              </div>
            </div>
            <div style={{
              marginTop: "14px", padding: "12px 16px",
              background: `${T.ember}0A`, borderLeft: `3px solid ${T.ember}`,
              borderRadius: "2px",
            }}>
              <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.parchment, lineHeight: 1.5 }}>
                <strong style={{ color: T.ember }}>Orange peaks first</strong> — that's crafters burning mats to level. It's nearly exhausted by Week 3. Then <strong style={{ color: T.blue }}>blue takes over</strong> — actual players ordering gear. The crossover around Week 2 is where being a finished crafter starts printing money, because the buyers have arrived but most crafters are still leveling.
              </p>
            </div>
          </div>
        </WcCard></Reveal>

        <Divider />

        {/* REFINERY MODEL */}
        <Reveal delay={0.05}><WcCard>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>🏭 The Refinery Model</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6 }}>
            Same dynamic as a refinery buildout. Before anyone can sell gasoline, refineries buy crude just to get operational. That demand comes <em>first</em> and is <strong style={{ color: T.ember }}>price-insensitive</strong> because the ROI on being an early max-skill crafter is enormous.
          </p>
          <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ padding: "16px", background: `${T.red}0D`, borderLeft: `3px solid ${T.red}`, borderRadius: "2px" }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: "12px", color: T.red, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Sell Mats</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: "14px", color: T.textDim, marginTop: "6px" }}>One markup. One ride up, one ride down. Done.</div>
            </div>
            <div style={{ padding: "16px", background: `${T.green}0D`, borderLeft: `3px solid ${T.green}`, borderRadius: "2px" }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontSize: "12px", color: T.green, fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Become the Crafter</div>
              <div style={{ fontFamily: FONT_BODY, fontSize: "14px", color: T.textDim, marginTop: "6px" }}>Recurring toll booth. Every craft, every recraft, all season.</div>
            </div>
          </div>
          <div style={{ marginTop: "28px" }}>
            <ChartLabel>⚔ The Crossover — Cumulative Gold Earned</ChartLabel>
            <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.textDim, textAlign: "center", marginBottom: "12px" }}>
              The crafter goes negative early (leveling cost), then surpasses the mat seller permanently around Week 3.
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={cumulativeData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradSeller" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.red} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={T.red} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradCrafterGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.goldBright} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={T.goldBright} stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={`${T.stoneLight}66`} />
                <XAxis dataKey="week" tick={{ fill: T.textDim, fontSize: 11, fontFamily: FONT_DISPLAY }} stroke={T.stoneLight} />
                <YAxis tick={{ fill: T.textDim, fontSize: 10 }} stroke={T.stoneLight} tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${Math.round(v/1000)}k` : v} />
                <RTooltip content={<WcChartTooltip formatter={(v) => `${v >= 0 ? '' : '-'}${Math.abs(v).toLocaleString()}g`} />} />
                <ReferenceLine y={0} stroke={T.stoneLight} strokeWidth={1} />
                <ReferenceLine x="W3" stroke={T.goldBright} strokeDasharray="5 5" strokeWidth={1.5} label={{ value: "CROSSOVER", fill: T.goldBright, fontSize: 10, fontFamily: FONT_DISPLAY, position: "top" }} />
                <Area type="monotone" dataKey="seller" name="Mat Seller" stroke={T.red} strokeWidth={2.5} fill="url(#gradSeller)" dot={{ fill: T.red, r: 3, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="crafter" name="Crafter" stroke={T.goldBright} strokeWidth={2.5} fill="url(#gradCrafterGold)" dot={{ fill: T.goldBright, r: 3, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "12px", height: "3px", background: T.red, borderRadius: "2px" }} />
                <span style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.textDim }}>Sell mats on AH</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "12px", height: "3px", background: T.goldBright, borderRadius: "2px" }} />
                <span style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.textDim }}>Burn mats → craft commissions</span>
              </div>
            </div>
          </div>
        </WcCard></Reveal>

        <Divider />

        {/* CONCENTRATION MATH */}
        <Reveal delay={0.05}><WcCard highlight>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>🧪 The Concentration Math</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6, marginBottom: "20px" }}>
            Concentration caps at <strong style={{ color: T.goldBright }}>1,000</strong> and refills at <strong style={{ color: T.goldBright }}>10/hour</strong>. In Midnight's two-rank system, it's the only way to guarantee Rank 2 quality if your skill isn't maxed.
          </p>
          <StatRow label="Profit without Concentration" value="6,000g" color={T.textDim} delay={0} />
          <StatRow label="Profit WITH Concentration" value="18,000g" color={T.goldBright} delay={0.1} />
          <StatRow label="Extra profit per craft" value="+12,000g" color={T.ember} delay={0.2} />
          <StatRow label="Value per Concentration point" value="~200g" color={T.gold} delay={0.3} />
          <StatRow label="Full bar value (1,000 pts)" value="~200,000g" color={T.emberBright} delay={0.4} />
          <WcSource text="Without Concentration, profit is 6,000g. With Concentration, profit is 18,000g. If it costs 60 Concentration, value per point = 200g." url="Boostroom — Price Crafted Gear in Midnight" />
          <div style={{ marginTop: "24px" }}>
            <ChartLabel>Gold Value per Concentration Point</ChartLabel>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={concData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradConc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.voidPurple} stopOpacity={0.6} />
                    <stop offset="100%" stopColor={T.voidPurple} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={`${T.stoneLight}66`} />
                <XAxis dataKey="week" tick={{ fill: T.textDim, fontSize: 11, fontFamily: FONT_DISPLAY }} stroke={T.stoneLight} />
                <YAxis tick={{ fill: T.textDim, fontSize: 10 }} stroke={T.stoneLight} tickFormatter={(v) => `${v}g`} />
                <RTooltip content={<WcChartTooltip formatter={(v) => `${v}g / point`} />} />
                <ReferenceLine x="W5" stroke={T.voidPurple} strokeDasharray="5 5" label={{ value: "320g/pt", fill: T.voidPurple, fontSize: 10, fontFamily: FONT_DISPLAY, position: "top" }} />
                <Area type="monotone" dataKey="value" name="Gold / Point" stroke={T.voidPurple} strokeWidth={2.5} fill="url(#gradConc)" dot={{ fill: T.voidPurple, r: 3, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
            <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.parchmentDim, textAlign: "center", marginTop: "8px", fontStyle: "italic" }}>
              At peak, a full 1,000-point bar is worth ~320,000g. That's a daily passive income stream from doing nothing but existing as a max crafter.
            </p>
          </div>
        </WcCard></Reveal>

        <Divider />

        {/* LARIAT PRECEDENT */}
        <Reveal delay={0.05}><WcCard>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>📿 Historical Precedent: The Elemental Lariat</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6 }}>In Dragonflight, the Elemental Lariat (JC necklace) was BiS for nearly every spec.</p>
          <div style={{ marginTop: "16px" }}>
            <StatRow label="Day 1 commission" value="10–25k" color={T.textDim} delay={0} />
            <StatRow label="Peak commission" value="250,000g" color={T.goldBright} delay={0.1} />
            <StatRow label="Recipe price" value="5–10M gold" color={T.ember} delay={0.2} />
            <StatRow label="One crafter's total earnings" value="~30–50M gold" color={T.emberBright} delay={0.3} />
          </div>
          <p style={{ fontSize: "15px", color: T.parchment, lineHeight: 1.6, marginTop: "16px", fontStyle: "italic" }}>
            Raw mat sellers got one ride up and one ride down. The crafter with the rare recipe got a toll booth that printed gold for months.
          </p>
          <WcSource text="Commission and recipe price data from community discussions. Crafters demanded up to 250k for the craft." url="MMO-Champion — Workorder Pricing Thread" />
        </WcCard></Reveal>

        <Divider />

        {/* TIMELINE */}
        <Reveal delay={0.05}><WcCard>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: 700 }}>⏳ The Service Margin Inverts</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6, marginBottom: "24px" }}>
            The service margin actually <em>increases</em> after launch. During Weeks 4–8, the gap between Master Crafters and Budget Crafters widens and commissions spike.
          </p>
          <PhaseBlock week="Weeks 1–3" label="Reagent Scarcity" desc="High margins on raw materials. Concentration arbitrage begins." idx={0} />
          <PhaseBlock week="Weeks 4–8" label="Stabilization" desc="Master vs Budget Crafter gap widens. High-end gear commissions spike." idx={1} />
          <PhaseBlock week="Weeks 8+" label="Mature Market" desc="Margins compress. Success shifts to volume and vertical integration." idx={2} />
          <WcSource text="Economic phase forecasting from Epiccarry's Midnight Professions analysis." url="Epiccarry — Midnight Professions Guide" />
          <div style={{ marginTop: "24px" }}>
            <ChartLabel>Commission per Craft Over Time</ChartLabel>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={marginData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.goldBright} />
                    <stop offset="100%" stopColor={T.goldDim} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={`${T.stoneLight}66`} vertical={false} />
                <XAxis dataKey="week" tick={{ fill: T.textDim, fontSize: 11, fontFamily: FONT_DISPLAY }} stroke={T.stoneLight} />
                <YAxis tick={{ fill: T.textDim, fontSize: 10 }} stroke={T.stoneLight} tickFormatter={(v) => `${Math.round(v/1000)}k`} />
                <RTooltip content={<WcChartTooltip formatter={(v) => `${v.toLocaleString()}g`} />} />
                <ReferenceLine x="W5" stroke={T.emberBright} strokeDasharray="5 5" label={{ value: "PEAK", fill: T.emberBright, fontSize: 10, fontFamily: FONT_DISPLAY, position: "top" }} />
                <Bar dataKey="margin" name="Commission" fill="url(#gradBar)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ fontFamily: FONT_BODY, fontSize: "13px", color: T.parchmentDim, textAlign: "center", marginTop: "8px", fontStyle: "italic" }}>
              Margins don't peak at launch. They peak 4–5 weeks in, when Spark-gated gear goes live and only maxed crafters can fill orders.
            </p>
          </div>
        </WcCard></Reveal>

        <Divider />

        {/* BOTTLENECK */}
        <Reveal delay={0.05}><WcCard>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>🔒 The Bottleneck Stack</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6, marginBottom: "20px" }}>
            Every gate burns materials. The mats you farm during early access are fuel to clear these faster than everyone else. <span style={{ color: T.textDim, fontSize: "13px" }}>(tap to check off)</span>
          </p>
          <GateItem text="Profession skill to 100" />
          <GateItem text="Specialization tree points invested" />
          <GateItem text="Profession gear crafted (Blue = +40 skill)" />
          <GateItem text="Rare recipes from rep vendors & world drops" />
          <GateItem text="Enough Concentration banked for Rank 2 guarantees" />
          <GateItem text="Artisan's Moxie currency accumulated" />
          <WcSource text="Master Crafters win the service markets by investing in the skill depth required to fulfill high-difficulty gear orders." url="Epiccarry — Midnight Professions Guide" />
        </WcCard></Reveal>

        <Divider />

        {/* MATERIALS */}
        <Reveal delay={0.05}><WcCard>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontWeight: 700 }}>💎 Key Materials to Target</div>
          <p style={{ fontSize: "16px", color: T.text, lineHeight: 1.6, marginBottom: "20px" }}>Whether stockpiling to sell or burning to level, these are critical:</p>
          <MatRow name="Mote of Pure Void" desc="Rare gathering drop. Used in high-end recipes across ALL professions." tier="S" />
          <MatRow name="Mote of Light / Primal Energy / Wild Magic" desc="Universal motes. Transmutable via Alchemy (10:8 ratio)." tier="A" />
          <MatRow name="Nocturnal Lotus" desc="Rare herb. Core flask ingredient for raid consumables." tier="A" />
          <MatRow name="Ores & Herbs (all types)" desc="Burned en masse for leveling by BS, JC, Eng, Alch, Inscription." tier="A" />
          <MatRow name="Stabilized Derivate" desc="Alchemy intermediate. Used in tons of recipes + recipe unlocks." tier="B" />
          <MatRow name="Lumber" desc="Required for ALL housing decor recipes. New demand sink." tier="B" />
          <WcSource text="Mote of Pure Void is used in various rare crafting recipes, making it important for high-end crafting and premium markets." url="OnlyFarms — Midnight Profession Changes" />
        </WcCard></Reveal>

        <Divider />

        {/* THE PLAY */}
        <Reveal delay={0.05}><WcCard highlight style={{ background: `linear-gradient(170deg, #1a1025 0%, ${T.stoneDark} 100%)` }}>
          <div style={{ fontSize: "11px", fontFamily: FONT_DISPLAY, color: T.goldDim, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px", fontWeight: 700 }}>🎯 The Play</div>
          <StepItem num="01" text="Farm gathering routes hard during Early Access — ores, herbs, skins, Motes" />
          <StepItem num="02" text="Burn mats to powerlevel your crafting profession to max skill" />
          <StepItem num="03" text="Lock in your specialization tree for high-demand recipes" />
          <StepItem num="04" text="Hit skill thresholds + craft profession gear for +40 skill" />
          <StepItem num="05" text="Be at the crafting station in Silvermoon when Season 1 drops" />
          <StepItem num="06" text="Take commissions. Charge for Concentration. Print gold." />
          <div style={{
            marginTop: "24px", padding: "20px",
            background: `${T.voidDeep}88`, borderLeft: `3px solid ${T.goldBright}`, borderRadius: "2px",
          }}>
            <p style={{ fontFamily: FONT_DISPLAY, fontSize: "15px", color: T.goldBright, lineHeight: 1.5, fontWeight: 700, fontStyle: "italic" }}>
              You eat the commodity upside as an input cost to capture the monopoly-ish service margin on the other side. The mats are worth more to you as skill points than as AH listings.
            </p>
          </div>
        </WcCard></Reveal>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "60px", padding: "24px" }}>
          <div style={{ fontFamily: FONT_DISPLAY, fontSize: "14px", color: T.goldDim, letterSpacing: "1px" }}>
            Fill those grain elevators, boys. 🌙
          </div>
          <div style={{ fontFamily: FONT_BODY, fontSize: "12px", color: T.textDim, marginTop: "8px" }}>
            Research compiled Feb 26, 2026 · Sources cited inline
          </div>
        </div>
      </main>
    </div>
  );
}
