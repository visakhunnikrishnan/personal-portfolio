/*
 * Fluid vs Crystallized Intelligence – illustrated comparison
 *
 * Visual metaphors: fluid = novel abstract patterns with a question mark,
 * crystallized = organized knowledge grid. Performance bars below each.
 * Based on Cattell (1963) and CHC model.
 */

const W = 640;
const H = 340;
const MID = W / 2;
const GF_COLOR = "#8b5cf6";
const GC_COLOR = "#06b6d4";

export function FluidVsCrystallized() {
  // Novel pattern shapes for fluid side (like ARC-AGI puzzles)
  const puzzleShapes = [
    { x: 60, y: 60, w: 28, h: 28, color: GF_COLOR, opacity: 0.7 },
    { x: 95, y: 45, w: 20, h: 40, color: GF_COLOR, opacity: 0.5 },
    { x: 50, y: 95, w: 40, h: 20, color: GF_COLOR, opacity: 0.4 },
    { x: 100, y: 92, w: 24, h: 24, color: GF_COLOR, opacity: 0.6 },
    { x: 72, y: 35, w: 16, h: 16, color: GF_COLOR, opacity: 0.3 },
    { x: 130, y: 65, w: 22, h: 30, color: GF_COLOR, opacity: 0.35 },
  ];

  // Knowledge grid for crystallized side
  const gridCols = 7;
  const gridRows = 5;
  const dotR = 4;
  const gridSpacing = 18;
  const gridStartX = MID + (W - MID) / 2 - ((gridCols - 1) * gridSpacing) / 2;
  const gridStartY = 42;

  return (
    <figure className="not-prose my-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Illustrated comparison: fluid intelligence shown as abstract puzzle shapes, crystallized as organized knowledge grid, with AI vs human performance bars"
      >
        <defs>
          <filter id="fvc-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
          </filter>
          <linearGradient id="gf-bar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={GF_COLOR} stopOpacity="0.3" />
            <stop offset="100%" stopColor={GF_COLOR} stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="gc-bar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={GC_COLOR} stopOpacity="0.3" />
            <stop offset="100%" stopColor={GC_COLOR} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* ── LEFT: Fluid Intelligence ── */}

        {/* Abstract puzzle shapes - scattered, irregular, novel */}
        <g transform="translate(40, 20)">
          {puzzleShapes.map((s, i) => (
            <rect
              key={i}
              x={s.x}
              y={s.y}
              width={s.w}
              height={s.h}
              rx={4}
              fill={s.color}
              fillOpacity={s.opacity}
              transform={`rotate(${i * 15 - 20}, ${s.x + s.w / 2}, ${s.y + s.h / 2})`}
            />
          ))}
          {/* Question mark - the novel problem */}
          <text
            x={95}
            y={85}
            textAnchor="middle"
            fontSize="32"
            fontWeight="800"
            fill={GF_COLOR}
            fillOpacity="0.25"
          >
            ?
          </text>
          {/* Arrow suggesting "figure it out" */}
          <path
            d="M 155 75 C 170 60, 185 70, 180 85"
            fill="none"
            stroke={GF_COLOR}
            strokeWidth="1.5"
            strokeOpacity="0.4"
            strokeDasharray="4 3"
          />
          <polygon
            points="178,90 184,84 175,84"
            fill={GF_COLOR}
            fillOpacity="0.4"
          />
        </g>

        {/* Fluid label */}
        <text
          x={MID / 2}
          y={170}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={GF_COLOR}
        >
          Fluid (Gf)
        </text>
        <text
          x={MID / 2}
          y={186}
          textAnchor="middle"
          fontSize="9"
          className="fill-muted-foreground"
        >
          Novel problem-solving
        </text>

        {/* Fluid - AI performance bar */}
        <g transform={`translate(${MID / 2 - 70}, 210)`}>
          <text x="0" y="4" fontSize="8" textAnchor="end" className="fill-foreground">AI</text>
          <rect x="6" y="-4" width="140" height="10" rx="5" className="fill-neutral-100 dark:fill-neutral-800" />
          <rect x="6" y="-4" width={140 * 0.54} height="10" rx="5" fill="url(#gf-bar)" />
          <text x={6 + 140 * 0.54 + 6} y="4" fontSize="8" fontWeight="600" fill={GF_COLOR}>54%</text>

          <text x="0" y="22" fontSize="8" textAnchor="end" className="fill-foreground">Human</text>
          <rect x="6" y="14" width="140" height="10" rx="5" className="fill-neutral-100 dark:fill-neutral-800" />
          <rect x="6" y="14" width={140 * 1.0} height="10" rx="5" className="fill-neutral-300 dark:fill-neutral-600" />
          <text x={6 + 140 + 6} y="22" fontSize="8" fontWeight="600" className="fill-foreground">~100%</text>
        </g>

        <text
          x={MID / 2}
          y={258}
          textAnchor="middle"
          fontSize="8"
          className="fill-muted-foreground/40"
          fontStyle="italic"
        >
          Benchmark: ARC-AGI-2
        </text>

        {/* ── CENTER DIVIDER ── */}
        <line
          x1={MID}
          y1={20}
          x2={MID}
          y2={260}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-neutral-200 dark:text-neutral-700"
        />

        {/* ── RIGHT: Crystallized Intelligence ── */}

        {/* Organized knowledge grid - neat, structured, memorized */}
        <g>
          {Array.from({ length: gridRows }).map((_, row) =>
            Array.from({ length: gridCols }).map((_, col) => {
              const filled = row * gridCols + col < 30;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={gridStartX + col * gridSpacing}
                  cy={gridStartY + row * gridSpacing}
                  r={dotR}
                  fill={GC_COLOR}
                  fillOpacity={filled ? 0.15 + (row * gridCols + col) * 0.025 : 0.05}
                />
              );
            })
          )}
          {/* Connecting lines between some dots - showing structure */}
          {[
            [0, 1], [1, 2], [2, 3],
            [7, 8], [8, 9], [9, 10],
            [14, 15], [15, 16],
            [21, 22], [22, 23], [23, 24],
            [0, 7], [1, 8], [2, 9], [3, 10],
            [7, 14], [8, 15], [9, 16],
            [14, 21], [15, 22], [16, 23],
          ].map(([from, to], i) => {
            const fx = gridStartX + (from % gridCols) * gridSpacing;
            const fy = gridStartY + Math.floor(from / gridCols) * gridSpacing;
            const tx = gridStartX + (to % gridCols) * gridSpacing;
            const ty = gridStartY + Math.floor(to / gridCols) * gridSpacing;
            return (
              <line
                key={i}
                x1={fx}
                y1={fy}
                x2={tx}
                y2={ty}
                stroke={GC_COLOR}
                strokeWidth="0.75"
                strokeOpacity="0.15"
              />
            );
          })}
          {/* Checkmark - known answer */}
          <text
            x={gridStartX + 3 * gridSpacing}
            y={gridStartY + 2.5 * gridSpacing + 4}
            textAnchor="middle"
            fontSize="28"
            fontWeight="800"
            fill={GC_COLOR}
            fillOpacity="0.2"
          >
            &#x2713;
          </text>
        </g>

        {/* Crystallized label */}
        <text
          x={MID + (W - MID) / 2}
          y={170}
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={GC_COLOR}
        >
          Crystallized (Gc)
        </text>
        <text
          x={MID + (W - MID) / 2}
          y={186}
          textAnchor="middle"
          fontSize="9"
          className="fill-muted-foreground"
        >
          Accumulated knowledge
        </text>

        {/* Crystallized - AI performance bar */}
        <g transform={`translate(${MID + (W - MID) / 2 - 70}, 210)`}>
          <text x="0" y="4" fontSize="8" textAnchor="end" className="fill-foreground">AI</text>
          <rect x="6" y="-4" width="140" height="10" rx="5" className="fill-neutral-100 dark:fill-neutral-800" />
          <rect x="6" y="-4" width={140 * 0.93} height="10" rx="5" fill="url(#gc-bar)" />
          <text x={6 + 140 * 0.93 + 6} y="4" fontSize="8" fontWeight="600" fill={GC_COLOR}>93%</text>

          <text x="0" y="22" fontSize="8" textAnchor="end" className="fill-foreground">Human</text>
          <rect x="6" y="14" width="140" height="10" rx="5" className="fill-neutral-100 dark:fill-neutral-800" />
          <rect x="6" y="14" width={140 * 0.90} height="10" rx="5" className="fill-neutral-300 dark:fill-neutral-600" />
          <text x={6 + 140 * 0.90 + 6} y="22" fontSize="8" fontWeight="600" className="fill-foreground">~90%</text>
        </g>

        <text
          x={MID + (W - MID) / 2}
          y={258}
          textAnchor="middle"
          fontSize="8"
          className="fill-muted-foreground/40"
          fontStyle="italic"
        >
          Benchmark: MMLU
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        AI has surpassed humans on knowledge-based tests (right) but
        struggles with novel reasoning (left) - exactly the split Cattell
        predicted in 1963.
      </figcaption>
    </figure>
  );
}
