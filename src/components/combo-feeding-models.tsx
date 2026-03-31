const W = 640;
const H = 220;

const models = [
  {
    label: "Top-up",
    tag: "Recommended",
    desc: "Breastfeed every session, then offer formula if still hungry",
    color: "#10b981",
    segments: [
      { type: "breast", w: 0.7 },
      { type: "formula", w: 0.3 },
    ],
  },
  {
    label: "Replacement",
    tag: "",
    desc: "1–2 feeds formula-only, breastfeed all other times",
    color: "#f59e0b",
    segments: [
      { type: "breast", w: 0.8 },
      { type: "formula", w: 0.2 },
    ],
  },
  {
    label: "Alternating",
    tag: "Least recommended",
    desc: "Alternate breast and formula feeds",
    color: "#ef4444",
    segments: [
      { type: "breast", w: 0.5 },
      { type: "formula", w: 0.5 },
    ],
  },
];

const ROW_H = 48;
const BAR_X = 180;
const BAR_W = W - BAR_X - 40;
const START_Y = 30;

export function ComboFeedingModels() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Three combination feeding models compared: top-up (recommended), replacement, and alternating (least recommended)"
      >
        <defs>
          <pattern
            id="formula-hatch"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-neutral-300 dark:text-neutral-600"
            />
          </pattern>
        </defs>

        {models.map((m, i) => {
          const cy = START_Y + i * (ROW_H + 16);
          const barY = cy - 12;
          let x = BAR_X;

          return (
            <g key={m.label}>
              {/* Label */}
              <text
                x={10}
                y={cy + 2}
                className="text-[12px] font-semibold fill-foreground/80"
              >
                {m.label}
              </text>
              {m.tag && (
                <text
                  x={10}
                  y={cy + 16}
                  className={`text-[9px] font-medium ${
                    m.tag === "Recommended"
                      ? "fill-emerald-500 dark:fill-emerald-400"
                      : "fill-red-400 dark:fill-red-400"
                  }`}
                >
                  {m.tag}
                </text>
              )}

              {/* Stacked bar */}
              {m.segments.map((seg, j) => {
                const segW = seg.w * BAR_W;
                const segX = x;
                x += segW;
                return (
                  <rect
                    key={j}
                    x={segX}
                    y={barY}
                    width={segW}
                    height={24}
                    rx={j === 0 ? 4 : 0}
                    fill={
                      seg.type === "breast"
                        ? m.color
                        : "url(#formula-hatch)"
                    }
                    opacity={seg.type === "breast" ? 0.6 : 1}
                    stroke={
                      seg.type === "formula" ? m.color : "none"
                    }
                    strokeWidth={seg.type === "formula" ? 1 : 0}
                  />
                );
              })}

              {/* Description */}
              <text
                x={BAR_X}
                y={cy + 24}
                className="text-[9px] fill-muted-foreground/60"
              >
                {m.desc}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <rect
          x={BAR_X}
          y={H - 18}
          width={12}
          height={8}
          rx={2}
          fill="#10b981"
          opacity={0.6}
        />
        <text
          x={BAR_X + 16}
          y={H - 11}
          className="text-[9px] fill-muted-foreground/70"
        >
          Breast milk
        </text>
        <rect
          x={BAR_X + 90}
          y={H - 18}
          width={12}
          height={8}
          rx={2}
          fill="url(#formula-hatch)"
          stroke="#10b981"
          strokeWidth={0.5}
        />
        <text
          x={BAR_X + 106}
          y={H - 11}
          className="text-[9px] fill-muted-foreground/70"
        >
          Formula
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        The top-up model gives the best results for maintaining breast milk
        supply in early weeks.
      </figcaption>
    </figure>
  );
}
