import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/baby.jpg";
import { RelatedPosts } from "@/components/related-posts";
import { NewbornStomachSize } from "@/components/newborn-stomach-size";
import { FeedingVolumeChart } from "@/components/feeding-volume-chart";
import { ComboFeedingModels } from "@/components/combo-feeding-models";
import { NewbornOutputTracker } from "@/components/newborn-output-tracker";
import { SleepConsolidationChart } from "@/components/sleep-consolidation-chart";
import { CircadianRhythmTimeline } from "@/components/circadian-rhythm-timeline";
import { WakeWindowsChart } from "@/components/wake-windows-chart";
import { TummyTimeChart } from "@/components/tummy-time-chart";
import { MaternalNutritionChart } from "@/components/maternal-nutrition-chart";
import { ShiftSleepModel } from "@/components/shift-sleep-model";
import imgPump from "../../../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/gear/promom-pump.png";
import imgBottle from "../../../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/gear/avent-bottle.png";
import imgSterilizer from "../../../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/gear/avent-sterilizer.png";
import imgCarseat from "../../../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/gear/joie-igemm.png";
import imgNest from "../../../../public/blog/what-i-learned-in-my-first-week-as-a-new-parent/gear/zoey-nest.png";

export const metadata: Metadata = {
  title: "What I Learned in My First Month as a New Parent",
  description:
    "Notes from a first-time parent on newborn feeding, sleep, and postpartum nutrition - what the research says and what actually helped.",
  keywords: [
    "newborn care",
    "new parent guide",
    "breastfeeding formula combination feeding",
    "newborn sleep",
    "postpartum nutrition India",
    "working parents newborn",
    "baby care India",
    "SIDS prevention",
    "galactagogues fenugreek",
    "postpartum recovery",
    "evidence-based parenting",
  ],
  openGraph: {
    title: "What I Learned in My First Month as a New Parent",
    description:
      "Notes from a first-time parent on newborn feeding, sleep, and postpartum nutrition - what the research says and what actually helped.",
    type: "article",
    publishedTime: "2026-03-31",
    authors: ["Visakh Unni"],
    images: [
      {
        url: "https://www.visakhunni.com/blog/what-i-learned-in-my-first-week-as-a-new-parent/baby.jpg",
        width: 1200,
        height: 630,
        alt: "What I Learned in My First Month as a New Parent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What I Learned in My First Month as a New Parent",
    description:
      "Notes from a first-time parent on newborn feeding, sleep, and postpartum nutrition - what the research says and what actually helped.",
    images: [
      "https://www.visakhunni.com/blog/what-i-learned-in-my-first-week-as-a-new-parent/baby.jpg",
    ],
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          What I Learned in My First Month as a New Parent
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-03-31">Mar 31, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>28 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="A newborn baby being gently held"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          This is a collection of notes I put together during my first week
          as a father, drawing from WHO guidelines, AAP recommendations, ICMR
          dietary data, and peer-reviewed studies. Please talk to your
          pediatrician and OB-GYN before acting on any of this. Treat it as a
          starting point for asking better questions, not as medical advice.
        </p>

        <hr />

        <p>
          I&apos;m recently blessed with a baby. Being a new parent, it felt
          wonderful but I also realised there&apos;s a learning curve. My wife
          and I were struggling with not getting enough sleep and finding time
          to manage everything. I wanted to get a better understanding of how
          to take care of a newborn, so I spent time going through published
          guidelines and peer-reviewed studies.
        </p>

        <p>
          Sharing what I learned here so it might help other new parents too.
        </p>

        {/* ── FEEDING ─────────────────────────────────────────── */}

        <h2>Feeding</h2>

        <p>
          The first question we had was simple: how much should the baby eat?
          The answer depends on how tiny a newborn&apos;s stomach is, and how
          fast it grows.
          On day one, it holds about 5&ndash;7 ml, roughly the size of a
          cherry. By the end of the first week, it&apos;s closer to 45&ndash;60
          ml. This rapid change is why feeding amounts shift so much in the
          early days.
        </p>

        <NewbornStomachSize />

        <p>
          The general guideline from research is about{" "}
          <strong>150 ml per kg of body weight per day</strong>
          <sup>
            <a href="#ref-1">[1]</a>
          </sup>
          , spread across multiple feeds. In the first week that means
          8&ndash;12 feeds a day, every 2&ndash;3 hours. It sounds like a lot,
          and it is. But the feeds are small, and the frequency is what helps
          establish milk production.
        </p>

        <p>
          As the stomach grows, feed volumes go up and frequency gradually
          comes down. By month 2, most babies are doing 6&ndash;8 feeds of
          120&ndash;150 ml each. By months 4&ndash;6, daily intake plateaus
          around 750&ndash;1050 ml - it doesn&apos;t keep increasing
          linearly.
        </p>

        <FeedingVolumeChart />

        <p>
          Around 6 months, complementary foods get introduced (per WHO
          guidelines), but milk stays the primary source of nutrition through
          the first year.
        </p>

        <h3>Combination feeding</h3>

        <p>
          We&apos;re using both breast milk and formula (Aptamil Gold Stage 1).
          There are a few ways to combine the two, and the research suggests
          they&apos;re not all equal when it comes to maintaining breast milk
          supply.
        </p>

        <ComboFeedingModels />

        <p>
          The <strong>top-up model</strong> works best in the early weeks:
          breastfeed first at every session, then offer a small formula top-up
          (15&ndash;30 ml in week 1) only if the baby still seems hungry after
          both breasts. The reason is straightforward - breast milk
          production operates on supply-and-demand
          <sup>
            <a href="#ref-2">[2]</a>
          </sup>
          . The more the breast is stimulated, the more milk the body makes.
          Skipping breastfeeding sessions in favour of formula, especially in
          the first 4&ndash;6 weeks, can signal the body to produce less.
        </p>

        <p>
          One thing that matters more than I expected: the 1&ndash;5 AM
          feeds. <strong>Prolactin</strong>, the hormone responsible for milk
          production, peaks during
          this window
          <sup>
            <a href="#ref-3">[3]</a>
          </sup>
          . Breastfeeding during these hours (rather than using formula) helps
          keep supply up. We also use paced bottle feeding for all formula feeds
          - holding the bottle horizontal with a slow-flow nipple and
          letting the baby take breaks - which helps prevent overfeeding
          and flow preference.
        </p>

        <p>
          If formula replaces a breastfeed entirely (say, a late-evening feed
          handled by the father), pumping or hand-expressing during that time
          helps maintain stimulation. The goal in the first 4&ndash;6 weeks is
          at least 6&ndash;8 breastfeeding sessions per day. After that window,
          supply is more established and there&apos;s a bit more flexibility.
        </p>

        <h3>How to tell if your baby is getting enough</h3>

        <p>
          You don&apos;t actually need to measure millilitres. The most reliable
          indicator is output: by day 5&ndash;7, you should see at least 6 wet
          diapers and 3&ndash;4 dirty diapers per 24 hours. Weight is the other
          key metric - it&apos;s normal for newborns to lose up to
          7&ndash;10% of birth weight in the first few days, but they should
          regain it by day 10&ndash;14. After that, expect about 150&ndash;200
          grams per week through 3 months
          <sup>
            <a href="#ref-4">[4]</a>
          </sup>
          .
        </p>

        <NewbornOutputTracker />

        <p>
          Hunger cues go through stages: early ones include stirring, mouth
          opening, and rooting (turning the head side to side). Mid-stage cues
          are stretching, increased movement, and hand-to-mouth. Crying is
          actually a late hunger cue - ideally you&apos;d start the feed
          before it gets to that point. Satiety looks like releasing the
          breast or bottle on their own, relaxed open hands, turning away, or
          falling asleep contentedly.
        </p>

        <blockquote>
          <p>
            <strong>When to call the doctor:</strong> Fewer than 6 wet diapers
            after day 5, no stool for over 24 hours in the first month, weight
            not regained by day 14, lethargy, weak cry, or jaundice deepening
            after day 3.
          </p>
        </blockquote>

        <h3>Formula preparation</h3>

        <p>
          We are using Aptamil Gold Stage 1, so here is how we prepare it. The ratio is{" "}
          <strong>1 level scoop (4.4 g) per 30 ml of water</strong>. A few
          safety rules from the WHO/FAO guidelines
          <sup>
            <a href="#ref-22">[22]</a>
          </sup>
          : use boiled water cooled to about 70&deg;C (not boiling, not room
          temperature - the heat kills potential Cronobacter sakazakii
          bacteria). Always add water first, then powder. Prepare fresh for each
          feed and discard anything left after 2 hours. Never microwave formula
          - it creates hot spots. And never add extra water or powder,
          since incorrect dilution can cause dangerous electrolyte imbalances.
        </p>

        <p>
          Since we&apos;re combo-feeding, the actual formula volumes per feed
          are lower than what the tin suggests (those numbers are for
          exclusively formula-fed babies). The feeding volumes mentioned
          earlier in this post are total daily intake from all sources
          combined.
        </p>

        {/* ── SLEEP ──────────────────────────────────────────── */}

        <h2>Sleep</h2>

        <p>
          Sleep was the thing we were least prepared for. In the first week, our
          baby would sleep for 16&ndash;18 hours a day
          <sup>
            <a href="#ref-6">[6]</a>
          </sup>{" "}
          - which sounds like a lot until you realise it&apos;s broken
          into 2&ndash;4 hour stretches, spread evenly across day and night.
          There&apos;s no long block of nighttime sleep yet because newborns
          have no circadian rhythm. Their brain&apos;s master clock (the
          suprachiasmatic nucleus) is immature at birth, and they don&apos;t
          produce their own melatonin
          <sup>
            <a href="#ref-5">[5]</a>
          </sup>
          . Before birth, they relied entirely on the mother&apos;s melatonin
          crossing the placenta.
        </p>

        <p>
          The studies suggest this gets better over time. Over the first few
          months, nighttime sleep gradually consolidates - the longest
          unbroken stretch grows from about 3 hours in week 1 to 6&ndash;8
          hours by month 4&ndash;6. Daytime sleep reduces proportionally.
          Total sleep also decreases slightly, from around 17 hours to about
          15.
        </p>

        <SleepConsolidationChart />

        <p>
          A newborn&apos;s sleep cycle is only 40&ndash;50 minutes long, about
          half the length of an adult&apos;s. Roughly 50% of it is active (REM)
          sleep, and unlike adults, they enter sleep through the REM phase. This
          is why newborns twitch, grunt, make faces, and generally look like
          they&apos;re about to wake up - often they&apos;re just cycling
          between stages. Around 9 hours a day is spent in REM, which is
          thought to be important for brain development
          <sup>
            <a href="#ref-7">[7]</a>
          </sup>
          .
        </p>

        <h3>Wake windows and sleepy cues</h3>

        <p>
          One concept that helped us was <strong>wake windows</strong> -
          the amount of time a baby can comfortably stay awake between sleeps.
          In the first two weeks, it&apos;s only 30&ndash;45 minutes, and that
          includes the feed. According to the research, this gradually
          stretches to about 1.5&ndash;2 hours by month 3, and 2&ndash;3 hours
          by 6 months.
        </p>

        <WakeWindowsChart />

        <p>
          That said, wake windows aren&apos;t a formally studied concept -
          they&apos;re derived from aggregate sleep research. For the first few
          months, watching for sleepy cues is more reliable than watching the
          clock. Early cues include breaking eye contact, staring into space,
          becoming still, and glossy eyes. If you wait until yawning, fussiness,
          or arching back, the baby is already overtired - and an
          overtired baby is harder to settle because their body releases cortisol
          and adrenaline as a stress response, creating a cycle of poor sleep.
        </p>

        <h3>The sleep environment</h3>

        <p>
          Room temperature should be 20&ndash;22&deg;C. This matters because
          overheating is a recognised SIDS (Sudden Infant Death Syndrome) risk factor
          <sup>
            <a href="#ref-8">[8]</a>
          </sup>
          . Keep humidity at 40&ndash;60% (a cheap hygrometer helps).
        </p>

        <p>
          Lighting is interesting. At night, use only red or amber light for
          feeds and changes. Blue light (from screens and white LEDs) suppresses
          melatonin production, and research shows this effect is{" "}
          <strong>twice as strong in children</strong> compared to adults. During
          the day, do the opposite: keep things bright. Natural daylight
          exposure during waking hours helps the circadian rhythm develop faster.
          In the first 4&ndash;6 weeks, daytime naps can even be in lighter
          environments to reinforce the day-night difference.
        </p>

        <p>
          White noise helps. This makes sense - the womb is about
          70&ndash;80 dB of constant sound from blood flow and digestion.
          Complete silence is actually unfamiliar to newborns.
        </p>

        <blockquote>
          <p>
            In a study by Spencer et al., 80% of newborns exposed to white
            noise fell asleep within 5 minutes, compared to 25% in the control
            group
            <sup>
              <a href="#ref-9">[9]</a>
            </sup>
            .
          </p>
        </blockquote>

        <p>
          Keep the sound machine at 50&ndash;65 dB and at least 200 cm from the
          baby (a 2014 study in <em>Pediatrics</em> found all 14 tested infant
          sound machines exceeded 50 dB at 30 cm). Personally, we also found
          white noise to be effective - it noticeably helps our baby settle
          down faster.
        </p>

        <h3>Safe sleep</h3>

        <p>
          The AAP updated their safe sleep guidelines in 2022
          <sup>
            <a href="#ref-8">[8]</a>
          </sup>
          , and the core rules are clear: place the baby on their{" "}
          <strong>back for every sleep</strong>, on a firm flat surface (crib or
          bassinet), with nothing else in it - no pillows, blankets,
          bumpers, stuffed toys, or sleep positioners. Room sharing (baby in
          your room, on their own surface) for at least 6 months reduces SIDS
          risk by up to 50%.
        </p>

        <p>
          Bed-sharing is where it gets culturally tricky. Research shows it
          increases SIDS risk 5x in infants under 3 months
          <sup>
            <a href="#ref-10">[10]</a>
          </sup>
          . The AAP recommends against it in all circumstances. The Indian
          Academy of Pediatrics acknowledges that co-sleeping is common in India
          and recommends room-sharing on a <strong>separate surface</strong> as
          the safest adaptation. Other things to avoid: weighted swaddles
          (the AAP found they may lower breathing rates), inclined sleepers
          (multiple recalls for suffocation), and letting the baby sleep
          routinely in car seats or swings.
        </p>

        <h3>Soothing and settling</h3>

        <p>
          Harvey Karp&apos;s 5 S&apos;s framework
          <sup>
            <a href="#ref-11">[11]</a>
          </sup>{" "}
          is a well-known approach for calming a fussy newborn. The idea is to
          recreate womb-like conditions:{" "}
          <strong>Swaddle</strong> (snug around the chest, loose at the hips
          - stop when baby starts trying to roll, typically 2&ndash;4
          months), <strong>Side/Stomach hold</strong> (for soothing only, never
          for sleep), <strong>Shush</strong> (loud, near the ear - the womb
          is about 80 dB), <strong>Swing</strong> (small jiggly movements, not
          large swings), and <strong>Suck</strong> (pacifier or breastfeeding).
          A 2016 RCT in <em>Pediatrics</em> found that responsive parenting
          including these techniques helped infants sleep 35 minutes longer at 8
          weeks.
        </p>

        <p>
          Skin-to-skin contact (kangaroo care) also has strong evidence for
          sleep regulation. Babies held skin-to-skin spend more time in quiet
          sleep, have lower and more stable heart rates, and cry less. A
          long-term study found the effects on self-regulation were still
          measurable at a 10-year follow-up
          <sup>
            <a href="#ref-24">[24]</a>
          </sup>
          .
        </p>

        <p>
          And for what it&apos;s worth: feeding to sleep is completely fine in
          the first 0&ndash;3 months. Breast milk naturally contains melatonin
          and cholecystokinin (a sleep-inducing hormone). There&apos;s no
          evidence that this creates problematic sleep associations at this age
          <sup>
            <a href="#ref-12">[12]</a>
          </sup>
          .
        </p>

        <h3>Day-night confusion</h3>

        <p>
          This was the thing that caught us most off guard. The baby would be
          wide awake at 2 AM and fast asleep at noon. It&apos;s not something
          you can fix right away, but it helps to understand why it happens and
          when it resolves.
        </p>

        <CircadianRhythmTimeline />

        <p>
          The circadian rhythm develops in stages. The first responses to
          light and dark appear around 4&ndash;6 weeks. Cortisol rhythm kicks
          in around 8 weeks (which is roughly when day-night confusion
          resolves for most babies). Melatonin production begins around 9
          weeks. By 3&ndash;4 months, the full diurnal pattern is established
          and nighttime sleep starts to consolidate meaningfully.
        </p>

        <p>
          You can&apos;t rush it, but you can support it. During the day, keep
          things bright and social - natural light, normal household
          noise. Don&apos;t tiptoe around a sleeping baby during daytime naps.
          At night, make everything dark and boring: red or amber light only,
          minimal talking, no eye contact during feeds, keep it brief and
          functional. Even short outdoor time during the day provides light cues
          that help set the clock faster.
        </p>

        {/* ── TUMMY TIME ────────────────────────────────────── */}

        <h2>Tummy time</h2>

        <p>
          Beyond feeding and sleep, there&apos;s one other thing to start
          early. Tummy time is simply placing the baby on their stomach while
          they&apos;re awake and you&apos;re watching. It helps them build neck,
          shoulder, and upper body strength - which they&apos;ll eventually
          need for holding their head up, rolling over, and crawling.
        </p>

        <p>
          The AAP recommends starting from day 1 at home. In the first couple
          of weeks, that just means placing the baby on your chest for
          1&ndash;2 minutes, 2&ndash;3 times a day. It doesn&apos;t need to be
          on the floor yet.
        </p>

        <TummyTimeChart />

        <p>
          A few things we learned the practical way: do it after diaper changes
          or naps, not after feeds (reflux). High-contrast cards or a small
          mirror placed in front of the baby helps keep them interested. Never
          leave them unattended during tummy time, and always use a firm, flat
          surface - not a couch or bed.
        </p>

        <p>
          By 4&ndash;7 weeks, you&apos;re building toward 15&ndash;30 minutes
          total per day, split across multiple short sessions. By 4&ndash;6
          months, the target is 40&ndash;60 minutes throughout the day. It
          sounds like a lot, but by then most babies actually enjoy it.
        </p>

        {/* ── MATERNAL NUTRITION ──────────────────────────────── */}

        <h2>What the mother should eat</h2>

        <p>
          Everything above has been about the baby. But the mother&apos;s
          recovery matters just as much - she&apos;s healing from delivery
          while also producing milk, all on very little sleep. The short
          version: eat enough, don&apos;t diet, and pay attention to a few
          key nutrients.
        </p>

        <h3>How much to eat</h3>

        <p>
          A combo-feeding mother needs roughly{" "}
          <strong>2,300&ndash;2,500 kcal per day</strong>
          <sup>
            <a href="#ref-13">[13]</a>
          </sup>
          . That&apos;s more than usual because the body is doing a lot at
          once - recovering from blood loss (a normal delivery loses
          300&ndash;500 ml of blood), repairing tissue, rebalancing hormones,
          and producing breast milk. The WHO says any weight loss should be
          gradual, no more than 0.5 kg per week after the first month. This
          is not the time to restrict calories.
        </p>

        <h3>What to focus on</h3>

        <p>
          Most nutrients take care of themselves if the mother is eating a
          balanced diet. But a few are easy to fall short on, and they matter
          more than others right now.
        </p>

        <MaternalNutritionChart />

        <p>
          <strong>Iron</strong> is the big one. The body lost 150&ndash;250 mg
          of iron during delivery, and about 50% of Indian women are already
          anaemic. The ICMR recommends continuing iron supplements (60 mg iron
          + 400 &mu;g folic acid) for at least 3 months postpartum. One tip
          that makes a difference: pair iron-rich foods with vitamin C (it
          helps absorption), and avoid tea or coffee with meals (tannins reduce
          iron absorption by up to 60%).
        </p>

        <p>
          <strong>Vitamin D</strong> is the one most people miss.
          70&ndash;90% of Indian women are deficient
          <sup>
            <a href="#ref-14">[14]</a>
          </sup>
          , and breast milk is naturally low in vitamin D. Supplementation for
          the mother is almost certainly needed - talk to your OB-GYN about
          the right dose.
        </p>

        <p>
          <strong>DHA/omega-3</strong> is best from fish. Sardines are the top
          choice (high DHA, low mercury, affordable). Mackerel, anchovies, and
          pomfret are good too. Avoid shark and swordfish - too much mercury.
        </p>

        <h3>Traditional practices that hold up</h3>

        <p>
          We looked into some common Indian postpartum food traditions, and
          several have real evidence behind them:
        </p>

        <ul>
          <li>
            <strong>Fenugreek</strong> - strongest evidence among herbs for
            milk production. Some RCTs show increased volume at 3.5&ndash;7 g
            seeds/day
            <sup>
              <a href="#ref-15">[15]</a>
            </sup>
          </li>
          <li>
            <strong>Dry ginger water</strong> - anti-inflammatory, aids
            digestion
          </li>
          <li>
            <strong>Drumstick leaves</strong> - very nutrient-dense (28 mg
            iron + 440 mg calcium per 100g)
          </li>
          <li>
            <strong>Turmeric in food</strong> - documented wound-healing
            properties
          </li>
          <li>
            <strong>Coconut oil</strong> - increases lauric acid in breast
            milk, which has antimicrobial properties
            <sup>
              <a href="#ref-16">[16]</a>
            </sup>
          </li>
          <li>
            <strong>Postpartum oil massage</strong> - shown to reduce pain,
            improve mood, and lower cortisol
          </li>
        </ul>

        <h3>Does what the mother eats affect the baby?</h3>

        <p>
          We had this doubt too. The short answer: mostly no. Gas in
          the mother&apos;s digestive tract doesn&apos;t transfer to breast
          milk - gas isn&apos;t absorbed into the blood. Flavour compounds
          do pass through, but research suggests this is actually a good
          thing - it exposes the baby to different tastes early
          <sup>
            <a href="#ref-23">[23]</a>
          </sup>
          .
        </p>

        <p>
          The one real exception is <strong>cow&apos;s milk protein</strong>,
          which can trigger colic in about 2&ndash;3% of breastfed infants.
          If the baby shows persistent colic, bloody stools, or eczema, your
          paediatrician may suggest trying a dairy elimination diet.
        </p>

        <h3>A note on caffeine</h3>

        <p>
          Keep it under 200&ndash;300 mg/day (roughly 2 cups of coffee or
          3&ndash;4 cups of tea). The reason: a newborn&apos;s body takes
          65&ndash;130 hours to process caffeine, compared to about 5 hours
          for an adult. So caffeine from your morning tea is still in the
          baby&apos;s system days later.
        </p>

        {/* ── THINGS THAT HELPED ────────────────────────────── */}

        <h2>Things that helped us</h2>

        <p>
          These are a few things we bought that genuinely made the first few
          weeks easier. Not sponsored - just what worked for us.
        </p>

        <div className="not-prose my-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border/60">
            <Image
              src={imgPump}
              alt="Promom Wearable Electric Breast Pump"
              className="w-full object-cover"
              placeholder="blur"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">
                Promom Wearable Electric Breast Pump
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                This was a life saver. Highly recommended, especially for
                working mothers.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60">
            <Image
              src={imgBottle}
              alt="Philips Avent Natural Response Baby Feeding Bottle"
              className="w-full object-cover"
              placeholder="blur"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">
                Philips Avent Natural Response Bottle
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                We tried a few different feeding bottles and found the baby was
                most comfortable with this one. The natural response nipple
                seems to work well for combo-fed babies.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60">
            <Image
              src={imgSterilizer}
              alt="Philips Avent Electric Steam Sterilizer"
              className="w-full object-cover"
              placeholder="blur"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">
                Philips Avent Sterilizer
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Any decent sterilizer will do - the point is it saves a lot of
                time when you&apos;re already running around. We use this one
                and it works well.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60">
            <Image
              src={imgCarseat}
              alt="Joie i-Gemm 3 infant car seat"
              className="w-full object-cover"
              placeholder="blur"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">
                Joie i-Gemm 3 Car Seat
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                R129 certified. We started using it from day 4 after birth and
                the baby has been comfortable in it. Worth getting one early.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border/60">
            <Image
              src={imgNest}
              alt="Zoey Baby Carrier Nest"
              className="w-full object-cover"
              placeholder="blur"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">
                Zoey Baby Carrier Nest
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                We found that the baby is very comfortable sleeping in this
                muslin nest. It keeps them snug and settled.
              </p>
            </div>
          </div>
        </div>

        {/* ── WORKING PARENTS ────────────────────────────────── */}

        <h2>Managing this as working parents</h2>

        <p>
          Both my wife and I work. The first week made it clear that the
          biggest challenge isn&apos;t any single task - it&apos;s the
          sleep deprivation that compounds everything else.
        </p>

        <h3>Shift sleeping</h3>

        <p>
          Research from Tikotzky and Sadeh suggests that consolidated sleep
          blocks matter more than total hours - you need at least 4 hours of
          unbroken sleep for the body to complete a full restorative sleep
          cycle including slow-wave (deep) sleep
          <sup>
            <a href="#ref-17">[17]</a>
          </sup>
          . One approach that can be adopted: split the night into two 4&ndash;5 hour
          blocks. One parent is on duty while the other sleeps in a separate
          room, undisturbed. Then they switch.
        </p>

        <ShiftSleepModel />

        <p>
          For breastfeeding, the on-duty father brings the baby to the mother
          for nursing, then handles burping, changing, and settling. The mother
          only needs to wake enough to feed, then goes back to sleep. If
          pumped milk is available, one feed can be done entirely by the father,
          giving the mother an even longer unbroken stretch.
        </p>

        <h3>Mental health</h3>

        <p>
          Postpartum depression affects about 22% of Indian mothers
          <sup>
            <a href="#ref-18">[18]</a>
          </sup>
          , with Southern India at 26%. Baby blues - mood swings,
          tearfulness, anxiety - are even more common, affecting
          50&ndash;80% of mothers. They typically peak around day 5 and pass
          within two weeks.
        </p>

        <p>
          Something I wasn&apos;t aware of: 8&ndash;10% of fathers experience
          postpartum depression too
          <sup>
            <a href="#ref-19">[19]</a>
          </sup>
          , often showing up as irritability or withdrawal rather than sadness,
          and peaking at 3&ndash;6 months postpartum. The Edinburgh Postnatal
          Depression Scale (EPDS) is a validated 10-question screening tool
          available in multiple Indian languages. If symptoms last more than 2
          weeks or include
          thoughts of self-harm, get professional help.
        </p>

        <h3>What&apos;s helped so far</h3>

        <p>
          Accept help from whoever offers - this
          is not the time to be polite about it.
        </p>

        <p>
          Move your body. Even a 20-minute walk has documented antidepressant
          effects. Keep at least one thing for yourself - a hobby, a show,
          anything. Dropping everything actually makes it harder, not easier.
        </p>

        <p>
          Talk to each other. Not about the baby, about how you&apos;re both
          doing. Even 10 minutes of real conversation a day goes a long way.
          And let the house be messy. It&apos;s temporary.
        </p>

        <h3>Daily rhythm</h3>

        <p>
          Strict schedules don&apos;t work at this age. What we found useful is
          a simple feed-activity-sleep cycle: feed when baby wakes, do a short
          activity (tummy time, talking), then put baby down when sleepy cues
          appear. Repeat. It gives the day some structure without the stress of
          watching the clock.
        </p>

        {/* ── CLOSING ────────────────────────────────────────── */}

        <hr />

        <h2>The one thing that came up everywhere</h2>

        <p>
          Across all the reading I did, one finding kept repeating:
        </p>

        <blockquote>
          <p>
            Responsive, warm, consistent caregiving - by any caregiver
            - produces good outcomes for infants. And parental well-being
            is a prerequisite for quality caregiving, not a luxury.
          </p>
        </blockquote>

        <p>
          Research on quality vs quantity is clear: the amount of time parents
          spend with children aged 0&ndash;3 has very little relationship to
          outcomes
          <sup>
            <a href="#ref-20">[20]</a>
          </sup>
          . What matters is being present and responsive during whatever time
          you have.
        </p>

        <p>
          Take the nap. Accept the help. Eat well. The house can wait.
        </p>

        <p className="italic text-muted-foreground">
          I&apos;m very new to raising a baby and every day brings new
          learnings. I&apos;ll keep updating this post as we go -
          we&apos;re still experimenting with a lot of the above ourselves.
          Every kid is unique and every parent is too, so none of this is a
          strict set of rules. Think of it as a starting point that you can
          adjust through trial and error. For any major decisions, talk to your
          doctor. Happy parenting.
        </p>

        {/* ── REFERENCES ─────────────────────────────────────── */}

        <hr />

        <h2>References</h2>

        <ol className="text-sm">
          <li id="ref-1">
            Butte NF et al. (2005). &ldquo;Energy requirements of
            infants.&rdquo; <em>Public Health Nutrition</em>, 8(7a):953&ndash;967.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/16277816/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-2">
            Kent JC et al. (1999). &ldquo;Breast volume and milk production
            during extended lactation.&rdquo;{" "}
            <em>Experimental Physiology</em>, 84(2):435&ndash;447.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/10226182/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-3">
            Stern JM, Reichlin S (1990). &ldquo;Prolactin circadian rhythm
            persists throughout lactation in women.&rdquo;{" "}
            <em>Neuroendocrinology</em>, 51(1):31&ndash;37.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/2314058/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-4">
            WHO (2006). &ldquo;WHO Child Growth Standards.&rdquo; Multicentre
            Growth Reference Study.{" "}
            <a href="https://www.who.int/tools/child-growth-standards" target="_blank" rel="noopener noreferrer">WHO</a>
          </li>
          <li id="ref-5">
            Rivkees SA (2003). &ldquo;Developing Circadian Rhythmicity in
            Infants.&rdquo; <em>Pediatrics</em>, 112(2):373&ndash;381.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/12897290/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-6">
            Hirshkowitz M et al. (2015). &ldquo;National Sleep
            Foundation&apos;s Sleep Time Duration Recommendations.&rdquo;{" "}
            <em>Sleep Health</em>, 1(1):40&ndash;43.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/29073412/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-7">
            Paruthi S et al. (2016). &ldquo;Recommended Amount of Sleep for
            Pediatric Populations.&rdquo; <em>JCSM</em>, 12(6):785&ndash;786.{" "}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4877308/" target="_blank" rel="noopener noreferrer">PMC</a>.
            Also: Mindell JA, Owens JA (2015), <em>A Clinical Guide to
            Pediatric Sleep</em>, 3rd ed.
          </li>
          <li id="ref-8">
            Moon RY et al. (2022). &ldquo;Sleep-Related Infant Deaths: Updated
            2022 Recommendations.&rdquo; <em>Pediatrics</em>,
            150(1):e2022057990.{" "}
            <a href="https://publications.aap.org/pediatrics/article/150/1/e2022057990/188304/" target="_blank" rel="noopener noreferrer">AAP</a>
          </li>
          <li id="ref-9">
            Spencer JA et al. (1990). &ldquo;White Noise and Sleep
            Induction.&rdquo; <em>Archives of Disease in Childhood</em>,
            65(1):135&ndash;137.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/2405784/" target="_blank" rel="noopener noreferrer">PubMed</a>.
            Also: Hugh SC et al. (2014), <em>Pediatrics</em>,
            133(4):677&ndash;681.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/24616361/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-10">
            Vennemann MM et al. (2012). &ldquo;Bed Sharing and the Risk of
            SIDS.&rdquo; <em>The Journal of Pediatrics</em>,
            160(1):44&ndash;48.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/21868032/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-11">
            Karp H (2002). <em>The Happiest Baby on the Block</em>. Bantam
            Dell. Also: Paul IM et al. (2016), <em>Pediatrics</em>,
            138(1):e20160762.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/27354460/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-12">
            Hershon L et al. (2024). &ldquo;Associations Between Feeding
            Method and Sleep in Infants.&rdquo; <em>Acta Paediatrica</em>,
            113(6).{" "}
            <a href="https://onlinelibrary.wiley.com/doi/10.1111/apa.17237" target="_blank" rel="noopener noreferrer">Wiley</a>
          </li>
          <li id="ref-13">
            ICMR-NIN (2020). &ldquo;Nutrient Requirements and Recommended
            Dietary Allowances for Indians.&rdquo; National Institute of
            Nutrition, Hyderabad.{" "}
            <a href="https://www.nin.res.in/RDA_Full_Report_2020.html" target="_blank" rel="noopener noreferrer">NIN</a>
          </li>
          <li id="ref-14">
            Hollis BW et al. (2015). &ldquo;Maternal Versus Infant Vitamin D
            Supplementation During Lactation.&rdquo; <em>Pediatrics</em>,
            136(4):625&ndash;634.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/26416936/" target="_blank" rel="noopener noreferrer">PubMed</a>.
            Also: Ritu G &amp; Gupta A (2014),{" "}
            <em>Indian Journal of Medical Research</em>.{" "}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4277112/" target="_blank" rel="noopener noreferrer">PMC</a>
          </li>
          <li id="ref-15">
            Bazzano AN et al. (2016). &ldquo;A Review of Herbal and
            Pharmaceutical Galactagogues for Breast-Feeding.&rdquo;{" "}
            <em>Ochsner Journal</em>, 16(4):511&ndash;524.{" "}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5158159/" target="_blank" rel="noopener noreferrer">PMC</a>
          </li>
          <li id="ref-16">
            Francois CA et al. (1998). &ldquo;Acute effects of dietary fatty
            acids on the fatty acids of human milk.&rdquo;{" "}
            <em>American Journal of Clinical Nutrition</em>,
            67(2):301&ndash;308.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/9459380/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-17">
            Tikotzky L &amp; Sadeh A. &ldquo;Maternal sleep-related cognitions
            and infant sleep.&rdquo; <em>Western Journal of Nursing Research</em>.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/19420277/" target="_blank" rel="noopener noreferrer">PubMed</a>.
            Also: Dennis CL &amp; Ross L (2005), <em>Birth</em>.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/15935502/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-18">
            Upadhyay RP et al. (2017). &ldquo;Postpartum depression in India:
            a systematic review and meta-analysis.&rdquo;{" "}
            <em>Women and Birth</em>, 30(5):382&ndash;394.{" "}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC5689195/" target="_blank" rel="noopener noreferrer">PMC</a>
          </li>
          <li id="ref-19">
            Paulson JF &amp; Bazemore SD (2010). &ldquo;Prenatal and
            postpartum depression in fathers and its association with maternal
            depression.&rdquo; <em>JAMA</em>, 303(19):1961&ndash;1969.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/20483973/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-20">
            Milkie MA et al. (2015). &ldquo;Does the Amount of Time Mothers
            Spend With Children or Adolescents Matter?&rdquo;{" "}
            <em>Journal of Marriage and Family</em>, 77(2):355&ndash;372.{" "}
            <a href="https://onlinelibrary.wiley.com/doi/10.1111/jomf.12170" target="_blank" rel="noopener noreferrer">Wiley</a>
          </li>
          <li>
            ABM Clinical Protocol #3 (2017). &ldquo;Supplementary Feedings in
            the Healthy Term Breastfed Neonate.&rdquo;{" "}
            <em>Breastfeeding Medicine</em>, 12(3):188&ndash;198.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/28294631/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li id="ref-22">
            WHO/FAO (2007). &ldquo;Safe Preparation, Storage and Handling of
            Powdered Infant Formula: Guidelines.&rdquo;{" "}
            <a href="https://www.who.int/publications/i/item/9789241595414" target="_blank" rel="noopener noreferrer">WHO</a>
          </li>
          <li id="ref-23">
            Allen LH (2012). &ldquo;B Vitamins in Breast Milk.&rdquo;{" "}
            <em>Advances in Nutrition</em>, 3(3):362&ndash;369.{" "}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3649473/" target="_blank" rel="noopener noreferrer">PMC</a>
          </li>
          <li id="ref-24">
            Feldman R et al. (2002). &ldquo;Skin-to-Skin Contact Promotes
            Self-Regulation.&rdquo; <em>Developmental Psychology</em>,
            38(2):194&ndash;207.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/11881756/" target="_blank" rel="noopener noreferrer">PubMed</a>.
            Also: Feldman R et al. (2014),{" "}
            <em>Biological Psychiatry</em>, 75(1):56&ndash;64.{" "}
            <a href="https://pubmed.ncbi.nlm.nih.gov/23890734/" target="_blank" rel="noopener noreferrer">PubMed</a>
          </li>
          <li>
            Ballard O &amp; Morrow AL (2013). &ldquo;Human Milk
            Composition.&rdquo; <em>Pediatric Clinics of North America</em>,
            60(1):49&ndash;74.{" "}
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3586783/" target="_blank" rel="noopener noreferrer">PMC</a>
          </li>
        </ol>
      </div>

      <RelatedPosts slug="what-i-learned-in-my-first-week-as-a-new-parent" />
    </article>
  );
}
