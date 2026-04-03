/*
 * Enterprise Adoption Scoreboard – center-line alternating timeline with logos
 *
 * Straight vertical line with dots. Date and content alternate sides.
 * Company logos as PNG images. Clean chapter-style layout.
 */

const LOGO_BASE = "/blog/ai-native-software-engineering/logos";

const companies = [
  {
    date: "2024",
    name: "GitHub Copilot",
    metric: "20M users",
    lines: [
      "4.7M paid subscribers, 75% YoY growth.",
      "Deployed at 90% of Fortune 100 companies.",
      "Auto-reviewed 8M+ pull requests by Apr 2025.",
    ],
    logo: `${LOGO_BASE}/github.png`,
  },
  {
    date: "2025",
    name: "Amazon",
    metric: "$260M/yr saved",
    lines: [
      "Q Developer migrated 30,000 Java apps internally.",
      "79% of auto-generated code shipped unchanged.",
      "Largest enterprise AI migration to date.",
    ],
    logo: `${LOGO_BASE}/amazon.png`,
  },
  {
    date: "2025-26",
    name: "Google",
    metric: "~50% AI-generated",
    lines: [
      "Rose from 25% (Q3 2024) to 50% in 18 months.",
      "All AI code reviewed and accepted by humans.",
      "Autorater evaluation loops woven into pipelines.",
    ],
    logo: `${LOGO_BASE}/google.png`,
  },
  {
    date: "Q1 2026",
    name: "DoorDash",
    metric: "90%+ daily usage",
    lines: [
      "AI tools used by engineers every working day.",
      "Integrated across frontend, backend, and mobile.",
    ],
    logo: `${LOGO_BASE}/doordash.png`,
  },
  {
    date: "Q1 2026",
    name: "Airbnb",
    metric: "80%+ engineers",
    lines: [
      "Majority of engineering org uses AI tools daily.",
      "Focus on search, listings, and payments teams.",
    ],
    logo: `${LOGO_BASE}/airbnb.png`,
  },
  {
    date: "Feb 2026",
    name: "Stripe",
    metric: "1,300+ AI PRs/week",
    lines: [
      "Minions: production-grade autonomous agents.",
      "Blueprint architecture: deterministic + agentic nodes.",
      "70% of AI PRs merge without modification.",
      "Hard cap: max 2 CI rounds per agent task.",
    ],
    logo: `${LOGO_BASE}/stripe.png`,
  },
  {
    date: "Q1 2026",
    name: "Meta",
    metric: "30% output increase",
    lines: [
      "Per-engineer productivity boost reported.",
      "AI coding integrated across all product teams.",
    ],
    logo: `${LOGO_BASE}/meta.png`,
  },
  {
    date: "Q1 2026",
    name: "HubSpot",
    metric: "97% AI-assisted",
    lines: [
      "Nearly every commit involves AI tooling.",
      "Highest reported AI adoption rate in industry.",
    ],
    logo: `${LOGO_BASE}/hubspot.png`,
  },
  {
    date: "Q1 2026",
    name: "Grab",
    metric: "98%+ engineers",
    lines: [
      "Virtually all engineers use AI coding tools daily.",
      "Southeast Asia's largest tech company by AI adoption.",
    ],
    logo: `${LOGO_BASE}/grab.png`,
  },
];

export function EnterpriseAdoptionScoreboard() {
  return (
    <figure className="not-prose my-10">
      <div className="relative mx-auto max-w-xl">
        {/* Center vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-violet-200 dark:bg-violet-900/40" />

        {/* Items */}
        <div className="space-y-4 py-4">
          {companies.map((c, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={i} className="relative flex items-start">
                {/* Left side */}
                <div className="w-[calc(50%-12px)] pr-3">
                  {isLeft ? (
                    <p className="text-right text-sm font-bold text-violet-600 dark:text-violet-400">
                      {c.date}
                    </p>
                  ) : (
                    <div className="flex flex-col items-end">
                      <div className="w-full text-left">
                        <div className="mb-1 flex items-center gap-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.logo}
                            alt={c.name}
                            className="h-6 w-6 rounded object-contain"
                          />
                          <span className="text-sm font-bold text-foreground">
                            {c.name}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-foreground">
                          {c.metric}
                        </p>
                        {c.lines.map((line, li) => (
                          <p
                            key={li}
                            className="text-[11px] leading-relaxed text-muted-foreground"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="relative z-10 flex w-6 shrink-0 items-start justify-center pt-1">
                  <div className="h-3 w-3 rounded-full border-2 border-violet-500 bg-white dark:bg-neutral-950" />
                </div>

                {/* Right side */}
                <div className="w-[calc(50%-12px)] pl-3">
                  {isLeft ? (
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.logo}
                          alt={c.name}
                          className="h-6 w-6 rounded object-contain"
                        />
                        <span className="text-sm font-bold text-foreground">
                          {c.name}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground">
                        {c.metric}
                      </p>
                      {c.lines.map((line, li) => (
                        <p
                          key={li}
                          className="text-[11px] leading-relaxed text-muted-foreground"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
                      {c.date}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom arrow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="h-0 w-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-violet-300 dark:border-t-violet-800" />
        </div>
      </div>

      <figcaption className="mt-4 text-center text-sm text-muted-foreground">
        The adoption wave, company by company. But Port.io found that across
        63 earnings calls,{" "}
        <strong>zero</strong> connected AI metrics to actual engineering
        outcomes.
      </figcaption>
    </figure>
  );
}
