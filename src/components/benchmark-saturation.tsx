"use client";

/*
 * Benchmark Saturation – paired dot chart with connecting lines
 *
 * Shows confirmed best scores for AI benchmarks over time.
 * Only verified data points from source material.
 */

const W = 640;
const H = 380;
const PAD = { top: 24, right: 24, bottom: 44, left: 52 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const MIN_YEAR = 2020.5;
const MAX_YEAR = 2026.5;

function cx(year: number) {
  return PAD.left + ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * CW;
}
function cy(val: number) {
  return PAD.top + CH - (val / 100) * CH;
}

const benchmarks = [
  {
    name: "MMLU",
    color: "#94a3b8",
    data: [
      { year: 2021, value: 43 },
      { year: 2025, value: 93 },
    ],
    labelY: -14,
  },
  {
    name: "GPQA Diamond",
    color: "#8b5cf6",
    data: [
      { year: 2025, value: 81 },
      { year: 2026, value: 94 },
    ],
    labelY: 16,
  },
  {
    name: "AIME",
    color: "#06b6d4",
    data: [
      { year: 2025, value: 94 },
      { year: 2026, value: 100 },
    ],
    labelY: -14,
  },
  {
    name: "HLE",
    color: "#ef4444",
    data: [
      { year: 2025, value: 3 },
      { year: 2025.5, value: 8 },
      { year: 2026, value: 53 },
    ],
    labelY: 16,
  },
  {
    name: "ARC-AGI-2",
    color: "#f59e0b",
    data: [
      { year: 2025.4, value: 5 },
      { year: 2026, value: 54 },
    ],
    labelY: -14,
  },
];

export function BenchmarkSaturation() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Chart showing AI benchmark scores over time with MMLU saturated and newer benchmarks like HLE and ARC-AGI-2 still unsolved"
      >
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line
              x1={PAD.left}
              y1={cy(v)}
              x2={PAD.left + CW}
              y2={cy(v)}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={PAD.left - 8}
              y={cy(v) + 4}
              textAnchor="end"
              className="text-[9px] fill-muted-foreground/60"
            >
              {v}%
            </text>
          </g>
        ))}

        {/* X ticks */}
        {[2021, 2022, 2023, 2024, 2025, 2026].map((y) => (
          <text
            key={y}
            x={cx(y)}
            y={PAD.top + CH + 18}
            textAnchor="middle"
            className="text-[9px] fill-muted-foreground/60"
          >
            {y}
          </text>
        ))}

        {/* Saturated zone */}
        <rect
          x={PAD.left}
          y={cy(100)}
          width={CW}
          height={cy(85) - cy(100)}
          className="fill-neutral-100/50 dark:fill-neutral-800/30"
        />
        <text
          x={PAD.left + 8}
          y={cy(93)}
          className="text-[8px] fill-muted-foreground/30"
          fontStyle="italic"
        >
          Saturated (~90%+)
        </text>

        {/* Y-axis label */}
        <text
          x={10}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          transform={`rotate(-90, 10, ${PAD.top + CH / 2})`}
          className="text-[10px] fill-muted-foreground"
        >
          Best model score
        </text>

        {/* Benchmark lines and dots */}
        {benchmarks.map((b) => {
          const pts = b.data.map((d) => ({
            x: cx(d.year),
            y: cy(d.value),
            value: d.value,
          }));
          const last = pts[pts.length - 1];

          // Path
          const pathD = pts
            .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)},${p.y.toFixed(1)}`)
            .join(" ");

          return (
            <g key={b.name}>
              {/* Line */}
              <path
                d={pathD}
                fill="none"
                stroke={b.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={4.5} fill={b.color} fillOpacity="0.15" />
                  <circle cx={p.x} cy={p.y} r={2.5} fill={b.color} />
                </g>
              ))}

              {/* Label at last point */}
              <text
                x={last.x + 8}
                y={last.y + b.labelY}
                fontSize="10"
                fontWeight="600"
                fill={b.color}
              >
                {b.name}
              </text>
              <text
                x={last.x + 8}
                y={last.y + b.labelY + 12}
                fontSize="9"
                fill={b.color}
                fillOpacity="0.6"
              >
                {last.value}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend below as HTML for clean layout */}
      <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
        {benchmarks.map((b) => (
          <span key={b.name} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: b.color }}
            />
            {b.name}
          </span>
        ))}
      </div>

      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Best reported scores from confirmed results. MMLU went from 43% to
        93% in four years. HLE and ARC-AGI-2 launched in 2025 and remain far
        from solved.
      </figcaption>
    </figure>
  );
}
