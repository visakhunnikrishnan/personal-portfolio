import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/boy-saving-coin-piggy-bank.png";
import img0 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/future-value-formulas-handwritten-notes.jpg";
import img1 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/monte-carlo-simulation-25-years.png";
import img2 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/portfolio-value-simulation-20-years.png";
import img3 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/sharpe-ratio-formula-explained.jpg";
import img4 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/portfolio-return-weighted-average-formula.jpg";
import img5 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/portfolio-volatility-covariance-matrix.jpg";
import img6 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/portfolio-variance-derivation-matrix.jpg";
import img7 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/covariance-portfolio-worked-example.jpg";
import img8 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/maximum-sharpe-ratio-optimization.jpg";
import img9 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/efficient-frontier-sharpe-ratio-heatmap.png";
import img10 from "../../../../public/blog/a-quantitative-approach-to-personalized-investment-planning/portfolio-rebalancing-comparison-chart.png";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "A Quantitative Approach to Personalized Investment Planning",
  description:
    "Using compound interest, Monte Carlo simulations, Modern Portfolio Theory, and rebalancing strategies to build a data-driven investment plan.",
  keywords: ["investment planning", "compound interest", "Monte Carlo simulation", "Modern Portfolio Theory", "portfolio rebalancing", "financial goals", "time value of money", "asset allocation", "risk management"],
  openGraph: {
    title: "A Quantitative Approach to Personalized Investment Planning",
    description:
      "Using compound interest, Monte Carlo simulations, Modern Portfolio Theory, and rebalancing strategies to build a data-driven investment plan.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Quantitative Approach to Personalized Investment Planning",
    description: "Using compound interest, Monte Carlo simulations, Modern Portfolio Theory, and rebalancing strategies to build a data-driven investment plan.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          A Quantitative Approach to Personalized Investment Planning
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2025-01-29">Jan 29, 2025</time>
          <span aria-hidden="true">&middot;</span>
          <span>20 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="A Quantitative Approach to Personalized Investment Planning"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Most investment advice boils down to vague principles:
          &quot;diversify,&quot; &quot;think long-term,&quot; &quot;don&apos;t
          panic.&quot; That&apos;s fine as far as it goes, but it doesn&apos;t
          help you answer the questions that actually matter: How much do I
          need to save each month to retire comfortably? What mix of assets
          gives me the best return for the risk I&apos;m willing to take? How
          likely am I to actually reach my financial goals?
        </p>
        <p className="italic text-muted-foreground">
          These are quantitative questions, and they deserve quantitative
          answers. In this post, I walk through the mathematical frameworks
          behind investment planning - from compound interest and Monte Carlo
          simulations to Modern Portfolio Theory and rebalancing. The examples
          use Indian Rupees, but the concepts apply universally. The goal is
          to give you the tools to make investment decisions based on data and
          math, not gut feeling.
        </p>

        <blockquote>
          <p>
            <strong>Disclaimer:</strong> I am not a SEBI-registered investment
            advisor, and nothing in this post constitutes personal financial
            advice. What I&apos;m sharing here are the quantitative techniques I
            use for my own investment planning. Treat this as learning material,
            not a recommendation - always do your own research or consult a
            qualified advisor before making financial decisions.
          </p>
        </blockquote>

        <hr />

        <h2>The Power of Compound Interest</h2>
        <p>
          Everything in investment planning starts with one idea: money
          grows over time. A rupee invested today is worth more than a rupee
          invested next year, because this year&apos;s returns generate their
          own returns next year. This is compound interest, and understanding
          the math behind it is the foundation for everything that follows.
        </p>
        <p>
          The future value of an investment has two components. The first is
          the growth of money you already have (a lump sum). The second is
          the growth of money you add regularly over time (a series of
          contributions). The formulas are shown below.
        </p>

        <Image
          src={img0}
          alt="Future Value formulas: lump sum FV = PV × (1+r)^n and series of investments (annuity) formula with derivation"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h3>A Retirement Example</h3>
        <p>
          Say you&apos;re planning for retirement 25 years from now. You
          currently have ₹500,000 in savings, and you plan to contribute
          ₹10,000 per month. Assuming an average annual return of 7% (a
          realistic figure for a diversified portfolio in India), what will
          your retirement fund look like?
        </p>
        <ul>
          <li>
            The future value of your current ₹500,000, compounded annually at
            7% over 25 years: approximately <strong>₹27,13,716</strong>.
          </li>
          <li>
            The future value of your monthly contributions of ₹10,000 at the
            same rate over 25 years: approximately{" "}
            <strong>₹81,00,717</strong>.
          </li>
          <li>
            Combined, your retirement fund would be approximately{" "}
            <strong>₹1,08,14,433</strong> (₹1.08 crore).
          </li>
        </ul>
        <p>
          This illustrates something important: the monthly contributions
          account for roughly 75% of the final value, even though the lump
          sum had a 25-year head start. Regular, disciplined investing
          matters more than the size of your starting amount.
        </p>

        <h3>Lump Sum vs. Regular Contributions</h3>
        <p>
          In practice, you should use a combination of both. A lump sum
          investment generally performs better in markets that trend upward
          over the long term, because the entire amount has more time to
          compound. But regular contributions (SIP - Systematic Investment
          Plan) provide a benefit called dollar-cost averaging: when markets
          dip, your fixed contribution buys more units at lower prices, which
          can smooth out volatility over time.
        </p>

        <hr />

        <h2>Modeling Uncertainty: Monte Carlo Simulations</h2>
        <p>
          The retirement example above assumes a constant 7% return every
          year. But real markets don&apos;t work that way. Some years you get
          15%, other years you lose 8%. The question isn&apos;t just
          &quot;what&apos;s the expected outcome?&quot; - it&apos;s
          &quot;what&apos;s the range of possible outcomes, and how likely am
          I to reach my goal?&quot;
        </p>
        <p>
          This is where Monte Carlo simulations come in. The idea is simple:
          instead of assuming one fixed rate of return, you simulate thousands
          of possible scenarios, each with randomly sampled returns drawn from
          a probability distribution based on historical data. Each simulation
          gives you one possible path your investment could take. Run 1,000
          of them, and you get a picture of the full range of outcomes -
          from best case to worst case and everything in between.
        </p>

        <h3>How It Works</h3>
        <ol>
          <li>
            <strong>Define the distribution.</strong> Based on historical data,
            set the expected return (mean) and volatility (standard deviation)
            for each year. For our example: 7% mean, 3% standard deviation.
          </li>
          <li>
            <strong>Sample randomly.</strong> For each year of the investment
            horizon, draw a random return from that distribution.
          </li>
          <li>
            <strong>Compute the path.</strong> Apply each year&apos;s sampled
            return to the portfolio, adding the annual contribution.
          </li>
          <li>
            <strong>Repeat.</strong> Do this 1,000 times to generate 1,000
            different possible outcomes.
          </li>
          <li>
            <strong>Analyze.</strong> Look at the distribution of final values
            to understand the probability of reaching your target.
          </li>
        </ol>

        <h3>The Simulation</h3>
        <p>
          Using the same parameters as our retirement example (₹500,000
          initial investment, ₹120,000 annual contribution, 25-year horizon,
          7% expected return, 3% standard deviation), here are 1,000
          simulated paths:
        </p>

        <Image
          src={img1}
          alt="Monte Carlo Simulation of Investment Growth Over 25 Years - 1,000 scenarios shown as blue lines with red average outcome line"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          Each blue line is one possible future. The red line is the average
          across all 1,000 simulations. Notice the fan shape - the
          uncertainty grows with time. In the early years, the paths are
          tightly clustered. By year 25, the spread between the best and
          worst outcomes is enormous.
        </p>
        <p>
          This is the real value of Monte Carlo simulations: they turn a
          single number (&quot;you&apos;ll have ₹1.08 crore&quot;) into a
          range of probabilities. You can ask: &quot;What&apos;s the
          probability I&apos;ll have at least ₹80 lakhs?&quot; or
          &quot;What&apos;s the worst case in the bottom 10% of
          scenarios?&quot; That&apos;s much more useful for actual planning
          than a single point estimate.
        </p>

        <hr />

        <h2>Understanding Your Risk Profile</h2>
        <p>
          Before deciding how to invest, you need to understand how much risk
          you&apos;re comfortable with. Risk tolerance isn&apos;t just about
          how much volatility you can handle emotionally - it depends on your
          goals, your timeline, your income needs, and your experience.
        </p>

        <h3>Risk Assessment</h3>
        <p>
          A simple risk questionnaire scores you on five dimensions. For each,
          choose the option that best matches your situation:
        </p>
        <ol>
          <li>
            <strong>Investment Goal and Time Horizon</strong>
            <br />A. Capital preservation, under 2 years (Score: 1)
            <br />B. Moderate growth, 3-5 years (Score: 2)
            <br />C. Growth-focused, 6+ years (Score: 3)
          </li>
          <li>
            <strong>Experience with Investments</strong>
            <br />A. None (Score: 1)
            <br />B. Limited - mostly fixed deposits, bonds (Score: 2)
            <br />C. Experienced - stocks, mutual funds, other securities
            (Score: 3)
          </li>
          <li>
            <strong>Reaction to Market Downturns</strong>
            <br />A. Sell to minimize losses (Score: 1)
            <br />B. Hold and wait for recovery (Score: 2)
            <br />C. See it as a buying opportunity (Score: 3)
          </li>
          <li>
            <strong>Expected Rate of Return</strong>
            <br />A. Up to 5% per annum, very low risk (Score: 1)
            <br />B. 5-10% per annum, moderate risk (Score: 2)
            <br />C. 10%+ per annum, willing to accept high volatility
            (Score: 3)
          </li>
          <li>
            <strong>Income Requirement</strong>
            <br />A. Need current income from investments (Score: 1)
            <br />B. Some income preferred, but not essential (Score: 2)
            <br />C. No income needed - prefer reinvesting for growth
            (Score: 3)
          </li>
        </ol>
        <p>
          <strong>Scoring:</strong>
        </p>
        <ul>
          <li>
            <strong>5-8 points: Low risk tolerance.</strong> Conservative
            investments - fixed deposits, bonds, stable value funds.
          </li>
          <li>
            <strong>9-12 points: Moderate risk tolerance.</strong> Balanced
            mix - hybrid funds, mix of equities and fixed income.
          </li>
          <li>
            <strong>13-15 points: High risk tolerance.</strong> Growth
            focused - diversified equity portfolios, high-growth mutual
            funds, ETFs.
          </li>
        </ul>

        <h3>Visualizing Portfolio Volatility</h3>
        <p>
          Once you know your risk profile, you can simulate what a portfolio
          at that risk level actually looks like over time. Consider a
          moderate-risk portfolio: 60% equities (average return 10%, standard
          deviation 15%) and 40% bonds (average return 5%, standard
          deviation 5%). Running 1,000 simulations over 20 years:
        </p>

        <Image
          src={img2}
          alt="Portfolio Value Simulation Over 20 Years - 1,000 scenarios with median outcome line, showing range of potential portfolio values"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          The red line here shows the <strong>median</strong> outcome rather
          than the average. Why median instead of average? Because investment
          returns can produce extreme outliers - a few incredibly lucky
          scenarios would skew the average upward, making the &quot;typical&quot;
          outcome look better than it actually is. The median gives you a more
          honest picture of what a typical investor would experience.
        </p>
        <p>
          The spread of paths shows the trade-off clearly: equities introduce
          volatility (the wide fan of possible outcomes), while bonds provide
          stability. The combination smooths things out, but doesn&apos;t
          eliminate uncertainty. This is why understanding your risk tolerance
          matters - you need to be comfortable with the range of outcomes your
          portfolio can produce, not just the expected one.
        </p>

        <hr />

        <h2>Building the Portfolio: Modern Portfolio Theory</h2>
        <p>
          Now we get to the central question: given a set of available assets,
          how do you find the best combination? This is the problem that Harry
          Markowitz solved in 1952 with Modern Portfolio Theory (MPT). The key
          insight is that the risk of a portfolio depends not just on the risk
          of individual assets, but on how those assets move in relation to
          each other.
        </p>

        <h3>Portfolio Return</h3>
        <p>
          The expected return of a portfolio is simply the weighted average of
          the returns of its individual assets. If you put 60% in equities
          (expected return 10%) and 40% in bonds (expected return 5%), your
          portfolio&apos;s expected return is 0.6 × 10% + 0.4 × 5% = 8%.
        </p>

        <Image
          src={img4}
          alt="Portfolio Return formula - weighted average of constituent asset returns with worked example"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h3>Portfolio Volatility</h3>
        <p>
          Here&apos;s where it gets interesting. The volatility (risk) of a
          portfolio is <em>not</em> simply the weighted average of individual
          asset volatilities. It also depends on the covariance between
          assets - how their returns move together. This is the mathematical
          basis for diversification: if assets don&apos;t move in lockstep,
          combining them reduces overall portfolio risk.
        </p>

        <Image
          src={img5}
          alt="Portfolio Volatility formula using covariance matrix - σp = √(w · Cov(R) · wT)"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <Image
          src={img6}
          alt="Detailed derivation of portfolio variance from weighted sum of asset returns, showing how variance and covariance terms combine"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h3>Correlation and Diversification</h3>
        <p>
          Correlation coefficients measure how two assets move relative to
          each other. They range from -1 to 1:
        </p>
        <ul>
          <li>
            <strong>+1:</strong> Perfect positive correlation - assets always
            move together. No diversification benefit.
          </li>
          <li>
            <strong>0:</strong> No correlation - assets move independently.
            Good diversification.
          </li>
          <li>
            <strong>-1:</strong> Perfect negative correlation - assets move
            in opposite directions. Maximum diversification benefit.
          </li>
        </ul>
        <p>
          Using hypothetical 5-year returns for three asset classes, the
          correlations work out to:
        </p>
        <ul>
          <li>
            <strong>Equities &amp; Bonds: 0.55</strong> - moderate positive
            correlation. They tend to move somewhat together, but not
            perfectly.
          </li>
          <li>
            <strong>Equities &amp; Gold: -0.06</strong> - nearly independent.
            Gold can act as a hedge when equities are volatile.
          </li>
          <li>
            <strong>Bonds &amp; Gold: -0.65</strong> - moderate negative
            correlation. Gold tends to rise when bond yields fall, making
            them effective diversification partners.
          </li>
        </ul>

        <Image
          src={img7}
          alt="Worked example calculating covariance and portfolio volatility for two assets with returns over 3 periods"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          By combining assets with low or negative correlations, you can
          build a portfolio where the overall volatility is lower than the
          volatility of any single asset in it. This is the power of
          diversification, expressed mathematically.
        </p>

        <h3>The Sharpe Ratio</h3>
        <p>
          To compare portfolios, we need a way to measure risk-adjusted
          return - how much return you&apos;re getting per unit of risk.
          The Sharpe Ratio does exactly this: it takes the portfolio&apos;s
          return, subtracts the risk-free rate (what you&apos;d earn from a
          completely safe investment like treasury bills), and divides by the
          portfolio&apos;s volatility. A higher Sharpe Ratio means you&apos;re
          being better compensated for the risk you&apos;re taking.
        </p>

        <Image
          src={img3}
          alt="Sharpe Ratio formula SR = (Rp - Rf) / σp with explanation of each component and worked example"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h3>The Efficient Frontier</h3>
        <p>
          Now we can put it all together. Given three asset classes
          (equities, bonds, and gold) with known returns, volatilities, and
          correlations, we can generate thousands of random portfolio
          combinations and plot them by expected return vs. volatility. The
          result is the Efficient Frontier.
        </p>

        <Image
          src={img8}
          alt="Optimization for Maximum Sharpe Ratio - constrained optimization problem finding optimal asset weights"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <Image
          src={img9}
          alt="Efficient Frontier plot showing portfolio combinations colored by Sharpe Ratio, with star marking the optimal portfolio"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          Each point on this plot is a different portfolio. The color
          represents the Sharpe Ratio - warmer colors indicate better
          risk-adjusted returns. The star marks the portfolio with the
          maximum Sharpe Ratio: the optimal balance of risk and return.
        </p>
        <p>
          For this example, the optimal portfolio has:
        </p>
        <ul>
          <li>Expected return: ~5.87% per annum</li>
          <li>Expected volatility: ~4.36% per annum</li>
          <li>Sharpe Ratio: ~1.35</li>
          <li>
            Allocation: ~19.5% equities, ~75.2% bonds, ~5.3% gold
          </li>
        </ul>
        <p>
          This might surprise you - the &quot;optimal&quot; portfolio is
          heavily weighted toward bonds, not equities. That&apos;s because
          the optimization maximizes risk-adjusted return, not absolute
          return. The small allocation to equities captures some growth, while
          bonds provide stability, and gold adds a diversification benefit due
          to its low correlation with the other assets. The Efficient Frontier
          gives you the framework to choose any point along the curve based on
          how much risk you&apos;re willing to accept.
        </p>

        <hr />

        <h2>Keeping It on Track: Rebalancing</h2>
        <p>
          Building the right portfolio is only half the job. Over time,
          market movements will push your actual allocation away from your
          target. If equities have a strong year, they&apos;ll grow to
          represent a larger share of your portfolio than intended - meaning
          you&apos;re now taking more risk than you planned for.
        </p>

        <h3>How Rebalancing Works</h3>
        <p>
          Say your target allocation is 50% equities, 30% bonds, 20% gold,
          and your portfolio has grown to ₹10,00,000. After a year of
          market movements, the actual allocation has drifted to 60%
          equities, 25% bonds, 15% gold. Here&apos;s the math:
        </p>
        <ul>
          <li>
            <strong>Equities:</strong> Current ₹6,00,000 → Target
            ₹5,00,000. <em>Sell ₹1,00,000.</em>
          </li>
          <li>
            <strong>Bonds:</strong> Current ₹2,50,000 → Target ₹3,00,000.{" "}
            <em>Buy ₹50,000.</em>
          </li>
          <li>
            <strong>Gold:</strong> Current ₹1,50,000 → Target ₹2,00,000.{" "}
            <em>Buy ₹50,000.</em>
          </li>
        </ul>
        <p>
          You&apos;re selling what&apos;s gone up (equities) and buying
          what&apos;s lagged (bonds, gold). This is systematically buying low
          and selling high - which is exactly what good investing is supposed
          to look like.
        </p>

        <h3>Does Rebalancing Actually Help?</h3>
        <p>
          To test this, we can simulate a 60/40 equities-bonds portfolio over
          10 years under three market conditions - bullish, bearish, and
          volatile - comparing rebalanced vs. unrebalanced performance:
        </p>

        <Image
          src={img10}
          alt="Rebalancing Impact Simulation - portfolio value over 10 years comparing with and without rebalancing under bullish, bearish, and volatile market conditions"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          The results are telling:
        </p>
        <ul>
          <li>
            <strong>Bullish markets:</strong> The unrebalanced portfolio ends
            up slightly higher, because equities keep growing and take over
            a larger share. But it also carries significantly more risk.
          </li>
          <li>
            <strong>Bearish markets:</strong> The rebalanced portfolio
            outperforms, because it systematically reduced equity exposure as
            markets fell and maintained the stabilizing effect of bonds.
          </li>
          <li>
            <strong>Volatile markets:</strong> Rebalancing smooths out the
            ups and downs, reducing the emotional stress of watching your
            portfolio swing wildly.
          </li>
        </ul>
        <p>
          Rebalancing isn&apos;t about maximizing absolute returns - it&apos;s
          about maintaining the risk level you chose and staying disciplined
          through market cycles. Over long horizons, this discipline tends to
          produce better risk-adjusted outcomes.
        </p>

        <hr />

        <h2>Key Takeaway</h2>
        <p>
          Investment planning doesn&apos;t have to be guesswork. The tools
          exist to answer the hard questions quantitatively: compound interest
          tells you how your money grows, Monte Carlo simulations show you
          the range of possible outcomes, Modern Portfolio Theory helps you
          find the optimal mix of assets, and rebalancing keeps your plan on
          track over time.
        </p>
        <p>
          None of this requires expensive advisors or proprietary software.
          The formulas are well-established, the data is publicly available,
          and tools like Python (with pandas, NumPy, and Matplotlib) or even
          a well-structured spreadsheet can run these calculations. What it
          does require is taking the time to define your goals, understand
          your risk tolerance, and let the math guide your decisions instead
          of emotions.
        </p>
        <p>
          Start simple: calculate your retirement number using compound
          interest. Run a basic Monte Carlo simulation to see the range of
          outcomes. Check whether your current portfolio allocation matches
          your risk profile. Each step builds on the last, and each one gives
          you more confidence that your investment plan is grounded in
          something real.
        </p>
      </div>

      <RelatedPosts slug="a-quantitative-approach-to-personalized-investment-planning" />
    </article>
  );
}
