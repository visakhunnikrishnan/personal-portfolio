const W = 640;
const H = 300;
const PAD = { top: 36, right: 30, bottom: 52, left: 72 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  { age: "Wk 1–2", day: 8.5, night: 8.5, longest: 3 },
  { age: "Wk 3–4", day: 7.5, night: 8.5, longest: 3.5 },
  { age: "Mo 2", day: 6, night: 9, longest: 5 },
  { age: "Mo 3", day: 5, night: 10, longest: 5.5 },
  { age: "Mo 4–6", day: 4, night: 11, longest: 7 },
];

const MAX_HRS = 20;
const GROUP_W = CW / data.length;
const BAR_W = 40;

function y(hrs: number) {
  return PAD.top + CH - (hrs / MAX_HRS) * CH;
}

export function SleepConsolidationChart() {
  // Line path for longest stretch
  const linePoints = data
    .map((d, i) => {
      const cx = PAD.left + (i + 0.5) * GROUP_W;
      return `${cx},${y(d.longest)}`;
    })
    .join(" L ");
  const linePath = `M ${linePoints}`;

  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Stacked chart showing daytime and nighttime sleep hours from week 1 through month 6, with a line showing longest unbroken night stretch growing from 3 to 7 hours"
      >
        <defs>
          <linearGradient id="day-sleep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="night-sleep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
          </linearGradient>
          <filter id="sleep-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodOpacity="0.1"
            />
          </filter>
        </defs>

        {/* Grid lines */}
        {[4, 8, 12, 16].map((v) => (
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
              {v}h
            </text>
          </g>
        ))}

        {/* Stacked bars */}
        {data.map((d, i) => {
          const cx = PAD.left + (i + 0.5) * GROUP_W;
          const barX = cx - BAR_W / 2;
          const total = d.day + d.night;

          // Night on bottom, day on top
          const nightY = y(d.night);
          const nightH = y(0) - y(d.night);
          const dayY = y(total);
          const dayH = y(d.night) - y(total);

          return (
            <g key={d.age}>
              {/* Night bar (bottom) */}
              <rect
                x={barX}
                y={nightY}
                width={BAR_W}
                height={nightH}
                rx={0}
                fill="url(#night-sleep)"
                filter="url(#sleep-glow)"
              />
              {/* Night label */}
              <text
                x={cx}
                y={nightY + nightH / 2 + 4}
                textAnchor="middle"
                className="text-[9px] font-medium fill-indigo-700 dark:fill-indigo-300"
              >
                {d.night}h
              </text>

              {/* Day bar (top) */}
              <rect
                x={barX}
                y={dayY}
                width={BAR_W}
                height={dayH}
                rx={4}
                fill="url(#day-sleep)"
              />
              {/* Day label */}
              <text
                x={cx}
                y={dayY + dayH / 2 + 4}
                textAnchor="middle"
                className="text-[9px] font-medium fill-amber-700 dark:fill-amber-300"
              >
                {d.day}h
              </text>

              {/* Total above */}
              <text
                x={cx}
                y={dayY - 8}
                textAnchor="middle"
                className="text-[10px] font-semibold fill-foreground/70"
              >
                {total}h
              </text>

              {/* X label */}
              <text
                x={cx}
                y={PAD.top + CH + 18}
                textAnchor="middle"
                className="text-[11px] fill-muted-foreground"
              >
                {d.age}
              </text>
            </g>
          );
        })}

        {/* Longest stretch line */}
        <path
          d={linePath}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="6 3"
        />
        {data.map((d, i) => {
          const cx = PAD.left + (i + 0.5) * GROUP_W;
          return (
            <g key={`dot-${i}`}>
              <circle cx={cx} cy={y(d.longest)} r={4} fill="#10b981" />
              <circle
                cx={cx}
                cy={y(d.longest)}
                r={1.5}
                fill="white"
                opacity={0.4}
              />
              <text
                x={cx + 8}
                y={y(d.longest) - 8}
                textAnchor="middle"
                className="text-[8px] font-medium fill-emerald-600 dark:fill-emerald-400"
              >
                {d.longest}h
              </text>
            </g>
          );
        })}

        {/* Y-axis title */}
        <text
          x={16}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          transform={`rotate(-90, 16, ${PAD.top + CH / 2})`}
          className="text-[11px] font-medium fill-muted-foreground"
        >
          Hours / 24h
        </text>

        {/* Legend */}
        <rect
          x={PAD.left}
          y={H - 12}
          width={10}
          height={6}
          rx={2}
          fill="#fbbf24"
          opacity={0.7}
        />
        <text
          x={PAD.left + 14}
          y={H - 7}
          className="text-[9px] fill-muted-foreground/70"
        >
          Daytime sleep
        </text>
        <rect
          x={PAD.left + 100}
          y={H - 12}
          width={10}
          height={6}
          rx={2}
          fill="#6366f1"
          opacity={0.7}
        />
        <text
          x={PAD.left + 114}
          y={H - 7}
          className="text-[9px] fill-muted-foreground/70"
        >
          Nighttime sleep
        </text>
        <line
          x1={PAD.left + 210}
          y1={H - 9}
          x2={PAD.left + 225}
          y2={H - 9}
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        <text
          x={PAD.left + 229}
          y={H - 7}
          className="text-[9px] fill-muted-foreground/70"
        >
          Longest unbroken stretch
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Sleep gradually consolidates into nighttime. By month 4&ndash;6, the
        longest unbroken stretch reaches 6&ndash;8 hours.
      </figcaption>
    </figure>
  );
}
