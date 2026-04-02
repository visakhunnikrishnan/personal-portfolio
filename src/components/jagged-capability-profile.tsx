/*
 * Jagged Capability Profile – bar chart
 *
 * Shows how AI is expert at some tasks and fails at seemingly simpler ones.
 * Based on Dell'Acqua et al. (2023) BCG study and GDPval (2025).
 */

const W = 640;
const H = 300;
const PAD = { top: 24, right: 24, bottom: 56, left: 24 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const tasks = [
  { label: "Math olympiad", ai: 95, human: 95, color: "#10b981" },
  { label: "PhD science Q&A", ai: 94, human: 85, color: "#10b981" },
  { label: "Code generation", ai: 85, human: 70, color: "#10b981" },
  { label: "Professional tasks", ai: 50, human: 90, color: "#f59e0b" },
  { label: "Novel research", ai: 15, human: 80, color: "#ef4444" },
  { label: "Real-world automation", ai: 2.5, human: 95, color: "#ef4444" },
];

const MAX = 100;
const GROUP_W = CW / tasks.length;
const BAR_W = (GROUP_W - 16) / 2;

function y(v: number) {
  return PAD.top + CH - (v / MAX) * CH;
}

export function JaggedCapabilityProfile() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Bar chart showing AI excels at structured academic tasks but struggles with real-world work automation"
      >
        <defs>
          <linearGradient id="jag-ai" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="jag-human" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[25, 50, 75, 100].map((v) => (
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
              className="text-[8px] fill-muted-foreground/50"
            >
              {v}%
            </text>
          </g>
        ))}

        {/* Bars */}
        {tasks.map((t, i) => {
          const gx = PAD.left + i * GROUP_W + 8;

          return (
            <g key={t.label}>
              {/* AI bar */}
              <rect
                x={gx}
                y={y(t.ai)}
                width={BAR_W}
                height={y(0) - y(t.ai)}
                rx={3}
                fill="url(#jag-ai)"
              />
              {/* Human bar */}
              <rect
                x={gx + BAR_W + 3}
                y={y(t.human)}
                width={BAR_W}
                height={y(0) - y(t.human)}
                rx={3}
                fill="url(#jag-human)"
              />

              {/* X label */}
              <text
                x={gx + BAR_W + 1.5}
                y={PAD.top + CH + 14}
                textAnchor="middle"
                className="text-[8px] fill-muted-foreground"
              >
                {t.label.split(" ").map((word, wi) => (
                  <tspan
                    key={wi}
                    x={gx + BAR_W + 1.5}
                    dy={wi === 0 ? 0 : 11}
                  >
                    {word}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <rect x={PAD.left + CW - 110} y={PAD.top} width={10} height={10} rx={2} fill="url(#jag-ai)" />
        <text x={PAD.left + CW - 96} y={PAD.top + 9} className="text-[9px] fill-muted-foreground">AI</text>
        <rect x={PAD.left + CW - 60} y={PAD.top} width={10} height={10} rx={2} fill="url(#jag-human)" />
        <text x={PAD.left + CW - 46} y={PAD.top + 9} className="text-[9px] fill-muted-foreground">Human</text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        The &ldquo;jagged frontier&rdquo;: AI dominates structured academic
        tasks but automates only 2.5% of real-world remote work. Expert at
        some things, helpless at others.
      </figcaption>
    </figure>
  );
}
