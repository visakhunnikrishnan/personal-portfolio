import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/three-stages-of-app-deployment-build-release-and-run/abstract-silhouette-profiles-illustration.png";
import img1 from "../../../../public/blog/three-stages-of-app-deployment-build-release-and-run/build-release-run-stages-diagram.jpg";
import { BuildReleaseRunChart } from "@/components/build-release-run-chart";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Three Stages of App Deployment: Build, Release, and Run",
  description:
    "Why separating build, release, and run stages matters, what immutable releases actually look like in practice, and how this structure makes rollbacks trivial and deployments predictable.",
  keywords: ["build release run", "twelve-factor app", "deployment pipeline", "immutable releases", "CI/CD", "rollback", "Docker build", "release management", "continuous delivery"],
  openGraph: {
    title: "Three Stages of App Deployment: Build, Release, and Run",
    description:
      "Why separating build, release, and run stages matters, what immutable releases actually look like in practice, and how this structure makes rollbacks trivial and deployments predictable.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Three Stages of App Deployment: Build, Release, and Run",
    description: "Why separating build, release, and run stages matters, and how immutable releases make rollbacks trivial and deployments predictable.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Three Stages of App Deployment: Build, Release, and Run
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Visakh Unni</span>
          <span aria-hidden="true">&middot;</span>
          <time dateTime="2025-01-29">Jan 29, 2025</time>
          <span aria-hidden="true">&middot;</span>
          <span>10 min read</span>
        </div>
      </header>

      <Image
        src={heroImg}
        alt="The three stages of application deployment: build, release, and run"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          I&apos;ve seen teams where &quot;deploying&quot; meant a sequence of
          manual steps - install dependencies, edit config files, restart
          processes - all tangled together. When something broke, the question
          was always the same: &quot;What changed?&quot; And the answer was
          always unclear, because the build, the configuration, and the process
          restart were mixed into one ad-hoc sequence. When our team separated
          deployment into three distinct stages - build, release, run - those
          problems disappeared. Not because the code got better, but because the
          process became predictable.
        </p>

        <hr />

        <h2>Why Three Stages?</h2>
        <p>
          The 12-factor app methodology defines a strict separation between
          three deployment stages: build, release, and run. This isn&apos;t
          arbitrary. Each stage has a different purpose, runs at a different
          time, and is triggered by different events. Mixing them together is
          the root cause of most deployment problems - inconsistent environments,
          unreproducible bugs, impossible rollbacks.
        </p>
        <p>
          When they&apos;re properly separated, each stage becomes simple,
          predictable, and independently verifiable. The build produces an
          artifact. The release combines that artifact with configuration. The
          run executes the release. Nothing more.
        </p>

        <BuildReleaseRunChart />

        <h2>Build: Turn Code into an Artifact</h2>
        <p>
          The build stage takes a specific version of source code and transforms
          it into an executable artifact. This means fetching dependencies,
          compiling code if needed, running any pre-processing steps, and
          packaging everything into a single, self-contained unit.
        </p>
        <p>
          The key principle: a build is triggered by a developer (or a CI system)
          and produces exactly one artifact from exactly one commit. No
          environment-specific configuration is baked in. No secrets. No
          database URLs. Just the application code and its dependencies,
          packaged and ready.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># A typical build stage in a Dockerfile</span>
<span style="color:var(--hl-k)">FROM</span> python:3.12-slim <span style="color:var(--hl-k)">AS</span> build

<span style="color:var(--hl-k)">WORKDIR</span> /app
<span style="color:var(--hl-k)">COPY</span> requirements.txt .
<span style="color:var(--hl-k)">RUN</span> pip install <span style="color:var(--hl-v)">--no-cache-dir</span> -r requirements.txt

<span style="color:var(--hl-k)">COPY</span> . .
<span style="color:var(--hl-k)">RUN</span> python -m compileall .

<span style="color:var(--hl-c)"># The output: a container image with code + dependencies</span>
<span style="color:var(--hl-c)"># No config, no secrets, no environment-specific values</span>` }} /></pre>

        <p>
          What makes a build artifact useful is what it does not contain. There
          are no database connection strings, no API keys, no feature flags. The
          same artifact will eventually run in staging, production, and every
          other environment. If you bake production secrets into the build, you
          can&apos;t safely deploy that artifact to staging. If you bake the
          staging database URL in, the artifact is useless in production. A
          clean build is environment-agnostic.
        </p>
        <p>
          In practice, build artifacts take different forms depending on the
          stack: Docker images, Python wheels, compiled binaries, or bundled
          archives. What matters is that the artifact is versioned (tied to a
          specific commit), immutable (never modified after creation), and
          stored somewhere retrievable (a container registry, artifact
          repository, or S3 bucket).
        </p>

        <h2>Release: Combine Artifact with Configuration</h2>
        <p>
          The release stage takes a build artifact and pairs it with
          environment-specific configuration to produce a release. A release is
          the complete, ready-to-run package: the code, its dependencies, and
          the configuration that tells it which database to connect to, which
          API keys to use, and which feature flags to enable.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Release = Build artifact + Environment configuration</span>
<span style="color:var(--hl-c)">#</span>
<span style="color:var(--hl-c)"># Build artifact (same for all environments):</span>
<span style="color:var(--hl-c)">#   myapp:v2.4.1 (Docker image from commit abc123)</span>
<span style="color:var(--hl-c)">#</span>
<span style="color:var(--hl-c)"># Staging config:</span>
<span style="color:var(--hl-c)">#</span>   <span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://dev:dev@staging-db:5432/myapp</span>
<span style="color:var(--hl-c)">#</span>   <span style="color:var(--hl-v)">LOG_LEVEL</span>=<span style="color:var(--hl-s)">debug</span>
<span style="color:var(--hl-c)">#</span>   <span style="color:var(--hl-v)">FEATURE_NEW_CHECKOUT</span>=<span style="color:var(--hl-n)">true</span>
<span style="color:var(--hl-c)">#</span>
<span style="color:var(--hl-c)"># Production config:</span>
<span style="color:var(--hl-c)">#</span>   <span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://app:secret@prod-db:5432/myapp</span>
<span style="color:var(--hl-c)">#</span>   <span style="color:var(--hl-v)">LOG_LEVEL</span>=<span style="color:var(--hl-s)">warning</span>
<span style="color:var(--hl-c)">#</span>   <span style="color:var(--hl-v)">FEATURE_NEW_CHECKOUT</span>=<span style="color:var(--hl-n)">false</span>
<span style="color:var(--hl-c)">#</span>
<span style="color:var(--hl-c)"># Two different releases from the same build artifact</span>` }} /></pre>

        <p>
          This is the insight that makes the whole system work: the same build
          artifact produces different releases depending on which configuration
          you pair it with. Staging release and production release share
          identical code. The only difference is the environment variables.
        </p>

        <Image
          src={img1}
          alt="Three deployment stages illustrated: Build stage transforms code into an executable bundle by fetching dependencies and compiling code. Release stage combines the build with app configuration for the specific environment, producing a versioned container image. Run stage executes the application in its environment, serving users, immutable and separate from build and release"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          Every release gets a unique identifier - typically a sequential number
          (v1, v2, v3) or a timestamp (2025-01-29T14:30:00). This identifier
          is permanent. Release v42 always refers to the same build artifact
          with the same configuration. You can inspect it, compare it to v41,
          or roll back to it six months later with full confidence that
          you&apos;re getting exactly what ran before.
        </p>

        <h2>Run: Execute the Release</h2>
        <p>
          The run stage takes a release and executes it in the target
          environment. Processes start, the application begins serving requests,
          and background workers pick up jobs. This stage should be as simple
          and automated as possible.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Run stage: launch the release</span>
<span style="color:var(--hl-c)"># In Kubernetes, this is a deployment manifest</span>
<span style="color:var(--hl-k)">apiVersion</span>: apps/v1
<span style="color:var(--hl-k)">kind</span>: Deployment
<span style="color:var(--hl-k)">metadata</span>:
  <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">myapp</span>
<span style="color:var(--hl-k)">spec</span>:
  <span style="color:var(--hl-k)">replicas</span>: <span style="color:var(--hl-n)">3</span>
  <span style="color:var(--hl-k)">template</span>:
    <span style="color:var(--hl-k)">spec</span>:
      <span style="color:var(--hl-k)">containers</span>:
        - <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">myapp</span>
          <span style="color:var(--hl-k)">image</span>: <span style="color:var(--hl-s)">registry.example.com/myapp:v2.4.1</span>
          <span style="color:var(--hl-k)">envFrom</span>:
            - <span style="color:var(--hl-k)">configMapRef</span>:
                <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">myapp-production-config</span>
            - <span style="color:var(--hl-k)">secretRef</span>:
                <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">myapp-production-secrets</span>` }} /></pre>

        <p>
          The run stage is the wrong place for complexity. It should not compile
          code, install dependencies, run database migrations, or fetch
          configuration from remote sources. All of that belongs in build or
          release. The run stage does one thing: start the processes defined in
          the release.
        </p>
        <p>
          This matters because the run stage is where failures have the highest
          impact. If a process crashes at 3 AM, the orchestrator (Kubernetes,
          systemd, a process manager) needs to restart it automatically. That
          restart should be fast and deterministic - pull the release, start the
          process. If the run stage depends on downloading dependencies or
          compiling assets, a restart that should take seconds takes minutes,
          and a dependency registry outage means your application can&apos;t
          recover at all.
        </p>

        <h2>Why Strict Separation Matters</h2>
        <p>
          The three stages seem obvious when you describe them in isolation.
          But in practice, teams constantly blur the boundaries. Here are the
          most common violations and why they hurt:
        </p>

        <h3>Building in the Run Stage</h3>
        <p>
          Running <code>pip install</code> or <code>npm install</code> at
          container startup means your run stage depends on a package registry
          being available. If PyPI goes down or a package version is yanked,
          your application can&apos;t restart. You&apos;ve turned an
          infrastructure problem into an application outage. Install
          dependencies in the build stage, not the run stage.
        </p>

        <h3>Baking Config into the Build</h3>
        <p>
          Hardcoding <code>DATABASE_URL</code> or API keys into your build
          artifact means you need a separate build for each environment. You
          can&apos;t promote the same artifact from staging to production. You
          lose the guarantee that what you tested is what you deploy. Keep
          configuration out of the build and inject it at the release stage.
        </p>

        <h3>Modifying Running Code</h3>
        <p>
          SSH-ing into a production server to edit files, patch code, or tweak
          configuration is the ultimate stage violation. The running instance
          now differs from the release it was deployed from. No one knows the
          actual state of production. The next deployment overwrites whatever
          was changed. If you need to fix something, go back to the beginning:
          change the code, build a new artifact, create a new release, deploy
          it.
        </p>

        <h2>Immutable Releases and Rollbacks</h2>
        <p>
          When releases are immutable - once created, never modified - rollbacks
          become trivial. Rolling back isn&apos;t a special operation. It&apos;s
          just deploying a previous release.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Current state: running release v45</span>
<span style="color:var(--hl-c)"># Something is wrong. Roll back to v44.</span>

<span style="color:var(--hl-c)"># With immutable releases, this is a one-liner:</span>
<span style="color:var(--hl-f)">kubectl</span> set image deployment/myapp myapp=<span style="color:var(--hl-s)">registry.example.com/myapp:v44</span>

<span style="color:var(--hl-c)"># Or with Helm:</span>
<span style="color:var(--hl-f)">helm</span> rollback myapp <span style="color:var(--hl-n)">44</span>

<span style="color:var(--hl-c)"># v44 is exactly what it was when it was first deployed.</span>
<span style="color:var(--hl-c)"># Same artifact, same config, same behavior. No surprises.</span>` }} /></pre>

        <p>
          Compare this to a world without immutable releases. &quot;Rolling
          back&quot; means figuring out which commit was deployed, rebuilding
          it (hoping the same dependencies are still available), reapplying
          configuration (hoping you remember what it was), and deploying the
          result (hoping it behaves the same). That&apos;s not a rollback -
          it&apos;s a new, untested deployment under pressure.
        </p>
        <p>
          Immutable releases also make auditing straightforward. Every release
          is a record: this artifact, with this configuration, deployed at this
          time. You can answer &quot;what was running in production last
          Tuesday at 2 PM?&quot; with certainty, not guesswork.
        </p>

        <h2>What This Looks Like in CI/CD</h2>
        <p>
          A well-structured CI/CD pipeline maps directly to the three stages.
          Here&apos;s a simplified example:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># .github/workflows/deploy.yml</span>
<span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">Build, Release, Run</span>

<span style="color:var(--hl-k)">on</span>:
  <span style="color:var(--hl-k)">push</span>:
    <span style="color:var(--hl-k)">branches</span>: [<span style="color:var(--hl-s)">main</span>]

<span style="color:var(--hl-k)">jobs</span>:
  <span style="color:var(--hl-v)">build</span>:
    <span style="color:var(--hl-k)">runs-on</span>: <span style="color:var(--hl-s)">ubuntu-latest</span>
    <span style="color:var(--hl-k)">steps</span>:
      - <span style="color:var(--hl-k)">uses</span>: <span style="color:var(--hl-s)">actions/checkout@v4</span>

      - <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">Build Docker image</span>
        <span style="color:var(--hl-k)">run</span>: <span style="color:var(--hl-f)">docker</span> build -t myapp:\${GITHUB_SHA::7} .

      - <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">Push to registry</span>
        <span style="color:var(--hl-k)">run</span>: <span style="color:var(--hl-f)">docker</span> push registry.example.com/myapp:\${GITHUB_SHA::7}

  <span style="color:var(--hl-v)">release</span>:
    <span style="color:var(--hl-k)">needs</span>: <span style="color:var(--hl-s)">build</span>
    <span style="color:var(--hl-k)">runs-on</span>: <span style="color:var(--hl-s)">ubuntu-latest</span>
    <span style="color:var(--hl-k)">steps</span>:
      - <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">Create release tag</span>
        <span style="color:var(--hl-k)">run</span>: |
          <span style="color:var(--hl-c)"># Tag the build with a release number</span>
          <span style="color:var(--hl-f)">docker</span> tag myapp:\${GITHUB_SHA::7} myapp:v\${GITHUB_RUN_NUMBER}
          <span style="color:var(--hl-f)">docker</span> push registry.example.com/myapp:v\${GITHUB_RUN_NUMBER}

  <span style="color:var(--hl-v)">deploy</span>:
    <span style="color:var(--hl-k)">needs</span>: <span style="color:var(--hl-s)">release</span>
    <span style="color:var(--hl-k)">runs-on</span>: <span style="color:var(--hl-s)">ubuntu-latest</span>
    <span style="color:var(--hl-k)">steps</span>:
      - <span style="color:var(--hl-k)">name</span>: <span style="color:var(--hl-s)">Deploy to production</span>
        <span style="color:var(--hl-k)">run</span>: |
          <span style="color:var(--hl-f)">kubectl</span> set image deployment/myapp \\
            myapp=registry.example.com/myapp:v\${GITHUB_RUN_NUMBER}` }} /></pre>

        <p>
          Each job maps to a stage. The build job produces an artifact from a
          commit. The release job tags it with a version. The deploy job runs
          it in the target environment. If any stage fails, the later stages
          don&apos;t execute. If production breaks, you roll back to a previous
          release tag.
        </p>

        <h2>Where Migrations Fit</h2>
        <p>
          Database migrations are the one piece that doesn&apos;t fit neatly
          into the three stages, and teams handle them differently. The common
          approaches:
        </p>
        <ul>
          <li>
            <strong>Run migrations as a separate job before deploy.</strong>{" "}
            After the release is created but before the run stage starts, a
            migration job runs against the target database. This keeps
            migrations out of the run stage while ensuring the schema is ready
            before traffic arrives.
          </li>
          <li>
            <strong>Run migrations at application startup.</strong> Some
            frameworks (Django, Rails) support running migrations when the
            process starts. This is simpler but risky with multiple replicas -
            two pods might try to run the same migration simultaneously.
          </li>
          <li>
            <strong>Treat migrations as their own pipeline.</strong> In larger
            systems, schema changes are deployed independently of application
            code. The migration runs first, the application code that uses the
            new schema deploys later. This requires backward-compatible
            migrations but gives the most control.
          </li>
        </ul>
        <p>
          The important thing is that migrations have a clear home. They
          shouldn&apos;t be something you SSH in and run manually on production
          Friday afternoon.
        </p>

        <h2>Key Takeaway</h2>
        <p>
          Build, release, run is not just a deployment model - it&apos;s a way
          of thinking about the path from code to production. The build stage
          is where complexity is allowed: dependency resolution, compilation,
          asset processing. The release stage is where environment specificity
          enters: configuration, secrets, feature flags. The run stage is where
          simplicity is required: start the process, serve traffic. Keep these
          stages distinct, make releases immutable, and you get deployments that
          are reproducible, auditable, and trivially reversible. Every time you
          catch yourself blurring the boundaries - installing packages at
          startup, hardcoding config, hotfixing production - that&apos;s a sign
          the stages need cleaner separation.
        </p>
      </div>

      <RelatedPosts slug="three-stages-of-app-deployment-build-release-and-run" />
    </article>
  );
}
