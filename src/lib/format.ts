const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function currency(value: number): string {
  return `R${value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function currencyShort(value: number): string {
  return `R${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function countdown(raisedAtIso: string, now: Date = new Date()): string {
  const deadline = new Date(raisedAtIso).getTime() + 48 * 60 * 60 * 1000;
  const remaining = deadline - now.getTime();
  if (remaining <= 0) return "SLA elapsed";
  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  return `${hours}h ${minutes}m left`;
}

export function techCountLine(count: number, verified: number, share: number): string {
  const word = count === 1 ? "tech" : "techs";
  return `${count} ${word}. ${currencyShort(verified)} verified. ${currencyShort(share)} due to you.`;
}
