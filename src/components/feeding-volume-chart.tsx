const W = 640;
const H = 340;
const PAD = { top: 36, right: 40, bottom: 52, left: 72 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  { age: "Wk 1", lo: 200, hi: 480, feeds: "8–12" },
  { age: "Wk 2", lo: 480, hi: 720, feeds: "8–10" },
  { age: "Wk 3–4", lo: 480, hi: 900, feeds: "7–9" },
  { age: "Mo 2", lo: 720, hi: 900, feeds: "6–8" },
  { age: "Mo 3", lo: 750, hi: 1050, feeds: "6–8" },
  { age: "Mo 4–6", lo: 750, hi: 1050, feeds: "5–7" },
];

const MAX_ML = 1200;
const BAR_W = CW / data.length - 16;

function y(ml: number) {
  return PAD.top + CH - (ml / MAX_ML) * CH;
}

export function FeedingVolumeChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Daily feeding volume ranges from week 1 through month 6, showing intake plateaus around 750-1050 ml"
      >
        <defs>
          <linearGradient id="feed-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </linearGradient>
          <filter id="feed-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodOpacity="0.1"
            />
          </filter>
        </defs>

        {/* Grid lines */}
        {[200, 400, 600, 800, 1000].map((v) => (
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
              {v} ml
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const cx = PAD.left + (i + 0.5) * (CW / data.length);
          const barX = cx - BAR_W / 2;
          const barY = y(d.hi);
          const barH = y(d.lo) - y(d.hi);
          const midY = barY + barH / 2;

          return (
            <g key={d.age}>
              {/* Bar */}
              <rect
                x={barX}
                y={barY}
                width={BAR_W}
                height={barH}
                rx={4}
                fill="url(#feed-bar)"
                filter="url(#feed-glow)"
              />

              {/* Range label */}
              <text
                x={cx}
                y={midY + 4}
                textAnchor="middle"
                className="text-[9px] font-medium fill-cyan-700 dark:fill-cyan-300"
              >
                {d.lo}–{d.hi}
              </text>

              {/* Feeds per day */}
              <text
                x={cx}
                y={barY - 8}
                textAnchor="middle"
                className="text-[9px] fill-muted-foreground/70"
              >
                {d.feeds}/day
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
          Daily intake (ml)
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Daily feeding volume ranges from week 1 through 6 months. Intake
        plateaus around 750&ndash;1050 ml &mdash; it doesn&apos;t keep
        increasing.
      </figcaption>
    </figure>
  );
}
