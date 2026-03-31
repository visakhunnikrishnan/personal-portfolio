const W = 640;
const H = 200;
const PAD = { top: 40, right: 20, bottom: 44, left: 20 };
const CW = W - PAD.left - PAD.right;

const data = [
  { age: "0–2 wk", min: 30, max: 45 },
  { age: "2–4 wk", min: 30, max: 60 },
  { age: "4–8 wk", min: 45, max: 75 },
  { age: "2 mo", min: 60, max: 90 },
  { age: "3 mo", min: 75, max: 120 },
  { age: "4 mo", min: 90, max: 150 },
  { age: "5 mo", min: 120, max: 150 },
  { age: "6 mo", min: 120, max: 180 },
];

const MAX_MIN = 200;
const CH = H - PAD.top - PAD.bottom;

function xPos(i: number) {
  return PAD.left + (i / (data.length - 1)) * CW;
}

function y(minutes: number) {
  return PAD.top + CH - (minutes / MAX_MIN) * CH;
}

export function WakeWindowsChart() {
  // Area paths
  const upperPoints = data.map((d, i) => `${xPos(i)},${y(d.max)}`);
  const lowerPoints = data
    .map((d, i) => `${xPos(i)},${y(d.min)}`)
    .reverse();
  const areaPath = `M ${upperPoints.join(" L ")} L ${lowerPoints.join(" L ")} Z`;
  const upperLine = `M ${upperPoints.join(" L ")}`;
  const lowerLine = `M ${data.map((d, i) => `${xPos(i)},${y(d.min)}`).join(" L ")}`;

  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Wake windows growing from 30-45 minutes at birth to 2-3 hours by 6 months"
      >
        <defs>
          <linearGradient id="wake-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[30, 60, 90, 120, 150, 180].map((v) => (
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
              x={PAD.left - 4}
              y={y(v) + 3}
              textAnchor="end"
              className="text-[9px] fill-muted-foreground/50"
            >
              {v >= 60 ? `${v / 60}h` : `${v}m`}
            </text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPath} fill="url(#wake-area)" />

        {/* Upper line */}
        <path
          d={upperLine}
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Lower line */}
        <path
          d={lowerLine}
          fill="none"
          stroke="#f97316"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* Dots and labels */}
        {data.map((d, i) => {
          const cx = xPos(i);
          return (
            <g key={d.age}>
              <circle cx={cx} cy={y(d.max)} r={3} fill="#f97316" />
              <circle
                cx={cx}
                cy={y(d.min)}
                r={3}
                fill="#f97316"
                opacity={0.5}
              />
              {/* X label */}
              <text
                x={cx}
                y={PAD.top + CH + 16}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground"
              >
                {d.age}
              </text>
              {/* Range label on top */}
              {i % 2 === 0 && (
                <text
                  x={cx}
                  y={y(d.max) - 8}
                  textAnchor="middle"
                  className="text-[8px] font-medium fill-orange-600 dark:fill-orange-400"
                >
                  {d.min}–{d.max}m
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Wake windows grow from 30&ndash;45 minutes at birth to 2&ndash;3 hours
        by 6 months. For the first few months, watching for sleepy cues is more
        reliable than watching the clock.
      </figcaption>
    </figure>
  );
}
