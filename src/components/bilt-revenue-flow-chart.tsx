const W = 640;
const H = 460;
const PILL_H = 42;
const PILL_R = 7;
const R = 8; // elbow corner radius

const INPUT_PW = 140;
const OUTPUT_PW = 160;
const PLATFORM_W = 108;
const PLATFORM_H = 44;

const HEADER_Y = 24;
const CENTER_Y = 248;

const INPUT_X = 8;
const PLAT_X = (W - PLATFORM_W) / 2;
const OUTPUT_X = W - OUTPUT_PW - 8;

const INPUT_SPACING = 60;
const OUTPUT_SPACING = 54;

const inputs = [
  { label: "Tenant", sub: "Pays monthly rent", accent: "#10b981" },
  { label: "UPI Payment", sub: "Zero-fee rail", accent: "#6366f1" },
  { label: "Co-branded Card", sub: "Premium tier", accent: "#3b82f6" },
];

const outputs = [
  { label: "Landlord Settlement", sub: "Rent forwarded", accent: "#10b981" },
  { label: "Tenant Rewards", sub: "Points on every payment", accent: "#f59e0b" },
  { label: "Society SaaS", sub: "Rs 5–15 / unit / month", accent: "#8b5cf6" },
  { label: "Merchant Commissions", sub: "1–2% from local stores", accent: "#ec4899" },
  { label: "Bank Interchange", sub: "Card revenue share", accent: "#3b82f6" },
  { label: "Compliance Fees", sub: "Agreement & e-stamping", accent: "#14b8a6" },
];

function inputCenterY(i: number) {
  return CENTER_Y + (i - 1) * INPUT_SPACING;
}

function outputCenterY(i: number) {
  const total = (outputs.length - 1) * OUTPUT_SPACING;
  return CENTER_Y - total / 2 + i * OUTPUT_SPACING;
}

/** Orthogonal elbow path: horizontal → rounded corner → vertical → rounded corner → horizontal */
function elbowPath(x1: number, y1: number, x2: number, y2: number) {
  const midX = (x1 + x2) / 2;
  const diff = y2 - y1;

  if (Math.abs(diff) < 1) {
    return `M ${x1},${y1} H ${x2}`;
  }

  if (Math.abs(diff) < 2 * R) {
    return `M ${x1},${y1} L ${x2},${y2}`;
  }

  if (diff > 0) {
    return [
      `M ${x1},${y1}`,
      `H ${midX - R}`,
      `a ${R},${R} 0 0,1 ${R},${R}`,
      `V ${y2 - R}`,
      `a ${R},${R} 0 0,0 ${R},${R}`,
      `H ${x2}`,
    ].join(" ");
  } else {
    return [
      `M ${x1},${y1}`,
      `H ${midX - R}`,
      `a ${R},${R} 0 0,0 ${R},${-R}`,
      `V ${y2 + R}`,
      `a ${R},${R} 0 0,1 ${R},${-R}`,
      `H ${x2}`,
    ].join(" ");
  }
}

export function BiltRevenueFlowChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Revenue flow diagram showing how money flows from tenants through the platform to landlords, rewards, society dashboards, merchants, banks, and compliance tools"
      >
        <defs>
          <marker
            id="flow-arrow"
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
          <marker
            id="flow-arrow-accent"
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
          x={INPUT_X + INPUT_PW / 2}
          y={HEADER_Y}
          textAnchor="middle"
          className="text-[10px] font-medium fill-muted-foreground/70"
        >
          Inputs
        </text>
        <text
          x={PLAT_X + PLATFORM_W / 2}
          y={HEADER_Y}
          textAnchor="middle"
          className="text-[10px] font-medium fill-muted-foreground/70"
        >
          Platform
        </text>
        <text
          x={OUTPUT_X + OUTPUT_PW / 2}
          y={HEADER_Y}
          textAnchor="middle"
          className="text-[10px] font-medium fill-muted-foreground/70"
        >
          Revenue Streams
        </text>

        {/* Input connections (drawn behind pills) */}
        {inputs.map((inp, i) => {
          const cy = inputCenterY(i);
          return (
            <path
              key={`ic-${inp.label}`}
              d={elbowPath(INPUT_X + INPUT_PW, cy, PLAT_X, CENTER_Y)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              markerEnd="url(#flow-arrow)"
              className="text-neutral-300 dark:text-neutral-600"
            />
          );
        })}

        {/* Output connections (drawn behind pills) */}
        {outputs.map((out, i) => {
          const cy = outputCenterY(i);
          return (
            <path
              key={`oc-${out.label}`}
              d={elbowPath(PLAT_X + PLATFORM_W, CENTER_Y, OUTPUT_X, cy)}
              fill="none"
              stroke={out.accent}
              strokeWidth="1"
              opacity={0.45}
              markerEnd="url(#flow-arrow-accent)"
            />
          );
        })}

        {/* Input pills */}
        {inputs.map((inp, i) => {
          const cy = inputCenterY(i);
          const py = cy - PILL_H / 2;

          return (
            <g key={inp.label}>
              <rect
                x={INPUT_X}
                y={py}
                width={INPUT_PW}
                height={PILL_H}
                rx={PILL_R}
                fill="currentColor"
                className="text-neutral-50 dark:text-neutral-800/80"
              />
              <rect
                x={INPUT_X}
                y={py}
                width={INPUT_PW}
                height={PILL_H}
                rx={PILL_R}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-neutral-200 dark:text-neutral-700"
              />
              <circle
                cx={INPUT_X + 14}
                cy={cy - 4}
                r={3.5}
                fill={inp.accent}
                opacity={0.8}
              />
              <text
                x={INPUT_X + 26}
                y={cy - 4}
                dominantBaseline="central"
                className="text-[10px] font-medium fill-foreground/80"
              >
                {inp.label}
              </text>
              <text
                x={INPUT_X + 26}
                y={cy + 10}
                dominantBaseline="central"
                className="text-[8px] fill-muted-foreground/60"
              >
                {inp.sub}
              </text>
              {/* Connection dot */}
              <circle
                cx={INPUT_X + INPUT_PW}
                cy={cy}
                r={2.5}
                fill="currentColor"
                className="text-neutral-300 dark:text-neutral-500"
              />
            </g>
          );
        })}

        {/* Central platform node */}
        <rect
          x={PLAT_X}
          y={CENTER_Y - PLATFORM_H / 2}
          width={PLATFORM_W}
          height={PLATFORM_H}
          rx={10}
          fill="currentColor"
          className="text-emerald-50 dark:text-emerald-950/60"
        />
        <rect
          x={PLAT_X}
          y={CENTER_Y - PLATFORM_H / 2}
          width={PLATFORM_W}
          height={PLATFORM_H}
          rx={10}
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          opacity={0.6}
        />
        <text
          x={PLAT_X + PLATFORM_W / 2}
          y={CENTER_Y - 5}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[12px] font-semibold fill-emerald-700 dark:fill-emerald-300"
        >
          Platform
        </text>
        <text
          x={PLAT_X + PLATFORM_W / 2}
          y={CENTER_Y + 10}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[8px] fill-emerald-600/50 dark:fill-emerald-400/50"
        >
          Verifies &amp; routes
        </text>

        {/* Output pills */}
        {outputs.map((out, i) => {
          const cy = outputCenterY(i);
          const py = cy - PILL_H / 2;

          return (
            <g key={out.label}>
              <rect
                x={OUTPUT_X}
                y={py}
                width={OUTPUT_PW}
                height={PILL_H}
                rx={PILL_R}
                fill="currentColor"
                className="text-neutral-50 dark:text-neutral-800/80"
              />
              <rect
                x={OUTPUT_X}
                y={py}
                width={OUTPUT_PW}
                height={PILL_H}
                rx={PILL_R}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-neutral-200 dark:text-neutral-700"
              />
              <circle
                cx={OUTPUT_X + 14}
                cy={cy - 4}
                r={3.5}
                fill={out.accent}
                opacity={0.8}
              />
              <circle
                cx={OUTPUT_X + 14}
                cy={cy - 4}
                r={1.3}
                fill="white"
                opacity={0.4}
              />
              <text
                x={OUTPUT_X + 26}
                y={cy - 4}
                dominantBaseline="central"
                className="text-[10px] font-medium fill-foreground/80"
              >
                {out.label}
              </text>
              <text
                x={OUTPUT_X + 26}
                y={cy + 10}
                dominantBaseline="central"
                className="text-[8px] fill-muted-foreground/60"
              >
                {out.sub}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Revenue flows from tenant payments through the platform to multiple monetization channels &mdash; no fees charged to the renter.
      </figcaption>
    </figure>
  );
}
