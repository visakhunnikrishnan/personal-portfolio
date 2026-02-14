const W = 640;
const H = 280;

const BW = 154;
const BH = 108;
const BR = 10;
const BY = 96;
const CY = BY + BH / 2;

const B1X = 28;
const B2X = 243;
const B3X = 458;

const stages = [
  {
    x: B1X,
    num: "1",
    label: "Build",
    desc: "Code + deps → artifact",
    fill: "text-blue-500/[0.06] dark:text-blue-400/[0.08]",
    badge: "text-blue-600 dark:text-blue-400",
    border: "text-blue-200 dark:text-blue-800",
  },
  {
    x: B2X,
    num: "2",
    label: "Release",
    desc: "Artifact + config → version",
    fill: "text-amber-500/[0.06] dark:text-amber-400/[0.08]",
    badge: "text-amber-600 dark:text-amber-400",
    border: "text-amber-200 dark:text-amber-800",
  },
  {
    x: B3X,
    num: "3",
    label: "Run",
    desc: "Execute in environment",
    fill: "text-emerald-500/[0.06] dark:text-emerald-400/[0.08]",
    badge: "text-emerald-600 dark:text-emerald-400",
    border: "text-emerald-200 dark:text-emerald-800",
  },
];

export function BuildReleaseRunChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Three deployment stages: source code flows into the Build stage producing an artifact, the artifact combines with environment config in the Release stage producing a versioned release, and the Run stage executes the release to serve traffic"
      >
        <defs>
          <marker
            id="brr-arrow"
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
              className="text-neutral-400 dark:text-neutral-500"
            />
          </marker>
        </defs>

        {/* Input labels and arrows */}
        <text
          x={B1X + BW / 2}
          y={28}
          textAnchor="middle"
          className="text-[10px] font-medium fill-muted-foreground/70"
        >
          Source code
        </text>
        <line
          x1={B1X + BW / 2}
          y1={38}
          x2={B1X + BW / 2}
          y2={BY - 2}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          markerEnd="url(#brr-arrow)"
          className="text-neutral-300 dark:text-neutral-600"
        />

        <text
          x={B2X + BW / 2}
          y={28}
          textAnchor="middle"
          className="text-[10px] font-medium fill-muted-foreground/70"
        >
          Environment config
        </text>
        <line
          x1={B2X + BW / 2}
          y1={38}
          x2={B2X + BW / 2}
          y2={BY - 2}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          markerEnd="url(#brr-arrow)"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {/* Stage boxes */}
        {stages.map((s) => (
          <g key={s.num}>
            {/* Box fill */}
            <rect
              x={s.x}
              y={BY}
              width={BW}
              height={BH}
              rx={BR}
              fill="currentColor"
              className={s.fill}
            />
            {/* Box border */}
            <rect
              x={s.x}
              y={BY}
              width={BW}
              height={BH}
              rx={BR}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className={s.border}
            />

            {/* Number badge */}
            <circle
              cx={s.x + 22}
              cy={BY + 24}
              r={10}
              fill="currentColor"
              className={s.fill}
            />
            <circle
              cx={s.x + 22}
              cy={BY + 24}
              r={10}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className={s.border}
            />
            <text
              x={s.x + 22}
              y={BY + 25}
              textAnchor="middle"
              dominantBaseline="central"
              className={`text-[10px] font-bold fill-current ${s.badge}`}
            >
              {s.num}
            </text>

            {/* Stage label */}
            <text
              x={s.x + BW / 2}
              y={BY + 58}
              textAnchor="middle"
              className="text-[15px] font-semibold fill-foreground/90"
            >
              {s.label}
            </text>

            {/* Description */}
            <text
              x={s.x + BW / 2}
              y={BY + 78}
              textAnchor="middle"
              className="text-[9px] fill-muted-foreground/60"
            >
              {s.desc}
            </text>
          </g>
        ))}

        {/* Connecting arrows between stages */}
        {/* Build → Release */}
        <line
          x1={B1X + BW + 4}
          y1={CY}
          x2={B2X - 4}
          y2={CY}
          stroke="currentColor"
          strokeWidth="1"
          markerEnd="url(#brr-arrow)"
          className="text-neutral-300 dark:text-neutral-600"
        />
        <text
          x={(B1X + BW + B2X) / 2}
          y={CY - 8}
          textAnchor="middle"
          className="text-[8px] font-mono fill-muted-foreground/50"
        >
          artifact
        </text>

        {/* Release → Run */}
        <line
          x1={B2X + BW + 4}
          y1={CY}
          x2={B3X - 4}
          y2={CY}
          stroke="currentColor"
          strokeWidth="1"
          markerEnd="url(#brr-arrow)"
          className="text-neutral-300 dark:text-neutral-600"
        />
        <text
          x={(B2X + BW + B3X) / 2}
          y={CY - 8}
          textAnchor="middle"
          className="text-[8px] font-mono fill-muted-foreground/50"
        >
          v2.4.1
        </text>

        {/* Output after Run */}
        <line
          x1={B3X + BW + 4}
          y1={CY}
          x2={W - 8}
          y2={CY}
          stroke="currentColor"
          strokeWidth="1"
          markerEnd="url(#brr-arrow)"
          className="text-neutral-300 dark:text-neutral-600"
        />
        <text
          x={B3X + BW + (W - 8 - B3X - BW) / 2}
          y={CY + 14}
          textAnchor="middle"
          className="text-[8px] fill-muted-foreground/50"
        >
          live
        </text>

        {/* Footer */}
        <text
          x={W / 2}
          y={H - 16}
          textAnchor="middle"
          className="text-[10px] fill-muted-foreground/50"
        >
          Same artifact, different config per environment. Releases are immutable.
        </text>
      </svg>
    </figure>
  );
}
