const W = 640;
const H = 320;
const PAD = { top: 24, right: 20, bottom: 16, left: 20 };

const nutrients = [
  { name: "Protein", target: "75 g", pct: 85, color: "#ef4444", sources: "Fish, eggs, dal, chicken" },
  { name: "Iron", target: "21 mg+", pct: 70, color: "#f97316", sources: "Drumstick leaves, sardines, jaggery" },
  { name: "Calcium", target: "1,000 mg", pct: 90, color: "#fbbf24", sources: "Sesame, ragi, small fish, curd" },
  { name: "DHA", target: "200–300 mg", pct: 65, color: "#06b6d4", sources: "Sardines, mackerel, anchovies" },
  { name: "Vitamin D", target: "1–2k IU", pct: 50, color: "#8b5cf6", sources: "Supplement + sunlight + fish" },
  { name: "Vitamin C", target: "80 mg", pct: 95, color: "#10b981", sources: "Amla, lime, papaya" },
  { name: "Choline", target: "550 mg", pct: 60, color: "#ec4899", sources: "Eggs, fish, peanuts" },
];

const BAR_X = 100;
const BAR_W = W - BAR_X - PAD.right - 20;
const ROW_H = 38;
const START_Y = PAD.top + 16;

export function MaternalNutritionChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Daily nutrient targets for a breastfeeding mother with balanced food sources"
      >
        <defs>
          <filter id="nut-glow">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.08" />
          </filter>
        </defs>

        {nutrients.map((n, i) => {
          const cy = START_Y + i * ROW_H;
          const barY = cy - 8;
          const filledW = (n.pct / 100) * BAR_W;

          return (
            <g key={n.name}>
              {/* Nutrient name */}
              <text
                x={BAR_X - 10}
                y={cy + 2}
                textAnchor="end"
                className="text-[11px] font-semibold fill-foreground/80"
              >
                {n.name}
              </text>

              {/* Track background */}
              <rect
                x={BAR_X}
                y={barY}
                width={BAR_W}
                height={16}
                rx={8}
                fill="currentColor"
                className="text-neutral-100 dark:text-neutral-800"
              />

              {/* Filled bar */}
              <rect
                x={BAR_X}
                y={barY}
                width={filledW}
                height={16}
                rx={8}
                fill={n.color}
                opacity={0.6}
                filter="url(#nut-glow)"
              />

              {/* Target label inside bar */}
              <text
                x={BAR_X + filledW - 8}
                y={cy + 2}
                textAnchor="end"
                className="text-[9px] font-semibold fill-white"
              >
                {n.target}
              </text>

              {/* Sources */}
              <text
                x={BAR_X + BAR_W + 6}
                y={cy + 2}
                className="text-[8px] fill-muted-foreground/50"
              >
                {n.sources.length > 30
                  ? n.sources.slice(0, 30) + "…"
                  : n.sources}
              </text>
            </g>
          );
        })}

        {/* Footer note */}
        <text
          x={W / 2}
          y={H - 8}
          textAnchor="middle"
          className="text-[9px] fill-muted-foreground/50"
        >
          Bar width indicates how easily target is met through a typical balanced
          diet (longer = easier)
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Daily nutrient targets for a combo-feeding mother (~2,400 kcal/day).
        Vitamin D and choline are the hardest to get from diet alone.
      </figcaption>
    </figure>
  );
}
