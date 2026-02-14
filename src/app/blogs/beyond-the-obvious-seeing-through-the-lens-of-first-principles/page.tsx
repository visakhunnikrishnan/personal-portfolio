import type { Metadata } from "next";
import Image from "next/image";

import heroImg from "../../../../public/blog/first-principles/first-principles-thinking-cover.png";
import stepsImg from "../../../../public/blog/first-principles/steps.jpg";
import feynmanImg from "../../../../public/blog/first-principles/feynman.jpg";
import wideImg from "../../../../public/blog/first-principles/wide.jpg";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Beyond the Obvious: Seeing Through the Lens of First Principles",
  description:
    "To get past biases, we need a careful and thoughtful approach called first principles thinking.",
  keywords: ["first principles thinking", "critical thinking", "mental models", "reasoning from scratch", "Elon Musk", "problem solving", "cognitive biases", "Aristotle", "Feynman technique"],
  openGraph: {
    title: "Beyond the Obvious: Seeing Through the Lens of First Principles",
    description:
      "To get past biases, we need a careful and thoughtful approach called first principles thinking.",
    type: "article",
    publishedTime: "2022-08-03",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond the Obvious: Seeing Through the Lens of First Principles",
    description: "To get past biases, we need a careful and thoughtful approach called first principles thinking.",
  },
};

export default function FirstPrinciplesBlog() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Beyond the Obvious: Seeing Through the Lens of First Principles
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2022-08-03">Aug 3, 2022</time>
          <span aria-hidden="true">&middot;</span>
          <span>6 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="Beyond the Obvious: First Principles Thinking"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Our brains are built to spot patterns, and that&apos;s usually helpful. But the same ability can trap us. We pay attention to what fits our beliefs and ignore what doesn&apos;t. We squeeze new information into old mental models. These shortcuts - confirmation bias, analogy-based reasoning, gut reactions - quietly shape our decisions without us noticing. First principles thinking is a way to break free from that cycle. It has significantly improved how I approach problems, and I think it can do the same for you.
        </p>

        <hr />

        <h2>What is First Principles Thinking?</h2>
        <p>
          The idea is simple: break a problem down to its most basic truths - things you can verify and know for certain - and build your reasoning up from there. Instead of relying on how things have always been done, you start from scratch.
        </p>
        <p>
          This isn&apos;t new. Aristotle argued that real understanding requires identifying the fundamental elements and causes of something. During the Renaissance and Enlightenment, scientists rejected inherited wisdom and rebuilt knowledge through observation, experimentation, and rational analysis. Today, the same approach drives breakthroughs in physics, engineering, and business. The question at its core is always the same: "What do we actually know for sure?"
        </p>

        <h2>Why It Matters</h2>
        <p>
          The most famous modern example is Elon Musk and SpaceX. When Musk looked into space travel, everyone told him rockets were expensive - that&apos;s just how it was. Instead of accepting that, he broke down the cost of a rocket to its raw materials: aluminum, titanium, carbon fiber. The materials themselves weren&apos;t expensive at all. The cost came from the industry&apos;s way of doing things. By building rockets in-house from those raw materials, SpaceX cut launch costs by over 90%, fundamentally changing the space industry.
        </p>

        <blockquote>
          <p>
            It is important to view knowledge as sort of a semantic tree - make sure you understand the fundamental principles, i.e., the trunk and big branches, before you get into the leaves/details or there is nothing for them to hang onto.
          </p>
          <footer className="text-sm text-muted-foreground">
            - Elon Musk
          </footer>
        </blockquote>

        <p>
          This works at smaller scales too. As an engineer, I&apos;ve found that the hardest bugs aren&apos;t the complex ones - they&apos;re the ones where I&apos;m carrying wrong assumptions. When a system behaves unexpectedly, my instinct is to reach for what worked last time. But the real fix often comes from stepping back and asking: "What is actually happening here? What do I know for certain versus what am I assuming?" Stripping away assumptions and looking at the raw facts almost always leads to a clearer, faster solution.
        </p>
        <p>
          The Socratic method works on the same principle. Keep asking "why" until you get past the surface. Ask it five times in a row, and you&apos;ll often arrive at a root cause that was invisible at first glance.
        </p>

        <blockquote>
          <p>
            Divide each difficulty into as many parts as is feasible and necessary to resolve it.
          </p>
          <footer className="text-sm text-muted-foreground">
            - Rene Descartes
          </footer>
        </blockquote>

        <h2>Why It&apos;s Hard</h2>
        <p>
          First principles thinking goes against how our brains naturally work. We&apos;re wired for speed - pattern matching, mental shortcuts, quick comparisons. These are useful for everyday survival, but they can block genuine understanding. Thinking from first principles requires slowing down, questioning things that seem obvious, and sitting with uncertainty for a while. It takes more effort, but the payoff is ideas and solutions that you simply can&apos;t reach by following conventional thinking.
        </p>
        <p>
          It also benefits from drawing on multiple disciplines. Climate change, for instance, can&apos;t be understood through biology alone or economics alone - it requires combining insights from physics, chemistry, sociology, and policy. First principles thinking naturally encourages this cross-disciplinary approach because it forces you to look at what&apos;s actually true, regardless of which field that truth comes from.
        </p>

        <hr />

        <h2>How to Apply It: Seven Steps</h2>
        <ol>
          <li>
            <strong>Define the problem clearly.</strong> Be specific about what you&apos;re trying to solve. A vague problem leads to vague thinking.
          </li>
          <li>
            <strong>Break it apart.</strong> Separate what you genuinely know from what you&apos;ve assumed or been told.
          </li>
          <li>
            <strong>Challenge every assumption.</strong> Question the "facts," the methods, and the beliefs surrounding the problem. Ask: "Is this actually true, or is it just how things have always been done?"
          </li>
          <li>
            <strong>Find the fundamentals.</strong> Identify the basic truths - things you can verify, test, or prove.
          </li>
          <li>
            <strong>Rebuild from those fundamentals.</strong> Start constructing your solution using only what you&apos;ve verified. This is where original thinking happens.
          </li>
          <li>
            <strong>Create new solutions.</strong> With a clean foundation, you&apos;ll often find approaches that weren&apos;t visible before.
          </li>
          <li>
            <strong>Test and refine.</strong> Put your solution into practice, observe the results, and improve.
          </li>
        </ol>

        <Image
          src={stepsImg}
          alt="Seven steps of First Principles Thinking"
          className="mx-auto my-8 max-w-md"
          placeholder="blur"
        />

        <h3>Practical Tips</h3>
        <ul>
          <li>
            <strong>Be careful with analogies.</strong> They&apos;re useful for explaining ideas, but dangerous as a basis for thinking. "It&apos;s like X" can lock you into X&apos;s constraints.
          </li>
          <li>
            <strong>Keep asking "why."</strong> Not once - repeatedly. Each answer peels back a layer.
          </li>
          <li>
            <strong>Stay open to being wrong.</strong> First principles thinking often reveals that something you were sure about isn&apos;t quite right.
          </li>
          <li>
            <strong>Talk it through.</strong> Conversations with others expose blind spots and unexamined assumptions faster than thinking alone.
          </li>
        </ul>

        <hr />

        <h2>Feynman: The Great Explainer</h2>
        <p>
          No discussion of first principles is complete without Richard Feynman. He believed that if you can&apos;t explain something simply, you don&apos;t really understand it. His "Feynman Lectures on Physics" break down sophisticated concepts to their core, building understanding from the ground up rather than relying on memorization.
        </p>

        <Image
          src={feynmanImg}
          alt="Richard Feynman"
          className="mx-auto my-8 max-w-lg"
          placeholder="blur"
        />

        <blockquote>
          <p>
            The first principle is that you must not fool yourself - and you are the easiest person to fool.
          </p>
          <footer className="text-sm text-muted-foreground">
            - Richard Feynman
          </footer>
        </blockquote>

        <Image
          src={wideImg}
          alt="First Principles Thinking"
          className="my-8 w-full"
          placeholder="blur"
        />

        <h3>The Feynman Technique</h3>
        <p>
          Feynman&apos;s approach to learning is itself a first principles method. It works in four steps:
        </p>
        <ol>
          <li><strong>Pick a concept</strong> you want to understand.</li>
          <li><strong>Explain it in plain language,</strong> as if teaching someone with no background in the subject.</li>
          <li><strong>Find the gaps</strong> - the parts where your explanation breaks down or gets vague.</li>
          <li><strong>Go back, study those gaps, and simplify again.</strong></li>
        </ol>
        <p>
          This cycle of explain, identify gaps, and simplify forces genuine understanding. If your explanation requires jargon or hand-waving, you haven&apos;t understood it well enough yet.
        </p>

        <hr />

        <h2>Key Takeaway</h2>
        <p>
          First principles thinking isn&apos;t about being smarter - it&apos;s about being more honest with yourself about what you actually know versus what you&apos;ve assumed. It&apos;s slower than going with your gut, but it leads to clearer thinking and more original solutions. The next time you&apos;re stuck on a problem, try this: stop looking for a similar problem someone else has solved, and instead ask yourself, "What is fundamentally true here?" You might be surprised where that question takes you.
        </p>

        <p>
          I&apos;ll leave you with a wonderful documentary where Feynman himself demonstrates this kind of thinking - making the complex world of physics genuinely fascinating and accessible.
        </p>

        <div className="my-8 overflow-hidden rounded-lg">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/nYg6jzotiAc"
            title="Feynman: FUN TO IMAGINE (1983)"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <RelatedPosts slug="beyond-the-obvious-seeing-through-the-lens-of-first-principles" />
    </article>
  );
}
