const W = 640;
const H = 160;
const PAD = { top: 30, right: 20, bottom: 40, left: 20 };
const TRACK_W = W - PAD.left - PAD.right;
const TRACK_Y_A = 55;
const TRACK_Y_B = 95;
const TRACK_H = 20;

// 9 PM to 6 AM = 9 hours, mapped to TRACK_W
const HOURS = 9;
function x(hour: number) {
  return PAD.left + (hour / HOURS) * TRACK_W;
}

export function ShiftSleepModel() {
  const splitHour = 4; // 1 AM = 4 hours after 9 PM

  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Shift sleeping model: Parent A sleeps 9PM to 1AM while Parent B is on duty, then they switch from 1AM to 5AM"
      >
        <defs>
          <linearGradient id="sleep-block" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
          </linearGradient>
          <pattern
            id="duty-hatch"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="6"
              stroke="#f97316"
              strokeWidth="1.5"
              opacity="0.4"
            />
          </pattern>
        </defs>

        {/* Hour markers */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((h) => {
          const labels = [
            "9 PM", "10", "11", "12 AM", "1 AM", "2", "3", "4", "5 AM", "6 AM",
          ];
          return (
            <g key={h}>
              <line
                x1={x(h)}
                y1={PAD.top - 4}
                x2={x(h)}
                y2={TRACK_Y_B + TRACK_H + 4}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-neutral-200 dark:text-neutral-700"
              />
              <text
                x={x(h)}
                y={PAD.top - 10}
                textAnchor="middle"
                className="text-[9px] fill-muted-foreground/60"
              >
                {labels[h]}
              </text>
            </g>
          );
        })}

        {/* Parent A row */}
        <text
          x={PAD.left - 4}
          y={TRACK_Y_A + 14}
          textAnchor="end"
          className="text-[10px] font-semibold fill-foreground/70"
        >

        </text>

        {/* Parent A: sleep 9PM–1AM */}
        <rect
          x={x(0)}
          y={TRACK_Y_A}
          width={x(splitHour) - x(0)}
          height={TRACK_H}
          rx={4}
          fill="url(#sleep-block)"
        />
        <text
          x={(x(0) + x(splitHour)) / 2}
          y={TRACK_Y_A + 14}
          textAnchor="middle"
          className="text-[9px] font-medium fill-indigo-700 dark:fill-indigo-300"
        >
          Mother sleeps
        </text>

        {/* Parent A: on duty 1AM–5AM */}
        <rect
          x={x(splitHour)}
          y={TRACK_Y_A}
          width={x(8) - x(splitHour)}
          height={TRACK_H}
          rx={4}
          fill="url(#duty-hatch)"
          stroke="#f97316"
          strokeWidth="0.5"
          opacity="0.8"
        />
        <text
          x={(x(splitHour) + x(8)) / 2}
          y={TRACK_Y_A + 14}
          textAnchor="middle"
          className="text-[9px] font-medium fill-orange-600 dark:fill-orange-400"
        >
          On duty
        </text>

        {/* Parent B row */}
        <text
          x={PAD.left - 4}
          y={TRACK_Y_B + 14}
          textAnchor="end"
          className="text-[10px] font-semibold fill-foreground/70"
        >

        </text>

        {/* Parent B: on duty 9PM–1AM */}
        <rect
          x={x(0)}
          y={TRACK_Y_B}
          width={x(splitHour) - x(0)}
          height={TRACK_H}
          rx={4}
          fill="url(#duty-hatch)"
          stroke="#f97316"
          strokeWidth="0.5"
          opacity="0.8"
        />
        <text
          x={(x(0) + x(splitHour)) / 2}
          y={TRACK_Y_B + 14}
          textAnchor="middle"
          className="text-[9px] font-medium fill-orange-600 dark:fill-orange-400"
        >
          Father on duty
        </text>

        {/* Parent B: sleep 1AM–5AM */}
        <rect
          x={x(splitHour)}
          y={TRACK_Y_B}
          width={x(8) - x(splitHour)}
          height={TRACK_H}
          rx={4}
          fill="url(#sleep-block)"
        />
        <text
          x={(x(splitHour) + x(8)) / 2}
          y={TRACK_Y_B + 14}
          textAnchor="middle"
          className="text-[9px] font-medium fill-indigo-700 dark:fill-indigo-300"
        >
          Father sleeps
        </text>

        {/* Split line */}
        <line
          x1={x(splitHour)}
          y1={TRACK_Y_A - 4}
          x2={x(splitHour)}
          y2={TRACK_Y_B + TRACK_H + 4}
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Legend */}
        <rect
          x={PAD.left}
          y={H - 14}
          width={10}
          height={6}
          rx={2}
          fill="#6366f1"
          opacity={0.5}
        />
        <text
          x={PAD.left + 14}
          y={H - 9}
          className="text-[9px] fill-muted-foreground/70"
        >
          Sleeping (4–5h unbroken)
        </text>
        <rect
          x={PAD.left + 150}
          y={H - 14}
          width={10}
          height={6}
          rx={2}
          fill="url(#duty-hatch)"
          stroke="#f97316"
          strokeWidth="0.5"
        />
        <text
          x={PAD.left + 164}
          y={H - 9}
          className="text-[9px] fill-muted-foreground/70"
        >
          On duty (feeds, changes, soothing)
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        Each parent gets one guaranteed block of 4&ndash;5 hours of unbroken
        sleep &mdash; the research minimum for cognitive functioning.
      </figcaption>
    </figure>
  );
}
