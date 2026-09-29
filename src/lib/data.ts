export type LedgerStatus = "Counted" | "Refunded" | "Disputed" | "Adjusted";
export type InvoiceStatus = "Not issued" | "Draft" | "Issued" | "Paid" | "Overdue";

export type LedgerItem = {
  date: string;
  ref: string;
  amount: number;
  source: string;
  status: LedgerStatus;
};

export type Tech = {
  id: string;
  name: string;
  split: number;
  verified: number;
  invoiceStatus: InvoiceStatus;
  invoiceNumber: string;
  ledger: LedgerItem[];
};

export const MONTH_LABEL = "September 2026";
export const MONTH_SHORT = "Sept";
export const MONTH_NAME = "September";

export const techs: Tech[] = [
  {
    id: "thandi-mokoena",
    name: "Thandi Mokoena",
    split: 30,
    verified: 12450,
    invoiceStatus: "Issued",
    invoiceNumber: "INV-2026-09-01",
    ledger: [
      { date: "2026-09-02", ref: "BK-1041", amount: 1850, source: "Card", status: "Counted" },
      { date: "2026-09-05", ref: "BK-1058", amount: 2400, source: "EFT", status: "Counted" },
      { date: "2026-09-09", ref: "BK-1066", amount: 1200, source: "Cash", status: "Adjusted" },
      { date: "2026-09-14", ref: "BK-1079", amount: 3100, source: "Card", status: "Counted" },
      { date: "2026-09-18", ref: "BK-1088", amount: 900, source: "Card", status: "Refunded" },
      { date: "2026-09-23", ref: "BK-1102", amount: 3000, source: "EFT", status: "Counted" },
    ],
  },
  {
    id: "leigh-adams",
    name: "Leigh Adams",
    split: 40,
    verified: 14300,
    invoiceStatus: "Draft",
    invoiceNumber: "INV-2026-09-02",
    ledger: [
      { date: "2026-09-03", ref: "BK-1046", amount: 2600, source: "Card", status: "Counted" },
      { date: "2026-09-08", ref: "BK-1062", amount: 3200, source: "Card", status: "Counted" },
      { date: "2026-09-12", ref: "BK-1093", amount: 150, source: "Cash", status: "Disputed" },
      { date: "2026-09-16", ref: "BK-1084", amount: 4100, source: "EFT", status: "Counted" },
      { date: "2026-09-21", ref: "BK-1097", amount: 2250, source: "Card", status: "Counted" },
      { date: "2026-09-27", ref: "BK-1114", amount: 2000, source: "EFT", status: "Counted" },
    ],
  },
  {
    id: "nomsa-dlamini",
    name: "Nomsa Dlamini",
    split: 40,
    verified: 9500,
    invoiceStatus: "Overdue",
    invoiceNumber: "INV-2026-09-03",
    ledger: [
      { date: "2026-09-04", ref: "BK-1049", amount: 1500, source: "Cash", status: "Counted" },
      { date: "2026-09-10", ref: "BK-1071", amount: 2750, source: "Card", status: "Counted" },
      { date: "2026-09-15", ref: "BK-1081", amount: 1250, source: "EFT", status: "Adjusted" },
      { date: "2026-09-19", ref: "BK-1090", amount: 2000, source: "Card", status: "Counted" },
      { date: "2026-09-25", ref: "BK-1108", amount: 2000, source: "Card", status: "Counted" },
    ],
  },
];

export const shareOf = (tech: Tech) => Math.round(tech.verified * (tech.split / 100));

export const totals = {
  verified: techs.reduce((sum, t) => sum + t.verified, 0),
  share: techs.reduce((sum, t) => sum + shareOf(t), 0),
  count: techs.length,
};

export const trend = {
  months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  series: [
    { id: "thandi-mokoena", name: "Thandi Mokoena", accent: true, values: [8200, 9100, 10400, 9900, 11600, 12450] },
    { id: "leigh-adams", name: "Leigh Adams", accent: false, values: [10100, 11200, 10800, 12600, 13400, 14300] },
    { id: "nomsa-dlamini", name: "Nomsa Dlamini", accent: false, values: [6400, 7100, 7800, 8200, 8900, 9500] },
  ],
};

export type Dispute = {
  id: string;
  techName: string;
  amount: number;
  ref: string;
  date: string;
  reason: string;
  resolved: boolean;
  raisedAt: string;
};

export const disputes: Dispute[] = [
  {
    id: "d1",
    techName: "Leigh Adams",
    amount: 150,
    ref: "BK-1093",
    date: "2026-09-12",
    reason: "Receipt was refunded.",
    resolved: false,
    raisedAt: "2026-09-28T14:00:00Z",
  },
  {
    id: "d2",
    techName: "Nomsa Dlamini",
    amount: 420,
    ref: "BK-1081",
    date: "2026-09-15",
    reason: "Amount counted twice on the same booking.",
    resolved: false,
    raisedAt: "2026-09-29T06:30:00Z",
  },
  {
    id: "d3",
    techName: "Thandi Mokoena",
    amount: 900,
    ref: "BK-1088",
    date: "2026-09-18",
    reason: "Client cancelled after payment.",
    resolved: true,
    raisedAt: "2026-09-20T09:00:00Z",
  },
];
