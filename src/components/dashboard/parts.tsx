import { ChevronDown, Download, Table, Settings, CheckCircle } from "lucide-react";
import type { InvoiceStatus, Tech } from "@/lib/data";
import { MONTH_LABEL, MONTH_SHORT, shareOf } from "@/lib/data";
import { currency, currencyShort } from "@/lib/format";
import { Link } from "@tanstack/react-router";

export function MonthPill() {
  return (
    <button type="button" className="pill" aria-label={`Month: ${MONTH_LABEL}`}>
      {MONTH_LABEL}
      <ChevronDown size={20} strokeWidth={1.75} />
    </button>
  );
}

export function Segmented({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="seg">
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function ExportPill({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="pill pill--ghost" onClick={onClick}>
      <Download size={20} strokeWidth={1.75} />
      Export
    </button>
  );
}

const statusClass = (status: InvoiceStatus) => {
  if (status === "Paid") return "status status--paid";
  if (status === "Overdue") return "status status--overdue";
  if (status === "Issued" || status === "Draft") return "status status--open";
  return "status status--neutral";
};

export function StatusPill({ status, onGlass = false }: { status: InvoiceStatus; onGlass?: boolean }) {
  return (
    <span role="status" className={`${statusClass(status)}${onGlass ? " status--onglass" : ""}`}>
      {status}
    </span>
  );
}

export function TechCard({ tech }: { tech: Tech }) {
  return (
    <Link to="/techs/$techId" params={{ techId: tech.id }} className="card">
      <div className="card-head">
        <h3 className="card-name">{tech.name}</h3>
        <span className="split-badge">{tech.split}%</span>
      </div>
      <div>
        <p className="card-figure">{currencyShort(tech.verified)}</p>
        <p className="card-meta">Verified receipts. {MONTH_SHORT}</p>
      </div>
      <hr className="card-divider" />
      <div className="card-foot">
        <span className="card-share figure">{currency(shareOf(tech))} due to you</span>
        <StatusPill status={tech.invoiceStatus} />
      </div>
    </Link>
  );
}

export function QuickRow() {
  return (
    <div className="quick-row">
      <button type="button" className="quick-btn" aria-label="Export PDF">
        <Download size={20} strokeWidth={1.75} />
      </button>
      <button type="button" className="quick-btn" aria-label="Export CSV">
        <Table size={20} strokeWidth={1.75} />
      </button>
      <button type="button" className="quick-btn" aria-label="Settings">
        <Settings size={20} strokeWidth={1.75} />
      </button>
    </div>
  );
}

export function Fab({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="fab" aria-label="Generate invoices for September 2026" onClick={onClick}>
      <CheckCircle size={24} strokeWidth={1.75} />
    </button>
  );
}

export function Toast({ message }: { message: string }) {
  return (
    <div className="toast" role="status">
      {message}
    </div>
  );
}
