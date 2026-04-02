/*
 * g Factor Diagram – 3D-style hub-and-spoke visualization
 *
 * Shows general intelligence (g) at the center with connections to
 * different cognitive abilities. Line thickness = loading strength (Λ).
 * Based on Spearman (1904) and CHC model.
 */

const W = 640;
const H = 300;
const CX = W / 2;
const CY = H / 2;
const RX = 160;
const RY = 80;

const abilities = [
  { label: "Abstract reasoning", loading: 0.85, angle: -90, color: "#8b5cf6" },
  { label: "Verbal comprehension", loading: 0.78, angle: -38, color: "#6366f1" },
  { label: "Spatial reasoning", loading: 0.72, angle: 14, color: "#06b6d4" },
  { label: "Working memory", loading: 0.65, angle: 66, color: "#10b981" },
  { label: "Processing speed", loading: 0.52, angle: 130, color: "#f59e0b" },
  { label: "Digit memory", loading: 0.38, angle: 194, color: "#94a3b8" },
  { label: "Perceptual speed", loading: 0.45, angle: 246, color: "#a3a3a3" },
];

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function ellipseX(angle: number) {
  return CX + RX * Math.cos(toRad(angle));
}

function ellipseY(angle: number) {
  return CY + RY * Math.sin(toRad(angle));
}

export function GFactorDiagram() {
  // Sort abilities so those at the "back" (higher Y / smaller visual) render first
  const sorted = [...abilities].sort(
    (a, b) => ellipseY(a.angle) - ellipseY(b.angle)
  );

  return (
    <figure className="not-prose my-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="3D hub and spoke diagram showing g factor at center connected to cognitive abilities with varying strength"
      >
        <defs>
          {/* Center sphere gradient */}
          <radialGradient id="g-sphere" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4c1d95" />
          </radialGradient>
          <radialGradient id="g-sphere-dark" cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#3b0764" />
          </radialGradient>

          {/* Shadow */}
          <filter id="g-shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
          <filter id="node-shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
          </filter>

          {/* Ability node gradients */}
          {abilities.map((a) => (
            <radialGradient
              key={a.label}
              id={`node-${a.angle}`}
              cx="40%"
              cy="35%"
              r="55%"
            >
              <stop offset="0%" stopColor={a.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={a.color} stopOpacity="0.5" />
            </radialGradient>
          ))}
        </defs>

        {/* Back half of orbit ring (behind everything) */}
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX + 8}
          ry={RY + 4}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          className="text-neutral-400 dark:text-neutral-600"
          clipPath="url(#orbit-back)"
        />
        <defs>
          <clipPath id="orbit-back">
            <rect x="0" y="0" width={W} height={CY} />
          </clipPath>
        </defs>

        {/* Back connections + nodes (behind center sphere) */}
        {sorted
          .filter((a) => ellipseY(a.angle) <= CY)
          .map((a) => {
            const ax = ellipseX(a.angle);
            const ay = ellipseY(a.angle);
            const depth = 1 - (CY - ay) / (RY + 20);
            const scale = 0.6 + depth * 0.4;
            const dotSize = (8 + a.loading * 6) * scale;
            const strokeW = a.loading * 3.5 * scale;

            {
              const nodeOpacity = 0.5 + depth * 0.5;
              return (
              <g key={a.label}>
                {/* Connection line - stops at edges of both spheres */}
                {(() => {
                  const dx = ax - CX;
                  const dy = ay - CY;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const sx = CX + (dx / dist) * 34;
                  const sy = CY + (dy / dist) * 34;
                  const ex = ax - (dx / dist) * (dotSize + 2);
                  const ey = ay - (dy / dist) * (dotSize + 2);
                  return (
                    <line
                      x1={sx}
                      y1={sy}
                      x2={ex}
                      y2={ey}
                      stroke={a.color}
                      strokeWidth={strokeW}
                      strokeOpacity={0.3 * nodeOpacity}
                      strokeLinecap="round"
                    />
                  );
                })()}
                {/* Solid mask to hide orbit line behind node - always fully opaque */}
                <circle
                  cx={ax}
                  cy={ay}
                  r={dotSize + 2}
                  className="fill-white dark:fill-neutral-950"
                />
                {/* Node sphere */}
                <circle
                  cx={ax}
                  cy={ay}
                  r={dotSize}
                  fill={`url(#node-${a.angle})`}
                  filter="url(#node-shadow)"
                  opacity={nodeOpacity}
                />
                {/* Label */}
                <text
                  x={ax}
                  y={ay - dotSize - 8}
                  textAnchor="middle"
                  fontSize={8 * scale + 1}
                  className="fill-muted-foreground"
                  opacity={nodeOpacity}
                >
                  {a.label}
                </text>
                {/* Loading value - below sphere */}
                <text
                  x={ax}
                  y={ay + dotSize + 11}
                  textAnchor="middle"
                  fontSize={7 * scale}
                  fontWeight="600"
                  fill={a.color}
                  opacity={nodeOpacity}
                >
                  {a.loading.toFixed(2)}
                </text>
              </g>
            );
            }
          })}

        {/* Center g sphere */}
        <circle
          cx={CX}
          cy={CY}
          r={32}
          className="hidden dark:block"
          fill="url(#g-sphere-dark)"
          filter="url(#g-shadow)"
        />
        <circle
          cx={CX}
          cy={CY}
          r={32}
          className="dark:hidden"
          fill="url(#g-sphere)"
          filter="url(#g-shadow)"
        />
        {/* Highlight spot */}
        <circle cx={CX - 8} cy={CY - 10} r={8} fill="white" fillOpacity="0.2" />
        {/* g label */}
        <text
          x={CX}
          y={CY + 7}
          textAnchor="middle"
          fontSize="22"
          fontWeight="800"
          fill="white"
          fontStyle="italic"
        >
          g
        </text>

        {/* Front connections + nodes (in front of center sphere) */}
        {sorted
          .filter((a) => ellipseY(a.angle) > CY)
          .map((a) => {
            const ax = ellipseX(a.angle);
            const ay = ellipseY(a.angle);
            const depth = (ay - CY) / (RY + 20);
            const scale = 0.7 + depth * 0.3;
            const dotSize = (8 + a.loading * 6) * scale;
            const strokeW = a.loading * 3.5 * scale;

            return (
              <g key={a.label}>
                {/* Connection line - stops at edges of both spheres */}
                {(() => {
                  const dx = ax - CX;
                  const dy = ay - CY;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  const sx = CX + (dx / dist) * 34;
                  const sy = CY + (dy / dist) * 34;
                  const ex = ax - (dx / dist) * (dotSize + 2);
                  const ey = ay - (dy / dist) * (dotSize + 2);
                  return (
                    <line
                      x1={sx}
                      y1={sy}
                      x2={ex}
                      y2={ey}
                      stroke={a.color}
                      strokeWidth={strokeW}
                      strokeOpacity={0.4}
                      strokeLinecap="round"
                    />
                  );
                })()}
                {/* Solid mask to hide orbit line behind node */}
                <circle
                  cx={ax}
                  cy={ay}
                  r={dotSize + 2}
                  className="fill-white dark:fill-neutral-950"
                />
                {/* Node sphere */}
                <circle
                  cx={ax}
                  cy={ay}
                  r={dotSize}
                  fill={`url(#node-${a.angle})`}
                  filter="url(#node-shadow)"
                />
                {/* Loading value - below sphere */}
                <text
                  x={ax}
                  y={ay + dotSize + 12}
                  textAnchor="middle"
                  fontSize={7 * scale}
                  fontWeight="600"
                  fill={a.color}
                >
                  {a.loading.toFixed(2)}
                </text>
                {/* Label */}
                <text
                  x={ax}
                  y={ay + dotSize + 24}
                  textAnchor="middle"
                  fontSize={8 * scale + 1}
                  className="fill-muted-foreground"
                >
                  {a.label}
                </text>
              </g>
            );
          })}

        {/* Front half of orbit ring (in front of everything) */}
        <defs>
          <clipPath id="orbit-front">
            <rect x="0" y={CY} width={W} height={H - CY} />
          </clipPath>
        </defs>
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX + 8}
          ry={RY + 4}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          className="text-neutral-400 dark:text-neutral-600"
          clipPath="url(#orbit-front)"
        />

        {/* Legend */}
        <text
          x={W - 16}
          y={H - 8}
          textAnchor="end"
          fontSize="8"
          className="fill-muted-foreground/40"
        >
          Sphere size &amp; line thickness = loading strength (&Lambda;)
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        How g connects to specific abilities. Abstract reasoning loads
        heavily onto g (0.85) while digit memory barely does (0.38). Bigger
        spheres and thicker lines mean a stronger connection to general
        intelligence.
      </figcaption>
    </figure>
  );
}
