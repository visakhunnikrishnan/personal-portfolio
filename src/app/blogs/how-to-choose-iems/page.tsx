import type { Metadata } from "next";
import Image from "next/image";

import heroImg from "../../../../public/blog/how-to-choose-iems/audiophile-swirl.webp";
import { RelatedPosts } from "@/components/related-posts";
import { FrAnatomy } from "@/components/fr-anatomy";
import { SoundSignatureExplorer } from "@/components/sound-signature-explorer";
import { GenreSignaturePicker } from "@/components/genre-signature-picker";
import { DriverTypes } from "@/components/driver-types";
import { GearPicks } from "@/components/gear-picks";

export const metadata: Metadata = {
  title: "Notes on IEMs",
  description:
    "What frequency response graphs actually tell you, why the Harman target matters, and a shortlist of IEMs that are easy to recommend - in plain terms, with interactive graphs.",
  keywords: [
    "how to choose IEMs",
    "IEM buying guide",
    "frequency response explained",
    "Harman target curve",
    "sound signature",
    "V-shaped sound",
    "neutral tuning",
    "budget IEMs",
    "7Hz Zero 2",
    "Truthear",
    "Simgot EW300",
    "dynamic driver vs balanced armature",
    "audiophile for beginners",
  ],
  openGraph: {
    title: "Notes on IEMs",
    description:
      "What frequency response graphs actually tell you, why the Harman target matters, and a shortlist of IEMs that are easy to recommend - in plain terms, with interactive graphs.",
    type: "article",
    publishedTime: "2026-07-03",
    authors: ["Visakh Unni"],
    images: [
      {
        url: "https://www.visakhunni.com/blog/how-to-choose-iems/audiophile-swirl.webp",
        width: 1200,
        height: 630,
        alt: "Notes on IEMs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Notes on IEMs",
    description:
      "What frequency response graphs actually tell you, why the Harman target matters, and a shortlist of IEMs that are easy to recommend - in plain terms, with interactive graphs.",
    images: [
      "https://www.visakhunni.com/blog/how-to-choose-iems/audiophile-swirl.webp",
    ],
  },
};

export default function HowToChooseIemsBlog() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Notes on IEMs
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-07-03">Jul 3, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>9 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="Glowing blue audio cables swirling into a spiral, dotted with bokeh light particles"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          These are my notes on what I have learned about IEMs and wired
          headphones in the hobby - the one graph that explains almost
          everything, what the technical terms actually mean, and the
          gear that is easy to recommend. All of it in plain terms, so it
          is easy to find your way into a genuinely rewarding hobby.
        </p>

        <hr />

        <h2>The Only Graph That Matters</h2>

        <p>
          Every earphone has one defining property: how loudly it plays low
          notes versus high notes. That is the whole secret. Plot it on a
          chart - frequency from left (deep bass) to right (shimmering
          highs), loudness up and down - and you get a{" "}
          <strong>frequency response graph</strong>. Reviewers treat it
          like scripture, and the reverence is earned: research on
          listener preference keeps finding that this curve explains most
          of why an earphone sounds good or bad to people{" "}
          <a href="#ref-1">[1]</a>. Not the driver count, not the cable,
          not the price tag. The curve.
        </p>

        <p>
          The graph splits naturally into five regions, and once you know
          what lives in each one, you can read any earphone review chart
          like a menu:
        </p>

        <FrAnatomy />

        <p>
          One thing trips everyone up the first time: that big hill around
          3 kHz. It looks like a flaw. It is actually your own anatomy.
          Your outer ear and ear canal naturally amplify frequencies in
          that range by roughly 10 dB before they reach your eardrum. An
          IEM bypasses part of the outer ear, so a good one has to build
          that boost back in. A frequency response that looks like a flat
          line would <em>sound</em> dull and wrong. The hill is the
          earphone doing your ear&apos;s job for it.
        </p>

        <h2>What Should the Line Look Like, Then?</h2>

        <p>
          For decades the honest answer was &ldquo;nobody knows, buy
          whatever the magazine likes.&rdquo; Then a research team at
          Harman International, led by <strong>Sean Olive</strong>, did
          something refreshingly scientific: they put hundreds of
          listeners through controlled blind tests, let them tune bass and
          treble to taste, and measured what people actually preferred{" "}
          <a href="#ref-1">[1]</a>. The result is the{" "}
          <strong>Harman target curve</strong> - a moderate bass lift, a
          clean midrange, and that natural ear-gain hill, followed by
          gently declining treble.
        </p>

        <p>
          The follow-up studies are the interesting part. Roughly
          two-thirds of listeners preferred the Harman target as-is, while
          the rest split into a camp that wanted more bass and a smaller
          camp that wanted less <a href="#ref-2">[2]</a>. In other words:
          the target is not a law of physics, it is a very well-tested
          crowd-pleaser - and your personal taste probably sits either on
          it or a nudge to one side. The audio community describes those
          nudges with a handful of named <strong>sound signatures</strong>:
        </p>

        <SoundSignatureExplorer />

        <p>
          In words: <strong>Harman</strong> is the tested default - a
          touch of extra bass, clear vocals. <strong>Neutral</strong>{" "}
          plays the recording straight, nothing boosted - the studio
          reference sound. <strong>V-shaped</strong> lifts both bass and
          treble and lets the vocals step back - exciting at first listen,
          which is why so many store demos are tuned this way.{" "}
          <strong>Warm</strong> adds low-end body and relaxes the treble -
          smooth for long sessions. <strong>Bright</strong> pushes detail
          and air forward at the cost of eventually tiring your ears.
          None of these is objectively best. They are flavors, and the
          graph is just the recipe written down.
        </p>

        <h2>Which One Is Yours?</h2>

        <p>
          The fastest shortcut to your signature is the music you already
          listen to. This is a starting point rather than a rule, but it
          gets you to &ldquo;probably right&rdquo; without buying five
          pairs:
        </p>

        <GenreSignaturePicker />

        <h2>The Technical Terms, Translated</h2>

        <p>
          Beyond the frequency response, reviews lean on a small set of
          recurring words. Here is the whole dictionary you actually need:
        </p>

        <ul>
          <li>
            <strong>Soundstage</strong> - how big the invisible room
            around your head feels. Open-back headphones excel here; IEMs
            are naturally more intimate.
          </li>
          <li>
            <strong>Imaging</strong> - whether you can point at each
            instrument in that room. Matters a lot for gaming footsteps.
          </li>
          <li>
            <strong>Detail / resolution</strong> - how many small
            textures survive: fingers sliding on strings, the breath
            before a verse.
          </li>
          <li>
            <strong>Timbre</strong> - whether instruments sound like
            themselves. A piano with off timbre sounds like a keyboard
            ringtone of a piano.
          </li>
          <li>
            <strong>Sibilance</strong> - the sharp, spitty edge on
            &ldquo;s&rdquo; and &ldquo;t&rdquo; sounds when treble
            misbehaves. Once you notice it, you cannot un-notice it.
          </li>
        </ul>

        <p>
          Spec sheets also love advertising what is inside the shell. The
          four driver technologies are worth knowing - mostly so that
          driver-count marketing stops working on you:
        </p>

        <DriverTypes />

        <h2>Do You Need an Amp? (A Small One Helps)</h2>

        <p>
          You do not need a desk full of amplifiers to enjoy IEMs - but
          the answer is no longer a flat no either, because phones killed
          the headphone jack. Something has to
          sit between your USB-C port and your IEMs anyway, and that
          something matters more than people expect: my own IEMs stepped
          up noticeably when I swapped a bare adapter for a proper dongle
          DAC. The humble $10 Apple dongle measures genuinely well and is
          the floor; dongles in the $20-100 range (Moondrop Dawn Pro,
          FiiO KA11) add cleaner power and a lower noise floor on top.
          Full desktop amps only matter if you someday wander into
          full-size territory - high-impedance headphones and
          power-hungry planars.
        </p>

        <p>
          One caveat: the chain is only as good as what you feed it.
          Bluetooth compresses everything it touches, and standard
          Spotify streams are lossy - so a wired IEM with a dongle DAC
          only delivers its actual output when the source is lossless.
          Apple Music includes lossless at no extra cost; Tidal, Qobuz,
          and Amazon Music have equivalents. Wired IEMs plus a lossless
          subscription is the cheapest genuine upgrade in this whole
          hobby.
        </p>

        <h2>My Go-To Picks</h2>

        <p>
          Everything below is a boring, community-consensus staple - the
          kind of pick that shows up in every &ldquo;best under X&rdquo;
          thread for years because it keeps being right. The signature
          chips reuse the colors from the chart above.
        </p>

        <GearPicks />

        <h2>Before You Hit Buy</h2>

        <ul>
          <li>
            <strong>Seal first, judge second.</strong> An IEM without a
            proper seal loses its bass entirely. If a pick sounds thin,
            try the next ear-tip size up before writing a bad review in
            your head.
          </li>
          <li>
            <strong>Look up the graph.</strong> Community databases like{" "}
            <a
              href="https://squig.link/"
              target="_blank"
              rel="noopener noreferrer"
            >
              squig.link
            </a>{" "}
            <a href="#ref-3">[3]</a> overlay measured frequency responses
            against the Harman target for thousands of IEMs. Thirty
            seconds there beats thirty minutes of adjective-heavy reviews.
          </li>
          <li>
            <strong>Ignore driver-count marketing.</strong> A well-tuned
            single dynamic driver beats a badly-tuned eight-driver hybrid
            every time.
          </li>
          <li>
            <strong>Mind the volume.</strong> IEMs sit close to your
            eardrum. The old 60/60 rule - under 60% volume, breaks after
            60 minutes - is crude but keeps your future self hearing
            cymbals.
          </li>
          <li>
            <strong>Respect diminishing returns.</strong> The jump from
            $25 to $100 is enormous. The jump from $100 to $1,000 is an
            expensive shrug. This hobby is kindest to people who stop at
            &ldquo;happy.&rdquo;
          </li>
        </ul>

        <p>
          That is the whole game: learn one graph, know your flavor, buy a
          boring consensus pick, get the tips to seal. The gear above will
          outresolve most people&apos;s source files long before it
          becomes the bottleneck - and if you catch yourself browsing
          graphs at midnight for fun anyway, welcome. It is a good rabbit
          hole.
        </p>

        <hr />

        <div className="text-sm">
          <h2>References</h2>
          <ol>
            <li id="ref-1">
              Olive SE, Welti T, McMullin E (2013). &ldquo;Listener
              Preference for Different Headphone Target Response
              Curves.&rdquo; <em>AES Convention 134</em>, Audio
              Engineering Society.{" "}
              <a
                href="https://www.aes.org/e-lib/browse.cfm?elib=16768"
                target="_blank"
                rel="noopener noreferrer"
              >
                AES e-lib
              </a>
            </li>
            <li id="ref-2">
              Olive SE (2022). &ldquo;The Perception and Measurement of
              Headphone Sound Quality: What Do Listeners Prefer?&rdquo;{" "}
              <em>Acoustics Today</em>, 18(1).{" "}
              <a
                href="https://acousticstoday.org/he-perception-and-measurement-of-headphone-sound-quality-what-do-listeners-prefer-sean-e-olive/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Article
              </a>
            </li>
            <li id="ref-3">
              squig.link - community frequency-response database with
              Harman target overlays, built on measurements from
              independent reviewers.{" "}
              <a
                href="https://squig.link/"
                target="_blank"
                rel="noopener noreferrer"
              >
                squig.link
              </a>
            </li>
            <li id="ref-4">
              Crinacle&apos;s IEM graph database and ranking list - one of
              the largest independent measurement collections.{" "}
              <a
                href="https://crinacle.com/graphs/iems/"
                target="_blank"
                rel="noopener noreferrer"
              >
                crinacle.com
              </a>
            </li>
            <li id="ref-5">
              RTINGS.com headphone test methodology - transparent,
              standardized measurements across hundreds of headphones.{" "}
              <a
                href="https://www.rtings.com/headphones/tests"
                target="_blank"
                rel="noopener noreferrer"
              >
                Methodology
              </a>
            </li>
          </ol>
        </div>
      </div>

      <RelatedPosts slug="how-to-choose-iems" />
    </article>
  );
}
