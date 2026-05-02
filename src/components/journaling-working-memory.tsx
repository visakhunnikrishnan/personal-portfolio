/*
 * Working Memory Capacity – chunk visualization
 *
 * Compares Miller (1956) "magical number seven" with Cowan (2001)
 * revised estimate of ~4 items in the focus of attention.
 */

const W = 640;
const H = 280;
const CHUNK_SIZE = 36;
const CHUNK_GAP = 10;

const MILLER_COLOR = "#94a3b8";
const COWAN_COLOR = "#8b5cf6";

const ROW_Y_MILLER = 90;
const ROW_Y_COWAN = 200;

function chunks(count: number, color: string, rowY: number, faded?: boolean) {
  const totalW = count * CHUNK_SIZE + (count - 1) * CHUNK_GAP;
  const startX = (W - totalW) / 2;
  return Array.from({ length: count }).map((_, i) => (
    <rect
      key={i}
      x={startX + i * (CHUNK_SIZE + CHUNK_GAP)}
      y={rowY - CHUNK_SIZE / 2}
      width={CHUNK_SIZE}
      height={CHUNK_SIZE}
      rx={6}
      fill={color}
      fillOpacity={faded ? 0.18 : 0.7}
      stroke={color}
      strokeWidth={faded ? 1 : 0}
      strokeDasharray={faded ? "3 3" : undefined}
    />
  ));
}

export function JournalingWorkingMemory() {
  return (
    <figure className="not-prose my-10">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Two rows of chunks showing Miller's seven and Cowan's four item working memory capacity"
      >
        {/* Miller row */}
        <text
          x={W / 2}
          y={48}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          className="fill-foreground"
        >
          Miller (1956): about seven chunks
        </text>
        <text
          x={W / 2}
          y={62}
          textAnchor="middle"
          fontSize="10"
          className="fill-muted-foreground/70"
        >
          original estimate, with rehearsal and chunking allowed
        </text>
        {chunks(5, MILLER_COLOR, ROW_Y_MILLER)}
        {/* faded edges to indicate plus-or-minus two */}
        {(() => {
          const totalW = 5 * CHUNK_SIZE + 4 * CHUNK_GAP;
          const startX = (W - totalW) / 2;
          return (
            <>
              <rect
                x={startX - 2 * (CHUNK_SIZE + CHUNK_GAP)}
                y={ROW_Y_MILLER - CHUNK_SIZE / 2}
                width={CHUNK_SIZE}
                height={CHUNK_SIZE}
                rx={6}
                fill={MILLER_COLOR}
                fillOpacity={0.18}
                stroke={MILLER_COLOR}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <rect
                x={startX - (CHUNK_SIZE + CHUNK_GAP)}
                y={ROW_Y_MILLER - CHUNK_SIZE / 2}
                width={CHUNK_SIZE}
                height={CHUNK_SIZE}
                rx={6}
                fill={MILLER_COLOR}
                fillOpacity={0.18}
                stroke={MILLER_COLOR}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <rect
                x={startX + 5 * (CHUNK_SIZE + CHUNK_GAP)}
                y={ROW_Y_MILLER - CHUNK_SIZE / 2}
                width={CHUNK_SIZE}
                height={CHUNK_SIZE}
                rx={6}
                fill={MILLER_COLOR}
                fillOpacity={0.18}
                stroke={MILLER_COLOR}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <rect
                x={startX + 6 * (CHUNK_SIZE + CHUNK_GAP)}
                y={ROW_Y_MILLER - CHUNK_SIZE / 2}
                width={CHUNK_SIZE}
                height={CHUNK_SIZE}
                rx={6}
                fill={MILLER_COLOR}
                fillOpacity={0.18}
                stroke={MILLER_COLOR}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text
                x={W / 2}
                y={ROW_Y_MILLER + 50}
                textAnchor="middle"
                fontSize="10"
                fontStyle="italic"
                className="fill-muted-foreground/60"
              >
                7 ± 2
              </text>
            </>
          );
        })()}

        {/* Cowan row */}
        <text
          x={W / 2}
          y={158}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill={COWAN_COLOR}
        >
          Cowan (2001): closer to four
        </text>
        <text
          x={W / 2}
          y={172}
          textAnchor="middle"
          fontSize="10"
          className="fill-muted-foreground/70"
        >
          when rehearsal and chunking tricks are blocked
        </text>
        {chunks(4, COWAN_COLOR, ROW_Y_COWAN)}
        <text
          x={W / 2}
          y={ROW_Y_COWAN + 50}
          textAnchor="middle"
          fontSize="10"
          fontStyle="italic"
          fill={COWAN_COLOR}
          opacity={0.7}
        >
          the small workbench
        </text>
      </svg>
      <figcaption className="mt-2 text-center text-sm text-muted-foreground">
        How much your conscious mind actually holds. A worry circling that
        workbench occupies a slot.
      </figcaption>
    </figure>
  );
}
