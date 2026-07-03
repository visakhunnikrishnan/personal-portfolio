"use client";

/*
 * Genre → Signature Picker
 *
 * Pick what you mostly listen to; get the signature that usually fits,
 * why, and two concrete places to start (both appear in the picks list
 * later in the post).
 */

import { useState } from "react";
import { FR_COLORS } from "./fr-shared";

interface GenreRec {
  id: string;
  genre: string;
  signature: string;
  color: string;
  why: string;
  start: string[];
}

const RECS: GenreRec[] = [
  {
    id: "everything",
    genre: "A bit of everything",
    signature: "Harman",
    color: FR_COLORS.violet,
    why: "It is the tested crowd-pleaser - balanced enough for any genre, with just enough bass to stay fun.",
    start: ["7Hz Salnotes Zero 2 ($25)", "Moondrop Blessing 3 ($320)"],
  },
  {
    id: "edm",
    genre: "EDM · Hip-hop · Pop",
    signature: "V-shaped / bass-boosted Harman",
    color: FR_COLORS.amber,
    why: "These genres are built around the low end. You want the drop to hit, without the bass smearing into the vocals.",
    start: ["Truthear Zero:RED ($55)", "Simgot EW300 ($70)"],
  },
  {
    id: "rock",
    genre: "Rock · Metal",
    signature: "Neutral-bright",
    color: FR_COLORS.emerald,
    why: "Dense mixes with fast double-kick and layered guitars need speed and clarity more than extra bass.",
    start: ["Simgot EA500LM ($90)", "Simgot EW300 ($70)"],
  },
  {
    id: "classical",
    genre: "Classical · Jazz",
    signature: "Neutral",
    color: FR_COLORS.cyan,
    why: "Acoustic instruments sound right when nothing is boosted - you want the recording, not an interpretation of it.",
    start: ["Etymotic ER2SE ($100)", "Moondrop Blessing 3 ($320)"],
  },
  {
    id: "vocals",
    genre: "Vocals · Acoustic",
    signature: "Warm",
    color: FR_COLORS.pink,
    why: "Mids-forward warmth flatters voices and strings, and stays smooth for hours-long sessions.",
    start: ["Truthear Hexa ($80)", "Etymotic ER2SE ($100)"],
  },
  {
    id: "gaming",
    genre: "Gaming · Podcasts",
    signature: "Neutral",
    color: FR_COLORS.cyan,
    why: "Accurate positioning and clear speech beat booming explosions, and comfort matters most of all.",
    start: ["7Hz Salnotes Zero 2 ($25)", "Truthear Hexa ($80)"],
  },
];

export function GenreSignaturePicker() {
  const [selected, setSelected] = useState("everything");
  const rec = RECS.find((r) => r.id === selected)!;

  return (
    <figure className="not-prose my-8">
      <div className="flex flex-wrap justify-center gap-1.5">
        {RECS.map((r) => {
          const isActive = r.id === selected;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelected(r.id)}
              aria-pressed={isActive}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                isActive
                  ? "border-foreground/60 bg-secondary font-medium text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {r.genre}
            </button>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Look for:</span>
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
            style={{ borderColor: rec.color, backgroundColor: `${rec.color}1a` }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: rec.color }}
            />
            {rec.signature}
          </span>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {rec.why}
        </p>
        <p className="mt-3 border-t border-border/50 pt-2.5 text-xs text-muted-foreground/80">
          <span className="font-medium text-foreground/80">
            Easy places to start:
          </span>{" "}
          {rec.start.join(" · ")}
        </p>
      </div>

      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        A starting point, not a law - plenty of metalheads love V-shaped sound
        and plenty of hip-hop fans prefer neutral. Signature colors match the
        chart above.
      </figcaption>
    </figure>
  );
}
