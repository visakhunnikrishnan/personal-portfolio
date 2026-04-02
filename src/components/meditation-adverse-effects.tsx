/*
 * Meditation Adverse Effects – horizontal bar chart
 *
 * Data from Farias et al. (2020) Acta Psychiatrica Scandinavica
 * (83 studies, 8.3% overall adverse event prevalence)
 * and Britton et al. (2021) Clinical Psychological Science.
 */

const W = 640;
const H = 260;
const PAD = { top: 24, right: 50, bottom: 48, left: 180 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  { label: "Anxiety", pct: 33, color: "#ef4444" },
  { label: "Depression", pct: 27, color: "#f97316" },
  { label: "Cognitive anomalies", pct: 25, color: "#f59e0b" },
];

const MAX = 40;
const BAR_H = 36;
const GAP = (CH - data.length * BAR_H) / (data.length + 1);

function x(v: number) {
  return PAD.left + (v / MAX) * CW;
}

export function MeditationAdverseEffects() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Bar chart of meditation adverse effects: anxiety 33%, depression 27%, cognitive anomalies 25%"
      >
        <defs>
          {data.map((d) => (
            <linearGradient
              key={d.label}
              id={`ae-${d.label.replace(/\s/g, "")}`}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor={d.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={d.color} stopOpacity="0.65" />
            </linearGradient>
          ))}
        </defs>

        {/* Grid lines */}
        {[10, 20, 30, 40].map((v) => (
          <g key={v}>
            <line
              x1={x(v)}
              y1={PAD.top}
              x2={x(v)}
              y2={PAD.top + CH}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={x(v)}
              y={PAD.top + CH + 16}
              textAnchor="middle"
              className="text-[10px] fill-muted-foreground/60"
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
          const barW = (d.pct / MAX) * CW;

          return (
            <g key={d.label}>
              <text
                x={PAD.left - 12}
                y={barY + BAR_H / 2 + 4}
                textAnchor="end"
                className="text-[11px] fill-muted-foreground"
              >
                {d.label}
              </text>
              <rect
                x={PAD.left}
                y={barY}
                width={barW}
                height={BAR_H}
                rx={4}
                fill={`url(#ae-${d.label.replace(/\s/g, "")})`}
              />
              <text
                x={PAD.left + barW + 8}
                y={barY + BAR_H / 2 + 4}
                className="text-[11px] font-semibold"
                fill={d.color}
              >
                {d.pct}%
              </text>
            </g>
          );
        })}

        {/* X-axis label */}
        <text
          x={PAD.left + CW / 2}
          y={H - 8}
          textAnchor="middle"
          className="text-[10px] fill-muted-foreground/50"
        >
          Prevalence among reported adverse events
        </text>
      </svg>

      {/* Key stats below */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-3">
          <p className="text-xl font-bold text-red-500">8.3%</p>
          <p className="mt-1 text-xs text-muted-foreground">
            overall adverse event rate
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-3">
          <p className="text-xl font-bold text-amber-500">6&ndash;14%</p>
          <p className="mt-1 text-xs text-muted-foreground">
            experience lasting effects
          </p>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-3">
          <p className="text-xl font-bold text-orange-500">59</p>
          <p className="mt-1 text-xs text-muted-foreground">
            types of challenges identified
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Breakdown of adverse events from Farias et al. (2020), reviewing 83
        studies. Anxiety was the most common negative effect reported.
      </figcaption>
    </figure>
  );
}
