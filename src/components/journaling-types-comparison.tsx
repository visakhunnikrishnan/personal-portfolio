/*
 * Journaling Types — evidence-strength comparison
 *
 * Qualitative ranking by depth of controlled-trial evidence, drawing on
 * Frattaroli (2006), Cregg & Cheavens (2021), Hofmann & Smits (2008),
 * and the absence of RCTs for morning pages and bullet journaling.
 */

const W = 640;
const H = 320;
const PAD = { top: 28, right: 60, bottom: 24, left: 200 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const ACCENT = "#8b5cf6";

const data = [
  {
    name: "Expressive writing",
    value: 88,
    note: "~150 RCTs, multiple meta-analyses",
    strong: true,
  },
  {
    name: "CBT thought records",
    value: 82,
    note: "Within wider CBT — hundreds of RCTs",
    strong: true,
  },
  {
    name: "Gratitude journaling",
    value: 60,
    note: "Multiple meta-analyses, smaller effects",
    strong: true,
  },
  {
    name: "Reflective journaling",
    value: 26,
    note: "Mostly qualitative studies",
  },
  {
    name: "Bullet journaling",
    value: 8,
    note: "No controlled trials",
  },
  {
    name: "Morning pages",
    value: 5,
    note: "No controlled trials",
  },
];

const ROW_H = 30;
const ROW_GAP = 12;
const TOTAL_ROWS_H = data.length * ROW_H + (data.length - 1) * ROW_GAP;
const ROWS_TOP = PAD.top + (CH - TOTAL_ROWS_H) / 2;

function x(v: number) {
  return PAD.left + (v / 100) * CW;
}

export function JournalingTypesComparison() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Comparison of evidence strength across journaling formats: expressive writing, CBT thought records, gratitude, reflective, bullet, and morning pages"
      >
        <defs>
          <linearGradient id="jtc-bar" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.25" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="jtc-bar-faint" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.1" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Baseline */}
        <line
          x1={PAD.left}
          y1={ROWS_TOP - 6}
          x2={PAD.left}
          y2={ROWS_TOP + TOTAL_ROWS_H + 6}
          stroke="currentColor"
          strokeWidth="0.75"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {/* Strength scale labels */}
        <text
          x={PAD.left}
          y={PAD.top - 8}
          fontSize="9"
          className="fill-muted-foreground/50"
          textAnchor="start"
        >
          less evidence
        </text>
        <text
          x={PAD.left + CW}
          y={PAD.top - 8}
          fontSize="9"
          className="fill-muted-foreground/50"
          textAnchor="end"
        >
          more evidence
        </text>

        {/* Rows */}
        {data.map((d, i) => {
          const rowY = ROWS_TOP + i * (ROW_H + ROW_GAP);
          const barW = (d.value / 100) * CW;

          return (
            <g key={d.name}>
              {/* Method label */}
              <text
                x={PAD.left - 14}
                y={rowY + ROW_H / 2 + 4}
                textAnchor="end"
                fontSize="12"
                fontWeight="600"
                className="fill-foreground"
              >
                {d.name}
              </text>

              {/* Bar */}
              <rect
                x={PAD.left}
                y={rowY}
                width={barW}
                height={ROW_H}
                rx={4}
                fill={d.strong ? "url(#jtc-bar)" : "url(#jtc-bar-faint)"}
              />

              {/* Note */}
              <text
                x={PAD.left + barW + 10}
                y={rowY + ROW_H / 2 + 4}
                fontSize="10"
                className="fill-muted-foreground"
              >
                {d.note}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Different types of journaling have very different amounts of
        research behind them. The most popular ones online are not
        always the best-studied.
      </figcaption>
    </figure>
  );
}
