/*
 * Narrative Coherence Trajectory – dual line chart
 *
 * Schematic of Pennebaker's linguistic finding: across days of expressive
 * writing, participants who improve most show rising use of causal/insight
 * words (because, realize, understand) and falling use of first-person
 * pronouns (I, me, my). Trajectories illustrate the qualitative pattern
 * reported in Pennebaker (1997), Pennebaker & Seagal (1999), and Park,
 * Ayduk & Kross (2016).
 */

const W = 640;
const H = 320;
const PAD = { top: 30, right: 40, bottom: 60, left: 60 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const days = [1, 2, 3, 4];
const causal = [3.5, 4.6, 6.2, 7.8];
const firstPerson = [12.5, 11.2, 9.4, 7.5];

const Y_MIN = 2;
const Y_MAX = 14;

function xPos(d: number) {
  return PAD.left + ((d - 1) / (days.length - 1)) * CW;
}
function yPos(v: number) {
  return PAD.top + CH - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * CH;
}

const CAUSAL_COLOR = "#8b5cf6";
const FIRST_PERSON_COLOR = "#f59e0b";

function makePath(values: number[]) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xPos(days[i])} ${yPos(v)}`)
    .join(" ");
}

export function JournalingNarrativeCoherence() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Line chart showing causal and insight word use rising across four days of writing while first-person pronouns decline"
      >
        <defs>
          <linearGradient id="nc-causal-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CAUSAL_COLOR} stopOpacity="0.18" />
            <stop offset="100%" stopColor={CAUSAL_COLOR} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[4, 6, 8, 10, 12].map((v) => (
          <g key={v}>
            <line
              x1={PAD.left}
              y1={yPos(v)}
              x2={PAD.left + CW}
              y2={yPos(v)}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-neutral-200 dark:text-neutral-700"
            />
            <text
              x={PAD.left - 10}
              y={yPos(v) + 4}
              textAnchor="end"
              className="text-[10px] fill-muted-foreground/60"
            >
              {v}%
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {days.map((d) => (
          <g key={d}>
            <text
              x={xPos(d)}
              y={PAD.top + CH + 18}
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              className="fill-muted-foreground"
            >
              Day {d}
            </text>
          </g>
        ))}

        {/* Causal/insight area */}
        <path
          d={`${makePath(causal)} L ${xPos(days[days.length - 1])} ${yPos(Y_MIN)} L ${xPos(days[0])} ${yPos(Y_MIN)} Z`}
          fill="url(#nc-causal-area)"
        />
        {/* Causal/insight line */}
        <path
          d={makePath(causal)}
          fill="none"
          stroke={CAUSAL_COLOR}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {causal.map((v, i) => (
          <circle
            key={i}
            cx={xPos(days[i])}
            cy={yPos(v)}
            r={4}
            fill={CAUSAL_COLOR}
          />
        ))}

        {/* First-person line */}
        <path
          d={makePath(firstPerson)}
          fill="none"
          stroke={FIRST_PERSON_COLOR}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 4"
        />
        {firstPerson.map((v, i) => (
          <circle
            key={i}
            cx={xPos(days[i])}
            cy={yPos(v)}
            r={4}
            fill={FIRST_PERSON_COLOR}
          />
        ))}

        {/* End labels */}
        <text
          x={xPos(days[days.length - 1]) + 8}
          y={yPos(causal[causal.length - 1]) + 4}
          fontSize="11"
          fontWeight="600"
          fill={CAUSAL_COLOR}
        >
          rising
        </text>
        <text
          x={xPos(days[days.length - 1]) + 8}
          y={yPos(firstPerson[firstPerson.length - 1]) + 4}
          fontSize="11"
          fontWeight="600"
          fill={FIRST_PERSON_COLOR}
        >
          falling
        </text>

        {/* Legend */}
        <g transform={`translate(${PAD.left}, ${PAD.top - 18})`}>
          <line x1={0} y1={0} x2={18} y2={0} stroke={CAUSAL_COLOR} strokeWidth="2.5" />
          <text x={24} y={4} fontSize="10" fontWeight="600" fill={CAUSAL_COLOR}>
            because, realize, understand
          </text>
          <line
            x1={210}
            y1={0}
            x2={228}
            y2={0}
            stroke={FIRST_PERSON_COLOR}
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
          <text
            x={234}
            y={4}
            fontSize="10"
            fontWeight="600"
            fill={FIRST_PERSON_COLOR}
          >
            I, me, my
          </text>
        </g>

        {/* Y-axis title */}
        <text
          x={14}
          y={PAD.top + CH / 2}
          textAnchor="middle"
          transform={`rotate(-90, 14, ${PAD.top + CH / 2})`}
          fontSize="11"
          fontWeight="500"
          className="fill-muted-foreground"
        >
          Share of words used
        </text>

        {/* X-axis label */}
        <text
          x={PAD.left + CW / 2}
          y={H - 12}
          textAnchor="middle"
          fontSize="11"
          fontWeight="500"
          className="fill-muted-foreground"
        >
          Consecutive writing sessions
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Schematic of the linguistic pattern Pennebaker identified across
        thousands of essays. Improvement tracks the shift from re-living to
        sense-making, not the volume of emotion expressed.
      </figcaption>
    </figure>
  );
}
