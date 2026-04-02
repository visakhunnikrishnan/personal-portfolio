/*
 * AI Scientific Impact – visual impact cards with scale indicators
 *
 * Key AI breakthroughs in science shown as visual cards with
 * proportional circles representing the magnitude of each discovery.
 * Data from Nature publications and official announcements.
 */

const W = 640;
const H = 420;
const PAD = { top: 16, right: 16, bottom: 16, left: 16 };
const CW = W - PAD.left - PAD.right;

const discoveries = [
  {
    name: "AlphaFold",
    metric: "214M",
    unit: "protein structures predicted",
    badge: "2024 Nobel Prize",
    scale: 1.0,
    color: "#8b5cf6",
    icon: "M 12 3 C 7 3 3 7 3 12 C 3 17 7 21 12 21 C 17 21 21 17 21 12 C 21 10 20 8 18.5 6.5 C 16 8 13 9 12 12 C 11 9 8 8 5.5 6.5 C 4 8 3 10 3 12",
  },
  {
    name: "GNoME",
    metric: "381K",
    unit: "stable materials discovered",
    badge: "2.2M crystal structures",
    scale: 0.65,
    color: "#06b6d4",
    icon: "M 12 2 L 15 9 L 22 9 L 16.5 13.5 L 18.5 21 L 12 16.5 L 5.5 21 L 7.5 13.5 L 2 9 L 9 9 Z",
  },
  {
    name: "AlphaGeometry 2",
    metric: "42/50",
    unit: "IMO geometry problems solved",
    badge: "Gold-medal level",
    scale: 0.5,
    color: "#10b981",
    icon: "M 4 20 L 12 4 L 20 20 Z M 8 16 L 16 16",
  },
  {
    name: "FunSearch",
    metric: "1st",
    unit: "LLM-verified math discovery",
    badge: "20-year record broken",
    scale: 0.4,
    color: "#f59e0b",
    icon: "M 9 2 L 9 11 L 2 11 M 15 22 L 15 13 L 22 13",
  },
];

const COL_W = (CW - 12) / 2;
const ROW_H = (H - PAD.top - PAD.bottom - 12) / 2;

export function AiScientificImpact() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Four AI scientific breakthroughs shown as visual cards with proportional impact indicators"
      >
        <defs>
          <filter id="sci-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
          </filter>
          {discoveries.map((d) => (
            <radialGradient key={d.name} id={`sci-${d.name}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={d.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={d.color} stopOpacity="0.03" />
            </radialGradient>
          ))}
        </defs>

        {discoveries.map((d, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const cardX = PAD.left + col * (COL_W + 12);
          const cardY = PAD.top + row * (ROW_H + 12);
          const bubbleR = 24 + d.scale * 28;

          return (
            <g key={d.name}>
              {/* Card background */}
              <rect
                x={cardX}
                y={cardY}
                width={COL_W}
                height={ROW_H}
                rx={12}
                className="fill-neutral-50 dark:fill-neutral-900/80 stroke-neutral-200 dark:stroke-neutral-800"
                strokeWidth="0.75"
                filter="url(#sci-shadow)"
              />

              {/* Scale bubble (top-right) */}
              <circle
                cx={cardX + COL_W - 44}
                cy={cardY + ROW_H / 2 - 4}
                r={bubbleR}
                fill={`url(#sci-${d.name})`}
              />

              {/* Metric number inside bubble */}
              <text
                x={cardX + COL_W - 44}
                y={cardY + ROW_H / 2 - 2}
                textAnchor="middle"
                fontSize={d.metric.length > 3 ? "16" : "22"}
                fontWeight="800"
                fill={d.color}
                fillOpacity="0.8"
              >
                {d.metric}
              </text>

              {/* Name */}
              <text
                x={cardX + 16}
                y={cardY + 28}
                fontSize="14"
                fontWeight="700"
                fill={d.color}
              >
                {d.name}
              </text>

              {/* Badge */}
              <rect
                x={cardX + 16}
                y={cardY + 38}
                width={d.badge.length * 6.5 + 12}
                height={18}
                rx={9}
                fill={d.color}
                fillOpacity="0.1"
              />
              <text
                x={cardX + 22}
                y={cardY + 51}
                fontSize="9"
                fontWeight="600"
                fill={d.color}
              >
                {d.badge}
              </text>

              {/* Unit description */}
              <text
                x={cardX + 16}
                y={cardY + ROW_H - 20}
                fontSize="10"
                className="fill-muted-foreground"
              >
                {d.unit}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        AI is already producing real scientific results. Circle size reflects
        the scale of each breakthrough. AlphaFold alone predicted structures
        for 214 million proteins and earned a Nobel Prize.
      </figcaption>
    </figure>
  );
}
