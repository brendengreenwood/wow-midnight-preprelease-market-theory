import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip as RTooltip, ResponsiveContainer, ReferenceLine,
} from "recharts"
import {
  Card, CardTitle, CardContent, Badge, Separator, Reveal,
  StatRow, PhaseBlock, GateItem, StepItem, MatRow, WcSource, ChartLabel, WcChartTooltip,
} from "./components"
import { cumulativeData, demandData, marginData, concData } from "./data/charts"

const COLORS = {
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
  text: "#E8DCC8",
  textDim: "#9E9480",
  green: "#1EBB4F",
  blue: "#4A9EFF",
  red: "#E03E3E",
}

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_50%_0%,#3D1F6D44_0%,transparent_60%),radial-gradient(ellipse_at_80%_100%,#D4551A08_0%,transparent_40%),#0D0B08]">
      {/* HERO */}
      <header className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `repeating-linear-gradient(0deg, transparent, transparent 49px, ${COLORS.goldDim}08 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, ${COLORS.goldDim}08 50px)`,
          }}
        />
        <div className="relative z-10">
          <Badge variant="purple">WoW Midnight · Early Access Strategy</Badge>
          <h1 className="fantasy text-[clamp(32px,6vw,56px)] font-black text-[var(--wc-gold)] leading-tight my-6 drop-shadow-[0_2px_20px_rgba(201,168,76,0.2)]">
            The Refinery Theory
          </h1>
          <p className="text-[clamp(16px,2.5vw,20px)] text-[var(--wc-parchment)] italic max-w-[520px] mx-auto mb-6 leading-relaxed">
            Why burning your materials beats selling them — and the economic data to prove it.
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Badge variant="ember">Crafting</Badge>
            <Badge variant="gold">Gold Making</Badge>
            <Badge variant="purple">Market Theory</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-5 pb-20">
        {/* THESIS */}
        <Reveal>
          <Card highlight>
            <CardTitle>⚔ The Thesis</CardTitle>
            <CardContent>
              <p className="fantasy text-xl text-[var(--wc-gold)] leading-snug font-bold">
                The biggest gold play in WoW Midnight isn't selling raw materials on the Auction House.
              </p>
              <p className="fantasy text-lg text-[var(--wc-text)] leading-snug mt-3">
                It's <em>consuming</em> those materials to powerlevel your crafting profession and become one of the first max-skill crafters on your server when Season 1 opens.
              </p>
              <div className="mt-5 px-5 py-4 bg-[var(--wc-void-deep)]/50 border-l-[3px] border-l-[var(--wc-gold-bright)]">
                <p className="fantasy text-base text-[var(--wc-gold-bright)] font-bold italic">
                  "You're not Cargill. You're the refinery."
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* CONTANGO */}
        <Reveal delay={0.05}>
          <Card>
            <CardTitle>📈 The Market is in Contango</CardTitle>
            <CardContent>
              <p>
                Early Access starts <strong className="text-[var(--wc-gold-bright)]">Feb 26</strong>. Full launch is <strong className="text-[var(--wc-gold-bright)]">March 2</strong>. Season 1 opens <strong className="text-[var(--wc-gold-bright)]">~March 17</strong>.
              </p>
              <p className="mt-3">
                Spot price on mats is low because the buyer pool is tiny. The futures price — what those mats will be worth when millions of players flood in — is significantly higher. Classic contango.
              </p>
              <p className="mt-4 text-[15px] text-[var(--wc-parchment)] italic">
                But here's the twist: there are <strong>two demand curves</strong> stacked on top of each other.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* TWO DEMAND CURVES */}
        <Reveal delay={0.05}>
          <Card>
            <CardTitle>📊 Two Demand Curves</CardTitle>
            <CardContent>
              <p>
                The first wave isn't end consumers wanting gear. It's <strong className="text-[var(--wc-ember)]">crafters themselves</strong> burning through massive volumes of materials just to level 1→100, unlock specializations, and hit skill thresholds to craft Rank 2.
              </p>
              <p className="mt-3">
                Every Jewelcrafter prospecting ore is bidding against every Blacksmith smelting the same ore. They're all racing because the first to hit max skill capture the early commission market when margins are fattest.
              </p>
              <WcSource text="Initial leveling typically reaches skill 60 via trainer recipes, after which rare recipes from reputation vendors, dungeons, and world drops become mandatory." url="Epiccarry — Midnight Professions Tier List" />
              <div className="mt-6">
                <ChartLabel>The Handoff — Two Waves, Not One</ChartLabel>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={demandData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradCrafter" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.ember} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={COLORS.ember} stopOpacity={0.03} />
                      </linearGradient>
                      <linearGradient id="gradConsumer" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.blue} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={COLORS.blue} stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${COLORS.stoneLight}44`} />
                    <XAxis dataKey="week" tick={{ fill: COLORS.textDim, fontSize: 11 }} stroke={COLORS.stoneLight} className="fantasy" />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 11 }} stroke={COLORS.stoneLight} tickFormatter={(v) => `${v}%`} domain={[0, 110]} />
                    <RTooltip content={<WcChartTooltip formatter={(v) => `${v}%`} />} />
                    <ReferenceLine x="W2" stroke={COLORS.goldBright} strokeDasharray="4 4" strokeWidth={1.5} label={{ value: "✕ HANDOFF", fill: COLORS.goldBright, fontSize: 10, position: "insideTopRight" }} />
                    <Area type="monotone" dataKey="crafter" name="Crafter Leveling" stroke={COLORS.ember} strokeWidth={3} fill="url(#gradCrafter)" dot={{ fill: COLORS.ember, r: 4, strokeWidth: 2, stroke: COLORS.stoneDark }} activeDot={{ r: 6, fill: COLORS.emberBright }} />
                    <Area type="monotone" dataKey="consumer" name="Consumer Gear" stroke={COLORS.blue} strokeWidth={3} fill="url(#gradConsumer)" dot={{ fill: COLORS.blue, r: 4, strokeWidth: 2, stroke: COLORS.stoneDark }} activeDot={{ r: 6, fill: "#7BC4FF" }} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-5 justify-center mt-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-1 rounded-sm" style={{ background: COLORS.ember }} />
                    <span className="text-xs text-[var(--wc-text-dim)]">Crafter leveling demand</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-1 rounded-sm" style={{ background: COLORS.blue }} />
                    <span className="text-xs text-[var(--wc-text-dim)]">Consumer gear demand</span>
                  </div>
                </div>
                <div className="mt-3.5 px-4 py-3 bg-[var(--wc-ember)]/5 border-l-[3px] border-l-[var(--wc-ember)] rounded-sm">
                  <p className="text-[13px] text-[var(--wc-parchment)] leading-relaxed">
                    <strong className="text-[var(--wc-ember)]">Orange peaks first</strong> — that's crafters burning mats to level. It's nearly exhausted by Week 3. Then <strong className="text-[var(--wc-blue)]">blue takes over</strong> — actual players ordering gear. The crossover around Week 2 is where being a finished crafter starts printing money, because the buyers have arrived but most crafters are still leveling.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* REFINERY MODEL */}
        <Reveal delay={0.05}>
          <Card>
            <CardTitle>🏭 The Refinery Model</CardTitle>
            <CardContent>
              <p>
                Same dynamic as a refinery buildout. Before anyone can sell gasoline, refineries buy crude just to get operational. That demand comes <em>first</em> and is <strong className="text-[var(--wc-ember)]">price-insensitive</strong> because the ROI on being an early max-skill crafter is enormous.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="p-4 bg-[var(--wc-red)]/5 border-l-[3px] border-l-[var(--wc-red)] rounded-sm">
                  <div className="fantasy text-xs text-[var(--wc-red)] font-bold tracking-[1px] uppercase">Sell Mats</div>
                  <div className="text-sm text-[var(--wc-text-dim)] mt-1.5">One markup. One ride up, one ride down. Done.</div>
                </div>
                <div className="p-4 bg-[var(--wc-green)]/5 border-l-[3px] border-l-[var(--wc-green)] rounded-sm">
                  <div className="fantasy text-xs text-[var(--wc-green)] font-bold tracking-[1px] uppercase">Become the Crafter</div>
                  <div className="text-sm text-[var(--wc-text-dim)] mt-1.5">Recurring toll booth. Every craft, every recraft, all season.</div>
                </div>
              </div>
              <div className="mt-7">
                <ChartLabel>⚔ The Crossover — Cumulative Gold Earned</ChartLabel>
                <p className="text-[13px] text-[var(--wc-text-dim)] text-center mb-3">
                  The crafter goes negative early (leveling cost), then surpasses the mat seller permanently around Week 3.
                </p>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={cumulativeData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradSeller" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.red} stopOpacity={0.4} />
                        <stop offset="100%" stopColor={COLORS.red} stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="gradCrafterGold" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.goldBright} stopOpacity={0.5} />
                        <stop offset="100%" stopColor={COLORS.goldBright} stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${COLORS.stoneLight}66`} />
                    <XAxis dataKey="week" tick={{ fill: COLORS.textDim, fontSize: 11 }} stroke={COLORS.stoneLight} className="fantasy" />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 10 }} stroke={COLORS.stoneLight} tickFormatter={(v) => v >= 1000000 ? `${(v/1000000).toFixed(1)}M` : v >= 1000 ? `${Math.round(v/1000)}k` : v} />
                    <RTooltip content={<WcChartTooltip formatter={(v) => `${v >= 0 ? "" : "-"}${Math.abs(v).toLocaleString()}g`} />} />
                    <ReferenceLine y={0} stroke={COLORS.stoneLight} strokeWidth={1} />
                    <ReferenceLine x="W3" stroke={COLORS.goldBright} strokeDasharray="5 5" strokeWidth={1.5} label={{ value: "CROSSOVER", fill: COLORS.goldBright, fontSize: 10, position: "top" }} />
                    <Area type="monotone" dataKey="seller" name="Mat Seller" stroke={COLORS.red} strokeWidth={2.5} fill="url(#gradSeller)" dot={{ fill: COLORS.red, r: 3, strokeWidth: 0 }} />
                    <Area type="monotone" dataKey="crafter" name="Crafter" stroke={COLORS.goldBright} strokeWidth={2.5} fill="url(#gradCrafterGold)" dot={{ fill: COLORS.goldBright, r: 3, strokeWidth: 0 }} />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="flex gap-5 justify-center mt-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-[3px] rounded-sm" style={{ background: COLORS.red }} />
                    <span className="text-xs text-[var(--wc-text-dim)]">Sell mats on AH</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-[3px] rounded-sm" style={{ background: COLORS.goldBright }} />
                    <span className="text-xs text-[var(--wc-text-dim)]">Burn mats → craft commissions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* CONCENTRATION MATH */}
        <Reveal delay={0.05}>
          <Card highlight>
            <CardTitle>🧪 The Concentration Math</CardTitle>
            <CardContent>
              <p className="mb-5">
                Concentration caps at <strong className="text-[var(--wc-gold-bright)]">1,000</strong> and refills at <strong className="text-[var(--wc-gold-bright)]">10/hour</strong>. In Midnight's two-rank system, it's the only way to guarantee Rank 2 quality if your skill isn't maxed.
              </p>
              <StatRow label="Profit without Concentration" value="6,000g" color="dim" delay={0} />
              <StatRow label="Profit WITH Concentration" value="18,000g" color="gold-bright" delay={0.1} />
              <StatRow label="Extra profit per craft" value="+12,000g" color="ember" delay={0.2} />
              <StatRow label="Value per Concentration point" value="~200g" color="gold" delay={0.3} />
              <StatRow label="Full bar value (1,000 pts)" value="~200,000g" color="ember-bright" delay={0.4} />
              <WcSource text="Without Concentration, profit is 6,000g. With Concentration, profit is 18,000g. If it costs 60 Concentration, value per point = 200g." url="Boostroom — Price Crafted Gear in Midnight" />
              <div className="mt-6">
                <ChartLabel>Gold Value per Concentration Point</ChartLabel>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={concData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradConc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.voidPurple} stopOpacity={0.6} />
                        <stop offset="100%" stopColor={COLORS.voidPurple} stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${COLORS.stoneLight}66`} />
                    <XAxis dataKey="week" tick={{ fill: COLORS.textDim, fontSize: 11 }} stroke={COLORS.stoneLight} className="fantasy" />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 10 }} stroke={COLORS.stoneLight} tickFormatter={(v) => `${v}g`} />
                    <RTooltip content={<WcChartTooltip formatter={(v) => `${v}g / point`} />} />
                    <ReferenceLine x="W5" stroke={COLORS.voidPurple} strokeDasharray="5 5" label={{ value: "320g/pt", fill: COLORS.voidPurple, fontSize: 10, position: "top" }} />
                    <Area type="monotone" dataKey="value" name="Gold / Point" stroke={COLORS.voidPurple} strokeWidth={2.5} fill="url(#gradConc)" dot={{ fill: COLORS.voidPurple, r: 3, strokeWidth: 0 }} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-[13px] text-[var(--wc-parchment-dim)] text-center mt-2 italic">
                  At peak, a full 1,000-point bar is worth ~320,000g. That's a daily passive income stream from doing nothing but existing as a max crafter.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* LARIAT PRECEDENT */}
        <Reveal delay={0.05}>
          <Card>
            <CardTitle>📿 Historical Precedent: The Elemental Lariat</CardTitle>
            <CardContent>
              <p>In Dragonflight, the Elemental Lariat (JC necklace) was BiS for nearly every spec.</p>
              <div className="mt-4">
                <StatRow label="Day 1 commission" value="10–25k" color="dim" delay={0} />
                <StatRow label="Peak commission" value="250,000g" color="gold-bright" delay={0.1} />
                <StatRow label="Recipe price" value="5–10M gold" color="ember" delay={0.2} />
                <StatRow label="One crafter's total earnings" value="~30–50M gold" color="ember-bright" delay={0.3} />
              </div>
              <p className="text-[15px] text-[var(--wc-parchment)] mt-4 italic leading-relaxed">
                Raw mat sellers got one ride up and one ride down. The crafter with the rare recipe got a toll booth that printed gold for months.
              </p>
              <WcSource text="Commission and recipe price data from community discussions. Crafters demanded up to 250k for the craft." url="MMO-Champion — Workorder Pricing Thread" />
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* TIMELINE */}
        <Reveal delay={0.05}>
          <Card>
            <CardTitle>⏳ The Service Margin Inverts</CardTitle>
            <CardContent>
              <p className="mb-6">
                The service margin actually <em>increases</em> after launch. During Weeks 4–8, the gap between Master Crafters and Budget Crafters widens and commissions spike.
              </p>
              <PhaseBlock week="Weeks 1–3" label="Reagent Scarcity" desc="High margins on raw materials. Concentration arbitrage begins." idx={0} />
              <PhaseBlock week="Weeks 4–8" label="Stabilization" desc="Master vs Budget Crafter gap widens. High-end gear commissions spike." idx={1} />
              <PhaseBlock week="Weeks 8+" label="Mature Market" desc="Margins compress. Success shifts to volume and vertical integration." idx={2} />
              <WcSource text="Economic phase forecasting from Epiccarry's Midnight Professions analysis." url="Epiccarry — Midnight Professions Guide" />
              <div className="mt-6">
                <ChartLabel>Commission per Craft Over Time</ChartLabel>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={marginData} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.goldBright} />
                        <stop offset="100%" stopColor={COLORS.goldDim} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={`${COLORS.stoneLight}66`} vertical={false} />
                    <XAxis dataKey="week" tick={{ fill: COLORS.textDim, fontSize: 11 }} stroke={COLORS.stoneLight} className="fantasy" />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 10 }} stroke={COLORS.stoneLight} tickFormatter={(v) => `${Math.round(v/1000)}k`} />
                    <RTooltip content={<WcChartTooltip formatter={(v) => `${v.toLocaleString()}g`} />} />
                    <ReferenceLine x="W5" stroke={COLORS.emberBright} strokeDasharray="5 5" label={{ value: "PEAK", fill: COLORS.emberBright, fontSize: 10, position: "top" }} />
                    <Bar dataKey="margin" name="Commission" fill="url(#gradBar)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p className="text-[13px] text-[var(--wc-parchment-dim)] text-center mt-2 italic">
                  Margins don't peak at launch. They peak 4–5 weeks in, when Spark-gated gear goes live and only maxed crafters can fill orders.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* BOTTLENECK */}
        <Reveal delay={0.05}>
          <Card>
            <CardTitle>🔒 The Bottleneck Stack</CardTitle>
            <CardContent>
              <p className="mb-5">
                Every gate burns materials. The mats you farm during early access are fuel to clear these faster than everyone else. <span className="text-[var(--wc-text-dim)] text-[13px]">(tap to check off)</span>
              </p>
              <GateItem text="Profession skill to 100" />
              <GateItem text="Specialization tree points invested" />
              <GateItem text="Profession gear crafted (Blue = +40 skill)" />
              <GateItem text="Rare recipes from rep vendors & world drops" />
              <GateItem text="Enough Concentration banked for Rank 2 guarantees" />
              <GateItem text="Artisan's Moxie currency accumulated" />
              <WcSource text="Master Crafters win the service markets by investing in the skill depth required to fulfill high-difficulty gear orders." url="Epiccarry — Midnight Professions Guide" />
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* MATERIALS */}
        <Reveal delay={0.05}>
          <Card>
            <CardTitle>💎 Key Materials to Target</CardTitle>
            <CardContent>
              <p className="mb-5">Whether stockpiling to sell or burning to level, these are critical:</p>
              <MatRow name="Mote of Pure Void" desc="Rare gathering drop. Used in high-end recipes across ALL professions." tier="S" />
              <MatRow name="Mote of Light / Primal Energy / Wild Magic" desc="Universal motes. Transmutable via Alchemy (10:8 ratio)." tier="A" />
              <MatRow name="Nocturnal Lotus" desc="Rare herb. Core flask ingredient for raid consumables." tier="A" />
              <MatRow name="Ores & Herbs (all types)" desc="Burned en masse for leveling by BS, JC, Eng, Alch, Inscription." tier="A" />
              <MatRow name="Stabilized Derivate" desc="Alchemy intermediate. Used in tons of recipes + recipe unlocks." tier="B" />
              <MatRow name="Lumber" desc="Required for ALL housing decor recipes. New demand sink." tier="B" />
              <WcSource text="Mote of Pure Void is used in various rare crafting recipes, making it important for high-end crafting and premium markets." url="OnlyFarms — Midnight Profession Changes" />
            </CardContent>
          </Card>
        </Reveal>

        <Separator />

        {/* THE PLAY */}
        <Reveal delay={0.05}>
          <Card highlight className="bg-gradient-to-br from-[#1a1025] to-[var(--wc-stone-dark)]">
            <CardTitle>🎯 The Play</CardTitle>
            <CardContent>
              <div className="mt-2">
                <StepItem num="01" text="Farm gathering routes hard during Early Access — ores, herbs, skins, Motes" />
                <StepItem num="02" text="Burn mats to powerlevel your crafting profession to max skill" />
                <StepItem num="03" text="Lock in your specialization tree for high-demand recipes" />
                <StepItem num="04" text="Hit skill thresholds + craft profession gear for +40 skill" />
                <StepItem num="05" text="Be at the crafting station in Silvermoon when Season 1 drops" />
                <StepItem num="06" text="Take commissions. Charge for Concentration. Print gold." />
              </div>
              <div className="mt-6 p-5 bg-[var(--wc-void-deep)]/50 border-l-[3px] border-l-[var(--wc-gold-bright)] rounded-sm">
                <p className="fantasy text-[15px] text-[var(--wc-gold-bright)] leading-relaxed font-bold italic">
                  You eat the commodity upside as an input cost to capture the monopoly-ish service margin on the other side. The mats are worth more to you as skill points than as AH listings.
                </p>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        {/* FOOTER */}
        <div className="text-center mt-16 px-6">
          <div className="fantasy text-sm text-[var(--wc-gold-dim)] tracking-[1px]">
            Fill those grain elevators, boys.
          </div>
          <div className="text-xs text-[var(--wc-text-dim)] mt-2">
            Research compiled Feb 26, 2026 · Sources cited inline
          </div>
        </div>
      </main>
    </div>
  )
}
