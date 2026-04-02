/*
 * Meditation Effect Sizes – horizontal bar chart
 *
 * Compares effect sizes from the Goyal et al. (2014) JAMA Internal Medicine
 * meta-analysis (47 RCTs, 3,515 participants) with typical antidepressant
 * effect sizes in primary care.
 */

const W = 640;
const H = 300;
const PAD = { top: 24, right: 40, bottom: 44, left: 160 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  { label: "Anxiety", value: 0.38, color: "#8b5cf6" },
  { label: "Pain", value: 0.33, color: "#06b6d4" },
  { label: "Depression", value: 0.3, color: "#6366f1" },
  { label: "Antidepressants\n(primary care)", value: 0.25, color: "#94a3b8", dashed: true },
];

const MAX = 0.5;
const BAR_H = 36;
const GAP = (CH - data.length * BAR_H) / (data.length + 1);

function x(v: number) {
  return PAD.left + (v / MAX) * CW;
}

export function MeditationEffectSizes() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Horizontal bar chart showing meditation effect sizes: anxiety 0.38, pain 0.33, depression 0.30, compared to antidepressants at 0.25"
      >
        <defs>
          {data
            .filter((d) => !d.dashed)
            .map((d) => (
              <linearGradient
                key={d.label}
                id={`es-${d.label.replace(/\s/g, "")}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor={d.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={d.color} stopOpacity="0.75" />
              </linearGradient>
            ))}
          <filter id="es-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1.5"
              floodOpacity="0.06"
            />
          </filter>
        </defs>

        {/* Grid lines */}
        {[0.1, 0.2, 0.3, 0.4, 0.5].map((v) => (
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
              {v.toFixed(1)}
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
          const barW = (d.value / MAX) * CW;

          return (
            <g key={d.label}>
              {/* Label */}
              <text
                x={PAD.left - 12}
                y={barY + BAR_H / 2 + 4}
                textAnchor="end"
                className="text-[11px] fill-muted-foreground"
              >
                {d.label.includes("\n")
                  ? d.label.split("\n").map((line, li) => (
                      <tspan
                        key={li}
                        x={PAD.left - 12}
                        dy={li === 0 ? -6 : 14}
                      >
                        {line}
                      </tspan>
                    ))
                  : d.label}
              </text>

              {/* Bar */}
              <rect
                x={PAD.left}
                y={barY}
                width={barW}
                height={BAR_H}
                rx={4}
                fill={
                  d.dashed
                    ? d.color
                    : `url(#es-${d.label.replace(/\s/g, "")})`
                }
                fillOpacity={d.dashed ? 0.2 : 1}
                filter={d.dashed ? undefined : "url(#es-glow)"}
                stroke={d.dashed ? d.color : "none"}
                strokeWidth={d.dashed ? 1.5 : 0}
                strokeDasharray={d.dashed ? "6 3" : undefined}
              />

              {/* Value label */}
              <text
                x={PAD.left + barW + 8}
                y={barY + BAR_H / 2 + 4}
                className={`text-[11px] font-semibold ${d.dashed ? "fill-slate-400 dark:fill-slate-500" : ""}`}
                fill={d.dashed ? undefined : d.color}
              >
                {d.value.toFixed(2)}
              </text>
            </g>
          );
        })}

        {/* X-axis label */}
        <text
          x={PAD.left + CW / 2}
          y={H - 6}
          textAnchor="middle"
          className="text-[10px] fill-muted-foreground/60"
        >
          Standardized mean difference (SMD)
        </text>

        {/* Interpretation guide */}
        <text
          x={x(0.2)}
          y={PAD.top - 8}
          textAnchor="middle"
          className="text-[8px] fill-muted-foreground/40"
        >
          Small
        </text>
        <text
          x={x(0.35)}
          y={PAD.top - 8}
          textAnchor="middle"
          className="text-[8px] fill-muted-foreground/40"
        >
          Moderate
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Effect sizes from Goyal et al. (2014), the benchmark meta-analysis of 47
        RCTs. Meditation&apos;s effects on anxiety and depression are comparable
        to antidepressants in primary care.
      </figcaption>
    </figure>
  );
}
