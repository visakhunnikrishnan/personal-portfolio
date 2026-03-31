const W = 640;
const H = 240;
const PAD = { top: 36, right: 30, bottom: 48, left: 72 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  { age: "0–2 wk", min: 2, max: 6, freq: "2–3x" },
  { age: "2–4 wk", min: 6, max: 15, freq: "2–3x" },
  { age: "4–7 wk", min: 15, max: 30, freq: "3+" },
  { age: "2–4 mo", min: 20, max: 30, freq: "Multiple" },
  { age: "4–6 mo", min: 40, max: 60, freq: "Throughout" },
];

const MAX_MIN = 70;
const GROUP_W = CW / data.length;
const BAR_W = 36;

function y(mins: number) {
  return PAD.top + CH - (mins / MAX_MIN) * CH;
}

export function TummyTimeChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Tummy time progression from 2-6 minutes total daily at 0-2 weeks to 40-60 minutes at 4-6 months"
      >
        <defs>
          <linearGradient id="tummy-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
          <filter id="tummy-glow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Grid lines */}
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
              {v}m
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = PAD.left + (i + 0.5) * GROUP_W;
          const barX = cx - BAR_W / 2;
          const barY = y(d.max);
          const barH = y(d.min) - y(d.max);

          return (
            <g key={d.age}>
              <rect
                x={barX}
                y={barY}
                width={BAR_W}
                height={barH}
                rx={4}
                fill="url(#tummy-bar)"
                filter="url(#tummy-glow)"
              />
              {/* Range label */}
              <text
                x={cx}
                y={barY + barH / 2 + 4}
                textAnchor="middle"
                className="text-[9px] font-medium fill-emerald-700 dark:fill-emerald-300"
              >
                {d.min}–{d.max}
              </text>
              {/* Frequency */}
              <text
                x={cx}
                y={barY - 8}
                textAnchor="middle"
                className="text-[9px] fill-muted-foreground/70"
              >
                {d.freq}/day
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

        {/* Y-axis title */}
        <text
          x={16}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          transform={`rotate(-90, 16, ${PAD.top + CH / 2})`}
          className="text-[11px] font-medium fill-muted-foreground"
        >
          Total min / day
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Tummy time builds gradually. Start on your chest if baby resists the
        floor.
      </figcaption>
    </figure>
  );
}
