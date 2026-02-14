const W = 640;
const H = 340;
const PAD = { top: 36, right: 32, bottom: 48, left: 32 };
const CW = W - PAD.left - PAD.right;
const CH = H - PAD.top - PAD.bottom;

const l = PAD.left;
const r = l + CW;
const t = PAD.top;
const b = t + CH;
const cx = l + CW * 0.5;
const cy = t + CH * 0.5;

// S-shaped curves via cubic bezier
// False negatives: high-left to low-right
const fnCurve = `M ${l},${t + CH * 0.06} C ${l + CW * 0.3},${t + CH * 0.06} ${l + CW * 0.7},${t + CH * 0.94} ${r},${t + CH * 0.94}`;

// False positives: low-left to high-right
const fpCurve = `M ${l},${t + CH * 0.94} C ${l + CW * 0.3},${t + CH * 0.94} ${l + CW * 0.7},${t + CH * 0.06} ${r},${t + CH * 0.06}`;

export function SastTradeoffChart() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Tradeoff between false positives and false negatives as rule strictness changes"
      >
        {/* Optimal zone highlight */}
        <rect
          x={cx - 44}
          y={t}
          width={88}
          height={CH}
          rx="4"
          fill="currentColor"
          className="text-emerald-500/[0.06] dark:text-emerald-400/[0.08]"
        />

        {/* Horizontal mid grid */}
        <line
          x1={l}
          y1={cy}
          x2={r}
          y2={cy}
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-neutral-200 dark:text-neutral-700"
        />

        {/* Vertical center dashed */}
        <line
          x1={cx}
          y1={t}
          x2={cx}
          y2={b}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 4"
          className="text-neutral-300 dark:text-neutral-600"
        />

        {/* Glow lines */}
        <path d={fnCurve} fill="none" stroke="#ef4444" strokeWidth="6" opacity="0.1" />
        <path d={fpCurve} fill="none" stroke="#f59e0b" strokeWidth="6" opacity="0.1" />

        {/* Curve lines */}
        <path d={fnCurve} fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        <path d={fpCurve} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

        {/* Crossing dot */}
        <circle cx={cx} cy={cy} r={10} fill="#10b981" opacity={0.1} />
        <circle cx={cx} cy={cy} r={4} fill="#10b981" />
        <circle cx={cx} cy={cy} r={1.5} fill="white" opacity={0.5} />

        {/* Curve labels - left-aligned near the high end of each curve */}
        <text
          x={l + 6}
          y={t + CH * 0.22}
          textAnchor="start"
          className="text-[11px] font-medium"
          fill="#ef4444"
        >
          False negatives
        </text>
        <text
          x={l + 6}
          y={t + CH * 0.22 + 14}
          textAnchor="start"
          className="text-[9px] fill-muted-foreground/50"
        >
          missed vulnerabilities
        </text>

        <text
          x={r - 6}
          y={t + CH * 0.22}
          textAnchor="end"
          className="text-[11px] font-medium"
          fill="#f59e0b"
        >
          False positives
        </text>
        <text
          x={r - 6}
          y={t + CH * 0.22 + 14}
          textAnchor="end"
          className="text-[9px] fill-muted-foreground/50"
        >
          wasted investigation
        </text>

        {/* Optimal label */}
        <text
          x={cx}
          y={t - 10}
          textAnchor="middle"
          className="text-[10px] font-medium fill-emerald-600 dark:fill-emerald-400"
        >
          Optimal balance
        </text>

        {/* X-axis labels */}
        <text
          x={l}
          y={b + 18}
          textAnchor="start"
          className="text-[10px] fill-muted-foreground/60"
        >
          Loose
        </text>
        <text
          x={r}
          y={b + 18}
          textAnchor="end"
          className="text-[10px] fill-muted-foreground/60"
        >
          Strict
        </text>
        <text
          x={l + CW / 2}
          y={H - 6}
          textAnchor="middle"
          className="text-[11px] font-medium fill-muted-foreground"
        >
          Rule strictness -&gt;
        </text>
      </svg>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        Stricter rules catch more real vulnerabilities but generate more noise.
        The sweet spot sits where both rates are acceptably low for your team.
      </figcaption>
    </figure>
  );
}
