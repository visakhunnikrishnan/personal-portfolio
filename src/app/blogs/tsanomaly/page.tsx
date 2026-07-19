import type { Metadata } from "next";
import Image from "next/image";

import heroImg from "../../../../public/blog/tsanomaly/tsanomaly-banner.webp";
import { RelatedPosts } from "@/components/related-posts";
import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "tsanomaly: A Generic Framework for Time-Series Anomaly Detection",
  description:
    "Why time-series anomaly detection is harder than it looks, what Anodot's patents taught me about solving it, and how I built tsanomaly - an open-source Python library with self-calibrating envelopes, explainable scores, and incident grouping.",
  keywords: [
    "tsanomaly",
    "time series anomaly detection",
    "anomaly detection python",
    "conformal prediction",
    "extreme value theory",
    "seasonality detection",
    "Bayesian online changepoint detection",
    "Anodot",
    "monitoring",
    "open source",
  ],
  openGraph: {
    title: "tsanomaly: A Generic Framework for Time-Series Anomaly Detection",
    description:
      "Why time-series anomaly detection is harder than it looks, what Anodot's patents taught me about solving it, and how I built tsanomaly - an open-source Python library with self-calibrating envelopes, explainable scores, and incident grouping.",
    type: "article",
    publishedTime: "2026-07-19",
    authors: ["Visakh Unni"],
    images: [
      {
        url: "https://www.visakhunni.com/blog/tsanomaly/tsanomaly-banner.webp",
        width: 1200,
        height: 630,
        alt: "tsanomaly: A Generic Framework for Time-Series Anomaly Detection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "tsanomaly: A Generic Framework for Time-Series Anomaly Detection",
    description:
      "Why time-series anomaly detection is harder than it looks, what Anodot's patents taught me about solving it, and how I built tsanomaly - an open-source Python library.",
    images: ["https://www.visakhunni.com/blog/tsanomaly/tsanomaly-banner.webp"],
  },
};

export default function TsanomalyBlog() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          tsanomaly: A Generic Framework for Time-Series Anomaly Detection
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2026-07-19">Jul 19, 2026</time>
          <span aria-hidden="true">&middot;</span>
          <span>8 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="A 3D landscape of blue time-series ridges with anomalous stretches rising in orange"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          These are my notes on{" "}
          <a
            href="https://github.com/visakhunnikrishnan/tsanomaly"
            target="_blank"
            rel="noopener noreferrer"
          >
            tsanomaly
          </a>{" "}
          - a Python library I recently open-sourced for autonomous,
          explainable, real-time anomaly detection on time-series metrics.
          Notes on the mechanisms behind it, and on the concepts from the
          Anodot patents that inspired it.
        </p>

        <hr />

        <h2>The Curse of Low Dimensionality</h2>

        <p>
          I have spent a good part of my career building analytics and data
          science solutions on top of machine data - sensor readings,
          industrial telemetry, operational metrics. Time series from machines
          have a property that quietly breaks most of the modeling playbook:
          they carry very little information per observation. An image has
          thousands of correlated pixels; a document has a vocabulary. A metric
          has a timestamp and one number. That is the entire feature space.
        </p>

        <p>
          With so few dimensions, forecasting and anomaly detection models have
          almost nothing to hold on to. Static thresholds drown you in false
          alarms the moment a metric has a daily rhythm. Classical models want
          per-series tuning, which is unthinkable when you monitor thousands of
          metrics. And every metric has its own personality - a spiky network
          counter and a smooth temperature sensor should not be judged by the
          same yardstick.
        </p>

        <p>
          Years ago, while digging through this problem space, I came across
          the patents of <strong>Anodot</strong>, an Israeli company that had
          built a generic anomaly-detection product for exactly this kind of
          data. I really liked the way they framed the solution: learn a
          baseline for every metric autonomously, score anomalies against that
          metric&apos;s <em>own</em> history rather than a global rule, detect
          seasonality automatically, and condense concurrent anomalies across
          metrics into single incidents <a href="#ref-1">[1]</a>{" "}
          <a href="#ref-2">[2]</a>. That framing stuck with me. tsanomaly is my
          take on the same problem - inspired by those ideas, implemented with
          different, more recent statistical machinery.
        </p>

        <h2>What tsanomaly Is</h2>

        <p>
          tsanomaly watches any number over time, learns what normal looks like
          for that specific series, and reports genuinely unusual events with a
          calibrated 0-100 score and a full explanation:
        </p>

        <pre>
          <code>{`pip install tsanomaly`}</code>
        </pre>

        <CodeBlock
          code={`import tsanomaly as tsa

det = tsa.Detector.auto()
det.fit(history_df)               # learn normal, per metric
result = det.detect(new_df)       # scored, explained anomalies

for anomaly in result.alerts(min_score=70):
    print(anomaly.explain().headline)`}
        />

        <p>
          Here is real output on real data - NYC taxi ridership from the
          Numenta Anomaly Benchmark <a href="#ref-8">[8]</a>. The detector
          learned the daily and weekly rhythm on four months of history, then
          found the documented disruptions on its own:
        </p>

        <pre>
          <code>{`\`nyc.taxi.passengers\` dropped to 7076 (expected 18060 to 25606)
    for 33.0 h starting 2014-11-27 05:30 UTC - score 100.   # Thanksgiving
\`nyc.taxi.passengers\` spiked to 23848 (expected 15488 to 19792)
    for 6.0 h starting 2015-01-18 09:30 UTC - score 100.    # MLK weekend
\`nyc.taxi.passengers\` dropped to 570 (expected 15629 to 22110)
    for 39.0 h starting 2015-01-26 11:30 UTC - score 100.   # blizzard travel ban`}</code>
        </pre>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tsanomaly/taxi-blizzard.png"
          alt="NYC taxi ridership with the learned envelope; the MLK weekend surge and the January 2015 blizzard travel ban flagged in red with score 100"
          className="w-full"
        />

        <p>
          That last red block is the January 2015 North American blizzard, when
          New York banned road travel and city-wide taxi ridership collapsed to
          almost nothing for 39 hours. Nobody told the model about blizzards.
        </p>

        <h2>How It Works</h2>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tsanomaly/pipeline.svg"
          alt="The tsanomaly pipeline: ingest, clean, profile, seasonality, and baseline feed a self-calibrating envelope into detection, scoring, incidents, and explanation"
          className="w-full"
        />

        <p>
          Every metric flows through the same loop: learn normal behavior,
          predict a corridor of expected values, detect departures, score their
          severity, explain them. A few of the stages carry most of the
          intelligence:
        </p>

        <ul>
          <li>
            <strong>Seasonality is proposed, then verified.</strong> A
            Lomb-Scargle periodogram <a href="#ref-11">[11]</a> proposes
            candidate periods (robust to missing data, easily fooled by
            noise); autocorrelation at the period and its multiples verifies
            them against a block-shuffle null (hard to fool). The shortest
            verified period wins, gets subtracted, and the search repeats - so
            a metric with both daily and weekly rhythm gets both, and a weekly
            harmonic never masquerades as the real cycle.
          </li>
          <li>
            <strong>The envelope is measured, not assumed.</strong> The
            corridor of normal around the prediction is calibrated by adaptive
            conformal inference <a href="#ref-6">[6]</a>: the width follows the
            measured error distribution, and a feedback loop keeps actual
            coverage at the 99.5% target. If the metric gets noisier, the
            envelope widens itself; anomalous points are never allowed to
            widen their own envelope.
          </li>
          <li>
            <strong>Rarity comes from extreme value theory.</strong> How far
            outside the envelope a point landed is converted to a probability
            with a generalized Pareto tail model <a href="#ref-7">[7]</a> -
            because Gaussian tails badly overstate how rare large deviations
            are on real metrics.
          </li>
          <li>
            <strong>Detection works on episodes, not points.</strong> A single
            point outside a 99.5% envelope is expected once in 200 samples, so
            consecutive excursions are grouped with hysteresis and scored as
            one event, from three kinds of evidence: magnitude, duration, and
            persistence, combined with a harmonic-mean p-value{" "}
            <a href="#ref-9">[9]</a> that stays valid when the evidence is
            correlated.
          </li>
          <li>
            <strong>A new normal is not an anomaly.</strong> When a deploy
            drops latency permanently, Bayesian online changepoint detection{" "}
            <a href="#ref-5">[5]</a> resolves the shift into a single
            &ldquo;regime change&rdquo; finding and re-anchors the baseline -
            one notification instead of days of alerts.
          </li>
          <li>
            <strong>Concurrent anomalies become one incident.</strong> When
            episodes on different metrics overlap far more than chance
            predicts, they merge into an incident whose members are ordered by
            who moved first - a built-in root-cause hint, with the effective
            number of independent signals computed properly{" "}
            <a href="#ref-10">[10]</a> so correlated members are never
            double-counted.
          </li>
        </ul>

        <p>
          And everything explains itself: every anomaly carries its expected
          range, its score decomposition, the model that produced it, and a
          counterfactual - &ldquo;no alert would have fired for values between
          X and Y at that time.&rdquo;
        </p>

        <h2>Prior Works</h2>

        <p>
          The architecture - autonomous per-metric baselines, scoring against a
          metric&apos;s own history, automatic seasonality, incident grouping -
          is the shape Anodot&apos;s patents describe{" "}
          <a href="#ref-1">[1]</a> <a href="#ref-2">[2]</a>{" "}
          <a href="#ref-3">[3]</a>. The mechanisms inside each box are
          deliberately different, and in most cases benefit from statistical
          tools published after those patents were filed:
        </p>

        <ul>
          <li>
            Envelope widths come from <strong>adaptive conformal
            inference</strong> (2021) with a measured coverage guarantee,
            rather than distributional assumptions around the baseline.
          </li>
          <li>
            Seasonality uses <strong>periodogram-plus-verification</strong>{" "}
            with a permutation null, rather than the patents&apos;
            geometrically-sampled autocorrelation scan{" "}
            <a href="#ref-2">[2]</a>.
          </li>
          <li>
            Tail rarity uses <strong>extreme value theory</strong> (the
            DSPOT lineage <a href="#ref-7">[7]</a>) rather than learned
            distributions of past anomaly intensities <a href="#ref-1">[1]</a>.
          </li>
          <li>
            Regime changes are resolved by <strong>Bayesian online changepoint
            detection</strong> with explicit stationarity gates, and scores are
            damped while the re-anchored baseline re-learns - the system knows
            when it does not yet know.
          </li>
          <li>
            Evidence combination uses the <strong>harmonic-mean p-value</strong>{" "}
            (2019) and incident significance uses <strong>Galwey&apos;s
            effective number of tests</strong>, replacing heuristic score
            combination.
          </li>
        </ul>

        <p>
          None of this is a claim of superiority over a product that has been
          refined in production for a decade - it is a design lineage,
          acknowledged openly in the{" "}
          <a
            href="https://github.com/visakhunnikrishnan/tsanomaly/blob/main/docs/architecture.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            architecture doc
          </a>
          , with the mechanisms swapped for ones I could build honestly in the
          open, on published research.
        </p>

        <h2>Proving It on Machine Data</h2>

        <p>
          Given where this started for me, the test I cared most about was
          industrial sensor data. The Bosch CNC Machining dataset{" "}
          <a href="#ref-12">[12]</a> contains tri-axial vibration from a
          production milling machine, recorded over two and a half years, with
          each machining cycle labeled good or bad by process experts. I
          reduced each cycle to per-second vibration energy, fit on the 2019
          cycles, and detected from 2020 on:
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/blog/tsanomaly/cnc-vibration.png"
          alt="CNC spindle vibration across 24 machining cycles; the two cycles Bosch labeled bad are flagged at scores 87 and 100, with indigo bars marking the ground-truth labels"
          className="w-full"
        />

        <p>
          The two cycles that alert - scores 87 and 100 - are exactly the two
          cycles Bosch labeled bad (the indigo bars). The 22 good cycles
          produce zero false alerts. And the training window itself contained
          two mildly anomalous cycles that the robust learners simply absorbed
          without being told. That, in one chart, is the property I wanted:
          judgment calibrated to each machine&apos;s own normal, with the
          receipts to explain every call.
        </p>

        <h2>Try It</h2>

        <p>
          The library is on{" "}
          <a
            href="https://pypi.org/project/tsanomaly/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PyPI
          </a>{" "}
          (<code>pip install tsanomaly</code>, Python 3.9+) and the source is
          on{" "}
          <a
            href="https://github.com/visakhunnikrishnan/tsanomaly"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          , with a{" "}
          <a
            href="https://github.com/visakhunnikrishnan/tsanomaly/blob/main/docs/usage.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            usage guide
          </a>
          , the full{" "}
          <a
            href="https://github.com/visakhunnikrishnan/tsanomaly/blob/main/docs/architecture.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            architecture doc
          </a>
          , and runnable{" "}
          <a
            href="https://github.com/visakhunnikrishnan/tsanomaly/tree/main/examples"
            target="_blank"
            rel="noopener noreferrer"
          >
            examples
          </a>
          .
        </p>

        <p>Issues and pull requests are welcome.</p>

        <hr />

        <div className="text-sm">
          <h2>References</h2>
          <ol>
            <li id="ref-1">
              US 10,061,632 - System and method for transforming observed
              metrics into detected and scored anomalies.{" "}
              <a
                href="https://patents.google.com/patent/US10061632B2/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Patents
              </a>
            </li>
            <li id="ref-2">
              US 10,061,677 - Fast automated detection of seasonal patterns in
              time series data.{" "}
              <a
                href="https://patents.google.com/patent/US10061677B2/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Patents
              </a>
            </li>
            <li id="ref-3">
              US 2016/0210556 A1 - Heuristic inference of topological
              representation of metric relationships.{" "}
              <a
                href="https://patents.google.com/patent/US20160210556A1/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Patents
              </a>
            </li>
            <li id="ref-4">
              US 12,101,343 - Event-based machine learning for a time-series
              metric.{" "}
              <a
                href="https://patents.google.com/patent/US12101343B2/en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Patents
              </a>
            </li>
            <li id="ref-5">
              Adams RP, MacKay DJC (2007). &ldquo;Bayesian Online Changepoint
              Detection.&rdquo;{" "}
              <a
                href="https://arxiv.org/abs/0710.3742"
                target="_blank"
                rel="noopener noreferrer"
              >
                arXiv:0710.3742
              </a>
            </li>
            <li id="ref-6">
              Gibbs I, Cand&egrave;s E (2021). &ldquo;Adaptive Conformal
              Inference Under Distribution Shift.&rdquo; <em>NeurIPS 2021</em>.{" "}
              <a
                href="https://arxiv.org/abs/2106.00170"
                target="_blank"
                rel="noopener noreferrer"
              >
                arXiv:2106.00170
              </a>
            </li>
            <li id="ref-7">
              Siffer A, Fouque P-A, Termier A, Largou&euml;t C (2017).
              &ldquo;Anomaly Detection in Streams with Extreme Value
              Theory.&rdquo; <em>KDD 2017</em>.{" "}
              <a
                href="https://doi.org/10.1145/3097983.3098144"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-8">
              Lavin A, Ahmad S (2015). &ldquo;Evaluating Real-Time Anomaly
              Detection Algorithms - the Numenta Anomaly Benchmark.&rdquo;{" "}
              <a
                href="https://github.com/numenta/NAB"
                target="_blank"
                rel="noopener noreferrer"
              >
                NAB corpus
              </a>
            </li>
            <li id="ref-9">
              Wilson DJ (2019). &ldquo;The harmonic mean p-value for combining
              dependent tests.&rdquo; <em>PNAS</em> 116(4).{" "}
              <a
                href="https://doi.org/10.1073/pnas.1814092116"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-10">
              Galwey NW (2009). &ldquo;A new measure of the effective number
              of tests.&rdquo; <em>Genetic Epidemiology</em> 33(7).{" "}
              <a
                href="https://doi.org/10.1002/gepi.20408"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-11">
              VanderPlas JT (2018). &ldquo;Understanding the Lomb-Scargle
              Periodogram.&rdquo; <em>ApJS</em> 236.{" "}
              <a
                href="https://doi.org/10.3847/1538-4365/aab766"
                target="_blank"
                rel="noopener noreferrer"
              >
                DOI
              </a>
            </li>
            <li id="ref-12">
              Tnani M-A, Feil M, Diepold K (2022). &ldquo;Smart Data
              Collection System for Brownfield CNC Milling Machines.&rdquo;{" "}
              <em>Procedia CIRP</em> 107.{" "}
              <a
                href="https://github.com/boschresearch/CNC_Machining"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bosch CNC Machining dataset
              </a>
            </li>
          </ol>
        </div>
      </div>

      <RelatedPosts slug="tsanomaly" />
    </article>
  );
}
