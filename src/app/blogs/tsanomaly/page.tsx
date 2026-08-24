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
          - a Python library I recently open-sourced for anomaly detection
          on time-series metrics. It is an attempt at a generalized solution
          with no thresholds to configure: it learns the normal behavior and
          seasonality of each individual metric on its own, and explains why
          a point was flagged as anomalous. The design is inspired by
          Anodot&apos;s original patents. Here is how it works.
        </p>

        <hr />

        <h2>The Curse of Low Dimensionality</h2>

        <p>
          I&apos;ve spent a good amount of my career building analytics and
          data science solutions on machine data - sensor readings, industrial
          telemetry, operational metrics etc. This kind of data has one
          defining property: each observation is extremely low-dimensional.
          An image has thousands of correlated pixels. A document has a whole
          vocabulary. A metric has just a timestamp and a single number - even
          though the system that produced it is just as complex. That&apos;s
          what makes time series hard to model: most of the times the data
          doesn&apos;t have enough dimensions to capture what is really
          happening underneath.
        </p>

        <p>
          With so few dimensions, forecasting and anomaly detection models
          have very little to work with. So in practice, teams fall back on
          simpler approaches - and each one breaks down at scale. Static
          thresholds generate too many false alarms once a metric has a daily
          cycle. Classical models need per-series tuning, which is not
          practical when you monitor thousands of metrics. And every metric
          behaves differently - a spiky network counter and a smooth
          temperature sensor should not be judged by the same rule. What you
          really need is a system that learns each metric on its own, without
          a human in the loop.
        </p>

        <p>
          Years ago, while working in this problem space, I came across the
          patents of <strong>Anodot</strong>, an Israeli company that built a
          generic anomaly-detection product for this kind of data. I liked the
          way they framed the solution: learn a baseline for every metric
          automatically, score anomalies against that metric&apos;s{" "}
          <em>own</em> history instead of a global rule, detect seasonality
          automatically, and group concurrent anomalies across metrics into
          single incidents <a href="#ref-1">[1]</a> <a href="#ref-2">[2]</a>.
          That framing stuck with me. tsanomaly is my take on the same
          problem - inspired by those ideas, but implemented with more recent
          statistical techniques.
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
          learned the daily and weekly seasonality on four months of history,
          then
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
          Every metric goes through the same pipeline: learn its normal
          behavior, predict a range of expected values, detect deviations,
          score their severity, and explain them. A few stages do most of the
          work:
        </p>

        <ul>
          <li>
            <strong>Seasonality is proposed, then verified.</strong> Finding
            seasonality happens in two steps. First, a Lomb-Scargle
            periodogram <a href="#ref-11">[11]</a> scans the metric&apos;s
            frequency spectrum and proposes candidate periods - for example,
            &ldquo;this metric might repeat every 24 hours&rdquo;. It handles
            missing data well, but noise can produce false peaks, so no
            candidate is trusted on its own. Second, each candidate is
            verified: if the period is real, the metric should correlate
            strongly with itself one, two, and three periods back. That
            correlation is compared against the same measurement on shuffled
            copies of the data, where any real seasonality has been destroyed
            - a candidate that does not clearly beat the shuffled copies is
            rejected. Verified periods are removed one at a time, shortest
            first, and the search repeats on what remains. This way a metric
            with both daily and weekly seasonality gets both, and a multiple
            of the daily cycle is never mistaken for a real weekly pattern.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog/tsanomaly/seasonality-propose-verify.svg"
              alt="Two-step seasonality detection: a periodogram proposes candidate periods of 24 hours and 37 hours; autocorrelation checks confirm the 24-hour period and reject the 37-hour one because it does not beat shuffled data"
              className="my-6 w-full"
            />
          </li>
          <li>
            <strong>The envelope is measured, not assumed.</strong> For every
            metric, the model predicts what the next value should be and draws
            an envelope around that prediction - the range where normal values
            are expected to land. Anything outside it is a potential anomaly,
            so getting the width right is everything. Instead of assuming a
            distribution (&ldquo;errors are Gaussian, so use three
            sigma&rdquo;), the width is calibrated with adaptive conformal
            inference <a href="#ref-6">[6]</a>: it is set from the prediction
            errors actually observed on that metric, and a feedback loop
            adjusts it so the envelope keeps containing 99.5% of normal
            points. If a metric gets noisier, its envelope widens
            automatically. The one exception: points already flagged as
            anomalous are excluded from this calibration - otherwise a large
            anomaly would stretch the envelope and hide the anomalies that
            follow it.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog/tsanomaly/envelope-calibration.svg"
              alt="A metric line inside a shaded envelope of expected values; the envelope widens where the metric gets noisier, and one point spiking outside the envelope is marked as a potential anomaly"
              className="my-6 w-full"
            />
          </li>
          <li>
            <strong>Rarity comes from extreme value theory.</strong> Knowing a
            point is outside the envelope is not enough - the score should
            reflect how rare that deviation actually is. The naive approach is
            to assume errors are Gaussian and read the probability off that
            curve, but real metrics have heavy tails: deviations a Gaussian
            calls once-in-a-million can show up every week. So the tail is
            modeled directly with a generalized Pareto distribution{" "}
            <a href="#ref-7">[7]</a>, fitted to the large deviations actually
            observed on that metric. How far a point landed outside the
            envelope is then converted into an honest probability - and that
            probability is what the 0-100 score is built from.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog/tsanomaly/gaussian-vs-pareto-tail.svg"
              alt="Two probability curves for large deviations: the Gaussian tail drops to nearly zero quickly, while the measured heavy tail stays higher; a real large deviation sits in the region the Gaussian calls almost impossible"
              className="my-6 w-full"
            />
          </li>
          <li>
            <strong>Detection works on episodes, not points.</strong> A 99.5%
            envelope, by definition, lets one normal point in every 200 land
            outside it - alerting on every single excursion would be constant
            noise. So consecutive out-of-envelope points are grouped into one
            episode, with hysteresis: a brief dip back inside the envelope
            does not end the episode. Each episode is then scored on three
            kinds of evidence: how far outside the envelope it went
            (magnitude), how long it lasted (duration), and how consistently
            it stayed outside (persistence). These three are obviously not
            independent - a severe episode tends to score high on all of them
            - so they are combined with a harmonic-mean p-value{" "}
            <a href="#ref-9">[9]</a>, a method that stays statistically valid
            even when the evidence is correlated.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog/tsanomaly/episodes-not-points.svg"
              alt="A metric with its envelope: one isolated point outside the envelope is ignored as expected noise, while a sustained run of points outside is grouped into a single scored episode, and a brief return inside the envelope does not end the episode"
              className="my-6 w-full"
            />
          </li>
          <li>
            <strong>A new normal is not an anomaly.</strong> Sometimes a
            metric shifts permanently - a deploy cuts latency in half, a
            config change doubles traffic. To a detector that only compares
            against the old baseline, every point after such a shift looks
            anomalous, and it will keep alerting for days until the baseline
            catches up. Bayesian online changepoint detection{" "}
            <a href="#ref-5">[5]</a> is used to tell the two apart: a
            deviation that settles into a new stable level is recognized as a
            &ldquo;regime change&rdquo; rather than an anomaly. The baseline
            is re-anchored to the new level, and you get one notification
            instead of days of alerts.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog/tsanomaly/regime-change.svg"
              alt="A metric drops permanently to a new lower level; the old baseline continues as a dashed ghost, the shift is flagged once as a regime change, and a new baseline is re-anchored around the new level instead of days of alerts"
              className="my-6 w-full"
            />
          </li>
          <li>
            <strong>Concurrent anomalies become one incident.</strong> A
            single real-world failure rarely touches just one metric - a bad
            deploy can push latency, error rate, and queue depth sideways at
            the same time, and paging someone twenty times for one outage
            helps no one. So when episodes on different metrics overlap in
            time far more than chance would predict, they are merged into a
            single incident. Inside the incident, metrics are ordered by
            which one moved first - a useful root-cause hint, since the
            origin of a failure usually moves before its downstream effects.
            One subtlety: twenty metrics that always move together are not
            twenty independent pieces of evidence, so the incident&apos;s
            significance is computed from the effective number of independent
            signals <a href="#ref-10">[10]</a> and correlated metrics are not
            double-counted.
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/blog/tsanomaly/incident-grouping.svg"
              alt="Three metric lanes for latency, error rate, and queue depth each show an anomaly episode overlapping in time; latency moved first as a root-cause hint, and the three episodes merge into one incident instead of three separate alerts"
              className="my-6 w-full"
            />
          </li>
        </ul>

        <p>
          Every anomaly comes with a full explanation: the expected range, the
          score breakdown, the model that produced it, and a counterfactual -
          &ldquo;no alert would have fired for values between X and Y at that
          time.&rdquo;
        </p>

        <h2>Prior Works</h2>

        <p>
          The overall architecture - per-metric baselines learned
          automatically, scoring against a metric&apos;s own history,
          automatic seasonality detection, incident grouping - is the shape
          Anodot&apos;s patents describe <a href="#ref-1">[1]</a>{" "}
          <a href="#ref-2">[2]</a> <a href="#ref-3">[3]</a>. The methods
          inside each stage are deliberately different: I used statistical
          techniques published after those patents were filed, such as
          adaptive conformal inference for envelope widths, extreme value
          theory for tail probabilities, Bayesian online changepoint
          detection for regime changes, and the harmonic-mean p-value for
          combining evidence. None of this is a claim that tsanomaly is
          better than a product refined in production for a decade. It is a
          design lineage, acknowledged openly in the{" "}
          <a
            href="https://github.com/visakhunnikrishnan/tsanomaly/blob/main/docs/architecture.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            architecture doc
          </a>
          : I kept the architecture the patents describe, and swapped the
          mechanisms for ones I could build in the open, on published
          research.
        </p>

        <h2>Validating on Machine Data</h2>

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
