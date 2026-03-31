const W = 640;
const H = 200;

const stages = [
  { day: "Day 1", size: 6, label: "5–7 ml", fruit: "Cherry", color: "#f43f5e" },
  { day: "Day 3", size: 24, label: "22–27 ml", fruit: "Walnut", color: "#f59e0b" },
  { day: "Day 7", size: 52, label: "45–60 ml", fruit: "Apricot", color: "#f97316" },
  { day: "Day 30", size: 90, label: "80–120 ml", fruit: "Egg", color: "#8b5cf6" },
];

const MAX_R = 38;
const MIN_R = 8;
const CX_START = 90;
const CX_GAP = (W - 2 * CX_START) / (stages.length - 1);
const CY = 90;

function radius(size: number) {
  return MIN_R + ((size - 6) / (90 - 6)) * (MAX_R - MIN_R);
}

export function NewbornStomachSize() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Newborn stomach capacity growing from 5-7 ml on day 1 to 80-120 ml by day 30"
      >
        <defs>
          {stages.map((s, i) => (
            <radialGradient key={`g-${i}`} id={`stomach-g-${i}`}>
              <stop offset="0%" stopColor={s.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.08" />
            </radialGradient>
          ))}
          <filter id="stomach-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="3"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {/* Connecting line */}
        <line
          x1={CX_START}
          y1={CY}
          x2={CX_START + CX_GAP * (stages.length - 1)}
          y2={CY}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {stages.map((s, i) => {
          const cx = CX_START + i * CX_GAP;
          const r = radius(s.size);
          return (
            <g key={s.day}>
              {/* Glow circle */}
              <circle
                cx={cx}
                cy={CY}
                r={r + 6}
                fill={`url(#stomach-g-${i})`}
              />
              {/* Main circle */}
              <circle
                cx={cx}
                cy={CY}
                r={r}
                fill={s.color}
                opacity={0.85}
                filter="url(#stomach-glow)"
              />
              {/* Inner highlight */}
              <circle
                cx={cx - r * 0.2}
                cy={CY - r * 0.2}
                r={r * 0.3}
                fill="white"
                opacity={0.2}
              />
              {/* Volume label */}
              <text
                x={cx}
                y={CY + r + 20}
                textAnchor="middle"
                className="text-[11px] font-semibold fill-foreground/80"
              >
                {s.label}
              </text>
              {/* Fruit comparison */}
              <text
                x={cx}
                y={CY + r + 34}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground/60"
              >
                ({s.fruit})
              </text>
              {/* Day label */}
              <text
                x={cx}
                y={CY - r - 12}
                textAnchor="middle"
                className="text-[11px] font-medium fill-muted-foreground"
              >
                {s.day}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        A newborn&apos;s stomach capacity in the first month
      </figcaption>
    </figure>
  );
}
