/*
 * Driver Types – compact card grid with schematic cross-sections
 *
 * The four driver technologies you will see on spec sheets, with what
 * each is actually good at and the honest tradeoff. The diagrams are
 * original illustrations (no stock licensing) drawn in each card's
 * accent color.
 */

function DynamicDiagram({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 220 100"
      className="h-24 w-full"
      role="img"
      aria-label="Cross-section of a dynamic driver: magnet and voice coil at the back driving a cone-shaped diaphragm"
    >
      {/* magnet stack */}
      <rect x="24" y="30" width="14" height="40" rx="2" className="fill-muted-foreground/25" />
      <rect x="38" y="38" width="8" height="24" rx="1.5" className="fill-muted-foreground/40" />
      {/* voice coil */}
      <rect x="48" y="41" width="10" height="18" rx="1.5" fill={color} fillOpacity="0.25" />
      {[44, 48, 52, 56].map((y) => (
        <line key={y} x1="49" y1={y} x2="57" y2={y} stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
      ))}
      {/* cone */}
      <path
        d="M58,50 L128,16 L128,84 Z"
        fill={color}
        fillOpacity="0.12"
      />
      <path d="M58,50 L128,16 M58,50 L128,84" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* dust cap */}
      <path d="M128,16 Q140,50 128,84" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* sound waves */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${150 + i * 16},${38 - i * 4} Q${162 + i * 16},50 ${150 + i * 16},${62 + i * 4}`}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="text-muted-foreground/50"
        />
      ))}
      <text x="31" y="88" textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/70">
        magnet
      </text>
      <text x="112" y="10" textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/70">
        cone
      </text>
    </svg>
  );
}

function ArmatureDiagram({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 220 100"
      className="h-24 w-full"
      role="img"
      aria-label="Cross-section of a balanced armature driver: a reed inside a coil between two magnets, pushing a diaphragm through a drive pin"
    >
      {/* housing */}
      <rect x="34" y="22" width="130" height="60" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/40" />
      {/* diaphragm */}
      <line x1="42" y1="34" x2="156" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* magnets */}
      <rect x="104" y="44" width="26" height="9" rx="1.5" className="fill-muted-foreground/35" />
      <rect x="104" y="63" width="26" height="9" rx="1.5" className="fill-muted-foreground/35" />
      {/* coil around the reed */}
      <rect x="58" y="50" width="30" height="16" rx="2" fill={color} fillOpacity="0.22" />
      {[64, 70, 76, 82].map((x) => (
        <line key={x} x1={x} y1="51" x2={x} y2="65" stroke={color} strokeWidth="1.2" strokeOpacity="0.8" />
      ))}
      {/* armature reed */}
      <line x1="44" y1="58" x2="140" y2="58" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* drive pin */}
      <line x1="140" y1="58" x2="140" y2="34" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      {/* sound outlet */}
      <path d="M164,30 h14" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/40" />
      {[0, 1].map((i) => (
        <path
          key={i}
          d={`M${184 + i * 12},${24 - i * 3} Q${192 + i * 12},32 ${184 + i * 12},${40 + i * 3}`}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="text-muted-foreground/50"
        />
      ))}
      <text x="92" y="94" textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/70">
        reed in a coil, pin pushes the diaphragm
      </text>
    </svg>
  );
}

function PlanarDiagram({ color }: { color: string }) {
  const magnets = [40, 70, 100, 130, 160];
  return (
    <svg
      viewBox="0 0 220 100"
      className="h-24 w-full"
      role="img"
      aria-label="Cross-section of a planar magnetic driver: a thin film with a printed circuit suspended between two rows of bar magnets"
    >
      {/* magnet rows */}
      {magnets.map((x) => (
        <rect key={`t${x}`} x={x} y="22" width="20" height="12" rx="2" className="fill-muted-foreground/35" />
      ))}
      {magnets.map((x) => (
        <rect key={`b${x}`} x={x} y="66" width="20" height="12" rx="2" className="fill-muted-foreground/35" />
      ))}
      {/* film */}
      <line x1="34" y1="50" x2="186" y2="50" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      {/* printed trace ticks */}
      {[52, 68, 84, 100, 116, 132, 148, 164].map((x) => (
        <line key={x} x1={x} y1="46" x2={x} y2="54" stroke={color} strokeWidth="1.4" strokeOpacity="0.75" />
      ))}
      <text x="110" y="12" textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/70">
        magnet array
      </text>
      <text x="110" y="94" textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/70">
        whole film moves at once
      </text>
    </svg>
  );
}

function HybridDiagram({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 220 100"
      className="h-24 w-full"
      role="img"
      aria-label="Inside a hybrid IEM shell: a dynamic driver for bass plus balanced armatures near the nozzle"
    >
      {/* shell */}
      <path
        d="M36,50 C36,26 62,14 96,16 C130,18 150,28 160,40 L188,44 C192,45 192,55 188,56 L160,60 C150,74 128,86 94,84 C60,82 36,74 36,50 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-muted-foreground/40"
      />
      {/* dynamic driver (bass) */}
      <circle cx="78" cy="50" r="20" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2" />
      <circle cx="78" cy="50" r="9" fill={color} fillOpacity="0.3" />
      {/* balanced armatures (mids/treble) */}
      <rect x="116" y="34" width="24" height="11" rx="2.5" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />
      <rect x="122" y="54" width="24" height="11" rx="2.5" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.4" />
      {/* sound paths to nozzle */}
      <path d="M140,40 C152,42 158,46 166,49 M146,60 C156,57 160,53 166,51" stroke="currentColor" strokeWidth="1.2" fill="none" className="text-muted-foreground/40" />
      <text x="78" y="86" textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/70">
        DD bass
      </text>
      <text x="130" y="26" textAnchor="middle" fontSize="7.5" className="fill-muted-foreground/70">
        BAs
      </text>
    </svg>
  );
}

export function DriverTypes() {
  const types = [
    {
      name: "Dynamic (DD)",
      what: "A tiny speaker cone, moved by a magnet. The oldest and most common design.",
      good: "Natural, textured bass and a cohesive, single-voice sound.",
      tradeoff: "Budget kings are single DDs - do not let anyone tell you one driver is not enough.",
      color: "#8b5cf6",
      bg: "bg-violet-500/5 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-800/40",
      Diagram: DynamicDiagram,
    },
    {
      name: "Balanced armature (BA)",
      what: "A miniature vibrating reed, originally from hearing aids. Usually several per side.",
      good: "Fast, detailed mids and treble in a tiny package.",
      tradeoff: "Bass can feel dry and polite; cheap BAs can sound slightly metallic.",
      color: "#0891b2",
      bg: "bg-cyan-500/5 dark:bg-cyan-500/10",
      border: "border-cyan-200 dark:border-cyan-800/40",
      Diagram: ArmatureDiagram,
    },
    {
      name: "Planar magnetic",
      what: "A whisper-thin film driven evenly across its whole surface.",
      good: "Speed and composure - complex, busy tracks stay sorted out.",
      tradeoff: "Often wants more power than a phone jack happily provides.",
      color: "#059669",
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-800/40",
      Diagram: PlanarDiagram,
    },
    {
      name: "Hybrid",
      what: "A dynamic driver for bass plus BAs (or planar/electrostatic tweeters) for the rest.",
      good: "Best of both worlds when the crossover is tuned well.",
      tradeoff: "Coherence lives or dies on tuning, and prices climb fast.",
      color: "#d97706",
      bg: "bg-amber-500/5 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-800/40",
      Diagram: HybridDiagram,
    },
  ];

  return (
    <figure className="not-prose my-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {types.map((t) => (
          <div
            key={t.name}
            className={`rounded-xl border p-5 ${t.bg} ${t.border}`}
          >
            <h4 className="text-base font-semibold" style={{ color: t.color }}>
              {t.name}
            </h4>
            <div className="mt-2 rounded-lg bg-background/40 py-1">
              <t.Diagram color={t.color} />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t.what}
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              <span className="font-medium">Good at:</span>{" "}
              <span className="text-muted-foreground">{t.good}</span>
            </p>
            <p className="mt-3 border-t border-border/50 pt-2.5 text-xs text-muted-foreground/70">
              {t.tradeoff}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Simplified cross-sections, not to scale. Driver type is a hint, not a
        verdict - marketing loves &ldquo;1DD + 6BA&rdquo;; your ears love a
        good frequency response.
      </figcaption>
    </figure>
  );
}
