import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/dashboard/Shell";
import { ExportPill, MonthPill, TechCard } from "@/components/dashboard/parts";
import { MONTH_LABEL, techs } from "@/lib/data";

export const Route = createFileRoute("/techs/")({
  head: () => ({
    meta: [
      { title: "Techs. JennaJane Collective" },
      { name: "description", content: "Every tech in the collective with their split and verified receipts." },
      { property: "og:title", content: "Techs. JennaJane Collective" },
      { property: "og:description", content: "Every tech in the collective with their split and verified receipts." },
    ],
  }),
  component: TechsPage,
});

function TechsPage() {
  return (
    <Shell>
      <div className="topbar">
        <MonthPill />
        <span className="pill-spacer" />
        <ExportPill />
      </div>
      <div className="section-head">
        <h1 className="section-title">Techs</h1>
        <p className="section-sub">{MONTH_LABEL}</p>
      </div>
      <div className="cards">
        {techs.map((tech) => (
          <TechCard key={tech.id} tech={tech} />
        ))}
      </div>
    </Shell>
  );
}
