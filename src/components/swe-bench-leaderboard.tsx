/*
 * SWE-bench Leaderboard – horizontal bar chart
 *
 * Shows SWE-bench Verified scores as of August 2026: the benchmark has
 * effectively saturated near 95-97% for frontier models (scores vary
 * slightly by scaffold/aggregator).
 */

const W = 640;
const H = 320;
const PAD = { top: 28, right: 50, bottom: 48, left: 148 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  { label: "Claude Opus 5", value: 96.0, color: "#8b5cf6" },
  { label: "Claude Mythos 5", value: 95.5, color: "#6366f1" },
  { label: "Claude Fable 5", value: 95.0, color: "#a855f7" },
  { label: "Claude Opus 4.8", value: 88.6, color: "#06b6d4" },
  { label: "Claude Opus 4.7", value: 87.6, color: "#10b981" },
  { label: "Ornith-1.5-397B", value: 86.0, color: "#f59e0b" },
];

const MAX = 100;
const MIN_DISPLAY = 80;
const DISPLAY_RANGE = MAX - MIN_DISPLAY;

const BAR_H = 30;
const GAP = (CH - data.length * BAR_H) / (data.length + 1);

function xPos(v: number) {
  return PAD.left + ((v - MIN_DISPLAY) / DISPLAY_RANGE) * CW;
}

export function SweBenchLeaderboard() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Horizontal bar chart of SWE-bench Verified leaderboard as of August 2026, showing frontier models saturating the benchmark between 86 and 96 percent, led by Claude Opus 5"
      >
        <defs>
          {data.map((d) => (
            <linearGradient
              key={d.label}
              id={`swe-${d.label.replace(/[\s.]/g, "")}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor={d.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={d.color} stopOpacity="0.8" />
            </linearGradient>
          ))}
          <filter id="swe-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1.5"
              floodOpacity="0.06"
            />
          </filter>
        </defs>

        {/* Grid lines */}
        {[80, 84, 88, 92, 96, 100].map((v) => (
          <g key={v}>
            <line
              x1={xPos(v)}
              y1={PAD.top}
              x2={xPos(v)}
              y2={PAD.top + CH}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={xPos(v)}
              y={PAD.top + CH + 16}
              textAnchor="middle"
              className="text-[9px] fill-muted-foreground/50"
            >
              {v}%
            </text>
          </g>
        ))}

        {/* Baseline */}
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={PAD.top + CH}
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {/* Bars */}
        {data.map((d, i) => {
          const barY = PAD.top + GAP + i * (BAR_H + GAP);
          const barW = ((d.value - MIN_DISPLAY) / DISPLAY_RANGE) * CW;

          return (
            <g key={d.label}>
              {/* Label */}
              <text
                x={PAD.left - 12}
                y={barY + BAR_H / 2 + 4}
                textAnchor="end"
                className="text-[11px] fill-muted-foreground"
              >
                {d.label}
              </text>

              {/* Bar */}
              <rect
                x={PAD.left}
                y={barY}
                width={barW}
                height={BAR_H}
                rx={4}
                fill={`url(#swe-${d.label.replace(/[\s.]/g, "")})`}
                filter="url(#swe-glow)"
              />

              {/* Value label */}
              <text
                x={PAD.left + barW + 8}
                y={barY + BAR_H / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill={d.color}
              >
                {d.value}%
              </text>
            </g>
          );
        })}

        {/* X-axis label */}
        <text
          x={PAD.left + CW / 2}
          y={H - 8}
          textAnchor="middle"
          className="text-[10px] fill-muted-foreground/60"
        >
          SWE-bench Verified score (%) &mdash; August 2026
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        SWE-bench Verified has saturated: frontier models score 95&ndash;97%
        (scores vary slightly by scaffold). SWE-bench Pro&mdash;harder and
        contamination-resistant&mdash;is at 59% standardized, up from ~23%
        in early 2026.
      </figcaption>
    </figure>
  );
}
