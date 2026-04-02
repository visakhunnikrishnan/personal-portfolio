/*
 * AGI Levels Comparison – card grid
 *
 * Side-by-side comparison of how major AI labs define AGI levels.
 * Data from Morris et al. (2024), OpenAI (2024), and Amodei (2024).
 */

export function AgiLevelsComparison() {
  const frameworks = [
    {
      org: "Google DeepMind",
      color: "#8b5cf6",
      border: "border-violet-200 dark:border-violet-800/40",
      bg: "bg-violet-500/5 dark:bg-violet-500/10",
      tagBg:
        "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
      levels: [
        "Emerging - equal to unskilled human",
        "Competent - 50th percentile adult",
        "Expert - 90th percentile",
        "Virtuoso - 99th percentile",
        "Superhuman - exceeds all humans",
      ],
      note: "Crosses performance depth with breadth (narrow vs general)",
      source: "Morris et al., 2024",
    },
    {
      org: "OpenAI",
      color: "#10b981",
      border: "border-emerald-200 dark:border-emerald-800/40",
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
      tagBg:
        "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
      levels: [
        "L1 Chatbots - conversational AI",
        "L2 Reasoners - PhD-level problem solving",
        "L3 Agents - act autonomously for days",
        "L4 Innovators - advance scientific research",
        "L5 Organizations - do the work of a company",
      ],
      note: "Defined as 'outperforming humans at most economically valuable work'",
      source: "OpenAI, July 2024",
    },
    {
      org: "Anthropic",
      color: "#f59e0b",
      border: "border-amber-200 dark:border-amber-800/40",
      bg: "bg-amber-500/5 dark:bg-amber-500/10",
      tagBg:
        "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
      levels: [
        "Avoids the term 'AGI' entirely",
        "Describes 'powerful AI' instead",
        "Intelligence surpassing Nobel laureates",
        "Compressing 100 years of progress into 5-10",
      ],
      note: "Focuses on safety thresholds (ASL framework) rather than capability milestones",
      source: "Amodei, October 2024",
    },
  ];

  return (
    <figure className="not-prose my-10">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {frameworks.map((f) => (
          <div
            key={f.org}
            className={`relative rounded-xl border p-5 ${f.bg} ${f.border}`}
          >
            {/* Org name */}
            <h4
              className="text-sm font-bold"
              style={{ color: f.color }}
            >
              {f.org}
            </h4>

            {/* Levels */}
            <ul className="mt-3 space-y-1.5">
              {f.levels.map((level, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${f.tagBg}`}
                  >
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{level}</span>
                </li>
              ))}
            </ul>

            {/* Note */}
            <p className="mt-3 border-t border-border/50 pt-2.5 text-[11px] text-muted-foreground/60 italic">
              {f.note}
            </p>

            {/* Source */}
            <p className="mt-1 text-[10px] text-muted-foreground/40">
              {f.source}
            </p>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Three labs, three different ways of thinking about AGI. The lack
        of consensus matters - it shapes what gets built and how we regulate
        it.
      </figcaption>
    </figure>
  );
}
