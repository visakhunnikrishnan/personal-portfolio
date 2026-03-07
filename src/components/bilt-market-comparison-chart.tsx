const W = 640;
const H = 340;
const PAD = { top: 36, right: 120, bottom: 40, left: 160 };
const BAR_H = 22;
const ROW_H = 64;

const metrics: {
  label: string;
  india: number;
  us: number;
  indiaLabel: string;
  usLabel: string;
  max: number;
}[] = [
  {
    label: "Rental market size",
    india: 170,
    us: 45,
    indiaLabel: "$170B total",
    usLabel: "$45B (Bilt alone)",
    max: 170,
  },
  {
    label: "Urban renter households",
    india: 80,
    us: 44,
    indiaLabel: "~80M",
    usLabel: "~44M",
    max: 80,
  },
  {
    label: "Credit card penetration",
    india: 6,
    us: 65,
    indiaLabel: "5–6%",
    usLabel: "65%+",
    max: 65,
  },
  {
    label: "Digital txns (billions)",
    india: 228,
    us: 58,
    indiaLabel: "228B UPI",
    usLabel: "~58B card",
    max: 228,
  },
];

const CW = W - PAD.left - PAD.right;

function barW(value: number, max: number) {
  return Math.max((value / max) * CW, 4);
}

export function BiltMarketComparisonChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Comparison chart of India vs US rental market metrics: market size, urban renters, credit card penetration, and digital transactions"
      >
        {/* Legend */}
        <circle cx={PAD.left} cy={16} r={5} fill="#10b981" opacity={0.85} />
        <text
          x={PAD.left + 12}
          y={16}
          dominantBaseline="central"
          className="text-[10px] font-medium fill-foreground/70"
        >
          India
        </text>
        <circle cx={PAD.left + 60} cy={16} r={5} fill="#3b82f6" opacity={0.85} />
        <text
          x={PAD.left + 72}
          y={16}
          dominantBaseline="central"
          className="text-[10px] font-medium fill-foreground/70"
        >
          United States
        </text>

        {metrics.map((m, i) => {
          const rowY = PAD.top + i * ROW_H;
          const indiaW = barW(m.india, m.max);
          const usW = barW(m.us, m.max);

          return (
            <g key={m.label}>
              {/* Row label */}
              <text
                x={PAD.left - 12}
                y={rowY + BAR_H / 2 + (BAR_H + 6) / 2}
                textAnchor="end"
                dominantBaseline="central"
                className="text-[11px] fill-foreground/70"
              >
                {m.label}
              </text>

              {/* India bar */}
              <rect
                x={PAD.left}
                y={rowY}
                width={indiaW}
                height={BAR_H}
                rx={4}
                fill="#10b981"
                opacity={0.8}
              />
              <text
                x={PAD.left + indiaW + 8}
                y={rowY + BAR_H / 2}
                dominantBaseline="central"
                className="text-[10px] font-medium fill-emerald-600 dark:fill-emerald-400"
              >
                {m.indiaLabel}
              </text>

              {/* US bar */}
              <rect
                x={PAD.left}
                y={rowY + BAR_H + 6}
                width={usW}
                height={BAR_H}
                rx={4}
                fill="#3b82f6"
                opacity={0.7}
              />
              <text
                x={PAD.left + usW + 8}
                y={rowY + BAR_H + 6 + BAR_H / 2}
                dominantBaseline="central"
                className="text-[10px] font-medium fill-blue-600 dark:fill-blue-400"
              >
                {m.usLabel}
              </text>

              {/* Subtle divider between rows */}
              {i < metrics.length - 1 && (
                <line
                  x1={PAD.left}
                  y1={rowY + ROW_H - 4}
                  x2={W - PAD.right}
                  y2={rowY + ROW_H - 4}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-neutral-200 dark:text-neutral-700/50"
                />
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        India&apos;s rental market is larger by volume, but credit card penetration is a fraction of the US &mdash; UPI bridges the gap.
      </figcaption>
    </figure>
  );
}
