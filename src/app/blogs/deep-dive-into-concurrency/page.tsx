import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/deep-dive-into-concurrency/runners-at-starting-line.png";
import img0 from "../../../../public/blog/deep-dive-into-concurrency/process-types-web-worker-cache.png";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Concurrency",
  description: "Why scaling means running more processes and not bigger ones, how to split work across web, worker, and clock process types, and practical patterns for horizontal scaling with Gunicorn, Celery, and Kubernetes.",
  keywords: ["concurrency", "twelve-factor app", "process model", "horizontal scaling", "Gunicorn", "Celery", "Kubernetes", "process types", "web workers", "background jobs", "Procfile", "Docker Compose scaling"],
  openGraph: {
    title: "Concurrency",
    description: "Why scaling means running more processes and not bigger ones, how to split work across web, worker, and clock process types, and practical patterns for horizontal scaling with Gunicorn, Celery, and Kubernetes.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Concurrency",
    description: "Why scaling means running more processes and not bigger ones, how to split work across web, worker, and clock process types, and practical patterns for horizontal scaling.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Concurrency
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
        alt="Runners lined up at a starting line, viewed from ground level showing their legs and shoes - representing parallel processes ready to execute"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Your application is slow. Users are complaining. The obvious fix is to throw more hardware at it - a bigger server, more RAM, faster CPUs. It works for a while. Then traffic doubles again, and you are back where you started, except now you are paying for a very expensive machine that still cannot keep up. The real problem is not the hardware. It is how your application uses it.
        </p>

        <hr />

        <h2>The Problem With Bigger Machines</h2>

        <p>
          When an application runs as a single process, there is a hard limit to how much work it can do. You can give that process more memory and faster CPUs - this is called vertical scaling - but you will hit a ceiling. At some point, you cannot buy a bigger machine. Or the cost becomes absurd.
        </p>

        <p>
          There is another problem. A single process is a single point of failure. If it crashes, everything goes down. If you need to deploy a new version, you have to restart it, which means downtime.
        </p>

        <p>
          The twelve-factor app approach to this is simple: instead of making one process do more work, run more processes. This is horizontal scaling, and it changes how you think about your application.
        </p>

        <h2>What Concurrency Means Here</h2>

        <p>
          Concurrency in the twelve-factor context is not about threads or async/await. It is about the process model - the idea that your application should be designed as a set of independent processes, each doing a specific type of work.
        </p>

        <p>
          Think of it this way. A restaurant does not handle more customers by making one waiter work faster. It hires more waiters. And it does not ask waiters to also cook food. It has separate roles - waiters handle customers, cooks handle food, a dishwasher handles dishes. Each role can be scaled independently based on demand.
        </p>

        <p>
          Your application should work the same way.
        </p>

        <h2>Process Types</h2>

        <p>
          A typical web application has different kinds of work to do. HTTP requests need to be served. Background jobs need to be processed. Scheduled tasks need to run at specific times. Each of these is a different process type.
        </p>

        <Image
          src={img0}
          alt="Three-panel diagram showing different process types: web server processes handling HTTP requests (scalable to multiple instances), worker processes handling background tasks (independently scalable), and a cache process (typically a single instance)"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <p>
          A Procfile makes this explicit. It is a simple file that declares each process type and the command to run it:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-n)">web</span>: gunicorn app:application --workers 4 --bind 0.0.0.0:$PORT
<span style="color:var(--hl-n)">worker</span>: celery -A tasks worker --concurrency 4
<span style="color:var(--hl-n)">clock</span>: celery -A tasks beat --schedule /tmp/celerybeat-schedule` }} /></pre>

        <p>
          Three process types. The <code>web</code> process handles HTTP requests. The <code>worker</code> process handles background jobs. The <code>clock</code> process triggers scheduled tasks. Each runs independently. Each can be scaled independently.
        </p>

        <h2>Scaling Web Processes</h2>

        <p>
          Let&apos;s start with the most common process type. A web process receives HTTP requests and returns responses. When you run a Python web application with Gunicorn, you are already using the process model:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Run 4 worker processes, each handling requests independently</span>
gunicorn app:application --workers <span style="color:var(--hl-v)">4</span> --bind <span style="color:var(--hl-s)">0.0.0.0:8000</span>` }} /></pre>

        <p>
          Gunicorn starts a master process that manages four worker processes. Each worker is a separate OS process with its own memory space. When a request comes in, Gunicorn routes it to an available worker. If one worker is busy handling a slow database query, the other three can still serve requests.
        </p>

        <p>
          This is process-based concurrency in action. You did not write any threading code. You did not use async/await. You just told Gunicorn to run four processes, and now your application can handle four requests at the same time.
        </p>

        <p>
          Need to handle more traffic? Increase the worker count:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># More traffic? More workers.</span>
gunicorn app:application --workers <span style="color:var(--hl-v)">8</span> --bind <span style="color:var(--hl-s)">0.0.0.0:8000</span>` }} /></pre>

        <p>
          A common rule of thumb is <code>(2 * CPU cores) + 1</code> workers per machine. On a 4-core server, that is 9 workers. But you are still limited by the machine. The real power comes when you run the same process on multiple machines.
        </p>

        <h2>Scaling Worker Processes</h2>

        <p>
          Web processes handle the fast, synchronous work - receive a request, query the database, return a response. But what about work that takes minutes or hours? Sending emails, processing images, generating reports, running ML inference.
        </p>

        <p>
          This is where worker processes come in. Instead of making the web process do everything (and making users wait), you push slow work onto a queue and let workers pick it up:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># tasks.py</span>
<span style="color:var(--hl-k)">from</span> celery <span style="color:var(--hl-k)">import</span> Celery

app = Celery(<span style="color:var(--hl-s)">"tasks"</span>, broker=<span style="color:var(--hl-s)">"redis://localhost:6379/0"</span>)

<span style="color:var(--hl-k)">@</span><span style="color:var(--hl-f)">app.task</span>
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">generate_report</span>(user_id, report_type):
    <span style="color:var(--hl-c)"># This takes 30 seconds. You do not want a web</span>
    <span style="color:var(--hl-c)"># process tied up doing this.</span>
    data = fetch_data(user_id, report_type)
    pdf = render_pdf(data)
    upload_to_s3(pdf)
    send_email(user_id, pdf_url=pdf.url)` }} /></pre>

        <p>
          And in the web process, you just queue the task:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Inside a Flask/Django view</span>
<span style="color:var(--hl-k)">from</span> tasks <span style="color:var(--hl-k)">import</span> generate_report

<span style="color:var(--hl-k)">@</span><span style="color:var(--hl-f)">app.route</span>(<span style="color:var(--hl-s)">"/reports"</span>, methods=[<span style="color:var(--hl-s)">"POST"</span>])
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">request_report</span>():
    generate_report.<span style="color:var(--hl-f)">delay</span>(current_user.id, request.form[<span style="color:var(--hl-s)">"type"</span>])
    <span style="color:var(--hl-k)">return</span> jsonify({<span style="color:var(--hl-s)">"status"</span>: <span style="color:var(--hl-s)">"processing"</span>}), <span style="color:var(--hl-v)">202</span>` }} /></pre>

        <p>
          The web process responds immediately. The report generation happens in a completely separate worker process. The user does not wait 30 seconds for a response.
        </p>

        <p>
          Here is the important part: you scale web and worker processes independently. If your application gets a spike in report requests but web traffic stays the same, you only need more workers:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Normal day: 4 workers</span>
celery -A tasks worker --concurrency <span style="color:var(--hl-v)">4</span>

<span style="color:var(--hl-c)"># Month-end reporting spike: 16 workers</span>
celery -A tasks worker --concurrency <span style="color:var(--hl-v)">16</span>` }} /></pre>

        <p>
          You did not touch the web processes at all. Each process type scales based on its own demand.
        </p>

        <h2>Clock Processes</h2>

        <p>
          The third common process type is the clock (or scheduler). It does not do the actual work - it just tells workers when to start tasks:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># celeryconfig.py</span>
<span style="color:var(--hl-k)">from</span> celery.schedules <span style="color:var(--hl-k)">import</span> crontab

beat_schedule = {
    <span style="color:var(--hl-s)">"daily-cleanup"</span>: {
        <span style="color:var(--hl-s)">"task"</span>: <span style="color:var(--hl-s)">"tasks.cleanup_expired_sessions"</span>,
        <span style="color:var(--hl-s)">"schedule"</span>: crontab(hour=<span style="color:var(--hl-v)">3</span>, minute=<span style="color:var(--hl-v)">0</span>),
    },
    <span style="color:var(--hl-s)">"send-weekly-digest"</span>: {
        <span style="color:var(--hl-s)">"task"</span>: <span style="color:var(--hl-s)">"tasks.send_weekly_digest"</span>,
        <span style="color:var(--hl-s)">"schedule"</span>: crontab(hour=<span style="color:var(--hl-v)">9</span>, minute=<span style="color:var(--hl-v)">0</span>, day_of_week=<span style="color:var(--hl-v)">1</span>),
    },
}` }} /></pre>

        <p>
          You only ever run one clock process. It just publishes tasks to the queue. Workers pick them up and do the actual work. This separation matters because if you accidentally ran two clock processes, every scheduled task would run twice.
        </p>

        <h2>Horizontal Scaling With Docker Compose</h2>

        <p>
          On a single machine, you can scale process types using Docker Compose:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># docker-compose.yml</span>
<span style="color:var(--hl-n)">services</span>:
  <span style="color:var(--hl-n)">web</span>:
    <span style="color:var(--hl-n)">build</span>: .
    <span style="color:var(--hl-n)">command</span>: gunicorn app:application --workers 4 --bind 0.0.0.0:8000
    <span style="color:var(--hl-n)">ports</span>:
      - <span style="color:var(--hl-s)">"8000:8000"</span>
    <span style="color:var(--hl-n)">environment</span>:
      - DATABASE_URL=postgres://db:5432/app
      - REDIS_URL=redis://redis:6379/0

  <span style="color:var(--hl-n)">worker</span>:
    <span style="color:var(--hl-n)">build</span>: .
    <span style="color:var(--hl-n)">command</span>: celery -A tasks worker --concurrency 4
    <span style="color:var(--hl-n)">environment</span>:
      - DATABASE_URL=postgres://db:5432/app
      - REDIS_URL=redis://redis:6379/0

  <span style="color:var(--hl-n)">clock</span>:
    <span style="color:var(--hl-n)">build</span>: .
    <span style="color:var(--hl-n)">command</span>: celery -A tasks beat --schedule /tmp/celerybeat-schedule
    <span style="color:var(--hl-n)">environment</span>:
      - REDIS_URL=redis://redis:6379/0

  <span style="color:var(--hl-n)">redis</span>:
    <span style="color:var(--hl-n)">image</span>: redis:7-alpine

  <span style="color:var(--hl-n)">db</span>:
    <span style="color:var(--hl-n)">image</span>: postgres:16-alpine` }} /></pre>

        <p>
          Same codebase, same Docker image, different commands. The only difference between <code>web</code> and <code>worker</code> is the command that starts them. Need more workers?
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `docker compose up --scale worker=<span style="color:var(--hl-v)">3</span>` }} /></pre>

        <p>
          Now you have three worker containers, each running 4 Celery workers, for a total of 12 concurrent background task processors. The web and clock processes are untouched.
        </p>

        <h2>Horizontal Scaling With Kubernetes</h2>

        <p>
          In production, Kubernetes takes this further. Each process type becomes a Deployment that can be scaled independently:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># web-deployment.yaml</span>
<span style="color:var(--hl-n)">apiVersion</span>: apps/v1
<span style="color:var(--hl-n)">kind</span>: Deployment
<span style="color:var(--hl-n)">metadata</span>:
  <span style="color:var(--hl-n)">name</span>: web
<span style="color:var(--hl-n)">spec</span>:
  <span style="color:var(--hl-n)">replicas</span>: <span style="color:var(--hl-v)">3</span>
  <span style="color:var(--hl-n)">selector</span>:
    <span style="color:var(--hl-n)">matchLabels</span>:
      <span style="color:var(--hl-n)">app</span>: myapp
      <span style="color:var(--hl-n)">process</span>: web
  <span style="color:var(--hl-n)">template</span>:
    <span style="color:var(--hl-n)">metadata</span>:
      <span style="color:var(--hl-n)">labels</span>:
        <span style="color:var(--hl-n)">app</span>: myapp
        <span style="color:var(--hl-n)">process</span>: web
    <span style="color:var(--hl-n)">spec</span>:
      <span style="color:var(--hl-n)">containers</span>:
        - <span style="color:var(--hl-n)">name</span>: web
          <span style="color:var(--hl-n)">image</span>: myapp:latest
          <span style="color:var(--hl-n)">command</span>: [<span style="color:var(--hl-s)">"gunicorn"</span>, <span style="color:var(--hl-s)">"app:application"</span>, <span style="color:var(--hl-s)">"--workers"</span>, <span style="color:var(--hl-s)">"4"</span>]
          <span style="color:var(--hl-n)">resources</span>:
            <span style="color:var(--hl-n)">requests</span>:
              <span style="color:var(--hl-n)">cpu</span>: <span style="color:var(--hl-s)">"500m"</span>
              <span style="color:var(--hl-n)">memory</span>: <span style="color:var(--hl-s)">"256Mi"</span>` }} /></pre>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># worker-deployment.yaml</span>
<span style="color:var(--hl-n)">apiVersion</span>: apps/v1
<span style="color:var(--hl-n)">kind</span>: Deployment
<span style="color:var(--hl-n)">metadata</span>:
  <span style="color:var(--hl-n)">name</span>: worker
<span style="color:var(--hl-n)">spec</span>:
  <span style="color:var(--hl-n)">replicas</span>: <span style="color:var(--hl-v)">5</span>
  <span style="color:var(--hl-n)">selector</span>:
    <span style="color:var(--hl-n)">matchLabels</span>:
      <span style="color:var(--hl-n)">app</span>: myapp
      <span style="color:var(--hl-n)">process</span>: worker
  <span style="color:var(--hl-n)">template</span>:
    <span style="color:var(--hl-n)">metadata</span>:
      <span style="color:var(--hl-n)">labels</span>:
        <span style="color:var(--hl-n)">app</span>: myapp
        <span style="color:var(--hl-n)">process</span>: worker
    <span style="color:var(--hl-n)">spec</span>:
      <span style="color:var(--hl-n)">containers</span>:
        - <span style="color:var(--hl-n)">name</span>: worker
          <span style="color:var(--hl-n)">image</span>: myapp:latest
          <span style="color:var(--hl-n)">command</span>: [<span style="color:var(--hl-s)">"celery"</span>, <span style="color:var(--hl-s)">"-A"</span>, <span style="color:var(--hl-s)">"tasks"</span>, <span style="color:var(--hl-s)">"worker"</span>, <span style="color:var(--hl-s)">"--concurrency"</span>, <span style="color:var(--hl-s)">"4"</span>]
          <span style="color:var(--hl-n)">resources</span>:
            <span style="color:var(--hl-n)">requests</span>:
              <span style="color:var(--hl-n)">cpu</span>: <span style="color:var(--hl-s)">"1000m"</span>
              <span style="color:var(--hl-n)">memory</span>: <span style="color:var(--hl-s)">"512Mi"</span>` }} /></pre>

        <p>
          Notice the resource requests are different. Web processes need less CPU and memory because they mostly wait on I/O. Worker processes need more because they do heavy computation. You allocate resources based on what each process type actually needs.
        </p>

        <p>
          Kubernetes can also scale automatically based on load:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Scale web pods when CPU exceeds 70%</span>
kubectl autoscale deployment web --min=<span style="color:var(--hl-v)">2</span> --max=<span style="color:var(--hl-v)">10</span> --cpu-percent=<span style="color:var(--hl-v)">70</span>

<span style="color:var(--hl-c)"># Scale workers independently</span>
kubectl autoscale deployment worker --min=<span style="color:var(--hl-v)">3</span> --max=<span style="color:var(--hl-v)">20</span> --cpu-percent=<span style="color:var(--hl-v)">70</span>` }} /></pre>

        <p>
          Web processes scale from 2 to 10 based on HTTP traffic. Worker processes scale from 3 to 20 based on queue depth. Each process type responds to its own demand.
        </p>

        <h2>Why Not Threads?</h2>

        <p>
          A common question: why run multiple processes instead of using threads within one process?
        </p>

        <p>
          Threads share memory, which makes them faster for some operations but introduces a whole class of bugs - race conditions, deadlocks, and memory corruption. Processes are isolated. If one process crashes, the others keep running. If one process has a memory leak, you can restart it without affecting the rest.
        </p>

        <p>
          That said, processes and threads are not mutually exclusive. Gunicorn workers can use threads internally. Celery workers can use a thread pool. The twelve-factor principle is about how you scale your application as a whole - by running more processes - not about what happens inside each process.
        </p>

        <p>
          The distinction matters at the architecture level. When your team asks &ldquo;how do we handle more traffic?&rdquo;, the answer should be &ldquo;add more web processes&rdquo;, not &ldquo;rewrite the application to be multithreaded&rdquo;.
        </p>

        <h2>Process Management</h2>

        <p>
          One important rule: your application should not manage its own processes. It should not daemonize itself, write PID files, or restart crashed workers. That is the job of the platform.
        </p>

        <p>
          In development, a tool like <code>honcho</code> (Python&apos;s Foreman equivalent) reads your Procfile and manages all process types:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Install honcho</span>
pip install honcho

<span style="color:var(--hl-c)"># Start all processes defined in Procfile</span>
honcho start

<span style="color:var(--hl-c)"># Output:</span>
<span style="color:var(--hl-c)"># 14:30:01 web.1    | [INFO] Listening at: http://0.0.0.0:8000</span>
<span style="color:var(--hl-c)"># 14:30:01 worker.1 | [INFO] celery@host ready.</span>
<span style="color:var(--hl-c)"># 14:30:01 clock.1  | [INFO] beat: Starting...</span>` }} /></pre>

        <p>
          In production, the platform handles this. Docker restarts crashed containers. Kubernetes maintains the desired replica count. If a worker dies, Kubernetes starts a new one automatically. Your application just needs to start, do its job, and shut down cleanly.
        </p>

        <h2>The Key Insight</h2>

        <p>
          The core idea behind the concurrency principle is this: your application is not one process. It is a formation of processes, each with a specific role, each independently scalable.
        </p>

        <p>
          This changes how you think about performance problems. Instead of asking &ldquo;how do I make this one thing faster?&rdquo;, you ask &ldquo;which process type is the bottleneck, and how many more do I need?&rdquo;
        </p>

        <p>
          Web processes too slow? Add more web processes. Background queue backing up? Add more workers. The application code does not change. The architecture handles the load because it was designed to scale horizontally from the beginning.
        </p>
      </div>

      <RelatedPosts slug="deep-dive-into-concurrency" />
    </article>
  );
}
