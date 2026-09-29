import { trend } from "@/lib/data";

const W = 720;
const H = 140;
const PAD_L = 8;
const PAD_R = 8;
const PAD_T = 12;
const PAD_B = 24;

export function Chart() {
  const all = trend.series.flatMap((s) => s.values);
  const max = Math.max(...all) * 1.08;
  const min = Math.min(...all) * 0.85;
  const x = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (trend.months.length - 1);
  const y = (v: number) => PAD_T + (1 - (v - min) / (max - min)) * (H - PAD_T - PAD_B);

  return (
    <section className="chart-wrap" aria-label="Six month trend">
      <h2 className="chart-title">Six month trend</h2>
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Verified receipts over six months, one line per tech">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={0}
            x2={W}
            y1={PAD_T + t * (H - PAD_T - PAD_B)}
            y2={PAD_T + t * (H - PAD_T - PAD_B)}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
          />
        ))}
        {trend.series.map((s) => (
          <polyline
            key={s.id}
            fill="none"
            stroke={s.accent ? "#e8a850" : "rgba(255,255,255,0.7)"}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            points={s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ")}
          />
        ))}
        {trend.months.map((m, i) => (
          <text
            key={m}
            x={x(i)}
            y={H - 6}
            fill="rgba(255,255,255,0.5)"
            fontSize={11}
            textAnchor={i === 0 ? "start" : i === trend.months.length - 1 ? "end" : "middle"}
          >
            {m}
          </text>
        ))}
      </svg>
    </section>
  );
}
