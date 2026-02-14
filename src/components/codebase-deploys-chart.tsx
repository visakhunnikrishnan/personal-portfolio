const W = 640;
const H = 280;

const LX = 24;
const LW = 160;
const LH = 100;
const LY = (H - LH) / 2;
const LCX = LX + LW / 2;
const LCY = LY + LH / 2;

const RX = 440;
const RW = 176;
const PILL_H = 32;
const GAP = 10;
const MID_X = 312;
const R = 14;

const deploys = [
  { label: "Production", config: ".env.production", accent: "#10b981" },
  { label: "Staging", config: ".env.staging", accent: "#f59e0b" },
  { label: "QA", config: ".env.qa", accent: "#8b5cf6" },
  { label: "Dev 1", config: ".env.local", accent: "#3b82f6" },
  { label: "Dev 2", config: ".env.local", accent: "#3b82f6" },
];

const totalH = deploys.length * PILL_H + (deploys.length - 1) * GAP;
const START_Y = (H - totalH) / 2;

function getPath(cy: number, lineStart: number, lineEnd: number): string {
  const dy = cy - LCY;
  const absDy = Math.abs(dy);

  if (absDy < 2) {
    // Same height — straight line
    return `M ${lineStart},${LCY} H ${lineEnd}`;
  }

  const r = Math.min(R, absDy / 2);

  if (dy > 0) {
    // Target is below: go right, curve down, go down, curve right
    return [
      `M ${lineStart},${LCY}`,
      `H ${MID_X - r}`,
      `A ${r} ${r} 0 0 1 ${MID_X},${LCY + r}`,
      `V ${cy - r}`,
      `A ${r} ${r} 0 0 0 ${MID_X + r},${cy}`,
      `H ${lineEnd}`,
    ].join(" ");
  }

  // Target is above: go right, curve up, go up, curve right
  return [
    `M ${lineStart},${LCY}`,
    `H ${MID_X - r}`,
    `A ${r} ${r} 0 0 0 ${MID_X},${LCY - r}`,
    `V ${cy + r}`,
    `A ${r} ${r} 0 0 1 ${MID_X + r},${cy}`,
    `H ${lineEnd}`,
  ].join(" ");
}

export function CodebaseDeploysChart() {
  const lineStart = LX + LW;
  const lineEnd = RX;

  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="One codebase deploying to multiple environments: Production, Staging, QA, Dev 1, and Dev 2 — same source code with different configuration per environment"
      >
        <defs>
          <marker
            id="cb-arrow"
            viewBox="0 0 8 6"
            refX="7"
            refY="3"
            markerWidth="8"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M 0 0.5 L 7 3 L 0 5.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-300 dark:text-neutral-600"
            />
          </marker>
        </defs>

        {/* Codebase box */}
        <rect
          x={LX}
          y={LY}
          width={LW}
          height={LH}
          rx={12}
          fill="currentColor"
          className="text-neutral-100 dark:text-neutral-800/80"
        />
        <rect
          x={LX}
          y={LY}
          width={LW}
          height={LH}
          rx={12}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-200 dark:text-neutral-700"
        />

        {/* Git icon (simple branch symbol) */}
        <circle
          cx={LCX}
          cy={LCY - 20}
          r={4}
          fill="currentColor"
          className="text-neutral-400 dark:text-neutral-500"
        />
        <circle
          cx={LCX}
          cy={LCY - 6}
          r={4}
          fill="currentColor"
          className="text-neutral-400 dark:text-neutral-500"
        />
        <line
          x1={LCX}
          y1={LCY - 16}
          x2={LCX}
          y2={LCY - 10}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-neutral-400 dark:text-neutral-500"
        />

        <text
          x={LCX}
          y={LCY + 14}
          textAnchor="middle"
          className="text-[14px] font-semibold fill-foreground/90"
        >
          Codebase
        </text>
        <text
          x={LCX}
          y={LCY + 30}
          textAnchor="middle"
          className="text-[9px] font-mono fill-muted-foreground/50"
        >
          main @ abc123
        </text>

        {/* Deploy targets */}
        {deploys.map((d, i) => {
          const rowY = START_Y + i * (PILL_H + GAP);
          const cy = rowY + PILL_H / 2;

          return (
            <g key={d.label}>
              {/* Connecting line with rounded corners */}
              <path
                d={getPath(cy, lineStart, lineEnd)}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                markerEnd="url(#cb-arrow)"
                className="text-neutral-300 dark:text-neutral-600"
              />

              {/* Deploy pill */}
              <rect
                x={RX}
                y={rowY}
                width={RW}
                height={PILL_H}
                rx={8}
                fill="currentColor"
                className="text-neutral-50 dark:text-neutral-800/80"
              />
              <rect
                x={RX}
                y={rowY}
                width={RW}
                height={PILL_H}
                rx={8}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-neutral-200 dark:text-neutral-700"
              />

              {/* Accent dot */}
              <circle cx={RX + 14} cy={cy} r={4} fill={d.accent} opacity={0.8} />
              <circle cx={RX + 14} cy={cy} r={1.5} fill="white" opacity={0.4} />

              {/* Label */}
              <text
                x={RX + 26}
                y={cy + 1}
                textAnchor="start"
                dominantBaseline="central"
                className="text-[11px] font-medium fill-foreground/80"
              >
                {d.label}
              </text>

              {/* Config label */}
              <text
                x={RX + RW - 10}
                y={cy + 1}
                textAnchor="end"
                dominantBaseline="central"
                className="text-[8px] font-mono fill-muted-foreground/40"
              >
                {d.config}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <text
          x={W / 2}
          y={H - 10}
          textAnchor="middle"
          className="text-[10px] fill-muted-foreground/50"
        >
          Same code, different configuration. Every deploy comes from one source.
        </text>
      </svg>
    </figure>
  );
}
