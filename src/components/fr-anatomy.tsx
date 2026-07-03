"use client";

/*
 * FR Anatomy – interactive tour of a frequency response graph
 *
 * A Harman-style curve drawn in neutral ink, with the five frequency
 * regions as tappable color bands. Selecting a region (band or chip)
 * shows what lives there and what too much / too little sounds like.
 */

import { useState } from "react";
import { FR_COLORS, SIGNATURES, freqToT, sampleCurve } from "./fr-shared";

const W = 640;
const H = 250;
const PAD = { top: 24, right: 12, bottom: 30, left: 30 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

const DB_MIN = -12;
const DB_MAX = 14;

function x(hz: number) {
  return PAD.left + freqToT(hz) * PW;
}

function y(db: number) {
  return PAD.top + ((DB_MAX - db) / (DB_MAX - DB_MIN)) * PH;
}

interface Region {
  id: string;
  name: string;
  from: number;
  to: number;
  range: string;
  color: string;
  carries: string;
  tooMuch: string;
  tooLittle: string;
}

const REGIONS: Region[] = [
  {
    id: "sub-bass",
    name: "Sub-bass",
    from: 20,
    to: 60,
    range: "20–60 Hz",
    color: FR_COLORS.violet,
    carries:
      "The rumble you feel more than hear - 808 slides, synth drops, the low growl of a movie explosion.",
    tooMuch: "Everything vibrates; the sound turns bloated and woolly.",
    tooLittle: "Bass drops land like a polite tap on the shoulder.",
  },
  {
    id: "bass",
    name: "Bass",
    from: 60,
    to: 250,
    range: "60–250 Hz",
    color: FR_COLORS.amber,
    carries:
      "The punch of a kick drum, the groove of a bass guitar, the body and warmth of the whole mix.",
    tooMuch: "Boomy - bass bleeds over vocals and blurs everything.",
    tooLittle: "Music sounds thin, lean, and cold.",
  },
  {
    id: "mids",
    name: "Mids",
    from: 250,
    to: 2000,
    range: "250 Hz–2 kHz",
    color: FR_COLORS.cyan,
    carries:
      "Vocals, guitars, piano, strings - the region where most of the actual music lives.",
    tooMuch: "Honky and boxy, like singing through cupped hands.",
    tooLittle: "The singer steps behind a curtain - distant and veiled.",
  },
  {
    id: "upper-mids",
    name: "Upper mids",
    from: 2000,
    to: 5000,
    range: "2–5 kHz",
    color: FR_COLORS.pink,
    carries:
      "Vocal presence and the attack of instruments. Your ear is at its most sensitive right here.",
    tooMuch: "Shouty and fatiguing - you keep reaching to turn it down.",
    tooLittle: "Dull and muffled, like a blanket over the speakers.",
  },
  {
    id: "treble",
    name: "Treble",
    from: 5000,
    to: 20000,
    range: "5–20 kHz",
    color: FR_COLORS.emerald,
    carries:
      "Cymbals, hi-hats, the edge of an “s” sound, and the sense of air and sparkle around everything.",
    tooMuch: "Piercing cymbals and hissy, sharp “s” sounds (sibilance).",
    tooLittle: "Closed-in and lifeless - no shimmer, no space.",
  },
];

const curve = sampleCurve(SIGNATURES[0].points);
const curvePath = `M ${curve
  .map((p) => `${(PAD.left + p.t * PW).toFixed(1)},${y(p.db).toFixed(1)}`)
  .join(" L ")}`;

const HZ_TICKS = [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000];
const DB_TICKS = [-10, -5, 0, 5, 10];

function hzLabel(hz: number) {
  return hz >= 1000 ? `${hz / 1000}k` : `${hz}`;
}

export function FrAnatomy() {
  const [selected, setSelected] = useState("mids");
  const [hovered, setHovered] = useState<string | null>(null);
  const active = REGIONS.find((r) => r.id === selected)!;

  return (
    <figure className="not-prose my-8">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="A frequency response curve split into five regions: sub-bass, bass, mids, upper mids, and treble"
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
          y={PAD.top - 10}
          fontSize="8.5"
          className="fill-muted-foreground/70"
        >
          dB
        </text>

        {/* Region bands */}
        {REGIONS.map((r) => {
          const isActive = r.id === selected;
          const isHover = r.id === hovered;
          return (
            <g
              key={r.id}
              onClick={() => setSelected(r.id)}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              aria-hidden="true"
            >
              <rect
                x={x(r.from)}
                y={PAD.top}
                width={x(r.to) - x(r.from)}
                height={PH}
                fill={r.color}
                fillOpacity={isActive ? 0.22 : isHover ? 0.13 : 0.06}
              />
              <text
                x={(x(r.from) + x(r.to)) / 2}
                y={PAD.top + 12}
                textAnchor="middle"
                fontSize="9.5"
                fontWeight={isActive ? 700 : 400}
                className={
                  isActive ? "fill-foreground" : "fill-muted-foreground"
                }
              >
                {r.name}
              </text>
              {r.from > 20 && (
                <line
                  x1={x(r.from)}
                  y1={PAD.top}
                  x2={x(r.from)}
                  y2={PAD.top + PH}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-neutral-200 dark:text-neutral-800"
                />
              )}
            </g>
          );
        })}

        {/* Ear-gain annotation */}
        <line
          x1={x(3000)}
          y1={y(9) - 3}
          x2={x(3000)}
          y2={PAD.top + 26}
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="3 3"
          className="text-neutral-400 dark:text-neutral-500"
        />
        <text
          x={x(3000)}
          y={PAD.top + 23}
          textAnchor="middle"
          fontSize="8"
          className="fill-muted-foreground"
        >
          ear gain - this hill is normal
        </text>

        {/* The curve, in neutral ink so the bands carry the color */}
        <path
          d={curvePath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/70"
        />

        {/* Hz ticks */}
        {HZ_TICKS.map((hz) => (
          <g key={hz}>
            <line
              x1={x(hz)}
              y1={PAD.top + PH}
              x2={x(hz)}
              y2={PAD.top + PH + 4}
              stroke="currentColor"
              strokeWidth="1"
              className="text-neutral-400 dark:text-neutral-500"
            />
            <text
              x={x(hz)}
              y={PAD.top + PH + 14}
              textAnchor="middle"
              fontSize="8.5"
              className="fill-muted-foreground"
            >
              {hzLabel(hz)}
            </text>
          </g>
        ))}
        <text
          x={PAD.left + PW / 2}
          y={H - 3}
          textAnchor="middle"
          fontSize="8.5"
          className="fill-muted-foreground/70"
        >
          frequency (Hz), low notes → high notes
        </text>
      </svg>

      {/* Region chips (keyboard-accessible mirror of the bands) */}
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {REGIONS.map((r) => {
          const isActive = r.id === selected;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelected(r.id)}
              aria-pressed={isActive}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                isActive
                  ? "text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
              style={
                isActive
                  ? { borderColor: r.color, backgroundColor: `${r.color}1a` }
                  : undefined
              }
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: r.color }}
              />
              {r.name}
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      <div className="mt-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-baseline gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 self-center rounded-full"
            style={{ backgroundColor: active.color }}
          />
          <h4 className="text-sm font-semibold">{active.name}</h4>
          <span className="text-xs text-muted-foreground">{active.range}</span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {active.carries}
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2 border-t border-border/50 pt-3 sm:grid-cols-2">
          <p className="text-xs leading-relaxed text-muted-foreground/80">
            <span className="font-medium text-foreground/80">Too much:</span>{" "}
            {active.tooMuch}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground/80">
            <span className="font-medium text-foreground/80">Too little:</span>{" "}
            {active.tooLittle}
          </p>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        The anatomy of a frequency response graph. Left is low notes, right is
        high notes; the line shows how loudly the earphone plays each. Tap a
        region to see what it does.
      </figcaption>
    </figure>
  );
}
