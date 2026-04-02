/*
 * Intelligence Spectrum – horizontal scale
 *
 * Visual showing where different AI systems fall on the narrow-to-general scale.
 * Based on DeepMind's Levels of AGI framework (Morris et al., 2024).
 */

const W = 640;
const H = 220;
const PAD = { top: 24, right: 24, bottom: 24, left: 24 };
const CW = W - PAD.left - PAD.right;
const TRACK_Y = PAD.top + 60;
const TRACK_H = 8;

const markers = [
  { label: "Chess engines", position: 0.08, color: "#94a3b8", y: -1 },
  { label: "Self-driving", position: 0.18, color: "#94a3b8", y: 1 },
  { label: "Current LLMs", position: 0.32, color: "#8b5cf6", y: -1 },
  { label: "Hypothetical AGI", position: 0.65, color: "#f59e0b", y: 1 },
  { label: "AIXI (theoretical)", position: 0.95, color: "#ef4444", y: -1 },
];

const zones = [
  { label: "Narrow AI", start: 0, end: 0.4, color: "#8b5cf6" },
  { label: "General AI", start: 0.4, end: 0.75, color: "#f59e0b" },
  { label: "Superintelligence", start: 0.75, end: 1, color: "#ef4444" },
];

export function IntelligenceSpectrum() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Spectrum showing narrow AI, general AI, and superintelligence zones with current systems positioned"
      >
        {/* Zone backgrounds */}
        {zones.map((z) => (
          <g key={z.label}>
            <rect
              x={PAD.left + z.start * CW}
              y={TRACK_Y - 2}
              width={(z.end - z.start) * CW}
              height={TRACK_H + 4}
              rx={z.start === 0 ? 4 : z.end === 1 ? 4 : 0}
              fill={z.color}
              fillOpacity="0.15"
            />
            <text
              x={PAD.left + ((z.start + z.end) / 2) * CW}
              y={TRACK_Y + TRACK_H + 24}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill={z.color}
              fillOpacity="0.7"
            >
              {z.label}
            </text>
          </g>
        ))}

        {/* Track line */}
        <line
          x1={PAD.left}
          y1={TRACK_Y + TRACK_H / 2}
          x2={PAD.left + CW}
          y2={TRACK_Y + TRACK_H / 2}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {/* Markers */}
        {markers.map((m) => {
          const mx = PAD.left + m.position * CW;
          const above = m.y < 0;
          const labelY = above ? TRACK_Y - 20 : TRACK_Y + TRACK_H + 44;
          const lineEnd = above ? TRACK_Y - 8 : TRACK_Y + TRACK_H + 8;

          return (
            <g key={m.label}>
              {/* Dot on track */}
              <circle
                cx={mx}
                cy={TRACK_Y + TRACK_H / 2}
                r={5}
                fill={m.color}
              />
              {/* Connector line */}
              <line
                x1={mx}
                y1={TRACK_Y + TRACK_H / 2 + (above ? -6 : 6)}
                x2={mx}
                y2={lineEnd}
                stroke={m.color}
                strokeWidth="1"
                strokeOpacity="0.4"
              />
              {/* Label */}
              <text
                x={mx}
                y={labelY}
                textAnchor="middle"
                fontSize="9"
                fontWeight="500"
                fill={m.color}
              >
                {m.label}
              </text>
            </g>
          );
        })}

        {/* Arrow at right end */}
        <polygon
          points={`${PAD.left + CW - 2},${TRACK_Y + TRACK_H / 2 - 4} ${PAD.left + CW + 8},${TRACK_Y + TRACK_H / 2} ${PAD.left + CW - 2},${TRACK_Y + TRACK_H / 2 + 4}`}
          className="fill-neutral-400 dark:fill-neutral-500"
        />
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Where different systems fall on the intelligence spectrum. Current
        LLMs are broad but shallow - they sit in narrow AI territory despite
        being impressively general in some tasks.
      </figcaption>
    </figure>
  );
}
