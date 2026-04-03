/*
 * Stripe Minions Blueprint Architecture – SVG flowchart
 *
 * Full pipeline: Entry → Devbox → Context → Execute (Blueprint) → Feedback → Output → Gate
 * Based on Stripe engineering blog posts Part 1 & 2 (Jan-Feb 2026).
 */

const W = 640;
const H = 528;
const MID = W / 2;

const DET = "#3b82f6";
const AGT = "#10b981";
const INF = "#64748b";
const GATE = "#b45309";

function Box({ x, y, w, h, fill, label, sub, rx = 6 }: {
  x: number; y: number; w: number; h: number;
  fill: string; label: string; sub?: string; rx?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} fillOpacity="0.1" stroke={fill} strokeWidth="0.6" />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 3 : h / 2 + 4)} textAnchor="middle" fontSize="10" fontWeight="700" fill={fill}>{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 9} textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/50">{sub}</text>}
    </g>
  );
}

function VArrow({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 3} stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-600" />
      <polygon points={`${x - 3},${y2 - 5} ${x},${y2} ${x + 3},${y2 - 5}`} className="fill-neutral-300 dark:fill-neutral-600" />
    </g>
  );
}

function HArrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const d = x2 > x1 ? 1 : -1;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - d * 3} y2={y} stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-600" />
      <polygon points={`${x2 - d * 5},${y - 3} ${x2},${y} ${x2 - d * 5},${y + 3}`} className="fill-neutral-300 dark:fill-neutral-600" />
    </g>
  );
}

export function StripeBlueprintArchitecture() {
  return (
    <figure className="not-prose my-8">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Stripe Minions Blueprint Architecture flowchart">

        {/* Title */}
        <text x={MID} y={16} textAnchor="middle" fontSize="12" fontWeight="700" className="fill-foreground">Stripe Minions - Blueprint Architecture</text>
        <text x={MID} y={30} textAnchor="middle" fontSize="8" className="fill-muted-foreground/50">Unattended agent: Slack &rarr; isolated devbox &rarr; CI &rarr; pull request</text>

        {/* Legend */}
        <g transform="translate(110, 40)">
          <rect x={0} y={0} width={8} height={8} rx={2} fill={DET} fillOpacity="0.25" stroke={DET} strokeWidth="0.8" />
          <text x={12} y={7} fontSize="7" className="fill-muted-foreground/60">Deterministic</text>
          <rect x={100} y={0} width={8} height={8} rx={2} fill={AGT} fillOpacity="0.25" stroke={AGT} strokeWidth="0.8" />
          <text x={112} y={7} fontSize="7" className="fill-muted-foreground/60">Agentic (LLM)</text>
          <rect x={200} y={0} width={8} height={8} rx={2} fill={INF} fillOpacity="0.25" stroke={INF} strokeWidth="0.8" />
          <text x={212} y={7} fontSize="7" className="fill-muted-foreground/60">Infrastructure</text>
          <rect x={300} y={0} width={8} height={8} rx={2} fill={GATE} fillOpacity="0.25" stroke={GATE} strokeWidth="0.8" />
          <text x={312} y={7} fontSize="7" className="fill-muted-foreground/60">Human gate</text>
        </g>

        {/* ── 1. ENTRY ── */}
        <text x={28} y={74} fontSize="8" fontWeight="600" className="fill-muted-foreground/60">Entry</text>
        <Box x={90} y={60} w={120} h={34} fill={DET} label="Slack bot" sub="@minions fix X" />
        <Box x={260} y={60} w={120} h={34} fill={DET} label="Bug report" sub="Jira / GitHub" />
        <Box x={430} y={60} w={120} h={34} fill={DET} label="CLI / web" sub="Direct invocation" />

        {/* Merge */}
        <VArrow x={150} y1={94} y2={112} />
        <VArrow x={MID} y1={94} y2={112} />
        <VArrow x={490} y1={94} y2={112} />
        <line x1={150} y1={112} x2={490} y2={112} stroke="currentColor" strokeWidth="1" className="text-neutral-300 dark:text-neutral-600" />
        <VArrow x={MID} y1={112} y2={126} />

        {/* ── 2. SETUP ── */}
        <text x={28} y={146} fontSize="8" fontWeight="600" className="fill-muted-foreground/60">Setup</text>
        <Box x={130} y={126} w={380} h={38} fill={INF} label="Spin up isolated devbox (EC2)" sub="Identical to human devboxes · boots in ~10s · cattle, not pets" />
        <VArrow x={MID} y1={164} y2={182} />

        {/* ── 3. CONTEXT ── */}
        <text x={28} y={202} fontSize="8" fontWeight="600" className="fill-muted-foreground/60">Context</text>
        <Box x={130} y={182} w={380} h={38} fill={INF} label="Toolshed MCP (~500 tools)" sub="Sourcegraph · docs · tickets · build status · curated subset per task" />
        <VArrow x={MID} y1={220} y2={244} />

        {/* ── 4. EXECUTE ── */}
        <text x={28} y={268} fontSize="8" fontWeight="600" className="fill-muted-foreground/60">Execute</text>
        <Box x={105} y={244} w={175} h={46} fill={DET} label="Deterministic node" sub="Fixed steps · fast · cheap" />
        <text x={192} y={301} textAnchor="middle" fontSize="7" className="fill-muted-foreground/70">file I/O, linting, test run</text>
        <HArrow x1={280} x2={318} y={267} />
        <Box x={318} y={244} w={185} h={46} fill={AGT} label="Agentic node (LLM)" sub="Reason · plan · generate" />
        <text x={410} y={301} textAnchor="middle" fontSize="7" className="fill-muted-foreground/70">interpret failures · write PR</text>

        {/* Self-loop on agentic node - exits right, curves up, returns */}
        <defs>
          <marker id="arrow-agt" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill={AGT} fillOpacity="0.6" />
          </marker>
        </defs>
        <path
          d="M 503 270 L 516 270 C 526 270, 530 266, 530 260 C 530 254, 526 250, 516 250 L 503 250"
          fill="none"
          stroke={AGT}
          strokeWidth="0.8"
          strokeDasharray="3 2"
          strokeOpacity="0.5"
          markerEnd="url(#arrow-agt)"
        />
        <text x={540} y={262} fontSize="7" fontWeight="600" fill={AGT} fillOpacity="0.7">retry</text>

        {/* Blueprint annotation */}
        <text x={555} y={255} fontSize="7" fontWeight="600" className="fill-muted-foreground/70">Blueprint =</text>
        <text x={555} y={265} fontSize="7" className="fill-muted-foreground/60">sequence of these</text>
        <text x={555} y={275} fontSize="7" className="fill-muted-foreground/60">two node types</text>

        <VArrow x={MID} y1={308} y2={332} />

        {/* ── 5. FEEDBACK ── */}
        <text x={28} y={356} fontSize="8" fontWeight="600" className="fill-muted-foreground/60">Feedback</text>
        <Box x={105} y={332} w={170} h={42} fill={DET} label="Local lint" sub="<5s · pre-push hook" />
        <HArrow x1={275} x2={310} y={353} />
        <Box x={310} y={332} w={200} h={42} fill={DET} label="CI (selective tests)" sub="3M+ tests · autofixes applied" />

        {/* Retry loop on CI box - exits right, curves down, returns */}
        <defs>
          <marker id="arrow-retry" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 z" fill="#ef4444" fillOpacity="0.6" />
          </marker>
        </defs>
        <path
          d="M 510 346 L 522 346 C 532 346, 536 350, 536 356 C 536 362, 532 366, 522 366 L 510 366"
          fill="none"
          stroke="#ef4444"
          strokeWidth="0.8"
          strokeDasharray="3 2"
          strokeOpacity="0.5"
          markerEnd="url(#arrow-retry)"
        />
        <text x={545} y={353} fontSize="7" fontWeight="600" fill="#ef4444" fillOpacity="0.7">Retry (max 2x)</text>
        <text x={545} y={363} fontSize="7" fill="#ef4444" fillOpacity="0.5">then escalate</text>

        <VArrow x={MID} y1={374} y2={410} />

        {/* ── 6. OUTPUT ── */}
        <text x={28} y={432} fontSize="8" fontWeight="600" className="fill-muted-foreground/60">Output</text>
        <Box x={130} y={410} w={380} h={42} fill={AGT} label="Pull request (CI passing)" sub="No human-written code · 1,300+ PRs/week · description auto-written" />

        <VArrow x={MID} y1={452} y2={476} />

        {/* ── 7. GATE ── */}
        <text x={28} y={498} fontSize="8" fontWeight="600" className="fill-muted-foreground/60">Gate</text>
        <Box x={130} y={476} w={380} h={42} fill={GATE} label="Human engineer review" sub="Approve · request changes · discard · load-bearing gate" />

      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        The full Minions pipeline from Stripe&apos;s engineering blog. A
        Blueprint is a state machine that mixes deterministic nodes (fast,
        cheap, predictable) with agentic nodes (LLM reasoning). The system
        runs the model, not the other way round.
      </figcaption>
    </figure>
  );
}
