import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Shell } from "@/components/dashboard/Shell";
import { ExportPill, MonthPill } from "@/components/dashboard/parts";
import { MONTH_LABEL, shareOf, techs } from "@/lib/data";
import { currency, formatDate } from "@/lib/format";

export const Route = createFileRoute("/techs/$techId")({
  head: () => ({
    meta: [
      { title: "Tech detail. JennaJane Collective" },
      { name: "description", content: "Verified receipt line items for a single tech this month." },
      { property: "og:title", content: "Tech detail. JennaJane Collective" },
      { property: "og:description", content: "Verified receipt line items for a single tech this month." },
    ],
  }),
  component: TechDetail,
});

const ledgerStatusClass = (status: string) => {
  if (status === "Counted") return "status status--onglass status--paid";
  if (status === "Refunded") return "status status--onglass status--overdue";
  if (status === "Disputed") return "status status--onglass status--open";
  return "status status--onglass";
};

function TechDetail() {
  const { techId } = useParams({ from: "/techs/$techId" });
  const tech = techs.find((t) => t.id === techId);

  if (!tech) {
    return (
      <Shell>
        <div className="empty">
          <h3>Could not load receipts. Try again.</h3>
          <p>
            <Link to="/" style={{ color: "var(--accent)" }}>
              Back
            </Link>
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="topbar">
        <Link to="/" className="pill pill--ghost" aria-label="Back to overview">
          <ArrowLeft size={20} strokeWidth={1.75} />
          Back
        </Link>
        <MonthPill />
        <span className="pill-spacer" />
        <ExportPill />
      </div>

      <div className="section-head">
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h1 className="section-title">{tech.name}</h1>
          <span className="split-badge">{tech.split}%</span>
        </div>
        <p className="section-sub figure">
          {currency(tech.verified)} verified. {currency(shareOf(tech))} due to you. {MONTH_LABEL}
        </p>
      </div>

      <div className="panel">
        <table className="ledger">
          <caption className="sr-only">Verified receipts</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Reference</th>
              <th scope="col" className="ledger-amount">
                Amount
              </th>
              <th scope="col" className="col-source">
                Source
              </th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tech.ledger.map((item) => (
              <tr key={item.ref}>
                <td className="figure">{formatDate(item.date)}</td>
                <td className="figure">{item.ref}</td>
                <td className="ledger-amount">{currency(item.amount)}</td>
                <td className="col-source">{item.source}</td>
                <td>
                  <span role="status" className={ledgerStatusClass(item.status)}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Shell>
  );
}
