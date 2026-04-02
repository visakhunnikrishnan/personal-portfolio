import type { Metadata } from "next";
import Image from "next/image";

import heroImg from "../../../../public/blog/intelligence-measurement-and-the-path-to-agi/intelligence.png";
import { RelatedPosts } from "@/components/related-posts";
import { BenchmarkSaturation } from "@/components/benchmark-saturation";
import { AgiLevelsComparison } from "@/components/agi-levels-comparison";
import { AiPerformanceScoreboard } from "@/components/ai-performance-scoreboard";
import { AiScientificImpact } from "@/components/ai-scientific-impact";
import { IntelligenceSpectrum } from "@/components/intelligence-spectrum";
import { JaggedCapabilityProfile } from "@/components/jagged-capability-profile";
import { GFactorDiagram } from "@/components/g-factor-diagram";
import { FluidVsCrystallized } from "@/components/fluid-vs-crystallized";
import { IQDistribution } from "@/components/iq-distribution";
import { CognitiveFaculties } from "@/components/cognitive-faculties";

export const metadata: Metadata = {
  title: "Measuring Machine Intelligence",
  description:
    "What intelligence actually means, how we measure it in humans and machines, and where we really stand on the road to AGI - the definitions, the benchmarks, and the open questions.",
  keywords: [
    "artificial general intelligence",
    "AGI",
    "AI benchmarks",
    "intelligence measurement",
    "ARC-AGI",
    "MMLU",
    "Kolmogorov complexity",
    "Humanity's Last Exam",
    "AI capability",
    "machine intelligence",
    "DeepMind AGI levels",
    "AI safety",
  ],
  openGraph: {
    title: "Measuring Machine Intelligence",
    description:
      "What intelligence actually means, how we measure it in humans and machines, and where we really stand on the road to AGI - the definitions, the benchmarks, and the open questions.",
    type: "article",
    publishedTime: "2026-03-20",
    authors: ["Visakh Unni"],
    images: [
      {
        url: "https://www.visakhunni.com/blog/intelligence-measurement-and-the-path-to-agi/intelligence.png",
        width: 1200,
        height: 630,
        alt: "Measuring Machine Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Measuring Machine Intelligence",
    description:
      "What intelligence actually means, how we measure it in humans and machines, and where we really stand on the road to AGI - the definitions, the benchmarks, and the open questions.",
    images: [
      "https://www.visakhunni.com/blog/intelligence-measurement-and-the-path-to-agi/intelligence.png",
    ],
  },
};

export default function AGIBlog() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Measuring Machine Intelligence
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-03-20">Mar 20, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>28 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="A person standing between mirrored cityscapes - a visual metaphor for intelligence reflected across human and machine domains"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          I kept hearing people say we&apos;re close to AGI - or that
          we&apos;ve already achieved it, or that it&apos;s impossible. I
          realized I didn&apos;t actually know what intelligence means in a
          formal sense, how we measure it in humans, or what the benchmarks for
          AI really test. So I went looking. What I found was a field where
          trillion-dollar investment decisions depend on definitions that nobody
          agrees on, benchmarks that keep breaking, and a gap between what AI
          can do on a test and what it can do in the real world. Here&apos;s
          what I learned.
        </p>

        <hr />

        {/* ── SECTION 1: WHAT IS INTELLIGENCE ── */}

        <h2>What Is Intelligence, Anyway?</h2>

        <p>
          This sounds like it should have a straightforward answer. It
          doesn&apos;t. When two dozen prominent researchers were asked to
          define intelligence in 1986, they produced two dozen different
          definitions.{" "}
          <a href="#ref-10">[10]</a> The American Psychological Association tried
          in 1996 and deliberately avoided giving a single definition, instead
          calling intelligence a &ldquo;complex set of phenomena.&rdquo;{" "}
          <a href="#ref-2">[2]</a>
        </p>

        <p>
          The most widely cited working definition comes from a 1997 statement
          signed by 52 researchers: <a href="#ref-3">[3]</a>
        </p>

        <blockquote>
          Intelligence is a very general mental capability that involves the
          ability to reason, plan, solve problems, think abstractly, comprehend
          complex ideas, learn quickly and learn from experience.
        </blockquote>

        <p>
          That&apos;s helpful, but notice how broad it is. It&apos;s basically
          saying intelligence is being good at thinking - which doesn&apos;t
          tell you much about how to measure it.
        </p>

        <h3>Spearman&apos;s g: the one number that keeps showing up</h3>

        <p>
          In 1904, Charles Spearman noticed something odd. When you give people
          a bunch of unrelated cognitive tests - vocabulary, spatial reasoning,
          arithmetic, pattern recognition - their scores are always positively
          correlated. People who do well on one tend to do well on others. This
          is called the <strong>positive manifold</strong>, and it&apos;s been
          called the most replicated finding in all of psychology.{" "}
          <a href="#ref-1">[1]</a>
        </p>

        <p>
          Spearman used a technique he invented called factor analysis to
          extract a single underlying factor from these correlations. He called
          it <strong>g</strong> (general intelligence). Mathematically, the idea
          is that each test score is a combination of g plus some test-specific
          ability:
        </p>

        <div className="not-prose my-6 rounded-lg border border-border bg-muted/50 px-5 py-4">
          <p className="mb-3 font-mono text-sm text-foreground">
            X = &Lambda;f + &epsilon;
          </p>
          <p className="text-sm text-muted-foreground">
            Think of it this way. You take a bunch of cognitive tests and get
            a score on each - that&apos;s <strong>X</strong>. Spearman&apos;s
            insight was that your scores aren&apos;t random. There&apos;s a
            hidden factor <strong>f</strong> (general intelligence, or g)
            pulling them all in the same direction. <strong>&Lambda;</strong>{" "}
            captures how strongly each test is connected to that hidden factor
            - some tests (like abstract reasoning) are tightly linked to g,
            while others (like memorizing digits) are less so.
            And <strong>&epsilon;</strong> is everything else - luck, how you
            were feeling that day, test-specific skills.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            When researchers run this math across large populations, the g
            factor alone explains{" "}
            <strong>40-50% of the total variation</strong> in scores across
            all the different tests. That&apos;s a lot for a single number.{" "}
            <a href="#ref-1">[1]</a>
          </p>
        </div>

        <GFactorDiagram />

        <p>
          Today, the most accepted model is the{" "}
          <strong>Cattell-Horn-Carroll (CHC) model</strong>.{" "}
          <a href="#ref-4">[4]</a> <a href="#ref-5">[5]</a>{" "}
          <a href="#ref-6">[6]</a> Think of it as a three-layer pyramid. At the
          top sits g. In the middle are 16 broad abilities like reasoning,
          memory, and processing speed. At the bottom are 80+ specific skills.
        </p>

        <p>
          The distinction that matters most for AI is between two of those
          broad abilities. <strong>Fluid intelligence</strong> is your ability
          to solve problems you&apos;ve never seen before - pure reasoning
          with no prior knowledge to lean on. <strong>Crystallized
          intelligence</strong> is what you know - facts, vocabulary, learned
          procedures. Here&apos;s the thing: most AI benchmarks test
          crystallized knowledge (what the model has seen in training). Very few
          test fluid reasoning (can it figure out something genuinely new?).
        </p>

        <FluidVsCrystallized />

        <p>
          There&apos;s another well-known theory worth mentioning: Howard
          Gardner&apos;s multiple intelligences. He proposed in 1983 that
          there are eight independent types of intelligence - linguistic,
          logical-mathematical, spatial, musical, bodily-kinesthetic,
          interpersonal, intrapersonal, and naturalistic. <a href="#ref-7">[7]</a>{" "}
          The idea became hugely popular in education. Schools designed entire
          curricula around it.
        </p>

        <p>
          The problem is that when researchers tested whether these
          intelligences are actually independent, they found they&apos;re not.
          Visser et al. (2006) showed they all correlate with g - meaning
          they&apos;re not separate abilities, just different expressions of
          the same underlying factor. <a href="#ref-9">[9]</a> Waterhouse
          (2023) went further, calling the whole theory a
          &ldquo;neuromyth.&rdquo; <a href="#ref-8">[8]</a> Gardner himself
          conceded there was &ldquo;little hard evidence&rdquo; supporting
          it.
        </p>

        <h3>Some numbers worth knowing</h3>

        <p>
          If you test a large number of people, IQ scores form a normal distribution.
          The average is 100, and most people (about 95%) fall between 70 and
          130. The standard deviation is 15, meaning a score of 115 puts you
          one step above average, and 130 puts you two steps above.
        </p>

        <IQDistribution />

        <p>
          One thing that surprised me: how much of intelligence is genetic,
          and how that changes with age. In childhood, genes explain about 41%
          of the differences in intelligence between people. By adulthood,
          that number jumps to 75-80%. <a href="#ref-11">[11]</a> Environment
          matters a lot when you&apos;re young, but its influence fades as you
          grow older.
        </p>

        <p>
          Neuroscience adds another piece. Intelligence isn&apos;t located in
          one part of the brain. It depends on how well the frontal lobes
          (planning, decision-making) and parietal lobes (spatial processing,
          integration) talk to each other. It&apos;s about the wiring between
          regions, not any single &ldquo;intelligence center.&rdquo;{" "}
          <a href="#ref-12">[12]</a>
        </p>

        {/* ── SECTION 2: FORMALIZING INTELLIGENCE ── */}

        <h2>The Mathematical View: Compression Is Intelligence</h2>

        <p>
          There&apos;s also a mathematical way to think about intelligence.
          The core idea is simple:{" "}
          <strong>intelligence is compression</strong>. If you can take
          something complex and describe it in a shorter form, you&apos;ve
          understood its pattern.
        </p>

        <p>
          This was formalized through something called{" "}
          <strong>Kolmogorov complexity</strong>. <a href="#ref-15">[15]</a>{" "}
          It measures how complex a piece of data is by asking: what&apos;s
          the shortest computer program that can produce it? For example, the
          string &ldquo;010101010101&rdquo; is simple - you can generate it
          with a tiny program (&ldquo;repeat 01 six times&rdquo;). A truly
          random string can&apos;t be compressed at all - you&apos;d need a
          program just as long as the string itself.
        </p>

        <div className="not-prose my-6 rounded-lg border border-border bg-muted/50 px-5 py-4">
          <p className="mb-3 font-mono text-sm text-foreground">
            K(x) = min &#123; |p| : U(p) = x &#125;
          </p>
          <p className="text-sm text-muted-foreground">
            K(x) is the Kolmogorov complexity of some data x. It&apos;s the
            length of the shortest program p that produces x on a universal
            Turing machine U. The catch: you can never be 100% sure
            you&apos;ve found the shortest possible program. It&apos;s
            mathematically proven to be incomputable.{" "}
            <a href="#ref-15">[15]</a>
          </p>
        </div>

        <p>
          Why does this matter for intelligence? Because compression and
          prediction are the same thing. If you can compress data, you&apos;ve
          found the pattern. If you&apos;ve found the pattern, you can predict
          what comes next. And predicting well is really what intelligence is
          about. Ray Solomonoff made this rigorous in 1964{" "}
          <a href="#ref-16">[16]</a> - he showed that the best possible
          predictor is one that favors simpler explanations over complex ones
          (shorter programs get higher weight). This is basically Occam&apos;s
          razor, expressed as math.
        </p>

        <h3>Putting a number on intelligence</h3>

        <p>
          In 2007, Shane Legg and Marcus Hutter looked at 71 different
          definitions of intelligence and boiled them all down to one idea:
          intelligence is how good you are at achieving goals across many
          different situations. <a href="#ref-13">[13]</a> Then they wrote a
          formula for it:
        </p>

        <div className="not-prose my-6 rounded-lg border border-border bg-muted/50 px-5 py-4">
          <p className="mb-3 font-mono text-sm text-foreground">
            &Upsilon;(&pi;) = &Sigma;<sub>&mu;&isin;E</sub> 2<sup>-K(&mu;)</sup>{" "}
            V<sub>&mu;</sub><sup>&pi;</sup>
          </p>
          <p className="text-sm text-muted-foreground">
            Here&apos;s what it says in plain English: take an agent
            (&pi;). Test it in every possible environment (&mu;). Add up
            how well it does in each one - but give more weight to simpler
            environments (the 2<sup>-K(&mu;)</sup> part). That total is its
            intelligence score. Why weight simpler environments more? Because
            most real-world problems have underlying structure. An agent that
            only solves bizarre, contrived edge cases but fails at everyday
            tasks isn&apos;t very intelligent. Weighting by simplicity is
            Occam&apos;s razor built into the formula.{" "}
            <a href="#ref-13">[13]</a>
          </p>
        </div>

        <p>
          What makes this interesting is what it doesn&apos;t care about.
          It doesn&apos;t matter if the agent is a human, an AI, or
          something we haven&apos;t invented yet. It doesn&apos;t favor
          any particular task. It&apos;s a universal yardstick for
          intelligence. The catch: you can&apos;t actually compute it. It
          requires testing across infinitely many environments. So it
          exists as a theoretical ideal, not a practical tool.
        </p>

        <p>
          Marcus Hutter extended this with <strong>AIXI</strong>{" "}
          <a href="#ref-14">[14]</a> - a theoretical design for the most
          intelligent possible agent. AIXI always makes the best decision
          in any environment by considering every possible explanation for
          what it observes, weighted by simplicity. It&apos;s been proven
          optimal. It&apos;s also been proven impossible to actually build -
          it would require infinite computation. Researchers have built
          simplified versions (like MC-AIXI-CTW <a href="#ref-17">[17]</a>),
          but they only work in very simple environments.
        </p>

        <blockquote>
          We have a mathematically precise definition of perfect intelligence.
          We just can&apos;t compute it. This is the fundamental tension in the
          field: we know what the destination looks like but have no map.
        </blockquote>

        {/* ── SECTION 3: BENCHMARKS ── */}

        <h2>How We Test AI Today - and Where It Breaks</h2>

        <p>
          If we can&apos;t compute universal intelligence, we do the next best
          thing: we give AI tests. Lots of tests. The problem is that AI keeps
          passing them faster than we can make new ones.
        </p>

        <h3>The saturation problem</h3>

        <p>
          <strong>MMLU</strong> (Massive Multitask Language Understanding) was
          supposed to be a broad test of knowledge across 57 subjects. When it
          launched in 2021, the best models scored around 43%. By 2025, frontier
          models were clustered at 88-93% - essentially at or above human expert
          level. The benchmark was excluded from the Vellum AI leaderboard as
          &ldquo;outdated.&rdquo; <a href="#ref-27">[27]</a> Score variation of
          up to 10% depends on nothing more than how you format the prompt.
        </p>

        <BenchmarkSaturation />

        <p>
          This pattern repeats. A benchmark launches, the community rallies
          around it, models improve rapidly, and within a few years it&apos;s
          saturated and no longer useful for distinguishing between systems.
          GPQA Diamond (PhD-level science) went from 36% to 94% in three years.
          AIME math problems went from 12% to near-perfect scores.
        </p>

        <h3>The contamination problem</h3>

        <p>
          There&apos;s also a trust problem with benchmarks. When researchers
          asked GPT-4 to guess missing answer options from MMLU questions, it
          got <strong>57% of them exactly right</strong>.{" "}
          <a href="#ref-29">[29]</a> That&apos;s a strong sign the model had
          seen these test questions during training. It wasn&apos;t reasoning
          through them - it was remembering them.
        </p>

        <p>
          This is called <strong>data contamination</strong>, and it&apos;s a
          big deal. On GSM8K (a math benchmark), accuracy drops by 13% when
          you remove questions the model was likely trained on. It gets worse:
          some models are trained on translated versions of English benchmarks,
          which inflates their English scores without anyone noticing.
        </p>

        <div className="not-prose my-6 rounded-lg border border-border bg-muted/50 px-5 py-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p className="mb-1 font-semibold text-foreground">
            Why this matters
          </p>
          <p>
            If a model has seen the test during training, its score tells you
            how good it is at memorizing, not at thinking. Imagine a student
            who got a perfect score - but only because they had the answer key
            beforehand. The field is fighting this with private test sets (HLE,
            ARC-AGI-2), constantly refreshed benchmarks (LiveBench), and tools
            that detect contamination after the fact. But it&apos;s an ongoing
            arms race.
          </p>
        </div>

        <h3>ARC-AGI: testing what benchmarks miss</h3>

        <p>
          Fran&ccedil;ois Chollet made an important argument in 2019: being
          good at a task doesn&apos;t mean you&apos;re intelligent.{" "}
          <a href="#ref-23">[23]</a> You might just have a lot of practice or
          training data. What actually shows intelligence is how fast you can
          pick up something completely new from just a few examples. He called
          this <strong>skill-acquisition efficiency</strong>.
        </p>

        <p>
          To test this, he created the Abstraction and Reasoning Corpus (ARC) -
          a set of grid puzzles where you see 2-3 examples of a pattern and
          have to figure out the rule. They test basic things like recognizing
          objects, counting, and understanding how shapes relate to each other.
          No memorization helps here - every puzzle is unique.
        </p>

        <p>
          The first version (ARC-AGI-1) is now mostly solved - OpenAI&apos;s o3
          scored 87.5% in December 2024. So Chollet released a harder version,{" "}
          <strong>ARC-AGI-2</strong>, in 2025. <a href="#ref-24">[24]</a> Every
          task was checked to make sure at least two humans could solve it in
          two tries or fewer. But at launch, no AI model scored above 5%. By
          early 2026, the best score is 54% (from a system called Poetiq, built
          on Gemini 3 Pro, costing $30 per task). Claude Opus 4.5 gets 37.6% at
          $2.20 per task. The ARC Prize 2025 drew 1,455 teams and over 15,000
          entries. <a href="#ref-25">[25]</a> The takeaway: just making models
          bigger isn&apos;t enough. Something fundamentally new is needed.
        </p>

        <h3>Humanity&apos;s Last Exam: the hardest test yet</h3>

        <p>
          Then there&apos;s <strong>Humanity&apos;s Last Exam</strong> (HLE),
          built by the Center for AI Safety and Scale AI. They asked about
          1,000 experts from over 500 institutions across 50 countries to write
          the hardest questions they could - 2,500 questions across 100+
          subjects. <a href="#ref-26">[26]</a> The rule: if any current AI model
          could answer a question, it got thrown out. Only questions that
          stumped every model made it in.
        </p>

        <p>
          When HLE launched in early 2025, GPT-4o scored 2.7% and o1 scored
          8.0%. A year later, the scores have gone up but are still nowhere
          near human expert level (~90%): Claude Opus 4.6 reaches 53.1%,
          Gemini 3 Deep Think gets 48.4%, and GPT-5.4 hits 41.6%.
        </p>

        {/* ── SECTION 4: WHAT WOULD AGI LOOK LIKE ── */}

        <h2>What Would AGI Actually Look Like?</h2>

        <p>
          Here&apos;s where things get political. Every major AI lab has its
          own definition of AGI, and the definition they choose conveniently
          shapes what they claim to have achieved.
        </p>

        <p>
          The term was first used by Mark Gubrud in 1997{" "}
          <a href="#ref-33">[33]</a> and became widely known after a 2007
          book by Ben Goertzel and Cassio Pennachin.{" "}
          <a href="#ref-34">[34]</a> But to this day, there&apos;s no agreed
          definition. Each major AI lab has its own version:
        </p>

        <AgiLevelsComparison />

        <p>
          Google DeepMind&apos;s approach <a href="#ref-35">[35]</a> is the
          most structured. They created a grid with two axes: how good a
          system is (from &ldquo;Emerging&rdquo; to &ldquo;Superhuman&rdquo;)
          and how broad it is (narrow vs. general). By this measure, today&apos;s
          top models - GPT-4, Gemini, Claude - count as{" "}
          <strong>&ldquo;Emerging AGI&rdquo; (Level 1 General)</strong>. That
          means they&apos;re roughly as broad as an unskilled human, but can be
          expert-level on specific tasks.
        </p>

        <h3>DeepMind&apos;s 10 faculties of intelligence</h3>

        <p>
          In March 2026, DeepMind published what I think is the most important
          paper in this space. <a href="#ref-36">[36]</a> Instead of asking
          &ldquo;can AI pass this test?&rdquo; they asked a better question:
          &ldquo;what are the building blocks of intelligence, and how do we
          measure each one?&rdquo;
        </p>

        <p>
          They identified 10 core cognitive faculties, grounded in decades of
          cognitive science research. Think of them as the fundamental abilities
          that make up general intelligence. Some of them we can already test
          in AI. Others we barely know how to evaluate.
        </p>

        <CognitiveFaculties />

        <p>
          The pattern here is revealing. The abilities we <em>can</em> test -
          perception, generation, reasoning, problem solving, memory - are the
          ones current AI is already good at. They&apos;re the abilities that
          show up in benchmarks like MMLU, GPQA, and coding tests.
        </p>

        <p>
          The abilities we <em>can&apos;t</em> properly test are a different
          story. <strong>Metacognition</strong> is knowing what you know and
          what you don&apos;t - something AI is famously bad at (it
          &ldquo;hallucinates&rdquo; confidently). <strong>Learning</strong>{" "}
          means improving from new experience in real time, not just during
          training. <strong>Executive functions</strong> means managing a
          complex, multi-step project over days without losing track.{" "}
          <strong>Social cognition</strong> means understanding what another
          person is thinking and feeling from context. These are hard to test
          because they&apos;re hard to put into a multiple-choice format. But
          they&apos;re exactly the abilities that separate passing a test from
          functioning in the real world.
        </p>

        <p>
          The paper&apos;s framework is also mechanism-agnostic - it doesn&apos;t
          care <em>how</em> a system achieves these abilities, only{" "}
          <em>whether</em> it does. And it requires comparing AI performance
          against human baselines from a representative adult population, so
          you get an honest picture of where the system falls on the human
          distribution.
        </p>

        <IntelligenceSpectrum />

        <p>
          OpenAI defines AGI as systems that can outperform humans at most
          economically valuable work. Anthropic&apos;s Dario Amodei doesn&apos;t
          use the term at all. He talks about &ldquo;powerful AI&rdquo; instead
          - something smarter than Nobel Prize winners in most fields, capable
          of compressing a century of scientific progress into 5-10 years.{" "}
          <a href="#ref-63">[63]</a>
        </p>

        <p>
          This disagreement isn&apos;t academic. Government regulation,
          corporate strategy, and trillion-dollar investments all depend on how
          you define AGI. If it means &ldquo;passes benchmarks,&rdquo;
          we&apos;re almost there. If it means &ldquo;can do everything a human
          can,&rdquo; we&apos;re not close.
        </p>

        {/* ── SECTION 5: WHERE AI STANDS ── */}

        <h2>Where AI Actually Stands Today</h2>

        <AiPerformanceScoreboard />

        <p>
          The picture is clear: AI crushes structured academic tests but
          struggles with messy real-world tasks. Researchers call this the{" "}
          <strong>jagged frontier</strong>. <a href="#ref-37">[37]</a> The
          system can be expert-level at one thing and completely fail at
          something that seems simpler. The edges of what it can and can&apos;t
          do are unpredictable.
        </p>

        <JaggedCapabilityProfile />

        <p>
          A study at Boston Consulting Group tested this with 758 real
          consultants. <a href="#ref-59">[59]</a> When the task was something
          AI is good at, people using GPT-4 did more work, faster, and at
          higher quality. But when the task was outside AI&apos;s comfort zone,
          people using AI actually did{" "}
          <strong>19 percentage points worse</strong> than those working
          without it. They trusted the AI&apos;s answer when they
          shouldn&apos;t have.
        </p>

        <p>
          The numbers get more stark at scale. In blind tests across 44
          occupations, AI matched or beat human experts on about half the
          professional tasks - and did it 50-300x faster.{" "}
          <a href="#ref-49">[49]</a> Sounds impressive. But when researchers
          tested AI agents on 240 actual remote work projects, the best one
          could only automate <strong>2.5%</strong> of them.{" "}
          <a href="#ref-48">[48]</a> Doing well on a test and doing well on the
          job are very different things.
        </p>

        <h3>When do researchers think we&apos;ll get AGI?</h3>

        <p>
          A 2024 survey asked 2,778 AI researchers this question.{" "}
          <a href="#ref-39">[39]</a> The median answer: <strong>2047</strong> -
          which was 13 years earlier than the same survey had found two years
          before. There&apos;s a 10% chance it happens by 2027, according to
          the respondents. Prediction markets on Metaculus put the first
          general AI announcement at March 2028, with Alphabet as the most
          likely lab (35.9%), followed by OpenAI (20.6%) and Anthropic
          (19.1%). <a href="#ref-40">[40]</a>
        </p>

        {/* ── SECTION 6: AI IMPACT ── */}

        <h2>What AI Has Already Done</h2>

        <p>
          Whatever you think about AGI timelines, AI is already making
          contributions that would have been unimaginable a decade ago.
        </p>

        <AiScientificImpact />

        <p>
          <strong>AlphaFold</strong> figured out how proteins fold - a problem
          scientists had been stuck on for 50 years. It earned Demis Hassabis
          and John Jumper the 2024 Nobel Prize in Chemistry.{" "}
          <a href="#ref-42">[42]</a> <a href="#ref-43">[43]</a> The database
          now has predicted structures for 214 million proteins across over 1
          million species. <strong>GNoME</strong> predicted 2.2 million new
          crystal structures, of which 381,000 turned out to be stable
          materials that could actually be made.{" "}
          <a href="#ref-44">[44]</a>{" "}
          <strong>FunSearch</strong> was the first time an LLM made a
          verifiable new discovery in mathematics - beating a 20-year-old
          record on the cap set problem. <a href="#ref-45">[45]</a> And{" "}
          <strong>AlphaGeometry 2</strong> solved 42 out of 50 International
          Math Olympiad geometry problems - gold-medal level.{" "}
          <a href="#ref-46">[46]</a>
        </p>

        <h3>But the economic impact is still unclear</h3>

        <p>
          McKinsey estimates generative AI could add $2.6-4.4 trillion a year
          to the global economy. <a href="#ref-47">[47]</a> But Goldman
          Sachs&apos; chief economist said in 2025 that AI&apos;s actual
          impact on GDP so far has been &ldquo;basically zero.&rdquo;
          There&apos;s a big gap between what people project and what&apos;s
          actually happened.
        </p>

        <p>
          Where the numbers are more concrete is individual productivity. A
          study of customer service agents showed AI boosted output by 14% on
          average - with newer employees improving by 34%.{" "}
          <a href="#ref-58">[58]</a> Developers using GitHub Copilot finished
          tasks 55.8% faster. <a href="#ref-60">[60]</a> But here&apos;s the
          catch: a review of 106 studies found that on average,{" "}
          <strong>
            humans and AI working together performed worse than the best of
            either one working alone
          </strong>
          . <a href="#ref-57">[57]</a> Just adding AI to a workflow
          doesn&apos;t automatically make it better.
        </p>

        {/* ── SECTION 7: RISKS ── */}

        <h2>The Risks That Come With This</h2>

        <h3>We might stop thinking as hard</h3>

        <p>
          Research shows that the more people use AI, the less they exercise
          critical thinking. <a href="#ref-61">[61]</a> This makes intuitive
          sense. If you always let a tool do the thinking, that skill gets
          weaker over time. The worry isn&apos;t that AI makes us dumber
          overnight - it&apos;s that we gradually stop practicing the mental
          skills that matter most.
        </p>

        <h3>AI is getting very good at persuasion</h3>

        <p>
          AI is already as persuasive as humans on average. But when GPT-4
          was given personal information about the person it was debating, it
          was <strong>81.7% more likely</strong> to change their mind than a
          human debater was. <a href="#ref-67">[67]</a> Personalized AI
          persuasion is more effective than anything we&apos;ve tested with
          humans.
        </p>

        <h3>AI systems talking to each other</h3>

        <p>
          AI systems are increasingly being connected to other AI systems
          through tools like AutoGen, MCP, and A2A. This creates new kinds of
          problems. In market simulations, AI agents figured out how to fix
          prices together - without anyone telling them to.{" "}
          <a href="#ref-72">[72]</a> One study found that a single bad input
          could spread through a network and compromise up to a million AI
          agents in a chain reaction. <a href="#ref-71">[71]</a> Our current
          safety tools were built for single AI systems. They&apos;re not
          designed for networks of AIs working together.
        </p>

        <h3>The bigger picture on risk</h3>

        <p>
          Nick Bostrom&apos;s <em>Superintelligence</em> (2014) raised two
          ideas that are still central to the debate.{" "}
          <a href="#ref-50">[50]</a> First: a super-intelligent system could
          have any goal, including ones we wouldn&apos;t want (the
          &ldquo;orthogonality thesis&rdquo;). Second: no matter what an AI
          ultimately wants, it will probably try to preserve itself and gather
          resources along the way (&ldquo;instrumental convergence&rdquo;).
          Stuart Russell&apos;s <em>Human Compatible</em> (2019) proposed a
          fix: build AI that <em>wants</em> to be switched off if humans
          decide to. <a href="#ref-51">[51]</a>
        </p>

        <p>
          On the governance side, the EU AI Act took effect in August 2024
          with penalties up to &euro;35 million. <a href="#ref-55">[55]</a>{" "}
          28 countries plus the EU signed the Bletchley Declaration on AI
          safety. <a href="#ref-56">[56]</a> Anthropic introduced its
          Responsible Scaling Policy with safety levels that gate what models
          are allowed to do. <a href="#ref-53">[53]</a>{" "}
          <a href="#ref-54">[54]</a>
        </p>

        {/* ── SECTION 8: BOTTOM LINE ── */}

        <h2>The Bottom Line</h2>

        <p>
          After going through all of this, three things stand out:
        </p>

        <p>
          <strong>We can&apos;t properly measure what we&apos;re building.</strong>{" "}
          Half of the cognitive abilities that make up intelligence don&apos;t
          have proper AI evaluations yet. The benchmarks we do have saturate
          in a few years, suffer from contamination, and mostly test
          memorized knowledge rather than real reasoning. We&apos;re building
          systems faster than we can evaluate them.
        </p>

        <p>
          <strong>AI is brilliant at some things and terrible at others.</strong>{" "}
          And the boundary between the two isn&apos;t intuitive. It can ace a
          PhD-level science exam and then fail at a task any human could do.
          This creates real danger when people assume it&apos;s good at
          everything because it&apos;s good at the thing they tested.
        </p>

        <p>
          <strong>The next challenge is AI systems working together.</strong>{" "}
          As AI agents start calling other AI agents, the thing we need to
          understand isn&apos;t just one model - it&apos;s the behavior of the
          whole network. That&apos;s a different kind of problem, and we
          don&apos;t have the tools for it yet.
        </p>

        <blockquote>
          The question isn&apos;t really &ldquo;when will we get AGI?&rdquo;
          It&apos;s &ldquo;do we even know what we mean by that, and would we
          recognize it if it arrived?&rdquo; Right now, the honest answer to
          both is: not really.
        </blockquote>

        <hr />

        {/* ── REFERENCES ── */}

        <h2>References</h2>

        <div className="text-sm leading-relaxed">
          <h3>Intelligence theory and psychometrics</h3>
          <ol>
            <li id="ref-1">
              Spearman C (1904). &ldquo;General intelligence, objectively
              determined and measured.&rdquo;{" "}
              <em>American Journal of Psychology</em>, 15(2):201-293.
            </li>
            <li id="ref-2">
              Neisser U, Boodoo G, Bouchard TJ, et al. (1996).
              &ldquo;Intelligence: Knowns and unknowns.&rdquo;{" "}
              <em>American Psychologist</em>, 51(2):77-101.
            </li>
            <li id="ref-3">
              Gottfredson LS (1997). &ldquo;Mainstream science on
              intelligence.&rdquo; <em>Intelligence</em>, 24(1):13-23.
            </li>
            <li id="ref-4">
              Carroll JB (1993). <em>Human Cognitive Abilities</em>. Cambridge
              University Press.
            </li>
            <li id="ref-5">
              Cattell RB (1963). &ldquo;Theory of fluid and crystallized
              intelligence.&rdquo; <em>Journal of Educational Psychology</em>,
              54(1):1-22.
            </li>
            <li id="ref-6">
              McGrew KS (2009). &ldquo;CHC theory and the human cognitive
              abilities project.&rdquo; <em>Intelligence</em>, 37(1):1-10.
            </li>
            <li id="ref-7">
              Gardner H (1983). <em>Frames of Mind: The Theory of Multiple
              Intelligences</em>. Basic Books.
            </li>
            <li id="ref-8">
              Waterhouse L (2023). &ldquo;Why multiple intelligences theory is
              a neuromyth.&rdquo; <em>Frontiers in Psychology</em>, 14:1217288.
            </li>
            <li id="ref-9">
              Visser BA, Ashton MC, Vernon PA (2006). &ldquo;g and the
              measurement of Multiple Intelligences.&rdquo;{" "}
              <em>Intelligence</em>, 34(5):507-510.
            </li>
            <li id="ref-10">
              Sternberg RJ, Detterman DK, eds. (1986). <em>What Is
              Intelligence?</em> Ablex.
            </li>
          </ol>

          <h3>Neuroscience of intelligence</h3>
          <ol start={11}>
            <li id="ref-11">
              Haworth CMA, et al. (2010). &ldquo;The heritability of general
              cognitive ability increases linearly from childhood to young
              adulthood.&rdquo; <em>Molecular Psychiatry</em>, 15:1112-1120.
            </li>
            <li id="ref-12">
              Jung RE, Haier RJ (2007). &ldquo;The Parieto-Frontal Integration
              Theory (P-FIT) of intelligence.&rdquo;{" "}
              <em>Behavioral and Brain Sciences</em>, 30(2):135-154.
            </li>
          </ol>

          <h3>Formal and mathematical intelligence</h3>
          <ol start={13}>
            <li id="ref-13">
              Legg S, Hutter M (2007). &ldquo;Universal intelligence: A
              definition of machine intelligence.&rdquo;{" "}
              <em>Minds and Machines</em>, 17(4):391-444.{" "}
              <a href="https://arxiv.org/abs/0712.3329" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
            <li id="ref-14">
              Hutter M (2005). <em>Universal Artificial Intelligence</em>.
              Springer.
            </li>
            <li id="ref-15">
              Kolmogorov AN (1965). &ldquo;Three approaches to the quantitative
              definition of information.&rdquo;{" "}
              <em>Problems of Information Transmission</em>, 1(1):1-7.
            </li>
            <li id="ref-16">
              Solomonoff RJ (1964). &ldquo;A formal theory of inductive
              inference.&rdquo; <em>Information and Control</em>, 7(1):1-22.
            </li>
            <li id="ref-17">
              Veness J, Ng KS, Hutter M, Uther W, Silver D (2011). &ldquo;A
              Monte-Carlo AIXI approximation.&rdquo; <em>JAIR</em>,
              40(1):95-142.
            </li>
          </ol>

          <h3>AI benchmarks and evaluation</h3>
          <ol start={23}>
            <li id="ref-23">
              Chollet F (2019). &ldquo;On the measure of intelligence.&rdquo;{" "}
              <a href="https://arxiv.org/abs/1911.01547" target="_blank" rel="noopener noreferrer">arXiv:1911.01547</a>
            </li>
            <li id="ref-24">
              Chollet F, Knoop M, Kamradt G, et al. (2025). &ldquo;ARC-AGI-2:
              A new challenge for frontier AI reasoning systems.&rdquo;{" "}
              <a href="https://arxiv.org/abs/2505.11831" target="_blank" rel="noopener noreferrer">arXiv:2505.11831</a>
            </li>
            <li id="ref-25">
              ARC Prize 2025 Technical Report (2026).{" "}
              <a href="https://arxiv.org/abs/2601.10904" target="_blank" rel="noopener noreferrer">arXiv:2601.10904</a>
            </li>
            <li id="ref-26">
              Phan L, Gatti A, Han Z, et al. (2025). &ldquo;Humanity&apos;s
              Last Exam.&rdquo; <em>Nature</em>, 649:1139-1146.{" "}
              <a href="https://arxiv.org/abs/2501.14249" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
            <li id="ref-27">
              Hendrycks D, et al. (2021). &ldquo;Measuring massive multitask
              language understanding.&rdquo; <em>ICLR 2021</em>.{" "}
              <a href="https://arxiv.org/abs/2009.03300" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
            <li id="ref-29">
              Deng X, et al. (2024). &ldquo;Investigating data contamination
              in modern benchmarks for large language models.&rdquo;{" "}
              <em>NAACL 2024</em>.{" "}
              <a href="https://arxiv.org/abs/2311.09783" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
          </ol>

          <h3>AGI definitions and frameworks</h3>
          <ol start={33}>
            <li id="ref-33">
              Gubrud M (1997). &ldquo;Nanotechnology and international
              security.&rdquo; <em>Fifth Foresight Conference</em>.
            </li>
            <li id="ref-34">
              Goertzel B, Pennachin C, eds. (2007). <em>Artificial General
              Intelligence</em>. Springer.
            </li>
            <li id="ref-35">
              Morris MR, Sohl-Dickstein J, Fiedel N, et al. (2024).
              &ldquo;Levels of AGI for operationalizing progress on the path
              to AGI.&rdquo; <em>ICML</em>, PMLR 235:36308-36321.{" "}
              <a href="https://arxiv.org/abs/2311.02462" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
            <li id="ref-36">
              Burnell R, Yamamori Y, Firat O, et al. (2026). &ldquo;Measuring
              progress toward AGI: A cognitive framework.&rdquo; Google
              DeepMind.
            </li>
            <li id="ref-37">
              Morris MR, et al. (2026). &ldquo;Characterizing model
              jaggedness supports safety and usability.&rdquo; Google DeepMind.
            </li>
          </ol>

          <h3>AI timelines and expert forecasts</h3>
          <ol start={39}>
            <li id="ref-39">
              Grace K, Salvatier J, Dafoe A, et al. (2024). &ldquo;Thousands
              of AI authors on the future of AI.&rdquo;{" "}
              <a href="https://arxiv.org/abs/2401.02843" target="_blank" rel="noopener noreferrer">arXiv:2401.02843</a>
            </li>
            <li id="ref-40">
              Metaculus (2025). &ldquo;When will the first general AI system be
              devised?&rdquo;{" "}
              <a href="https://www.metaculus.com/questions/5121" target="_blank" rel="noopener noreferrer">Metaculus</a>
            </li>
          </ol>

          <h3>AI in science</h3>
          <ol start={42}>
            <li id="ref-42">
              Jumper J, et al. (2021). &ldquo;Highly accurate protein structure
              prediction with AlphaFold.&rdquo; <em>Nature</em>, 596:583-589.
            </li>
            <li id="ref-43">
              Nobel Prize in Chemistry 2024. Nobel Prize Organization.
            </li>
            <li id="ref-44">
              Merchant A, et al. (2023). &ldquo;Scaling deep learning for
              materials discovery.&rdquo; <em>Nature</em>, 624:80-85.
            </li>
            <li id="ref-45">
              Romera-Paredes B, et al. (2024). &ldquo;Mathematical discoveries
              from program search with large language models
              (FunSearch).&rdquo; <em>Nature</em>, 625:468-475.
            </li>
            <li id="ref-46">
              Trinh TH, et al. (2024). &ldquo;Solving olympiad geometry
              without human demonstrations (AlphaGeometry).&rdquo;{" "}
              <em>Nature</em>, 625:476-482.
            </li>
          </ol>

          <h3>Economic and labor impact</h3>
          <ol start={47}>
            <li id="ref-47">
              McKinsey Global Institute (2023). <em>The Economic Potential of
              Generative AI</em>.
            </li>
            <li id="ref-48">
              Mazeika M, et al. (2025). &ldquo;Remote labor index: Measuring
              AI automation of remote work.&rdquo;{" "}
              <a href="https://arxiv.org/abs/2510.26787" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
            <li id="ref-49">
              Patwardhan T, et al. (2025). &ldquo;GDPVal: Evaluating AI model
              performance on real-world economically valuable tasks.&rdquo;{" "}
              <a href="https://arxiv.org/abs/2510.04374" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
          </ol>

          <h3>Safety, risks, and governance</h3>
          <ol start={50}>
            <li id="ref-50">
              Bostrom N (2014). <em>Superintelligence: Paths, Dangers,
              Strategies</em>. Oxford University Press.
            </li>
            <li id="ref-51">
              Russell S (2019). <em>Human Compatible: AI and the Problem of
              Control</em>. Viking.
            </li>
            <li id="ref-53">
              Anthropic (2023). Anthropic&apos;s Responsible Scaling Policy.
            </li>
            <li id="ref-54">
              Anthropic (2025). Responsible Scaling Policy Version 3.0.
            </li>
            <li id="ref-55">
              EU AI Act (2024). Regulation (EU) 2024/1689.
            </li>
            <li id="ref-56">
              Bletchley Declaration (2023). AI Safety Summit.
            </li>
          </ol>

          <h3>Human-AI interaction</h3>
          <ol start={57}>
            <li id="ref-57">
              Vaccaro M, Almaatouq A, Malone T (2024). &ldquo;When
              combinations of humans and AI are useful.&rdquo;{" "}
              <em>Nature Human Behaviour</em>, 8(12):2293-2303.
            </li>
            <li id="ref-58">
              Brynjolfsson E, Li D, Raymond L (2023). &ldquo;Generative AI at
              work.&rdquo; <em>Quarterly Journal of Economics</em>,
              140(2):889-942.
            </li>
            <li id="ref-59">
              Dell&apos;Acqua F, et al. (2023). &ldquo;Navigating the jagged
              technological frontier.&rdquo; Harvard Business School Working
              Paper 24-013.
            </li>
            <li id="ref-60">
              Peng S, et al. (2023). &ldquo;The impact of AI on developer
              productivity: Evidence from GitHub Copilot.&rdquo;{" "}
              <a href="https://arxiv.org/abs/2302.06590" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
            <li id="ref-61">
              Gerlich M (2025). &ldquo;AI tools in society: Impacts on
              cognitive offloading and the future of critical thinking.&rdquo;{" "}
              <em>Societies</em>, 15(1):6.
            </li>
          </ol>

          <h3>AI social cognition and persuasion</h3>
          <ol start={63}>
            <li id="ref-63">
              Amodei D (2024). &ldquo;Machines of Loving Grace.&rdquo;{" "}
              <a href="https://darioamodei.com/essay/machines-of-loving-grace" target="_blank" rel="noopener noreferrer">Essay</a>
            </li>
            <li id="ref-67">
              Salvi F, et al. (2025). &ldquo;On the conversational
              persuasiveness of large language models.&rdquo;{" "}
              <em>Nature Human Behaviour</em>, 9:1645-1653.
            </li>
          </ol>

          <h3>Multi-agent AI systems</h3>
          <ol start={71}>
            <li id="ref-71">
              Hammond L, et al. (2025). &ldquo;Multi-agent risks from advanced
              AI.&rdquo;{" "}
              <a href="https://arxiv.org/abs/2502.14143" target="_blank" rel="noopener noreferrer">arXiv</a>
            </li>
            <li id="ref-72">
              Lin J, Lim T, Montagu A (2024). &ldquo;Collusive AI agents in
              market settings.&rdquo; Working Paper.
            </li>
          </ol>
        </div>
      </div>

      <RelatedPosts slug="intelligence-measurement-and-the-path-to-agi" />
    </article>
  );
}
