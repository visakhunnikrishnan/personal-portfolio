/*
 * Shared helpers for the frequency-response charts in the IEM guide.
 *
 * All curves are simplified, illustrative tunings (dB relative to mids),
 * not measurements of specific products. X axis is log-frequency 20 Hz–20 kHz.
 */

export const FR_MIN_HZ = 20;
export const FR_MAX_HZ = 20000;

export function freqToT(hz: number) {
  return (
    (Math.log10(hz) - Math.log10(FR_MIN_HZ)) /
    (Math.log10(FR_MAX_HZ) - Math.log10(FR_MIN_HZ))
  );
}

export function tToFreq(t: number) {
  return Math.pow(
    10,
    Math.log10(FR_MIN_HZ) + t * (Math.log10(FR_MAX_HZ) - Math.log10(FR_MIN_HZ))
  );
}

export function formatHz(hz: number) {
  if (hz >= 1000) {
    const k = hz / 1000;
    return `${k >= 10 ? Math.round(k) : Math.round(k * 10) / 10}k`;
  }
  return `${Math.round(hz)}`;
}

/*
 * Monotone cubic interpolation (Fritsch–Carlson) in log-frequency space.
 * Returns a dense sample of [t, dB] pairs (t in 0..1) for smooth paths
 * and cheap nearest-sample tooltip lookup.
 */
export function sampleCurve(
  points: [number, number][],
  n = 240
): { t: number; db: number }[] {
  const xs = points.map((p) => Math.log10(p[0]));
  const ys = points.map((p) => p[1]);
  const len = xs.length;

  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < len - 1; i++) {
    dx.push(xs[i + 1] - xs[i]);
    slope.push((ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]));
  }

  const m: number[] = [slope[0]];
  for (let i = 1; i < len - 1; i++) {
    if (slope[i - 1] * slope[i] <= 0) {
      m.push(0);
    } else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      m.push((w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]));
    }
  }
  m.push(slope[len - 2]);

  const x0 = Math.log10(FR_MIN_HZ);
  const x1 = Math.log10(FR_MAX_HZ);
  const out: { t: number; db: number }[] = [];
  let seg = 0;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    while (seg < len - 2 && x > xs[seg + 1]) seg++;
    const h = xs[seg + 1] - xs[seg];
    const s = Math.min(Math.max((x - xs[seg]) / h, 0), 1);
    const h00 = (1 + 2 * s) * (1 - s) * (1 - s);
    const h10 = s * (1 - s) * (1 - s);
    const h01 = s * s * (3 - 2 * s);
    const h11 = s * s * (s - 1);
    const db =
      h00 * ys[seg] + h10 * h * m[seg] + h01 * ys[seg + 1] + h11 * h * m[seg + 1];
    out.push({ t: (x - x0) / (x1 - x0), db });
  }
  return out;
}

/* Fixed categorical palette, validated for light + dark surfaces. */
export const FR_COLORS = {
  violet: "#8b5cf6",
  amber: "#d97706",
  cyan: "#0891b2",
  pink: "#ec4899",
  emerald: "#059669",
} as const;

export interface Signature {
  id: string;
  name: string;
  color: string;
  tagline: string;
  points: [number, number][];
}

export const SIGNATURES: Signature[] = [
  {
    id: "harman",
    name: "Harman",
    color: FR_COLORS.violet,
    tagline: "A touch of extra bass, clear vocals - what most people prefer in blind tests.",
    points: [
      [20, 8.5], [40, 8], [60, 7], [100, 5], [150, 3], [250, 1], [500, 0],
      [1000, 1], [1500, 2.5], [2000, 5], [3000, 9], [4000, 8.5], [5000, 6],
      [6000, 4.5], [8000, 3.5], [10000, 2], [13000, 0], [16000, -3], [20000, -6],
    ],
  },
  {
    id: "v-shaped",
    name: "V-shaped",
    color: FR_COLORS.amber,
    tagline: "Big bass, sparkly treble, vocals a step behind - exciting, party-friendly sound.",
    points: [
      [20, 12], [60, 11], [100, 9.5], [200, 5], [400, 0.5], [600, -1],
      [1000, -0.5], [2000, 4], [3000, 9.5], [4000, 9], [5000, 8], [6000, 7.5],
      [8000, 8], [10000, 6.5], [13000, 4], [16000, 1], [20000, -2],
    ],
  },
  {
    id: "neutral",
    name: "Neutral",
    color: FR_COLORS.cyan,
    tagline: "Bass true to the recording, nothing boosted - the studio reference sound.",
    points: [
      [20, 0.5], [60, 0.5], [100, 0], [250, 0], [500, 0], [1000, 1],
      [2000, 5], [3000, 9], [4000, 8], [6000, 5], [8000, 4], [10000, 2.5],
      [13000, 0.5], [16000, -2], [20000, -4],
    ],
  },
  {
    id: "warm",
    name: "Warm",
    color: FR_COLORS.pink,
    tagline: "Extra low-end body, relaxed treble - smooth and easy for long sessions.",
    points: [
      [20, 9], [60, 8.5], [100, 7.5], [200, 5.5], [400, 3], [700, 1],
      [1000, 0.5], [2000, 4], [3000, 7], [4000, 6], [6000, 3], [8000, 2],
      [10000, 0], [13000, -2.5], [16000, -5], [20000, -8],
    ],
  },
  {
    id: "bright",
    name: "Bright",
    color: FR_COLORS.emerald,
    tagline: "Detail and air pushed forward, lean bass - vivid, but can tire your ears.",
    points: [
      [20, 1.5], [60, 1], [100, 0.5], [300, 0], [1000, 1.5], [2000, 6],
      [3000, 10], [4000, 9.5], [5000, 8.5], [6000, 8], [8000, 9], [10000, 7.5],
      [13000, 5.5], [16000, 3], [20000, 0],
    ],
  },
];
