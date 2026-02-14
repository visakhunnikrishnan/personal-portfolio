import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/disposability-in-software-development/technician-at-server-rack.png";
import img0 from "../../../../public/blog/disposability-in-software-development/process-lifecycle-diagram.png";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Disposability in Software Development",
  description:
    "Why your processes should start fast and shut down cleanly, what happens when they do not, and practical patterns for handling SIGTERM, draining connections, and designing for crash safety in containers.",
  keywords: ["disposability", "twelve-factor app", "graceful shutdown", "SIGTERM", "fast startup", "crash safety", "Kubernetes", "Gunicorn", "Celery", "idempotent jobs", "container lifecycle"],
  openGraph: {
    title: "Disposability in Software Development",
    description:
      "Why your processes should start fast and shut down cleanly, what happens when they do not, and practical patterns for handling SIGTERM, draining connections, and designing for crash safety in containers.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disposability in Software Development",
    description: "Why your processes should start fast and shut down cleanly, and practical patterns for handling SIGTERM and crash safety in containers.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Disposability in Software Development
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
        alt="Technician working on server hardware, representing the hands-on reality of processes starting and stopping in production"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Processes get killed all the time. Deploys replace old instances
          with new ones. Autoscalers remove capacity when traffic drops.
          Containers get evicted when a node runs low on memory. Hardware
          fails without warning. If a process cannot start quickly and shut
          down cleanly, every one of these routine events becomes a
          potential outage - dropped requests, lost jobs, corrupted data.
          The 12-factor methodology says processes should be disposable:
          fast to start, graceful to stop, and safe to crash.
        </p>

        <hr />

        <h2>What Disposability Means</h2>
        <p>
          A disposable process can be started or stopped at any moment
          without causing harm. It does not depend on being long-lived.
          It does not hold critical state that would be lost if it died.
          It treats itself as expendable - one of potentially many
          identical instances that can be replaced without anyone noticing.
        </p>
        <p>
          This matters for three reasons:
        </p>
        <ul>
          <li>
            <strong>Fast deploys.</strong> When you deploy a new version,
            old processes are stopped and new ones start. If startup takes
            thirty seconds, every deploy has thirty seconds of reduced
            capacity.
          </li>
          <li>
            <strong>Elastic scaling.</strong> When traffic spikes, new
            instances need to start handling requests immediately. When
            traffic drops, instances need to shut down without dropping
            in-flight work.
          </li>
          <li>
            <strong>Failure recovery.</strong> When a process crashes or a
            machine dies, the system replaces it. Fast startup means fast
            recovery.
          </li>
        </ul>

        <Image
          src={img0}
          alt="Life cycle of a process in a 12-factor app: initialization, transition to operational state, core activities during operational state, shutdown initiation with careful preparation, data preservation ensuring integrity, and shutdown completion maintaining service continuity"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h2>Fast Startup</h2>
        <p>
          A process should go from launch to ready in seconds, not minutes.
          The faster it starts, the faster you can deploy, scale, and
          recover from failures.
        </p>
        <p>
          What slows startup down:
        </p>
        <ul>
          <li>
            Loading large datasets or caches into memory before accepting
            requests.
          </li>
          <li>
            Connecting to every external service synchronously during
            initialization.
          </li>
          <li>
            Running database migrations as part of the startup sequence.
          </li>
          <li>
            Pre-computing derived data that could be computed lazily.
          </li>
        </ul>
        <p>
          The fix is to do the minimum work needed to start accepting
          requests. Connections can be established lazily on first use.
          Caches can warm up in the background. Migrations should run as
          a separate admin process, not as part of startup:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">from</span> flask <span style="color:var(--hl-k)">import</span> Flask
<span style="color:var(--hl-k)">from</span> sqlalchemy <span style="color:var(--hl-k)">import</span> create_engine
<span style="color:var(--hl-k)">import</span> os

app = <span style="color:var(--hl-f)">Flask</span>(__name__)

<span style="color:var(--hl-c)"># Lazy connection - engine is created at import time</span>
<span style="color:var(--hl-c)"># but the actual database connection happens on first query</span>
engine = <span style="color:var(--hl-f)">create_engine</span>(
    os.environ[<span style="color:var(--hl-s)">"DATABASE_URL"</span>],
    pool_pre_ping=<span style="color:var(--hl-n)">True</span>,   <span style="color:var(--hl-c)"># verify connections are alive</span>
    pool_size=<span style="color:var(--hl-n)">5</span>,           <span style="color:var(--hl-c)"># limit connection pool</span>
)

<span style="color:var(--hl-k)">@</span>app.<span style="color:var(--hl-f)">route</span>(<span style="color:var(--hl-s)">"/"</span>)
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">index</span>():
    <span style="color:var(--hl-c)"># Connection is established here, on first actual use</span>
    <span style="color:var(--hl-k)">with</span> engine.<span style="color:var(--hl-f)">connect</span>() <span style="color:var(--hl-k)">as</span> conn:
        result = conn.<span style="color:var(--hl-f)">execute</span>(<span style="color:var(--hl-s)">"SELECT 1"</span>)
    <span style="color:var(--hl-k)">return</span> {<span style="color:var(--hl-s)">"status"</span>: <span style="color:var(--hl-s)">"healthy"</span>}` }} /></pre>

        <p>
          The application starts instantly. The database connection is only
          established when the first request needs it. If the database is
          temporarily unavailable at startup, the application still starts -
          it will fail on the first request that needs the database, not on
          startup itself.
        </p>

        <h2>Graceful Shutdown: Web Processes</h2>
        <p>
          When a process receives a <code>SIGTERM</code> signal, it should
          stop accepting new requests, finish any requests it is currently
          handling, and then exit. This is called graceful shutdown.
        </p>
        <p>
          For a web process behind a load balancer, the sequence looks like
          this:
        </p>
        <ol>
          <li>
            The platform sends <code>SIGTERM</code> to the process.
          </li>
          <li>
            The load balancer stops routing new requests to this instance.
          </li>
          <li>
            The process finishes all in-flight requests (connection
            draining).
          </li>
          <li>
            The process closes its listening socket and exits.
          </li>
        </ol>
        <p>
          Gunicorn, the production WSGI server commonly used with Flask and
          Django, handles this automatically. When it receives{" "}
          <code>SIGTERM</code>, it stops accepting new connections and
          waits for active workers to finish:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Gunicorn handles graceful shutdown by default</span>
<span style="color:var(--hl-c)"># --graceful-timeout controls how long workers have to finish</span>

<span style="color:var(--hl-f)">gunicorn</span> --bind <span style="color:var(--hl-n)">0.0.0.0</span>:<span style="color:var(--hl-n)">5000</span> \\
    --workers <span style="color:var(--hl-n)">4</span> \\
    --graceful-timeout <span style="color:var(--hl-n)">30</span> \\
    app:app

<span style="color:var(--hl-c)"># On SIGTERM:</span>
<span style="color:var(--hl-c)"># 1. Stop accepting new connections</span>
<span style="color:var(--hl-c)"># 2. Wait up to 30 seconds for workers to finish</span>
<span style="color:var(--hl-c)"># 3. Kill workers that haven't finished</span>
<span style="color:var(--hl-c)"># 4. Exit</span>` }} /></pre>

        <p>
          From the user&apos;s perspective, nothing happens. Requests that
          were in progress complete normally. New requests go to other
          instances. The transition is invisible.
        </p>

        <h2>Graceful Shutdown: Worker Processes</h2>
        <p>
          Worker processes that pull jobs from a queue need a different
          shutdown strategy. When a worker receives <code>SIGTERM</code>,
          it should finish the current job and then stop pulling new ones.
        </p>
        <p>
          The key pattern is <strong>delayed acknowledgment</strong>. The
          worker does not tell the queue &quot;I am done with this
          job&quot; until the job is actually complete. If the worker dies
          before finishing, the job stays in the queue and another worker
          picks it up:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">import</span> signal
<span style="color:var(--hl-k)">import</span> time

<span style="color:var(--hl-v)">running</span> = <span style="color:var(--hl-n)">True</span>

<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">handle_sigterm</span>(signum, frame):
    <span style="color:var(--hl-k)">global</span> running
    <span style="color:var(--hl-f)">print</span>(<span style="color:var(--hl-s)">"SIGTERM received, finishing current job..."</span>)
    running = <span style="color:var(--hl-n)">False</span>

signal.<span style="color:var(--hl-f)">signal</span>(signal.<span style="color:var(--hl-v)">SIGTERM</span>, handle_sigterm)

<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">process_job</span>(job):
    <span style="color:var(--hl-c)"># Do the actual work</span>
    <span style="color:var(--hl-f)">print</span>(<span style="color:var(--hl-s)">f"Processing job </span>{job.<span style="color:var(--hl-v)">id</span>}<span style="color:var(--hl-s)">"</span>)
    time.<span style="color:var(--hl-f)">sleep</span>(<span style="color:var(--hl-n)">2</span>)  <span style="color:var(--hl-c)"># simulate work</span>

<span style="color:var(--hl-k)">while</span> running:
    job = queue.<span style="color:var(--hl-f)">get</span>()          <span style="color:var(--hl-c)"># pull a job from the queue</span>
    <span style="color:var(--hl-f)">process_job</span>(job)            <span style="color:var(--hl-c)"># do the work</span>
    queue.<span style="color:var(--hl-f)">acknowledge</span>(job)      <span style="color:var(--hl-c)"># THEN tell the queue it's done</span>

<span style="color:var(--hl-f)">print</span>(<span style="color:var(--hl-s)">"Worker shut down cleanly"</span>)` }} /></pre>

        <p>
          When <code>SIGTERM</code> arrives, the <code>running</code> flag
          is set to <code>False</code>. The current job finishes, gets
          acknowledged, and the loop exits. No jobs are lost. If the worker
          is killed before acknowledging, the queue treats the job as
          unfinished and hands it to another worker.
        </p>
        <p>
          Celery, the most common Python task queue, supports this with
          the <code>acks_late</code> setting:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># celery_app.py</span>

<span style="color:var(--hl-k)">from</span> celery <span style="color:var(--hl-k)">import</span> Celery

app = <span style="color:var(--hl-f)">Celery</span>(<span style="color:var(--hl-s)">"tasks"</span>, broker=<span style="color:var(--hl-s)">"redis://localhost:6379/0"</span>)

<span style="color:var(--hl-c)"># Acknowledge jobs AFTER they complete, not before</span>
app.conf.<span style="color:var(--hl-v)">task_acks_late</span> = <span style="color:var(--hl-n)">True</span>

<span style="color:var(--hl-c)"># Reject jobs back to the queue if the worker is killed</span>
app.conf.<span style="color:var(--hl-v)">task_reject_on_worker_lost</span> = <span style="color:var(--hl-n)">True</span>

<span style="color:var(--hl-k)">@</span>app.<span style="color:var(--hl-f)">task</span>
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">send_email</span>(user_id, template):
    user = <span style="color:var(--hl-f)">get_user</span>(user_id)
    <span style="color:var(--hl-f)">deliver_email</span>(user.email, template)
    <span style="color:var(--hl-c)"># Job is acknowledged only after this function returns</span>` }} /></pre>

        <p>
          With <code>acks_late=True</code>, if the worker dies mid-task,
          the job goes back to the queue. Another worker picks it up. No
          emails are silently lost.
        </p>

        <h2>What Happens Without Graceful Shutdown</h2>
        <p>
          When processes are killed abruptly without graceful shutdown:
        </p>
        <ul>
          <li>
            <strong>Web requests get dropped.</strong> Users see connection
            reset errors or 502 responses. If the request was a payment
            submission, the user does not know if it went through.
          </li>
          <li>
            <strong>Background jobs disappear.</strong> If a worker
            acknowledges a job before processing it (the default in many
            systems), and then dies, the job is gone. The email never
            sends. The report never generates.
          </li>
          <li>
            <strong>Data gets corrupted.</strong> A process writing to a
            file or database gets killed mid-write. The data is in an
            inconsistent state.
          </li>
          <li>
            <strong>Connections leak.</strong> Database connections and file
            handles that were never properly closed pile up. The database
            eventually runs out of connection slots.
          </li>
        </ul>

        <h2>Designing for Crash Safety</h2>
        <p>
          Graceful shutdown handles the expected case - the platform sends{" "}
          <code>SIGTERM</code> and gives the process time to finish. But
          processes also die unexpectedly. The machine loses power. The
          kernel kills the process with <code>SIGKILL</code> (which cannot
          be caught). The process itself hits an unhandled exception and
          crashes.
        </p>
        <p>
          Designing for crash safety means assuming your process can die at
          any point without warning:
        </p>
        <ul>
          <li>
            <strong>Use database transactions.</strong> If a multi-step
            operation is wrapped in a transaction, a crash rolls back the
            incomplete work. The data stays consistent.
          </li>
          <li>
            <strong>Make jobs idempotent.</strong> If a job can be safely
            run twice, it does not matter if it gets retried after a crash.
            Use unique constraints or check-before-write patterns to
            prevent duplicates.
          </li>
          <li>
            <strong>Do not store critical state in the process.</strong>{" "}
            If the only copy of something important is in the
            process&apos;s memory, it is gone when the process dies. State
            belongs in a database or external store.
          </li>
        </ul>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Idempotent job - safe to retry after a crash</span>

<span style="color:var(--hl-k)">@</span>app.<span style="color:var(--hl-f)">task</span>
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">charge_order</span>(order_id):
    order = Order.objects.<span style="color:var(--hl-f)">get</span>(id=order_id)

    <span style="color:var(--hl-c)"># Check if already charged - prevents double charging on retry</span>
    <span style="color:var(--hl-k)">if</span> order.payment_status == <span style="color:var(--hl-s)">"charged"</span>:
        <span style="color:var(--hl-k)">return</span>

    result = payment_gateway.<span style="color:var(--hl-f)">charge</span>(
        amount=order.total,
        idempotency_key=<span style="color:var(--hl-s)">f"order-</span>{order_id}<span style="color:var(--hl-s)">"</span>,
    )

    order.payment_status = <span style="color:var(--hl-s)">"charged"</span>
    order.payment_id = result.<span style="color:var(--hl-v)">id</span>
    order.<span style="color:var(--hl-f)">save</span>()` }} /></pre>

        <p>
          If the worker crashes after charging but before saving the
          status, the job retries. The <code>idempotency_key</code> tells
          the payment gateway not to charge again. The check at the top
          prevents the code from even attempting a duplicate. The operation
          is safe to retry any number of times.
        </p>

        <h2>Disposability in Containers</h2>
        <p>
          Kubernetes manages the process lifecycle through signals and
          timeouts. When a pod is being terminated:
        </p>
        <ol>
          <li>
            Kubernetes sends <code>SIGTERM</code> to the process.
          </li>
          <li>
            The process has <code>terminationGracePeriodSeconds</code>{" "}
            (default 30 seconds) to shut down.
          </li>
          <li>
            If the process has not exited by then, Kubernetes sends{" "}
            <code>SIGKILL</code>.
          </li>
        </ol>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Kubernetes deployment (excerpt)</span>
<span style="color:var(--hl-v)">spec</span>:
  <span style="color:var(--hl-v)">terminationGracePeriodSeconds</span>: <span style="color:var(--hl-n)">60</span>  <span style="color:var(--hl-c)"># give workers time to finish</span>
  <span style="color:var(--hl-v)">containers</span>:
    - <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">worker</span>
      <span style="color:var(--hl-v)">image</span>: <span style="color:var(--hl-s)">myapp:v2.3.1</span>
      <span style="color:var(--hl-v)">lifecycle</span>:
        <span style="color:var(--hl-v)">preStop</span>:
          <span style="color:var(--hl-v)">exec</span>:
            <span style="color:var(--hl-v)">command</span>: [<span style="color:var(--hl-s)">"sh"</span>, <span style="color:var(--hl-s)">"-c"</span>, <span style="color:var(--hl-s)">"sleep 5"</span>]  <span style="color:var(--hl-c)"># wait for load balancer to drain</span>` }} /></pre>

        <p>
          The <code>preStop</code> hook adds a small delay before{" "}
          <code>SIGTERM</code> is sent. This gives the load balancer time
          to stop routing traffic to this pod. Without it, the pod might
          receive new requests after it has started shutting down.
        </p>
        <p>
          The <code>terminationGracePeriodSeconds</code> should match
          your longest expected job. If background jobs can take up to 60
          seconds, set the grace period to at least 60 seconds so workers
          have time to finish.
        </p>

        <h2>Key Takeaway</h2>
        <p>
          Disposable processes start fast and stop clean. Fast startup
          means seconds, not minutes - defer heavy initialization, connect
          lazily, run migrations separately. Graceful shutdown means
          handling <code>SIGTERM</code>, finishing in-flight work, and
          exiting without dropping requests or losing jobs. Beyond graceful
          shutdown, design for crashes too - use transactions, make jobs
          idempotent, and keep critical state in external stores. When
          processes are truly disposable, deploys become routine, scaling
          becomes automatic, and failures become recoverable.
        </p>
      </div>

      <RelatedPosts slug="disposability-in-software-development" />
    </article>
  );
}
