/*
 * DeepMind Cognitive Faculties – radial diagram
 *
 * 10 faculties arranged in a circle around a center.
 * Green = we can test, Red = evaluation gap.
 * Based on Burnell, Yamamori, Firat et al. (2026), Google DeepMind.
 */

const W = 640;
const H = 480;
const CX = W / 2;
const CY = H / 2 - 10;
const R = 155;

const TESTED_COLOR = "#10b981";
const GAP_COLOR = "#ef4444";

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

const faculties = [
  { name: "Perception", status: "tested", angle: -90 },
  { name: "Generation", status: "tested", angle: -54 },
  { name: "Reasoning", status: "tested", angle: -18 },
  { name: "Problem\nSolving", status: "tested", angle: 18 },
  { name: "Memory", status: "tested", angle: 54 },
  { name: "Social\nCognition", status: "gap", angle: 90 },
  { name: "Executive\nFunctions", status: "gap", angle: 126 },
  { name: "Learning", status: "gap", angle: 162 },
  { name: "Attention", status: "gap", angle: 198 },
  { name: "Meta-\ncognition", status: "gap", angle: 234 },
];

export function CognitiveFaculties() {
  return (
    <figure className="not-prose my-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Radial diagram of DeepMind's 10 cognitive faculties, 5 testable in green and 5 evaluation gaps in red"
      >
        <defs>
          <radialGradient id="cf-center" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#94a3b8" />
          </radialGradient>
          <radialGradient id="cf-center-dark" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
          <filter id="cf-glow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
          </filter>
          <filter id="cf-node-shadow">
            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.08" />
          </filter>
          {/* Node gradients */}
          <radialGradient id="cf-tested" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#059669" />
          </radialGradient>
          <radialGradient id="cf-tested-dark" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </radialGradient>
          <radialGradient id="cf-gap" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#dc2626" />
          </radialGradient>
          <radialGradient id="cf-gap-dark" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#b91c1c" />
          </radialGradient>
        </defs>

        {/* Dashed orbit - back half */}
        <defs>
          <clipPath id="cf-orbit-back">
            <rect x="0" y="0" width={W} height={CY} />
          </clipPath>
          <clipPath id="cf-orbit-front">
            <rect x="0" y={CY} width={W} height={H - CY} />
          </clipPath>
        </defs>
        <ellipse
          cx={CX}
          cy={CY}
          rx={R + 6}
          ry={R + 6}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          className="text-neutral-300 dark:text-neutral-700"
          clipPath="url(#cf-orbit-back)"
        />

        {/* Back nodes (top half - behind center) */}
        {faculties
          .filter((f) => CY + R * Math.sin(toRad(f.angle)) <= CY)
          .map((f) => {
            const nx = CX + R * Math.cos(toRad(f.angle));
            const ny = CY + R * Math.sin(toRad(f.angle));
            const color = f.status === "tested" ? TESTED_COLOR : GAP_COLOR;
            const gradId = f.status === "tested" ? "cf-tested" : "cf-gap";
            const labelR = R + 40;
            const lx = CX + labelR * Math.cos(toRad(f.angle));
            const ly = CY + labelR * Math.sin(toRad(f.angle));
            const lines = f.name.split("\n");

            return (
              <g key={f.name}>
                {/* Connector */}
                {(() => {
                  const dx = nx - CX;
                  const dy = ny - CY;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const sx = CX + (dx / dist) * 40;
                  const sy = CY + (dy / dist) * 40;
                  const ex = nx - (dx / dist) * 16;
                  const ey = ny - (dy / dist) * 16;
                  return (
                    <line
                      x1={sx} y1={sy} x2={ex} y2={ey}
                      stroke={color} strokeWidth="1.5" strokeOpacity="0.2"
                    />
                  );
                })()}
                {/* Mask circle */}
                <circle cx={nx} cy={ny} r={16} className="fill-white dark:fill-neutral-950" />
                {/* Node */}
                <circle
                  cx={nx} cy={ny} r={14}
                  className={`dark:hidden`}
                  fill={`url(#${gradId})`}
                  filter="url(#cf-node-shadow)"
                  opacity="0.8"
                />
                <circle
                  cx={nx} cy={ny} r={14}
                  className="hidden dark:block"
                  fill={`url(#${gradId}-dark)`}
                  filter="url(#cf-node-shadow)"
                  opacity="0.8"
                />
                {/* Highlight */}
                <circle cx={nx - 4} cy={ny - 5} r={4} fill="white" fillOpacity="0.25" />
                {/* Label */}
                {lines.map((line, i) => (
                  <text
                    key={i}
                    x={lx}
                    y={ly + i * 12 - ((lines.length - 1) * 6)}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill={color}
                    opacity="0.85"
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

        {/* Center sphere */}
        <circle cx={CX} cy={CY} r={38} className="dark:hidden" fill="url(#cf-center)" filter="url(#cf-glow)" />
        <circle cx={CX} cy={CY} r={38} className="hidden dark:block" fill="url(#cf-center-dark)" filter="url(#cf-glow)" />
        <circle cx={CX - 8} cy={CY - 10} r={9} fill="white" fillOpacity="0.15" />
        <text x={CX} y={CY - 2} textAnchor="middle" fontSize="10" fontWeight="400" className="fill-foreground">General</text>
        <text x={CX} y={CY + 12} textAnchor="middle" fontSize="10" fontWeight="400" className="fill-foreground">Intelligence</text>

        {/* Front orbit half */}
        <ellipse
          cx={CX}
          cy={CY}
          rx={R + 6}
          ry={R + 6}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          className="text-neutral-300 dark:text-neutral-700"
          clipPath="url(#cf-orbit-front)"
        />

        {/* Front nodes (bottom half - in front of center) */}
        {faculties
          .filter((f) => CY + R * Math.sin(toRad(f.angle)) > CY)
          .map((f) => {
            const nx = CX + R * Math.cos(toRad(f.angle));
            const ny = CY + R * Math.sin(toRad(f.angle));
            const color = f.status === "tested" ? TESTED_COLOR : GAP_COLOR;
            const gradId = f.status === "tested" ? "cf-tested" : "cf-gap";
            const labelR = R + 40;
            const lx = CX + labelR * Math.cos(toRad(f.angle));
            const ly = CY + labelR * Math.sin(toRad(f.angle));
            const lines = f.name.split("\n");

            return (
              <g key={f.name}>
                {/* Connector */}
                {(() => {
                  const dx = nx - CX;
                  const dy = ny - CY;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const sx = CX + (dx / dist) * 40;
                  const sy = CY + (dy / dist) * 40;
                  const ex = nx - (dx / dist) * 16;
                  const ey = ny - (dy / dist) * 16;
                  return (
                    <line
                      x1={sx} y1={sy} x2={ex} y2={ey}
                      stroke={color} strokeWidth="1.5" strokeOpacity="0.25"
                    />
                  );
                })()}
                {/* Mask circle */}
                <circle cx={nx} cy={ny} r={16} className="fill-white dark:fill-neutral-950" />
                {/* Node */}
                <circle
                  cx={nx} cy={ny} r={14}
                  className="dark:hidden"
                  fill={`url(#${gradId})`}
                  filter="url(#cf-node-shadow)"
                />
                <circle
                  cx={nx} cy={ny} r={14}
                  className="hidden dark:block"
                  fill={`url(#${gradId}-dark)`}
                  filter="url(#cf-node-shadow)"
                />
                {/* Highlight */}
                <circle cx={nx - 4} cy={ny - 5} r={4} fill="white" fillOpacity="0.25" />
                {/* Label */}
                {lines.map((line, i) => (
                  <text
                    key={i}
                    x={lx}
                    y={ly + i * 12 - ((lines.length - 1) * 6)}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill={color}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
      </svg>

      {/* Legend */}
      <div className="mt-2 flex justify-center gap-6 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">We can test (5)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="text-muted-foreground">Evaluation gap (5)</span>
        </span>
      </div>

      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        DeepMind&apos;s 10 cognitive faculties (March 2026). Half of what
        makes up intelligence has no proper AI evaluation yet.
      </figcaption>
    </figure>
  );
}
