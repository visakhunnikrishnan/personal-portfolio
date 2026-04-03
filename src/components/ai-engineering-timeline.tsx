/*
 * AI Engineering Timeline – horizontal timeline
 *
 * Shows the evolution from copilot-era autocomplete (2024) to
 * predicted superhuman coding agents (2027). Labels alternate
 * above and below the track.
 */

const W = 640;
const H = 240;
const PAD = { left: 40, right: 40 };
const TRACK_Y = H / 2;
const CW = W - PAD.left - PAD.right;

const milestones = [
  {
    year: "2024",
    label: "Copilot era",
    detail: "Autocomplete and chat",
    color: "#94a3b8",
    position: 0,
  },
  {
    year: "Early 2025",
    label: "Agent mode",
    detail: "Autonomous coding in IDE",
    color: "#06b6d4",
    position: 0.22,
  },
  {
    year: "Late 2025",
    label: "Multi-agent",
    detail: "Parallel task dispatch",
    color: "#8b5cf6",
    position: 0.44,
  },
  {
    year: "2026",
    label: "Unattended agents",
    detail: "1,300 PRs/week at Stripe",
    color: "#10b981",
    position: 0.68,
  },
  {
    year: "2027",
    label: "Superhuman coder?",
    detail: "AI 2027 project prediction",
    color: "#f59e0b",
    position: 1.0,
  },
];

export function AiEngineeringTimeline() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Horizontal timeline showing AI coding evolution from 2024 copilot era to predicted 2027 superhuman coder"
      >
        <defs>
          <linearGradient id="tl-track" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
            <stop offset="40%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
          </linearGradient>
          <filter id="tl-glow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodOpacity="0.15"
            />
          </filter>
        </defs>

        {/* Track background */}
        <rect
          x={PAD.left}
          y={TRACK_Y - 3}
          width={CW}
          height={6}
          rx={3}
          fill="url(#tl-track)"
        />

        {/* Track line */}
        <line
          x1={PAD.left}
          y1={TRACK_Y}
          x2={PAD.left + CW}
          y2={TRACK_Y}
          stroke="currentColor"
          strokeWidth="2"
          className="text-neutral-300 dark:text-neutral-600"
          strokeLinecap="round"
        />

        {/* Milestones */}
        {milestones.map((m, i) => {
          const cx = PAD.left + m.position * CW;
          const above = i % 2 === 0;
          const labelY = above ? TRACK_Y - 32 : TRACK_Y + 36;
          const detailY = above ? labelY + 14 : labelY + 14;
          const yearY = above ? labelY - 14 : labelY + 28;
          const stemEnd = above ? TRACK_Y - 16 : TRACK_Y + 16;

          return (
            <g key={m.year}>
              {/* Stem line */}
              <line
                x1={cx}
                y1={TRACK_Y}
                x2={cx}
                y2={stemEnd}
                stroke={m.color}
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />

              {/* Dot on track */}
              <circle
                cx={cx}
                cy={TRACK_Y}
                r={8}
                className="fill-white dark:fill-neutral-950"
              />
              <circle
                cx={cx}
                cy={TRACK_Y}
                r={6}
                fill={m.color}
                fillOpacity="0.8"
                filter="url(#tl-glow)"
              />
              {/* Specular highlight */}
              <circle
                cx={cx - 1.5}
                cy={TRACK_Y - 2}
                r={2}
                fill="white"
                fillOpacity="0.35"
              />

              {/* Year label */}
              <text
                x={cx}
                y={yearY}
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill={m.color}
              >
                {m.year}
              </text>

              {/* Title */}
              <text
                x={cx}
                y={labelY}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                className="fill-foreground"
              >
                {m.label}
              </text>

              {/* Detail */}
              <text
                x={cx}
                y={detailY}
                textAnchor="middle"
                fontSize="8"
                className="fill-muted-foreground/60"
              >
                {m.detail}
              </text>
            </g>
          );
        })}

        {/* Arrow at end */}
        <polygon
          points={`${PAD.left + CW + 2},${TRACK_Y} ${PAD.left + CW - 6},${TRACK_Y - 5} ${PAD.left + CW - 6},${TRACK_Y + 5}`}
          fill="#f59e0b"
          fillOpacity="0.5"
        />
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        The shift from copilot to autonomous agent happened in roughly 18
        months. By 2027, AI coding agents are predicted to match top human
        engineers.
      </figcaption>
    </figure>
  );
}
