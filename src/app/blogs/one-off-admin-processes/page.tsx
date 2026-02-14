import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/one-off-admin-processes/technician-in-server-room.png";
import img0 from "../../../../public/blog/one-off-admin-processes/dev-prod-migration-commands.png";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "One-Off Admin Processes",
  description:
    "Why admin tasks like database migrations and data fixes should run as one-off processes in the same environment as your application, what breaks when they do not, and how to run them safely in containers and production.",
  keywords: ["admin processes", "twelve-factor app", "database migrations", "Django management commands", "Docker exec", "Kubernetes jobs", "one-off tasks", "data migrations", "production maintenance"],
  openGraph: {
    title: "One-Off Admin Processes",
    description:
      "Why admin tasks like database migrations and data fixes should run as one-off processes in the same environment as your application, what breaks when they do not, and how to run them safely in containers and production.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "One-Off Admin Processes",
    description: "Why admin tasks like database migrations and data fixes should run as one-off processes in the same environment as your application.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          One-Off Admin Processes
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
        alt="Person working in a server room, representing hands-on admin tasks run against production infrastructure"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Every application needs occasional maintenance - database
          migrations, data cleanup, backfill jobs, one-time fixes. The
          temptation is to handle these as quick hacks: SSH into a server,
          open a database shell, run some raw SQL. But when admin tasks
          run with different code, different dependencies, or different
          configuration than the application itself, things break in ways
          that are hard to trace. The 12-factor methodology says these
          tasks should run as one-off processes using the exact same
          codebase and environment as the application.
        </p>

        <hr />

        <h2>What Are Admin Processes?</h2>
        <p>
          Admin processes are tasks that need to happen occasionally but are
          not part of the application&apos;s normal request-handling flow.
          Common examples include:
        </p>
        <ul>
          <li>
            <strong>Database migrations</strong> - adding columns, creating
            tables, changing indexes.
          </li>
          <li>
            <strong>Data fixes</strong> - correcting bad records, backfilling
            a new field, merging duplicate accounts.
          </li>
          <li>
            <strong>Interactive consoles</strong> - opening a shell to
            inspect data or test a function against live state.
          </li>
          <li>
            <strong>One-time scripts</strong> - importing data from a CSV,
            sending a batch notification, generating a report.
          </li>
        </ul>
        <p>
          These tasks run once (or occasionally), do their job, and exit.
          They are not long-running web processes. But they still need access
          to the application&apos;s models, configuration, and database
          connections.
        </p>

        <h2>What Goes Wrong Without This Principle</h2>
        <p>
          When admin tasks are treated as separate from the application,
          several problems appear:
        </p>

        <h3>Raw SQL Against Production</h3>
        <p>
          A developer needs to fix a batch of records. Instead of writing a
          script in the application, they connect to the production database
          directly and run SQL:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Dangerous: raw SQL bypasses application logic</span>
<span style="color:var(--hl-f)">psql</span> -h prod-db -U admin -d myapp

<span style="color:var(--hl-k)">UPDATE</span> users <span style="color:var(--hl-k)">SET</span> status = <span style="color:var(--hl-s)">'active'</span>
<span style="color:var(--hl-k)">WHERE</span> created_at &lt; <span style="color:var(--hl-s)">'2024-01-01'</span>
<span style="color:var(--hl-k)">AND</span> status = <span style="color:var(--hl-s)">'pending'</span>;` }} /></pre>

        <p>
          This skips every safeguard the application has - validation rules,
          audit logging, event triggers, cache invalidation. The records are
          updated, but nothing else in the system knows it happened. Downstream
          services are out of sync. There is no record of what changed or why.
        </p>

        <h3>Scripts That Live Outside the Repository</h3>
        <p>
          Someone writes a quick Python script on their laptop to fix a
          problem. It works. They send it to a colleague over Slack. The
          colleague runs it a month later, but the database schema has
          changed since then. The script fails or, worse, corrupts data.
        </p>
        <p>
          Scripts that are not in the repository are not versioned, not
          reviewed, and not kept in sync with the application code they
          depend on.
        </p>

        <h3>Different Environment, Different Results</h3>
        <p>
          An admin script runs on a developer&apos;s laptop against production
          data. But the developer has a different Python version, different
          library versions, and a local <code>.env</code> file with stale
          configuration. The script behaves differently than it would in the
          actual production environment. Bugs surface in production that could
          not be reproduced locally.
        </p>

        <h2>The Rule: Same Code, Same Config, Same Environment</h2>
        <p>
          The 12-factor principle is straightforward: admin processes should
          run against a release, using the same codebase and configuration
          as any process running in that release. This means:
        </p>
        <ul>
          <li>
            Admin scripts live in the application repository, not on
            someone&apos;s laptop.
          </li>
          <li>
            They use the same database models, the same ORM, the same
            validation logic as the web application.
          </li>
          <li>
            They run with the same environment variables and dependency
            versions as the deployed application.
          </li>
          <li>
            They ship with the same release and are versioned alongside the
            code they operate on.
          </li>
        </ul>

        <Image
          src={img0}
          alt="Side-by-side comparison showing one-off admin processes running consistently in both development and production environments: local shell runs python manage.py migrate in development, SSH executes the same command in production, ensuring consistency across environments"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h2>Database Migrations</h2>
        <p>
          Migrations are the most common admin process. They change the
          database schema to match what the application code expects. In
          Django, this looks like:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Generate a migration from model changes</span>
<span style="color:var(--hl-f)">python</span> manage.py makemigrations

<span style="color:var(--hl-c)"># Apply pending migrations to the database</span>
<span style="color:var(--hl-f)">python</span> manage.py migrate` }} /></pre>

        <p>
          The migration files live in the repository. They are reviewed in
          pull requests. They run in the same environment as the application.
          When you deploy a new release, you run <code>migrate</code> as part
          of the deployment process. The same migration runs in development,
          staging, and production - different databases, same code.
        </p>

        <h2>Data Fix Scripts: Management Commands</h2>
        <p>
          When you need to fix data, the right approach is to write a
          management command (or equivalent) inside the application. This
          gives you access to the application&apos;s models, validation, and
          configuration without bypassing any of them.
        </p>
        <p>
          Here is a Django management command that deactivates users who
          have not logged in for over a year:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># myapp/management/commands/deactivate_stale_users.py</span>

<span style="color:var(--hl-k)">from</span> django.core.management.base <span style="color:var(--hl-k)">import</span> BaseCommand
<span style="color:var(--hl-k)">from</span> django.utils <span style="color:var(--hl-k)">import</span> timezone
<span style="color:var(--hl-k)">from</span> datetime <span style="color:var(--hl-k)">import</span> timedelta
<span style="color:var(--hl-k)">from</span> myapp.models <span style="color:var(--hl-k)">import</span> User

<span style="color:var(--hl-k)">class</span> <span style="color:var(--hl-f)">Command</span>(BaseCommand):
    help = <span style="color:var(--hl-s)">"Deactivate users who have not logged in for over a year"</span>

    <span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">add_arguments</span>(self, parser):
        parser.<span style="color:var(--hl-f)">add_argument</span>(
            <span style="color:var(--hl-s)">"--dry-run"</span>,
            action=<span style="color:var(--hl-s)">"store_true"</span>,
            help=<span style="color:var(--hl-s)">"Show what would be changed without making changes"</span>,
        )

    <span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">handle</span>(self, *args, **options):
        cutoff = timezone.<span style="color:var(--hl-f)">now</span>() - <span style="color:var(--hl-f)">timedelta</span>(days=<span style="color:var(--hl-n)">365</span>)
        stale = User.objects.<span style="color:var(--hl-f)">filter</span>(
            last_login__lt=cutoff,
            is_active=<span style="color:var(--hl-n)">True</span>,
        )

        self.stdout.<span style="color:var(--hl-f)">write</span>(<span style="color:var(--hl-s)">f"Found </span>{stale.<span style="color:var(--hl-f)">count</span>()}<span style="color:var(--hl-s)"> stale users"</span>)

        <span style="color:var(--hl-k)">if</span> options[<span style="color:var(--hl-s)">"dry_run"</span>]:
            self.stdout.<span style="color:var(--hl-f)">write</span>(<span style="color:var(--hl-s)">"Dry run - no changes made"</span>)
            <span style="color:var(--hl-k)">return</span>

        updated = stale.<span style="color:var(--hl-f)">update</span>(is_active=<span style="color:var(--hl-n)">False</span>)
        self.stdout.<span style="color:var(--hl-f)">write</span>(<span style="color:var(--hl-s)">f"Deactivated </span>{updated}<span style="color:var(--hl-s)"> users"</span>)` }} /></pre>

        <p>
          Run it with:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Preview what would happen</span>
<span style="color:var(--hl-f)">python</span> manage.py deactivate_stale_users --dry-run

<span style="color:var(--hl-c)"># Execute for real</span>
<span style="color:var(--hl-f)">python</span> manage.py deactivate_stale_users` }} /></pre>

        <p>
          Compare this to the raw SQL approach. The management command uses
          the application&apos;s ORM, respects model logic, supports a dry-run
          flag for safety, logs what it does, and lives in the repository
          where it can be reviewed and versioned. If someone needs to run a
          similar fix six months later, the command is still there, still
          compatible with the current schema.
        </p>

        <h2>Interactive Consoles</h2>
        <p>
          Sometimes you need to explore data or test a hypothesis
          interactively. The right way is to use the application&apos;s
          built-in console, which loads the full application context:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Django shell - has access to all models and settings</span>
<span style="color:var(--hl-f)">python</span> manage.py shell

<span style="color:var(--hl-c)"># Inside the shell</span>
<span style="color:var(--hl-k)">from</span> myapp.models <span style="color:var(--hl-k)">import</span> Order

<span style="color:var(--hl-c)"># Check how many orders are stuck in processing</span>
Order.objects.<span style="color:var(--hl-f)">filter</span>(status=<span style="color:var(--hl-s)">"processing"</span>).<span style="color:var(--hl-f)">count</span>()

<span style="color:var(--hl-c)"># Inspect a specific order</span>
order = Order.objects.<span style="color:var(--hl-f)">get</span>(id=<span style="color:var(--hl-n)">12345</span>)
<span style="color:var(--hl-f)">print</span>(order.status, order.created_at, order.total)` }} /></pre>

        <p>
          The shell connects to the same database with the same credentials
          as the running application. It uses the same model definitions. If
          a field was renamed last week, the shell reflects that. There is no
          drift between what the console sees and what the application sees.
        </p>

        <h2>Running Admin Tasks in Containers</h2>
        <p>
          In containerized environments, admin tasks should run inside a
          container built from the same image as the application. This
          guarantees the same code, same dependencies, and same
          configuration.
        </p>
        <p>
          With <strong>Docker</strong>, you can run a one-off command against
          a running container:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Run migration inside the running container</span>
<span style="color:var(--hl-f)">docker</span> exec myapp-container python manage.py migrate

<span style="color:var(--hl-c)"># Open an interactive shell</span>
<span style="color:var(--hl-f)">docker</span> exec -it myapp-container python manage.py shell

<span style="color:var(--hl-c)"># Run a one-off data fix</span>
<span style="color:var(--hl-f)">docker</span> exec myapp-container python manage.py deactivate_stale_users` }} /></pre>

        <p>
          With <strong>Kubernetes</strong>, you use a Job to run the task as
          a separate pod with the same image:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># k8s-migration-job.yml</span>
<span style="color:var(--hl-v)">apiVersion</span>: batch/v1
<span style="color:var(--hl-v)">kind</span>: Job
<span style="color:var(--hl-v)">metadata</span>:
  <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">migrate-db</span>
<span style="color:var(--hl-v)">spec</span>:
  <span style="color:var(--hl-v)">template</span>:
    <span style="color:var(--hl-v)">spec</span>:
      <span style="color:var(--hl-v)">containers</span>:
        - <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">migrate</span>
          <span style="color:var(--hl-v)">image</span>: <span style="color:var(--hl-s)">myapp:v2.3.1</span>   <span style="color:var(--hl-c)"># same image as the deployment</span>
          <span style="color:var(--hl-v)">command</span>: [<span style="color:var(--hl-s)">"python"</span>, <span style="color:var(--hl-s)">"manage.py"</span>, <span style="color:var(--hl-s)">"migrate"</span>]
          <span style="color:var(--hl-v)">envFrom</span>:
            - <span style="color:var(--hl-v)">secretRef</span>:
                <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">myapp-secrets</span>  <span style="color:var(--hl-c)"># same config as the deployment</span>
      <span style="color:var(--hl-v)">restartPolicy</span>: Never` }} /></pre>

        <p>
          The key detail is <code>image: myapp:v2.3.1</code> - the Job uses
          the exact same Docker image as the running deployment. Same code,
          same dependencies. The <code>envFrom</code> pulls the same
          environment variables. The migration runs in the same context as
          the web application, just as a different command.
        </p>

        <h2>Making Admin Tasks Safe</h2>
        <p>
          Admin tasks touch production data. A few practices make them
          safer:
        </p>
        <ul>
          <li>
            <strong>Dry-run flags.</strong> Let the script report what it
            would do before actually doing it. Review the output, then run
            again without the flag.
          </li>
          <li>
            <strong>Idempotent operations.</strong> If a script is safe to
            run twice, it is safe to retry after a failure. Check whether
            the work is already done before doing it.
          </li>
          <li>
            <strong>Batch processing with limits.</strong> Instead of
            updating a million records in one statement, process them in
            batches. This avoids long-running database locks and makes the
            operation easier to monitor and stop.
          </li>
          <li>
            <strong>Logging.</strong> Every admin script should log what it
            did - how many records were affected, what changed, whether it
            succeeded or failed. This creates an audit trail.
          </li>
        </ul>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Process records in batches instead of all at once</span>
<span style="color:var(--hl-v)">BATCH_SIZE</span> = <span style="color:var(--hl-n)">500</span>

<span style="color:var(--hl-k)">while</span> <span style="color:var(--hl-n)">True</span>:
    batch = User.objects.<span style="color:var(--hl-f)">filter</span>(
        needs_migration=<span style="color:var(--hl-n)">True</span>
    )[:<span style="color:var(--hl-v)">BATCH_SIZE</span>]

    <span style="color:var(--hl-k)">if</span> <span style="color:var(--hl-k)">not</span> batch:
        <span style="color:var(--hl-k)">break</span>

    <span style="color:var(--hl-k)">for</span> user <span style="color:var(--hl-k)">in</span> batch:
        user.<span style="color:var(--hl-f)">migrate_profile</span>()
        user.needs_migration = <span style="color:var(--hl-n)">False</span>
        user.<span style="color:var(--hl-f)">save</span>()

    logger.<span style="color:var(--hl-f)">info</span>(<span style="color:var(--hl-s)">f"Migrated batch of </span>{<span style="color:var(--hl-f)">len</span>(batch)}<span style="color:var(--hl-s)"> users"</span>)` }} /></pre>

        <h2>Key Takeaway</h2>
        <p>
          Admin tasks are part of your application. They should live in
          the repository, use the same models and configuration, and run
          in the same environment as the deployed application. Do not SSH
          into a server and run raw SQL. Do not keep scripts on someone&apos;s
          laptop. Write management commands, ship them with the release, and
          run them as one-off processes against the same code that is
          handling production traffic. The task runs, does its job, and
          exits. The codebase stays unified, the data stays consistent, and
          there is a clear record of what happened.
        </p>
      </div>

      <RelatedPosts slug="one-off-admin-processes" />
    </article>
  );
}
