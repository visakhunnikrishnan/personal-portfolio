/*
 * IQ Distribution – annotated normal curve
 *
 * Bell curve with mean=100, SD=15.
 * Annotations showing percentage ranges and key thresholds.
 */

const W = 640;
const H = 240;
const PAD = { top: 20, right: 30, bottom: 50, left: 30 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const MEAN = 100;
const SD = 15;
const MIN_IQ = 55;
const MAX_IQ = 145;

function iqToX(iq: number) {
  return PAD.left + ((iq - MIN_IQ) / (MAX_IQ - MIN_IQ)) * CW;
}

function gaussian(x: number) {
  const z = (x - MEAN) / SD;
  return Math.exp(-0.5 * z * z);
}

function curveY(val: number) {
  return PAD.top + CH - val * CH * 0.92;
}

// Generate smooth curve points
const points: string[] = [];
for (let iq = MIN_IQ; iq <= MAX_IQ; iq += 0.5) {
  points.push(`${iqToX(iq).toFixed(1)},${curveY(gaussian(iq)).toFixed(1)}`);
}
const curvePath = `M ${points.join(" L ")}`;
const fillPath = `${curvePath} L ${iqToX(MAX_IQ).toFixed(1)},${curveY(0).toFixed(1)} L ${iqToX(MIN_IQ).toFixed(1)},${curveY(0).toFixed(1)} Z`;

// Shaded regions
function shadedRegion(from: number, to: number) {
  const pts: string[] = [];
  for (let iq = from; iq <= to; iq += 0.5) {
    pts.push(`${iqToX(iq).toFixed(1)},${curveY(gaussian(iq)).toFixed(1)}`);
  }
  return `M ${iqToX(from).toFixed(1)},${curveY(0).toFixed(1)} L ${pts.join(" L ")} L ${iqToX(to).toFixed(1)},${curveY(0).toFixed(1)} Z`;
}

const COLOR = "#8b5cf6";

export function IQDistribution() {
  return (
    <figure className="not-prose my-6">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Normal distribution bell curve of IQ scores with mean 100 and standard deviation 15"
      >
        <defs>
          <linearGradient id="iq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR} stopOpacity="0.2" />
            <stop offset="100%" stopColor={COLOR} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Baseline */}
        <line
          x1={PAD.left}
          y1={curveY(0)}
          x2={PAD.left + CW}
          y2={curveY(0)}
          stroke="currentColor"
          strokeWidth="1"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {/* 68% shaded region (1 SD) */}
        <path
          d={shadedRegion(MEAN - SD, MEAN + SD)}
          fill={COLOR}
          fillOpacity="0.15"
        />

        {/* 95% shaded region (2 SD) - lighter */}
        <path
          d={shadedRegion(MEAN - 2 * SD, MEAN - SD)}
          fill={COLOR}
          fillOpacity="0.07"
        />
        <path
          d={shadedRegion(MEAN + SD, MEAN + 2 * SD)}
          fill={COLOR}
          fillOpacity="0.07"
        />

        {/* Curve line */}
        <path
          d={curvePath}
          fill="none"
          stroke={COLOR}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* IQ tick marks */}
        {[70, 85, 100, 115, 130].map((iq) => (
          <g key={iq}>
            <line
              x1={iqToX(iq)}
              y1={curveY(0)}
              x2={iqToX(iq)}
              y2={curveY(0) + 6}
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-400 dark:text-neutral-500"
            />
            <text
              x={iqToX(iq)}
              y={curveY(0) + 18}
              textAnchor="middle"
              fontSize="10"
              fontWeight={iq === 100 ? "700" : "400"}
              className={iq === 100 ? "fill-foreground" : "fill-muted-foreground"}
            >
              {iq}
            </text>
          </g>
        ))}

        {/* SD labels below ticks */}
        {[
          { iq: 70, label: "-2 SD" },
          { iq: 85, label: "-1 SD" },
          { iq: 115, label: "+1 SD" },
          { iq: 130, label: "+2 SD" },
        ].map((s) => (
          <text
            key={s.iq}
            x={iqToX(s.iq)}
            y={curveY(0) + 30}
            textAnchor="middle"
            fontSize="8"
            className="fill-muted-foreground/50"
          >
            {s.label}
          </text>
        ))}

        {/* Mean label */}
        <text
          x={iqToX(100)}
          y={curveY(0) + 30}
          textAnchor="middle"
          fontSize="8"
          className="fill-muted-foreground/50"
        >
          mean
        </text>

        {/* Percentage annotations */}
        {/* 68% bracket */}
        <line
          x1={iqToX(85)}
          y1={curveY(0) + 38}
          x2={iqToX(115)}
          y2={curveY(0) + 38}
          stroke={COLOR}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        <text
          x={iqToX(100)}
          y={curveY(0) + 48}
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill={COLOR}
        >
          68% of people
        </text>

        {/* Arrow pointing to peak */}
        <line
          x1={iqToX(100)}
          y1={curveY(gaussian(100)) - 4}
          x2={iqToX(100)}
          y2={curveY(0) - 2}
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          className="text-neutral-300 dark:text-neutral-600"
        />
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        The bell curve of IQ. Most people cluster around the middle. About 68%
        score within one standard deviation of the mean (85-115), and 95% fall
        between 70 and 130.
      </figcaption>
    </figure>
  );
}
