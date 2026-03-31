const W = 640;
const H = 260;

const days = [
  { label: "Day 1–2", wet: 1.5, dirty: 1.5, stool: "Meconium (black/green)" },
  { label: "Day 3–4", wet: 3.5, dirty: 3, stool: "Transitional (greenish)" },
  { label: "Day 5–7", wet: 6, dirty: 3.5, stool: "Yellow, seedy" },
  { label: "Week 2+", wet: 7, dirty: 3.5, stool: "Yellow to greenish" },
];

const PAD = { top: 40, right: 30, bottom: 60, left: 60 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;
const MAX_COUNT = 9;
const GROUP_W = CW / days.length;
const BAR_W = 20;

function y(count: number) {
  return PAD.top + CH - (count / MAX_COUNT) * CH;
}

export function NewbornOutputTracker() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Expected wet and dirty diaper counts from day 1 through week 2 and beyond"
      >
        <defs>
          <linearGradient id="wet-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="dirty-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
          </linearGradient>
          <filter id="output-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodOpacity="0.1"
            />
          </filter>
        </defs>

        {/* Grid lines */}
        {[2, 4, 6, 8].map((v) => (
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

        {/* Threshold line at 6 */}
        <line
          x1={PAD.left}
          y1={y(6)}
          x2={PAD.left + CW}
          y2={y(6)}
          stroke="#10b981"
          strokeWidth="1"
          strokeDasharray="6 3"
          opacity={0.5}
        />
        <text
          x={PAD.left + CW + 4}
          y={y(6) + 3}
          className="text-[8px] fill-emerald-500 dark:fill-emerald-400"
        >
          6+
        </text>

        {/* Grouped bars */}
        {days.map((d, i) => {
          const groupX = PAD.left + i * GROUP_W + GROUP_W / 2;
          const wetX = groupX - BAR_W - 3;
          const dirtyX = groupX + 3;
          const wetH = (d.wet / MAX_COUNT) * CH;
          const dirtyH = (d.dirty / MAX_COUNT) * CH;

          return (
            <g key={d.label}>
              {/* Wet diaper bar */}
              <rect
                x={wetX}
                y={y(d.wet)}
                width={BAR_W}
                height={wetH}
                rx={3}
                fill="url(#wet-grad)"
                filter="url(#output-glow)"
              />
              <text
                x={wetX + BAR_W / 2}
                y={y(d.wet) - 6}
                textAnchor="middle"
                className="text-[9px] font-semibold fill-sky-600 dark:fill-sky-400"
              >
                {d.wet % 1 === 0 ? d.wet : `${d.wet - 0.5}–${d.wet + 0.5}`}
              </text>

              {/* Dirty diaper bar */}
              <rect
                x={dirtyX}
                y={y(d.dirty)}
                width={BAR_W}
                height={dirtyH}
                rx={3}
                fill="url(#dirty-grad)"
                filter="url(#output-glow)"
              />
              <text
                x={dirtyX + BAR_W / 2}
                y={y(d.dirty) - 6}
                textAnchor="middle"
                className="text-[9px] font-semibold fill-amber-600 dark:fill-amber-400"
              >
                {d.dirty % 1 === 0
                  ? d.dirty
                  : `${d.dirty - 0.5}–${d.dirty + 0.5}`}
              </text>

              {/* X label */}
              <text
                x={groupX}
                y={PAD.top + CH + 18}
                textAnchor="middle"
                className="text-[11px] font-medium fill-muted-foreground"
              >
                {d.label}
              </text>
              {/* Stool type */}
              <text
                x={groupX}
                y={PAD.top + CH + 32}
                textAnchor="middle"
                className="text-[8px] fill-muted-foreground/50"
              >
                {d.stool}
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
          Diapers / 24 hrs
        </text>

        {/* Legend */}
        <rect
          x={PAD.left}
          y={H - 12}
          width={10}
          height={6}
          rx={2}
          fill="#38bdf8"
          opacity={0.7}
        />
        <text
          x={PAD.left + 14}
          y={H - 7}
          className="text-[9px] fill-muted-foreground/70"
        >
          Wet diapers
        </text>
        <rect
          x={PAD.left + 90}
          y={H - 12}
          width={10}
          height={6}
          rx={2}
          fill="#fbbf24"
          opacity={0.7}
        />
        <text
          x={PAD.left + 104}
          y={H - 7}
          className="text-[9px] fill-muted-foreground/70"
        >
          Dirty diapers
        </text>
        <line
          x1={PAD.left + 190}
          y1={H - 9}
          x2={PAD.left + 205}
          y2={H - 9}
          stroke="#10b981"
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity={0.6}
        />
        <text
          x={PAD.left + 209}
          y={H - 7}
          className="text-[9px] fill-muted-foreground/70"
        >
          Target (6+ wet by day 5)
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Expected diaper output by age. The dashed green line marks the 6+ wet
        diaper target &mdash; the main indicator that baby is getting enough.
      </figcaption>
    </figure>
  );
}
