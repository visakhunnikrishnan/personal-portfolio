import type { Metadata } from "next";
import Image from "next/image";
import heroImg from "../../../../public/blog/embracing-config-flexibility/developers-at-config-cafe.png";
import img0 from "../../../../public/blog/embracing-config-flexibility/traditional-vs-12factor-config.jpg";
import { RelatedPosts } from "@/components/related-posts";

export const metadata: Metadata = {
  title: "Embracing Config Flexibility",
  description:
    "Why configuration should live in the environment and never in code, what breaks when database URLs and API keys are hardcoded, and practical patterns for managing config across development, staging, and production.",
  keywords: ["configuration management", "twelve-factor app", "environment variables", "dotenv", "Docker secrets", "Kubernetes ConfigMap", "config files", "Python config", "application configuration"],
  openGraph: {
    title: "Embracing Config Flexibility",
    description:
      "Why configuration should live in the environment and never in code, what breaks when database URLs and API keys are hardcoded, and practical patterns for managing config across development, staging, and production.",
    type: "article",
    publishedTime: "2025-01-29",
    authors: ["Visakh Unni"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Embracing Config Flexibility",
    description: "Why configuration should live in the environment and never in code, and practical patterns for managing config across environments.",
  },
};

export default function BlogPost() {
  return (
    <article className="mx-auto max-w-3xl pb-16 pt-24">
      <header className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Embracing Config Flexibility
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
        alt="Developers working on laptops at a cafe, each running the same application with different local configuration"
        className="mb-10 w-full rounded-md"
        priority
        placeholder="blur"
      />

      <div className="prose sm:prose-lg prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:not-italic prose-img:rounded-md">
        <p className="italic text-muted-foreground">
          Hardcoded database URLs, API keys committed to repositories,
          config files that differ between environments - these are
          symptoms of configuration mixed into code. When config lives
          in the source, changing a database connection requires a code
          change, a build, and a deploy. Worse, secrets end up in version
          control where anyone with repository access can read them. The
          12-factor methodology says configuration should be stored in
          the environment, completely separate from code.
        </p>

        <hr />

        <h2>What Is Configuration?</h2>
        <p>
          Configuration is anything that changes between deploys. The code
          is the same in development, staging, and production. The
          configuration is what makes each environment different:
        </p>
        <ul>
          <li>
            <strong>Database connection strings</strong> - different
            databases for dev, staging, and production.
          </li>
          <li>
            <strong>API keys and secrets</strong> - credentials for
            external services like payment providers, email services, or
            cloud storage.
          </li>
          <li>
            <strong>Service URLs</strong> - the address of a backing
            service that differs between environments.
          </li>
          <li>
            <strong>Feature flags</strong> - toggles that enable or
            disable functionality per environment.
          </li>
          <li>
            <strong>Operational settings</strong> - log level, worker
            count, cache TTL.
          </li>
        </ul>
        <p>
          What is <em>not</em> configuration? Internal application
          settings that stay the same everywhere - route definitions,
          middleware order, template paths. These belong in code because
          they do not change between deploys.
        </p>

        <h2>The Wrong Way: Config in Code</h2>
        <p>
          The most common violation is hardcoding values that should be
          configurable:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Hardcoded config - never do this</span>

<span style="color:var(--hl-v)">DATABASE_URL</span> = <span style="color:var(--hl-s)">"postgresql://admin:s3cret@prod-db:5432/myapp"</span>
<span style="color:var(--hl-v)">STRIPE_API_KEY</span> = <span style="color:var(--hl-s)">"sk_live_abc123def456"</span>
<span style="color:var(--hl-v)">REDIS_URL</span> = <span style="color:var(--hl-s)">"redis://prod-cache:6379/0"</span>
<span style="color:var(--hl-v)">DEBUG</span> = <span style="color:var(--hl-n)">False</span>` }} /></pre>

        <p>
          This creates several problems:
        </p>
        <ul>
          <li>
            <strong>Secrets in version control.</strong> The database
            password and Stripe API key are now in every clone of the
            repository. Anyone with read access - current employees,
            former employees, contractors, CI systems - can see them.
          </li>
          <li>
            <strong>Cannot change without a deploy.</strong> If the
            database moves to a new host, you need to change code, commit,
            build, and deploy. What should be a config change becomes a
            release.
          </li>
          <li>
            <strong>One config for all environments.</strong> Development,
            staging, and production need different values. With hardcoded
            config, you either maintain separate code branches or add
            environment-checking logic, both of which violate the codebase
            principle.
          </li>
        </ul>

        <h2>The Wrong Way: Config Files in the Repository</h2>
        <p>
          A slightly better but still problematic approach is using config
          files that are checked into version control:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># config/production.py - checked into git</span>

<span style="color:var(--hl-v)">DATABASE_URL</span> = <span style="color:var(--hl-s)">"postgresql://admin:s3cret@prod-db:5432/myapp"</span>
<span style="color:var(--hl-v)">STRIPE_API_KEY</span> = <span style="color:var(--hl-s)">"sk_live_abc123def456"</span>
<span style="color:var(--hl-v)">DEBUG</span> = <span style="color:var(--hl-n)">False</span>

<span style="color:var(--hl-c)"># config/development.py - checked into git</span>

<span style="color:var(--hl-v)">DATABASE_URL</span> = <span style="color:var(--hl-s)">"postgresql://dev:dev@localhost:5432/myapp_dev"</span>
<span style="color:var(--hl-v)">STRIPE_API_KEY</span> = <span style="color:var(--hl-s)">"sk_test_xyz789"</span>
<span style="color:var(--hl-v)">DEBUG</span> = <span style="color:var(--hl-n)">True</span>` }} /></pre>

        <p>
          This groups config by environment name, which seems organized
          but has real downsides. The files multiply as environments grow -
          staging, QA, demo, each developer&apos;s local setup. Secrets
          are still in the repository. And there is no clean way to add a
          new environment without editing code.
        </p>

        <Image
          src={img0}
          alt="Comparison of traditional config management where configs are hardcoded in the application reducing flexibility, versus 12-factor config management where configs are stored as environment variables enhancing security and adaptability, with the open source litmus test as a validation method"
          className="my-8 w-full rounded-md"
          placeholder="blur"
        />

        <h2>The Right Way: Environment Variables</h2>
        <p>
          The 12-factor approach stores config in environment variables.
          The application reads its configuration from the environment at
          runtime:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-k)">import</span> os

<span style="color:var(--hl-c)"># Read config from environment variables</span>
<span style="color:var(--hl-v)">DATABASE_URL</span> = os.environ[<span style="color:var(--hl-s)">"DATABASE_URL"</span>]
<span style="color:var(--hl-v)">STRIPE_API_KEY</span> = os.environ[<span style="color:var(--hl-s)">"STRIPE_API_KEY"</span>]
<span style="color:var(--hl-v)">REDIS_URL</span> = os.environ[<span style="color:var(--hl-s)">"REDIS_URL"</span>]
<span style="color:var(--hl-v)">DEBUG</span> = os.environ.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"DEBUG"</span>, <span style="color:var(--hl-s)">"false"</span>).<span style="color:var(--hl-f)">lower</span>() == <span style="color:var(--hl-s)">"true"</span>` }} /></pre>

        <p>
          Now the code has zero secrets. The same code runs in every
          environment. The only thing that changes is which environment
          variables are set. Each deploy gets its own values:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Development</span>
<span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://dev:dev@localhost:5432/myapp_dev</span>
<span style="color:var(--hl-v)">STRIPE_API_KEY</span>=<span style="color:var(--hl-s)">sk_test_xyz789</span>
<span style="color:var(--hl-v)">DEBUG</span>=<span style="color:var(--hl-n)">true</span>

<span style="color:var(--hl-c)"># Production</span>
<span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://admin:s3cret@prod-db:5432/myapp</span>
<span style="color:var(--hl-v)">STRIPE_API_KEY</span>=<span style="color:var(--hl-s)">sk_live_abc123def456</span>
<span style="color:var(--hl-v)">DEBUG</span>=<span style="color:var(--hl-n)">false</span>` }} /></pre>

        <h2>The Open Source Test</h2>
        <p>
          Here is a quick way to check if your config management is right:
        </p>
        <blockquote>
          <p>
            Could you open-source your codebase right now without leaking
            a single credential?
          </p>
        </blockquote>
        <p>
          If the answer is yes, config is properly separated. If the answer
          is &quot;we would need to scrub a few files first,&quot; then
          secrets are in the code, and that is a problem waiting to happen.
        </p>

        <h2>Reading Config in Practice</h2>
        <p>
          In a real application, you want more than raw{" "}
          <code>os.environ</code> calls scattered throughout the code. A
          common pattern is a single config module that reads all
          environment variables, applies defaults for optional values, and
          fails early if required values are missing:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># config.py</span>

<span style="color:var(--hl-k)">import</span> os

<span style="color:var(--hl-k)">def</span> <span style="color:var(--hl-f)">require</span>(name):
    value = os.environ.<span style="color:var(--hl-f)">get</span>(name)
    <span style="color:var(--hl-k)">if</span> value <span style="color:var(--hl-k)">is</span> <span style="color:var(--hl-n)">None</span>:
        <span style="color:var(--hl-k)">raise</span> <span style="color:var(--hl-f)">RuntimeError</span>(<span style="color:var(--hl-s)">f"Missing required env var: </span>{name}<span style="color:var(--hl-s)">"</span>)
    <span style="color:var(--hl-k)">return</span> value

<span style="color:var(--hl-c)"># Required - app will not start without these</span>
<span style="color:var(--hl-v)">DATABASE_URL</span> = <span style="color:var(--hl-f)">require</span>(<span style="color:var(--hl-s)">"DATABASE_URL"</span>)
<span style="color:var(--hl-v)">SECRET_KEY</span> = <span style="color:var(--hl-f)">require</span>(<span style="color:var(--hl-s)">"SECRET_KEY"</span>)

<span style="color:var(--hl-c)"># Optional - sensible defaults for development</span>
<span style="color:var(--hl-v)">DEBUG</span> = os.environ.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"DEBUG"</span>, <span style="color:var(--hl-s)">"false"</span>).<span style="color:var(--hl-f)">lower</span>() == <span style="color:var(--hl-s)">"true"</span>
<span style="color:var(--hl-v)">LOG_LEVEL</span> = os.environ.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"LOG_LEVEL"</span>, <span style="color:var(--hl-s)">"info"</span>)
<span style="color:var(--hl-v)">WORKER_COUNT</span> = <span style="color:var(--hl-f)">int</span>(os.environ.<span style="color:var(--hl-f)">get</span>(<span style="color:var(--hl-s)">"WORKER_COUNT"</span>, <span style="color:var(--hl-s)">"4"</span>))` }} /></pre>

        <p>
          The rest of the application imports from this module. If someone
          deploys without setting <code>DATABASE_URL</code>, the app fails
          immediately with a clear error instead of crashing later with an
          obscure connection error.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># app.py</span>

<span style="color:var(--hl-k)">from</span> config <span style="color:var(--hl-k)">import</span> DATABASE_URL, DEBUG
<span style="color:var(--hl-k)">from</span> flask <span style="color:var(--hl-k)">import</span> Flask
<span style="color:var(--hl-k)">from</span> sqlalchemy <span style="color:var(--hl-k)">import</span> create_engine

app = <span style="color:var(--hl-f)">Flask</span>(__name__)
app.config[<span style="color:var(--hl-s)">"DEBUG"</span>] = DEBUG

engine = <span style="color:var(--hl-f)">create_engine</span>(DATABASE_URL)` }} /></pre>

        <h2>Local Development with .env Files</h2>
        <p>
          Setting environment variables manually every time you open a
          terminal is tedious. For local development, <code>.env</code>{" "}
          files provide a convenient shortcut:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># .env (local development only - NOT committed to git)</span>

<span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://dev:dev@localhost:5432/myapp_dev</span>
<span style="color:var(--hl-v)">SECRET_KEY</span>=<span style="color:var(--hl-s)">local-dev-secret-not-real</span>
<span style="color:var(--hl-v)">STRIPE_API_KEY</span>=<span style="color:var(--hl-s)">sk_test_xyz789</span>
<span style="color:var(--hl-v)">DEBUG</span>=<span style="color:var(--hl-n)">true</span>
<span style="color:var(--hl-v)">LOG_LEVEL</span>=<span style="color:var(--hl-s)">debug</span>` }} /></pre>

        <p>
          A library like <code>python-dotenv</code> loads this file
          automatically:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Load .env file if it exists (development only)</span>
<span style="color:var(--hl-k)">from</span> dotenv <span style="color:var(--hl-k)">import</span> load_dotenv
<span style="color:var(--hl-f)">load_dotenv</span>()

<span style="color:var(--hl-c)"># Now os.environ has the values from .env</span>
<span style="color:var(--hl-k)">import</span> os
<span style="color:var(--hl-f)">print</span>(os.environ[<span style="color:var(--hl-s)">"DATABASE_URL"</span>])
<span style="color:var(--hl-c)"># postgresql://dev:dev@localhost:5432/myapp_dev</span>` }} /></pre>

        <p>
          The critical rule: the <code>.env</code> file must be in{" "}
          <code>.gitignore</code>. It never gets committed. In production,
          the real environment variables are set by the platform, not by a
          file.
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># .gitignore</span>
.env
.env.local
.env.*.local` }} /></pre>

        <h2>Config in Docker and Production</h2>
        <p>
          In Docker, environment variables are passed at runtime. The
          application code does not change - only the environment around it
          does:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># docker-compose.yml</span>
<span style="color:var(--hl-v)">services</span>:
  <span style="color:var(--hl-v)">api</span>:
    <span style="color:var(--hl-v)">build</span>: <span style="color:var(--hl-s)">.</span>
    <span style="color:var(--hl-v)">environment</span>:
      - <span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://dev:dev@db:5432/myapp</span>
      - <span style="color:var(--hl-v)">SECRET_KEY</span>=<span style="color:var(--hl-s)">local-dev-secret</span>
      - <span style="color:var(--hl-v)">DEBUG</span>=<span style="color:var(--hl-n)">true</span>
    <span style="color:var(--hl-v)">ports</span>:
      - <span style="color:var(--hl-s)">"5000:5000"</span>

  <span style="color:var(--hl-v)">db</span>:
    <span style="color:var(--hl-v)">image</span>: <span style="color:var(--hl-s)">postgres:16</span>
    <span style="color:var(--hl-v)">environment</span>:
      - <span style="color:var(--hl-v)">POSTGRES_USER</span>=<span style="color:var(--hl-s)">dev</span>
      - <span style="color:var(--hl-v)">POSTGRES_PASSWORD</span>=<span style="color:var(--hl-s)">dev</span>
      - <span style="color:var(--hl-v)">POSTGRES_DB</span>=<span style="color:var(--hl-s)">myapp</span>` }} /></pre>

        <p>
          In Kubernetes, secrets and config maps inject environment
          variables into pods:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Kubernetes deployment (excerpt)</span>
<span style="color:var(--hl-v)">containers</span>:
  - <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">api</span>
    <span style="color:var(--hl-v)">image</span>: <span style="color:var(--hl-s)">myapp:v2.3.1</span>
    <span style="color:var(--hl-v)">env</span>:
      - <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">DATABASE_URL</span>
        <span style="color:var(--hl-v)">valueFrom</span>:
          <span style="color:var(--hl-v)">secretKeyRef</span>:
            <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">myapp-secrets</span>
            <span style="color:var(--hl-v)">key</span>: <span style="color:var(--hl-s)">database-url</span>
      - <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">LOG_LEVEL</span>
        <span style="color:var(--hl-v)">valueFrom</span>:
          <span style="color:var(--hl-v)">configMapKeyRef</span>:
            <span style="color:var(--hl-v)">name</span>: <span style="color:var(--hl-s)">myapp-config</span>
            <span style="color:var(--hl-v)">key</span>: <span style="color:var(--hl-s)">log-level</span>` }} /></pre>

        <p>
          In each case, the application code is identical. The only
          difference is how the environment variables reach the process.
          Locally it is a <code>.env</code> file. In Docker Compose it is
          the <code>environment</code> block. In Kubernetes it is secrets
          and config maps. The application does not know or care which
          method is used.
        </p>

        <h2>Naming Config Variables</h2>
        <p>
          Keep variable names deploy-agnostic. Do not embed environment
          names into config keys:
        </p>

        <pre><code dangerouslySetInnerHTML={{ __html: `<span style="color:var(--hl-c)"># Bad - environment name baked into the variable</span>
<span style="color:var(--hl-v)">STAGING_DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://...</span>
<span style="color:var(--hl-v)">PROD_DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://...</span>

<span style="color:var(--hl-c)"># Good - same variable name, different value per deploy</span>
<span style="color:var(--hl-v)">DATABASE_URL</span>=<span style="color:var(--hl-s)">postgresql://...</span>` }} /></pre>

        <p>
          Each environment variable should work independently. Changing{" "}
          <code>LOG_LEVEL</code> should not require changing anything else.
          This keeps config granular and avoids coupling between unrelated
          settings.
        </p>

        <h2>Key Takeaway</h2>
        <p>
          Configuration belongs in the environment, not in code. Hardcoded
          values create security risks and make the application rigid.
          Config files checked into version control leak secrets. Environment
          variables solve both problems - the code stays clean and portable,
          secrets stay outside the repository, and each deploy gets exactly
          the config it needs without any code changes. Use a config module
          to centralize reads, fail early on missing values, and keep
          variable names deploy-agnostic. The goal is simple: one codebase
          that works everywhere, configured entirely from the outside.
        </p>
      </div>

      <RelatedPosts slug="embracing-config-flexibility" />
    </article>
  );
}
