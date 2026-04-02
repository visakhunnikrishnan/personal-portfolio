/*
 * AI Performance Scoreboard – bubble chart
 *
 * Each benchmark is a row. AI score shown as a filled circle,
 * human expert as a ring. Size and position convey performance.
 * The visual gap between bubble and ring = the "jaggedness."
 * Data from public leaderboards and papers as of early 2026.
 */

const W = 640;
const H = 380;
const PAD = { top: 20, right: 24, bottom: 36, left: 140 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const benchmarks = [
  {
    name: "MMLU",
    desc: "General knowledge",
    ai: 93,
    human: 90,
    color: "#94a3b8",
  },
  {
    name: "AIME 2025",
    desc: "Math olympiad",
    ai: 97,
    human: 95,
    color: "#06b6d4",
  },
  {
    name: "GPQA Diamond",
    desc: "PhD-level science",
    ai: 94,
    human: 85,
    color: "#8b5cf6",
  },
  {
    name: "HLE",
    desc: "Expert questions",
    ai: 53,
    human: 90,
    color: "#ef4444",
  },
  {
    name: "ARC-AGI-2",
    desc: "Novel reasoning",
    ai: 54,
    human: 100,
    color: "#f59e0b",
  },
  {
    name: "Real-world work",
    desc: "Remote Labor Index",
    ai: 2.5,
    human: 95,
    color: "#e11d48",
  },
];

const ROW_H = CH / benchmarks.length;

function x(pct: number) {
  return PAD.left + (pct / 100) * CW;
}

export function AiPerformanceScoreboard() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Bubble chart comparing AI and human scores across benchmarks, showing AI matches humans on academic tests but fails on real-world work"
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((v) => (
          <g key={v}>
            <line
              x1={x(v)}
              y1={PAD.top}
              x2={x(v)}
              y2={PAD.top + CH}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={x(v)}
              y={PAD.top + CH + 16}
              textAnchor="middle"
              className="text-[9px] fill-muted-foreground/50"
            >
              {v}%
            </text>
          </g>
        ))}

        {/* Rows */}
        {benchmarks.map((b, i) => {
          const rowY = PAD.top + i * ROW_H + ROW_H / 2;
          const aiX = x(b.ai);
          const humanX = x(b.human);
          const gap = b.human - b.ai;
          const aiR = 6 + (b.ai / 100) * 8;
          const humanR = 7 + (b.human / 100) * 7;

          return (
            <g key={b.name}>
              {/* Row separator */}
              {i > 0 && (
                <line
                  x1={PAD.left}
                  y1={PAD.top + i * ROW_H}
                  x2={PAD.left + CW}
                  y2={PAD.top + i * ROW_H}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-neutral-100 dark:text-neutral-800"
                />
              )}

              {/* Label */}
              <text
                x={PAD.left - 12}
                y={rowY - 4}
                textAnchor="end"
                fontSize="11"
                fontWeight="600"
                className="fill-foreground"
              >
                {b.name}
              </text>
              <text
                x={PAD.left - 12}
                y={rowY + 10}
                textAnchor="end"
                fontSize="8"
                className="fill-muted-foreground/50"
              >
                {b.desc}
              </text>

              {/* Gap bar connecting AI to Human */}
              {gap > 3 && (
                <line
                  x1={aiX}
                  y1={rowY}
                  x2={humanX}
                  y2={rowY}
                  stroke={b.color}
                  strokeWidth="2"
                  strokeOpacity="0.12"
                  strokeLinecap="round"
                />
              )}

              {/* Human ring (hollow) */}
              <circle
                cx={humanX}
                cy={rowY}
                r={humanR}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-neutral-300 dark:text-neutral-600"
              />
              <circle
                cx={humanX}
                cy={rowY}
                r={humanR}
                fill="none"
                stroke={b.color}
                strokeWidth="1.5"
                strokeOpacity="0.3"
                strokeDasharray="3 2"
              />

              {/* AI bubble (solid) */}
              <circle
                cx={aiX}
                cy={rowY}
                r={aiR + 2}
                className="fill-white dark:fill-neutral-950"
              />
              <circle
                cx={aiX}
                cy={rowY}
                r={aiR}
                fill={b.color}
                fillOpacity="0.7"
              />
              {/* Specular highlight */}
              <circle
                cx={aiX - aiR * 0.25}
                cy={rowY - aiR * 0.3}
                r={aiR * 0.3}
                fill="white"
                fillOpacity="0.3"
              />

              {/* AI score */}
              <text
                x={aiX}
                y={rowY - aiR - 6}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill={b.color}
              >
                {b.ai}%
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${PAD.left}, ${PAD.top + CH + 26})`}>
          <circle cx={0} cy={0} r={4} fill="#8b5cf6" fillOpacity="0.7" />
          <text x={8} y={3} fontSize="8" className="fill-muted-foreground">
            AI best score
          </text>
          <circle
            cx={80}
            cy={0}
            r={4}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-neutral-400"
          />
          <text x={88} y={3} fontSize="8" className="fill-muted-foreground">
            Human expert
          </text>
        </g>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Solid circles = best AI score. Dashed rings = human expert level. When
        they overlap, AI has caught up. When they&apos;re far apart - like on
        real-world work (2.5% vs 95%) - the gap is enormous.
      </figcaption>
    </figure>
  );
}
