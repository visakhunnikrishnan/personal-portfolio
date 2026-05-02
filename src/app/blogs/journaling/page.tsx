import type { Metadata } from "next";
import Image from "next/image";

import heroImg from "../../../../public/blog/journaling/journaling.webp";
import { RelatedPosts } from "@/components/related-posts";
import { JournalingMechanisms } from "@/components/journaling-mechanisms";
import { JournalingWorkingMemory } from "@/components/journaling-working-memory";
import { JournalingReemployment } from "@/components/journaling-reemployment";
import { JournalingEffectSizes } from "@/components/journaling-effect-sizes";
import { JournalingNarrativeCoherence } from "@/components/journaling-narrative-coherence";
import { JournalingTypesComparison } from "@/components/journaling-types-comparison";

export const metadata: Metadata = {
  title: "Journalling",
  description:
    "Why writing things down brings clarity - the four cognitive mechanisms that explain it, and what the research actually says about how to journal properly.",
  keywords: [
    "journaling science",
    "expressive writing",
    "Pennebaker",
    "cognitive offloading",
    "working memory",
    "self-distancing",
    "Kross Ayduk",
    "narrative coherence",
    "gratitude journaling",
    "Emmons McCullough",
    "writing therapy",
    "journaling research",
    "writing to learn",
    "Galbraith",
    "system 1 system 2",
  ],
  openGraph: {
    title: "Journalling",
    description:
      "Why writing things down brings clarity - the four cognitive mechanisms that explain it, and what the research actually says about how to journal properly.",
    type: "article",
    publishedTime: "2026-05-02",
    authors: ["Visakh Unni"],
    images: [
      {
        url: "https://www.visakhunni.com/blog/journaling/journaling.webp",
        width: 1200,
        height: 630,
        alt: "Journalling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journalling",
    description:
      "Why writing things down brings clarity - the four cognitive mechanisms that explain it, and what the research actually says about how to journal properly.",
    images: [
      "https://www.visakhunni.com/blog/journaling/journaling.webp",
    ],
  },
};

export default function JournalingBlog() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Journalling
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-05-02">May 2, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>16 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="An open notebook and a pen on a wooden desk in soft morning light"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          I was talking with a colleague the other day about journaling, and
          we both noticed the same thing - when you write something down,
          you usually feel clearer than you did a minute ago. My guess was
          that writing slows your thinking down and makes you actually look
          at what you&apos;re thinking. I wanted to know if that was right,
          and what researchers have figured out about doing it properly.
          This post is what I found - why writing brings clarity, and how
          to do it so the effect actually shows up.
        </p>

        <hr />

        {/* ── INTRO: THE FOUR MECHANISMS ── */}

        <p>
          The short answer to my hunch is: yes, slowing down matters, but
          it is only one of four things going on. Researchers have found
          that writing does four things to your thinking at the same
          time. It{" "}
          <strong>clears space in your short-term memory</strong>, it{" "}
          <strong>forces a tangle of parallel thoughts into a single line
          of words</strong>, it{" "}
          <strong>shifts you out of fast, automatic thinking into slower,
          deliberate thinking</strong>, and it{" "}
          <strong>lets you look at your own thinking from the outside</strong>.
          The clarity you feel is what happens when those four things line
          up at once.
        </p>

        <JournalingMechanisms />

        <p>
          The rest of this post walks through each of those four ideas one
          by one, looks at the research behind them, and ends with the
          simple protocol used in most studies - so you can apply best
          practices to journalling and do it properly.
        </p>

        {/* ── SECTION 1: WORKING MEMORY ── */}

        <h2>The Tiny Workbench in Your Head</h2>

        <p>
          The first reason is simple: your brain runs out of room. In 1956,
          the Princeton psychologist <strong>George A. Miller</strong> wrote
          a famous paper called &ldquo;The Magical Number Seven, Plus or
          Minus Two&rdquo; in <em>Psychological Review</em>, arguing that
          we can hold around seven things in our head at once{" "}
          <a href="#ref-1">[1]</a>. Forty-five years later,{" "}
          <strong>Nelson Cowan</strong> at the University of Missouri
          revised that number down. When you take away mental tricks like
          repeating things to yourself, your real working memory holds
          closer to <strong>four things at a time</strong>{" "}
          <a href="#ref-2">[2]</a>. Either way, your conscious workspace
          is surprisingly small.
        </p>

        <JournalingWorkingMemory />

        <p>
          When a worry keeps circling in your head, it is taking up one of
          those slots. <strong>Kitty Klein</strong> and{" "}
          <strong>Adriel Boals</strong> at North Carolina State University
          tested this directly in 2001. Students who wrote about something
          emotional for a few short sessions ended up with{" "}
          <strong>more usable working memory</strong> than students who
          wrote about something trivial - and the ones whose writing showed
          the most thinking-it-through (using words like{" "}
          <em>because</em> and <em>realize</em>) gained the most{" "}
          <a href="#ref-3">[3]</a>. The simple idea is this: once the worry
          is on paper, it stops looping in your head, and the slot it was
          taking up frees up for everything else.
        </p>

        <p>
          The same effect shows up under real pressure. In 2011,{" "}
          <strong>Gerardo Ramirez</strong> and <strong>Sian Beilock</strong>{" "}
          at the University of Chicago had ninth-graders write for ten
          minutes about their worries right before a final exam. Just that
          brief writing exercise{" "}
          <strong>closed the gap between anxious and non-anxious
          students</strong> - apparently because the worry was now on the
          page instead of using up working memory during the test{" "}
          <a href="#ref-4">[4]</a>. Researchers{" "}
          <strong>Evan Risko</strong> and <strong>Sam Gilbert</strong>{" "}
          described the bigger pattern in 2016: people constantly use
          outside tools - writing notes, setting reminders, even tilting
          their head while solving a puzzle - to take some of the load off
          their brain <a href="#ref-5">[5]</a>. A journal is one more tool
          in that family. It is an external hard drive for your thinking.
        </p>

        {/* ── SECTION 2: LINEARIZATION ── */}

        <h2>Why Writing Forces Order</h2>

        <p>
          Thoughts happen all at once. Sentences do not. What it feels like
          to think about something is a swirl of images, feelings, and
          half-formed objections all happening together. But a sentence has
          to start somewhere, end somewhere, and pick one verb in the
          middle. The act of turning that swirl into a sentence{" "}
          <em>is</em> a kind of analysis.
        </p>

        <p>
          The educational psychologist{" "}
          <strong>David Galbraith</strong> at the University of Southampton
          has spent two decades making a stronger version of this argument:
          writing does not just <em>report</em> ideas you already have, it{" "}
          <em>creates new ones</em>. In a 1999 chapter on writing as a
          knowledge-building process <a href="#ref-6">[6]</a>, and in a
          2018 paper with <strong>Veerle Baaijen</strong> with the great
          title &ldquo;The work of writing: Raiding the inarticulate&rdquo;{" "}
          <a href="#ref-7">[7]</a>, Galbraith&apos;s point is that your
          knowledge is scattered across your memory in fragments, and forcing
          those fragments through a single line of words pulls out
          connections you did not know you had. Earlier work by{" "}
          <strong>Linda Flower</strong> and <strong>John Hayes</strong>{" "}
          (1981) made a related point: writing is a back-and-forth between
          planning, putting it into words, and reviewing what you just
          wrote - and the &ldquo;putting it into words&rdquo; step is where
          vague intent becomes something specific you can look at{" "}
          <a href="#ref-8">[8]</a>. <strong>Perry D. Klein</strong>&apos;s
          1999 review summed up the wider research on writing-to-learn:
          once your thoughts are text on a page, you can re-read them,
          argue with them, and notice things in them that you couldn&apos;t
          while they were still inside your head{" "}
          <a href="#ref-9">[9]</a>.
        </p>

        <p>
          The takeaway for a journaler is simple. &ldquo;I feel weird about
          Tuesday&rdquo; is a fog. &ldquo;I feel weird about Tuesday
          because the manager&apos;s email made it sound like he&apos;s
          already decided&rdquo; is a claim - and a claim is something
          you can actually examine.
        </p>

        {/* ── SECTION 3: SLOW THINKING ── */}

        <h2>The Slowness Is the Point</h2>

        <p>
          The Nobel laureate <strong>Daniel Kahneman</strong> turned this
          idea into a famous framework in his 2011 book{" "}
          <em>Thinking, Fast and Slow</em>. He split human thinking into two
          modes. <strong>System 1</strong> is fast, automatic, and
          emotional - the gut reactions and quick judgments you make
          without thinking. <strong>System 2</strong> is slow, deliberate,
          and analytical - the part of you that actually works through a
          problem step by step <a href="#ref-10">[10]</a>. Most of the time,
          System 1 generates impressions and feelings, and System 2 just
          rubber-stamps them without checking. Kahneman&apos;s big point is
          that this lazy default is where most of our thinking errors come
          from.
        </p>

        <p>
          Here is where writing comes in. Handwriting at around 20 words a
          minute, or even typing at 60, is incredibly slow compared to the
          speed of your inner voice. That slowness is not a bug of
          journaling - it is the whole point. The pace of the pen forces
          System 2 to wake up. You have to hold one thought in your head
          long enough to finish a sentence about it. Contradictions you
          would normally skip past become visible. And the lazy phrases
          your head likes to repeat - &ldquo;nothing ever works out&rdquo;,
          &ldquo;I always mess this up&rdquo; - look thinner and less
          convincing once they sit in ink under a desk lamp.
        </p>

        <div className="not-prose my-6 rounded-lg border border-border bg-muted/50 px-5 py-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p className="mb-1 font-semibold text-foreground">
            Why typing might not work as well
          </p>
          <p>
            A few studies (the best known is Mueller &amp; Oppenheimer
            2014) have found that people remember and understand less when
            they type than when they write by hand. The reason is roughly
            this: typing is fast enough that you can copy what you hear
            word-for-word, while handwriting forces you to put things in
            your own words. The journaling research does not strictly
            require pen and paper, but if you notice yourself typing on
            autopilot, it is worth switching to a notebook.
          </p>
        </div>

        {/* ── SECTION 4: SELF-DISTANCING ── */}

        <h2>Looking at Yourself From the Outside</h2>

        <p>
          A separate line of research, mostly from the University of
          Michigan psychologist <strong>Ethan Kross</strong> and the
          Berkeley psychologist <strong>&Ouml;zlem Ayduk</strong>, points
          to a fourth thing writing does: it lets you step outside yourself.
          When people think about a painful experience{" "}
          <em>as themselves</em>, in the first person, they tend to{" "}
          <em>relive</em> it - the old feelings come right back. When they
          think about it from a distance - picturing the scene as if they
          were watching it from across the room, or even using their own
          name - they <em>make sense</em> of it instead of reliving it.
        </p>

        <p>
          In a 2005 paper, Kross, Ayduk, and{" "}
          <strong>Walter Mischel</strong> showed that asking yourself{" "}
          <em>why</em> you feel a certain way only makes things worse if
          you stay stuck in your own head. Asked from a distance, the same
          question gives you actual insight instead of more spinning{" "}
          <a href="#ref-11">[11]</a>. A 2010 follow-up by Ayduk and Kross
          found that people who naturally stepped back when remembering a
          fight or a slight not only felt less upset, but their bodies were{" "}
          <strong>also</strong> less stressed - lower heart-rate and
          blood-pressure spikes - and they were less likely to lash out at
          others later <a href="#ref-12">[12]</a>. A 2014 paper went even
          further: across seven experiments, simply talking to yourself by
          your own name (&ldquo;Why is Visakh nervous?&rdquo;) or as
          &ldquo;you&rdquo; instead of &ldquo;I&rdquo; was enough to lower
          stress and help people perform better in a tough first impression
          and a public-speaking task <a href="#ref-13">[13]</a>.
        </p>

        <p>
          A 2017 brain-imaging study by{" "}
          <strong>Jason Moser</strong> at Michigan State, with Kross and
          others, looked at what was actually happening in the brain. They
          found that this kind of distanced self-talk{" "}
          <strong>calmed the emotional response in less than a second, and
          did it without using the brain regions you would normally need
          for hard mental effort</strong> <a href="#ref-14">[14]</a>. In
          plain terms: distancing is cheap. It does not feel like white-
          knuckle willpower, because it isn&apos;t.
        </p>

        <p>
          The clearest link between this work and journaling came in 2016,
          when <strong>Park, Ayduk, and Kross</strong> ran two studies on
          people doing the standard expressive-writing exercise. They found
          that people who wrote about something painful the day before
          showed more of this stepping-back the next day - and the more
          they stepped back, the less the experience bothered them a month
          later, and even six months later. When the researchers analyzed
          the essays themselves, they saw the same pattern that keeps
          showing up:{" "}
          <strong>more cause-and-insight words and fewer
          &ldquo;I&rdquo;s</strong> as the writing went on{" "}
          <a href="#ref-15">[15]</a>. The page literally helps you step
          back.
        </p>

        {/* ── SECTION 5: PENNEBAKER ── */}

        <h2>Pennebaker&apos;s Fifteen Minutes</h2>

        <p>
          Most of the research in this area traces back to one person:{" "}
          <strong>James W. Pennebaker</strong>, now emeritus at the
          University of Texas at Austin. In a 1986 paper with{" "}
          <strong>Sandra Beall</strong>, Pennebaker introduced the simple
          method that has since been studied for nearly forty years. Write
          for fifteen minutes a day, on four days in a row, about
          something that has been on your mind. Don&apos;t worry about
          grammar or style <a href="#ref-16">[16]</a>. That is the whole
          protocol. One hour of writing, spread across four sittings.
        </p>

        <p>
          Pennebaker spent the rest of his career figuring out{" "}
          <em>which writers benefited and why</em>. The answer turned out
          to be hiding in the text itself. In a 1997 review{" "}
          <a href="#ref-22">[22]</a> and a 1999 paper with{" "}
          <strong>Janel Seagal</strong> titled &ldquo;Forming a story&rdquo;{" "}
          <a href="#ref-23">[23]</a>, Pennebaker ran computer analysis on
          hundreds of essays. The people who got the most out of writing
          weren&apos;t the ones who vented the hardest. They were the ones
          whose words, across the four days,{" "}
          <strong>shifted from reliving the experience to making sense of
          it</strong>. Their writing showed more and more cause-and-insight
          words - <em>because</em>, <em>realize</em>, <em>understand</em> -
          as the tangled situation got reshaped into a story with a
          beginning, a middle, and a meaning.
        </p>

        <JournalingNarrativeCoherence />

        <p>
          This is the &ldquo;why writing brings clarity&rdquo; question
          answered in one chart. The act of putting a tangled experience
          into cause-and-effect sentences <em>is</em> the clarity. It is
          also what ties the first four sections together. You offload, you
          line up your thoughts, you slow down, you step back - and what
          comes out the other side is a story you can look at, instead of
          a mood you are stuck inside.
        </p>

        <h3>How well does it actually work?</h3>

        <p>
          Two big reviews tell us how strong the effect actually is. A 1998
          review by <strong>Joshua Smyth</strong> pulled together 13
          randomized studies of healthy people and found a moderate effect
          across well-being, day-to-day functioning, and basic health
          markers <a href="#ref-20">[20]</a>. A larger 2006 review of 146
          studies by <strong>Joanne Frattaroli</strong> found a smaller but
          reliable average effect, and - more usefully - figured out{" "}
          <em>when</em> writing works best <a href="#ref-21">[21]</a>:
        </p>

        <ol>
          <li>at least <strong>three sessions</strong></li>
          <li><strong>more than fifteen minutes</strong> each</li>
          <li>done <strong>in private</strong></li>
          <li>
            on{" "}
            <strong>
              something that has been bothering you lately and that
              actually matters to you
            </strong>
          </li>
        </ol>

        <p>
          Those four conditions are basically the Pennebaker protocol.
        </p>

        <JournalingEffectSizes />

        <p>
          The effect is real but modest, and shows up most clearly in
          situations where having a clearer head obviously helps. The
          most striking example is a 1994 study by{" "}
          <strong>Spera, Buhrfeind, and Pennebaker</strong>. They followed
          a group of recently laid-off engineers, and randomly split them
          into three groups: write about losing the job, write about
          something unrelated, or don&apos;t write at all. Eight months
          later, <strong>53 percent of the writers about job loss had found
          new full-time work, versus 24 percent of the trivial-writers and
          14 percent of the non-writers</strong> <a href="#ref-19">[19]</a>.
          Same r&eacute;sum&eacute;s, same job market. The writing group
          was simply easier to be around in an interview. Clarity has
          knock-on effects.
        </p>

        <JournalingReemployment />

        {/* ── SECTION 5.5: TYPES OF JOURNALING ── */}

        <h2>Not All Journaling Is the Same</h2>

        <p>
          Almost all of the research above is on Pennebaker-style expressive
          writing. But people journal in lots of other ways too - gratitude
          lists, CBT thought records, morning pages (a daily stream of
          consciousness, popularized by Julia Cameron&apos;s{" "}
          <em>The Artist&apos;s Way</em>), and bullet journals (a structured
          log of tasks and notes). The research is uneven across them.
        </p>

        <JournalingTypesComparison />

        <p>
          Two things are worth noticing. First, the formats with the most
          research evidence are not always the most popular. Expressive
          writing has around 150 RCTs behind it. CBT thought records inherit
          a huge body of evidence from CBT as a whole - the strongest
          evidence base of any psychotherapy{" "}
          <a href="#ref-28">[28]</a>. Gratitude journaling has solid but
          smaller effects, and they tend to shrink when compared to other
          active activities <a href="#ref-27">[27]</a>. Morning pages and
          bullet journaling - the two formats most likely to show up on
          social media - have basically no controlled trials at all. They
          might still help; they just have not been tested.
        </p>

        <p>
          Second, different formats fit different goals. If something is
          actively bothering you, expressive writing is the most direct
          match. If you want a steady daily habit that nudges your mood
          upward over time, gratitude journaling is well-supported. If you
          have specific negative thought patterns you want to challenge,
          CBT thought records are the right tool - though they work best as
          part of therapy, not on your own.
        </p>

        {/* ── SECTION 6: HOW TO JOURNAL ── */}

        <h2>How to Journal, According to the Data</h2>

        <p>
          The method that produced almost every result above is plain. Pick
          one thing that has been bothering you. Write about it for{" "}
          <strong>fifteen to twenty minutes, on three or four days in a
          row</strong> <a href="#ref-16">[16]</a>
          <a href="#ref-21">[21]</a>. Don&apos;t stop to fix grammar. Write
          about both <em>what happened</em> and{" "}
          <em>how you feel about it</em>. Keep what you write private.
          Expect to feel a little worse on the day itself, and noticeably
          better in the weeks after. The effect is biggest when you write
          at home, alone, about something current and personal{" "}
          <a href="#ref-21">[21]</a>.
        </p>

        <h3>Three variations worth knowing</h3>

        <p>
          <strong>Gratitude journaling.</strong> In a 2003 study,{" "}
          <strong>Robert Emmons</strong> and{" "}
          <strong>Michael McCullough</strong> had people write weekly or
          daily lists of either things they were grateful for, things that
          had annoyed them, or neutral events. Across three studies - one
          of them with adults who had a serious neuromuscular disease - the
          gratitude writers reported feeling more positive, more
          optimistic, exercising more, having fewer physical complaints,
          and <strong>sleeping longer and better</strong>{" "}
          <a href="#ref-24">[24]</a>. Different focus, same notebook.
        </p>

        <p>
          <strong>The pre-performance worry dump.</strong> Based on the
          Ramirez and Beilock study <a href="#ref-4">[4]</a>, spending ten
          minutes writing out your worries right before a big test,
          interview, or presentation can free up working memory just in
          time to use it. It is the same idea as Section 1, just on a much
          tighter clock.
        </p>

        <p>
          <strong>Switch pronouns when you are stuck.</strong> Building on
          the Kross and Ayduk work <a href="#ref-13">[13]</a>{" "}
          <a href="#ref-15">[15]</a>, try writing a paragraph about
          yourself in the third person -{" "}
          &ldquo;Why does Visakh feel this way? What should Visakh do?&rdquo;.
          It produces a real cooling effect that &ldquo;I&rdquo; tends to
          block. It feels strange the first time. It still works.
        </p>

        <p>
          <strong>The bedtime to-do list.</strong> A 2018 study by{" "}
          <strong>Michael Scullin</strong> and colleagues at Baylor
          monitored 57 people in a sleep lab and asked them to spend five
          minutes before bed either writing tomorrow&apos;s to-do list or
          a list of things they had finished that day. The to-do list
          group fell asleep <strong>about nine minutes faster</strong> -
          and the more specific the list, the faster they fell asleep{" "}
          <a href="#ref-25">[25]</a>. The reason is the same as Section 1:
          getting tomorrow out of your head and onto paper frees up the
          mental slot it was using.
        </p>

        <h3>Honest cautions</h3>

        <p>The evidence is real, but a few things are worth saying plainly.</p>

        <ul>
          <li>
            The effects are strongest for short-term feelings and modest
            physical-health markers. Claims that journaling will transform
            your personality go beyond what the data actually shows.
          </li>
          <li>
            The first session usually feels worse, not better. Both big
            reviews mention this short-term sting that goes away on its own{" "}
            <a href="#ref-20">[20]</a>
            <a href="#ref-21">[21]</a>.
          </li>
          <li>
            If you are in a real crisis or have PTSD, do this kind of work
            with a therapist, not alone. The research was done mostly with
            healthy people.
          </li>
          <li>
            A streak is not the goal. The Pennebaker protocol is three or
            four days, not three or four years. It is fine to stop.
          </li>
          <li>
            Don&apos;t analyze the good stuff. A series of studies by{" "}
            <strong>Sonja Lyubomirsky</strong> and colleagues found that
            writing about <em>positive</em> events actually reduced
            well-being compared with simply replaying or savoring them in
            your head <a href="#ref-26">[26]</a>. Save expressive writing
            for the difficult things; let the good things stay good.
          </li>
        </ul>

        {/* ── SECTION 7: THE BOTTOM LINE ── */}

        <h2>The Bottom Line</h2>

        <p>
          So the observation - that writing brings clarity -
          turned out to have a four-part answer. The page is a place to
          park what your short-term memory can&apos;t hold, a tool that
          forces you to slow down, a way to step outside yourself, and a
          frame for turning a mess into a story - all at once. Your head
          holds less and runs faster than it feels like; writing is one of
          the cheapest fixes we have for both.
        </p>

        <blockquote>
          The reason writing brings clarity isn&apos;t poetry, willpower,
          or venting. It&apos;s that putting words on a page uses four
          parts of your thinking together that almost never line up otherwise.
          What that line-up feels like, from the inside, is clarity.
        </blockquote>

        <p>
          If you want to try it, the method is the one Pennebaker tested
          back in 1986: fifteen minutes, four days, one honest topic. You
          don&apos;t need a beautiful notebook. You don&apos;t even need to
          keep what you write. You just need to slow down enough that the
          words on the page can get ahead of the noise in your head.
        </p>

        <hr />

        {/* ── REFERENCES ── */}

        <h2>References</h2>

        <div className="text-sm leading-relaxed">
          <h3>Working memory and cognitive offloading</h3>
          <ol>
            <li id="ref-1">
              Miller GA (1956). &ldquo;The magical number seven, plus or
              minus two: Some limits on our capacity for processing
              information.&rdquo; <em>Psychological Review</em>,
              63(2):81&ndash;97.{" "}
              <a
                href="https://doi.org/10.1037/h0043158"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-2">
              Cowan N (2001). &ldquo;The magical number 4 in short-term
              memory: A reconsideration of mental storage capacity.&rdquo;{" "}
              <em>Behavioral and Brain Sciences</em>, 24(1):87&ndash;114.{" "}
              <a
                href="https://doi.org/10.1017/S0140525X01003922"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-3">
              Klein K, Boals A (2001). &ldquo;Expressive writing can
              increase working memory capacity.&rdquo;{" "}
              <em>Journal of Experimental Psychology: General</em>,
              130(3):520&ndash;533.{" "}
              <a
                href="https://doi.org/10.1037/0096-3445.130.3.520"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-4">
              Ramirez G, Beilock SL (2011). &ldquo;Writing about testing
              worries boosts exam performance in the classroom.&rdquo;{" "}
              <em>Science</em>, 331(6014):211&ndash;213.{" "}
              <a
                href="https://doi.org/10.1126/science.1199427"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-5">
              Risko EF, Gilbert SJ (2016). &ldquo;Cognitive offloading.&rdquo;{" "}
              <em>Trends in Cognitive Sciences</em>, 20(9):676&ndash;688.{" "}
              <a
                href="https://doi.org/10.1016/j.tics.2016.07.002"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
          </ol>

          <h3>Writing as thought: linearization and knowledge construction</h3>
          <ol start={6}>
            <li id="ref-6">
              Galbraith D (1999). &ldquo;Writing as a knowledge-constituting
              process.&rdquo; In Torrance M &amp; Galbraith D (Eds.),{" "}
              <em>Knowing what to write: Conceptual processes in text
              production</em> (pp. 139&ndash;160). Amsterdam University
              Press.
            </li>
            <li id="ref-7">
              Galbraith D, Baaijen VM (2018). &ldquo;The work of writing:
              Raiding the inarticulate.&rdquo;{" "}
              <em>Educational Psychologist</em>, 53(4):238&ndash;257.{" "}
              <a
                href="https://doi.org/10.1080/00461520.2018.1505515"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-8">
              Flower L, Hayes JR (1981). &ldquo;A cognitive process theory
              of writing.&rdquo;{" "}
              <em>College Composition and Communication</em>,
              32(4):365&ndash;387.{" "}
              <a
                href="https://doi.org/10.2307/356600"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-9">
              Klein PD (1999). &ldquo;Reopening inquiry into cognitive
              processes in writing-to-learn.&rdquo;{" "}
              <em>Educational Psychology Review</em>, 11(3):203&ndash;270.{" "}
              <a
                href="https://doi.org/10.1023/A:1021913217147"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
          </ol>

          <h3>System 1, System 2, and the slowness of writing</h3>
          <ol start={10}>
            <li id="ref-10">
              Kahneman D (2011). <em>Thinking, fast and slow</em>. New York:
              Farrar, Straus and Giroux.
            </li>
          </ol>

          <h3>Self-distancing and self-talk</h3>
          <ol start={11}>
            <li id="ref-11">
              Kross E, Ayduk &Ouml;, Mischel W (2005). &ldquo;When asking
              &lsquo;why&rsquo; does not hurt: Distinguishing rumination
              from reflective processing of negative emotions.&rdquo;{" "}
              <em>Psychological Science</em>, 16(9):709&ndash;715.{" "}
              <a
                href="https://doi.org/10.1111/j.1467-9280.2005.01600.x"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-12">
              Ayduk &Ouml;, Kross E (2010). &ldquo;From a distance:
              Implications of spontaneous self-distancing for adaptive
              self-reflection.&rdquo;{" "}
              <em>Journal of Personality and Social Psychology</em>,
              98(5):809&ndash;829.{" "}
              <a
                href="https://doi.org/10.1037/a0019205"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-13">
              Kross E, Bruehlman-Senecal E, Park J, et al. (2014).
              &ldquo;Self-talk as a regulatory mechanism: How you do it
              matters.&rdquo;{" "}
              <em>Journal of Personality and Social Psychology</em>,
              106(2):304&ndash;324.{" "}
              <a
                href="https://doi.org/10.1037/a0035173"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-14">
              Moser JS, Dougherty A, Mattson WI, et al. (2017). &ldquo;Third-
              person self-talk facilitates emotion regulation without
              engaging cognitive control: Converging evidence from ERP and
              fMRI.&rdquo; <em>Scientific Reports</em>, 7(1):4519.{" "}
              <a
                href="https://doi.org/10.1038/s41598-017-04047-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-15">
              Park J, Ayduk &Ouml;, Kross E (2016). &ldquo;Stepping back to
              move forward: Expressive writing promotes
              self-distancing.&rdquo; <em>Emotion</em>, 16(3):349&ndash;364.{" "}
              <a
                href="https://doi.org/10.1037/emo0000121"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
          </ol>

          <h3>The Pennebaker paradigm</h3>
          <ol start={16}>
            <li id="ref-16">
              Pennebaker JW, Beall SK (1986). &ldquo;Confronting a traumatic
              event: Toward an understanding of inhibition and
              disease.&rdquo; <em>Journal of Abnormal Psychology</em>,
              95(3):274&ndash;281.{" "}
              <a
                href="https://doi.org/10.1037/0021-843X.95.3.274"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-17">
              Pennebaker JW, Kiecolt-Glaser JK, Glaser R (1988).
              &ldquo;Disclosure of traumas and immune function: Health
              implications for psychotherapy.&rdquo;{" "}
              <em>Journal of Consulting and Clinical Psychology</em>,
              56(2):239&ndash;245.{" "}
              <a
                href="https://doi.org/10.1037/0022-006X.56.2.239"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-18">
              Pennebaker JW, Colder M, Sharp LK (1990). &ldquo;Accelerating
              the coping process.&rdquo;{" "}
              <em>Journal of Personality and Social Psychology</em>,
              58(3):528&ndash;537.{" "}
              <a
                href="https://doi.org/10.1037/0022-3514.58.3.528"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-19">
              Spera SP, Buhrfeind ED, Pennebaker JW (1994). &ldquo;Expressive
              writing and coping with job loss.&rdquo;{" "}
              <em>Academy of Management Journal</em>, 37(3):722&ndash;733.{" "}
              <a
                href="https://doi.org/10.2307/256708"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
          </ol>

          <h3>Meta-analyses and the narrative-coherence mechanism</h3>
          <ol start={20}>
            <li id="ref-20">
              Smyth JM (1998). &ldquo;Written emotional expression: Effect
              sizes, outcome types, and moderating variables.&rdquo;{" "}
              <em>Journal of Consulting and Clinical Psychology</em>,
              66(1):174&ndash;184.{" "}
              <a
                href="https://doi.org/10.1037/0022-006X.66.1.174"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-21">
              Frattaroli J (2006). &ldquo;Experimental disclosure and its
              moderators: A meta-analysis.&rdquo;{" "}
              <em>Psychological Bulletin</em>, 132(6):823&ndash;865.{" "}
              <a
                href="https://doi.org/10.1037/0033-2909.132.6.823"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-22">
              Pennebaker JW (1997). &ldquo;Writing about emotional
              experiences as a therapeutic process.&rdquo;{" "}
              <em>Psychological Science</em>, 8(3):162&ndash;166.{" "}
              <a
                href="https://doi.org/10.1111/j.1467-9280.1997.tb00403.x"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-23">
              Pennebaker JW, Seagal JD (1999). &ldquo;Forming a story: The
              health benefits of narrative.&rdquo;{" "}
              <em>Journal of Clinical Psychology</em>,
              55(10):1243&ndash;1254.
            </li>
          </ol>

          <h3>Gratitude journaling</h3>
          <ol start={24}>
            <li id="ref-24">
              Emmons RA, McCullough ME (2003). &ldquo;Counting blessings
              versus burdens: An experimental investigation of gratitude
              and subjective well-being in daily life.&rdquo;{" "}
              <em>Journal of Personality and Social Psychology</em>,
              84(2):377&ndash;389.{" "}
              <a
                href="https://doi.org/10.1037/0022-3514.84.2.377"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
          </ol>

          <h3>Other formats, sleep, and cautions</h3>
          <ol start={25}>
            <li id="ref-25">
              Scullin MK, Krueger ML, Ballard HK, Pruett N, Bliwise DL
              (2018). &ldquo;The effects of bedtime writing on difficulty
              falling asleep: A polysomnographic study comparing to-do
              lists and completed activity lists.&rdquo;{" "}
              <em>Journal of Experimental Psychology: General</em>,
              147(1):139&ndash;146.{" "}
              <a
                href="https://doi.org/10.1037/xge0000374"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-26">
              Lyubomirsky S, Sousa L, Dickerhoof R (2006). &ldquo;The costs
              and benefits of writing, talking, and thinking about
              life&apos;s triumphs and defeats.&rdquo;{" "}
              <em>Journal of Personality and Social Psychology</em>,
              90(4):692&ndash;708.{" "}
              <a
                href="https://doi.org/10.1037/0022-3514.90.4.692"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-27">
              Cregg DR, Cheavens JS (2021). &ldquo;Gratitude
              interventions: Effective self-help? A meta-analysis of the
              impact on symptoms of depression and anxiety.&rdquo;{" "}
              <em>Journal of Happiness Studies</em>,
              22(1):413&ndash;445.{" "}
              <a
                href="https://doi.org/10.1007/s10902-020-00236-6"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-28">
              Hofmann SG, Smits JAJ (2008). &ldquo;Cognitive-behavioral
              therapy for adult anxiety disorders: A meta-analysis of
              randomized placebo-controlled trials.&rdquo;{" "}
              <em>Journal of Clinical Psychiatry</em>,
              69(4):621&ndash;632.{" "}
              <a
                href="https://doi.org/10.4088/jcp.v69n0415"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
          </ol>
        </div>
      </div>

      <RelatedPosts slug="journaling" />
    </article>
  );
}
