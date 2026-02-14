const vulnerabilities: {
  name: string;
  cvss: number;
  epss: number;
  labelPos?: "left" | "right" | "above" | "below";
}[] = [
  { name: "Log4Shell", cvss: 10.0, epss: 0.97, labelPos: "left" },
  { name: "CVE-2023-44487", cvss: 7.5, epss: 0.89, labelPos: "below" },
  { name: "CVE-2022-22965", cvss: 9.8, epss: 0.12, labelPos: "right" },
  { name: "CVE-2023-35116", cvss: 8.2, epss: 0.04, labelPos: "right" },
  { name: "CVE-2021-37714", cvss: 6.2, epss: 0.01, labelPos: "right" },
  { name: "CVE-2020-8908", cvss: 3.3, epss: 0.01, labelPos: "right" },
  { name: "CVE-2023-26136", cvss: 6.1, epss: 0.72, labelPos: "right" },
  { name: "CVE-2024-29025", cvss: 5.3, epss: 0.45, labelPos: "above" },
];

const PAD = { top: 28, right: 24, bottom: 44, left: 48 };
const W = 640;
const H = 400;
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

function x(epss: number) {
  return PAD.left + epss * CW;
}
function y(cvss: number) {
  return PAD.top + CH - (cvss / 10) * CH;
}

function labelOffset(pos: string) {
  switch (pos) {
    case "left":
      return { dx: -10, dy: 1, anchor: "end" as const };
    case "above":
      return { dx: 0, dy: -10, anchor: "middle" as const };
    case "below":
      return { dx: 0, dy: 14, anchor: "middle" as const };
    default:
      return { dx: 10, dy: 1, anchor: "start" as const };
  }
}

export function CvssEpssChart() {
  const mx = x(0.5);
  const my = y(5);

  return (
    <figure className="not-prose my-10">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="CVSS vs EPSS prioritization chart">
          <defs>
            <filter id="dot-shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Quadrant fills */}
          <rect x={PAD.left} y={PAD.top} width={mx - PAD.left} height={my - PAD.top} rx="4" fill="currentColor" className="text-red-500/[0.06] dark:text-red-400/[0.08]" />
          <rect x={mx} y={PAD.top} width={PAD.left + CW - mx} height={my - PAD.top} rx="4" fill="currentColor" className="text-amber-500/[0.06] dark:text-amber-400/[0.08]" />
          <rect x={PAD.left} y={my} width={mx - PAD.left} height={PAD.top + CH - my} rx="4" fill="currentColor" className="text-orange-500/[0.06] dark:text-orange-400/[0.08]" />
          <rect x={mx} y={my} width={PAD.left + CW - mx} height={PAD.top + CH - my} rx="4" fill="currentColor" className="text-neutral-400/[0.04] dark:text-neutral-500/[0.06]" />

          {/* Subtle horizontal grid */}
          {[2, 4, 6, 8].map((v) => (
            <line key={`hg-${v}`} x1={PAD.left} y1={y(v)} x2={PAD.left + CW} y2={y(v)} stroke="currentColor" strokeWidth="0.5" className="text-neutral-200 dark:text-neutral-700" />
          ))}

          {/* Subtle vertical grid */}
          {[0.25, 0.5, 0.75].map((v) => (
            <line key={`vg-${v}`} x1={x(v)} y1={PAD.top} x2={x(v)} y2={PAD.top + CH} stroke="currentColor" strokeWidth="0.5" className="text-neutral-200 dark:text-neutral-700" />
          ))}

          {/* Quadrant dividers */}
          <line x1={mx} y1={PAD.top} x2={mx} y2={PAD.top + CH} stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" className="text-neutral-300 dark:text-neutral-600" />
          <line x1={PAD.left} y1={my} x2={PAD.left + CW} y2={my} stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" className="text-neutral-300 dark:text-neutral-600" />

          {/* Quadrant labels */}
          <text x={PAD.left + (mx - PAD.left) / 2} y={PAD.top + 18} textAnchor="middle" className="text-[10px] font-medium fill-red-500/70 dark:fill-red-400/70">
            Fix Immediately
          </text>
          <text x={mx + (PAD.left + CW - mx) / 2} y={PAD.top + 18} textAnchor="middle" className="text-[10px] font-medium fill-amber-600/60 dark:fill-amber-400/60">
            Schedule
          </text>
          <text x={PAD.left + (mx - PAD.left) / 2} y={PAD.top + CH - 8} textAnchor="middle" className="text-[10px] font-medium fill-orange-600/60 dark:fill-orange-400/60">
            Don&apos;t Ignore
          </text>
          <text x={mx + (PAD.left + CW - mx) / 2} y={PAD.top + CH - 8} textAnchor="middle" className="text-[10px] font-medium fill-neutral-400/70 dark:fill-neutral-500/70">
            Backlog
          </text>

          {/* Y-axis labels */}
          {[0, 2, 4, 6, 8, 10].map((v) => (
            <text key={`yl-${v}`} x={PAD.left - 8} y={y(v) + 4} textAnchor="end" className="text-[10px] fill-muted-foreground/60">
              {v}
            </text>
          ))}

          {/* X-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
            <text key={`xl-${v}`} x={x(v)} y={PAD.top + CH + 16} textAnchor="middle" className="text-[10px] fill-muted-foreground/60">
              {v.toFixed(2)}
            </text>
          ))}

          {/* Axis titles */}
          <text x={PAD.left + CW / 2} y={H - 6} textAnchor="middle" className="text-[11px] font-medium fill-muted-foreground">
            EPSS - likelihood of exploit →
          </text>
          <text x={12} y={PAD.top + CH / 2} textAnchor="middle" transform={`rotate(-90, 12, ${PAD.top + CH / 2})`} className="text-[11px] font-medium fill-muted-foreground">
            CVSS - severity →
          </text>

          {/* Data points */}
          {vulnerabilities.map((v) => {
            const cx = x(v.epss);
            const cy = y(v.cvss);
            const isHighRisk = v.epss >= 0.5 && v.cvss >= 5;
            const isMedRisk = v.epss >= 0.5 || v.cvss >= 5;
            const dotColor = isHighRisk ? "#ef4444" : isMedRisk ? "#f59e0b" : "#94a3b8";
            const offset = labelOffset(v.labelPos || "right");

            return (
              <g key={v.name}>
                {/* Glow */}
                <circle cx={cx} cy={cy} r={12} fill={dotColor} opacity={0.1} />
                {/* Dot */}
                <circle cx={cx} cy={cy} r={5} fill={dotColor} filter="url(#dot-shadow)" />
                <circle cx={cx} cy={cy} r={2} fill="white" opacity={0.5} />
                {/* Label */}
                <text
                  x={cx + offset.dx}
                  y={cy + offset.dy}
                  textAnchor={offset.anchor}
                  dominantBaseline="central"
                  className="text-[8.5px] fill-foreground/70"
                >
                  {v.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        CVSS measures how bad a vulnerability <em>could</em> be. EPSS measures how likely it <em>will</em> be exploited. Prioritize using both.
      </figcaption>
    </figure>
  );
}
