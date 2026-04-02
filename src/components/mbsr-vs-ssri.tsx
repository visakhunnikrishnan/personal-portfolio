/*
 * MBSR vs Escitalopram – paired horizontal bar comparison
 *
 * Head-to-head data from Hoge et al. (2023) JAMA Psychiatry RCT.
 * 276 adults with anxiety disorders: MBSR noninferior to first-line SSRI.
 */

const W = 640;
const H = 380;
const PAD = { top: 24, right: 24, bottom: 8, left: 24 };
const CW = W - PAD.left - PAD.right;

const MBSR_COLOR = "#8b5cf6";
const SSRI_COLOR = "#f59e0b";

const LABEL_X = PAD.left;
const BAR_START = PAD.left + 180;
const BAR_MAX_W = CW - 180;
const BAR_H = 24;
const BAR_GAP = 6;

const metrics = [
  {
    label: "Symptom relief",
    sub: "CGI-S score reduction",
    mbsr: { value: 1.35, display: "1.35 pts" },
    ssri: { value: 1.43, display: "1.43 pts" },
    max: 2,
    note: "Similar effectiveness",
  },
  {
    label: "Side effects",
    sub: "% reporting adverse events",
    mbsr: { value: 15.4, display: "15.4%" },
    ssri: { value: 78.6, display: "78.6%" },
    max: 100,
    note: "~5x fewer with meditation",
    highlight: true,
  },
  {
    label: "Quit due to side effects",
    sub: "% who dropped out",
    mbsr: { value: 0, display: "0%" },
    ssri: { value: 8, display: "8%" },
    max: 12,
    note: "Nobody quit meditation",
    highlight: true,
  },
];

const BLOCK_H = BAR_H * 2 + BAR_GAP + 48;

export function MBSRvsSSRI() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Paired bar chart comparing MBSR and escitalopram across symptom relief, side effects, and dropout rates"
      >
        {/* Legend */}
        <circle cx={PAD.left} cy={PAD.top + 8} r={5} fill={MBSR_COLOR} />
        <text
          x={PAD.left + 12}
          y={PAD.top + 12}
          fontSize="11"
          fontWeight="600"
          fill={MBSR_COLOR}
        >
          MBSR (meditation)
        </text>
        <circle cx={PAD.left + 150} cy={PAD.top + 8} r={5} fill={SSRI_COLOR} />
        <text
          x={PAD.left + 162}
          y={PAD.top + 12}
          fontSize="11"
          fontWeight="600"
          fill={SSRI_COLOR}
        >
          Escitalopram (SSRI)
        </text>

        {metrics.map((m, i) => {
          const blockY = PAD.top + 36 + i * BLOCK_H;
          const mbsrW = Math.max((m.mbsr.value / m.max) * BAR_MAX_W, 2);
          const ssriW = Math.max((m.ssri.value / m.max) * BAR_MAX_W, 2);

          return (
            <g key={m.label}>
              {/* Highlight background */}
              {m.highlight && (
                <rect
                  x={PAD.left - 8}
                  y={blockY - 6}
                  width={CW + 16}
                  height={BLOCK_H - 8}
                  rx={8}
                  className="fill-violet-50/50 dark:fill-violet-950/20"
                />
              )}

              {/* Label */}
              <text
                x={LABEL_X}
                y={blockY + 14}
                fontSize="12"
                fontWeight="600"
                className="fill-foreground"
              >
                {m.label}
              </text>
              <text
                x={LABEL_X}
                y={blockY + 28}
                fontSize="9"
                className="fill-muted-foreground/50"
              >
                {m.sub}
              </text>

              {/* MBSR bar */}
              <rect
                x={BAR_START}
                y={blockY + 38}
                width={mbsrW}
                height={BAR_H}
                rx={4}
                fill={MBSR_COLOR}
                fillOpacity="0.7"
              />
              <text
                x={BAR_START + mbsrW + 8}
                y={blockY + 38 + BAR_H / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill={MBSR_COLOR}
              >
                {m.mbsr.display}
              </text>

              {/* SSRI bar */}
              <rect
                x={BAR_START}
                y={blockY + 38 + BAR_H + BAR_GAP}
                width={ssriW}
                height={BAR_H}
                rx={4}
                fill={SSRI_COLOR}
                fillOpacity="0.7"
              />
              <text
                x={BAR_START + ssriW + 8}
                y={blockY + 38 + BAR_H + BAR_GAP + BAR_H / 2 + 4}
                fontSize="11"
                fontWeight="600"
                fill={SSRI_COLOR}
              >
                {m.ssri.display}
              </text>

              {/* Annotation */}
              <text
                x={PAD.left + CW}
                y={blockY + 14}
                textAnchor="end"
                fontSize="9"
                className="fill-muted-foreground/40"
                fontStyle="italic"
              >
                {m.note}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Hoge et al. (2023), 276 adults with anxiety disorders. Symptom relief
        was comparable. Side effects were not.
      </figcaption>
    </figure>
  );
}
