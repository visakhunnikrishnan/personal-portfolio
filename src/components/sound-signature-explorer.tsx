"use client";

/*
 * Sound Signature Explorer – overlaid tuning curves with toggles
 *
 * Five illustrative tunings on one log-frequency chart. The chips both
 * toggle curves and act as the legend; a crosshair tooltip reads out
 * every visible curve at the pointer's frequency. Arrow keys move the
 * crosshair when the chart is focused.
 */

import { useMemo, useRef, useState } from "react";
import {
  SIGNATURES,
  formatHz,
  sampleCurve,
  tToFreq,
} from "./fr-shared";

const W = 640;
const H = 260;
const PAD = { top: 16, right: 64, bottom: 30, left: 30 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

const DB_MIN = -12;
const DB_MAX = 14;

function y(db: number) {
  return PAD.top + ((DB_MAX - db) / (DB_MAX - DB_MIN)) * PH;
}

const HZ_TICKS = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
const DB_TICKS = [-10, -5, 0, 5, 10];

const SAMPLED = SIGNATURES.map((s) => ({
  ...s,
  samples: sampleCurve(s.points),
  path: `M ${sampleCurve(s.points)
    .map((p) => `${(PAD.left + p.t * PW).toFixed(1)},${y(p.db).toFixed(1)}`)
    .join(" L ")}`,
}));

/* Spread end labels apart so converging lines stay readable. */
function spreadLabels(items: { id: string; y: number }[], minGap = 15) {
  const sorted = [...items].sort((a, b) => a.y - b.y);
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].y - sorted[i - 1].y < minGap) {
      sorted[i].y = sorted[i - 1].y + minGap;
    }
  }
  const overflow = sorted.length
    ? Math.max(0, sorted[sorted.length - 1].y - (PAD.top + PH))
    : 0;
  return new Map(sorted.map((s) => [s.id, s.y - overflow]));
}

export function SoundSignatureExplorer() {
  const [visible, setVisible] = useState<string[]>(["harman", "v-shaped"]);
  const [cursor, setCursor] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const shown = SAMPLED.filter((s) => visible.includes(s.id));

  function toggle(id: string) {
    setVisible((v) =>
      v.includes(id)
        ? v.length > 1
          ? v.filter((x) => x !== id)
          : v
        : [...v, id]
    );
  }

  function moveCursor(clientX: number) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const t = ((clientX - rect.left) / rect.width) * W;
    const clamped = Math.min(Math.max((t - PAD.left) / PW, 0), 1);
    setCursor(clamped);
  }

  const readout = useMemo(() => {
    if (cursor === null) return null;
    const idx = Math.round(cursor * (SAMPLED[0].samples.length - 1));
    return {
      hz: tToFreq(cursor),
      rows: shown.map((s) => ({
        id: s.id,
        name: s.name,
        color: s.color,
        db: s.samples[idx].db,
      })),
    };
  }, [cursor, shown]);

  const labelYs = spreadLabels(
    shown.map((s) => ({
      id: s.id,
      y: y(s.samples[s.samples.length - 1].db),
    }))
  );

  const cursorX = cursor !== null ? PAD.left + cursor * PW : null;
  const tooltipLeft = cursor !== null && cursor < 0.55;

  return (
    <figure className="not-prose my-8">
      {/* Legend chips double as toggles */}
      <div className="mb-3 flex flex-wrap justify-center gap-1.5">
        {SAMPLED.map((s) => {
          const on = visible.includes(s.id);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => toggle(s.id)}
              aria-pressed={on}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                on
                  ? "text-foreground"
                  : "border-border text-muted-foreground/60 hover:text-foreground"
              }`}
              style={
                on
                  ? { borderColor: s.color, backgroundColor: `${s.color}1a` }
                  : undefined
              }
            >
              <span
                className="h-[3px] w-3.5 rounded-full"
                style={{ backgroundColor: on ? s.color : "currentColor" }}
              />
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-pan-y focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          role="img"
          tabIndex={0}
          aria-label="Overlaid tuning curves for the selected sound signatures. Use arrow keys to read values along the curves."
          onPointerMove={(e) => moveCursor(e.clientX)}
          onPointerLeave={() => setCursor(null)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              const step = e.key === "ArrowLeft" ? -0.02 : 0.02;
              setCursor((c) => Math.min(Math.max((c ?? 0.5) + step, 0), 1));
            } else if (e.key === "Escape") {
              setCursor(null);
            }
          }}
        >
          {/* dB gridlines */}
          {DB_TICKS.map((db) => (
            <g key={db}>
              <line
                x1={PAD.left}
                y1={y(db)}
                x2={PAD.left + PW}
                y2={y(db)}
                stroke="currentColor"
                strokeWidth="1"
                className={
                  db === 0
                    ? "text-neutral-300 dark:text-neutral-600"
                    : "text-neutral-200 dark:text-neutral-800"
                }
              />
              <text
                x={PAD.left - 5}
                y={y(db) + 3}
                textAnchor="end"
                fontSize="8.5"
                className="fill-muted-foreground/70"
              >
                {db > 0 ? `+${db}` : db}
              </text>
            </g>
          ))}
          <text
            x={PAD.left - 22}
            y={PAD.top - 4}
            fontSize="8.5"
            className="fill-muted-foreground/70"
          >
            dB
          </text>

          {/* Curves */}
          {shown.map((s) => (
            <path
              key={s.id}
              d={s.path}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* End dots + spread labels with leader lines */}
          {shown.map((s) => {
            const endY = y(s.samples[s.samples.length - 1].db);
            const labelY = labelYs.get(s.id) ?? endY;
            return (
              <g key={s.id}>
                {Math.abs(labelY - endY) > 4 && (
                  <line
                    x1={PAD.left + PW + 2}
                    y1={endY}
                    x2={PAD.left + PW + 10}
                    y2={labelY}
                    stroke="currentColor"
                    strokeWidth="0.75"
                    className="text-neutral-300 dark:text-neutral-600"
                  />
                )}
                <circle
                  cx={PAD.left + PW}
                  cy={endY}
                  r="4"
                  fill={s.color}
                  stroke="var(--background)"
                  strokeWidth="2"
                />
                <text
                  x={PAD.left + PW + 13}
                  y={labelY + 3}
                  fontSize="9"
                  className="fill-muted-foreground"
                >
                  {s.name}
                </text>
              </g>
            );
          })}

          {/* Crosshair */}
          {cursorX !== null && (
            <line
              x1={cursorX}
              y1={PAD.top}
              x2={cursorX}
              y2={PAD.top + PH}
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-400 dark:text-neutral-500"
            />
          )}

          {/* Hz ticks */}
          {HZ_TICKS.map((hz) => {
            const t =
              (Math.log10(hz) - Math.log10(20)) /
              (Math.log10(20000) - Math.log10(20));
            const tx = PAD.left + t * PW;
            return (
              <g key={hz}>
                <line
                  x1={tx}
                  y1={PAD.top + PH}
                  x2={tx}
                  y2={PAD.top + PH + 4}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-neutral-400 dark:text-neutral-500"
                />
                <text
                  x={tx}
                  y={PAD.top + PH + 14}
                  textAnchor="middle"
                  fontSize="8.5"
                  className="fill-muted-foreground"
                >
                  {hz >= 1000 ? `${hz / 1000}k` : hz}
                </text>
              </g>
            );
          })}
          <text
            x={PAD.left + PW / 2}
            y={H - 3}
            textAnchor="middle"
            fontSize="8.5"
            className="fill-muted-foreground/70"
          >
            frequency (Hz)
          </text>
        </svg>

        {/* Tooltip */}
        {readout && cursorX !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 rounded-lg border border-border bg-popover px-3 py-2 shadow-sm"
            style={
              tooltipLeft
                ? { left: `${((cursorX + 10) / W) * 100}%` }
                : { right: `${((W - cursorX + 10) / W) * 100}%` }
            }
          >
            <p className="text-xs font-semibold tabular-nums">
              {formatHz(readout.hz)} Hz
            </p>
            <div className="mt-1 space-y-0.5">
              {readout.rows.map((r) => (
                <p
                  key={r.id}
                  className="flex items-center gap-1.5 text-xs tabular-nums"
                >
                  <span
                    className="h-[3px] w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: r.color }}
                  />
                  <span className="font-medium">
                    {r.db >= 0 ? "+" : ""}
                    {r.db.toFixed(1)} dB
                  </span>
                  <span className="text-muted-foreground">{r.name}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        The five common sound signatures as simplified tuning curves (not
        measurements of any specific product). Toggle them on and off, and
        hover or drag across the chart to compare levels.
      </figcaption>
    </figure>
  );
}
