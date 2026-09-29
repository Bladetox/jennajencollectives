import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, Users, FileText, Flag } from "lucide-react";
import type { ReactNode } from "react";
import bgAsset from "@/assets/jenna-space.jpg.asset.json";

const items = [
  { to: "/", label: "Overview", icon: LayoutGrid, match: (p: string) => p === "/" },
  { to: "/techs", label: "Techs", icon: Users, match: (p: string) => p.startsWith("/techs") },
  { to: "/invoices", label: "Invoices", icon: FileText, match: (p: string) => p.startsWith("/invoices") },
  { to: "/disputes", label: "Disputes", icon: Flag, match: (p: string) => p.startsWith("/disputes") },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <>
      <div className="bg-photo" style={{ backgroundImage: `url(${bgAsset.url})` }} aria-hidden="true" />
      <div className="bg-veil" aria-hidden="true" />
      <div className="shell">
        <nav className="rail" role="navigation" aria-label="Main">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rail-item"
              aria-label={item.label}
              aria-current={item.match(pathname) ? "page" : undefined}
            >
              <item.icon size={20} strokeWidth={1.75} />
            </Link>
          ))}
          <span className="rail-spacer" />
          <span
            className="rail-avatar figure"
            aria-label="Jenna"
            style={{
              display: "grid",
              placeItems: "center",
              background: "var(--accent)",
              color: "var(--ink)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            JJ
          </span>
        </nav>
        <div className="shell-main">{children}</div>
      </div>
    </>
  );
}
