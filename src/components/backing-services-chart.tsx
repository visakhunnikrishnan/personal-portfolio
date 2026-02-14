const W = 640;
const H = 300;
const START_Y = 48;
const ROW_H = 54;
const PILL_H = 34;
const PILL_R = 8;
const LX = 16;
const LW = 156;
const RX = 468;
const RW = 156;

const connections = [
  { env: "DATABASE_URL", protocol: "postgresql://", service: "PostgreSQL", accent: "#336791" },
  { env: "REDIS_URL", protocol: "redis://", service: "Redis", accent: "#C6302B" },
  { env: "SMTP_URL", protocol: "smtp://", service: "SendGrid", accent: "#1A82E2" },
  { env: "S3_ENDPOINT", protocol: "https://", service: "Amazon S3", accent: "#E8930C" },
];

export function BackingServicesChart() {
  const lineStart = LX + LW;
  const lineEnd = RX;
  const midX = (lineStart + lineEnd) / 2;

  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Environment variables map to backing services via connection strings: DATABASE_URL to PostgreSQL, REDIS_URL to Redis, SMTP_URL to SendGrid, and S3_ENDPOINT to Amazon S3"
      >
        <defs>
          <marker
            id="bs-arrow"
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

        {/* Column headers */}
        <text
          x={LX + LW / 2}
          y={28}
          textAnchor="middle"
          className="text-[10px] font-medium fill-muted-foreground/70"
        >
          Environment
        </text>
        <text
          x={RX + RW / 2}
          y={28}
          textAnchor="middle"
          className="text-[10px] font-medium fill-muted-foreground/70"
        >
          Backing Services
        </text>

        {connections.map((c, i) => {
          const rowY = START_Y + i * ROW_H;
          const cy = rowY + PILL_H / 2;

          return (
            <g key={c.env}>
              {/* Left pill - env var */}
              <rect
                x={LX}
                y={rowY}
                width={LW}
                height={PILL_H}
                rx={PILL_R}
                fill="currentColor"
                className="text-neutral-50 dark:text-neutral-800/80"
              />
              <rect
                x={LX}
                y={rowY}
                width={LW}
                height={PILL_H}
                rx={PILL_R}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-neutral-200 dark:text-neutral-700"
              />
              <text
                x={LX + LW / 2}
                y={cy + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[10px] font-mono fill-foreground/80"
              >
                {c.env}
              </text>

              {/* Connecting curve with arrow */}
              <path
                d={`M ${lineStart},${cy} Q ${midX},${cy + 10} ${lineEnd},${cy}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                markerEnd="url(#bs-arrow)"
                className="text-neutral-300 dark:text-neutral-600"
              />

              {/* Protocol label on the curve */}
              <text
                x={midX}
                y={cy - 4}
                textAnchor="middle"
                className="text-[8px] font-mono fill-muted-foreground/40"
              >
                {c.protocol}
              </text>

              {/* Connection dot at line start */}
              <circle
                cx={lineStart}
                cy={cy}
                r={2.5}
                fill="currentColor"
                className="text-neutral-300 dark:text-neutral-500"
              />

              {/* Right pill - service */}
              <rect
                x={RX}
                y={rowY}
                width={RW}
                height={PILL_H}
                rx={PILL_R}
                fill="currentColor"
                className="text-neutral-50 dark:text-neutral-800/80"
              />
              <rect
                x={RX}
                y={rowY}
                width={RW}
                height={PILL_H}
                rx={PILL_R}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-neutral-200 dark:text-neutral-700"
              />

              {/* Accent dot */}
              <circle cx={RX + 16} cy={cy} r={4} fill={c.accent} opacity={0.8} />
              <circle cx={RX + 16} cy={cy} r={1.5} fill="white" opacity={0.4} />

              <text
                x={RX + 28}
                y={cy + 1}
                textAnchor="start"
                dominantBaseline="central"
                className="text-[11px] fill-foreground/80"
              >
                {c.service}
              </text>
            </g>
          );
        })}

        {/* Footer */}
        <text
          x={W / 2}
          y={H - 16}
          textAnchor="middle"
          className="text-[10px] fill-muted-foreground/50"
        >
          Change the URL, change the service. No code changes.
        </text>
      </svg>
    </figure>
  );
}
