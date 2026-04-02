/*
 * Meditation Research Growth – bar chart
 *
 * Shows the exponential growth of meditation RCTs from 1995 to 2015,
 * plus total Scopus articles by 2023.
 * Endpoints (1 and 216) from Goldberg et al. (2022); intermediate
 * values estimated based on the exponential growth described in the literature.
 */

const W = 640;
const H = 320;
const PAD = { top: 28, right: 24, bottom: 56, left: 60 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  { period: "1995–97", rcts: 1 },
  { period: "1998–00", rcts: 5 },
  { period: "2001–03", rcts: 10 },
  { period: "2004–06", rcts: 21 },
  { period: "2007–09", rcts: 52 },
  { period: "2010–12", rcts: 104 },
  { period: "2013–15", rcts: 216 },
];

const MAX = 240;
const BAR_W = CW / data.length - 14;

function y(v: number) {
  return PAD.top + CH - (v / MAX) * CH;
}

export function MeditationResearchGrowth() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Bar chart showing meditation RCTs growing from 1 in 1995-97 to 216 in 2013-15"
      >
        <defs>
          <linearGradient id="rct-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.25" />
          </linearGradient>
          <filter id="rct-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        {/* Grid lines */}
        {[50, 100, 150, 200].map((v) => (
          <g key={v}>
            <line
              x1={PAD.left}
              y1={y(v)}
              x2={PAD.left + CW}
              y2={y(v)}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={PAD.left - 10}
              y={y(v) + 4}
              textAnchor="end"
              className="text-[10px] fill-muted-foreground/60"
            >
              {v}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = PAD.left + (i + 0.5) * (CW / data.length);
          const barX = cx - BAR_W / 2;
          const barY = y(d.rcts);
          const barH = y(0) - y(d.rcts);

          return (
            <g key={d.period}>
              <rect
                x={barX}
                y={barY}
                width={BAR_W}
                height={barH}
                rx={4}
                fill="url(#rct-bar)"
                filter="url(#rct-glow)"
              />
              <text
                x={cx}
                y={barY - 8}
                textAnchor="middle"
                className="text-[10px] font-semibold fill-violet-600 dark:fill-violet-400"
              >
                {d.rcts}
              </text>
              <text
                x={cx}
                y={PAD.top + CH + 16}
                textAnchor="middle"
                className="text-[9px] fill-muted-foreground"
              >
                {d.period}
              </text>
            </g>
          );
        })}

        {/* Y-axis title */}
        <text
          x={14}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
          className="text-[11px] font-medium fill-muted-foreground"
        >
          Randomized controlled trials
        </text>

        {/* Annotation */}
        <text
          x={PAD.left + CW}
          y={PAD.top + CH + 42}
          textAnchor="end"
          className="text-[9px] fill-muted-foreground/50"
        >
          By Sept 2023: 29,045 total articles in Scopus
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Meditation RCTs per 3-year period. Endpoints confirmed (1 in 1995&ndash;97,
        216 in 2013&ndash;15); intermediate values estimated from the exponential
        growth trajectory described in the literature.
      </figcaption>
    </figure>
  );
}
