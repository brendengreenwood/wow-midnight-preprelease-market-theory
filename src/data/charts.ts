export interface CumulativeDataPoint {
  week: string
  label: string
  seller: number
  crafter: number
  crafterLabel?: string
}

export interface DemandDataPoint {
  week: string
  crafter: number
  consumer: number
}

export interface MarginDataPoint {
  week: string
  margin: number
  label: string
}

export interface ConcentrationDataPoint {
  week: string
  value: number
  label: string
}

export const cumulativeData: CumulativeDataPoint[] = [
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
]

export const demandData: DemandDataPoint[] = [
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
]

export const marginData: MarginDataPoint[] = [
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
]

export const concData: ConcentrationDataPoint[] = [
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
]
