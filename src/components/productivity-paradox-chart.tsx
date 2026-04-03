/*
 * Productivity Paradox Chart – grouped bar chart
 *
 * Shows the gap between perceived and actual productivity gains from AI coding tools.
 * Data from METR RCT (2025), GitHub Copilot studies, Anthropic internal data,
 * and Bain real-world measurements.
 */

const W = 640;
const H = 320;
const PAD = { top: 32, right: 24, bottom: 72, left: 40 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  {
    label: "METR RCT",
    perceived: 24,
    actual: -19,
    note: "Perception vs reality",
  },
  {
    label: "GitHub\nCopilot",
    perceived: 55,
    actual: 55,
    note: "Controlled JS task",
    singleBar: true,
  },
  {
    label: "Anthropic\ninternal",
    perceived: 50,
    actual: 50,
    note: "Median boost",
    singleBar: true,
  },
  {
    label: "Bain\nreal-world",
    perceived: null,
    actual: 12.5,
    note: "10-15% actual savings",
    singleBar: true,
  },
];

const MAX = 60;
const MIN = -25;
const RANGE = MAX - MIN;
const GROUP_W = CW / data.length;
const BAR_W = 36;

function yPos(v: number) {
  return PAD.top + CH - ((v - MIN) / RANGE) * CH;
}

const ZERO_Y = yPos(0);

export function ProductivityParadoxChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Grouped bar chart showing the productivity paradox: developers perceive large gains from AI tools but controlled studies often find smaller or negative effects"
      >
        <defs>
          <linearGradient id="pp-green" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="pp-red" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="pp-cyan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="pp-violet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="pp-amber" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[-20, 0, 20, 40, 60].map((v) => (
          <g key={v}>
            <line
              x1={PAD.left}
              y1={yPos(v)}
              x2={PAD.left + CW}
              y2={yPos(v)}
              stroke="currentColor"
              strokeWidth={v === 0 ? "1" : "0.5"}
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={PAD.left - 6}
              y={yPos(v) + 3}
              textAnchor="end"
              className="text-[9px] fill-muted-foreground/50"
            >
              {v > 0 ? `+${v}%` : `${v}%`}
            </text>
          </g>
        ))}

        {/* METR RCT – paired bars */}
        {(() => {
          const gx = PAD.left + 0 * GROUP_W + GROUP_W / 2;
          const perceivedH = Math.abs((24 / RANGE) * CH);
          const actualH = Math.abs((19 / RANGE) * CH);
          return (
            <g>
              {/* Perceived bar (green, going up) */}
              <rect
                x={gx - BAR_W - 2}
                y={ZERO_Y - perceivedH}
                width={BAR_W}
                height={perceivedH}
                rx={3}
                fill="url(#pp-green)"
              />
              <text
                x={gx - BAR_W / 2 - 2}
                y={ZERO_Y - perceivedH - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#10b981"
              >
                +24%
              </text>

              {/* Actual bar (red, going down) */}
              <rect
                x={gx + 2}
                y={ZERO_Y}
                width={BAR_W}
                height={actualH}
                rx={3}
                fill="url(#pp-red)"
              />
              <text
                x={gx + BAR_W / 2 + 2}
                y={ZERO_Y + actualH + 14}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#ef4444"
              >
                -19%
              </text>

              {/* Gap annotation */}
              <line
                x1={gx + BAR_W + 10}
                y1={ZERO_Y - perceivedH}
                x2={gx + BAR_W + 10}
                y2={ZERO_Y + actualH}
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x={gx + BAR_W + 16}
                y={ZERO_Y - perceivedH / 2 + actualH / 2 + 3}
                fontSize="8"
                fontWeight="600"
                fill="#ef4444"
              >
                39pp gap
              </text>

              {/* X label */}
              <text
                x={gx}
                y={PAD.top + CH + 16}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground font-medium"
              >
                METR RCT
              </text>
            </g>
          );
        })()}

        {/* GitHub Copilot */}
        {(() => {
          const gx = PAD.left + 1 * GROUP_W + GROUP_W / 2;
          const barH = (55 / RANGE) * CH;
          return (
            <g>
              <rect
                x={gx - BAR_W / 2}
                y={ZERO_Y - barH}
                width={BAR_W}
                height={barH}
                rx={3}
                fill="url(#pp-cyan)"
              />
              <text
                x={gx}
                y={ZERO_Y - barH - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#06b6d4"
              >
                +55%
              </text>
              <text
                x={gx}
                y={PAD.top + CH + 16}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground font-medium"
              >
                <tspan x={gx} dy="0">GitHub</tspan>
                <tspan x={gx} dy="12">Copilot</tspan>
              </text>
            </g>
          );
        })()}

        {/* Anthropic internal */}
        {(() => {
          const gx = PAD.left + 2 * GROUP_W + GROUP_W / 2;
          const barH = (50 / RANGE) * CH;
          return (
            <g>
              <rect
                x={gx - BAR_W / 2}
                y={ZERO_Y - barH}
                width={BAR_W}
                height={barH}
                rx={3}
                fill="url(#pp-violet)"
              />
              <text
                x={gx}
                y={ZERO_Y - barH - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#8b5cf6"
              >
                +50%
              </text>
              <text
                x={gx}
                y={PAD.top + CH + 16}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground font-medium"
              >
                <tspan x={gx} dy="0">Anthropic</tspan>
                <tspan x={gx} dy="12">internal</tspan>
              </text>
            </g>
          );
        })()}

        {/* Bain real-world */}
        {(() => {
          const gx = PAD.left + 3 * GROUP_W + GROUP_W / 2;
          const barH = (12.5 / RANGE) * CH;
          return (
            <g>
              <rect
                x={gx - BAR_W / 2}
                y={ZERO_Y - barH}
                width={BAR_W}
                height={barH}
                rx={3}
                fill="url(#pp-amber)"
              />
              <text
                x={gx}
                y={ZERO_Y - barH - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#f59e0b"
              >
                +10-15%
              </text>
              <text
                x={gx}
                y={PAD.top + CH + 16}
                textAnchor="middle"
                className="text-[10px] fill-muted-foreground font-medium"
              >
                <tspan x={gx} dy="0">Bain</tspan>
                <tspan x={gx} dy="12">real-world</tspan>
              </text>
            </g>
          );
        })()}

        {/* Legend */}
        <rect x={PAD.left} y={PAD.top - 20} width={10} height={10} rx={2} fill="url(#pp-green)" />
        <text x={PAD.left + 14} y={PAD.top - 11} className="text-[9px] fill-muted-foreground">
          Perceived gain
        </text>
        <rect x={PAD.left + 100} y={PAD.top - 20} width={10} height={10} rx={2} fill="url(#pp-red)" />
        <text x={PAD.left + 114} y={PAD.top - 11} className="text-[9px] fill-muted-foreground">
          Actual (controlled)
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        What developers believe vs what studies find. The gap between perception
        and reality can be as large as 39 percentage points (METR, 2025).
      </figcaption>
    </figure>
  );
}
