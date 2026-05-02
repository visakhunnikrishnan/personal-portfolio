/*
 * Expressive Writing Effect Sizes – horizontal bar chart
 *
 * Smyth (1998) JCCP, 13 RCTs in healthy participants — d ≈ 0.47 across
 * health, well-being, physiological function. Frattaroli (2006)
 * Psychological Bulletin, 146 studies — random-effects r ≈ 0.075.
 */

const W = 640;
const H = 250;
const PAD = { top: 30, right: 60, bottom: 50, left: 200 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  {
    label: "Smyth (1998)",
    sub: "13 RCTs · healthy participants",
    value: 0.47,
    display: "d ≈ 0.47",
    color: "#8b5cf6",
  },
  {
    label: "Frattaroli (2006)",
    sub: "146 studies · random-effects",
    value: 0.15,
    display: "r ≈ 0.075",
    color: "#06b6d4",
    note: "(rescaled for comparison)",
  },
  {
    label: "Antidepressants",
    sub: "primary care, for context",
    value: 0.25,
    display: "d ≈ 0.25",
    color: "#94a3b8",
    dashed: true,
  },
];

const MAX = 0.6;
const BAR_H = 32;
const GAP = (CH - data.length * BAR_H) / (data.length + 1);

function x(v: number) {
  return PAD.left + (v / MAX) * CW;
}

export function JournalingEffectSizes() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Effect sizes: Smyth 1998 d=0.47, Frattaroli 2006 r=0.075, antidepressants in primary care d=0.25"
      >
        <defs>
          {data
            .filter((d) => !d.dashed)
            .map((d, i) => (
              <linearGradient
                key={i}
                id={`jes-${i}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor={d.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={d.color} stopOpacity="0.8" />
              </linearGradient>
            ))}
          <filter id="jes-glow">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Grid */}
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

        {/* Interpretation guide */}
        <text
          x={x(0.2)}
          y={PAD.top - 10}
          textAnchor="middle"
          className="text-[8px] fill-muted-foreground/40"
        >
          Small
        </text>
        <text
          x={x(0.4)}
          y={PAD.top - 10}
          textAnchor="middle"
          className="text-[8px] fill-muted-foreground/40"
        >
          Moderate
        </text>

        {/* Bars */}
        {data.map((d, i) => {
          const barY = PAD.top + GAP + i * (BAR_H + GAP);
          const barW = (d.value / MAX) * CW;

          return (
            <g key={d.label}>
              <text
                x={PAD.left - 12}
                y={barY + BAR_H / 2 - 2}
                textAnchor="end"
                fontSize="11"
                fontWeight="600"
                className="fill-foreground"
              >
                {d.label}
              </text>
              <text
                x={PAD.left - 12}
                y={barY + BAR_H / 2 + 12}
                textAnchor="end"
                fontSize="9"
                className="fill-muted-foreground/60"
              >
                {d.sub}
              </text>

              <rect
                x={PAD.left}
                y={barY}
                width={barW}
                height={BAR_H}
                rx={4}
                fill={d.dashed ? d.color : `url(#jes-${i})`}
                fillOpacity={d.dashed ? 0.18 : 1}
                filter={d.dashed ? undefined : "url(#jes-glow)"}
                stroke={d.dashed ? d.color : "none"}
                strokeWidth={d.dashed ? 1.5 : 0}
                strokeDasharray={d.dashed ? "6 3" : undefined}
              />

              <text
                x={PAD.left + barW + 8}
                y={barY + BAR_H / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill={d.color}
                fillOpacity={d.dashed ? 0.7 : 1}
              >
                {d.display}
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
          Standardized effect size
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Two meta-analyses of expressive writing. Smyth&apos;s smaller, tighter
        sample shows moderate effects; Frattaroli&apos;s larger pool dilutes
        but confirms the pattern.
      </figcaption>
    </figure>
  );
}
