const W = 640;
const H = 380;
const PAD = { top: 40, right: 60, bottom: 52, left: 64 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const revenueData = [
  { year: "2023", value: 116 },
  { year: "2024", value: 275 },
  { year: "Q1 '25", value: 400 },
  { year: "2026 (target)", value: 1000 },
];

const valuationData = [
  { year: "2023", value: 3.1 },
  { year: "Q1 '25", value: 10.75 },
];

const MAX_REV = 1100;
const MAX_VAL = 12;

function rx(index: number) {
  return PAD.left + (index / (revenueData.length - 1)) * CW;
}

function ry(value: number) {
  return PAD.top + CH - (value / MAX_REV) * CH;
}

function vy(value: number) {
  return PAD.top + CH - (value / MAX_VAL) * CH;
}

export function BiltGrowthChart() {
  // Build area path
  const areaPoints = revenueData.map((d, i) => `${rx(i)},${ry(d.value)}`);
  const areaPath = `M ${areaPoints.join(" L ")} L ${rx(revenueData.length - 1)},${PAD.top + CH} L ${rx(0)},${PAD.top + CH} Z`;
  const linePath = `M ${areaPoints.join(" L ")}`;

  // Valuation x-positions map to revenue data indices
  const valPoints = valuationData.map((d) => {
    const idx = d.year === "2023" ? 0 : 2; // index into revenueData
    return { x: rx(idx), y: vy(d.value), ...d };
  });

  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Bilt Rewards growth chart showing revenue from $116M in 2023 to $1B target in 2026, and valuation from $3.1B to $10.75B"
      >
        <defs>
          <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <filter id="growth-glow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {[200, 400, 600, 800, 1000].map((v) => (
          <g key={`grid-${v}`}>
            <line
              x1={PAD.left}
              y1={ry(v)}
              x2={PAD.left + CW}
              y2={ry(v)}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={PAD.left - 10}
              y={ry(v) + 4}
              textAnchor="end"
              className="text-[10px] fill-muted-foreground/60"
            >
              ${v >= 1000 ? `${v / 1000}B` : `${v}M`}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#rev-grad)" />

        {/* Revenue line */}
        <path
          d={linePath}
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Revenue dots and labels */}
        {revenueData.map((d, i) => {
          const cx = rx(i);
          const cy = ry(d.value);
          const isTarget = i === revenueData.length - 1;

          return (
            <g key={d.year}>
              {/* Glow */}
              <circle cx={cx} cy={cy} r={10} fill="#10b981" opacity={0.1} />
              {/* Dot */}
              <circle cx={cx} cy={cy} r={4.5} fill="#10b981" filter="url(#growth-glow)" />
              <circle cx={cx} cy={cy} r={1.8} fill="white" opacity={0.5} />
              {/* Value label */}
              <text
                x={cx}
                y={cy - 14}
                textAnchor="middle"
                className={`text-[10px] font-semibold ${
                  isTarget
                    ? "fill-emerald-500 dark:fill-emerald-400"
                    : "fill-foreground/80"
                }`}
              >
                ${d.value >= 1000 ? `${d.value / 1000}B` : `${d.value}M`}
                {isTarget ? " ★" : ""}
              </text>
              {/* X-axis label */}
              <text
                x={cx}
                y={PAD.top + CH + 18}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground/70"
              >
                {d.year}
              </text>
            </g>
          );
        })}

        {/* Valuation overlay */}
        {valPoints.length > 1 && (
          <line
            x1={valPoints[0].x}
            y1={valPoints[0].y}
            x2={valPoints[1].x}
            y2={valPoints[1].y}
            stroke="#a78bfa"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity={0.6}
          />
        )}

        {valPoints.map((d) => (
          <g key={`val-${d.year}`}>
            <circle cx={d.x} cy={d.y} r={10} fill="#a78bfa" opacity={0.08} />
            <circle cx={d.x} cy={d.y} r={4} fill="#a78bfa" opacity={0.9} filter="url(#growth-glow)" />
            <circle cx={d.x} cy={d.y} r={1.5} fill="white" opacity={0.4} />
            <text
              x={d.x + 12}
              y={d.y + 4}
              textAnchor="start"
              className="text-[10px] font-medium fill-violet-500 dark:fill-violet-400"
            >
              ${d.value}B val.
            </text>
          </g>
        ))}

        {/* Y-axis title */}
        <text
          x={14}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
          className="text-[11px] font-medium fill-muted-foreground"
        >
          Revenue →
        </text>

        {/* Legend */}
        <circle cx={PAD.left} cy={H - 14} r={4} fill="#10b981" opacity={0.85} />
        <text
          x={PAD.left + 10}
          y={H - 14}
          dominantBaseline="central"
          className="text-[10px] fill-foreground/60"
        >
          Revenue (annualized)
        </text>
        <circle cx={PAD.left + 140} cy={H - 14} r={4} fill="#a78bfa" opacity={0.85} />
        <text
          x={PAD.left + 150}
          y={H - 14}
          dominantBaseline="central"
          className="text-[10px] fill-foreground/60"
        >
          Valuation
        </text>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Bilt&apos;s revenue trajectory: $116M → $275M → $400M annualized, targeting $1B by 2026. Valuation grew from $3.1B to $10.75B.
      </figcaption>
    </figure>
  );
}
