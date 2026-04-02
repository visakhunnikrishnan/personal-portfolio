/*
 * Meditation Benefits Timeline – horizontal timeline
 *
 * Shows when measurable benefits appear based on RCT evidence.
 * Each milestone is backed by a specific study referenced in the blog.
 */

const W = 640;
const H = 380;
const PAD = { top: 20, right: 20, bottom: 20, left: 20 };
const CW = W - PAD.left - PAD.right;

const milestones = [
  {
    time: "7 min",
    label: "Positive feelings toward strangers",
    study: "Hutcherson 2008",
    color: "#10b981",
  },
  {
    time: "3 days",
    label: "Brain connectivity changes (amygdala)",
    study: "Taren 2015",
    color: "#06b6d4",
  },
  {
    time: "2 weeks",
    label: "Increased altruism and compassion",
    study: "Weng 2013",
    color: "#8b5cf6",
  },
  {
    time: "8 weeks",
    label: "Anxiety and depression improvement",
    study: "Goyal 2014, Davidson 2003",
    color: "#6366f1",
  },
  {
    time: "3 months",
    label: "Sustained attention, telomerase activity",
    study: "MacLean 2010, Jacobs 2011",
    color: "#a855f7",
  },
  {
    time: "Years",
    label: "Brain 7.5 years younger, trait-level changes",
    study: "Luders 2016, Lutz 2004",
    color: "#7c3aed",
  },
];

const ITEM_H = 52;
const LINE_X = PAD.left + 72;
const START_Y = PAD.top + 16;

export function MeditationBenefitsTimeline() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Timeline showing meditation benefits appearing from 7 minutes to years of practice"
      >
        {/* Vertical line */}
        <line
          x1={LINE_X}
          y1={START_Y + 8}
          x2={LINE_X}
          y2={START_Y + milestones.length * ITEM_H - 8}
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-neutral-200 dark:text-neutral-700"
        />

        {milestones.map((m, i) => {
          const itemY = START_Y + i * ITEM_H;
          const circleR = 7;

          return (
            <g key={m.time}>
              {/* Time label (left of line) */}
              <text
                x={LINE_X - 16}
                y={itemY + 16}
                textAnchor="end"
                fontSize="12"
                fontWeight="700"
                fill={m.color}
              >
                {m.time}
              </text>

              {/* Circle on the line */}
              <circle
                cx={LINE_X}
                cy={itemY + 13}
                r={circleR}
                fill={m.color}
                fillOpacity="0.15"
                stroke={m.color}
                strokeWidth="2"
              />
              <circle cx={LINE_X} cy={itemY + 13} r={3} fill={m.color} />

              {/* Horizontal connector */}
              <line
                x1={LINE_X + circleR + 2}
                y1={itemY + 13}
                x2={LINE_X + 24}
                y2={itemY + 13}
                stroke={m.color}
                strokeWidth="1"
                strokeOpacity="0.4"
              />

              {/* Label */}
              <text
                x={LINE_X + 28}
                y={itemY + 16}
                fontSize="12"
                fontWeight="500"
                className="fill-foreground"
              >
                {m.label}
              </text>

              {/* Study reference */}
              <text
                x={LINE_X + 28}
                y={itemY + 32}
                fontSize="9"
                className="fill-muted-foreground/60"
              >
                {m.study}
              </text>
            </g>
          );
        })}

        {/* Gradient arrow at bottom */}
        <polygon
          points={`${LINE_X - 5},${START_Y + milestones.length * ITEM_H - 4} ${LINE_X},${START_Y + milestones.length * ITEM_H + 8} ${LINE_X + 5},${START_Y + milestones.length * ITEM_H - 4}`}
          className="fill-neutral-300 dark:fill-neutral-600"
        />
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        When to expect results: each milestone is backed by at least one RCT.
        Benefits compound with consistent practice.
      </figcaption>
    </figure>
  );
}
