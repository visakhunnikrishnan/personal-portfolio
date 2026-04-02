/*
 * Meditation Types Comparison – modern card grid
 *
 * Compares five meditation types with visual hierarchy.
 * Data from Lutz et al. (2008), Singer ReSource Project, and meta-analyses.
 */

export function MeditationTypesComparison() {
  const types = [
    {
      name: "Mindfulness (MBSR)",
      what: "Pay attention to the present moment without judgment - breath, body, sounds.",
      tags: ["Anxiety", "Depression", "Pain"],
      result: "Matched SSRIs for anxiety with 5x fewer side effects",
      color: "#8b5cf6",
      bg: "bg-violet-500/5 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-800/40",
      tagBg: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    },
    {
      name: "MBCT",
      what: "Mindfulness + cognitive therapy to catch negative thought spirals early.",
      tags: ["Depression relapse"],
      result: "Cut relapse rate from 66% to 37%",
      color: "#6366f1",
      bg: "bg-indigo-500/5 dark:bg-indigo-500/10",
      border: "border-indigo-200 dark:border-indigo-800/40",
      tagBg: "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300",
    },
    {
      name: "Loving-Kindness",
      what: "Silently repeat phrases of goodwill - first to yourself, then to others, then to everyone.",
      tags: ["Compassion", "Empathy"],
      result: "2 weeks of practice increased altruistic behavior",
      color: "#ec4899",
      bg: "bg-pink-500/5 dark:bg-pink-500/10",
      border: "border-pink-200 dark:border-pink-800/40",
      tagBg: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300",
    },
    {
      name: "Focused Attention",
      what: "Concentrate on one thing like your breath. When your mind wanders, bring it back.",
      tags: ["Concentration", "Focus"],
      result: "Activates prefrontal cortex, produces fast beta/gamma waves",
      color: "#06b6d4",
      bg: "bg-cyan-500/5 dark:bg-cyan-500/10",
      border: "border-cyan-200 dark:border-cyan-800/40",
      tagBg: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300",
    },
    {
      name: "Open Monitoring",
      what: "Stay broadly aware of everything happening without fixating on anything specific.",
      tags: ["Creativity", "Awareness"],
      result: "Enhanced divergent thinking and original idea generation",
      color: "#10b981",
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-800/40",
      tagBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    },
  ];

  return (
    <figure className="not-prose my-10">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {types.map((t, i) => (
          <div
            key={t.name}
            className={`relative rounded-xl border p-5 ${t.bg} ${t.border} ${
              i === types.length - 1 && types.length % 2 !== 0
                ? "sm:col-span-2 sm:max-w-[calc(50%-6px)]"
                : ""
            }`}
          >
            {/* Name */}
            <h4
              className="text-base font-semibold"
              style={{ color: t.color }}
            >
              {t.name}
            </h4>

            {/* Description */}
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {t.what}
            </p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${t.tagBg}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key finding */}
            <p className="mt-3 border-t border-border/50 pt-2.5 text-xs text-muted-foreground/70">
              {t.result}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Five approaches, different effects. The ReSource Project (332
        participants, 9 months) confirmed each type changes the brain
        differently.
      </figcaption>
    </figure>
  );
}
