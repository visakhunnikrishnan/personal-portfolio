import type { Metadata } from "next";
import Image from "next/image";

import heroImg from "../../../../public/blog/the-science-of-meditation/meditation.webp";
import { RelatedPosts } from "@/components/related-posts";
import { MeditationResearchGrowth } from "@/components/meditation-research-growth";
import { MeditationEffectSizes } from "@/components/meditation-effect-sizes";
import { MBSRvsSSRI } from "@/components/mbsr-vs-ssri";
import { MeditationBenefitsTimeline } from "@/components/meditation-benefits-timeline";
import { MeditationAdverseEffects } from "@/components/meditation-adverse-effects";
import { MeditationTypesComparison } from "@/components/meditation-types-comparison";

export const metadata: Metadata = {
  title: "The Science of Meditation",
  description:
    "What 30,000 studies reveal about meditation's effects on your brain, stress, and mental health  - the evidence, the mechanisms, and the risks nobody talks about.",
  keywords: [
    "meditation science",
    "mindfulness research",
    "MBSR",
    "meditation brain changes",
    "meditation anxiety",
    "meditation depression",
    "meditation side effects",
    "mindfulness evidence",
    "meditation meta-analysis",
    "MBCT",
    "loving-kindness meditation",
    "meditation neuroscience",
    "default mode network",
    "meditation adverse effects",
  ],
  openGraph: {
    title: "The Science of Meditation",
    description:
      "What 30,000 studies reveal about meditation's effects on your brain, stress, and mental health  - the evidence, the mechanisms, and the risks nobody talks about.",
    type: "article",
    publishedTime: "2026-02-10",
    authors: ["Visakh Unni"],
    images: [
      {
        url: "https://www.visakhunni.com/blog/the-science-of-meditation/meditation.webp",
        width: 1200,
        height: 630,
        alt: "The Science of Meditation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Science of Meditation",
    description:
      "What 30,000 studies reveal about meditation's effects on your brain, stress, and mental health  - the evidence, the mechanisms, and the risks nobody talks about.",
    images: [
      "https://www.visakhunni.com/blog/the-science-of-meditation/meditation.webp",
    ],
  },
};

export default function MeditationBlog() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          The Science of Meditation
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-02-10">Feb 10, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>30 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="A person meditating in a sunlit field at golden hour"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          I used to listen to Huberman Lab episodes on meditation and kept
          hearing claims that sounded almost too good - rewires your brain,
          lowers inflammation, works as well as drugs. I wanted to check for
          myself whether any of this holds up. So I went through the actual
          research: meta-analyses, RCTs, neuroscience papers, adverse effect
          studies. What I found was more nuanced than I expected. Over 30,000
          studies and $5 billion in research funding have produced a clear but
          complicated picture - meditation genuinely changes your brain, your
          stress biology, and your mental health. But it&apos;s not magic,
          it&apos;s not risk-free, and it&apos;s not superior to other
          interventions. Here&apos;s what I found.
        </p>

        <hr />

        {/* ── SECTION 1: HISTORY ── */}

        <h2>How We Got Here: From EEG Labs to 30,000 Studies</h2>

        <p>
          Scientists started studying meditation with EEG machines back in
          the 1950s, but the first real breakthrough came in 1970.{" "}
          <strong>Robert Keith Wallace</strong> published a study on
          Transcendental Meditation in the journal <em>Science</em>, showing
          that meditators entered a distinct physiological state{" "}<a href="#ref-45">[45]</a>. This got the
          attention of <strong>Herbert Benson</strong> at Harvard, who found
          that meditators used 17% less oxygen, had lower heart rates, and
          produced more theta brain waves (slow 4&ndash;8 Hz waves your brain
          makes during deep relaxation). Benson turned this into a bestselling
          book called <em>The Relaxation Response</em> (1975){" "}<a href="#ref-46">[46]</a>, and meditation
          got its first foothold in mainstream medicine.
        </p>

        <p>
          The bigger shift came in <strong>1979</strong>.{" "}
          <strong>Jon Kabat-Zinn</strong>, a molecular biologist from MIT,
          started the Stress Reduction Clinic at the University of Massachusetts
          Medical Center. He created an 8-week program called{" "}
          <strong>Mindfulness-Based Stress Reduction (MBSR)</strong> that became
          the gold standard for meditation research. His first study (1982) was
          promising: half of 51 chronic pain patients who hadn&apos;t gotten
          better with conventional treatment reported 50% improvement after
          MBSR{" "}<a href="#ref-41">[41]</a>. By 2015, nearly 80% of U.S. medical schools were teaching some
          form of mindfulness.
        </p>

        <p>
          Then the research exploded. The number of randomized controlled
          trials (RCTs - the gold standard of medical evidence) went from just 1
          in 1995&ndash;1997 to 216 in 2013&ndash;2015. By September 2023,
          there were 29,045 articles on meditation or mindfulness in the Scopus
          database{" "}<a href="#ref-3">[3]</a>.
        </p>

        <MeditationResearchGrowth />

        <p>
          A big reason this took off was the{" "}
          <strong>Mind &amp; Life Institute</strong>, which started in 1991
          after the Dalai Lama sat down with neuroscientists for the first time
          in 1987. In 2003, they organized a public event at MIT that drew 1,200
          people, including Nobel laureate Daniel Kahneman. That event is often
          called the moment meditation research became a serious scientific
          field.
        </p>

        <div className="not-prose my-6 rounded-lg border border-border bg-muted/50 px-5 py-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p className="mb-1 font-semibold text-foreground">
            A note on the evidence
          </p>
          <p>
            Before we go further, a word of caution. In 2018, 15 researchers
            from Harvard, Brown, Stanford and other institutions published a
            paper called &ldquo;Mind the Hype.&rdquo;{" "}<a href="#ref-4">[4]</a> Their point: meditation
            research has real problems. You can&apos;t blind people (they know
            if they&apos;re meditating or not). There&apos;s no real placebo.
            People who sign up for meditation studies are already interested in
            meditation. Many brain-imaging studies had tiny samples. And
            journals are far more likely to publish positive results than null
            ones. The science is promising, but it&apos;s not as airtight as
            the headlines suggest.
          </p>
        </div>

        {/* ── SECTION 2: BRAIN CHANGES ── */}

        <h2>What Happens Inside Your Brain</h2>

        <h3>Structural changes: thicker cortex, but not so fast</h3>

        <p>
          In 2005, <strong>Sara Lazar</strong> at Harvard was the first to
          show that meditation might physically change the brain. She compared
          20 experienced meditators (average 9 years of practice) with 15
          non-meditators and found that meditators had thicker cortex in the
          right anterior insula (involved in body awareness) and prefrontal
          cortex (involved in decision-making). Even more interesting: as
          non-meditators aged, their cortex got thinner - the normal pattern.
          Meditators showed almost no thinning at all.{" "}<a href="#ref-7">[7]</a>
        </p>

        <p>
          In 2011, <strong>Britta H&ouml;lzel</strong> took this further. She
          scanned 16 people before and after an 8-week MBSR (Mindfulness-Based
          Stress Reduction) program and found
          they had more gray matter - the tissue that contains most of
          your brain&apos;s neurons and does the actual processing - in the
          hippocampus (memory), posterior
          cingulate cortex (self-awareness), and temporo-parietal junction
          (empathy){" "}<a href="#ref-8">[8]</a>. In a related study, people who reported less stress after
          MBSR also showed a smaller amygdala - the brain&apos;s fear and
          threat center. That was the first time anyone linked meditation-related
          stress reduction to a physical change in that region{" "}<a href="#ref-9">[9]</a>.
        </p>

        <p>
          But here&apos;s where it gets complicated. In 2022,{" "}
          <strong>Kral et al.</strong> ran the largest and most carefully
          controlled version of this kind of study: 218 people who had never
          meditated, split into three groups (MBSR, an active control, and a
          waitlist), published in <em>Science Advances</em>. The result?{" "}
          <strong>No structural brain changes at all</strong> from 8-week MBSR
          compared to either control group. The earlier exciting findings from
          small studies didn&apos;t hold up when tested properly{" "}<a href="#ref-10">[10]</a>.
        </p>

        <p>
          One finding that has held up better comes from{" "}
          <strong>Eileen Luders</strong> at UCLA. She compared 50 long-term
          meditators with 50 matched non-meditators (ages 24&ndash;77) and used
          machine learning to estimate brain age. At age 50,{" "}
          <strong>
            meditators&apos; brains looked 7.5 years younger
          </strong>{" "}
          than their actual age. And the gap kept growing - every year past 50
          added another 1 month and 22 days to the difference{" "}<a href="#ref-11">[11]</a>.
        </p>

        <h3>Functional changes: the default mode network</h3>

        <p>
          Your brain has what scientists call a &ldquo;default mode
          network&rdquo; (DMN). It&apos;s the part of your brain that switches
          on when you&apos;re not focused on anything - when you&apos;re
          daydreaming, replaying conversations, or worrying about the future.
          When the DMN is overactive, it&apos;s linked to rumination and
          depression.
        </p>

        <p>
          In 2011, <strong>Judson Brewer</strong> scanned 12 experienced
          meditators (around 10,000 hours of practice) and found that their DMN
          was quieter across all three types of meditation tested. They also
          reported less mind-wandering. But the really interesting part: their
          brains showed stronger connections between the DMN and the regions
          responsible for focus and self-control. In other words, meditators
          were better at noticing when their mind wandered and pulling it back{" "}<a href="#ref-12">[12]</a>.
        </p>

        <p>
          <strong>Ga&euml;lle Desbordes</strong> took this a step further. After
          8 weeks of mindfulness training, people showed a
          calmer amygdala response to emotional images - and this happened even
          when they weren&apos;t meditating. Their brains had changed in a way
          that carried over into daily life. A separate group trained in
          compassion meditation showed the opposite pattern: their amygdala
          actually responded <em>more</em> to images of people suffering, and
          this correlated with lower depression scores. Compassion practice
          didn&apos;t numb people to pain - it made them more attuned to it{" "}<a href="#ref-13">[13]</a>.
        </p>

        <h3>Brainwaves: gamma, alpha, and theta</h3>

        <p>
          In 2004, <strong>Antoine Lutz</strong> at the University of Wisconsin
          hooked up eight Buddhist monks with 10,000 to 50,000 hours of
          practice to an EEG. During compassion meditation, their brains
          produced powerful{" "}
          <strong>gamma waves (25&ndash;42 Hz)</strong> - the fastest
          brainwaves your brain produces, associated with intense focus,
          heightened awareness, and learning. For reference, the theta
          waves from relaxation are 4&ndash;8 Hz, alpha waves (calm
          alertness) are 8&ndash;13 Hz, and gamma is 25&ndash;42 Hz -
          so the monks&apos; brains were firing at several times the
          speed of a relaxed brain. Neuroscientists had never
          seen anything like it. Even when the monks were just resting and not
          meditating, their gamma activity was elevated - and the more years of
          practice they had, the stronger it was. Their brains had been
          permanently rewired.{" "}<a href="#ref-14">[14]</a>
        </p>

        <p>
          Different types of meditation produce different brainwave
          patterns. <strong>Focused attention</strong> (like concentrating on
          your breath) increases alpha and theta waves - the kind you see in
          relaxed, alert states. <strong>Open monitoring</strong> (being aware
          of everything without focusing on anything) boosts theta and gamma
          waves. And <strong>loving-kindness</strong> meditation produces the
          strongest gamma response of all.
        </p>

        <p>
          There&apos;s also a fascinating finding about expertise.
          Brefczynski-Lewis et al. (2007) found that meditators with around
          19,000 hours of practice showed more brain activation during focus
          tasks than beginners - as you&apos;d expect. But meditators with
          around 44,000 hours showed <em>less</em> activation. Their brains
          had gotten so good at focusing that it no longer required effort{" "}<a href="#ref-15">[15]</a>.
        </p>

        {/* ── SECTION 3: WHAT THE EVIDENCE SHOWS ── */}

        <h2>What the Evidence Actually Shows</h2>

        <h3>Anxiety and depression: the strongest evidence</h3>

        <p>
          The most cited reference point in this field is{" "}
          <strong>Goyal et al. (2014)</strong> - a meta-analysis published
          in <em>JAMA Internal Medicine</em> that pooled 47 RCTs (randomized
          controlled trials) with 3,515
          participants. It found that meditation had moderate effects on anxiety
          (effect size 0.38), depression (0.30), and pain (0.33) after 8 weeks.
          Effect size is how researchers measure whether something actually
          works - 0.2 is considered small, 0.5 is medium, and 0.8 is large.
          So meditation lands in the small-to-medium range. To put those
          numbers in context: antidepressants in primary care typically score
          around 0.2&ndash;0.3 - so meditation is in the same ballpark. But here&apos;s the important part: meditation wasn&apos;t
          better than any other active treatment they compared it to. It works,
          but it&apos;s not special.{" "}<a href="#ref-1">[1]</a>
        </p>

        <MeditationEffectSizes />

        <p>
          In 2023, Hoge et al. published a direct comparison between
          meditation and medication for anxiety.
        </p>

        <p>
          They took 276 adults diagnosed with anxiety disorders and randomly
          split them into two groups. One group did 8 weeks of MBSR
          (Mindfulness-Based Stress Reduction). The other
          took escitalopram, a commonly prescribed SSRI (selective serotonin
          reuptake inhibitor) antidepressant. Both
          groups improved. MBSR reduced symptoms by 1.35 points on the Clinical
          Global Impressions scale. The drug reduced them by 1.43 points. That
          difference was small enough to meet what researchers call
          &ldquo;non-inferiority&rdquo; - a statistical standard used in
          clinical trials that means the new treatment (MBSR) is not
          meaningfully worse than the established one (the drug). It&apos;s
          not saying they&apos;re identical, but that any difference is too
          small to matter clinically.
        </p>

        <p>
          The results were similar for symptom relief. But the side effect
          picture was very different. About 1 in 6 people in the meditation
          group reported some kind of negative side effect. In the drug group,
          it was nearly 4 out of 5. And while nobody quit meditation because
          of side effects, 8% of people on the drug did{" "}<a href="#ref-16">[16]</a>.
        </p>

        <MBSRvsSSRI />

        <p>
          There&apos;s also a meditation-based approach specifically for
          depression called{" "}
          <strong>Mindfulness-Based Cognitive Therapy (MBCT)</strong>. It&apos;s
          an 8-week group program that combines mindfulness meditation with
          techniques from cognitive therapy. The idea is to help people
          recognize negative thought patterns early - like &ldquo;I&apos;m
          worthless&rdquo; or &ldquo;nothing will ever get better&rdquo; -
          and learn to observe them as passing thoughts rather than facts.
          Sessions include guided meditation, body scans, and exercises that
          teach you to notice when your mind is spiraling and step back from
          it. Teasdale et
          al. (2000) tested it on people who had experienced three or more
          episodes of depression and found it cut the relapse rate from 66% to
          37%{" "}<a href="#ref-17">[17]</a>. A larger trial published in <em>The Lancet</em> (Kuyken et al.,
          2015) compared MBCT against staying on antidepressants for two years -
          the results were nearly identical (44% vs. 47% relapse){" "}<a href="#ref-18">[18]</a>. Based on
          this, the UK&apos;s National Institute for Health and Care Excellence
          (NICE) now recommends MBCT for people with recurring depression.
        </p>

        <h3>Your body: heart, immune system, pain, and sleep</h3>

        <p>
          In 2017, the <strong>American Heart Association</strong> said
          meditation can be considered as an add-on to standard heart disease
          prevention. The data shows it lowers systolic blood pressure by about
          5&ndash;11 mmHg - not huge, but enough to matter clinically{" "}<a href="#ref-19">[19]</a>.
        </p>

        <p>
          There&apos;s evidence it affects the immune system too. Davidson et
          al. (2003) found that after 8 weeks of MBSR, participants showed
          stronger immune responses to a flu vaccine compared to controls{" "}<a href="#ref-20">[20]</a>.
          The <strong>Shamatha Project</strong> at UC Davis - one of the
          longest and most detailed meditation studies ever done - found that
          retreat participants had about one-third more telomerase activity
          than controls. Telomerase is the enzyme that rebuilds the caps on
          your chromosomes (telomeres). Every time a cell divides, these
          caps get a little shorter - and when they get too short, the cell
          stops working properly or dies. This is one of the core mechanisms
          of aging. More telomerase means your cells can maintain themselves
          longer. This study was done with Nobel laureate Elizabeth
          Blackburn, who won the prize for discovering how telomerase
          works{" "}<a href="#ref-21">[21]</a>.
        </p>

        <p>
          At the genetic level, studies from the Benson-Henry Institute found
          that long-term meditators had 2,209 genes expressed differently from
          non-meditators - particularly genes involved in inflammation. The
          NF-&kappa;B pathway - a molecular switch that tells your
          immune cells to produce inflammation - was significantly dialed
          down{" "}<a href="#ref-22">[22]</a>. Chronic inflammation is linked to heart disease,
          diabetes, and depression, so quieting this pathway is a big deal.
        </p>

        <p>
          The pain research is worth paying attention to.{" "}
          <strong>Fadel Zeidan</strong> at Wake Forest taught people to meditate
          for just 4 days (20 minutes per day) and then applied a painful heat
          stimulus. The meditators reported{" "}
          <strong>57% less unpleasantness</strong> and{" "}
          <strong>40% less pain intensity</strong>{" "}<a href="#ref-23">[23]</a>. A follow-up study with 75
          people showed this wasn&apos;t just placebo - meditation activated
          different brain regions than what you see with placebo responses.
          Specifically, it engaged the orbitofrontal cortex (which
          reappraises how important a sensation is) and the anterior
          cingulate cortex (which regulates your emotional response to
          pain) - a top-down control mechanism, not just distraction{" "}<a href="#ref-24">[24]</a>.
        </p>

        <p>
          For <strong>sleep</strong>, Black et al. (2015) split 49 older adults
          with sleep problems into two groups - one did mindfulness practices,
          the other got standard sleep hygiene advice. The mindfulness group
          slept significantly better and also reported less fatigue and fewer
          depressive symptoms{" "}<a href="#ref-25">[25]</a>.
        </p>

        <h3>Your mind: attention, memory, and creativity</h3>

        <p>
          The <strong>Shamatha Project</strong> studied what happens when
          people meditate intensively for 3 months (about 5 hours a day).
          MacLean et al. (2010) found that participants got better at staying
          focused over long periods - something our brains are normally bad at.
          You know how your attention drifts when you&apos;re doing a boring
          task for a while? Meditators showed less of that decline.{" "}<a href="#ref-26">[26]</a> Slagter et
          al. (2007) found a similar result: after 3 months of Vipassana
          meditation, people were better at catching things that flash by
          quickly in rapid succession{" "}<a href="#ref-27">[27]</a>.
        </p>

        <p>
          <strong>Amishi Jha</strong> tested this with U.S. military
          servicemembers - a group under real, sustained stress. She found
          mindfulness training helped protect their attention and working
          memory during high-pressure predeployment periods. But there was a
          catch: it only worked if they actually kept practicing{" "}<a href="#ref-29">[29]</a>.
        </p>

        <p>
          There&apos;s a creativity angle too. Colzato et al. (2012) at Leiden
          University found that open monitoring meditation (being broadly aware
          without focusing on anything specific) helped people come up with
          more original ideas. Focused attention meditation (concentrating on
          one thing) didn&apos;t have the same effect. Different types of
          meditation seem to put your brain in different modes{" "}<a href="#ref-28">[28]</a>.
        </p>

        {/* ── SECTION 4: TYPES ── */}

        <h2>Not All Meditation Is the Same</h2>

        <p>
          Not all meditation is the same thing. Sitting and focusing on your
          breath is a very different mental exercise from actively generating
          feelings of compassion. And the research backs this up - different
          techniques change different parts of your brain.
        </p>

        <MeditationTypesComparison />

        <p>
          The best evidence for this comes from the{" "}
          <strong>ReSource Project</strong> at the Max Planck Institute. Tania
          Singer followed 332 people through three different 3-month training
          modules - one focused on attention, one on compassion, and one on
          perspective-taking. Each module changed the brain differently.
          Attention training thickened the parts of the cortex involved in
          focus. Compassion training lowered cortisol (the stress hormone) and
          made people more altruistic. Perspective-taking training improved
          people&apos;s ability to understand what others are thinking and
          feeling{" "}<a href="#ref-31">[31]</a>.
        </p>

        <p>
          One thing worth flagging: <strong>Transcendental Meditation</strong>{" "}
          (TM) gets a lot of attention for heart health benefits. But Canter and
          Ernst (2004) looked into the research and found that <em>none</em> of
          the quality RCTs on TM and blood pressure were done by researchers
          independent of the TM organization. The Goyal et al. meta-analysis
          also found that mantra-based programs like TM had weak or
          insufficient evidence for psychological outcomes{" "}<a href="#ref-47">[47]</a>.
        </p>

        <p>
          Lutz et al. (2008) laid out two broad categories that are useful to
          know. <strong>Focused attention</strong> (FA) is when you concentrate
          on one thing, like your breath. It activates your prefrontal cortex
          and produces faster brainwaves. <strong>Open monitoring</strong> (OM)
          is when you stay aware of everything happening without latching onto
          anything specific. It activates different regions and produces slower,
          more expansive brainwaves. If you want to get better at
          concentrating, FA is your pick. If you want broader awareness or more
          creative thinking, try OM{" "}<a href="#ref-30">[30]</a>.
        </p>

        {/* ── SECTION 5: DOSE ── */}

        <h2>How Much Do You Actually Need?</h2>

        <p>
          The full <strong>MBSR program</strong> is an 8-week course with a
          weekly 2.5-hour group session, 45 minutes of daily home practice, and
          a full-day silent retreat. That adds up to about 24 hours of
          instruction and 36 hours of practice on your own. It&apos;s a lot.
          So the obvious question is: do you actually need that much?
        </p>

        <p>
          Honestly, nobody knows for sure. A 2025 study with 1,052 participants
          (Bowles &amp; Van Dam) estimated you need about 35&ndash;60 minutes a
          day to see meaningful changes. But here&apos;s what&apos;s
          interesting: Strohmaier et al. (2020) found that four 5-minute
          sessions actually produced <strong>better results</strong> than four
          20-minute sessions over 2 weeks. Longer sessions seemed to overwhelm
          beginners{" "}<a href="#ref-42">[42]</a>.
        </p>

        <p>What the research suggests in practice:</p>

        <ul>
          <li>
            <strong>10 minutes a day</strong> - enough for basic stress relief
          </li>
          <li>
            <strong>15&ndash;20 minutes a day</strong> - helps with focus and
            emotional resilience
          </li>
          <li>
            <strong>Showing up daily matters more than session length</strong> -
            short daily sessions beat long occasional ones
          </li>
        </ul>

        <h3>When to expect results</h3>

        <p>
          Benefits don&apos;t require years of practice. They emerge on a
          gradient, with each milestone backed by at least one controlled study:
        </p>

        <MeditationBenefitsTimeline />

        <p>
          The 8-week mark is especially important  - it&apos;s where most
          clinical trials show measurable improvements in anxiety, depression,
          and stress. If you&apos;re going to commit to a trial period, 8 weeks
          of daily practice is the evidence-backed sweet spot.
        </p>

        {/* ── SECTION 6: RISKS ── */}

        <h2>The Risks Nobody Talks About</h2>

        <p>
          <strong>Willoughby Britton</strong> at Brown University spent 10
          years studying what can go wrong with meditation. Her team
          interviewed over 100 people and documented{" "}
          <strong>59 different types of problems</strong> that meditators
          reported. These ranged across the board: physical issues (involuntary
          movements, pain), emotional problems (anxiety, panic, feeling
          emotionally numb), cognitive effects (intrusive thoughts), perceptual
          changes (heightened sensitivity, feeling disconnected from reality),
          loss of motivation, a disturbing shift in sense of self, and
          difficulty in relationships{" "}<a href="#ref-37">[37]</a>.
        </p>

        <p>
          The numbers back this up. Farias et al. (2020) reviewed 83 studies
          and found that about <strong>8.3% of meditators</strong> experienced
          some kind of adverse event. Of those, anxiety was the most common
          (33%), followed by depression (27%) and cognitive issues (25%).
          Britton et al. (2021) found that over half of people in
          mindfulness programs experienced some negative effect, and
          6&ndash;14% said the effects lasted{" "}<a href="#ref-6">[6]</a><a href="#ref-38">[38]</a>.
        </p>

        <MeditationAdverseEffects />

        <p>
          There&apos;s even a name for it: the{" "}
          <strong>&ldquo;dark night&rdquo;</strong> - periods during
          intensive practice where people experience fear, terror, a sense of
          losing themselves, loss of meaning, or feeling cut off from others.
          It&apos;s serious enough that Britton started a nonprofit called{" "}
          <strong>Cheetah House</strong>, which has helped over 20,000 people
          dealing with meditation-related difficulties.
        </p>

        <p>Some groups should be especially careful:</p>

        <ul>
          <li>
            <strong>People with trauma</strong> - meditation can bring up and
            intensify traumatic memories
          </li>
          <li>
            <strong>People at risk of psychosis</strong> - there are reports of
            meditation triggering psychotic episodes during intensive retreats
          </li>
          <li>
            <strong>People with severe depression</strong> - mindfulness made
            things worse for some adolescents in a large trial
          </li>
          <li>
            <strong>People with dissociative disorders</strong> - practices
            like body scans can make feelings of disconnection worse
          </li>
        </ul>

        <p>
          And here&apos;s a surprising one: more experienced meditators may
          actually be at greater risk of adverse effects than beginners.
        </p>

        <div className="not-prose my-6 rounded-lg border border-border bg-muted/50 px-5 py-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p className="mb-1 font-semibold text-foreground">
            The MYRIAD trial
          </p>
          <p>
            This was the largest school-based mindfulness study ever done -
            over 8,000 teenagers{" "}<a href="#ref-40">[40]</a>. The result? Mindfulness showed no benefits
            over regular classes. Worse, it actually seemed harmful for some
            students who already had mental health problems going in. It&apos;s
            an important reminder that meditation doesn&apos;t work for
            everyone.
          </p>
        </div>

        {/* ── SECTION 7: THE BOTTOM LINE ── */}

        <h2>The Bottom Line</h2>

        <p>
          After going through all of this, here&apos;s where I landed. Three
          things seem clear:
        </p>

        <p>
          <strong>It works.</strong> Meditation changes brain activity, lowers
          stress hormones, alters gene expression, and improves symptoms of
          anxiety, depression, and pain. This isn&apos;t wishful thinking -
          it&apos;s backed by controlled trials.
        </p>

        <p>
          <strong>It&apos;s not better than other options.</strong> Meditation
          performs about the same as medication, CBT, or exercise. The Hoge et
          al. (2023) study showed MBSR was just as effective as an SSRI for
          anxiety - but with far fewer side effects. Goldberg et al. (2018)
          compared mindfulness programs to established treatments and found
          essentially no difference (d&nbsp;=&nbsp;&minus;0.004 - so close
          to zero that it means the two groups were virtually identical in
          outcome).
        </p>

        <p>
          <strong>It&apos;s not risk-free.</strong> About 8.3% of people
          experience adverse effects. That&apos;s not a number you can ignore,
          and it means meditation shouldn&apos;t be handed out like a wellness
          supplement without any screening.
        </p>

        <blockquote>
          The way I think about it now: meditation is a set of mental training
          techniques. Different types train different things. How much it helps
          depends on which type you do, how much you practice, and who you are.
          There&apos;s nothing mystical about it - it works through attention
          regulation, body awareness, emotion control, and shifts in how you
          relate to your own thoughts.
        </blockquote>

        <h3>If you want to try it</h3>

        <ul>
          <li>Start with 10 minutes a day. Showing up daily matters more
            than long sessions.</li>
          <li>
            Pick a type that matches your goal: mindfulness/MBSR for anxiety
            and stress, MBCT if you have a history of depression,
            loving-kindness if you want to work on compassion and connection.
          </li>
          <li>
            Give it 8 weeks. That&apos;s the point where most studies show
            measurable benefits.
          </li>
          <li>
            If you start feeling worse - persistent anxiety, feeling
            disconnected from yourself, or symptoms getting worse instead of
            better - stop and talk to someone. Cheetah House
            (cheetahhouse.org) helps people dealing with meditation-related
            problems.
          </li>
          <li>
            It&apos;s one tool, not the whole toolkit. Exercise, therapy,
            medication, and social connection all matter too.
          </li>
        </ul>

        <hr />

        {/* ── REFERENCES ── */}

        <h2>References</h2>

        <div className="text-sm leading-relaxed">
          <h3>Meta-analyses and systematic reviews</h3>
          <ol>
            <li id="ref-1">
              Goyal M, Singh S, Sibinga EMS, et al. (2014). &ldquo;Meditation
              programs for psychological stress and well-being: A systematic
              review and meta-analysis.&rdquo; <em>JAMA Internal Medicine</em>,
              174(3):357&ndash;368.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/24395196/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-2">
              Khoury B, Lecomte T, Fortin G, et al. (2013).
              &ldquo;Mindfulness-based therapy: A comprehensive
              meta-analysis.&rdquo; <em>Clinical Psychology Review</em>,
              33(6):763&ndash;771.{" "}
              <a
                href="https://www.sciencedirect.com/science/article/abs/pii/S0272735813000731"
                target="_blank"
                rel="noopener noreferrer"
              >
                ScienceDirect
              </a>
            </li>
            <li id="ref-3">
              Goldberg SB, Tucker RP, Greene PA, et al. (2022). &ldquo;The
              empirical status of mindfulness-based interventions: A systematic
              review of 44 meta-analyses of randomized controlled
              trials.&rdquo; <em>Perspectives on Psychological Science</em>,
              17(1):108&ndash;130.{" "}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8364929/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PMC
              </a>
            </li>
            <li id="ref-4">
              Van Dam NT, van Vugt MK, Vago DR, et al. (2018). &ldquo;Mind
              the hype: A critical evaluation and prescriptive agenda for
              research on mindfulness and meditation.&rdquo;{" "}
              <em>Perspectives on Psychological Science</em>,
              13(1):36&ndash;61.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/29016274/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-5">
              Sedlmeier P, Eberth J, Schwarz M, et al. (2012). &ldquo;The
              psychological effects of meditation: A meta-analysis.&rdquo;{" "}
              <em>Psychological Bulletin</em>, 138(6):1139&ndash;1171.{" "}
              <a
                href="https://www.semanticscholar.org/paper/The-psychological-effects-of-meditation:-a-Sedlmeier-Eberth/67e9920325d71a220441f2a49810a83b208005c0"
                target="_blank"
                rel="noopener noreferrer"
              >
                Semantic Scholar
              </a>
            </li>
            <li id="ref-6">
              Farias M, Maraldi E, Wallenkampff KC, Lucchetti G (2020).
              &ldquo;Adverse events in meditation practices and
              meditation-based therapies: A systematic review.&rdquo;{" "}
              <em>Acta Psychiatrica Scandinavica</em>, 142(5):374&ndash;393.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/32820538/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
          </ol>

          <h3>Neuroscience: structural and functional changes</h3>
          <ol start={7}>
            <li id="ref-7">
              Lazar SW, Kerr CE, Wasserman RH, et al. (2005).
              &ldquo;Meditation experience is associated with increased cortical
              thickness.&rdquo; <em>NeuroReport</em>, 16(17):1893&ndash;1897.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/16272874/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-8">
              H&ouml;lzel BK, Carmody J, Vangel M, et al. (2011).
              &ldquo;Mindfulness practice leads to increases in regional brain
              gray matter density.&rdquo;{" "}
              <em>Psychiatry Research: Neuroimaging</em>,
              191(1):36&ndash;43.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/21071182/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-9">
              H&ouml;lzel BK, Carmody J, Evans KC, et al. (2010).
              &ldquo;Stress reduction correlates with structural changes in
              the amygdala.&rdquo;{" "}
              <em>Social Cognitive and Affective Neuroscience</em>,
              5(1):11&ndash;17.{" "}
              <a
                href="https://academic.oup.com/scan/article/5/1/11/1728269"
                target="_blank"
                rel="noopener noreferrer"
              >
                Oxford Academic
              </a>
            </li>
            <li id="ref-10">
              Kral TRA, Schuyler BS, Mumford JA, et al. (2022).
              &ldquo;Absence of structural brain changes from mindfulness-based
              stress reduction: Two combined randomized controlled
              trials.&rdquo; <em>Science Advances</em>, 8(20):eabk3316.{" "}
              <a
                href="https://www.science.org/doi/10.1126/sciadv.abk3316"
                target="_blank"
                rel="noopener noreferrer"
              >
                Science Advances
              </a>
            </li>
            <li id="ref-11">
              Luders E, Cherbuin N, Kurth F (2016). &ldquo;Forever
              young(er): Potential age-defying effects of long-term meditation
              on gray matter atrophy.&rdquo; <em>Frontiers in Psychology</em>,
              5:1551.{" "}
              <a
                href="https://www.qigonginstitute.org/abstract/12398"
                target="_blank"
                rel="noopener noreferrer"
              >
                Qigong Institute
              </a>
            </li>
            <li id="ref-12">
              Brewer JA, Worhunsky PD, Gray JR, et al. (2011).
              &ldquo;Meditation experience is associated with differences in
              default mode network activity and connectivity.&rdquo;{" "}
              <em>PNAS</em>, 108(50):20254&ndash;20259.{" "}
              <a
                href="https://www.pnas.org/doi/10.1073/pnas.1112029108"
                target="_blank"
                rel="noopener noreferrer"
              >
                PNAS
              </a>
            </li>
            <li id="ref-13">
              Desbordes G, Negi LT, Pace TWW, et al. (2012). &ldquo;Effects
              of mindful-attention and compassion meditation training on
              amygdala response to emotional stimuli in an ordinary,
              non-meditative state.&rdquo;{" "}
              <em>Frontiers in Human Neuroscience</em>, 6:292.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/23125828/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-14">
              Lutz A, Greischar LL, Rawlings NB, et al. (2004).
              &ldquo;Long-term meditators self-induce high-amplitude gamma
              synchrony during mental practice.&rdquo; <em>PNAS</em>,
              101(46):16369&ndash;16373.{" "}
              <a
                href="https://www.pnas.org/doi/10.1073/pnas.0407401101"
                target="_blank"
                rel="noopener noreferrer"
              >
                PNAS
              </a>
            </li>
            <li id="ref-15">
              Brefczynski-Lewis JA, Lutz A, Schaefer HS, et al. (2007).
              &ldquo;Neural correlates of attentional expertise in long-term
              meditation practitioners.&rdquo; <em>PNAS</em>,
              104(27):11483&ndash;11488.
            </li>
          </ol>

          <h3>Mental health: anxiety, depression, and relapse prevention</h3>
          <ol start={16}>
            <li id="ref-16">
              Hoge EA, Bui E, Mete M, et al. (2023).
              &ldquo;Mindfulness-Based Stress Reduction vs escitalopram for
              the treatment of adults with anxiety disorders: A randomized
              clinical trial.&rdquo; <em>JAMA Psychiatry</em>,
              80(1):13&ndash;21.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/36350591/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-17">
              Teasdale JD, Segal ZV, Williams JM, et al. (2000).
              &ldquo;Prevention of relapse/recurrence in major depression by
              mindfulness-based cognitive therapy.&rdquo;{" "}
              <em>Journal of Consulting and Clinical Psychology</em>,
              68(4):615&ndash;623.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/10965637/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-18">
              Kuyken W, Hayes R, Barrett B, et al. (2015).
              &ldquo;Effectiveness and cost-effectiveness of mindfulness-based
              cognitive therapy compared with maintenance antidepressant
              treatment in the prevention of depressive relapse or recurrence
              (PREVENT).&rdquo; <em>The Lancet</em>,
              386(9988):63&ndash;73.{" "}
              <a
                href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(14)62222-4/fulltext"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Lancet
              </a>
            </li>
          </ol>

          <h3>Physical health: cardiovascular, immune, pain, and sleep</h3>
          <ol start={19}>
            <li id="ref-19">
              Levine GN, Lange RA, Bairey-Merz CN, et al. (2017).
              &ldquo;Meditation and cardiovascular risk reduction: A scientific
              statement from the American Heart Association.&rdquo;{" "}
              <em>Journal of the American Heart Association</em>,
              6(10):e002218.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/28963100/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-20">
              Davidson RJ, Kabat-Zinn J, Schumacher J, et al. (2003).
              &ldquo;Alterations in brain and immune function produced by
              mindfulness meditation.&rdquo; <em>Psychosomatic Medicine</em>,
              65(4):564&ndash;570.{" "}
              <a
                href="https://ohiostate.elsevierpure.com/en/publications/alterations-in-brain-and-immune-function-produced-by-mindfulness-"
                target="_blank"
                rel="noopener noreferrer"
              >
                Elsevier
              </a>
            </li>
            <li id="ref-21">
              Jacobs TL, Epel ES, Lin J, et al. (2011). &ldquo;Intensive
              meditation training, immune cell telomerase activity, and
              psychological mediators.&rdquo;{" "}
              <em>Psychoneuroendocrinology</em>, 36(5):664&ndash;681.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/21035949/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-22">
              Dusek JA, Otu HH, Wohlhueter AL, et al. (2008).
              &ldquo;Genomic counter-stress changes induced by the relaxation
              response.&rdquo; <em>PLOS ONE</em>, 3(7):e2576.{" "}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC2432467/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PMC
              </a>
            </li>
            <li id="ref-23">
              Zeidan F, Martucci KT, Kraft RA, et al. (2011). &ldquo;Brain
              mechanisms supporting the modulation of pain by mindfulness
              meditation.&rdquo; <em>Journal of Neuroscience</em>,
              31(14):5540&ndash;5548.{" "}
              <a
                href="https://www.jneurosci.org/content/31/14/5540"
                target="_blank"
                rel="noopener noreferrer"
              >
                J Neurosci
              </a>
            </li>
            <li id="ref-24">
              Zeidan F, Adler-Neal AL, Wells RE, et al. (2015).
              &ldquo;Mindfulness meditation&ndash;based pain relief employs
              different neural mechanisms than placebo.&rdquo;{" "}
              <em>Journal of Neuroscience</em>, 35(46):15307&ndash;15325.{" "}
              <a
                href="https://www.jneurosci.org/content/35/46/15307"
                target="_blank"
                rel="noopener noreferrer"
              >
                J Neurosci
              </a>
            </li>
            <li id="ref-25">
              Black DS, O&apos;Reilly GA, Olmstead R, et al. (2015).
              &ldquo;Mindfulness meditation and improvement in sleep quality
              and daytime impairment among older adults.&rdquo;{" "}
              <em>JAMA Internal Medicine</em>, 175(4):494&ndash;501.{" "}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4407465/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PMC
              </a>
            </li>
          </ol>

          <h3>Attention and cognitive benefits</h3>
          <ol start={26}>
            <li id="ref-26">
              MacLean KA, Ferrer E, Aichele SR, et al. (2010).
              &ldquo;Intensive meditation training improves perceptual
              discrimination and sustained attention.&rdquo;{" "}
              <em>Psychological Science</em>, 21(6):829&ndash;839.{" "}
              <a
                href="https://journals.sagepub.com/doi/abs/10.1177/0956797610371339"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sage
              </a>
            </li>
            <li id="ref-27">
              Slagter HA, Lutz A, Greischar LL, et al. (2007).
              &ldquo;Mental training affects distribution of limited brain
              resources.&rdquo; <em>PLOS Biology</em>, 5(6):e138.{" "}
              <a
                href="https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.0050138"
                target="_blank"
                rel="noopener noreferrer"
              >
                PLOS Biology
              </a>
            </li>
            <li id="ref-28">
              Colzato LS, Ozturk A, Hommel B (2012). &ldquo;Meditate to
              create: The impact of focused-attention and open-monitoring
              training on convergent and divergent thinking.&rdquo;{" "}
              <em>Frontiers in Psychology</em>, 3:116.{" "}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3328799/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PMC
              </a>
            </li>
            <li id="ref-29">
              Zanesco AP, King BG, MacLean KA, et al. (2019).
              &ldquo;Mindfulness training as cognitive training in high-demand
              cohorts.&rdquo; <em>Progress in Brain Research</em>,
              244:323&ndash;354.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/30732844/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
          </ol>

          <h3>Meditation types and mechanisms</h3>
          <ol start={30}>
            <li id="ref-30">
              Lutz A, Slagter HA, Dunne JD, Davidson RJ (2008).
              &ldquo;Attention regulation and monitoring in
              meditation.&rdquo; <em>Trends in Cognitive Sciences</em>,
              12(4):163&ndash;169.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/18329323/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
            <li id="ref-31">
              Singer T, et al. (2017). ReSource Project. Max Planck Institute
              for Human Cognitive and Brain Sciences. 332 participants,
              9-month training in three modules.{" "}
              <a
                href="https://www.mindandlife.org/media/tania-singer-resource-project/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mind &amp; Life Institute
              </a>
            </li>
            <li id="ref-32">
              Weng HY, Fox AS, Shackman AJ, et al. (2013).
              &ldquo;Compassion training alters altruism and neural responses
              to suffering.&rdquo; <em>Psychological Science</em>,
              24(7):1171&ndash;1180.
            </li>
            <li id="ref-33">
              Fredrickson BL, Cohn MA, Coffey KA, et al. (2008). &ldquo;Open
              hearts build lives: Positive emotions, induced through
              loving-kindness meditation, build consequential personal
              resources.&rdquo;{" "}
              <em>Journal of Personality and Social Psychology</em>,
              95(5):1045&ndash;1062.
            </li>
          </ol>

          <h3>Stress, cortisol, and gene expression</h3>
          <ol start={34}>
            <li id="ref-34">
              Sanada K, Alda D&iacute;ez M, Salas Valero M, et al. (2016).
              &ldquo;Effects of mindfulness-based interventions on salivary
              cortisol in healthy adults.&rdquo;{" "}
              <em>Frontiers in Physiology</em>, 7:471.
            </li>
            <li id="ref-35">
              Bowles N, Van Dam NT (2025). &ldquo;Dose&ndash;response effects
              of reported meditation practice on mental-health and
              wellbeing.&rdquo;{" "}
              <em>Applied Psychology: Health and Well-Being</em>, 17(1).{" "}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12336962/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PMC
              </a>
            </li>
            <li id="ref-36">
              Schutte NS, Malouff JM (2023). &ldquo;The effects of
              mindfulness-based interventions on telomere length and telomerase
              activity.&rdquo; <em>Mindfulness</em>, 14:1017&ndash;1030.{" "}
              <a
                href="https://link.springer.com/article/10.1007/s12671-023-02075-x"
                target="_blank"
                rel="noopener noreferrer"
              >
                Springer
              </a>
            </li>
          </ol>

          <h3>Adverse effects and risks</h3>
          <ol start={37}>
            <li id="ref-37">
              Lindahl JR, Fisher NE, Cooper DJ, et al. (2017). &ldquo;The
              varieties of contemplative experience: A mixed-methods study of
              meditation-related challenges in Western Buddhists.&rdquo;{" "}
              <em>PLOS ONE</em>, 12(5):e0176239.{" "}
              <a
                href="https://sites.brown.edu/britton/research/the-varieties-of-contemplative-experience/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Brown University
              </a>
            </li>
            <li id="ref-38">
              Britton WB, Lindahl JR, Cooper DJ, et al. (2021).
              &ldquo;Defining and measuring meditation-related adverse effects
              in mindfulness-based programs.&rdquo;{" "}
              <em>Clinical Psychological Science</em>,
              9(6):1185&ndash;1204.
            </li>
            <li id="ref-39">
              Baer R, Crane C, Miller E, Kuyken W (2019). &ldquo;Doing no
              harm in mindfulness-based programs: Conceptual issues and
              empirical findings.&rdquo;{" "}
              <em>Clinical Psychology Review</em>, 71:101&ndash;114.
            </li>
            <li id="ref-40">
              Montero-Marin J, Allwood M, Ball S, et al. (MYRIAD Team)
              (2022). &ldquo;School-based mindfulness training in early
              adolescence: What works, for whom, and how in the MYRIAD
              trial?&rdquo; <em>Evidence-Based Mental Health</em>,
              25(3):85&ndash;96.
            </li>
          </ol>

          <h3>Dose-response and practice</h3>
          <ol start={41}>
            <li id="ref-41">
              Kabat-Zinn J (1982). &ldquo;An outpatient program in behavioral
              medicine for chronic pain patients based on the practice of
              mindfulness meditation.&rdquo;{" "}
              <em>General Hospital Psychiatry</em>, 4(1):33&ndash;47.
            </li>
            <li id="ref-42">
              Strohmaier S, Jones FW, Cane JE (2020). &ldquo;Effects of
              length of mindfulness practice on mindfulness, depression,
              anxiety, and stress.&rdquo; <em>Mindfulness</em>,
              12:198&ndash;214.
            </li>
            <li id="ref-43">
              Hutcherson CA, Seppala EM, Gross JJ (2008). &ldquo;Loving-
              kindness meditation increases social connectedness.&rdquo;{" "}
              <em>Emotion</em>, 8(5):720&ndash;724.
            </li>
            <li id="ref-44">
              Taren AA, Gianaros PJ, Greco CM, et al. (2015).
              &ldquo;Mindfulness meditation training alters stress-related
              amygdala resting state functional connectivity.&rdquo;{" "}
              <em>Social Cognitive and Affective Neuroscience</em>,
              10(12):1758&ndash;1768.{" "}
              <a
                href="https://pubmed.ncbi.nlm.nih.gov/26048176/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PubMed
              </a>
            </li>
          </ol>

          <h3>Historical sources</h3>
          <ol start={45}>
            <li id="ref-45">
              Wallace RK (1970). &ldquo;Physiological effects of
              transcendental meditation.&rdquo; <em>Science</em>,
              167(3926):1751&ndash;1754.
            </li>
            <li id="ref-46">
              Benson H, Klipper MZ (1975). <em>The Relaxation Response</em>.
              New York: William Morrow.
            </li>
            <li id="ref-47">
              Canter PH, Ernst E (2004). &ldquo;Insufficient evidence to
              conclude whether or not transcendental meditation decreases
              blood pressure.&rdquo;{" "}
              <em>Journal of Hypertension</em>, 22(11):2049&ndash;2054.
            </li>
          </ol>
        </div>
      </div>

      <RelatedPosts slug="the-science-of-meditation" />
    </article>
  );
}
