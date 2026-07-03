/*
 * Gear Picks – recommendation cards for IEMs
 *
 * Community-consensus, safe-to-recommend picks. Signature chip colors
 * match the sound-signature chart earlier in the post.
 */

import { FR_COLORS } from "./fr-shared";

interface Pick {
  name: string;
  price: string;
  signature: string;
  color: string;
  spec: string;
  character: string;
  pickIf: string;
}

const IEMS: Pick[] = [
  {
    name: "7Hz Salnotes Zero 2",
    price: "$25",
    signature: "Harman",
    color: FR_COLORS.violet,
    spec: "single dynamic driver",
    character:
      "The default first IEM: balanced, a little warm, nothing offensive.",
    pickIf: "you want one safe answer to “what should I buy?”",
  },
  {
    name: "Truthear Zero:RED",
    price: "$55",
    signature: "Bass-boosted Harman",
    color: FR_COLORS.amber,
    spec: "dual dynamic drivers",
    character:
      "Harman tuning with a tasteful, textured bass lift - fun without the mud.",
    pickIf: "you love hip-hop and EDM but hate boomy sound.",
  },
  {
    name: "Simgot EW300",
    price: "$70",
    signature: "Harman (tunable)",
    color: FR_COLORS.violet,
    spec: "1 dynamic + 1 planar + 1 piezo, swappable nozzles",
    character:
      "A driver-tech sampler that punches hard: planar speed, piezo sparkle, and two nozzle tunings in the box.",
    pickIf: "you like the idea of tweaking your sound without buying twice.",
  },
  {
    name: "Truthear Hexa",
    price: "$80",
    signature: "Mild neutral",
    color: FR_COLORS.cyan,
    spec: "1 dynamic + 3 balanced armatures",
    character: "Clean, even, and detailed - it plays like triple the price.",
    pickIf: "you want detail without brightness.",
  },
  {
    name: "Simgot EA500LM",
    price: "$90",
    signature: "Neutral-bright",
    color: FR_COLORS.emerald,
    spec: "single dynamic driver",
    character:
      "Energetic and vivid with excellent clarity; treble-sensitive ears, audition first.",
    pickIf: "you want rock and metal to sound alive.",
  },
  {
    name: "Etymotic ER2SE",
    price: "$100",
    signature: "Neutral",
    color: FR_COLORS.cyan,
    spec: "single dynamic driver, deep-insertion fit",
    character:
      "True studio neutral and the best isolation in the game. The deep fit is love-or-hate.",
    pickIf: "you commute or fly a lot, or want the reference sound.",
  },
  {
    name: "Moondrop Blessing 3",
    price: "$320",
    signature: "Harman",
    color: FR_COLORS.violet,
    spec: "2 dynamic + 4 balanced armatures",
    character:
      "The benchmark mid-tier hybrid: near-target tuning with real technical chops.",
    pickIf: "you want one “endgame-ish” IEM without going silly.",
  },
];

function PickCard({ p }: { p: Pick }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="text-sm font-semibold leading-snug">{p.name}</h4>
        <span className="shrink-0 text-sm font-medium text-muted-foreground tabular-nums">
          {p.price}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium"
          style={{ borderColor: p.color, backgroundColor: `${p.color}1a` }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: p.color }}
          />
          {p.signature}
        </span>
        <span className="text-[11px] text-muted-foreground/70">{p.spec}</span>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
        {p.character}
      </p>
      <p className="mt-2.5 border-t border-border/50 pt-2 text-xs text-muted-foreground/80">
        <span className="font-medium text-foreground/80">Pick it if</span>{" "}
        {p.pickIf}
      </p>
    </div>
  );
}

export function GearPicks() {
  return (
    <figure className="not-prose my-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {IEMS.map((p) => (
          <PickCard key={p.name} p={p} />
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Approximate street prices in USD. Every pick here is a community
        consensus staple - boring choices, in the best way.
      </figcaption>
    </figure>
  );
}
