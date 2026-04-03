/*
 * AI-Native Principles – 2x3 card grid + anti-patterns
 *
 * Six principles + four anti-patterns from cross-firm analysis.
 * Synthesized from Stripe, Anthropic, Google, OpenAI, Shopify, GitHub.
 */

export function AiNativePrinciples() {
  const principles = [
    {
      title: "The system runs the model",
      desc: "Agents fail when given unlimited autonomy. Every successful deployment constrains the LLM inside a fixed orchestration shell: blueprints (Stripe), AGENTS.md (OpenAI/GitHub), plan mode (Anthropic), autorater loops (Google). The walls matter more than the model.",
      who: "Stripe, Anthropic, GitHub, Google",
      color: "#8b5cf6",
      bg: "bg-violet-500/5 dark:bg-violet-500/10",
      border: "border-violet-200 dark:border-violet-800/40",
      tagBg: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
    },
    {
      title: "Good human infra = good agent infra",
      desc: "Stripe didn't build agent-specific infrastructure. The devboxes, linters, and CI were built for humans. Agents walked in and benefited automatically. Investment in developer experience is also investment in agent capability - not separate work streams.",
      who: "Stripe, Anthropic (git worktrees), OpenAI",
      color: "#06b6d4",
      bg: "bg-cyan-500/5 dark:bg-cyan-500/10",
      border: "border-cyan-200 dark:border-cyan-800/40",
      tagBg: "bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300",
    },
    {
      title: "Context engineering, not prompt engineering",
      desc: "Every firm has converged on curating what the agent sees rather than how you ask it. Toolshed tool subsets (Stripe), AGENTS.md / CLAUDE.md hierarchy (Anthropic/OpenAI), Just-in-Time instructions (Shopify), repo vector index (GitHub).",
      who: "All firms, Dropbox, Manus",
      color: "#10b981",
      bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-800/40",
      tagBg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    },
    {
      title: "Human gate is load-bearing",
      desc: "No firm has removed human review. Stripe: \"The mandatory reviewer is doing more work than the model.\" GitHub: author retains control. Anthropic: humans own taste decisions. OpenAI: tiered review. The gate is not a bottleneck to optimise away - it's architecture.",
      who: "All firms - universally",
      color: "#f59e0b",
      bg: "bg-amber-500/5 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-800/40",
      tagBg: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    },
    {
      title: "Parallelism beats iteration",
      desc: "The gain comes from running 3-10 agents simultaneously, not from making one agent smarter. Stripe fires 5 Slack tasks before coffee. Shopify runs 10 parallel agents. OpenAI uses best-of-N selection. Anthropic runs 2-4 git worktrees. Batch dispatch, not interactive refinement.",
      who: "Stripe, Shopify, Anthropic, OpenAI",
      color: "#ec4899",
      bg: "bg-pink-500/5 dark:bg-pink-500/10",
      border: "border-pink-200 dark:border-pink-800/40",
      tagBg: "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300",
    },
    {
      title: "Evaluation is architecture (not measurement)",
      desc: "Google's defining 2025 lesson: evaluation woven into the pipeline as an active component. LLM-as-judge autoraters don't just measure - they provide feedback that agents act on in the same loop. Eval adoption is at 52% and rising.",
      who: "Google, Anthropic, LangChain survey",
      color: "#ef4444",
      bg: "bg-red-500/5 dark:bg-red-500/10",
      border: "border-red-200 dark:border-red-800/40",
      tagBg: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
    },
  ];

  const antiPatterns = [
    {
      title: "Giving agents unlimited tool access",
      desc: "Shopify hit the \"tool complexity problem\" at 50+ tools. Stripe curates a per-task subset. GitHub cut from 40+ to 13 core tools using embedding-guided selection. Flooding context degrades quality and inflates cost.",
    },
    {
      title: "Uncapped retry loops",
      desc: "Stripe's hard limit: 2 CI rounds. OpenAI: test feedback is bounded. \"LLMs show diminishing returns retrying the same problem.\" Unlimited loops compound errors, inflate costs, and mask the real failure signal.",
    },
    {
      title: "Agent infra separated from developer infra",
      desc: "If agents run in different environments from humans - different CI, linters, test suites - you build a two-track system that diverges over time. Stripe's insight: one environment for both.",
    },
    {
      title: "Measuring code volume without outcomes",
      desc: "Port.io found 63 earnings calls with AI code metrics but zero tied to deployment frequency or MTTR. Google DORA: AI is an amplifier, not an outcome. Track the four DORA metrics, not just PRs/week.",
    },
  ];

  return (
    <figure className="not-prose my-10">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
        Cross-firm principles - what every top engineering team agrees on
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {principles.map((p, i) => (
          <div
            key={i}
            className={`relative rounded-xl border p-5 ${p.bg} ${p.border}`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${p.tagBg}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4
                className="text-sm font-semibold"
                style={{ color: p.color }}
              >
                {p.title}
              </h4>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {p.desc}
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground/50 italic">
              {p.who}
            </p>
          </div>
        ))}
      </div>

      {/* Anti-patterns */}
      <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-wider text-red-500/60">
        Anti-patterns these firms actively avoid
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {antiPatterns.map((ap, i) => (
          <div
            key={i}
            className="rounded-xl border border-red-200 bg-red-500/5 p-4 dark:border-red-800/30 dark:bg-red-500/10"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-bold text-red-600 dark:bg-red-900/40 dark:text-red-400">
                &times;
              </span>
              <h4 className="text-sm font-semibold text-red-600 dark:text-red-400">
                {ap.title}
              </h4>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {ap.desc}
            </p>
          </div>
        ))}
      </div>

      <figcaption className="mt-3 text-center text-sm text-muted-foreground">
        Six principles and four anti-patterns that emerged independently
        across every firm studied.
      </figcaption>
    </figure>
  );
}
