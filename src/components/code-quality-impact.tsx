/*
 * Code Quality Impact – paired bar chart
 *
 * Compares AI-generated vs human code quality metrics.
 * Data from CodeRabbit's analysis of 1,000+ repositories, December 2025.
 */

const W = 640;
const H = 340;
const PAD = { top: 28, right: 24, bottom: 56, left: 130 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const data = [
  {
    label: "Issues per PR",
    ai: 10.83,
    human: 6.45,
    maxVal: 12,
    aiLabel: "10.83",
    humanLabel: "6.45",
    suffix: "",
  },
  {
    label: "Security vulns",
    ai: 1.57,
    human: 1.0,
    maxVal: 2,
    aiLabel: "1.57x",
    humanLabel: "1.0x",
    suffix: " (relative)",
  },
  {
    label: "XSS vulns",
    ai: 2.74,
    human: 1.0,
    maxVal: 3,
    aiLabel: "2.74x",
    humanLabel: "1.0x",
    suffix: " (relative)",
  },
  {
    label: "Refactoring share",
    ai: 3.8,
    human: 25,
    maxVal: 30,
    aiLabel: "3.8%",
    humanLabel: "25%",
    suffix: "",
  },
  {
    label: "Code duplication",
    ai: 4,
    human: 1,
    maxVal: 5,
    aiLabel: "4x",
    humanLabel: "1x",
    suffix: " (relative)",
  },
];

const BAR_H = 20;
const ROW_H = CH / data.length;

export function CodeQualityImpact() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Paired bar chart comparing AI vs human code quality: AI code has 1.7x more defects, 1.57x more security vulnerabilities, and 2.74x more XSS issues"
      >
        <defs>
          <linearGradient id="cq-ai" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="cq-human" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.55" />
          </linearGradient>
          <filter id="cq-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1.5"
              floodOpacity="0.06"
            />
          </filter>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
          const gx = PAD.left + frac * CW;
          return (
            <line
              key={frac}
              x1={gx}
              y1={PAD.top}
              x2={gx}
              y2={PAD.top + CH}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
          );
        })}

        {/* Baseline */}
        <line
          x1={PAD.left}
          y1={PAD.top}
          x2={PAD.left}
          y2={PAD.top + CH}
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {/* Rows */}
        {data.map((d, i) => {
          const rowY = PAD.top + i * ROW_H;
          const aiBarW = (d.ai / d.maxVal) * CW;
          const humanBarW = (d.human / d.maxVal) * CW;
          const aiBarY = rowY + (ROW_H / 2 - BAR_H - 2);
          const humanBarY = rowY + ROW_H / 2 + 2;

          return (
            <g key={d.label}>
              {/* Row separator */}
              {i > 0 && (
                <line
                  x1={PAD.left}
                  y1={rowY}
                  x2={PAD.left + CW}
                  y2={rowY}
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-neutral-100 dark:text-neutral-800"
                />
              )}

              {/* Label */}
              <text
                x={PAD.left - 12}
                y={rowY + ROW_H / 2 + 4}
                textAnchor="end"
                className="text-[11px] fill-muted-foreground"
              >
                {d.label}
              </text>

              {/* AI bar */}
              <rect
                x={PAD.left}
                y={aiBarY}
                width={aiBarW}
                height={BAR_H}
                rx={3}
                fill="url(#cq-ai)"
                filter="url(#cq-glow)"
              />
              <text
                x={PAD.left + aiBarW + 6}
                y={aiBarY + BAR_H / 2 + 4}
                fontSize="10"
                fontWeight="600"
                fill="#ef4444"
              >
                {d.aiLabel}
              </text>

              {/* Human bar */}
              <rect
                x={PAD.left}
                y={humanBarY}
                width={humanBarW}
                height={BAR_H}
                rx={3}
                fill="url(#cq-human)"
                filter="url(#cq-glow)"
              />
              <text
                x={PAD.left + humanBarW + 6}
                y={humanBarY + BAR_H / 2 + 4}
                fontSize="10"
                fontWeight="600"
                fill="#94a3b8"
              >
                {d.humanLabel}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <rect
          x={PAD.left + CW - 140}
          y={PAD.top + CH + 14}
          width={12}
          height={12}
          rx={2}
          fill="url(#cq-ai)"
        />
        <text
          x={PAD.left + CW - 124}
          y={PAD.top + CH + 24}
          className="text-[9px] fill-muted-foreground"
        >
          AI-generated
        </text>
        <rect
          x={PAD.left + CW - 52}
          y={PAD.top + CH + 14}
          width={12}
          height={12}
          rx={2}
          fill="url(#cq-human)"
        />
        <text
          x={PAD.left + CW - 36}
          y={PAD.top + CH + 24}
          className="text-[9px] fill-muted-foreground"
        >
          Human
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        AI-generated code ships with 1.7x more defects, 1.57x more security
        vulnerabilities, and nearly 3x more XSS issues (CodeRabbit, 2025).
        Refactoring fell to 3.8% of changed lines by early 2026 (GitClear).
      </figcaption>
    </figure>
  );
}
