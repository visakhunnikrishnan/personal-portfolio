const W = 640;
const H = 180;
const PAD = { left: 20, right: 20 };
const TRACK_Y = 70;
const TRACK_W = W - PAD.left - PAD.right;

const milestones = [
  { week: 0, label: "Birth", desc: "No circadian rhythm", color: "#94a3b8" },
  {
    week: 5,
    label: "4–6 wk",
    desc: "Responds to light/dark",
    color: "#fbbf24",
  },
  { week: 8, label: "~8 wk", desc: "Cortisol rhythm", color: "#f97316" },
  { week: 9, label: "~9 wk", desc: "Melatonin begins", color: "#8b5cf6" },
  { week: 11, label: "~11 wk", desc: "Temp rhythm", color: "#06b6d4" },
  {
    week: 14,
    label: "3–4 mo",
    desc: "Full day-night pattern",
    color: "#10b981",
  },
];

const MAX_WEEK = 16;

function x(week: number) {
  return PAD.left + (week / MAX_WEEK) * TRACK_W;
}

export function CircadianRhythmTimeline() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Timeline showing circadian rhythm development from birth to 4 months: light-dark response at 4-6 weeks, cortisol at 8 weeks, melatonin at 9 weeks, temperature at 11 weeks, full pattern at 3-4 months"
      >
        <defs>
          <linearGradient id="track-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
          <filter id="timeline-glow">
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {/* Track background */}
        <rect
          x={PAD.left}
          y={TRACK_Y - 3}
          width={TRACK_W}
          height={6}
          rx={3}
          fill="url(#track-grad)"
        />

        {/* Progress fill */}
        <rect
          x={PAD.left}
          y={TRACK_Y - 2}
          width={TRACK_W}
          height={4}
          rx={2}
          fill="currentColor"
          className="text-neutral-200 dark:text-neutral-700"
        />

        {/* Milestones */}
        {milestones.map((m, i) => {
          const cx = x(m.week);
          const above = i % 2 === 0;
          const labelY = above ? TRACK_Y - 24 : TRACK_Y + 32;
          const descY = above ? TRACK_Y - 38 : TRACK_Y + 46;
          const tickEnd = above ? TRACK_Y - 14 : TRACK_Y + 14;

          return (
            <g key={m.label}>
              {/* Tick line */}
              <line
                x1={cx}
                y1={TRACK_Y}
                x2={cx}
                y2={tickEnd}
                stroke={m.color}
                strokeWidth="1"
                opacity={0.5}
              />
              {/* Dot */}
              <circle
                cx={cx}
                cy={TRACK_Y}
                r={6}
                fill={m.color}
                filter="url(#timeline-glow)"
              />
              <circle
                cx={cx}
                cy={TRACK_Y}
                r={2.5}
                fill="white"
                opacity={0.3}
              />
              {/* Label */}
              <text
                x={cx}
                y={labelY}
                textAnchor="middle"
                className="text-[10px] font-semibold fill-foreground/80"
              >
                {m.label}
              </text>
              {/* Description */}
              <text
                x={cx}
                y={descY}
                textAnchor="middle"
                className="text-[9px] fill-muted-foreground/60"
              >
                {m.desc}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        When the circadian rhythm develops. Day-night confusion typically
        resolves around 8 weeks
        <sup>
          <a href="#ref-5">[5]</a>
        </sup>
        .
      </figcaption>
    </figure>
  );
}
