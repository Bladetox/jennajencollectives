import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/dashboard/Shell";
import { Chart } from "@/components/dashboard/Chart";
import { ExportPill, Fab, MonthPill, QuickRow, Segmented, TechCard, Toast } from "@/components/dashboard/parts";
import { MONTH_NAME, techs, totals } from "@/lib/data";
import { techCountLine } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview. JennaJane Collective" },
      { name: "description", content: "Verified receipts, splits and invoice status for every tech in the collective." },
      { property: "og:title", content: "Overview. JennaJane Collective" },
      { property: "og:description", content: "Verified receipts, splits and invoice status for every tech in the collective." },
    ],
  }),
  component: Overview,
});

const FILTERS = ["All", "Open", "Paid"] as const;

function Overview() {
  const [filter, setFilter] = useState<string>("All");
  const [toast, setToast] = useState<string | null>(null);

  const visible = techs.filter((t) => {
    if (filter === "Paid") return t.invoiceStatus === "Paid";
    if (filter === "Open") return t.invoiceStatus !== "Paid";
    return true;
  });

  const empty = totals.verified === 0;

  return (
    <Shell>
      <div className="topbar">
        <MonthPill />
        <Segmented options={FILTERS} value={filter} onChange={setFilter} />
        <span className="pill-spacer" />
        <ExportPill />
      </div>

      <header className="hero">
        <p className="hero-eyebrow">JennaJane Collective</p>
        <h1 className="hero-title">{empty ? `Nothing yet for ${MONTH_NAME}` : `${MONTH_NAME} at a glance`}</h1>
        <p className="hero-sub">
          {empty
            ? "Verified receipts will appear here as techs confirm payments."
            : techCountLine(totals.count, totals.verified, totals.share)}
        </p>
      </header>

      <div className="cards">
        {visible.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </div>

      <Chart />

      <QuickRow />
      <Fab onClick={() => setToast("Invoice issued. Tech has been notified.")} />
      {toast ? <Toast message={toast} /> : null}
    </Shell>
  );
}
