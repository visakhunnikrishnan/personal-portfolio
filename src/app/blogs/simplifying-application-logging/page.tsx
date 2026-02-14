import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/simplifying-application-logging/aerial-view-feet-over-city.png";
import img0 from "../../../../public/blog/simplifying-application-logging/log-aggregation-pipeline-diagram.png";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Simplifying Application Logging",
  description:
    "Why your application should write logs to stdout and nothing else, what happens when applications manage their own log files, and how structured logging and log aggregation work in modern deployments.",
  keywords: ["application logging", "twelve-factor app", "stdout", "structured logging", "log aggregation", "JSON logging", "request tracing", "ELK stack", "Docker logs", "Python logging"],
  openGraph: {
    title: "Simplifying Application Logging",
    description:
      "Why your application should write logs to stdout and nothing else, what happens when applications manage their own log files, and how structured logging and log aggregation work in modern deployments.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simplifying Application Logging",
    description: "Why your application should write logs to stdout and nothing else, and how structured logging and log aggregation work in modern deployments.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Simplifying Application Logging
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
        alt="Aerial view symbolizing the broad perspective that good logging gives you over your application"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Earlier, most applications managed their own log files. Each service
          decided where to write, how to rotate, and when to clean up old logs.
          This worked when you had one server running one application. But when
          teams started deploying to containers, scaling to multiple instances,
          and running across distributed systems, the approach fell apart.
          Log files were scattered across machines, lost when containers
          restarted, and impossible to search across services. The 12-factor
          methodology introduced a cleaner rule: your application should treat
          logs as event streams and write them to stdout. Nothing more.
        </p>

        <hr />

        <h2>The Rule: Logs Are Streams</h2>
        <p>
          A log is a time-ordered sequence of events. Every time something
          happens in your application - a request arrives, a query runs,
          an error occurs - that is an event. The 12-factor principle
          says your application should write each event as a line to standard
          output (<code>stdout</code>). That is it. No file paths, no rotation
          logic, no log management code inside your application.
        </p>
        <p>
          The application does not know and should not care where its logs end
          up. In development, they scroll in your terminal. In production, the
          execution environment captures them and routes them wherever they
          need to go. The application just writes. Everything else is someone
          else&apos;s job.
        </p>

        <h2>What Goes Wrong When Applications Manage Their Own Logs</h2>
        <p>
          Here is a pattern that looks reasonable but causes real problems at
          scale:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">import</span> logging

<span style="color:var(--hl-c)"># Application manages its own log file</span>
handler = logging.<span style="color:var(--hl-f)">FileHandler</span>(<span style="color:var(--hl-s)">"/var/log/myapp/app.log"</span>)
handler.<span style="color:var(--hl-f)">setFormatter</span>(logging.<span style="color:var(--hl-f)">Formatter</span>(
    <span style="color:var(--hl-s)">"%(asctime)s %(levelname)s %(message)s"</span>
))

logger = logging.<span style="color:var(--hl-f)">getLogger</span>(<span style="color:var(--hl-s)">"myapp"</span>)
logger.<span style="color:var(--hl-f)">addHandler</span>(handler)
logger.<span style="color:var(--hl-f)">setLevel</span>(logging.<span style="color:var(--hl-v)">INFO</span>)

logger.<span style="color:var(--hl-f)">info</span>(<span style="color:var(--hl-s)">"Application started"</span>)` }} /></pre>

        <p>
          This writes logs to a file on disk. It seems fine for a single server.
          But several things break as you scale:
        </p>
        <ul>
          <li>
            <strong>Containers lose files on restart.</strong> When a container
            stops, its filesystem is gone. All those logs disappear unless you
            set up volume mounts - which adds complexity that the
            application should not be responsible for.
          </li>
          <li>
            <strong>Multiple instances write to different files.</strong> If you
            run three instances of the same service, each writes to its own
            local file. To debug an issue, you need to SSH into each machine,
            find the right file, and manually correlate events across them.
          </li>
          <li>
            <strong>Disk fills up silently.</strong> Without rotation, log files
            grow until the disk is full. The application either crashes or starts
            dropping logs. Now your logging code needs rotation logic, retention
            policies, and error handling - none of which is the
            application&apos;s job.
          </li>
          <li>
            <strong>File paths differ between environments.</strong>{" "}
            <code>/var/log/myapp/</code> might exist on your production server
            but not in your local Docker container. Now the application needs
            environment-specific configuration just for logging, which violates
            the principle of keeping code identical across environments.
          </li>
        </ul>

        <h2>The Right Way: Write to Stdout</h2>
        <p>
          The fix is simple. Instead of a <code>FileHandler</code>, use a{" "}
          <code>StreamHandler</code> that writes to <code>stdout</code>:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">import</span> logging
<span style="color:var(--hl-k)">import</span> sys

<span style="color:var(--hl-c)"># Application writes to stdout - nothing else</span>
handler = logging.<span style="color:var(--hl-f)">StreamHandler</span>(sys.<span style="color:var(--hl-v)">stdout</span>)
handler.<span style="color:var(--hl-f)">setFormatter</span>(logging.<span style="color:var(--hl-f)">Formatter</span>(
    <span style="color:var(--hl-s)">"%(asctime)s %(levelname)s %(message)s"</span>
))

logger = logging.<span style="color:var(--hl-f)">getLogger</span>(<span style="color:var(--hl-s)">"myapp"</span>)
logger.<span style="color:var(--hl-f)">addHandler</span>(handler)
logger.<span style="color:var(--hl-f)">setLevel</span>(logging.<span style="color:var(--hl-v)">INFO</span>)

logger.<span style="color:var(--hl-f)">info</span>(<span style="color:var(--hl-s)">"Application started"</span>)
<span style="color:var(--hl-c)"># Output: 2025-01-29 10:15:32,041 INFO Application started</span>` }} /></pre>

        <p>
          The application code is nearly identical. The only change is
          where the logs go. But this one change makes the application
          work the same way everywhere - on a developer&apos;s laptop,
          in a Docker container, on a Kubernetes pod, or on a bare-metal
          server. No file paths to configure. No directories to create. No
          rotation to manage.
        </p>

        <h2>Why Stdout? Because the Environment Decides</h2>
        <p>
          The key insight is that routing logs is an infrastructure concern,
          not an application concern. Where logs go depends on where the
          application is running, and the application should not know or care
          about that.
        </p>
        <p>
          In <strong>local development</strong>, logs appear directly in the
          terminal. You see them as they happen. No setup needed.
        </p>
        <p>
          In <strong>Docker</strong>, the container runtime captures everything
          written to stdout. You read it with <code>docker logs</code>:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># View logs from a running container</span>
<span style="color:var(--hl-f)">docker</span> logs myapp-container

<span style="color:var(--hl-c)"># Follow logs in real-time</span>
<span style="color:var(--hl-f)">docker</span> logs -f myapp-container

<span style="color:var(--hl-c)"># Show only the last 100 lines</span>
<span style="color:var(--hl-f)">docker</span> logs --tail <span style="color:var(--hl-n)">100</span> myapp-container` }} /></pre>

        <p>
          In <strong>Kubernetes</strong>, the same stdout output is available
          through <code>kubectl logs</code>. If the pod crashes and restarts,
          you can still access the previous container&apos;s logs:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># View current pod logs</span>
<span style="color:var(--hl-f)">kubectl</span> logs myapp-pod

<span style="color:var(--hl-c)"># View logs from the previous crashed container</span>
<span style="color:var(--hl-f)">kubectl</span> logs myapp-pod --previous

<span style="color:var(--hl-c)"># Follow logs across all pods with a label</span>
<span style="color:var(--hl-f)">kubectl</span> logs -f -l <span style="color:var(--hl-v)">app</span>=myapp` }} /></pre>

        <p>
          In <strong>production at scale</strong>, a log collector like
          Fluentd or Filebeat picks up stdout from every container and ships
          it to a centralized system like Elasticsearch, Splunk, or
          CloudWatch. The application never changed. Only the environment
          around it did.
        </p>

        <Image
          src={img0}
          alt="Log pipeline: services like database, microservice, and web server write to stdout as a continuous log stream, the execution environment (container or server) captures these streams, then routes them to real-time alerts, log analysis tools, and a database for long-term storage"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h2>Structured Logging: Making Logs Machine-Readable</h2>
        <p>
          Writing to stdout is the first step. The second step is making
          your logs useful at scale. Plain text logs like{" "}
          <code>Application started</code> are fine for reading in a terminal,
          but they are hard to filter, search, and aggregate when you have
          thousands of log lines per second across dozens of services.
        </p>
        <p>
          Structured logging means writing each event as a JSON object
          instead of a plain string. Every field becomes searchable and
          filterable:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">import</span> logging
<span style="color:var(--hl-k)">import</span> json
<span style="color:var(--hl-k)">import</span> sys
<span style="color:var(--hl-k)">from</span> datetime <span style="color:var(--hl-k)">import</span> datetime, timezone

<span style="color:var(--hl-k)">class</span> <span style="color:var(--hl-f)">JsonFormatter</span>(logging.Formatter):
    <span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">format</span>(self, record):
        <span style="color:var(--hl-k)">return</span> json.<span style="color:var(--hl-f)">dumps</span>({
            <span style="color:var(--hl-s)">"timestamp"</span>: datetime.<span style="color:var(--hl-f)">now</span>(timezone.<span style="color:var(--hl-v)">utc</span>).<span style="color:var(--hl-f)">isoformat</span>(),
            <span style="color:var(--hl-s)">"level"</span>: record.<span style="color:var(--hl-v)">levelname</span>,
            <span style="color:var(--hl-s)">"message"</span>: record.<span style="color:var(--hl-f)">getMessage</span>(),
            <span style="color:var(--hl-s)">"logger"</span>: record.<span style="color:var(--hl-v)">name</span>,
            <span style="color:var(--hl-s)">"module"</span>: record.<span style="color:var(--hl-v)">module</span>,
        })

handler = logging.<span style="color:var(--hl-f)">StreamHandler</span>(sys.<span style="color:var(--hl-v)">stdout</span>)
handler.<span style="color:var(--hl-f)">setFormatter</span>(<span style="color:var(--hl-f)">JsonFormatter</span>())

logger = logging.<span style="color:var(--hl-f)">getLogger</span>(<span style="color:var(--hl-s)">"myapp"</span>)
logger.<span style="color:var(--hl-f)">addHandler</span>(handler)
logger.<span style="color:var(--hl-f)">setLevel</span>(logging.<span style="color:var(--hl-v)">INFO</span>)

logger.<span style="color:var(--hl-f)">info</span>(<span style="color:var(--hl-s)">"User logged in"</span>)` }} /></pre>

        <p>This produces output like:</p>

        <pre><code dangerouslySetInnerHTML={{ __html: `{
  <span style="color:var(--hl-s)">"timestamp"</span>: <span style="color:var(--hl-s)">"2025-01-29T10:15:32.041Z"</span>,
  <span style="color:var(--hl-s)">"level"</span>: <span style="color:var(--hl-s)">"INFO"</span>,
  <span style="color:var(--hl-s)">"message"</span>: <span style="color:var(--hl-s)">"User logged in"</span>,
  <span style="color:var(--hl-s)">"logger"</span>: <span style="color:var(--hl-s)">"myapp"</span>,
  <span style="color:var(--hl-s)">"module"</span>: <span style="color:var(--hl-s)">"auth"</span>
}` }} /></pre>

        <p>
          Now a log aggregation tool can index every field. You can query
          for all <code>ERROR</code> level events, or all events from the{" "}
          <code>auth</code> module, or all events in the last five minutes.
          You can add custom fields like <code>user_id</code>,{" "}
          <code>request_id</code>, or <code>duration_ms</code> to make
          debugging even easier.
        </p>

        <h2>The Log Aggregation Pipeline</h2>
        <p>
          When your application writes to stdout, the environment handles
          everything else. A typical production pipeline looks like this:
        </p>
        <ol>
          <li>
            <strong>Application writes to stdout.</strong> Each process
            produces a stream of log events.
          </li>
          <li>
            <strong>Container runtime captures the stream.</strong> Docker
            or Kubernetes stores the output in temporary files on the node.
          </li>
          <li>
            <strong>Log collector picks up the files.</strong> A tool like
            Fluentd, Filebeat, or the CloudWatch agent runs on each node
            and reads the captured output.
          </li>
          <li>
            <strong>Collector ships logs to a central store.</strong> The
            logs are sent to Elasticsearch, Splunk, Datadog, CloudWatch, or
            whatever the team uses for observability.
          </li>
          <li>
            <strong>Teams search, alert, and build dashboards.</strong>{" "}
            Centralized logs make it possible to trace a request across
            services, set up alerts for error spikes, and visualize trends.
          </li>
        </ol>
        <p>
          The application knows nothing about this pipeline. It writes to
          stdout. The pipeline can be changed - switching from
          Elasticsearch to Splunk, or adding a new alerting tool -
          without touching any application code.
        </p>

        <h2>Adding Context: Request Tracing</h2>
        <p>
          In a distributed system, a single user action can trigger requests
          across multiple services. Without a way to connect the dots, you
          end up searching through millions of log lines trying to find the
          ones related to a specific problem.
        </p>
        <p>
          The solution is to include a <code>request_id</code> in every log
          event. When a request enters the system, generate a unique ID and
          pass it through every service call. Every log line includes that ID:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">import</span> uuid

<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">handle_request</span>(request):
    request_id = request.headers.<span style="color:var(--hl-f)">get</span>(
        <span style="color:var(--hl-s)">"X-Request-ID"</span>,
        <span style="color:var(--hl-f)">str</span>(uuid.<span style="color:var(--hl-f)">uuid4</span>())
    )

    logger.<span style="color:var(--hl-f)">info</span>(<span style="color:var(--hl-s)">"Request received"</span>, extra={
        <span style="color:var(--hl-s)">"request_id"</span>: request_id,
        <span style="color:var(--hl-s)">"method"</span>: request.<span style="color:var(--hl-v)">method</span>,
        <span style="color:var(--hl-s)">"path"</span>: request.<span style="color:var(--hl-v)">path</span>,
    })

    <span style="color:var(--hl-c)"># Pass request_id to downstream service calls</span>
    response = call_payment_service(
        order_id=order.<span style="color:var(--hl-v)">id</span>,
        headers={<span style="color:var(--hl-s)">"X-Request-ID"</span>: request_id}
    )

    logger.<span style="color:var(--hl-f)">info</span>(<span style="color:var(--hl-s)">"Request completed"</span>, extra={
        <span style="color:var(--hl-s)">"request_id"</span>: request_id,
        <span style="color:var(--hl-s)">"status"</span>: response.<span style="color:var(--hl-v)">status_code</span>,
    })` }} /></pre>

        <p>
          Now, to debug an issue for a specific request, you search your
          log aggregation tool for that single <code>request_id</code>.
          Every event from every service that touched that request shows
          up, in order. Instead of guessing which log lines are related, you
          see the full picture in seconds.
        </p>

        <h2>What Not to Log</h2>
        <p>
          Logging everything is tempting but counterproductive. Too many logs
          create noise that makes it harder to find real problems. Some
          guidelines:
        </p>
        <ul>
          <li>
            <strong>Do not log sensitive data.</strong> Passwords, tokens,
            credit card numbers, and personal identifiers should never appear
            in logs. Once they are in your log aggregation system, they are
            searchable by anyone with access.
          </li>
          <li>
            <strong>Do not log on every iteration of a loop.</strong> If your
            application processes 10,000 records, logging each one creates
            10,000 nearly identical log lines. Log the start, the end, and
            any errors in between.
          </li>
          <li>
            <strong>Do not use logs for metrics.</strong> If you need to
            track request count or response time, use a metrics system like
            Prometheus. Logs are for events. Metrics are for measurements.
          </li>
        </ul>

        <h2>Key Takeaway</h2>
        <p>
          Your application should write logs to stdout as a stream of
          events. It should not manage log files, decide where logs go, or
          implement rotation. The execution environment - whether
          Docker, Kubernetes, or a cloud platform - captures that
          stream and routes it to the right place. This keeps the application
          simple, makes it work the same way in every environment, and lets
          the infrastructure team change the log pipeline without touching
          application code. Write structured JSON to stdout. Let everything
          else be someone else&apos;s problem.
        </p>
      </div>

      <RelatedPosts slug="simplifying-application-logging" />
    </article>
  );
}
