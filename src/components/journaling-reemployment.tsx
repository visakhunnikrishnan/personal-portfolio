/*
 * Pennebaker Reemployment Study – grouped bar chart
 *
 * Spera, Buhrfeind, Pennebaker (1994), Academy of Management Journal.
 * Laid-off engineers, reemployment rate eight months after intervention.
 */

const W = 640;
const H = 320;
const PAD = { top: 30, right: 30, bottom: 70, left: 60 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  {
    label: "Expressive\nwriting",
    value: 53,
    color: "#8b5cf6",
    note: "wrote about job loss",
  },
  {
    label: "Writing\ncontrols",
    value: 24,
    color: "#94a3b8",
    note: "wrote about trivial topics",
  },
  {
    label: "Non-writers",
    value: 14,
    color: "#cbd5e1",
    note: "no writing assignment",
  },
];

const MAX = 60;
const BAR_W = 90;

function y(v: number) {
  return PAD.top + CH - (v / MAX) * CH;
}

export function JournalingReemployment() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Bar chart showing reemployment rates eight months after layoff: expressive writing 53 percent, writing controls 24 percent, non-writers 14 percent"
      >
        <defs>
          {data.map((d, i) => (
            <linearGradient
              key={i}
              id={`re-${i}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={d.color} stopOpacity="0.85" />
              <stop offset="100%" stopColor={d.color} stopOpacity="0.3" />
            </linearGradient>
          ))}
          <filter id="re-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Grid */}
        {[10, 20, 30, 40, 50, 60].map((v) => (
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
              {v}%
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = PAD.left + (i + 0.5) * (CW / data.length);
          const barX = cx - BAR_W / 2;
          const barY = y(d.value);
          const barH = y(0) - y(d.value);

          return (
            <g key={d.label}>
              <rect
                x={barX}
                y={barY}
                width={BAR_W}
                height={barH}
                rx={6}
                fill={`url(#re-${i})`}
                filter="url(#re-shadow)"
              />
              <text
                x={cx}
                y={barY - 10}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={d.color}
              >
                {d.value}%
              </text>
              {d.label.split("\n").map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={PAD.top + CH + 18 + li * 14}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  className="fill-foreground"
                >
                  {line}
                </text>
              ))}
              <text
                x={cx}
                y={PAD.top + CH + 18 + d.label.split("\n").length * 14 + 2}
                textAnchor="middle"
                fontSize="9"
                fontStyle="italic"
                className="fill-muted-foreground/60"
              >
                {d.note}
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
          fontSize="11"
          fontWeight="500"
          className="fill-muted-foreground"
        >
          Reemployed at 8 months
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Spera, Buhrfeind &amp; Pennebaker (1994), laid-off engineers. The
        writing group found new full-time work at more than twice the rate of
        the others.
      </figcaption>
    </figure>
  );
}
