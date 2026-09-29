import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/dashboard/Shell";
import { ExportPill, MonthPill, Segmented, Toast } from "@/components/dashboard/parts";
import { disputes as seed, type Dispute } from "@/lib/data";
import { countdown, currency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/disputes")({
  head: () => ({
    meta: [
      { title: "Disputes. JennaJane Collective" },
      { name: "description", content: "Open receipt disputes raised by techs, with a 48 hour decision window." },
      { property: "og:title", content: "Disputes. JennaJane Collective" },
      { property: "og:description", content: "Open receipt disputes raised by techs, with a 48 hour decision window." },
    ],
  }),
  component: Disputes,
});

const FILTERS = ["All", "Open", "Resolved"] as const;

function Disputes() {
  const [filter, setFilter] = useState<string>("Open");
  const [items, setItems] = useState<Dispute[]>(seed);
  const [pending, setPending] = useState<{ dispute: Dispute; decision: "Approve" | "Reject" } | null>(null);
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const rows = items.filter((d) => {
    if (filter === "Open") return !d.resolved;
    if (filter === "Resolved") return d.resolved;
    return true;
  });

  const confirm = () => {
    if (!pending || reason.trim().length === 0) return;
    setItems((prev) => prev.map((d) => (d.id === pending.dispute.id ? { ...d, resolved: true } : d)));
    setToast(
      pending.decision === "Approve"
        ? "Dispute approved. Invoice will be re-issued."
        : "Dispute rejected. Reason recorded.",
    );
    setPending(null);
    setReason("");
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
        <h1 className="section-title">Disputes</h1>
      </div>

      {rows.length === 0 ? (
        <div className="empty">
          <h3>No open disputes</h3>
          <p>Disputes raised by techs will appear here.</p>
        </div>
      ) : (
        <div className="dispute-list">
          {rows.map((d) => (
            <article key={d.id} className="dispute-card">
              <div className="card-head">
                <h3 className="card-name">{d.techName}</h3>
                <span className="figure" style={{ fontSize: 18, fontWeight: 600 }}>
                  {currency(d.amount)}
                </span>
              </div>
              <p className="card-meta figure" style={{ margin: 0 }}>
                Booking {d.ref}. {formatDate(d.date)}.
              </p>
              <p style={{ margin: 0, fontSize: 14 }}>Reason: {d.reason}</p>
              {!d.resolved ? (
                <p className="card-meta figure" style={{ margin: 0 }}>
                  {countdown(d.raisedAt)}
                </p>
              ) : (
                <p className="card-meta" style={{ margin: 0 }}>
                  Resolved
                </p>
              )}
              {!d.resolved ? (
                <div className="dispute-actions">
                  <button
                    type="button"
                    className="pill pill--solid-ink"
                    onClick={() => setPending({ dispute: d, decision: "Approve" })}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="pill pill--outline-ink"
                    onClick={() => setPending({ dispute: d, decision: "Reject" })}
                  >
                    Reject
                  </button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      )}

      {pending ? (
        <div
          className="sheet-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${pending.decision} dispute`}
          onClick={() => setPending(null)}
        >
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <h3>{pending.decision === "Approve" ? "Approve dispute" : "Reject dispute"}</h3>
            <label htmlFor="decision-reason">Reason for decision (required)</label>
            <textarea
              id="decision-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="dispute-actions">
              <button type="button" className="pill pill--solid-ink" disabled={reason.trim().length === 0} onClick={confirm}>
                {pending.decision === "Approve" ? "Approve dispute" : "Reject dispute"}
              </button>
              <button type="button" className="pill pill--outline-ink" onClick={() => setPending(null)}>
                Back
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? <Toast message={toast} /> : null}
    </Shell>
  );
}
