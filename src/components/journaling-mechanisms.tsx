/*
 * Four Mechanisms of Journaling – convergence diagram
 *
 * Four mechanisms at the top flow into a single point at the bottom:
 * narrative coherence. The "convergence is the active ingredient" idea
 * shown literally — four hairlines meeting at one node.
 */

const W = 640;
const H = 320;
const ACCENT = "#8b5cf6";

const items = [
  {
    name: "Cognitive\noffloading",
    sub: "Get the worry out of your head",
  },
  {
    name: "Linearization",
    sub: "One thought at a time, in order",
  },
  {
    name: "Slow thinking",
    sub: "Fast intuition gives way to deliberate analysis",
  },
  {
    name: "Self-distancing",
    sub: "Look at yourself from across the room",
  },
];

const TOP_DOT_Y = 40;
const NAME_Y = 70;
const ANCHOR_Y = 110;
const CONVERGE_Y = 218;
const CONVERGE_X = W / 2;
const PILL_W = 240;
const PILL_H = 46;
const PILL_Y = CONVERGE_Y;
const SUBTITLE_Y = PILL_Y + PILL_H + 28;

const cols = items.length;
const COL_W = (W - 80) / cols;
function colCenter(i: number) {
  return 40 + (i + 0.5) * COL_W;
}

export function JournalingMechanisms() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Four cognitive mechanisms — offloading, linearization, slow thinking, self-distancing — converging into narrative coherence"
      >
        <defs>
          <linearGradient id="jm-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* Curves from each item to the convergence node */}
        {items.map((_, i) => {
          const cx = colCenter(i);
          const sy = ANCHOR_Y;
          const ey = CONVERGE_Y;
          const midY = (sy + ey) / 2;
          const d = `M ${cx} ${sy} C ${cx} ${midY} ${CONVERGE_X} ${midY} ${CONVERGE_X} ${ey}`;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="url(#jm-line)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          );
        })}

        {/* Top items */}
        {items.map((item, i) => {
          const cx = colCenter(i);
          const lines = item.name.split("\n");
          return (
            <g key={i}>
              {/* Dot */}
              <circle cx={cx} cy={TOP_DOT_Y} r={3.5} fill={ACCENT} />
              {/* Name */}
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={cx}
                  y={NAME_Y + li * 16}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  className="fill-foreground"
                >
                  {line}
                </text>
              ))}
              {/* Subtitle (wraps if needed) */}
              <foreignObject
                x={cx - COL_W / 2 + 8}
                y={NAME_Y + lines.length * 16 + 4}
                width={COL_W - 16}
                height={40}
              >
                <div
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.4",
                    textAlign: "center",
                    color: "rgb(115 115 115)",
                  }}
                  className="text-muted-foreground"
                >
                  {item.sub}
                </div>
              </foreignObject>
            </g>
          );
        })}

        {/* Convergence node — minimal pill */}
        <rect
          x={CONVERGE_X - PILL_W / 2}
          y={PILL_Y}
          width={PILL_W}
          height={PILL_H}
          rx={PILL_H / 2}
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.25"
          strokeOpacity="0.7"
        />
        <rect
          x={CONVERGE_X - PILL_W / 2}
          y={PILL_Y}
          width={PILL_W}
          height={PILL_H}
          rx={PILL_H / 2}
          fill={ACCENT}
          fillOpacity="0.08"
        />
        <text
          x={CONVERGE_X}
          y={PILL_Y + PILL_H / 2 + 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="600"
          fill={ACCENT}
        >
          Narrative coherence
        </text>

        {/* Subtitle under the node */}
        <text
          x={CONVERGE_X}
          y={SUBTITLE_Y}
          textAnchor="middle"
          fontSize="11"
          fontStyle="italic"
          className="fill-muted-foreground"
        >
          a chaotic experience becomes a story with cause and meaning
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Four cognitive systems engaged at once. Their convergence is the
        active ingredient &mdash; not catharsis.
      </figcaption>
    </figure>
  );
}
