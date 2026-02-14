import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/the-stateless-processes/person-floating-among-laptops.png";
import img0 from "../../../../public/blog/the-stateless-processes/stateless-processes-redis-database-diagram.png";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "The Stateless Processes",
  description:
    "Why your application processes should not store anything locally, what happens when stateful processes meet horizontal scaling, and practical patterns for moving state out of your app.",
  keywords: ["stateless processes", "twelve-factor app", "horizontal scaling", "session management", "Redis", "shared-nothing architecture", "sticky sessions", "external state", "cloud native"],
  openGraph: {
    title: "The Stateless Processes",
    description:
      "Why your application processes should not store anything locally, what happens when stateful processes meet horizontal scaling, and practical patterns for moving state out of your app.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Stateless Processes",
    description: "Why your application processes should not store anything locally, and practical patterns for moving state out of your app.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          The Stateless Processes
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
        alt="Stateless application processes operating independently without shared local state"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          We have seen applications that worked fine with a single server
          suddenly break when scaled to two. Users would log in, make a
          request, get a response, make another request - and be asked to log
          in again. The session data was stored in the application&apos;s
          memory. The second request hit a different server. That server had
          no idea who the user was. The application was stateful, and scaling
          it exposed that problem instantly.
        </p>

        <hr />

        <h2>What Stateless Actually Means</h2>
        <p>
          A stateless process doesn&apos;t remember anything between requests.
          Each request arrives with everything the process needs to handle it -
          authentication tokens, session identifiers, request data - and the
          process doesn&apos;t store anything locally for the next request to
          use.
        </p>
        <p>
          This doesn&apos;t mean your application has no state. Of course it
          does - users have sessions, shopping carts have items, dashboards
          have preferences. The point is that state lives in external services
          (databases, caches, object stores), not inside the application
          process itself. The process is a pipeline: data comes in, gets
          processed, results go out. Nothing sticks.
        </p>
        <p>
          The 12-factor app methodology puts it simply: processes are
          stateless and share-nothing. Any data that needs to persist must be
          stored in a stateful backing service.
        </p>

        <h2>Why This Matters: The Scaling Problem</h2>
        <p>
          With a single process, stateful or stateless doesn&apos;t matter
          much. Everything is in one place. The problems begin when you need
          more than one process - and you will. Traffic grows, you add a
          second server, a load balancer distributes requests between them.
        </p>
        <p>
          If your process stores state locally - user sessions in memory,
          uploaded files on the local disk, cached data in a local dictionary -
          then request A might hit server 1 and store some state, while
          request B hits server 2 and can&apos;t find it. The user sees
          broken behavior. Data disappears. Sessions vanish.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># This breaks when you scale to multiple processes</span>

<span style="color:var(--hl-c)"># In-memory session store — lives and dies with the process</span>
sessions = {}

<span style="color:var(--hl-f)">@app.route</span>(<span style="color:var(--hl-s)">"/login"</span>, methods=[<span style="color:var(--hl-s)">"POST"</span>])
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">login</span>():
    user = <span style="color:var(--hl-f)">authenticate</span>(request.form)
    session_id = <span style="color:var(--hl-f)">generate_session_id</span>()
    sessions[session_id] = {<span style="color:var(--hl-s)">"user_id"</span>: user.id}  <span style="color:var(--hl-c)"># stored in THIS process</span>
    <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">jsonify</span>({<span style="color:var(--hl-s)">"token"</span>: session_id})

<span style="color:var(--hl-f)">@app.route</span>(<span style="color:var(--hl-s)">"/profile"</span>)
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">profile</span>():
    session_id = request.headers.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"Authorization"</span>)
    session = sessions.<span style="color:var(--hl-f)">get</span>(session_id)  <span style="color:var(--hl-c)"># fails if different process</span>
    <span style="color:var(--hl-k)">if not</span> session:
        <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">jsonify</span>({<span style="color:var(--hl-s)">"error"</span>: <span style="color:var(--hl-s)">"unauthorized"</span>}), <span style="color:var(--hl-n)">401</span>
    <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">get_user_profile</span>(session[<span style="color:var(--hl-s)">"user_id"</span>])` }} /></pre>

        <p>
          This code works perfectly with one process. Add a second process
          behind a load balancer and it breaks immediately. The login request
          stores the session in process A&apos;s memory. The profile request
          lands on process B, which has no record of that session. The user
          gets a 401 error.
        </p>

        <h2>Moving State Out</h2>
        <p>
          The fix is to move all state into external services that every
          process can access. Sessions go into Redis. Uploaded files go into
          object storage. Cached data goes into a shared cache. The processes
          become stateless - interchangeable workers that can be started,
          stopped, or replaced without losing anything.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># This works with any number of processes</span>

<span style="color:var(--hl-k)">import</span> redis

<span style="color:var(--hl-c)"># Session store lives outside the process — shared by all</span>
session_store = redis.<span style="color:var(--hl-f)">Redis</span>.<span style="color:var(--hl-f)">from_url</span>(os.environ[<span style="color:var(--hl-s)">"REDIS_URL"</span>])

<span style="color:var(--hl-f)">@app.route</span>(<span style="color:var(--hl-s)">"/login"</span>, methods=[<span style="color:var(--hl-s)">"POST"</span>])
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">login</span>():
    user = <span style="color:var(--hl-f)">authenticate</span>(request.form)
    session_id = <span style="color:var(--hl-f)">generate_session_id</span>()
    session_store.<span style="color:var(--hl-f)">setex</span>(
        session_id,
        <span style="color:var(--hl-n)">3600</span>,  <span style="color:var(--hl-c)"># expires in 1 hour</span>
        <span style="color:var(--hl-f)">json.dumps</span>({<span style="color:var(--hl-s)">"user_id"</span>: user.id})
    )
    <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">jsonify</span>({<span style="color:var(--hl-s)">"token"</span>: session_id})

<span style="color:var(--hl-f)">@app.route</span>(<span style="color:var(--hl-s)">"/profile"</span>)
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">profile</span>():
    session_id = request.headers.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"Authorization"</span>)
    data = session_store.<span style="color:var(--hl-f)">get</span>(session_id)  <span style="color:var(--hl-c)"># works from any process</span>
    <span style="color:var(--hl-k)">if not</span> data:
        <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">jsonify</span>({<span style="color:var(--hl-s)">"error"</span>: <span style="color:var(--hl-s)">"unauthorized"</span>}), <span style="color:var(--hl-n)">401</span>
    session = <span style="color:var(--hl-f)">json.loads</span>(data)
    <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">get_user_profile</span>(session[<span style="color:var(--hl-s)">"user_id"</span>])` }} /></pre>

        <p>
          The only change: sessions are stored in Redis instead of a local
          dictionary. Now it doesn&apos;t matter which process handles which
          request. They all read from and write to the same external store.
          You can run 2 processes or 200 - the behavior is identical.
        </p>

        <Image
          src={img0}
          alt="Multiple application processes (Process-1, Process-2, Process-3, Process-N) handling tasks independently, connected to a shared Redis cache for session information and a shared database for long-term persistent data storage"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h2>The Sticky Session Trap</h2>
        <p>
          Some teams try to solve the stateful process problem with sticky
          sessions. The load balancer remembers which server handled a
          user&apos;s first request and routes all subsequent requests to the
          same server. This way, the in-memory session is always available.
        </p>
        <p>
          This works until it doesn&apos;t. Sticky sessions create several
          problems:
        </p>
        <ul>
          <li>
            <strong>Uneven load distribution.</strong> Some servers end up with
            more &quot;sticky&quot; users than others. You can&apos;t
            rebalance without breaking sessions.
          </li>
          <li>
            <strong>Deploys break sessions.</strong> When you restart a server
            to deploy new code, every user stuck to that server loses their
            session.
          </li>
          <li>
            <strong>Scaling down loses data.</strong> When you remove a server
            to save costs during low traffic, every user on that server gets
            logged out.
          </li>
          <li>
            <strong>Server crashes lose state.</strong> If a server dies
            unexpectedly, all sessions on it are gone. No recovery possible.
          </li>
        </ul>
        <p>
          Sticky sessions are a band-aid on a design problem. They let you
          avoid fixing the real issue - stateful processes - by adding
          complexity at the load balancer layer. The proper fix is to move
          state out of the process entirely.
        </p>

        <h2>Common State That Needs to Move</h2>
        <p>
          Sessions are the most obvious example, but they&apos;re not the
          only state that sneaks into processes. Here are the common ones:
        </p>

        <h3>Uploaded Files</h3>
        <p>
          When a user uploads a file and your application saves it to the
          local disk, that file only exists on one server. If the next request
          hits a different server, the file isn&apos;t there. If the server
          is replaced, the file is gone.
        </p>
        <p>
          Move uploaded files to object storage (S3, Google Cloud Storage,
          MinIO) immediately after receiving them. The application saves the
          file to the external store and keeps only a reference (the URL or
          key) in the database.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Bad: saving to local disk</span>
<span style="color:var(--hl-f)">@app.route</span>(<span style="color:var(--hl-s)">"/upload"</span>, methods=[<span style="color:var(--hl-s)">"POST"</span>])
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">upload_bad</span>():
    f = request.files[<span style="color:var(--hl-s)">"photo"</span>]
    f.<span style="color:var(--hl-f)">save</span>(<span style="color:var(--hl-s)">f"/uploads/<span style="color:var(--hl-v)">{f.filename}</span>"</span>)  <span style="color:var(--hl-c)"># only on THIS server</span>
    <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">jsonify</span>({<span style="color:var(--hl-s)">"status"</span>: <span style="color:var(--hl-s)">"saved"</span>})

<span style="color:var(--hl-c)"># Good: saving to object storage</span>
<span style="color:var(--hl-f)">@app.route</span>(<span style="color:var(--hl-s)">"/upload"</span>, methods=[<span style="color:var(--hl-s)">"POST"</span>])
<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">upload_good</span>():
    f = request.files[<span style="color:var(--hl-s)">"photo"</span>]
    key = <span style="color:var(--hl-s)">f"uploads/<span style="color:var(--hl-v)">{uuid4()}</span>/<span style="color:var(--hl-v)">{f.filename}</span>"</span>
    s3.<span style="color:var(--hl-f)">upload_fileobj</span>(f, bucket, key)  <span style="color:var(--hl-c)"># accessible from ANY server</span>
    <span style="color:var(--hl-k)">return</span> <span style="color:var(--hl-f)">jsonify</span>({<span style="color:var(--hl-s)">"url"</span>: <span style="color:var(--hl-s)">f"https://<span style="color:var(--hl-v)">{bucket}</span>.s3.amazonaws.com/<span style="color:var(--hl-v)">{key}</span>"</span>})` }} /></pre>

        <h3>In-Process Caches</h3>
        <p>
          A dictionary used as a cache inside your process is invisible to
          other processes. Each process builds its own cache independently,
          wasting memory and producing inconsistent results. A user might see
          stale data on one request and fresh data on the next, depending on
          which process handles it.
        </p>
        <p>
          Use a shared cache like Redis or Memcached. Every process reads from
          and writes to the same cache, so the data is consistent and the
          memory is used efficiently.
        </p>

        <h3>Temporary Files</h3>
        <p>
          Processing a large file - resizing an image, generating a PDF,
          parsing a CSV - often involves writing to a temporary location. This
          is fine as long as the temporary file is used and discarded within
          the same request. The problem comes when one request writes a temp
          file and a later request expects to find it. With multiple
          processes, there&apos;s no guarantee the same process will handle
          both requests.
        </p>
        <p>
          The rule: temporary files are fine for the duration of a single
          request. Anything that needs to survive beyond that request must go
          into an external store.
        </p>

        <h2>What You Get from Statelessness</h2>
        <p>
          When your processes are truly stateless, several things become
          easy that were previously hard:
        </p>
        <ul>
          <li>
            <strong>Horizontal scaling.</strong> Need more capacity? Start more
            processes. They&apos;re all identical and interchangeable. No
            coordination needed.
          </li>
          <li>
            <strong>Zero-downtime deploys.</strong> Start new processes with
            the updated code, then stop the old ones. No sessions are lost, no
            uploads disappear, no state needs to be migrated.
          </li>
          <li>
            <strong>Crash recovery.</strong> A process dies? The orchestrator
            starts a new one. Since no state was lost (it was all in external
            services), the new process picks up where any process could.
          </li>
          <li>
            <strong>Simpler debugging.</strong> Every process behaves the same
            way. You don&apos;t get bugs that only happen on &quot;server
            3&quot; because server 3 has different cached data than server 1.
          </li>
        </ul>

        <h2>The Mindset Shift</h2>
        <p>
          Stateless processes require a shift in how you think about your
          application. Instead of treating each process as a long-running
          entity with its own memory and history, treat it as disposable. It
          could be killed and replaced at any moment, and nothing of value
          should be lost.
        </p>
        <p>
          A good test: if you restart every process in your application
          simultaneously, does anything break beyond the brief interruption?
          If users lose their sessions, if uploaded files vanish, if cached
          data disappears and can&apos;t be rebuilt - those are signs of
          state living where it shouldn&apos;t be.
        </p>

        <h2>Key Takeaway</h2>
        <p>
          Stateless doesn&apos;t mean your application has no state. It means
          state doesn&apos;t live inside your processes. Sessions go in Redis.
          Files go in object storage. Cached data goes in a shared cache. The
          processes themselves are empty vessels - they receive a request,
          do the work, store the results externally, and move on. This is
          what makes them disposable, scalable, and reliable. The moment you
          store something in a local variable, a local file, or in-process
          memory that another request might need, you&apos;ve created a
          coupling between requests and processes. That coupling is invisible
          until you scale, and then it breaks everything at once.
        </p>
      </div>

      <RelatedPosts slug="the-stateless-processes" />
    </article>
  );
}
