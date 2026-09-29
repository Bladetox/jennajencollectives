import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/dashboard/Shell";
import { ExportPill, MonthPill, Segmented, StatusPill, Toast } from "@/components/dashboard/parts";
import { MONTH_LABEL, MONTH_NAME, shareOf, techs, type Tech } from "@/lib/data";
import { currency } from "@/lib/format";

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices. JennaJane Collective" },
      { name: "description", content: "One invoice per tech for the month, with draft, issue and payment status." },
      { property: "og:title", content: "Invoices. JennaJane Collective" },
      { property: "og:description", content: "One invoice per tech for the month, with draft, issue and payment status." },
    ],
  }),
  component: Invoices,
});

const FILTERS = ["All", "Open", "Paid"] as const;

function Invoices() {
  const [filter, setFilter] = useState<string>("All");
  const [open, setOpen] = useState<Tech | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const rows = techs.filter((t) => {
    if (filter === "Paid") return t.invoiceStatus === "Paid";
    if (filter === "Open") return t.invoiceStatus !== "Paid";
    return true;
  });

  const act = (message: string) => {
    setOpen(null);
    setToast(message);
  };

  return (
    <Shell>
      <div className="topbar">
        <MonthPill />
        <Segmented options={FILTERS} value={filter} onChange={setFilter} />
        <span className="pill-spacer" />
        <ExportPill />
      </div>

      <div className="section-head">
        <h1 className="section-title">Invoices</h1>
        <p className="section-sub">{MONTH_LABEL}</p>
      </div>

      {rows.length === 0 ? (
        <div className="empty">
          <h3>No invoices yet for {MONTH_NAME}</h3>
          <p>Generate invoices once the month's receipts are verified.</p>
        </div>
      ) : (
        <div className="panel">
          {rows.map((tech) => (
            <button key={tech.id} type="button" className="row" onClick={() => setOpen(tech)}>
              <span>{tech.name}</span>
              <span className="figure col-hide">Invoice #{tech.invoiceNumber}</span>
              <span className="figure ledger-amount">{currency(shareOf(tech))}</span>
              <span style={{ justifySelf: "end" }}>
                <StatusPill status={tech.invoiceStatus} onGlass />
              </span>
            </button>
          ))}
        </div>
      )}

      {open ? (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label={`Invoice actions for ${open.name}`} onClick={() => setOpen(null)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <h3>
              {open.name}. Invoice #{open.invoiceNumber}
            </h3>
            <p className="figure" style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
              {currency(shareOf(open))}
            </p>
            <div className="dispute-actions">
              <button
                type="button"
                className="pill pill--outline-ink"
                disabled={open.invoiceStatus !== "Not issued"}
                onClick={() => act("Invoice issued. Tech has been notified.")}
              >
                Generate draft
              </button>
              <button
                type="button"
                className="pill pill--outline-ink"
                disabled={open.invoiceStatus !== "Draft"}
                onClick={() => act("Invoice issued. Tech has been notified.")}
              >
                Review
              </button>
              <button
                type="button"
                className="pill pill--solid-ink"
                disabled={open.invoiceStatus !== "Draft"}
                onClick={() => act("Invoice issued. Tech has been notified.")}
              >
                Lock and issue
              </button>
              <button
                type="button"
                className="pill pill--solid-ink"
                disabled={open.invoiceStatus !== "Issued" && open.invoiceStatus !== "Overdue"}
                onClick={() => act("Invoice issued. Tech has been notified.")}
              >
                Mark paid
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? <Toast message={toast} /> : null}
    </Shell>
  );
}
